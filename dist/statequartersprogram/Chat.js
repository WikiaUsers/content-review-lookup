var userGroups = mw.config.get('wgUserGroups'), i, userClass,
welcome = document.body.getElementsByClassName('inline-alert')[0],
userName = mw.config.get('wgUserName'),

newMsgs = [
	// this area is configurable
	// usernames in messages are completely optional
	
	// message for administrators
	'Welcome, sysop ' + userName +'!',
	
	// message for chatmods
	'Welcome, chatmod ' + userName +'!',
	
	// message for rollbackers
	'Welcome, rollbacker ' + userName +'!',
	
	// message for everyone else
	'Welcome, ' + userName +'!',
];

for (i = 0; i < userGroups.length; i++) {
	if (userGroups[i] === 'sysop') {
		userClass = 0;
		break;
	} else if (userGroups[i] === 'chatmoderator') {
		userClass = 1;
	} else if (userGroups[i] === 'rollback' && userClass !== 1) {
		userClass = 2;
	} else if (userGroups[i] === 'user') {
		if (!isNaN(userClass)) {
			userClass = 3;
		}
		break;
	}
}

if (!isNaN(userClass)) {
	welcome.innerHTML = newMsgs[userClass];
}