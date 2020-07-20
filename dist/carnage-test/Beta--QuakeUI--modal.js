(function(window, $, mw){
    var UI = $.extend({}, window.UI);
    
    UI.modal = {
        width: 650,
        height: 450,
        n: 0,
        autoHide: false,
        delay: 0,
        opened: false,
        title: '',
        content: '',
        buttons: [],
        deferred: $.Deferred(),
        create: function(){
            // Modal blackout
            this.$blackout = $('<div>').addClass('quake-modal__blackout')
                .on('click', $.proxy(this.initClose, this));
            if (this.autoHide){
                this.$blackout.fadeOut(this.delay);
            }
            // Modal wrapper
            this.$modal = $('<section>').addClass('quake-modal quake-modal__wrapper')
                .attr('id', this.id)
                .css({ 'width': this.width, height: this.height });
            if (this.themes.length)
                this.$modal.addClass(this.themes.join(' '));
            // Modal header
            this.$header = $('<header>').addClass('quake-modal__header');
            // Modal heading
            this.$heading = $('<div>').addClass('quake-modal__heading');
            // Modal heading HTML
            this.$headingHTML = [];
            // Modal title
            this.$title = $('<h2>').addClass('quake-modal__title')
                .text(this.title);
            this.$headingHTML.push(this.$title);
            // Modal subtitle
            if (this.subtitle){
                this.$subtitle = $('<h3>').addClass('quake-modal__subtitle')
                    .text(this.subtitle);
                this.$heading.addClass('with-subtitle');
                this.$headingHTML.push(this.$subtitle);
            }
            this.$heading.html(this.$headingHTML);
            // Modal close button
            this.$close = $('<a>').addClass('quake-modal__close')
                .attr('href', '#').on('click', $.proxy(this.close, this))
                .html('&times;');
            this.$header.html([this.$heading, this.$close]);
            // Modal content
            this.$content = $('<article>').addClass('quake-modal__content');
            if (this.content instanceof Object){
                this.$contentHTML = [];
                if (this.content.description){
                    this.$description = $('<p>').addClass('quake-modal__description')
                        .html(this.content.description);
                    this.$contentHTML.push(this.$description);
                }
                
                if (this.content.html){
                    this.$contentWrapper = $('<div>').addClass('quake-modal__content-wrapper')
                        .html(this.content.html);
                    this.$contentHTML.push(this.$contentWrapper);
                }
                
                this.$content.html(this.$contentHTML);
            } else this.$content.html(this.content);
            // Modal toolbar
            this.$toolbar = $('<footer>').addClass('quake-modal__toolbar');
            this.$buttons = $('<nav>').addClass('quake-modal__buttons');
            this.$buttonsHTML = this.buttons.map(this.createButton, this);
            this.$buttons.html(this.$buttonsHTML);
            this.$toolbar.html(this.$buttons);
            // Inserting modal HTML
            this.$modal.html([this.$header, this.$content, this.$toolbar]);
            this.$blackout.html(this.$modal);
        },
        createButton: function(button){
            var $button = $('<a>').addClass('quake-modal__button');
            // Primary button
            if (button.primary) $button.addClass('primary');
            // Button handler
            if (typeof button.handler === 'string') 
                $button.attr('href', button.handler);
            else if (typeof button.handler === 'function')
                $button.attr('href', '#').on('click', $.proxy(function(event){
                    event.preventDefault();
                    this.close.apply(this, [button.handler, event]);
                }, this));
            // Button text
            if (button.html) $button.html(button.html);
            else if (button.text) $button.text(button.text);
            // Button ID
            $button.attr('id', button.id);
            return $button;
        },
        initClose: function(event){
            if (!$(event.target).is('.quake-modal, .quake-modal *'))
                this.close();
        },
        close: function(){
            var args = [].slice.call(arguments);
            if (args.length){
                var callback, a;
                if (typeof args[0] === 'function'){
                    callback = args[0];
                    a = args.slice(1) || [];
                    callback.apply(this, a);
                } else if (args[0] instanceof $.Event){
                    args[0].preventDefault();
                }
            }
            this.$blackout.hide();
            this.opened = false;
        },
        exists: function(){
            return $('#' + this.id).length > 0;
        },
        open: function(){
            var len = $('.quake-modal').length, args = [].slice.call(arguments);
            if (len === 0) this.n = 1;
            else this.n = len;
            this.$modal.attr('data-modal', String(this.n));
            if (!this.opened){
                this.callback.apply(this, args);
                if (!this.exists()) $(document.body).append(this.$blackout);
                else this.$blackout.show();
                this.opened = true;
            }
        },
        build: function(){
            if (this.callback instanceof Function){
                $.when(this.deferred).done($.proxy(this.callback, this));
                this.deferred.resolve(this.$blackout);
            }
            return this.$blackout;
        }
    };
    
    $(document).ready(function(){
        importArticle({ 
            type: 'style', 
            article: 'MediaWiki:QuakeUI/modal.css' 
        });
    });
    
    return (window.UI = UI);
}(this, jQuery, mediaWiki));