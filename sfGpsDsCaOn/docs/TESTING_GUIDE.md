# Ontario Design System Testing Guide

This comprehensive guide covers all aspects of testing sfGpsDsCaOn components for compliance with the Ontario Design System (ODS), AODA accessibility requirements, and functional correctness.

## Table of Contents

1. [Testing Tools](#testing-tools)
2. [Pattern-Based Testing](#pattern-based-testing)
3. [Visual Compliance Checklist](#visual-compliance-checklist)
4. [Accessibility Testing Checklist](#accessibility-testing-checklist)
5. [Functional Testing Checklist](#functional-testing-checklist)
6. [Responsive Design Checklist](#responsive-design-checklist)
7. [Browser Compatibility Checklist](#browser-compatibility-checklist)
8. [OmniScript Integration Checklist](#omniscript-integration-checklist)
9. [Component-Specific Tests](#component-specific-tests)
10. [Testing Schedule](#testing-schedule)
11. [Test Execution Workflow](#test-execution-workflow)

---

## Testing Tools

### Automated Accessibility Testing

| Tool                       | Purpose                       | How to Use                                |
| -------------------------- | ----------------------------- | ----------------------------------------- |
| **axe DevTools**           | Automated WCAG testing        | Browser extension - run on each component |
| **WAVE**                   | Web accessibility evaluation  | Browser extension or wave.webaim.org      |
| **Lighthouse**             | Accessibility audit in Chrome | DevTools > Lighthouse > Accessibility     |
| **Pa11y**                  | CLI accessibility testing     | `npx pa11y <url>`                         |
| **eslint-plugin-jsx-a11y** | Static analysis for a11y      | Add to ESLint config                      |

### Screen Readers (Manual Testing)

| Tool          | Platform  | Notes                            |
| ------------- | --------- | -------------------------------- |
| **VoiceOver** | macOS/iOS | Built-in, Cmd+F5 to enable       |
| **NVDA**      | Windows   | Free, download from nvaccess.org |
| **JAWS**      | Windows   | Industry standard, commercial    |
| **TalkBack**  | Android   | Built-in accessibility service   |

### Visual Testing

| Tool                         | Purpose                 | How to Use                      |
| ---------------------------- | ----------------------- | ------------------------------- |
| **Ontario DS Documentation** | Reference specification | https://designsystem.ontario.ca |
| **Figma Ontario DS Kit**     | Design reference        | Compare against design specs    |
| **Percy/Chromatic**          | Visual regression       | Integrate with CI/CD            |
| **Storybook**                | Component isolation     | Test components in isolation    |

### Color & Contrast

| Tool                         | Purpose              | How to Use                           |
| ---------------------------- | -------------------- | ------------------------------------ |
| **WebAIM Contrast Checker**  | WCAG contrast ratios | webaim.org/resources/contrastchecker |
| **Colour Contrast Analyser** | Desktop app          | Download from TPGi                   |
| **Chrome DevTools**          | Inspect contrast     | Elements > Styles > color picker     |

### Browser DevTools

| Feature                        | Purpose                |
| ------------------------------ | ---------------------- |
| **Accessibility Tree**         | Inspect ARIA structure |
| **CSS Grid/Flexbox Inspector** | Verify layout          |
| **Device Emulation**           | Test responsive design |
| **Network Throttling**         | Test performance       |
| **Forced Colors Mode**         | Test high contrast     |

---

## Pattern-Based Testing

Pattern-based testing validates shared implementation patterns by thoroughly testing one representative component. When the representative passes, the pattern is validated for all components sharing that pattern.

**Benefits:**

- Reduces testing time by 60-70%
- Ensures consistency across component families
- Identifies pattern-level defects affecting multiple components

### Pattern Summary

| Pattern             | Representative | Components | Tests |
| ------------------- | -------------- | ---------- | ----- |
| A: Form Inputs      | TextInput      | 14         | 32    |
| B: Lwr Variants     | CardLwr        | 30+        | 7     |
| C: OmniStudio Forms | FormText       | 40+        | 8     |
| D: Cards            | Card           | 8          | 9     |
| E: Navigation       | Breadcrumbs    | 5          | 7     |

**Total**: 63 unique tests validate 97+ components.

### Pattern A: Form Input Components

**Representative**: sfGpsDsCaOnTextInput  
**Components Covered**: TextInput, TextArea, DateInput, Dropdown, CheckboxGroup, RadioGroup, CoordinateInput, NaicsCodePicker (14 total with variants)

**Shared Pattern Elements:**

1. Label association (`<label for="">` matches input `id`)
2. Required/Optional indicators
3. Hint text linked via `aria-describedby`
4. Error state (3px red border, `aria-invalid="true"`)
5. Focus state (3px cyan outline)
6. Validation integration

### Pattern B: Lwr Variant Components

**Representative**: sfGpsDsCaOnCardLwr  
**Components Covered**: All 30+ `*Lwr` components

**Shared Pattern Elements:**

1. Base class extension (`SfGpsDsLwc`)
2. Light DOM rendering (`static renderMode = "light"`)
3. Scope class application (`caon-scope`)
4. JSON string property parsing
5. CSS variable fallback

### Pattern C: OmniStudio Form Components

**Representative**: sfGpsDsCaOnFormText  
**Components Covered**: All 40+ components in `omnistudio-standard-runtime-forms/lwc/`

**Shared Pattern Elements:**

1. OmniScript base extension
2. Property resolution (`@api` then `jsonDef`)
3. Data binding via `applyCallResp`
4. Designer registration
5. Validation integration

### Pattern D: Card Components

**Representative**: sfGpsDsCaOnCard  
**Components Covered**: Card, SelectableCard, ActivityStatusCard, SiteTaskCard, NotificationCard (5 total)

**Shared Pattern Elements:**

1. Image handling with alt text
2. Configurable heading level
3. CTA/Link configuration
4. Slot content support
5. Responsive layout

### Pattern E: Navigation Components

**Representative**: sfGpsDsCaOnBreadcrumbs  
**Components Covered**: Breadcrumbs, InPageNav, StepIndicator, BackButton, BackToTop (5 total)

**Shared Pattern Elements:**

1. `<nav>` semantic element with `aria-label`
2. `aria-current="page"` on active item
3. Keyboard navigation
4. Standard link handling

---

## Visual Compliance Checklist

### Typography

- [ ] **Font Family**: Uses Open Sans (body) and Raleway (headings) from Ontario DS
- [ ] **Font Sizes**: Match Ontario DS type scale
  - H1: 2.5rem (40px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
  - H4: 1.25rem (20px)
  - Body: 1rem (16px)
- [ ] **Line Height**: 1.5 for body text, 1.2-1.3 for headings
- [ ] **Font Weight**: 400 regular, 600 semi-bold, 700 bold

### Colors

All colors should be implemented using CSS variables with fallbacks (e.g., `var(--ontario-colour-link, #0066cc)`).

- [ ] **Primary Blue**: #1a5a96 (Ontario Blue) - `--ontario-colour-primary`
- [ ] **Focus Color**: #009ADB (Cyan) - `--ontario-colour-focus`
- [ ] **Error Red**: #CD0000 - `--ontario-colour-error`
- [ ] **Success Green**: #118847 - `--ontario-colour-success`
- [ ] **Warning Yellow**: #FFC107 - `--ontario-colour-warning`
- [ ] **Text Color**: #1A1A1A (near-black) - `--ontario-colour-black`
- [ ] **Background**: #FFFFFF (white) - `--ontario-colour-white`
- [ ] **Border Gray**: #CCCCCC - `--ontario-greyscale-20`
- [ ] **Link Blue**: #0066CC - `--ontario-colour-link`

### Spacing

- [ ] Uses 8px grid system
- [ ] Consistent padding/margins per Ontario DS specs
- [ ] Proper spacing between form elements (24px minimum)

### Components Match Ontario DS

| Component  | Check Against                                                  |
| ---------- | -------------------------------------------------------------- |
| Buttons    | https://designsystem.ontario.ca/components/buttons.html        |
| Text Input | https://designsystem.ontario.ca/components/text-inputs.html    |
| Dropdown   | https://designsystem.ontario.ca/components/dropdown-lists.html |
| Checkbox   | https://designsystem.ontario.ca/components/checkboxes.html     |
| Radio      | https://designsystem.ontario.ca/components/radio-buttons.html  |
| Accordion  | https://designsystem.ontario.ca/components/accordions.html     |
| Callout    | https://designsystem.ontario.ca/components/callouts.html       |
| Card       | https://designsystem.ontario.ca/components/cards.html          |
| Table      | https://designsystem.ontario.ca/components/tables.html         |

---

## Accessibility Testing Checklist

### WCAG 2.1 Level AA Requirements

#### Perceivable (1.x)

- [ ] **1.1.1 Non-text Content**: All images have alt text
- [ ] **1.3.1 Info and Relationships**: Form labels properly associated
- [ ] **1.3.2 Meaningful Sequence**: Logical reading order
- [ ] **1.3.3 Sensory Characteristics**: Instructions don't rely on shape/color alone
- [ ] **1.3.4 Orientation**: Works in portrait and landscape
- [ ] **1.3.5 Identify Input Purpose**: Autocomplete attributes on form fields
- [ ] **1.4.1 Use of Color**: Information not conveyed by color alone
- [ ] **1.4.3 Contrast (Minimum)**: 4.5:1 for normal text, 3:1 for large text
- [ ] **1.4.4 Resize Text**: Content readable at 200% zoom
- [ ] **1.4.10 Reflow**: No horizontal scrolling at 320px width
- [ ] **1.4.11 Non-text Contrast**: UI elements have 3:1 contrast
- [ ] **1.4.12 Text Spacing**: Content works with increased spacing
- [ ] **1.4.13 Content on Hover/Focus**: Tooltips dismissible and persistent

#### Operable (2.x)

- [ ] **2.1.1 Keyboard**: All functionality keyboard accessible
- [ ] **2.1.2 No Keyboard Trap**: Can tab out of all components
- [ ] **2.1.4 Character Key Shortcuts**: Single-key shortcuts can be disabled
- [ ] **2.4.1 Bypass Blocks**: Skip links present
- [ ] **2.4.2 Page Titled**: Descriptive page titles
- [ ] **2.4.3 Focus Order**: Logical tab order
- [ ] **2.4.4 Link Purpose**: Links describe destination
- [ ] **2.4.6 Headings and Labels**: Descriptive headings
- [ ] **2.4.7 Focus Visible**: Clear focus indicators (3px outline)
- [ ] **2.5.1 Pointer Gestures**: Complex gestures have alternatives
- [ ] **2.5.2 Pointer Cancellation**: Actions on mouse up, not down
- [ ] **2.5.3 Label in Name**: Visible label matches accessible name
- [ ] **2.5.4 Motion Actuation**: Motion-based actions have alternatives

#### Understandable (3.x)

- [ ] **3.1.1 Language of Page**: `lang` attribute set
- [ ] **3.1.2 Language of Parts**: Language changes marked
- [ ] **3.2.1 On Focus**: No unexpected context changes on focus
- [ ] **3.2.2 On Input**: No unexpected changes on input
- [ ] **3.3.1 Error Identification**: Errors clearly described
- [ ] **3.3.2 Labels or Instructions**: Form fields have labels
- [ ] **3.3.3 Error Suggestion**: Error messages suggest fixes
- [ ] **3.3.4 Error Prevention**: Confirmation for important actions

#### Robust (4.x)

- [ ] **4.1.1 Parsing**: Valid HTML
- [ ] **4.1.2 Name, Role, Value**: ARIA properly implemented
- [ ] **4.1.3 Status Messages**: Status changes announced

### Screen Reader Testing

For each component, test with VoiceOver (Mac) or NVDA (Windows):

- [ ] Component name announced correctly
- [ ] Role announced (button, textbox, combobox, etc.)
- [ ] State announced (expanded, selected, checked, etc.)
- [ ] Error messages announced immediately
- [ ] Required field status announced
- [ ] Hints/help text associated and announced
- [ ] Live regions announce dynamic changes

### Keyboard Testing

| Key        | Expected Behavior                         |
| ---------- | ----------------------------------------- |
| Tab        | Move to next focusable element            |
| Shift+Tab  | Move to previous focusable element        |
| Enter      | Activate buttons/links                    |
| Space      | Toggle checkboxes, activate buttons       |
| Arrow keys | Navigate within component (radio, select) |
| Escape     | Close modals, dropdowns                   |
| Home/End   | Jump to first/last item in lists          |

### Modal Accessibility Testing

| Requirement           | Expected Behavior                       |
| --------------------- | --------------------------------------- |
| **role="dialog"**     | Dialog has correct role                 |
| **aria-modal="true"** | Modal behavior indicated                |
| **aria-labelledby**   | Points to unique title ID               |
| **aria-describedby**  | Points to content container             |
| **Unique IDs**        | Multiple modals have unique IDs         |
| **Focus trapping**    | Tab cycles within modal                 |
| **Escape to close**   | Escape key closes modal                 |
| **Close button**      | Has dynamic aria-label with modal title |
| **Body scroll lock**  | Background scroll disabled when open    |
| **Focus restoration** | Focus returns to trigger on close       |

---

## Functional Testing Checklist

### Form Components

- [ ] **Text Input**
  - Value updates on input
  - Blur event fires correctly
  - Validation triggers appropriately
  - Character count updates (if enabled)
  - Read-only state prevents editing

- [ ] **Textarea**
  - Multi-line input works
  - Character limit enforced
  - Auto-resize works (if enabled)

- [ ] **Dropdown/Select**
  - Options display correctly
  - Selection updates value
  - Placeholder shows when empty
  - Disabled state prevents interaction

- [ ] **Checkbox/Radio**
  - Click toggles state
  - Keyboard selection works
  - Group validation works
  - Required validation enforced

- [ ] **Date Input**
  - Date format matches Ontario standard (YYYY-MM-DD)
  - Invalid dates rejected
  - Min/max dates enforced

- [ ] **Typeahead/Lookup**
  - Search triggers on input
  - Options filter correctly
  - Selection populates field
  - Loading state displays
  - No results message shows

### Navigation Components

- [ ] **Accordion**
  - Expand/collapse works
  - Multiple expand mode works (if configured)
  - Animation smooth
  - State persists (if configured)

- [ ] **Breadcrumbs**
  - Links navigate correctly
  - Current page not linked
  - Truncation works on long paths

- [ ] **Back Button**
  - Navigates to previous page
  - URL override works

- [ ] **Step Indicator**
  - Shows current step
  - Progress percentage accurate
  - Step count correct

---

## Responsive Design Checklist

### Breakpoints (Ontario DS)

| Breakpoint | Width          | Test At                |
| ---------- | -------------- | ---------------------- |
| Mobile     | < 640px        | 320px, 375px, 414px    |
| Tablet     | 640px - 1024px | 768px, 1024px          |
| Desktop    | > 1024px       | 1280px, 1440px, 1920px |

### Mobile Testing

- [ ] Touch targets minimum 44x44px
- [ ] No horizontal scrolling
- [ ] Text readable without zooming
- [ ] Forms usable on small screens
- [ ] Modals/dropdowns fit viewport
- [ ] Navigation accessible

### Tablet Testing

- [ ] Layout adapts appropriately
- [ ] Touch and mouse both work
- [ ] Landscape orientation works

### Desktop Testing

- [ ] Content doesn't stretch too wide
- [ ] Whitespace appropriate
- [ ] Multi-column layouts work

---

## Browser Compatibility Checklist

### Required Browsers (Ontario Standard)

| Browser | Version           | Platform       |
| ------- | ----------------- | -------------- |
| Chrome  | Latest 2 versions | Windows, macOS |
| Firefox | Latest 2 versions | Windows, macOS |
| Safari  | Latest 2 versions | macOS, iOS     |
| Edge    | Latest 2 versions | Windows        |

### Testing Points

- [ ] Visual rendering matches
- [ ] JavaScript functionality works
- [ ] CSS Grid/Flexbox supported
- [ ] Custom properties (CSS variables) work
- [ ] Web Components render (lwc:external)
- [ ] Form validation works
- [ ] Focus indicators visible

---

## OmniScript Integration Checklist

### Component Registration

- [ ] Component appears in OmniScript Designer
- [ ] Component configurable in property panel
- [ ] Component renders in preview
- [ ] Component renders in runtime

### Data Binding

- [ ] Value syncs with OmniScript data
- [ ] `applyCallResp()` updates data correctly
- [ ] Formula fields work
- [ ] Conditional visibility works
- [ ] Repeat functionality works

### Validation

- [ ] Required validation enforces
- [ ] Pattern validation works
- [ ] Custom validation messages display
- [ ] Errors block navigation (if configured)

### Styling

- [ ] Ontario DS styles apply
- [ ] No SLDS style conflicts
- [ ] Custom CSS overrides work
- [ ] Light DOM compatibility (LWR)

---

## Component-Specific Tests

### Form Input Components (TextInput Pattern)

| Test ID | Category | Test Case                           | Expected Result                    |
| ------- | -------- | ----------------------------------- | ---------------------------------- |
| TI-001  | Visual   | Label displays above input          | Label visible, properly positioned |
| TI-002  | Visual   | Required indicator shows asterisk   | Red asterisk or "(required)" flag  |
| TI-003  | Visual   | Optional flag displays "(optional)" | Text shows when optional=true      |
| TI-004  | Visual   | Hint text displays below label      | Gray hint text visible             |
| TI-005  | Visual   | Error state shows red border        | 3px red border on input            |
| TI-006  | Visual   | Error message shows with icon       | SVG icon + error text              |
| TI-007  | Visual   | Focus state shows blue outline      | 3px cyan outline on focus          |
| TI-008  | A11y     | Label associated with input         | `for` matches input `id`           |
| TI-009  | A11y     | aria-required set when required     | `aria-required="true"`             |
| TI-010  | A11y     | aria-invalid set on error           | `aria-invalid="true"`              |
| TI-011  | A11y     | aria-describedby links hint/error   | IDs match hint and error elements  |
| TI-012  | A11y     | Screen reader announces label       | VoiceOver/NVDA reads label         |
| TI-013  | A11y     | Screen reader announces error       | Error announced on blur            |
| TI-014  | Keyboard | Tab focuses input                   | Input receives focus               |
| TI-015  | Keyboard | Can type in input                   | Characters appear                  |
| TI-016  | Keyboard | Tab moves to next element           | Focus leaves input                 |
| TI-017  | Func     | Value updates on input              | `value` property changes           |
| TI-018  | Func     | Blur event fires                    | `onblur` handler called            |
| TI-019  | Func     | Change event fires                  | `onchange` handler called          |
| TI-020  | Func     | maxLength enforced                  | Cannot type beyond limit           |

### Navigation Components (Breadcrumbs Pattern)

| Test ID | Category | Test Case                      | Expected Result                    |
| ------- | -------- | ------------------------------ | ---------------------------------- |
| BC-001  | Visual   | Trail displays horizontally    | Links in a row                     |
| BC-002  | Visual   | Separator between items        | Visual separator                   |
| BC-003  | Visual   | Current page not linked        | Last item is text                  |
| BC-004  | A11y     | nav element with aria-label    | Breadcrumb navigation              |
| BC-005  | A11y     | aria-current on current        | "page" on last item                |
| BC-006  | Keyboard | Links focusable                | Tab through links                  |
| BC-007  | Func     | Links navigate correctly       | URLs work                          |
| BC-008  | ODS      | Matches Ontario DS breadcrumbs | Compare to designsystem.ontario.ca |

### Card Components

| Test ID | Category | Test Case                        | Expected Result                    |
| ------- | -------- | -------------------------------- | ---------------------------------- |
| CD-001  | Visual   | Card container displays          | Styled box                         |
| CD-002  | Visual   | Image displays (if set)          | Image visible                      |
| CD-003  | Visual   | Title displays                   | Heading visible                    |
| CD-004  | Visual   | Description displays             | Body text visible                  |
| CD-005  | Visual   | Link/button displays             | CTA visible                        |
| CD-006  | A11y     | Card is focusable (if clickable) | Tab focuses card                   |
| CD-007  | A11y     | Image has alt text               | Describes image                    |
| CD-008  | A11y     | Heading structure correct        | Proper heading level               |
| CD-009  | Keyboard | Card keyboard activatable        | Enter activates link               |
| CD-010  | ODS      | Matches Ontario DS card          | Compare to designsystem.ontario.ca |

---

## Testing Schedule

### Phase 1: Critical Priority (Test First)

| Component              | Est. Time | Key Test Areas                                |
| ---------------------- | --------- | --------------------------------------------- |
| SiteSelectorTool       | 4-6 hours | Address search, coordinates, tab navigation   |
| DischargePointSelector | 3-4 hours | UTM/DMS/Decimal formats, map integration      |
| FormFormReview         | 4-5 hours | Auto-generation, ghost data, sensitive fields |
| Modal                  | 2-3 hours | Focus trap, escape key, screen reader         |

### Phase 2: High Priority (Test Second)

| Component           | Est. Time | Key Test Areas                           |
| ------------------- | --------- | ---------------------------------------- |
| NaicsCodePicker     | 2-3 hours | Cascading selection, code reconstruction |
| CoordinateInput     | 2 hours   | UTM/DMS/Decimal, format switching        |
| FormPlacesTypeahead | 2 hours   | Google API, address selection            |
| Search              | 1-2 hours | Autocomplete, keyboard navigation        |
| TaskListSalesforce  | 2 hours   | Data loading, permission filtering       |

### Phase 3: Medium Priority (Test Third)

| Component     | Est. Time  | Key Test Areas                    |
| ------------- | ---------- | --------------------------------- |
| FormLookup    | 1-2 hours  | Remote search, multi-select       |
| FormRange     | 1 hour     | Slider, keyboard, bounds          |
| FormStep      | 1-2 hours  | Navigation, skip link, validation |
| FormStepChart | 30 minutes | Progress display, screen reader   |

### Phase 4: Pattern Validation

| Pattern      | Representative | Est. Time |
| ------------ | -------------- | --------- |
| Form Inputs  | TextInput      | 1-2 hours |
| Cards        | Card           | 1 hour    |
| Navigation   | Breadcrumbs    | 1 hour    |
| Lwr Variants | CardLwr        | 1-2 hours |

**Total Estimated Testing Time**: 29-41 hours (4-5 days)

---

## Test Execution Workflow

### 1. Component Development Testing

```bash
# Run unit tests
npm run test

# Run specific test file
npm run test -- sfGpsDsCaOnModal.test.js

# Run tests with coverage
npm run test -- --coverage

# Run lint checks
npm run lint
```

### 2. LWC Unit Tests

The project includes Jest-based unit tests in `sfGpsDsCaOn/__tests__/`:

| Test File                                   | Component                | Coverage                                               |
| ------------------------------------------- | ------------------------ | ------------------------------------------------------ |
| `sfGpsDsCaOnModal.test.js`                  | Modal                    | Rendering, keyboard, unique IDs, aria-describedby      |
| `sfGpsDsCaOnCoordinateInput.test.js`        | Coordinate Input         | Formats, validation, fieldset/legend, aria-describedby |
| `sfGpsDsCaOnSiteSelectorTool.test.js`       | Site Selector            | Tabs, arrow keys, live regions, postMessage            |
| `sfGpsDsCaOnDischargePointSelector.test.js` | Discharge Point Selector | Tabs, arrow keys, coordinates, live regions            |

```bash
# Run all sfGpsDsCaOn tests
npm run test-caon

# Run with watch mode
npm run test-caon -- --watch
```

### 3. Apex Unit Tests

```bash
# Deploy and run tests
sf apex run test --class-names sfGpsDsCaOnSiteSelectorCtrTest --result-format human --code-coverage

# Run all tests with coverage
sf apex run test --test-level RunLocalTests --code-coverage --result-format human
```

### 4. Accessibility Audit

```bash
# Run axe-core on page
npx axe <url>

# Run Pa11y
npx pa11y <url> --standard WCAG2AA
```

### 5. Manual Testing

1. Open component in browser
2. Run axe DevTools extension
3. Run WAVE extension
4. Test with keyboard only (no mouse)
5. Test with screen reader (VoiceOver/NVDA)
6. Test at 200% zoom
7. Test at 320px width
8. Test in each required browser
9. Compare visually to Ontario DS docs

---

## Test Execution Log Template

### Component: **\*\***\_\_\_**\*\***

### Date: **\*\***\_\_\_**\*\***

### Tester: **\*\***\_\_\_**\*\***

| Test ID | Result | Notes |
| ------- | ------ | ----- |
|         |        |       |

### Summary

- Total Tests: \_\_\_
- Passed: \_\_\_
- Failed: \_\_\_
- Blocked: \_\_\_

### Issues Found

1.
2.
3.

---

## Reporting Issues

When reporting compliance issues, include:

1. **Component name**
2. **WCAG criterion violated** (e.g., 1.4.3 Contrast)
3. **Steps to reproduce**
4. **Expected behavior**
5. **Actual behavior**
6. **Screenshots/recordings**
7. **Browser/device info**
8. **Severity** (Critical/High/Medium/Low)

---

## Prerequisites Checklist

Before starting testing:

- [ ] Access to Salesforce org with components deployed
- [ ] Screen reader installed (VoiceOver on Mac, NVDA on Windows)
- [ ] Google Places API key configured (for FormPlacesTypeahead)
- [ ] ESRI map VF page deployed (for SiteSelectorTool, DischargePointSelector)
- [ ] Sample OmniScript with form components
- [ ] Browser dev tools for console monitoring

---

## Resources

### External Documentation

- [Ontario Design System](https://designsystem.ontario.ca)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [AODA Web Standards](https://www.ontario.ca/page/how-make-websites-accessible)
- [axe-core Documentation](https://www.deque.com/axe/)
- [WebAIM Resources](https://webaim.org/resources/)
- [Salesforce LWC Accessibility](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.accessibility)
- [Salesforce Apex Testing](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_testing.htm)
- [LWC Jest Testing](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.testing)

### Quick Visual Comparison URLs

| Component      | Ontario DS Reference URL                                       |
| -------------- | -------------------------------------------------------------- |
| Buttons        | https://designsystem.ontario.ca/components/buttons.html        |
| Text Inputs    | https://designsystem.ontario.ca/components/text-inputs.html    |
| Textareas      | https://designsystem.ontario.ca/components/text-areas.html     |
| Checkboxes     | https://designsystem.ontario.ca/components/checkboxes.html     |
| Radio Buttons  | https://designsystem.ontario.ca/components/radio-buttons.html  |
| Dropdown Lists | https://designsystem.ontario.ca/components/dropdown-lists.html |
| Date Input     | https://designsystem.ontario.ca/components/date-input.html     |
| Accordions     | https://designsystem.ontario.ca/components/accordions.html     |
| Callouts       | https://designsystem.ontario.ca/components/callouts.html       |
| Cards          | https://designsystem.ontario.ca/components/cards.html          |
| Tables         | https://designsystem.ontario.ca/components/data-tables.html    |
| Breadcrumbs    | https://designsystem.ontario.ca/components/breadcrumbs.html    |
| Back to Top    | https://designsystem.ontario.ca/components/back-to-top.html    |
| Step Indicator | https://designsystem.ontario.ca/components/step-indicator.html |
