/* Last edited on May 1, 2015 by Drek'TharSuperSword */
/* This is used along with MediaWiki:Wikia.css/Usertags.css */
window.UserTagsJS = {
	modules: {},
	tags: { 
		maintenanceuser: 'Maintenance user',
                topuser: 'Top user',
                patroller: 'Patroller',
                pvzfanboy: 'PvZ fanboy',
                cpwriter: 'Creepypasta writer',
                photoshopper: 'Photoshop expert',
                jswriter: 'Javascript writer',
                csswriter: 'CSS writer',
                grammarist: 'Grammar nazi',
                indonesian: 'Indonesian',
                westjava: 'From West Java'
}
};
UserTagsJS.modules.custom = {
        "Drek'TharSuperSword": ['maintenanceuser', 'jswriter', 'westjava', 'indonesian'], //The above one didn't work.
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat', 'founder'],
        rollback: ['sysop', 'chatmoderator', 'threadmoderator', 'bureaucrat', 'founder'],
        threadmoderator: ['bureaucrat', 'sysop', 'founder']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'threadmoderator', 'chatmoderator', 'rollback', 'bot-global', 'patroller'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});