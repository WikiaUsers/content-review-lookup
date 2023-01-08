/* Auto refresh */
window.ajaxPages = ["Special:NewFiles","Blog:Recent posts","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Clock */
// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

// No more than TWO CUSTOM tags are allowed per user.
// This excludes all staff position/coder tags.
UserTagsJS.modules.custom = {
                'Photo Negative Mickey': ['pnm'],
                'FateForWindows': ['FFW'],
                'TheTorture': ['FFW']
};            
/* End of the {{USERNAME}} replacement */
 
window.UserTagsJS = {
	modules: {},
	tags: {
	   	bureaucrat: {u:'Bureaucrat', link:'Project:Staff#Bureaucrats'},
                founder: {u:'Founder', link:'Project:Staff#Bureaucrats'},
                sysop: {u:'Admin', link:'Project:Staff#Admins'},
                chatmoderator: {u:'Chat moderator', link:'Project:Staff#Chat_Moderators'},
                rollback: {u:'Rollback', link:'Project:Staff#Rollbacks'},
                threadmoderator: {u:'Moderator', link:'Project:Staff#Moderators'},
                FWW: {u:'Devoloper'},
                pnm: {u:'The Possessed Being'}
	}
	UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], 
	'sysop': ['bureaucrat'],
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
window.MessageWallUserTags = {
    tagColor: 'Ghostwhite',
    glow: true,
    glowSize: '22px',
    glowColor: '#3104B4',
    users: {
        'FateForWindows': 'Founder',
        'Photo_Negative_Mickey': 'Admin',
    }