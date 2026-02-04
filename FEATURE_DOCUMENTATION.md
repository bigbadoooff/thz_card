# Entity Preview and Selection Feature

## Overview

This feature adds a comprehensive entity preview and selection interface to the THZ Card editor, allowing users to see and control which entities will be displayed on their dashboard **before** adding the card.

## Problem Solved

Previously, users could not see which entities would be displayed on the THZ card before adding it to their dashboard. The card used auto-discovery with regex patterns, which could result in unwanted entities being shown (e.g., "Heissgastemperatur" - hot gas temperature sensor).

## Solution

A new "Entity Selection" section has been added to the card editor that provides:
- Visual preview of all discovered entities
- Individual entity selection via checkboxes
- Entities grouped by card section
- Search/filter functionality
- Bulk selection controls

## Features

### 1. Entity Discovery
The editor automatically discovers THZ/Tecalor/LWZ heat pump entities using the same patterns as the main card, ensuring consistency between what's discovered and what can be displayed.

### 2. Entity Preview
For each discovered entity, the interface shows:
- **Entity Icon**: Visual indicator of entity type (📊 sensor, 🔘 switch, 🔢 number, 📋 select)
- **Friendly Name**: Human-readable entity name
- **Entity ID**: Technical identifier
- **Current State**: Live value from Home Assistant

### 3. Grouped by Section
Entities are organized into collapsible sections matching the card's structure:
- 🌡️ **Temperature Sensors**: All temperature-related sensors
- ⚙️ **Operation Mode**: Mode selects and status sensors
- 🔥 **Heating Circuit**: Heating circuit controls (switches and numbers)
- 💧 **Hot Water**: DHW switches, numbers, and sensors
- ❄️ **Cooling**: Cooling-related controls
- ➕ **Additional Controls**: Emergency, party mode, holiday mode, etc.

### 4. Selection Controls
Each section provides:
- **Checkboxes**: Individual entity selection
- **Select All**: Quickly select all entities in a section
- **Deselect All**: Quickly deselect all entities in a section
- **Entity Count**: Shows "X of Y selected" for each section

### 5. Search & Filter
A search box allows users to quickly find entities by:
- Entity ID
- Friendly name

### 6. Refresh Functionality
A "Refresh Entity List" button re-runs entity discovery, useful when:
- Device or entity filter settings change
- New entities are added to Home Assistant
- Entities are renamed

## Configuration Structure

Selected entities are stored in the card configuration as:

```javascript
{
  selected_entities: {
    temperature: ['sensor.room_temp', 'sensor.outside_temp'],
    mode: ['select.operating_mode'],
    heating_circuit: ['switch.hc1_enable', 'number.hc1_target_temp'],
    hot_water: ['sensor.dhw_temp', 'switch.dhw_enable'],
    cooling: ['switch.cooling_enable'],
    additional: ['switch.party_mode']
  }
}
```

## Backward Compatibility

✅ **Fully backward compatible**
- Existing cards without `selected_entities` configuration continue to work
- Auto-discovery is used as a fallback when no entities are selected
- No breaking changes to existing functionality
- All existing configuration options remain unchanged

## Implementation Details

### Main Card Changes (`src/thz-card.js`)

1. **New Method**: `_getEntitiesForSection(section)`
   - Checks if user has manually selected entities for a section
   - Returns selected entities if available
   - Returns `null` to trigger auto-discovery fallback

2. **Updated Render Methods**:
   - `_renderTemperatureSection()`
   - `_renderModeSection()`
   - `_renderHeatingCircuitSection()`
   - `_renderHotWaterSection()`
   - `_renderCoolingSection()`
   - `_renderAdditionalControls()`
   
   All now check for selected entities first, falling back to auto-discovery.

### Editor Changes (`src/thz-card-editor.js`)

1. **Entity Discovery**: `_discoverEntities()`
   - Mirrors main card's entity discovery logic
   - Groups entities by section
   - Applies device and entity filter settings

