# Ontario Design System - OmniStudio Guide

This comprehensive guide covers using the Ontario Design System with OmniStudio OmniScripts, including setup, form components, and custom LWC integration.

## Table of Contents

1. [Overview](#overview)
2. [Setup Guide](#setup-guide)
3. [Form Components](#form-components)
4. [Custom LWC Integration](#custom-lwc-integration)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

---

## Overview

The Ontario Design System (sfGpsDsCaOn) provides 32+ OmniStudio form components that automatically style OmniScript forms with Ontario DS styling while preserving all OmniStudio functionality.

### Key Benefits

- **Automatic Styling**: OmniScript elements are automatically styled with Ontario DS
- **Full Compatibility**: All OmniStudio features work (validation, data binding, navigation)
- **WCAG 2.1 AA**: All components meet accessibility requirements
- **LWR Ready**: Components work in Lightning Web Runtime Experience Cloud sites

### How It Works

```
OmniScript Configuration
    ↓
OmniStudio Runtime loads element (e.g., "Text")
    ↓
Override maps to Ontario component (sfGpsDsCaOnFormText)
    ↓
Ontario component renders with Ontario DS styling
    ↓
All OmniStudio behavior preserved (validation, data binding, etc.)
```

---

## Setup Guide

### Prerequisites

1. The Ontario Design System package (sfGpsDsCaOn) is deployed
2. Static resources are deployed (sfGpsDsCaOnGlobalStyles, sfGpsDsCaOnComponents)
3. The Experience Cloud site is configured

### Step 1: Create the LWC Override Configuration

For OmniStudio Standard Runtime, create a custom LWC that defines the overrides:

**File: `sfGpsDsCaOnOmniscript/sfGpsDsCaOnOmniscript.js`**

```javascript
import OmniscriptBaseOsrt from "c/sfGpsDsOsrtOmniscript";

// Import all Ontario form components
import sfGpsDsCaOnFormText from "c/sfGpsDsCaOnFormText";
import sfGpsDsCaOnFormTextarea from "c/sfGpsDsCaOnFormTextarea";
import sfGpsDsCaOnFormSelect from "c/sfGpsDsCaOnFormSelect";
// ... additional imports

export default class SfGpsDsCaOnOmniscript extends OmniscriptBaseOsrt {
  static elementTypeToLwcConstructorMap = {
    ...OmniscriptBaseOsrt.elementTypeToLwcConstructorMap,
    Text: sfGpsDsCaOnFormText,
    "Text Area": sfGpsDsCaOnFormTextarea,
    Select: sfGpsDsCaOnFormSelect
    // ... additional mappings
  };
}
```

### Step 2: Configure the OmniScript

1. Open the OmniScript in OmniStudio Designer
2. Go to **Setup** > **Custom Lightning Web Component**
3. Set the LWC name to: `c-sf-gps-ds-ca-on-omniscript`
4. Save and Activate the OmniScript

### Step 3: Add Required CSS

Add the Ontario Design System CSS to your Experience Cloud site:

**Head Markup:**

```html
<!-- Ontario Design System Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Raleway:wght@400;700&display=swap"
  rel="stylesheet"
/>

<!-- Ontario Design System Styles -->
<link rel="stylesheet" href="{!$Resource.sfGpsDsCaOnGlobalStyles}/global.css" />
<link
  rel="stylesheet"
  href="{!$Resource.sfGpsDsCaOnGlobalStyles}/byo_lwr.css"
/>
<link
  rel="stylesheet"
  href="{!$Resource.sfGpsDsCaOnGlobalStyles}/byo_lwr_omnistudio.css"
/>
```

### Step 4: Recommended OmniScript Settings

| Property                   | Recommended Value | Description                      |
| -------------------------- | ----------------- | -------------------------------- |
| **Track Changes**          | Enabled           | Required for proper data binding |
| **Auto Save**              | As needed         | Consider UX implications         |
| **Client-Side Validation** | Enabled           | Uses Ontario DS error styling    |
| **Step Chart**             | Enabled           | Uses Ontario DS step indicator   |

---

## Form Components

### Available Components

#### Text Input Components

| OmniScript Element | Ontario Component          | Description                  |
| ------------------ | -------------------------- | ---------------------------- |
| Text               | `sfGpsDsCaOnFormText`      | Single-line text input       |
| Text Area          | `sfGpsDsCaOnFormTextarea`  | Multi-line text input        |
| Email              | `sfGpsDsCaOnFormEmail`     | Email input with validation  |
| URL                | `sfGpsDsCaOnFormUrl`       | URL input with validation    |
| Telephone          | `sfGpsDsCaOnFormTelephone` | Phone number input           |
| Number             | `sfGpsDsCaOnFormNumber`    | Numeric input                |
| Password           | `sfGpsDsCaOnFormPassword`  | Password input (masked)      |
| Currency           | `sfGpsDsCaOnFormCurrency`  | Currency input with $ prefix |

#### Selection Components

| OmniScript Element | Ontario Component            | Description         |
| ------------------ | ---------------------------- | ------------------- |
| Radio              | `sfGpsDsCaOnFormRadio`       | Radio button group  |
| Checkbox           | `sfGpsDsCaOnFormCheckbox`    | Single checkbox     |
| Select             | `sfGpsDsCaOnFormSelect`      | Dropdown select     |
| Multi-select       | `sfGpsDsCaOnFormMultiselect` | Checkbox group      |
| Lookup             | `sfGpsDsCaOnFormLookup`      | Searchable dropdown |
| Typeahead          | `sfGpsDsCaOnFormTypeahead`   | Autocomplete input  |

#### Date & Time Components

| OmniScript Element | Ontario Component         | Description            |
| ------------------ | ------------------------- | ---------------------- |
| Date               | `sfGpsDsCaOnFormDate`     | Date picker            |
| Time               | `sfGpsDsCaOnFormTime`     | Time input             |
| Date/Time          | `sfGpsDsCaOnFormDateTime` | Combined date and time |

#### Structure Components

| OmniScript Element | Ontario Component          | Description                    |
| ------------------ | -------------------------- | ------------------------------ |
| Step               | `sfGpsDsCaOnFormStep`      | Form step container            |
| Step Chart         | `sfGpsDsCaOnFormStepChart` | Step progress indicator        |
| Block              | `sfGpsDsCaOnFormBlock`     | Collapsible/repeatable section |

### Standard Properties (All Components)

| Property      | Description                                 |
| ------------- | ------------------------------------------- |
| `label`       | Field label text                            |
| `help`        | Hint text displayed below label             |
| `required`    | Shows "(required)" flag, enables validation |
| `readOnly`    | Prevents user input                         |
| `disabled`    | Disables the field                          |
| `placeholder` | Placeholder text in input                   |

### Configuring Custom Properties (JSON Editor)

For OmniScript LWC overrides, custom properties must be configured via the **JSON Editor**:

1. Select the element in OmniScript Designer
2. Click the **JSON Editor** button (`{}`)
3. Add a **nested `propSetMap`** inside the existing `propSetMap`:

```json
{
  "name": "MyElement",
  "type": "Multi-select",
  "propSetMap": {
    "label": "Select options",
    "required": true,
    "propSetMap": {
      "customProperty1": "value1",
      "optionsJson": [
        { "value": "opt1", "label": "Option 1", "description": "..." }
      ]
    }
  }
}
```

### Messaging Component (Hard Stops)

The `sfGpsDsCaOnFormMessaging` component displays alert messages:

| OmniScript Type | Ontario Alert   | Use Case                         |
| --------------- | --------------- | -------------------------------- |
| **Requirement** | `error`         | Hard stops, eligibility failures |
| Success         | `success`       | Confirmation messages            |
| Warning         | `warning`       | Non-blocking warnings            |
| Comment         | `informational` | General information              |

**Markdown Support:**

```markdown
Based on your answer, you do not meet the requirements.
You may need to [apply for an ECA](https://ontario.ca/eca).
```

### Selectable Cards Component

The `sfGpsDsCaOnFormSelectableCards` component provides card-based multi-select:

```json
{
  "propSetMap": {
    "propSetMap": {
      "optionsJson": [
        {
          "value": "air-emissions",
          "label": "Air emissions",
          "description": "If your business engages in activities...",
          "badge": "NEW",
          "badgeVariant": "success"
        }
      ]
    }
  }
}
```

---

## Custom LWC Integration

### Key Compatibility Requirements

#### 1. Light DOM Components Do NOT Work

Components using Light DOM (`static renderMode = "light"`) fail to render in OmniStudio Custom LWC elements.

**Solution**: Create Shadow DOM versions for OmniStudio Custom LWC use.

#### 2. LWC Name Format

**Correct Format**: `sfGpsDsCaOnComponentName` (PascalCase, no `c-` prefix)

**Incorrect Formats**:

- `c-sf-gps-ds-ca-on-component-name` (kebab-case)
- `c/sfGpsDsCaOnComponentName` (namespace format)

#### 3. JSON Property Escaping

OmniStudio double-escapes JSON strings. Components must handle both formats:

```javascript
_parseJson(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input;

  if (typeof input === "string") {
    let jsonStr = input;
    if (jsonStr.includes("\\[") || jsonStr.includes('\\"')) {
      jsonStr = jsonStr
        .replace(/\\\[/g, "[")
        .replace(/\\\]/g, "]")
        .replace(/\\"/g, '"');
    }
    return JSON.parse(jsonStr);
  }
  return [];
}
```

### Creating OmniStudio-Compatible Custom LWC

```javascript
// sfGpsDsCaOnMyComponentOmni.js
import { LightningElement, api, track } from "lwc";

export default class SfGpsDsCaOnMyComponentOmni extends LightningElement {
  // NO Light DOM - use Shadow DOM (default)
  // NO base class - extend LightningElement directly

  @api myProperty;
  @api myJsonProperty;

  connectedCallback() {
    this._parsedData = this._parseJson(this.myJsonProperty);
  }
}
```

### OmniScript Configuration for Custom LWC

```json
{
  "type": "Custom Lightning Web Component",
  "name": "MyCustomElement",
  "propSetMap": {
    "lwcName": "sfGpsDsCaOnMyComponentOmni",
    "customAttributes": [
      { "name": "myProperty", "source": "Some Value" },
      { "name": "myJsonProperty", "source": "[{\"value\":\"1\"}]" }
    ]
  }
}
```

### Available Custom LWC Components

| Component         | OmniScript LWC Name                     | Description                      |
| ----------------- | --------------------------------------- | -------------------------------- |
| Site Selector     | `sfGpsDsCaOnFormSiteSelectorTool`       | ESRI address selection           |
| Discharge Point   | `sfGpsDsCaOnFormDischargePointSelector` | Coordinate entry                 |
| NAICS Code Picker | `sfGpsDsCaOnNaicsCodePickerOmni`        | 5-level cascading NAICS picker   |
| Places Typeahead  | `sfGpsDsCaOnFormPlacesTypeahead`        | Google Maps address autocomplete |

---

## Best Practices

### Data Binding

Always use standard OmniScript methods:

```javascript
// For elements extending OmniscriptBaseMixin
this.omniUpdateDataJson({ field1: value1, field2: value2 });

// For elements extending OmniScript element classes
this.applyCallResp(value);
```

### State Preservation

Implement state restoration for custom components:

```javascript
connectedCallback() {
  super.connectedCallback?.();
  this.restoreSavedState();
}

restoreSavedState() {
  const jsonPath = this.omniJsonDef?.JSONPath;
  if (!jsonPath || !this.omniJsonData) return;

  const pathParts = jsonPath.split(":");
  let savedData = this.omniJsonData;

  for (const part of pathParts) {
    if (savedData && typeof savedData === "object") {
      savedData = savedData[part];
    }
  }

  if (savedData) {
    // Restore component state
  }
}
```

### Validation Implementation

```javascript
@api checkValidity() {
  if (!this.isRequired) return true;
  return this.hasValue;
}

@api reportValidity() {
  const isValid = this.checkValidity();
  this.showValidation = !isValid;
  return isValid;
}

@api setCustomValidity(message) {
  this._customValidityMessage = message;
  this.showValidation = Boolean(message);
}
```

### Event Bubbling

Custom events must escape Shadow DOM:

```javascript
this.dispatchEvent(
  new CustomEvent("change", {
    detail: { value: newValue },
    bubbles: true,
    composed: true
  })
);
```

---

## Troubleshooting

### Components Not Rendering with Ontario Styling

**Cause**: OmniScript not configured to use the Ontario DS override.

**Solution**: Ensure the OmniScript is using the custom LWC (`c-sf-gps-ds-ca-on-omniscript`).

### Validation Not Working

**Cause**: Missing `data-omni-input` attribute.

**Solution**: All input elements must have `data-omni-input`:

```html
<input data-omni-input onchange="{handleChange}" />
```

### Custom LWC Component Not Rendering

**Causes**:

1. Using Light DOM (`static renderMode = "light"`)
2. Incorrect `lwcName` format
3. Base class dependencies

**Solutions**:

1. Remove Light DOM mode
2. Use PascalCase without `c-` prefix
3. Extend `LightningElement` directly

### JSON Properties Not Working

**Cause**: Double-escaped JSON from OmniStudio.

**Solution**: Add unescape logic in your parsing method.

### Error Messages Not Displaying

**Cause**: Error message binding incorrect.

**Solution**: Use the `sfGpsDsErrorMessage` getter:

```html
<div lwc:if="{sfGpsDsIsError}" class="ontario-error-messaging">
  {sfGpsDsErrorMessage}
</div>
```

### CSS Conflicts

**Cause**: Global CSS conflicting with Ontario DS.

**Solution**: Use the `caon-scope` class for CSS scoping:

```javascript
connectedCallback() {
  super.connectedCallback?.();
  this.classList.add("caon-scope");
}
```

---

## Implementation Guides

For specific OmniScript implementations, see:

- [CREATE_SITE_OMNISCRIPT.md](./CREATE_SITE_OMNISCRIPT.md) - Create Site wizard
- [INDUSTRY_ELIGIBILITY_OMNISCRIPT.md](./INDUSTRY_ELIGIBILITY_OMNISCRIPT.md) - Industry eligibility check

---

## Related Documentation

- [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) - Architecture and development patterns
- [COMPONENT_API.md](./COMPONENT_API.md) - Component properties reference
- [GIS_GUIDE.md](./GIS_GUIDE.md) - GIS components (Site Selector, Discharge Point)
- [LWR_GUIDE.md](./LWR_GUIDE.md) - LWR compatibility and best practices
- [BUILD_GUIDE.md](./BUILD_GUIDE.md) - Build and deployment
