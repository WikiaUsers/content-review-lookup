/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev');
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		rollback: { u:'Rollback' },
                bureaucrat: { u:'Zero' },
                sysop: { u:'Admin' },
                chatmoderator: { u:'Moderator' },
                founder: { u:'Founder' },
	}
};
UserTagsJS.modules.custom = {
	'JuneSlade': ['bureaucrat', 'sysop'], // Add Zero + Admin
        'AlexShepherd': ['bureaucrat', 'sysop'], // Add Zero + Admin 
        'TheNewEditor': ['bureaucrat', 'sysop'], // Add Zero + Admin
        'Groupoid': ['sysop'], // Add Admin
        '343 GuiltySpark': ['sysop'], // Add Admin
        'Supersnazzi': ['sysop'], // Add Admin
        'Gbertolini': ['rollback'], // Add Rollback
        
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.railWAM = {
    logPage:"Project:WAM Log"
};