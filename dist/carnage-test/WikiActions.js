(function(mw, $, WikiActions){
    var wikiActions = $.extend({
        _delete: {
            buttonText: 'Add Delete Tag',
            buttonId: 'deleteTag',
            content: '{{Delete}}',
            summary: '',
            exec: function(content, summary){
                return replaceContent(content, summary);
            }
        },
        _stub: {
            buttonText: 'Add Stub Tag',
            buttonId: 'stubTag',
            content: '{{Stub}}',
            summary: '',
            exec: function(content, summary){
                return prependContent(content, summary);
            }
        },
        _clear: {
            buttonText: 'Clear Page',
            buttonId: 'clearPage',
            summary: '',
            exec: function(summary){
                return clearContent(summary);
            }
        }
    }, WikiActions);
    $(document).ready(function(){
        var $items = $('<div />');
    });
}(this.mediaWiki, this.jQuery, $.extend({}, this.WikiActions)));