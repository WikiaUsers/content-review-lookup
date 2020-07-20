/**
 * Chat notifications
 *
 * This program uses new window notifications to provide alerts when pinged
 *
 * Copyright(c) 2015 Shining-Armor http://c.wikia.com/wiki/User:Shining-Armor
 */
 
var sfNotifications = sfNotifications || {};
 
sfNotifications.options = $.extend({
    audio: 'https://images.wikia.nocookie.net/monchbox/images/0/01/Beep-sound.ogg',
    caseInsensitive: false,
    highlight: true,
    highlightColor: 'red',
    notification: true,
    ping: true,
    pings: $.extend(window.sfNotifications.options.pings, []),
    regex: false,
    window: true
}, sfNotifications.options);
 
sfNotifications.pings = window.sfNotifications.pings || [];
 
sfNotifications.notify = function(user, text, img, message) {
    if (sfNotifications.options.notification === true) {
        new Notification(user, {body: text, icon: img});
    }
 
    if (sfNotifications.options.ping === true) {
        sfNotifications.audio.play();
    }
 
    if (sfNotifications.options.highlight === true) {
        if (typeof sfNotifications.options.highlightColor === 'string') {
            $('#' + message).css('color', sfNotifications.options.highlightColor);
        }
    }
};
 
sfNotifications.parse = function(node, message) {
    var node = $(node);
 
    sfNotifications.last = $(message).attr('id');
 
    if (node.length === 7) {
        if ($(node[4]).text() !== mw.config.get('wgUserName')) {
            if (sfNotifications.options.caseInsensitive === true) {
                for (var i = 0; i < sfNotifications.options.pings.length; i++) {
                    if ($(node[6]).text().toLowerCase().indexOf(sfNotifications.options.pings[i].toLowerCase()) > -1) {
                        sfNotifications.notify($(node[4]).text(), $(node[6]).text(), $(node[0]).attr('src'), sfNotifications.last);
                        break;
                    }
                }
            } else if (sfNotifications.options.regex === true) {
                for (var i = 0; i < sfNotifications.options.pings.length; i++) {
                    if (sfNotifications.options.pings[i].test($(node[6]).text()) === true) {
                        sfNotifications.notify($(node[4]).text(), $(node[6]).text(), $(node[0]).attr('src'), sfNotifications.last);
                        break;
                    }
                }
            } else {
                for (var i = 0; i < sfNotifications.options.pings.length; i++) {
                    if ($(node[6]).text().indexOf(sfNotifications.options.pings[i]) > -1) {
                        sfNotifications.notify($(node[4]).text(), $(node[6]).text(), $(node[0]).attr('src'), sfNotifications.last);
                        break;
                    }
                }
            }
        }
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
            Notification.requestPermission();
            sfNotifications.init();
        }
    }
 
    if (sfNotifications.options.ping === true) {
        if (typeof sfNotifications.options.audio === 'string') {
            sfNotifications.audio = new Audio(sfNotifications.options.audio);
        }
    }
 
    if (sfNotifications.options.caseInsensitive === true && sfNotifications.options.regex === true) {
        sfNotifications.options.caseInsensitive = false;
    }
 
    if (sfNotifications.initialized === true) {
        return;
    } else { 
        sfNotifications.initialized = true;
    }
 
    sfNotifications.last = '';
    sfNotifications.title = document.title;
    sfNotifications.unread = 0;
 
    window.onfocus = function() {
        document.title = sfNotifications.title;
        sfNotifications.unread = 0;
    };
 
    if (typeof window.mainRoom !== 'undefined') {
        mainRoom.model.chats.bind('afteradd', function(c) {
            if ($('#Chat_' + roomId + ' li:last').attr('id') !== sfNotifications.last) {
                sfNotifications.parse($('#Chat_' + roomId + ' .message:last').parent().html(), $('#Chat_' + roomId + ' li:last'));
            }
 
            if (sfNotifications.options.window === true) {
                sfNotifications.idle();
            }
        });
    }
};
 
$(document).ready(function() { sfNotifications.init() });