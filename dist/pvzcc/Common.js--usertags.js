/*tags */
window.UserTagsJS = {
	modules: {},
	tags: {
                bureaucrat: { order: 1 },
                'technician' { u:'Technician', order: 100 }
                'critic' { u:'Critic', order: 101 }
       }
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.custom = {
        'BLACK OUT': ['technician'],
        'Guppie the Third': ['technician'],
        'Wikia-Critic': ['critic']
};
UserTagsJS.modules.metafilter = {
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
/* end of tags */