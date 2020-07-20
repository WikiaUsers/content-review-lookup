(function(window, $, mw){
    var UI = $.extend({}, window.UI), aliases = ['select', 'selectbox'];
    
    UI.dropdown = {
        limit: Infinity,
        from: 0,
        delay: 500,
        items: [],
        grouped: false,
        active: false,
        value: '',
        deferred: $.Deferred(),
        create: function(){
            // Dropdown wrapper
            this.$dropdown = $('<div>').addClass('quake-dropdown');
            if (this.themes.length)
                this.$dropdown.addClass(this.themes.join(' '));
            // Dropdown container
            this.$dropdownLabel = $('<section>').addClass('quake-dropdown__label-container');
            this.$dropdownLabelHTML = [];
            // Dropdown label
            this.$label = $('<span>').addClass('quake-dropdown__label');
            if (
                this.value !== '' 
                && this.hasValue(this.value)
            ) this.$label.text(this.value);
            this.$dropdownLabelHTML.push(this.$label);
            // Dropdown toggle
            this.$toggle = $('<a>').addCkass('quake-dropdown__toggle')
                .attr('href', '#').on('click', $.proxy(this.toggle, this))
                .html($.proxy(this.getChevron, this));
            this.$dropdownLabelHTML.push(this.$toggle);
            this.$dropdownLabel.html(this.$dropdownLabelHTML);
            // Dropdown list container
            this.$container = $('<nav>').addClass('quake-dropdown__container');
            if (this.items instanceof Array){
                this.length = this.items.length;
                this.$list = $('<ul>').addClass('quake-dropdown__list');
                this.$items = this.items.map(this.getItem, this);
                if (isFinite(this.limit) && this.limit < this.length)
                    this.$items = this.$items.slice(this.from, this.limit);
                else if (isFinite(this.from) && this.from > 0)
                    this.$items = this.$items.slice(this.from);
                this.$list.html(this.$items);
            } else if (this.items instanceof Object){
                this.grouped = true;
                this.groups = $.extend({}, this.items);
                this.$items = Object.keys(this.groups).map(this.getItem, this);
                this.$list.html(this.$items);
            }
            this.$container.html(this.$list);
            this.$dropdown.html([this.$dropdownLabel, this.$container]);
        },
        getItem: function(item){
            if (this.grouped){
                var $group = $('<section>').addClass('quake-dropdown__group'),
                    $heading = $('<h2>').addClass('quake-dropdown__group-heading'),
                    $list = $('<ul>').addClass('quake-dropdown__group-list'),
                    items = this.groups[item],
                    $items = items.map(this.getListItem, this);
                $list.html($items);
                $group.html([$heading, $list]);
                return $group;
            } else {
                return this.getListItem(item);
            }
        },
        getListItem: function(item){
            var $item = $('<li>'), $link = $('<a>');
            if (this.grouped){
                $item.addClass('quake-dropdown__group-item');
                $link.addClass('quake-dropdown__group-link')
                    .attr('href', '#').on('click', $.proxy(this.select, this))
                    .text(item);
            } else {
                $item.addClass('quake-dropdown__item');
                $link.addClass('quake-dropdown__link').attr('href', '#')
                    .on('click', $.proxy(this.select, this))
                    .text(item);
            }
            $item.html($link);
            return $item;
        },
        toggle: function(event){
            event.preventDefault();
            if (this.active){
                this.$dropdown.removeClass('active');
                this.$container.slideUp(this.delay);
                this.active = false;
            } else {
                this.$dropdown.addClass('active');
                this.$container.slideDown(this.delay);
                this.active = true;
            }
        },
        toggleGroup: function(event){
            var $heading = $(event.target),
                $list = $heading.next();
            if ($list.is(':hidden')) $list.slideDown(this.delay);
            else $list.slideUp(this.delay);
        },
        select: function(event){
            event.preventDefault();
            var value = $(event.target).text();
            this.selectedValue = value;
            this.$label.text(this.selectedValue);
            this.setData('value', this.selectedValue);
            this.close();
        },
        close: function(){
            this.$container.slideUp(this.delay);
            this.active = false;
        },
        addItem: function(item, obj){
            if (this.items instanceof Array){
                var len = this.items.length;
                if (this.items.indexOf(item) > -1) return;
                this.items[len] = item;
            } else if (this.items instanceof Object){
                var items = obj[item];
                if (this.has(this.items, item)) return;
                this.items[item] = item;
            }
        },
        addItems: function(item){
            if (item instanceof Array) item.forEach(this.addItem, this);
            else if (item instanceof Object){
                Object.keys(item).forEach(function(key){
                    this.addItem.call(this, key, item);
                }, this);
            }
        },
        build: function(){
            if (this.callback instanceof Function){
                $.when(this.deferred).done($.proxy(this.callback, this));
                this.deferred.resolve(this.$dropdown);
            }
            return this.$dropdown;
        }
    };
    
    aliases.forEach(function(alias){
        UI[alias] = UI.dropdown;
    });
    
    $(document).ready(function(){
        importArticle({
            type: 'script',
            article: 'MediaWiki:QuakeUI/dropdown.css'
        });
    });
    
    return (window.UI = UI);
}(this, jQuery, mediaWiki));