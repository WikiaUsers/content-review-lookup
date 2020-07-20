(function($, mw){
    var version = 'v1.0.1',
        lang = mw.config.get('wgUserLanguage'),
        $window = $(window), $body = $(document.body),
        $modals = $('.QuakeModal');
    function QuakeModal(id){
        if (this === QuakeModal){
            throw new ReferenceError('QuakeModal should be called as a constructor');
        }
        var $close = this.closeIcon();
        this.i18nId = id;
        this.$container = $('<div>').addClass('QuakeModal quake-modal');
        this.$wrapper = $('<section>').addClass('QuakeModalWrapper quake-modal-wrapper');
        this.$header = $('<header>').addClass('QuakeModalHeader quake-modal-header');
        this.$heading = $('<h2>').addClass('QuakeModalHeading quake-modal-heading');
        this.$content = $('<article>').addClass('QuakeModalContent quake-modal-content');
        this.$footer = $('<footer>').addClass('QuakeModalFooter quake-modal-footer');
        this.$toolbar = $('<nav>').addClass('QuakeModalToolbar quake-modal-toolbar');
        this.$container.html(
            this.$wrapper.html([
                this.$header.html([this.$heading, $close]),
                this.$content, this.$footer.html(this.$toolbar)
            ])
        );
        this.isopen = false;
        this.data = null;
        if (typeof id === 'string'){
            this.$wrapper.attr('id', id);
        }
        $close.on('click', $.proxy(this.close, this));
        this.$container.on('click', $.proxy(function(event){
            if (event.target === event.delegateTarget)
                this.close.call(this);
        }, this));
        $window.on('keydown', $.proxy(function(event){
            if (this.isopen && event.which === 27)
                this.close.call(this);
        }, this));
        mw.hook('dev.i18n').add($.proxy(this.setup, this));
    }
    
    QuakeModal.prototype.setup = function(i18n){
        this.i18no = i18n;
        this.getI18n();
    };
    
    QuakeModal.prototype.getI18n = function(){
        this.i18no.loadMessages(this.i18nId)
            .done($.proxy(function(i18n){
                this.i18n = i18n;
            }, this));
    };
    
    QuakeModal.prototype.closeIcon = function(){
        return $('<svg>')
            .addClass('quake-modal-close-icon')
            .attr({
                'xmlns': 'http://www.w3.org/2000/svg',
                'viewbox': '0 0 16 16'
            })
            .html([
                $('<title>').text(this.i18n.msg('close-text').escape()),
                $('<path>').attr({
                    'stroke': 'currentColor',
                    'd': 'M 3,3 13,13 M 13,3 3,13'
                })
            ]);
    };
    QuakeModal.prototype.close = function(){
        var destroy = typeof arguments[0] === 'undefined' ? false : arguments[0];
        if (this.data && typeof this.data.events.hide === 'function')
            this.data.events.hide(this);
        this.isopen = false;
        this.data = null;
        if (this.destroy || destroy)
            this.$container.remove();
        else
            this.$container.detach();
        if (!$modals.length && this.noscroll)
            $body.removeClass('modal-no-scroll');
    };
    
    QuakeModal.prototype.set = function(key, value){
        if (typeof value !== 'undefined')
            this.data[key] = value;
    };
    
    QuakeModal.prototype.get = function(key){
        if (this.data.hasOwnProperty(key)){
            return this.data[key];
        } else return null;
    };
    
    QuakeModal.prototype.open = function(data){
        if (typeof data === 'undefined' || !data) return;
        
        if (this.data === null) this.data = data;
        else this.data = $.extend({}, this.data, data);
        this.$content.toggleClass('mw-ajax-loader', Boolean(data.loading));
        if (data.heading || data.title){
            this.$heading.text(data.heading || data.title);
        }
        this.$content.html(data.content || '');
        this.$footer.empty();
        if (Array.isArray(data.buttons))
            data.buttons.forEach($.proxy(this.createButton, this));
        if (data.hook)
            mw.hook(data.hook).fire(this);
        if (!this.isopen){
            $body.addClass('modal-no-scroll')
                 .append(this.$container);
            this.isopen = true;
        }
        if (typeof this.data.events.show === 'function')
            this.data.events.show(this);
    };
    
    QuakeModal.prototype.createButton = function(button){
        var $button = $('<a>');
        if (button.href){
            $button.attr({
                href: button.href,
                target: '_blank'
            });
        } else if (typeof button.handler === 'function'){
            $button.on('click', $.proxy(button.handler, this));
        }
        
        if (button.attr)
            $button.attr(button.attr);
        $button.addClass('quake-modal-button').text(button.text || button.message);
        if (button.main){}
        else 
            $button.addClass('quake-modal-secondary-button');
        this.$toolbar.append($button);
    };
    
    QuakeModal.prototype.version = version;
    QuakeModal.create = function(id){
        return new QuakeModal(id);
    };
    mw.hook('quake.modal').fire(QuakeModal);
    window.QuakeModal = QuakeModal;
}(jQuery, mediaWiki));