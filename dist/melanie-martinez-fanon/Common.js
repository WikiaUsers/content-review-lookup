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
                MainCoders: {u:'Coder'},
                Alli3: {u:'Alli'},
                Gamers: {u:'Gamer'},
        }
};
UserTagsJS.modules.custom = {
    
        'XXCastAwayXx': ['Alli1','Alli2','MainCoders','Alli3','Gamers'],
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

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');