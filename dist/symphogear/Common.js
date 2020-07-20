/* Any JavaScript here will be loaded for all users on every page load. */

/* BackToTop */
window.BackToTopModern = true;

/* Auto updating recent changes opt-in. See w:c:dev:AjaxRC for info & attribution */
AjaxRCRefreshText = 'Auto-Refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:UncategorizedPages","Special:AllPages","Special:NewFiles"];
importScriptPage('AjaxRC/code.js', 'dev');

/* MessageWallUserTags */
window.MessageWallUserTags = {
    tagColor: '#A21E69',
    txtSize: '13px',
    users: {
        'GotenSakurauchi': 'Admin',
        'Sylphfarn12': 'Admin',
        'CureHibiki': 'Admin',
        'Lightangel2': 'Admin',
    }
};