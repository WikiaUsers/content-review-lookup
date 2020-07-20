mw.loader.using('jquery.ui.autocomplete', function () {
    "use strict";
    $('#WikiaSearch').find('input').autocomplete({
        minLength: 2,
        source: function (request, response) {
            $.getJSON(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'opensearch',
                search: request.term
            }, function (arr) {
                if (arr && arr.length > 1) {
                    response(arr[1]);
                } else {
                    response([]);
                }
            });
        }
    });
});