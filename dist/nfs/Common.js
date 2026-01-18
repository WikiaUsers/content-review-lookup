// ============================================================
// LinkPreview
// ============================================================
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/nfs/images/e/e6/Site-logo.png/revision/latest/scale-to-width-down/200';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/nfs/images/e/e6/Site-logo.png/revision/latest/scale-to-width-down/200';
window.pPreview.RegExp.iparents = ['.mainpage-gallery', '.icons', '.mainpage-gallery-item img', '.mainpage-gallery-caption a'];