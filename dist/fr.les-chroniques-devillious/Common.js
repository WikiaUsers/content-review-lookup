window.ajaxPages = ["Sp%C3%A9cial:WikiActivity","Sp%C3%A9cial:RecentChanges","Sp%C3%A9cial:Watchlist","Sp%C3%A9cial:Log","Sp%C3%A9cial:Contributions"];
importScriptPage('AjaxRC/code.js', 'dev');
// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});