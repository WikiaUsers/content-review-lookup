/* This JavaScript file is meant for the Wikia-skin only. To see the other skin, see MediaWiki:Monobook.js. For use in global use see MediaWiki:Common.js.*/

(function ($, mw, ed) {
    'use strict';
 
    var conf = mw.config.get( [
        'wgAction',
        'wgCanonicalSpecialPageName',
        'wgNamespaceNumber',
        'wgUserName'
    ] );
    var includes = { 
        /**
         * Taken from RuneScape Wiki.
         * 
         * Add extra links to the on wiki tab tab on wiki navigation.
         *
         * @author Ryan PM
         * @author Suppa chuppa
         * @author Sactage
         * @author Cqm
         */
        addTabLinks: {
            conditional: ( conf.wgAction === 'view' ),
            exec: function () {
                $( '.WikiHeader nav ul li.marked ul' )
                    .append(
                        /*$( '<li>' )
                            .addClass( 'subnav-2-item' )
                            .append(
                                $( '<a>' )
                                    .addClass( 'subnav-2a' )
                                    .attr( 'href', mw.util.wikiGetlink( 'Elite Dangerous:About' ) )
                                    .text( 'About us' )
                            ),*/
                        $( '<li>' )
                            .addClass( 'subnav-2-item' )
                            .append(
                                $( '<a>' )
                                    .addClass( 'subnav-2a' )
                                    .attr( 'href', mw.util.wikiGetlink( 'Elite Dangerous Wiki:Policies' ) )
                                    .text( 'Policies' )
                            )
                    );
            }
        },
         /**
         * Taken from RuneScape Wiki.
         * 
         * Add custom masthead boxes to profile masthead
         *
         * @author Rappy 4187 (Aion Wiki)
         * @author Amaurice
         * @author Cqm
         */
        mastheadBoxes: {
            conditional: (
                (
                    conf.wgAction === 'view' &&
                    [2, 3].indexOf( conf.wgNamespaceNumber ) > -1
                ) ||
                conf.wgCanonicalSpecialPageName === 'Contributions'
            ),
            exec: function () {
                var title = mw.config.get( 'wgTitle' ),
                    rights = {
                        // awb
 
                        // bot
                        'Kyouko Bot':  'BOT',
 
                        // bureaucrat
                        
                        // Frontier staff
                        'BrettC Frontier':  'FRONTIER'
                    },
                    $masthead;
 
                // fix for [[Special:Contibutions/username]]
                if ( conf.wgCanonicalSpecialPageName === 'Contributions' ) {
                    title = title.split( '/' )[1];
                }
 
                if ( rights[title] ) {
                    $masthead = $( '.UserProfileMasthead' );
 
                    // remove old rights if not from Frontier
                    if(rights[ title ] !== 'FRONTIER'){
                        $masthead
                            .find( '.tag' )
                            .remove();
                    }
                    // add new rights
                    $masthead
                        .find( 'hgroup' )
                        .append(
                            $( '<span>' )
                                .addClass( 'tag' )
                                .text( rights[ title ] )
                        );
                }
            }
        },
        
        /**
         * Ratings sidebar module (oasis)
         */
        /**ratings: {
            conditional: (
                conf.wgAction === 'view' &&
                conf.wgNamespaceNumber === 0
            ),
            scripts: 'MediaWiki:Wikia.js/ratings.js'
        },*/
    };
 
    var loaded = [];
 
    // stripped down version of [[MediaWiki:Common.js]] loader
    // this is only designed to have functions in each include
    // imports should be done in [[MediaWiki:Common.js]] to cut down on http requests
    function init() {
        $.each( includes, function ( k, v ) {
            var check = $.isFunction( v.conditional ) ? v.conditional() : v.conditional;
 
            if ( check ) {
                // used for tracking which includes are loading
                loaded.push( 'oasis.' + k );
 
                if ( v.exec ) {
                    v.exec();
                }
            }
        } );
 
        // this should always be defined
        // but just in case ResourceLoader develops a quirk
        ed.loaded = ( ed.loaded || [] ).concat( loaded );
    }
 
    $( init );
 
}( this.jQuery, this.mediaWiki, this.edwiki = this.edwiki || {} ) );