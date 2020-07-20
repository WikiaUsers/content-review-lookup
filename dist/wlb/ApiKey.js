var _api = {
    edittoken: mw.user.tokens.values.editToken,
    watchtoken: mw.user.tokens.values.watchToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage')
};