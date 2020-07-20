/* Any JavaScript here will be loaded for all users on every page load. */
var ShowHideConfig = { autoCollapse: 1, userLang: false };
importScriptPage( 'ShowHide/code.js', 'dev' );

window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		bazooka: { u:'Bazooka Blaster' },
		featured: { u:'Featured User' },
		categorizer: { u:'Categorizer' },
                tech: { u:'Tech Support' },
                continuous: { u:'Continuous Contributor' },

		'bot-global': { link: 'Project:Bots' }
	}
};
 
//UserTagsJS.modules.custom = {
//        'Oscuritaforze': ['tech'] // helping hand
//};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/*
var WikiaNotificationMessage = "How about this new brown skin? Read all about it <a href='/wiki/User_blog:Koenachtig/The_new_skin'>here</a>";
var WikiaNotificationexpiry = 7;
importScriptPage('WikiaNotification/code.js', 'dev');
*/