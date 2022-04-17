/* Any JavaScript here will be loaded for all users on every page load. */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.onlyinclude = ['.mw-headline', '#Heading', '[data-include-me=1]'];