/* Any JavaScript here will be loaded for all users on every page load. */

// PreloadTemplates configuration options
preloadTemplates_namespace = 4;

// LinkPreview configuration
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.apid = true;
window.pPreview.scale = false;
window.pPreview.RegExp.iclasses = ['pPreview-ignore','mw-redirect', 'lightbox'];
window.pPreview.RegExp.iparents = ['.mw-editform'];
window.pPreview.RegExp.onlyinclude = ['.pPreview-onlyinclude', '[data-include-me=1]'];
window.pPreview.RegExp.noinclude = ['.pPreview-noinclude', '[data-exclude-me=1]', '.caption'];