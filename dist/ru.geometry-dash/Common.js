/* Any JavaScript here will be loaded for all users on every page load. */

/* Template:USERNAME */
var username = wgUserName;
if (username) {$('.InsertUsername').text(username);}

/***************************/
/** Script Configuration ***/
/***************************/

window.dev = window.dev || {};
window.dev.editSummaries = {
    css: '#stdSummaries'
};

/* UserTags */
window.UserTagsJS = {
    modules: {},
    tags: {}
};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.metafilter = {'sysop': ['bureaucrat']};
UserTagsJS.modules.newuser = {
    days: 7
};

/* AjaxRC */
window.ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"]; 
window.AjaxRCRefreshText = 'Автообновление';