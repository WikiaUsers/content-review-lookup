(function () {
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('ArchiveWallThread').done(function (i18n) {
            if (
                !$('.page-header__page-subtitle > nav > a').exists() ||
                !$('.page-header__page-subtitle > nav > a').attr('href').endsWith(mw.config.get('wgUserName')) ||
                !window.ArchiveWallThread ||
                window.ArchiveWallThread.loaded ||
                typeof window.ArchiveWallThread.string !== 'string' ||
                typeof window.ArchiveWallThread.text !== 'string' ||
                typeof window.ArchiveWallThread.number !== 'number' ||
                window.ArchiveWallThread.number < 0
            ) {
                return;
            }

            window.ArchiveWallThread.loaded = true;

            function date (callback) {
                if ($('.message-1 > .speech-bubble-message .timeago').exists()) {
                    callback($('.message-1 > .speech-bubble-message .timeago').attr('title').split('T')[0]);
                } else {
                    new mw.Api().get({
                        action: 'query',
                        prop: 'revisions',
                        rvprop: 'timestamp',
                        format: 'json',
                        pageids: mw.config.get('wgTitle')
                    }).done(function (d) {
                        callback(Object.values(d.query.pages)[0].revisions[0].timestamp.split('T')[0]);
                    });
                }
            }
            
            date(function (timestamp) {
                var user = !$('.message-1 > .speech-bubble-message .edited-by > a.subtle').text() ? $('.message-1 > .speech-bubble-message .edited-by > a').text() : $('.message-1 > .speech-bubble-message .edited-by > a.subtle').text();
                var string = window.ArchiveWallThread.string.replace(/\$id/g, mw.config.get('wgTitle')).replace(/\$title/g, $('.msg-title').text()).replace(/\$user/g, user).replace(/\$date/g, timestamp);
                var text = window.ArchiveWallThread.text.replace(/\$string/, string);
    
                function remove () {
                    $.nirvana.sendRequest({
                        controller: 'WallExternalController',
                        method: 'deleteMessage',
                        type: 'POST',
                        format: 'json',
                        data: {
                            mode: 'remove',
                            msgid: mw.config.get('wgTitle'),
                            formdata: [{
                                name: 'reason',
                                value: i18n.msg('reason').plain()
                            }],
                            token: mw.user.tokens.get('editToken')
                        },
                        callback: function () {
                            window.location.reload();
                        }
                    });
                }
    
                function edit (data) {
                    new mw.Api().post({
                        action: 'edit',
                        format: 'json',
                        minor: true,
                        title: 'Message Wall Greeting:' + mw.config.get('wgUserName'),
                        text: Object.values(data.query.pages)[0].revisions[0]['*'].slice(0, -window.ArchiveWallThread.number) + text,
                        token: mw.user.tokens.get('editToken')
                    }).done(remove);
                }
    
                function get () {
                    new mw.Api().get({
                        action: 'query',
                        prop: 'revisions',
                        rvprop: 'content',
                        format: 'json',
                        titles: 'Message Wall Greeting:' + mw.config.get('wgUserName')
                    }).done(edit);
                }
                
                function click () {
                    $('#PageHeader #ArchiveWallThread').hide();
                    $('<img>', {
                        src: 'https://vignette.wikia.nocookie.net/dev/images/d/de/Ajax-loader.gif',
                        appendTo: '#PageHeader'
                    });
                    get();
                }
    
                mw.loader.using('mediawiki.api').then(function () {
                    $('<button>', {
                        text: i18n.msg('button-label').plain(),
                        id: 'ArchiveWallThread',
                        click: click,
                        appendTo: '#PageHeader'
                    });
                });
            });
        });
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();