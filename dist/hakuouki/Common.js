/* Any JavaScript here will be loaded for all users on every page load. */

/*link preview script*/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.tlen = 260; /*text length*/
window.pPreview.delay = 50; /*appearing delay time*/