/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
window.UserTagsJS = {
	modules: {},
	tags: {
		'sysop': { u: 'Site Administrator', order: 100 },
		veteran: { u: 'Veteran User', order: -1 },
		'chatmoderator': { u: 'Chat Moderator', order: 102 },
		'bureaucrat': { order: 1 } // Normal order is 0
	}
};

UserTagsJS.modules.custom = {
	'Wintermelon43': ['founder'], 

}; 

.tag.usergroup-sysop {
         background-color: pink !important;
         border: 3px black solid;
}
.tag.usergroup-bureaucrat {
         background-color: limegreen !important;
         border: 3px black solid; 
}
.tag.usergroup-chatmoderator {
         background-color: gold !important; 
         border: 3px black solid; 
}
.tag.usergroup-veteran { 
         background-color: red !important; 
         border: 3px black solid;
}

UserTagsJS.modules.custom = {
         'Godzilla Gamer': ['sysop', 'bureaucrat', 'chat moderator']
}

UserTagsJS.modules.inactive = {
          days: 60,
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});