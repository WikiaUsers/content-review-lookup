/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:UserTags/code.js",
        "u:dev:ShowHide/code.js",
        "u:dev:MessageWallUserTags/code.js",
    ]
});

////////////////////////////////////////////////////////////////////////////////
// Custom User Tags
window.UserTagsJS = {
	modules: {},
	tags: {
	bureaucrat: { order: 1, link:'Category:Encantadia Wiki administrators', },
	sysop: { order: 1, link:'Category:Encantadia Wiki administrators',},
    rollback: { order: 1, link:'Category:Encantadia Wiki administrators', },
	chatmoderator: { order: 2, link:'Category:Encantadia Wiki administrators', },
	
// Custom Tags
	dmg: { u: 'DarkMagicianGirl23' },
	
    ddw: { u: 'darkdragonwing' },
	
	mac: { u: 'Milkandchocolate' },
	}
};
UserTagsJS.modules.custom = {
	'DarkMagicianGirl23': ['dmg',],
	'darkdragonwing': ['ddw',],
	'Milkandchocolate': ['mac',],
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot']
UserTagsJS.modules.inactive = 60;
UserTagsJS.modules.metafilter = {
	'inactive': ['sysop', 'bureaucrat'], // Remove inactive from all bureaucrats and sysops
	'sysop': ['bureaucrat'], // Remove "Admin" tag from bureaucrats
	'rollback': ['sysop', 'bureaucrat'], // Remove rollback from all bureaucrats and sysops
	// Remove chat moderator from admins as well as users who have BOTH patroller AND rollback
	'chatmoderator': ['sysop', ['patroller', 'rollback']]
};
 
////////////////////////////////////////////////////////////////////////////////
// Message Wall / Forum Tags
window.MessageWallUserTags = {
    tagColor: 'blue',
    glow: true,
    glowSize: '12px',
    glowColor: 'black',
    users: {
        'DarkMagicianGirl23': 'Bureaucrat • Tagapangalaga ng Encantadia Wiki'
    }
    ////////////////////////////////////////////////////////////////////////////////
// Message Wall / Forum Tags
}; MessageWallUserTags = {
    tagColor: 'yellow',
    glow: true,
    glowSize: '12px',
    glowColor: 'black',
    users: {
        'darkdragonwing': 'Bureaucrat • Tagapangalaga ng Encantadia Wiki'
    }
    ////////////////////////////////////////////////////////////////////////////////
// Message Wall / Forum Tags
}; MessageWallUserTags = {
    tagColor: 'green',
    glow: true,
    glowSize: '12px',
    glowColor: 'black',
    users: {
        'Milkandchocolate': 'Bureaucrat • Tagapangalaga ng Encantadia Wiki'
    }
};