2. **UI Components**:
   - `_renderEntitySection()`: Renders a collapsible section
   - `_renderEntityRow()`: Renders individual entity with checkbox
   - Search/filter functionality
   - Expand/collapse section management

3. **Helper Methods**:
   - `_getEmptySelectedEntities()`: Provides default structure
   - `_handleSectionAction()`: Manages event handling for action buttons
   - `_toggleEntity()`: Handles checkbox changes
   - `_selectAllInSection()`: Selects all entities in a section
   - `_deselectAllInSection()`: Deselects all entities in a section

## User Experience

### Typical Workflow

1. **Add THZ Card** to Home Assistant dashboard
2. **Open card editor**
3. **Scroll to "Entity Selection"** section (below show/hide options)
4. **Expand sections** to see discovered entities
5. **Uncheck unwanted entities** (e.g., hot gas temperature)
6. **Check desired entities** or use "Select All"
7. **Search** for specific entities if needed
8. **Save** configuration

### Visual Feedback

- **Selected entities**: Highlighted background color
- **Entity counts**: Shows ratio of selected vs available
- **Collapsible sections**: Reduces visual clutter
- **Live states**: Helps identify correct entities
- **Icons**: Quick visual identification of entity type

## Example Use Cases

### Use Case 1: Exclude Unwanted Temperature Sensor
**Problem**: "Hot gas temperature" sensor appears but user doesn't want it displayed.

**Solution**:
1. Expand "Temperature Sensors" section
2. Uncheck `sensor.hot_gas_temperature`
3. Keep other temperature sensors checked
4. Save configuration

### Use Case 2: Show Only Essential Controls
**Problem**: Too many switches and sensors clutter the card.

**Solution**:
1. Expand each section
2. Use "Deselect All" to start fresh
3. Manually select only essential entities
4. Save configuration

### Use Case 3: Multiple Heat Pumps
**Problem**: Multiple heat pumps in system, need to show only one.

**Solution**:
1. Use "Device" picker to select specific heat pump
2. Entity discovery auto-updates
3. Use "Select All" for relevant sections
4. Save configuration

## Technical Notes

### Performance
- Entity discovery runs only when:
  - Editor is opened
  - Device/filter settings change
  - "Refresh Entity List" is clicked
- Results are cached in component state
- No performance impact on main card rendering

### Entity Type Detection
Entity types are determined by domain prefix:
- `sensor.*` → 📊 Sensor
- `switch.*` → 🔘 Switch
- `number.*` → 🔢 Number
- `select.*` → 📋 Select
- `binary_sensor.*` → ⚫ Binary Sensor

### Entity Ordering
Entities within each section are ordered consistently:
1. Switches
2. Numbers
3. Sensors
4. Selects

This provides a predictable and logical organization.

## Testing

### Manual Testing Checklist
- [ ] Entity discovery finds correct entities
- [ ] Checkboxes toggle entity selection
- [ ] "Select All" selects all entities in section
- [ ] "Deselect All" deselects all entities in section
- [ ] Search filters entities correctly
- [ ] Expand/collapse sections work
- [ ] Selected entities persist in configuration
- [ ] Main card respects selected entities
- [ ] Backward compatibility: cards without selection use auto-discovery
- [ ] Entity counts display correctly
- [ ] Live states display correctly

### Code Quality
- ✅ All code review comments addressed
- ✅ No security vulnerabilities (CodeQL scan passed)
- ✅ Consistent code style
- ✅ Helper methods reduce duplication
- ✅ Comprehensive CSS styling

## Future Enhancements (Not Implemented)

Possible future additions:
- Drag-and-drop entity reordering
- Import/export entity selection
- Entity templates for common configurations
- Multi-select with checkboxes
- Entity state history preview
- Auto-selection of "important" entities

## Support

For issues or questions:
1. Check that THZ integration is installed and working
2. Verify entities exist in Home Assistant
3. Try "Refresh Entity List" button
4. Check browser console for errors
5. Report issues on GitHub with:
   - Home Assistant version
   - THZ Card version
   - Browser type and version
   - Steps to reproduce

---

**Version**: 1.2.0+
**Last Updated**: February 2026
