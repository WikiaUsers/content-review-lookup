/* Any JavaScript here will be loaded for all users on every page load. */

/* Template:USERNAME */
var username = wgUserName;
if (username) {$('.InsertUsername').text(username);}

/***************************/
/** Script Configuration ***/
/***************************/
/* UserTags */
window.UserTagsJS = {
    modules: {},
    tags: {
       'content-moderator': { u: 'Модератор Контенту' },
       threadmoderator: {u: 'Модератор Обговорень' }
    }
};
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.metafilter = {'sysop': ['bureaucrat']};
UserTagsJS.modules.newuser = {
    days: 7,
    edits: 10
};

/* AjaxRC */
window.ajaxPages = ["Спеціальна:WikiActivity","Спеціальна:RecentChanges"]; 
window.AjaxRCRefreshText = 'Автооновлення';