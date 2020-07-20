/*
 * !ban [[w:c:dev:!ban]]
 *
 * Allows to block from chat without using the usual ban modal
 * Syntax: !ban USER NAME for BAN DURATION because BAN REASON
 * Alt Syntax: !ban USER NAME|BAN DURATION|BAN REASON
 * @author: [[w:User:Dorumin]]
 */
(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserName'
    ]), loaded = 0, i18n, wasDefault;
    if (
        config.wgCanonicalSpecialPageName !== 'Chat' ||
        window['!BanLoaded']
    ) {
        return;
    }
    window['!BanLoaded'] = true;
    [
        'u:dev:MediaWiki:Chat-js.js',
        'u:dev:MediaWiki:I18n-js/code.js'
    ].forEach(function(s) {
        importArticle({ type: 'script', article: s });
    });
    // Taken and modified from [[w:c:dev:MediaWiki:QuickModTools/code.js]].
    function calcTime(s) {
        if (s instanceof Number) {
            return s;
        }
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
            wasDefault = true;
            return window.defCBanDuration || 86400; // null
        } else if ($.isArray(m)) {
            // found match(es)
            var i;
            for (i in m) {
                var a = m[i].split(' ');
                time[a[1]] = Number(a[0].replace(/an?/, '1')) * i18n[a[1]];
            }
            var timeCount = 0;
            for (i in time) {
                timeCount += time[i];
            }
            if (timeCount === 0) {
                wasDefault = true;
                return window.defCBanDuration || 86400; // equal to 0 seconds
            } else {
                return timeCount;
            }
        } else {
            // no matches found - use default time
            wasDefault = true;
            return window.defCBanDuration || 86400;
        }
    }
    function keydown(e) {
        var $this = $(this),
        value = this.value;
        if (e.which === 13 && value.toLowerCase().substr(0, 5) === '!ban ') {
            e.preventDefault();
            var t = /\|/g.test(value) &&
                    !(
                        / for | because (.+)?/gi.test(value) &&
                        value.match(/ for | because (.+)?/gi).length === 2
                    ) ?
                        value.slice(5).split(/\|/g) :
                        value.slice(5).split(/ for | because (.+)?/gi).filter(Boolean);
            $this.val('');
            if (t[0] === config.wgUserName) {
                mainRoom.viewDiscussion.chatUL.append(
                    $('<li>', {
                        'class': 'inline-alert',
                        text: i18n.msg('ban-you').plain()
                    })
                );
                mainRoom.viewDiscussion.scrollToBottom();
                return;
            }
            mainRoom.socket.send(new models.BanCommand({
                userToBan: t[0],
                time: calcTime(t[1] || window.defCBanDuration || ''),
                reason: t[2] || window.defCBanReason || i18n.msg('no-reason').plain()
            }).xport());
            if (wasDefault) {
                mainRoom.viewDiscussion.chatUL.append(
                    $('<li>', {
                        'class': 'inline-alert',
                        text: i18n.msg('time-invalid').plain()
                    })
                );
                mainRoom.viewDiscussion.scrollToBottom();
                wasDefault = false;
            }
        }
    }
    function init(i18na) {
        i18n = i18na;
        $('[name="message"]').keydown(keydown);
    }
    function preload() {
        if (++loaded === 2) {
            if (!mainRoom.userMain.attributes.isModerator) {
                return;
            }
            window.dev.i18n
                .loadMessages('!ban')
                .then(init);
        }
    }
    mw.hook('dev.i18n').add(preload);
    mw.hook('dev.chat.render').add(preload);
})();