/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
    modules: {},
    tags: {
        Alli1: {u:'Kinda Gay'},
        Alli2: {u:'Overwatch Addict'},
        Coder: {u:'Coder'},
        Mara1: {u:'Owner'},
        Cas1: {u:'Nebulous'},
        Designer: {u:'Designer'},
        ContentMod: {u:'Content Moderator'},
        Rollback: {u:'Rollback'},
    }
};
UserTagsJS.modules.custom = {
    'AestheticsAllY': ['Coder','Alli1','Alli2'],
    'MarsDy': ['Mara1'],
    'Cherrybombed': ['Cas1'],
    'ChicChick336': ['ContentMod','Designer'],
};

 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});
 
/* End of the {{USERNAME}} replacement */
 
// RevealAnonIP
 
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'content moderator', 'bureaucrat']
};
 
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];