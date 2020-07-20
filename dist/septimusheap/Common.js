/* Any JavaScript here will be loaded for all users on every page load. */

/*******************************************************************************************

SECTION  Import

********************************************************************************************/

// Import Scripts
importArticles({              // allow other code to add imports before committing the list
  type: 'script',
  debug: true,
  articles: [
    'MediaWiki:Map/code.js',             // on page Map and Map lightbox support
  ]
});
//if (mw && mw.config && mw.config.set) mw.config.set('debug', true); // extra debugging