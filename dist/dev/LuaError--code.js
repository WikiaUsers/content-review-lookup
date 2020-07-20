// Shows lua error on hover / jumps to a particular line, and selects the text
// By Dessamator  
//Credit: 
//https://stackoverflow.com/questions/13650534/how-to-select-line-of-text-in-textarea
//https://makandracards.com/makandra/8247-scroll-a-textarea-to-a-given-line-with-jquery
$(window).load(function () {
    function langs(i18n) {
    "use strict";
    var sTagError = $(".scribunto-error");
    var sErrorMsg = $(".scribunto-error").attr("title");
    var $oTextArea = $("#wpTextbox1");
    var namespace = mw.config.get("wgCanonicalNamespace");
    var action = mw.config.get("wgAction");
    if (sTagError.length && !sErrorMsg) {
        $(".scribunto-error").attr("title", $(".scribunto-error").html());
    }
    var jumpline = function (lineNumber) {
        var lineHeight = parseInt($oTextArea.css("line-height"));
        $oTextArea.scrollTop(lineNumber * lineHeight);
    };
    var selectTextareaLine = function (tarea, lineNum) {
        lineNum = lineNum - 1; // array starts at 0
        var lines = tarea.value.split("\n");
        var x;
        // calculate start/end
        var startPos = 0;
        var endPos = tarea.value.length;
        for (x = 0; x < lines.length; x += 1) {
            if (x === lineNum) {
                break;
            }
            startPos += (lines[x].length + 1);
        }

        endPos = lines[lineNum].length + startPos;

        // do selection
        // Chrome / Firefox

        if (tarea.selectionStart !== undefined) {
            tarea.focus();
            tarea.selectionStart = startPos;
            tarea.selectionEnd = endPos;
            jumpline(lineNum);
            return true;
        }
        // IE
        if (document.selection && document.selection.createRange) {
            tarea.focus();
            tarea.select();
            var range = document.selection.createRange();
            range.collapse(true);
            range.moveEnd("character", endPos);
            range.moveStart("character", startPos);
            range.select();
            jumpline(lineNum);
            return true;
        }
    };
    if (namespace === "Module" && action === "edit") {
        var sLuaError = document.URL;
        var tErrorLine = sLuaError.match(/mw-ce-l([0-9]+)/i);
        if (tErrorLine) {
            var iErrorLine = Number(tErrorLine[1]);
            if (ace) {
                var editor = ace.edit("editarea");
                editor.selection.moveCursorToPosition({
                    row: iErrorLine - 1,
                    column: 0
                });
                editor.selection.selectLine();
            } else {
                selectTextareaLine(wpTextbox1, iErrorLine);
            }
        }

        document.onkeydown = function (e) {
            e = e || event;
            var gotoChar = "G";
            if (e.ctrlKey && e.keyCode === gotoChar.charCodeAt(0)) {
                e.preventDefault();
                var iLine = Number(prompt(i18n.msg('go').escape(), "1"));
                selectTextareaLine(wpTextbox1, iLine);
                return false;
            }
        };
    }
    }
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('LuaError').then(langs);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});