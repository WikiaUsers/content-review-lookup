//////////////////////////////
// Settings for LinkPreview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
// window.pPreview.tlen = 200;
window.pPreview.RegExp.noinclude = [".NoLinkPreview", ".LinkPreview-ignore", ".quote", ".mw-ext-cite-error", ".error", ".references", ".reference", ".sup.reference"];