/** <nowiki>
 * MediaWiki:Common.js
 *
 * JavaScript here will load on both skins for every user
 *
 * For JavaScript for the Oasis skin see [[MediaWiki:Wikia.js]]
 * For JavaScript for the Monobook skin see [[MediaWiki:Monobook.js]]
 *
 * For mw.loader docs see <https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.loader>
 * jshint <http://jshint.com/>
 */

/*jshint
    bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
    eqeqeq:true, es3:false, forin:true, immed:true, indent:4,
    jquery:true, latedef:true, newcap:true, noarg:true, noempty:true,
    nonew:true, onevar:true, plusplus:true, quotmark:single, undef:true,
    unused:true, strict:true, trailing:true
*/

/*global
    importArticles:true, mediaWiki:true, rswiki:true
 */

// create global rswiki object if not already created
this.rswiki = this.rswiki || {};

( function ( window, document, $, mw, importArticles, rswiki ) {

    'use strict';

    /**
     * Reusable functions
     */
    rswiki.reusable = {

        /**
         * Sets the cookie
         *
         * @param c_name {string} Name of the cookie
         * @param value {string} Data to store in the cookie
         * @param expiredays {integer} Expiry time of the cookie in days
         * @param path {string} URL path the cookie will apply to, excluding domain name
         *                      Defaults to '/' (all pages on the wiki)
         */
        setCookie: function ( name, value, expiredays, path ) {

            var options = {};

            if ( expiredays ) {
                options.expires = expiredays;
            }

            if ( path ) {
                options.path = path;
            } else {
                options.path = '/';
            }

            $.cookie( name, value, options );

        },

        /**
         * Retrieves a cookie
         *
         * @param name {string} Cookie name
         * @return The data stored in the cookie or empty string if the cookie does not exist
         */
        getCookie: function ( name ) {

            var cookie = $.cookie( name );

            if ( cookie === null ) {
                cookie = '';
            }

            return cookie;

        },

        /**
         * Calls wiki API and returns the response in the callback
         *
         * @param data {object} Object list of parameters to send along with the request
         *                      {'format':'json'} is set automatically.
         * @param method {string} Either POST or GET.
         * @param callback {function} Function to run when request is complete
         * @param addurl {string} (optional) Anything you may want to add to the request url
         */
        callAPI: function ( data, method, callback, addurl ) {

            data.format = 'json';

            $.ajax( {
                data: data,
                dataType: 'json',
                url: '/api.php' + ( addurl || '' ),
                type: method,
                cache: false,
                success: function ( response ) {
                    if ( response.error ) {
                        mw.log( 'API error: ' + response.error.info );
                    } else {
                        callback( response );
                    }
                },
                error: function ( xhr, error ) {
                    mw.log( 'AJAX response: ' + xhr.responseText );
                    mw.log( 'AJAX error: ' + error );
                }
            } );

        },

        /**
         * Adds commas to numbers
         *
         * @source <http://www.mredkj.com/javascript/numberFormat.html#addcommas>
         * @param nStr {string|number} Number to be altered
         * @return Number string with commas
         * @example 2345367 -> '2,345,367'
         * @example '200675' -> '200,675'
         */
        addCommas: function ( nStr ) {

            nStr += '';

            var x = nStr.split( '.' ),
                x1 = x[0],
                x2 = x.length > 1 ? '.' + x[1] : '',
                rgx = /(\d+)(\d{3})/;

            while ( rgx.test( x1 ) ) {
                x1 = x1.replace( rgx, '$1' + ',' + '$2' );
            }

            return x1 + x2;

        }

    };

    /**
     * Expose reusable functions to global scope for backwards compatibility
     */
    window.setCookie = rswiki.reusable.setCookie;
    window.getCookie = rswiki.reusable.getCookie;
    window.callAPI = rswiki.reusable.callAPI;
    window.addCommas = rswiki.reusable.addCommas;

    rswiki.common = {

        /**
         * Loads functions conditionally
         */
        init: function () {

            var config = mw.config.get( [
                'wgAction',
                'wgNamespaceNumber',
                'wgUserName'
            ] );

            rswiki.common.imports();
            rswiki.common.addTalkheader();

            switch ( config.wgAction ) {
            case 'view':

                if ( config.wgUserName ) {
                    rswiki.common.insertUsername();
                    if ( config.wgNamespaceNumber === 2 ) {
                        rswiki.common.skinRedirect();
                    }
                } else {
                    rswiki.common.anonExchange();
                }

                if ( config.wgNamespaceNumber === 0 && $( '.navbox' ).length ) {
                    rswiki.common.navbox();
                }

                break;
            case 'edit':
            case 'submit':

                rswiki.common.customEditButtons();

                $( '#wpSave' ).click( function ( event ) {
                    rswiki.common.tagSwitch();
                    if ( mw.config.get( 'wgNamespaceNumber' ) % 2 === 1 || mw.config.get( 'wgNamespaceNumber' ) === 110 ) {
                        rswiki.common.sigReminder( event );
                    }
                } );

                break;
            }

            if ( $( '.sortable' ).length ) {
                mw.loader.using( 'jquery.tablesorter', rswiki.common.autosort );
            }

        },

        /**
         * Imports
         *
         * Scripts marked with (gadget) will eventually be moved to default gadgets
         */
        imports: function () {

            /**
             * Setup variables for imports
             */
            // Pages to run AJAX refresh script on
            window.ajaxPages = [
                // special pages
                'Special:AbuseLog',
                'Special:Contributions',
                'Special:ListFiles',
                'Special:Log',
                'Special:Log/move',
                'Special:NewFiles',
                'Special:NewPages',
                'Special:RecentChanges',
                'Special:Statistics',
                'Special:Watchlist',
                // category pages
                'Category:Speedy_deletion_candidates',
                'Category:Speedy_move_candidates',
                // other
                'Forum:Yew_Grove',
                'RuneScape:Active_discussions',
            ];

            // Text to display next to checkbox that enables/disables AJAX refresh script
            window.AjaxRCRefreshText = 'Auto-refresh';

                // for ge update scripts
            var manualExchange = [],
                // for importArticles
                scripts = [],
                styles = [],
                config = mw.config.get( [
                    'wgAction',
                    'wgCanonicalSpecialPageName',
                    'wgNamespaceNumber',
                    'wgPageName',
                    'wgUserGroups'
                ] );

            /**
             * Add imports to an array
             */

            // scripts to be loaded on (nearly) every pageview
            scripts.push(
                // Konami code
                'MediaWiki:Common.js/Konami.js'
            );

            switch ( config.wgAction ) {
            case 'view':

                switch ( config.wgPageName ) {
                case 'RuneScape:Off-site/IRC':
                    // Embed IRC
                    scripts.push( 'MediaWiki:Common.js/embedirc.js' );
                    break;
                case 'RuneScape:RC_Patrol':
                    // Check old page revisions for vandalism
                    scripts.push( 'User:Suppa_chuppa/rcpatrol.js' );
                    styles.push( 'User:Suppa_chuppa/rcp.css' );
                    break;
                case 'MediaWiki:Namespace_numbers':
                    // Lists namespace number for easy reference
                    scripts.push( 'MediaWiki:Common.js/namespaceNumbersList.js' );
                    break;
                case 'RuneScape:Counter-Vandalism_Unit':
                    // Form for reporting users on [[RS:CVU]]
                    scripts.push( 'User:Suppa_chuppa/cvu.js' );
                    break;
                case 'Distractions_and_Diversions_Locations':
                case 'Distractions_and_Diversions_Locations/Penguin_Hide_and_Seek':
                    // Peng hunting highlight table
                    scripts.push( 'MediaWiki:Common.js/pengLocations.js' );
                    break;
                }

                if ( config.wgCanonicalSpecialPageName === 'Whatlinkshere' ) {
                    // Add edit links to [[Special:WhatLinksHere]] (gadget)
                    scripts.push( 'MediaWiki:Common.js/WLH_edit.js' );
                }

                // @todo merge gemw update scripts into one
                if ( manualExchange.indexOf( config.wgPageName ) > -1 ) {
                    // Add custom price input for exchange pages
                    scripts.push( 'User:Quarenon/gemwupdate.js' );
                } else if ( config.wgNamespaceNumber === 112 &&
                    config.wgUserGroups.indexOf( 'autoconfirmed' ) > -1 ) {
                    // Semi-automated price updates for exchange pages
                    scripts.push( 'MediaWiki:Common.js/gemwupdate.js' );
                    // enable when GED stops working
                    // scripts.push( 'User:Quarenon/gemwupdate.js' );
                }

                if ( window.ajaxPages.indexOf( config.wgPageName ) > -1 ) {
                    // Ajax refresh for various pages
                    scripts.push( 'u:dev:AjaxRC/code.js' );
                }

                switch ( config.wgNamespaceNumber ) {
                case 100:
                    // Notice when editing update pages
                    scripts.push( 'MediaWiki:Common.js/updateintro.js' );
                    break;
                case 112:
                    if ( config.wgPageName.split( '/' )[1] === 'Data') {
                        // Notice when editing Exchange /Data subpages
                        scripts.push('MediaWiki:Common.js/exchangeintro.js');
                    }
                    break;
                }

                // tried using switch statement here
                // didn't work properly and produced unexpected results
                if ( $( '.countdown' ).length ) {
                    // Countdown timer
                    scripts.push( 'MediaWiki:Common.js/countdowntimer.js' );
                }

                if ( $( '.youtube' ).length ) {
                    // Youtube embedding
                    scripts.push( 'MediaWiki:Common.js/youtube.js' );
                }

                if ( $( '.embedMe' ).length ) {
                    // Embed audio
                    scripts.push( 'MediaWiki:Common.js/embedding.js' );
                }

                if ( $( '.lighttable' ).length ) {
                    // Highlight tables
                    scripts.push( 'MediaWiki:Common.js/highlightTable.js' );
                }

                if ( $( '.jcInput' ).length || $( '[class*="jcPane"]' ).length ) {
                    // Calculators
                    scripts.push( 'User:Stewbasic/calc.js' );
                }

                if ( $( '.GEdatachart').length ) {
                    if ( !mw.loader.getState( 'highcharts' ) ) {
                        mw.loader.implement( 'highcharts', ['http://code.highcharts.com/stock/highstock.js'], {}, {} );
                    }

                    mw.loader.using( 'highcharts', function () {
                        // @todo add dependency to script so we can add it to importArticles()
                        // without having to wonder if it's loaded in time
                        // GE Charts
                        window.importScript( 'MediaWiki:Common.js/GECharts.js' );
                    } );
                }

                if ( $( '.cioCompareLink' ).length ) {
                    // Item Compare Overlays
                    scripts.push( 'MediaWiki:Common.js/compare.js' );
                    styles.push( 'MediaWiki:Common.css/compare.css' );
                }

                if ( $( '.jcConfig' ).length ) {
                    // Dynamic Templates
                    scripts.push( 'MediaWiki:Common.js/calc.js' );
                    styles.push( 'MediaWiki:Common.css/calc.css' );
                }

                if ( $( '.specialMaintenance' ).length ||
                    config.wgCanonicalSpecialPageName === 'Specialpages' ) {
                    // Special page report on [[RS:MAINTENANCE]] and [[Special:SpecialPages]]
                    scripts.push( 'MediaWiki:Common.js/spreport.js' );
                }
 
                if ( ( $( '#charmguide' ).length && mw.config.get( 'wgPageName' ).match( '/Charm_log' ) ) ||
                    ( $( '.charmtable' ).length && !mw.config.get( 'wgPageName' ).match( '/Charm_log' ) ) ) {
                    // Add to charm logs
                    scripts.push( 'User:Joeytje50/Dropadd.js' );
                }

                if ( $( '.switch-infobox' ).length ) {
                    // Switch infobox
                    scripts.push( 'User:Matthew2602/SwitchInfobox.js' );
                }

                if ( $( '#XPEach' ).length || $( '#GEPrice' ).length || $( '#killXP' ).length ) {
                    // Adds calcs to infoboxes
                    scripts.push( 'User:Joeytje50/monstercalc.js' );
                }

                if ( $( '.mw-collapsible' ).length ) {
                    // removes fade animation on collapsible tables
                    scripts.push( 'MediaWiki:Common.js/instantCollapsible.js' );
                }

                if ( $( '#wb-timer' ).length ) {
                    // adds warbands timer
                    scripts.push( 'MediaWiki:Common.js/warbandstimer.js' );
                }

                break;

            /**
             * Load scripts on preview per request
             * @link <http://rs.wikia.com/?diff=9126949>
             *
             * Will only work on Monobook previews because Oasis previews load in a popup
             * whilst still using wgAction === 'edit'
             * Oasis only seems to have wgAction === 'submit' on abusefilter/vstf filter blocks
             *
             * @todo Check if jquery.collapsible loads, import instantCollapsible if yes
             */
            case 'submit':
                if ( config.wgPageName === 'Distractions_and_Diversions_Locations' ||
                    config.wgPageName === 'Distractions_and_Diversions_Locations/Penguin_Hide_and_Seek' ) {
                    // Peng hunting highlight table
                    scripts.push( 'MediaWiki:Common.js/pengLocations.js' );
                }

                if ( $( '.youtube' ).length ) {
                    // Youtube embedding
                    scripts.push( 'MediaWiki:Common.js/youtube.js' );
                }

                if ( $( '.embedMe' ).length ) {
                    // Embed audio
                    scripts.push( 'MediaWiki:Common.js/embedding.js' );
                }

                if ( $( '.lighttable' ).length ) {
                    // Highlight tables
                    scripts.push( 'MediaWiki:Common.js/highlightTable.js' );
                }

                if ( $( '.jcInput' ).length || $( '[class*="jcPane"]' ).length ) {
                    // Calculators
                    scripts.push( 'User:Stewbasic/calc.js' );
                }

                if ( $( '.GEdatachart').length ) {
                    if ( !mw.loader.getState( 'highcharts' ) ) {
                        mw.loader.implement( 'highcharts', ['http://code.highcharts.com/stock/highstock.js'], {}, {} );
                    }

                    mw.loader.using( 'highcharts', function () {
                        // @todo add dependency to script so we can add it to importArticles()
                        // without having to wonder if it's loaded in time
                        // GE Charts
                        window.importScript( 'MediaWiki:Common.js/GECharts.js' );
                    } );
                }

                if ( $( '.cioCompareLink' ).length ) {
                    // Item Compare Overlays
                    scripts.push( 'MediaWiki:Common.js/compare.js' );
                    styles.push( 'MediaWiki:Common.css/compare.css' );
                }

                if ( $( '.jcConfig' ).length ) {
                    // Dynamic Templates
                    scripts.push( 'MediaWiki:Common.js/calc.js' );
                    styles.push( 'MediaWiki:Common.css/calc.css' );
                }

                if ( $( '.switch-infobox' ).length ) {
                    // Switch infobox
                    scripts.push( 'User:Matthew2602/SwitchInfobox.js' );
                }

                if ( $( '#XPEach' ).length || $( '#GEPrice' ).length || $( '#killXP' ).length ) {
                    // Adds calcs to infoboxes
                    scripts.push( 'User:Joeytje50/monstercalc.js' );
                }

                break;

            }

            mw.log(
                scripts,
                styles
            );

            /**
             * Import scripts using importArticles()
             * importArticles source: <https://github.com/Wikia/app/blob/dev/resources/wikia/wikia.wikibits.js>
             */
            importArticles( {
                type: 'script',
                articles: scripts
            }, {
                type: 'style',
                articles: styles
            } );

        },

        /**
         * Add {{TalkHeader}} to new talk pages when editing.
         * Per [[RS:AR]] request.
         *
         * This will not work when using the fast access keys
         * @example Alt-Shitft-+ for add new section
         *
         * Preload can be removed before saving the page.
         *
         * However, this will have to do until we figure out how to make multiple scripts
         * run on clicking the save edit button.
         *
         * @comment index param on .attr() function is required to access attr param
         * @todo Do this with a bot (far more reliable)
         *
         * @author Cqm
         */
        addTalkheader: function () {

            var params = '&preload=Template:Talkheader/preload';

            // for redlinks
            // make sure this is only selecting anchor tags
            // otherwise this selects li tags used for monobook discussion tab
            // why would you even give <li> that class....
            $( 'a.new' ).attr( 'href', function ( index, attr ) {

                if ( attr.indexOf( 'Talk:' ) > -1 || attr.indexOf( '_talk' ) > -1 ) {

                    // user talk doesn't get the template
                    if ( attr.indexOf( 'User_talk:' ) > -1 ) {
                        return;
                    }

                    return attr + params;

                }

            } );
    
            // for talk pages
            if ( mw.config.get( 'wgNamespaceNumber' ) % 2 === 1 &&
                mw.config.get( 'wgNamespaceNumber' ) !== 3 &&
                    $( '#noarticletext' ).length ) {

                // oasis support
                if ( mw.config.get( 'skin' ) === 'oasis' ) {
                    $( '#ca-addsection' ).attr( 'href', function ( index, attr ) {
                        return attr + params;
                    } );

                // monobook support
                } else {
                    // create page and new section tabs
                    $( '#ca-edit a, #ca-addsection a' ).attr( 'href', function ( index, attr ) {
                        return attr + params;
                    } );
                }
            }

        },

        /**
         * Hide semi automatic exchange update button for anons
         */
        anonExchange: function () {
            $( '.anonmessage' ).css( { 'display': 'inline' } );
        },

        /**
         * Autosort sortable tables
         *
         * jquery.tablesorter is a default plugin, but this needs a dependency via lazy loading
         *
         * To use autosort add "autosort=n,d" to the table class, where n is the
         * column to sort and d is the direction to sort
         *
         * @example class="wikitable sortable autosort=3,a"
         * This sorts column 3 ascending
         * @example class="prettytable sortable autosort=1,d"
         * This sorts column 1 descending
         * For more examples see <http://rs.wikia.com/User:Tyilo/Autosort_Test>
         *
         * @author Tyilo
         * @author Cqm
         */
        autosort: function () {

            $( 'table.sortable[class*="autosort="]' ).each( function ( index ) {

                var $this = $( this ),
                    matched = /(?:^| )autosort=([0-9]+),(a|d)(?: |$)/.exec( $this.attr( 'class' ) ),
                    $sortCol = $( $( 'table.sortable[class*="autosort="] thead tr th:nth-child(' + matched[1] + ')' )[index] );

                if ( matched[2] === 'd' ) {
                    // descending
                    $sortCol.click().click();
                } else {
                    // ascending
                    $sortCol.click();
                }

            } );

        },

        /**
         * Add buttons to the edit toolbar
         *
         * Currently this uses a function multiple times
         * @example mw.toolbar.addButton( imageFile, speedTip, tagOpen, tagClose, sampleText, imageId, selectText );
         *
         * MediaWiki 1.22 adds mw.toolbar.addButtons() which seems to accept an array instead
         * So change to that whenever Wikia get around to upgrading
         *
         * mw source: <https://github.com/Wikia/app/blob/dev/resources/mediawiki.action/mediawiki.action.edit.js#L20> 
         */
        customEditButtons: function () {

            // Redirect
            mw.toolbar.addButton(
                'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
                'Redirect',
                '#REDIRECT [[',
                ']]',
                'Insert text',
                'mw-editbutton-redirect'
            );

            // Wikitable
            mw.toolbar.addButton(
                'https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png',
                'Insert a table',
                '{| class="wikitable"\n|-\n',
                '\n|}',
                '! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3',
                'mw-editbutton-wikitable'
            );

            // Line break
            mw.toolbar.addButton(
                'https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png',
                'Line break',
                '<br />',
                '',
                '',
                'mw-editbutton-linebreak'
            );

            // Gallery
            mw.toolbar.addButton(
                'https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png',
                'Insert a picture gallery',
                '\n<div style="text-align:center"><gallery>\n',
                '\n</gallery></div>',
                'File:Example.jpg|Caption1\nFile:Example.jpg|Caption2',
                'mw-editbutton-gallery'
            );

        },

        /**
         * Insert username
         * Used in [[Template:USERNAME]]
         */
        insertUsername: function () {
            $( '.insertusername' ).text( mw.config.get( 'wgUserName' ) );
        },

        /**
         * Collapses navboxes under certain conditions
         */
        navbox: function() {
 
                // should be defined by [[MediaWiki:Collapsible-expand]]
                // currently hardcoded into template due to wikia bug
            var expand = 'show',
                navboxes = $( '.navbox' ),
                // maximum number of navboxes before they all get collapsed
                maxShow = 2,
                // maximum allowable height of navbox before it gets collapsed
                maxHeight = 300,
                i;
 
            // @param elem navbox to be collapsed
            function collapseNavbox( elem ) {
 
                var rows,
                    j,
                    toggle;
 
                if ( $( elem ).hasClass( 'mw-collapsed' ) ) {
                    return;
                }
 
                // add the collapsed class
                $( elem ).addClass( 'mw-collapsed' );
 
                // make sure we aren't selecting any nested navboxes
                rows = $( elem ).children( 'tbody' ).children( 'tr' );
 
                // rows[0] is the header
                for ( j = 1; j < rows.length; j += 1 ) {
                    $(rows[j]).css( { 'display': 'none' } );
                }
 
                // toggle is always in header
                toggle = $( rows[0] ).find( '.mw-collapsible-toggle' );
 
                // this class is required to make expand work properly
                $( toggle ).addClass( 'mw-collapsible-toggle-collapsed' );
                $( toggle ).children( 'a' ).text( expand );
 
            }
 
            // collapse if more than maxShow
            if ( navboxes.length > ( maxShow - 1 ) ) {
                for (i = 0; i < navboxes.length; i += 1 ) {
                    collapseNavbox( navboxes[i] );
                }
            }
 
            // collapse if taller than maxHeight
            for ( i = 0; i < navboxes.length; i += 1 ) {
                if ( $( navboxes[i] ).height() > maxHeight ) {
                    collapseNavbox( navboxes[i] );
                }
            }

        },

        /**
         * Signature reminder on forum namespace and talk pages
         */
        sigReminder: function ( e ) {

            var text = $( '#wpTextbox1' ).val(),
                reminder = 'It looks like you forgot to sign your comment. You can sign by placing 4 tildes (~~~~) to the end of your message.\nAre you sure you want to post it?';

            // don't trigger on minor edits
            if ( $( '#wpMinoredit' ).prop( 'checked' ) ) {
                return;
            }

            // check for sig
            if ( text.replace( /(<nowiki>.*?<\/nowiki>)/g, '' ).match( '~~~' ) ) {
                return;
            }

            // check for &undo= or ?undo= in url as summary can be altered
            if ( window.location.search.match( /[\?&]undo=/ ) ) {
                return;
            }

            // check for user welcome notice, since those often don't need signatures
            if ( $( '#wpSummary' ).val().match( /welcome/i ) ) {
                return;
            }

            mw.log( 'sigreminder activated' );

            if ( !window.confirm( reminder ) ) {
                mw.log( 'prevent no sig' );
                e.preventDefault();
            }

        },

        /**
         * Redirects from /User:UserName/skin.js or .css to the user's actual skin page
         */
        skinRedirect: function () {

            var skinpage = mw.config.get( 'skin' ).replace( 'oasis', 'wikia' ),
                pagename = 'User:' + mw.config.get( 'wgUserName' ).replace( / /g, '_' ) + '/skin.';

            // Using location.replace doesn't add the skin.js/skin.css page to the user's history.
            switch ( mw.config.get( 'wgPageName' ) ) {
            case pagename + 'js':
                window.location.replace(
                    window.location.href.replace( /\/skin\.js/i, '/' + skinpage + '.js' )
                );
                break;
            case pagename + 'css':
                window.location.replace(
                    window.location.href.replace( /\/skin\.css/i, '/' + skinpage + '.css' )
                );
                break;
            }

        },

        /**
         * Change <youtube>video</youtube> to {{youtube|video}}
         * Runs when save button is clicked
         *
         * @author Cqm
         * @todo Fix for width/height parameters
         */
        tagSwitch: function () {

            // stop it changing the docs on here
            // probably a monobook issue
            if ( mw.config.get( 'wgPageName' ) === 'MediaWiki:Common.js' ) {
                return;
            }

            var wikitext = $( '#wpTextbox1' )
                           .html()
                           .replace( /&lt;youtube&gt;/g, '{{youtube|' )
                           .replace( /&lt;\/youtube&gt;/g, '}}' );

            $( '#wpTextbox1' ).html( wikitext );

        }

    };

    $( rswiki.common.init );

}( this, document, jQuery, mediaWiki, importArticles, rswiki ) );

/* </nowiki> */