# Entity Selection UI Mockup

## Visual Overview

This document describes the visual appearance of the new Entity Selection feature in the THZ Card editor.

```
┌────────────────────────────────────────────────────────────────────┐
│ 🔍 Entity Selection                   🔄 Refresh Entity List       │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│ [🔍 Search entities...]                                           │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ ▼ 🌡️ Temperature Sensors              (3 of 5 selected)     │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ [Select All]  [Deselect All]                                 │ │
│ │                                                               │ │
│ │ ☑ 📊 Room Temperature                               22.5°C   │ │
│ │      sensor.room_temperature                                 │ │
│ │                                                               │ │
│ │ ☑ 📊 Outside Temperature                             5.2°C   │ │
│ │      sensor.outside_temperature                              │ │
│ │                                                               │ │
│ │ ☐ 📊 Hot Gas Temperature                            65.3°C   │ │
│ │      sensor.hot_gas_temperature                              │ │
│ │                                                               │ │
│ │ ☑ 📊 Flow Temperature                               35.8°C   │ │
│ │      sensor.flow_temperature                                 │ │
│ │                                                               │ │
│ │ ☐ 📊 Return Temperature                             30.1°C   │ │
│ │      sensor.return_temperature                               │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ ▼ ⚙️ Operation Mode                   (1 of 1 selected)     │ │
│ ├──────────────────────────────────────────────────────────────┤ │
│ │ [Select All]  [Deselect All]                                 │ │
│ │                                                               │ │
│ │ ☑ 📋 Operating Mode                             Heating      │ │
│ │      select.operating_mode                                   │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ ▶ 🔥 Heating Circuit                  (2 of 3 selected)     │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ ▶ 💧 Hot Water                        (1 of 2 selected)     │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ ▶ ❄️ Cooling                          (0 of 1 selected)     │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ ▶ ➕ Additional Controls              (1 of 2 selected)     │ │
│ └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. Section Header
```
┌────────────────────────────────────────────────────┐
│ 🔍 Entity Selection    🔄 Refresh Entity List     │
└────────────────────────────────────────────────────┘
```
- **Left**: Section title with emoji icon
- **Right**: Refresh button to re-run entity discovery

### 2. Search Box
```
┌────────────────────────────────────┐
│ [🔍 Search entities...]            │
└────────────────────────────────────┘
```
- Filters entities in real-time
- Searches both entity ID and friendly name

### 3. Collapsible Section (Expanded)
```
┌──────────────────────────────────────────────┐
│ ▼ 🌡️ Temperature Sensors  (3 of 5 selected) │
├──────────────────────────────────────────────┤
│ [Select All]  [Deselect All]                 │
│                                               │
│ ☑ 📊 Room Temperature              22.5°C    │
│      sensor.room_temperature                 │
└──────────────────────────────────────────────┘
```
- **Header**: Clickable to expand/collapse
  - `▼` or `▶`: Expand/collapse icon
  - Emoji: Section type indicator
  - Title: Section name
  - Count: "X of Y selected"
- **Action Buttons**: Select All / Deselect All
- **Entity Rows**: See below

### 4. Collapsible Section (Collapsed)
```
┌──────────────────────────────────────────────┐
│ ▶ 🔥 Heating Circuit       (2 of 3 selected) │
└──────────────────────────────────────────────┘
```
- Shows only header with count
- Click to expand and see entities

### 5. Entity Row (Selected)
```
☑ 📊 Room Temperature                    22.5°C
     sensor.room_temperature
```
- **Checkbox**: ☑ (checked) or ☐ (unchecked)
- **Icon**: Entity type indicator
  - 📊 Sensor
  - 🔘 Switch
  - 🔢 Number
  - 📋 Select
- **Name**: Friendly entity name (bold)
- **ID**: Entity ID (gray, monospace font)
- **State**: Current value with unit

### 6. Entity Row (Unselected)
```
☐ 📊 Hot Gas Temperature                 65.3°C
     sensor.hot_gas_temperature
```
- Same structure as selected row
- Checkbox is unchecked
- Background not highlighted

## Color Scheme (Dark Theme)

- **Background**: Dark gray (#2c2c2c)
- **Section Headers**: Darker gray (#1c1c1c)
- **Selected Entity**: Blue tint (rgba(3, 169, 244, 0.2))
- **Primary Text**: White (#fff)
- **Secondary Text**: Light gray (#888)
- **Borders**: Medium gray (#444)
- **Primary Button**: Blue (#03a9f4)
- **Action Buttons**: Dark with border

## Responsive Behavior

### Desktop (>800px)
- Full width sections
- All information visible
- Two-column layout where appropriate

### Tablet (600-800px)
- Sections stack vertically
- Entity information remains visible
- Slightly reduced padding

### Mobile (<600px)
- Compact view
- Entity ID may wrap
- Touch-friendly checkboxes and buttons
- Increased tap targets

## Interaction States

### Hover States
- **Section Header**: Slight background color change
- **Entity Row**: Slight background color change
- **Buttons**: Color change or opacity reduction

### Active States
- **Checkbox**: Checkmark appears
- **Selected Entity**: Background highlight
- **Expanded Section**: Show content area

### Focus States
- **Search Box**: Border color change to primary
- **Buttons**: Outline or shadow

## Accessibility Features

- ✅ Keyboard navigation support
- ✅ Screen reader labels
- ✅ High contrast ratios
- ✅ Touch-friendly target sizes
- ✅ Clear visual feedback
- ✅ Logical tab order

## Animation

- **Expand/Collapse**: Smooth height transition (0.2s)
- **Checkbox**: Instant feedback
- **Button Hover**: Fade transition (0.2s)
- **Background Changes**: Smooth color transition (0.2s)

## Icon Legend

| Icon | Entity Type    | Example                |
|------|----------------|------------------------|
| 📊   | Sensor         | sensor.temperature     |
| 🔘   | Switch         | switch.heating_enable  |
| 🔢   | Number         | number.target_temp     |
| 📋   | Select         | select.operating_mode  |
| ⚫   | Binary Sensor  | binary_sensor.error    |

## Section Icons

| Icon | Section             |
|------|---------------------|
| 🌡️   | Temperature Sensors |
| ⚙️   | Operation Mode      |
| 🔥   | Heating Circuit     |
| 💧   | Hot Water           |
| ❄️   | Cooling             |
| ➕   | Additional Controls |

---

This visual design ensures:
- **Clarity**: Easy to understand entity structure
- **Efficiency**: Quick selection and deselection
- **Consistency**: Matches Home Assistant design patterns
- **Usability**: Intuitive for both new and experienced users
