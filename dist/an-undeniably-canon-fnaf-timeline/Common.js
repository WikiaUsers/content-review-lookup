/* Any JavaScript here will be loaded for all users on every page load. */


/* Link pop-up configuration */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.tlen = 1000;
window.pPreview.RegExp.noinclude = ['table', '.reference', '.mw-references-wrap'];
window.pPreview.debug = true;
window.pPreview.fixContentHook = true;