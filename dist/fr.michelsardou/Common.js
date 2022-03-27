/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 
 // END import Onlyifediting-functions
 // ============================================================
/* Any JavaScript here will be loaded for all users on every page load. */
importArticles( {
	type: 'script',
	articles: [
		'w:dev:ShowHide/code.js',
		'w:dev:CollapsibleInfobox/code.js'
	]
} );