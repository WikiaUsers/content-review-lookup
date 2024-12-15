/*Javascript applied here will apply to all skins*/

window.ajaxPages = [
    "Special:RecentChanges",
    "Special:Watchlist",
    "Special:Log",
    "Special:Contributions",
    "Special:WikiActivity"
];

window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.AddRailModule = [
    {page: 'Template:RailModule', prepend: false,maxAge: 1},  // okay
];

var linkedDevs = document.getElementsByClassName("linkedDev");
for (var i=0; i<linkedDevs.length; i++) {
    var ele = linkedDevs[i];
    if (ele.getAttribute("data-blank")) {
        ele.addEventListener("click", window.open(ele.getAttribute("data-href")));
    } else {
        ele.addEventListener("click", function() {location.href = ele.getAttribute("data-href")})
    }
}

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:AddRailModule.js'
    ]
});

window.BackToTopModern = true;

// 1. AjaxRC configuration option
window.ajaxRefresh = 1;
window.discussEmbedLimit = 20;
window.discussEmbedSortTrending = 0;

// 2. AjaxRC import statement
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:DiscussionsEmbed.js'
    ]
});

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 1825;
window.lockOldComments.addNoteAbove = true;
/* This locks comments after they are five years old - helps combat necroposting */

/* UserTags Shenanigans */
window.UserTagsJS = {
    modules: {},
    tags: {
        // group: { prizes }
        old: { u:'FOUNDER 🔨', title:'Founder' },
        hansybo: { u:'HANSYBO 🪿', title:'Hansybo' },
        //group: { staff }
        rollback: { u:'ROLLBACK 🍊' },
        'content-moderator': { u:'MODERATOR 🍇' },
        sysop: { u:'ADMINISTRATOR 🐟' },
        bureaucrat: { u:'BUREAUCRAT 🍏' },
        representative: { u:'REPRESENTATIVE 🌸' },
        
        //group: { negative }
        blocked: { u:'BLOCKED ⛔'},
        inactive: { u:'SLEEPY 😴'},
        autoconfirmed: { u:'VIBING 🎶'},
        newuser: { u:'NEW 🍀'},
        
        //group: { discord }
        discowner: { u:'DISCORD OWNER 💎'},
        discmod: { u:'DISCORD MOD 🔊'},
    }
};

UserTagsJS.modules.custom = {
    'Saunt3D': ['representative'],
    'J192': ['old'],
    'Zomplant Jelo': ['old'],
    'DolphiGaming': ['discmod'],
    'DsFanboy': ['discowner'],
    'Krayleb': ['discmod'],
    'Fun Animator': ['discmod'],
    'Creepes': ['hansybo'],
    'WiLdCaRd2048': ['discmod']
	
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'content-moderator', 'rollback', 'sysop', 'blocked', 'inactive', 'threadmoderator', 'chatmoderator'];
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.metafilter = {
    rollback: ['content-moderator', 'sysop', 'bureaucrat'],
    'content-moderator': ['sysop', 'bureaucrat'],
    sysop: ['bureaucrat'],
};
UserTagsJS.modules.newuser = {
	days: 7,
	edits: 0,
	namespace: 0
};

/*WikiActivity config*/

window.rwaOptions = {
    limit : 50,
    namespaces : [ 0, 1, 2, 3, 4, 5, 6, 7, 110, 111, 500, 501, 828, 829 ],
    autoInit : true,
    themeName : "main",
    showBotEdits : false,
    loadModule : false,
    customRendering : { },
    headerLink : false,
    refresh : false,
    refreshDelay : 5 * 60 * 1000,
    timeout : 10 * 1000
};

/* Call the page counter label on the top as "creations" instead */
var elements = document.getElementsByClassName('page-counter__label');
var wikiName = elements[0];
wikiName.textContent = "creations";