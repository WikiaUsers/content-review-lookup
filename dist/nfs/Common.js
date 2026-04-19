// ============================================================
// LinkPreview
// ============================================================
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.RegExp.iparents = ['.mainpage-gallery', '.icons', '.mainpage-gallery-item img', '.mainpage-gallery-caption a'];
window.pPreview.RegExp.iimages = [new RegExp('^MainIcon.*_Small\\.', 'i')];