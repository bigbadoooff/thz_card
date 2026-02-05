import { LitElement, html, css } from 'lit';
import { createThing } from 'custom-card-helpers';
import { findEntitiesByPattern } from './utils.js';
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

    // Check if we have selected entities for temperature
    const selectedEntities = this._getEntitiesForSection('temperature');
    
    let tempSensors;
    if (selectedEntities) {
      // Use selected entities
      tempSensors = selectedEntities;
    } else {
      // Fall back to auto-discovery
      // Find specific temperature sensors (excluding HC1 settings)
      // Focus on: room temp, outside temp, flow temp, return temp
      const allTempSensors = this._findEntitiesByPattern(/temperature|temp/i, 'sensor');
      
      // Filter out HC1 settings - only keep actual temperature readings
      tempSensors = allTempSensors.filter(entityId => {
        // Exclude HC1 settings (these are configuration values, not sensors)
        if (/hc1.*set|hc1.*soll|heating.*circuit.*1.*set/i.test(entityId)) {
          return false;
        }
        // Include room, outside, flow, return, and other actual temperature sensors
        return true;
      });
    }
    
    // For graph, prioritize key temperatures: room, outside, flow, return
    const graphSensors = this._getKeyTemperatureSensors(tempSensors);
    
    return html`
      <div class="section">
        <div class="section-title">
          <span class="section-title-icon">🌡️</span>
          <span>Temperatures</span>
        </div>
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
        <div class="section-title">
          <span class="section-title-icon">💨</span>
          <span>Fan Values</span>
        </div>
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
        <div class="section-title">
          <span class="section-title-icon">🔥</span>
          <span>Heating Details</span>
        </div>
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
        <div class="section-title">
          <span class="section-title-icon">⚡</span>
          <span>Energy & Efficiency</span>
        </div>
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
    // Check if we have selected entities for mode
    const selectedEntities = this._getEntitiesForSection('mode');
    
    let modeSelects, modeSensors;
    if (selectedEntities) {
      // Use selected entities, separating by domain
      modeSelects = selectedEntities.filter(id => id.startsWith('select.'));
      modeSensors = selectedEntities.filter(id => id.startsWith('sensor.'));
    } else {
      // Fall back to auto-discovery
      // Find mode/operation related entities - broaden search
      modeSelects = this._findEntitiesByPattern(/mode|betriebsart|operation|operating/i, 'select');
      // Also look for binary sensors or sensors that might indicate mode
      modeSensors = this._findEntitiesByPattern(/mode|betriebsart|operation|operating|state|status/i, 'sensor');
    }
    
    // Always show the Operation Mode section
    return html`
      <div class="section">
        <div class="section-title">
          <span class="section-title-icon">⚙️</span>
          <span>Operation Mode</span>
        </div>
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
    // Check if we have selected entities for heating circuit
    const selectedEntities = this._getEntitiesForSection('heating_circuit');
    
    let hcNumbers, hcSwitches;
    if (selectedEntities) {
      // Use selected entities, separating by domain
      hcNumbers = selectedEntities.filter(id => id.startsWith('number.'));
      hcSwitches = selectedEntities.filter(id => id.startsWith('switch.'));
    } else {
      // Fall back to auto-discovery
      // Find heating circuit related entities
      hcNumbers = this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i, 'number');
      hcSwitches = this._findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i, 'switch');
    }
    
    return html`
      <div class="section">
        <div class="section-title">
          <span class="section-title-icon">🔥</span>
          <span>Heating Circuit 1</span>
        </div>
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
                  <button 
                    class="number-control-button"
                    @click=${() => this._decrementNumber(entityId, step, min)}
                    ?disabled=${parseFloat(value) <= min}
                    aria-label="Decrease ${name}">
                    −
                  </button>
                  <input 
                    type="number" 
                    .value=${value}
                    min=${min}
                    max=${max}
                    step=${step}
                    @change=${(e) => this._handleNumberChange(entityId, e.target.value)}
                    @input=${(e) => this._validateNumberInput(e, min, max)}
                    aria-label="${name}">
                  <button 
                    class="number-control-button"
                    @click=${() => this._incrementNumber(entityId, step, max)}
                    ?disabled=${parseFloat(value) >= max}
                    aria-label="Increase ${name}">
                    +
                  </button>
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
    // Check if we have selected entities for hot water
    const selectedEntities = this._getEntitiesForSection('hot_water');
    
    let dhwSwitches, dhwNumbers, dhwSensors;
    if (selectedEntities) {
      // Use selected entities, separating by domain
      dhwSwitches = selectedEntities.filter(id => id.startsWith('switch.'));
      dhwNumbers = selectedEntities.filter(id => id.startsWith('number.'));
      dhwSensors = selectedEntities.filter(id => id.startsWith('sensor.'));
    } else {
      // Fall back to auto-discovery
      // Find hot water related entities
      dhwSwitches = this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i, 'switch');
      dhwNumbers = this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i, 'number');
      dhwSensors = this._findEntitiesByPattern(/dhw|hot.*water|warmwasser/i, 'sensor');
    }
    
    return html`
      <div class="section">
        <div class="section-title">
          <span class="section-title-icon">💧</span>
          <span>Hot Water</span>
        </div>
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
                  <button 
                    class="number-control-button"
                    @click=${() => this._decrementNumber(entityId, step, min)}
                    ?disabled=${parseFloat(value) <= min}
                    aria-label="Decrease ${name}">
                    −
                  </button>
                  <input 
                    type="number" 
                    .value=${value}
                    min=${min}
                    max=${max}
                    step=${step}
                    @change=${(e) => this._handleNumberChange(entityId, e.target.value)}
                    @input=${(e) => this._validateNumberInput(e, min, max)}
                    aria-label="${name}">
                  <button 
                    class="number-control-button"
                    @click=${() => this._incrementNumber(entityId, step, max)}
                    ?disabled=${parseFloat(value) >= max}
                    aria-label="Increase ${name}">
                    +
                  </button>
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
    // Check if we have selected entities for cooling
    const selectedEntities = this._getEntitiesForSection('cooling');
    
    let coolingSwitches, coolingNumbers, coolingSensors, coolingSelects;
    if (selectedEntities) {
      // Use selected entities, separating by domain
      coolingSwitches = selectedEntities.filter(id => id.startsWith('switch.'));
      coolingNumbers = selectedEntities.filter(id => id.startsWith('number.'));
      coolingSensors = selectedEntities.filter(id => id.startsWith('sensor.'));
      coolingSelects = selectedEntities.filter(id => id.startsWith('select.'));
    } else {
      // Fall back to auto-discovery
      // Find cooling related entities (switches, numbers, sensors)
      coolingSwitches = this._findEntitiesByPattern(/cooling|k[üu]hl/i, 'switch');
      coolingNumbers = this._findEntitiesByPattern(/cooling|k[üu]hl/i, 'number');
      coolingSensors = this._findEntitiesByPattern(/cooling|k[üu]hl/i, 'sensor');
      coolingSelects = this._findEntitiesByPattern(/cooling|k[üu]hl/i, 'select');
    }
    
    // If no cooling entities found, don't show the section
    if (coolingSwitches.length === 0 && coolingNumbers.length === 0 && 
        coolingSensors.length === 0 && coolingSelects.length === 0) {
      return '';
    }
    
    return html`
      <div class="section cooling-section">
        <div class="section-title">
          <span class="section-title-icon">❄️</span>
          <span>Cooling</span>
        </div>
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
                  <button 
                    class="number-control-button"
                    @click=${() => this._decrementNumber(entityId, step, min)}
                    ?disabled=${parseFloat(value) <= min}
                    aria-label="Decrease ${name}">
                    −
                  </button>
                  <input 
                    type="number" 
                    .value=${value}
                    min=${min}
                    max=${max}
                    step=${step}
                    @change=${(e) => this._handleNumberChange(entityId, e.target.value)}
                    @input=${(e) => this._validateNumberInput(e, min, max)}
                    aria-label="${name}">
                  <button 
                    class="number-control-button"
                    @click=${() => this._incrementNumber(entityId, step, max)}
                    ?disabled=${parseFloat(value) >= max}
                    aria-label="Increase ${name}">
                    +
                  </button>
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
    // Check if we have selected entities for additional controls
    const selectedEntities = this._getEntitiesForSection('additional');
    
    let otherSwitches;
    if (selectedEntities) {
      // Use selected entities
      otherSwitches = selectedEntities;
    } else {
      // Fall back to auto-discovery
      // Find any remaining important switches (excluding cooling which has its own section)
      const allOtherSwitches = this._findEntitiesByPattern(/emergency|party|holiday|vacation|urlaub/i, 'switch');
      // Filter out cooling switches as they now have their own section
      otherSwitches = allOtherSwitches.filter(entityId => 
        !/cooling|k[üu]hl/i.test(entityId)
      );
    }
    
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
          ${hasErrors ? html`
            <span class="section-title-icon">⚠️</span>
            <span>Alerts & Errors</span>
          ` : html`
            <span class="section-title-icon">✓</span>
            <span>System Status</span>
          `}
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
    return findEntitiesByPattern(this.hass, this.config, pattern, domain);
  }

  _getEntitiesForSection(section) {
    // If selected_entities config exists and has entities for this section, use those
    if (this.config.selected_entities && 
        this.config.selected_entities[section] && 
        this.config.selected_entities[section].length > 0) {
      // Filter to ensure entities still exist in Home Assistant
      return this.config.selected_entities[section].filter(entityId => 
        this.hass.states[entityId] !== undefined
      );
    }
    
    // Otherwise, fall back to auto-discovery
    return null;
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

  _incrementNumber(entityId, step, max) {
    const entity = this.hass.states[entityId];
    if (!entity) return;
    
    const currentValue = parseFloat(entity.state);
    const stepValue = parseFloat(step) || 1;
    const maxValue = parseFloat(max) || 100;
    
    if (isNaN(currentValue)) return;
    
    const newValue = Math.min(currentValue + stepValue, maxValue);
    this._handleNumberChange(entityId, newValue);
  }

  _decrementNumber(entityId, step, min) {
    const entity = this.hass.states[entityId];
    if (!entity) return;
    
    const currentValue = parseFloat(entity.state);
    const stepValue = parseFloat(step) || 1;
    const minValue = parseFloat(min) || 0;
    
    if (isNaN(currentValue)) return;
    
    const newValue = Math.max(currentValue - stepValue, minValue);
    this._handleNumberChange(entityId, newValue);
  }

  _validateNumberInput(event, min, max) {
    const input = event.target;
    const value = parseFloat(input.value);
    
    if (isNaN(value)) return;
    
    const minValue = parseFloat(min) || 0;
    const maxValue = parseFloat(max) || 100;
    
    // Clamp value between min and max
    if (value < minValue) {
      input.value = minValue;
    } else if (value > maxValue) {
      input.value = maxValue;
    }
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
        margin-bottom: 24px;
        padding: 4px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
      }

      .stat-item {
        background: linear-gradient(135deg, var(--card-background-color) 0%, var(--secondary-background-color) 100%);
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 18px 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .stat-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color, var(--primary-color)));
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .stat-item:hover::before {
        opacity: 1;
      }

      .stat-icon {
        font-size: 28px;
        line-height: 1;
        display: block;
        margin-bottom: 4px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .stat-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .stat-name {
        font-size: 12px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 600;
      }

      .stat-value {
        font-size: 28px;
        font-weight: 700;
        color: var(--primary-text-color);
        line-height: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* COP specific styling enhancements */
      .cop-excellent {
        border-color: #4caf50;
        background: linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.15) 100%);
      }

      .cop-excellent::before {
        background: #4caf50;
      }

      .cop-excellent .stat-value {
        color: #4caf50;
      }

      .cop-good {
        border-color: #8bc34a;
        background: linear-gradient(135deg, rgba(139, 195, 74, 0.05) 0%, rgba(139, 195, 74, 0.15) 100%);
      }

      .cop-good::before {
        background: #8bc34a;
      }

      .cop-good .stat-value {
        color: #8bc34a;
      }

      .cop-poor {
        border-color: #ff9800;
        background: linear-gradient(135deg, rgba(255, 152, 0, 0.05) 0%, rgba(255, 152, 0, 0.15) 100%);
      }

      .cop-poor::before {
        background: #ff9800;
      }

      .cop-poor .stat-value {
        color: #ff9800;
      }

      /* Mobile optimization for stats */
      @media (max-width: 600px) {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 24px; /* Increased from 20px */
        padding: 4px; /* Add slight padding to prevent shadow clipping */
      }

      .section {
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 18px;
        background: var(--card-background-color);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
        transition: all 0.3s ease;
        position: relative;
      }

      .section:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
        border-color: rgba(var(--primary-color-rgb, 3, 169, 244), 0.3);
      }

      .section-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 2px solid var(--divider-color);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .section-title-icon {
        font-size: 18px;
        line-height: 1;
      }

      /* Dark mode specific enhancements */
      @media (prefers-color-scheme: dark) {
        .section {
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05),
                      0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .section:hover {
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08),
                      0 4px 16px rgba(0, 0, 0, 0.4);
        }
        
        .section-title {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
      }

      /* Light mode specific enhancements */
      @media (prefers-color-scheme: light) {
        .section {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08),
                      0 2px 8px rgba(0, 0, 0, 0.04);
        }
        
        .section:hover {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12),
                      0 4px 12px rgba(0, 0, 0, 0.08);
        }
        
        .section-title {
          border-bottom-color: rgba(0, 0, 0, 0.08);
        }
      }

      .sensor-grid,
      .control-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 14px; /* Increased from 12px */
      }

      .sensor-item,
      .control-item {
        background: var(--secondary-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .sensor-item {
        cursor: default;
      }

      .sensor-item:hover {
        background: var(--card-background-color);
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }

      .sensor-name,
      .control-name {
        font-size: 13px;
        color: var(--secondary-text-color);
        font-weight: 500;
        line-height: 1.3;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .sensor-value {
        font-size: 20px;
        font-weight: 600;
        color: var(--primary-text-color);
        line-height: 1.2;
      }

      /* Mobile optimization */
      @media (max-width: 600px) {
        .sensor-grid,
        .control-grid {
          grid-template-columns: 1fr;
          gap: 12px;
        }
      }

      select {
        padding: 8px 32px 8px 8px;
        border: 2px solid var(--divider-color);
        border-radius: 8px;
        background: var(--card-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
      }

      select:hover {
        border-color: var(--primary-color);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
      }

      .switch-button {
        min-width: 60px;
        padding: 8px 16px;
        border: 2px solid transparent;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      .switch-button.on {
        background: var(--primary-color);
        color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }

      .switch-button.on:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      }

      .switch-button.off {
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        border-color: var(--divider-color);
      }

      .switch-button.off:hover {
        background: var(--divider-color);
        border-color: var(--primary-text-color);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .switch-button:active {
        transform: translateY(0);
      }

      .number-control {
        display: flex;
        align-items: center;
        background: var(--card-background-color);
        border: 2px solid var(--divider-color);
        border-radius: 28px;
        padding: 4px;
        gap: 6px;
        transition: all 0.2s ease;
        max-width: 200px;
      }

      .number-control:focus-within {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb, 3, 169, 244), 0.15);
      }

      .number-control-button {
        width: 36px;
        height: 36px;
        min-width: 36px;
        border-radius: 50%;
        border: none;
        background: var(--primary-color);
        color: white;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        line-height: 1;
        padding: 0;
      }

      .number-control-button:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(var(--primary-color-rgb, 3, 169, 244), 0.4);
      }

      .number-control-button:active {
        transform: scale(0.95);
      }

      .number-control-button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none;
      }

      .number-control input {
        border: none;
        background: transparent;
        text-align: center;
        flex: 1;
        min-width: 50px;
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        padding: 0;
      }

      .number-control input:focus {
        outline: none;
      }

      /* Remove number input spinners */
      .number-control input::-webkit-outer-spin-button,
      .number-control input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .number-control input[type=number] {
        -moz-appearance: textfield;
      }

      .number-control .unit {
        font-size: 13px;
        color: var(--secondary-text-color);
        padding-right: 8px;
        font-weight: 500;
        white-space: nowrap;
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
