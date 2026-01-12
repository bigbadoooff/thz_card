import { LitElement, html, css } from 'lit';

class ThzCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    this.config = config;
  }

  render() {
    if (!this.hass || !this.config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div class="info-box">
          <div class="info-title">ℹ️ Auto-Discovery</div>
          <div class="info-text">
            This card automatically discovers THZ/Tecalor/LWZ heat pump entities.
            If auto-discovery doesn't work, specify a device or entity filter below.
          </div>
        </div>

        <div class="option">
          <label for="device">Device (optional - for manual selection)</label>
          <ha-device-picker
            id="device"
            .hass=${this.hass}
            .value=${this.config.device_id || ''}
            @value-changed=${this._deviceChanged}
            allow-custom-entity>
          </ha-device-picker>
        </div>

        <div class="option">
          <label for="entity_filter">Entity Filter (optional - e.g., "my_heatpump")</label>
          <input
            id="entity_filter"
            type="text"
            .value=${this.config.entity_filter || ''}
            @change=${this._entityFilterChanged}
            placeholder="Leave empty for auto-discovery">
        </div>

        <div class="option">
          <label for="name">Card Name</label>
          <input
            id="name"
            type="text"
            .value=${this.config.name || 'Heat Pump'}
            @change=${this._nameChanged}>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_temperature !== false}
              @change=${this._toggleTemperature}>
            Show Temperature Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_temperature_graph !== false}
              @change=${this._toggleTemperatureGraph}>
            Show Temperature Graph
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_fan_graph !== false}
              @change=${this._toggleFanGraph}>
            Show Fan Graph
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_heating_details_graph !== false}
              @change=${this._toggleHeatingDetailsGraph}>
            Show Heating Details Graph
          </label>
        </div>

        <div class="option">
          <label for="graph_hours">Graph Time Range (hours)</label>
          <input
            id="graph_hours"
            type="number"
            min="1"
            max="168"
            .value=${this.config.graph_hours || 24}
            @change=${this._graphHoursChanged}>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_mode !== false}
              @change=${this._toggleMode}>
            Show Mode Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_heating_circuit !== false}
              @change=${this._toggleHeatingCircuit}>
            Show Heating Circuit Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_hot_water !== false}
              @change=${this._toggleHotWater}>
            Show Hot Water Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_status !== false}
              @change=${this._toggleStatus}>
            Show Status Badge
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_statistics !== false}
              @change=${this._toggleStatistics}>
            Show Statistics Dashboard
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_energy !== false}
              @change=${this._toggleEnergy}>
            Show Energy & Efficiency Section
          </label>
        </div>

        <div class="option">
          <label>
            <input
              type="checkbox"
              .checked=${this.config.show_errors_always === true}
              @change=${this._toggleErrorsAlways}>
            Always Show Error Section (even when no errors)
          </label>
        </div>
      </div>
    `;
  }

  _deviceChanged(ev) {
    const newConfig = { ...this.config };
    newConfig.device_id = ev.detail.value;
    this._updateConfig(newConfig);
  }

  _entityFilterChanged(ev) {
    const newConfig = { ...this.config };
    newConfig.entity_filter = ev.target.value;
    this._updateConfig(newConfig);
  }

  _nameChanged(ev) {
    const newConfig = { ...this.config };
    newConfig.name = ev.target.value;
    this._updateConfig(newConfig);
  }

  _toggleTemperature(ev) {
    const newConfig = { ...this.config };
    newConfig.show_temperature = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _toggleTemperatureGraph(ev) {
    const newConfig = { ...this.config };
    newConfig.show_temperature_graph = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _toggleFanGraph(ev) {
    const newConfig = { ...this.config };
    newConfig.show_fan_graph = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _toggleHeatingDetailsGraph(ev) {
    const newConfig = { ...this.config };
    newConfig.show_heating_details_graph = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _graphHoursChanged(ev) {
    const newConfig = { ...this.config };
    const hours = parseInt(ev.target.value);
    if (!isNaN(hours) && hours >= 1 && hours <= 168) {
      newConfig.graph_hours = hours;
      this._updateConfig(newConfig);
    }
  }

  _toggleMode(ev) {
    const newConfig = { ...this.config };
    newConfig.show_mode = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _toggleHeatingCircuit(ev) {
    const newConfig = { ...this.config };
    newConfig.show_heating_circuit = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _toggleHotWater(ev) {
    const newConfig = { ...this.config };
    newConfig.show_hot_water = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _toggleStatus(ev) {
    const newConfig = { ...this.config };
    newConfig.show_status = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _toggleStatistics(ev) {
    const newConfig = { ...this.config };
    newConfig.show_statistics = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _toggleEnergy(ev) {
    const newConfig = { ...this.config };
    newConfig.show_energy = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _toggleErrorsAlways(ev) {
    const newConfig = { ...this.config };
    newConfig.show_errors_always = ev.target.checked;
    this._updateConfig(newConfig);
  }

  _updateConfig(newConfig) {
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }

      .info-box {
        background: var(--secondary-background-color);
        border-left: 4px solid var(--primary-color);
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 8px;
      }

      .info-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 8px;
      }

      .info-text {
        font-size: 13px;
        color: var(--secondary-text-color);
        line-height: 1.5;
      }

      .option {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      label {
        font-size: 14px;
        color: var(--primary-text-color);
        cursor: pointer;
      }

      .option label {
        display: flex;
        align-items: center;
      }

      input[type="text"] {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      input[type="text"]:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      input[type="number"] {
        padding: 8px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
      }

      input[type="number"]:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      ha-entity-picker {
        width: 100%;
      }

      ha-device-picker {
        width: 100%;
      }

      input[type="checkbox"] {
        margin-right: 8px;
      }
    `;
  }
}

customElements.define('thz-card-editor', ThzCardEditor);
