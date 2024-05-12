/* Any JavaScript here will be loaded for all users on every page load. */

//UserTags
window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: {link:'Rocket_Bot_Royale_Wiki:User_Rights#Bureaucrat', title:'This user is a Bureaucrat.'},
		sysop: {link:'Rocket_Bot_Royale_Wiki:User_Rights#Administrator', title:'This user is an Administrator.'},
		'content-moderator': {link:'Rocket_Bot_Royale_Wiki:User_Rights#Content_Moderator', title:'This user is a Content Moderator.'},
		threadmoderator: {link:'Rocket_Bot_Royale_Wiki:User_Rights#Thread_Moderator', title:'This user is a Thread Moderator.'},
		bot: {link:'Rocket_Bot_Royale_Wiki:User_Rights#Bot', title:'This is an automated account.'},
		staff: {link:'https://community.fandom.com/wiki/Community_Central:Staff', title:'This user is a Fandom staff.'},
		newuser: {title:'This user has less than 10 edits or has registered for less than 5 days.'},
		inactive: {title:'This user has not edited for 30 days.'},
		founder: {u:'Founder', order:-1, title:'This user created the Rocket Bot Royale Wiki.'},
	}
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

UserTagsJS.modules.custom = {
	'TaNk8k': ['founder'],
	'TarasKhan475': ['bureaucrat']
};

UserTagsJS.modules.newuser = {
	namespace: 0, // Edits must be made to articles to count
	computation: function(days, edits) {
		// Newuser is removed as soon as the user gets 10 edits, OR as soon as they have been present for 5 days, whichever happens first
		return days < 5 && edits < 10;
	}
};