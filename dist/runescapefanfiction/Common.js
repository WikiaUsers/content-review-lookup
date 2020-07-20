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
 
/*global window, importArticles */
 
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
     * For a full list of available variables see <http://www.mediawiki.org/wiki/Manual:Interface/JavaScript#mw.config>
     */
    var conf = mw.config.get([
        'debug',
        'skin',
        'wgAction',
        'wgCanonicalSpecialPageName',
        'wgNamespaceNumber',
        'wgPageName',
        'wgTitle',
        'wgUserName',
        'wgUserGroups'
    ]);
 
    /**
     * Reusable functions
     *
     * These are available under the `rswiki` global variable
     * @example `rswiki.addCommas`
     *
     * Deprecated functions have been mapped to modern counterparts where applicable
     *
     * @todo Use mw.log.deprecate when we get access to it
     *       In the mean time find a way to add a stacktrace
     */
    var util = {
        /**
         * Adds commas to a number string
         *
         * @example 123456.78 -> 123,456.78
         *
         * @param num {number|string} A number to add commas to
         *
         * @returns {string} The number with commas
         */
        addCommas: function (num) {
            num += '';
 
            var x = num.split('.'),
                x1 = x[0],
                x2 = x.length > 1
                    ? '.' + x[1]
                    : '',
                rgx = /(\d+)(\d{3})/;
 
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1,$2');
            }
 
            return x1 + x2;
        },
 
        /**
         * Extracts parameter-argument pairs from templates
         *
         * @todo Fix for multiple templates
         *
         * @param tpl {string} Template to extract data from
         * @param text {string} Text to look for template in
         *
         * @return {object} Object containing parameter-argument pairs
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
         * Alternate version of `parseTemplate` for parsing exchange module data
         *
         * Only works for key-value pairs
         * but that'll do for exchange modules
         *
         * @param text {string} Text to parse
         *
         * @return {object} Object containing parameter-argument pairs
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
         * For autosorting sortable tables
         * @example <http://rs.wikia.com/?oldid=11201653>
         */
        autosort: {
            conditional: $('.sortable').length,
            expose: true,
            exec: function () {
                mw.loader.using('jquery.tablesorter', function () {
                    $('.sortable[class*="autosort="]').each(function (i) {
                        var $this = $(this),
                            /*
                            // @todo test this
                            matched = ( ' ' + $( this ).attr( 'class' ) + ' ' )
                                .match( /autosort=(\d+)[,-]{1}(a|d)/ ),
                            */
                            matched = /(?:^| )autosort=(\d+)(?:,|-)(a|d)(?: |$)/.exec(
                                $this.attr('class')
                            ),
                            /*
                            // @todo test this
                            $sortCol = $this
                                .find( '> thead th nth-child( ' + matched[1] + ')' )
                                .eq( i );
                            */
                            $sortCol = $this
                                .find('> thead th:nth-child(' + matched[1] + ')')
                                .eq(i);
 
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
         * Hides the "< [[BASEPAGE]]" link when the page isn't a true subpage
         * see also [[Category:Pages with technically restricted titles]]
         */
        falseSubpage: {
            conditional: $('.false-subpage').length,
            exec: function () {
                $('#contentSub .subpages').hide(); //monobook skin
                //wikia skin
                var el = $('#WikiaPageHeader > div > div.header-column.header-title > h2');
                if (el.length && window.wgRedirectedFrom === undefined) {
                    el.hide();
                } else {
                    el.html(el.html().substring(el.html().search(' \\| ') + 3, el.html().length));
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
         * Semi-automatic exchange updating
         */
        gemwUpdate: {
            conditional: (conf.wgNamespaceNumber === 112),
            scripts: 'MediaWiki:Common.js/gemwupdate.js'
        },
 
		statCalculator: {
			conditional: $('.statCalculator').length,
			scripts: 'MediaWiki:Common.js/CalculateStats.js'
		},
 
		/**
		 * Overlays for both Rarity and name notes in a dropsline
		 */
		dropsLineNotes: {
			conditional: $('.DropsLineNotes').length,
			scripts: 'MediaWiki:Common.js/DropsLineNotes.js'
		},
 
        /**
         * Highlight tables
         */
        highlightTable: {
            conditional: $('.lighttable').length,
            scripts: 'u:runescape:MediaWiki:Common.js/highlightTable.js'
        },
 
        /**
         * Remove the fade animation from mw-collapsible
         */
        instantCollapsible: {
            conditional: $('.mw-collapsible').length,
            scripts: 'u:runescape:MediaWiki:Common.js/instantCollapsible.js'
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
 
        /**
         * Compares equipment stats
         */
        itemCompare: {
            conditional: $('.cioCompareLink, .infobox-bonuses').length,
            scripts: 'MediaWiki:Common.js/compare.js',
            styles: 'MediaWiki:Common.css/compare.css'
        },
 
		/**
		 * Calculates average profit from killing a monster
		 */
		expectedProfitPerKill: {
			conditional: $( '.expectedProfitPerKill' ).length,
			scripts: 'MediaWiki:Common.js/ExpectedProfitPerKill.js'
		},
 
        /**
         * Collapses navboxes under certain conditions
         */
        navbox: {
            conditional: (conf.wgNamespaceNumber === 0 && $('.navbox').length),
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
 
                    if ($navbox.hasClass('mw-collapsed')) {
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
            scripts: 'u:runescape:MediaWiki:Common.js/namespaceNumbersList.js'
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
                        // @todo Use mw.util.getParamValue here
                        location.search.match(/[\?&]undo=/) ||
 
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
         * Redirects skin.js/css to correct skin name
         */
        skinRedirect: {
            conditional: (conf.wgUserName && conf.wgNamespaceNumber === 2),
            exec: function () {
                    // @todo this might need to be replaced with venus at some point
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
         * Script for {{switch infobox}}
         */
        switchInfobox: {
            conditional: $('.switch-infobox').length,
            scripts: 'MediaWiki:Common.js/SwitchInfobox.js'
        },
 
        /**
         * More calculators
         */
        stewCalc: {
            conditional: $('.jcInput, [class*="jcPane"], .skiplinkcontainer').length,
            scripts: 'u:runescape:User:Stewbasic/calc.js'
        },
 
		/**
         * makes the disambiguation parenthesis grey
         */
        titleParenthesis: {
            conditional: conf.wgNamespaceNumber === 0 && conf.wgTitle.search('\\(') > -1 && $('.no-parenthesis-style').length === 0,
            exec: function () {
                var st = conf.wgTitle.search('\\(');
                //  wikia skin,   monobook skin
                $('.header-title h1, h1#firstHeading').html(conf.wgTitle.substring(0,st) + '<span class="title-parenthesis">' + conf.wgTitle.substring(st, conf.wgTitle.length) + '</span>');
            }
        },
        /**
         * Moves topicons outside #mw-content-text to get around alignment issues
         */
        topIcon: {
            conditional: $('.topright-icon').length,
            exec: function () {
                // insert container into pageheader
                $('#firstHeading, #WikiaPageHeader').append(
                    $('<div>').attr('id', 'rs-header-icons')
                );
 
                var $icons = $('#rs-header-icons');
 
                $('.topright-icon').each(function () {
                    $icons.append($(this).html());
                });
            }
        }
    };
 
    var scripts = [],
        styles = [],
        loaded = [],
        expose = {};
 
    /**
     * Used to detect incorrectly spelt keys for each include
     *
     * @param obj {object}
     * @param key {string}
     */
    function checkKeys(obj, key) {
        var inclKeys = Object.keys(obj),
            allowKeys = ['conditional', 'scripts', 'styles', 'expose', 'exec'];
 
        allowKeys.forEach(function (elem) {
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
 
            var check = $.isFunction(v.conditional)
                ? v.conditional()
                : v.conditional;
 
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
 
        // add rs as a global alias
        window.rs = rs;
 
        // load stylesheets before scripts
        importArticles({
            type: 'style',
            articles: styles
        }, {
            type: 'script',
            articles: scripts
        });
 
    }
    $(init);
 
}(this.jQuery, this.mediaWiki, this.rswiki = this.rswiki || {}));