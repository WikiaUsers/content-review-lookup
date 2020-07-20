/**
 * @module          UserStatus
 * @description     Adds configurable user status to masthead avatars.
 *                  Available status settings:
 *                      • Online
 *                      • Away
 *                      • Do Not Disturb (DnD)
 *                      • Offline/Unknown
 *                      • Blocked
 *                  Available config options (UserStatusSettings):
 *                      • Colorblind mode (colorBlindMode) - 0/1, default 1
 *                      • Light Theme (lightTheme) - 0/1, default 0
 *                      • Status indicator  (statusIndicator) - 0/1, default 1
 * @author          Americhino
 * @version         0.8.5
 * @license         CC-BY-SA 3.0
 * @todo            See documentation for a full todo list.
 */
(function() {
    var config = window.UserStatusSettings || {},
        colorBlindMode = config.colorBlindMode || 1,
        lightTheme = config.lightTheme || 0,
        statusIndicator = config.statusIndicator || 1,
        avatar = '.UserProfileMasthead .masthead-avatar',
        $user = mw.config.get('wgTitle').split('/'),
        Api = new mw.Api();
    if (!$('.UserProfileMasthead').length) {
        return;
    }
    // Fetch content of User:USERNAME/status
    function init (i18n) {
        $.ajax({
            method: 'GET',
            dataType: 'text',
            url: mw.util.wikiScript('index'),
            data: {
                title: wgFormattedNamespaces[2] + ':' + ($user[1] ? $user[1] : $user[0]) + '/status',
                action: 'raw'
            },
            complete: function (data) {
                // Variables
                // Limit responses to valid statuses
                var status = ['online', 'away', 'dnd', 'offline'].indexOf(data.responseText) === -1
                    ? 'Unknown'
                    : data.responseText;
                var status_masthead = $('<li>');
                var status_text = {
                    'online': i18n.msg('online').plain(),
                    'away': i18n.msg('away').plain(),
                    'dnd': i18n.msg('dnd').plain(),
                    'offline': i18n.msg('offline').plain(),
                    'unknown': i18n.msg('unknown').plain()
                };
                var status_color = {
                    'online': '#43b581',
                    'away': '#faa61a',
                    'dnd': '#f04747',
                    'offline': '#747f8d',
                    'unknown': '#747f8d'
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
                        'online': '',
                        'away': 'https://discordapp.com/assets/32e7318f451e2c45e3a6593d6e8a418a.svg',
                        'dnd': 'https://discordapp.com/assets/7ae003e6cbc0d361fe3953e3c4ae8cc3.svg',
                        'offline': 'https://discordapp.com/assets/84bda2ff1eb55a521895c9734de3befb.svg',
                        'unknown': 'https://discordapp.com/assets/84bda2ff1eb55a521895c9734de3befb.svg'
                    }
                    : {
                        'online': '',
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
                                background: status_color[status] || '#747f8d',                                    zIndex: '400'
                            }
                        })
                    );
                }
                // Add label on masthead
                status_masthead
                    .addClass('status-masthead status-masthead-' + status)
                    .text(' ' + status_text[status] || ' ' + i18n.msg('unknown').plain())
                    .prepend(
                        $('<span>')
                            .addClass('user-status-label')
                            .text(i18n.msg('status').plain())
                        );
                $('.masthead-info > .details > ul').append(status_masthead);
                // Console log entry to make sure status is returned
                console.log('UserStatus: Status for ' + ($user[1] ? $user[1] : $user[0]) + ':', status_text[status]);
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
                                    zIndex: '400'
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
                                    zIndex: '600'
                                }
                            })
                        );
                    }
                }
                $('.UserProfileMasthead .masthead-avatar img').css('border-radius', '50%');
            }
            });
    /**
     *
     * @section             Dropdown menu
     * @notes               Originally from [[MediaWiki:UserStatus/dropdown.js]]
     **/
    if (($user[1] ? $user[1] : $user[0]) !== mw.config.get('wgUserName')) {
        return;
    }
    var $statusLink = $('<div />')
    .attr('id', 'StatusChangeWrapper').append(
        $('<div />')
            .addClass('wds-dropdown')
            .attr('id', 'StatusChange').append (
                $('<a />').attr( 'title', 'Change your status' )
                    .attr('style', 'cursor: pointer; margin-top: 10px;' ).text('Status')
                    .attr('id', 'StatusToggle')
                    .addClass('wds-button wds-is-secondary wds-dropdown__toggle').append(
                        $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron"><path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd"></path></svg>')
                )
            .after(
                $('<div>')
                    .addClass('wds-is-not-scrollable wds-dropdown__content wds-is-left-aligned').append(
                    $('<ul />')
                        .addClass('wds-list wds-is-linked')
                        .attr('id', 'StatusMenu')
                        .append(
                            $('<li>').append(
                                $('<a>')
                                .attr('target', '_blank')
                                .attr('style', 'cursor: pointer;')
                                .attr('id', 'StatusMenu-online')
                                .text(i18n.msg('online').plain())
                            ).after(
                            $('<li>').append(
                                $('<a>')
                                .attr('target', '_blank')
                                .attr('style', 'cursor: pointer;')
                                .attr('id', 'StatusMenu-away')
                                .text(i18n.msg('away').plain())
                            )).after(
                            $('<li>').append(
                                $('<a>')
                                .attr('target', '_blank')
                                .attr('style', 'cursor: pointer;')
                                .attr('id', 'StatusMenu-dnd')
                                .text(i18n.msg('dnd').plain())
                            )).after(
                            $('<li>').append(
                                $('<a>')
                                .attr('target', '_blank')
                                .attr('style', 'cursor: pointer;')
                                .attr('id', 'StatusMenu-unknown')
                                .text(i18n.msg('offline').plain())
                            ))
                        )
                    )
                )
            )
        ); 
        $('.UserProfileMasthead .masthead-info > .details').append($statusLink);
        $('body').on('click', 'a[id^="StatusMenu-"]', function(e) {
            e.preventDefault();
            var content;
            switch ($(e.target).attr('id')) {
                case 'StatusMenu-online':
                    content = 'online';
                    break;
                case 'StatusMenu-away':
                    content = 'away';
                    break;
                case 'StatusMenu-dnd':
                    content = 'dnd';
                    break;
                case 'StatusMenu-offline':
                    content = 'offline';
                    break;
            }
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                dataType: 'json',
                data: {
                    action: 'edit',
                    title: wgFormattedNamespaces[2] + ':' + wgUserName + '/status',
                    summary: i18n.msg('edit-status').plain(),
                    text: content,
                    format: 'json',
                    token: mw.user.tokens.get('editToken')
                }
            }).done(function (data) {
                if (data.edit.result === 'Success') {
                    new BannerNotification (i18n.msg('success').plain(), 'confirm').show();
                } else {
                    new BannerNotification (i18n.msg('error').plain(), 'error').show();
                }
            }).fail(function (data) {
                new BannerNotification (i18n.msg('error').plain(), 'error').show();
            });
        });
    }
    // Style the button
    var buttonColor = mw.config.get('wgSassParams')['color-buttons']; 
    mw.util.addCSS('#StatusToggle { color:' + buttonColor + '; border-color:' + buttonColor + '}');
    // Load script
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('UserStatus').then(init);
    });
    // Extensions/Dependencies
    importArticles({
        type: 'script',
        articles: [
            'u:dev:I18n-js/code.js',
            'u:dev:UserStatus/banner.js',
        ]
    });
});