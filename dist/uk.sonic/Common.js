/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */

window.railWAM = {
    logPage:"Project:WAM Log"
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		rollbacker: { u: 'Откатчік' },
		bureaucrat: { u: 'Бюрократ' },
		founder: { u: 'Засновник' },
		exmoderator: { u: 'Почесний модератор' }
	}
};
UserTagsJS.modules.custom = {
	
	'Pavle Zgharbishvili': ['founder'],
	'Златогрудка 2.0.': ['exmoderator'], 
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