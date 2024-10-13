/* Any JavaScript here will be loaded for all users on every page load. */

//************
// User Tags
//************

// Load core from JSON page

/*$.get(mw.util.wikiScript('load'), {
    mode: 'articles',
    articles: 'MediaWiki:Custom-UserTags',
    only: 'styles'
}, function(d) {
    window.UserTagsJS = JSON.parse(d.replace(/\/\*.*\*\//g, ''));
});*/

// -------------------

window.UserTagsJS = {

   "modules": {

      "isblocked": true,
      "autoconfirmed": true,

      "mwGroups": [
         "bannedfromchat",
         "bot",
         "checkuser",
         "rollback",
         "util"
      ],

      "inactive": {
         "days": 80,
         "zeroIsInactive": false
      },

      "implode": {

         "moderator": [
            "content-moderator",
            "threadmoderator"
         ]

      },

      "metafilter": {"bureaucrat": "headburo"},

      "newuser": {
         "days": 7,
         "edits": 15
      },

      "custom": {

         "Blipeddeeblah": [
            "founder",
            "exsysop"
         ],

         "Withersoul 235": [
            "headburo",
            "coder"
         ],

         "SleepyDragonSushi": ["exsysop"],
         "BonBooker": ["exsysop"],
         "Awesome Rowlet and Epic Popplio": ["exsysop"],
         "Desert Croc": ["exsysop"],
         "RAYquazaman": ["exsysop"],
         "John1Thousand": ["exsysop"],
         "Sharaku Jr.": ["exsysop"],
         "ImagoDesattrolante": ["exdmod"]

      }

   },

   "tags": {
      "headburo": {
         "u": "Head Bureaucrat",
         "order": 1
      },

      "bureaucrat":  {"order": 2},
      "sysop":       {"u": "Administrator", "order": 3},

      "moderator": {
         "u": "Moderator",
         "order": 4
      },

      "content-moderator":   {"order": 5},
      "rollback":            {"order": 6},
      "threadmoderator":     {"order": 7},
      "chatmoderator":       {"order": 8},
      "blocked":             {"u": "Banned"},

      "coder": {
         "u": "Wiki Coder",
         "order": 9
      },

      "exsysop": {"u": "Former Admin"},
      "exdmod": {"u":"Former Discussions Moderator"}
   }

};


// Special tag text for permabanned users
(function() {
    if (document.getElementById('userProfileApp') === null) 
        return;

    var blockTag = document.querySelector('.blocked-user');
    if (blockTag === null) 
        return;

    new mw.Api().get({
        action: 'query',
        list: 'blocks',
        bkprop: 'expiry',
        bktimestamp: new Date().getTime(),
        bkusers: mw.config.get('wgTitle')
    }).done(function(d) {
        if (d.query.blocks[0] && d.query.blocks[0].expiry == 'infinity') {
            blockTag.innerHTML = 'Permabanned';
        }
    });
})();

//****************
// Staff tools
//****************
window.PRAoptions = {
    editSummary: 'Updating page links after rename (automatic)'
};

window.LIRoptions = {
    bottomMessage: '',
    editSummary: 'Updating file links after rename (automatic)',
    singleButtonText: 'Rename and update',
    queueButtonText: 'Add to queue',
    delay: 2000
};

window.massCategorizationDelay = 2500; // 2.5 second interval

window.MassRenameRevertGroups = [
    'bot',
    'bureaucrat', 
    'content-moderator', 
    'rollback',
    'sysop'
];

if (/sysop|content-moderator|rollback/.test(mw.config.get('wgUserGroups').join())) {
    importArticles({
        type: 'script',
        articles: [
            "u:dev:MediaWiki:AjaxRename/code.js",
            "u:dev:MediaWiki:CategoryRenameAuto-update/code.js",
            "u:dev:MediaWiki:FileUsageAuto-update/code.js",
            "u:dev:MediaWiki:MassCategorization/code.js",
            "u:dev:MediaWiki:PageRenameAuto-update/code.js"
        ]
    });
}

//********************
// AJAX Auto-Refresh
//********************
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page over time';
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/deathbattlefanon/images/d/de/Ajax-loader.gif/revision/latest?cb=20200828094018';

window.ajaxPages = new Array(
    "Special:WikiActivity",
    "Special:WikiActivity/watchlist",
    "Special:MultipleActivity",
    "Special:RecentChanges",
    "Special:RecentChangesLinked",
    "Special:Log",
    "Special:ListFiles",
    "Special:ListDuplicatedFiles",
    "Special:Contributions",
    "Special:NewPages",
    "Special:UncategorizedPages",
    "Special:DoubleRedirects",
    "Special:Categories",
    "Special:Videos",
    "Special:Watchlist",
    "Special:BrokenRedirects",
    "Special:BlockList",
    "Blog:Recent_posts",
    "Project:Duplicate Images",
    "Project:Dynamic file index"
);

jQuery.extend(true, window, {dev: {i18n: {overrides: {AjaxRC: {
    'ajaxrc-refresh-text': 'Auto-refresh',
    'ajaxrc-refresh-hover': 'Automatically refresh the page over time',
}}}}});

//*********************
// Mark banned users
//*********************
jQuery.extend(true, window, {
    mbTempStyle: 'opacity: 0.7; text-decoration: line-through; font-weight: bold;',
    mbIndefStyle: 'opacity: 0.4; font-style: italic; text-decoration: line-through; font-weight: bold;',
    mbTooltip: 'Banned ($1) by $2: $3 ($4 ago)',
    mbTipBox: false,
    mbTipBoxStyle: 'font-size:85%; background:#FFFFF0; border:1px solid #FEA; padding:0 0.3em; color:#AAA',
    mbLoadingOpacity: 0.85,
    mbNoAutoStart: false
});