importArticles( { 
    type: 'script', 
    articles: [ 
        'u:dev:GiveChatModPrompt/code.js', 
        'u:dev:ChatAnnouncements/code.js', 
        'u:dev:!mods/code.js',
        'u:dev:!kick/code.js',
        'u:dev:ChatOptions/code.js',  ] } );

/* ~ Censor Testing ~ */
var str = "censor test";
var res = str.replace(/censor/gi, '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/4/44/Special_Cow.png">'); 

/* ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ Chat Tags ~-~-~-~-~-~-~-~-~-~-~-~-~-~-~- */

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
    'b':        function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/b]', '</span>');
        } else {
            s = s.replace('[b]', '<span style="font-weight:bold;">');
        }
        return s;
    },

    'big':      function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/big]', '</span>');
        } else {
            s = s.replace('[big]', '<span style="font-size:16pt;">');
        }
        return s;
    },

    'code':     function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/code]', '</span>');
        } else {
            s = s.replace('[code]', '<span style="font-family:monospace;">');
        }
        return s;
    },

    'color':    function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/color]', '</span>');
        } else {
            try {
                t = t.split('="');
                t[1] = t[1].replace('"', '');
                s = s.replace('[color="' + t[1] + '"]', '<span style="color:' + mw.html.escape(t[1]) + ';">');
            } catch(e) { console.log(e) }
        }
        return s;
    },

    'font':     function (s,t) {
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

    'i':        function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/i]', '</span>');
        } else {
            s = s.replace('[i]', '<span style="font-style:italic;">');
        }
        return s;
    },

    'pester':       function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/pester]', '</span>');
        } else {
            s = s.replace('[pester]', '<span style="font-family: Courier Bold;">');
        }
        return s;
    },

    's':        function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/s]', '</span>');
        } else {
            s = s.replace('[s]', '<span style="text-decoration:line-through;">');
        }
        return s;
    },

    'small':    function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/small]', '</span>');
        } else {
            s = s.replace('[small]', '<span style="font-size:7pt;">');
        }
        return s;
    },

    'sub':      function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sub]', '</sub>');
        } else {
            s = s.replace('[sub]', '<sub>');
        }
        return s;
    },

    'sup':      function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sup]', '</sup>');
        } else {
            s = s.replace('[sup]', '<sup>');
        }
        return s;
    },

    'u':        function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/u]', '</span>');
        } else {
            s = s.replace('[u]', '<span style="text-decoration:underline;">');
        }
        return s;
    },

    // RP Sprites
    'brainstorm':   function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/brainstorm]', '</span>');
        } else {
            s = s.replace('[brainstorm]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/e/ea/Itty_Brainstorm.gif"> <span style="font-family: Reenie Beanie, sans serif; font-size:24px; color:#4c99bf; line-height:20px;">');
        }
        return s;
    },

 'jazz':            function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/jazz]', '</span>');
        } else {
            s = s.replace('[jazz]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/0/0d/IttyJazz.gif"> <span style="font-family: Rock Salt, sans serif; font-size:12px; color:#475ecc; line-height:24px;">');
        }
        return s;
    },

    'mirage':       function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/mirage]', '</span>');
        } else {
            s = s.replace('[mirage]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/8/89/IttyRaj.gif"> <span style="font-family: Dancing Script, sans serif; font-size:20px; color:#2163a6; line-height:24px;">');
        }
        return s;
    },
    
    'perceptor':    function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/perceptor]', '</span>');
        } else {
            s = s.replace('[perceptor]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/5/56/IttyPercy.gif"> <span style="font-family: Cedarville Cursive, sans serif; font-size:18px; color:#e60060; line-height:24px;">');
        }
        return s;
    },
    
    'percy':            function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/percy]', '</span>');
        } else {
            s = s.replace('[percy]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/5/56/IttyPercy.gif"> <span style="font-family: Cedarville Cursive, sans serif; font-size:18px; color:#e60060; line-height:24px;">');
        }
        return s;
    },
    
    'prowl':            function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/prowl]', '</span>');
        } else {
            s = s.replace('[prowl]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/4/45/IttyProwl.gif"> <span style="font-family: Patrick Hand, sans serif; font-size:18px; color:#99823d; line-height:22px;">');
        }
        return s;
    },

    'sideswipe':        function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sideswipe]', '</span>');
        } else {
            s = s.replace('[sideswipe]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/8/8c/IttySides.gif"> <span style="font-family: Gloria Hallelujah, sans serif; font-size:14px; color:#e53939; line-height:24px;">');
        }
        return s;
    },

    'sides':            function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sides]', '</span>');
        } else {
            s = s.replace('[sides]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/8/8c/IttySides.gif"> <span style="font-family: Gloria Hallelujah, sans serif; font-size:14px; color:#e53939; line-height:24px;">');
        }
        return s;
    },

    'sunstreaker':      function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sunstreaker]', '</span>');
        } else {
            s = s.replace('[sunstreaker]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/9/92/IttySunny.gif"> <span style="font-family: Tangerine, sans serif; font-size:24px; color:#f3bc18; line-height:28px;">');
        }
        return s;
    },

    'sunny':            function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sunny]', '</span>');
        } else {
            s = s.replace('[sunny]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/9/92/IttySunny.gif"> <span style="font-family: Tangerine, sans serif; font-size:24px; color:#f3bc18; line-height:28px;">');
        }
        return s;
    },

    'tracks':            function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/tracks]', '</span>');
        } else {
            s = s.replace('[tracks]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/0/04/IttyTracks.gif"> <span style="font-family: La Belle Aurore, sans serif; font-size:18px; color:#5247cc; line-height:28px;">');
        }
        return s;
    },

    'quark':            function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/quark]', '</span>');
        } else {
            s = s.replace('[quark]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/2/2c/IttyQuark.gif"> <span style="font-family: Caveat, sans-serif; font-size:20px; color:#3db4cc; line-height:20px;">');
        }
        return s;
    },

    'whirl':            function (s,t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/whirl]', '</span>');
        } else {
            s = s.replace('[whirl]', '<img src="https://vignette.wikia.nocookie.net/a-private-conversation/images/7/78/IttyWhirl.gif"> <span style="font-family: Permanent Marker, sans serif; font-size:16px; color:#6b9bb3; line-height:20px; letter-spacing:1px;">');
        }
        return s;
    },
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