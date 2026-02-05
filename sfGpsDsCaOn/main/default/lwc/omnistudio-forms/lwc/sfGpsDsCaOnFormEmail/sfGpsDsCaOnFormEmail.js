/*
 * Copyright (c) 2026, Shannon Schupbach, salesforce.com, inc.
 * Licensed under the BSD 3-Clause license.
 */

import SfGpsDsFormEmail from "c/sfGpsDsFormEmail";
import { computeClass } from "c/sfGpsDsHelpers";
import tmpl from "./sfGpsDsCaOnFormEmail.html";

export default class SfGpsDsCaOnFormEmail extends SfGpsDsFormEmail {
  _uniqueId = `email-${Math.random().toString(36).substring(2, 11)}`;

  get inputId() {
    return `${this._uniqueId}-input`;
  }
  get hintId() {
    return `${this._uniqueId}-hint`;
  }
  get errorId() {
    return `${this._uniqueId}-error`;
  }
  get showRequiredFlag() {
    return this._propSetMap?.required === true;
  }
  get showOptionalFlag() {
    return this._propSetMap?.optional === true && !this._propSetMap?.required;
  }
  get computedInputClassName() {
    return computeClass({
      "ontario-input": true,
      "ontario-input__error": this.sfGpsDsIsError
    });
  }
  get computedAriaDescribedBy() {
    return computeClass({
      [this.hintId]: this.mergedHelpText,
      [this.errorId]: this.sfGpsDsIsError
    });
  }
  get computedAriaInvalid() {
    return this.sfGpsDsIsError ? "true" : "false";
  }
  get computedAriaRequired() {
    return this._propSetMap?.required ? "true" : "false";
  }

  /**
   * Returns the display value for the input, converting undefined/null to empty string.
   */
  get displayValue() {
    return this.elementValue ?? "";
  }

  /* ========================================
   * EVENT HANDLERS
   * ======================================== */

  /**
   * Handles blur events from the native input element.
   * Updates the OmniScript data and triggers validation when the field loses focus.
   * This matches the base OmniScript behavior which only commits on blur
   * to avoid DOM conflicts during re-renders.
   * @param {Event} event - The blur event from the input element
   */
  handleBlur(event) {
    this.applyCallResp(event.target.value);
    this.reportValidity();
  }

  /* ========================================
   * PUBLIC METHODS - AODA Accessibility
   * ======================================== */

  focusInput() {
    try {
      const input = this.template.querySelector("input");
      if (input) input.focus();
    } catch {
      /* fail silently */
    }
  }

  hasValidationError() {
    return this.sfGpsDsIsError || false;
  }

  /* ========================================
   * LIFECYCLE HOOKS
   * ======================================== */

  initCompVariables() {
    super.initCompVariables();
    this._inputSelector = "input[data-omni-input]";
  }

  render() {
    return tmpl;
  }
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.classList.add("caon-scope");
  }
}
