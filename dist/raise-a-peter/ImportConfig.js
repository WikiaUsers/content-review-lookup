// THIS PAGE IS ONLY FOR IMPORTJS CONFIGURATIONS
// MessageBlock
window.MessageBlock = {
	title: 'Block message',
	message: 'Hello, you have been blocked for $2 for the following reason: $1. To appeal, please contact any of the administrators on their message wall or on their Community Central message walls.',
	autocheck: true
};
// Message wall tags (will be revamped with each usergroup having their own customisations)
window.MessageWallUserTags = {
    tagColor: 'cyan',
    txtSize: '12px',
    glow: true,
    glowSize: '20px',
    glowColor: 'cyan',
    users: { // sort in order
    // founder (wiki founder)
    // bureaucrat (wiki admin)
    // administrator (wiki admin)
    // super mod (super moderator)
    // mod (wiki moderator)
    // rollback (active editor)
    
        'Thefishman4563': 'wiki founder',
        'Raz Mail': 'wiki admin',
        'Soda.tbh': 'mod'
    }
};

// TopicBlockLog
TBL_GROUP = "roblox-en";


// SpoilerAlert
window.SpoilerAlertJS = {
    question: 'Ay Peter, stop right there! Below are spoilers. Are you sure you want to see them?',
    yes: 'Sure!',
    no: 'not at all no',
    fadeDelay: 750
};