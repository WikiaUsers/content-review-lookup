/* Any JavaScript here will be loaded for all users on every page load. */

/*Snow Effect*/

importArticle( { type: 'script', article: 'u:c:MediaWiki:Snow.js' } );

window.snowStorm = {
    followMouse: true,
    excludeMobile: true,
    autoStart: true,
	snowColor: '#aaa',
};

if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 1000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}