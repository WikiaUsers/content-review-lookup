/* Message Wall User Tags */
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'DanzxvFan8275': 'Founder • Bureaucrat • Administrator',
        
        'FlandreAndTakane333': 'Administrator',
        
        'Ultimate_Toad_Gamer_13': 'Rollback',
    }
};

/* User profile header custom tags */
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Project:Administrator' },
		rollback: { link:'Project:Rollback' }
                bot: { link:'Project:Bot' }
                bureaucrat: { link: 'Project:Bureaucrat' }
	}
};
window.UserTagsJS.modules.inactive = 30;
window.UserTagsJS.modules.mwGroups = ['rollback', 'sysop', 'bot', 'bot-global'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});