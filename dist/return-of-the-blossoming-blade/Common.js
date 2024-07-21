/* Any JavaScript on MediaWiki:Common.js will be loaded for all users on every page load. */

// LinkPreview settings
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.noinclude = ['.LinkPreview-ignore'];