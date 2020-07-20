(function () {
    var page = mw.config.get('wgCanonicalSpecialPageName');
    if (page !== 'AbuseFilter' && page !== 'AbuseLog') {
        return;
    }

    mw.loader.load('skin.oasis.diff.runtimeStyles');
    $('table.mw-abuselog-details').css('background-color', 'transparent');
    $('table.mw-abuselog-details th').css('background-color', $('.wds-community-header').css('background-color'));
})();