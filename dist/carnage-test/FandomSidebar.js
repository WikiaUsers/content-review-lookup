(function(mw, $, factory){
    if ($('#WikiaBar').length && ['edit', 'submit'].indexOf(mw.config.get('wgAction')) === -1 && !$('#FandomToolbar').length){
        $.when($.getScript('http://dev.wikia.com/index.php?title=MediaWiki:WDSIcons/code.js&action=raw&ctype=text/javascript')).done(function(d){
            require(['fosl.wds'], function(wds){
                factory.apply(window, [mw, $, wds]);
            });
        });
    }
}(this.mediaWiki, this.jQuery, function(mw, $, wds){
    var obj = {}, items = {};
    obj.items = items;
    obj.menu = null;
    obj.actions = {};
    obj.getFromPage = function(page){
        $.when($.ajax({
            method: 'GET',
            dataType: 'text',
            url: mw.util.wikiScript('index'),
            async: false,
            data: {
                title: page,
                action: 'raw',
                ctype: 'text/plain'
            }
        })).done($.proxy(function(data){
            try {
                var items_obj = JSON.parse(data);
                $.each(items_obj, function(key, value){
                    if (!obj.items.hasOwnProperty(key)){
                        obj.items[key] = value;
                    }
                });
            } catch (e){/* Do nothing here */}
        }, window));
    };
    obj.getColors = function(){
        return {
            background: $('#WikiaPageBackground').css('background-color'),
            border: '1px solid ' + $('#WikiaPage').css('border-right-color')
        };
    };
    obj.getWordmark = function(){
        return $('.wds-community-header__wordmark').find('img').attr('src');
    };
    obj.getUserInfo = function(){
        var _obj = {
            name: mw.config.get('wgUserName'),
            avatar: 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/40?format=jpg'
        };
        $.when($.ajax({
            method: 'GET',
            dataType: 'json',
            url: mw.util.wikiScript('wikia'),
            data: {
                controller: 'UserProfilePageController',
                method: 'renderUserIdentityBox',
                format: 'json'
            }
        })).done($.proxy(function(data){
            if (_obj.avatar !== data.user.avatar && !data.error){
                _obj.avatar = data.user.avatar;
            }
        }, window));
        return _obj;
    };
    obj.emitAction = function(name, args){
        obj.actions[name].apply(window, args || []);
    };
    obj.initAction = function(name){
        name = name.replace('action:', '');
        if (obj.actions.hasOwnProperty(name)){
            return function(event){
                if (typeof event !== 'undefined') event.preventDefault();
                obj.emitAction(name, [event]);
            };
        } else return $.noop;
    };
    obj.createNavMenu = function(data){
        var $ul = $('<ul />', { 'class': 'FandomToolbarMenuList fandom-toolbar-menu-list' });
        for (var key in data){
            if (data.hasOwnProperty(key)){
                var $li = $('<li />', { 'class': 'FandomToolbarMenuItem fandom-toolbar-menu-item' });
                if (typeof data[key] == 'object'){
                    $li.addClass('fandom-toolbar-menu-dropdown');
                    $li.html([
                        $('<div />', {
                            'class': 'FandomToolbarMenuItemLabel fandom-toolbar-menu-label fandom-toolbar-menu-dropdown-label',
                            text: key 
                        }),
                        this.createNavMenu(data[key])
                    ]);
                } else {
                    $li.html([
                        $('<div />', { 'class': 'FandomToolbarMenuItemLabel fandom-toolbar-menu-label fandom-toolbar-menu-with-link',
                            html: $('<a />', {
                                'href': data[key].indexOf('action:') === 0 ? '#' : data[key],
                                on: {
                                    'click': this.initAction(data[key])
                                },
                                text: key
                            })
                        })
                    ]);
                }
                $ul.append($li);
            }
        }
        return $ul;
    };
    obj.parseNavMenu = function parseNavMenu($menu, index){
        $menu.children('li').each(function(){
            $(this).addClass('fandom-toolbar-menu-item-level' + index);
            if ($(this).is('.fandom-toolbar-menu-dropdown')){
                var i = index + 1,
                    $subnav = $(this).children('ul').addClass('fandom-toolbar-menu-level-' + i);
                parseNavMenu($subnav, i);
            }
        });
    };
    obj.getNavMenu = function(page){
        page = page || 'User:' + mw.config.get('wgUserName') + '/sidebar.json';
        obj.getFromPage(page);
        var $menu = obj.createNavMenu(obj.items).addClass('fandom-toolber-menu-level-1');
        obj.parseNavMenu($menu, 1);
        return $menu;
    };
    obj.createSidebar = function(page){
        page = page || 'User:' + mw.config.get('wgUserName') + '/sidebar.json';
        var $sidebar = $('<section />', { 'class': 'FandomToolbar fandom-toolbar', 'id': 'FandomToolbar' }),
            $sidebar_header = $('<header />', { 'class': 'FandomToolbarHeader fandom-toolbar-header' }),
            $sidebar_nav = $('<nav />', { 'class': 'FandomToolbarMenu fandom-toolbar-menu'}), info = obj.getUserInfo(), menu = obj.getNavMenu(page);
        setTimeout(function(){
            $sidebar_header.html(function(){
                var $wordmark = $('<h1 />', { 'class': 'FandomToolbarWordmark fandom-toolbar-wordmark wordmark'}),
                    $userinfo = $('<h2 />', { 'class': 'FandomToolbarUserInfo fandom-toolbar-user-info' });
                $wordmark.html(function(){
                    var wordmark_src = obj.getWordmark(),
                        $img = $('<img />', { 'class': 'wordmark-image' });
                    $img.attr('src', wordmark_src);
                    return $img;
                });
                $userinfo.html(function(){
                    var _obj = info,
                        name = _obj.name,
                        avatar = _obj.avatar;
                    return [
                        $('<img />', { 'class': 'wds-avatar avatar', src: avatar, alt: name }),
                        $('<span />', { 'class': 'wds-username username '}).text(name)
                    ];
                });
                return [$wordmark, $userinfo];
            });
            $sidebar_nav.html(menu);
            $sidebar.html([$sidebar_header, $sidebar_nav]);
            $('.WikiaSiteWrapper').append($sidebar);
        }, 3000);
    };
    window.FandomSidebar = obj;
}));