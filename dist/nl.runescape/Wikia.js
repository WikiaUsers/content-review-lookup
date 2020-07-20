/* Any JavaScript here will be loaded for Oasis users on every page load. */
/* <pre> */
 
/* Fixes user wikia.js and wikia.css files not loading in Oasis after upgrade to MediaWiki 1.19 */
if (!$('script[src*="title=User:'+wgUserName+'/wikia.js"]').length) {
    importScript('User:' + wgUserName + '/wikia.js');
}
 
if (!$('link[href*="title=User:'+wgUserName+'/wikia.css"]').length) {
    importStylesheet('User:' + wgUserName + '/wikia.css');
}
 
importArticles( {
  type: 'script',
  articles: [
    /* Standard preloads ([[Forum:Template preloads]]), Oasis skin code */
    'MediaWiki:Wikia.js/preload.js'
  ]
} );
 
/* </pre> */