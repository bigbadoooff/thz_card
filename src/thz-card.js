import { LitElement, html, css } from 'lit';
import './thz-card-editor.js';

const CARD_VERSION = '1.0.0';

console.info(
  `%c  THZ-CARD  \n%c  Version ${CARD_VERSION}  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// Add card to custom cards list
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'thz-card',
  name: 'THZ Card',
  description: 'A custom card for controlling THZ heat pumps',
});

class ThzCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _historyData: { type: Object },
    };
  }

  constructor() {
    super();
    this._historyData = {};
  }

  static getConfigElement() {
    return document.createElement('thz-card-editor');
  }

  static getStubConfig() {
    return {
      entity: '',
      name: 'Heat Pump',
      show_temperature: true,
      show_temperature_graph: true,
      graph_hours: 24,
      show_mode: true,
      show_heating_circuit: true,
      show_hot_water: true,
    };
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = {
      name: 'Heat Pump',
      show_temperature: true,
      show_temperature_graph: true,
      graph_hours: 24,
      show_mode: true,
      show_heating_circuit: true,
      show_hot_water: true,
      ...config,
    };
  }

  getCardSize() {
    return 5;
  }

  shouldUpdate(changedProps) {
    if (!this.config) {
      return false;
    }
    return true;
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const entity = this.config.entity ? this.hass.states[this.config.entity] : null;
    const stateObj = entity || {};

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.config.name}</div>
        </div>
        <div class="card-content">
          ${this._renderTemperatureSection(stateObj)}
          ${this.config.show_mode ? this._renderModeSection(stateObj) : ''}
          ${this.config.show_heating_circuit ? this._renderHeatingCircuitSection(stateObj) : ''}
          ${this.config.show_hot_water ? this._renderHotWaterSection(stateObj) : ''}
          ${this._renderAdditionalControls(stateObj)}
        </div>
      </ha-card>
    `;
  }

  _renderTemperatureSection(stateObj) {
    if (!this.config.show_temperature) return '';

    // Find temperature sensors
    const tempSensors = this._findEntitiesByPattern(/temperature|temp/i);
    
    return html`
      <div class="section">
        <div class="section-title">Temperatures</div>
        ${this.config.show_temperature_graph && tempSensors.length > 0 ? this._renderTemperatureGraph(tempSensors) : ''}
        <div class="sensor-grid">
          ${tempSensors.slice(0, 6).map(entityId => {
            const entity = this.hass.states[entityId];
            if (!entity) return '';
            
            const name = this._getEntityName(entity);
            const value = entity.state;
            const unit = entity.attributes.unit_of_measurement || '';
            
            return html`
              <div class="sensor-item">
                <div class="sensor-name">${name}</div>
                <div class="sensor-value">${value}${unit}</div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  _renderTemperatureGraph(tempSensors) {
    // Limit to first 4 sensors for cleaner graph
    const sensorsToGraph = tempSensors.slice(0, 4);
    
    // Load history data when component is first rendered
    if (!this._historyData[sensorsToGraph[0]]) {
      this._loadHistoryData(sensorsToGraph);
    }

    // Define colors for different sensors
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'];
    
    return html`
      <div class="temperature-graph">
        <div class="graph-header">
          <div class="graph-title">Temperature History (${this.config.graph_hours || 24}h)</div>
          <button 
            class="refresh-button" 
            @click=${() => this._loadHistoryData(sensorsToGraph)}
            title="Refresh graph data">
            ↻
          </button>
        </div>
        <div class="graph-legend">
          ${sensorsToGraph.map((entityId, index) => {
            const entity = this.hass.states[entityId];
            if (!entity) return '';
            const name = this._getEntityName(entity);
            return html`
              <div class="legend-item">
                <span class="legend-color" style="background-color: ${colors[index]}"></span>
                <span class="legend-label">${name}</span>
              </div>
            `;
          })}
        </div>
        ${this._renderGraph(sensorsToGraph, colors)}
      </div>
    `;
  }

  _renderGraph(sensorsToGraph, colors) {
    const width = 100; // percentage
    const height = 200;
    const padding = { top: 10, right: 10, bottom: 20, left: 40 };
    const graphWidth = 100 - padding.left - padding.right;
    const graphHeight = height - padding.top - padding.bottom;

    // Check if we have any data
    const hasData = sensorsToGraph.some(entityId => 
      this._historyData[entityId] && this._historyData[entityId].length > 0
    );

    if (!hasData) {
      return html`
        <div class="graph-loading">
          Loading graph data...
        </div>
      `;
    }

    // Get min and max values across all sensors for scaling
    let minTemp = Infinity;
    let maxTemp = -Infinity;
    let minTime = Infinity;
    let maxTime = -Infinity;

    sensorsToGraph.forEach(entityId => {
      const data = this._historyData[entityId] || [];
      data.forEach(point => {
        const temp = parseFloat(point.state);
        if (!isNaN(temp)) {
          minTemp = Math.min(minTemp, temp);
          maxTemp = Math.max(maxTemp, temp);
        }
        const time = new Date(point.last_changed).getTime();
        minTime = Math.min(minTime, time);
        maxTime = Math.max(maxTime, time);
      });
    });

    // Add some padding to min/max
    const tempRange = maxTemp - minTemp;
    minTemp = Math.floor(minTemp - tempRange * 0.1);
    maxTemp = Math.ceil(maxTemp + tempRange * 0.1);

    // Generate Y-axis labels (temperature)
    const yAxisLabels = [];
    const numYTicks = 5;
    for (let i = 0; i <= numYTicks; i++) {
      const temp = minTemp + (maxTemp - minTemp) * (i / numYTicks);
      const y = graphHeight - (i / numYTicks) * graphHeight;
      yAxisLabels.push({ temp: temp.toFixed(1), y });
    }

    // Generate paths for each sensor
    const paths = sensorsToGraph.map((entityId, index) => {
      const data = this._historyData[entityId] || [];
      if (data.length === 0) return null;

      const points = data
        .map(point => {
          const temp = parseFloat(point.state);
          if (isNaN(temp)) return null;
          
          const time = new Date(point.last_changed).getTime();
          const x = ((time - minTime) / (maxTime - minTime)) * graphWidth;
          const y = graphHeight - ((temp - minTemp) / (maxTemp - minTemp)) * graphHeight;
          
          return { x, y };
        })
        .filter(p => p !== null);

      if (points.length === 0) return null;

      const pathData = points.map((p, i) => 
        `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
      ).join(' ');

      return {
        path: pathData,
        color: colors[index],
      };
    }).filter(p => p !== null);

    return html`
      <svg class="graph-svg" viewBox="0 0 100 ${height}" preserveAspectRatio="none">
        <!-- Y-axis labels -->
        <g class="y-axis">
          ${yAxisLabels.map(label => html`
            <text 
              x="${padding.left - 5}" 
              y="${padding.top + label.y}" 
              class="axis-label"
              text-anchor="end"
              alignment-baseline="middle">
              ${label.temp}
            </text>
            <line 
              x1="${padding.left}" 
              y1="${padding.top + label.y}" 
              x2="${padding.left + graphWidth}" 
              y2="${padding.top + label.y}" 
              class="grid-line" />
          `)}
        </g>
        
        <!-- Graph area -->
        <g class="graph-area" transform="translate(${padding.left}, ${padding.top})">
          ${paths.map(pathData => html`
            <path 
              d="${pathData.path}" 
              fill="none" 
              stroke="${pathData.color}" 
              stroke-width="0.5" 
              vector-effect="non-scaling-stroke" />
          `)}
        </g>
      </svg>
    `;
  }

  async _loadHistoryData(entityIds) {
    const hours = this.config.graph_hours || 24;
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - hours * 60 * 60 * 1000);

    try {
      const promises = entityIds.map(async entityId => {
        try {
          const history = await this.hass.callWS({
            type: 'history/history_during_period',
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            entity_ids: [entityId],
            minimal_response: true,
            significant_changes_only: false,
          });

          if (history && history[0]) {
            this._historyData = {
              ...this._historyData,
              [entityId]: history[0],
            };
          }
        } catch (err) {
          console.error(`Failed to load history for ${entityId}:`, err);
          this._historyData = {
            ...this._historyData,
            [entityId]: [],
          };
        }
      });

      await Promise.all(promises);
      this.requestUpdate();
    } catch (error) {
      console.error('Failed to load history data:', error);
    }
  }

  _renderModeSection(stateObj) {
    // Find mode/operation related entities
    const modeSelects = this._findEntitiesByPattern(/mode|betriebsart/i, 'select');
    
    return html`
      <div class="section">
        <div class="section-title">Operation Mode</div>
        <div class="control-grid">
          ${modeSelects.slice(0, 3).map(entityId => {
            const entity = this.hass.states[entityId];
            if (!entity) return '';
            
            const name = this._getEntityName(entity);
            const currentValue = entity.state;
            const options = entity.attributes.options || [];
            
            return html`
              <div class="control-item">
                <div class="control-name">${name}</div>
                <select 
                  @change=${(e) => this._handleSelectChange(entityId, e.target.value)}
                  .value=${currentValue}>
                  ${options.map(option => html`
                    <option value="${option}" ?selected=${option === currentValue}>
                      ${option}
                    </option>
                  `)}
                </select>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  _renderHeatingCircuitSection(stateObj) {
    // Find heating circuit related entities
    const hcNumbers = this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i, 'number');
    const hcSwitches = this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i, 'switch');
    
    return html`
      <div class="section">
        <div class="section-title">Heating Circuit 1</div>
        <div class="control-grid">
          ${hcSwitches.slice(0, 2).map(entityId => {
            const entity = this.hass.states[entityId];
            if (!entity) return '';
            
            const name = this._getEntityName(entity);
            const isOn = entity.state === 'on';
            
            return html`
              <div class="control-item">
                <div class="control-name">${name}</div>
                <button 
                  class="switch-button ${isOn ? 'on' : 'off'}"
                  @click=${() => this._handleSwitchToggle(entityId, !isOn)}>
                  ${isOn ? 'ON' : 'OFF'}
                </button>
              </div>
            `;
          })}
          ${hcNumbers.slice(0, 3).map(entityId => {
            const entity = this.hass.states[entityId];
            if (!entity) return '';
            
            const name = this._getEntityName(entity);
            const value = entity.state;
            const min = entity.attributes.min || 0;
            const max = entity.attributes.max || 100;
            const step = entity.attributes.step || 1;
            const unit = entity.attributes.unit_of_measurement || '';
            
            return html`
              <div class="control-item">
                <div class="control-name">${name}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${value}
                    min=${min}
                    max=${max}
                    step=${step}
                    @change=${(e) => this._handleNumberChange(entityId, e.target.value)}>
                  <span class="unit">${unit}</span>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  _renderHotWaterSection(stateObj) {
    // Find hot water related entities
    const dhwSwitches = this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i, 'switch');
    const dhwNumbers = this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i, 'number');
    
    return html`
      <div class="section">
        <div class="section-title">Hot Water</div>
        <div class="control-grid">
          ${dhwSwitches.slice(0, 2).map(entityId => {
            const entity = this.hass.states[entityId];
            if (!entity) return '';
            
            const name = this._getEntityName(entity);
            const isOn = entity.state === 'on';
            
            return html`
              <div class="control-item">
                <div class="control-name">${name}</div>
                <button 
                  class="switch-button ${isOn ? 'on' : 'off'}"
                  @click=${() => this._handleSwitchToggle(entityId, !isOn)}>
                  ${isOn ? 'ON' : 'OFF'}
                </button>
              </div>
            `;
          })}
          ${dhwNumbers.slice(0, 2).map(entityId => {
            const entity = this.hass.states[entityId];
            if (!entity) return '';
            
            const name = this._getEntityName(entity);
            const value = entity.state;
            const min = entity.attributes.min || 0;
            const max = entity.attributes.max || 100;
            const step = entity.attributes.step || 1;
            const unit = entity.attributes.unit_of_measurement || '';
            
            return html`
              <div class="control-item">
                <div class="control-name">${name}</div>
                <div class="number-control">
                  <input 
                    type="number" 
                    .value=${value}
                    min=${min}
                    max=${max}
                    step=${step}
                    @change=${(e) => this._handleNumberChange(entityId, e.target.value)}>
                  <span class="unit">${unit}</span>
                </div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  _renderAdditionalControls(stateObj) {
    // Find any remaining important switches
    const otherSwitches = this._findEntitiesByPattern(/cooling|emergency|party|holiday/i, 'switch');
    
    if (otherSwitches.length === 0) return '';
    
    return html`
      <div class="section">
        <div class="section-title">Additional Controls</div>
        <div class="control-grid">
          ${otherSwitches.slice(0, 4).map(entityId => {
            const entity = this.hass.states[entityId];
            if (!entity) return '';
            
            const name = this._getEntityName(entity);
            const isOn = entity.state === 'on';
            
            return html`
              <div class="control-item">
                <div class="control-name">${name}</div>
                <button 
                  class="switch-button ${isOn ? 'on' : 'off'}"
                  @click=${() => this._handleSwitchToggle(entityId, !isOn)}>
                  ${isOn ? 'ON' : 'OFF'}
                </button>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  _findEntitiesByPattern(pattern, domain = null) {
    if (!this.hass) return [];
    
    return Object.entries(this.hass.states)
      .filter(([entityId, entity]) => {
        // Check if entity has required attributes
        if (!entity || !entity.attributes) return false;
        
        // Check if it belongs to the thz integration or matches pattern
        const matchesTHZ = entityId.includes('thz') || 
                          entity.attributes.integration === 'thz';
        
        if (!matchesTHZ) return false;
        
        // Check domain if specified
        if (domain && !entityId.startsWith(domain + '.')) return false;
        
        // Check pattern
        return pattern.test(entityId) || pattern.test(entity.attributes.friendly_name || '');
      })
      .map(([entityId]) => entityId);
  }

  _getEntityName(entity) {
    return entity.attributes.friendly_name || entity.entity_id?.split?.('.')[1] || 'Unknown';
  }

  _handleSelectChange(entityId, value) {
    this.hass.callService('select', 'select_option', {
      entity_id: entityId,
      option: value,
    });
  }

  _handleSwitchToggle(entityId, turnOn) {
    const service = turnOn ? 'turn_on' : 'turn_off';
    this.hass.callService('switch', service, {
      entity_id: entityId,
    });
  }

  _handleNumberChange(entityId, value) {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    this.hass.callService('number', 'set_value', {
      entity_id: entityId,
      value: numValue,
    });
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
      }

      .name {
        font-size: 24px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .section {
        border: 1px solid var(--divider-color);
        border-radius: 8px;
        padding: 12px;
        background: var(--card-background-color);
      }

      .section-title {
        font-size: 16px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .sensor-grid,
      .control-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
      }

      .sensor-item {
        display: flex;
        flex-direction: column;
        padding: 8px;
        background: var(--secondary-background-color);
        border-radius: 4px;
      }

      .sensor-name {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }

      .sensor-value {
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .control-item {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .control-name {
        font-size: 14px;
        color: var(--primary-text-color);
      }

      select {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        cursor: pointer;
      }

      select:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .switch-button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .switch-button.on {
        background: var(--primary-color);
        color: white;
      }

      .switch-button.off {
        background: var(--disabled-text-color);
        color: white;
      }

      .switch-button:hover {
        opacity: 0.8;
      }

      .number-control {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .number-control input {
        flex: 1;
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      .number-control input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .unit {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      /* Temperature Graph Styles */
      .temperature-graph {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .graph-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .graph-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .refresh-button {
        background: none;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        color: var(--primary-text-color);
        cursor: pointer;
        padding: 4px 8px;
        font-size: 16px;
        transition: all 0.2s ease;
      }

      .refresh-button:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .graph-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--primary-text-color);
      }

      .legend-color {
        width: 20px;
        height: 3px;
        border-radius: 2px;
      }

      .legend-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .graph-svg {
        width: 100%;
        height: 200px;
        background: var(--card-background-color);
        border-radius: 4px;
      }

      .axis-label {
        font-size: 3px;
        fill: var(--secondary-text-color);
      }

      .grid-line {
        stroke: var(--divider-color);
        stroke-width: 0.1;
        opacity: 0.5;
      }

      .graph-loading {
        padding: 40px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 14px;
      }

      @media (max-width: 600px) {
        .sensor-grid,
        .control-grid {
          grid-template-columns: 1fr;
        }
      }
    `;
  }
}

customElements.define('thz-card', ThzCard);
