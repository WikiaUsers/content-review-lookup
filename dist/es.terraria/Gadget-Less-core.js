/**
 * Adds support for using LESS on MediaWiki and an interface for compiling LESS to CSS
 *
 * This script uses a modified version of less.js
 * @link <https://github.com/less/less.js> less.js source
 * @link <https://lesscss.org/> less.js documentation
 *
 * @author Cqm
 * @version 2.6.0
 * @copyright © Cqm 2019 <cqm.fwd@gmail.com>
 * @license GPLv3 <https://www.gnu.org/licenses/gpl-3.0.html>
 *
 * @notes <https://phabricator.wikimedia.org/T56864> native support for this
 * @todo Move docs to meta and update
 */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, es3:false,
    forin:true, immed:true, indent:4, latedef:true, newcap:true,
    noarg:true, noempty:true, nonew:true, plusplus:true, quotmark:single,
    undef:true, unused:true, strict:true, trailing:true,
    browser:true, devel:false, jquery:true,
    onevar:true
*/

/*global less:true */

// disable indent warning
/*jshint -W015*/
;(function (window, location, $, mw, wgl, undefined) {
/*jshint +W015*/

    'use strict';

        /**
         * Cache mw.config values
         */
    var conf = mw.config.get([
            'debug',
            'wgAction',
            'wgArticlePath',
            'wgPageName',
            'wgUserName',
        ]),

        /**
         * Copy of script configuration
         */
        source,
        target,
        targets = window.lessTargets,
        config = $.extend({
            reload: true,
            wrap: true,
            allowed: [],
        }, window.lessConfig),

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
             * Inserts a line into the interface content area
             *
             * If there is an overflow in the content area
             * this will also scroll the content down
             *
             * @param {text} The text to add to the GUI,
             * @param {isError} If the message is an error message or not.
             */
            addLine: function (text, isError) {
                var $content = $('#less-content'),
                    $p = $('<p>');

                if (isError === true) {
                    // add error class
                    $p.addClass('error');
                }

                // '> text'
                $p.html('&gt;&nbsp;' + text);
                $content.append($p);

                if ($content.prop('scrollHeight' ) > $content.prop('clientHeight')) {
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
                if (conf.wgAction !== 'view') {
                    return;
                }

                if (targets === undefined || !Array.isArray(targets)) {
                    // incorrect configuration
                    return;
                }

                // check if this page is CSS generated from LESS or is LESS.
                target = targets.find( function (e) { return e === conf.wgPageName.replace(new RegExp('\.less$'),'.css' ) } );
                if ( target !== undefined ) {
                    source = target.replace(new RegExp('\.css$'),'.less' );
                } else {
                    return;
                }

                mw.loader.using(['mediawiki.jqueryMsg', 'ext.less.messages'], function () {
                    self.addUpdate();
                });
            },

            /**
             * Inserts update button
             */
            addUpdate: function () {
                var text = mw.message('less-update-css').escaped();

                $('#p-views ul')
                    .prepend(
                        $('<li>')
                            .attr('id', 't-updateless')
                            .append(
                                $('<span>')
                                    .append(
                                        $('<a>')
                                            .attr({
                                                title: text,
                                                href: '#',
                                                id: 'less-update-button'
                                            })
                                            .on('click', self.modal)
                                            .text(text)
                                    )
                            )
                    );
            },

            /**
             * Build the GUI
             */
            modal: function () {
                    // TODO: move this to extension assets
                var closeImg = conf.wgArticlePath.replace('$1', 'Special:FilePath/Close-x-white.svg'),
                    modal;

                if (!$('#less-overlay' ).length) {
                    // create modal
                    modal = '<div id="less-overlay"><div id="less-modal">' +
                        '<div id="less-header">' +
                            '<span id="less-title">' + mw.message('less-dialog-title').escaped() + '</span>' +
                            '<span id="less-close" title="' + mw.message('less-dialog-close').escaped() + '"></span>' +
                        '</div>' +
                        '<div id="less-content"></div>' +
                        '</div></div>';

                    // insert CSS
                    mw.util.addCSS(
                        '#less-overlay { display:flex; justify-content:center; align-items:center; position:fixed; height:100vh; background-color:rgba(255,255,255,0.6); width:100%; top:0; left:0; z-index:20000002 }' +
                        '#less-modal { height:400px; width:650px; border-radius:4px; background:#fff; box-shadow:0 10px 60px rgba(0,0,0,0.3); padding:10px 15px; overflow:hidden; color:#3a3a3a }' +
                        '#less-header { border-bottom:1px solid #e4eaee; height:50px; width:100%; position:relative; }' +
                        '#less-title { font-size:24px; line-height:50px; padding-left:10px }' +
                        '#less-close { background:url(' + closeImg + ') #bdc5cd center no-repeat; height:10px; width:10px; padding:5px; display:block; top:12px; right:5px; position:absolute; cursor:pointer }' +
                        '#less-content { margin:0 10px 10px 10px; padding-top:10px; overflow:auto; height:330px; }' +
                        '#less-content p { font-family:monospace; line-height:1.5em; margin:0 }' +
                        '#less-content p a { color: #327ba7; }' +
                        '#less-content .error { color:#d22313; font-size:initial; }' +
                        '#less-content .error a { color:#d22313; text-decoration:underline; }'
                    );

                    // insert into DOM
                    $('body').append(modal);

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
                if (refresh === true && conf.wgPageName === target) {
                    location.reload();
                }

                return false;
            },

            /**
             * Gets the .less source page
             */
            getSource: function () {
                if (conf.debug) {
                    util.addLine(mw.message('less-dialog-debug-enabled').escaped());
                }
                
                if (!mw.loader.getState('wgl.less')) {
                    // @todo: move this to extension/gadget
                    mw.loader.implement(
                        'wgl.less',
                        [
                            'https://meta.weirdgloop.org/w/MediaWiki:Gadget-LessSrc.js?action=raw&ctype=text/javascript'
                        ],
                        {}, {}
                    );
                }

                util.addLine(mw.message('less-dialog-getting-source', source).parse());

                $.ajaxSetup({
                    dataType: 'text',
                    error: function (_, error, status) {
                        // TODO: can we not inspect the HTTP status code?
                        if (status === 'Not Found') {
                            util.addLine(mw.message('less-dialog-page-not-found').escaped(), true);
                        } else {
                            // TODO: output error to gui
                            console.log(error, status);
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
                        title: source.replace(/ /g, '_')
                    },
                    success: function (data) {
                        self.getMixins(data);
                    }
                });
            },

            /**
             * Gets some standard mixins for use in LESS files
             *
             * @param {string} data
             */
            getMixins: function (data) {
                util.addLine(mw.message('less-dialog-getting-mixins').escaped());

                $.ajax({
                    data: {
                        action: 'raw',
                        maxage: '0',
                        smaxage: '0',
                        title: 'MediaWiki:Gadget-LessMixins.less'
                    },
                    url: 'https://meta.weirdgloop.org/index.php',
                    success: function (content) {
                        mw.log('getMixins::content', content);

                        mw.loader.using( ['wgl.less'], function () {
                            // Monkey patch in a filepath function that takes a wiki file name and generates the url to it.
                            less.tree.Filepath = function ( fileName, width ) {
                                var f = fileName.value.replace(' ', '_'),
                                    url = '/images/';

                                if ( arguments.length < 2 ) {
                                    url += f;
                                } else {
                                    url += width.value + 'px-' + f;
                                }
                                url += "?11111"

                                return new(less.tree.URL)(new(less.tree.Anonymous)(url));
                            };

                            self.parseLess(content + '\n' + data);
                        });
                    },
                });
            },

            /**
             * Attempts to parse content of source file
             *
             * @param {string} toparse Content to parse
             */
            parseLess: function (toParse) {
                var importErrs = 0;

                // attempt to parse less
                util.addLine(mw.message('less-dialog-attempt-parse').escaped());
                mw.log(toParse);

                if (!attachListeners) {
                    // attach listeners for ajax requests here
                    // so we can react to imports independent of if they're successful or not
                    // if there's an import error, less.js will throw an error at the end parsing
                    // not as soon as it encounters them
                    mw.hook('less.200').add(function (url) {
                        var uri = new mw.Uri( url ),
                            path = uri.path.replace('/w/', '');

                        util.addLine(mw.message('less-dialog-import-success', path).parse());
                    });

                    mw.hook( 'less.404' ).add(function (url) {
                        var uri = new mw.Uri(url),
                            path = uri.path.replace('/w/', '');

                        importErrs += 1;

                        util.addLine(mw.message('less-dialog-import-error', path).parse(), true);
                    });

                    attachListeners = true;
                }

                less.render(toParse, {}, function (err, root) {
                    var css,
                        lines,
                        i;

                    if (!err) {
                        try {
                            css = root.css;
                            self.formatCss(css);
                        } catch (exc) {
                            self.handleSyntaxError(exc);
                        }
                    } else {
                        if (err.filename === 'input') {
                            // replace filename with our source file
                            err.filename = source;
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
                            err.filename = new mw.Uri(err.filename).path.replace('/w/', '');
                        }

                        if (importErrs > 0) {
                            // we have an import error
                            util.addLine(mw.message('less-dialog-check-imports').escaped(), true);
                        } else {
                            self.handleSyntaxError(err);
                        }
                    }
                });
            },

            /**
             * Handle a syntax error.
             *
             * @param {Exception} exc Exception to handle.
             */
            handleSyntaxError: function (exc) {
                // log the raw error as well
                mw.log.error(exc);

                // convert URI to pagename
                var uri = new mw.Uri(exc.filename),
                    path = uri.path.replace('/w/', '');

                util.addLine(mw.message('less-dialog-parse-error-file', exc.line, path).parse(), true);
                // output the problem text
                util.addLine(exc.extract[1].trim(), true);
                // LESS doesn't have i18n so this will have to be english
                util.addLine(exc.message, true);
            },
            
            /**
             * Formats resulting CSS so it's readable after parsing
             *
             * @param {string} css CSS to format
             */
            formatCss: function (css) {

                util.addLine(mw.message('less-dialog-formatting-css').escaped());

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
                            return  '@font-face { ' +
                                p1 +
                                p2 +
                                'src: ' + p3.split(', ').join(',\n' + p2 + '     ') + ';' +
                                p4;
                        }
                    )

                    // trim outer whitespace
                    .trim();

                self.wrap(css);

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
                    summary = mw.message('less-dialog-edit-summary', source).plain(),
                    params = {
                        action: 'edit',
                        summary: summary,
                        token: token,
                        title: target,
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
                            util.addLine(mw.message('less-dialog-edit-success', target).parse());

                            /*window.setTimeout(function () {
                                self.closeModal(config.reload);
                            }, 2000);*/
                        } else if (data.error) {
                            util.addLine(data.error.code + ': ' + data.error.info, true);
                            util.addLine(
                                mw.message('error-persist', 'meta:MediaWiki talk:Gadget-Less-core.js').parse(),
                                true
                            );
                        } else {
                            mw.log(data);
                            util.addLine(mw.message('less-dialog-unknown-error').escaped(), true);
                            util.addLine(mw.message('less-dialog-error-persist').escaped(), true);
                        }
                    });
            }
        };

    if (conf.debug) {
        wgl.less = self;
    } else {
        wgl.less = self.init;
    }

    $(self.init);
    
}(this, this.location, this.jQuery, this.mediaWiki, this.wgl = this.wgl || {}));