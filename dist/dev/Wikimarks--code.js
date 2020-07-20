/**
 * Wikimarks v2
 * Replaces the original version following it being broken by verbatim being disabled
 *
 * @author Pecoes <https://c.fandom.com/wiki/User:Pecoes>
 * @author Cqm    <https://c.fandom.com/wiki/User:Cqm>
 *
 * Changes from the original:
 * - No longer uses verbatim, thus should be more stable.
 * - No longer allows javascript: URLs (and thus custom functions)
 * - Supports wikitext as well as (most of) the old syntax
 *
 * New Wiki Nav Todos:
 * - Cleanup CSS when current wikinav is retired
 * - Test for touchscreens?
 * - Fix nav submenu alignment
 * - Fix for the new new navigation
 */

/*global importArticle */

/*jshint
    bitwise:true, camelcase:true, curly:true, eqeqeq:true, es3:false,
    forin:true, immed:true, indent:4, latedef:true, newcap:true,
    noarg:true, noempty:true, nonew:true, plusplus:true, quotmark:single,
    undef:true, unused:true, strict:true, trailing:true,
    browser:true, devel:false, jquery:true,
    onevar:true
*/

;(function ($, mw, dev) {
    'use strict';

    var conf = mw.config.get([
            'stylepath',
            'wgPageName',
            'wgScriptPath',
            'wgServer',
            'wgUserName'
        ]),

        testUser = false;

    /**
     * Insert Wikimarks into the DOM and attach the relevant events
     */
    function addHtml($menu) {
        var $wikimarks = $('.wikimarks');

        $wikimarks.find('> .wds-dropdown > .wds-tabs__tab-label > a').append(
            '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><path id="dropdown-tiny" d="M6 10a.997.997 0 0 1-.707-.293l-4-4A1 1 0 0 1 2 4h8a1 1 0 0 1 .707 1.707l-4 4A.997.997 0 0 1 6 10z"/></path></svg>'
        );

        $wikimarks.children('.wds-dropdown').append($menu);

        $wikimarks
            .css('background-image', 'none')
            .find('.wds-tabs__tab-label > a').css('visibility', 'visible');

        // everything is now done
        // so fire an event so people can interact/extend it further
        mw.hook('wikimarks.loaded').fire($wikimarks);
    }


    /**
     * Prepare the parsed HTML and attach to the DOM
     */
    function prepareHtml(html) {
        var $menu = $('<div>')
                .addClass('wds-is-not-scrollable wds-dropdown__content')
                .append(html);

        // add classes to elements
        $menu
            .children('ul')
                .addClass('wds-list wds-is-linked wds-has-bolded-items')
                .children('li')
                    .children('a')
                        .siblings('ul')
                            .wrap('<div class="wds-is-not-scrollable wds-dropdown-level-2__content"></div>')
                            .addClass('wds-list wds-is-linked')
                            .children('li')
                                .children('a')
                                .siblings('ul')
                                    .wrap('<div class="wds-is-not-scrollable wds-dropdown-level-3__content"></div>')
                                    .addClass('wds-list wds-is-linked')
                                    .children('li')
                                        .children('a');

        // add chevrons
        $menu.find('.wds-dropdown-level-2__content').siblings('a').each(function () {
            var $this = $(this),
                chevron = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown-chevron" id="wds-icons-menu-control-tiny"><path d="M11.707 3.293a.999.999 0 0 0-1.414 0L6 7.586 1.707 3.293A.999.999 0 1 0 .293 4.707l5 5a.997.997 0 0 0 1.414 0l5-5a.999.999 0 0 0 0-1.414" fill-rule="evenodd"></path></svg>';

            $this.append(chevron);
            $this.addClass('wds-dropdown-level-2__toggle');
            $this.parent('li').addClass('wds-dropdown-level-2');
            
        });

        $menu.find('.wds-dropdown-level-3__content').siblings('a').each(function () {
            var $this = $(this),
                chevron = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown-chevron" id="wds-icons-menu-control-tiny"><path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.707a.999.999 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A.999.999 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd"></path></svg>';

            $this.append(chevron);
            $this.addClass('wds-dropdown-level-3__toggle');
            $this.parent('li').addClass('wds-dropdown-level-3');
        });

        // add sticked to parent class for level 3 submenus
        $.unique($menu.find('.wds-dropdown-level-2').parent()).each(function () {
            $(this).children().each(function (i) {
                var $this = $(this),
                    $list;

                if ($this.hasClass('wds-dropdown-level-2')) {
                    $list = $this.find('> .wds-dropdown-level-2__content > .wds-list');

                    if (($list.children().length - 1) < i) {
                        $this.addClass('wds-is-sticked-to-parent');
                    }
                }
            });
        });

        // add sticked to parent class for level 4 submenus
        $.unique($menu.find('.wds-dropdown-level-3').parent()).each(function () {
            $(this).children().each(function (i) {
                var $this = $(this);

                if ($this.hasClass('wds-dropdown-level-3')) {
                    if (($this.find('.wds-list').children().length - 1) < i) {
                        $this.addClass('wds-is-sticked-to-parent');
                    }
                }
            });
        });

        // remove href from text converted to links
        $menu.find('a[href="' + conf.wgScriptPath + '/wiki/"]')
            .removeAttr('href')
            .css('cursor', 'pointer');


        $menu.find('a')
            // titles don't add annything to the links
            .removeAttr('title')
            // remove external link class for ease of reading the source html
            .removeClass('extiw');

        // kill chat opening in a new window
        $menu.find('.WikiaChatLink').removeClass('WikiaChatLink');

        if (testUser) {
            return;
        }

        addHtml($menu);
    }

    /**
     * Pass the preprocess wikimarks to action=parse to be converted into wikitext
     */
    function parseWikimarks(data) {
        var params = {
            action: 'parse',
            prop: 'text',
            text: data
        };

        (new mw.Api())
            .post(params)
            .done(function (data) {
                var text = data.parse.text['*'];

                // remove preprocessor comment
                // should be able to hide it in api config
                // but that's broken in mw1.19
                text = text.replace(/<!--[\s\S]*?-->/g, '').trim();

                if (testUser) {
                    mw.log(text);
                }

                prepareHtml(text);
            });
    }

    /**
     * Preprocesses a wikimarks page to make it compatible with the wikitext parser
     */
    function preprocessData(data) {
        data = data.trim().split(/\n+/);

        var invalidLink = false,
            parsed = [],
            // handles /wiki/, index.php, api.php, wikia.php and /d (discussions)
            relativeUrlRe = /\/(wiki\/|(?:index|api|wikia)\.php|d)/;

        data.forEach(function (elem) {
            // ignore comments
            if (elem.indexOf('//') === 0 || elem.indexOf('#') === 0) {
                return;
            }

            // handle external links
            elem = elem.replace(/^(\*+)\s*\[([^\s]+)\s+(.+?)\]\s*$/, function (_, p1, p2, p3) {
                // handle query strings
                if (p2.indexOf('?') === 0) {
                    return p1 + '[{{fullurl:' + conf.wgPageName + '|' + p2.slice(1) + '}} ' + p3 + ']';
                }

                // allow appending to existing query strings as well
                if (p2.indexOf('&') === 0) {
                    return p1 + '[' + location.href + p2 + ' ' + p3 + ']';
                }

                // handle relative URLs
                if (p2.search(relativeUrlRe) === 0) {
                    p2 = conf.wgServer + conf.wgScriptPath + p2;
                }

                // else just return it unchanged
                return p1 + ' [' + p2 + ' ' + p3 + ']';
            });

            // don't touch raw html
            // assumes that all html will begin with a tag, e.g. <span...
            if (!/^\*+\s*</.test(elem)) {
                // parse old style links to wikitext for backwards compatibility
                elem = elem.replace(/^(\*+)\s*([^\[]+?)\s*=\s*(.+?)\s*$/, function (_, p1, p2, p3) {
                    // handle absolute URLs
                    // 'http://' or 'https://' or '//'
                    if (p3.search(/(?:https?:)?\/\//) === 0) {
                        return p1 + ' [' + p3 + ' ' + p2 + ']';
                    }

                    // handle query strings
                    if (p3.indexOf('?') === 0) {
                        return p1 + '[{{fullurl:' + conf.wgPageName + '|' + p3.slice(1) + '}} ' + p2 + ']';
                    }

                    // allow appending to existing query strings as well
                    if (p2.indexOf('&') === 0) {
                        return p1 + '[' + location.href + p2 + ' ' + p3 + ']';
                    }

                    // attempt to fix instances of Foo?bar=baz
                    // domain added below
                    if (p3.indexOf('?') > -1) {
                        p3 = '/wiki/' + p3;
                    }

                    // handle relative URLs
                    if (p3.search(relativeUrlRe) === 0) {
                        p3 = conf.wgServer + conf.wgScriptPath + p3;
                        return p1 + ' [' + p3 + ' ' + p2 + ']';
                    }

                    // ## BREAKING CHANGE ##
                    // don't allow 'javascript:' urls
                    // ridiculously difficult to parse these in js without using `eval`
                    if (p3.search(/(?:javascript:)?(?:url|win)\(/) === 0) {
                        p3 = '#invalidLink';
                        invalidLink = true;
                    }

                    // else we expect a normal wikilink
                    return p1 + ' [[' + p3 + '|' + p2 + ']]';
                });
            }

            // remove css comment
            // caused by loading wikimarks config through RL and pretending it's CSS
            if (elem.search(/^\/\*.+?\*\/$/) === 0) {
                elem = '';
            }

            // substitute in global variables
            // syntax: {$VAR} where VAR is a global variable
            // @todo limit to stuff available in mw.config?
            elem = elem.replace(/\{\$(.+?)\}/g, function (_, p1) {
                // fix for properties of globals
                var parts = p1.split('.'),
                    test = window,
                    prop,
                    i;

                for (i = 0; i < parts.length; i += 1) {
                    prop = parts[i];

                    // @todo how secure is this?
                    if (test.hasOwnProperty(prop)) {
                        test = test[prop];
                    } else {
                        break;
                    }
                }

                if (['string', 'number'].indexOf(typeof test) > -1) {
                    return test;
                }
            });

            // make simple text strings into a null link so it doesn't break the styling
            elem = elem.replace(/^(\*+)\s*([A-Za-z0-9\s]+)\s*$/, '$1 [[#|$2]]');

            parsed.push(elem);
        });

        data = parsed.join('\n').trim();
        mw.log(data);

        if (invalidLink) {
            // @todo do something
        }

        return data;
    }

    /**
     * Load the users wikimarks
     */
    function loadWikimarks(username) {
        var load = mw.util.wikiScript('load'),
            params = {
                mode: 'articles',
                only: 'styles',
                debug: 'true',
                // don't encode anything in the username here, $.get does it anyway
                // otherwise stuff gets encoded twice and no results are returned
                articles: 'u:dev:User:' + (username || conf.wgUserName).replace(/ /g, '_') + '/Wikimarks'
            };

        if (username) {
            testUser = true;
        }

        mw.log('params', params);

        $.get(load, params).done(function (data) {
            if (!data) {
                // just in case there was an error in the api request
                mw.log(this);
            }

            data = preprocessData(data);
            parseWikimarks(data);
        });
    }

    /**
     * Shows loading status until the wikimarks have loaded
     */
    function showLoading() {
        var $nav = $('.wds-community-header__local-navigation .wds-tabs'),
            $li = $('<li>');

        $li.addClass('wds-tabs__tab wikimarks')
            .css({
                backgroundImage: 'url("' + conf.stylepath + '/common/images/ajax.gif")',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            })
            .append(
                $('<div>')
                    .addClass('wds-dropdown')
                    .append(
                        $('<div>')
                            .addClass('wds-tabs__tab-label wds-dropdown__toggle')
                            .append(
                                $('<a>')
                                    .attr(
                                        'href',
                                        'https://dev.fandom.com/wiki/User:' + conf.wgUserName + '/Wikimarks'
                                    )
                                    .css('visibility', 'hidden')
                                    .append(
                                        $('<span>')
                                            .text('WIKIMARKS')
                                    )
                            )
                    )
            );

        // hide the explore tab (the new "on the wiki" tab)
        // TODO: send in a ticket to get a class for this
        //       as it feels super fragile
        $('.wds-tabs__tab-label.wds-dropdown__toggle').last().hide();
        $nav.find('.pph-local-nav-explore').hide();
        // add our new tab to the start of the nav
        $nav.prepend($li);
    }

    /**
     * Load stylesheets
     */
    function loadStyles() {
        importArticle({
            'type': 'style',
            'article': 'u:dev:MediaWiki:Wikimarks.css'
        });

        $.ajax({
            url: mw.config.get('wgLoadScript'),
            data: {
                mode: 'articles',
                only: 'scripts',
                articles: 'u:dev:Colors/code.js'
            },
            dataType: 'script',
            cache: true
        }).done(function () {
            var c = dev.colors,
                w = c.wikia,
                p = c.parse(w.page),
                bgColor;

            if (p.isBright()) {
                if (p.lightness() > 0.9) {
                    bgColor = '#fff';
                } else {
                    bgColor = p.mix('#000', 90).hex();
                }
            } else {
                bgColor = p.mix('#fff', 90).hex();
            }


            mw.util.addCSS(
                '.wds-community-header .wds-dropdown__content .wds-list.wds-is-linked .wds-dropdown-level-3 .wds-dropdown-level-3__content { background-color: ' + bgColor + '; border-color: ' + w.border + '; color: ' + w.text + '; }'
            );
        });
    }

    /**
     * Checks for the correct environment before allowing the script to continue
     */
    function init() {
        // prevent anyone trying to load this for anons
        if (!conf.wgUserName) {
            return;
        }

        if (!$('.wds-community-header__local-navigation').length) {
            mw.log('Wikimarks: wikinav not found, aborting...');
            return;
        }
        
        loadStyles();
        showLoading();
        loadWikimarks();
    }

    mw.loader.using(['mediawiki.api', 'mediawiki.util'], function () {
        $(init);
    });

    dev.loadWikimarks = loadWikimarks;

}(this.jQuery, this.mediaWiki, this.dev = this.dev || {}));