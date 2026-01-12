# THZ Card

A custom card for Home Assistant to control THZ heat pumps.

## Features

- 🌡️ Temperature monitoring with organized sensor grid
- 📊 Temperature history graphs with customizable time range
- 💨 Fan monitoring with dedicated graphs
- 🔥 Heating details tracking (booster, pump, power)
- ⚡ Energy consumption and efficiency (COP) monitoring
- 📈 Statistics dashboard with key metrics
- 🚦 Visual status indicators showing operational state
- ⚠️ Automatic error and alert detection
- 🔧 Operation mode control with dropdown selectors  
- 🏠 Heating circuit control for temperature and settings
- 💧 Hot water management and temperature control
- 🎛️ Additional controls for special modes
- 🎨 Modern, responsive UI matching Home Assistant theme
- ⚙️ Visual configuration editor
- 🔍 Auto-discovery of THZ entities

## Requirements

- Home Assistant 2021.12.0 or newer
- [THZ Integration](https://github.com/bigbadoooff/thz) installed and configured

## Usage

After installation, add the card to your dashboard:

1. Edit your Lovelace dashboard
2. Click "Add Card"  
3. Search for "THZ Card"
4. Configure using the visual editor

The card will automatically discover all THZ entities and organize them into sections:
- Temperature sensors with visual history graph
- Operation modes
- Heating circuit controls
- Hot water controls
- Additional special modes

## Configuration

The card provides several configuration options:

- **Name**: Display name for the card
- **Entity**: Optional specific entity (auto-discovery if empty)
- **Show sections**: Toggle temperature, mode, heating circuit, and hot water sections
- **Temperature graph**: Enable/disable temperature history graph
- **Graph time range**: Configure hours of history to display (1-168 hours)

For detailed configuration and examples, see the [README](https://github.com/bigbadoooff/thz_card).
