/**
 *
 * @submodule               UserStatus/dropdown
 * @description             Dropdown menu to quickly change one's status.
 * @author                  Americhino
 * @version                 0.8.2
 * @license                 CC-BY-SA 3.0
 * @notes                   Just a beta version do not import/submit for review
 **/
var $user = mw.config.get('wgTitle').split('/');
if (($user[1] ? $user[1] : $user[0]) === mw.config.get('wgUserName')) {
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
                            .text('Online')
                        ).after(
                        $('<li>').append(
                            $('<a>')
                            .attr('target', '_blank')
                            .attr('style', 'cursor: pointer;')
                            .attr('id', 'StatusMenu-away')
                            .text('Away')
                        )).after(
                        $('<li>').append(
                            $('<a>')
                            .attr('target', '_blank')
                            .attr('style', 'cursor: pointer;')
                            .attr('id', 'StatusMenu-dnd')
                            .text('Do not Disturb')
                        )).after(
                        $('<li>').append(
                            $('<a>')
                            .attr('target', '_blank')
                            .attr('style', 'cursor: pointer;')
                            .attr('id', 'StatusMenu-unknown')
                            .text('Offline')
                        ))
					)
                )
            )
        )
    );   
        $('.UserProfileMasthead .masthead-info > .details').append($statusLink);
    $('body').on('click', 'a[id^="StatusMenu-"]', function(e) {
        e.preventDefault();
        switch ($(e.target).attr('id')) {
            case 'StatusMenu-online':
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                dataType: 'json',
                data: {
                    action: 'edit',
                    title: wgFormattedNamespaces[2] + ':' + wgUserName + '/status',
                    summary: 'Editing status',
                    text: 'online',
                    format: 'json',
                    token: mw.user.tokens.get('editToken')
                }
                }).done(function (data) {
                    if (data.edit.result === 'Success') {
                        new BannerNotification ('Your status was edited successfully!', 'confirm').show();
                    } else {
                        new BannerNotification ('There was an error editing your status.', 'error').show();
                    }
                }).fail(function (data) {
                    new BannerNotification ('There was an error editing your status.', 'error').show();
                });
                break;
            case 'StatusMenu-away':
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                dataType: 'json',
                data: {
                    action: 'edit',
                    title: wgFormattedNamespaces[2] + ':' + wgUserName + '/status',
                    summary: 'Editing status',
                    text: 'away',
                    format: 'json',
                    token: mw.user.tokens.get('editToken')
                }
                }).done(function (data) {
                    if (data.edit.result === 'Success') {
                        new BannerNotification ('Your status was edited successfully!', 'confirm').show();
                    } else {
                        new BannerNotification ('There was an error editing your status.', 'error').show();
                    }
                }).fail(function (data) {
                    new BannerNotification ('There was an error editing your status.', 'error').show();
                });
                break;
            case 'StatusMenu-dnd':
                $.ajax({
                    type: 'POST',
                    url: mw.util.wikiScript('api'),
                    dataType: 'json',
                    data: {
                        action: 'edit',
                        title: wgFormattedNamespaces[2] + ':' + wgUserName + '/status',
                        summary: 'Editing status',
                        text: 'dnd',
                        format: 'json',
                        token: mw.user.tokens.get('editToken')
                    }
                    }).done(function (data) {
                        if (data.edit.result === 'Success') {
                            new BannerNotification ('Your status was edited successfully!', 'confirm').show();
                        } else {
                            new BannerNotification ('There was an error editing your status.', 'error').show();
                        }
                    }).fail(function (data) {
                        new BannerNotification ('There was an error editing your status.', 'error').show();
                    });
                break;
            case 'StatusMenu-offline':
                $.ajax({
                    type: 'POST',
                    url: mw.util.wikiScript('api'),
                    dataType: 'json',
                    data: {
                        action: 'edit',
                        title: wgFormattedNamespaces[2] + ':' + wgUserName + '/status',
                        summary: 'Editing status',
                        text: 'offline',
                        format: 'json',
                        token: mw.user.tokens.get('editToken')
                    }
                    }).done(function (data) {
                        if (data.edit.result === 'Success') {
                            new BannerNotification ('Your status was edited successfully!', 'confirm').show();
                        } else {
                            new BannerNotification ('There was an error editing your status.', 'error').show();
                        }
                    }).fail(function (data) {
                        new BannerNotification ('There was an error editing your status.', 'error').show();
                    });
                break;
        }
    });
}