/**
 * LESS GUI for Fandom wikis
 *
 * Adds support for using LESS on MediaWiki and an interface for compiling LESS to CSS
 *
 * This script uses a modified version of less.js
 * @link <https://github.com/less/less.js> less.js source (original)
 * @link <http://lesscss.org/> less.js documentation
 * @link <https://dev.fandom.com/wiki/Less/less.js> less.js source (modified)
 *
 * @author Cqm
 * @version 2.4.0
 * @copyright (C) Cqm 2018 <cqm.fwd@gmail.com>
 * @license GPLv3 <https://www.gnu.org/licenses/gpl-3.0.html>
 * @link <https://dev.fandom.com/wiki/Less> Documentation
 *
 * @notes <https://phabricator.wikimedia.org/T56864> native support for this
 * @todo Add support for less files across fandom
 *       @example @import 'u:dev:MediaWiki:Foo.less';
 *       only support url syntax rather than w:c:foo...
 *       will require looking up files through api
 *       meaning a more substantial rewrite of less.js source
 */

/* jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, es3:false,
    forin:true, immed:true, indent:4, latedef:true, newcap:true,
    noarg:true, noempty:true, nonew:true, plusplus:true, quotmark:single,
    undef:true, unused:true, strict:true, trailing:true,
    browser:true, devel:false, jquery:true,
    onevar:true
*/

/* global less:true, importArticles */

// disable indent warning
/*jshint -W015*/

