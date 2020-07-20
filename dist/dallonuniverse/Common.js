/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
              sysop: { u:'Administrator', order: 1 },              
              bureaucrat: { order: 100 },
              chatmoderator: { order: 101 },
              js: { u:'Awesome', order: 102 }             
        }
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
        'sysop': ['founder'],
        'newuser': ['sysop', 'bureaucrat', 'chatmoderator'], 
        'nonuser': ['sysop', 'bureaucrat', 'chatmoderator']     
};
UserTagsJS.modules.userfilter = {	

};
UserTagsJS.modules.implode = {

};
UserTagsJS.modules.custom = {
        '(Insert Your Name Here)': ['js']        	
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});