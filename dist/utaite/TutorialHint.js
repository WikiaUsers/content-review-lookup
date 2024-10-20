/*This file is just for archive and for future reference*/
/*-----------------------------------------------------------------------------
//Tutorial Hints
//-----------------------------------------------------------------------------*/
var $textarea; 
var $highlights;

var tips = {};

function getTips() {
    $.ajax({
        url: 'https://utaite.fandom.com/wiki/MediaWiki:Tips.js?action=raw',
        success: function(html) {
            tips = JSON.parse(html);
            updateTips();
        }
    });
}

function applyHighlights(text) {
    if (!text) {
        return;
    }
    text = "<span class='notutorialinfo'>!<span class='tutorialtooltip'></span></span>" +
        text
        .replace(/</g, '&lt;')
        .replace(/\n/g, "\n<span class='notutorialinfo'>!<span class='tutorialtooltip'></span></span>") +
        "\r\n";
    var t = "";
    for (var i in tips) {
        if (tips.hasOwnProperty(i)) {
            text = text.replace(
                new RegExp(
                    "(^|\n)<span class='(.*)tutorialinfo'>!<span class='tutorialtooltip'>(.*)</span></span>(.*)" + i.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "(.*)\n", "g"
                ),
                "$1<span class='tutorialinfo'>!<span class='tutorialtooltip'>$3" + (tips[i].length === 1 ? tips[tips[i]] : tips[i]).join('\n')
                .replace(/'/g, "&#39")
                .replace(/"/g, "&quot;")
                .replace(new RegExp("<small>", "g"), "&lt;small&gt;")
                .replace(new RegExp("</small>", "g"), "&lt;/small&gt;")
                .replace(new RegExp("<ref>", "g"), "&lt;ref&gt;")
                .replace(new RegExp("</ref>", "g"), "&lt;/ref&gt;")
                .replace(new RegExp("<br>", "g"), "&lt;br&gt;")
                .replace(new RegExp("<tabber>", "g"), "&lt;tabber&gt;")
                .replace(new RegExp("</tabber>", "g"), "&lt;/tabber&gt;")
                .replace(new RegExp("<span style=info>", "g"), "<span style='color:#179e0a; font-size:larger'>")
                .replace(new RegExp("<span style=use>", "g"), "<span style='color:#0a689e; font-size:larger'>")
                .replace(new RegExp("<span style=ex>", "g"), "<span style='color:#9e0a9b; font-size:larger'>")
                .replace(new RegExp("<span style=imp>", "g"), "<span style='color:red; font-size:larger'>")
                .replace(new RegExp("<span style=ph>", "g"), "<span style='color:#707070'>") +
                "</span></span>$4" + i + "$5\n"
            );
        }
    }
    return text;
}
var time = 0;

function handleInput() {
    if (time + 1500 < Date.now()) {
        time = Date.now();
        updateTips();
    }
}

function updateTips() {
    var text = $textarea.val();
    var highlightedText = applyHighlights(text);
    $highlights.html(highlightedText);
}

function handleScroll(e) {
    if (e.target.scrollTop - $textarea.scrollTop() > 100 || $textarea.scrollTop() - e.target.scrollTop > 100) $textarea.scrollTop(e.target.scrollTop);
    $highlights.scrollTop(e.target.scrollTop);
}

function bindEvents() {
    $textarea.on({
        'input': handleInput,
        'scroll': handleScroll,
        'click': function(e) {
            startPos = $textarea.prop("selectionStart");
            endPos = $textarea.prop("selectionEnd");
        }
    });
    $highlights.on({
        'focus': function(e) {
            e.preventDefault();
        },
        'scroll': handleScroll
    });
}

//execute scripts when visual editor is loaded or when document.ready
$(function() {
    $('#mw-content-text').prepend("<div id='textareaoverlay'></div>");
    $highlights = $('#textareaoverlay');
    if (window.CKEDITOR) {
        CKEDITOR.on("instanceReady", function() {
            $(".cke_button__modesource").on({
                'click': switchToSource,
            });
            //if visual editor, switch to source editor by default
            $("#cke_1_contents").ready(function() {
                $(".cke_button__modesource").eq(0).trigger('click');
            });
            customPreloadTemplates();
            addfeatures();
            formatcaller();
        });
    } else {
        customPreloadTemplates();
        addfeatures();
        formatcaller();
        $textarea = $('#wpTextbox1');
        // Currently commented out above.
        bindEvents();
        getTips();
    }
});

function switchToSource(e) {
    var checkTextAreaExists = setInterval(function() {
        if ($('#cke_1_contents textarea').length) {
            clearInterval(checkTextAreaExists);
            $textarea = $('#cke_1_contents textarea');
            // Currently commented out above.
            bindEvents();
            getTips();
        }
    }, 500);
}