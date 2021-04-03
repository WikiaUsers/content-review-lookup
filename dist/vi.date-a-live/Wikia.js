importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:LastEdited/code.js',
    ]
});

/* LastEdited
* URL: https://dev.fandom.com/wiki/LastEdited
* Show editor info at title of the page
*/
window.lastEdited = {
    avatar: true,
    avatarsize: 40,
    size: false,
    diff: false,
    comment: false,
    newpage: true,
    mainpage: false,
    time: 'timeago',
    timezone: 'UTC+7',
    lang: 'vi',
    position: {
        element: document.getElementById('PageHeader'),
        method: 'prepend'
    },
    namespaces: {
        exclude: []
    },
    pages: [Date_A_Live]
};