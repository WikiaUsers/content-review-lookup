/* Any JavaScript here will be loaded for all users on every page load. */

/*******************************************************************************************

SECTION  Import

********************************************************************************************/

// Import Scripts
importArticles({
  type: 'script',
  debug: true,
  articles: [
    'MediaWiki:Map/code.js',             // on page Map and Map lightbox support
  ]
});
//if (mw && mw.config && mw.config.set) mw.config.set('debug', true); // extra debugging