//  Özel:Chat sayfasını Discord'a yönlendirin
if (mw.config.get('wgPageName') === 'Özel:Chat') {
    window.location = 'https://community.fandom.com/tr/wiki/Discord';
}

//LockForums - 60 gün sonra kilitle (varsayılan: 30)
window.LockForums = {
    expiryDays: 60
};

window.AddRailModule = [{
	page: 'MediaWiki:DiscordAMA',
	prepend: true
}];