//

FindReplace = function () {
 
    var modules = [];
    done = false;
 
    function addMixin (assetName) {
        var callbacks = [];
        var called = false;
        var isDone = false;
        return {
            ready: function (callback) {
                if ('function' == typeof callback) {
                    if (called) callback();
                    else callbacks.push(callback);
                } else {
                    called = true;
                    console.log('FindReplace: ' + assetName + ' is ready');
                    while (callback = callbacks.shift()) callback();
                }
            },
            done: function () {
                if (isDone) return true;
                isDone = true;
                return false;
            }
        };
    }
 
    function loadLibrary (url, message) {
        var library = addMixin(message);
        $.getScript(url, library.ready);
        return library;
    }
 
    function createModule (moduleName, creator) {
        this[moduleName] = addMixin(moduleName);
        $.extend(this[moduleName], creator(this, this[moduleName]));
        modules.push(this[moduleName]);
    }
 
    function init (override) {
        if (done) return;
        if ('undefined' != typeof override) override = {};
        var m; while (m = modules.shift()) m.init(override);
        done = true;
    }
 
    return {
        TextInputs: loadLibrary(
            'http://dev.wikia.com/index.php?title=textinputs_jquery.js&action=raw&ctype=text/javascript',
            'textinputs_jquery.js'
        ),
        jQueryUI: loadLibrary(
            'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js',
            'jquery-ui.min.js'
        ),
        createModule: createModule,
        init: init 
    };
}();
 
FindReplace.createModule('Config', function (namespace, module) {
 
    var html;
 
    function getHTML () {
        return html;
    }
 
    function init (override) {
        if (module.done()) return;
        $.extend(module, override);
        $.get('http://pecoes.wikia.com/index.php?title=MediaWiki:FindReplaceDialog&action=raw&ctype=text/html&usemsgcache=yes&maxage=86400',
        function (data) {
            html = data;
            console.log('FindReplace: Dialog is ready');
            module.ready();
        });
    }
 
    return {
        init:            init,
        getHTML:         getHTML,
        findIcon:       'https://images.wikia.nocookie.net/__cb20120415071217/central/images/9/95/Search.png',
        replaceIcon:     'https://images.wikia.nocookie.net/__cb20120415071129/central/images/7/71/Replace.png',
        markColor:      '#700066',
        selectColor:    '#0000FF',
        //inputColor:
        inputDarkColor: '#DDDDDD',
        textColor:      '#000000',
        //borderColor:
        bgColor:        '#FFFFFF'
    }
});
 
