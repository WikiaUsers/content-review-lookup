/* Any JavaScript here will be loaded for all users on every page load. */
 importArticles({
   type: "script",
   articles: [
       'w:c:dev:UserTags/code.js',
   ]
});
window.UserTagsJS = {
        modules: {},
        tags: {
                Alli1: {u:'The Meme Queen'},
                Alli2: {u:'Frisk'},
                Coders: {u:'Coder'},
                Alli3: {u:'Alli'},
                Gamers: {u:'Gamer'},
                UT: {u:'Undertale Fan'},
                Skate1: {u:'Otaku'},
             
        }
};
UserTagsJS.modules.custom = {
 
        'XXCastAwayXx': ['Alli1','Alli2','Coders','Alli3','Gamers'],
        'Skaitleen03': ['Gamers','UT','Skate1']
        
};
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});
 
/* End of the {{USERNAME}} replacement */
 
// RevealAnonIP
 
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat']
};