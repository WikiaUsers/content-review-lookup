(() => {
	const group = mw.config.get('wgUserGroups');
	if ((!(group.includes('sysop') || group.includes('staff') || group.includes('soap') || group.includes('helper') || group.includes('wiki-specialist'))) || window.wikiaModerationLoaded) return console.info('[wikia-moderation.js]: ABORTING');
	if(!mw.action) {mw.action = {};}
	var userNameDefault;
	if (!mw.config.get('profileUserName')) {userNameDefault = mw.config.get('wgUserName');}
	else {userNameDefault = mw.config.get('profileUserName');}
	mw.action.block = function(user = userNameDefault, duration = 'infinite', reason = '', autoblock = false, nocreate = true, onSuccess = () => {}, onError = () => {}) {
		$.ajax({
			'url': mw.util.wikiScript('api'),
			'type': 'POST',
			'data': {
				'action': 'block',
				'user': user,
				'expiry': duration,
				'reason': reason,
				'autoblock': autoblock,
				'nocreate': nocreate,
				'token': mw.user.tokens.get('csrfToken'),
				'format':'json'
			}
		}).done(data => {
			if (!data.error) {console.info(`[wikia-moderation.js]: Blocked ${user} for ${duration} with the reason: ${reason}.`); onSuccess();}
			else {console.error(`[wikia-moderation.js]: ${JSON.stringify(data.error.code)}`); onError();}
		});
	};
	
	mw.action.unblock = function(username = userNameDefault, reason = '', onSuccess = () => {}, onError = () => {}) {
		$.ajax({
			'url': mw.util.wikiScript('api'),
			'type': 'POST',
			'data': {
				'action': 'unblock',
				'user': username,
				'reason': reason,
				'token': mw.user.tokens.get('csrfToken'),
				'format':'json'
			}
		}).done(data => {
			if (!data.error) {console.info(`[wikia-moderation.js]: Unblocked ${username} with the reason: ${reason}.`); onSuccess();}
			else {console.error(`[wikia-moderation.js]: ${JSON.stringify(data.error.code)}`); onError();}
		});
	};
	
	mw.action.delete = function(title, reason = '', onSuccess = () => {}, onError = () => {}) {
		$.ajax({
			'url': mw.util.wikiScript('api'),
			'type': 'POST',
			'data': {
				'action': 'delete',
				'title': title,
				'reason': reason,
				'token': mw.user.tokens.get('csrfToken'),
				'format':'json'
			}
		}).done(data => {
			if (!data.error) {console.info(`[wikia-moderation.js]: deleted ${title} with the reason: ${reason}.`); onSuccess();}
			else {console.error(`[wikia-moderation.js]: ${JSON.stringify(data.error.code)}`); onError();}
		});
	};
	
	mw.action.undelete = function(title, reason = '', onSuccess = () => {}, onError = () => {}) {
		$.ajax({
			'url': mw.util.wikiScript('api'),
			'type': 'POST',
			'data': {
				'action': 'undelete',
				'title': title,
				'reason': reason,
				'token': mw.user.tokens.get('csrfToken'),
				'format':'json'
			}
		}).done(data => {
			if (!data.error) {console.info(`[wikia-moderation.js]: Restored ${title} with the reason: ${reason}.`); onSuccess();}
			else {console.error(`[wikia-moderation.js]: ${JSON.stringify(data.error.code)}`); onError();}
		});
	};
	window.wikiaModerationLoaded = true;
	return console.info('[wikia-moderation.js]: LOADED');
})();