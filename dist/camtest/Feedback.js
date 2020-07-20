/** <nowiki>
 * Javascript Feedback modal
 *
 * @author Cqm
 * @notes Experimental, use at your own risk
 */

;( function ( window, document, $, mw, rswiki ) {

    'use strict';

    rswiki.feedback = {
        /**
         *
         */
        init: function () {

            // don't load twice
            if ( rswiki.feedback.loaded ) {
                return;
            }

            rswiki.feedback.loaded = true;

            var config = mw.config.get( [
                    'skin',
                    'wgAction',
                    'wgNamespaceNumber'
                ] ),
                link = function () {
                    return $( '<span>' )
                        .attr( 'id', 'rs-feedback-span' )
                        .append(
                            $( '<a>' )
                                .attr( 'id', 'rs-feedback-link' )
                                .text( 'Feedback' )
                                .on( 'click', rswiki.feedback.loadModal )
                        );
                };

            // check for mainspace
            if ( config.wgNamespaceNumber !== 0 ) {
                return;
            }

            // check user is viewing the page
            // not editing or something
            if ( config.wgAction !== 'view' ) {
                return;
            }

            // check article exists
            if ( $( '.noarticletext' ).length ) {
                return;
            }

/*
            // commented out until we find somewhere good for it to live
            // add link for feedback modal
            if ( config.skin === 'oasis' ) {
                $( '#foo' ).html( link() );
            } else if ( config.skin === 'monobook' ) {
                $( '#foo' ).html( link() );
            }
*/

            // @todo load this in common.js importArticles styles array
            importStylesheet( 'MediaWiki:Feedback.css' );

            $( '#mw-content-text' ).after( link() );

        },

        /**
         * 
         */
        loadModal: function () {

            var $overlay = $( '#rs-feedback-overlay' );

            if ( $overlay.length ) {
                $overlay.show();
            } else {
                $( 'body' ).append(
                    $( '<div>' )
                        .attr( 'id', 'rs-feedback-overlay' )
                        .on( 'click', rswiki.feedback.hideModal )
                        .append(
                            $( '<div>' )
                                .attr( 'id', 'rs-feedback-modal' )
                                // stop event bubbling
                                .on( 'click', function ( e ) {
                                    e.stopPropagation();
                                } )
                                .append(
                                    $( '<div>' )
                                        .attr( 'id', 'rs-feedback-modal-header' )
                                        .append(
                                            $( '<span>' )
                                                .attr( 'id', 'rs-feedback-modal-title' )
                                                .text( 'Header' ),
                                            $( '<span>' )
                                                .attr( 'id', 'rs-feedback-modal-close' )
                                                .on( 'click', rswiki.feedback.hideModal )
                                        ),

                                    $( '<div>' )
                                        .attr( 'id', 'rs-feedback-modal-rating' )
                                        .append(
                                            $( '<span>' )
                                                .attr( 'id', 'rs-feedback-modal-rating-label' )
                                                .text( 'Rate this page:' ),
                                            $( '<span>' )
                                                .attr( 'id', 'rs-feedback-modal-rating-wrapper' )
                                                .append(
                                                    // @todo preload hover image
                                                    $( '<span>' )
                                                        .attr( {
                                                            'id': 'rs-feedback-modal-rating-star-1',
                                                            'class': 'rs-rating-star',
                                                        } ),

                                                    $( '<span>' )
                                                        .attr( {
                                                            'id': 'rs-feedback-modal-rating-star-2',
                                                            'class': 'rs-rating-star',
                                                        } ),

                                                    $( '<span>' )
                                                        .attr( {
                                                            'id': 'rs-feedback-modal-rating-star-3',
                                                            'class': 'rs-rating-star',
                                                        } ),

                                                    $( '<span>' )
                                                        .attr( {
                                                            'id': 'rs-feedback-modal-rating-star-4',
                                                            'class': 'rs-rating-star',
                                                        } ),

                                                    $( '<span>' )
                                                        .attr( {
                                                            'id': 'rs-feedback-modal-rating-star-5',
                                                            'class': 'rs-rating-star',
                                                        } )
                                                )
                                        ),

                                    $( '<div>' )
                                        .attr( 'id', 'rs-feedback-modal-comment' )
                                        .append(
                                            $( '<textarea>' )
                                                .attr( {
                                                    'id': 'rs-feedback-modal-comment-input'
                                                } )
                                        )
                                )
                        )
                );

                $( '.rs-rating-star' ).on( 'mouseenter', function () {
                    // select number of id
                    var num = $( this ).attr( 'id' ).split( '-' );
                    num = window.parseInt( num[ num.length - 1 ], 10 );

                    $( '.rs-rating-star' ).each( function ( i ) {
                        if ( ( i + 1 ) <= num ) {
                            $( this ).addClass( 'hover' );
                        } else {
                            $( this ).addClass( 'not-hover' );
                        }
                    } );
                } )
                .on( 'mouseleave', function () {
                    $( '.rs-rating-star' )
                        .removeClass( 'hover' )
                        .removeClass( 'not-hover' );
                } )
                .on( 'click', function () {
                    // select number of id
                    var num = $( this ).attr( 'id' ).split( '-' );
                    num = window.parseInt( num[ num.length - 1 ], 10 );

                    $( '.rs-rating-star' ).each( function ( i ) {
                        if ( ( i + 1 ) <= num ) {
                            $( this ).addClass( 'selected' );
                        } else {
                            $( this ).removeClass( 'selected' );
                        }
                    } );
                } );
            }

        },

        /**
         *
         */
        hideModal: function () {
            $( '#rs-feedback-overlay' ).hide();
        }

    };

    $( rswiki.feedback.init );


}( this, this.document, this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {} ) );