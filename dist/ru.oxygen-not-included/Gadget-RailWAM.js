// настройки для RailWAM
window.railWAM = {
    appendAfter: ['.ChatModule', '#wikia-recent-activity', '.content-review-module'],
    logPage: "Project:WAM Log",
/*    loadOnNamespace: [0, 2, 6, 8, 10, 12, 500, 502], */
    autoLogForUsers: ["TESERACT", "Pahanzer", "Ksarfax", "Ниваль"],
    showLogAlert: false, 
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RailWAM/code.js',
    ]
});