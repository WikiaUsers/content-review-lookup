(function () {
    if (
        mw.config.get('wgCityId') !== '177' ||
        /staff/.test(mw.config.get('wgUserGroups')) ||
        mw.config.get('wgCanonicalSpecialPageName') !== 'Log' ||
        window.FixCommunityCentralLogTypesLoaded
    ) {
        return;
    }
    window.FixCommunityCentralLogTypesLoaded = true;
    $('#mw-content-text select[name="type"]').children().each(function () {
        if (
            $(this).text() === '&lt;coppatool-logpage&gt;' ||
            $(this).text() === '&lt;log-name-coppatool&gt;'
        ) {
            $(this).remove();
        }
    });
})();