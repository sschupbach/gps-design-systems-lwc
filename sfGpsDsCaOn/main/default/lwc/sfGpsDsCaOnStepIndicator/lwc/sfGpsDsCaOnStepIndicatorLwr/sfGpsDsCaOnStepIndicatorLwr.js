/*
 * Copyright (c) 2025, Shannon Schupbach, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { api } from "lwc";
import SfGpsDsLwc from "c/sfGpsDsLwc";
// eslint-disable-next-line no-unused-vars
const DEBUG = false;
// eslint-disable-next-line no-unused-vars
const CLASS_NAME = "SfGpsDsCaOnStepIndicatorLwr";
export default class SfGpsDsCaOnStepIndicatorLwr extends SfGpsDsLwc {
    static renderMode = "light";
    // @ts-ignore
    @api
    currentStep;
    // @ts-ignore
    @api
    numberOfSteps;
    // @ts-ignore
    @api
    percentageComplete;
    // @ts-ignore
    @api
    showBackButton;
    // @ts-ignore
    @api
    backButtonUrl;
    // @ts-ignore
    @api
    language;
    // @ts-ignore
    @api
    className;
    /* lifecycle */
    connectedCallback() {
        super.connectedCallback?.();
        this.classList.add("caon-scope");
    }
}
