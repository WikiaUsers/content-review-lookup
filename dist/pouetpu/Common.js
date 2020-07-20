var WikiaNotificationMessage = "<a href=http://pouetpu.wikia.com/wiki/User:Froggie06855>Froggie06604</a> is our new owner! <a href=http://pouetpu.wikia.com/wiki/User_blog:Popthatcorn14/Some_Staff_Changes>Click this to read the full post</a>";
var WikiaNotificationexpiry = 5;
importScriptPage('WikiaNotification/code.js', 'dev');

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		owner: { u:'owner'},
		developercode: { u:'Code Developer' },
	}
};
UserTagsJS.modules.custom = {
	'G-Anaktigma': ['developercode'], // Add Code Developer
	'Froggie06855': ['owner'], // Add Owner
};