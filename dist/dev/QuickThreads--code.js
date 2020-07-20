//<source lang="javascript">
// Made by Gguigui1 - Under CC-BY-SA licence
(function ($, mw, QuickThreads) {
    var lng = {
        // English
        en: {
            buttontext: 'Remove this message',
            confirmthread: 'You will remove all the thread, are you sure you want to continue ?',
            reason: 'Reason :'
        },
		// German (Deutsch)
        de: {
            buttontext: 'Entferne diese Nachricht',
            confirmthread: 'Willst du wirklich den gesamten Diskussionsfaden löschen?',
            reason: 'Grund: '
        },
		// Spanish (Español)
        es: {
            buttontext: 'Borrar este mensaje',
            confirmthread: 'Vas a borrar todo el hilo, ¿Seguro que quieres continuar?',
            reason: 'Motivo: '
        },
        // French (Français)
        fr: {
            buttontext: 'Retirer le message',
            confirmthread: 'Vous êtes sur le point de retirer ce fil, êtes-vous sûr de vouloir continuer ?',
            reason: 'Raison :'
        },
        // Turkish (Türkçe)
        tr: {
            buttontext: 'Bu mesajı kaldır',
            confirmthread: 'Tüm mesajları kaldıracaksınız, devam etmek istediğinize emin misiniz?',
            reason: 'Sebep:'
        },
        // Chinese
        zh: {
            buttontext: '移除此信息',
            confirmthread: '您将会移除整个话题，您确定要继续？',
            reason: '原因：'
        },
        // Chinese (Traditional)
        'zh-hant': {
            buttontext: '移除此訊息',
            confirmthread: '您將會移除整個話題，您確定要繼續？',
            reason: '原因：'
        }
    };
    // UserLanguage > ContentLanguage > ENGLISH
    lng = $.extend(lng.en, lng[mw.config.get('wgContentLanguage')], lng[mw.config.get('wgUserLanguage')]);
    QuickThreads = $.extend({}, QuickThreads);
    QuickThreads.message = QuickThreads.message || 'cleanup';
    if (typeof QuickThreads.notifyadmin != 'undefined') {
        QuickThreads.notifyadmin = QuickThreads.notifyadmin;
    } else {
        QuickThreads.notifyadmin = true;
    }
    QuickThreads.showbutton = function () {
        if ($('.wallfeed').length) {
            $('.wallfeed').each(function () {
                var links = $(this).find('time.wall-timeago');
                links.each(function () {
                    var message = $(this).parent('a').attr('href').split('/wiki/')[1];
                    $(this).parent('a').after(' <a title="' + message + '" message="' + message + '" class="remove-message">' + lng.buttontext + '</a>');
                });
            });
            mw.util.addCSS('.remove-message { cursor: pointer; }');
            if (WikiActivity) {
                var ajaxFunc = WikiActivity.ajax;
                WikiActivity.ajax = function (a, b, callback) {
                    return ajaxFunc.call(this, a, b, function () {
                        var result = callback.apply(this, arguments);
                        QuickThreads.showbutton();
                        return result;
                    });
                };
            }
        }
    };
    // AjaxRC support
    $(document).ready(function () {
        QuickThreads.showbutton();
        if (!$.isArray(window.ajaxCallAgain)) {
            window.ajaxCallAgain = [];
        }
            window.ajaxCallAgain.push(QuickThreads.showbutton);
    });
    $('#myhome-activityfeed').on("click", ".remove-message", function () {
        var messages = $(this).attr('message');
        getid(messages);
    });

    function apiDelete(page, reason, message) {
        if (QuickThreads.notifyadmin) {
            var url = mw.util.wikiScript('wikia') + '?controller=WallExternal&method=deleteMessage&mode=remove&msgid=' + page + '&formdata[0][name]=reason&formdata[0][value]=' + reason + '&formdata[1][name]=notify-admin&formdata[1][value]=on&format=json';
        } else {
            var url = mw.util.wikiScript('wikia') + '?controller=WallExternal&method=deleteMessage&mode=remove&msgid=' + page + '&formdata[0][name]=reason&formdata[0][value]=' + reason + '&format=json';
        }
        $.post(url, function (data) {
            if (data.status == true) {
                $('.remove-message').each(function () {
                    if ($(this).attr('message') != message) {
                        return;
                    }
                    $(this).parents('tr').fadeOut(2000);
                });
            } else {
                alert("Error occured.");
                return false;
            }
        });
    }

    function getid(message) {
        var number = message.split('#')[1];
        if (!number) {
            if (!confirm(lng.confirmthread)) {
                return;
            }
            number = "1";
        }
        var page = message.split('#')[0];
        $.get(mw.config.get('wgScriptPath') + "/wiki/" + page, function (data) {
            var result = $(data).find('#' + number).attr('data-id');
            var reason = prompt(lng.reason, QuickThreads.message);
            if (!reason) {
                return;
            }
            apiDelete(result, reason, message);
        });
    }
})(this.jQuery, this.mediaWiki, window.QuickThreads);
//</source>