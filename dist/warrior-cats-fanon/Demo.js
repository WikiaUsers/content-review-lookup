/**
 * @module      UserStatus/demo
 * @description Adds configurable user status to masthead avatars.
 * @notes       Available status settings:
 *              • Online
 *              • Away
 *              • Do Not Disturb (DnD)
 *              • Offline
 *              • Unknown
 *              • Blocked [COMING SOON]
 *              Available config options (UserStatusSettings):
 *              • Colorblind mode (colorBlindMode) - 0/1, default 1
 *              • Light Theme (lightTheme) - 0/1, default 0, requires colorBlindMode
 *              • Display status indicator (statusIndicator) - 0/1, default 1
 *              • Colors: (online, away, dnd, and offline) - string (hexadecimal or color name)
 * @author      Americhino
 * @version     1.0.2
 * @license     CC-BY-SA 3.0
 * @notes       Demo for User:SapphireSonata on Dev Wiki.
 *
 */
mw.hook('dev.i18n').add(function(i18n) {
    i18n.loadMessages('UserStatus').done(function (i18n) {
        var config = window.UserStatusSettings || {},
        colorBlindMode = config.colorBlindMode || 1,
        lightTheme = config.lightTheme || 0,
        statusIndicator = config.statusIndicator || 1,
        avatar = '#userProfileApp .user-identity-avatar',
        $user = mw.config.get('wgTitle').split('/'),
        Api = new mw.Api(); 
        if (!$('#userProfileApp').length) {
            return; // "illegal return statement", only comment out when testing outside of a function
        }   
        $.ajax({
                method: 'GET',
                dataType: 'text',
                url: mw.util.wikiScript('index'),
                data: {
                    title: mw.config.get('wgFormattedNamespaces')[2] + ':' + ($user[1] ? $user[1] : $user[0]) + '/status',
                    action: 'raw'
                },
                complete: function (data) {
                    // Variables
                    // Limit responses to valid statuses
                    var status = ['online', 'away', 'dnd', 'offline'].indexOf(data.responseText) === -1
                        ? i18n.msg('unknown').plain()
                        : data.responseText;
                    var status_masthead = $('<li>');
                    var status_text = {
                        'online': i18n.msg('online').plain(),
                        'away': i18n.msg('away').plain(),
                        'dnd': i18n.msg('dnd').plain(),
                        'offline': i18n.msg('offline').plain(),
                        'unknown': i18n.msg('unknown').plain()
                    };
                    // Colors: customizable
                    var status_color = {
                        'online': config.online || '#43b581',
                        'away': config.away || '#faa61a',
                        'dnd': config.dnd || '#f04747',
                        'offline': config.offline || '#747f8d',
                        'unknown': config.offline || '#747f8d',
                    };
                    var statusOptions = {
                        'online': 'online',
                        'away': 'away',
                        'dnd': 'dnd',
                        'offline': 'offline',
                        'unknown': 'unknown'
                    };
                    // Colorblind Icons
                    var statusIcons = lightTheme
                        ? {
                            'online': 'https://vignette.wikia.nocookie.net/botkylorens-test/images/4/48/BLANK_ICON.png/revision/latest?cb=20200922225054',
                            'away': 'https://discordapp.com/assets/32e7318f451e2c45e3a6593d6e8a418a.svg',
                            'dnd': 'https://discordapp.com/assets/7ae003e6cbc0d361fe3953e3c4ae8cc3.svg',
                            'offline': 'https://discordapp.com/assets/84bda2ff1eb55a521895c9734de3befb.svg',
                            'unknown': 'https://discordapp.com/assets/84bda2ff1eb55a521895c9734de3befb.svg'
                        }
                        : {
                            'online': 'https://vignette.wikia.nocookie.net/botkylorens-test/images/4/48/BLANK_ICON.png/revision/latest?cb=20200922225054',
                            'away': 'https://discordapp.com/assets/2cd083e5b360930c23ca95ab6a6073a0.svg',
                            'dnd': 'https://discordapp.com/assets/5e6b9355e62148b7f463465fd029ab92.svg',
                            'offline': 'https://discordapp.com/assets/7026428ff08042eb805e579bd9aea182.svg',
                            'unknown': 'https://discordapp.com/assets/7026428ff08042eb805e579bd9aea182.svg'
                        };
                     // Create element
                if (statusIndicator) {
                        $(avatar).append(
                            $('<div>', {
                                'class': 'status-indicator si-is-not-colorblind si-is-not-blocked status-indicator-' + status,
                                'title': status_text[status],
                                css: {
                                    height: '40px',
                                    position: 'absolute',
                                    right: '5px',
                                    bottom: '5px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    background: status_color[status] || '#747f8d',                                         zIndex: '398'
                                }
                            })
                        );
                }
                // Add label on masthead
                status_masthead
                    .addClass('status-masthead status-masthead-' + status)
                    .text(status_text[status] || i18n.msg('unknown').plain());
                $('ul.user-identity-stats').append(status_masthead);
                // Console log entry to make sure status is returned
                console.log('[UserStatus] Status for ' + ($user[1] ? $user[1] : $user[0]) + ':', status_text[status]);
                    // Colorblind mode
                if (colorBlindMode) {
                    $('.si-is-not-colorblind').remove();
                    if (statusIndicator) {
                        $(avatar).append(
                            $('<div>', {
                                'class': 'status-indicator si-is-colorblind si-is-not-blocked status-indicator-' + status,
                                'title': status_text[status],
                                css: {
                                    height: '40px',
                                    position: 'absolute',
                                    right: '5px',
                                    bottom: '5px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    background: status_color[status] || '#747f8d',
                                    zIndex: '398'
                                }
                            })
                        ).append(
                            $('<img>', {
                                'src': statusIcons[status] || 'https://discordapp.com/assets/7026428ff08042eb805e579bd9aea182.svg',
                                'title': status_text[status] || i18n.msg('unknown').plain(),
                                css: {
                                    height: '40px',
                                    position: 'absolute',
                                    right: '5px',
                                    bottom: '5px',
                                    width: '40px',
                                    borderRadius: '50%',
                                    zIndex: '399'
                                }
                            })
                        );
                    }
                }
            }
        });
    })
});
window.importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:I18n-js/code.js']
});
window.importArticles({
    type: 'script',
    articles: ['u:dev:MediaWiki:UserStatus/dropdown/demo.js']
});
window.importArticles({
    type: 'style',
    articles: ['u:dev:MediaWiki:UserStatus.css']
});