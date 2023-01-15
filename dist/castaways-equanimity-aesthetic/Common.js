/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
    modules: {},
    tags: {
        Alli1: {u:'Meme Queen'},
        Alli2: {u:'Code Queen'},
        MainCoders: {u:'Coder'},
        Alli3: {u:'Roast Queen'},
        Alex2: {u:'Dat Boi'},
        Gamers: {u:'Gamer'},
        Alli4: {u:'Clod Queen'},
        Gfor1: {u:'The Meme King'},
        cas1: {u:'Nebulous'},
        Gfor2: {u:'Tiny Commie'},
        Hoes: {u:'MC Hoe Squad'},
    }
};
UserTagsJS.modules.custom = {
    'AestheticsAllY': ['Alli1','Alli2','MainCoders','Alli3','Alli4','Gamers'],
    'Alex the Neko': ['Gamers','Alex2'],
    'CastellarCygnus': ['cas1','MainCoders'],
    'GforGolden': ['Gfor1','Gfor2'],
    'MrFlamur': ['Hoes'],
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
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];