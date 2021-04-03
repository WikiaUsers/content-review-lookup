/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
		major:  'Major',
		inactive:'Inactive',
		head: 'Head of the wiki',	
}
.UserTagsJS.modules.custom = {
	'FliplineFan12': ['inactive'], 
    'Natanos': ['major'],
    'SpongeFreddy777': ['head'],
}
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'FliplineFan12': 'Founder • Retired',
        'Axioras': 'Administrator',
        'Tenroujima': 'Administrator',
        'Phreakzero': 'Bureaucrat • Administrator'
    }
}
};
/* Auto refresh */
window.ajaxPages = ["Special:NewFiles","Blog:Recent posts","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js',
        'w:c:dev:AjaxRC/code.js'
    ]
});

importScriptPage('AjaxRC/code.js', 'dev');