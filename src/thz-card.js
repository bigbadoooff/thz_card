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
    this._loadingHistory = false;
  }

  static getConfigElement() {
    return document.createElement('thz-card-editor');
  }

  static getStubConfig() {
    return {
      name: 'Heat Pump',
      show_temperature: true,
      show_temperature_graph: true,
      show_fan_graph: true,
      show_heating_details_graph: true,
      graph_hours: 24,
      show_mode: true,
      show_heating_circuit: true,
      show_hot_water: true,
      show_status: true,
      show_energy: true,
      show_statistics: true,
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
      show_fan_graph: true,
      show_heating_details_graph: true,
      graph_hours: 24,
      show_mode: true,
      show_heating_circuit: true,
      show_hot_water: true,
      show_status: true,
      show_energy: true,
      show_statistics: true,
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

    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${this.config.name}</div>
          ${this.config.show_status ? this._renderStatusBadge() : ''}
        </div>
        <div class="card-content">
          ${this.config.show_statistics ? this._renderStatistics() : ''}
          ${this._renderTemperatureSection()}
          ${this._renderFanSection()}
          ${this._renderHeatingDetailsSection()}
          ${this.config.show_energy ? this._renderEnergySection() : ''}
          ${this.config.show_mode ? this._renderModeSection() : ''}
          ${this.config.show_heating_circuit ? this._renderHeatingCircuitSection() : ''}
          ${this.config.show_hot_water ? this._renderHotWaterSection() : ''}
          ${this._renderAdditionalControls()}
        </div>
      </ha-card>
    `;
  }

  _renderTemperatureSection() {
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

  _renderStatusBadge() {
    // Find status/state sensors
    const statusSensors = this._findEntitiesByPattern(/state|status|mode|betrieb/i, 'sensor');
    
    if (statusSensors.length === 0) {
      return html``;
    }

    const statusEntity = this.hass.states[statusSensors[0]];
    if (!statusEntity) return html``;

    const state = statusEntity.state;
    let statusClass = 'status-unknown';
    let statusIcon = '●';

    // Determine status based on state value
    if (/heat|heating|heizen/i.test(state)) {
      statusClass = 'status-heating';
      statusIcon = '🔥';
    } else if (/cool|cooling|kühlen/i.test(state)) {
      statusClass = 'status-cooling';
      statusIcon = '❄️';
    } else if (/idle|standby|bereit/i.test(state)) {
      statusClass = 'status-idle';
      statusIcon = '⏸️';
    } else if (/defrost|abtau/i.test(state)) {
      statusClass = 'status-defrost';
      statusIcon = '🌨️';
    } else if (/off|aus/i.test(state)) {
      statusClass = 'status-off';
      statusIcon = '⭘';
    }

    return html`
      <div class="status-badge ${statusClass}">
        <span class="status-icon">${statusIcon}</span>
        <span class="status-text">${state}</span>
      </div>
    `;
  }

  _renderStatistics() {
    // Find various statistics sensors
    const runtimeSensors = this._findEntitiesByPattern(/runtime|laufzeit|operating.*time/i, 'sensor');
    const energySensors = this._findEntitiesByPattern(/energy|energie|consumption|verbrauch/i, 'sensor');
    const copSensors = this._findEntitiesByPattern(/cop|efficiency|wirkungsgrad/i, 'sensor');
    const compressorSensors = this._findEntitiesByPattern(/compressor|verdichter/i, 'sensor');

    const stats = [];

    // Add runtime stat
    if (runtimeSensors.length > 0) {
      const entity = this.hass.states[runtimeSensors[0]];
      if (entity) {
        stats.push({
          name: 'Runtime',
          icon: '⏱️',
          value: entity.state,
          unit: entity.attributes.unit_of_measurement || '',
        });
      }
    }

    // Add energy stat
    if (energySensors.length > 0) {
      const entity = this.hass.states[energySensors[0]];
      if (entity) {
        stats.push({
          name: 'Energy Today',
          icon: '⚡',
          value: entity.state,
          unit: entity.attributes.unit_of_measurement || '',
        });
      }
    }

    // Add COP stat
    if (copSensors.length > 0) {
      const entity = this.hass.states[copSensors[0]];
      if (entity) {
        const copValue = parseFloat(entity.state);
        let copClass = 'cop-normal';
        if (!isNaN(copValue)) {
          if (copValue >= 4) copClass = 'cop-excellent';
          else if (copValue >= 3) copClass = 'cop-good';
          else if (copValue < 2) copClass = 'cop-poor';
        }
        stats.push({
          name: 'COP',
          icon: '📊',
          value: entity.state,
          unit: entity.attributes.unit_of_measurement || '',
          className: copClass,
        });
      }
    }

    // Add compressor stat
    if (compressorSensors.length > 0) {
      const entity = this.hass.states[compressorSensors[0]];
      if (entity) {
        stats.push({
          name: 'Compressor',
          icon: '🔧',
          value: entity.state,
          unit: entity.attributes.unit_of_measurement || '',
        });
      }
    }

    if (stats.length === 0) return '';

    return html`
      <div class="statistics-section">
        <div class="stats-grid">
          ${stats.map(stat => html`
            <div class="stat-item ${stat.className || ''}">
              <div class="stat-icon">${stat.icon}</div>
              <div class="stat-content">
                <div class="stat-name">${stat.name}</div>
                <div class="stat-value">${stat.value}${stat.unit}</div>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  _renderTemperatureGraph(tempSensors) {
    // Limit to first 4 sensors for cleaner graph
    const sensorsToGraph = tempSensors.slice(0, 4);
    
    // Early return if no sensors to graph
    if (sensorsToGraph.length === 0) {
      return '';
    }
    
    // Load history data when component is first rendered
    if (!this._historyData[sensorsToGraph[0]]) {
      this._loadHistoryData(sensorsToGraph);
    }

    // Define colors for different sensors (matching 4 sensor limit)
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
    
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

    // Handle edge case: no valid data points
    if (!isFinite(minTemp) || !isFinite(maxTemp)) {
      return html`
        <div class="graph-loading">
          No temperature data available
        </div>
      `;
    }

    // Handle edge case: all temperatures are the same
    if (minTemp === maxTemp) {
      minTemp = minTemp - 1;
      maxTemp = maxTemp + 1;
    } else {
      // Add some padding to min/max
      const tempRange = maxTemp - minTemp;
      minTemp = Math.floor(minTemp - tempRange * 0.1);
      maxTemp = Math.ceil(maxTemp + tempRange * 0.1);
    }

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
    // Prevent concurrent loading
    if (this._loadingHistory) {
      return;
    }
    
    this._loadingHistory = true;
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
            this._historyData[entityId] = history[0];
          }
        } catch (err) {
          console.error(`Failed to load history for ${entityId}:`, err);
          this._historyData[entityId] = [];
        }
      });

      await Promise.all(promises);
      this.requestUpdate();
    } catch (error) {
      console.error('Failed to load history data:', error);
    } finally {
      this._loadingHistory = false;
    }
  }

  _renderFanSection() {
    // Find fan-related sensors
    const fanSensors = this._findEntitiesByPattern(/fan|l[üu]fter|ventilat/i, 'sensor');
    
    if (fanSensors.length === 0 && !this.config.show_fan_graph) {
      return '';
    }
    
    return html`
      <div class="section">
        <div class="section-title">Fan Values</div>
        ${this.config.show_fan_graph && fanSensors.length > 0 ? this._renderFanGraph(fanSensors) : ''}
        <div class="sensor-grid">
          ${fanSensors.slice(0, 6).map(entityId => {
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

  _renderFanGraph(fanSensors) {
    const sensorsToGraph = fanSensors.slice(0, 4);
    
    if (sensorsToGraph.length === 0) {
      return '';
    }
    
    if (!this._historyData[sensorsToGraph[0]]) {
      this._loadHistoryData(sensorsToGraph);
    }

    const colors = ['#9b59b6', '#3498db', '#1abc9c', '#f39c12'];
    
    return html`
      <div class="temperature-graph">
        <div class="graph-header">
          <div class="graph-title">Fan History (${this.config.graph_hours || 24}h)</div>
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

  _renderHeatingDetailsSection() {
    // Find heating detail sensors (booster, heat circuit pump, power, integral)
    const heatingDetailSensors = this._findEntitiesByPattern(/booster|pump|power|integral|heizleistung|leistung/i, 'sensor');
    
    if (heatingDetailSensors.length === 0 && !this.config.show_heating_details_graph) {
      return '';
    }
    
    return html`
      <div class="section">
        <div class="section-title">Heating Details</div>
        ${this.config.show_heating_details_graph && heatingDetailSensors.length > 0 ? this._renderHeatingDetailsGraph(heatingDetailSensors) : ''}
        <div class="sensor-grid">
          ${heatingDetailSensors.slice(0, 6).map(entityId => {
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

  _renderEnergySection() {
    // Find energy and power related sensors
    const powerSensors = this._findEntitiesByPattern(/power|leistung|watt/i, 'sensor');
    const energySensors = this._findEntitiesByPattern(/energy|energie|consumption|verbrauch/i, 'sensor');
    const copSensors = this._findEntitiesByPattern(/cop|efficiency|wirkungsgrad/i, 'sensor');

    const allEnergySensors = [...new Set([...powerSensors, ...energySensors, ...copSensors])];

    if (allEnergySensors.length === 0) {
      return '';
    }

    return html`
      <div class="section">
        <div class="section-title">⚡ Energy & Efficiency</div>
        <div class="sensor-grid">
          ${allEnergySensors.slice(0, 6).map(entityId => {
            const entity = this.hass.states[entityId];
            if (!entity) return '';
            
            const name = this._getEntityName(entity);
            const value = entity.state;
            const unit = entity.attributes.unit_of_measurement || '';
            
            // Special highlighting for COP values
            let className = 'sensor-item';
            if (/cop|efficiency|wirkungsgrad/i.test(name)) {
              const copValue = parseFloat(value);
              if (!isNaN(copValue)) {
                if (copValue >= 4) className += ' cop-excellent';
                else if (copValue >= 3) className += ' cop-good';
                else if (copValue < 2) className += ' cop-poor';
              }
            }
            
            return html`
              <div class="${className}">
                <div class="sensor-name">${name}</div>
                <div class="sensor-value">${value}${unit}</div>
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  _renderHeatingDetailsGraph(heatingDetailSensors) {
    const sensorsToGraph = heatingDetailSensors.slice(0, 4);
    
    if (sensorsToGraph.length === 0) {
      return '';
    }
    
    if (!this._historyData[sensorsToGraph[0]]) {
      this._loadHistoryData(sensorsToGraph);
    }

    const colors = ['#e74c3c', '#e67e22', '#16a085', '#2ecc71'];
    
    return html`
      <div class="temperature-graph">
        <div class="graph-header">
          <div class="graph-title">Heating Details History (${this.config.graph_hours || 24}h)</div>
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

  _renderModeSection() {
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

  _renderHeatingCircuitSection() {
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

  _renderHotWaterSection() {
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

  _renderAdditionalControls() {
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
    
    // Get device entities if device_id is specified
    let deviceEntityIds = null;
    if (this.config.device_id && this.hass.devices && this.hass.entities) {
      deviceEntityIds = Object.entries(this.hass.entities)
        .filter(([entityId, entity]) => entity.device_id === this.config.device_id)
        .map(([entityId]) => entityId);
    }
    
    return Object.entries(this.hass.states)
      .filter(([entityId, entity]) => {
        // Check if entity has required attributes
        if (!entity || !entity.attributes) return false;
        
        // If device_id is specified, only show entities from that device
        if (deviceEntityIds && !deviceEntityIds.includes(entityId)) {
          return false;
        }
        
        // If entity_filter is specified, entity must contain the filter string
        if (this.config.entity_filter && !entityId.toLowerCase().includes(this.config.entity_filter.toLowerCase())) {
          return false;
        }
        
        // Check if it belongs to the thz integration or matches pattern
        // Check multiple ways an entity could be from THZ integration:
        // 1. Entity ID contains 'thz' (most common)
        // 2. Entity ID contains 'tecalor' (alternative branding)
        // 3. Entity ID contains 'lwz' (Stiebel Eltron LWZ series)
        // 4. Device name/via_device contains thz-related keywords
        // 5. If entity_filter or device_id is set, skip THZ check (user knows what they want)
        const skipTHZCheck = this.config.entity_filter || this.config.device_id;
        const matchesTHZ = skipTHZCheck || 
                          entityId.toLowerCase().includes('thz') || 
                          entityId.toLowerCase().includes('tecalor') ||
                          entityId.toLowerCase().includes('lwz') ||
                          entity.attributes.integration === 'thz' ||
                          (entity.attributes.device_class && 
                           JSON.stringify(entity.attributes).toLowerCase().includes('thz'));
        
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

      /* Status Badge Styles */
      .status-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 16px;
        font-size: 13px;
        font-weight: 500;
        border: 2px solid transparent;
      }

      .status-heating {
        background: rgba(255, 87, 34, 0.15);
        border-color: #ff5722;
        color: #ff5722;
      }

      .status-cooling {
        background: rgba(33, 150, 243, 0.15);
        border-color: #2196f3;
        color: #2196f3;
      }

      .status-idle {
        background: rgba(158, 158, 158, 0.15);
        border-color: #9e9e9e;
        color: #9e9e9e;
      }

      .status-defrost {
        background: rgba(3, 169, 244, 0.15);
        border-color: #03a9f4;
        color: #03a9f4;
      }

      .status-off {
        background: rgba(117, 117, 117, 0.15);
        border-color: #757575;
        color: #757575;
      }

      .status-unknown {
        background: rgba(158, 158, 158, 0.15);
        border-color: #9e9e9e;
        color: var(--primary-text-color);
      }

      .status-icon {
        font-size: 16px;
      }

      /* Statistics Section Styles */
      .statistics-section {
        margin-bottom: 20px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
        border: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .stat-icon {
        font-size: 24px;
        line-height: 1;
      }

      .stat-content {
        flex: 1;
        min-width: 0;
      }

      .stat-name {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }

      .stat-value {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .cop-excellent {
        border-color: #4caf50;
        background: rgba(76, 175, 80, 0.1);
      }

      .cop-excellent .stat-value {
        color: #4caf50;
      }

      .cop-good {
        border-color: #8bc34a;
        background: rgba(139, 195, 74, 0.1);
      }

      .cop-good .stat-value {
        color: #8bc34a;
      }

      .cop-poor {
        border-color: #ff9800;
        background: rgba(255, 152, 0, 0.1);
      }

      .cop-poor .stat-value {
        color: #ff9800;
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
        
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
  }
}

customElements.define('thz-card', ThzCard);
