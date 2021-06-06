//Redirect chat to a url if the chat isn't enabled
if (
    mw.config.get('wgCanonicalSpecialPageName') === 'Chat' &&
    !mw.loader.getState('ext.Chat2')
) {
    window.location = 'https://community.fandom.com/wiki/Discord';
}

//LockForums - lock after 60 days (default: 30)
window.LockForums = {
    expiryDays: 60
};

window.AddRailModule = [
    {page: 'MediaWiki:DiscordAMA', prepend: true},
];