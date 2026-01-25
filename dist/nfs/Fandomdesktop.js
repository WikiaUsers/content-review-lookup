// ============================================================
// LinkPreview
// ============================================================
	window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
	window.pPreview.defimage = 'https://static.wikia.nocookie.net/nfs/images/e/e6/Site-logo.png/revision/latest?cb=20251022214923&path-prefix=en'
	window.pPreview.noimage = 'https://static.wikia.nocookie.net/nfs/images/e/e6/Site-logo.png/revision/latest?cb=20251022214923&path-prefix=en'
	window.pPreview.RegExp.iparents = ['.wikia-gallery', '.mainpage-gallery', '#icons', '.mainpage-gallery-item img', '.mainpage-gallery-caption a', '.mainpage-featured-text', '.mainpage-featured-more', '.mainpage-featured-right'];
    window.pPreview.tlen = 500;