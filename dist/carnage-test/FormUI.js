(function(mw, $){
    if (typeof window.FormUI !== 'undefined') return;
    // Creates the base object
    var FormUI = {};
    // Creates a switch
    $.each(['Switch', 'Options'], function(index, key){
        FormUI[key] = function(){};
        $.extend(FormUI[key].prototype, {
            limit: 4,
            selectable: false,
            input: false,
            showHeading: false,
            loaded: true,
            id: '',
            heading: '',
            items: [],
            length: 0,
            startIndex: 0,
            value: ''
        });
        FormUI[key].prototype.create = function(data){
            (typeof data.showHeading !== 'undefined' && delete data.showHeading);
            // data.limit = 2 < x < 5;
            if (typeof data.limit === 'number' && (data.limit > 5 || data.limit < 2)){
                data.limit = 5;
            }
            (typeof data.selectable !== 'undefined' && delete data.selectable);
            $.extend(this, data, {});
            if (this.heading === ''){
                this.showHeading = true;
            }
            this.length = this.items.length;
            if (this.length > limit){
                this.selectable = true;
                this.items = $.map(this.items, $.proxy(function(item, index){
                    if (index >= limit){
                        return {
                            name: item.name,
                            index: index,
                            overflow: true
                        };
                    } else {
                        return {
                            name: item.name,
                            index: index,
                            overflow: false
                        };
                    }
                }, this));
            } else {
                this.items = $.map(this.items, $.proxy(function(item, index){
                    return {
                        name: item.name,
                        index: index,
                        overflow: false
                    };
                }, this));
            }
            this.createElement();
        };
        FormUI[key].prototype.createElement = function(){
            this.$element = $('<div />', {
                'class': 'FormSwtich form-switch',
                'id': this.id
            });
            if (this.showHeading === true){
                this.$element.append($('<h3 />', {
                    'class': 'FormSwitchHeading form-switch-heading',
                    text: this.heading
                }));
            }
            this.createContent();
        };
        FormUI[key].prototype.createContent = function(){
            this.$element.append($('<nav />', {
                'class': 'FormSwitchContent form-switch-content',
                html: this.insertItems()
            }));
        };
        FormUI[key].prototype.insertItems = function(){
            var $items = [], $overflow = [];
            $.each(this.items, $.proxy(function(index, item){
                if (item.overflow === false || !this.selectable){
                    $items.push($('<div />', {
                        'class': 'FormSwitchItem form-switch-item',
                        'data-id': 'form-switch-item__' + this.id + '-' + item.index,
                        html: [
                            $('<label />', {
                                'for': 'form-switch-item__' + this.id + '-' + item.index,
                                'class': 'FormSwitchLabel form-switch-label',
                                html: [
                                    $('<div />', {
                                        'class': 'FormSwitchTrigger form-switch-trigger'
                                    }),
                                    this.createTooltip(item.name)
                                ]
                            }),
                            $('<input />', {
                                'id': 'form-switch-item__' + this.id + '-' + item.index,
                                'type': 'radio',
                                'name': this.id,
                                on: {
                                    'click': $.proxy(this.changeValue, this)
                                }
                            })
                        ]
                    }));
                } else {
                    $overflow.push($('<li />', {
                        'class': 'FormSwitchListItem form-switch-list-item',
                        'data-id': 'form-switch-item__' + this.id + '-' + item.index,
                        html: $('<a />', {
                            'href': '#',
                            text: item.name,
                            on: {
                                'click': $.proxy(this.changeValue, this)
                            }
                        })
                    }));
                }
            }, this));
            return this.getItems($.proxy(function(){
                var $value = null, $buttons = null;
                if (this.selectable){
                    $value = $('<nav />', {
                        'class': 'FormSwitchValueWrapper form-switch-value-wrapper'
                    });
                    if (this.input){
                        $value.html([
                            $('<input />', {
                                'type': 'text',
                                'value': this.value,
                                'class': 'FormSwitchValue form-switch-value'
                            }),
                            $('<div />', {
                                'class': 'FormSwitchListWrapper form-switch-list-wrapper',
                                html: $('<ul />', {
                                    'class': 'FormSwitchList form-switch-list',
                                    html: $overflow
                                })
                            })
                        ]);
                    } else {
                        $value.html([
                            $('<span />', {
                                'class': 'FormSwitchValue form-switch-value',
                                text: this.value
                            }),
                            $('<div />', {
                                'class': 'FormSwitchListWrapper form-switch-list-wrapper',
                                html: $('<ul />', {
                                    'class': 'FormSwitchList form-switch-list',
                                    html: $overflow
                                })
                            })
                        ]);
                    }
                } else {
                    $value = $('<div />', {
                        'class': 'FormSwitchValueWrapper form-switch-value-wrapper'
                    });
                    $value.html($('<span />', {
                        'class': 'FormSwitchValue form-switch-value',
                        text: this.value
                    }));
                }
                
                $buttons = $('<div />', {
                    'class': 'FormSwitchOptions form-switch-options',
                    html: $item
                });
                return [$value, $buttons];
            }, this));
        };
        FormUI[key].prototype.getItems = function(callback){
            this.loaded = true;
            return callback;
        };
        FormUI[key].prototype.getElement = function(){
            return this.$element;
        };
    });
}(this.mediaWiki, this.jQuery));