/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 


 // ============================================================
 // BEGIN import Onlyifediting-functions
 // SEE ALSO [[MediaWiki:Onlyifediting.js]]
 
 
 // END import Onlyifediting-functions
 // ============================================================

/* UserTag */
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'blocked', 'founder', 'bot', 'bot-global', 'helper'];
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});