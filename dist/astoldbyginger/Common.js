/* Any JavaScript here will be loaded for all users on every page load. */

window.MessageWallUserTags = {
    tagColor: '#000',
    glow: false,
    users: {
        'Utter_solitude': 'Admin'
    }
};

var ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
var AjaxRCRefreshText = 'Auto-refresh';
var AjaxRCRefreshHoverText = 'Automatically refresh this page';
var ajaxRefresh = 15000;
    }
};

importArticles({
    type: "script",
    articles: [
        "u:dev:MessageWallUserTags/code.js",
        "u:dev:AjaxRC/code.js",
        "u:dev:PurgeButton/code.js",
        "u:dev:FileUsageAuto-update/code.js",
        "u:dev:AllPagesHideRedirect/code.js",
        "u:dev:FixMultipleUpload/code.js",
        "u:dev:WallGreetingButton/code.js",
        "u:dev:BackToTopButton/code.js",
        "u:dev:ReferencePopups/code.js",
        "u:dev:FloatingToc/code.js",
        "u:dev:Countdown/code.js",
        "u:dev:DisplayClock/code.js",
        "u:dev:FindAndReplace/code.js"
 
    ]
});