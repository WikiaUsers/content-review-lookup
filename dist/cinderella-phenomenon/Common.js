/* Any JavaScript here will be loaded for all users on every page load. */
// December 3 2014 - Adding countdown 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}
importScriptPage('MediaWiki:ShowHide/code.js', 'dev');