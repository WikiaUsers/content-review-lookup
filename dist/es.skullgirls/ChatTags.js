var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
chatags.tags['bd'] = function(s,t) {
    if (t.charAt(0) === '/') {
        s = s.replace('[/bd]', '</span>');
    } else {
        try {
            t = t.split('="');
            t[1] = t[1].replace('"', '');
            s = s.replace('[bd="' + t[1] + '"]', '<span style="border:2px solid ' + mw.html.escape(t[1]) + ';">');
        } catch(e) { console.log(e) }
    }
    return s;
};
chatags.tags['sh'] = function(s,t) {
    if (t.charAt(0) === '/') {
        s = s.replace('[/sh]', '</span>');
    } else {
        try {
            t = t.split('="');
            t[1] = t[1].replace('"', '');
            s = s.replace('[sh="' + t[1] + '"]', '<span style="text-shadow:0 0 5px ' + mw.html.escape(t[1]) + ';">');
        } catch(e) { console.log(e) }
    }
    return s;
};
/* ChatTags clásico hecho por el Usuario:AnimatedCartoons
y modificado para tener más opciones de personalización por el usuario Electric Game
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

        if ($.inArray('b', disable) === -1) {
            // Boldface
            if (t.match(/(?=.*\[b\])(?=.*\[\/b\])/gi)) {
                $m = $m.replace(/\[b\]/gi, '<span style="font-weight:bold;">').replace(/\[\/b\]/gi, '</span>');
            }
        }

        if ($.inArray('bg', disable) === -1) {
            // Text background
            if (t.match(/(?=.*\[bg .*\])(?=.*\[\/bg\])/i)) {
                $m = $m.replace(/\[bg (.*?)\]/gi, '<span style="background-color:$1;">').replace(/\[\/bg\]/gi, '</span>');
            }
        }

        if ($.inArray('big', disable) === -1) {
            // Big
            if (t.match(/(?=.*\[big\])(?=.*\[\/big\])/gi)) {
                $m = $m.replace(/\[big\]/gi, '<span style="font-size:larger;">').replace(/\[\/big\]/gi, '</span>');
            }
        }

        if ($.inArray('c', disable) === -1) {
            // Color
            if (t.match(/(?=.*\[c .*\])(?=.*\[\/c\])/i)) {
                $m = $m.replace(/\[c (.*?)\]/gi, '<span style="color:$1;">').replace(/\[\/c\]/gi, '</span>');
            }
        }

        if ($.inArray('f', disable) === -1) {
            // Font
            if (t.match(/(?=.*\[f .*\])(?=.*\[\/f\])/i)) {
                $m = $m.replace(/\[f (.*?)\]/gi, '<span style="font-family:$1;">').replace(/\[\/f\]/gi, '</span>');
            }
        }

        if ($.inArray('i', disable) === -1) {
            // Italicize
            if (t.match(/(?=.*\[i\])(?=.*\[\/i\])/i)) {
                $m = $m.replace(/\[i\]/gi, '<span style="font-style:italic;">').replace(/\[\/i\]/gi, '</span>');
            }
        }

        if ($.inArray('img', disable) === -1) {
            // Image
            if (t.match(/(?=.*\[img .*\])/i)) {
                $m = $m.replace(/<a.*?\>/gi, '').replace(/<\/a\>/gi, '').replace(/\[img (.*?)\]/gi, '<a href="$1"><img src="$1" style="max-height:200px; max-width:200px;"/></a>');
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
                $m = $m.replace(/\[s\]/gi, '<span style="text-decoration:line-through;">').replace(/\[\/s\]/gi, '</span>');
            }
        }

        if ($.inArray('sc', disable) === -1) {
            // SoundCloud
            if (t.match(/(?=.*\[sc .*\])/i)) {
                $m = $m.replace(/\[sc (.*?)\]/gi, '<iframe width="50%" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/$1&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_artwork=true"></iframe>');
            }
        }

        if ($.inArray('small', disable) === -1) {
            // Small
            if (t.match(/(?=.*\[small\])(?=.*\[\/small\])/gi)) {
                $m = $m.replace(/\[small\]/gi, '<small>').replace(/\[\/small\]/gi, '</small>');
            }
        }

        if ($.inArray('sp', disable) === -1) {
            // Spoiler
            if (t.match(/(?=.*\[sp\])(?=.*\[\/sp\])/gi)) {
                $m = $m.replace(/\[sp\]/gi, '<button id="spoil">Spoiler</button>&nbsp;<span id="spoil2" style="display:none;">').replace(/\[\/sp\]/gi, '</span>');
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
                $m = $m.replace(/\[sup\]/gi, '<sup style="vertical-align:top;">').replace(/\[\/sup\]/gi, '</sup>');
            }
        }

        if ($.inArray('u', disable) === -1) {
            // Underline
            if (t.match(/(?=.*\[u\])(?=.*\[\/u\])/i)) {
                $m = $m.replace(/\[u\]/gi, '<span style="text-decoration:underline;">').replace(/\[\/u\]/gi, '</span>');
            }
        }

        if ($.inArray('yt', disable) === -1) {
            // YouTube
            if (t.match(/(?=.*\[yt .*\])/i)) {
                $m = $m.replace(/\[yt (.*?)\]/gi, '<iframe width="400" height="215" src="http://youtube.com/embed/$1?autohide=1&rel=0" frameborder="0" allowfullscreen/>');
            }
        }
        
        if ($.inArray('sh', disable) === -1) {
            // Shadow/Sombra
            if (t.match(/(?=.*\[sh .*\])(?=.*\[\/sh\])/i)) {
                $m = $m.replace(/\[sh (.*?)\]/gi, '<span style="text-shadow:0 0 5px $1;">').replace(/\[\/sh\]/gi, '</span>');
            }
        }
        
        if ($.inArray('bd', disable) === -1) {
            // Borde/Border
            if (t.match(/(?=.*\[bd .*\])(?=.*\[\/bd\])/i)) {
                $m = $m.replace(/\[bd (.*?)\]/gi, '<span style="border:2px solid $1;">').replace(/\[\/bd\]/gi, '</span>');
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
*/