//Redirect chat to a url if the chat isn't enabled
if (
    mw.config.get('wgCanonicalSpecialPageName') === 'Chat' &&
    !mw.loader.getState('ext.Chat2')
) {
    window.location = 'https://community.fandom.com/wiki/Staff_Office_Hours';
}

//LockForums - lock after 60 days (default: 30)
window.LockForums = {
    expiryDays: 60
};