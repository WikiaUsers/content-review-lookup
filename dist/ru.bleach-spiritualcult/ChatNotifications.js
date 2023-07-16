
/**
 * Chat notifications
 *
 * Based on http://dev.wikia.com/wiki/ChatNotifications
 * (http://dev.wikia.com/wiki/ChatNotifications/code.js?oldid=27900)
 * by Shining-Armor http://c.wikia.com/wiki/User:Shining-Armor
 */
 
var sfNotifications = sfNotifications || {};
 
sfNotifications.options = $.extend({
    audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
    highlight: false,
    highlightColor: 'red',
    notification: true,
    ping: true,
    window: true
}, sfNotifications.options);
 
 
sfNotifications.notify = function(user, text, img, message) {
    if(sfNotifications.sleep)
        return;
 
    if (sfNotifications.options.ping === true) {
        sfNotifications.audio.play();
    }
        
    if(document.hasFocus())
        return;
    
    if (sfNotifications.options.notification === true) {
        new Notification(user, {body: text, icon: img});
    }
 
    if (sfNotifications.options.highlight === true) {
        if (typeof sfNotifications.options.highlightColor === 'string') {
            $('#' + message).css('color', sfNotifications.options.highlightColor);
        }
    }
};
 
sfNotifications.parse = function(message) {
    var node = $.parseHTML(message.html().trim());
 
    sfNotifications.last = $(message).attr('id');
 
    if (node.length === 7) {
        if ($(node[4]).text() !== mw.config.get('wgUserName')) {
            sfNotifications.notify(
                $(node[4]).text(),
                $(node[6]).text(),
                $(node[0]).attr('src'),
                sfNotifications.last
            );
        }
    }
    else if (node.length === 1) {
        sfNotifications.notify(
            '',
            $(message).text(),
            'https://images.wikia.nocookie.net/__cb28/bleachpedia/ru/images/8/89/Wiki-wordmark.png',
            sfNotifications.last
        );
        sfNotifications.sleep = false;
    }
};
 
sfNotifications.idle = function() {
    if(document.hasFocus() === false){
        sfNotifications.unread++;
        document.title = '(' + sfNotifications.unread + ') ' + sfNotifications.title;
    }
};
 
sfNotifications.init = function() {
    if (typeof sfNotifications.audio === 'object') {
        return;
    }
 
    if (sfNotifications.options.notification === true) {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    sfNotifications.init();
                }
            });
            return;
        }
    }
 
    if (sfNotifications.options.ping === true) {
        if (typeof sfNotifications.options.audio === 'string') {
            sfNotifications.audio = new Audio(sfNotifications.options.audio);
        }
    }
 
    if (sfNotifications.initialized === true) {
        return;
    } else { 
        sfNotifications.initialized = true;
    }
 
    sfNotifications.last = '';
    sfNotifications.title = document.title;
    sfNotifications.unread = 0;
    sfNotifications.sleep = true;
 
    window.onfocus = function() {
        document.title = sfNotifications.title;
        sfNotifications.unread = 0;
    };
 
    if (typeof window.mainRoom !== 'undefined') {
        mainRoom.model.chats.bind('afteradd', function(c) {
            console.log("msg = ", $('#Chat_' + roomId + ' li:last').attr('id'),
                "\ncontent = ", $('#Chat_' + roomId + ' li:last').html());
            
            if ($('#Chat_' + roomId + ' li:last').attr('id') !== sfNotifications.last) {
                sfNotifications.parse($('#Chat_' + roomId + ' li:last'));
            }
 
            if (sfNotifications.options.window === true) {
                sfNotifications.idle();
            }
        });
    }
};
 
$(document).ready(function() { sfNotifications.init() });
//