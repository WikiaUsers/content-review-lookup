

/**Imports**/
importArticles({
    type: "script",
    articles: [
        "u:dev:DISPLAYTITLE/code.js",
        "u:dev:AjaxBatchDelete/code.js",
        "u:dev:DupImageList/code.js",
        "MediaWiki:Wikia.js/Slider.js",
        "u:dev:DisplayClock/code.js",
        "u:community:MediaWiki:Snow.js"
    ]
});

Autosign = { talkNameSpaces: [1,3,5,7,9,11,13,15,110,111,115,401,500,501,502,503] };

/**********************************/
/* Background randomizer          */
/**********************************/
 
/*function randomBack () {
    var opts = [
		'https://images.wikia.nocookie.net/residentevil/images/thumb/f/fa/Resident_Evil_Revelations_wallpaper_-_Mountains.jpg/2000px-Resident_Evil_Revelations_wallpaper_-_Mountains.jpg'
	];
 
 
	if (wgPageName=='Main_Page')
		$('body').css('background-image','url(' + opts[0] + ')');
	else
		$('body').css('background-image','url(' + opts[Math.floor(opts.length*Math.random())] + ')');
}
 
$(randomBack);*/



/** 
 * Sine
 * documentation at: http://dev.wikia.com/wiki/Sine
 * © Peter Coester, 2012
 * 
 * __NOWYSIWYG__
 */
 
$(function () {
 
    window.Autosign = function (my) {
 
        if ('edit' != $.getUrlVar('action')) return {};
 
        if ('undefined' == typeof my.sign)   my.sign   = '~~' + String.fromCharCode(126) + '~';
        if ('undefined' == typeof my.spacer) my.spacer = '--';
        if ('undefined' == typeof my.talkNameSpaces) {
            my.talkNameSpaces = [1,3,5,7,9,11,13,15,110,111,114,116,401,500,501,502,503];
        }
 
        if ('undefined' != typeof my.init) return my;
 
        var doAutosign = -1 != my.talkNameSpaces.indexOf(parseInt(wgNamespaceNumber));
 
        var accountNav = $('#AccountNavigation');
        accountNav.before('<label><input id="Autosign" type="checkbox"> Autosign</label>');
        var signCheckbox = $('#Autosign');
 
        signCheckbox
        .attr('checked', doAutosign)
        .parent().css({
            position: 'absolute',
            left: accountNav.offset().left - $('#WikiaHeader').offset().left - signCheckbox.parent().width() + 'px',
            top: '6px'
        });
 
        var blocks, editor;
 
        my.add = function () {
            if (!signCheckbox.is(':checked')) return;
            switch (editor.mode) {
                case 'wysiwyg':
                    signWYSIWYG();
                    break;
                case 'source':
                    signSource();
                    break;
            }
        };
 
        my.init = function () {
            editor = getEditor();
            if (!editor) {
                window.setTimeout(
                    function () {
                        window.Autosign.init();
                    }, 100
                )
                return;
            }
            $('input#wpSave').click(window.Autosign.add);
            $('a#publish').click(window.Autosign.add);
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
 
        function signWYSIWYG () {
            var wysiwyg = editor.getEditbox();
            if (isAutosignd(wysiwyg)) return;
            blocks = wysiwyg.find('> *');
            if (!blocks.length) return;
            var b = blocks.last();
            var inserted = false;
            if (b.is('p,dl')) {
                inserted = insertAutosign(b);
            }
            if (!inserted) {
                wysiwyg.append(createAutosign());
            }
        }
 
        function createAutosign () {
            var s, left, depth, type = getIndentType();
            switch (type) {
                case 'p':
                    left = getIndent('p');
                    s = $('<p>' + basicAutosign() +  '</p>');
                    if (left) s = s.css({ marginLeft: left });
                break;
                case 'dl':
                    depth = getIndent('dl');
                    s = basicAutosign();
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
 
        function basicAutosign () {
            return my.sign;
        }
 
        function isAutosignd (element) {
            return basicAutosign() == element.text().trim().substr(-basicAutosign().length);
        }
 
        function spacedAutosign () {
            return (my.spacer.length ? ' ' + my.spacer + ' ' : ' ') + basicAutosign();
        }
 
        function isInline (element) {
            return 'inline' == element.css('display') && !element.is('img[class*="placeholder"]');
        }
 
        function insertAutosign (block) {
            var b = block;
            if (block.is('dl')) {
                b = block.find('dd:last');
                b = b.parent().children().last();
                if (!b.is('dd,p')) return false;
            }
            var contents = $.makeArray(b.contents());
            if (!contents.length) {
                b.append(basicAutosign());
                return true;
            }
            var c = $(contents.pop());
            if ('#text' == c[0].nodeName) {
                c.after(spacedAutosign());
                return true;
            }
            else if (c.is('br')) {
                var s = basicAutosign();
                if (contents.length) {
                    var prev = $(contents.pop());
                    if ('#text' != prev[0].nodeName && !isInline(prev)) return false;
                    s = spacedAutosign();
                }
                c.before(s);
                return true;
            }
            else if (isInline(c)) {
                c.after(spacedAutosign());
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
 
        function signSource () {
            var source = editor.getContent();
            if (!source.trim().length) return;
            var lines = source.split(/\r\n|\r|\n/).reverse();
            var l = lines[0].trim();
            var s = basicAutosign();
            if (l.length) {
                if (basicAutosign() == l.substr(-4)) return;
                if (isList(l) || isHeader(l) || isBlock(l)) {
                    s = "\r\n" + emptyAutosign(lines);
                } else {
                    s = spacedAutosign();
                }
            } else {
                s = emptyAutosign(lines);
                if (!s) return;
            }
            editor.setContent(source + s);
        }
 
        function emptyAutosign (lines) {
           var s = basicAutosign();
           for (var i = 1; i < Math.min(4, lines.length); i++) {
                var l = lines[i].trim();
                if (!l.length) continue;
                if (basicAutosign() == l.substr(-4)) return false;
                var m = l.match(/^(\:+)/);
                if (m) s = m[1] + s;
                break;
            }
            return s;
        }
 
        return my;
 
    }('undefined' == typeof window.Autosign ? {} : window.Autosign);
 
    if ('undefined' != window.Autosign && 'function' == typeof window.Autosign.init) {
        window.Autosign.init();
    }
});
//