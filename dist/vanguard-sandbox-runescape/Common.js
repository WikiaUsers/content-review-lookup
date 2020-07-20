/** <pre>
 * This file loads for every user visiting the wiki.
 * For skin specific variants see [[MediaWiki:Monobook.js]] and [[MediaWiki:Wikia.js]]
 * for monobook and oasis respectively
 *
 * Please test any changes made to this file.
 * Jshint <http://www.jshint.com> can catch syntax errors to help testing.
 * Alternatively, Wikia's code editor has jshint embedded to make life extra simple.
 *
 * To see which scripts this has loaded, see `rswiki.loaded` (from your js console)
 */

/*jshint bitwise:true, browser:true, camelcase:true, curly:true, devel:false,
         eqeqeq:true, es3:false, forin:true, immed:true, jquery:true,
         latedef:true, newcap:true, noarg:true, noempty:true, nonew:true,
         onevar:false, plusplus:false, quotmark:single, undef:true, unused:true,
         strict:true, trailing:true
*/

(function ($, mw, rs) {

    'use strict';

    /**
     * Global variables set for imported scripts
     */
    // AjaxRC
    window.AjaxRCRefreshText = 'Auto-refresh';
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
        'Category:Speedy_deletion_candidates',
        'Category:Speedy_move_candidates'
    ];

    /**
     * Cache mw.config values
     *
     * These are used in conditionals for checking various mediawiki settings
     *
     * For a full list of available variables see
     * <http://www.mediawiki.org/wiki/Manual:Interface/JavaScript#mw.config>
     */
    var conf = mw.config.get([
        'debug',
        'skin',
        'wgAction',
        'wgArticlePath',
        'wgCanonicalSpecialPageName',
        'wgContentLanguage',
        'wgContentReviewExtEnabled',
        'wgContentReviewTestModeEnabled',
        'wgIsMainPage',
        'wgNamespaceNumber',
        'wgPageName',
        'wgRedirectedFrom',
        'wgReviewedScriptsTimestamp',
        'wgScriptsTimestamp',
        'wgServer',
        'wgTitle',
        'wgUserName',
        'wgUserGroups'
    ]);

    /**
     * Storage for scripts and styles loaded through `util.loadAssets` to prevent double loading.
     */
    var loadedAssets = {};

    /**
     * Reusable functions
     *
     * These are available under the `rswiki` global variable.
     * @example `rswiki.addCommas`
     * The alias `rs` is also available in place of `rswiki`.
     */
    var util = {
        /**
         * Formats a number string with commas.
         *
         * @todo fully replace this with Number.protoype.toLocaleString
         *       > 123456.78.toLocaleString('en')
         *
         * @example 123456.78 -> 123,456.78
         *
         * @param num {Number|String} The number to format.
         * @return {String} The formated number.
         */
        addCommas: function (num) {
            if (typeof num === 'number') {
                return num.toLocaleString('en');
            }

            // @todo chuck this into parseFloat first and then to toLocaleString?
            num += '';

            var x = num.split('.'),
                x1 = x[0],
                x2 = x.length > 1 ?
                    '.' + x[1] :
                    '',
                rgx = /(\d+)(\d{3})/;

            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1,$2');
            }

            return x1 + x2;
        },

        /**
         * Extracts parameter-argument pairs from templates.
         *
         * @todo Fix for multiple templates
         *
         * @param tpl {String} Template to extract data from.
         * @param text {String} Text to look for template in.
         * @return {Object} Object containing parameter-argument pairs
         */
        parseTemplate: function (tpl, text) {
            var rgx = new RegExp(
                    '\\{\\{(template:)?' + tpl.replace(/[ _]/g, '[ _]') + '\\s*(\\||\\}\\})',
                    'i'
                ),
                exec = rgx.exec(text),
                // splits template into |arg=param or |param
                paramRgx = /\|(.*?(\{\{.+?\}\})?)(?=\s*\||$)/g,
                args = {},
                params,
                i,
                j;

            // happens if the template is not found in the text
            if (exec === null) {
                return false;
            }

            text = text.substring(exec.index + 2);

            // used to account for nested templates
            j = 0;

            // this purposefully doesn't use regex
            // as it became very difficult to make it work properly
            for (i = 0; i < text.length; i += 1) {
                if (text[i] === '{') {
                    j += 1;
                } else if (text[i] === '}') {
                    if (j > 0) {
                        j -= 1;
                    } else {
                        break;
                    }
                }
            }

            // cut off where the template ends
            text = text.substring(0, i);
            // remove template name as we're not interested in it past this point
            text = text.substring(text.indexOf('|')).trim();
            // separate params and args into an array
            params = text.match(paramRgx);

            // handle no params/args
            if (params !== null) {
                // used as an index for unnamed params
                i = 1;

                params.forEach(function (el) {
                    var str = el.trim().substring(1),
                        eq = str.indexOf('='),
                        tpl = str.indexOf('{{'),
                        param,
                        val;

                    // checks if the equals is after opening a template
                    // to catch unnamed args that have templates with named args as params
                    if (eq > -1 && (tpl === -1 || eq < tpl)) {
                        param = str.substring(0, eq).trim().toLowerCase();
                        val = str.substring(eq + 1).trim();
                    } else {
                        param = i;
                        val = str.trim();
                        i += 1;
                    }

                    args[param] = val;
                });
            }

            return args;
        },

        /**
         * Alternate version of `parseTemplate` for parsing exchange module data.
         *
         * @notes Only works for key-value pairs
         *
         * @param text {String} Text to parse.
         * @return {Object} Object containing parameter-argument pairs.
         */
        parseExchangeModule: function (text) {

                // strip down to just key-value pairs
            var str = text
                    .replace(/return\s*\{/, '')
                    .replace(/\}\s*$/, '')
                    .trim(),
                rgx = /\s*(.*?\s*=\s*(?:\{[\s\S]*?\}|.*?))(?=,?\n|$)/g,
                args = {},
                params = str.match(rgx);

            if (params !== null) {
                params.forEach(function (elem) {
                    var str = elem.trim(),
                        eq = str.indexOf('='),
                        param = str.substring(0, eq).trim().toLowerCase(),
                        val = str.substring(eq + 1).trim();

                    args[param] = val;
                });
            }

            return args;
        },

        /**
         * Alternative to mw.load.implement and importArticles
         *
         * Pros compared to alternatives:
         * - Doesn't throw error for missing args unlike mw.loader.implement
         * - Returns a promise so you can use .done() and .fail() as a callback
         *
         * Cons:
         * - More http requests, but they're async
         * - No message/i18n support, but no one ever uses them on Wikia anyway
         *
         * @param js {object|array|string} Either an object with the keys 'js' and/or 'css', an
         *                                 array JS pages as strings or a string representing a
         *                                 single JS page. Values for object keys are either an
         *                                 array or string with the same contents.
         * @param css {array|string} Not used if `js` is an object. Otherwise it can be an array
         *                           containing CSS pages as strings or a string representing a
         *                           single CSS page. If it's not required it can be omitted.'
         *
         * @return {jQuery.Promise}
         *
         * @example rs.loadAssets('foo.js', 'bar.css').done(function () { ... });
         * @example rs.loadAssets(['foo.js', 'bar.js'], ['baz.css', 'quux.css']).done(function () { ... });
         * @example rs.loadAssets({ js: 'foo.js', css: 'bar.css' }).done(function () { ... });
         * @example rs.loadAssets({ js: ['foo.js', 'bar.js'], css: ['baz.css', 'quux.css'] }).done(function () { ... });
         */
        loadAssets: function (js, css) {
            var assets = normaliseArgs(js, css),
                loaded = [],
                $head = $('head'),
                $meta = $head.find('meta[name="ResourceLoaderDynamicStyles"]'),
                $style,
                style = $meta.prev('style').get(0);
            
            // fix cases where the RL style tag is missing
            // notably when ?debug=true
            // which causes RL to add link tags instead
            // @todo mimic that behaviour?
            if (!$meta.length) {
                mw.log('getMarker> No <meta name="ResourceLoaderDynamicStyles"> found, inserting dynamically.');
                $meta = $('<meta>').attr('name', 'ResourceLoaderDynamicStyles');
                $head.append($meta);
            }
            
            $style = $meta.prev('style');
            
            if (!$style.length) {
                $style = $('<style>').attr({type: 'text/css', media: 'all'});
                $meta.before($style);
            }
            
            style = $style.get(0);

            if ($.isEmptyObject(assets)) {
                // silently fail
                return $.when();
            }

            // append css to head (same as RL)
            // do it before js to prevent flashes of unstyled stuff as much as possible
            assets.css.forEach(function (elem) {
                if (loadedAssets.hasOwnProperty(elem)) {
                    loaded.push(loadedAssets[elem]);
                    return;
                }

                var opts = {
                        async: true,
                        data: {
                            debug: conf.debug,
                            lang: conf.wgContentLanguage,
                            mode: 'articles',
                            articles: elem,
                            only: 'styles',
                            // not convinced skin does anything, but it's here just in case
                            skin: conf.skin
                        },
                        dataType: 'text',
                        error: function (_, textStatus, errorThrown) {
                            mw.log(textStatus, errorThrown);
                        },
                        type: 'GET',
                        url: mw.util.wikiScript('load')
                    },
                    $jqXhr = $.ajax(opts);

                loaded.push($jqXhr);
                loadedAssets[elem] = $jqXhr;

                $jqXhr.done(function (data) {
                    style.innerHTML = style.innerHTML + '\n' + data;
                });
            });

            // load js and execute straight away
            assets.js.forEach(function (elem) {
                if (loadedAssets.hasOwnProperty(elem)) {
                    loaded.push(loadedAssets[elem]);
                    return;
                }

                var opts = {
                        async: true,
                        data: {
                            debug: conf.debug,
                            lang: conf.wgContentLanguage,
                            mode: 'articles',
                            articles: elem,
                            only: 'scripts',
                            // not convinced skin does anything, but it's here just in case
                            skin: conf.skin
                        },
                        dataType: 'script',
                        error: function (_, textStatus, errorThrown) {
                            mw.log(textStatus, errorThrown);
                        },
                        type: 'GET',
                        url: mw.util.wikiScript('load')
                    },
                    $jqXhr;

                // extra params for js review/js test mode
                // lifted directly from the js for importArticles
                // see <https://github.com/Wikia/app/blob/dev/resources/wikia/wikia.wikibits.js#L65>
                // correct line as of 2015-11-22 (may change in the future as stuff is changed)
                if (conf.wgContentReviewExtEnabled) {
                    if (opts.data.articles.search(/mediawiki:/i) > -1) {
                        if (conf.wgContentReviewTestModeEnabled) {
                            opts.data.current = conf.wgScriptsTimestamp;
                        } else {
                            opts.data.reviewed = conf.wgReviewedScriptsTimestamp;
                        }
                    }
                }
                
                $jqXhr = $.ajax(opts);

                loaded.push($jqXhr);
                loadedAssets[elem] = $jqXhr;
            });

            mw.log(assets, loaded);
            return $.when.apply(loaded);
        },

        /**
         * Helper for making cross domain requests to RuneScape's APIs.
         * If the APIs ever enable CORS, we can ditch this and do the lookup directly.
         *
         * @param url {string} The URL to look up
         * @param via {string} One of 'anyorigin', 'whateverorigin' or 'crossorigin'. Defaults to 'anyorigin'.
         *
         * @return {string} The URLto use to make the API request.
         */
        crossDomain: function (url, via) {
            switch (via) {
            case 'crossorigin':
                url = 'http://crossorigin.me/' + url;
                break;

            case 'whateverorigin':
                url = 'http://whateverorigin.org/get?url=' + encodeURIComponent( url ) + '&callback=?';
                break;

            case 'anyorigin':
                url = 'http://anyorigin.com/go/?url=' + encodeURIComponent( url ) + '&callback=?';
                break;
            case 'allorigins':
            default:
                url = 'https://allorigins.me/get?url=' + encodeURIComponent( url ) + '&callback=?';
                break;
            }

            return url;
        }
    };

    /**
     * Actions for which to load scripts that modify the edit UI
     */
    var editActions = ['edit', 'submit'];

    /**
     * Settings of each script run/imported
     * Based on <http://dev.wikia.com/wiki/DemoScripts.js>
     *
     * This is where each script on the wiki is imported
     * To import a new script see the example just below
     *
     * When adding new scripts, please keep them in alphabetical order
     */
    var includes = {
        /*
        example: {
            // {function|boolean} Conditional to pass for the scripts/styles
            // to be imported or exec to run
            // Can be something that evaluates to a boolean if required
            // if it should always load, set to true
            // try to use a `mw.config` value where possible
            conditional: true,

            // {array|string} Scripts to import
            // Remove if unused
            scripts: [],

            // {array|string} Styles to import
            // Remove if unused
            styles: [],

            // {boolean} Whether to expose exec under the rswiki global
            // Defaults to false
            expose: true,

            // {function} Function to run
            // Typically used for small scripts that aren't imported
            // or for minor things that need to run before importing another script
            // Will execute before any scripts are imported
            exec: function () {
                console.log( 'loaded' );
            }
        }
        */

        /**
         * Inserts {{talkheader}} on new talk pages
         *
         * @todo Get this approved as a bot task instead
         */
        addTalkheader: {
            conditional: true,
            exec: function () {
                var params = '&preload=Template:Talkheader/preload';

                // for redlinks
                // make sure this is only selecting anchor tags
                // otherwise this selects li tags used for monobook discussion tab
                $('a.new').attr('href', function (_, attr) {
                    if (attr.indexOf('Talk:') > -1 || attr.indexOf('_talk') > -1) {
                        // User_talk doesn't get the template
                        if (attr.indexOf('User_talk:') > -1) {
                            return;
                        }

                        return attr + params;
                    }
                });

                // for talk pages
                if (
                    conf.wgNamespaceNumber % 2 === 1 &&
                    conf.wgNamespaceNumber !== 3 &&
                    $('#noarticletext').length
                ) {

                    // oasis support
                    if (conf.skin === 'oasis') {
                        $('#ca-addsection').attr('href', function (_, attr) {
                            return attr + params;
                        });

                    // monobook support
                    } else {
                        // create page and new section tabs
                        $('#ca-edit a, #ca-addsection a').attr('href', function (_, attr) {
                            return attr + params;
                        });
                    }
                }
            }
        },

        /**
         * Ajax refresh for various pages
         */
        ajaxrc: {
            conditional: (window.ajaxPages.indexOf(conf.wgPageName) > -1),
            scripts: 'u:dev:AjaxRC/code.js'
        },

        /**
         * Embeds .ogg files
         */
        audioEmbed: {
            conditional: $('.embedMe').length,
            scripts: 'MediaWiki:Common.js/embedding.js'
        },

        /**
         * For autosorting sortable tables
         * @example <http://rs.wikia.com/?oldid=11201653>
         */
        autosort: {
            conditional: $('.sortable').length,
            expose: true,
            exec: function () {
                mw.loader.using('jquery.tablesorter', function () {
                    $('.sortable[class*="autosort="]').each(function () {
                        var $this = $(this),
                            matched = (' ' + $(this).attr( 'class') + ' ')
                                .match(/autosort=(\d+)[,-]{1}(a|d)/),
                            $sortCol = $this
                                .find('> thead th:nth-child(' + matched[1] + ')');

                        if (matched[2] === 'd') {
                            // descending
                            $sortCol.click().click();
                        } else {
                            // ascending
                            $sortCol.click();
                        }
                    });
                });
            }
        },

        /**
         * Calculators
         */
        calc: {
            conditional: $('.jcConfig').length,
            scripts: 'MediaWiki:Common.js/calc.js',
            styles: 'MediaWiki:Common.css/calc.css'
        },

        /**
         * For adding to charm logs
         */
        charmadd: {
            conditional: $('.charmtable').length,
            scripts: 'MediaWiki:Common.js/charmadd.js'
        },

        /**
         * Countdown timer
         */
        countdown: {
            conditional: $('.countdown').length,
            scripts: 'u:dev:Countdown/code.js'
        },

        /**
         * Adds custom edit buttons to the editor
         */
        customEditButtons: {
            conditional: (editActions.indexOf(conf.wgAction) > -1),
            exec: function () {
                var more;

                // redirect
                mw.toolbar.addButton(
                    'https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png',
                    'Redirect',
                    '#REDIRECT [[',
                    ']]',
                    'Insert text',
                    'mw-editbutton-redirect'
                );

                // wikitable
                mw.toolbar.addButton(
                    'https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png',
                    'Insert a table',
                    '{| class="wikitable"\n|-\n',
                    '\n|}',
                    '! header 1\n! header 2\n! header 3\n|-\n| row 1, cell 1\n| row 1, cell 2\n| row 1, cell 3\n|-\n| row 2, cell 1\n| row 2, cell 2\n| row 2, cell 3',
                    'mw-editbutton-wikitable'
                );

                // line break
                mw.toolbar.addButton(
                    'https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png',
                    'Line break',
                    '<br />',
                    '',
                    '',
                    'mw-editbutton-linebreak'
                );

                // gallery
                mw.toolbar.addButton(
                    'https://images.wikia.nocookie.net/central/images/1/12/Button_gallery.png',
                    'Insert a picture gallery',
                    '\n<div style="text-align:center"><gallery>\n',
                    '\n</gallery></div>',
                    'File:Example.jpg|Caption1\nFile:Example.jpg|Caption2',
                    'mw-editbutton-gallery'
                );

                // move edittools expand to end of buttons in oasis editor
                if (conf.skin === 'oasis') {
                    // pass true to .clone() to keep event listeners
                    more = $('.cke_toolbar_expand').clone(true);
                    $('.cke_toolbar_expand').remove();
                    $('.cke_toolbar_source').append(more);
                }
            }
        },

        /**
         * Form for reporting vandals in [[RS:CVU]]
         */
        cvu: {
            conditional: (conf.wgPageName === 'RuneScape:Counter-Vandalism_Unit'),
            scripts: 'MediaWiki:Cvu.js'
        },

        /**
         * Database script
         */
        database: {
            conditional: $('.DBQuery').length,
            scripts: 'MediaWiki:Database.js'
        },

        /**
         * disassembly calculators
         */
        discalc: {
            conditional: $('#dis-calc-table').length && $('#dis-calc-dropdown').length,
            scripts: 'MediaWiki:Common.js/discalc.js'
        },

        /** 
         * Additional tier search functionality for [[Equipment tables]]
         * this hides switchfo entries and the no-JS warning message
         * actual search utilises stewCalc
         */
        equipmentTables: {
            conditional: $('.dplequipmenttable').length,
            exec: function () {
                $('.dplequipmenttable').each(function () {
                    var $eqt = $(this), tmin = parseInt($eqt.attr('data-tiermin'), 10), tmax = parseInt($eqt.attr('data-tiermax'), 10);
                    if (isNaN(tmin)) {
                        if (isNaN(tmax)) {
                            //missing both tmin and tmax, skip the table entirely
                            return;
                        }
                        tmin = 0;
                    }
                    if (isNaN(tmax)) {
                        tmax = 120;
                    }
                    $eqt.find('tr[data-tier]').each(function () {
                        var $tr = $(this), t = parseInt($tr.attr('data-tier'), 10);
                        if (isNaN(t)) {
                            return;
                        }
                        if (t < tmin || t > tmax) {
                            $tr.hide();
                        }
                    });
                });
                //hide no-JS msg and unhide calc
                $('.jshide').hide();
                $('.jsunhide').show();
            }
            
        },

        /**
         * Adds a form for updating exchange data
         */
        exchangeCreate: {
            conditional: (
                (
                    conf.wgUserGroups.indexOf('autoconfirmed') > -1
                ) && (
                    (conf.wgNamespaceNumber === 828 && conf.wgTitle.indexOf('Exchange/') === 0) ||
                    conf.wgNamespaceNumber === 112
                )
            ),
            scripts: 'MediaWiki:Common.js/exchangeCreate.js',
            styles: 'MediaWiki:Common.css/exchangeCreate.css'
        },

        /**
         * Adds an editintro when editing exchange pages
         */
        exchangeIntro: {
            conditional: (
                conf.wgNamespaceNumber === 112 &&
                conf.wgPageName.split('/')[1] === 'Data'
            ),
            scripts: 'MediaWiki:Common.js/exchangeintro.js'
        },

        /**
         * Hides the "< [[BASEPAGE]]" link when the page isn't a true subpage
         * see also [[Category:Pages with technically restricted titles]]
         */
        falseSubpage: {
            conditional: $('.false-subpage').length,
            exec: function () {
                if (conf.skin === 'monobook') {
                    $('#contentSub .subpages').hide();
                } else {
                    var $el = $('.page-header__page-subtitle'),
                        html = $el.html();
                    
                    if (!$el.length) {
                        return;
                    }

                    // test for undefined
                    if (html.search(' \\| ') > -1) {
                        $el.html(
                            html.substring(
                                html.search(' \\| ') + 3,
                                html.length
                            )
                        );
                    } else {
                        $el.hide();
                    }
                }
            }
        },

        /**
         * Exchange data charts
         */
        geCharts: {
            conditional: $('.GEdatachart').length,
            scripts: 'MediaWiki:Common.js/GECharts.js'
        },

        /**
         * Highlight tables
         */
        highlightTable: {
            conditional: $('.lighttable').length,
            scripts: 'MediaWiki:Common.js/highlightTable.js'
        },

        /**
         * Remove the fade animation from mw-collapsible
         */
        instantCollapsible: {
            conditional: $('.mw-collapsible').length,
            scripts: 'MediaWiki:Common.js/instantCollapsible.js'
        },

        /**
         * Script for {{USERNAME}}
         */
        insertUsername: {
            conditional: !!conf.wgUserName,
            exec: function () {
                $('.insertusername').text(conf.wgUserName);
            }
        },
        
        /*
         * Issue form - [[RuneScape:Issues]]
         */
        /*
        issues: {
        	// main, project, file, template, category, update, exchange, charm, calculator, map, transcript
            conditional: [0, 4, 6, 10, 14, 100, 112, 114, 116, 118, 120].includes(conf.wgNamespaceNumber),
            scripts: 'MediaWiki:Common.js/issues.js',
            //styles: 'MediaWiki:Common.css/issues.css'
        },
        */

        /**
         * Compares equipment stats
         */
        itemCompare: {
            conditional: $('.cioCompareLink, .infobox-bonuses').length,
            scripts: 'MediaWiki:Common.js/compare.js',
            styles: 'MediaWiki:Common.css/compare.css'
        },

        /**
         * Monster Kill XP for Infobox Monster new
         */
        killCalc: {
            conditional: $('.infobox-monster').length,
            scripts: 'MediaWiki:Common.js/killCalc.js'
        },

        /**
         * Fight Kiln map interactivity
         */
        kiln: {
            conditional: $('#kilnmap').length,
            scripts: 'MediaWiki:Common.js/kiln.js'
        },
        /**
         * Konami code easter egg
         */
        konami: {
            conditional: true,
            scripts: 'MediaWiki:Common.js/Konami.js'
        },
        
        /**
         * Lazy load base64 images via js
         * 
         * Give the key a generic name in case we decide to do this more often
         */
        lazyImages: {
            conditional: true,
            scripts: 'MediaWiki:Common.js/thgems.js'
        },

        /**
         * Adds calcs to infoboxes
         */
        monsterCalc: {
            conditional: $('#XPEach, #GEPrice, #killXP').length,
            scripts: 'MediaWiki:Monstercalc.js'
        },

        /**
         * Adds calcs to new infoboxes
         */
        infoboxQtyCalc: {
            conditional: $('span.infobox-quantity').length,
            scripts: 'MediaWiki:Common.js/infoboxQty.js'
        },

        /**
         * Hides the mainpage poll results until after a user's vote has been cast
         */
        mainpagePoll: {
            conditional: conf.wgIsMainPage,
            exec: function () {
                $('#mp-poll .pollAnswerVotes').hide();

                var cookieName = 'rs-mp-poll',
                    pollId = $('#mp-poll .ajax-poll').attr('id').split('-')[2];

                function showPoll() {
                    if ($.cookie(cookieName) === pollId) {
                        $('#mp-poll .pollAnswerVotes').show();
                    }
                }

                $('#mp-poll input[type="submit"]').click(function () {
                    $.cookie('rs-mp-poll', pollId, {expires: 365});
                    showPoll();
                });

                showPoll();
            }
        },

        /**
         * Collapses navboxes under certain conditions
         * 
         * @todo Rework this to implement autocollapse better
         *       assuming we still use it, check [[Module:Navbox]]
         */
        navbox: {
            conditional: ($('.navbox').length),
            exec: function () {
                    // should be defined by [[MediaWiki:Collapsible-expand]]
                    // currently hardcoded into template due to wikia bug
                var expand = 'show',
                    $navbox = $('.navbox'),
                    // maximum number of navboxes before they all get collapsed
                    maxShow = 2,
                    // maximum allowable height of navbox before it gets collapsed
                    maxHeight = 300;

                function collapseNavbox(navbox) {
                    var $navbox = $(navbox),
                        $rows,
                        $toggle;

                    if ($navbox.hasClass('mw-collapsed') || $navbox.hasClass('navbox-uncollapsed')) {
                        return;
                    }

                    // add the collapsed class
                    $navbox.addClass('mw-collapsed');

                    // make sure we aren't selecting any nested navboxes
                    $rows = $navbox.find('> tbody > tr');

                    $rows.each(function (i) {
                        // first row is the header
                        if (i === 0) {
                            return;
                        }

                        $(this).hide();
                    });

                    // toggle is always in header
                    $toggle = $rows.first().find('.mw-collapsible-toggle');

                    // this class is required to make expand work properly
                    $toggle.addClass('mw-collapsible-toggle-collapsed');
                    $toggle.children('a').text(expand);

                }

                // collapse if more than `maxShow`
                if ($navbox.length > (maxShow - 1)) {
                    $navbox.each(function () {
                        collapseNavbox(this);
                    });
                }

                // collapse if taller than `maxHeight`
                $navbox.each(function () {
                    if ($(this).height() > maxHeight) {
                        collapseNavbox(this);
                    }
                });
            }
        },

        /**
         * Lists namespace numbers at [[MediaWiki:Namespace numbers]]
         */
        nsNumbers: {
            conditional: (conf.wgPageName === 'MediaWiki:Namespace_numbers'),
            scripts: 'MediaWiki:Common.js/namespaceNumbersList.js'
        },

        /**
         * Peng hunting highlight table
         */
        pengLocations: {
            conditional: (
                [
                    'Distractions_and_Diversions/Locations',
                    'Distractions_and_Diversions/Locations/Penguin_Hide_and_Seek'
                ].indexOf(conf.wgPageName) > -1
            ),
            scripts: 'MediaWiki:Common.js/pengLocations.js'
        },

        /**
         * Ratings sidebar module (oasis)
         */
        ratings: {
            conditional: (
                conf.skin === 'oasis' &&
                conf.wgAction === 'view' &&
                conf.wgNamespaceNumber === 0
            ),
            scripts: 'MediaWiki:Wikia.js/ratings.js'
        },

        /**
         * Script for [[RuneScape:RC patrol]]
         */
        rcPatrol: {
            conditional: (conf.wgPageName === 'RuneScape:RC_Patrol'),
            scripts: 'MediaWiki:Rcpatrol.js',
            styles: 'MediaWiki:Rcp.css'
        },

        /**
         * Replaces URLs to the target page name when accessed through a redirect
         *
         * @todo Retain hashes and params (except title params)
         */
        replaceRedirect: {
            conditional: !!conf.wgRedirectedFrom,
            exec: function () {
                var newUrl = conf.wgServer +
                        conf.wgArticlePath.replace('$1', conf.wgPageName) +
                        location.search +
                        location.hash;

                history.replaceState(
                    history.state,
                    document.title,
                    newUrl
                );
            }
        },

        /**
         * Revolution calculator
         */
        revolution: {
            conditional: (conf.wgPageName === 'Calculator:Revolution'),
            scripts: 'MediaWiki:Common.js/revocalc.js',
            styles: 'MediaWiki:Common.css/revocalc.css'
        },

        /**
         * Scale up images for users with higher resolutions
         */
        scaleImgs: {
            conditional: matchMedia('(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 1.5dppx)').matches,
            exec: function () {
                $('img').each(function () {
                    var $this = $(this);

                    function repl(_, p1) {
                        var num = parseInt(p1, 10);
                        return '/scale-to-width-down/' + (num * 2);
                    }

                    if ($this.hasClass('lzy') && !$this.hasClass('lzyLoaded')) {
                        $this.attr(
                            'data-src',
                            $this.attr('data-src').replace(/\/scale-to-width-down\/(\d+)/, repl)
                        );
                    } else {
                        $this.attr(
                            'src',
                            $this.attr('src').replace(/\/scale-to-width-down\/(\d+)/, repl)
                        );
                    }
                });
            }
        },

        /**
         * Custom oasis sidebar module(s)
         */
        sidebar: {
            conditional: (conf.skin === 'oasis' && conf.wgAction === 'view'),
            scripts: 'MediaWiki:Wikia.js/sidebar.js'
        },

        /**
         * Signature reminder on forum and talk pages
         */
        sigReminder: {
            conditional: (
                editActions.indexOf(conf.wgAction) > -1 &&
                (conf.wgNamespaceNumber % 2 === 1 || conf.wgNamespaceNumber === 110)
            ),
            exec: function () {
                $('#wpSave').click(function (e) {
                    var text = $('#wpTextbox1').val(),
                        reminder = 'It looks like you forgot to sign your comment. You can sign by placing 4 tildes (~~~~) to the end of your message.\nAre you sure you want to post it?';

                    if (
                        // don't trigger on minor edits
                        $('#wpMinoredit').prop('checked') ||

                        // check for signature
                        text.replace(/(<nowiki>.*?<\/nowiki>)/g, '').match('~~~') ||

                        // check for &undo= or ?undo= in URL as summary can be altered
                        mw.util.getParamValue('undo') ||

                        // check for user welcome notice in edit summary
                        // since those often don't need signatures
                        $('#wpSummary').val().match(/welcome/i)
                    ) {
                        return;
                    }

                    mw.log('sigreminder activated');

                    if (!confirm(reminder)) {
                        mw.log('prevent no sig');
                        e.preventDefault();
                    }
                });
            }
        },

        /**
         * Makes interactive skill training guides interactive
         */
        skillGuide: {
            conditional: $('.skillguide').length,
            scripts: 'MediaWiki:Calc.js'
        },

        /**
         * Redirects skin.js/css to correct skin name
         */
        skinRedirect: {
            conditional: (conf.wgUserName && conf.wgNamespaceNumber === 2),
            exec: function () {
                var skinpage = '/' + conf.skin.replace('oasis', 'wikia') + '.',
                    pagename = 'User:' + conf.wgUserName.replace(/ /g, '_') + '/skin.';

                switch (conf.wgPageName) {
                    case pagename + 'js':
                        location.replace(
                            location.href.replace(/\/skin\.js/i, skinpage + 'js')
                        );
                        break;

                    case pagename + 'css':
                        location.replace(
                            location.href.replace(/\/skin\.css/i, skinpage + 'css')
                        );
                        break;
                }
            }
        },

        /**
         * Adds a report of special maintenance pages to
         * [[Special:SpecialPages]] and [[RS:MAINTENANCE]]
         */
        spReport: {
            conditional: (
                conf.wgCanonicalSpecialPageName === 'Specialpages' ||
                $('.specialMaintenance').length
            ),
            scripts: 'MediaWiki:Common.js/spreport.js'
        },

        /**
         * Script for {{switch infobox}} and [[Module:Infobox]]
         */
        switchInfobox: {
            conditional: $('.switch-infobox').length || $('.infobox-buttons').length,
            scripts: 'MediaWiki:Common.js/switchInfobox.js'
        },

        /**
         * More calculators
         */
        stewCalc: {
            conditional: $('.jcInput, [class*="jcPane"], .skiplinkcontainer').length,
            scripts: 'MediaWiki:Common.js/calc2.js'
        },

        /**
         * expanded tablesorter
         */
        tablesorter2: {
            conditional: $('.sortable2').length,
            scripts: 'MediaWiki:Common.js/tablesorter2.js'
        },
        /**
         * Prevents uploading videos through youtube tags
         * by switching them to {{youtube}}
         */
        tagSwitch: {
            conditional: (editActions.indexOf(conf.wgAction) > -1),
            exec: function () {
                $('#wpSave').click(function () {
                    // Stop it changing the docs on here (monobook issue)
                    if (conf.skin === 'monobook' && /\.js$/.test(conf.wgTitle)) {
                        return;
                    }

                    var wikitext = $('#wpTextbox1')
                        .val()
                        // @todo can these be condensed down into a callback for .replace() ?
                        .replace(/<youtube>/g, '{{youtube|')
                        .replace(
                            /<youtube(?:\s*)height="(\d*)"(?:\s*)>/g,
                            '{{youtube|height=$1|'
                        )
                        .replace(
                            /<youtube(?:\s*)width="(\d*)"(?:\s*)>/g,
                            '{{youtube|width=$1|'
                        )
                        .replace(
                            /<youtube(?:\s*)height="(\d*)"(?:\s*)width="(\d*)"(?:\s*)>/g,
                            '{{youtube|height=$1|width=$2|'
                        )
                        .replace(
                            /<youtube(?:\s*)width="(\d*)"(?:\s*)height="(\d*)"(?:\s*)>/g,
                            '{{youtube|height=$2|width=$1|'
                        )
                        .replace(/<\/youtube>/g, '}}');

                    $('#wpTextbox1').val(wikitext);
                });
            }
        },

        /**
         * Makes the disambiguation parenthesis grey
         * See also [[Template:Parentitle override]]
         */
        titleParenthesis: {
            conditional: (
                conf.wgNamespaceNumber === 0 &&
                conf.wgTitle.lastIndexOf('(') > -1 &&
                !$('.no-parenthesis-style').length
            ),
            exec: function () {
                    // use the title in the DOM so this respects DISPLAYTITLE
                var title = $('.page-header__title, h1#firstHeading').text(),
                    start = title.lastIndexOf('('),
                    end = title.substring(start, title.length).lastIndexOf(')');
                    
                // add offset here
                end += start + 1;

                //  oasis & monobook
                $('.page-header__title, h1#firstHeading')
                    .empty()
                    .append(
                        title.substring(0, start),
                        $('<span>')
                            .addClass('title-parenthesis')
                            .text(title.substring(start, end)),
                        title.substring(end, title.length)
                    );
            }
        },
        // javascript tooltips
        tooltips: {
            conditional: $('.js-tooltip-wrapper').length && $('.js-tooltip-click').length,
            scripts: 'MediaWiki:Common.js/tooltips.js'
        },
        
        /**
         * Moves icons from [[Template:External]] outside #mw-content-text to get around alignment issues
         * Modification to header allowed per http://archive.is/TW9fq and zd#334064.
         *
         * @notes Requires additional CSS in [[MediaWiki:Custom-Common.less/external.less]]
         *
         * @author The 888th Avatar (Avatar Wiki)
         * @author Cqm
         */
        topIcon: {
            conditional: $('.topright-icon').length,
            exec: function () {
                var $icons = $('<div>').attr('id', 'rs-header-icons');

                // there's no class on this div, but it should end up after the language
                // dropdown if it's present or where the dropdown would be if not
                $('.page-header__contribution > div').first().append($icons);

                $('.topright-icon').each(function () {
                    $icons.append($(this).html());
                });
            }
        },

        /**
         * Adds an editintro when editing update pages
         */
        updateIntro: {
            conditional: (conf.wgNamespaceNumber === 100),
            scripts: 'MediaWiki:Common.js/updateintro.js'
        },

        /**
         * Adds a timer to [[Warbands]]
         */
        warbandsTimer: {
            conditional: $('#wb-timer').length,
            scripts: 'MediaWiki:Common.js/warbandstimer.js'
        },

        /**
         * Adds a timer to [[Supply run]]
         */
        supplyrunTimer: {
            conditional: $('#sr-timer').length,
            scripts: 'MediaWiki:Common.js/supplyruntimer.js'
        },

        /**
         * Add edit links to [[Special:WhatLinksHere]]
         *
         * @todo Move to gadget
         */
        wlhEdit: {
            conditional: (conf.wgCanonicalSpecialPageName === 'Whatlinkshere'),
            scripts: 'MediaWiki:Common.js/WLH_edit.js'
        },

        /**
         * Youtube embedding
         */
        youtube: {
            conditional: $('.youtube').length,
            scripts: 'MediaWiki:Common.js/youtube.js'
        },

        /**
         * Fix group pages
         * Only need JS because CSS still works
         *
         * Because Wikia broke it on purpose in August '16 and it's still broken 10 months later
         */
        groupAutoconfirmed: {
            conditional: conf.wgUserGroups.indexOf('autoconfirmed') > -1,
            scripts: 'MediaWiki:Group-autoconfirmed.js'
        },

        groupCustodian: {
            conditional: conf.wgUserGroups.indexOf('custodian') > -1,
            scripts: 'MediaWiki:Group-custodian.js'
        },

        groupSysop: {
            conditional: conf.wgUserGroups.indexOf('sysop') > -1,
            scripts: 'MediaWiki:Group-sysop.js'
        }
    };

    // variables used by `init`
    // @todo move to there?
    var scripts = [],
        styles = [],
        loaded = [],
        expose = {};

    /**
     * Helper function to normalise arguments passed to `util.loadAssets`
     *
     * @param js {object|array|string}
     * @param css {undefined|array|string}
     * @return {object}
     */
    function normaliseArgs(js, css) {
        // set defaults so it silently fails later on
        var ret = {
            js: [],
            css: []
        };

        // stop here and silently fail if neither are defined
        if (js === undefined && css === undefined) {
            return ret;
        }

        // normalise args to an object
        if ($.isPlainObject(js)) {
            ret.js = js.js;
            ret.css = js.css;
        } else {
            ret.js = js;
            ret.css = css;
        }

        // map strings to one element arrays
        // map undefined and all other unrecognised type keys to empty arrays
        if (typeof ret.js === 'string') {
            ret.js = [ret.js];
        } else if (!Array.isArray(ret.js)) {
            ret.js = [];
        }

        if (typeof ret.css === 'string') {
            ret.css = [ret.css];
        } else if (!Array.isArray(ret.css)) {
            ret.css = [];
        }

        return ret;
    }

    /**
     * Used to detect incorrectly spelt keys for each include
     *
     * @param obj {object}
     * @param key {string}
     */
    function checkKeys(obj, key) {
        var inclKeys = Object.keys(obj),
            allowedKeys = ['conditional', 'scripts', 'styles', 'expose', 'exec'];

        allowedKeys.forEach(function (elem) {
            var index = inclKeys.indexOf(elem);

            if (index > -1) {
                inclKeys.splice(index, 1);
            }
        });

        if (inclKeys.length) {
            console.warn(
                'Error in MediaWiki:Common.js: `includes.' +
                key + '` contains unknown key(s): ' + inclKeys.toString()
            );
        }
    }

    /**
     * Loading method
     *
     * Iterates over each entry in `includes` to check if the script should be imported
     * And then imports each approved script in one HTTP request
     *
     * This also maintains backwards compatibility with older versions of this page
     * @todo remove the backwards compatibility when each dependent script has been updated
     */
    function init() {
        $.each(includes, function (k, v) {

            var check = $.isFunction(v.conditional) ?
                v.conditional() :
                v.conditional;

            if (check) {

                // used for tracking which includes are loading
                loaded.push('common.' + k);

                if (v.scripts) {
                    scripts = scripts.concat(v.scripts);
                }

                if (v.styles) {
                    styles = styles.concat(v.styles);
                }

                if (v.exec) {
                    v.exec();

                    if (v.expose) {
                        expose[k] = v.exec;
                    }
                }

            }

            checkKeys(v, k);
        });


        $.extend(rs, util, expose);
        rs.loaded = (rs.loaded || []).concat(loaded);
        
        if (conf.debug) {
            // keep this hidden most of the time so it doesn't cause confusion with rs.loaded
            rs.loadedAssets = loadedAssets;
        }

        // add rs as a global alias
        window.rs = rs;

        // load our script and styles
        util.loadAssets({
            js: scripts,
            css: styles
        });

    }

    $(init);

}(this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {}));