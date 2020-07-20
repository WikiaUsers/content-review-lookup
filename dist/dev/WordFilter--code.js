// <nowiki>
/* Script for WordFilter - Written by Drew1200. (Warning: Following script contains a list of expletives) */ 
/* Continued by Curiouscrab */

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') != 'Chat' ||
        (window.WordFilter && WordFilter.init)
    ) return;

    window.WordFilter = $.extend({
        alert: window.alertMessage,
        message: '',
        badWords: (window.badWords || []).concat(["blocked-test", "bfd", "omfg", "blumpkin", "pussy", "boner", "felch", "fuck", "shit", "bastard", "bitch", "cock", "faggot", "fag", "nigger", "negro", "dick", "whore", "cunt", "vagina", "wtf", "stfu", "piss", "boobs", "tits", "damn", "slut", "lmao", "joder", "jodete", "jodido", "tetas", "pechos", "felación", "semen", "puta", "mierda", "coño", "nigga", "gilipollas", "cabrón", "fap", "fapear", "fapearse", "caralho", "cacete", "siririca", "sexo oral", "sexo anal", "fazer anal", "fazer oral", "ppk", "bronheiro", "comer cu", "punheteiro", "aquela puta", "sua puta", "é puta", "que puta", "fodi", "fodendo", "oco no rabo", "deixar um oco", "da puta", "brioco", " piru ", "meu piru ", "meu piru,", "meu piru.", "viadão", "viadaum", "tô puto", "muito puta", "toma no cu", "tome no cu", "cacete", "kct", "cecete", "crl", "bct", "escravorola", " porra ", "q porra", "saporra", "çáporra", "poha", "poh4", "porr4", "çapoha", "çápoha", "çaporra", "que porra", "essa porra", "essa porr4", "essa porra", "essa poha", "essa poh4", "poarr", "po4rr", "viadaji", "porrã", "porrá", "prra", " viada", "viadu", "viadin", "viadim", "viadona", "viadage", "viadagi", "fodã", "porra", "cu", "xota", "buceta", "fdp", "tnc", "foda-se", "foda", "(|)", "caralha", "punheta", "transa", "kurwa", "pochwa"]),
        _preload: 0,
        preload: function() {
            if (++this._preload == 2) {
                dev.i18n.loadMessages('WordFilter').then(this.init.bind(this));
            }
        },
        testWords: function(str) {
            var i = this.badWords.length;
            while (i--) {
                if (str.toLowerCase().indexOf(this.badWords[i].toLowerCase()) != -1) {
                    return true;
                }
            }
            return false;
        },
        onKeyDown: function(e) {
            if (e.keyCode == 13 && this.testWords(e.target.value) && mainRoom.active) {
                var message = e.target.value,
                inlines = dev.chat.inlineAlert(
                    (this.alert || this.i18n.msg('warnMessage').escape()) + '\n' +
                    mw.html.element('button', null, this.i18n.msg('continue').plain()) +
                    ' ' + this.i18n.msg('or').escape() + ' ' +
                    mw.html.element('button', null, this.i18n.msg('cancel').plain())
                );

                e.target.value = '';

                this.bindButtons(inlines, message);
            }
        },
        bindButtons: function(inlines, message) {
            var inline  = document.getElementById('entry-' + inlines[inlines.length - 1].cid);
            if (!inline) return;
            var buttons = inline.querySelectorAll('button');

            buttons[0].onclick = this.confirm.bind(this, inlines, message);
            buttons[1].onclick = this.remove.bind(this, inlines);
        },
        confirm: function(inlines, message) {
            mainRoom.socket.send(new models.ChatEntry({
                roomId: mainRoom.roomId,
                name: wgUserName,
                text: message
            }).xport());
            this.remove(inlines);
        },
        remove: function(inlines) {
            inlines.forEach(function(model) {
                var entry = document.getElementById('entry-' + model.cid);
                if (!entry) return;
                entry.parentElement.removeChild(entry);
            });
        },
        init: function(i18n) {
            this.i18n = i18n;

            mainRoom.viewDiscussion.getTextInput().keydown(this.onKeyDown.bind(this));
        }
    }, window.WordFilter);

    mw.hook('dev.i18n').add(WordFilter.preload.bind(WordFilter));
    mw.hook('dev.chat.socket').add(WordFilter.preload.bind(WordFilter));
    
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Chat-js.js'
        ]
    });
})();