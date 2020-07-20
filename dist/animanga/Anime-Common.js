/*<pre>*/
/* Override Variables */
var WGEPinitialized = true;
var ACGinitialized = true;
var overrideNamespaces;
var overrideGroups;
var cancelAnime;
var cancelSearchswitch;

if( skin == 'monobook' && !cancelAnime ) importScriptPage( 'MediaWiki:Anime-Monobook-Accesstips.js', 'anime' );

importArticles({
	type: 'script',
	articles: [
		'u:enanimanga:MediaWiki:Misc.js',
		'u:enanimanga:MediaWiki:Sitenotice.js',
		'u:enanimanga:MediaWiki:ShowHide.js',
		'u:enanimanga:MediaWiki:TabView.js'
	]
});