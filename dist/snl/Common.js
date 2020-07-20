/* Any JavaScript here will be loaded for all users on every page load. */

//UserTags information

window.UserTagsJS = {
	modules: {},
	tags: {
               chatmoderator: {u: 'CHATMOD'},
               notautoconfirmed: {u: 'NOT AUTOCONFIRMED'},
               inactive: {u: 'INACTIVE'}
              },
	oasisPlaceBefore: ''
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'bannedfromchat'];
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.metafilter = {
	'sysop': ['bannedfromchat'],
        'bureaucrat': ['bannedfromchat'],
        'chatmoderator': ['bannedfromchat']
};
UserTagsJS.modules.inactive = 180;

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

//END UserTags information