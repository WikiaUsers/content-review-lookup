(function($, mw, config){
    function CustomModal(){
        mw.hook('dev.colors').add($.proxy(this.process, this));
    }
    
    CustomModal.prototype.process = function(colors){
        this.colors = colors;
        this.theme = {};
        this.theme.body = this.colors.wikia.body;
        this.theme.border = this.colors.wikia.border;
        this.theme.text = this.colors.wikia.text;
        this.theme.header = this.colors.wikia.nav;
        this.theme.buttonPrimary = this.colors.wikia.menu;
        this.id = '';
        this.width = 650;
        this.height = 400;
        this.heading = '';
        this.content = '';
        this.buttons = [];
        this.callback = null;
        this.setup();
    };
    
    CustomModal.prototype.setup = function(){
        var text = this.colors.parse(this.theme.text),
            textI = text.invert(),
            toolbar = this.colors.parse(this.theme.body),
            toolbarC = toolbar.isBright() ? toolbar.lighten(-10) : toolbar.lighten(10),
            button = this.colors.parse(this.theme.buttonPrimary),
            buttonC = button.isBright() ? button.lighten(-5) : button.lighten(5),
            buttonPrimary = button.isBright() ? button : buttonC,
            buttonSecondary = button.isBright() ? buttonC : button;
        this.theme.buttonPrimary = buttonPrimary.toString();
        this.theme.buttonSecondary = buttonSecondary.toString();
        this.theme.headerText = textI.toString();
        this.theme.toolbar = toolbarC.toString();
        this.propObj = $.extend(config.props, {
            'background-color': ['body', 'header', 'toolbar', 'buttonPrimary', 'buttonSecondary'],
            'color': ['headerText', 'text'],
            'border-color': ['border'] 
        });
        this.props = this.getProps();
        this.cssObj = $.extend(config.css, {
            '.modal-window': ['body', 'border', 'text'],
            '.modal-window > .modal-header': ['header', 'headerText'],
            '.modal-window > .modal-toolbar': ['toolbar'],
            '.modal-window > .modal-toolbar .modal-button': ['buttonPrimary'],
            '.modal-window > .modal-toolbar .modal-button.secondary': ['buttonSecondary']
        });
        this.css = this.parseCSS();
        this.addCSS();
    };
    
    CustomModal.prototype.getProps = function(){
        var props = {};
        $.each(this.propObj, $.proxy(function(key, value){
            Array.prototype.forEach.call(value, $.proxy(function(name){
                props[name] = key;
            }, this));
        }, this));
        return props;
    };
    
    CustomModal.prototype.parseCSS = function(){
        var css = '';
        $.each(this.cssObj, $.proxy(function(key, value){
            var rule = '';
            Array.prototype.forEach.call(value, $.proxy(function(name){
                rule += this.props[name] + ': $' + name;
            }, this));
            if (rule) css += key + ' {' + rule + '}';
        }, this));
        return css;
    };
    
    CustomModal.prototype.addCSS = function(){
        this.colors.css(this.css, this.theme);
    };
    
    CustomModal.prototype.set = function setProps(name, value){
        var settable = ['callback', 'heading', 'content', 'id', 'width', 'height'];
        if (typeof name === 'string'){
            if (settable.indexOf(name) > -1){
                this[name] = value;
            }
        } else if (typeof name === 'object'){
            $.each(name, $.proxy(function(key, value){
                setProps(key, value);
            }, this));
        }
    };
    
    CustomModal.prototype.createData = function(config, delay){
        this.data = new CustomModalData(config, this, delay);
    };
    
    CustomModal.prototype.addButtons = function(button){
        if (typeof button === 'object' && !Array.isArray(button)){
            this.buttons[this.buttons.length] = button;
        } else if (typeof button === 'object' && Array.isArray(button)){
            button = button.filter(function(item){ 
                return typeof item === 'object';
            });
            this.buttons = this.buttons.concat(button);
        } else return;
    };
    
    CustomModal.prototype.create = function(){
        this.$blackout = $('<div />').addClass('modal-blackout modal__blackout');
        this.$blackout.attr('id', this.id);
        this.$modal = $('<section />').addClass('modal-window modal__window');
        this.$header = $('<header />').addClass('modal-header modal__header');
        this.$heading = $('<div />').addClass('modal-heading-wrapper modal__heading');
        this.$heading.html($('<h2 />').addClass('modal-heading').html(this.heading));
        this.$close = $('<div />').addClass('modal-close-button modal__close');
        this.$close.html($('<a />').text('✕').attr('href', '#').addClass('modal-close').on('click', $.proxy(this.close, this)));
        this.$content = $('<div />').addClass('modal-content modal__content');
        this.$toolbar = $('<footer />').addClass('modal-header');
        var $buttons = this.buttons.map($.proxy(function(button){
            var $button = $('<a />').attr('href', '#').addClass('modal-button');
            if (typeof button.isPrimary === 'undefined' || !button.isPrimary){
                $button.addClass('secondary');
            }
            $button.on('click', $.proxy(function(event){
                event.preventDefault();
                if (button.noClose) button.handler.apply(this, event);
                else this.close(button.handler, [event]);
            }, this));
            return $button;
        }, this));
        this.$toolbar.html($('<nav />').addClass('modal-buttons').html($buttons));
    };
    
    CustomModal.prototype.open = function(){};
    
    function CustomModalData(config, modal, delay){
        this.values = config;
        this.customValues = {};
        this.selectors = [];
        this.modal = modal;
        this.init = $.Deferred();
        this.time = delay;
    }
    
    CustomModalData.prototype.set = function(name, value, replace){
        if (typeof this.customValues[name] !== 'undefined'){
            if (typeof replace === 'boolean' && replace){
                this.customValues[name] = value;
            } else {
                this.customValues[name] = this.customValues[name] || value;
            }
        } else {
            this.customValues[name] = value;
        }
    };
    
    CustomModalData.prototype.parse = function(){
        var values = {};
        $.each(this.values, $.proxy(function(key, value){
            var $selector = $(value);
            if (typeof value !== 'string') return;
            if ($selector.is('input[type="text"], textarea')){
                values[key] = $selector.val();
            } else if ($selector.is('input[type="radio"], input[type="checkbox"]')){
                values[key] = $selector.prop('checked');
            } else if ($selector.is('select')){
                values[key] = $selector.find(':selected').text();
            } else if ($selector.hasClass('.combobox')){
                values[key] = $selector.find('input[type="text"]').val();
            } else if ($selector.hasClass('.select-dropdown')){
                values[key] = $selector.find('.option-label').text();
            } else {
                values[key] = $selector.text();
            }
        }, this));
        this.parsed = $.extend(values, this.customValues);
    };
    
    CustomModalData.prototype.send = function(callback){
        $.when(this.init).done($.proxy(callback, this.modal));
        if (typeof this.time === 'number' && !isFinite(this.time)){
            setTimeout($.proxy(function(){
                this.init.resolve(this.parsed);
            }, this), this.time);
        } else {
            this.init.resolve(this.parsed);
        }
    };
    
    $(importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Colors/code.js'
    })).on('load', function(){
        window.CustomModal = CustomModal;
        window.CustomModal.create = function(){
            return new CustomModal();
        };
    });
}(jQuery, mediaWiki, $.extend({}, window.CMconfig)));