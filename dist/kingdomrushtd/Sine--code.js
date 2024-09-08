/** 
 * Sine
 * documentation at: https://dev.wikia.com/wiki/Sine
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
 */

$(function () {
    
    window.Sine = function (my) {
        
        if ('edit' != $.getUrlVar('action')) return {};
        
        if ('undefined' == typeof my.sine)   my.sine   = '~~' + String.fromCharCode(126) + '~';
        if ('undefined' == typeof my.spacer) my.spacer = '--';
        if ('undefined' == typeof my.talkNameSpaces) {
            my.talkNameSpaces = [1,3,5,7,9,11,13,15,110,111,114,116,401,500,501,502,503];
        }
        
        if ('undefined' != typeof my.init) return my;
        
        var doSine = -1 != my.talkNameSpaces.indexOf(parseInt(wgNamespaceNumber));
        
        var accountNav = $('#AccountNavigation');
        accountNav.before('<label><input id="Sine" type="checkbox"> Sine</label>');
        var sineCheckbox = $('#Sine');
        
        sineCheckbox
        .attr('checked', doSine)
        .parent().css({
            position: 'absolute',
            right: parseInt(accountNav.css('right'), 10) + accountNav.width() + 20 + 'px',
            top: '6px'
        });
        
        var blocks, editor;
        
        my.add = function () {
            if (!sineCheckbox.is(':checked')) return;
            switch (editor.mode) {
                case 'wysiwyg':
                    sineWYSIWYG();
                    break;
                case 'source':
                    sineSource();
                    break;
            }
        };
        
        my.init = function () {
            editor = getEditor();
            if (!editor) {
                window.setTimeout(
                    function () {
                        window.Sine.init();
                    }, 100
                );
                return;
            }
            $('input#wpSave').click(window.Sine.add);
            $('a#publish').click(window.Sine.add);
        };
        
        function getEditor () {
            if ('undefined' != typeof window.editorInstance) {
                return window.editorInstance;
            }
            if ('undefined' != typeof window.WikiaEditor && 'function' == typeof window.WikiaEditor.getInstance) {
                return window.WikiaEditor.getInstance();
            }
            return false;
        }
        
        function sineWYSIWYG () {
            var wysiwyg = editor.getEditbox();
            if (isSined(wysiwyg)) return;
            blocks = wysiwyg.find('> *');
            if (!blocks.length) return;
            var b = blocks.last();
            var inserted = false;
            if (b.is('p,dl')) {
                inserted = insertSine(b);
            }
            if (!inserted) {
                wysiwyg.append(createSine());
            }
        }
        
        function createSine () {
            var s, left, depth, type = getIndentType();
            switch (type) {
                case 'p':
                    left = getIndent('p');
                    s = $('<p>' + basicSine() +  '</p>');
                    if (left) s = s.css({ marginLeft: left });
                break;
                case 'dl':
                    depth = getIndent('dl');
                    s = basicSine();
                    for (var i = 0; i < depth; i++) {
                        s = '<dl><dd>' + s + '</dd></dl>';
                    }
                break;
            }
            return s;
        }
        
        function getIndentType () {
            for (var i = blocks.length - 1; i >= 0 ; i--) {
                var b = $(blocks[i]);
                if (b.is('p'))  return 'p';
                if (b.is('dl')) return 'dl';
            }
            return 'p';
        }
        
        function getIndent (type) {
            var b, left, depth;
            for (var i = blocks.length - 1; i >= 0 ; i--) {
                b = $(blocks[i]);
                if (b.is('p')) {
                    left = b.css('marginLeft');
                    return 'p' == type ? left : parseInt(left) / 20;
                }
                else if (b.is('dl')) {
                    depth = 0;
                    while (b.parents('dl').length) b = b.parents('dl');
                    b.find('dl').each( function(){
                        var d = $(this).parents('dl').length + 1;
                        if (d > depth) depth = d;
                    });
                    return 'dl' == type ? depth : (depth * 20).toString() + 'px';
                }
            }
            return 0;
        }
        
        function basicSine () {
            return my.sine;
        }
        
        function isSined (element) {
            return basicSine() == element.text().trim().substr(-basicSine().length);
        }
        
        function spacedSine () {
            return (my.spacer.length ? ' ' + my.spacer + ' ' : ' ') + basicSine();
        }

        function isInline (element) {
            return 'inline' == element.css('display') && !element.is('img[class*="placeholder"]');
        }
        
        function insertSine (block) {
            var b = block;
            if (block.is('dl')) {
                b = block.find('dd:last');
                b = b.parent().children().last();
                if (!b.is('dd,p')) return false;
            }
            var contents = $.makeArray(b.contents());
            if (!contents.length) {
                b.append(basicSine());
                return true;
            }
            var c = $(contents.pop());
            if ('#text' == c[0].nodeName) {
                c.after(spacedSine());
                return true;
            }
            else if (c.is('br')) {
                var s = basicSine();
                if (contents.length) {
                    var prev = $(contents.pop());
                    if ('#text' != prev[0].nodeName && !isInline(prev)) return false;
                    s = spacedSine();
                }
                c.before(s);
                return true;
            }
            else if (isInline(c)) {
                c.after(spacedSine());
                return true;
            }
            return false;
        }
            
        function isList (line) {
            return /^\:*[*#]/.test(line);
        }
        
        function isHeader (line) {
            return /^(={2,6})[^=]+\1$/.test(line);
        }
        
        function isBlock (line) {
            return /(?:----|\}\}|<\/(?:blockquote|div|pre|code|nowiki)>)$/.test(line);
        }
        
        function sineSource () {
            var source = editor.getContent();
            if (!source.trim().length) return;
            var lines = source.split(/\r\n|\r|\n/).reverse();
            var l = lines[0].trim();
            var s = basicSine();
            if (l.length) {
                if (basicSine() == l.substr(-4)) return;
                if (isList(l) || isHeader(l) || isBlock(l)) {
                    s = "\r\n" + emptySine(lines);
                } else {
                    s = spacedSine();
                }
            } else {
                s = emptySine(lines);
                if (!s) return;
            }
            editor.setContent(source + s);
        }
        
        function emptySine (lines) {
           var s = basicSine();
           for (var i = 1; i < Math.min(4, lines.length); i++) {
                var l = lines[i].trim();
                if (!l.length) continue;
                if (basicSine() == l.substr(-4)) return false;
                var m = l.match(/^(\:+)/);
                if (m) s = m[1] + s;
                break;
            }
            return s;
        }
        
        return my;
        
    }('undefined' == typeof window.Sine ? {} : window.Sine);
    
    if ('undefined' != window.Sine && 'function' == typeof window.Sine.init) {
        window.Sine.init();
    }
});