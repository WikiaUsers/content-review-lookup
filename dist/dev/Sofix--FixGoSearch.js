if (mw.config.get('wgCanonicalSpecialPageName') === 'Search') {
    var target = $('#mw-content-text .mw-search-exists');
    if (target.length) {
        location.href = target.find('a').attr('href');
    }
}