# sfGpsDsCaOn Component Library: Stakeholder Briefing

> **Purpose**: Executive summary and strategic analysis for business and IT stakeholders
> **Updated**: February 2026
> **Audience**: Development managers, QA leads, business stakeholders, IT leadership

---

## Executive Summary

The sfGpsDsCaOn library implements the **Ontario Design System** within Salesforce, providing **134 Lightning Web Components** for government digital services. This briefing summarizes component value, risk, and testing recommendations.

### Key Numbers

| Metric                     | Value |
| -------------------------- | ----- |
| Total Components           | 134   |
| Core Components            | 60    |
| OmniStudio Form Components | 40+   |
| LWR (Lwr) Variants         | 30+   |
| Test Suites                | 29    |
| Automated Tests            | 905   |

---

## Section 1: Components with Greatest Reuse Value

These components are foundational building blocks used across multiple other components and screens.

### Tier 1: Critical Infrastructure (Highest Reuse)

| Component                | Reuse Count    | Business Value                                                                 | Test Coverage                  |
| ------------------------ | -------------- | ------------------------------------------------------------------------------ | ------------------------------ |
| `sfGpsDsLwc` base class  | 100 components | Every form, page, and widget depends on this foundation                        | ✅ Covered via component tests |
| `sfGpsDsHelpers` utility | 34 components  | Core CSS and debounce functionality across all UI                              | ✅ Covered via component tests |
| `sfGpsDsCaOnLabels`      | 19 components  | Centralized i18n/translations; single source of truth for all user-facing text | ✅ Covered via component tests |

### Tier 2: High Reuse Form Elements

| Component                | Usage Pattern                                   | Test Coverage |
| ------------------------ | ----------------------------------------------- | ------------- |
| sfGpsDsCaOnTextInput     | Every form with text entry                      | ✅ 12 tests   |
| sfGpsDsCaOnCheckboxGroup | Multi-select scenarios                          | ✅ 42 tests   |
| sfGpsDsCaOnRadioGroup    | Single-select scenarios                         | ✅ 40 tests   |
| sfGpsDsCaOnDateInput     | Date collection (3-field format per Ontario DS) | ✅ 38 tests   |
| sfGpsDsCaOnTextArea      | Multi-line text entry                           | ✅ 28 tests   |

### Tier 3: High Reuse Layout Components

| Component              | Usage Pattern                                       | Test Coverage |
| ---------------------- | --------------------------------------------------- | ------------- |
| sfGpsDsCaOnModal       | Used by map selectors, confirmations, and workflows | ✅ 34 tests   |
| sfGpsDsCaOnAccordion   | Collapsible content throughout                      | ✅ 12 tests   |
| sfGpsDsCaOnBreadcrumbs | Navigation across sites                             | ✅ 10 tests   |
| sfGpsDsCaOnCallout     | Alerts and notifications                            | ✅ 18 tests   |

**Business Impact**: A defect in any Tier 1 or Tier 2 component cascades to potentially all forms and pages.

---

## Section 2: Components with Greatest Time Savings (Complexity)

These components would require **significant development effort to build from scratch**. They represent the highest ROI in terms of "build vs. buy" time savings.

### Tier 1: Very High Complexity (1,000+ lines, multiple integrations)

| Component                         | Lines of Code | Complexity Factors                                                                                                                    | Estimated Build Time Saved | Test Coverage |
| --------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| sfGpsDsCaOnFormFormReview         | 2,500+        | Auto-generates review from OmniScript; recursive data extraction; ghost data detection; security blocklist; LWS-safe change detection | 6-8 weeks                  | ✅ 38 tests   |
| sfGpsDsCaOnSiteSelectorTool       | 1,237         | ESRI map integration via iframe; postMessage security; address geocoding; coordinate conversion; multiple search modes                | 4-6 weeks                  | ✅ 27 tests   |
| sfGpsDsCaOnDischargePointSelector | 1,038         | ESRI map integration; UTM/DMS/Decimal coordinate formats; complex validation                                                          | 3-4 weeks                  | ✅ 23 tests   |

### Tier 2: High Complexity (500-1,000 lines)

| Component                  | Lines of Code | Complexity Factors                                                                      | Estimated Build Time Saved | Test Coverage |
| -------------------------- | ------------- | --------------------------------------------------------------------------------------- | -------------------------- | ------------- |
| sfGpsDsCaOnModal           | 509           | Focus trapping (LWS-compatible); keyboard navigation; body scroll lock; ARIA compliance | 2-3 weeks                  | ✅ 34 tests   |
| sfGpsDsCaOnFormTypeahead   | 507           | Autocomplete with debouncing; keyboard navigation; OmniStudio data binding              | 2-3 weeks                  | ✅ 15 tests   |
| sfGpsDsCaOnNaicsCodePicker | 429           | 5-level cascading dropdown; dependent filtering; code reconstruction                    | 2-3 weeks                  | ✅ 28 tests   |
| sfGpsDsCaOnCoordinateInput | 402           | UTM/DMS/Decimal formats; coordinate conversion; format-specific validation              | 2 weeks                    | ✅ 18 tests   |
| sfGpsDsCaOnSearch          | 353           | Autocomplete with keyboard nav; ARIA live regions; debounced search                     | 1-2 weeks                  | ✅ 35 tests   |

