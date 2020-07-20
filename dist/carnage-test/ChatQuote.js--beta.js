require([
    'wikia.window',
    'wikia.document',
    'jquery',
    'mw'
], function(window, document, $, mw){
    let colors = (window.dev || {}).colors,
        params = { type: "script", article: "u:dev:MediaWiki:Colors/code.js" };
    if (!Boolean(colors)) importArticle(params);
    function ChatQuote(){
        this.theme = {};
        // Quote patterns
        this.quoteBlockPattern = /quote:\{(.*)\}/gim;
        this.quoteInlinePattern = /\>\s?(.*)/g;
        this.quoteReplyPattern = /reply:\{(.*)\}/gim;
        // Formatting patterns
        this.formatting = {};
    }
});