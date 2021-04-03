/* Any JavaScript here will be loaded for all users on every page load. */
var MessageBlock = {
  title : 'Block',
  message : 'You have been blocked with an expiry time of $2 for the following reason(s): "$1"',
  autocheck : true
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageBlock/code.js'
    ]
});
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});
window.lastEdited = {
    avatar: false,
    size: true,
    diff: true,
    comment: true,
    time: 'timeago',
    lang: 'en',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:YoutubePlayer/code.js',
    ]
});