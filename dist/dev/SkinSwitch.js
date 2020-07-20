/*
 * @name: SkinSwitch
 * @desc: Switchs between default and custom skins.
 * @author: KhangND
 * @doc: https://dev.fandom.com/wiki/SkinSwitch
 */
(function(window, $, mw) {
    if (window.SkinSwitchLoaded || mw.config.get('wgUserName') === null) { // prevent double loading and anon use
        return;
    }
    window.SkinSwitchLoaded = true;
 
    var SS = $.extend({
        skinPage: 'User:' + mw.config.get('wgUserName') + '/Skin-page', // Special:Mypage/Skin-page
        href: mw.util.wikiScript('load') + '?mode=articles&only=styles&articles=',
        button: $(),
        i18n: {},
        skins: null,
        buttonText: '',
        defaultText: '',
        err: function() {
            // use function instead of property as skinPage is undefined
            var skinUrl = window.location.origin + '/' + SS.skinPage;
            return {
                'noexist': 'Skin page does not exist! Location: ' + skinUrl,
                'noformat': 'Skin page has incorrect format. Location: ' + skinUrl
            };
        },
        preload: function(i18n) {
            SS.i18n = {
                'button': SS.buttonText !== ''
                    ? SS.buttonText
                    : i18n.msg('button').plain(),
                'default': SS.defaultText !== ''
                    ? SS.defaultText
                    : i18n.msg('default').plain()
            };

            if(SS.skins !== null && Array.isArray(SS.skins)) { // override API request for skins
                SS.init(SS.skins);
                return;
            }

            // get skins
            $.get(mw.util.wikiScript('api'), {
                action: 'parse',
                page: SS.skinPage,
                disablepp: true,
                format: 'json'
            }).error(function(){ // skin page does not exist -> exit code
                console.log(SS.err().noexist);
                return;
            }).success(function(res) {
                res = $(res.parse.text['*']).text().trim().split('\n');
                SS.init(res);
            });
        },
        init: function(skins) {
            // Append switch skin button to My Tools menu
            SS.button = $('<li>', {
                append: $('<a>', {
                    text: SS.i18n.button,
                    css: {
                        cursor: 'pointer',
                        position: 'relative'
                    },
                    append: $('<div>', {
                        'class': 'arrow-icon',
                        css: {
                            right: 8,
                            top: 12,
                            'border-color': 'transparent',
                            'border-left-color': '#aaa'
                        }
                    })
                }),
                appendTo: '#my-tools-menu'
            });

            // create <link>
            $('<link>', {
                id: 'skinSwitch',
                rel: 'stylesheet',
                type: 'text/css',
                appendTo: 'head'
            });

            var $ul = $('<ul>', {
                    'class': 'tools-menu',
                    css: {
                        left: $('#my-tools-menu').width(),
                        bottom: 0
                    },
                    appendTo: SS.button,
                    append: $('<li>', {
                        css: {
                            cursor: 'pointer'
                        },
                        append: $('<a>', {
                            text: SS.i18n['default'],
                            'data-skin': '0',
                            click: SS.switchSkin
                        })
                    })
                });
            for (var i in skins) { // create link for each skin
                var name, skin;
                try {
                    name = skins[i].split('=')[0].trim();
                    skin = skins[i].split('=')[1].trim();
                } catch (err) { //skin page is incorrectly formatted -> exit code
                    SS.button.remove();
                    $('#skinSwitch').remove();
                    console.log(SS.err().noformat);
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
                if (localStorage.getItem('SkinSwitch') === name)
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
            localStorage.setItem('SkinSwitch', $(this).text()); // remember skin
            if (skin === 0)
                $('#skinSwitch').removeAttr('href');
            else
                $('#skinSwitch').attr('href', SS.href + skin);
        }
    }, window.SS);

    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('SkinSwitch').done(SS.preload);
    });
})(this, jQuery, mediaWiki);