importScriptPage('MediaWiki:PowerPageMaker/code.js', 'dev');

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EraIcons/code.js',
        'u:dev:WikiManager_Nameplate.js'
    ]
});

window.ItemsToAdd = [
  {
    'Name': 'General Improvement',
    'Page': 'Category:General Improvement',
    'Description': 'These articles need some cleanup work done on them.'
  },
  {
    'Name': 'General Cleanup',
    'Page': 'Category:General Cleanup',
    'Description': 'These articles need to be checked for grammar mistakes.'
  },
];
window.AffectsSidebar = true;
window.BackToTopModern = true;
window.lastEdited = {
    avatar: true,
    avatarsize: 20,
    size: true,
    diff: true,
    comment: true,
    newpage: true,
    mainpage: true,
    time: 'timestamp',
    timezone: 'UTC',
    position: {
        element: document.getElementById('WikiaPageHeader'),
        method: 'append'
    },
    pages: []
};

window.railWAM = {
    logPage:"Project:WAM Log"
};

window.UserStatusSettings = {
    colorBlindMode: 1,
    lightTheme: 1,
    statusIndicator: 0,
};

/* Standard Edit Summary */
window.dev = window.dev || {};
window.dev.editSummaries = {
    select: 'MediaWiki:Custom-StandardEditSummary'
};

window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:Custom-StandardEditSummary'
};
 
importArticles({
    type: 'script',
    articles: [ 
        'u:dev:Standard_Edit_Summary/code.js'
]});