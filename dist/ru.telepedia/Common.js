window.railWAM = {
    logPage:"Project:WAM Log"
};

window.UserTagsJS = {
	modules: {},
	tags: {
		rollbacker: { u: 'Откатчик' },
		bureaucrat: { u: 'Старший администратор' },
		founder: { u: 'Основатель' },
		moderator: { u: 'Модератор' }
	}
};
UserTagsJS.modules.custom = {
	'Bibigon54': ['founder'],
	'TNTVV989': ['moderator'], 
	'Yerassyl Kh.': ['rollbacker']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'],
	'content-moderator': ['moderator'],
	'threadmoderator': ['content-moderator']
};

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});