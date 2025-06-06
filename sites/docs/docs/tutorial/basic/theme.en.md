---
nav: Guide
group:
  title: Basics
  order: 1
title: Theme
order: 3
toc: content
---

LogicFlow provides a comprehensive theme customization feature that supports multiple ways to set and customize theme styles. Theme configuration allows unified management of styles for all elements in the canvas, including nodes, edges, text, and more.

## Theme Configuration Categories

Theme configuration supports the following main categories:

- **Base Theme**: Common styles for base nodes and edges
- **Node Theme**: Styles for various nodes (rectangle, circle, diamond, etc.)
- **Edge Theme**: Styles for various edges (line, polyline, bezier curve, etc.)
- **Text Theme**: Styles for node text and edge text
- **Other Elements**: Styles for auxiliary elements like anchors, arrows, and snaplines
- **Canvas Configuration**: Styles for background and grid

For detailed theme configuration parameters, see [Theme API](../../api/theme.en.md)

## Theme Configuration Methods

### Way 1: Initialization Configuration

When creating a LogicFlow instance, configure the theme using the `style` parameter.

```tsx | pure
const config = {
  container: document.querySelector('#container'),
  width: 1000,
  height: 800,
  style: { // Set default theme style
    rect: { fill: '#FFFFFF', strokeWidth: 2 }, // Rectangle style
    circle: { r: 15, fill: '#1E90FF' }, // Circle style
    nodeText: { fontSize: 14, color: '#333333' }, // Node text style
    edgeText: { fontSize: 12, color: '#666666' }, // Edge text style
    anchor: { stroke: '#999999', fill: '#FFFFFF' }, // Anchor point style
  },
  themeMode: 'radius', // Set rounded corner theme
}
const lf = new LogicFlow(config)
```

### Way 2: Using the setTheme Method

After creating a LogicFlow instance, dynamically update the theme configuration by calling the `setTheme` method.

```tsx | pure
// Dynamically configure theme
lf.setTheme({
  rect: { fill: '#FFFFFF', stroke: '#1890FF' }, // Rectangle style
  circle: { r: 15, fill: '#1890FF' }, // Circle style
  nodeText: { fontSize: 14, color: '#333333' }, // Node text style
  edgeText: { fontSize: 12, color: '#666666' }, // Edge text style
  anchor: { r: 4, fill: '#FFFFFF', stroke: '#1890FF' }, // Anchor point style
}, 'radius')
```

## Built-in Theme Modes <Badge>2.0.14新增</Badge>

LogicFlow comes with four built-in theme modes that allow you to quickly apply preset styles:

- `default`: Default theme
- `dark`: Dark theme
- `colorful`: Colorful theme
- `radius`: Rounded corner theme

Applying built-in theme modes:

```tsx | pure
// Set theme mode during initialization
const lf = new LogicFlow({
  // ... other configurations
  themeMode: 'radius', // Set rounded corner theme
})

// Dynamically switch theme modes
lf.setTheme({}, 'dark') // Apply dark theme
lf.setTheme({}, 'colorful') // Apply colorful theme

// Apply theme mode with custom styles
lf.setTheme({
  rect: { fill: '#AECBFA' },
  circle: { fill: '#C9DAF8' }
}, 'radius')
```

## Custom Theme Modes <Badge>2.0.14新增</Badge>

LogicFlow supports creating and managing custom theme modes. You can add new theme modes using the `addThemeMode` method:

```tsx | pure
// Register custom theme mode
LogicFlow.addThemeMode('customTheme', {
  baseNode: { fill: '#EFF5FF', stroke: '#4B83FF' },
  rect: { radius: 8 },
  circle: { r: 25 },
  nodeText: { fontSize: 16, color: '#4B83FF' },
  edgeText: { fontSize: 14, background: { fill: '#EEF7FE' } },
  arrow: { offset: 6, verticalLength: 3 },
})

// Apply custom theme
lf.setTheme({}, 'customTheme')
```

### Theme Style Priority

The priority of theme styles (from low to high):

#### Node, Edge, Text and Other Element Style Priority
1. Built-in base styles (defaultTheme)
2. Applied theme mode styles (specified via `themeMode` or second parameter of `setTheme`)
3. Custom styles (specified via `style` or first parameter of `setTheme`)

#### Background and Grid Style Priority
Background and grid configurations have independent update mechanisms, with priority divided into two phases:

**Initialization Phase Priority** (from low to high):
1. Configuration in style: `background` and `grid` configurations in the constructor's `style` parameter
2. Direct Parameter Configuration: Values set through `background` and `grid` parameters in the constructor (overrides configurations in style)

**Runtime Phase Priority** (from low to high):
1. Current Configuration: `background` and `grid` configurations after initialization
2. Theme Mode Configuration: When calling `setTheme(style, themeMode)`, background and grid configurations in themeMode will override current configuration
3. Custom Configuration: `background` and `grid` configurations in the style parameter of `setTheme(style, themeMode)` will override theme mode configuration

```tsx | pure
// Example: Priority application of background and grid

// Initialization: Direct parameters > style parameters
const lf = new LogicFlow({
  style: {
    background: { color: '#f0f0f0' }, // Lower priority
    grid: { size: 15 }                // Lower priority
  },
  background: { color: '#f5f5f5' },   // Final effective (overrides style configuration)
  grid: { size: 20 },                 // Final effective (overrides style configuration)
})

// Runtime: style parameters > themeMode parameters > current configuration
lf.setTheme({
  background: { color: '#ffffff' },   // Final effective background configuration
  grid: { size: 10, visible: true },  // Final effective grid configuration
}, 'dark') // Background and grid configurations in dark theme mode will be overridden by style parameters
```

## Usage Example
<code id="graphData" src="../../../src/tutorial/basic/instance/theme"></code>