FindReplace.createModule('UI', function (namespace, module) {
 
    var mode = 'find';
    var opened = false;
 
    var ui = null;
 
    var SMARTCASE = 1, NOCASE = 2, MATCHCASE = 3;
 
    var typeCase = 1;
    var isRegex = false;
    var i_modifier = false;
    var m_modifier = false;
 
    var prevFinds = [];
    var prevReplaces = [];
 
    function evaluate () {
 
        function escape (s) {
            return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }
 
        function smartCase (s) {
            return s.replace(/[a-z]/g, function (m) {
                return '[' + m[0].toUpperCase() + m[0] + ']'; 
            });
        }
 
        var s = ui.find.val();
        if (!s.length) return null;
        if (isRegex) {
            var modifier = 'g';
            if (i_modifier) modifier += 'i';
            if (m_modifier) modifier += 'm'
            return new RegExp(s, modifier);
        }
        var s = escape(s);
        switch (typeCase) {
            case SMARTCASE:
                return new RegExp(smartCase(s), 'g');
            case NOCASE:
                return new RegExp(s, 'gi');
            case MATCHCASE:
                return new RegExp(s, 'g');
        }
    }
 
    function blink () {
 
        function highlightStatus (on) {
            ui.status.css({
                color: on ? namespace.Config.bgColor : namespace.Config.textColor,
                backgroundColor: on ? namespace.Config.textColor : namespace.Config.bgColor
            });
        }
 
        for (var i = 0, on = true; i < 6; i++, on = !on) {
            if (i) window.setTimeout(function (on) {
                return function () {
                    highlightStatus(on);
                };
            }(on), 150 * i);
            else highlightStatus(on);
        }
    }
 
    function feedback (message) {
        if ('undefined' == typeof message) message = '&nbsp;';
        ui.status.empty().html(message);
    }
 
    function find () {
        var regex = evaluate();
        ui.prev.attr('disabled', null === regex);
        ui.next.attr('disabled', null === regex);
        console.log(regex);
        namespace.Shadow.setRegex(regex);
    }
 
    function addEvents () {
 
        ui.iconFind.css('cursor', 'pointer').click(function () {
            open('find');
        });
 
        ui.iconReplace.css('cursor', 'pointer').click(function () {
            open('replace');
        });
 
        ui.close.click(function () {
            close();
        });
 
        ui.typeCase.click(function () {
            typeCase = parseInt($(this).val());
            find();
        });
 
        ui.regex.click(function () {
            isRegex = $(this).is(':checked');
            if (isRegex) {
                $('#fr-modifiers').css({
                    width: $('#fr-options').width() + 'px',
                    display: 'inline'
                })
                $('#fr-options').css('display', 'none');
            } else {
                $('#fr-options').css('display', 'inline');
                $('#fr-modifiers').css('display', 'none');
            }
            find();
        });
 
        ui.toggle.click(function () {
            setMode($(this).is(':checked') ? 'replace' : 'find');
        });
 
        ui.i.click(function () {
           i_modifier = $(this).is(':checked');
           find();
        });
 
        ui.m.click(function () {
           m_modifier = $(this).is(':checked');
           find();
        });
 
        ui.replace.keyup(function () {
            if ($(this).val().length) setMode('replace');
        });
 
        ui.find.keyup(function (e) {
            //console.log('calling find');
            find();
            // when Enter/Return are hit start a search:
            if (!e.ctrlKey && (10 == e.which || 13 == e.which) && $(this).val().length) {
                namespace.Shadow.next();
                ui.next.focus();
            } else {
                $(this).focus();
            }
        });
 
        ui.prev.click(function (e) {
            namespace.Shadow.prev();
            $(this).focus();
            e.preventDefault();
        });
 
        ui.next.click(function (e) {
            namespace.Shadow.next();
            $(this).focus();
            e.preventDefault();
        });
 
        var watchKeys = function (e) {
            if (e.ctrlKey) switch(e.which) {
                case 102:  // Ctrl+F
                    namespace.UI.open('find');
                    e.preventDefault();
                break;
                case 103:  // Ctrl+G
                    namespace.UI.open('replace');
                    e.preventDefault();
                break;
                case 10:   // Ctrl+CR
                case 13:   // Ctrl+LF
                    namespace.UI.close();
                    e.preventDefault();
                break;
            }
        };
 
        //console.log('namespace.Shadow.ready');
        //console.log(watchKeys);
        namespace.Shadow.getTextarea().keypress(watchKeys);
        namespace.Shadow.getTextarea().keypress(function (e) {
            if (e.ctrlKey && 32 == e.which) {   // Ctrl+Space
                namespace.UI.switchTo();
                e.preventDefault();
            }
        });
 
        ui.dialog.keypress(watchKeys);
        ui.dialog.keypress(function (e) {
            if (e.ctrlKey && 32 == e.which) {   // Ctrl+Space
                namespace.Shadow.switchTo();
                e.preventDefault();
            }
        });
 
        feedback();
    }
 
    function init () {
        if (module.done()) return;
        namespace.Config.ready(function () {
 
            // these settings may not work well, if site uses custom toolbar buttons:
            $('div#cke_toolbar_source_1 > *:last').before(
                '<img id="fr-icon-find" title="Find (Ctrl+F)" src="' + namespace.Config.findIcon + '">'
            );
            $('div#cke_toolbar_source_1 > *:last').before(
                '<img id="fr-icon-replace" title="Replace (Ctrl+G)" src="' + namespace.Config.replaceIcon + '">'
            );
            if ($('.editpage-sourcewidemode').length) {
                $('#cke_toolbar_source_1').css({
                    width: $('#cke_toolbar_source_1').width() + 45 + 'px'
                });
                $('textarea#wpSummary').css({
                    left: parseInt($('textarea#wpSummary').css('left'))  + 45 + 'px'
                })
                $('label.wpMinoredit').css({
                    left: parseInt($('label.wpMinoredit').css('left'))  + 45 + 'px'
                });
            }
 
            $('body').append(namespace.Config.getHTML());
 
            ui = {
                iconFind:    $('#fr-icon-find'),
                iconReplace: $('#fr-icon-replace'),
                dialog:      $('#fr-ui'),
                find:        $('input#fr-find-text'),
                replace:     $('input#fr-replace-text'),
                prev:        $('input#fr-prev'),
                next:        $('input#fr-next'),
                toggle:      $('input#fr-toggle'),
                regex:       $('input#fr-regex'),
                i:           $('input#fr-regex-i'),
                m:           $('input#fr-regex-m'),
                typeCase:    $('input[name="fr-case"]'),
                close:       $('#fr-close'),
                replaceThis: $('input#fr-replace'),
                replaceAll:  $('input#fr-replace-all'),
                status:      $('#fr-status'),
                title:       $('#fr-title')
            };
 
            var textarea = WikiaEditor.getInstance().getEditbox();
            ui.dialog.css({
                left: textarea.width() + textarea.offset().left - ui.dialog.width() + 100 + 'px',
                top:  textarea.offset().top + 60 + 'px',
                display: 'none'
            });
 
            namespace.Shadow.ready(addEvents);
            namespace.jQueryUI.ready(function () {
                ui.dialog.draggable();
            });
            module.ready();
        });
    }
 
    function open (newMode) {
        if (!opened) {
            ui.dialog.show('clip', 180);
        }
        ui.find.val(namespace.Shadow.getSelected());
        ui.find.focus();
        if (ui.find.val().length) {
            ui.find.setSelection(0, ui.find.val().length);
        }
        setMode(newMode);
        opened = true;
        find();
    }
 
    function switchTo () {
        if (!opened) return;
        console.log('switching to dialog');
        ui.find.focus();
        if (ui.find.val().length) {
            ui.find.setSelection(0, ui.find.val().length);
        }
        find();
    }
 
    function close () {
        ui.dialog.hide('clip', 180);
        opened = false;
        console.log('closing %o', namespace.Shadow);
        namespace.Shadow.setRegex(null);
        namespace.Shadow.getTextarea().focus();
    }
 
    function getMode () {
        return mode;
    }
 
    function setMode (newMode) {
        switch (newMode) {
            case 'find':
                mode = 'find';
                ui.title.html('Find');
                ui.toggle.attr('checked', false);
                ui.replace.val('').css('background-color', namespace.Config.inputDarkColor);
                ui.replaceThis.attr('disabled', true);
                ui.replaceAll.attr('disabled', true);
            break;
            case 'replace':
                mode = 'replace';
                var noText = 0 == ui.find.val().length;
                ui.title.html('Replace');
                ui.toggle.attr('checked', true);
                ui.replaceThis.attr('disabled', noText);
                ui.replaceAll.attr('disabled', noText);
                ui.replace.css('background-color', namespace.Config.bgColor);
            break;
        }
    }
 
    function getDialog () {
        return ui.dialog;
    }
 
    return {
        init:      init,
        getDialog: getDialog,
        evaluate:  evaluate,
        blink:     blink,
        feedback:  feedback,
        open:      open,
        close:     close,
        setMode:   setMode,
        getMode:   getMode,
        switchTo:  switchTo
    }
});
 
