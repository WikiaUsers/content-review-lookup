// RailWAM Config
window.railWAM = {
    logPage:"Project:WAM Log"
};

//TopicBlockLog config
TBL_WIKIS = [
    "prodigy-legends",
    "community",
    "prodigy-game-fanon",
    "prodigy-glitch"
];

// Auto Refresh Settings
var ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];

var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh the page';
var ajaxRefresh = 30000;
 
// Back to Top Config
window.BackToTopModern = true;

// User Tags
$.get(
    mw.util.wikiScript('load'),
    {
        mode:'articles',
        articles:'MediaWiki:Custom-user-tags.json',
        only:'styles'
    },
    function (d) {
        window.UserTagsJS = JSON.parse(
            d.replace(/\/\*.*\*\//g, '')
        );
    }
);

// Alts
(function () {
    var $masthead = $('#UserProfileMasthead');
    if (!$masthead.exists()) {
        return;
    }
    var $info = $masthead.find('.masthead-info hgroup'),
        username = $info.find('h1').text(),
        alts = {
            'The Shadow of Prodigy': 'Sonic of Prodigy',
        },
        altOf = alts[username];
    function addTag () {
        if ($('.usergroup-blocked').exists()) {
            return;
        }
        $info.find('.tag-container').remove();
        $info.append(
            $('<span>', {
                'class': 'tag-container'
            }).append(
                $('<a>', {
                    'text': 'Alt',
                    'href': mw.util.getUrl('User:' + altOf),
                    'title':
                        'This user is a tolerated alt of ' + altOf + '.',
                    'class': 'tag usergroup-alt alt-user'
                })
            )
        );        
    }
    if (altOf) {
        setTimeout(addTag, 1500);
    }
})();

// Imports
importArticles({
    type: 'script',
    articles: [
        'u:dev:ListUsers/code.js',
    ]
});