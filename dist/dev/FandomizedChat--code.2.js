(function(mw, $, mainRoom, factory){
    var global = typeof window == 'undefined' ? window : this,
        config = typeof window.FandomizedChatConfig == 'object' ? window.FandomizedChatConfig : {};
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat'){
        if (typeof module == 'object' && typeof module.exports == 'object'){
            module.exports = global.document ? factory(mw, $, mainRoom) : function(w){
                if (!w.docoument){
                    throw new Error('This script requires a window with a document.');
                }
                return factory(mw, $, mainRoom, config);
            };
        } else {
            factory(mw, $, mainRoom, config);
        }
    }
}(this.mediaWiki, this.jQuery, this.mainRoom, function(mw, $, mainRoom, config){
    var main = {};
    /**
     * @method importResources
     * @param resources - The resources that will be imported
     **/
    main.importResources = function(resources){
        var scripts = [],
            styles = [];
        $.each(resources, function(index, resource){
            if (resource.endsWith('.css')) styles[styles.length] = resource;
            else if (resource.endsWith('js')) scripts[scripts.length] = resource;
        });
        importArticles(
            { type: 'style', articles: styles },
            { type: 'script', articles: scripts }
        );
    };
    main.room = mainRoom;
    main.importResources([
        // Styles
        'u:dev:MediaWiki:FandomizedChat/code.2.css',
        // Scripts
        'u:dev:MediaWiki:Colors/code.js',
        'u:dev:MediaWiki:FandomizedChat/themes.js',
        'u:dev:MediaWiki:FandomizedChat/library.2.js'
    ]);
    main.scrollSpeed = typeof config.scrollSpeed == 'number' ? config.scrollSpeed : 80;
    main.i18n = $.extend(true, {
        en: {
            hideChatList: 'Hide Chat List',
            showChatList: 'Show Chat List',
            away: 'Away',
            here: 'Here'
        },
        be: {
            hideChatList: 'Схаваць спіс удзельнікаў',
            showChatList: 'Паказаць спіс удзельнікаў',
            away: 'Неактыўны',
            here: 'Тут'
        },
        ru: {
            hideChatList: 'Скрыть список участников',
            showChatList: 'Показать список участников',
            away: 'Неактивен',
            here: 'Здесь'
        },
        uk: {
            hideChatList: 'Сховати список користувачів',
            showChatList: 'Показати список користувачів',
            away: 'Неактивний',
            here: 'Тут'
        }
    }, config.i18n || {});
    main.msg =
        main.i18n[mw.config.get('wgUserLanguage')] ||
        main.i18n[mw.config.get('wgUserLanguage').split('-')[0]] ||
        main.i18n.en;
    main.createArrows = function(){
        var arrow = {
            up: $('<a />', {
                'class': 'list-arrow up-arrow',
                'id': 'list-arrow-up',
                'href': '#WikiChatList',
                html: '<i class="icon ion-chevron-up"></i>',
                on: {
                    'click': main.moveUp
                }
            }),
            down: $('<a />', {
                'class': 'list-arrow down-arrow',
                'id': 'list-arrow-down',
                'href': '#WikiChatList',
                html: '<i class="icon ion-chevron-down"></i>',
                on: {
                    'click': main.moveDown
                }
            })
        };
        return arrow;
    };
    main.createToggleButton = function(){
        var toggleButton = $('<a />', {
            'class': 'toggleChatList show',
            'id': 'toggleChatList',
            'href': '#WikiChatList',
            html: [main.msg.hideChatList, '<i class="icon ion-chevron-up"></i>']
        });
        toggleButton.on('click', main.toggleChatList);
        return toggleButton;
    };
    main.moveUp = function(event){
        event.preventDefault();
        var $link = $(event.target).is('#list-arrow-up') ? $(event.target) : $(event.target).parents('#list-arrow-up'),
            $target = $($link.prop('hash'));
        $target.animate({ scrollTop: '-=' + main.scrollSpeed + 'px' }, {
            step: function(value){
                var rounded = Math.round(value);
                if ($(this).scrollTop() === 0){
                    $(this).stop();
                }
            }
        });
    };
    main.moveDown = function(event){
        event.preventDefault();
        var $link = $(event.target).is('#list-arrow-down') ? $(event.target) : $(event.target).parents('#list-arrow-down'),
            $target = $($link.prop('hash'));
        $target.animate({ scrollTop: '+=' + main.scrollSpeed + 'px' }, {
            step: function(value){
                if ($(this).scrollTop() + $(this).innerHeight() > $(this).prop('scrollHeight'))
                    $(this).stop();
            }
        });
    };
    main.toggleChatList = function(event){
        event.preventDefault();
        var $link = $(event.target).is('#toggleChatList') ? $(event.target) : $(event.target).parents('#toggleChatList'),
            $target = $($link.prop('hash'));
        if ($target.is(':hidden')){
            $link.html([main.msg.hideChatList, '<i class="icon ion-chevron-up"></i>']);
            $target.slideDown('fast');
        } else {
            $link.html([main.msg.showChatList, '<i class="icon ion-chevron-down"></i>']);
            $target.slideUp('fast');
        }
    };
    main.init = function(){
        var $arrows = $.map(main.createArrows(), function(value){
                return value;
            }),
            $toggle = main.createToggleButton();
        $('#Rail').prepend($('#ChatHeader .User').clone().addClass('self'));
        $('#Rail .User.self').find('img').addClass('wds-avatar');
        $('#WikiChatList').before($toggle, $arrows[0]);
        $('#WikiChatList').after($arrows[1]);
        mw.hook('FandomizedChat.loaded').fire(main);
    };
    $(main.init);
    window.FandomizedChatMain = window.fcMain = main;
}));