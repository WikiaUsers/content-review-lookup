(function($, mw, mainRoom){
    if (
        typeof window.ChatUI.Button == 'function' &&
        typeof window.ChatUI.ButtonGroup == 'function'
    ) return;
    var ChatUI = $.extend({}, window.ChatUI);
    ChatUI.Button = ChatUI.Button || function(){
        var args = [].slice.call(arguments),
            config = $.extend(
                {},
                typeof args[0] === 'object' ? args[0] : {},
                typeof args[1] === 'object' ? args[1] : {}
            ),
            title = typeof args[0] === 'string' ? args[0] : args[0].title;
        this.primaryButton = ChatUI._def(config.primaryButton, false);
        this.text = ChatUI._def(config.text, config.message, '');
        this.id = ChatUI._def(config.id, '');
        this.handler = ChatUI._def(config.handler, $.noop);
    };
    
    ChatUI.Button.prototype.create = function(){
        this.$element = $('<a />', {
            'class': 'chat-button c-button',
            'id': this.id,
            html: this.text
        });
        if (typeof this.handler === 'string'){
            var url = this.sanitize(this.handler);
            this.$element.attr('href', url);
        } else if (typeof this.handler === 'function'){
            var trigger = this.trigger();
            this.$element.on('click', trigger);
        }
        
        if (this.primaryButton){
            this.$element.addClass('c-button__primary');
        }
    };
    
    ChatUI.Button.prototype.trigger = function(){
        return $.proxy(function(event){
            event.preventDefault();
            this.handler.apply(this, [event]);
        }, this);
    };
    
    ChatUI.Button.prototype.sanitize = function(string){
        var protocol = string.split(':')[0];
        if (['javascript', 'mailto', 'data'].indexof(protocol) > -1){
            return '#';
        } else {
            return string;
        }
    };
    
    ChatUI.Button.prototype.toHTML = function(){
        return this.$element.prop('outerHTML');
    };
    
    
    $.each(['toJQuery', 'getElement'], function(index, key){
        ChatUI.Button.prototype[key] = function(){
            return this.$element;
        };
    });
    
    ChatUI.Button.prototype.addTo = function(target, type){
        var $target, mode = ChatUI._def(type, 'append'),
            modes = ['append', 'prepend', 'before', 'after'];
        if (modes.indexOf(mode) > -1){
            $target = target;
            $target[mode](this.$element);
        }
    };
    
    ChatUI.ButtonGroup = function(){
        var args = [].slice.call(arguments),
            config = $.extend(
                {},
                typeof args[0] === 'object' ? args[0] : {},
                typeof args[1] === 'object' ? args[1] : {}
            );
        this.id = config.id || '';
        this.buttons = config.buttons || [];
    };
    
    ChatUI.ButtonGroup.prototype.create = function(){
        this.$element = $('<div />', {
            'class': 'chat-button-group c-button-group',
            'id': this.id,
            html: this.createButtons()
        });
    };
    
    $.each(['createButtons', 'addButtons'], function(index, key){
        ChatUI.ButtonGroup.prototype[key] = function(){
            return this.buttons.map(function(data){
                return (new ChatUI.Button(data)).toJQuery();
            });
        };
    });
    
    $(importArticle({
        type: 'style',
        article: 'MediaWiki:ChatButton.css'
    })).on('load', function(){
        window.ChatUI = ChatUI;
    });
}(jQuery, mediaWiki, mainRoom));