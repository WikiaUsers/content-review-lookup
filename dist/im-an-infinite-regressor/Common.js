/* Any JavaScript here will be loaded for all users on every page load. */
window.BackToTopModern = true;
// Settings for LinkPreview
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
// window.pPreview.tlen = 200;
window.pPreview.noimage = 'https://static.wikia.nocookie.net/im-an-infinite-regressor/images/2/2e/Img_not_found.png/revision/latest/scale-to-width-down/200';
window.pPreview.RegExp.noinclude = [".NoLinkPreview", ".LinkPreview-ignore", ".quote", ".mw-ext-cite-error", ".error", ".references", ".reference", ".sup.reference"];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js',
        'u:dev:MediaWiki:LinkPreview/code.js',
    ]
});