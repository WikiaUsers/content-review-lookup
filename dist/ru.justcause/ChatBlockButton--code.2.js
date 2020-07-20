/**
 * ChatBlockButton, version 3
 * Adds a block option to each dropdown of every user in chat when their name is clicked if they do not have moderator rights.
 * @author Ozank Cx
 * Cleanup and +original i18n by Count of Howard using code by KockaAdmiralac
 */
require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
 
    var config = mw.config.get([
            'wgCanonicalSpecialPageName',
            'wgUserGroups',
            'wgSiteName'
        ]),
        i18n,
        blockReason,
        blockExpiry;
 
    if (
        config.wgCanonicalSpecialPageName !== 'Chat' ||
        !/(sysop|staff|helper|vstf|global-discussions-moderator)/.test(config.wgUserGroups) ||
        window.ChatBlockButtonLoaded
    ) {
        return;
    }
    window.ChatBlockButtonLoaded = true;
 
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('ChatBlockButton').done(function(i18nd) {
 
            i18n = i18nd;
 
            blockReason = window.chatBlockReason || i18n.msg('cBlockReason').plain();
            blockExpiry = window.chatBlockExpiry || i18n.msg('cBlockExpiry').plain();
 
            mw.hook('dev.chat.socket').add(function(mainRoom) {
                mainRoom.viewUsers.bind('mainListClick', ui);
            });
 
        });
    });
 
    function ui(u) {
        if ($('.block-custom').exists()) {
            return;
        }
        $('.kick')
            .clone()
            .addClass('block-custom')
            .removeClass('kick')
            .click(function () {
                $(this).remove();
                modal(u.name);
            })
            .appendTo('.admin-actions');
 
        $('.block-custom span').attr({
            id:    'block-custom',
            class: 'label'
        });
 
        $('.block-custom .label')
            .text(i18n.msg('menuLabel').plain());
    }
 
    function inlineAlert(msg) {
        mainRoom.model.chats.add(new models.InlineAlert({ text: mw.html.escape(msg) }));
        $('[name="message"]').val('').removeAttr('disabled').focus();
    }
 
    function formHTML() {
        return $('<form>', {
            'method': '',
            'name':   '',
            'class':  'WikiaForm',
            append:   $('<fieldset>').append([
                $('<p>', {
                    append: [
                        i18n.msg('expires').escape(),
                        '<br/>',
                        $('<input>', {
                            'type':        'text',
                            'id':          'block-expiry',
                            'placeholder': blockExpiry
                        })
                    ]
                }),
                '<br/>',
                $('<p>', {
                    append: [
                        i18n.msg('reason').escape(),
                        '<br/>',
                        $('<input>', {
                            'type':        'text',
                            'id':          'block-reason',
                            'placeholder': blockReason
                        })
                    ]
                }),
                '<br/>',
                $('<label>', {
                    'for':  'block-nocreate',
                    append: [
                        $('<input>', {
                            'type':    'checkbox',
                            'id':      'block-nocreate',
                            'checked': 'checked'
                        }),
                        i18n.msg('accountCreation').escape()
                    ]
                }),
                '<br/>',
                $('<label>', {
                    'for':  'block-restrtp',
                    append: [
                        $('<input>', {
                            'type':    'checkbox',
                            'id':      'block-restrtp',
                            'checked': 'checked'
                        }),
                        i18n.msg('talkPage').escape()
                    ]
                })
            ])
        }).html();
    }
 
    function modal(username) {
        mw.util.addCSS(
            '#block-expiry,' +
            '#block-reason {' +
            'width: 98%;' +
            '}'
        );
        $.showCustomModal(i18n.msg('blockAction').escape().replace('$1', username) + ' ' + config.wgSiteName, formHTML(), {
            id: 'chat-admin-block',
            width: 400,
            buttons: [{
                message: i18n.msg('buttonCancel').escape(),
                handler: function () {
                    $('#chat-admin-block').closeModal();
                }
            }, {
                message: i18n.msg('buttonBlock').escape(),
                defaultButton: true,
                handler: function () {
                    handler(username);
                }
            }]
        });
    }
 
    function handler(username) {
        var block = {
            action: 'block',
            user: username,
            expiry: $('#block-expiry')[0].value || $('#block-expiry').attr('placeholder'),
            reason: $('#block-reason')[0].value || $('#block-reason').attr('placeholder'),
            nocreate: '',
            allowusertalk: '',
            autoblock: 0,
            format: 'json',
            token: mw.user.tokens.get('editToken')
        };
 
        if (!$('#block-nocreate')[0].checked) {
            delete block.nocreate;
        }
 
        if ($('#block-restrtp')[0].checked) {
            delete block.allowusertalk;
        }
 
        blockUser(block, username);
    }
 
    function blockUser(param, username) {
        $.ajax({
            url: mw.util.wikiScript('api'),
            type: "POST",
            dataType: "JSON",
            data: param,
            success: function (d) {
                if (!d.error) {
                    inlineAlert(username + ' ' + i18n.msg('blockSuccess').plain());
                    mainRoom.kick({
                        name: username
                    });
                } else {
                    inlineAlert(i18n.msg('blockFailure').plain() + ' ' + d.error.code);
                }
            },
            error: function () {
                inlineAlert(i18n.msg('blockUnknownError').plain());
            }
        });
        $('#chat-admin-block').closeModal();
    }
 
    [
        'u:dev:I18n-js/code.js',
        'u:dev:Chat-js.js'
    ].forEach(function(s) {
        importArticle({ type: 'script', article: s });
    });
 
});