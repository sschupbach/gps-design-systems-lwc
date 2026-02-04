/*
 * Copyright (c) 2026, Shannon Schupbach, salesforce.com, inc.
 * Licensed under the BSD 3-Clause license.
 */

import { api, track } from "lwc";
import SfGpsDsFormMultiselect from "c/sfGpsDsFormMultiselect";
import { computeClass } from "c/sfGpsDsHelpers";
import tmpl from "./sfGpsDsCaOnFormSelectableCards.html";

export default class SfGpsDsCaOnFormSelectableCards extends SfGpsDsFormMultiselect {
  _uniqueId = `selectable-cards-${Math.random().toString(36).substring(2, 11)}`;

  @api configRequired;
  @api configErrorMessage;
  @api configOptionsJson;

  @track _expandedIndices = {};

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
      "sfgpsdscaon-selectable-card-group": true,
      "sfgpsdscaon-selectable-card-group--error": this.sfGpsDsIsError
    });
  }

  get inlineDecoratedOptions() {
    const selected = Array.isArray(this.elementValue)
      ? this.elementValue
      : this.elementValue
        ? [this.elementValue]
        : [];

    // Get extended options from configOptionsJson or nested propSetMap
    const nestedPropSetMap = this.jsonDef?.propSetMap?.propSetMap;
    const extendedOptionsJson =
      this.configOptionsJson || nestedPropSetMap?.optionsJson;
    let extendedOptions = {};

    if (extendedOptionsJson) {
      try {
        const parsed =
          typeof extendedOptionsJson === "string"
            ? JSON.parse(extendedOptionsJson)
            : extendedOptionsJson;
        if (Array.isArray(parsed)) {
          parsed.forEach((opt) => {
            extendedOptions[opt.value] = opt;
          });
        }
      } catch (e) {
        console.error("Error parsing optionsJson", e);
      }
    }

    return (this._realtimeOptions || []).map((opt, index) => {
      const optValue = opt.value || opt.name || opt.label;
      const optLabel = opt.label || opt.value || opt.name;
      const extended = extendedOptions[optValue] || {};
      const isChecked = selected.includes(optValue);
      const isExpanded = this._expandedIndices[index] || false;

      return {
        value: optValue,
        label: extended.label || optLabel,
        description: extended.description || "",
        linkLabel: extended.linkLabel || "",
        linkUrl: extended.linkUrl || "",
        badge: extended.badge || "",
        badgeVariant: extended.badgeVariant || "info",
        expandedContent: extended.expandedContent || "",
        checked: isChecked,
        isExpanded: isExpanded,
        expandButtonLabel: isExpanded ? "View less" : "View more",
        key: `opt-${index}-${optValue}`,
        id: `${this._uniqueId}-opt-${index}`,
        index: index,
        cardClassName: computeClass({
          "sfgpsdscaon-selectable-card": true,
          "sfgpsdscaon-selectable-card--checked": isChecked
        }),
        badgeClassName: computeClass({
          "sfgpsdscaon-selectable-card__badge": true,
          [`sfgpsdscaon-selectable-card__badge--${extended.badgeVariant || "info"}`]: true
        })
      };
    });
  }

  /* Event handlers */
  handleCardCheckboxChange(event) {
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

    this.applyCallResp(currentValues, false, false);
  }

  handleExpandClick(event) {
    const index = parseInt(event.currentTarget.dataset.index, 10);
    this._expandedIndices = {
      ...this._expandedIndices,
      [index]: !this._expandedIndices[index]
    };
  }

  /* Validation overrides */
  @api checkValidity() {
    if (
      this._propSetMap?.required &&
      (!this.elementValue || this.elementValue.length === 0)
    ) {
      return false;
    }
    return true;
  }

  @api reportValidity() {
    const isValid = this.checkValidity();
    this._showValidation = !isValid;
    this.isValid = isValid;
    return isValid;
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
