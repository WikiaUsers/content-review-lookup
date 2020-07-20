/**
 * ChatTags
 *   By [[User:AnimatedCartoons]]
 */
(function ($) {
    'use strict';

    // Translations
    var lng = {
        // English
        en: {
            hide: 'Hide spoiler',
            show: 'Show spoiler'
        },
        // Polski
        pl: {
            hide: 'Ukryj',
            show: 'Pokaż'
        },
        // Português do Brasil
        pt-br: {
            hide: 'Esconder spoiler',
            show: 'Mostrar spoiler'
        }
    };

    lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')]);

    mainRoom.model.chats.bind('afteradd', function (chat) {
        var t  = chat.attributes.text,
            $m = $('#Chat_' + roomId + ' .message:last').html();

        // Background
        if (t.match(/(?=.*\[bg .*\])(?=.*\[\/bg\])/i)) {
            $m = $m.replace(/\[bg (.*?)\]/gi, '<span style="background-color: $1">').replace(/\[\/bg\]/gi, '</span>');
        }

        // Big
        if (t.match(/(?=.*\[big\])(?=.*\[\/big\])/gi)) {
            $m = $m.replace(/\[big\]/gi, '<span style="font-size: larger">').replace(/\[\/big\]/gi, '</span>');
        }

        // Boldface
        if (t.match(/(?=.*\[b\])(?=.*\[\/b\])/gi)) {
            $m = $m.replace(/\[b\]/gi, '<span style="font-weight: bold">').replace(/\[\/b\]/gi, '</span>');
        }

        // Color
        if (t.match(/(?=.*\[c .*\])(?=.*\[\/c\])/i)) {
            $m = $m.replace(/\[c (.*?)\]/gi, '<span style="color: $1">').replace(/\[\/c\]/gi, '</span>');
        }

        // Font
        if (t.match(/(?=.*\[f .*\])(?=.*\[\/f\])/i)) {
            $m = $m.replace(/\[f (.*?)\]/gi, '<span style="font-family: $1">').replace(/\[\/f\]/gi, '</span>');
        }

        // Image
        if (t.match(/(?=.*\[img .*\])/i)) {
            $m = $m.replace(/\<a.*?\>/gi, '').replace(/\<\/a\>/gi, '').replace(/\[img (.*?)\]/gi, '<img src="$1" style="max-height: 200px; max-width: 200px" />');
        }

        // Italicize
        if (t.match(/(?=.*\[i\])(?=.*\[\/i\])/i)) {
            $m = $m.replace(/\[i\]/gi, '<span style="font-style: italic">').replace(/\[\/i\]/gi, '</span>');
        }

        // Preformatted
        if (t.match(/(?=.*\[p\])(?=.*\[\/p\])/i)) {
            $m = $m.replace(/\[p\]/gi, '<pre>').replace(/\[\/p\]/gi, '</pre>');
        }

        // Small
        if (t.match(/(?=.*\[small\])(?=.*\[\/small\])/gi)) {
            $m = $m.replace(/\[small\]/gi, '<small>').replace(/\[\/small\]/gi, '</small>');
        }

        // Spoiler
        if (t.match(/(?=.*\[sp\])(?=.*\[\/sp\])/gi)) {
            $m = $m.replace(/\[sp\]/gi, '<button id="spoil">Show spoiler</button>&nbsp;<span id="spoil2" style="display: none">').replace(/\[\/sp\]/gi, '</span>');
        }

        // Strikethrough
        if (t.match(/(?=.*\[s\])(?=.*\[\/s\])/i)) {
            $m = $m.replace(/\[s\]/gi, '<span style="text-decoration: line-through">').replace(/\[\/s\]/gi, '</span>');
        }

        // Subscript
        if (t.match(/(?=.*\[sub\])(?=.*\[\/sub\])/i)) {
            $m = $m.replace(/\[sub\]/gi, '<sub>').replace(/\[\/sub\]/gi, '</sub>');
        }

        // Superscript
        if (t.match(/(?=.*\[sup\])(?=.*\[\/sup\])/i)) {
            $m = $m.replace(/\[sup\]/gi, '<sup style="vertical-align: top">').replace(/\[\/sup\]/gi, '</sup>');
        }

        // Underline
        if (t.match(/(?=.*\[u\])(?=.*\[\/u\])/i)) {
            $m = $m.replace(/\[u\]/gi, '<span style="text-decoration: underline">').replace(/\[\/u\]/gi, '</span>');
        }

        // YouTube
        if (t.match(/(?=.*\[yt .*\])/i)) {
            $m = $m.replace(/\[yt (.*?)\]/gi, '<iframe width="400" height="215" src="http://youtube.com/embed/$1?autohide=1&rel=0" frameborder="0" allowfullscreen />');
        }

        $('#Chat_' + roomId + ' .message:last').html($m);
    });

    $('body').on('click', '#spoil', function () {
        var $s = $(this).siblings('#spoil2');

        if ($($s).is(':hidden')) {
            $(this).text(lng.hide);
            $($s).show();
        } else {
            $(this).text(lng.show);
            $($s).hide();
        }
    });
}(this.jQuery));