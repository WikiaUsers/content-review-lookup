window.UI = $.extend({}, window.UI);

UI.toggle = {
    defaultIndex: 0,
    options: [],
    selectedValue: '',
    name: '',
    create: function(){
        this.$wrapper = $('<nav>').addClass('QuakeToggle toggle')
            .attr('id', this.id);
        this.$title = $('<span>').addClass('QuakeToggleLabel toggle-label');
        this.$list = $('<ul>').addClass('QuakeToggleOptions toggle-options');
        this.$options = this.options.map($.proxy(this.generate, this));
        this.$list.html(this.$options);
        this.$html = [];
        if (typeof this.title !== 'undefined'){
            this.$title.html(this.title);
            this.$html[this.$html.length] = this.$title;
        }
        this.$html[this.$html.length] = this.$list;
        this.$wrapper.html(this.$html);
        return this;
    },
    generate: function(option, index){
        var id = option.id || this.name + '-' + String(index),
            $option = $('<li>').addClass('QuakeToggleOption toggle-option'),
            $label = $('<label>').addClass('QuakeToggleOptionWrapper toggle-option-wrapper')
                .attr({
                    'for': id
                }).html(option.name),
            $item = $('<input>').addClass('QuakeToggleOptionControl toggle-option-control')
                .attr({
                    'type': 'radio',
                    'name': this.name,
                    'id': id,
                    'value': option.name
                }).on('change', $.proxy(this.change, this));
        if (index === this.defaultIndex){
            $item.prop('checked', true);
            this.selectedValue = $item.val();
        }
    },
    change: function(event){
        var value = $(event.target).val(),
            checked = $(event.target).prop('checked');
        if (checked){
            this.setData('value', value);
            this.selectedValue = value;
        }
    },
    build: function(){
        var args = [].slice.call(arguments), callback, a;
        if (typeof args[0] === 'function'){
            callback = args[0];
            a = [this.$wrapper].concat(args.slice(1));
            callback.apply(this, a);
        }
        return this.$wrapper;
    }
};