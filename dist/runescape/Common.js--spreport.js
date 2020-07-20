/** <pre>
 * Special page report
 * For those of us too lazy to check the actual pages.
 *
 * See [[RuneScape:Maintenance]] for implementation.
 * 
 * by [[User:Cåm]].
 * Thanks to [[w:User:Mathmagician]] for tips and help.
 */

;(function ($, mw) {

    function apiQuery() {
        var pages = [
            'BrokenRedirects',
            'DoubleRedirects',
            'Unusedcategories',
            'Unusedimages',
            'Wantedcategories',
            'Wantedfiles',
            'Wantedpages',
            'Wantedtemplates',
            'Uncategorizedimages',
            'Uncategorizedpages',
            'Uncategorizedtemplates',
            'Uncategorizedcategories'
        ],
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

    $(function () {

        // For [[RuneScape:Maintenace]]
        // Will also run elsewhere, see page for implementation
        if (document.getElementsByClassName('specialMaintenance').length) {
            apiQuery();
        }

        // Run on Special:SpecialPages too
        // per request - rs.wikia.com/?diff=8052917
        if (mw.config.get('wgCanonicalSpecialPageName') === 'Specialpages') {
            $('#mw-content-text').before('<div id="spreport">' +
                '<div><a href="/wiki/Special:BrokenRedirects" title ="Special:BrokenRedirects" target="_blank">Broken redirects (<span id="BrokenRedirects"></span>)</a> &bull; <a href="/wiki/Special:DoubleRedirects" title ="Special:DoubleRedirects" target="_blank">Double redirects (<span id="DoubleRedirects"></span>)</a> &bull; <a href="/wiki/Special:Unusedcategories" title ="Special:Unusedcategories" target="_blank">Unused categories (<span id="Unusedcategories"></span>)</a> &bull; <a href="/wiki/Special:Unusedimages" title ="Unusedimages" target="_blank">Unused images (<span id="Unusedimages"></span>)</div>' +
                '<div><a href="/wiki/Special:Wantedcategories" title ="Special:Wantedcategories" target="_blank">Wanted categories (<span id="Wantedcategories"></span>)</a> &bull; <a href="/wiki/Special:Wantedfiles" title ="Special:Wantedfiles" target="_blank">Wanted files (<span id="Wantedfiles"></span>)</a> &bull; <a href="/wiki/Special:Wantedpages" title ="Special:Wantedpages" target="_blank">Wanted pages (<span id="Wantedpages"></span>)</a> &bull; <a href="/wiki/Special:Wantedtemplates" title ="Special:Wantedtemplates" target="_blank">Wanted templates (<span id="Wantedtemplates"></span>)</a></div>' +
            '</div>');
            apiQuery();
        }
    });

}(jQuery, mediaWiki));

/* </pre> */