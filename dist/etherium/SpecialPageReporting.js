/**
 * Special page reporting
 * 
 * @athor cblair91
 * @version 1.0
 */
( function ( $, mw) {
    var pages = [
        'BrokenRedirects',
        'DoubleRedirects',
        'Unusedcategories',
        'Unusedimages',
        'Wantedcategories',
        'Wantedfiles',
        'Wantedpages',
        'Wantedtemplates'
    ];
    function getPages( page ) {
        $.getJSON( '/api.php?action=query&list=querypage&qppage=' + page + '&qplimit=100&format=json', function ( data ) {
            $( '#' + page ).text( data.query.querypage.results.length );
        });
    }
    function apiQuery() {
        for ( var i = 0; i < pages.length; i++ ) {
            getPages( pages[i] );
        }
    }
    $( function() {
        if ( document.getElementsByClassName( 'specialMaintenance').length ) {
            apiQuery();
        }
        if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Specialpages' ) {
            $('#mw-content-text').before('<div id="spreport">' +
                '<div><a href="/Special:BrokenRedirects" title="Special:BrokenRedirects" target="_blank">Broken redirects (<span id="BrokenRedirects"></span>)</a> &bull; <a href="/Special:DoubleRedirects" title="Special:DoubleRedirects" target="_blank">Double redirects (<span id="DoubleRedirects"></span>)</a> &bull; <a href="/Special:Unusedcategories" title="Special:Unusedcategories" target="_blank">Unused categories (<span id="Unusedcategories"></span>)</a> &bull; <a href="/Special:Unusedimages" titl ="Unusedimages" target="_blank">Unused images (<span id="Unusedimages"></span>)</div>' +
                '<div><a href="/Special:Wantedcategories" title="Special:Wantedcategories" target="_blank">Wanted categories (<span id="Wantedcategories"></span>)</a> &bull; <a href="/Special:Wantedfiles" title="Special:Wantedfiles" target="_blank">Wanted files (<span id="Wantedfiles"></span>)</a> &bull; <a href="/Special:Wantedpages" title="Special:Wantedpages" target="_blank">Wanted pages (<span id="Wantedpages"></span>)</a> &bull; <a href="/Special:Wantedtemplates" titl ="Special:Wantedtemplates" target="_blank">Wanted templates (<span id="Wantedtemplates"></span>)</a></div>' +
            '</div>');
            apiQuery();
        }
    });
}( window.jQuery, window.mediaWiki ) );