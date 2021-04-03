if($.inArray(mw.config.get('wgNamespaceNumber'), [2, 1200, 500]) != -1 || (mw.config.get('wgCanonicalSpecialPageName') && $.inArray(mw.config.get('wgCanonicalSpecialPageName'), ['Contributions', 'Following']) != -1)) {
    console.info('Entered user page');
    /* Settings */
    if($.inArray(mw.config.get('wgNamespaceNumber'), [2, 1200, 500]) != -1) {
        user = /:(.*)/.exec(mw.config.get('wgPageName'))[1].replace('_',' ');
    }
    else if(mw.config.get('wgCanonicalSpecialPageName') == 'Contributions') {
        user = /\/(.*)/.exec(mw.config.get('wgPageName'))[1].replace('_',' ');
    }
    else if(mw.config.get('wgCanonicalSpecialPageName') == 'Following') {
        user = mw.config.get('wgUserName');
    }
    getSettings(user, function(settings) {
        if(settings.hasOwnProperty('party')) {
            $('body').addClass('party-' + settings.party);
        }
    });
}