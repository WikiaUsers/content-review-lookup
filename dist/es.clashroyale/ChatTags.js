**
 * '''ChatTags'''
 *   By [[User:AnimatedCartoons]]
 */
(function ($) {
    'use strict';

    var disable = $.isArray(window.chatTagsDisable) ? window.chatTagsDisable : [];

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
        // Português
        'pt-br': {
            hide: 'Esconder',
            show: 'Mostrar'
        },
        // Español
        es: {
            hide: 'Ocultar spoiler',
            show: 'Mostrar spoiler'
        },
        // Català
        ca: {
            hide: 'Amaga spoiler',
            show: 'Mostra spoiler'
        },
        // Italiano
        it: {
            hide: 'Nascondere spoiler',
            show: 'Mostrare spoiler'
        },
        // Français
        fr: {
            hide: 'Cacher spoiler',
            show: 'Montrer spoiler'
        },
        // 日本の (Japanase)
        ja: {
            hide: '隠すスポイラー',
            show: '表示スポイラー'
        },
        // русский  (Russian)
        ru: {
            hide: 'Скрыть спойлер',
            show: 'Показать спойлер'
        },
        // Deutsch
        de: {
            hide: 'Spoiler ausblenden',
            show: 'Spoiler anzeigen'
        }
    };

    lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')]);

    mainRoom.model.chats.bind('afteradd', function (chat) {
        var t = chat.attributes.text,
            $m = $('#Chat_' + roomId + ' .message:last').html();

        if ($.inArray('*bg', disable) === -1) {
            // Message line background
            if (t.match(/(?=.*\[\*bg .*\])/gi)) {
                $m = $m.replace(/<a.*?\>/gi, '').replace(/<\/a\>/gi, '');

                var bckgrnd = (/\[\*bg (.*?)\]/gi).exec($m);

                if (bckgrnd[1].match(/^https?:\/\//gi)) {
                    $('#Chat_' + roomId + ' li:last').css('background-image', 'url(' + bckgrnd[1] + ')');
                } else {
                    $('#Chat_' + roomId + ' li:last').css('background-color', bckgrnd[1]);
                }

                $m = $m.replace(/\[\*bg (.*?)\]/gi, '');
            }
        }
        
        if ($.inArray('w1', disable) === -1) {
            //Warning 1
            if (t.match(/(?=.*\[w1 .*\])/gi)) {
                $m = $m.replace(/\[w1 (.*?)\]/gi, '<span style="color: red;">Warning 1: $1</span>');
            }
        }
        
        if ($.inArray('w2', disable) === -1) {
            //Warning 2
            if (t.match(/(?=.*\[w2 .*\])/gi)) {
                $m = $m.replace(/\[w2 (.*?)\]/gi, '<span style="color: red;">Warning 2: $1</span>');
            }
        }
        
        if ($.inArray('w3', disable) === -1) {
            //Warning 3
            if (t.match(/(?=.*\[w3 .*\])/gi)) {
                $m = $m.replace(/\[w3 (.*?)\]/gi, '<span style="color: red;">Warning 3: $1</span>');
            }
        }

        if ($.inArray('b', disable) === -1) {
            // Boldface
            if (t.match(/(?=.*\[b\])(?=.*\[\/b\])/gi)) {
                $m = $m.replace(/\[b\]/gi, '<span style="font-weight: bold">').replace(/\[\/b\]/gi, '</span>');
            }
        }
        
        if ($.inArray('q', disable) === -1) {
            // Quote
            if (t.match(/(?=.*\[q\])(?=.*\[\/q\])/gi)) {
                $m = $m.replace(/\[q\]/gi, '<br><span style="zoom: 1;background-color: #2a2a2a;border: 1px solid #383838;font-style: italic;margin: 8px 0;padding: 10px">').replace(/\[\/q\]/gi, '</span><br>');
            }
        }

        if ($.inArray('bg', disable) === -1) {
            // Text background
            if (t.match(/(?=.*\[bg .*\])(?=.*\[\/bg\])/i)) {
                $m = $m.replace(/\[bg (.*?)\]/gi, '<span style="background-color: $1">').replace(/\[\/bg\]/gi, '</span>');
            }
        }
        
        if ($.inArray('a', disable) === -1) {
            // Text align
            if (t.match(/(?=.*\[a .*\])(?=.*\[\/a\])/gi)) {
                $m = $m.replace(/\[a (.*?)\]/gi, '<p style="text-align: $1">').replace(/\[\/a\]/gi, '</p>');
            }
        }

        if ($.inArray('c', disable) === -1) {
            // Color
            if (t.match(/(?=.*\[c .*\])(?=.*\[\/c\])/i)) {
                $m = $m.replace(/\[c (.*?)\]/gi, '<span style="color: $1">').replace(/\[\/c\]/gi, '</span>');
            }
        }

        if ($.inArray('f', disable) === -1) {
            // Font
            if (t.match(/(?=.*\[f .*\])(?=.*\[\/f\])/i)) {
                $m = $m.replace(/\[f (.*?)\]/gi, '<span style="font-family: $1">').replace(/\[\/f\]/gi, '</span>');
            }
        }

        if ($.inArray('i', disable) === -1) {
            // Italicize
            if (t.match(/(?=.*\[i\])(?=.*\[\/i\])/i)) {
                $m = $m.replace(/\[i\]/gi, '<span style="font-style: italic">').replace(/\[\/i\]/gi, '</span>');
            }
        }

        if ($.inArray('img', disable) === -1) {
            // Image
            if (t.match(/(?=.*\[img .*\])/i)) {
                $m = $m.replace(/<a.*?\>/gi, '').replace(/<\/a\>/gi, '').replace(/\[img (.*?)\]/gi, '<a href="$1"><img src="$1" style="max-height: 200px; max-width: 200px" /></a>');
            }
        }

        if ($.inArray('p', disable) === -1) {
            // Preformatted
            if (t.match(/(?=.*\[p\])(?=.*\[\/p\])/i)) {
                $m = $m.replace(/\[p\]/gi, '<pre>').replace(/\[\/p\]/gi, '</pre>');
            }
        }

        if ($.inArray('s', disable) === -1) {
            // Strikethrough
            if (t.match(/(?=.*\[s\])(?=.*\[\/s\])/i)) {
                $m = $m.replace(/\[s\]/gi, '<span style="text-decoration: line-through">').replace(/\[\/s\]/gi, '</span>');
            }
        }

        if ($.inArray('g', disable) === -1) {
            // Strikethrough
            if (t.match(/(?=.*\[g\])(?=.*\[\/g\])/i)) {
                $m = $m.replace(/\[g\]/gi, '<span style="color:lightgreen">>').replace(/\[\/g\]/gi, '</span>');
            }
        }

        if ($.inArray('sc', disable) === -1) {
            // SoundCloud
            if (t.match(/(?=.*\[sc .*\])/i)) {
                $m = $m.replace(/\[sc (.*?)\]/gi, '<iframe width="50%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/$1&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>');
            }
        }

        if ($.inArray('sp', disable) === -1) {
            // Spoiler
            if (t.match(/(?=.*\[sp .*\])(?=.*\[\/sp\])/i)) {
                $m = $m.replace(/\[sp (.*?)\]/gi, '<button id="spoil">Show $1 spoiler</button>&nbsp;<span id="spoil2" style="display: none">').replace(/\[\*sp (.*?)\]/gi, '</span>');
            }
        }

        if ($.inArray('sub', disable) === -1) {
            // Subscript
            if (t.match(/(?=.*\[sub\])(?=.*\[\/sub\])/i)) {
                $m = $m.replace(/\[sub\]/gi, '<sub>').replace(/\[\/sub\]/gi, '</sub>');
            }
        }

        if ($.inArray('sup', disable) === -1) {
            // Superscript
            if (t.match(/(?=.*\[sup\])(?=.*\[\/sup\])/i)) {
                $m = $m.replace(/\[sup\]/gi, '<sup style="vertical-align: top">').replace(/\[\/sup\]/gi, '</sup>');
            }
        }

        if ($.inArray('u', disable) === -1) {
            // Underline
            if (t.match(/(?=.*\[u\])(?=.*\[\/u\])/i)) {
                $m = $m.replace(/\[u\]/gi, '<span style="text-decoration: underline">').replace(/\[\/u\]/gi, '</span>');
            }
        }

        if ($.inArray('yt', disable) === -1) {
            // YouTube
            if (t.match(/(?=.*\[yt .*\])/i)) {
                $m = $m.replace(/\[yt (.*?)\]/gi, '<iframe width="400" height="215" src="http://youtube.com/embed/$1?autohide=1&rel=0" frameborder="0" allowfullscreen />');
            }
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