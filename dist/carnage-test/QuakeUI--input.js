window.UI = $.extend({}, window.UI);

UI.input = {
    placeholder: '',
    value: '',
    min: 0,
    max: Infinity,
    label: '',
    name: '',
    required: false,
    readonly: false,
    disabled: false,
    size: Infinity,
    create: function(){
        // Input container
        this.$container = $('<div>').addClass('QuakeInputContainer input-container');
        // Input label
        if (this.label !== '')
            this.$label = $('<label>').addClass('QuakeInputLabel input-label')
                .attr('for', this.id).text(this.label);
        // Input wrapper
        this.$iwrapper = $('<section>').addClass('QuakeInputWrapper input-wrapper');
        // Input box
        this.$input = $('<input>').addClass('QuakeInput input')
            .attr('id', this.id);
        if (isFinite(this.min) && this.min > 0 && this.min < this.max)
            this.$input.attr('minlength', this.min);
        if (isFinite(this.max) && this.max > 1 && this.max > this.min)
            this.$input.attr('maxlength', this.max);
        if (this.readonly)
            this.$input.prop('readonly', true);
        if (this.required)
            this.$input.prop('required', true);
        if (this.placeholder !== '')
            this.$input.attr('placeholder', this.placeholder);
        if (this.disabled)
            this.$input.prop('disabled', true);
        if (isFinite(this.size) && this.size > 0)
            this.$input.attr('size', this.size);
        this.$input.on('input', $.proxy(this.change, this));
        this.$iwrapper.html(this.$input);
        this.$container.html([this.$label, this.$iwrapper]);
    },
    change: function(event){
        var value = $(event.target).val();
        this.value = value;
        this.setData('value', this.value);
        if (typeof this.callback === 'function')
            this.callback.call(this, event);
    },
    build: function(){
        var args = [].slice.call(arguments), callback, a;
        if (typeof args[0] === 'function'){
            callback = args[0];
            a = [this.$container].concat(args.slice(1));
            callback.apply(this, a);
        }
        return this.$container;
    }
};