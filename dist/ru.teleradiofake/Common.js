window.railWAM = {
    logPage:"Project:WAM Log"
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		discordadmin: { u: 'Администратор Discord-сервера' },
		rollbacker: { u: 'Откатчик' },
		discordmoder: { u: 'Модератор Discord-сервера' },
		bureaucrat: { u: 'Старший администратор' },
		founder: { u: 'Основатель' }
	}
};
UserTagsJS.modules.custom = {
	'Vlad20187003': ['discordadmin'],
	'WreckingBall2014': ['discordmoder'],
	'IANDROCOM': ['discordadmin'],
	'Bibigon54': ['founder'], 
	'IVorobey': ['discordadmin'],
	'RenTVArchive': ['discordmoder'], 
	'Yerassyl Kh.': ['rollbacker']
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat']
};
 
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});