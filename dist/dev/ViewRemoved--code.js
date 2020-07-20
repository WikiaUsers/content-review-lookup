/* 
 * View Removed 
 * @description Easily see removed messages from threads
 * @author Ozuzanna
 */

mw.loader.using('mediawiki.api').then(function() {
    if (window.ViewRemovedLoaded) return;
    window.ViewRemovedLoaded = true;
    var mwc = mw.config.get(['wgScriptPath']);
    if (typeof dev == 'undefined' || typeof dev.i18n == 'undefined') {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
    function revealContent($el) {
        $el.removeClass('hide');
        var id = $el.attr('data-id'),
            relativeid = $el.attr('id'),
            Api = new mw.Api();
        if (!id) return;
        Api.get({
            action: 'query',
            prop: 'revisions',
            rvprop: 'timestamp|user',
            rvdir: 'newer',
            rvlimit: 'max',
            pageids: id
        }).done(function(ts) {
            if (!ts || !ts.query || ts.error) return;
            var revs = ts.query.pages[id].revisions,
                rev = revs[0],
                last_rev = ts.query.pages[id].revisions[revs.length - 1],
                name = rev.user,
                time = last_rev.timestamp,
                d = new Date(time),
                readableTime = d.getHours() + d.getTimezoneOffset() / 60 + ':' + d.getMinutes() + ', ' + wgMonthNames[d.getMonth() + 1] + ' ' + d.getDate() + ', ' + d.getFullYear();
            $.get(mwc.wgScriptPath + '/api/v1/User/Details', {
                ids: name,
                size: 50
            }).always(function(avi) {
                if (avi.status == 404) {
                    avi = 'https://images.wikia.nocookie.net/messaging/images/thumb/1/19/Avatar.jpg/50px-Avatar.jpg'; // IPs
                } else {
                    avi = avi.items[0].avatar;
                }
                Api.get({
                    action: 'parse',
                    pageid: id
                }).done(function(d) {
                    var html = d.parse.text['*'],
                        $avatar = $('<div>', {
                            class: 'speech-bubble-avatar'
                        }).append($('<a>', {
                            href: wgArticlePath.replace('$1', 'Message_Wall:' + name),
                            append: $('<img>', {
                                src: avi,
                                width: '30',
                                height: '30',
                                class: 'avatar',
                                alt: name
                            })
                        })),
                        $msg = $('<div>', {
                            class: 'speech-bubble-message'
                        }).append($('<div>', {
                            class: 'MiniEditorWrapper',
                            'data-min-height': '100',
                            'data-max-height': '400',
                            append: [
                                $('<div>', {
                                    class: 'edited-by',
                                    append: [
                                        $('<a>', {
                                            text: name,
                                            href: wgArticlePath.replace('$1', 'User_talk:' + name)
                                        }),
                                        $('<a>', {
                                            class: 'subtle',
                                            href: wgArticlePath.replace('$1', 'User_talk:' + name)
                                        })
                                    ]
                                }),
                                $('<div>', {
                                    class: 'editarea',
                                    'data-space-type': 'editarea',
                                    append: [
                                        $('<div>', {
                                            class: 'msg-body',
                                            id: 'WallMessage_' + id,
                                            html: html
                                        }),
                                        $('<div>', {
                                            class: 'loading-indicator',
                                            'data-space-type': 'loading-status',
                                            append: [
                                                $('<div>', {
                                                    class: 'loading-background'
                                                }),
                                                $('<div>', {
                                                    class: 'loading-message',
                                                    append: [
                                                        $('<span>', {
                                                            class: 'loading-throbber',
                                                            html: '&nbsp;'
                                                        }),
                                                        $('<span>', {
                                                            class: 'loading-text',
                                                            html: 'Loading editor'
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                $('<div>', {
                                    class: 'toolbar',
                                    'data-space-type': 'toolbar'
                                }),
                                $('<div>', {
                                    class: 'msg-toolbar',
                                    append: [
                                        $('<div>', {
                                            class: 'timestamp',
                                            append: $('<a>', {
                                                class: 'permalink',
                                                tabindex: '-1',
                                                href: '#' + relativeid,
                                                append: [
                                                    $('<span>', {
                                                        class: 'timeago abstimeago',
                                                        title: time,
                                                        alt: readableTime,
                                                        each: function() {
                                                            $(this).timeago();
                                                        }
                                                    }),
                                                    $('<span>', {
                                                        class: 'timeago-fmt',
                                                        text: readableTime
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        }));
                    $el.append($avatar, $msg);
                });
            });
        });
    }
    mw.hook('dev.i18n').add(function(devi18n) {
        devi18n.loadMessages('ViewRemoved').done(function(i18n) {
            i18n.useUserLang();
            $('.message-removed').each(function() {
                var $el = $(this);
                if (window.ViewRemovedAlways || !$el.hasClass('hide')) {
                    revealContent($el);
                    return;
                }
                $el.find('.speech-bubble-message-removed').append('(', $('<a>', {
                    text: i18n.msg('see-message').escape(),
                    click: function() {
                        revealContent($el);
                    }
                }).css('cursor', 'pointer'), ')');
            });
        });
    });
});