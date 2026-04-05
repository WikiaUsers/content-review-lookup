// ============================================================
// LinkPreview
// ============================================================
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/nfs/images/e/e6/Site-logo.png/revision/latest?cb=20260403160534&path-prefix=en/scale-to-width-down/200';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/nfs/images/e/e6/Site-logo.png/revision/latest?cb=20260403160534&path-prefix=en/scale-to-width-down/200';
window.pPreview.RegExp.iparents = ['.mainpage-gallery', '.icons', '.mainpage-gallery-item img', '.mainpage-gallery-caption a'];
window.pPreview.RegExp.iimages = [new RegExp('^MainIcon.*_Small\\.', 'i')];