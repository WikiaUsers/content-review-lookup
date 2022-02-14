// Note: Chrome's Omnibox generates URLs like this:
// * Special:Search?search=Sofix
// whereas wiki search looks more like these:
// * Special:Search?query=Sofix&scope=internal
// * Special:Search?query=Foo+bar&scope=internal&navigationSearch=true
if (mw.config.get('wgCanonicalSpecialPageName') === 'Search' &&
    mw.user.options.values['enableGoSearch'] &&
    new URL(location.href).searchParams.has('search') // Omnibox
) {
    var target = $('#mw-content-text .mw-search-exists');
    if (target.length) {
        location.href = target.find('a').attr('href');
    }
}