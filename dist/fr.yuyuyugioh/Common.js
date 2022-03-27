/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 
 
 // END import Onlyifediting-functions
 // ============================================================

importArticles({
    type: 'script',
    articles: [
        'u:dev:UserTags/code.js' /* UserTags */
    ]
});
 
/* UserTags */
 window.UserTagsJS = { 
         modules: {}, 
         tags: { 
                 ultime_duelliste: { u:'Ultime Duelliste' }
         } 
}; 
UserTagsJS.modules.autoconfirmed = true; 
UserTagsJS.modules.mwGroups = ['sysop', 'bot', 'chatmoderator']; 
UserTagsJS.modules.custom = { 
        'Sanji26': ['ultime_duelliste']
};