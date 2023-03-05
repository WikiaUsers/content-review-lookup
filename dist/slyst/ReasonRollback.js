$(function() {
    if (!$('.mw-rollback-link').length) return;
    var i18n = {
        en: {
            success: 'Message sent.',
            empty: 'Please make sure that the title and the reason have been filled.',
            titleHead: 'Title',
            titleDefault: 'Edit rollbacked',
            reason: 'Type the reason below',
            signature: 'Signature'
        }
    },
        namespace;
    i18n = $.extend(i18n[mw.config.get('wgUserLanguage')], i18n.en);
    $.get('/wiki/User_talk:' + mw.config.get('wgUserName'), function(data) {
        namespace = data.slice(data.indexOf('"wgCanonicalNamespace":"') + 24, data.indexOf('","wgCanonicalSpecialPageName'));
    });
    $('.mw-rollback-link').each(function() {
        var $this = $(this);
        $(this).on('click', function(e) {
            e.preventDefault();
            $.showCustomModal('ReasonRollback', '<form><label for="wpTitle">' + i18n.titleHead + ':</label> <input type="text" id="reason-rollback-title" value="' + i18n.titleDefault + '" style="width: 200px;"><br /><label for="wpReason">' + i18n.reason + ':</label><br /><textarea id="reason-rollback-reason" cols="70" rows="10"></textarea>' + (namespace == 'User_talk' ? '<br /><label for="wpSignature">' + i18n.signature + ':</label> <input type="text" id="reason-rollback-signature" value="~~' + '~~">' : '') + '</form>', {
                id: 'reason-rollback',
                width: 650,
                buttons: [{
                    message: 'Send',
                    defaultButton: true,
                    handler: function() {
                        var url = $this.find('a').attr('href');
                        if ($('#reason-rollback-title').val() && $('#reason-rollback-reason').val()) {
                            $.post(url);
                            switch(namespace) {
                                case 'User_talk':
                                    $.post(mw.util.wikiScript('api'), {
                                        action: 'edit',
                                        title: 'User_talk:' + decodeURIComponent(url.split('from=')[1].split('&')[0]),
                                        section: 'new',
                                        sectiontitle: $('#reason-rollback-title').val(),
                                        text: $('#reason-rollback-reason').val() + '\n' + $('#reason-rollback-signature').val(),
                                        token: mw.user.tokens.values.editToken
                                    }, function(data) {
                                        if (!data.error) {
                                            alert(i18n.success);
                                            $('#reason-rollback').closeModal();
                                        }
                                    });
                                    break;
                                default:
                                    $.post(mw.util.wikiScript('wikia'), {
                                        controller: 'WallExternal',
                                        method: 'postNewMessage',
                                        pagetitle: url.split('from=')[1].split('&')[0],
                                        pagenamespace: 1200,
                                        messagetitle: $('#reason-rollback-title').val() || i18n.titleDefault,
                                        body: $('#reason-rollback-reason').val(),
                                        format: 'json'
                                }, function(data) {
                                        if (!data.error) {
                                            alert(i18n.success);
                                            $('#reason-rollback').closeModal();
                                        }
                                    });
                                    break;
                            }
                        } else {
                            alert(i18n.empty);
                        }
                    }
                }, {
                    message: 'Cancel',
                    handler: function() {
                        $('#reason-rollback').closeModal();
                    }
                }]
            });
        });
    });
});