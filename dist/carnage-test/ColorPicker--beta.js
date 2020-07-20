(function($, mw){
    function ColorPicker($element){
        if (typeof $element !== 'undefined') this.$wrapper = $element;
        else this.$wrapper = $('#ColorPicker');
        mw.hook('dev.colors').add($.proxy(this.process, this));
    }
    
    ColorPicker.prototype = {
        box: {},
        strip: {},
        rgbaColor: 'rgba(255, 0, 0, 1)',
        hue: '',
        textColor: 'rgba(255, 255, 255, 1)',
        vertical: false,
        minsize: 250,
        process: function(colors){
            this.colors = colors;
            this.id = this.$wrapper.data('id');
            this.selector = '#'.concat(this.id);
            // Color picker elements
            this.box.$wrapper = $('<div>').addClass('cp-box__wrapper');
            this.box.$canvas = $('<canvas>').addClass('cp-box__canvas');
            this.box.$thumb = $('<span>').addClass('cp-box__thumb');
            // Color strip elements
            this.strip.$wrapper = $('<div>').addClass('cp-strip__wrapper');
            this.strip.$canvas = $('<canvas>').addClass('cp-strip__canvas');
            this.strip.$thumb = $('<span>').addClass('cp-strip__thumb');
        },
        create: function(){
            this.$wrapper.empty();
            ['box', 'strip'].forEach($.proxy(function(name){
                var obj = this[name];
                this['$' + name] = obj.$wrapper.html([
                    obj.$canvas.attr('id', this.id + '-' + name),
                    obj.$thumb.attr('id', this.id + '-' + name + '__thumb')
                ]);
                this.$wrapper.append(this['$' + name]);
                this[name].$elem = $('#' + this.id + '-' + name);
                this[name].elem = this[name].$elem.get(0);
                this[name].$thumb = $('#' + this.id + '-' + name + '__thumb');
            }, this));
            this.context();
        },
        context: function(){
            // Configurations for the color box
            this.box.context = this.box.elem.getContext('2d');
            this.box.height = Math.max(this.box.elem.height || 0, this.minsize);
            this.box.width = Math.max(this.box.elem.width || 0, this.minsize);
            this.box.x = this.box.y = 0;
            this.box.drag = false;
            // Configurations for the color strip
            this.strip.context = this.strip.elem.getContext('2d');
            if (this.vertical){
                this.strip.height = Math.max(this.strip.elem.height || 0, this.minsize);
                this.strip.width = Math.max(this.strip.elem.width || 0, 10);
            } else {
                this.strip.height = Math.max(this.strip.elem.height || 0, 10);
                this.strip.width = Math.max(this.strip.elem.width || 0, this.minsize);
            }
            this.strip.x = this.strip.y = 0;
            this.strip.drag = false;
            this.gradient();
        },
        gradient: function(){
            var cbheight = this.box.height, cbwidth = this.box.width,
                csheight = this.strip.height, cswidth = this.strip.width;
            this.box.context.rect(0, 0, cbwidth, cbheight);
            this.strip.context.rect(0, 0, cswidth, csheight);
            this.fill();
        },
        fill: function(){}
    };
}(jQuery, mediaWiki));