**Total Estimated Time Savings**: 25-35 weeks of development effort

---

## Section 3: Components with Highest Risk

Risk is assessed based on: (1) external dependencies, (2) security surface area, (3) data sensitivity, and (4) complexity of failure modes.

### Tier 1: Critical Risk (External Integrations + Security)

| Component                         | Risk Factors                                                                                                           | Impact of Failure                                                                                                         | Test Coverage                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| sfGpsDsCaOnSiteSelectorTool       | ESRI map via Visualforce iframe; postMessage with origin validation; external geocoding APIs; LWS security constraints | Location data corruption; security vulnerability if origin validation fails; complete feature failure if ESRI unavailable | ✅ 27 tests + LWS security tests |
| sfGpsDsCaOnDischargePointSelector | Same ESRI integration risks; coordinate conversion errors could place points in wrong locations                        | Environmental permit data integrity issues; regulatory compliance risk                                                    | ✅ 23 tests + LWS security tests |
| sfGpsDsCaOnFormFormReview         | Recursive data processing; security blocklist for sensitive fields; auto-generation from schema                        | Sensitive data exposure if blocklist fails; missing/incorrect form review data                                            | ✅ 38 tests + security tests     |

### Tier 2: High Risk (Complex State + Accessibility)

| Component                  | Risk Factors                                                                    | Impact of Failure                                             | Test Coverage              |
| -------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------- |
| sfGpsDsCaOnModal           | Focus trapping; keyboard navigation; screen reader support                      | Accessibility violations (AODA non-compliance); keyboard trap | ✅ 34 tests including ARIA |
| sfGpsDsCaOnNaicsCodePicker | 5-level cascading dropdown; industry code selection impacts permit requirements | Incorrect NAICS code selection                                | ✅ 28 tests                |

---

## Section 4: Automated Test Coverage Summary

### Current Coverage: 29 Test Suites / 905 Tests

| Test Suite                                | Tests | Coverage Area                 |
| ----------------------------------------- | ----- | ----------------------------- |
| sfGpsDsCaOnTextInput.test.js              | 12    | Form input pattern validation |
| sfGpsDsCaOnTextArea.test.js               | 28    | Multi-line text entry         |
| sfGpsDsCaOnCheckboxGroup.test.js          | 42    | Multi-select checkbox groups  |
| sfGpsDsCaOnRadioGroup.test.js             | 40    | Single-select radio groups    |
| sfGpsDsCaOnDateInput.test.js              | 38    | 3-field date input            |
| sfGpsDsCaOnAccordion.test.js              | 12    | Collapsible content           |
| sfGpsDsCaOnBreadcrumbs.test.js            | 10    | Navigation breadcrumbs        |
| sfGpsDsCaOnStepIndicator.test.js          | 8     | Progress/step indication      |
| sfGpsDsCaOnSearch.test.js                 | 35    | Autocomplete search           |
| sfGpsDsCaOnNaicsCodePicker.test.js        | 28    | NAICS code cascading picker   |
| sfGpsDsCaOnTable.test.js                  | 24    | Data table rendering          |
| sfGpsDsCaOnFormLookup.test.js             | 25    | OmniStudio lookup integration |
| sfGpsDsCaOnFormRange.test.js              | 18    | Slider/range input            |
| sfGpsDsCaOnFormStep.test.js               | 22    | OmniStudio step navigation    |
| sfGpsDsCaOnFormStepChart.test.js          | 16    | Progress chart                |
| sfGpsDsCaOnModal.test.js                  | 34    | Modal dialog                  |
| sfGpsDsCaOnCallout.test.js                | 18    | Alerts/callouts               |
| sfGpsDsCaOnActionCard.test.js             | 15    | Action card                   |
| sfGpsDsCaOnCoordinateInput.test.js        | 18    | Coordinate input              |
| sfGpsDsCaOnSiteSelectorTool.test.js       | 27    | Map site selector             |
| sfGpsDsCaOnDischargePointSelector.test.js | 23    | Discharge point selector      |
| sfGpsDsCaOnDecisionExplainer.test.js      | 14    | Decision explainer            |
| sfGpsDsCaOnFormReview.test.js             | 38    | Form review                   |
| sfGpsDsCaOnFormEditBlock.test.js          | 12    | Edit block                    |
| sfGpsDsCaOnFormTypeahead.test.js          | 15    | Typeahead                     |
| sfGpsDsCaOnFormPlacesTypeahead.test.js    | 14    | Google Places typeahead       |
| lwsSecurity.test.js                       | 45    | LWS security patterns         |

