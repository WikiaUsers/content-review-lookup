/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 
 
 // END import Onlyifediting-functions
 // ============================================================

window.UserTagsJS = {
        modules: {},
        tags: {}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'bot', 'chatmoderator'];
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
 
$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});
 
$(function(){
	importArticles({
		type: "script",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.js"]
	}, {
		type: "style",
		articles: ["u:zh.pad.wikia.com:MediaWiki:CountDown.css"]
	});
});