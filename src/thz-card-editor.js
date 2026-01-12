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
        <div class="option">
          <label for="entity">Entity (optional - auto-discover THZ entities)</label>
          <input
            id="entity"
            type="text"
            .value=${this.config.entity || ''}
            @change=${this._entityChanged}
            placeholder="Leave empty to auto-discover">
        </div>

        <div class="option">
          <label for="name">Name</label>
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
      </div>
    `;
  }

  _entityChanged(ev) {
    const newConfig = { ...this.config };
    newConfig.entity = ev.target.value;
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

      input[type="checkbox"] {
        margin-right: 8px;
      }
    `;
  }
}

customElements.define('thz-card-editor', ThzCardEditor);
