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
const CLASS_NAME = "SfGpsDsCaOnFooterExpandedLwr";
export default class SfGpsDsCaOnFooterExpandedLwr extends SfGpsDsLwc {
    static renderMode = "light";
    // @ts-ignore
    @api
    footerLinksJson;
    get parsedFooterLinks() {
        if (!this.footerLinksJson)
            return undefined;
        try {
            return JSON.parse(this.footerLinksJson);
        }
        catch (e) {
            this.addError("FL-JP", "Footer links JSON is invalid");
            return undefined;
        }
    }
    // @ts-ignore
    @api
    socialLinksJson;
    get parsedSocialLinks() {
        if (!this.socialLinksJson)
            return undefined;
        try {
            return JSON.parse(this.socialLinksJson);
        }
        catch (e) {
            this.addError("SL-JP", "Social links JSON is invalid");
            return undefined;
        }
    }
    // @ts-ignore
    @api
    twoColumnOptionsJson;
    get parsedTwoColumnOptions() {
        if (!this.twoColumnOptionsJson)
            return undefined;
        try {
            return JSON.parse(this.twoColumnOptionsJson);
        }
        catch (e) {
            this.addError("2CO-JP", "Two column options JSON is invalid");
            return undefined;
        }
    }
    // @ts-ignore
    @api
    threeColumnOptionsJson;
    get parsedThreeColumnOptions() {
        if (!this.threeColumnOptionsJson)
            return undefined;
        try {
            return JSON.parse(this.threeColumnOptionsJson);
        }
        catch (e) {
            this.addError("3CO-JP", "Three column options JSON is invalid");
            return undefined;
        }
    }
    // @ts-ignore
    @api
    topMargin;
    // @ts-ignore
    @api
    language;
    // @ts-ignore
    @api
    assetBasePath;
    // @ts-ignore
    @api
    className;
    /* lifecycle */
    connectedCallback() {
        super.connectedCallback?.();
        this.classList.add("caon-scope");
    }
}
