importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});

window.pPreview = $.extend(
    true,
    window.pPreview,
    {
        RegExp: (window.pPreview || {}).RegExp || {}
    }
);

window.pPreview.defimage = 'https://static.wikia.nocookie.net/rocketbotroyale/images/f/f8/Loading_image.gif';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/rocketbotroyale/images/a/af/Image_not_found.jpg';
window.pPreview.tlen = 500;