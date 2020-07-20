/**
 * Code
 *   By [[User:AnimatedCartoons]]
 */
(function ($, mw) {
    var lng = window.lng;
 
    $('.comments').after('<img style="padding-bottom: 5px;" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" />');
 
    mw.loader.implement('javascript.js', [
        'http://codemirror.net/lib/codemirror.js', 'http://codemirror.net/mode/javascript/javascript.js', 'http://codemirror.net/addon/fold/foldcode.js', 'http://codemirror.net/addon/fold/foldgutter.js', 'http://codemirror.net/addon/fold/brace-fold.js', 'http://codemirror.net/addon/fold/comment-fold.js', 'http://jshint.com/res/jshint.js', 'http://codemirror.net/addon/lint/lint.js', 'http://codemirror.net/addon/lint/javascript-lint.js', 'http://codemirror.net/addon/hint/show-hint.js', 'http://codemirror.net/addon/hint/javascript-hint.js', 'http://codemirror.net/addon/dialog/dialog.js', 'http://codemirror.net/addon/search/searchcursor.js', 'http://codemirror.net/addon/search/search.js', 'http://codemirror.net/addon/edit/trailingspace.js', 'http://codemirror.net/addon/display/fullscreen.js', 'http://codemirror.net/addon/edit/closebrackets.js', 'http://codemirror.net/addon/selection/active-line.js', 'http://codemirror.net/addon/edit/matchbrackets.js', 'http://rawgithub.com/austincheney/Pretty-Diff/299e2bc6a416aa1166db1c91f409c92d75593cb2/prettydiff.js'
    ], {
        all: '.CodeMirror{font-family:monospace;height:300px}.CodeMirror-scroll{overflow:auto}.CodeMirror-lines{padding:4px 0}.CodeMirror pre{padding:0 4px}.CodeMirror-scrollbar-filler,.CodeMirror-gutter-filler{background-color:#fff}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999}.CodeMirror div.CodeMirror-cursor{border-left:1px solid #000;z-index:3}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.CodeMirror.cm-keymap-fat-cursor div.CodeMirror-cursor{width:auto;border:0;background:#7e7;z-index:1}.cm-tab{display:inline-block}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:#00f}.cm-s-default .cm-variable{color:#000}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-variable-3{color:#085}.cm-s-default .cm-property{color:#000}.cm-s-default .cm-operator{color:#000}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta{color:#555}.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-header{color:#00f}.cm-s-default .cm-quote{color:#090}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:700}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-s-default .cm-error{color:red}.cm-invalidchar{color:red}div.CodeMirror span.CodeMirror-matchingbracket{color:#0f0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#f22}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{line-height:1;position:relative;overflow:hidden;background:#fff;color:#000}.CodeMirror-scroll{margin-bottom:-30px;margin-right:-30px;padding-bottom:30px;padding-right:30px;height:100%;outline:0;position:relative;-moz-box-sizing:content-box;box-sizing:content-box}.CodeMirror-sizer{position:relative}.CodeMirror-vscrollbar,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-gutter-filler{position:absolute;z-index:6;display:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;padding-bottom:30px;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;-moz-box-sizing:content-box;box-sizing:content-box;padding-bottom:30px;margin-bottom:-32px;display:inline-block}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-lines{cursor:text}.CodeMirror pre{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;border-width:0;background:transparent;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible}.CodeMirror-wrap pre{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-code pre{border-right:30px solid transparent;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.CodeMirror-wrap .CodeMirror-code pre{border-right:0;width:auto}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;overflow:auto}.CodeMirror-wrap .CodeMirror-scroll{overflow-x:hidden}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-measure pre{position:static}.CodeMirror div.CodeMirror-cursor{position:absolute;visibility:hidden;border-right:0;width:0}.CodeMirror-focused div.CodeMirror-cursor{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.cm-searching{background:#ffa;background:rgba(255,255,0,.4)}@media print{.CodeMirror div.CodeMirror-cursor{visibility:hidden}}.CodeMirror-foldmarker{color:#00f;text-shadow:#b9f 1px 1px 2px,#b9f -1px -1px 2px,#b9f 1px -1px 2px,#b9f -1px 1px 2px;font-family:arial;line-height:.3;cursor:pointer}.CodeMirror-foldgutter{width:.7em}.CodeMirror-foldgutter-open,.CodeMirror-foldgutter-folded{color:#555;cursor:pointer}.CodeMirror-foldgutter-open:after{content:"▾"}.CodeMirror-foldgutter-folded:after{content:"▸"}.CodeMirror-lint-markers{width:16px}.CodeMirror-lint-tooltip{background-color:infobackground;border:1px solid #000;border-radius:4px;color:infotext;font-family:monospace;font-size:10pt;overflow:hidden;padding:2px 5px;position:fixed;white-space:pre;white-space:pre-wrap;z-index:100;max-width:600px;opacity:0;transition:opacity .4s;-moz-transition:opacity .4s;-webkit-transition:opacity .4s;-o-transition:opacity .4s;-ms-transition:opacity .4s}.CodeMirror-lint-mark-error,.CodeMirror-lint-mark-warning{background-position:left bottom;background-repeat:repeat-x}.CodeMirror-lint-mark-error{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJDw4cOCW1/KIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHElEQVQI12NggIL/DAz/GdA5/xkY/qPKMDAwAADLZwf5rvm+LQAAAABJRU5ErkJggg==")}.CodeMirror-lint-mark-warning{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJFhQXEbhTg7YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAMklEQVQI12NkgIIvJ3QXMjAwdDN+OaEbysDA4MPAwNDNwMCwiOHLCd1zX07o6kBVGQEAKBANtobskNMAAAAASUVORK5CYII=")}.CodeMirror-lint-marker-error,.CodeMirror-lint-marker-warning{background-position:center center;background-repeat:no-repeat;cursor:pointer;display:inline-block;height:16px;width:16px;vertical-align:middle;position:relative}.CodeMirror-lint-message-error,.CodeMirror-lint-message-warning{padding-left:18px;background-position:top left;background-repeat:no-repeat}.CodeMirror-lint-marker-error,.CodeMirror-lint-message-error{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAHlBMVEW7AAC7AACxAAC7AAC7AAAAAAC4AAC5AAD///+7AAAUdclpAAAABnRSTlMXnORSiwCK0ZKSAAAATUlEQVR42mWPOQ7AQAgDuQLx/z8csYRmPRIFIwRGnosRrpamvkKi0FTIiMASR3hhKW+hAN6/tIWhu9PDWiTGNEkTtIOucA5Oyr9ckPgAWm0GPBog6v4AAAAASUVORK5CYII=")}.CodeMirror-lint-marker-warning,.CodeMirror-lint-message-warning{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAANlBMVEX/uwDvrwD/uwD/uwD/uwD/uwD/uwD/uwD/uwD6twD/uwAAAADurwD2tQD7uAD+ugAAAAD/uwDhmeTRAAAADHRSTlMJ8mN1EYcbmiixgACm7WbuAAAAVklEQVR42n3PUQqAIBBFUU1LLc3u/jdbOJoW1P08DA9Gba8+YWJ6gNJoNYIBzAA2chBth5kLmG9YUoG0NHAUwFXwO9LuBQL1giCQb8gC9Oro2vp5rncCIY8L8uEx5ZkAAAAASUVORK5CYII=")}.CodeMirror-lint-marker-multiple{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAMAAADzjKfhAAAACVBMVEUAAAAAAAC/v7914kyHAAAAAXRSTlMAQObYZgAAACNJREFUeNo1ioEJAAAIwmz/H90iFFSGJgFMe3gaLZ0od+9/AQZ0ADosbYraAAAAAElFTkSuQmCC");background-repeat:no-repeat;background-position:right bottom;width:100%;height:100%}.CodeMirror-hints{position:absolute;z-index:10;overflow:hidden;list-style:none;margin:0;padding:2px;-webkit-box-shadow:2px 3px 5px rgba(0,0,0,.2);-moz-box-shadow:2px 3px 5px rgba(0,0,0,.2);box-shadow:2px 3px 5px rgba(0,0,0,.2);border-radius:3px;border:1px solid silver;background:#fff;font-size:14px;font-family:monospace;max-height:20em;overflow-y:auto}.CodeMirror-hint{margin:0;padding:0 4px;border-radius:2px;max-width:19em;overflow:hidden;white-space:pre;color:#000;cursor:pointer}.CodeMirror-hint-active{background:#08f;color:#fff}.CodeMirror-dialog{position:absolute;left:0;right:0;background:#fff;z-index:15;padding:.1em .8em;overflow:hidden;color:#333}.CodeMirror-dialog-top{border-bottom:1px solid #eee;top:0}.CodeMirror-dialog-bottom{border-top:1px solid #eee;bottom:0}.CodeMirror-dialog input{border:0;outline:0;background:transparent;width:20em;color:inherit;font-family:monospace}.cm-trailingspace{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QUXCToH00Y1UgAAACFJREFUCNdjPMDBUc/AwNDAAAFMTAwMDA0OP34wQgX/AQBYgwYEx4f9lQAAAABJRU5ErkJggg==);background-position:bottom left;background-repeat:repeat-x}.CodeMirror-fullscreen{position:fixed;top:0;left:0;right:0;bottom:0;height:auto!important;z-index:9}'
    }, {});
 
    mw.loader.using([
        'javascript.js', 'mediawiki.action.history.diff'
    ], function () {
        $('#WikiaPageHeader > img').remove();
        $('.comments').after('<nav class="wikia-menu-button" id="edit-code" style="padding: 0px 8px 0px 5px;">&nbsp;' + lng.view + '&nbsp;</nav>');
 
        $('body').on('click', '#edit-code', function () {
            $('#edit-code').replaceWith('<img style="padding-bottom: 5px;" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" />');
 
            var cd,
                count,
                mnfd;
 
            // Remove "how to clear cache" information
            $('#mw-clearyourcache').remove();
 
            // Widen area
            var styl = mw.util.addCSS('#WikiaPageHeader .tally{right:340px}#WikiaPageHeader #WikiaSearch{right:0;position:absolute;top:1px}#WikiaPageHeader{padding-right:505px}');
            // Disable for now
            styl.disabled = true;
 
            $.get(mw.util.wikiScript(), {
                title  : mw.config.get('wgPageName'),
                action : 'raw',
                maxage : 0,
                smaxage: 0
            }, function (data) {
                // Replace
                $('#mw-content-text').html('<div id="code"></div>');
 
                // Start
                cd    = new CodeMirror(document.getElementById('code'), {
                    mode             : 'javascript',
                    value            : data,
                    indentUnit       : 4,
                    lineNumbers      : true,
                    autoCloseBrackets: true,
                    lint             : true,
                    foldGutter       : {
                        rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
                    },
                    gutters          : [
                        'CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'
                    ],
                    matchBrackets    : true,
                    readOnly         : 'nocursor',
                    showTrailingSpace: true,
                    styleActiveLine  : true,
                    extraKeys        : {
                        // Go to line
                        'Alt-T'     : function () {
                            cd.openDialog(lng.goToLine + ': <input type="text" style="width: 10em;" />', function (query) {
                                cd.setCursor(Number(query) - 1, 0);
                            });
                        },
 
                        // Beautify
                        'Ctrl-B'    : function () {
                            var crsr = cd.getCursor();
 
                            cd.setValue(prettydiff({
                                lang  : 'javascript',
                                mode  : 'beautify',
                                source: cd.getValue()
                            })[0]);
 
                            cd.setCursor(crsr);
                        },
 
                        // Minify
                        'Ctrl-M'    : function () {
                            if ($('#minify').length) {
                                if ($('#minify textarea').val() === cd.getValue()) {
                                    return;
                                } else {
                                    $('#minify').remove();
                                }
                            }
 
                            $('#mw-content-text').append('<div id="minify"><textarea id="minified" rows="1" wrap="off" disabled="disabled" style="padding: 5px; resize: none; width: calc(100% - 12px);"></textarea></div><textarea id="to-minify" name="js_code" style="display: none;"></textarea>');
                            $('#to-minify').val(cd.getValue());
 
                            var percent = cd.getValue().length;
 
                            $.ajax({
                                url     : 'http://closure-compiler.appspot.com/compile',
                                type    : 'POST',
                                dataType: 'html',
                                async   : false,
                                data    : $('#to-minify').serialize() + '&compilation_level=WHITESPACE_ONLY&output_format=text&output_info=compiled_code',
                                success : function (data) {
                                    $('#minified').val(data.replace(/\n/g, ''));
                                    $('#to-minify').remove();
 
                                    var lngth = data.length;
                                    $.get(mw.util.wikiScript(), {
                                        title  : mw.config.get('wgPageName').replace(/\.js$/g, '.min.js'),
                                        action : 'raw',
                                        maxage : 0,
                                        smaxage: 0
                                    }, function (data) {
                                        if (data !== mnfd) {
                                            $('#minify').append('<button id="all">' + lng.selectAll + '</button>&nbsp;<button id="publish-min">' + lng.replace + ' "' + mw.config.get('wgPageName').replace(/\.js$/g, '.min.js') + '"</button>&nbsp;About ' + Math.round(((percent - lngth) / percent) * 100) + '% smaller');
 
                                            if (!cd.getOption('readOnly')) {
                                                $('#all').after('<button id="paste">' + lng.paste + '</button>');
                                            }
                                        }
                                    }).error(function () {
                                        $('#minify').append('<button id="all">' + lng.selectAll + '</button>&nbsp;<button id="publish-min">' + lng.publishAs + ' "' + mw.config.get('wgPageName').replace(/\.js$/g, '.min.js') + '"</button>&nbsp;About ' + Math.round(((percent - lngth) / percent) * 100) + '% smaller');
 
                                        if (!cd.getOption('readOnly')) {
                                            $('#all').after('&nbsp;<button id="paste">' + lng.paste + '</button>');
                                        }
                                    });
                                }
                            });
 
                        },
 
                        // Hints
                        'Ctrl-Space': function (cm) {
                            CodeMirror.showHint(cm, CodeMirror.hint.javascript);
                        },
 
                        // Fullscreen
                        'F11'       : function (cm) {
                            if (!cd.getOption('fullScreen')) {
                                $('#WikiaBarWrapper, #WikiaPageHeader, #WikiHeader, #WikiaHeader').hide();
                                cd.setOption('fullScreen', true);
                            } else {
                                $('#WikiaBarWrapper, #WikiaPageHeader, #WikiHeader, #WikiaHeader').show();
                                cd.setOption('fullScreen', false);
                            }
                        }
                    }
                });
 
                count = cd.getValue().length;
                $('#WikiaPageHeader .tally').html('<em>' + count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</em><span><br />' + lng.characters + '</span>');
 
                $('.CodeMirror').css({
                    background: '#F7F7F7',
                    height    : 'auto'
                });
 
                $('#WikiaPageHeader > img').remove();
            });
 
            $('body').on('click', '#WikiaPageHeader #ca-edit', function () {
                // Change title
                document.title = lng.editing + ' ' + document.title;
 
                // Disable navigating away
                $(this).removeAttr('href');
 
                // Widen area
                $('#WikiaMainContent').attr('style', 'width: 125% !important');
                $('.WikiaRail').hide();
                styl.disabled = false;
 
                $('.CodeMirror').css('height', '468px');
 
                // Add search box
                $('#WikiaPageHeader .tally').after('<form id="WikiaSearch" class="WikiaSearch" action="' + mw.config.get('wgServer') + '/wiki/Special:WikiaSearch" method="get"><input type="text" name="search" placeholder="' + lng.search + '" autocomplete="off" accesskey="f" value=""><input type="hidden" name="fulltext" value="Search"><input type="submit"><button class="wikia-button"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21"></button><input type="hidden" name="ab" value="51"></form>');
 
                // Add summary and "minor edit" box
                $(this).parent().after('<div><textarea id="summary" placeholder="' + lng.summary + '" style="margin-left: 10px; height: 16px; width: 200px; resize: none;"></textarea><input id="minor" type="checkbox">' + lng.minorEdit + '</input></div>');
                if (mw.user.options.get('minordefault') === '1') {
                    $('#minor').attr({
                        checked : 'checked',
                        disabled: 'disabled'
                    });
                }
 
                // Add items to drop-down menu
                $('#WikiaPageHeader .WikiaMenuElement').html('');
 
                mw.util.addPortletLink('WikiaPageHeader', 'javascript:void(0)', lng.shortcut, 'shortcut');
                mw.util.addPortletLink('WikiaPageHeader', 'javascript:void(0)', lng.showChanges, 'changes');
                mw.util.addPortletLink('WikiaPageHeader', 'javascript:void(0)', lng.save, 'save');
 
                if (localStorage.getItem(mw.config.get('wgDBname') + ' — ' + mw.config.get('wgPageName'))) {
                    mw.util.addPortletLink('WikiaPageHeader', 'javascript:void(0)', lng.load, 'load');
                }
 
                // Rename
                $(this).replaceWith('<a id="publish">' + lng.publish + '</a>');
 
                // Disable read-only mode
                cd.setOption('readOnly', false);
                $('.CodeMirror').css('background', '#FFF');
 
                // Update character count
                $('.CodeMirror textarea').on('change keyup keydown input', function () {
                    var count2 = cd.getValue().length;
                    $('#WikiaPageHeader .tally em').text(count2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
 
                    if (count2 > count) {
                        $('#WikiaPageHeader .tally > span').html('<span style="color: green;">+' + (count2 - count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</span><br />' + lng.characters);
                    } else if (count2 < count) {
                        $('#WikiaPageHeader .tally > span').html('<span style="color: red;">' + (count2 - count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</span><br />' + lng.characters);
                    } else {
                        $('#WikiaPageHeader .tally > span').html('<br />' + lng.characters);
                    }
 
                    // Alert when reloading or closing the page
                    window.onbeforeunload = function () {
                        return lng.unpublished;
                    };
                });
 
                // Alert if a new version of the code exists
                $.get(mw.util.wikiScript(), {
                    title  : mw.config.get('wgPageName'),
                    action : 'raw',
                    maxage : 0,
                    smaxage: 0
                }, function (data) {
                    if (data !== cd.getValue()) {
                        GlobalNotification.show(lng.newVersion + ' <button id="no">' + lng.no + '</button> <button id="yes">' + lng.yes + '</button>', 'error');
 
                        $('.global-notification').on('click', '#yes', function () {
                            cd.setValue(data);
                            GlobalNotification.hide();
                        }).on('click', '#no', function () {
                            GlobalNotification.hide();
                        });
                    }
                });
 
                // Publish
            }).on('click', '#WikiaPageHeader #publish', function () {
                // Removals
                GlobalNotification.hide();
                $('#minify').remove();
 
                // Change button to throbber
                $(this).parent().replaceWith('<img src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" />');
 
                // Enable read-only mode
                $('#summary').attr('disabled', 'disabled');
                cd.setOption('readOnly', 'nocursor');
 
                $('.CodeMirror').css('background', '#F7F7F7');
 
                // Start publishing
                $.post(mw.config.get('wgServer') + '/api.php', {
                    action : 'edit',
                    title  : mw.config.get('wgPageName'),
                    text   : cd.getValue(),
                    summary: $('#summary').val(),
                    token  : mw.user.tokens.values.editToken
                }, function () {
                    $.get(mw.util.wikiScript(), {
                        title : mw.config.get('wgPageName'),
                        action: 'purge'
                    }, function () {
                        window.onbeforeunload = function () {};
 
                        location.reload(true);
                    });
                });
 
                // Disable navigating away when viewing the source
            }).on('click', '#WikiaPageHeader #ca-viewsource', function () {
                $(this).removeAttr('href');
 
                // Select minified code
            }).on('click', '#minify #all', function () {
                $('#minified').select();
 
                // Publish minified code
            }).on('click', '#minify #publish-min', function () {
                var $ths = $(this);
 
                $($ths).attr('disabled', 'disabled');
                $.post(mw.config.get('wgServer') + '/api.php', {
                    action: 'edit',
                    title : mw.config.get('wgPageName').replace(/\.js$/g, '.min.js'),
                    text  : $('#minified').val(),
                    token : mw.user.tokens.values.editToken
                }, function () {
                    $($ths).fadeOut();
                });
 
                // Paste to editor
            }).on('click', '#minify #paste', function () {
                cd.setValue($('#minified').val());
                $(this).fadeOut();
 
                // Show changes
            }).on('click', '#WikiaPageHeader #changes', function () {
                require(['wikia.ui.factory'], function (uiFactory) {
                    uiFactory.init(['modal']).then(function (uiModal) {
                        var shwChngsCnfg = {
                                type: 'default',
                                vars: {
                                    id     : 'shwChngs',
                                    size   : 'medium',
                                    content: '<div class="ArticlePreview" style="height: 555px; border: 1px solid #323232; font-size: 13px; padding: 10px; overflow: auto; -ms-overflow-x: hidden;"><div style="height: 100%; background: url(' + mw.config.get('stylepath') + '/common/images/ajax.gif) no-repeat center;"></div></div>',
                                    title  : lng.changes
                                }
                            };
 
                        uiModal.createComponent(shwChngsCnfg, function (shwChngs) {
                            shwChngs.show();
 
                            $.post(mw.util.wikiScript('index'), {
                                action : 'ajax',
                                rs     : 'EditPageLayoutAjax',
                                title  : mw.config.get('wgPageName'),
                                page   : 'SpecialCustomEditPage',
                                method : 'diff',
                                content: cd.getValue()
                            }, function (data) {
                                $('.ArticlePreview').html(data.html);
 
                                $('.pagetitle').remove();
                            });
                        });
                    });
                });
 
                // Shortcuts
            }).on('click', '#WikiaPageHeader #shortcut', function () {
                require(['wikia.ui.factory'], function (uiFactory) {
                    uiFactory.init(['modal']).then(function (uiModal) {
                        var shrtctsCnfg = {
                                type: 'default',
                                vars: {
                                    id     : 'shrtcts',
                                    size   : 'small',
                                    content: '<table class="wikitable" style="text-align: center; font-size: 13px; width: 100%;"><tbody><tr><th style="width: 30%;"> Alt →</th><td> Go to last character of selected line</td></tr><tr><th> Alt ←</th><td> Go to first character of selected line</td></tr><tr><th> Alt L</th><td> Go to line</td></tr><tr><th> Ctrl [</th><td> Indent less</td></tr><tr><th> Ctrl ]</th><td> Indent more</td></tr><tr><th> Ctrl B</th><td> Beautify</td></tr><tr><th> Ctrl D</th><td> Remove line</td></tr><tr><th> Ctrl F</th><td> Search</td></tr><tr><th> Ctrl G</th><td> Find next</td></tr><tr><th> Ctrl M</th><td> Minify</td></tr><tr><th> Ctrl Space</th><td> Open hints</td></tr><tr><th> F11</th><td> Go to (or exit from) full screen mode</td></tr><tr><th> Shift Ctrl F</th><td> Replace</td></tr><tr><th> Shift Ctrl G</th><td> Find previous</td></tr><tr><th> Shift Ctrl R</th><td> Replace all</td></tr></tbody></table>',
                                    title  : lng.shortcut
                                }
                            };
 
                        uiModal.createComponent(shrtctsCnfg, function (shrtcts) {
                            shrtcts.show();
                        });
                    });
                });
 
                // Save
            }).on('click', '#WikiaPageHeader #save', function () {
                $(this).removeAttr('href');
 
                localStorage.setItem(mw.config.get('wgDBname') + ' — ' + mw.config.get('wgPageName'), cd.getValue());
 
                if (!$('#WikiaPageHeader #load').length) {
                    $('#WikiaPageHeader #save').parent().after('<li><a id="load">' + lng.load + '</a></li>');
                }
 
                $(this).closest('.wikia-menu-button').removeClass('active');
 
                // Load
            }).on('click', '#WikiaPageHeader #load', function () {
                $(this).removeAttr('href');
 
                cd.setValue(localStorage.getItem(mw.config.get('wgDBname') + ' — ' + mw.config.get('wgPageName')));
 
                $(this).closest('.wikia-menu-button').removeClass('active');
 
                // Comments
            }).on('click', '#WikiaPageHeader .comments', function () {
                if (!cd.getOption('readOnly')) {
                    var hrf = $(this).attr('href');
 
                    $(this).removeAttr('href');
 
                    window.open(hrf);
                }
            });
        });
    });
}(this.jQuery, this.mediaWiki));