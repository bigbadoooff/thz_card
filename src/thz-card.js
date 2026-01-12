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
    };
  }

  static getConfigElement() {
    return document.createElement('thz-card-editor');
  }

  static getStubConfig() {
    return {
      entity: '',
      name: 'Heat Pump',
      show_temperature: true,
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
    
    return Object.keys(this.hass.states).filter(entityId => {
      // Check if it belongs to the thz integration or matches pattern
      const entity = this.hass.states[entityId];
      if (!entity || !entity.attributes) return false;
      
      const matchesTHZ = entityId.includes('thz') || 
                        entity.attributes.integration === 'thz';
      
      if (!matchesTHZ) return false;
      
      // Check domain if specified
      if (domain && !entityId.startsWith(domain + '.')) return false;
      
      // Check pattern
      return pattern.test(entityId) || pattern.test(entity.attributes.friendly_name || '');
    });
  }

  _getEntityName(entity) {
    return entity.attributes.friendly_name || entity.entity_id.split('.')[1];
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
    this.hass.callService('number', 'set_value', {
      entity_id: entityId,
      value: parseFloat(value),
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
