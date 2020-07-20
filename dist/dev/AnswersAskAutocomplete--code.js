// <source lang="JavaScript">
mw.loader.using('jquery.ui.autocomplete', function () {
    "use strict";
    $('#answers_ask_field').autocomplete({
        minLength: 2,
        source: function (request, response) {
            $.getJSON(mw.util.wikiScript('index'), {
                format: 'json',
                action: 'ajax',
                rs: 'getLinkSuggest',
                query: request.term
            }, function (arr) {
                if (arr.suggestions && arr.suggestions.length > 0) {
                    response(arr.suggestions);
                } else {
                    response([]);
                }
            });
        },
        select: function (event, ui) {
            var valueEncoded = encodeURIComponent(ui.item.value.replace(/ /g, '_')),
                // slashes can't be urlencoded because they break routing
                location = mediaWiki.config.get('wgArticlePath').replace(/\$1/, valueEncoded).replace(encodeURIComponent('/'), '/');
            if (event.button === 1 || event.metaKey || event.ctrlKey) {
                window.open(location);
            } else {
                window.location.href = location;
            }
            return false;
        }
    });
});
// </source>