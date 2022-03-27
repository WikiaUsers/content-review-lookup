/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
importScriptPage('ShowHide/code.js', 'dev')
 // Import [[MediaWiki:Onlyifuploading.js]] 
 

 

 // END import Onlyifediting-functions
 // ============================================================

//Décompte//
$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});