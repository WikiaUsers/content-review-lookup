/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	modules: {},
	tags: {
              sysop: { u:'Administrator', order: 99 },              
              bureaucrat: { order: 100 },
              chatmoderator: { order: 101 },
              threadmoderator: { order: 102 },
        }
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'threadmoderator', 'rollback', 'blocked', 'inactive'];
UserTagsJS.modules.metafilter = {
        'newuser': ['sysop', 'bureaucrat', 'chatmoderator', 'threadmoderator'], 
        'nonuser': ['sysop', 'bureaucrat', 'chatmoderator', 'threadmoderator'],
        'rollback': ['sysop', 'bureaucrat', 'chatmoderator', 'threadmoderator'],
        'inactive': ['sysop',' chatmoderator', 'threadmoderator'],
        'chatmoderator': ['threadmoderator']
};
UserTagsJS.modules.userfilter = {

};
UserTagsJS.modules.implode = {
};
UserTagsJS.modules.custom = {
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});