;(function (window, location, $, mw, dev, undefined) {
    /*jshint +W015*/

    'use strict';

    /*
    // example config used for testing
    window.lessOpts = [{
        target: 'MediaWiki:Common.css',
        source: 'MediaWiki:Common.less',
        load: [
            'MediaWiki:Common.css',
            'MediaWiki:Common.less'
        ],
        header: 'MediaWiki:Css-header/common'
    }];
    */

    /**
     * Cache mw.config values
     */
    var conf = mw.config.get([
            'debug',
            'skin',
            'wgAction',
            'wgArticlePath',
            'wgNamespaceIds',
            'wgPageName',
            'wgSassParams',
            'wgServer',
            'wgUserGroups',
            'wgUserName',
            'wgUserLanguage'
        ]),

        /**
         * Copy of script configuration
         */
        opts = window.lessOpts,

        config = $.extend({
            reload: true,
            wrap: true,
            allowed: [],
        }, window.lessConfig),

        /**
         *
         */
        i18n = null,

        /**
         * Boolean to check when adding event listeners via mw.hook
         *
         * If multiple event listeners are attached, it causes duplicate messages to
         * be output to the UI
         */
        attachListeners = false,

        /**
         * Reusable library functions
         */
        util = {
            /**
             *
             */
            loadMessages: function (callback) {
                mw.hook('dev.i18n').add(function (devI18n) {
                    devI18n.loadMessages('Less').done(function (i18n_) {
                        i18n = i18n_;
                        callback();
                    });
                });

                importArticles({
                    type: 'script',
                    articles: ['u:dev:MediaWiki:I18n-js/code.js']
                });
            },

            /**
             * Inserts a line into the interface content area
             *
             * If there is an overflow in the content area
             * this will also scroll the content down
             *
             * @param {object} ob An object with the following keys:
             *        - text {string} A text string to be inserted to the interface
             *        - error {boolean} True if the message is for an error
             * @notes text and msg are mutually exclusive
             *        they should not both exist in ob
             *        text takes precedence over msg
             */
            addLine: function (ob) {
                var $content = $('#less-content'),
                    // '> text'
                    $p = $('<p>').html('&gt;&nbsp;' + ob.text);

                if (ob.error === true) {
                    // add error class
                    $p.addClass('error');
                }

                $content.append($p);

                if ($content.prop('scrollHeight') > $content.prop('clientHeight')) {
                    // the text is longer than the content
                    // so scroll down to the bottom
                    $content.scrollTop($content.prop('scrollHeight'));
                }
            }
        },

        /**
         * Functions for parsing the LESS files and updating the target CSS file
         *
         * These are typically used once per 'cycle'
         * Reusable functions are under util
         */
        self = {
            /**
             * Loading function
             *
             * - Validates configuration and check for correct environment to load in
             * - Checks if the user can edit MediaWiki pages if applicable
             * - Checks for debug mode (skips user checks)
             */
            init: function () {
                var profile = $.client.profile(),
                    run = false,
                    // usergroups that can edit mediawiki pages
                    allowed = ['sysop', 'soap', 'wiki-specialist', 'wiki-representative', 'staff']
                    .concat(config.allowed),
                    mwi,
                    i;

                mw.util.addCSS(
                    // put any additional css rules here
                );

                if (profile.name === 'msie' && profile.versionNumber < 9) {
                    // we're not going to support anything below ie9
                    // so stop here rather than cause any errors
                    // by using stuff ie8 doesn't support
                    return;
                }

                if (conf.wgAction !== 'view') {
                    return;
                }

                if (opts === undefined || !Array.isArray(opts)) {
                    // incorrect configuration
                    return;
                }

                // check if this page is added to the options.load array
                for (i = 0; i < opts.length; i += 1) {
                    if (opts[i].load.indexOf(conf.wgPageName) > -1) {
                        run = true;
                        opts = opts[i];
                        break;
                    }
                }

                if (!run) {
                    return;
                }

                if (conf.debug) {
                    mw.loader.using(['mediawiki.api'], function () {
                        util.loadMessages(self.addUpdate);
                    });
                    return;
                }

                // get all localised names for mediawiki namespace
                mwi = Object.entries(conf.wgNamespaceIds).filter(function (v) {
                    return v[1] === 8;
                }).map(function (v) {
                    return v[0];
                });

                // if target CSS page is a mediawiki page
                // check the user can edit them
                if (mwi.filter(function (v) {
                        return opts.target.toLowerCase().startsWith(v);
                    }).length > 0 && // if target page starts with any of the localized MW names
                    conf.wgUserGroups.filter(function (v) {
                        return allowed.includes(v);
                    }).length < 1) { // and if none of the user's groups is allowed
                    return; // exit script
                }

                mw.loader.using(['mediawiki.api'], function () {
                    util.loadMessages(self.addUpdate);
                });
            },

            /**
             * Inserts update button
             */
            addUpdate: function () {
                $('#mw-content-text').prepend(
                    $('<a>')
                    .addClass('wds-is-squished wds-button')
                    .attr({
                        title: i18n.msg('update-css').escape(),
                        href: '#',
                        id: 'less-update-button'
                    })
                    .css({
                        'margin-bottom': '5px'
                    })
                    .text(i18n.msg('update-css').plain())
                    .click(self.modal)
                );
            },

            /**
             * Build the GUI
             */
            modal: function () {
                if (!$('#less-overlay').length) {
                    mw.util.addCSS(
                        '#less-overlay{position:fixed;height:1000px;background-color:rgba(255,255,255,0.6);width:100%;top:0;left:0;z-index:20000002}' +
                        '#less-modal{position:relative;height:400px;width:70%;max-width:650px;margin:auto;border-radius:4px;background:white;box-shadow:0 10px 60px rgba(0,0,0,0.3);padding:10px 15px 20px;overflow:hidden;color:#3a3a3a}' +
                        '#less-header{height:50px;width:100%;position:relative;}' +
                        '#less-title{font-size:24px;font-family:"Helvetica Neue","Arial",sans-serif;color:#438ab5;line-height:55px;padding-left:10px}' +
                        '#less-close{background:url(//runescape.fandom.com/wiki/Special:FilePath/Close-x-white.svg) #438ab5 center no-repeat;height:10px;width:10px;padding:5px;display:block;top:12px;right:5px;position:absolute;cursor:pointer}' +
                        '#less-content{padding:10px;overflow-y:auto;background-color:#fff;height:330px;font-size:13px}' +
                        '#less-content>p{font-family:monospace;line-height:1.25em;margin:0}' +
                        '#less-content>p>a{color:#438ab5;}' +
                        '#less-content>.error{color:red;font-size:initial;}' +
                        '#less-content>.error>a{color:red;text-decoration:underline;}'
                    );

                    // createmodal
                    $('body').append(
                        '<div id="less-overlay">' +
                        '<div id="less-modal">' +
                        '<div id="less-header">' +
                        '<span id="less-title">' + i18n.msg('less-title').escape() + '</span>' +
                        '<span id="less-close" title="' + i18n.msg('less-close').escape() + '"></span>' +
                        '</div>' +
                        '<div id="less-content"></div>' +
                        '</div>' +
                        '</div>'
                    );

                    // add event listeners
                    $('#less-close, #less-overlay').click(self.closeModal);
                    $('#less-modal').click(function (e) {
                        // stop click events bubbling down to overlay
                        e.stopPropagation();
                    });
                } else {
                    $('#less-content').empty();
                    $('#less-overlay').show();
                }

                // set modal height
                $('#less-modal').css(
                    'margin-top',
                    (($(window).height() - 400) / 3)
                );

                self.getSource();

                return false;
            },

            /**
             * Closes the GUI
             *
             * @param {boolean} refresh (optional) Reload the page if true
             */
            closeModal: function (refresh) {
                $('#less-overlay').hide();

                // refresh the page on close
                if (refresh === true && conf.wgPageName === opts.target) {
                    location.reload();
                }

                return false;
            },

            /**
             * Gets the .less source page
             */
            getSource: function () {
                if (conf.debug) {
                    util.addLine({
                        text: i18n.msg('debug-enabled').escape()
                    });
                }

                util.addLine({
                    text: i18n.msg('getting-source', opts.source).parse(),
                });

                // check if modules have been defined
                if (!mw.loader.getState('dev.less')) {
                    mw.loader.implement(
                        'dev.less',
                        [
                            '/load.php?debug=' + conf.debug +
                            '&lang=en&mode=articles&articles=u:dev:MediaWiki:Less/less.js&only=scripts'
                        ],
                        // objects for styles and messages
                        // mw.loader doesn't handle these being undefined
                        {}, {}
                    );
                }

                // check if less module has been defined
                if (!mw.loader.getState('dev.colors')) {
                    mw.loader.implement(
                        'dev.colors',
                        [
                            '/load.php?debug=' + conf.debug +
                            '&lang=en&mode=articles&articles=u:dev:MediaWiki:Colors/code.js&only=scripts'
                        ],
                        // objects for styles and messages
                        // mw.loader doesn't handle these being undefined
                        {}, {}
                    );
                }

                $.ajaxSetup({
                    dataType: 'text',
                    error: function (_, error, status) {
                        if (status === 'Not Found') {
                            util.addline({
                                text: i18n.msg('page-not-found').escape(),
                                error: true
                            });
                        } else {
                            // @todo output error to gui
                            mw.log(error, status);
                        }
                    },
                    type: 'GET',
                    url: mw.util.wikiScript()
                });

                $.ajax({
                    data: {
                        action: 'raw',
                        maxage: '0',
                        smaxage: '0',
                        title: opts.source.replace(/ /g, '_')
                    },
                    success: function (data) {
                        mw.loader.using(['dev.less', 'dev.colors'], function () {
                            self.getMixins(data);
                        });
                    }
                });
            },

            /**
             * Gets some standard mixins for use in LESS files
             *
             * Standard mixins can be found at:
             * <https://dev.fandom.com/wiki/MediaWiki:Custom-Less/mixins.less>
             *
             * @param {string} data
             */
            getMixins: function (data) {
                util.addLine({
                    text: i18n.msg('getting-mixins').escape()
                });

                $.ajax({
                    crossDomain: 'true',
                    data: {
                        action: 'query',
                        format: 'json',
                        prop: 'revisions',
                        rvprop: 'content',
                        titles: 'MediaWiki:Custom-Less/mixins.less'
                    },
                    dataType: 'jsonp',
                    success: function (json) {
                        var content = json.query.pages['4441'].revisions[0]['*'],
                            res = content + '\n' + data;
                        self.sassParams(res);
                    },
                    url: 'https://dev.fandom.com/api.php'
                });
            },

            /**
             * Extract selected theme designer values for use in less files
             *
             * @param {string} mixins Mixins retrieved through getmixins method
             */
            sassParams: function (mixins) {
                var colors = dev.colors.wikia,
                    params = {
                        body: colors.body,
                        page: colors.page,
                        buttons: colors.menu,
                        header: colors.header,
                        links: colors.link,
                        contrast: colors.contrast,
                        text: colors.text,
                        border: colors.border,
                        gradient: colors.gradient,
                        nav: colors.nav
                    },
                    paramStr = '';

                $.each(params, function (k, v) {
                    paramStr += '@theme-' + k + ':' + v + ';\n';
                });

                paramStr += '@filepath:\'' + conf.wgServer + conf.wgArticlePath.replace('$1', 'Special:FilePath') + '\';\n';

                self.parseLess(paramStr + '\n' + mixins);
            },

            /**
             * Attempts to parse content of source file
             *
             * @param {string} toparse Content to parse
             */
            parseLess: function (toParse) {
                var parser = new less.Parser({}),
                    importErrs = 0;

                // attempt to parse less
                util.addLine({
                    text: i18n.msg('attempt-parse').escape()
                });

                mw.log(toParse);

                if (!attachListeners) {
                    // attach listeners for ajax requests here
                    // so we can react to imports independent of if they're successful or not
                    // if there's an import error, less.js will throw an error at the end parsing
                    // not as soon as it encounters them
                    mw.hook('less.200').add(function (url) {
                        var uri = new mw.Uri(url),
                            path = uri.path.replace(conf.wgArticlePath, '');

                        util.addLine({
                            text: i18n.msg('import-success', path).escape(),
                        });
                    });

                    mw.hook('less.404').add(function (url) {
                        var uri = new mw.Uri(url),
                            path = uri.path.replace(conf.wgArticlePath, '');

                        importErrs += 1;

                        util.addLine({
                            text: i18n.msg('import-error', path).escape(),
                            error: true
                        });
                    });

                    attachListeners = true;
                }

                parser.parse(toParse, function (err, root) {
                    var css,
                        lines,
                        i;

                    if (!err) {
                        css = root.toCSS();
                        self.formatCss(css);
                    } else {
                        if (err.filename === 'input') {
                            // replace filename with our source file
                            err.filename = opts.source;
                            // fix line number for sassparams and mixins
                            lines = toParse.split('\n');

                            for (i = 0; i < lines.length; i += 1) {
                                if (lines[i].trim().indexOf('// end of mixins') > -1) {
                                    break;
                                }
                            }

                            // add 1 here as i refers to the mixins still
                            // not the start of the source file
                            err.line = err.line - (i + 1);
                        } else {
                            err.filename = new mw.Uri(err.filename).path.replace(conf.wgArticlePath, '');
                        }

                        if (importErrs > 0) {
                            // we have an import error
                            util.addLine({
                                text: i18n.msg('check-imports').escape(),
                                error: true
                            });
                        } else {
                            // we have a syntax error
                            util.addLine({
                                text: i18n.msg('parse-error-file', err.line, err.filename).parse(),
                                error: true
                            });
                            // output the problem text
                            util.addLine({
                                text: err.extract[1].trim(),
                                error: true
                            });
                            // LESS doesn't have i18n so this will have to be english
                            util.addLine({
                                text: err.message,
                                error: true
                            });
                        }
                    }
                });
            },

            /**
             * Formats resulting CSS so it's readable after parsing
             *
             * @param {string} css CSS to format
             */
            formatCss: function (css) {

                util.addLine({
                    text: i18n.msg('formatting-css').escape()
                });

                // be careful with these regexes
                // everything in them does something even if it's not obvious
                css = css
                    // strip block comments
                    // @source <https://stackoverflow.com/a/2458830/1942596>
                    // after parsing, block comments are unlikely to be anywhere near
                    // the code they're commenting, so remove them to prevent confusion
                    // inline comments are stripped during parsing
                    // [\n\s]* at the start of this regex is to stop whitespace leftover
                    // from removing comments within rules
                    .replace(/[\n\s]*\/\*([\s\S]*?)\*\//g, '')

                    // add consistent newlines between rules
                    .replace(/(\})\n+/g, '$1\n\n')

                    // 4 space indentation
                    // do it this way to account for rules inside media queries, keyframes, etc.
                    // the 8 space indent replace should never really be used
                    // but is there just in case
                    // the 6 space indent is for something like keyframes in media queries
                    .replace(/\n {8}([\s\S])/g, '\n                $1')
                    .replace(/\n {6}([\s\S])/g, '\n            $1')
                    .replace(/\n {4}([\s\S])/g, '\n        $1')
                    .replace(/\n {2}([\s\S])/g, '\n    $1')

                    // @font-face
                    // this just aligns each value for the src property
                    .replace(
                        /@font-face\s*\{([\s\S]*?\n)(\s*)src:\s*([\s\S]*?);([\s\S]*?\})/g,
                        function (_, p1, p2, p3, p4) {
                            return '@font-face { ' +
                                p1 +
                                p2 +
                                'src: ' + p3.split(', ').join(',\n' + p2 + '     ') + ';' +
                                p4;
                        }
                    )

                    // trim outer whitespace
                    .trim();

                self.addHeader(css);

            },

            /**
             * Prepends content of header file if defined
             *
             * @param {string} css CSS to prepend header too
             */
            addHeader: function (css) {

                // check opts.header is defined
                if (!!opts.header) {
                    util.addLine({
                        text: i18n.msg('getting-header').escape()
                    });

                    $.ajax({
                        data: {
                            action: 'raw',
                            maxage: '0',
                            smaxage: '0',
                            title: opts.header
                        },
                        success: function (data) {
                            data.trim();
                            data += '\n\n' + css;
                            self.wrap(data);
                        }
                    });
                } else {
                    self.wrap(css);
                }
            },

            /**
             * If set in config, wraps the css in pre tags
             *
             * @param {string} css CSS to wrap in pre tags
             */
            wrap: function (css) {
                if (config.wrap) {
                    // you only need the opening pre tag to stop redlinks, etc.
                    css = '/* <pre> */\n' + css;
                }

                self.postCss(css);
            },

            /**
             * Edits the target page with the new CSS 
             *
             * @param {string} text Content to update the target page with
             */
            postCss: function (text) {
                var token = mw.user.tokens.get('csrfToken'),
                    summary = i18n
                    .inContentLang()
                    .msg('edit-summary', opts.source)
                    .plain(),
                    params = {
                        action: 'edit',
                        summary: summary,
                        token: token,
                        title: opts.target,
                        text: text
                    },
                    api;

                // safe guard for debugging
                // as mw.Api isn't loaded for anons
                if (!conf.wgUserName) {
                    mw.log('User is not logged in');
                    return;
                }

                // use mw.Api as it escapes all out params for us as required
                api = new mw.Api();
                api.post(params)
                    .done(function (data) {
                        if (data.edit && data.edit.result === 'Success') {
                            util.addLine({
                                text: i18n.msg('edit-success', opts.target).parse()
                            });

                            window.setTimeout(function () {
                                self.closeModal(config.reload);
                            }, 2000);
                        } else if (data.error) {
                            util.addLine({
                                text: data.error.code + ': ' + data.error.info,
                                error: true
                            });
                            util.addLine({
                                text: i18n.msg('error-persist', 'w:c:dev:Talk:Less').parse(),
                                error: true
                            });
                        } else {
                            mw.log(data);
                            util.addLine({
                                text: i18n.msg('unknown-error').escape(),
                                error: true
                            });
                            util.addLine({
                                text: i18n.msg('error-persist', 'w:c:dev:Talk:Less').parse(),
                                error: true
                            });
                        }
                    });
            }
        };

    conf.wgArticlePath = conf.wgArticlePath.replace(/\$1/, '');

    if (conf.debug) {
        dev.less = self;
    } else {
        dev.less = self.init;
    }

    mw.loader.using('jquery.client', function () {
        $(self.init);
    });

}(this, this.location, this.jQuery, this.mediaWiki, this.dev = this.dev || {}));