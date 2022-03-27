/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

 // END import Onlyifediting-functions
 // ============================================================

window.UserTagsJS = {
        modules: {},
        tags: {}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bloked'];
 
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});