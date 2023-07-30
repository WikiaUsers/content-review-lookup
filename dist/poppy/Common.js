/* Any JavaScript here will be loaded for all users on every page load. */

window.UserTagsJS = {
    modules: {},
    tags: {
        Coder: {u:'Coder'},
        Mara1: {u:'Owner'},
        Designer: {u:'Designer'},
        ContentMod: {u:'Content Moderator'},
        Rollback: {u:'Rollback'},
    }
};
UserTagsJS.modules.custom = {
    'MarsDy': ['Mara1'],
    'ChicChick336': ['ContentMod','Designer'],
    'RileyJD': ['ContentMod']
    'Rayvena': ['Rollback'],
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

/* Slider */
dev:CustomSlider.js