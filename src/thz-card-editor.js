import { LitElement, html, css } from 'lit';

class ThzCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _discoveredEntities: { type: Object },
      _expandedSections: { type: Object },
      _searchFilter: { type: String },
    };
  }

  constructor() {
    super();
    this._discoveredEntities = {};
    this._expandedSections = {};
    this._searchFilter = '';
  }

  setConfig(config) {
    this.config = config;
    // Initialize selected_entities if not present
    if (!this.config.selected_entities) {
      this.config.selected_entities = this._getEmptySelectedEntities();
    }
    // Discover entities when config is set
    this._discoverEntities();
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
              .checked=${this.config.show_cooling !== false}
              @change=${this._toggleCooling}>
            Show Cooling Section
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

        <!-- Entity Selection Section -->
        <div class="entity-selection-section">
          <div class="section-header">
            <div class="section-title">🔍 Entity Selection</div>
            <button class="refresh-button" @click=${this._refreshEntities}>
              🔄 Refresh Entity List
            </button>
          </div>
          
          <div class="search-box">
            <input
              type="text"
              placeholder="Search entities..."
              .value=${this._searchFilter}
              @input=${this._handleSearchFilter}>
          </div>

          ${this._renderEntitySection('temperature', '🌡️ Temperature Sensors')}
          ${this._renderEntitySection('mode', '⚙️ Operation Mode')}
          ${this._renderEntitySection('heating_circuit', '🔥 Heating Circuit')}
          ${this._renderEntitySection('hot_water', '💧 Hot Water')}
          ${this._renderEntitySection('cooling', '❄️ Cooling')}
          ${this._renderEntitySection('additional', '➕ Additional Controls')}
        </div>
      </div>
    `;
  }

  _renderEntitySection(section, title) {
    const entities = this._discoveredEntities[section] || [];
    const filteredEntities = this._filterEntities(entities);
    const selectedCount = (this.config.selected_entities?.[section] || []).length;
    const totalCount = entities.length;
    const isExpanded = this._expandedSections[section];

    if (totalCount === 0) {
      return html``;
    }

    return html`
      <div class="entity-section">
        <div class="entity-section-header" @click=${() => this._toggleSection(section)}>
          <span class="expand-icon">${isExpanded ? '▼' : '▶'}</span>
          <span class="entity-section-title">${title}</span>
          <span class="entity-count">(${selectedCount} of ${totalCount} selected)</span>
        </div>
        
        ${isExpanded ? html`
          <div class="entity-section-content">
            <div class="section-actions">
              <button class="action-button" @click=${(e) => this._handleSectionAction(e, () => this._selectAllInSection(section))}>
                Select All
              </button>
              <button class="action-button" @click=${(e) => this._handleSectionAction(e, () => this._deselectAllInSection(section))}>
                Deselect All
              </button>
            </div>
            
            <div class="entity-list">
              ${filteredEntities.length === 0 ? html`
                <div class="no-entities">No entities match your search</div>
              ` : filteredEntities.map(entityId => this._renderEntityRow(section, entityId))}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderEntityRow(section, entityId) {
    const isSelected = this._isEntitySelected(section, entityId);
    const icon = this._getEntityIcon(entityId);
    const name = this._getEntityName(entityId);
    const state = this._getEntityState(entityId);

    return html`
      <div class="entity-row ${isSelected ? 'selected' : ''}">
        <label class="entity-label">
          <input
            type="checkbox"
            .checked=${isSelected}
            @change=${() => this._toggleEntity(section, entityId)}>
          <span class="entity-icon">${icon}</span>
          <span class="entity-info">
            <span class="entity-name">${name}</span>
            <span class="entity-id">${entityId}</span>
          </span>
          <span class="entity-state">${state}</span>
        </label>
      </div>
    `;
  }

  _deviceChanged(ev) {
    const newConfig = { ...this.config };
    newConfig.device_id = ev.detail.value;
    this._updateConfig(newConfig);
    // Re-discover entities when device changes
    setTimeout(() => this._discoverEntities(), 100);
  }

  _entityFilterChanged(ev) {
    const newConfig = { ...this.config };
    newConfig.entity_filter = ev.target.value;
    this._updateConfig(newConfig);
    // Re-discover entities when filter changes
    setTimeout(() => this._discoverEntities(), 100);
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

  _toggleCooling(ev) {
    const newConfig = { ...this.config };
    newConfig.show_cooling = ev.target.checked;
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

  _discoverEntities() {
    if (!this.hass) return;

    const discovered = {
      temperature: [],
      mode: [],
      heating_circuit: [],
      hot_water: [],
      cooling: [],
      additional: [],
    };

    // Helper function to find entities (copied from main card logic)
    const findEntitiesByPattern = (pattern, domain = null) => {
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
          if (!entity || !entity.attributes) return false;
          
          if (deviceEntityIds && !deviceEntityIds.includes(entityId)) {
            return false;
          }
          
          if (this.config.entity_filter && !entityId.toLowerCase().includes(this.config.entity_filter.toLowerCase())) {
            return false;
          }
          
          const skipTHZCheck = this.config.entity_filter || this.config.device_id;
          const matchesTHZ = skipTHZCheck || 
                            entityId.toLowerCase().includes('thz') || 
                            entityId.toLowerCase().includes('tecalor') ||
                            entityId.toLowerCase().includes('lwz') ||
                            entity.attributes.integration === 'thz' ||
                            (entity.attributes.device_class && 
                             JSON.stringify(entity.attributes).toLowerCase().includes('thz'));
          
          if (!matchesTHZ) return false;
          
          if (domain && !entityId.startsWith(domain + '.')) return false;
          
          const entityName = entityId.includes('.') ? entityId.split('.')[1] : entityId;
          const friendlyName = entity.attributes.friendly_name || '';
          
          return pattern.test(entityId) || 
                 pattern.test(entityName) || 
                 pattern.test(friendlyName);
        })
        .map(([entityId]) => entityId);
    };

    // Temperature sensors
    const allTempSensors = findEntitiesByPattern(/temperature|temp/i, 'sensor');
    discovered.temperature = allTempSensors.filter(entityId => {
      // Exclude HC1 settings
      if (/hc1.*set|hc1.*soll|heating.*circuit.*1.*set/i.test(entityId)) {
        return false;
      }
      return true;
    });

    // Mode entities (consistent order: selects first, then sensors)
    const modeSelects = findEntitiesByPattern(/mode|betriebsart|operation|operating/i, 'select');
    const modeSensors = findEntitiesByPattern(/mode|betriebsart|operation|operating|state|status/i, 'sensor');
    discovered.mode = [...modeSelects, ...modeSensors];

    // Heating circuit entities (consistent order: switches, then numbers)
    const hcSwitches = findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i, 'switch');
    const hcNumbers = findEntitiesByPattern(/hc1|heating.*circuit.*1|heizkreis.*1/i, 'number');
    discovered.heating_circuit = [...hcSwitches, ...hcNumbers];

    // Hot water entities (consistent order: switches, numbers, then sensors)
    const dhwSwitches = findEntitiesByPattern(/dhw|hot.*water|warmwasser/i, 'switch');
    const dhwNumbers = findEntitiesByPattern(/dhw|hot.*water|warmwasser/i, 'number');
    const dhwSensors = findEntitiesByPattern(/dhw|hot.*water|warmwasser/i, 'sensor');
    discovered.hot_water = [...dhwSwitches, ...dhwNumbers, ...dhwSensors];

    // Cooling entities (consistent order: switches, numbers, sensors, then selects)
    const coolingSwitches = findEntitiesByPattern(/cooling|k[üu]hl/i, 'switch');
    const coolingNumbers = findEntitiesByPattern(/cooling|k[üu]hl/i, 'number');
    const coolingSensors = findEntitiesByPattern(/cooling|k[üu]hl/i, 'sensor');
    const coolingSelects = findEntitiesByPattern(/cooling|k[üu]hl/i, 'select');
    discovered.cooling = [...coolingSwitches, ...coolingNumbers, ...coolingSensors, ...coolingSelects];

    // Additional controls
    const allOtherSwitches = findEntitiesByPattern(/emergency|party|holiday|vacation|urlaub/i, 'switch');
    discovered.additional = allOtherSwitches.filter(entityId => 
      !/cooling|k[üu]hl/i.test(entityId)
    );

    this._discoveredEntities = discovered;
  }

  _getEmptySelectedEntities() {
    return {
      temperature: [],
      mode: [],
      heating_circuit: [],
      hot_water: [],
      cooling: [],
      additional: [],
    };
  }

  _getEntityDomain(entityId) {
    return entityId.split('.')[0];
  }

  _getEntityIcon(entityId) {
    const domain = this._getEntityDomain(entityId);
    const icons = {
      'sensor': '📊',
      'switch': '🔘',
      'number': '🔢',
      'select': '📋',
      'binary_sensor': '⚫',
    };
    return icons[domain] || '❓';
  }

  _getEntityName(entityId) {
    const entity = this.hass.states[entityId];
    if (!entity) return entityId;
    return entity.attributes.friendly_name || entityId.split('.')[1] || 'Unknown';
  }

  _getEntityState(entityId) {
    const entity = this.hass.states[entityId];
    if (!entity) return 'unavailable';
    const unit = entity.attributes.unit_of_measurement || '';
    return `${entity.state}${unit}`;
  }

  _isEntitySelected(section, entityId) {
    return this.config.selected_entities?.[section]?.includes(entityId) || false;
  }

  _toggleEntity(section, entityId) {
    const newConfig = { ...this.config };
    if (!newConfig.selected_entities) {
      newConfig.selected_entities = this._getEmptySelectedEntities();
    }
    
    const selected = newConfig.selected_entities[section] || [];
    const index = selected.indexOf(entityId);
    
    if (index === -1) {
      // Add entity
      newConfig.selected_entities[section] = [...selected, entityId];
    } else {
      // Remove entity
      newConfig.selected_entities[section] = selected.filter(id => id !== entityId);
    }
    
    this._updateConfig(newConfig);
  }

  _selectAllInSection(section) {
    const newConfig = { ...this.config };
    if (!newConfig.selected_entities) {
      newConfig.selected_entities = this._getEmptySelectedEntities();
    }
    
    newConfig.selected_entities[section] = [...(this._discoveredEntities[section] || [])];
    this._updateConfig(newConfig);
  }

  _deselectAllInSection(section) {
    const newConfig = { ...this.config };
    if (!newConfig.selected_entities) {
      newConfig.selected_entities = this._getEmptySelectedEntities();
    }
    
    newConfig.selected_entities[section] = [];
    this._updateConfig(newConfig);
  }

  _handleSectionAction(e, callback) {
    e.stopPropagation();
    callback();
  }

  _toggleSection(section) {
    this._expandedSections = {
      ...this._expandedSections,
      [section]: !this._expandedSections[section],
    };
    this.requestUpdate();
  }

  _refreshEntities() {
    this._discoverEntities();
    this.requestUpdate();
  }

  _handleSearchFilter(ev) {
    this._searchFilter = ev.target.value.toLowerCase();
    this.requestUpdate();
  }

  _filterEntities(entities) {
    if (!this._searchFilter) return entities;
    return entities.filter(entityId => {
      const name = this._getEntityName(entityId).toLowerCase();
      return name.includes(this._searchFilter) || entityId.toLowerCase().includes(this._searchFilter);
    });
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

      /* Entity Selection Styles */
      .entity-selection-section {
        margin-top: 24px;
        padding: 16px;
        background: var(--card-background-color);
        border-radius: 8px;
        border: 1px solid var(--divider-color);
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .section-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .refresh-button {
        padding: 8px 16px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: opacity 0.2s;
      }

      .refresh-button:hover {
        opacity: 0.8;
      }

      .search-box {
        margin-bottom: 16px;
      }

      .search-box input {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-size: 14px;
        box-sizing: border-box;
      }

      .search-box input:focus {
        outline: none;
        border-color: var(--primary-color);
      }

      .entity-section {
        margin-bottom: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        overflow: hidden;
        background: var(--secondary-background-color);
      }

      .entity-section-header {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        cursor: pointer;
        background: var(--secondary-background-color);
        transition: background 0.2s;
        user-select: none;
      }

      .entity-section-header:hover {
        background: var(--card-background-color);
      }

      .expand-icon {
        margin-right: 8px;
        font-size: 12px;
        transition: transform 0.2s;
      }

      .entity-section-title {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .entity-count {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-left: 8px;
      }

      .entity-section-content {
        padding: 12px 16px;
        background: var(--card-background-color);
      }

      .section-actions {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
      }

      .action-button {
        padding: 6px 12px;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        transition: background 0.2s;
      }

      .action-button:hover {
        background: var(--primary-color);
        color: white;
      }

      .entity-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .entity-row {
        padding: 8px 12px;
        border-radius: 4px;
        transition: background 0.2s;
      }

      .entity-row:hover {
        background: var(--secondary-background-color);
      }

      .entity-row.selected {
        background: rgba(var(--rgb-primary-color), 0.1);
      }

      .entity-label {
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 100%;
      }

      .entity-icon {
        margin: 0 8px 0 4px;
        font-size: 16px;
      }

      .entity-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      .entity-name {
        font-size: 14px;
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .entity-id {
        font-size: 11px;
        color: var(--secondary-text-color);
        font-family: monospace;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .entity-state {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-left: 12px;
        white-space: nowrap;
      }

      .no-entities {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 13px;
      }
    `;
  }
}

customElements.define('thz-card-editor', ThzCardEditor);
