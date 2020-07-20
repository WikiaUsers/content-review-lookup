/* Any JavaScript here will be loaded for all users on every page load. A lot of this code has been taken from other Wikis, which follow the same copyright laws. */

// Imported Scripts:
importArticles({
    type: "script",
    articles: [
        'u:admintools:MediaWiki:Wikia.js/cancelButton.js',
        'u:rhythmheaven:MediaWiki:Wikia.js/editCount.js'
    ]
});

/*AjaxRC config:
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:Forum","Special:Log/rights","Special:ShortPages"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
*/

/* Sorting the seed, decoration, building, etc. tables. Code originally by OrbFu. */
$(function FVwDplTableSort() {
    var results = document.evaluate("id('SeedLevelHeader')/a", document, null, XPathResult.ANY_TYPE, null);
    var aResult;
    if (aResult === results.iterateNext()) {
        aResult.onclick();
        return aResult;
    }
    return null;
});

$('.achievementbox').mouseover(function() {
    $('div', this).show();
});

$('.achievementbox').mouseout(function() {
    $('div', this).hide();
});

$(function fBox() {
    $('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=51969956920&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
});


//MessageWall Usertags config:
window.MessageWallUserTags = {
    tagColor: 'red',
    txtSize: '10px',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Tavisource': 'Founder • Bureaucrat • Administrator • Councilor',
        'felinoel': 'Bureaucrat • Administrator',
        'Bmoisawsome': 'Bureaucrat • Administrator',
        'Adventuretimegurl123': 'Bureaucrat • Administrator',
        'Bunai Di': 'Administrator',
        'Bellamybug': 'Administrator',
        'Flambo the Epic Epic(;': 'Administrator',
        'A hero boy named Finn': 'Administrator',
        'Giaria': 'Administrator',
        'AquaSeashells': 'Administrator',
        'RyaNayR': 'Administrator',
        'Animaltamer7': 'Rollback',
        'CHolt': 'Chat Moderator',
        'AcePhoenix 007': 'Chat Moderator',
        'DarlingVanilla': 'Chat Moderator',
        'Gameuser10': 'Chat Moderator',
        'Garganchular': 'Discussions Moderator',
        'MichaelFinn': 'Discussions Moderator',
        'Scorpion465': 'Discussions Moderator'
    }
};

//Fix AjaxRC auto refresh arrow not appearing (3 Jun, 2019):
$('a[href$="/wiki/Special:RecentChanges"').attr('href', '/wiki/Special:RecentChanges?debug=1');