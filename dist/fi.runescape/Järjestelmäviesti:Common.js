/** <nowiki>
 * MediaWiki:Common.js
 *
 * JavaScript here will load on both skins for every user.
 *
 * For JavaScript for the Oasis skin see [[MediaWiki:Wikia.js]].
 * For JavaScript for the Monobook skin see [[MediaWiki:Monobook.js]].
 *
 * For mw.loader docs see <https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.loader>.
 * jshint <http://jshint.com/>
 *
 */

/*jshint
    bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
    eqeqeq:true, es3:false, forin:true, immed:true, indent:4,
    jquery:true, latedef:true, newcap:true, noarg:true, noempty:true,
    nonew:true, onevar:true, plusplus:true, quotmark:single, undef:true,
    unused:true, strict:true, trailing:true
*/

( function ( window, document, $, mw, importArticles, rswiki ) {

    'use strict';

    /**
     * Reusable functions
     */
    rswiki.reusable = {

        /**
         * Sets the cookie.
         *
         * @param c_name {string} Name of the cookie.
         * @param value {string} Data to store in the cookie.
         * @param expiredays {integer} Expiry time of the cookie in days.
         * @param path {string} URL path the cookie will apply to, excluding domain name.
         *                      Defaults to '/' (all pages on the wiki)
         */
        setCookie: function ( name, value, expiredays, path ) {

            var options = {};

            if ( expiredays ) {
                options.expires = expiredays;
            }

            options.path = (function() {
                if ( path ) {
                    return path;
                }
                return '/';
            })();

            $.cookie( name, value, options );

        },

        /**
         * Retrieves a cookie.
         *
         * @param name {string} Cookie name.
         * @return The data stored in the cookie or empty string if the cookie does not exist.
         */
        getCookie: function ( name ) {

            var cookie = $.cookie( name );

            if ( cookie === null ) {
                cookie = '';
            }

            return cookie;

        },

        /**
         * Calls wiki API and returns the response in the callback.
         *
         * @param data {object} Object list of parameters to send along with the request.
         *                      {'format':'json'} is set automatically.
         * @param method {string} Either POST or GET.
         * @param callback {function} Function to run when request is complete.
         * @param addurl {string} (optional) Anything you may want to add to the request URL.
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
                        return;
                    }
                    callback( response );
                },
                error: function ( xhr, status, error ) {
                    mw.log( 'AJAX error: ', xhr.responseText, status, error );
                }
            } );

        },

        /**
         * Adds commas to numbers.
         *
         * @source <http://www.mredkj.com/javascript/numberFormat.html#addcommas>
         * @param nStr {string|number} Number to be altered.
         * @return Number string with commas.
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
     * Expose reusable functions to global scope for backwards compatibility.
     */
    $.extend( window, {
        setCookie: rswiki.reusable.setCookie,
        getCookie: rswiki.reusable.getCookie,
        callAPI: rswiki.reusable.callAPI,
        addCommas: rswiki.reusable.addCommas
    } );

    rswiki.common = {

        /**
         * Arrays for tracking which script are loading on the current page for debugging
         *
         * imported contains imported scripts (see imports() function)
         * scripts contains functions from from here, excluding imports() and init()
         */
        imported: [],
        scripts: [],

        /**
         * Loads functions conditionally.
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
                }

                if ( config.wgNamespaceNumber === 0 && $( '.navbox' ).length ) {
                    rswiki.common.navbox();
                }

                break;
            case 'edit':
            case 'submit':

                rswiki.common.customEditButtons();

                $( '#wpSave' ).click( function ( e ) {
                    rswiki.common.tagSwitch();
                    if ( config.wgNamespaceNumber % 2 === 1 || config.wgNamespaceNumber === 110 ) {
                        rswiki.common.sigReminder( e );
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
         * Scripts marked with (gadget) will eventually be moved to default gadgets.
         */
        imports: function () {

            // Text to display next to checkbox that enables/disables AJAX refresh script.
            window.AjaxRCRefreshText = 'Auto-refresh';

            /**
             * Setup variables for imports.
             */
            // Pages to run AJAX refresh script on.
            window.ajaxPages = [
                'Special:RecentChanges',
                'Special:Contributions',
                'Special:Log',
                'Special:Log/move',
                'Special:AbuseLog',
                'Special:NewFiles',
                'Special:NewPages',
                'Special:Watchlist',
                'Special:Statistics',
                'Special:ListFiles',

                // Category pages
                'Category:Speedy_deletion_candidates',
                'Category:Speedy_move_candidates',

                // Other pages
                // doesn't work due to dpl being cached until purged
                // @todo find out why dpl is so stupid now and if there's a workaround
                // 'RuneScape:Active_discussions',
                'Forum:Yew_Grove'
            ];

                // For Grand Exchange update scripts.
            var manualExchange = [],
                // For importArticles.
                scripts = [],
                styles = [],
                // Cache mw.config variables for later use.
                config = mw.config.get( [
                    'skin',
                    'wgAction',
                    'wgCanonicalSpecialPageName',
                    'wgNamespaceNumber',
                    'wgPageName',
                    'wgUserGroups'
                ] );

            /**
             * Add imports to an array.
             */

            // Scripts to be loaded on (nearly) every pageview.
            scripts.push(
                // Konami code
                'MediaWiki:Common.js/Konami.js'
            );

            switch ( config.wgAction ) {
            case 'view':

                switch ( config.wgPageName ) {
                case 'RuneScape:Counter-Vandalism_Unit':
                    // Form for reporting users on [[RS:CVU]].
                    scripts.push( 'User:Suppa_chuppa/cvu.js' );
                    break;
                case 'RuneScape:RC_Patrol':
                    // Check old page revisions for vandalism.
                    scripts.push( 'User:Suppa_chuppa/rcpatrol.js' );
                    styles.push( 'User:Suppa_chuppa/rcp.css' );
                    break;
                case 'Distractions_and_Diversions_Locations':
                case 'Distractions_and_Diversions_Locations/Penguin_Hide_and_Seek':
                    // Peng hunting highlight table.
                    scripts.push( 'MediaWiki:Common.js/pengLocations.js' );
                    break;
                case 'RuneScape:Off-site/IRC':
                    // Embed IRC.
                    scripts.push( 'MediaWiki:Common.js/embedirc.js' );
                    break;
                case 'MediaWiki:Namespace_numbers':
                    // Lists namespace number for easy reference.
                    scripts.push( 'MediaWiki:Common.js/namespaceNumbersList.js' );
                    break;
                }

                if ( window.ajaxPages.indexOf( config.wgPageName ) > -1 ) {
                    // Ajax refresh for various pages.
                    scripts.push( 'u:dev:AjaxRC/code.js' );
                }

                // @todo merge gemw update scripts into one.
                if ( manualExchange.indexOf( config.wgPageName ) > -1 ) {
                    // Add custom price input for exchange pages.
                    scripts.push( 'User:Quarenon/gemwupdate.js' );
                } else if ( config.wgNamespaceNumber === 112 &&
                    config.wgUserGroups.indexOf( 'autoconfirmed' ) > -1 ) {
                    // Semi-automated price updates for exchange pages.
                    scripts.push( 'MediaWiki:Common.js/gemwupdate.js' );
                    // Enable when GED stops working.
                    // scripts.push( 'User:Quarenon/gemwupdate.js' );
                }

                if ( config.wgCanonicalSpecialPageName === 'Whatlinkshere' ) {
                    // Add edit links to [[Special:WhatLinksHere]] (gadget).
                    scripts.push( 'MediaWiki:Common.js/WLH_edit.js' );
                }

                if ( config.wgNamespaceNumber === 100 ) {
                    // Notice when editing update pages.
                    scripts.push( 'MediaWiki:Common.js/updateintro.js' );
                }

                if ( config.wgNamespaceNumber === 112 && config.wgPageName.split( '/' )[1] === 'Data') {
                    // Notice when editing Exchange /Data subpages.
                    scripts.push('MediaWiki:Common.js/exchangeintro.js');
                }

                if ( $( '.jcInput, [class*="jcPane"], .skiplinkcontainer' ).length ) {
                    // Calculators
                    scripts.push( 'User:HenDaBen/calc.js' );
                }

                if ( $( '.lighttable' ).length ) {
                    // Highlight tables
                    scripts.push( 'MediaWiki:Common.js/highlightTable.js' );
                }

                if ( $( '.embedMe' ).length ) {
                    // Embed audio
                    scripts.push( 'MediaWiki:Common.js/embedding.js' );
                }

                if ( $( '.youtube' ).length ) {
                    // Youtube embedding
                    scripts.push( 'MediaWiki:Common.js/youtube.js' );
                }

                if ( $( '.countdown' ).length ) {
                    // Countdown timer
                    scripts.push( 'MediaWiki:Common.js/countdowntimer.js' );
                }

                if ( $( '.GEdatachart').length ) {
                    if ( !mw.loader.getState( 'highcharts' ) ) {
                        mw.loader.implement( 'highcharts', ['http://code.highcharts.com/stock/highstock.js'], {}, {} );
                    }

                    mw.loader.using( 'highcharts', function () {
                        // @todo Add dependency to script so we can add it to importArticles()
                        // without having to wonder if it's loaded in time.

                        // Grand Exchange Charts
                        window.importScript( 'MediaWiki:Common.js/GECharts.js' );
                    } );
                }

                if ( $( '.jcConfig' ).length ) {
                    // Dynamic templates
                    scripts.push( 'MediaWiki:Common.js/calc.js' );
                    styles.push( 'MediaWiki:Common.css/calc.css' );
                }

                if ( $( '.cioCompareLink' ).length ) {
                    // Item Compare overlays
                    scripts.push( 'MediaWiki:Common.js/compare.js' );
                    styles.push( 'MediaWiki:Common.css/compare.css' );
                }

                if ( $( '.specialMaintenance' ).length ||
                    config.wgCanonicalSpecialPageName === 'Specialpages' ) {
                    // Special page report on [[RS:MAINTENANCE]] and [[Special:SpecialPages]].
                    scripts.push( 'MediaWiki:Common.js/spreport.js' );
                }

                // @todo Check  if #charguide and .charmtable exist on the same page
                //Dropadd was here; removed.

                if ( $( '#XPEach, #GEPrice, #killXP' ).length ) {
                    // Adds calcs to infoboxes.
                    scripts.push( 'User:HenDaBen/monstercalc.js' );
                }

                if ( $( '.switch-infobox' ).length ) {
                    // Switch infobox
                    scripts.push( 'User:HenDaBen/SwitchInfobox.js' );
                }

                if ( $( '#wb-timer' ).length ) {
                    // Adds timer for Warbands.
                    scripts.push( 'MediaWiki:Common.js/warbandstimer.js' );
                }

                if ( $( '.mw-collapsible' ).length ) {
                    // Removes fade animation on collapsible tables.
                    scripts.push( 'MediaWiki:Common.js/instantCollapsible.js' );
                }

                break;

            /**
             * Load scripts on preview per request.
             * @link <http://rs.wikia.com/?diff=9126949>
             *
             * Will only work on Monobook previews because Oasis previews load in a popup
             * whilst still using wgAction === 'edit'.
             * Oasis only seems to have wgAction === 'submit' on abusefilter/vstf filter blocks.
             *
             * @todo Check if jquery.collapsible loads, import instantCollapsible if yes.
             */
            case 'submit':

                if ( config.skin === 'oasis' ) {
                    break;
                }

                if ( $( '.jcInput, [class*="jcPane"], .skiplinkcontainer' ).length ) {
                    // Calculators
                    scripts.push( 'User:HenDaBen/calc.js' );
                }

                if ( [ 'Distractions_and_Diversions_Locations', 'Distractions_and_Diversions_Locations/Penguin_Hide_and_Seek' ].indexOf( config.wgPageName ) > -1 ) {
                    // Peng hunting highlight table
                    scripts.push( 'MediaWiki:Common.js/pengLocations.js' );
                }

                if ( $( '.embedMe' ).length ) {
                    // Embed audio
                    scripts.push( 'MediaWiki:Common.js/embedding.js' );
                }

                if ( $( '.youtube' ).length ) {
                    // Youtube embedding
                    scripts.push( 'MediaWiki:Common.js/youtube.js' );
                }

                if ( $( '.lighttable' ).length ) {
                    // Highlight tables
                    scripts.push( 'MediaWiki:Common.js/highlightTable.js' );
                }

                if ( $( '.GEdatachart').length ) {
                    if ( !mw.loader.getState( 'highcharts' ) ) {
                        mw.loader.implement( 'highcharts', ['http://code.highcharts.com/stock/highstock.js'], {}, {} );
                    }

                    mw.loader.using( 'highcharts', function () {
                        // @todo add dependency to script so we can add it to importArticles()
                        // without having to wonder if it's loaded in time.

                        // Grand Exchange charts
                        window.importScript( 'MediaWiki:Common.js/GECharts.js' );
                    } );
                }

                if ( $( '.jcConfig' ).length ) {
                    // Dynamic templates
                    scripts.push( 'MediaWiki:Common.js/calc.js' );
                    styles.push( 'MediaWiki:Common.css/calc.css' );
                }

                if ( $( '.switch-infobox' ).length ) {
                    // Switch infobox
                    scripts.push( 'User:HenDaBen/SwitchInfobox.js' );
                }

                if ( $( '#XPEach, #GEPrice, #killXP' ).length ) {
                    // Adds calcs to infoboxes
                    scripts.push( 'User:HenDaBen/monstercalc.js' );
                }

                if ( $( '.cioCompareLink' ).length ) {
                    // Item Compare overlays
                    scripts.push( 'MediaWiki:Common.js/compare.js' );
                    styles.push( 'MediaWiki:Common.css/compare.css' );
                }

                break;

            }

            // merge scripts and styles, and add to rswiki object
            rswiki.common.imported = scripts.concat( styles );

            /**
             * Import scripts using importArticles().
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
         * This will not work when using the fast access keys.
         * @example Alt-Shift-+ for add new section.
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

            // add function to scripts array
            rswiki.common.scripts[ rswiki.common.scripts.length ] = 'addtalkheader';

            var params = '&preload=Template:Talkheader/preload';

            // For redlinks.
            // Make sure this is only selecting anchor tags.
            // Otherwise this selects li tags used for monobook discussion tab.
            // Why would you even give <li> that class...?
            $( 'a.new' ).attr( 'href', function ( index, attr ) {

                if ( attr.indexOf( 'Talk:' ) > -1 || attr.indexOf( '_talk' ) > -1 ) {

                    // User talk doesn't get the template.
                    if ( attr.indexOf( 'User_talk:' ) > -1 ) {
                        return;
                    }

                    return attr + params;

                }

            } );
    
            // For talk pages.
            if ( mw.config.get( 'wgNamespaceNumber' ) % 2 === 1 &&
                mw.config.get( 'wgNamespaceNumber' ) !== 3 &&
                    $( '#noarticletext' ).length ) {

                // Oasis support.
                if ( mw.config.get( 'skin' ) === 'oasis' ) {
                    $( '#ca-addsection' ).attr( 'href', function ( index, attr ) {
                        return attr + params;
                    } );

                // Monobook support.
                } else {
                    // Create page and new section tabs.
                    $( '#ca-edit a, #ca-addsection a' ).attr( 'href', function ( index, attr ) {
                        return attr + params;
                    } );
                }
            }

        },

        /**
         * Autosort sortable tables
         *
         * jquery.tablesorter is a default plugin, but this needs a dependency via lazy loading.
         *
         * To use autosort add "autosort=n,d" to the table class, where n is the
         * column to sort and d is the direction to sort.
         *
         * @example class="wikitable sortable autosort=3,a"
         * This sorts column 3 ascending.
         * @example class="prettytable sortable autosort=1,d"
         * This sorts column 1 descending.
         * For more examples see <http://rs.wikia.com/User:Tyilo/Autosort_Test>
         *
         * @author Tyilo
         * @author Cqm
         */
        autosort: function () {

            // add function to scripts array
            rswiki.common.scripts[ rswiki.common.scripts.length ] = 'autosort';

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
         * Add buttons to the edit toolbar for monobook and oasis with visual mode disabled.
         *
         * Currently this uses a function multiple times.
         * @example mw.toolbar.addButton( imageFile, speedTip, tagOpen, tagClose, sampleText, imageId, selectText );
         *
         * MediaWiki 1.22 adds mw.toolbar.addButtons() which accepts an array instead.
         * Change to that whenever Wikia get around to upgrading.
         *
         * mw source: <https://github.com/Wikia/app/blob/dev/resources/mediawiki.action/mediawiki.action.edit.js#L20> 
         */
        customEditButtons: function () {

            // add function to scripts array
            rswiki.common.scripts[ rswiki.common.scripts.length ] = 'customeditbuttons';

            var more;

            /**
             * Polyfill for mw.toolbar.addButton to allow us to set multiple buttons at once.
             * Remove when we're upgraded to MediaWiki 1.22.
             *
             * @param buttons {array} Array of objects
             * @example [ { imageFile: 'string', speedTip: 'string', tagOpen: 'string', tagClose: 'string',
             *              sampleText: 'string', imageId : 'string (optional)' } ]
             */
            if ( !mw.toolbar.addButtons ) {
                mw.toolbar.addButtons = function ( buttons ) {
                    var i;
                    
                    for ( i = 0; i < buttons.length; i += 1 ) {
                        mw.toolbar.addButton( buttons[i].imageFile, buttons[i].speedTip, buttons[i].tagOpen,
                            buttons[i].tagClose, buttons[i].sampleText, buttons[i].imageId );
                    }
                };
            }

            mw.toolbar.addButtons( [ {
                // redirect
                imageFile: 'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
                speedTip: 'Redirect',
                tagOpen: '#REDIRECT [[',
                tagClose: ']]',
                sampleText: 'Insert text',
                imageId: 'mw-editbutton-redirect'
            }, {
                // wikitable
                imageFile: 'https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png',
                speedTip: 'Insert a table',
                tagOpen: '{| class="wikitable"\n|-\n',
                tagClose: '\n|}',
                sampleText: '! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3',
                imageId: 'mw-editbutton-wikitable'
            }, {
                // line break
                imageFile: 'https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png',
                speedTip: 'Line break',
                tagOpen: '<br />',
                tagClose: '',
                sampleText: '',
                imageId: 'mw-editbutton-linebreak'
            }, {
                // gallery
                imageFile: 'https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png',
                speedTip: 'Insert a picture gallery',
                tagOpen: '\n<div style="text-align:center"><gallery>\n',
                tagClose: '\n</gallery></div>',
                sampleText: 'File:Example.jpg|Caption1\nFile:Example.jpg|Caption2',
                imageId: 'mw-editbutton-gallery'
            } ] );

            // move edittools expand to end of buttons in oasis editor
            if ( mw.config.get( 'skin' ) === 'oasis' ) {
                // pass true to .clone() to keep event listeners
                more = $( '.cke_toolbar_expand' ).clone( true );
                $( '.cke_toolbar_expand' ).remove();
                $( '.cke_toolbar_source' ).append( more );
            }

        },

        /**
         * Insert username.
         * Used in [[Template:USERNAME]].
         */
        insertUsername: function () {

            // add function to scripts array
            rswiki.common.scripts[ rswiki.common.scripts.length ] = 'insertusername';

            $( '.insertusername' ).text( mw.config.get( 'wgUserName' ) );
        },

        /**
         * Collapses navboxes under certain conditions.
         */
        navbox: function() {

            // add function to scripts array
            rswiki.common.scripts[ rswiki.common.scripts.length ] = 'navbox';
 
                // Should be defined by [[MediaWiki:Collapsible-expand]].
                // Currently hardcoded into template due to wikia bug.
            var expand = 'näytä',
                navboxes = $( '.navbox' ),
                // maximum number of navboxes before they all get collapsed
                maxShow = 2,
                // maximum allowable height of navbox before it gets collapsed
                maxHeight = 300,
                i;
 
            // @param elem Navbox to be collapsed.
            function collapseNavbox( elem ) {
 
                var rows,
                    j,
                    toggle;
 
                if ( $( elem ).hasClass( 'mw-collapsed' ) ) {
                    return;
                }
 
                // Add the collapsed class.
                $( elem ).addClass( 'mw-collapsed' );
 
                // Make sure we aren't selecting any nested navboxes.
                rows = $( elem ).children( 'tbody' ).children( 'tr' );
 
                // rows[0] is the header.
                for ( j = 1; j < rows.length; j += 1 ) {
                    $(rows[j]).css( { 'display': 'none' } );
                }
 
                // Toggle is always in header.
                toggle = $( rows[0] ).find( '.mw-collapsible-toggle' );
 
                // This class is required to make expand work properly.
                $( toggle ).addClass( 'mw-collapsible-toggle-collapsed' );
                $( toggle ).children( 'a' ).text( expand );
 
            }
 
            // Collapse if more than maxShow.
            if ( navboxes.length > ( maxShow - 1 ) ) {
                for (i = 0; i < navboxes.length; i += 1 ) {
                    collapseNavbox( navboxes[i] );
                }
            }
 
            // Collapse if taller than maxHeight.
            for ( i = 0; i < navboxes.length; i += 1 ) {
                if ( $( navboxes[i] ).height() > maxHeight ) {
                    collapseNavbox( navboxes[i] );
                }
            }

        },

        /**
         * Signature reminder on forum namespace and talk pages.
         */
        sigReminder: function ( e ) {

            // add function to scripts array
            rswiki.common.scripts[ rswiki.common.scripts.length ] = 'sigreminder';

            var text = $( '#wpTextbox1' ).val(),
                reminder = 'It looks like you forgot to sign your comment. You can sign by placing 4 tildes (~~~~) to the end of your message.\nAre you sure you want to post it?';

            // Don't trigger on minor edits.
            if ( $( '#wpMinoredit' ).prop( 'checked' ) ) {
                return;
            }

            // Check for signature.
            if ( text.replace( /(<nowiki>.*?<\/nowiki>)/g, '' ).match( '~~~' ) ) {
                return;
            }

            // Check for &undo= or ?undo= in URL as summary can be altered.
            if ( window.location.search.match( /[\?&]undo=/ ) ) {
                return;
            }

            // Check for user welcome notice (in edit summary) since those often don't need signatures.
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
         * Redirects from /User:UserName/skin.js or .css to the user's actual skin page.
         */
        skinRedirect: function () {

            // add function to scripts array
            rswiki.common.scripts[ rswiki.common.scripts.length ] = 'skinredirect';

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
         * Change <youtube>video</youtube> to {{youtube|video}}.
         * Runs when save button is clicked.
         *
         * @author Cqm
         */
        tagSwitch: function () {

            // add function to scripts array
            rswiki.common.scripts[ rswiki.common.scripts.length ] = 'tagswitch';

            // Stop it changing the docs on here (monobook issue)
            if ( mw.config.get( 'wgPageName' ) === 'MediaWiki:Common.js' ) {
                return;
            }

            var wikitext = $( '#wpTextbox1' )
                               .val()
                               // simple opening tag
                               .replace( /<youtube>/g, '{{youtube|' )
                               // opening tag with height specified
                               // (?:\s*) is used to compensate for any amount of whitespace in the respective places
                               .replace( /<youtube(?:\s*)height="(\d*)"(?:\s*)>/g, '{{youtube|height=$1|' )
                               // opening tag with width specified
                               .replace( /<youtube(?:\s*)width="(\d*)"(?:\s*)>/g, '{{youtube|width=$1|' )
                               // opening tag with height and width specified
                               .replace( /<youtube(?:\s*)height="(\d*)"(?:\s*)width="(\d*)"(?:\s*)>/g, '{{youtube|height=$1|width=$2|' )
                               .replace( /<youtube(?:\s*)width="(\d*)"(?:\s*)height="(\d*)"(?:\s*)>/g, '{{youtube|height=$2|width=$1|' )
                               // closing tag
                               .replace( /<\/youtube>/g, '}}' );

            $( '#wpTextbox1' ).val( wikitext );

        }

    };

    $( rswiki.common.init );

}( this, this.document, this.jQuery, this.mediaWiki, this.importArticles, this.rswiki = this.rswiki || {} ) );

/* </nowiki> */