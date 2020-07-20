/* ChainQuotes
 *
 * Lets you shift click thread "Quote" buttons to append the quote to the current editor instead of replacing everything
 * Yes, once again, it works with RTE. You still shouldn't use it tho
 * 
 * @author Dorumin
 */

mw.loader.using('mediawiki.util').then(function() {
    if (
        !$('#Wall').exists() ||
        window.ChainQuotes && ChainQuotes.init
    ) return;

    window.ChainQuotes = $.extend({
        wall: $('#Wall').data('Wall'),
        getMode: function() {
            var editor = this.wall.replyMessageForm.editor;
            return editor && editor.data('wikiaEditor')
                ? window.WikiaEditor.modeToFormat(editor.data('wikiaEditor').mode)
                : 'wikitext';
        },
        getQuote: function(id) {
            return $.nirvana.sendRequest({
                controller: 'WallExternalController',
                method: 'getFormattedQuoteText',
                format: 'json',
                data: {
                    messageId: id,
                    convertToFormat: this.getMode()
                }
            });
        },
        addQuote: function(e) {
            this.getQuote($(e.target).closest('.message').data('id')).then(this.onQuote.bind(this));
            this.scrollToEditor();
        },
        onQuote: function(data) {
            this.appendToEditor('\n' + data.markup);
            this.scrollEditorToBottom();
        },
        appendToEditor: function(text) {
            var inst = WikiaEditor.getInstance();
            inst.setContent(inst.getContent() + text);
        },
        scrollToEditor: function() {
            $('body').scrollTo(WikiaEditor.getInstance().element.offset().top - innerHeight / 3, {
                duration: 600
            });
        },
        scrollEditorToBottom: function() {
            var inst = WikiaEditor.getInstance(),
            box = inst.getEditbox();
            if (box.prop('tagName').toLowerCase() !== 'textarea') {
                box = box.parent();
            }
            box.scrollTop(box.prop('scrollHeight'));
        },
        onClick: function(e) {
            if (!e.shiftKey || !this.wall.replyMessageForm.editor) return;
            // In case you were wondering, this has the potential to be bound multiple times
            // But this stopImmediatePropagation stops the original quote and any other append quote calls C:
            // I'm an absolute terror
            e.stopImmediatePropagation();
            this.addQuote(e);
        },
        onPage: function() {
            $('.quote-button').click(this.onClick.bind(this));
        },
        init: function() {
            mw.hook('wikipage.content').add(this.onPage.bind(this));
            if (this.wall && this.wall.pagination) {
                this.wall.pagination.on('afterPageLoaded', this.onPage.bind(this));
            }
        }
    }, window.ChainQuotes);

    ChainQuotes.init();
});