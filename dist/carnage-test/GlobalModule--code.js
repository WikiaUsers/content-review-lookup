(function($, window){
    function GlobalModule(data){
        this.id = data.id; // Required
        this.title = data.title; // Required
        this.content = data.content; // Required
        this.buttons = data.buttons || [];
        this.data = {};
        this.target = data.target;
        this.locations = data.locations || {};
        this.open = false;
        this.create();
    }
    
    GlobalModule.prototype.create = function(){
        this.$element = $('<nav />');
        this.$element.addClass('GlobalModule global-module');
        this.$element.attr({'id': this.id, 'data-name': this.title});
        this.insertHTML();
    };
    
    GlobalModule.prototype.insertHTML = function(){
        // Global module link
        this.$link = $('<a />');
        this.$link.addClass('GlobalModuleLink global-module-link');
        this.$link.attr('href', '#'.concat(this.id));
        this.$link.text(this.title);
        // Global module wrapper
        this.$wrapper = $('<section />');
        this.$wrapper.addClass('GlobalModuleWrapper global-module-wrapper');
        // Global module content
        this.$content = $('<div />');
        this.$content.addClass('GlobalModuleContent global-module-content');
        this.$content.html(this.content);
        // Global module footer
        this.$footer = $('<footer />');
        this.$footer.addClass('GlobalModuleFooter global-module-footer');
        this.$footer.html($.proxy(this.createButtons, this));
        // Inserting HTML to the wrapper and the element
        this.$wrapper.html([this.$content, this.$footer]);
        this.$element.html([this.$link, this.$wrapper]);
    };
    
    GlobalModule.prototype.append = function(){
        this.targetObj = null;
        this.locations = $.extend({
            'header': {
                mode: 'after',
                selector: '#ChatHeader .public'
            },
            'rail': {
                mode: 'prepend',
                selector: '#Rail'
            }
        }, this.locations);
        if (typeof this.target === 'undefined'){
            this.target = 'header';
        }
        this.targetObj = this.locations[this.target];
        this.$targetSelector = $(this.targetObj.selector);
        this.$targetSelector[this.targetObj.mode](this.$element);
    };
    
    GlobalModule.prototype.createButtons = function(){};
    
    GlobalModule.prototype.open = function(event){};
    
    GlobalModule.prototype.close = function(event){};
    
    GlobalModule.prototype.submit = function(event){};
    
    GlobalModule.prototype.init = function(){};
    
    GlobalModule.create = function(data){
        return new GlobalModule(data);
    };
    
    window.GlobalModule = GlobalModule;
}(jQuery, window));