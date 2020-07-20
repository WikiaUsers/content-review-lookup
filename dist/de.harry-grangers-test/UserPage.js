if($.inArray(wgNamespaceNumber,[2,1200,500]) != -1 || (wgCanonicalSpecialPageName && $.inArray(wgCanonicalSpecialPageName,['Contributions','Following']) != -1)) {
    console.info('Entered user page');
    /* Settings */
    if($.inArray(wgNamespaceNumber,[2,1200,500]) != -1) {
        user = /:(.*)/.exec(wgPageName)[1].replace('_',' ');
    }
    else if(wgCanonicalSpecialPageName == 'Contributions') {
        user = /\/(.*)/.exec(wgPageName)[1].replace('_',' ');
    }
    else if(wgCanonicalSpecialPageName == 'Following') {
        user = wgUserName;
    }
    getSettings(user,function(settings) {
        if(settings.hasOwnProperty('party')) {
            $('body').addClass('party-' + settings.party);
        }
    });
}