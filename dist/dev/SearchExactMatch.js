(function (window, $, mw) {
    mw.loader.using(['mediawiki.api'], function () {
        var searchInput = document.querySelector('.unified-search__input__field, input[name="query"]');
        var searchForm = searchInput && searchInput.closest('form');
        if (!searchForm || !searchInput) return;

        searchForm.addEventListener('submit', function (e) {
            var query = searchInput.value.trim();
            if (!query) return;

            e.preventDefault();

            new mw.Api().get({
                action: 'query',
                list: 'search',
                srsearch: query,
                srnamespace: 0,
                srlimit: 5,
                format: 'json'
            }).then(function (data) {
                var results = data.query.search;
                if (results) {
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].title.toLowerCase() === query.toLowerCase()) {
                            var title = results[i].title;
                            window.location.href = mw.config.get('wgArticlePath')
                                .replace('$1', encodeURIComponent(title.replace(/ /g, '_')));
                            return;
                        }
                    }
                }
                searchForm.submit();
            }).catch(function () {
                searchForm.submit();
            });
        });
    });
}(this, jQuery, mediaWiki));