/**
 * @title           ChatQuote
 * @description     This script allows users to insert quotes
 *                  in the chat.
 * @author          Ultimate Dark Carnage <https://dev.wikia.com/wiki/User:Ultimate_Dark_Carnage>
 * @version         v1.2
 **/
(function($, mw, mainRoom, config){
    function ChatQuote(room){
        if (typeof room.roomId !== 'undefined'){
            mw.hook('dev.colors').add($.proxy(this._setup, this));
        }
    }
    
    ChatQuote.prototype._setup = function(colors){
        this.colors = colors;
        this.theme = {};
        this.theme.bodyColor = this.colors.wikia.body;
        this.theme.borderColor = this.colors.wikia.link;
        this.theme.textColor = this.colors.wikia.text;
        /* Regular expression patterns */
        this.qPattern = /\>\{(?:\n|)(.*)(?:\n|)\}/gim;
        this.qaPattern = /\>(?:\((.*)\)|)\{(?:\n|)(.*)(?:\n|)\}/gim;
        this.fPattern = /(?:([a-z0-9][a-z0-9\_]*)\((.*)\))/g;
        this.tPattern = /(?:\$([a-z][\w\-]*))/g;
        // Tag support (alpha)
        this.wTagPattern = this.escapeRegex("(a(?:bbr|side|)|b(?:d(?:i|o)|r|)|c(?:aption|ite|ode|ol(?:group|))|d(?:d|el|etails|fn|iv|l|t)|em|f(?:ig(?:caption|ure)|ooter)|h(?:[1-6]|eader|r)|i(?:mg|ns|)|kbd|li|mark|nav|ol|p(?:re|)|q|r(?:b|p|t(?:c|)|uby)|s(?:amp|ection|pan|trong|ub|ummary|up|)|t(?:able|body|d|foot|h(?:ead|)|ime|r)|u(?:l|)|var|wbr)");
        this.wAttrPattern = this.escapeRegex("(class|id|dir|lang|type|src|alt|title|style|data-(?:[a-z][a-z-]+)|)");
        this.wExtPattern = this.escapeRegex("(png|jpg|gif|tiff|jpeg|svg|bat|bmp)");
        // End tag support
        this.setTheme();
    };
    
    ChatQuote.prototype.parsers = {
        bold: {
            pattern: /(?:\'{3})(.*)(?:\'{3})/gi,
            result: '<span class="bold">$1</span>' 
        },
        code: {
            pattern: /(?:\~)(.*)(?:\~)/gi,
            result: '<code>$1</code>'
        },
        italic: {
            pattern: /(?:\'{2})(.*)(?:\'{2})/gi,
            result: '<span class="italic">$1</span>'
        },
        strikethrough: {
            pattern: /(?:\~\+)(.*)(?:\+\~)/gi,
            result: '<span class="strikethrough">$1</span>'
        },
        underline: {
            pattern: /(?:\-\-)(.*)(?:\-\-)/gi,
            result: '<span class="underline">$1</span>'
        },
        link: {
            pattern: /(?:\[\[)(.*)(?:\]\])/gi,
            result: function(match, link){
                var url, title, parts;
                if (link.indexOf('|', 0) > -1){
                    parts = link.split('|').slice(0,2);
                    url = mw.util.getUrl(parts[0]);
                    title = parts[1];
                } else {
                    url = mw.util.getUrl(link);
                    title = link;
                }
                return '<a href="' + url + '">' + title + '</a>';
            }
        },
        extlink: {
            pattern: /(?:\[)(.*)(?:\])/gi,
            result: function(match, link){
                var url, title, parts;
                if (link.indexOf(' ', 0) > -1){
                    parts = link.split(/\s+/).slice(0,2);
                    url = parts[0];
                    title = parts[1];
                } else {
                    url = link;
                    title = link;
                }
                return '<a href="' + url + '">' + title + '</a>';
            }
        }
    };
    
    ChatQuote.prototype.escapeRegex = function(string){
        string = string.replace(/[.*+-?^${}()|[\]\\]/g, '\\$&');
        return string;
    };
    
    ChatQuote.prototype.parseFn = function(string, callback){
        string = string.replace(this.fPattern, $.proxy(callback, this));
        return string;
    };
    
    ChatQuote.prototype.parseTemplate = function(string){
        var callback = function(match, p1){
            if (this.variables.hasOwnProperty(p1)) return this.variables[p1];
            return match;
        };
        string = string.replace(this.tPattern, $.proxy(callback, this));
        return string;
    };
    
    ChatQuote.prototype.parseFormat = function(string){
        $.each(this.parsers, $.proxy(function(parser){
            while (parser.result.test(string)){
                string = string.replace(parser.pattern, parser.result);
            }
        }, this));
        return string;
    };
    
    ChatQuote.prototype.setTheme = function(){
        var bodyColor = this.theme.bodyColor,
            borderColor = this.theme.borderColor,
            textColor = this.theme.textColor,
            bodyC = this.colors.parse(bodyColor),
            borderC = this.colors.parse(borderColor),
            textC = this.colors.parse(textColor);
        bodyC = (bodyC.isBright() ? bodyC.lighten(-10) : bodyC.lighten(10)).hex();
        borderC = (borderC.isBright() ? borderC.lighten(-10) : borderC.lighten(10)).hex();
        textC = (textC.isBright() ? textC.lighten(-10) : textC.lighten(10)).hex();
        this.theme.bodyColor = bodyC;
        this.theme.borderColor = borderC;
        this.theme.textColor = textC;
        this.init();
    };
    
    ChatQuotes.prototype.parse = function parse(string){
        var parseFn = function(match, fn, value){
                var multiArg = ['link'], v = '';
                if (this.formatFn.hasOwnProperty(fn)){
                    if (multiArg.indexOf(fn) > -1){
                        var args = value.split(/\,(?:\s+|)/);
                        v = this.formatFn[fn].apply(this, args);
                    } else {
                        if (this.fPattern.test(value)) value = parse(value);
                        v = this.formatFn[fn].call(this, value);
                    }
                    return v;
                } else return match;
            }, parseTemplate = function(match, name){
                if (this.templates.hasOwnProperty(name))
                    return this.templates[name];
                return match;
            };
        while (this.fPattern.test(string)){
            string = this.parseFn(string, parseFn);
        }
 
        while (this.tPattern.test(string)){
            string = this.parseTemplate(string);
        }
 
        return string;
    };
}(jQuery, mediaWiki, mainRoom, $.extend({}, window.CQconfig)));