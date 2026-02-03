/*
 * Type definitions for sfGpsDsCaOnSearchLwr component
 */

declare module "c/sfGpsDsCaOnSearchLwr" {
  import { LightningElement } from "lwc";

  export default class SfGpsDsCaOnSearchLwr extends LightningElement {
    label?: string;
    placeholder?: string;
    hintText?: string;
    searchObjects?: string;
    maxSuggestions?: number;
    debounceMs?: number;
    minChars?: number;
    noResultsText?: string;
    searchResultsPage?: string;
    navigateOnSelect?: boolean;
    className?: string;
  }
}
