/**
 * @title           ChatQuote
 * @description     This script allows users to insert quotes
 *                  in the chat.
 * @author          Ultimate Dark Carnage <https://dev.wikia.com/wiki/User:Ultimate_Dark_Carnage>
 * @version         v1.1
 **/

(function($, mw, mainRoom, config){
    function ChatQuote(){
        mw.hook('dev.colors').add($.proxy(this.setup, this));
    }
 
    ChatQuote.prototype.setup = function(colors){
        this.colors = colors;
        this.theme = {};
        this.theme.bodyColor = this.colors.wikia.body;
        this.theme.borderColor = this.colors.wikia.link;
        this.theme.textColor = this.colors.wikia.text;
        /* Regular expression patterns */
        this.fPattern = /(?:([a-z0-9][a-z0-9\_]*)\((.*)\))/g;
        this.tPattern = /(?:\$([a-z][\w\-]*))/g;
        // Tag support (alpha)
        this.wTagPattern = "(a(?:bbr|side|)|b(?:d(?:i|o)|r|)|c(?:aption|ite|ode|ol(?:group|))|d(?:d|el|etails|fn|iv|l|t)|em|f(?:ig(?:caption|ure)|ooter)|h(?:[1-6]|eader|r)|i(?:mg|ns|)|kbd|li|mark|nav|ol|p(?:re|)|q|r(?:b|p|t(?:c|)|uby)|s(?:amp|ection|pan|trong|ub|ummary|up|)|t(?:able|body|d|foot|h(?:ead|)|ime|r)|u(?:l|)|var|wbr)";
        this.wAttrPattern = "(class|id|dir|lang|type|src|alt|title|style|data-(?:[a-z][a-z\\-]+)|)";
        this.wExtPattern = "(png|jpg|gif|tiff|jpeg|svg|bat|bmp)";
        // End tag support
        this.process();
    };
 
    ChatQuote.prototype.quotes = {
        'quote': function(string, name){
            var $quote = $('<blockquote>').addClass('cq-wrapper quote'),
                $quote_body = $('<section>').addClass('cq-content cq-body quote-content'),
                $quote_html = [];
            if (typeof name === 'string'){
                var $quote_head = $('<h4>').addClass('cq-head quote-head');
                $quote_head.html(name + ' wrote:');
                $quote_html[$quote_html.length] = $quote_head;
            }
            $quote_body.html(this.parse(string));
            $quote_html[$quote_html.length] = $quote_body;
            $quote.html($quote_html);
            return $quote;
        }
    };
    
    ChatQuote.prototype.templates = ChatQuote.prototype.variables = $.extend(config.templates, {
        self: mw.config.get('wgUserName'),
        groups: mw.config.get('wgUserGroups').filter(function(group){
            return ['autoconfirmed', '*'].indexOf(group) === -1;
        }).join(', '),
        wikiname: mw.config.get('wgSiteName')
    });
 
    ChatQuote.prototype.formatFn = ChatQuote.prototype.fn = $.extend(config.fns, {
        'b': function(string){
            return '<span class="bold">' + string + '</span>';
        },
        'code': function(string){
            return '<code>' + string + '</code>';
        },
        'i': function(string){
            return '<span class="italic">' + string + '</span>';
        },
        'img': function(string){
            var regex = new RegExp(this.wExtPattern, g),
                index = string.lastIndexOf('.'),
                ext = string.slice(index + 1);
            if (regex.test(ext)){
                return '<img class="cq-image" src="' + string + '" />';
            } else return '';
        },
        'link': function(string, link){
            return '<a href="' + 
                (typeof link === 'string' ? link : '#') + '">' +
                (string !== '' ? string : (typeof link === 'string' ? link : 'Unknown')) +
            '</a>';
        },
        's': function(string){
            return '<span class="strikethrough">' + string + '</span>';
        },
        'u': function(string){
            return '<span class="underline">' + string + '</span>';
        }
    });
 
    ChatQuote.prototype.process = function(){
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
 
    ChatQuote.prototype.parse = function parse(string){
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
                if (this.templates.hasOwnProperty(name)) return this.templates[name];
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
 
    ChatQuote.prototype.createQuote = function(string){
        string = this.parseFn(string, function(match, fn, value){
            if (this.quotes.hasOwnProperty(fn)){
                var quote = null;
                if (value.indexOf('|') > -1){
                    var args = value.split('|');
                    quote = this.quotes[fn].apply(this, args);
                } else quote = this.quotes[fn].call(this, value);
                return quote.prop('outerHTML');
            } else return match;
        });
        return string;
    };
 
    ChatQuote.prototype.afterSend = function(callback){
        mainRoom.model.chats.bind('afteradd', $.proxy(function(c){
            if (typeof mainRoom.roomId === 'undefined' && c.attributes.isInlineAlert) return;
            callback.call(this, c);
        }, this));
        mainRoom.model.privateUsers.bind('add', $.proxy(function(u){
            var roomId = u.attributes.roomId,
                room = mainRoom.chats.privates[roomId];
            room.model.chats.bind('afteradd', $.proxy(function(c){
                if (c.attributes.isInlineAlert) return;
                callback.call(this, c);
            }, this));
        }, this));
    };
 
    ChatQuote.prototype.insertCSS = function(){
        this.colors.css('.cq-wrapper {' +
            'background-color: $bodyColor;' +
            'border-left: 3px solid $borderColor;' +
            'color: $textColor;' +
        '}', this.theme);
    };
 
    ChatQuote.prototype.init = function(){
        this.insertCSS();
        this.afterSend(function(child){
            var string = $('#entry-' + child.cid).html();
            if (!string) return;
            string = this.createQuote(string);
            $('#entry-' + child.cid).html(string);
        });
    };
 
    $(importArticles({
        type: 'script',
        articles: ['u:dev:MediaWiki:Colors/code.js']
    }, {
        type: 'style',
        articles: ['u:dev:MediaWiki:ChatQuotes.css']
    })).load(function(){
        var chatQuote = new ChatQuote();
        window.ChatQuote = chatQuote;
    });
}(jQuery, mediaWiki, mainRoom, $.extend({}, window.CQ_config)));