/**
 * @module          mobile
 * @description     Creates a mobile chat skin
 * @version         1.0
 * @author          Ultimate Dark Carnage
 * @license         CC-BY-SA
 **/

(function($, mw, mainRoom, FC){
    FC.Mobile = {
        mwConfig: mw.config.get('wgCanonicalSpecialPageName wgUserName wgChatMyAvatarUrl'.split(/\s+/g)),
        state: false,
        loaded: $.Deferred(),
        styleObj: {
            type: 'style',
            article: 'u:dev:MediaWiki:FandomizedChat/mobile.css'
        },
        $viewport: $('<meta>').attr({
            'name': 'viewport',
            'content': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        }),
        $toolbar: $('<section>').addClass('MobileChatToolbar mobile-chat-toolbar')
    };
    
    FC.Mobile.getTbr = function(){
        var userAgent = navigator.userAgent,
            result = null,
            vendors = {
                'Android': function(){
                    return $('<meta>').attr({
                        'name': 'theme-color',
                        'content': '#' + $('.Rail .selected').css('background-color')
                        .match(/\d+/g).slice(0, 3).map(function(t){
                            return Number(t).toString(16);
                        })
                    });
                },
                'iPhone': function(){
                    return $('<meta>').attr({
                        'name': 'apple-mobile-web-app-status-bar-style',
                        'content': 'black-translucent'
                    });
                }
            };
        for (var vendor in vendors){
            if (userAgent.indexOf(vendor) > -1){
                result = vendors[vendor].call(this);
                break;
            }
        }
        return result;
    };
    
    FC.Mobile.activate = FC.Mobile.on = function(callback){
        if (FC.Mobile.state === false){
            $('.ChatWindow').addClass('MobileChat');
            if (typeof callback === 'function'){
                callback.call(window);
            }
            FC.Mobile.state = true;
        }
    };
    
    FC.Mobile.deactivate = FC.Mobile.off = function(callback){
        if (FC.Mobile.state === true){
            $('.ChatWindow').removeClass('MobileChat');
            if (typeof callback === 'function'){
                callback.call(window);
            }
            FC.Mobile.state = false;
        }
    };
    
    FC.Mobile.change = FC.Mobile.toggle = function(callback1, callback2){
        var isActive = FC.Mobile.state === true;
        isActive ? FC.Mobile.activate(callback1) : FC.Mobile.deactivate(callback2);
    };
    
    FC.Mobile.init = function(){
        $(document.head).append(FC.Mobile.$viewport);
        FC.Mobile.tbr = FC.Mobile.getTbr();
        if (FC.Mobile.tbr !== null){
            $(document.head).append(FC.Mobile.tbr);
        }
        
        mw.util.addCSS(FC.Mobile.addCSSVars(FC.Mobile.colors.wikia));
    };
}(jQuery, mediaWiki, mainRoom, $.extend({}, window.FandomizedChat)));