/**
 * ReplyAndClose.js
 *
 * Gives admins and discussions moderators the ability to simultaneously post a final reply and close the thread
 * @author: [[w:User:Slyst]]
 */

(function () {
    function init (i18n) {
        if (!{1201: 1, 2001: 1}[mw.config.get('wgNamespaceNumber')] && $(['sysop', 'threadmoderator']).not(mw.config.get('wgUserGroups')).length > 1) {
            return;
        }
        var replyAndClose = $.extend({
            reason: 'see reply $1',
            def: '',
            generic: {}
        }, window.replyAndClose);
        replyAndClose.parent = mw.config.get('wgTitle');
        $('.message-main > .speech-bubble-message .buttons .WikiaMenuElement').append(function() {
            if (!$('.reopen-thread').length) {
                return '<li><a class="reply-and-close">' + i18n.msg('title').plain() + '</a></li>';
            }
        });
        $('.reply-and-close').bind('click', function() {
            require(['wikia.ui.factory'], function(ui) {
                ui.init(['modal']).then(function(modal) {
                    var content = '';
                    if (replyAndClose.generic && !$.isEmptyObject(replyAndClose.generic)) {
                        content += '<div style="margin-bottom: 5px;">' + i18n.msg('generic').plain() + ': <select id="reply-and-close-generic">';
                        content += '<option>' + i18n.msg('choose').plain() + '</option>';
                        for (var i in replyAndClose.generic) {
                            content += '<option value="' + i + '">' + i + '</option>';
                        }
                        content += '</select></div>';
                    }
                    content += '<textarea id="reply-body" placeholder="' + i18n.msg('placeholder').plain() + '" rows="10" style="font-family: consolas, \'eupheima UCAS\', ayuthaya, menlo, monospace; width: calc(100% - 10px); resize: none;">' + (replyAndClose.def === '' ? '' : replyAndClose.def) + '</textarea><div id="preview" class="WikiaArticle" style="min-height: 0;"></div>';
                    modal.createComponent({
                        vars: {
                            id: 'reply-and-close-modal',
                            size: 'medium',
                            title: i18n.msg('title').plain() + ': Thread:' + replyAndClose.parent,
                            content: content,
                            buttons: [{
                                vars: {
                                    value: i18n.msg('cancel').plain(),
                                    data: [{
                                        key: 'event',
                                        value: 'close'
                                    }]
                                }
                            }, {
                                vars: {
                                    value: i18n.msg('preview').plain(),
                                    classes: ['normal', 'secondary', 'reply-and-close-preview'],
                                    data: [{
                                        key: 'event',
                                        value: 'preview'
                                    }]
                                }
                            }, {
                                vars: {
                                    value: i18n.msg('post').plain(),
                                    classes: ['normal', 'primary', 'reply-and-close-post'],
                                    data: [{
                                        key: 'event',
                                        value: 'post'
                                    }]
                                }
                            }]
                        }
                    }, function(replyModal) {
                        $('.reply-and-close-post').before('<span class="current-status" style="vertical-align: middle;"></span> <img id="loading" src="' + mw.config.get('stylepath') + '/common/images/ajax.gif" style="vertical-align: middle; margin-left: 5px; display: none;" />');
                        replyModal.bind('post', function(e) {
                            if ($('#reply-body').val() === '') {
                                alert(i18n.msg('empty').plain());
                                return;
                            }
                            $('.reply-and-close-post').attr('disabled', 'disabled');
                            $('.current-status').text(i18n.msg('statusPost').plain());
                            $('#loading').show();
                            $.nirvana.sendRequest({
                                controller: 'WallExternal',
                                method: 'replyToMessage',
                                type: 'POST',
                                data: {
                                    parent: replyAndClose.parent,
                                    body: $('#reply-body').val(),
                                    token: mw.user.tokens.values.editToken
                                },
                                callback: function(data) {
                                    if (data.status) {
                                        $('.current-status').text('Closing');
                                        $.nirvana.sendRequest({
                                            controller: 'WallExternal',
                                            method: 'changeThreadStatus',
                                            type: 'POST',
                                            format: 'json',
                                            data: {
                                                msgid: replyAndClose.parent,
                                                newState: 'close',
                                                formdata: [{
                                                    name: 'reason',
                                                    value: replyAndClose.reason.replace(/\$1/g, '[[#' + (+$('.timestamp .permalink').length + 1) + ']]')
                                                }],
                                                token: mw.user.tokens.get('editToken')
                                            },
                                            callback: function(newData) {
                                                if (newData.status) {
                                                    window.location.reload();
                                                } else {
                                                    $('.reply-and-close-post').removeAttr('disabled');
                                                    $('.current-status').text(i18n.msg('errorClose').plain());
                                                    $('#loading').hide();
                                                }
                                            },
                                            onErrorCallback: function() {
                                                $('.reply-and-close-post').removeAttr('disabled');
                                                $('.current-status').text(i18n.msg('errorClose').plain());
                                                $('#loading').hide();
                                            }
                                        });
                                    } else {
                                        $('.reply-and-close-post').removeAttr('disabled');
                                        $('.current-status').text(i18n.msg('errorPost').plain());
                                        $('#loading').hide();
                                    }
                                },
                                onErrorCallback: function() {
                                    $('.reply-and-close-post').removeAttr('disabled');
                                    $('.current-status').text(i18n.msg('errorPost').plain());
                                    $('#loading').hide();
                                }
                            });
                        });
                        replyModal.bind('preview', function() {
                            $('.reply-and-close-preview').attr('disabled', 'disabled');
                            $('.current-status').text(i18n.msg('statusPreview').plain());
                            $('#loading').show();
                            $.nirvana.sendRequest({
                                controller: 'WallExternal',
                                method: 'preview',
                                type: 'GET',
                                data: {
                                    body: $('#reply-body').val()
                                },
                                callback: function(data) {
                                    $('.reply-and-close-preview').removeAttr('disabled');
                                    $('.current-status').text('');
                                    $('#loading').hide();
                                    $('#preview.WikiaArticle').html(function() {
                                        if (data.body) {
                                            return '<h3>' + i18n.msg('preview').plain() + '</h3>' + data.body;
                                        } else {
                                            $('.current-status').text(i18n.msg('errorPreview').plain());
                                        }
                                    });
                                },
                                onErrorCallback: function() {
                                    $('.reply-and-close-preview').removeAttr('disabled');
                                    $('.current-status').text(i18n.msg('errorPreview').plain());
                                    $('#loading').hide();
                                }
                            });
                        });
                        replyModal.show();
                        $('#reply-and-close-generic').bind('change', function() {
                            $('#reply-body').val(replyAndClose.generic[$(this).val()]);
                        });
                    });
                });
            });
        });
    }
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('ReplyAndClose').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();