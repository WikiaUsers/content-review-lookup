
{

       modules: {},
       tags: {
               bureaucrat: { link:'Project:Administration#Bureaucrats and Administrators' },
               sysop: { link:'Project:Administration#Bureaucrats and Administrators' },
               rollback: { link:'Project:Administration#Rollbacks and Chat Moderators' },
               chatmoderator: { link:'Project:Administration#Rollbacks and Chat Moderators' }
       }

};


UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chat moderator', 'bot'];
UserTagsJS.modules.metafilter = { 'notautoconfirmed': ['new user'] };
UserTagsJS.modules.newuser = { days: 5, edits 0 };

 
importArticles({
	type: "script",
	articles: [
		"w:dev:AllPagesHideRedirect/code.js",
		"w:dev:Countdown/code.js",
                "w:dev:DupImageList/code.js",
		"w:dev:FloatingToc/code.js",
		"w:dev:ReferencePopups/code.js",
		"w:dev:RevealAnonIP/code.js",
		"w:dev:SearchSuggest/code.js",
                "w:dev:SexyUserPage/code.js",
		"w:dev:ShowHide/code.js",
		"w:dev:UserBadges/code.js", 
                "w:dev:WallGreetingButton/code.js",
		"MediaWiki:Common.js/activityrefresh.js",
		"MediaWiki:Common.js/displayclock.js",
	        "MediaWiki:Common.js/disableuploadpopup.js",
		"MediaWiki:Common.js/filluploadform.js",
		"MediaWiki:Common.js/insertusername.js",
                "MediaWiki:Common.js/star-ratings.js",
	]
});

// User Tags JavaScript 
window.UserTagsJS = {
	modules: {
			inactive: 30, // People are inactive after 30 days.
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'], // Our groups
			autoconfirmed: false, // We don't want to enable this tag.
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,}, // New users have a tag.
	tags: {
		bureaucrat
		sysop: { link:'Admins' },
		chatmoderator: { link:'Rollbacks and Chat Moderators' },
		rollback: { u:'Rollback', link:'Rollbacks and Chat Moderators' }
			}
};
UserTagsJS.modules.custom = {
	'Perfectdisasters': ['bureaucrat'],
	'Silly1!': ['bureaucrat'],
	'Junatina': ['bureaucrat']

};
UserTagsJS.modules.custom = {
	'Nada Mohamed': ['administrator']

};
UserTagsJS.modules.custom = {
	'Everafteraliar': ['chat moderator']

};
UserTagsJS.modules.custom = {
	'Chad012': ['rollback'],
	'FaceTheMusic': ['rollback']

	
};
UserTagsJS.modules.userfilter = {
	'HyperBOT': ['sysop', 'inactive']
};
UserTagsJS.modules.mwGroups = ['bureaucrat']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});