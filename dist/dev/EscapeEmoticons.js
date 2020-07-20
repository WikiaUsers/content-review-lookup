/* EscapeEmoticons
 *
 * Allows you to prevent emoticons from displaying by prepending a backslash (\) to them
 * 
 * @author Dorumin
 */

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') != 'Chat' ||
        (window.EscapeEmoticons && window.EscapeEmoticons.init)
    ) return;

    window.EscapeEmoticons = $.extend({
        escapeChar: '\\',
        emotes: [],
        regex: null,
        $input: null,
        escapeRegex: function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
        },
        createRegex: function() {
            if (!this.regex) {
                // ¯\\\\\\\\\\_(ツ)_/¯
                var ec = this.escapeRegex(this.escapeChar);
                this.regex = new RegExp('(' + ec + '?)' + ec + '(' + this.emotes.map(this.escapeRegex).join('|') + ')', 'gi');
            }
            return this.regex;
        },
        replace: function(full, slash, capt) {
            if (slash) return full.slice(1);
            return '[[]]' + capt;
        },
        doReplacements: function(target) {
            target.value = target.value.replace(this.createRegex(), this.replace);
            this.$input.trigger({
                type: 'keypress',
                which: 13,
                fake: true
            });
        },
        onKeyDown: function(e) {
            if (e.which == 13 && !e.shiftKey && !e.fake) {
                e.preventDefault();
                setTimeout(this.doReplacements.bind(this, e.target), 0);
            }
        },
        init: function() {
            this.emotes = _.flatten(_.values(ChatView.prototype.emoticonMapping._settings));
            this.$input = mainRoom.viewDiscussion.getTextInput();
            this.$input.on('keydown', this.onKeyDown.bind(this));
        }
    }, window.EscapeEmoticons);

    mw.hook('dev.chat.render').add(EscapeEmoticons.init.bind(EscapeEmoticons));
    
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Chat-js.js'
        ]
    });
})();