/**
 * @name            AutoMod
 * @version         v1.3
 * @author          TheGoldenPatrik1
 * @description     Automatically moderate chat.
 */
(function () {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserGroups',
        'wgUserName'
    ]);
    if (
        config.wgCanonicalSpecialPageName !== 'Chat' ||
        !/staff|helper|sysop|threadmoderator|chatmoderator|wiki-manager/.test(config.wgUserGroups.join()) ||
        window.AutoModLoaded
    ) {
        return;
    }
    window.AutoModLoaded = true;
    var i18n,
        mainRoom,
        reason,
        preloads = 2,
        options = $.extend(
            {
                ban: {
                    words: [],
                    reason: reason,
                    duration: 86400
                },
                check: false,
                kick: []
            },
            window.AutoMod
        );
    /**
     * @method words
     * @description Determines which word filter to use, if any
     * @param {String} primary - The primary option
     * @param {String} secondary - The secondary option
     * @returns {string}
     */
    function words (primary, secondary) {
        var $input = $('#auto-mod-' + primary).val();
        if ($input) {
            return $input.split(',').map(
                function (str) {
                    return str.trim();
                }
            );
        } else if (secondary) {
            return secondary;
        } else {
            return undefined;
        }
    }
    /**
     * @method main
     * @description Adds the actual AutoMod capability
     * @returns {void}
     */
    function main () {
        $('#Write').append(
            $('<div>', {
                id: 'auto-mod',
            }).append(
                $('<label>', {
                    'for': 'auto-mod-check',
                    text: i18n.msg('enable').plain()
                }),
                $('<input>', {
                    type: 'checkbox',
                    id: 'auto-mod-check',
                    name: 'auto-mod-check'
                }),
                $('<br/>'),
                $('<label>', {
                    'for': 'auto-mod-kick',
                    text: i18n.msg('kick').plain()
                }),
                $('<input>', {
                    type: 'text',
                    id: 'auto-mod-kick',
                    name: 'auto-mod-kick'
                }),
                $('<br/>'),
                $('<label>', {
                    'for': 'auto-mod-ban',
                    text: i18n.msg('ban').plain()
                }),
                $('<input>', {
                    type: 'text',
                    id: 'auto-mod-ban',
                    name: 'auto-mod-ban'
                })
            )
        );
        $('#auto-mod-check').prop('checked', options.check);
        mainRoom.socket.bind('chat:add', function(msg) {
            var data = JSON.parse(msg.data).attrs,
                text = data.text.toLowerCase(),
                kickWords = words('kick', options.kick),
                banWords = words('ban', options.ban.words);
            if (
                data.name === config.wgUserName ||
                !document.getElementById('auto-mod-check').checked
            ) {
                return;
            }
            if (
                kickWords !== undefined &&
                new RegExp(kickWords.join('|'), 'm').test(text)
            ) {
                mainRoom.kick({
                    name: data.name
                });
            }
            if (
                banWords !== undefined &&
                new RegExp(banWords.join('|'), 'm').test(text)
            ) {
                mainRoom.socket.send(
                    new models.BanCommand({
                        userToBan: data.name,
                        time: options.ban.duration,
                        reason: options.ban.reason
                    }).xport()
                );
            }
        });
    }
    /**
     * @method i18nHandler
     * @description Adds I18n-js support
     * @param {String} i18nData - Variable for adding i18n support
     * @returns {void}
     */
    function i18nHandler (i18nData) {
        i18n = i18nData;
        reason = i18n.inContentLang().msg('reason').plain();
        main();
    }
    /**
     * @method preload
     * @description Loads the hooks
     * @returns {void}
     */
    function preload () {
        if (--preloads === 0) {
            mainRoom = window.mainRoom;
            window.dev.i18n.loadMessages('AutoMod').then(i18nHandler);
        }
    }
    /**
     * @method init
     * @description Initiates the script and imports dependencies
     * @returns {void}
     */
    function init () {
        mw.hook('dev.i18n').add(preload);
        mw.hook('dev.chat.render').add(preload);
        importArticles({
            type: 'script',
            articles: [
                'u:dev:Chat-js.js',
                'u:dev:I18n-js/code.js'
            ]
        });
    }
    init();
})();