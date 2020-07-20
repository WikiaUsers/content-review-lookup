window.UserTagsJS = {
	modules: {},
	tags: {
	   	   bureaucrat: {u:'Bureaucrat'},
                founder: {u:'Founder'},
                sysop: {u:'Admin'},
                threadmoderator: {u:'Sub Admin'},
                owner: {u:'Current Owner'},
	}
}
UserTagsJS.modules.custom = {
                'Zynical': ['bureaucrat','owner'],
}
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], 
	'sysop': ['bureaucrat'],
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

 
window.MessageWallUserTags = {
    tagColor: '#d93fff',
    glow: true,
    glowSize: '22px',
    glowColor: '#f5f5f5',
    users: {
          'Zynical': 'Owner',
    }
};