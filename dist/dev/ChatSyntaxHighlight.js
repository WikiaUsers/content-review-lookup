/* ChatSyntaxHighlight
 *
 * Introduces syntax highlighting into chat using markup syntax
 * Depends on highlight.js for language support
 *
 * @author Dorumin
 */
(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        (window.ChatSyntaxHighlight && window.ChatSyntaxHighlight.init)
    ) return;

    var ChatSyntaxHighlight = $.extend({
        mobile: true,
        index: 0,
        highlightRegexp: /```([\s\S]*?)```/g,
        tabString: '\t',
        _preload: 0,
        message: mainRoom.viewDiscussion.getTextInput().get(0),
        preload: function() {
            if (++this._preload === 2) {
                if (this.hasOwnProperty('theme')) {
                    window.dev.highlight.useTheme(this.theme);
                }
                window.dev.highlight.loadAllLanguages().then($.proxy(this.init, this));
            }
        },
        bindToAllMessages: function(fn) {
            mainRoom.model.chats.models.forEach(fn);
            mainRoom.model.chats.bind('afteradd', fn);
            mainRoom.model.privateUsers.bind('add', function(user) {
                var privateRoom = mainRoom.chats.privates[user.attributes.roomId];
                privateRoom.model.chats.bind('afteradd', fn);
            });
        },
        afterMessage: function(model) {
            var message = document.querySelector('#entry-' + model.cid + ' .message');

            if (message && this.highlightRegexp.test(message.innerHTML)) {
                this.performReplacements(message, model);
            }
        },
        performReplacements: function(message, model) {
            this.index = 0;
            var matches = model.attributes.text.match(this.highlightRegexp).map(function(str) {
                return str.slice(3, -3);
            });
            message.innerHTML = message.innerHTML.replace(this.highlightRegexp, this.replaceFunction.bind(this, matches));
        },
        replaceFunction: function(matches) {
            var lines = matches[this.index++].split('\n'),
            language = 'nohighlight',
            _lang = window.dev.highlight.canonicalName(lines[0]);

            if (
                lines.length > 1 &&
                window.dev.highlight.validLanguage(_lang)
            ) {
                lines.shift();
                language = _lang;
            }

            var pre = document.createElement('pre');
            pre.className = 'hljs hljs-pre ' + language;
            pre.textContent = lines.join('\n');
            if (language !== 'nohighlight hljs') {
                pre.setAttribute('data-lang', language);
            }

            window.dev.highlight.highlightBlock(pre);

            return pre.outerHTML;
        },
        onInput: function(e) {
            var matches = e.target.value.match(/```[\s\S]*?(```|$)/g),
            isWritingCodeBlock = matches && (matches[matches.length - 1].slice(-3) != '```' || matches.length == 3),
            el = this.message,
            val = el.value;
            if (e.type == 'keydown' && e.which == 9 && isWritingCodeBlock) {
                e.preventDefault();
                el.value = val.slice(0, el.selectionStart) + this.tabString + val.slice(el.selectionEnd);
                el.selectionStart = el.selectionEnd = el.selectionStart + this.tabString;
            } else if (e.type == 'keypress' && !isWritingCodeBlock) {
                mainRoom.sendMessage(e);
            }
        },
        init: function() {
            this.bindToAllMessages(this.afterMessage.bind(this));
        }
    }, window.ChatSyntaxHighlight);

    // Take over input handling
    mainRoom.viewDiscussion
        .unbind('sendMessage')
        .bind('sendMessage', ChatSyntaxHighlight.onInput.bind(ChatSyntaxHighlight));

    ChatSyntaxHighlight.message.addEventListener('keydown', ChatSyntaxHighlight.onInput.bind(ChatSyntaxHighlight));

    window.ChatSyntaxHighlight = ChatSyntaxHighlight;

    [
        { a:'Chat-js',      h: 'highlight'   },
        { a:'Highlight-js', h: 'chat.render' }
    ].forEach(function(s) {
        mw.hook('dev.'+ s.h).add(
            ChatSyntaxHighlight.preload.bind(ChatSyntaxHighlight)
        );
        importArticle({ type: 'script', article: 'u:dev:' + s.a + '.js' });
    });

    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:ChatSyntaxHighlight.css'
    });

})();