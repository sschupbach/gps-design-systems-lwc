# EASR Implementation Guide

This comprehensive guide documents how to implement the EASR (Environmental Activity and Sector Registry) application using Ontario Design System components.

## Table of Contents

1. [Overview](#overview)
2. [Page Layout Patterns](#page-layout-patterns)
3. [Home Page](#home-page)
4. [Registration Page](#registration-page)
5. [Activity Cards](#activity-cards)
6. [Form Questions](#form-questions)
7. [GIS Components](#gis-components)
8. [Review and Attestation](#review-and-attestation)
9. [Component Quick Reference](#component-quick-reference)

---

## Overview

The EASR application consists of several key pages:

| Page         | Purpose                                     | Key Components                          |
| ------------ | ------------------------------------------- | --------------------------------------- |
| Home         | Entry point with services and notifications | Feature Cards, Notification Cards       |
| Registration | Activity selection and management           | Activity Status Cards, Selectable Cards |
| Create Site  | Site creation wizard                        | Site Selector Tool, NAICS Picker        |
| Eligibility  | Industry eligibility checks                 | Radio Groups, Messaging, Callouts       |
| Review       | Answer review and attestation               | Summary Lists, Checkboxes               |

---

## Page Layout Patterns

### Standard Form Page Layout

```html
<!-- Back link -->
<a href="#" class="ontario-back-link">
  <span class="ontario-icon ontario-icon-back"></span>
  Back
</a>

<!-- Step indicator (optional) -->
<div class="ontario-step-indicator">Step X of X</div>

<!-- Page title -->
<h1 class="ontario-h1">Page Title</h1>

<!-- Page description -->
<p class="ontario-lead-statement">Description text...</p>

<!-- Main content area -->
<div class="ontario-form-group">
  <!-- Form components go here -->
</div>

<!-- Action buttons -->
<div class="ontario-button-group">
  <c-sf-gps-ds-ca-on-button
    label="Save and continue"
    variant="primary"
  ></c-sf-gps-ds-ca-on-button>
  <c-sf-gps-ds-ca-on-button
    label="Save draft"
    variant="secondary"
  ></c-sf-gps-ds-ca-on-button>
</div>

<!-- Back to top button -->
<c-sf-gps-ds-ca-on-back-to-top></c-sf-gps-ds-ca-on-back-to-top>
```

---

## Home Page

### Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Environmental Permissions Platform                       │
├─────────────────────────────────────────────────────────────────┤
│ SERVICES (2x2 grid)                                              │
│ - Pre-screening       - Apply or register                        │
│ - Pre-submission      - Manage permissions                       │
├─────────────────────────────────────────────────────────────────┤
│ MANAGE ACCOUNT (2x2 + 1 grid)                                    │
│ - Business profile    - Payments                                 │
│ - Site information    - Representatives                          │
│ - Reporting                                                      │
├─────────────────────────────────────────────────────────────────┤
│ NOTIFICATIONS (3 column)                                         │
│ - Action required     - Reminders        - Status updates        │
├─────────────────────────────────────────────────────────────────┤
│ RELATED LINKS (3 column)                                         │
└─────────────────────────────────────────────────────────────────┘
```

### Component Configuration

#### Services Section (Feature Cards)

| Property      | Value                                                |
| ------------- | ---------------------------------------------------- |
| Heading       | Pre-screening                                        |
| Description   | Find out what environmental permissions you require. |
| URL           | /pre-screening                                       |
| Heading Level | h2                                                   |

#### Notifications Section

Use the **Ontario DS Notification Card (Data Connected)** component:

| Notification Type | Query                                    |
| ----------------- | ---------------------------------------- |
| action            | High-priority Tasks due today or overdue |
| reminder          | Tasks due within the next 7 days         |
| status            | Tasks updated in last 24 hours           |

---

## Registration Page

### Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ < Back                                                           │
│ EASR registration                                                │
│ EASR activity - Add your activities here...                      │
│ ┌─────────────────┐                                              │
│ │ ⊕ Add activity  │  ← Primary button with icon                  │
│ └─────────────────┘                                              │
│ ┌─────────────────┐                                              │
│ │   Back to home  │  ← Secondary button                          │
│ └─────────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Add Activity with Selectable Cards

```json
{
  "type": "Custom LWC",
  "lwcComponentOverride": "c-sf-gps-ds-ca-on-form-selectable-cards",
  "propSetMap": {
    "configRequired": false,
    "configOptionsJson": "[{\"value\":\"air-emissions\",\"label\":\"Air emissions\",\"description\":\"...\"}]"
  }
}
```

#### Activity Options

| Value                   | Label                              |
| ----------------------- | ---------------------------------- |
| air-emissions           | Air emissions                      |
| automotive-refurbishing | Automotive refurbishing facility   |
| elv-disposal            | End-of-life vehicle waste disposal |
| printing-facility       | Printing facility                  |
| solar-facility          | Solar facility                     |
| stormwater-management   | Stormwater management works        |
| waste-management        | Waste management system            |
| water-taking            | Water taking activities            |

---

## Activity Cards

### Activity Status Card

```html
<c-sf-gps-ds-ca-on-activity-status-card
  title="Air emissions"
  show-remove-link
  onremove="{handleRemove}"
>
  <div slot="fields">
    <strong>Business name:</strong> {businessName}
    <strong>Registration site(s):</strong> {sites}
  </div>
  <div slot="progress">0 out of X steps completed</div>
  <div slot="actions">
    <c-sf-gps-ds-ca-on-button
      label="Start"
      variant="primary"
    ></c-sf-gps-ds-ca-on-button>
  </div>
</c-sf-gps-ds-ca-on-activity-status-card>
```

### Site Task Card

```html
<c-sf-gps-ds-ca-on-site-task-card
  title="Site 1 name identifier"
  show-remove-link
>
  <ul slot="tasks">
    <li>Activity information - NOT STARTED</li>
    <li>Stormwater discharge location - NOT STARTED</li>
    <li>Related applications - NOT STARTED</li>
  </ul>
  <div slot="progress">0 out of 3 sections (Not started)</div>
</c-sf-gps-ds-ca-on-site-task-card>
```

### Badge Status Mapping

| Status       | Badge Type         | Label            |
| ------------ | ------------------ | ---------------- |
| Completed    | success            | COMPLETED        |
| Not Started  | default            | NOT STARTED      |
| In Progress  | info               | IN PROGRESS      |
| Cannot Start | default (disabled) | CANNOT START YET |

---

## Form Questions

### Radio Group Question

```html
<div class="ontario-form-group">
  <fieldset class="ontario-fieldset">
    <legend class="ontario-fieldset__legend">
      <h2 class="ontario-h4">
        4. Will your storm water management works be servicing any of the
        following sites?
        <span class="ontario-label__flag">(required)</span>
      </h2>
    </legend>

    <ul class="ontario-list">
      <li>A waste disposal site...</li>
      <li>An abandoned motor vehicle site...</li>
    </ul>

    <c-sf-gps-ds-ca-on-radio-group
      name="question4"
      options="{radioOptions}"
      value="{selectedValue}"
      onchange="{handleChange}"
    ></c-sf-gps-ds-ca-on-radio-group>
  </fieldset>
</div>
```

### Hard Stop Callout

```html
<c-sf-gps-ds-ca-on-callout
  heading="You do not meet the requirements"
  type="error"
>
  <p>
    Based on your answer, you do not meet the requirements to register. You may
    need to
    <a href="#">apply for an Environmental Compliance Approval (ECA)</a>.
  </p>
</c-sf-gps-ds-ca-on-callout>
```

### Callout Types

| Scenario                  | Type        | Icon                |
| ------------------------- | ----------- | ------------------- |
| Hard stop / Ineligibility | error       | Red error icon      |
| Regulatory warning        | warning     | Yellow warning icon |
| Helpful information       | information | Blue info icon      |
| Success confirmation      | success     | Green checkmark     |

---

## GIS Components

### Site Selector Tool

```html
<c-sf-gps-ds-ca-on-site-selector-tool
  heading="Search for your site address"
  description="Enter an address to search or click on the map."
  onaddressselected="{handleAddressSelected}"
></c-sf-gps-ds-ca-on-site-selector-tool>
```

**Features:**

- Address search with ESRI geocoding
- Map-based site point selection
- Layer controls for imagery, protected areas
- UTM coordinate output

### Discharge Point Selector

```html
<c-sf-gps-ds-ca-on-discharge-point-selector
  site-name="{siteName}"
  site-address="{siteAddress}"
  ondischargeselected="{handleDischargeSelected}"
></c-sf-gps-ds-ca-on-discharge-point-selector>
```

**Coordinate Formats:**

- UTM (Zone, East, North)
- DMS (Degrees, Minutes, Seconds)
- Decimal (Latitude, Longitude)

---

## Review and Attestation

### Summary List

```html
<c-sf-gps-ds-ca-on-summary-list
  items="{coordinateItems}"
  ratio="1-2"
></c-sf-gps-ds-ca-on-summary-list>
```

```javascript
get coordinateItems() {
  return [
    { term: 'Method of collection', description: 'Map' },
    { term: 'UTM zone', description: '17' },
    { term: 'UTM east (M)', description: '641541.5' }
  ];
}
```

### Attestation Form

```html
<section>
  <h2 class="ontario-h2">Attestation</h2>

  <c-sf-gps-ds-ca-on-checkbox-group
    name="attestationConfirm"
    options="{confirmationOptions}"
    values="{confirmationValues}"
  ></c-sf-gps-ds-ca-on-checkbox-group>

  <c-sf-gps-ds-ca-on-callout type="warning">
    The person certifying must have the authority to bind the registrant...
  </c-sf-gps-ds-ca-on-callout>
</section>
```

---

## Component Quick Reference

| UI Pattern           | Component                           | Key Properties            |
| -------------------- | ----------------------------------- | ------------------------- |
| Activity cards       | `sfGpsDsCaOnActivityStatusCard`     | title, show-remove-link   |
| Site task cards      | `sfGpsDsCaOnSiteTaskCard`           | title, show-remove-link   |
| Status badges        | `sfGpsDsCaOnBadge`                  | label, type               |
| Error/Warning alerts | `sfGpsDsCaOnCallout`                | heading, type             |
| Review summaries     | `sfGpsDsCaOnSummaryList`            | items, ratio              |
| Site selector        | `sfGpsDsCaOnSiteSelectorTool`       | heading, description      |
| Discharge selector   | `sfGpsDsCaOnDischargePointSelector` | site-name, site-address   |
| NAICS picker         | `sfGpsDsCaOnNaicsCodePicker`        | value                     |
| Buttons              | `sfGpsDsCaOnButton`                 | label, variant, icon-name |
| Text inputs          | `sfGpsDsCaOnTextInput`              | label, name, value        |
| Radio groups         | `sfGpsDsCaOnRadioGroup`             | name, options, value      |
| Checkbox groups      | `sfGpsDsCaOnCheckboxGroup`          | name, options, values     |
| Date inputs          | `sfGpsDsCaOnDateInput`              | label, value              |
| Back to top          | `sfGpsDsCaOnBackToTop`              | (none)                    |
| Modal dialogs        | `sfGpsDsCaOnModal`                  | heading, is-open          |

---

## Navigation Flow

| Page         | Actions           | Destinations        |
| ------------ | ----------------- | ------------------- |
| Home         | Pre-screening     | /pre-screening      |
| Home         | Apply or register | /apply-register     |
| Registration | Add activity      | /easr/activity/new  |
| Registration | Back to home      | /                   |
| Activity     | Start             | /easr/activity/{id} |
| Create Site  | Save              | /easr/sites         |

---

## Accessibility Considerations

1. **Heading Hierarchy**: Use proper h1 > h2 > h3 structure
2. **Button Purpose**: Icon + text for clear action indication
3. **Keyboard Navigation**: All elements keyboard accessible
4. **Screen Reader**: Icons have aria-hidden, buttons have labels
5. **Form Labels**: All inputs have associated labels
6. **Error Announcements**: role="alert" for error messages

---

## Related Documentation

- [COMPONENT_API.md](./COMPONENT_API.md) - Component properties reference
- [OMNISTUDIO_GUIDE.md](./OMNISTUDIO_GUIDE.md) - OmniStudio forms and configuration
- [GIS_GUIDE.md](./GIS_GUIDE.md) - GIS components (Site Selector, Discharge Point)
- [CREATE_SITE_OMNISCRIPT.md](./CREATE_SITE_OMNISCRIPT.md) - Create Site wizard implementation
- [INDUSTRY_ELIGIBILITY_OMNISCRIPT.md](./INDUSTRY_ELIGIBILITY_OMNISCRIPT.md) - Eligibility check implementation
