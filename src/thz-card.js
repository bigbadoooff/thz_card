import { LitElement, html, css } from 'lit';
import { createThing } from 'custom-card-helpers';
import './thz-card-editor.js';

const CARD_VERSION = '1.2.0';

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
    };
  }

  constructor() {
    super();
    this._graphCards = {};
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
      show_cooling: true,
      show_status: true,
      show_energy: true,
      show_statistics: true,
      show_errors_always: false,
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
      show_cooling: true,
      show_status: true,
      show_energy: true,
      show_statistics: true,
      show_errors_always: false,
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
          ${this._renderErrorSection()}
          ${this._renderTemperatureSection()}
          ${this._renderFanSection()}
          ${this._renderHeatingDetailsSection()}
          ${this.config.show_energy ? this._renderEnergySection() : ''}
          ${this.config.show_mode ? this._renderModeSection() : ''}
          ${this.config.show_heating_circuit ? this._renderHeatingCircuitSection() : ''}
          ${this.config.show_hot_water ? this._renderHotWaterSection() : ''}
          ${this.config.show_cooling !== false ? this._renderCoolingSection() : ''}
          ${this._renderAdditionalControls()}
        </div>
      </ha-card>
    `;
  }

  _renderTemperatureSection() {
    if (!this.config.show_temperature) return '';

    // Find specific temperature sensors (excluding HC1 settings)
    // Focus on: room temp, outside temp, flow temp, return temp
    const allTempSensors = this._findEntitiesByPattern(/temperature|temp/i, 'sensor');
    
    // Filter out HC1 settings - only keep actual temperature readings
    const tempSensors = allTempSensors.filter(entityId => {
      // Exclude HC1 settings (these are configuration values, not sensors)
      if (/hc1.*set|hc1.*soll|heating.*circuit.*1.*set/i.test(entityId)) {
        return false;
      }
      // Include room, outside, flow, return, and other actual temperature sensors
      return true;
    });
    
    // For graph, prioritize key temperatures: room, outside, flow, return
    const graphSensors = this._getKeyTemperatureSensors(tempSensors);
    
    return html`
      <div class="section">
        <div class="section-title">Temperatures</div>
        ${this.config.show_temperature_graph && graphSensors.length > 0 ? this._renderTemperatureGraph(graphSensors) : ''}
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

  _getKeyTemperatureSensors(allTempSensors) {
    // Prioritize specific temperature types for the graph
    const priorities = [
      { pattern: /room.*temp|raum.*temp|indoor/i, found: null },
      { pattern: /outside.*temp|outdoor|au[sß]en.*temp|ambient/i, found: null },
      { pattern: /flow.*temp|vorlauf.*temp|supply/i, found: null },
      { pattern: /return.*temp|r[üu]cklauf.*temp/i, found: null },
    ];
    
    // Find matches for each priority
    allTempSensors.forEach(entityId => {
      const entity = this.hass.states[entityId];
      if (!entity) return;
      
      const fullName = (entityId + ' ' + (entity.attributes.friendly_name || '')).toLowerCase();
      
      priorities.forEach(priority => {
        if (!priority.found && priority.pattern.test(fullName)) {
          priority.found = entityId;
        }
      });
    });
    
    // Return found sensors, then fill with remaining sensors if needed
    const keySensors = priorities.filter(p => p.found).map(p => p.found);
    const remainingSensors = allTempSensors.filter(id => !keySensors.includes(id));
    
    return [...keySensors, ...remainingSensors].slice(0, 4);
  }

  _renderStatusBadge() {
    // Find status/state sensors - broaden search patterns
    // Look for: state, status, mode, operation, betrieb, zustand
    const statusSensors = this._findEntitiesByPattern(/state|status|mode|betrieb|operation|operating|zustand/i, 'sensor');
    
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
      statusIcon = '⭕';
    }

    return html`
      <div class="status-badge ${statusClass}">
        <span class="status-icon">${statusIcon}</span>
        <span class="status-text">${state}</span>
      </div>
    `;
  }

  _renderStatistics() {
    // Find various statistics sensors - broaden search patterns
    const runtimeSensors = this._findEntitiesByPattern(/runtime|laufzeit|operating.*time|betriebszeit|hours|stunden/i, 'sensor');
    const energySensors = this._findEntitiesByPattern(/energy|energie|consumption|verbrauch|kwh/i, 'sensor');
    const copSensors = this._findEntitiesByPattern(/cop|efficiency|wirkungsgrad|coefficient/i, 'sensor');
    const compressorSensors = this._findEntitiesByPattern(/compressor|verdichter|starts|cycles/i, 'sensor');

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
    
    return this._renderHistoryGraph(sensorsToGraph, `Temperature History (${this.config.graph_hours || 24}h)`, 'temperature');
  }

  /**
   * Creates an embedded HA history-graph card for displaying sensor history
   * Uses Home Assistant's card helpers for reliable graph display
   */
  _renderHistoryGraph(entityIds, title, graphKey) {
    // Validate entityIds is non-empty
    if (!entityIds || entityIds.length === 0) {
      return '';
    }
    
    const hours = this.config.graph_hours || 24;
    
    // Create entities config for history-graph
    const entities = entityIds.map(entityId => {
      const entity = this.hass.states[entityId];
      const name = entity ? this._getEntityName(entity) : entityId;
      return { entity: entityId, name: name };
    });
    
    // Create the history-graph card using HA's card helpers
    const cardConfig = {
      type: 'history-graph',
      entities: entities,
      hours_to_show: hours,
      refresh_interval: 0
    };
    
    // Cache key for the card to avoid recreation on every render
    const cacheKey = graphKey || entityIds.join(',');
    
    // Create or get cached card element
    if (!this._graphCards[cacheKey]) {
      this._graphCards[cacheKey] = createThing(cardConfig);
    }
    
    const card = this._graphCards[cacheKey];
    card.hass = this.hass;
    card.setConfig(cardConfig);
    
    return html`
      <div class="history-graph-container">
        <div class="graph-title">${title}</div>
        <div class="graph-card-wrapper">${card}</div>
      </div>
    `;
  }

  _renderFanSection() {
    // Find fan-related sensors - broaden search patterns
    const fanSensors = this._findEntitiesByPattern(/fan|l[üu]fter|ventilat|speed|rpm|drehzahl/i, 'sensor');
    
    // Always show the Fan Values section
    return html`
      <div class="section">
        <div class="section-title">Fan Values</div>
        ${this.config.show_fan_graph && fanSensors.length > 0 ? this._renderFanGraph(fanSensors) : ''}
        ${fanSensors.length > 0 ? html`
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
        ` : html`
          <div class="no-data">No fan sensors found</div>
        `}
      </div>
    `;
  }

  _renderFanGraph(fanSensors) {
    const sensorsToGraph = fanSensors.slice(0, 4);
    
    if (sensorsToGraph.length === 0) {
      return '';
    }
    
    return this._renderHistoryGraph(sensorsToGraph, `Fan History (${this.config.graph_hours || 24}h)`, 'fan');
  }

  _renderHeatingDetailsSection() {
    // Find heating detail sensors - broaden search to include more patterns
    // Look for: booster, pump, circuit pump, heating power, compressor, stage
    const heatingDetailSensors = this._findEntitiesByPattern(
      /booster|pump|circuit.*pump|power|integral|heizleistung|leistung|compressor|verdichter|stage|stufe/i, 
      'sensor'
    );
    
    // Filter out energy consumption (that goes in energy section) and temperature sensors
    const filteredSensors = heatingDetailSensors.filter(entityId => {
      const lowerEntityId = entityId.toLowerCase();
      // Exclude total energy consumption and temperatures
      return !(/total.*energy|daily.*energy|temperature|temp/.test(lowerEntityId));
    });
    
    // Always show the Heating Details section
    return html`
      <div class="section">
        <div class="section-title">Heating Details</div>
        ${this.config.show_heating_details_graph && filteredSensors.length > 0 ? this._renderHeatingDetailsGraph(filteredSensors) : ''}
        ${filteredSensors.length > 0 ? html`
          <div class="sensor-grid">
            ${filteredSensors.slice(0, 6).map(entityId => {
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
        ` : html`
          <div class="no-data">No heating detail sensors found</div>
        `}
      </div>
    `;
  }

  _renderEnergySection() {
    // Find energy and power related sensors - broaden search patterns
    const powerSensors = this._findEntitiesByPattern(/power|leistung|watt|kw/i, 'sensor');
    const energySensors = this._findEntitiesByPattern(/energy|energie|consumption|verbrauch|kwh/i, 'sensor');
    const copSensors = this._findEntitiesByPattern(/cop|efficiency|wirkungsgrad|coefficient/i, 'sensor');

    // Combine and deduplicate sensors (some entities might match multiple patterns)
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
    
    return this._renderHistoryGraph(sensorsToGraph, `Heating Details History (${this.config.graph_hours || 24}h)`, 'heating-details');
  }

  _renderModeSection() {
    // Find mode/operation related entities - broaden search
    const modeSelects = this._findEntitiesByPattern(/mode|betriebsart|operation|operating/i, 'select');
    
    // Also look for binary sensors or sensors that might indicate mode
    const modeSensors = this._findEntitiesByPattern(/mode|betriebsart|operation|operating|state|status/i, 'sensor');
    
    // Always show the Operation Mode section
    return html`
      <div class="section">
        <div class="section-title">Operation Mode</div>
        ${modeSelects.length > 0 ? html`
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
        ` : ''}
        ${modeSensors.length > 0 ? html`
          <div class="sensor-grid" style="margin-top: ${modeSelects.length > 0 ? '12px' : '0'}">
            ${modeSensors.slice(0, 4).map(entityId => {
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
        ` : ''}
        ${modeSelects.length === 0 && modeSensors.length === 0 ? html`
          <div class="no-data">No operation mode controls found</div>
        ` : ''}
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
    const dhwSensors = this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i, 'sensor');
    
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
        ${dhwSensors.length > 0 ? html`
          <div class="sensor-grid" style="margin-top: 12px;">
            ${dhwSensors.slice(0, 4).map(entityId => {
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
        ` : ''}
      </div>
    `;
  }

  _renderCoolingSection() {
    // Find cooling related entities (switches, numbers, sensors)
    const coolingSwitches = this._findEntitiesByPattern(/cooling|k[üu]hl/i, 'switch');
    const coolingNumbers = this._findEntitiesByPattern(/cooling|k[üu]hl/i, 'number');
    const coolingSensors = this._findEntitiesByPattern(/cooling|k[üu]hl/i, 'sensor');
    const coolingSelects = this._findEntitiesByPattern(/cooling|k[üu]hl/i, 'select');
    
    // If no cooling entities found, don't show the section
    if (coolingSwitches.length === 0 && coolingNumbers.length === 0 && 
        coolingSensors.length === 0 && coolingSelects.length === 0) {
      return '';
    }
    
    return html`
      <div class="section cooling-section">
        <div class="section-title">❄️ Cooling</div>
        <div class="control-grid">
          ${coolingSwitches.slice(0, 2).map(entityId => {
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
          ${coolingSelects.slice(0, 2).map(entityId => {
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
          ${coolingNumbers.slice(0, 2).map(entityId => {
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
        ${coolingSensors.length > 0 ? html`
          <div class="sensor-grid" style="margin-top: 12px;">
            ${coolingSensors.slice(0, 4).map(entityId => {
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
        ` : ''}
      </div>
    `;
  }

  _renderAdditionalControls() {
    // Find any remaining important switches (excluding cooling which has its own section)
    const allOtherSwitches = this._findEntitiesByPattern(/emergency|party|holiday|vacation|urlaub/i, 'switch');
    // Filter out cooling switches as they now have their own section
    const otherSwitches = allOtherSwitches.filter(entityId => 
      !/cooling|k[üu]hl/i.test(entityId)
    );
    
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

  _renderErrorSection() {
    // Find error, alarm, or fault related sensors
    const errorPattern = /error|alarm|fault|fehler|st[öo]rung|warnung/i;
    const errorSensors = this._findEntitiesByPattern(errorPattern, 'sensor');
    const errorBinarySensors = this._findEntitiesByPattern(errorPattern, 'binary_sensor');
    
    const allErrorEntities = [...errorSensors, ...errorBinarySensors];
    
    if (allErrorEntities.length === 0) return '';

    // Check if any errors are active
    const activeErrors = allErrorEntities.filter(entityId => {
      const entity = this.hass.states[entityId];
      if (!entity) return false;
      
      return this._isErrorState(entity.state);
    });

    // Only show section if there are errors or if configured to always show
    if (activeErrors.length === 0 && !this.config.show_errors_always) {
      return '';
    }

    const hasErrors = activeErrors.length > 0;

    return html`
      <div class="section error-section ${hasErrors ? 'has-errors' : ''}">
        <div class="section-title">
          ${hasErrors ? '⚠️ Alerts & Errors' : '✓ System Status'}
        </div>
        ${!hasErrors ? html`
          <div class="no-errors">
            <span class="success-icon">✓</span>
            <span>No errors or warnings detected</span>
          </div>
        ` : html`
          <div class="error-list">
            ${activeErrors.map(entityId => {
              const entity = this.hass.states[entityId];
              if (!entity) return '';
              
              const name = this._getEntityName(entity);
              const value = entity.state;
              
              return html`
                <div class="error-item">
                  <div class="error-icon">⚠️</div>
                  <div class="error-content">
                    <div class="error-name">${name}</div>
                    <div class="error-value">${value}</div>
                  </div>
                </div>
              `;
            })}
          </div>
        `}
      </div>
    `;
  }

  _isErrorState(state) {
    const lowerState = state.toLowerCase();
    // Check for explicit error/alarm states
    const errorStates = ['on', 'true', 'active', 'problem', 'alarm', 'error', 'fault'];
    return errorStates.includes(lowerState);
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
        
        // Check pattern - now also check the entity name part after the domain
        const entityName = entityId.includes('.') ? entityId.split('.')[1] : entityId;
        const friendlyName = entity.attributes.friendly_name || '';
        
        // Test against entity ID, entity name (without domain), and friendly name
        return pattern.test(entityId) || 
               pattern.test(entityName) || 
               pattern.test(friendlyName);
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
      /* History Graph Container - using HA's built-in history-graph card */
      .history-graph-container {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--secondary-background-color);
        border-radius: 8px;
      }

      .history-graph-container .graph-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .history-graph-container hui-history-graph-card {
        --ha-card-background: transparent;
        --ha-card-box-shadow: none;
        --ha-card-border-width: 0;
      }

      /* Error Section Styles */
      .error-section {
        border-color: var(--divider-color);
      }

      .error-section.has-errors {
        border-color: #ff9800;
        border-width: 2px;
        background: rgba(255, 152, 0, 0.05);
      }

      .no-errors {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px;
        color: #4caf50;
        font-size: 14px;
        justify-content: center;
        background: rgba(76, 175, 80, 0.05);
        border-radius: 4px;
      }

      .success-icon {
        font-size: 20px;
        font-weight: bold;
      }

      .error-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .error-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px;
        background: rgba(255, 152, 0, 0.1);
        border: 1px solid #ff9800;
        border-radius: 4px;
      }

      .error-icon {
        font-size: 20px;
        line-height: 1;
      }

      .error-content {
        flex: 1;
        min-width: 0;
      }

      .error-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
        margin-bottom: 4px;
      }

      .error-value {
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      .no-data {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 14px;
        font-style: italic;
      }

      .cooling-section {
        border-color: #2196f3;
        background: rgba(33, 150, 243, 0.03);
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
