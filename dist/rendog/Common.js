//******************************************************************
// Edit Summary: http://dev.wikia.com/wiki/WikiaNotification
//******************************************************************
//var WikiaNotificationMessage = "www.youtube.com/user/rendog";
var WikiaNotificationMessage = "<a href='www.youtube.com/user/rendog'>YouTube ReNDoG</a>"
importScriptPage('WikiaNotification/code.js', 'dev');
//******************************************************************
// Edit Summary: End
//******************************************************************


importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxRC/code.js",
        "u:dev:FastDelete/code.js",
        "u:dev:MarkForDeletion/code.js"
    ]
});

importArticles({ type: 'script', articles: [ 
    'u:dev:Standard_Edit_Summary/code.js'
]});
 

//******************************************************************
// Edit Summary: http://dev.wikia.com/wiki/Standard_Edit_Summary
//******************************************************************
// Create the "dev" namespace if it doesn't exist already: 
//window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options: 
window.dev.editSummaries = {
     css: '#stdSummaries { ... }',
     select: 'MediaWiki:StandardEditSummary'
};
 
// The options need to be set before the import! Otherwise they may not work. 
window.dev = window.dev || {};
window.dev.editSummaries = {
     css: '#stdSummaries { ... }'
};
  
//******************************************************************
// Edit Summary: Ending
//******************************************************************