FindReplace.createModule('Shadow', function (namespace, module) {
 
    var textarea;
    var shadow;
    var matches = [];
    var highlighted = -1;
    var regex = null;
    var replace = null;
    var numTraversed = 0;
 
    function init () {
        if (module.done()) return;
        namespace.TextInputs.ready (function () {
 
            textarea = WikiaEditor.getInstance().getEditbox();
            textarea.after('<div id="fr-shadow"></div>');
            shadow = $('#fr-shadow');
 
            // too much hardcoding!!!
            var commonCSS = {
                width: '100%', left: 0, top: 0, border: '0 none', display: 'block',
                outline: 'medium none', margin: 0, padding: 0, resize: 'none'
            };
 
            textarea.css(commonCSS).css({
                position: 'relative', zIndex: '1',
                backgroundColor: 'transparent'
            });
 
            shadow.css(commonCSS).css({
                position: 'absolute', zIndex: '0',
                fontFamily: textarea.css('font-family'),
                fontSize: textarea.css('font-size'),
                lineHeight: textarea.css('line-height'),
                whiteSpace: 'pre-wrap',
                backgroundColor: 'transparent',
                color: 'transparent',
                overflow: 'auto'
            });
 
            //console.log('Shadow.scroll');
            textarea.scroll(function () {
                //shadow.css('height', textarea.height());
                shadow.scrollTop(textarea.scrollTop());
            });
 
            //console.log('readying switch');
            namespace.UI.ready(function () {
 
                textarea.focus();
                textarea.keyup (synch);
                textarea.click (synch);
                synch();
            });
            //console.log('readied switch');
 
            module.ready();
        });
    }
 
    function synch () {
        console.log('synching');
        matches = [];
        if (regex instanceof RegExp) {
            var s = textarea.val();
            regex.lastIndex = 0;
            while (m = regex.exec(s)) {
                matches.push({
                    found: m[0], index: m.index, traversed: false
                })
                regex.lastIndex = m.index + m[0].length;
            }
            namespace.UI.feedback('found ' + matches.length + ' matches');
        } else {
            namespace.UI.feedback('&nbsp;');
        }
        console.log('matches: %o', matches);
        shadow.html(function () {
            var s = textarea.val();
            console.log('textarea.val().length: %u', s.length);
            var r = '';
            for (var i = 0, start = 0; i < matches.length; i++) {
                r += s.substr(start, matches[i].index - start);
                start = matches[i].index + matches[i].found.length;
                r += '<span id="fr' + i + '" style="background-color: ' +
                    namespace.Config.markColor + '">' + matches[i].found + '</span>';
            }
            if (s.substr(start+1).length > 0) {
                r += s.substr(start+1);
            }
            return r.length ? r : s;
        });
        shadow.css('height', textarea.height());
        shadow.scrollTop(textarea.scrollTop());
    }
 
    function setRegex (newRegex) {
        regex = newRegex;
        synch();
    }
 
    function highlight (high) {
        if (-1 != highlighted) {
            $('#fr' + highlighted).css('background-color', namespace.Config.markColor);
        }
        $('#fr' + high).css('background-color', namespace.Config.selectColor);
        highlighted = high;
        textarea.setSelection(
            matches[high].index, matches[high].index + matches[high].found.length
        );
        if (numTraversed == matches.length) {
            for (var i = 0; i < matches.length; i++) matches[i].traversed = false;
            numTraversed = 0;
        }
        if (!matches[high].traversed) {
            matches[high].traversed = true;
            numTraversed++
            namespace.UI.feedback('match ' + numTraversed + ' of ' + matches.length);
            if (numTraversed == matches.length) namespace.UI.blink();
        }
    }
 
    function next () {
        if (!matches.length) return;
        textarea.focus();
        var n = 0;
        var sel = textarea.getSelection();
        for (var i = 0; i < matches.length; i++) {
            //console.log('sel.start %u, sel.end %u, matches[i] %o', sel.start, sel.end, matches[i]);
            if (sel.end < matches[i].index + matches[i].found.length) {
                n = i;
                break;
            }
        }
        //console.log('next %u', n);
        highlight(n);
    }
 
    function prev () {
        if (!matches.length) return;
        textarea.focus();
        var p = matches.length-1;
        var sel = textarea.getSelection();
        for (var i = matches.length-1; i >= 0; i--) {
            //console.log('sel.start %u, sel.end %u, matches[i] %o', sel.start, sel.end, matches[i]);
            if (sel.start > matches[i].index) {
                p = i;
                break;
            }
        }
        //console.log('prev %u', p);
        highlight(p);
    }
 
    function getSelected () {
        textarea.focus();
        var sel = textarea.getSelection();
        console.log('prefill %o', sel);
        if (sel.start == sel.end) return '';
        return sel.text;
    }
 
    function getShadow () {
        return shadow;
    }
 
    function getTextarea () {
        return textarea;
    }
 
    function switchTo () {
        textarea.focus();
    }
 
    return {
        init:          init,
        getShadow:     getShadow,
        getTextarea:   getTextarea,
        setRegex:      setRegex,
        setReplace:    function () {},
        prev:          prev,
        next:          next,
        replace:       function () {},
        replaceAll:    function () {},
        getSelected:   getSelected,
        isReplaceable: function () {},
        switchTo:      switchTo
    }
});
 
$(function () {
    function waitForEditor () {
        if ('undefined' == typeof WikiaEditor ||
            'undefined' == typeof WikiaEditor.getInstance ||
            'undefined' == typeof WikiaEditor.getInstance() ||
            'undefined' == typeof WikiaEditor.getInstance().mode ||
            'source' != WikiaEditor.getInstance().mode
        ) {
            window.setTimeout(function () {
                console.log('waiting...');
                waitForEditor();
            }, 500);
            return;
        }
        FindReplace.init();
    }
    waitForEditor();
});
//