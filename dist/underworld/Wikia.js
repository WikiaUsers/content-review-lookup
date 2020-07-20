/* Show spoiler pop-up for pages in the Spoilers category */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:SpoilerAlert/code.js'
    ]
});