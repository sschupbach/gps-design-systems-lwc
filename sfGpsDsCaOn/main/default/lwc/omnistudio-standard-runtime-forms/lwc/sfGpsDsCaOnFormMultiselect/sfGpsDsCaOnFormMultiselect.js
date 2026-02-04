/*
 * Copyright (c) 2026, Shannon Schupbach, salesforce.com, inc.
 * Licensed under the BSD 3-Clause license.
 */

import SfGpsDsFormMultiselect from "c/sfGpsDsFormMultiselect";
import { computeClass } from "c/sfGpsDsHelpers";
import tmpl from "./sfGpsDsCaOnFormMultiselect.html";

export default class SfGpsDsCaOnFormMultiselect extends SfGpsDsFormMultiselect {
  _uniqueId = `multiselect-${Math.random().toString(36).substring(2, 11)}`;

  /* IDs */
  get hintId() {
    return `${this._uniqueId}-hint`;
  }
  get errorId() {
    return `${this._uniqueId}-error`;
  }

  /* Computed properties */
  get showRequiredFlag() {
    return this._propSetMap?.required === true;
  }
  get showOptionalFlag() {
    return this._propSetMap?.optional === true && !this._propSetMap?.required;
  }
  get computedAriaRequired() {
    return this._propSetMap?.required ? "true" : "false";
  }
  get computedAriaInvalid() {
    return this.sfGpsDsIsError ? "true" : "false";
  }

  get computedAriaDescribedBy() {
    return computeClass({
      [this.hintId]: this.mergedHelpText,
      [this.errorId]: this.sfGpsDsIsError
    });
  }

  get computedFieldsetClassName() {
    return computeClass({
      "ontario-fieldset": true,
      "ontario-fieldset--error": this.sfGpsDsIsError
    });
  }

  get inlineDecoratedOptions() {
    const selected = Array.isArray(this.elementValue)
      ? this.elementValue
      : this.elementValue
        ? [this.elementValue]
        : [];

    return (this._realtimeOptions || []).map((opt, index) => {
      const optIdentifier = opt.name || opt.value || opt.label;
      const optDisplayLabel = opt.value || opt.label || opt.name;

      return {
        ...opt,
        value: optIdentifier,
        label: optDisplayLabel,
        id: `${this._uniqueId}-opt-${index}`,
        checked: selected.includes(optIdentifier)
      };
    });
  }

  /* Event handlers */
  handleCheckboxChange(event) {
    const checkbox = event.target;
    const value = checkbox.value;
    const checked = checkbox.checked;

    let currentValues = Array.isArray(this.elementValue)
      ? [...this.elementValue]
      : this.elementValue
        ? [this.elementValue]
        : [];

    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      currentValues = currentValues.filter((v) => v !== value);
    }

    // Update OmniScript data
    this.applyCallResp(currentValues);
  }

  /* Lifecycle */
  render() {
    return tmpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this._readOnlyClass = "sfgpsdscaon-read-only";
    this.classList.add("caon-scope");
  }
}
