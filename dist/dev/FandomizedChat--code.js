/**
 * FandomizedChat - A script created to modernize the look of the Chat
 * 
 * To do:
 * - Redesign the user stats menu
 * - Add a toolbar to the bottom of the chat
 * - Fix the 'away' status on the chat header
 * 
 * @author Ultimate Dark Carnage
 * @version 1.1.2
 * 
 * Note: Anyone is welcome to make corrections to the script as they see fit
 **/
 
if (!window.disableFandomizedChat) {
    importArticles(
        {
            type: 'script',
            articles: [
                'u:dev:Colors/code.js'
            ]
        },
        {
            type: 'style',
            articles: ['u:dev:MediaWiki:FandomizedChat.css']
        }
    );
}

/**
 * @var scroll_number - the number of pixels that the element would scroll from
 **/
var scroll_number = window.scroll_number || 80;

/*
 * @var i18n - Actually, there is only one phrase... But why not? It's like: expandability
 **/
var i18n = {
    en: {
        toggle: 'Toggle Chat List'
    },
    ru: {
        toggle: 'Свернуть/Развернуть'
    }
};
var i18n_current = i18n[mw.config.get("wgContentLanguage")] || i18n.en; // Current lang
// i18n = i18n[mw.config.get("wgContentLanguage")] || i18n['en'];

/**
 * Run the script when the chat window loads
 **/
 
$(document).ready(function(){
    /**
     * Set the default colors of the chat rail and the
     * new UI elements
     **/
     
    if (window.disableFandomizedChat) return;
     
    mw.hook('dev.colors').add(function(colors){
        var nav = colors.wikia.nav || mw.config.get('sassParams')['color-community-header'],
            text = colors.wikia.text || mw.config.get('sassParams')['color-body-middle'],
            css = 
                '.ChatHeader { \
                    background-color: $chatheader; \
                } \
                .Rail { \
                    background-color: $rail; \
                } \
                .Rail .User { \
                    color: $text; \
                } \
                .Rail .User:hover { \
                    background-color: $user; \
                    color: $page; \
                } \
                #list-arrow-down, \
                #list-arrow-up, \
                #toggleChatList { \
                    color: $text; \
                }';
        colors.css(css, {
            'rail': (function(colors){
                var parsed = colors.parse(colors.wikia.page),
                    result = parsed.lighten(20),
                    hex = result.hex();
                return hex;
            })(colors),
            'user': (function(colors){
                var parsed = colors.parse(nav),
                    result = parsed.lighten(20),
                    hex = result.hex();
                return hex;
            })(colors),
            'text': text,
            'chatheader': (function(colors){
                var parsed = colors.parse(colors.wikia.page),
                    result = parsed.lighten(-10),
                    hex = result.hex();
                return hex;
            })(colors)
        });
    });
 
    var $arrowUp = $('<a />', {
            'class': 'list-arrow up',
            'id': 'list-arrow-up',
            'href': '#WikiChatList'
        }).html('<i class="icon ion-chevron-up" />').on('click', function(event){
            event.preventDefault();
            var $link = null,
                $target = null;
            if ($(event.target).is('#list-arrow-up'))
                $link = $(event.target);
            else
                $link = $(event.target).parents('#list-arrow-up');
 
            if (typeof jQuery.fn.prop !== 'undefined'){
                $target = $($link.prop('hash'));
            } else {
                $target = $($link.get(0).hash);
            }
 
            $target.animate({
                scrollTop: '-=' + scroll_number + 'px',
            }, {
                step: function(value){
                    var rounded = Math.round(value);
                    if ($(this).scrollTop() === 0){
                        $(this).stop();
                    }
                }
            });
        }),
        $arrowDown = $('<a />', {
            'class': 'list-arrow down',
            'id': 'list-arrow-down',
            'href': '#WikiChatList'
        }).html('<i class="icon ion-chevron-down" />').on('click', function(event){
            event.preventDefault();
            var $link = null,
                $target = null;
            if ($(event.target).is('#list-arrow-down'))
                $link = $(event.target);
            else
                $link = $(event.target).parents('#list-arrow-down');
 
            if (typeof jQuery.fn.prop !== 'undefined'){
                $target = $($link.prop('hash'));
            } else {
                $target = $($link.get(0).hash);
            }
 
            $target.animate({
                scrollTop: '+=' + scroll_number + 'px'
            }, {
                step: function(value){
                    if ($(this).scrollTop() + $(this).innerHeight() >= (typeof jQuery.fn.prop !== 'undefined' ? $(this).prop('scrollHeight') : $(this).get(0).scrollHeight)){
                        $(this).stop();
                    }
                }
            });
        }),
        $toggleChatList = $('<a />', {
            'class': 'toggleChatList',
            'id': 'toggleChatList',
            'href': '#WikiChatList'
        }).html(i18n_current.toggle + ' <i class="icon ion-chevron-up" />').on('click', function(event){
            event.preventDefault();
            var $link = null,
                $target = null;
            if ($(event.target).is('#toggleChatList'))
                $link = $(event.target);
            else
                $link = $(event.target).parents('#toggleChatList');
 
            if (typeof jQuery.fn.prop !== 'undefined'){
                $target = $($link.prop('hash'));
            } else {
                $target = $($link.get(0).hash);
            }
 
            $target.slideToggle('fast');
        });
 
    $('#WikiChatList').before($toggleChatList, $arrowUp).after($arrowDown);
});