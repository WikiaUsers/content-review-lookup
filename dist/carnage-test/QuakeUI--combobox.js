window.UI = $.extend({}, window.UI);

UI.combobox = {
    limit: Infinity,
    from: 0,
    delay: 500,
    items: [],
    grouped: false,
    active: false,
    placeholder: '',
    label: '',
    inputid: '',
    create: function(){
        // Combobox wrapper
        this.$combobox = $('<div>').addClass('QuakeCombobox combobox')
            .attr('id', this.id);
        // Combobox form
        this.$form = $('<form>').addClass('QuakeComboboxForm combobox-form');
        // Combobox input container
        this.$form_container = $('<div>').addClass('QuakeComboboxInputContainer combobox-input-container');
        // Combobox label
        this.$label = $('<label>').addClass('QuakeComboboxLabel combobox-label')
            .attr('for', this.inputid).html(this.label);
        // Combobox input
        this.$input = $('<input>').addClass('QuakeComboboxInput combobox-input')
            .attr({ 'id': this.inputid, 'type': 'text' });
        if (this.placeholder !== '')
            this.$input.attr('placeholder', this.placeholder);
        this.$toggle = $('<a>').addClass('QuakeComboboxToggle combobox-toggle')
            .attr('href', '#').on('click', $.proxy(this.toggle, this))
            .html($.proxy(this.getChevron, this));
        this.$form_container.html([this.$input, this.$toggle]);
        this.$form.html([this.$label, this.$form_container]);
        // Combobox list container
        this.$container = $('<nav>').addClass('QuakeComboboxListContainer combobox-list-container');
        if (Array.isArray(this.items)){
            this.length = this.items.length;
            this.$list = $('<ul>').addClass('QuakeComboboxList combobox-list');
            this.$items = this.items.map($.proxy(this.getItem, this));
            if (isFinite(this.limit) && this.limit < this.length){
                this.$items = this.$items.slice(this.from, this.limit);
            } else if (isFinite(this.from) && this.from > 0){
                this.$items = this.$items.slice(this.from);
            }
            this.$list.html(this.$items);
        } else if (typeof this.items === 'object'){
            this.grouped = true;
            this.groups = $.extend({}, this.items);
            this.$items = Object.keys(this.groups).map($.proxy(this.getItem, this));
            this.$list = this.$items;
        }
        this.$container.html(this.$list);
        this.$combobox.html([this.$form, this.$container]);
    },
    getItem: function(item){
        var $item;
        if (this.grouped){
            var $group = $('<section>').addClass('QuakeComboboxGroup combobox-group'),
                $heading = $('<h2>').addClass('QuakeComboboxGroupHeading combobox-heading').on('click', $.proxy(this.toggleGroup, this)),
                $list = $('<ul>').addClass('QuakeComboboxGroupList combobox-group-list'),
                items = this.groups[item],
                $items = items.map($.proxy(this.getListItem, this));
            $list.html($items);
            $group.html([$heading, $list]);
            $item = $group;
        } else {
            $item = this.getListItem.call(this, item);
        }
        return $item;
    },
    getListItem: function(item){
        var $item = $('<li>'), $link = $('<a>');
        if (this.grouped){
            $item.addClass('QuakeComboboxGroupItem combobox-group-item');
            $link.addClass('QuakeComboboxGroupLink combobox-group-link')
                .attr('href', '#').on('click', $.proxy(this.select, this))
                .text(item);
        } else {
            $item.addClass('QuakeComboboxItem combobox-item');
            $link.addClass('QuakeComboboxLink combobox-link')
                .attr('href', '#').on('click', $.proxy(this.select, this))
                .text(item);
        }
        $item.html($link);
        return $item;
    },
    toggle: function(event){
        event.preventDefault();
        if (this.active){
            this.$combobox.removeClass('active');
            this.$container.slideUp(this.delay);
            this.active = false;
        } else {
            this.$combobox.addClass('active');
            this.$container.slideDown(this.delay);
            this.active = true;
        }
    },
    toggleGroup: function(event){
        var $heading = $(event.target),
            $list = $heading.next();
        if ($list.is(':hidden')){
            $list.slideDown(this.delay);
        } else {
            $list.slideUp(this.delay);
        }
    },
    select: function(event){
        event.preventDefault();
        var value = $(event.target).text();
        this.selectedValue = value;
        this.$input.val(this.selectedValue);
        this.setData('value', value);
        this.close();
    },
    close: function(){
        this.$container.slideUp(this.delay);
        this.active = false;
    },
    addItem: function(item, obj){
        if (Array.isArray(this.items)){
            var len = this.items.length;
            if (this.items.indexOf(item) > -1) return;
            this.items[len] = item;
        } else if (typeof this.items === 'object'){
            var items = obj[item];
            if (this.items.hasOwnProperty(item)) return;
            this.items[item] = item;
        }
    },
    addItems: function(item){
        if (Array.isArray(item)){
            item.forEach($.proxy(this.addItem, this));
        } else if (typeof item === 'object'){
            Object.keys(item).forEach($.proxy(function(key){
                this.addItem.call(this, key, item);
            }, this));
        }
    },
    build: function(){
        var args = [].slice.call(arguments), callback, a;
        if (typeof args[0] === 'function'){
            callback = args[0];
            a = [this.$combobox].concat(args.slice(1));
            callback.apply(this, a);
        }
        return this.$combobox;
    }
};