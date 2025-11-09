/* ============================================= */
/* Loads the custom enemy interaction system on  */
/* the Enemies page only.                        */
/* ============================================= */

mw.hook('wikipage.content').add(function ($content) {
  if (mw.config.get('wgPageName') === 'Enemies') {
    importScript('MediaWiki:EnemyPage.js');
    console.log('[Common.js] EnemyPage.js loaded for Enemies page');
  }
});

console.log('[Common.js] Global script loaded successfully.');