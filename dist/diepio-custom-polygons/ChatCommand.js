/***********************************************************************/
/***********************************************************************/
/******* ChatCommand.js 2.5.6 - Chat Commands for Chat since 2016. *****/
/************************ Created by Tacocat247 ************************/
/***********************************************************************/
/***********************************************************************/
var chatags = typeof chatags !== 'undefined' ? chatags : {};
 
chatags.videos = typeof chatags.videos !== 'undefined' ? chatags.videos : false;
 
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
    'br':     function (s,t) {
                 if (t.charAt(0) === '/') {
                 } else {
                     s = s.replace('[br]', '<br/>');
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
    'center':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/center]', '</span>');
                 } else {
                     s = s.replace('[center]', '<center>');
                 }
                 return s;
             },
    'dull':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/dull]', '</span>');
                 } else {
                     s = s.replace('[dull]', '<span style="background-color:white; color:black; font-family:Times New Roman">');
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
    'glow':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/glow]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[glow="' + t[1] + '"]', '<span style="font-family:Ubuntu; font-weight:bold; font-size:20px; text-shadow: 0 0 10px  ' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'hr':     function (s,t) {
                 if (t.charAt(0) === '/') {
                 } else {
                     s = s.replace('[hr]', '<hr/>');
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
     'o':    function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/o]', '</span>');
                } else {
                    s = s.replace('[o]', '<span style="text-decoration:overline;">');
                }
                return s;
            },
    'rainbow': function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/rainbow]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[rainbow="' + t[1] + '"]', '<span style="color:#FFB6C1;font-size:100%;animation-name:rainbow;animation-duration:' + mw.html.escape(t[1]) + 's;animation-iteration-count:infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;">');
                     } catch(e) { console.log(e) }
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
  'shadow':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/shadow]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[shadow="' + t[1] + '"]', '<span style="text-shadow: 2px 2px ' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
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
    'verysmall':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/verysmall]', '</span>');
                 } else {
                     s = s.replace('[verysmall]', '<span style="font-size:4pt;">');
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
    'medium':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/medium]', '</span>');
                 } else {
                     s = s.replace('[medium]', '<span style="font-size:9pt;">');
                 }
                 return s;
             },
    'moderate':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/moderate]', '</span>');
                 } else {
                     s = s.replace('[moderate]', '<span style="font-size:13pt;">');
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
    'verybig':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/verybig]', '</span>');
                 } else {
                     s = s.replace('[verybig]', '<span style="font-size:20pt;">');
                 }
                 return s;
             },
    'extrabig':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/extrabig]', '</span>');
                 } else {
                     s = s.replace('[extrabig]', '<span style="font-size:26pt;">');
                 }
                 return s;
             },
    'giant':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/giant]', '</span>');
                 } else {
                     s = s.replace('[giant]', '<span style="font-size:32pt;">');
                 }
                 return s;
             },  
    'of super':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/of super]', '</span>');
                 } else {
                     s = s.replace('[of super]', '<span style="font-size:80pt;">');
                 }
                 return s;
             },  
    'blink':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/blink]', '</div>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[blink="' + t[1] + '"]', '<div style="animation-name:blinker; animation-iteration-count:infinite;animation-duration: ' + mw.html.escape(t[1]) + 's">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'down':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/down]', '</div></center>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[down="' + t[1] + '"]', '<center><div style="animation-name:UpDo; animation-iteration-count:infinite;animation-duration:.5s"> ' + mw.html.escape(t[1]) + '');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'expand':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/expand]', '</div></center>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[expand="' + t[1] + '"]', '<center><div style="animation-name:expand; animation-iteration-count:infinite;animation-duration:.5s"> ' + mw.html.escape(t[1]) + '');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'inv':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/inv]', '</span>');
                 } else {
                     s = s.replace('[inv]', '<span style="color:#474646">');
                 }
                 return s;
             },
 
    'rotate':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/rotate]', '</div></center>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[rotate="' + t[1] + '"]', '<center><div style="animation-name:rotation; animation-iteration-count:infinite;animation-duration:5s"> ' + mw.html.escape(t[1]) + '');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'scroll':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/scroll]', '</div></center>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[scroll="' + t[1] + '"]', '<div class="mq-wrapper"><span>' + mw.html.escape(t[1]) + ' </span></div>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'shake':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/shake]', '</div></center>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[shake="' + t[1] + '"]', '<center><div style="animation-name:baf; animation-iteration-count:infinite;animation-duration:.5s"><center> ' + mw.html.escape(t[1]) + '');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'twistX':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/twistX]', '</div></center>');
                 } else {
                     s = s.replace('[twistX]', '<div style="animation-name:twistX; animation-iteration-count:infinite;animation-duration:.5s"><center>');
                 }
                 return s;
             },
    'twistY':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/twistY]', '</div></center>');
                 } else {
                     s = s.replace('[twistY]', '<div style="animation-name:twistY; animation-iteration-count:infinite;animation-duration:.5s"><center>');
                 }
                 return s;
             },
 
    'wave':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/wave]', '</span></center>');
                 } else {
                     s = s.replace('[wave]', '<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>');
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
 chatags.parser = function (s) {
    var t = s.match(/\[([^\[\];]*)\]/g);
    var tg = '';
    var TAG_LIMIT = 50;
 
    if (!t) return s;
 
    t = t.slice(0, TAG_LIMIT);
 
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
 
        window.mainRoom.model.privateUsers.bind('add', function(u) {
            var privateRoomId = u.attributes.roomId;
            var privateRoom = mainRoom.chats.privates[privateRoomId];
 
            privateRoom.model.chats.bind('afteradd', function(chat) {
                if (chat.attributes.isInlineAlert) return;
 
                var string = $("#Chat_" + privateRoomId + " .message:last").html();
                    string = chatags.parser(string);
 
                $("#Chat_" + privateRoomId + " .message:last").html(string);
            });
        });
    }
};
 
$(function() {
    chatags.init();
});//End ChatCommand*/