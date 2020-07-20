window.UI = $.extend({}, window.UI);

UI.list = {
    grouped: false,
    multiple: false,
    selectedValue: '',
    imageSize: 30,
    items: [],
    cols: 1,
    create: function(){
        if (this.multiple) this.selectedValue = [];
        // List wrapper
        this.$wrapper = $('<nav>').addClass('QuakeList list')
            .attr('id', this.id);
        // List items
        if (Array.isArray(this.items)){
            if (this.cols > 1){
                this.rows = 0;
                this.list = this.generate.call(this, this.items);
                this.$rows = this.list.map($.proxy(this.createRows, this));
                this.$wrapper.html(this.$rows);
            } else {
                this.$list = $('<ul>').addClass('QuakeListItems list-items');
                this.$items = this.items.map($.proxy(this.createItem, this, 1));
                this.$list.html(this.$items);
                this.$wrapper.html(this.$list);
            }
        } else if (typeof this.items === 'object'){
            this.grouped = true;
            this.$groups = Object.keys(this.items).map($.proxy(this.createGroup, this));
            this.$wrapper.html(this.$groups);
        }
        return this;
    },
    generate: function(items){
        var rows = [], r = 0, c = 0, row = [];
        items.forEach($.proxy(function(item, index){
            if (index % this.cols){ row = []; r++; c = 0; }
            var $item = $('<li>').addClass('QuakeListItem list-item'),
                id = this.id + '_list-item-' + index, $item_html = [],
                $wrapper = $('<label>').addClass('QuakeListItemWrapper list-item-wrapper').attr('for', id);
            if (typeof item === 'object'){
                var $html = [];
                if ((image = item.image || item.img)){
                    var $container = $('<div>').addClass('QuakeListImageContainer list-image-container'),
                        $img = $('<img>').addClass('QuakeListImage list-item-container');
                    if (item.imageType === 'avatar')
                        $img.addClass('list-avatar');
                    $img.attr('src', image)
                        .css({ 
                            width: String(this.imageSize) + 'px', 
                            height: String(this.imageSize) + 'px'
                        });
                    $container.html($img);
                    $html[$html.length] = $container;
                }
                
                var $label;
                if ((text = item.text)){
                    $label = $('<div>').addClass('QuakeListLabel list-label');
                    $label.text(text);
                } else if ((html = item.html)){
                    $label = $('<div>').addClass('QuakeListLabel list-label');
                    $label.html(html);
                }
                
                if (typeof $label !== 'undefined')
                    $html[$html.length] = $label;
                
                if ((title = item.title)){
                    $wrapper.attr('data-tooltip', title);
                }
                $wrapper.html($html);
                $item_html[$item_html.length] = $wrapper;
            } else if (typeof item === 'string'){
                $wrapper.text(item);
                $item_html[$item_html.length] = $wrapper;
            }
            
            var $input = $('<input>').addClass('QuakeListControl list-control'),
                value;
            if (this.multiple){
                if (typeof item === 'string') 
                    value = item;
                else if (typeof item === 'object') 
                    value = item.text || item.value;
                $input.attr({ 
                    'type': 'checkbox', 
                    'id': id, 
                    'value': value,
                    'name': this.id + '-control'
                }).on('change', $.proxy(this.change, this));
            } else {
                if (typeof item === 'string') 
                    value = item;
                else if (typeof item === 'object') 
                    value = item.text || item.value;
                $input.attr({
                    'type': 'radio',
                    'id': id,
                    'value': value,
                    'name': this.id + '-control'
                }).on('change', $.proxy(this.change, this));
            }
            $item_html[$item.html.length] = $input;
            $item.html($item_html);
            row[row.length] = $item; c++;
            if (c === (this.cols - 1)) rows[r] = row;
        }, this));
        this.rows = r;
        return rows;
    },
    createRows: function(items){
        var $row = $('<ul>').addClass('QuakeListRow list-row');
        $row.html(items);
        return $row;
    },
    createItem: function(group, item, index){
        if (!this.grouped) group = '';
        else group = String(group) + '-';
        var $item = $('<li>').addClass('QuakeListItem list-item'),
            id = this.id + '_list-item-' + group + index, $item_html = [],
            $wrapper = $('<label>').addClass('QuakeListItemWrapper list-item-wrapper').attr('for', id);
        if (typeof item === 'object'){
            var $html = [];
            if ((image = item.image || item.img)){
                var $container = $('<div>').addClass('QuakeListImageContainer list-image-container'),
                    $img = $('<img>').addClass('QuakeListImage list-item-container');
                if (item.imageType === 'avatar')
                    $img.addClass('list-avatar');
                $img.attr('src', image)
                    .css({ 
                        width: String(this.imageSize) + 'px', 
                        height: String(this.imageSize) + 'px'
                    });
                $container.html($img);
                $html[$html.length] = $container;
            }
                
            var $label;
            if ((text = item.text)){
                $label = $('<div>').addClass('QuakeListLabel list-label');
                $label.text(text);
            } else if ((html = item.html)){
                $label = $('<div>').addClass('QuakeListLabel list-label');
                $label.html(html);
            }
                
            if (typeof $label !== 'undefined')
                $html[$html.length] = $label;
                
            if ((title = item.title)){
                $wrapper.attr('data-tooltip', title);
            }
            $wrapper.html($html);
            $item_html[$item_html.length] = $wrapper;
        } else if (typeof item === 'string'){
            $wrapper.text(item);
            $item_html[$item_html.length] = $wrapper;
        }
            
        var $input = $('<input>').addClass('QuakeListControl list-control'),
            value;
        if (this.multiple){
            if (typeof item === 'string') 
                value = item;
            else if (typeof item === 'object') 
                value = item.text || item.value;
            $input.attr({ 
                'type': 'checkbox', 
                'id': id, 
                'value': value,
                'name': this.id + '-control'
            }).on('change', $.proxy(this.change, this));
        } else {
            if (typeof item === 'string') 
                value = item;
            else if (typeof item === 'object') 
                value = item.text || item.value;
            $input.attr({
                'type': 'radio',
                'id': id,
                'value': value,
                'name': this.id + '-control'
            }).on('change', $.proxy(this.change, this));
        }
        $item_html[$item.html.length] = $input;
        $item.html($item_html);
        return $item;
    },
    createGroup: function(item, i){
        var value = this.items[item], 
            $section = $('<section>').addClass('QuakeListSection list-section'),
            $heading = $('<h2>').addClass('QuakeListSectionHeading list-section-heading')
                .text(item),
            $content = $('<div>').addClass('QuakeListSectionContent list-section-content');
        if (this.cols > 1){
            var rows = 0, $rows;
            list = this.generate(value);
            $rows = list.map($.proxy(this.createRows, this));
            $content.html($rows);
        } else {
            var $list = $('<ul>').addClass('QuakeListItems list-items'),
                $items = value.map($.proxy(this.createItem, this, i + 1));
            $list.html($items);
            $content.html($list);
        }
        $section.html([$heading, $content]);
        return $section;
    },
    change: function(event){
        var value = $(event.target).val(),
            checked = $(event.target).prop('checked');
        if (this.multiple){
            if (this.selectedValue.indexOf(value) > -1 && checked) return;
            else if (this.selectedValue.indexOf(value) > -1 && !checked){
                var index = this.selectedValue.indexOf(value),
                    arr = this.selectedValue;
                arr.splice(index, 1);
                this.selectedValue = arr;
            } else {
                var len = this.selectedValue.length;
                this.selectedValue[len] = value;
            }
            this.setData('value', this.selectedValue);
        } else {
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