---

## Section 5: Manual Testing Priorities

With improved automated test coverage, manual testing can focus on areas that cannot be easily automated.

### Areas Covered by Automated Tests (Minimal Manual Verification Required)

- ✅ Form input patterns (label association, error states, hint text)
- ✅ ARIA accessibility attributes
- ✅ Component rendering and basic functionality
- ✅ Event handling patterns
- ✅ LWS security compliance
- ✅ OmniStudio form component patterns

### Areas Still Requiring Manual Testing

| Area                                | Reason                                                | Components                                |
| ----------------------------------- | ----------------------------------------------------- | ----------------------------------------- |
| **Visual Design Compliance**        | Cannot verify visual styling matches Ontario DS specs | All components                            |
| **Cross-Browser Rendering**         | Jest uses jsdom, not real browsers                    | All components                            |
| **Real ESRI Map Integration**       | External API cannot be fully mocked                   | SiteSelectorTool, DischargePointSelector  |
| **OmniStudio Designer Integration** | Requires actual OmniStudio environment                | All Form\* components                     |
| **Screen Reader Behavior**          | Need real assistive technology testing                | Modal, Search, Accordion, all form inputs |
| **Mobile/Touch Interactions**       | Cannot simulate touch in jsdom                        | All components                            |

---

## Section 6: Decision Support Matrix

| Category                  | Top Components                                           | Status                                           |
| ------------------------- | -------------------------------------------------------- | ------------------------------------------------ |
| **Greatest Reuse**        | Labels, TextInput, Modal                                 | ✅ All have automated tests                      |
| **Greatest Time Savings** | FormFormReview, SiteSelectorTool, DischargePointSelector | ✅ All have automated tests                      |
| **Highest Risk**          | SiteSelectorTool, FormFormReview, Modal                  | ✅ All have automated tests + LWS security tests |
| **Pattern Coverage**      | TextInput, FormText, Breadcrumbs                         | ✅ Pattern tests validate many components        |
| **Unique Components**     | SiteSelectorTool, NaicsCodePicker, FormFormReview        | ✅ All have automated tests                      |

### Key Decisions

| Question                                             | Answer                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| Which components should never have breaking changes? | Labels, TextInput, Modal, Header, Footer                                  |
| Which components represent our custom IP?            | SiteSelectorTool, DischargePointSelector, FormFormReview, NaicsCodePicker |
| Which components need security review?               | SiteSelectorTool, DischargePointSelector, MapSelectorMixin                |
| Where should we invest in test coverage first?       | Form elements (pattern covers 14+), then Navigation (AODA)                |
| What's the single biggest risk?                      | postMessage security in map components                                    |

---

## Section 7: Test Execution Commands

```bash
# Run all sfGpsDsCaOn tests
npm run test-caon

# Run with coverage report
npm run test-caon:coverage

# Run accessibility tests only
npm run test-caon:a11y

# Run specific test file
npm run test-caon -- --testPathPattern='sfGpsDsCaOnModal'

# Run in watch mode during development
npm run test-caon:watch
```

---

## Appendix: Component Inventory by Category

### Form Elements (14)

TextInput, TextArea, DateInput, CheckboxGroup, RadioGroup, CoordinateInput, NaicsCodePicker, CharacterCount

### Layout (12)

Card, ActionCard, FeatureCard, LinkCard, ActivityStatusCard, SiteTaskCard, NotificationCard, Modal, Callout, Aside, LoadingIndicator

### Navigation (8)

Header, Footer, Breadcrumbs, InPageNav, StepIndicator, BackButton, BackToTop, Accordion

### Data Display (4)

Table, SummaryList, TaskList, TaskListSalesforce

### GIS/Location (4)

SiteSelectorTool, DischargePointSelector, CoordinateInput, MapSelectorMixin

### Search (2)

Search, SearchEinstein

### OmniStudio Forms (40+)

FormText, FormTextarea, FormNumber, FormCurrency, FormDate, FormDateTime, FormSelect, FormRadio, FormCheckbox, FormLookup, FormTypeahead, FormPlacesTypeahead, FormFile, FormRange, FormStep, FormStepChart, FormFormReview, FormSiteSelectorTool, FormDischargePointSelector, FormNaicsCodePicker, FormSelectableCards, and more...

### Utilities (5)

Labels, UserMessages, DebugUtils, ErrorTracker, MapSelectorMixin

---

## Next Steps

1. **Add visual regression tests** - Consider adding screenshot comparison tests for Ontario DS compliance
2. **Add integration tests** - Create end-to-end tests for OmniScript flows
3. **Add performance tests** - Profile FormFormReview with large datasets
4. **Add real browser tests** - Use Playwright or Cypress for cross-browser validation

---

## Contact

For technical questions about this analysis, contact the development team lead.
