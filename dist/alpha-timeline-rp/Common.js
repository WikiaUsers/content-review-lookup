/* Any JavaScript here will be loaded for all users on every page load. */
/*~~DO NOT TOUCH THIS UNLESS YOU ARE CASTAWAY, IF YOU NEED SOMETHING LET HER KNOW Tysm ~ Ally ~~*/
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
                Alli2: {u:'Code Queen'},
                Coders: {u:'Coder'},
                Alli3: {u:'The Aesthetic'},
                Gamers: {u:'Gamer'},
                cas1: {u:'The Ultimate Nerd'},
                cas2: {u:'Space Child'},
                Neon1: {u:'Rouge of Hearts'},
                Dread1: {u:'Protecter'},
                Dread2: {u:'Guardian'},
                Dread3: {u:'Master of lightning'},
        }
};
UserTagsJS.modules.custom = {
 
        'AestheticsAllY': ['Alli1','Alli2','Coders','Alli3','Gamers'],
        'Daponyx': ['cas1','cas2','Coders'],
        'Neon1Umbreon': ['Neon1'],
        'Dread Bender': ['Dread1','Dread2','Dread3'],
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

/* Message block  */
var MessageBlock = {
  title : 'Blocked.',
  message : 'This user has been blocked for $2 for the following offence(s): "$1"',
  autocheck : true
};
 
 /* Clock */
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';
 
/* FastDelete */
window.fdButtons = [];
 
window.fdButtons[window.fdButtons.length] = {
    summary: 'Housekeeping',
    label: 'HK'
};
 
window.fdButtons[window.fdButtons.length] = {
    summary: 'Vandalism',
    label: 'V'
};
 
window.fdButtons[window.fdButtons.length] = {
    summary: 'Spam',
    label: 'S'
};