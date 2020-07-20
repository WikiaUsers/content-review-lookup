(function start(mw, $, mainRoom, factory){
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat'){
        if (!mainRoom.isInitialized){
            start(mw, $, mainRoom, factory);
            return;
        }
        factory(mw, $, mainRoom);
    }
}(this.mediaWiki, this.jQuery, this.mainRoom, function(mw, $, mainRoom){
    var ex = {};
    ex.toggleMenu = function($menu, cb){
        var state = $menu.is(':hidden');
        if (state === false){
            $menu.slideUp();
            state = $menu.is(':hidden');
        } else {
            $menu.slideDown();
            state = $menu.is(':hidden');
        }
        if (typeof cb == 'function'){
            cb.apply(this, [$menu, state]);
        }
    };
    ex.createButton = function(){
        var $element = $('<nav />', { 'class': 'ChatMenuButton chat-menu-button', 'id': 'ChatMenuButton' });
        $element.html([
            $('<div />', { 'class': 'ChatMenuButtonLabel chat-menu-button-label' })
                .html(
                    $('<a />', { 'class': 'ChatMenuButtonLink', 'href': '#ChatMenu', text: 'Options', on: {
                        'click': function(event){
                            if (typeof event == 'undefined') return;
                            event.preventDefault();
                            var target = $(event.target).prop('hash');
                            target = jQuery(target);
                            ex.toggleMenu(target, function($target, hidden){
                                if (hidden === true){
                                    $target.html('Show Options');
                                } else {
                                    $target.html('Hide Options');
                                }
                            });
                        }
                    } })
                ),
            $('<section />', { 'class': 'ChatMenu chat-menu', 'id': 'ChatMenu' })
                .html(function(){
                    var $menu = ex.createMenu(ex.items);
                    ex.parseMenu($menu);
                    $menu.addClass('ChatMenuList-level-1 nav');
                    return $menu;
                })
        ]);
        return $element;
    };
    
    ex.createMenu = function(items){
        var $ul = $('<ul />', { 'class': 'ChatMenuList chat-menu-list' });
        for (var key in items){
            if (items.hasOwnProperty(key)){
                var $li = $('<li />', { 'class': 'ChatMenuListItems chat-menu-list-item' });
                if (typeof items[key] == 'object'){
                    $li.addClass('chat-menu-list-dropdown');
                    $li.html([
                        $('<a />', { 'class': 'ChatMenuLink chat-menu-link noop', 'href': '#', text: key }),
                        this.createMenu(items[key])
                    ]);
                } else {
                    $li.html(
                        $('<a />', { 'class': 'ChatMenuLink chat-menu-link', 'href': items[key].indexOf('action:') === 0 ? '#' : items[key], text: key, on: {
                            'click': this.initAction(data[key])
                        }})
                    );
                }
                $ul.append($li);
            }
        }
        return $ul;
    };
    
    ex.parseMenu = function($menu, index){
        index = index || 1;
        $menu.children('li').each(function(){
            $(this).addClass('ChatMenuItem-level-' + index);
            if ($(this).is('.chat-menu-list-dropdown')){
                var i = index + 1,
                    $subnav = $(this).children('ul').addClass('ChatMenuList-level-' + i + ' subnav');
                ex.parseMenu($subnav, i);
            }
        });
    };
    
    ex.getMenu = function(items){
        var $menu = this.createMenu(items);
        this.parseMenu($menu);
        return $menu;
    };
    
    ex.init = function(){
        
    };
}));