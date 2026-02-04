/*
 * Copyright (c) 2026, Shannon Schupbach, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import SfGpsDsFormSelect from "c/sfGpsDsFormSelect";
import { omniGetMergedField } from "c/sfGpsDsOmniHelpers";
import { computeClass, replaceInnerHtml } from "c/sfGpsDsHelpers";
import tmpl from "./sfGpsDsCaOnFormSelect.html";

/**
 * @slot Select
 * @description Ontario Design System Select/Dropdown component for OmniStudio forms.
 * Renders inline (Shadow DOM) - does not use Light DOM child components.
 *
 * ## HTML Hint Support
 * The help text field supports rich HTML content including:
 * - Bullet lists (`<ul>`, `<li>`)
 * - Links (`<a href="...">`)
 * - Text formatting (`<strong>`, `<em>`)
 * - Paragraphs (`<p>`)
 *
 * Configure in OmniScript Designer:
 * - Set the "Help Text" field with HTML markup
 * - Merge fields (e.g., %FieldName%) are supported within the HTML
 *
 * Compliance:
 * - LWR: Compatible (uses lwc:dom="manual" for dynamic HTML)
 * - LWS: Compatible (uses replaceInnerHtml helper)
 * - Ontario DS: Uses ontario-dropdown styling
 * - WCAG 2.1 AA / AODA: Focus management, aria-describedby links hint to input
 */
export default class SfGpsDsCaOnFormSelect extends SfGpsDsFormSelect {
  /* ========================================
   * CONSTANTS
   * ======================================== */

  /**
   * CSS selector for the hint container element.
   * Used to locate the element for HTML injection.
   * @type {string}
   */
  static HINT_QUERY_SELECTOR = ".sfGpsDsCaOnHint";
  /**
   * Unique ID for this component instance.
   * Used for element IDs to avoid duplicates in Shadow DOM.
   * @private
   */
  _uniqueId = `select-${Math.random().toString(36).substring(2, 11)}`;

  /* ========================================
   * COMPUTED PROPERTIES
   * ======================================== */

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

  get defaultOptionLabel() {
    return this._defaultLabel || "Select";
  }

  get computedSelectClassName() {
    return computeClass({
      "ontario-input": true,
      "ontario-dropdown": true,
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
   * Decorate options with selected state based on current value.
   */
  get decoratedOptions() {
    if (!this._options || !Array.isArray(this._options)) {
      return [];
    }
    return this._options.map((opt) => ({
      ...opt,
      selected: opt.value === this.elementValue
    }));
  }

  /* ========================================
   * LIFECYCLE
   * ======================================== */

  render() {
    return tmpl;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.classList.add("caon-scope");
  }

  /**
   * Called after each render to inject HTML hint content.
   * Uses replaceInnerHtml for LWS-compatible DOM manipulation.
   */
  renderedCallback() {
    if (super.renderedCallback) {
      super.renderedCallback();
    }

    const hintElement = this.template.querySelector(
      SfGpsDsCaOnFormSelect.HINT_QUERY_SELECTOR
    );

    if (hintElement && this.mergedHelpText) {
      // Get help text with merge fields resolved
      const mergedContent = omniGetMergedField(this, this._handleHelpText);

      // Safely inject the HTML content
      replaceInnerHtml(hintElement, mergedContent);
    }
  }
}
