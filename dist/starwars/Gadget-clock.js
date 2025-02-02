//for opt-in user gadget enabled via Special:Preferences
mw.loader.using([ 'mediawiki.api']).then(function(){
	importArticles({ type: "script", articles: "u:dev:MediaWiki:UTCClock/code.js"});
});