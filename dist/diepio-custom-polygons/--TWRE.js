/*RWQFSFASXC */
/* 0000 ! |-|4\/3 |0/\/63|) 4 7|-|!5>>> */
var chatags = typeof chatags !== 'undefined' ? chatags : {};
chatags.images = typeof chatags.images !== 'undefined' ? chatags.images : true;
chatags.videos = typeof chatags.videos !== 'undefined' ? chatags.videos : true;
chatags.css = '.chatags-image{max-width:300px;max-height:300px;}';
chatags.tags = {
    /****************/
    'urmeeps':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/urmeeps]', '</center></div></div>');
                 } else {
                     s = s.replace('[urmeeps]', '<center><div style="animation-name:rotation; animation-iteration-count:infinite;animation-duration:0.05s"><div style="animation-name:baf; animation-iteration-count:infinite;animation-duration:0.05s">');
                 }
                 return s;
             },
    'izreues':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/izreues]', '</span>');
                 } else {
                     s = s.replace('[izreues]', '<span style="color:#FFB6C1;font-size:100%;animation-name:rainbow;animation-duration:0.005s;animation-iteration-count:infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;">');
                 }
                 return s;
             },
    'pntame2is':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/pntame2is]', '</div>');
                 } else {
                     s = s.replace('[pntame2is]', '<div style="animation-name:rotation; animation-iteration-count:infinite;animation-duration:0.05s">');
                 }
                 return s;
             },
    'ukeaq':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/ukeaq]', '</div>');
                 } else {
                     s = s.replace('[ukeaq]', '<div style="animation-name:baf; animation-iteration-count:infinite;animation-duration:0.05s">');
                 }
                 return s;
             },
        'xad2npe':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/xad2npe]', '</div>');
                 } else {
                     s = s.replace('[xad2npe]', '<div style="animation-name:expand; animation-iteration-count:infinite;animation-duration:.05s">');
                 }
                 return s;
             },
     'iezs':    function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/iezs]', '</span>');
                 } else {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[iezs="' + t[1] + '"]', '<span style="font-size: ' + mw.html.escape(t[1]) + ';">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
};
 chatags.parser = function (s) {
    var t = s.match(/\[([^\[\];]*)\]/g);
    var tg = '';
    var TAG_LIMIT = 24;
 
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
 
$(document).ready(function() {
    chatags.init();
});//End &*_ _ _TWRE*/