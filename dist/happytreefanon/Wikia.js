var ajaxRefresh = 60;
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity","The Bracket"];
importScriptPage('AjaxRC/code.js', 'dev');

 
$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><h1>' +
      'News' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Happy Tree Friends Fanon News}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});
/* Chat stuff*/

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatHacks.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ChatOptions/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PingEveryone/code.js',
    ]
});

window.pingEveryone = {
    modsOnly: true, // So only moderators can use the ping, false by default
};