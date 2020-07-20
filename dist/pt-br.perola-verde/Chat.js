/**
 * ChatTags - A BBCode parser for Wikia Special:Chat
 *
 * Version v2.4.2
 *
 * Copyright (c) 2013 - 2015 Maria Williams (Shining-Armor)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
var chatags = typeof chatags !== 'undefined' ? chatags : {};
 
chatags.images = typeof chatags.images !== 'undefined' ? chatags.images : false;
chatags.videos = typeof chatags.videos !== 'undefined' ? chatags.videos : false;
 
chatags.css = '.chatags-image{max-width:300px;max-height:300px;}';
 
chatags.tags = {
    'b':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/b]', '</span>');
                 } else {
                     s = s.replace('[b]', '<span style="font-weight:bold;">');
                 }
                 return s;
             },
    'bg':    function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/bg]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[bg="' + t[1] + '"]', '<span style="background-color:' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'big':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/big]', '</span>');
                 } else {
                     s = s.replace('[big]', '<span style="font-size:16pt;">');
                 }
                 return s;
             },
    'c':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/c]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[c="' + t[1] + '"]', '<span style="color:' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'code':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/code]', '</span>');
                 } else {
                     s = s.replace('[code]', '<span style="font-family:monospace;">');
                 }
                 return s;
             },
    'font':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/font]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[font="' + t[1] + '"]', '<span style="font-family:' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'i':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/i]', '</span>');
                 } else {
                     s = s.replace('[i]', '<span style="font-style:italic;">');
                 }
                 return s;
             },
    'img':   function (s,t) {
                 if (chatags.images !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[img="' + t[1] + '"]', '<img class="chatags-image" src="http://' + mw.html.escape(t[1]) + '" />');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'small': function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/small]', '</span>');
                } else {
                    s = s.replace('[small]', '<span style="font-size:7pt;">');
                }
                return s;
            },
    's':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/s]', '</span>');
                } else {
                    s = s.replace('[s]', '<span style="text-decoration:line-through;">');
                }
                return s;
            },
    'sub':  function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/sub]', '</sub>');
                } else {
                    s = s.replace('[sub]', '<sub>');
                }
                return s;
            },
    'sup':  function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/sup]', '</sup>');
                } else {
                    s = s.replace('[sup]', '<sup>');
                }
                return s;
            },
    'u':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/u]', '</span>');
                } else {
                    s = s.replace('[u]', '<span style="text-decoration:underline;">');
                }
                return s;
            },
    'yt':   function (s,t) {
                 if (chatags.videos !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[yt="' + t[1] + '"]', '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             }
};
 
chatags.parser = function (s) {
    var t = s.match(/\[([^\[\];]*)\]/g);
    var tg = '';
 
    if (!t) return s;
 
    for (var i = 0; i < t.length; i++) {
        tg = t[i].match(/\[\/?([^\[\]]*)\]/)[1];
 
        try {
            tg = tg.split('="')[0];
        } catch(e) { console.log(e) }
 
        if (typeof chatags.tags[tg] !== 'undefined') {
            s = chatags.tags[tg](s, t[i].replace('[', '').replace(']', ''));
        }
    }
    return s;
};
 
chatags.init = function() {
    if (typeof window.mainRoom !== 'undefined') {
        $('head').append('<style>' + chatags.css + '</style>');
        window.mainRoom.model.chats.bind("afteradd", function(c) {
            if (typeof window.mainRoom.roomId === "undefined")
                return;
            var string = $("#Chat_" + window.mainRoom.roomId + " .message:last").html();
 
            string = chatags.parser(string);
            $("#Chat_" + window.mainRoom.roomId + " .message:last").html(string);
        });
    }
};
 
$(document).ready(function() {
    chatags.init();
 
    $('.Chat ul').append('<li class="inline-alert">An important notice regarding ChatTags can be found <a href="http://shining-armor.wikia.com/wiki/User_blog:Shining-Armor/ChatTags_update_01062016">here</a></li>');
});