window.UI = $.extend({}, window.UI);
 
UI.modal = {
    width: 650,
    height: 450,
    n: 0,
    opened: false,
    create: function(){
        // Modal blackout
        this.$blackout = $('<div>').addClass('QuakeModalBlackout modal-blackout')
            .on('click', $.proxy(this.initClose, this));
        // Modal wrapper
        this.$modal = $('<section>').addClass('QuakeModal modal-wrapper')
            .attr('id', this.id);
        // Modal header
        this.$header = $('<header>').addClass('QuakeModalHeader modal-header');
        this.$heading = $('<h2>').addClass('QuakeModalHeading modal-heading')
            .text(this.title);
        this.$close = $('<a>').addClass('QuakeModalClose modal-close')
            .attr('href', '#').on('click', $.proxy(this.close, this))
            .html('&times;');
        this.$header.html([this.$heading, this.$close]);
        // Modal content
        this.$content = $('<article>').addClass('QuakeModalContent modal-content');
        if (typeof this.content === 'object'){
            this.$subtitle = $('<h2>').addClass('QuakeModalSubtitle modal-subtitle')
                .html(this.content.subtitle);
            this.$content_wrapper = $('<div>').addClass('QuakeModalContentWrapper modal-content-wrapper')
                .html(this.content.html);
            this.$content.html([this.$subtitle, this.$content_wrapper]);
        } else this.$content.html(this.content);
        // Modal toolbar
        this.$toolbar = $('<footer>').addClass('QuakeModalToolbar modal-toolbar');
        this.$button_container = $('<nav>').addClass('QuakeModalButtons modal-buttons');
        this.$buttons = this.buttons.map($.proxy(this.createButton, this));
        this.$button_container.html(this.$buttons);
        this.$toolbar.html(this.$button_container);
        // Inserting modal html
        this.$modal.html([this.$header, this.$content, this.$toolbar]);
        this.$blackout.html(this.$modal);
    },
    createButton: function(button){
        var $button = $('<a>').addClass('QuakeModalButtom modal-button');
        // Primary button
        if (typeof button.primary === 'boolean' && button.primary)
            $button.addClass('primary');
        // Button handler
        if (typeof button.handler === 'string')
            $button.attr('href', button.handler);
        else if (typeof button.handler === 'function')
            $button.attr('href', '#').on('click', $.proxy(function(e){
                e.preventDefault();
                this.close.apply(this, [button.handler, e]);
            }, this));
        // Button text
        if (typeof button.html !== 'undefined')
            $button.html(button.html);
        else if (typeof button.text !== 'undefined')
            $button.text(button.text);
        // Button ID
        $button.attr('id', button.id);
        return $button;
    },
    initClose: function(event){
        var $target = $(event.target);
        if (!$target.is('.modal-blackout, .modal-blackout > *'))
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
        this.$blackout.remove();
    },
    open: function(){
        var len = $('.QuakeModal').length, args = [].slice.call(arguments);
        if (len === 0) this.n = 1;
        else this.n = len;
        this.$modal.attr('data-modal', String(this.n));
        if (!this.opened){
            this.callback.apply(args);
            $(document.body).append(this.$blackout);
        }
    },
    build: function(){
        var args = [].slice.call(arguments), callback, a;
        if (typeof args[0] === 'function'){
            callback = args[0];
            a = [this.$blackout].concat(args.slice(1));
            callback.apply(this, a);
        }
        return this.$blackout;
    }
};