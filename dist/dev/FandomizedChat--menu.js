window.Menu = window.Menu || function Menu(config, open) {
    config = config || {};
    this.heading = this.title = config.heading || '';
    this.subheading = this.subtitle = config.subheading || '';
    this.content = config.content || '';
    this.buttons = config.buttons || {};
    this.selector = '#' + this.id;
    this.id = config.id || '';
    this.callback = config.callback || null;
    if (typeof open == 'boolean' && open === true) {
        this.open();
    } else if (typeof open == 'function') {
        this.callback = open;
        this.open();
    } else {
        return this;
    }
};

Menu.prototype.create = function create() {
    var $menu = $('<div />', {
            'class': 'FullWidthMenu screen-menu',
            'id': this.id,
            'data-title': this.title
        }),
        t = this;
    if (this.subtitle !== '') {
        $menu.attr('data-subtitle', this.subtitle);
    }
    $menu.html(
        $('<section />', {
            'class': 'FullWidthMenuContainer screen-menu-container',
            html: function() {
                var $header = $('<header />', {
                        'class': 'FullWidthMenuHeader screen-menu-header',
                        html: [
                            $('<div />', {
                                'class': 'FullWidthMenuHeadingGroup screen-menu-heading-group heading-group',
                                html: function() {
                                    var headings = [],
                                        $title = $('<h1 />', {
                                            'class': 'FullWidthMenuTitle screen-menu-title',
                                            html: t.heading
                                        });
                                    headings[headings.length] = $title;
                                    if (t.subtitle !== '') {
                                        headings[headings.length] = $('<h2 />', {
                                            'class': 'FullWidthMenuSubtitle screen-menu-subtitle',
                                            html: t.subheading
                                        });
                                    }
                                    return headings;
                                }
                            }),
                            $('<a />', {
                                'href': '#' + t.id,
                                'class': 'FullWidthMenuClose screen-menu-close close-button',
                                html: '&times;',
                                on: {
                                    'click': function(event) {
                                        event.preventDefault();
                                        t.close();
                                    }
                                }
                            })
                        ]
                    }),
                    $content = $('<article />', {
                        'class': 'FullWidthMenuContent screen-menu-content',
                        html: this.content
                    }),
                    $footer = $('<footer />', {
                        'class': 'FullWidthMenuFooter screen-menu-footer',
                        html: [
                            $('<div />', {
                                'class': 'FullWidthMenuFormError screen-menu-form-error'
                            }),
                            $('<nav />', {
                                'class': 'FullWidthMenuToolbar screen-menu-toolbar screen-menu-buttons',
                                html: $.map(t.buttons, function(obj, name) {
                                    var $button = $('<a />', {
                                        'href': '#' + t.id,
                                        'class': 'screen-menu-button toolbar-button' + ((typeof obj.mainButton == 'boolean' && obj.mainButton === false) ? ' button-secondary' : ''),
                                        'id': obj.id,
                                        html: name
                                    }).on('click', function(event) {
                                        if (typeof obj.close == 'boolean' && obj.close !== false) t.close();
                                        if (typeof obj.handler == 'function') Function.prototype.apply.call(obj.handler, this, [event, t]);
                                    });
                                    return $button;
                                })
                            })
                        ]
                    });
                return [$header, $content, $footer];
            }
        })
    );
    return $menu;
};

Menu.prototype.open = function() {
    var menu = this.create();
    if ($(this.selector).length === 0) {
        $(document.body).append(menu);
        if (typeof this.callback == 'function') {
            Function.prototype.apply.call(this.callback, this, []);
        }
    }
};

Menu.prototype.close = function() {
    var menu = $(this.selector);
    if (menu.length > 0) {
        menu.remove();
    }
};

Menu.create = function(settings, open) {
    return new Menu(settings, open);
};