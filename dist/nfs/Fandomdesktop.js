// ============================================================
// LinkPreview
	window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
	window.pPreview.apid = true;
	window.pPreview.defimage = 'https://static.wikia.nocookie.net/nfs/images/e/e6/Site-logo.png/revision/latest?cb=20260403160534&path-prefix=en'
	window.pPreview.noimage = 'https://static.wikia.nocookie.net/nfs/images/e/e6/Site-logo.png/revision/latest?cb=20260403160534&path-prefix=en'
	window.pPreview.RegExp.noinclude = [".quote", ".notice", ".reference", ".references"];
	window.pPreview.RegExp.iparents = ['.wikia-gallery', '.mainpage-gallery', '#icons', '.mainpage-gallery-item img', '.mainpage-gallery-caption a', '.mainpage-featured-text', '.mainpage-featured-more', '.mainpage-featured-right'];
	window.pPreview.RegExp.iimages = [new RegExp('^MainIcon.*_Small\\.', 'i')];
// ============================================================