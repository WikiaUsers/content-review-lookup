if (mw.config.get("wgCanonicalSpecialPageName") === "BrowseData") {
    (function() {

        function list(offset) {

            var query = '[[Category:' + location.pathname.replace(/.*\//g, '') + ']]';

            if (location.search)
                query += '[[' + location.search.substring(1).replace(/&/g, ']][[').replace(/=/g, '::') + ']]';

            query += '|offset=' + offset;

            $.get('/api.php', {
                    format: 'json',
                    action: 'ask',
                    query: query
                })
                .done(function(d) {
                    var text = '';
                    $.each(d.query.results, function(k, v) {
                        text += ['<a href="', v.fullurl, '">', v.fulltext, '</a><br>'].join('');
                    });

                    if (d["query-continue-offset"]) {
                        text += "<a href=# id='next-page' style='float:right;cu'>Next Page</a>";
                    }

                    $("#mw-content-text").html(text);
                    $("#next-page").click(function() {
                        list(d["query-continue-offset"]);
                    });

                });
        }

        jQuery(function($) {
            document.title = mw.config.get("wgPageName");
            if (location.pathname === "/wiki/Special:BrowseData") {
                var text = 'Select a type to start browsing:<br>';
                ["Characters", "Jutsu", "Episodes", "Chapters", "Tools", "Locations"].forEach(function(v) {
                    text += '<a href="/wiki/Category:' + v + '">' + v + '</a><br>';
                    $("#mw-content-text").html(text);
                });
            } else list(0);
        });
    }());
}