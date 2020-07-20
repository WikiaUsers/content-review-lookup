///////////////////////////////////////////////
/*********** Import Configurations ***********/
///////////////////////////////////////////////
/* Preloaded Template Location */
window.customPreloadTemplate = 'MediaWiki:Custom-Preloaded';//End PTL*/

/* TalkButton */
window.TalkButtonNamespaces = [112, 116];//End TB*/

///////////////////////////////////////////////
/************ NS-specific imports ************/
///////////////////////////////////////////////
var config = mw.config.get([
    'wgNamespaceNumber',
    'wgPageName'
]);

if (
    [-1, 2, 4, 500, 1200, 1201, 2000, 2001, 2002].indexOf(config.wgNamespaceNumber) !== -1 &&
    config.wgPageName !== 'Project:Home'
) {
    importArticles({
        type: 'script',
        articles: [
            'CategoryCommunityModules.js',
            'Tags.js',
            'Tournaments.js',
            'u:dev:CommunityDataUsers/code.js',
            'u:dev:ListUsers/code2.js',
            'u:dev:Medals/code.js',
            'u:dev:UserRightsRecord/code.js',
            'u:dev:UserTags/code.js',
            'u:dev:WikiManager_Nameplate.js',
            'u:elderscrolls:Common.js/DiscussionsLinks.js'
        ]
    }, {
        type: 'style',
        article: 'MediaWiki:Log.css'
    });
}//End NNSS*/