/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MessageWallUserTags/code.js',
        ]
});

window.UserTagsJS = {
	modules: {},
	tags: {
	    founder: {u:'Founder'},
	    bureaucrat: {u:'Bureaucrat'},
	    sysop: {u:'Admin'},
	    threadmoderator: {u:'Moderator'},
	    chatmoderator: {u:'Chat Moderator'},
	    rollback: {u:'Rollback'},
	    coder: {u:'Coder-in-training'},
	    aquupls: {u:'sexy incinerator'},
	    scrap: {u:'Scrap'},
	    som: {u:'Son of Malal'},
	    pab: {u:'certified cunt'},
	}
};
UserTagsJS.modules.custom = {
    'Pableeceeo': ['founder', 'coder', 'som'],
    'TheAquuaHybrid': ['sysop', 'aquupls'],
    'DroidUnit774': ['sysop', 'scrap'],
    
};
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], 
	'sysop': ['bureaucrat'],
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.MessageWallUserTags = {
    tagColor: 'Ghostwhite',
    glow: true,
    glowSize: '20px',
    glowColor: '#0B3B0B',
    users: {
        'Pableeceeo': 'Founder',
        'TheAquuaHybrid': 'Weenie',
        'DroidUnit774': 'Admin',
    }
};