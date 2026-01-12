# THZ Card

A custom card for Home Assistant to control THZ heat pumps. This card provides a comprehensive interface to monitor and control your Stiebel Eltron LWZ / Tecalor THZ heat pump using the [THZ integration](https://github.com/bigbadoooff/thz).

## Features

- 🌡️ **Temperature Monitoring**: Display multiple temperature sensors in an organized grid
- 📊 **Temperature Graphs**: Visual history graphs showing temperature trends over time
- 💨 **Fan Monitoring**: Track fan values with dedicated graphs
- 🔥 **Heating Details**: Monitor booster stage, heat circuit pump, and heating power with graphs
- ⚡ **Energy & Efficiency**: Track power consumption and COP (Coefficient of Performance)
- 📈 **Statistics Dashboard**: Quick view of key metrics like runtime, energy consumption, and COP
- 🚦 **Status Indicators**: Visual badges showing current operational state (heating/cooling/idle/defrost)
- ⚠️ **Error & Alert Monitoring**: Automatic detection and display of system errors and warnings
- 🔧 **Operation Mode Control**: Easy switching between different operating modes
- 🏠 **Heating Circuit Control**: Control heating circuit settings and temperatures
- 💧 **Hot Water Management**: Monitor and control hot water settings
- 🎛️ **Additional Controls**: Access to cooling, emergency, party, and holiday modes
- 🎨 **Modern UI**: Clean, responsive design that matches Home Assistant's theme
- ⚙️ **Easy Configuration**: Visual editor for customizing card settings
- 🔍 **Auto-Discovery**: Automatically finds and displays THZ entities

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Navigate to "Frontend"
3. Click the three dots in the top right corner and select "Custom repositories"
4. Add `https://github.com/bigbadoooff/thz_card` as a custom repository with category "Lovelace"
5. Search for "THZ Card" in HACS
6. Click "Download" to install the card
7. Restart Home Assistant

### Manual Installation

1. Download the latest release from the [releases page](https://github.com/bigbadoooff/thz_card/releases)
2. Copy the `thz-card.js` file from the `dist` folder to your `config/www/` directory
3. Add the following to your Lovelace resources:

```yaml
resources:
  - url: /local/thz-card.js
    type: module
```

4. Restart Home Assistant

## Usage

### Adding the Card

1. Edit your Lovelace dashboard
2. Click "Add Card"
3. Search for "THZ Card"
4. Configure the card using the visual editor

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | string | `Heat Pump` | Name displayed at the top of the card |
| `device_id` | string | (optional) | Specific device ID to filter entities (use if auto-discovery doesn't work) |
| `entity_filter` | string | (optional) | Filter string for entity IDs (e.g., "my_heatpump") |
| `show_status` | boolean | `true` | Show status badge in header |
| `show_statistics` | boolean | `true` | Show statistics dashboard with key metrics |
| `show_temperature` | boolean | `true` | Show temperature sensors section |
| `show_temperature_graph` | boolean | `true` | Show temperature history graph |
| `show_fan_graph` | boolean | `true` | Show fan values history graph |
| `show_heating_details_graph` | boolean | `true` | Show heating details (booster, pump, power) history graph |
| `show_energy` | boolean | `true` | Show energy & efficiency section |
| `graph_hours` | number | `24` | Number of hours to display in graphs (1-168) |
| `show_mode` | boolean | `true` | Show operation mode controls |
| `show_heating_circuit` | boolean | `true` | Show heating circuit controls |
| `show_hot_water` | boolean | `true` | Show hot water controls |
| `show_errors_always` | boolean | `false` | Always show error section even when no errors |

**Auto-Discovery**: The card automatically discovers entities containing "thz", "tecalor", or "lwz" in their entity ID. If auto-discovery doesn't work for your setup, you can:
- Use the device picker to select your heat pump device, OR
- Specify an `entity_filter` to match your entity naming pattern (e.g., if your entities are named `sensor.my_heatpump_temperature`, use `entity_filter: "my_heatpump"`)

### Example Configuration

#### Basic Configuration (YAML)

```yaml
type: custom:thz-card
name: My Heat Pump
show_status: true
show_statistics: true
show_temperature: true
show_temperature_graph: true
show_fan_graph: true
show_heating_details_graph: true
show_energy: true
graph_hours: 24
show_mode: true
show_heating_circuit: true
show_hot_water: true
```

#### Minimal Configuration

```yaml
type: custom:thz-card
```

The card will automatically discover all THZ/Tecalor/LWZ entities and display them in organized sections.

#### Configuration with Device Selection

If auto-discovery doesn't work, specify your device:

```yaml
type: custom:thz-card
name: My Heat Pump
device_id: abc123def456  # Get this from Home Assistant device page
```

#### Configuration with Entity Filter

If your entities don't contain "thz", "tecalor", or "lwz":

```yaml
type: custom:thz-card
name: My Heat Pump
entity_filter: "my_heatpump"  # Matches sensor.my_heatpump_temperature, etc.
```

#### Custom Configuration

```yaml
type: custom:thz-card
name: Living Room Heat Pump
show_temperature: true
show_temperature_graph: false
show_mode: true
show_heating_circuit: true
show_hot_water: false
```

#### Extended Time Range Configuration

```yaml
type: custom:thz-card
name: Heat Pump with Weekly Graph
show_temperature: true
show_temperature_graph: true
graph_hours: 168  # Show 1 week of data
show_mode: true
show_heating_circuit: true
show_hot_water: true
```

## What's New

### Latest Enhancements

The card now includes powerful new features to help you monitor and optimize your heat pump:

- **📈 Statistics Dashboard**: Get a quick overview of key metrics at a glance
  - Runtime tracking
  - Energy consumption (daily/total)
  - COP (Coefficient of Performance) with color-coded efficiency indicators
  - Compressor status and statistics

- **🚦 Status Badge**: Visual indicator in the header showing current operational state
  - Heating mode 🔥
  - Cooling mode ❄️
  - Idle/Standby ⏸️
  - Defrost cycle 🌨️
  - System off ⭕

- **⚡ Energy & Efficiency Section**: Dedicated area for monitoring power consumption and efficiency
  - Real-time power usage
  - Energy consumption tracking
  - COP monitoring with visual feedback (excellent/good/poor)
  - Helps identify optimization opportunities

- **⚠️ Error & Alert Monitoring**: Automatic detection and prominent display of system issues
  - Highlights active errors and warnings
  - Shows "all clear" status when no issues detected
  - Helps catch problems early

These features are automatically enabled but can be individually toggled in the card configuration.

## Screenshots

The card provides several sections for controlling your heat pump:

- **Temperature Graph**: Visual display of temperature history with customizable time range (requires Home Assistant history integration)
- **Temperature Section**: Displays all temperature sensors from your heat pump
- **Operation Mode Section**: Dropdown selectors for changing operating modes
- **Heating Circuit Section**: Switches and number inputs for heating circuit control
- **Hot Water Section**: Controls for hot water temperature and operation
- **Additional Controls**: Quick access to special modes like cooling, emergency, party mode, etc.

## Requirements

- Home Assistant 2021.12.0 or newer
- [THZ Integration](https://github.com/bigbadoooff/thz) installed and configured

## Development

### Building from Source

1. Clone the repository:
```bash
git clone https://github.com/bigbadoooff/thz_card.git
cd thz_card
```

2. Install dependencies:
```bash
npm install
```

3. Build the card:
```bash
npm run build
```

The compiled card will be in the `dist/` directory.

### Development Mode

To watch for changes and automatically rebuild:
```bash
npm run watch
```

## Troubleshooting

### Card Not Showing Up

1. Make sure the THZ integration is installed and configured
2. Clear your browser cache
3. Check the browser console for errors
4. Verify the resource is loaded in Configuration → Lovelace Dashboards → Resources

### No Entities Showing

1. Ensure the THZ integration is working and entities are available
2. Check that entities are not disabled in Home Assistant
3. The card looks for entities with "thz" in their entity_id or integration attribute

### Controls Not Working

1. Verify the entities support the expected services (switch.turn_on, select.select_option, etc.)
2. Check Home Assistant logs for any errors
3. Ensure you have the necessary permissions to control these entities

## Support

For issues, feature requests, or contributions:

- [Issue Tracker](https://github.com/bigbadoooff/thz_card/issues)
- [THZ Integration](https://github.com/bigbadoooff/thz)

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Credits

Created for use with the [THZ Integration](https://github.com/bigbadoooff/thz) by bigbadoooff.

