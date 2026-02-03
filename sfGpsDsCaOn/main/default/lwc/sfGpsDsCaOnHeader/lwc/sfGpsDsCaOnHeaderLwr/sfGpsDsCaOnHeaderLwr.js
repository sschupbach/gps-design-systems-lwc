/*
 * Copyright (c) 2025, Shannon Schupbach, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { api } from "lwc";
import SfGpsDsLwc from "c/sfGpsDsLwc";
// @ts-ignore - LWC module import
import { LABELS } from "c/sfGpsDsCaOnLabels";
// eslint-disable-next-line no-unused-vars
const DEBUG = false;
// eslint-disable-next-line no-unused-vars
const CLASS_NAME = "SfGpsDsCaOnHeaderLwr";
export default class SfGpsDsCaOnHeaderLwr extends SfGpsDsLwc {
    static renderMode = "light";
    // @ts-ignore
    @api
    type;
    // @ts-ignore
    @api
    applicationHeaderInfoJson;
    get parsedApplicationHeaderInfo() {
        if (!this.applicationHeaderInfoJson)
            return undefined;
        try {
            return JSON.parse(this.applicationHeaderInfoJson);
        }
        catch (e) {
            this.addError("AHI-JP", "Application header info JSON is invalid");
            return undefined;
        }
    }
    // @ts-ignore
    @api
    menuItemsJson;
    /**
     * Translates menu items using labelKey if provided.
     * Falls back to title if no labelKey or translation not found.
     */
    translateMenuItems(items) {
        return items.map(item => {
            if (item.labelKey && LABELS.Nav[item.labelKey]) {
                return {
                    ...item,
                    title: LABELS.Nav[item.labelKey]
                };
            }
            return item;
        });
    }
    get parsedMenuItems() {
        if (!this.menuItemsJson)
            return undefined;
        try {
            const parsed = JSON.parse(this.menuItemsJson);
            if (!Array.isArray(parsed))
                return undefined;
            // Translate items with labelKey
            return this.translateMenuItems(parsed);
        }
        catch {
            this.addError("MI-JP", "Menu items JSON is invalid");
            return undefined;
        }
    }
    // @ts-ignore
    @api
    languageToggleOptionsJson;
    get parsedLanguageToggleOptions() {
        if (!this.languageToggleOptionsJson)
            return undefined;
        try {
            return JSON.parse(this.languageToggleOptionsJson);
        }
        catch (e) {
            this.addError("LTO-JP", "Language toggle options JSON is invalid");
            return undefined;
        }
    }
    // @ts-ignore
    @api
    disableDynamicMenu;
    // @ts-ignore
    @api
    language;
    get computedLanguage() {
        return this.language || "en";
    }
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
