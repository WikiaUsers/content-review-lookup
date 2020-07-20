/*UserTags - Dev*/
window.UserTagsJS = {
	modules: {},
	tags: {
		inactive: { order:-1/0 },
		bannedfromchat: 'Banned from Chat'
	}
};
UserTagsJS.modules.inactive = 14;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'sysop', 'bannedfromchat', 'bot', 'checkuser'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder', 'bot'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat', 'bot'],
	rollback: ['sysop', 'bureaucrat', 'bot'],
	patroller: ['sysop', 'bureaucrat', 'bot']
};

 importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/*Removes certain pages from wiki activity*/
$(document).ready(function() {
    $(".activityfeed > li:contains('NXTBot101')").remove();
    $(".activityfeed > li:contains('Category:')").remove();
});