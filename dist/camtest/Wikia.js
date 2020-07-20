/** <nowiki>
 * MediaWiki:Wikia.js - Loads for every user using the Oasis skin.
 *
 * For scripts that load in all skins, see [[MediaWiki:Common.js]].
 * For scripts that load in the monobook skin, see [[MediaWiki:Monobook.js]].
 *
 * To check what scripts are loading on a page, pass rswiki.scripts to
 * your javascript console. Items prefixed with 'oasis:' are from this page.
 */

/*jshint
    bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
    eqeqeq:true, es3:false, forin:true, immed:true, indent:4,
    jquery:true, latedef:true, newcap:true, noarg:true, noempty:true,
    nonew:true, onevar:true, plusplus:true, quotmark:single, undef:true,
    unused:true, strict:true, trailing:true
*/

( function ( window, $, mw, rswiki ) {

    'use strict';

    $.extend( rswiki, ( function () {
    
        var config = mw.config.get( [
                'wgAction',
                'wgCanonicalSpecialPageName',
                'wgNamespaceNumber',
                'wgTitle',
                'wgUserName'
            ] ),

            /**
             *
             *
             * @returns {array}
             */
            global = {
                oasisInit: function () {
                    
                    var scripts = [];

                    if ( config.wgAction === 'view' ) {

                        // add custom links to on the wiki tab
                        scripts.push( 'oasis:addtablinks' );
                        local.addTabLinks();

                        if ( !config.wgUserName ) {
                            // add contribs link to contribute button for anons
                            scripts.push( 'oasis:addcontribs' );
                            local.addContribs();
                        }

                        if ( [ 2, 3 ].indexOf( config.wgNamespaceNumber ) > -1 ) {
                            // add custom boxes to profile masthead
                            scripts.push( 'oasis:mastheadboxes' );
                            local.mastheadBoxes();

                            // rewrite the page title on profile masthead
                            scripts.push( 'oasis:pagetitle' );
                            local.pageTitle();
                        }

                        if ( config.wgCanonicalSpecialPageName === 'Contributions' ) {
                            // run mastheadBoxes on Special:Contributions
                            scripts.push( 'oasis:mastheadboxes' );
                            local.mastheadBoxes();
                        }

                        if ( config.wgCanonicalSpecialPageName === 'Recentchanges' ) {
                            // add dismiss function to sitenotice on [[Special:RecentChanges]]
                            scripts.push( 'oasis:sitenoticedismiss' );
                            local.sitenoticeDismiss();
                        }
                        
                        if ( $( '.foo' ).length ) {
                            // insert custom sidebar module
                            scripts.push( 'oasis:addrswwguidemodule' );
                            local.addRSWGuideModule();
                        }

                    }
                    
                    return scripts;

                },
            },
            
            /**
             *
             */
            local = {
                /**
                 * Add contribs link to contribute button dropdown for anons.
                 * Version for logged in users can be found at [[Mediawiki:Gadget-AddContribs.js]]
                 * which is enabled by default.
                 *
                 * @author Ryan PM
                 * @author Cqm
                 */
                addContribs: function () {

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

                },

                /**
                 * Adds a module to the Oasis sidebar
                 *
                 * @author Ryan PM
                 * @author Cook Me Plox
                 */
                addRSWGuideModule: function () {

                    if ( $( '.LatestPhotosModule' ).length ) {

                        $( '<section>' )
                            .attr( 'class', 'RSWGuide module' )
                            .append(
                                $( '<h1>' )
                                    .css( {
                                        'margin-top': '0px',
                                        'margin-bottom': '10px'
                                    } )
 
                                    // head text for module
                                    .text( 'Calculator Ideas' )
                            )
                            .append(
                                $( '<div>' )
                                    .append(
                                        $( '<p>' )
                                            .append(
                                                $( '<a>' )
                                                    .attr( 'href', '/wiki/RuneScape:Calculator ideas' )
                                                    .text( 'Have an idea for a new RuneScape calculator? Tell us about it here' ),
                                                '.'
                                            )
                                    )
                            )
                            .insertBefore( '.LatestPhotosModule' );

                    } else {
                        setTimeout( rswiki.oasis.addRSWGuideModule, 500 );
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
                addTabLinks: function () {

                    $( '.WikiHeader nav ul li.marked ul' )
                        .append(
                            $( '<li>' )
                                .attr( 'class', 'subnav-2-item' )
                                .append(
                                    $( '<a>' )
                                        .attr( {
                                            'class': 'subnav-2a',
                                            'href': '/wiki/RuneScape:About'
                                        } )
                                        .text( 'About us' )
                                ),

                            $( '<li>' )
                                .attr( 'class', 'subnav-2-item' )
                                .append(
                                    $( '<a>' )
                                        .attr( {
                                            'class': 'subnav-2a',
                                            'href': '/wiki/RuneScape:Policies'
                                        } )
                                        .text( 'Policies' )
                                )
                        );

                },

                /**
                 * Add custom masthead boxes to profile masthead
                 *
                 * @author Rappy 4187 (Aion Wiki)
                 * @author Amaurice
                 * @author Cqm
                 */
                mastheadBoxes: function () {

                    var title = config.wgTitle,
                        rights = {
                            // awb
                            'Bot50':        'AWB',
                            'Cåmdroid':     'AWB',
                            'CookBot':      'AWB',
                            'ɘ':            'AWB',
                            'MuudyBot':     'AWB',

                            // bot
                            'AmauriceBot':  'BOT',
                            'AzBot':        'BOT',
                            'Cblair91Bot':  'BOT',
                            'RSChatBot':    'BOT',
                            'TyBot':        'BOT',

                            // bureaucrat
                            'Azaz129':      'BUREAUCRAT',
                            'Calebchiam':   'BUREAUCRAT',
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
                        };

                    // fix for [[Special:Contibutions/username]]
                    if ( config.wgCanonicalSpecialPageName === 'Contributions' ) {
                        title = title.split( '/' )[1];
                    }

                    if ( rights[title] ) {
                        // remove old rights
                        $( '.UserProfileMasthead .masthead-info .tag' ).remove();

                        // add new rights
                        $( '.masthead-info hgroup' )
                            .append(
                                $( '<span>' )
                                    .attr( 'class', 'tag' )
                                    .text( rights[ title ] )
                            );
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
                pageTitle: function () {

                    var $title = $( '#title-meta' );

                    if ( !$title.length ) {
                        return;
                    }

                    $( '.masthead-info > hgroup > h1' ).text( $title.text() );

                },

                /**
                 * Add dismiss function to sitenotice on [[Special:RecentChanges]].
                 * Dismiss link is always found on [[MediaWiki:Recentchangestext]] to make
                 * it easier to add the function as it is included in the area refreshed
                 * by AjaxRC.
                 *
                 * Original author unknown
                 *
                 * @author Quarenon
                 * @author Cqm
                 */
                sitenoticeDismiss: function () {

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
            };

            /*
            // set this externally somehow?
            if ( debugMode ) {
                $.extend( global, local );
            }
            */
    
        return global;
    
    }() ) );
    
    var scripts = rswiki.scripts || [],
        // @todo set this externally somehow
        debugMode = false,
        oasisScripts;

    if ( !debugMode ) {
        oasisScripts = $( rswiki.oasisInit );
        rswiki.scripts = scripts.concat( oasisScripts );
    }
    
}( this, this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {} ) );

/* </pre> */