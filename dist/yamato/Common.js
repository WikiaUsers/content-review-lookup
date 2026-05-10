//////////////////////////////
// Settings for LinkPreview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
// window.pPreview.tlen = 200;
window.pPreview.RegExp.noinclude = [".NoLinkPreview", ".context-link", ".notice", ".LinkPreview-ignore", ".quote", ".mw-ext-cite-error", ".error", ".caption", ".image.caption", ".blockquote", ".references", ".reference", ".sup.reference"];
window.pPreview.RegExp.iimages = [/White Calaklum side\.png/i,/Site-favicon\.ico/i];