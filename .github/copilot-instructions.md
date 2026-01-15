# GitHub Copilot Instructions for THZ Card

## Project Overview

THZ Card is a custom card for Home Assistant that provides a comprehensive interface to monitor and control Stiebel Eltron LWZ / Tecalor THZ heat pumps. The card is designed to work with the [THZ integration](https://github.com/bigbadoooff/thz) and is distributed via HACS (Home Assistant Community Store).

## Technology Stack

- **Framework**: Lit (v3.1.0) - A lightweight web components library
- **Language**: JavaScript (ES6+)
- **Build Tool**: Rollup (v4.9.6)
- **Package Manager**: npm
- **Target Environment**: Home Assistant Lovelace dashboard (browser-based)
- **Dependencies**:
  - `lit` - Component framework
  - `custom-card-helpers` - Home Assistant custom card utilities

## Project Structure

```
thz_card/
├── src/
│   ├── thz-card.js           # Main card component (~1720 lines)
│   └── thz-card-editor.js    # Visual configuration editor (~392 lines)
├── dist/
│   └── thz-card.js           # Built and minified bundle
├── .github/
│   └── copilot-instructions.md
├── package.json              # Dependencies and build scripts
├── rollup.config.mjs         # Rollup build configuration
├── hacs.json                 # HACS integration metadata
├── info.md                   # HACS info file
└── README.md                 # Documentation
```

## Development Workflow

### Build Commands

- `npm install` - Install dependencies
- `npm run build` - Build the card (produces dist/thz-card.js)
- `npm run watch` - Watch mode for development (auto-rebuild on changes)

### Build Process

The build process uses Rollup to:
1. Bundle the source files
2. Resolve node_modules dependencies
3. Minify the code with terser
4. Generate source maps for debugging

**Output**: A single `dist/thz-card.js` file that users load in Home Assistant.

## Coding Standards and Conventions

### General Principles

1. **ES6+ JavaScript**: Use modern JavaScript features (classes, arrow functions, template literals, etc.)
2. **Lit Components**: All components extend `LitElement` and use Lit's reactive properties
3. **Web Components**: Follow web components standards (custom elements, shadow DOM)
4. **Home Assistant Integration**: Utilize Home Assistant's APIs and patterns

### Lit Component Patterns

```javascript
// Define reactive properties
static get properties() {
  return {
    hass: { type: Object },      // Home Assistant object (always required)
    config: { type: Object },     // Card configuration
    _privateState: { type: Object }, // Private state (prefix with _)
  };
}

// Render method returns html template
render() {
  return html`
    <ha-card>
      <!-- Use Lit's html template literal -->
      <div class="card-content">
        ${this.renderSection()}
      </div>
    </ha-card>
  `;
}

// CSS is defined using css template literal
static get styles() {
  return css`
    :host {
      /* Component styles */
    }
  `;
}
```

### Home Assistant Specific Patterns

1. **Entity Access**: Access Home Assistant entities via `this.hass.states[entity_id]`
2. **Service Calls**: Call services using `this.hass.callService(domain, service, data)`
3. **History API**: Fetch historical data using `this.hass.callApi('GET', endpoint)`
4. **Configuration**: Implement `setConfig(config)` for card configuration
5. **Visual Editor**: Implement `getConfigElement()` static method to provide visual editor

### Code Style

- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Use single quotes for strings; use backticks for HTML templates with Lit
- **Template Literals**: Use `html` tagged template literals for Lit HTML
- **Naming Conventions**:
  - Private properties/methods: Prefix with underscore `_methodName`
  - Event handlers: Prefix with underscore `_handleClick`
  - Camel case for variables and methods
  - Pascal case for class names
- **Comments**: Add comments for complex logic, especially entity filtering and data transformations
- **Console Logging**: Use `console.info` for version info, minimize debug logs in production

### Entity Discovery Pattern

The card uses auto-discovery to find heat pump entities:

```javascript
// Look for entities containing specific keywords
const keywords = ['thz', 'tecalor', 'lwz'];
const entities = Object.keys(this.hass.states).filter(entityId => {
  const lowerEntityId = entityId.toLowerCase();
  return keywords.some(keyword => lowerEntityId.includes(keyword));
});
```

Alternative: Use `device_id` or `entity_filter` for manual selection.

### State Management

- Use Lit's reactive properties for state management
- Update state by reassigning properties (triggers re-render)
- Avoid direct DOM manipulation; let Lit handle rendering
- Cache computed data (like history data) to avoid unnecessary API calls

### Event Handling

```javascript
// Event handler pattern
_handleClick(e) {
  e.stopPropagation(); // Prevent event bubbling if needed
  
  // Call Home Assistant service
  this.hass.callService('switch', 'turn_on', {
    entity_id: 'switch.my_switch',
  });
}

// Bind events in render method
render() {
  return html`
    <button @click=${this._handleClick}>Click Me</button>
  `;
}
```

## Component Architecture

### Main Card Component (thz-card.js)

The main component renders multiple sections:

1. **Header**: Card title, status badge
2. **Statistics Dashboard**: Runtime, energy, COP metrics
3. **Temperature Section**: Grid of temperature sensors
4. **Temperature Graph**: Historical temperature trends (custom SVG rendering)
5. **Fan Graph**: Fan values over time (custom SVG rendering)
6. **Heating Details Graph**: Booster stage, pump, power consumption (custom SVG rendering)
7. **Energy & Efficiency**: Power, energy, COP display
8. **Errors & Alerts**: System warnings and errors
9. **Operation Mode**: Mode selection controls
10. **Heating Circuit**: Heating circuit controls
11. **Hot Water**: Hot water management
12. **Additional Controls**: Cooling, emergency, party, holiday modes

Each section can be toggled on/off via configuration.

### Configuration Editor (thz-card-editor.js)

Visual editor for card configuration with:
- Device picker for manual device selection
- Entity filter input
- Toggle switches for show/hide options
- Number input for graph hours
- Text input for card name

## Testing Approach

**Note**: This project currently has no automated tests.

### Manual Testing

When making changes:
1. Build the card: `npm run build`
2. Copy `dist/thz-card.js` to Home Assistant's `www` folder
3. Reload browser cache in Home Assistant
4. Test the card in Lovelace dashboard with actual THZ entities

### Testing Checklist

- [ ] Auto-discovery finds correct entities
- [ ] All configured sections render correctly
- [ ] Controls interact with Home Assistant services properly
- [ ] History graphs load and display data
- [ ] Configuration editor works and saves settings
- [ ] No console errors
- [ ] Responsive design works on mobile/desktop

## Home Assistant Integration

### Custom Card Registration

```javascript
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'thz-card',
  name: 'THZ Card',
  description: 'A custom card for controlling THZ heat pumps',
});
```

### Required Methods

- `setConfig(config)`: Set card configuration
- `getConfigElement()`: Return configuration editor element
- `getStubConfig()`: Return default configuration
- `getCardSize()`: Return card height (optional, for layout)

### Integration Points

- Uses Home Assistant's `hass` object for state and services
- Leverages `custom-card-helpers` for common utilities
- Uses Home Assistant's history API for graphs
- Uses Home Assistant's UI components (ha-card, ha-icon, etc.)

## Common Tasks

### Adding a New Configuration Option

1. Add property to editor's options list
2. Add change handler in editor
3. Update stub config in main card
4. Use the config value in render method
5. Update README.md documentation

### Adding a New Section

1. Create render method (e.g., `_renderMySection()`)
2. Add configuration toggle (e.g., `show_my_section`)
3. Conditionally render in main render method
4. Add CSS styles for the section
5. Update configuration editor
6. Document in README.md

### Calling Home Assistant Services

```javascript
// Switch
this.hass.callService('switch', 'turn_on', {
  entity_id: entityId,
});

// Select
this.hass.callService('select', 'select_option', {
  entity_id: entityId,
  option: value,
});

// Number
this.hass.callService('number', 'set_value', {
  entity_id: entityId,
  value: value,
});
```

### Fetching History Data

```javascript
const end = new Date();
const start = new Date(end.getTime() - hours * 60 * 60 * 1000);

const historyData = await this.hass.callApi(
  'GET',
  `history/period/${start.toISOString()}?filter_entity_id=${entityIds.join(',')}&end_time=${end.toISOString()}`
);
```

## Version Management

- Version is defined in both `package.json` and `src/thz-card.js` (CARD_VERSION)
- **Keep versions in sync** when updating
- Version is displayed in browser console on card load

## Distribution

The card is distributed via:
1. **HACS**: Primary distribution method (metadata in `hacs.json`)
2. **GitHub Releases**: Manual installation option
3. Files to include in release:
   - `dist/thz-card.js` (built file)
   - `README.md`
   - `info.md`

## Important Notes

- **No TypeScript**: Project uses plain JavaScript
- **No Test Framework**: No Jest, Mocha, or other test frameworks
- **Browser Target**: Modern browsers (ES6+ support required)
- **Home Assistant Dependency**: Requires Home Assistant 2021.12.0+
- **THZ Integration Required**: Card depends on THZ integration for entities
- **Shadow DOM**: Components use shadow DOM (scoped styles)
- **Lit Version**: Using Lit 3.x (modern syntax)

## When Making Changes

1. **Keep it simple**: This is a focused custom card, not a framework
2. **Test manually**: Always test changes in Home Assistant
3. **Update version**: Increment version in both files if releasing
4. **Update docs**: Keep README.md in sync with features
5. **Build before commit**: Run `npm run build` to update dist/
6. **Check console**: Verify no errors in browser console
7. **Mobile-friendly**: Test responsive design on mobile viewports

## Helpful Context

- Heat pumps have complex entity structures (sensors, switches, selects, numbers)
- Users may have multiple heat pump devices
- Entity naming varies by integration setup
- Auto-discovery improves user experience but manual override is important
- Performance matters - avoid unnecessary API calls
- Graphs are resource-intensive - allow configuration of time range
