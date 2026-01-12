# THZ Card

A custom card for Home Assistant to control THZ heat pumps. This card provides a comprehensive interface to monitor and control your Stiebel Eltron LWZ / Tecalor THZ heat pump using the [THZ integration](https://github.com/bigbadoooff/thz).

## Features

- 🌡️ **Temperature Monitoring**: Display multiple temperature sensors in an organized grid
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
| `entity` | string | (optional) | Specific entity to monitor (auto-discovery used if empty) |
| `show_temperature` | boolean | `true` | Show temperature sensors section |
| `show_mode` | boolean | `true` | Show operation mode controls |
| `show_heating_circuit` | boolean | `true` | Show heating circuit controls |
| `show_hot_water` | boolean | `true` | Show hot water controls |

### Example Configuration

#### Basic Configuration (YAML)

```yaml
type: custom:thz-card
name: My Heat Pump
show_temperature: true
show_mode: true
show_heating_circuit: true
show_hot_water: true
```

#### Minimal Configuration

```yaml
type: custom:thz-card
```

The card will automatically discover all THZ entities and display them in organized sections.

#### Custom Configuration

```yaml
type: custom:thz-card
name: Living Room Heat Pump
show_temperature: true
show_mode: true
show_heating_circuit: true
show_hot_water: false
```

## Screenshots

The card provides several sections for controlling your heat pump:

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

