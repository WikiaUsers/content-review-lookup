        rcadc: {
            u: 'RCaDC'
        }
    }
};

UserTagsJS.modules.custom = {
    'Fatal Disease': ['rcadc'],
};

UserTagsJS.modules.autoconfirmed = false;

UserTagsJS.modules.autoconfirmed = false;

UserTagsJS.modules.inactive = 60;

UserTagsJS.modules.mwGroups = ['bureaucrat'];

UserTagsJS.modules.metafilter = {
    'sysop': ['bureaucrat'],
    'newuser': ['user']
};

var ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions","Special:WikiActivity"];
var ajaxRefresh = 30000;
 
//Import Scripts
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:AjaxRC/code.js",
        "w:c:dev:AjaxUndo/code.js",
        "w:c:dev:WHAM/code.js",
        "w:c:dev:NoImageLightbox/code.js",
        "w:c:dev:AjaxPatrol/code.js",
        "w:c:dev:AjaxBatchDelete/code.js",
        "w:c:dev:SpellCheckModule/code.js",
        "w:c:dev:View_Source/code.js",
        "w:c:dev:FixMultipleUpload/code.js",
        "w:c:dev:DisplayClock/code.js",
        "w:c:dev:QuickTools/code.js",
    ]
});