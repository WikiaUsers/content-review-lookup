/** <pre>
 * Special Page Report List
 * 
 * Status: Under construction
 *
 * by [[User:Cåm]]
 */

(function ($, mw) {

    if (mw.config.get('wgPageName') === 'MediaWiki:Maintenance') {

        var i;

        $.getJSON('/api.php?action=query&list=querypage&qppage=Wantedpages&format=json&qplimit=100', function (data) {
            (function (i) {
                for (i = 0; i < data.query.querypage.results.length; i++) {
                    $('#WantedpagesList').append('<li>' + data.query.querypage.results[i].title + ' (<a href="/wiki/Special:WhatLinksHere/' + data.query.querypage.results[i].title + '" title="Special:WhatLinksHere/' + data.query.querypage.results[i].title + '" target="_blank">' + data.query.querypage.results[i].value + ' links</a>)</li>');
                }
            }(i));
        });

        /**
         * data.query.querypage.results[i].value is cached value of requests
         * Use Special:WhatLinksHere for non cached version?
         * '/api.php?action=query&list=backlinks&bltitle=' + title + '&format=json'
         * data.query.backlinks.length
         */

/**
 * $.getJSON to get wanted pages
 * returns the page title, namespace and number of links
 * number of links is cached
 * use ?action=query&list=backlinks to get correct number of links (Special:WhatLinksHere equivalent)
 * using nested $.getJSON calls
 *
 * Problems: assign the array from first call to a variable, which can then be used in the second call.
 *           variable can be accessed as console.log(var), but not console.log(var.property)
 *           hlep?
 */

    }

}(jQuery, mediaWiki));


/* </pre> */