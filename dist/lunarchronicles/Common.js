/* Any JavaScript here will be loaded for all users on every page load. */

/*
    ##############################################
    SCRIPT CONFIGURATION
    ##############################################
*/
// User tags
window.UserTagsJS = {
	modules: {
        inactive: 50, // Inactive if no edits in 50 days
        autoconfirmed: false,
        newuser: true,
        mwGroups: ['bureaucrat', 'sysop', 'threadmoderator', 'rollback', 'bot', 'staff'],
        metafilter: {
            sysop: ['founder', 'bot', 'bureaucrat'],
            bureaucrat: ['founder'],
        },
	},
};

/*
    ##############################################
    IMPORT SCRIPTS
    ##############################################
*/

importArticles({
    type: "style",
    articles: [
        "MediaWiki:TimeCircles.css",
    ]
},{
    type: "script",
    articles: [
        "w:dev:DisplayClock/code.js",
        "w:dev:RevealAnonIP/code.js",
        "w:dev:UserTags/code.js",
        "MediaWiki:TimeCircles.js",
    ]
});

/*
    ##############################################
    CUSTOM SCRIPTS
    ##############################################
*/

// Comments, message wall, forum posts user tags
(function ($, ArticleComments) {
    "use strict";
 
    function addTag() {
        var users = {
            'Ohmystars': 'administrator',
            'Sammm%E9%AF%8A': 'administrator',
            'Beeper100': 'moderator',
        };
 
        for (var name in users) {
            $('.comments .edited-by a[href$="' + name + '"]:not(.subtle)')
            .after('<span class="tag">' + users[name] + '</span>');
        }
    }
 
    function init() {
        addTag();
        if (ArticleComments && ArticleComments.addHover) {
            var realFunc = ArticleComments.addHover;
            ArticleComments.addHover = function () {
                var result = realFunc.apply(ArticleComments, arguments);
                addTag();
                return result;
            };
        }
    }
 
    $(init);    
}(jQuery, window.ArticleComments));

// Countdown script
addOnloadHook(function() {
    if ($('#DateCountdown').length) {
        $("#DateCountdown").TimeCircles({
          "circle_bg_color": "#BCBCBC",
          "time": {
            "Days": { "color": "#BF613C" },
            "Hours": { "color": "#BF613C" },
            "Minutes": { "color": "#BF613C" },
            "Seconds": { "color": "#BF613C" }
          }
        });
    }
});