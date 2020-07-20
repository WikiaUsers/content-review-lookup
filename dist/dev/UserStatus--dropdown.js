/**
 *
 * @submodule               UserStatus/dropdown
 * @description             Dropdown menu to quickly change one's status.
 * @author                  Americhino
 * @version                 0.8.3
 * @license                 CC-BY-SA 3.0
 **/
var $user = mw.config.get('wgTitle').split('/');
if (($user[1] ? $user[1] : $user[0]) === mw.config.get('wgUserName')) {
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('UserStatus').done(function (i18n) {
            var $statusLink = $('<div />')
            .attr('id', 'StatusChangeWrapper').append(
                $('<div />')
                    .addClass('wds-dropdown')
                    .attr('id', 'StatusChange').append (
                        $('<a />')//.attr( 'title', i18n.msg('change-status').plain() )
                            .attr('style', 'cursor: pointer; margin-top: 10px;' ).text(i18n.msg('status').plain())
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
        });
    });
    var buttonColor = mw.config.get('wgSassParams')['color-buttons']; 
    mw.util.addCSS('#StatusToggle { color:' + buttonColor + '; border-color:' + buttonColor + '}');
}
importArticles(
    {
        type: 'script',
        articles: ['u:dev:MediaWiki:i18n-js/code.js']
    },
    {
        type: 'style',
        articles: ['u:dev:MediaWiki:UserStatus.css']
    }
);