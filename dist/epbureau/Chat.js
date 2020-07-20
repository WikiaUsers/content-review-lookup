/**
 * ChatTags - A BBCode parser for Wikia Special:Chat
 *
 * Version v2.6.1
 *
 * Copyright (c) 2013 - 2017 Maria Williams. All rights reserved.
 * 
 * Contributions from:
 *     Dorumin (you get one) (multiple contributions tho)
 */
var chatags = typeof chatags !== 'undefined' ? chatags : {};
 
chatags.images = typeof chatags.images !== 'undefined' ? chatags.images : false;
chatags.videos = typeof chatags.videos !== 'undefined' ? chatags.videos : false;
 
chatags.css = '.chatags-image{max-width:300px;max-height:300px;}';
 
chatags.tags = {
    'b': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/b]', '</span>');
        } else {
            s = s.replace('[b]', '<span style="font-weight:bold;">');
        }
        return s;
    },
    'bg': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/bg]', '</span>');
        } else {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[bg="' + t[1] + '"]', '<span style="background-color:' + mw.html.escape(t[1]) + ';">');
            } catch (e) {
                console.log(e)
            }
        }
        return s;
    },
    'big': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/big]', '</span>');
        } else {
            s = s.replace('[big]', '<span style="font-size:16pt;">');
        }
        return s;
    },
    'c': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/c]', '</span>');
        } else {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[c="' + t[1] + '"]', '<span style="color:' + mw.html.escape(t[1]) + ';">');
            } catch (e) {
                console.log(e)
            }
        }
        return s;
    },
    'code': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/code]', '</span>');
        } else {
            s = s.replace('[code]', '<span style="font-family:monospace;">');
        }
        return s;
    },
    'font': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/font]', '</span>');
        } else {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[font="' + t[1] + '"]', '<span style="font-family:' + mw.html.escape(t[1]) + ';">');
            } catch (e) {
                console.log(e)
            }
        }
        return s;
    },
    'i': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/i]', '</span>');
        } else {
            s = s.replace('[i]', '<span style="font-style:italic;">');
        }
        return s;
    },
    'small': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/small]', '</span>');
        } else {
            s = s.replace('[small]', '<span style="font-size:7pt;">');
        }
        return s;
    },
    's': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/s]', '</span>');
        } else {
            s = s.replace('[s]', '<span style="text-decoration:line-through;">');
        }
        return s;
    },
    'sub': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sub]', '</sub>');
        } else {
            s = s.replace('[sub]', '<sub>');
        }
        return s;
    },
    'sup': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sup]', '</sup>');
        } else {
            s = s.replace('[sup]', '<sup>');
        }
        return s;
    },
    'u': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/u]', '</span>');
        } else {
            s = s.replace('[u]', '<span style="text-decoration:underline;">');
        }
        return s;
    },
    'yt': function(s, t) {
        if (chatags.videos !== true) return s;
        if (t.charAt(0) !== '/') {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[yt="' + t[1] + '"]', '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
            } catch (e) {
                console.log(e)
            }
        }
        return s;
    },
    'img': function(s, t) {
        if (chatags.images !== true) return s;
        if (t.charAt(0) !== '/') {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
 
                if (!Array.isArray(t[1].match(/\.(jpg|jpeg|png|gif|bmp)/g)))
                    return s.replace('[img="' + t[1] + '"]', '<span style="color:red;font-weight:bold;">NON-IMAGE DETECTED</span>');
 
                s = s.replace('[img="' + t[1] + '"]', '<img class="chatags-image" src="http://' + mw.html.escape(t[1]) + '" />');
            } catch (e) {
                console.log(e)
            }
        }
        return s;
    }
};
 
chatags.parser = function(s) {
    var t = s.match(/\[([^\[\];]*)\]/g);
    var tg = '';
    var TAG_LIMIT = 24;
 
    if (!t) return s;
 
    t = t.slice(0, TAG_LIMIT);
 
    for (var i = 0; i < t.length; i++) {
        tg = t[i].match(/\[\/?([^\[\]]*)\]/)[1];
 
        try {
            tg = tg.split('="')[0];
        } catch (e) {
            console.log(e)
        }
 
        if (typeof chatags.tags[tg] !== 'undefined') {
            s = chatags.tags[tg](s, t[i].replace('[', '').replace(']', ''));
        }
    }
    return s;
};
 
chatags.init = function() {
    if (typeof window.mainRoom !== 'undefined') {
        $('head').append('<style>' + chatags.css + '</style>');
 
        window.mainRoom.model.chats.bind("afteradd", function(chat) {
            if (typeof window.mainRoom.roomId === "undefined")
                return;
            var string = $('#entry-' + chat.cid).html();
            if (!string) return;
 
            string = chatags.parser(string);
            $('#entry-' + chat.cid).html(string);
        });
 
        window.mainRoom.model.privateUsers.bind('add', function(u) {
            var privateRoomId = u.attributes.roomId;
            var privateRoom = mainRoom.chats.privates[privateRoomId];
 
            privateRoom.model.chats.bind('afteradd', function(chat) {
                if (chat.attributes.isInlineAlert) return;
 
                var string = $('#entry-' + chat.cid).html();
                if (!string) return;
 
                string = chatags.parser(string);
                $('#entry-' + chat.cid).html(string);
            });
        });
    }
};
 
$(function() {
    console.log('[CHATAGS] Now with more hooks than a trawl!');
 
    chatags.init();
    mw.hook('chatags.init').fire(chatags);
});