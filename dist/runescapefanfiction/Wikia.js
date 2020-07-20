/** <nowiki>
 * MediaWiki:Wikia.js.
 * Loads for every user using the Oasis skin.
 *
 * For scripts that load in all skins, see [[MediaWiki:Common.js]].
 * For scripts that load in the monobook skin, see [[MediaWiki:Monobook.js]].
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

    rswiki.oasis = {

        /**
         * For easy checking of what scripts are running
         * Each function adds a string of the function name to this array
         */
        scripts: [],

        /**
         * Invokes functions conditionally
         */
        init: function () {

            var config = mw.config.get( [
                'wgAction',
                'wgCanonicalSpecialPageName',
                'wgNamespaceNumber',
                'wgUserName',
                'wgVisualEditor'
            ] );

            if ( config.wgAction === 'view' ) {

                // add custom links to on the wiki tab
                rswiki.oasis.addTabLinks();

                if ( !config.wgUserName ) {
                    // add contribs link to contribute button for anons
                    rswiki.oasis.addContribs();
                }

                if ( [ 2, 3 ].indexOf( config.wgNamespaceNumber ) > -1 ) {
                    // add custom boxes to profile masthead
                    rswiki.oasis.mastheadBoxes();
                    // rewrite the page title on profile masthead
                    rswiki.oasis.pageTitle();
                }

                if ( $( '.topright-icon' ).length ) {
                    // move topright icons into pageheader
                    rswiki.oasis.topIcon();
                }

            }

            if ( config.wgCanonicalSpecialPageName === 'Recentchanges' ) {
                // add dismiss function to sitenotice on [[Special:RecentChanges]]
                rswiki.oasis.sitenoticeDismiss();
            }

        },

        /**
         * Add contribs link to contribute button dropdown for anons.
         * Version for logged in users can be found at [[Mediawiki:Gadget-AddContribs.js]]
         * which is enabled by default.
         *
         * @author Ryan PM
         * @author Cqm
         */
        addContribs: function () {

            // add function name to array
            rswiki.oasis.scripts[ rswiki.oasis.scripts.length ] = 'addcontribs';

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
         * Add extra links to the on wiki tab tab on wiki navigation.
         * Per <http://rs.wikia.com/?diff=4890582>
         *
         * @author Ryan PM
         * @author Suppa chuppa
         * @author Sactage
         * @author Cqm
         */
        addTabLinks: function () {

            // add function name to array
            rswiki.oasis.scripts[ rswiki.oasis.scripts.length ] = 'addtablinks';

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
                                    'href': '/wiki/RuneScape:General_disclaimer'
                                } )
                                .text( 'Disclaimer' )
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

            // add function name to array
            rswiki.oasis.scripts[ rswiki.oasis.scripts.length ] = 'mastheadboxes';

            var title = mw.config.get( 'wgTitle' ),
                rights = {
                    // awb
                    'Bot50':        'AWB',
                    'Cåmdroid':     'AWB',
                    'CookBot':      'AWB',
                    'ɘ':            'AWB',
                    'MuudyBot':     'AWB',

                    // bot
                    'A proofbot' :  'BOT',
                    'AmauriceBot':  'BOT',
                    'AzBot':        'BOT',
                    'Cblair91Bot':  'BOT',
                    'HairyBot':     'BOT',
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
            if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Contributions' ) {
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
                            .text( rights[title] )
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

            // add function name to array
            rswiki.oasis.scripts[ rswiki.oasis.scripts.length ] = 'pagetitle';

            var newTitle = $( '#title-meta' );

            if ( !newTitle.length ) {
                return;
            }

            $( '.masthead-info > hgroup > h1' ).text( newTitle.text() );

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
        sitenoticeDismiss: function () {

            // add function name to array
            rswiki.oasis.scripts[ rswiki.oasis.scripts.length ] = 'sitenoticedismiss';

            // use the same cookie as monobook's sitenotice dismiss
            var cookie = rswiki.reusable.getCookie( 'dismissSiteNotice' );

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
                    mw.util.addCSS( '#rcSitenotice {display: none;}' );
                    rswiki.reusable.setCookie( 'dismissSiteNotice', '1.' + $( '#rcsitenotice-id' ).text(), 90, '/' );
                } );
            }

            dismiss();

            // add to ajaxCallAgain function array
            window.ajaxCallAgain = window.ajaxCallAgain || [];
            window.ajaxCallAgain.push( dismiss );

        },

        /**
         * Moves topright icons to be inserted into Wikia pageheader
         * Requires additional CSS in [[MediaWiki:Wikia.css]]
         *
         * @author The 888th Avatar (Avatar Wiki)
         * @author Cqm
         *
         * @todo Add a fadeIn animation to make loading look smoother
         */
        topIcon: function () {

            // add function name to array
            rswiki.oasis.scripts[ rswiki.oasis.scripts.length ] = 'topicon';

            // insert container into pageheader
            $( '#WikiaPageHeader' ).append( $( '<div>' ).attr( 'id', 'rs-header-icons' ) );

            $( '.topright-icon' ).each( function () {
                $( '#rs-header-icons' ).append( $( this ).html() );
            } );
        }

    };

    $( rswiki.oasis.init );

}( this, this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {} ) );

/* </pre> */