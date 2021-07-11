/* @submodule               UserStatus/dropdown
 * @description             Dropdown menu to quickly change one's status.
 * @author                  Americhino
 * @version                 1.0.1
 * @license                 CC-BY-SA 3.0 */
var config = mw.config.get([
		'wgTitle',
		'profileUserName',
		'wgUserName'
	]),
	$user = config.wgTitle.split('/');

if (config.profileUserName && ($user[1] ? $user[1] : $user[0]) === config.wgUserName) {
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('UserStatus').done(function (i18n) {
            mw.loader.using('mediawiki.notify').then(function() {
                var $statusLink = $('<div>')
                            .addClass('wds-dropdown StatusChange')
                            .attr('id', 'StatusChange').append(
                                $('<div>')
                                    .addClass('wds-dropdown__toggle StatusMenu-toggle').append(
                                        $('<a>')//.attr( 'title', 'Change your status' ) // rip no translation yet
                                            .text(i18n.msg('status').plain())
                                            .attr('id', 'StatusToggle')
                                            .addClass('wds-button wds-is-secondary').append(
                                                $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron"><path d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571" fill-rule="evenodd"></path></svg>')
                                        )
                                )
                        ); 
                var $statusDropdown = $('<div>').addClass('wds-is-not-scrollable wds-dropdown__content').append(
                                    $('<ul>')
                                        .addClass('wds-list wds-is-linked')
                                        .attr('id', 'StatusMenu') 
                                        .append(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('target', '_blank')
                                                .attr('style', 'cursor: pointer;')
                                                .attr('id', 'StatusMenu-online')
                                                .text(i18n.msg('online').plain())
                                            ))
                                        .append(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('target', '_blank')
                                                .attr('style', 'cursor: pointer;')
                                                .attr('id', 'StatusMenu-away')
                                                .text(i18n.msg('away').plain())
                                            ))
                                        .append(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('target', '_blank')
                                                .attr('style', 'cursor: pointer;')
                                                .attr('id', 'StatusMenu-dnd')
                                                .text(i18n.msg('dnd').plain())
                                            ))
                                        .append(
                                            $('<li>').append(
                                                $('<a>')
                                                .attr('target', '_blank')
                                                .attr('style', 'cursor: pointer;')
                                                .attr('id', 'StatusMenu-unknown')
                                                .text(i18n.msg('offline').plain())
                                        )
                                    ) 
                            );
				var interval = setInterval(function() {
				    if ($('#userProfileApp').length) {
				        clearInterval(interval);
		                $('.user-identity-header__button').after($statusLink);
				    }
				}, 1000);                            
                $statusLink.append($statusDropdown);
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
                        case 'StatusMenu-unknown':
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
                            summary: '[UserStatus] ' + i18n.msg('edit-status').plain(),
                            text: content,
                            format: 'json',
                            token: mw.user.tokens.get('editToken')
                        }
                    }).done(function (data) {
                        if (data.edit.result === 'Success') {
                            mw.notify(i18n.msg('success').plain());
                            console.log('[UserStatus]' + i18n.msg('success').plain());
                        } else {
                            mw.notify(i18n.msg('error').plain());
                            console.log('[UserStatus]' + i18n.msg('error').plain());
                        }
                    }).fail(function (data) {
                        mw.notify(i18n.msg('error').plain());
                        console.log('[UserStatus]' + i18n.msg('error').plain());
                    });
                });
            });
        });
    });
    window.importArticles({
        type: 'script',
        articles: ['u:dev:MediaWiki:I18n-js/code.js']
    });
}