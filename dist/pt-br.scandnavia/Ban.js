/*
 * !ban [[w:c:dev:!ban]]
 *
 * Allows to block from chat without using the usual ban modal
 * Syntax: !ban USER NAME for BAN DURATION because BAN REASON
 * Alt Syntax: !ban USER NAME|BAN DURATION|BAN REASON
 * @author: [[w:User:Dorumin]]
 */
 
var bInterval = setInterval(function() {
    if (!window.mainRoom || !window.mainRoom.userMain)
        return;
    clearInterval(bInterval);
    if (mw.config.get('wgCanonicalSpecialPageName') != 'Chat' || !mainRoom.userMain.attributes.isModerator) return;
    // Taken and modified from [[w:c:dev:MediaWiki:QuickModTools/code.js]].
    var calcTime = function(s) {
        if (s.constructor === Number)
            return s;
        var time = {},
            i18n = {
                second: 1,
                minute: 60,
                hour: 3600,
                day: 86400,
                week: 604800,
                month: 2592000,
                year: 31536000
            },
            m = s.toLowerCase().match(/(\d+|an?) (second|minute|hour|day|week|month|year)/g);
        if (m === null && /never|infinite|indefinite|forever/i.test(s.toLowerCase())) {
            return 31536000000;
        } else if (m === null) {
            window.wasDefault = true;
            return window.defCBanDuration || 86400; // null
        } else if ($.isArray(m)) {
            // found match(es)
            for (var i in m) {
                var a = m[i].split(" ");
                time[a[1]] = Number(a[0].replace(/an?/, '1')) * i18n[a[1]];
            }
            var timeCount = 0;
            for (var i in time) {
                timeCount += time[i];
            }
            if (timeCount == 0) {
                window.wasDefault = true;
                return window.defCBanDuration || 86400; // equal to 0 seconds
            } else {
                return timeCount;
            }
        } else {
            // no matches found - use default time
            window.wasDefault = true;
            return window.defCBanDuration || 86400;
        }
    };
    $('[name="message"]').keydown(function(e) {
        var $this = $(this),
        value = this.value;
        if (e.which == 13 && value.toLowerCase().substr(0, 5) == '!ban ') {
            e.preventDefault();
            var t = /\|/g.test(value) && !(/ for | because (.+)?/gi.test(value) && value.match(/ for | because (.+)?/gi).length == 2) ?
                value.slice(5).split(/\|/g) :
                value.slice(5).split(/ for | because (.+)?/gi).filter(Boolean);
            $this.val('');
            if (t[0] == mw.config.get('wgUserName')) {
                mainRoom.viewDiscussion.chatUL.append('<li class="inline-alert">Você não\'pode banir a si mesmo.</li>');
                mainRoom.viewDiscussion.scrollToBottom();
            }
            if (!t[1]) t[1] = window.defCBanDuration || '';
            if (!t[2]) t[2] = window.defCBanReason || 'Nenhum motivo definido.';
            mainRoom.socket.send(new models.BanCommand({
                userToBan: t[0],
                time: calcTime(t[1]),
                reason: t[2]
            }).xport());
            if (window.wasDefault) {
                mainRoom.viewDiscussion.chatUL.append('<li class="inline-alert">Tempo de banimento inválido.</li>');
                mainRoom.viewDiscussion.scrollToBottom();
                wasDefault = false;
            }
        }
    });
}, 250);