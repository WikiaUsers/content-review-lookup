/**
 * LW editor tools - Tidy Lyrics
 *
 * Depends on: [[MediaWiki:EditorTools-common.js]]
 * Used files: [[File:Lw Button Tidy.png]] [[File:Lw Button Annotations.png]]
 * <nowiki>
 */

/*jslint browser */
/*global window, jQuery, mediaWiki, lw */

(function ($, mw) {
    "use strict";

    var annotations = [];
    var annotationsButtonAdded = false;
    var editSummary = window.codeLoad
        ? window.codeLoad.getScriptPrefs("TidyLyrics")
        : {
            "annotations-summary": "move annotations to creditbox",
            "linebreaks-summary": "line breaks",
            "tidylyrics-summary": "formatting"
        };


    function noApostrophe(contraction) {
        var parts = contraction.split("'");
        return new RegExp("\\b(" + parts[0] + ")(" + parts[1] + ")\\b", "gi");
    }

    function makeUppercase(match) {
        return match.toUpperCase();
    }

    function expandLine(ignore, p1, p2) {
        var line = p1.trim();
        var repeat = parseInt(p2.replace("x", ""), 10);
        var expandedLines = line;
        while (repeat > 1) {
            expandedLines += "\n" + line;
            repeat -= 1;
        }
        return expandedLines;
    }

    function eolCheck(ignore, p1, p2, p3) {
        var replacement = "";

        // shift if there are only two capture groups
        if (typeof p3 !== "string") {
            p3 = p2;
            p2 = p1;
            p1 = "";
        }

        var questionPos = p2.indexOf("?");
        var exclamationPos = p2.indexOf("!");

        // keep "..."
        if (p2.slice(-3) === "...") {
            replacement = p2;
        }

        // keep space before "?" or "!"
        if (
            (questionPos > 0 && p2[questionPos - 1] === " ")
            || (exclamationPos > 0 && p2[exclamationPos - 1] === " ")
        ) {
            replacement = " ";
        }
        // keep single "?"
        if (questionPos !== -1) {
            replacement += "?";
        }
        // keep single "!"
        if (exclamationPos !== -1) {
            replacement += "!";
        }

        // keep space before a closing quote or bracket
        if (p3 !== "" && p2.slice(-1) === " ") {
            replacement += " ";
        }

        // p1, if not empty, will be two characters captured before full stop to check for initialisms
        // p3, if not empty, will be a closing quote or bracket
        return p1 + replacement + p3;
    }

    function collectAnnotations(match, p1) {
        annotations.push("* " + match);
        return p1;
    }

    function bracketCheck(match) {
        // only replace single brackets
        switch (match) {
        case "[":
        case "{":
            return "(";
        case "]":
        case "}":
            return ")";
        default:
            return match;
        }
    }


    function addAnnotations(event) {
        var $button = $(event.target);
        var pageText = lw.editbox.value;

        var annotationsList = "|header1 = Annotations\n|text1 = \n" + annotations.join("\n");

        if (pageText.indexOf("{{CreditBox") !== -1) {
            lw.editbox.value = pageText.replace("{{CreditBox", "{{CreditBox\n" + annotationsList);
        } else {
            lw.editbox.value = pageText.replace("</lyrics>", "</lyrics>\n\n{{CreditBox\n" + annotationsList + "\n}}");
        }

        lw.addToEditSummary(editSummary["annotations-summary"]);
        $button.remove();
    }

    function tidyLineBreaks(originalLyrics) {
        var selection = lw.editbox.value.slice(lw.editbox.selectionStart, lw.editbox.selectionEnd);
        var trimmedLyrics = originalLyrics.slice(8, -9).trim();
        var lyrics = trimmedLyrics;

        // check if every line is followed by two line breaks
        if (lyrics.match(/^(?:.*?\n\n)+.+$/)) {
            // replace every two line breaks with just one
            lyrics = lyrics.replace(/\n\n/g, "\n");
        }

        if (selection) {
            lyrics = lyrics
                .replace(/\s*\n\s*/g, " ")  // remove existing line breaks (and surrounding spaces), and replace with space
                .replace(new RegExp($.escapeRE(selection), "g"), "\n");  // replace occurrences of the selected text with a line break
        }

        // only return new text if it actually changed (i.e. it wasn't changed only due to trim)
        return lyrics !== trimmedLyrics
            ? "<lyrics>\n" + lyrics + "\n</lyrics>"
            : originalLyrics;
    }

    function tidyLineBreaksHandler(event) {
        var $button = $(event.target);
        var pageText = lw.editbox.value;

        var newPageText = pageText.replace(/<lyrics>[\s\S]+?<\/lyrics>/g, tidyLineBreaks);

        if (pageText !== newPageText) {
            lw.addToEditSummary(editSummary["linebreaks-summary"]);
            lw.editbox.value = newPageText;
            lw.setButtonIcon($button, "done", 3000);
        } else {
            lw.setButtonIcon($button, "nochange", 3000);
        }
    }

    function tidyLyrics(lyrics) {
        lyrics = lyrics.slice(8, -9).trim()
            .replace(/\[\[(?:[^|\]]+\|)?(.+?)\]\]/g, collectAnnotations)          // remove wiki-links
            .replace(/\{\{[Ll]w\|(?:[^|}]+\|)?(.+?)\}\}/g, collectAnnotations)    // remove lw template links
            .replace(/\{\{[Ww]pi?\|(?:[^|}]+\|)?(.+?)\}\}/g, collectAnnotations)  // remove wikipedia template links
            .replace(/^[ \t]+/gm, "")                 // remove spaces+tabs at line start
            .replace(/[ \t]+$/gm, "")                 // remove spaces+tabs at line end
            .replace(/[‘’‹›‚‛`´]/g, "'")              // single quotes
            .replace(/[“”«»„‟]/g, '"')                // double quotes
            .replace(/[−–—]/g, "-")                   // dashes/hyphens
            .replace(/…/g, "...")                     // ellipses
            .replace(/(?: ?\.){3,}/g, "...")          // replace longer/spaced ellipses
            .replace(/[\[\]{}]+/g, bracketCheck)      // brackets
            .replace(/^[('"¡¿]?\S/gm, makeUppercase)  // caps at line start
            .replace(/^(.+)\((x\d+|\d+x)\)$/gmi, expandLine)  // expand lines ending with (x2), (4X), etc.
            .replace(/([^.].)(\.+)([)"']?)$/gm, eolCheck)     // tidy end-of-line full stops, with check for initialisms
            .replace(/([ 。,、!?;\-]+)([)"']?)$/gm, eolCheck);  // tidy end-of-line punctuation

        switch (lw.editSongLanguage) {
        case "English":
            lyrics = lyrics
                .replace(noApostrophe("ain't"), "$1'$2")      // ↓ add apostrophes where possible
                .replace(noApostrophe("couldn't"), "$1'$2")   //   note this isn't possible for all contractions,
                .replace(noApostrophe("didn't"), "$1'$2")     //   as both forms may be correct (e.g. well/we'll)
                .replace(noApostrophe("don't"), "$1'$2")
                .replace(noApostrophe("he's"), "$1'$2")
                .replace(noApostrophe("I'm"), "$1'$2")
                .replace(noApostrophe("I've"), "$1'$2")
                .replace(noApostrophe("she's"), "$1'$2")
                .replace(noApostrophe("that's"), "$1'$2")
                .replace(noApostrophe("there'll"), "$1'$2")
                .replace(noApostrophe("there's"), "$1'$2")
                .replace(noApostrophe("what's"), "$1'$2")
                .replace(noApostrophe("would've"), "$1'$2")
                .replace(noApostrophe("you're"), "$1'$2")
                .replace(noApostrophe("you've"), "$1'$2")
                .replace(/[\s("']i[\s)"']/g, makeUppercase);  // uppercase i, i'm, etc.
            break;
        case "Turkish":
            lyrics = lyrics
                .replace(/ð/g, "ğ")  // ↓ fix common encoding issues
                .replace(/Ð/g, "Ğ")
                .replace(/ý/g, "ı")
                .replace(/Ý/g, "İ")
                .replace(/þ/g, "ş")
                .replace(/Þ/g, "Ş");
            break;
        }

        return "<lyrics>\n" + lyrics + "\n</lyrics>";
    }

    function tidyLyricsHandler(event) {
        var $button = $(event.target);
        var pageText = lw.editbox.value;

        var newPageText = pageText.replace(/<lyrics>[\s\S]+?<\/lyrics>/g, tidyLyrics);

        if (lw.editPageType === "Song") {
            newPageText = newPageText
                .replace(/\s*<lyrics>/g, "\n\n<lyrics>")           // new line before <lyrics>
                .replace(/<\/lyrics>\s*/g, "</lyrics>\n\n")        // new line after </lyrics>
                .replace(/\s*(?=\{\{SongFooter)/, "\n\n");         // new line before SongFooter template
        }

        newPageText = newPageText
            .replace(/\=\n\n<lyrics>/g, "=\n<lyrics>")         // no empty line before <lyrics> if used in template parameter
            .replace(/<\/lyrics>\n\n\}\}/g, "</lyrics>\n}}");  // no empty line after </lyrics> if used in template parameter

        if (pageText !== newPageText) {
            lw.addToEditSummary(editSummary["tidylyrics-summary"]);
            lw.editbox.value = newPageText;
            lw.setButtonIcon($button, "done", 3000);
        } else {
            lw.setButtonIcon($button, "nochange", 3000);
        }

        if (!annotationsButtonAdded && annotations.length) {
            annotationsButtonAdded = true;
            lw.addEditorButton("Add annotations to CreditBox", addAnnotations, "/lyricwiki/images/d/dd/Lw_Button_Annotations.png");
        }
    }


    mw.hook("lw.loadEditorTools").add(function () {
        switch (lw.editPageType) {
        case "Song":
        case "TranslatedSong":
            lw.addEditorButton("Tidy lyrics", tidyLyricsHandler, "/lyricwiki/images/5/54/Lw_Button_Tidy.png");
            lw.addEditorButton("Attempt to fix line break issues", tidyLineBreaksHandler, "/central/images/1/13/Button_enter.png");
            break;
        }
    });

}(jQuery, mediaWiki));