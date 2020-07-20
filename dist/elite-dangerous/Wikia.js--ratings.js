/** <pre>
 * Article Ratings script
 * Taken from RuneScape Wiki.
 * @author Cqm
 *
 * @notes Requires abusefilters to work
 */

;( function ( $, mw ) {

    'use strict';

        /**
         * Cache mw.config values
         */
    var conf = mw.config.get( [
            'skin',
            'wgNamespaceNumber',
            'wgMainPageTitle',
            'wgPageName',
            'wgTitle',
            'wgUserName'
        ] ),
        self = {
            /**
             * Checks we can continue
             */
            init: function () {
                // check we're in mainspace and not on the main page
                if ( conf.wgNamespaceNumber === 0 && conf.wgTitle !== conf.wgMainPageTitle ) {
                    // don't load twice
                    if ( $( '#RatingsModule' ).length ) {
                        return;
                    }

                    // only load for oasis
                    if ( ['oasis', 'wikia'].indexOf( conf.skin ) === -1 ) {
                        return;
                    }

                    // @todo checks
                    // check for redirect
                    // check for charm log
                    // check for disambig
                    // check for blocked user (how?)

                    // wait for sidebar to load before adding anything to it
                    if ( $( '#WikiaRail > .module' ).length ) {
                        self.loadForm();
                    } else {
                        setTimeout( self.init, 500 );
                    }
                }
            },

            /**
             * Creates the ratings form
             *
             * Form currently in the sidebar
             * @todo explore other places we can use it (a/b testing)
             */
            loadForm: function () {

                var $form = $( '<section>' )
                    .attr( 'id', 'RatingsModule' )
                    .addClass( 'module' )
                    .addClass( 'RatingsModule' )
                    .append(
                        $( '<h2>' )
                            .attr( 'id', 'ar-header' )
                            .text( 'Rate this page' ),
                        $( '<form>' )
                            .attr( {
                                'action': '#',
                                'id': 'ar-form'
                            } )
                            .on( 'submit', self.submitFeedback )
                            .append(
                                $( '<div>' )
                                    .attr( 'id', 'ar-rating' )
                                    .append(
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' ),
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' ),
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' ),
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' ),
                                        $( '<span>' )
                                            .addClass( 'star' )
                                            .text( '☆' )
                                    ),
                                $( '<div>' )
                                    .attr( 'id', 'ar-extras' )
                                    .append(
                                        $( '<textarea>' )
                                            .attr( {
                                                'id': 'ar-comment',
                                                'placeholder': 'Add any comments or suggestions here.',
                                                'maxlength': 2000
                                            } ),
                                        $( '<input>' )
                                            .attr( {
                                                'id': 'ar-submit',
                                                'type': 'submit'
                                            } )
                                            .val( 'Submit rating' )
                                    )
                            ),
                        $( '<div>' )
                            .attr( 'id', 'ar-info' )
                            .append(
                                'For issues with adverts, see ',
                                $( '<a>' )
                                    .attr( {
                                        href: mw.util.wikiGetlink( 'Elite Dangerous Wiki:Advertisements' ),
                                        title: 'Elite Dangerous Wiki:Advertisements'
                                    } )
                                    .text( 'here' ),
                                '.'
                            )
                    );

                if ( !!conf.wgUserName ) {
                    $( '#WikiaRecentActivity' ).after( $form );
                } else {
                    $( '#WikiaRail .module' ).first().before( $form );
                }

                $( '.star' ).on( 'click', function () {
                    var $this = $( this ),
                        $rating = $( '#ar-rating' );

                    // show textarea for further comment
                    // and submit button
                    $( '#ar-extras' ).show( 400 );

                    // increase margin-top on info div
                    // caused by something weird in the default module styling/structure
                    $( '#ar-info' ).css( 'margin-top', '40px' );

                    // select the star
                    $rating.children( '.star' ).removeClass( 'selected' );
                    $this.addClass( 'selected' );

                    // store the rating
                    // $.fn.data desn't update the DOM
                    $rating.attr( 'data-rating', $this.nextAll().length + 1 );
                } );
            },

            /**
             * 'Submits' the feedback to the page
             */
            submitFeedback: function () {
                
                    // default to -1 rating
                    // this can only ever happen of someone messes with browser dev tools
                var rating = $( '#ar-rating' ).attr( 'data-rating' ) || '-1',
                    // trim whitespace/newlines on the comments
                    comment = $( '#ar-comment' ).val().trim(),
                    // limit comment to 2k characters
                    // fix for non HTML5 browsers - IE8/9
                    comment2 = comment.length > 2000 ? comment.substring( 0, 2000 ) : comment,
                    toSubmit = JSON.stringify( {
                        rating: rating,
                        comment: comment2
                    } ),
                    api = new mw.Api(),
                    params = {
                        action: 'edit',
                        title: 'Elite Dangerous Wiki:Feedback/' + mw.util.wikiUrlencode( conf.wgPageName ),
                        text: toSubmit,
                        // token should be last
                        token: mw.user.tokens.get( 'editToken' )
                    };

                api
                    .post( params )
                    .done( function ( data ) {
                        mw.log( data )
                    } )
                    .always( function () {
                        $( '#ar-form' ).remove();
                        $( '#ar-header' ).after(
                            $( '<div>' )
                                .attr( 'id', 'ar-submitted' )
                                .text( 'Thanks for your feedback.' )
                        );
                        // do something else here, edit link?
                    } );

                return false;
            }
        };

    mw.loader.using( ['mediawiki.util', 'mediawiki.api'], function () {
        $( self.init );
    } );

}( this.jQuery, this.mediaWiki ) );