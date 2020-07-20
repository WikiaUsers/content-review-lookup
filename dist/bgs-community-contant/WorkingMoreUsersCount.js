/* WorkingMoreUsersCount
 *
 * Ever fooled by the +n at the side of the minimal user list on the chat rail module?
 * Never again.
 * Shows a modal with all the users currently in chat when clicked.
 *
 * @author Dorumin
 */
$(function initWorkingMoreUsersCount() {
    // if chat isn't enabled
    if (!mw.loader.getState('ext.Chat2')) return;
    if (!$('.more-users-count').length) {
        $('#WikiaRail').on('afterLoad.rail', initWorkingMoreUsersCount);
        return;
    }
    // and with site-wide use, comes precaution of double-runs
    if (window.WorkingMoreUsersCountLoaded) return;
    window.WorkingMoreUsersCountLoaded = true;
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:WorkingMoreUsersCount.css'
        }
    );
    $('body')
        .off('click', '.WikiaChatLink, .chat-module .start-a-chat-button, .chat-module .more-users-count', ChatWidget.openChat)
        .on('click', '.WikiaChatLink, .chat-module .start-a-chat-button', ChatWidget.openChat);
    function setupListeners(i18n) {
        $('.chat-module .more-users-count')
            .removeAttr('href')
            .on('click', function(e) {
                e.preventDefault();
                if ($('#uc-modal').length) {
                    return;
                }
                var $ajax = $('<img>', {
                    id: 'uc-modal-ajax',
                    src: window.stylepath + '/common/images/ajax.gif',
                    alt: i18n.msg('loading').plain(),
                    title: i18n.msg('loading').plain()
                }),
                $userlist = $('<ul>', {
                    id: 'uc-modal-userlist'
                }),
                $user = $('<li>', {
                    class: 'uc-modal-user',
                    append: [
                        $('<img>', {
                            class: 'uc-avatar wds-avatar'
                        }),
                        $('<a>', {
                            class: 'uc-username'
                        }),
                        $('<div>', {
                            class: 'uc-actions'
                        })
                    ]
                });
                $.showCustomModal(i18n.msg('users').escape(), $ajax, {
                    id: 'uc-modal',
                    buttons: [{
                        id: 'uc-close-butt', // apparently, you need to set their IDs or they will have "undefined" in them
                        message: i18n.msg('close').escape(),
                        handler: function() {
                            $('#uc-modal').closeModal();
                        }
                    }, {
                        id: 'uc-chat-butt',
                        message: $('.start-a-chat-button').first().text(),
                        defaultButton: true,
                        handler: function() {
                            ChatWidget.onClickChatButton(mw.util.getUrl('Special:Chat')); // Fandom's widget still sucks
                        }
                    }]
                });
                /* wgWikiaChatUsers is usually defined globally on all pages, but we want to have the latest version */
                $.get(mw.config.get('wgScriptPath') + '/wikia.php?controller=Chat&format=json', function(d) {
                    $('#uc-modal-ajax').replaceWith($userlist);
                    var str = d.globalVariablesScript,
                        fixedJson = str
                            .match(/"wgWikiaChatUsers":\s*(\[[\s\S]+?\])/)[1]
                                .replace(/\\x([0-9a-f]{2})/g, '\\u00$1')  // https://stackoverflow.com/questions/21085673
                                .replace(/\\'/g, "'"),                    // https://stackoverflow.com/questions/6096601 - names with ' ruin my day
                        json = JSON.parse(fixedJson),
                        arr = json.sort(function(a, b) {
                            return a.username.localeCompare(b.username);
                        }).reverse(),
                        i = arr.length;
                    while (i--) {
                        var item = arr[i],
                            $el = $user.clone();
                        $el.find('.uc-avatar')
                            .attr('src', item.avatarUrl);
                        $el.find('.uc-username')
                            .attr('href', mw.util.wikiGetlink('User:' + item.username))
                            .text(item.username);
                        $el.find('.uc-actions').append(
                            $('<a>', {
                                href: item.profileUrl,
                                html: item.profileIcon
                            }),
                            $('<a>', {
                                href: item.contribsUrl,
                                html: item.contribIcon
                            })
                        );
                        $('#wds-icons-reply-small, #wds-icons-pencil-small').removeAttr('id');
                        $userlist.append($el);
                    }
                });
            });
    }
    mw.hook('dev.i18n').add(function(lib) {
        lib.loadMessages('WorkingMoreUsersCount').done(function(i18n) {
            i18n.useUserLang();
            setupListeners(i18n);
        });
    });
});