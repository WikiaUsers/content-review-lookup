/** <pre>
 * Special page report
 * For those of us too lazy to check the actual pages.
 *
 * See [[MediaWiki:Maintenance]] for implementation.
 * 
 * by [[User:Cåm]].
 * Thanks to [[w:User:Mathmagician]] for tips and help.
 */

(function ($, document) {

    if (document.getElementsByClassName('specialMaintenance').length) {

        var pages = ['BrokenRedirects',
                     'DoubleRedirects',
                     'Unusedcategories',
                     'Unusedimages',
                     'Wantedcategories',
                     'Wantedfiles',
                     'Wantedpages',
                     'Wantedtemplates'],
            i;

        // For API documentation see 'runescape.wikia.com/api.php'
        // Search for '* list=querypage (qp) *'
        // Will return a maximum of 100 results

        for (i = 0; i < pages.length; i++) {
            (function (i) {
                $.getJSON('/api.php?action=query&list=querypage&qppage=' + pages[i] + '&qplimit=100&format=json', function (data) {
                    $('#' + pages[i]).text(data.query.querypage.results.length);
                });
            }(i));
        }

    }

}(jQuery, document));

/* </pre> */