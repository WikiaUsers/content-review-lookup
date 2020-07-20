window.UI = $.extend({}, window.UI);

UI.button = {
    text: '',
    handler: null,
    primary: false,
    classNames: [],
    html: '',
    create: function(){
        this.$button = $('<a>').addClass('QuakeButton ui-button')
            .attr('href', '#');
        if (typeof this.handler === 'function'){
            this.$button.on('click', $.proxy(this.click, this));
        } else if (typeof this.handler === 'string'){
            this.$button.attr('href', this.handler);
        }
        
        if (typeof this.text === 'string'){
            this.$button.text(this.text);
        } else if (typeof this.html !== 'undefined'){
            this.$button.html(this.html);
        }
        
        if (this.primary){
            this.$button.addClass('primary');
        }
        this.$button.attr('id', this.id);
    },
    click: function(event){
        event.preventDefault();
        this.handler.call(this, event);
    },
    build: function(){
        var args = [].slice.call(arguments), callback, a;
        if (typeof args[0] === 'function'){
            callback = args[0];
            a = [this.$blackout].concat(args.slice(1));
            callback.apply(this, a);
        }
        return this.$button;
    }
};