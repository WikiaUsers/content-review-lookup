/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
    type: "script",
    articles: [
        "u:dev:ShowHide/code.js",
    ]
});
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}