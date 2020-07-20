(function($, mw, mainRoom, config){
    var CONSTANT = {
        quote_pattern: /(?:>|quote)\(\n(.*)\n\)/gim,
        patterns: {
            template: /(?:(?:#|\$)([a-z][\w\_]*))/g,
            fn: /(?:([\w\d][\w\d\_]*)\((.*)\))/g, italic: /\'\'(.*)\'\'/g,
            bold: /\'\'\'(.*)\'\'\'/g, link: /\[\[(.*)\]\]/g,
            code: { begin: '\~\~\~\~(\\w+|)', end: '\~\~\~\~', flag: 'gim' }
        }
    };
    
    function ChatQuote(){
        this.theme = {};
        this.patterns = $.extend({}, CONSTANT.patterns, config.patterns);
        mw.hook('dev.colors').add($.proxy(this.setup, this));
    }
    
    ChatQuote.prototype.setup = function(colors){
        this.colors = colors;
        this.theme._body = this.colors.wikia.body;
        this.theme._border = this.colors.wikia.link;
        this.theme._text = this.colors.wikia.text;
        this.process();
    };
}(jQuery, mediaWiki, mainRoom, $.extend({}, window.CQ_config)));