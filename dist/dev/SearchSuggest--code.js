(function (module, $, window) {
    'use strict';
    if (
        module.loaded ||
        mw.config.get('wgCanonicalSpecialPageName') !== 'Search'
    ) {
        return;
    }
    module.loaded = true;

    function init() {
        $('#search-v2-input').autocomplete({
            serviceUrl: mw.util.wikiScript('api') + '?action=opensearch',
            appendTo: $('.SearchInput'),
            deferRequestBy: 250,
            maxHeight: 100 * (module.maxResults || 10),
            queryParamName: 'search',
            fnPreprocessResults: function(d) {
                d.query = d[0];
                d.suggestions = d[1];
                d.data = d[1];
                return d;
            },
            onSelect: function(value, data, event) {
                var url = mw.util.getUrl(value);
                if (event.shiftKey || event.ctrlKey || event.metaKey) {
                    window.open(url);
                    return false;
                } else {
                    window.location.href = url;
                }
            }
        });
    }

    mw.loader.using('jquery.autocomplete').then(init);
}((window.dev = window.dev || {}).searchSuggest = window.dev.searchSuggest || {}, jQuery, window));