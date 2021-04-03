/* Any JavaScript here will be loaded for all users on every page load. */
/* This is used along with MediaWiki:Wiki.css/Usertags.css */
window.UserTagsJS = {
	modules: {},
	tags: {
        councilor: 'Community Council',
        tech: 'Technician',
        topuser: 'Top user',
        patroller: 'Patroller',
        retired: 'Retired',
}
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat', 'founder'],
    rollback: ['sysop', 'chatmoderator', 'threadmoderator', 'bureaucrat', 'founder'],
    threadmoderator: ['bureaucrat', 'sysop', 'founder'],
    inactive: ['retired']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback', 'bot-global', 'patroller', 'staff', 'vstf', 'bot'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});