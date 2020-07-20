/* Import Articles JS */
importArticles( {
	type: 'script',
	articles: [
		'u:dev:Standard_Edit_Summary/code.js',
		'w:dev:WallGreetingButton/code.js',
		'w:c:dev:ReferencePopups/code.js',
		'u:dev:PurgeButton/code.js',
		'u:dev:DisplayClock/code.js'
	]
} );

/* Template:Username */
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
/* Back To Top Button */
 
importScriptPage('BackToTopButton/code.js', 'dev');

/* Snow Import */

importArticle({type:'script', article:'u:w:MediaWiki:Snow.js'});