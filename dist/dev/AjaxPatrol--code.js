/**
 * jQuery Ajax Patrol Links
 *
 * @author Grunny
 *
 * Used files: [[File:Facebook throbber.gif]]
 */

(function () {
    var patrolledMsg = 'Marked as patrolled';

    $( document.body ).on( 'click', '.patrollink > a[href]', function ( e ) {
        var $patrolLink = $( this ),
            url = new mw.Uri( $patrolLink.attr( 'href' ) );

        // validate that link is a patrol link for current wiki
        if ( url.host !== location.hostname || url.query.action !== 'markpatrolled' ) {
            return;
        }

        e.preventDefault();

        $patrolLink.html( '<img src="//images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />' );

        $.ajax( url.toString(), {
            dataType: 'text'
        } ).done( function () {
            $patrolLink.removeAttr( 'href' ).css( 'color', 'grey' ).text( patrolledMsg );
        } );
    } );

    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('AjaxPatrol').then(function(i18n) {
            patrolledMsg = i18n.msg( 'patrolled' ).plain();
        });
    });

    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
})();