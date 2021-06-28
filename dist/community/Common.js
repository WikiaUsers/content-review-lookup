//Redirect Special:Chat to Discord
if (mw.config.get('wgPageName') === 'Special:Chat') {
    window.location = 'https://community.fandom.com/wiki/Discord';
}

//LockForums - lock after 60 days (default: 30)
window.LockForums = {
    expiryDays: 60
};

window.AddRailModule = [{
	page: 'MediaWiki:DiscordAMA',
	prepend: true
}];