// OTHER
window.BackToTopModern = true;
	importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js',
    ]
});

//////////////////////////////
// Settings for LinkPreview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
// window.pPreview.tlen = 200;
window.pPreview.RegExp.noinclude = [".NoLinkPreview", ".LinkPreview-ignore", ".quote", ".mw-ext-cite-error", ".error", ".references", ".reference", ".sup.reference"];
//////////////////////////////

// window.pPreview = $.extend(true, window.pPreview, {
    // defimage: 'https://vignette.wikia.nocookie.net/borderlands/images/0/05/Ajax.gif/revision/latest?cb=20170626182120&path-prefix=ru',
    // noimage: 'https://vignette.wikia.nocookie.net/borderlands/images/f/f5/%D0%97%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.png/revision/latest/scale-to-width-down/350?cb=20160122074659&path-prefix=ru',
    // RegExp: {
    //     iparents: [new RegExp('.LinkPreview-ignore')],
        // iimages: [new RegExp('^([Ff]ile:|[Фф]айл:)?Indef\\.png$')],
        // ipages: [new RegExp('.*?Дерево[_ ]навыков.*')],
        // ilinks: [new RegExp('.*?Дерево[_ ]навыков.*')],
    // },
// });