/**
 * LW editor tools - Selection Tools
 *
 * Depends on: [[MediaWiki:EditorTools-common.js]]
 * <nowiki>
 */

/*jslint browser, long */
/*global prompt, jQuery, mediaWiki, lw */

(function ($, mw) {
    "use strict";

    var replaceModalContent = (
        "Search for:"
        + "<textarea id='replacemodal-searchtext' style='display:block; height:120px; width:98%;'></textarea>"
        + "Replace with:"
        + "<textarea id='replacemodal-replacetext' style='display:block; height:120px; width:98%;'></textarea>"
        + "<label><input id='replacemodal-regex' type='checkbox'>Interpret search as regular expression</label>"
        + "<button id='replacemodal-replace' style='float:right'>Replace text</button>"
    );

    function selectionHandler(event) {
        var $button = $(event.target);
        var pageText = lw.editbox.value;
        var cursorPos = lw.editbox.selectionStart;
        var selection = pageText.slice(cursorPos, lw.editbox.selectionEnd);

        if (selection === "" && $button.attr("title") !== "Replace all occurrences of selection") {
            lw.setButtonIcon($button, "notdone", 2000);
            return;
        }

        var replacement;
        var newPageText = pageText;

        function done() {
            if (pageText !== newPageText) {
                lw.editbox.value = newPageText;
                lw.setButtonIcon($button, "done", 2000);
            } else {
                lw.setButtonIcon($button, "nochange", 2000);
            }

            // restore cursor position
            lw.editbox.selectionStart = cursorPos + replacement.length;
            lw.editbox.selectionEnd = cursorPos + replacement.length;
            lw.editbox.focus();
        }

        function replaceText() {
            var useRegExp = $("#replacemodal-regex").prop("checked");
            var searchText = $("#replacemodal-searchtext").val();
            replacement = $("#replacemodal-replacetext").val();

            if (!useRegExp) {
                searchText = $.escapeRE(searchText);
            }

            newPageText = pageText.replace(new RegExp(searchText, "g"), replacement);

            $(".modalWrapper").closeModal();
            done();
        }

        switch ($button.attr("title")) {
        case "Lowercase selection":
            replacement = selection.toLowerCase();
            newPageText = pageText.slice(0, cursorPos) + replacement + pageText.slice(lw.editbox.selectionEnd);
            done();
            break;
        case "Uppercase selection":
            replacement = selection.toUpperCase();
            newPageText = pageText.slice(0, cursorPos) + replacement + pageText.slice(lw.editbox.selectionEnd);
            done();
            break;
        case "Replace all occurrences of selection":
            $.showModal("Replace all occurrences", replaceModalContent);
            $("#replacemodal-searchtext, #replacemodal-replacetext").val(selection);
            $("#replacemodal-replace").click(replaceText);
            break;
        default:
            lw.setButtonIcon($button, "notdone", 2000);
            return;
        }
    }

    mw.hook("lw.loadEditorTools").add(function () {
        lw.addEditorButton("Lowercase selection", selectionHandler, "/central/images/3/3f/Button_lowercase.png");
        lw.addEditorButton("Uppercase selection", selectionHandler, "/central/images/5/58/Button_uppercase.png");
        lw.addEditorButton("Replace all occurrences of selection", selectionHandler, "/central/images/5/59/Button_replace.png");
    });

}(jQuery, mediaWiki));