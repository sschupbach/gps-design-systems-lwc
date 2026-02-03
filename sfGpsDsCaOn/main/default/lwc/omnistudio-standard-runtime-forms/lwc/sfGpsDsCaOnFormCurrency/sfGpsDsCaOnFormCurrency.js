/*
 * Copyright (c) 2026, Shannon Schupbach, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import SfGpsDsFormCurrency from "c/sfGpsDsFormCurrency";
import tmpl from "./sfGpsDsCaOnFormCurrency.html";

/**
 * @slot Currency
 * @description Ontario Design System Currency input for OmniStudio forms.
 * Uses TextInput inner component with currency prefix.
 * 
 * Follows two-level pattern:
 * - This wrapper handles OmniScript integration
 * - sfGpsDsCaOnTextInput handles UX/styling
 *
 * Compliance:
 * - LWR: Uses Light DOM inner component
 * - LWS: No eval(), proper namespace imports
 * - Ontario DS: Inherits from TextInput component
 * - WCAG 2.1 AA: Inherited from TextInput
 */
export default class SfGpsDsCaOnFormCurrency extends SfGpsDsFormCurrency {
  /**
   * Currency symbol to display as prefix.
   * Default to CAD for Ontario.
   */
  get currencySymbol() {
    return "$";
  }

  /* lifecycle */

  render() {
    return tmpl;
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    this.classList.add("caon-scope");
  }
}
