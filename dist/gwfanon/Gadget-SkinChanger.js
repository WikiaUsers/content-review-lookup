// The script was invented on the basis of w:c:dev:SkinSwitch by KhangND

(function(window, $, mw) {
    if (window.SkinSwitchLoaded) { // prevent double loading
        return;
    }
    window.SkinSwitchLoaded = true;
 
    var SS = {
        skinPage: 'MediaWiki:Custom-Motywy', // MediaWiki:Custom-Motywy
        href: '/load.php?mode=articles&only=styles&articles=',
        button: $(), i18n: {},
        preload: function(i18n) { // preload with i18n, also allow i18n overrides
            SS.i18n = {
                'button':
                    typeof window.buttonText === 'string' ?
                    window.buttonText :
                    i18n.msg('button').plain(),
                'default': 
                    typeof window.defaultText === 'string' ?
                    window.defaultText :
                    i18n.msg('default').plain()
            };
            SS.init();
        },
        init: function() {
            // Create switch skin button
            SS.button = $('<li>', {
                css: {
                    'padding-top': '4px',
                    'margin-top': '-2px'
                },
                append: [
                    $('<span>', {
                        'class': 'arrow-icon-ctr',
                        append: $('<span>', {
                            'class': 'arrow-icon arrow-icon-single'
                        })
                    }),
                    $('<a>', {
                        text: 'Zmień motyw',
                        css: {
                            cursor: 'pointer'
                        },
                    })
                ],
                appendTo: '#WikiaBar .tools'
            });
 
            // create <link>
            $('<link>', {
                id: 'skinSwitch',
                rel: 'stylesheet',
                type: 'text/css',
                appendTo: 'head'
            });
 
            // get skins
            $.get('/api.php', {
                action: 'parse',
                page: SS.skinPage,
                disablepp: true,
                format: 'json'
            }).done(SS.initDone);
        },
        initDone: function(res) {
            var skinPages = $(res.parse.text['*']).text().trim().split('\n'),
                $ul = $('<ul>', {
                    'class': 'tools-menu',
                    css: {
                        right: 'auto'
                    },
                    appendTo: SS.button,
                    append: $('<li>', {
                        css: {
                            cursor: 'pointer'
                        },
                        append: $('<a>', {
                            text: ['Domyślny'],
                            'data-skin': '0',
                            click: SS.switchSkin
                        })
                    })
                });
            for (var i in skinPages) { // create link for each skin
                var name, skin;
                try {
                    name = skinPages[i].split('=')[0].trim();
                    skin = skinPages[i].split('=')[1].trim();
                } catch (err) {
                    console.log(
                        'Skin page has incorrect format. Location: ' +
                        window.location.origin + '/' + SS.skinPage
                    );
                    return;
                }
                $ul.append(
                    $('<li>', {
                        css: {
                            cursor: 'pointer'
                        },
                        append: $('<a>', {
                            text: name,
                            'data-skin': skin,
                            click: SS.switchSkin
                        })
                    })
                );
                //preload skin
                if (localStorage.skin === name)
                    $('#skinSwitch').attr('href', SS.href + skin);
                else
                    $('#skinSwitch').removeAttr('href');
            }
 
            SS.button.hover(
                function() {
                    $ul.show();
                },
                function() {
                    $ul.hide();
                });
        },
        switchSkin: function() {
            var skin = $(this).data('skin');
            localStorage.skin = $(this).text(); // remember skin
            if (skin === 0)
                $('#skinSwitch').removeAttr('href');
            else
                $('#skinSwitch').attr('href', SS.href + skin);
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('SkinSwitch').done(SS.preload);
    });
})(this, jQuery, mediaWiki);