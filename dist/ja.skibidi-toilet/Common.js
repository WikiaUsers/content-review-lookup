/* ここにあるすべてのJavaScriptは、すべてのページ読み込みですべての利用者に対して読み込まれます */
// LinkPreview
// ============================================================
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'hhttps://static.wikia.nocookie.net/skibidi-toilet/images/4/4c/Cameraman_symbol-mark.webp/revision/latest?cb=20240822082809&path-prefix=ja';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/skibidi-toilet/images/4/4c/Cameraman_symbol-mark.webp/revision/latest?cb=20240822082809&path-prefix=ja';

// MARKBLOCKED CUSTOMIZATION
window.mbTooltip = 'blocked by $2 for $1 with the reason, \"$3\" ($4 ago)';
// END MARKBLOCKED