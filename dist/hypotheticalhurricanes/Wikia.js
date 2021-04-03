/**
 * MediaWiki:Wikia.js - Loads for every user using the Oasis skin.
 */

/**
 * Auto updating recent changes opt-in.
 * See w:c:dev:AjaxRC for info & attribution.
 */
 
window.ajaxSpecialPages = ['WikiActivity', 'Log', 'Log/upload', 'Log/newusers', 'Contributions'];
window.ajaxRefresh = 30000;
$.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Auto-refresh',
    'ajaxrc-refresh-hover': 'Enable page auto-refresh',
}}}}});