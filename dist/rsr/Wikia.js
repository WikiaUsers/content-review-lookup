/** <nowiki>
 * MediaWiki:Wikia.js - Loads for every user using the Oasis skin.
 *
 * For scripts that load in all skins, see [[MediaWiki:Common.js]].
 * For scripts that load in the monobook skin, see [[MediaWiki:Monobook.js]].
 *
 * Please test any changes made to this file.
 * Jshint <http://www.jshint.com> can catch syntax errors to help testing.
 */

/*jshint bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
         eqeqeq:true, es3:false, forin:true, immed:true, jquery:true,
         latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
         onevar:false, plusplus:true, quotmark:single, undef:true, unused:true,
         strict:true, trailing:true
*/

( function ( $, mw, rs ) {

    'use strict';

    var conf = mw.config.get( [
        'wgAction',
        'wgCanonicalSpecialPageName',
        'wgNamespaceNumber',
        'wgUserName'
    ] );

    var includes = {
        /**
         * Add contribs link to contribute button dropdown for anons.
         * Version for logged in users can be found at [[Mediawiki:Gadget-AddContribs.js]]
         * which is enabled by default.
         *
         * @author Ryan PM
         * @author Cqm
         */
        addContribs: {
            conditional: ( conf.wgAction === 'view' && !conf.wgUserName ),
            exec: function () {
                $( '.contribute ul li:first-child' )
                    .before(
                        $( '<li>' )
                            .attr( 'id', 'AnonContribs' )
                            .append(
                                $( '<a>' )
                                    .attr( 'href', '/wiki/Special:MyContributions' )
                                    .text( 'My contributions' )
                            )
                    );
            }
        },

        /**
         * Add extra links to the on wiki tab tab on wiki navigation.
         * Per <http://rs.wikia.com/?diff=4890582>
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
                        $( '<li>' )
                            .addClass( 'subnav-2-item' )
                            .append(
                                $( '<a>' )
                                    .addClass( 'subnav-2a' )
                                    .attr( 'href', mw.util.wikiGetlink( 'RuneScape:About' ) )
                                    .text( 'About us' )
                            ),
                        $( '<li>' )
                            .addClass( 'subnav-2-item' )
                            .append(
                                $( '<a>' )
                                    .addClass( 'subnav-2a' )
                                    .attr( 'href', mw.util.wikiGetlink( 'RuneScape:Policies' ) )
                                    .text( 'Policies' )
                            )
                    );
            }
        },

        /**
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
                        '∫':            'AWB',
                        'ɘ':            'AWB',
                        '-MattBot':     'AWB',
                        'Bot50':        'AWB',
                        'Cåmdroid':     'AWB',
                        'CookBot':      'AWB',
                        'Everybot':     'AWB',
                        'MuudyBot':     'AWB',
                        'RyanBot':      'AWB',
                        'ScuzzBot':     'AWB',

                        // bot
                        'AmauriceBot':  'BOT',
                        'AzBot':        'BOT',
                        'Cresbot':      'BOT',
                        'RSChatBot':    'BOT',
                        'TyBot':        'BOT',

                        // bureaucrat
                        'Azaz129':      'BUREAUCRAT',
                        'Calebchiam':   'BUREAUCRAT',
                        'Cqm':          'BUREAUCRAT',
                        'Dtm142':       'BUREAUCRAT',
                        'Eucarya':      'BUREAUCRAT',
                        'Hyenaste':     'BUREAUCRAT',
                        'Karlis':       'BUREAUCRAT',
                        'Laser Dragon': 'BUREAUCRAT',
                        'Merovingian':  'BUREAUCRAT',
                        'Oddlyoko':     'BUREAUCRAT',
                        'Sacre Fi':     'BUREAUCRAT',
                        'Skill':        'BUREAUCRAT',
                        'Vimescarrot':  'BUREAUCRAT',
                        'Whiplash':     'BUREAUCRAT'
                    },
                    $masthead;

                // fix for [[Special:Contibutions/username]]
                if ( conf.wgCanonicalSpecialPageName === 'Contributions' ) {
                    title = title.split( '/' )[1];
                }

                if ( rights[title] ) {
                    $masthead = $( '.UserProfileMasthead' );

                    // remove old rights
                    $masthead
                        .find( '.tag' )
                        .remove();

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
         * Rewrites pagetitle for profile masthead.
         *
         * Uses {{DISPLAYTITLE:title}} magic word on other pages which affects search engine results
         * whereas this version does not. As it's only for user pages, who cares?
         * 
         * Used by [[Template:Title]].
         *
         * @author Sikon (Wookieepeedia)
         * @author Cook Me Plox
         * @author Cblair91
         * @author Cqm
         */
        pageTitle: {
            conditional: (
                conf.wgAction === 'view' &&
                [2, 3].indexOf( conf.wgNamespaceNumber ) > -1
            ),
            exec: function () {
                var $title = $( '#title-meta' );

                if ( !$title.length ) {
                    return;
                }

                $( '.masthead-info > hgroup > h1' ).text( $title.text() );
            }
        },

        /**
         * Add dismiss function to sitenotice on [[Special:RecentChanges]].
         * Dimiss link is always found on [[MediaWiki:Recentchangestext]] to make
         * it easier to add the function as it is included in the area refreshed
         * by AjaxRC.
         *
         * Original author unknown
         *
         * @author Quarenon
         * @author Cqm
         */
        siteNoticeDismiss: {
            conditional: ( conf.wgCanonicalSpecialPageName === 'RecentChanges' ),
            exec: function () {
                // use the same cookie as monobook's sitenotice dismiss
                var cookie = $.cookie( 'dismissSiteNotice' );

                if ( cookie === ( '1.' + $( '#rcsitenotice-id' ).text() ) ) {
                    return;
                }

                // the sitenotice is within the area refreshed by AjaxRC
                // so add the css to the head as inline css will just be removed with each refresh
                mw.util.addCSS( '#rcSitenotice {display: block;}' );

                function dismiss() {
                    // dismiss link coded into [[MediaWiki:Recentchangestext]]
                    // to stop it disappearing with AjaxRC refreshes
                    $( '.rcsitenotice-dismiss-link' ).click( function () {
                        mw.util.addCSS( '#rcSitenotice{display:none;}' );
                        $.cookie( 'dismissSiteNotice', '1.' + $( '#rcsitenotice-id' ).text(), {
                            expires: 90,
                            path: '/'
                        } );
                    } );
                }

                dismiss();

                // add to ajaxCallAgain function array
                window.ajaxCallAgain = window.ajaxCallAgain || [];
                window.ajaxCallAgain.push( dismiss );
            }
        }
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
        rs.loaded = ( rs.loaded || [] ).concat( loaded );
    }

    $( init );

}( this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {} ) );