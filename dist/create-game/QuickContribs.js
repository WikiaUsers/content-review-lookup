var QuickContribs = {
  expiry : '1 month',
  reason : 'Check user activity (Quick Blocked)'
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:QuickContribs/code.js'
    ]
});