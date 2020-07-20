window.ChatQuote = (function(window, $, mw, mainRoom){
    var colors = window.dev.colors;
    function ChatQuote(){
        this.colors = colors;
        // Theme colors
        this.theme = {};
        this.theme.body = this.colors.wikia.body;
        this.theme.border = this.colors.wikia.link;
        this.theme.text = this.color.wikia.text;
        /* Regular expression patterns */
        this.patterns = {};
        // Quote syntax
        this.patterns.syntax = />([^\n]*)/g;
        this.patterns.syntax2 = /<([^>]*)>([^\n]*)/g;
        this.patterns.syntax3 = />\((.+?)\)/g;
        // Template syntax
        this.patterns.template = /\$([a-z][\w\-]*)/g;
        this.patterns.template2 = /\#([a-z][\w\-]*)/g;
        this.patterns.template3 = /\!([a-z][\w\-]*)/g;
        this.patterns.template4 = /\{\{(.+?)\}\}/gi;
        // Formatting syntax
        this.patterns.fullurl = /\[((?:https?:)?\/\/.+?) (.+?)\]/gi;
        this.patterns.page = /\[\[([^|]*?)\]\]/gi;
        this.patterns.pageWithText = /\[\[(.+?)\|(.+?)\]\]/gi;
        this.patterns.hr = /(?:\-{4})/gi;
        this.patterns.italic = /(?:'{2})(.+?)(?:\'{2})/gi;
        this.patterns.bold = /(?:'{3})(.+?)(?:\'{3})/gi;
        this.patterns.underline = /(?:_{2})(.+?)(?:_{2})/gi;
        this.patterns.strikethrough = /(?:-{2})(.+?)(?:-{2})/gi;
        this.patterns.code = /(?:~)(.+?)(?:~)/gi;
        this.patterns.color = /\[color="(.+?)"\](.+?)\[\/color\]/gi;
    }
    
    $.extend(ChatQuote.prototype, {
        quotes: {
            'quote': function(string){},
            'blockquote': function(string){}
        },
        templates: {
            self: mw.config.get('wgUserName'),
            groups: mw.config.get('wgUserGroups').join(', '),
            wikiname: mw.config.get('wgSiteName'),
            gender: function(){
                var args = [].slice.call(arguments),
                    gender = args[0], forms = args[1];
                if (
                    !Array.isArray(forms) &&
                    typeof forms === 'string'
                ) forms = forms.split('|');
                return mw.language.gender(gender, forms);
            },
            plural: function(){
                var args = [].slice.call(arguments),
                    count = args[0], forms = args[1];
                if (
                    !Array.isArray(forms) &&
                    typeof forms === 'string'
                ) forms = forms.split('|');
                return mw.language.convertPlural(Number(count), forms);
            }
        }
    });
}(window, jQuery, mediaWiki, mainRoom));