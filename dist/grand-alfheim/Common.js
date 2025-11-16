mw.hook('wikipage.content').add(function($content) {
  
  if (mw.config.get('wgPageName') === 'Enemies') {

    importScript('MediaWiki:EnemyPage.js');

    console.log('[Common.js] Loaded EnemyPage.js for Enemies page');
  }

});