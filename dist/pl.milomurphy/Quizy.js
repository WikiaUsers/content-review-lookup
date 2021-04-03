/* Edited by Sebolaaa for Milo Murphy's Law Wiki */

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
 
chatags.images = typeof chatags.images !== 'undefined' ? chatags.images : true;
chatags.videos = typeof chatags.videos !== 'undefined' ? chatags.videos : true
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
    'big':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/big]', '</big>');
                 } else {
                     s = s.replace('[big]', '<big>');
                 }
                 return s;
             },
    'center':function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/center]', '<center>');
                 } else {
                     s = s.replace('[center]', '<center>');
                 }
                 return s;
             },
    'color': function (s,t) {
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
    'right':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/right]', '</p>');
                 } else {
                     s = s.replace('[right]', '<p align="right">');
                 }
                 return s;
             },
    'small': function (s,t) {
                if (t.charAt(0) === '/') {
                    s = s.replace('[/small]', '</small>');
                } else {
                    s = s.replace('[small]', '<small>');
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
                         s = s.replace('[yt="' + t[1] + '"]', '<div style="border: 10px solid black; box-shadow: grey 5px -5px 5px; width: 420px; height: 315px"><iframe style="width: 420px; height: 315px" src="https://www.youtube.com/embed/' + mw.html.escape(t[1]) + '" frameborder="0" allowfullscreen></iframe></div>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'qz':   function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/qz]', '');
                 } else {
                     s = s.replace('[qz]', '<table style="width: 600px; color: white; border-spacing: 0px !important; font-family: Comic Sans Ms; box-shadow: 5px -5px 5px grey;"><tr><td colspan="4" style="background: darkolivegreen; font-size: 30px; border-bottom: 10px solid darkolivegreen; border-top: 10px solid darkolivegreen; line-height: 35px;"><center>');
                 }
                 return s;
             },
    'q':    function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/q]', '');
                 } else {
                     s = s.replace('[q]', '<table style="width: 600px; color: white; border-spacing: 0px !important; font-family: Comic Sans Ms; box-shadow: 5px -5px 5px grey;"><tr><td colspan="4" style="background: darkolivegreen; font-size: 30px; border-bottom: 5px solid darkolivegreen; border-top: 10px solid darkolivegreen; line-height: 35px;"><center>');
                 }
                 return s;
             },
    'oap':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/oap]', '');
                 } else {
                     s = s.replace('[oap]', '</center></td></tr><tr><td style="background: olive; width:10px; border: 8px solid darkolivegreen; border-right: none; font-size: 20px; height: 36px; border-top: 8px solid darkolivegreen; border-bottom: 4px solid darkolivegreen; width: 40px; text-align: center;">A.</td><td style="background: olivedrab; border: 8px solid darkolivegreen; font-size: 15px; border-left: none; height: 36px; border-top: 8px solid darkolivegreen; border-bottom: 4px solid darkolivegreen; border-right: 4px solid darkolivegreen; width: 244px;"><font color="olive">.</font>');
                 }
                 return s;
             },
    'obp':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/obp]', '');
                 } else {
                     s = s.replace('[obp]', '</td><td style="background: olive; width:10px; border: 8px solid darkolivegreen; border-right: none; font-size: 20px; height: 36px; border-top: 8px solid darkolivegreen; border-bottom: 4px solid darkolivegreen; width: 40px; text-align: center; border-left: 4px solid darkolivegreen;">B.</td><td style="background: olivedrab; border: 8px solid darkolivegreen; font-size: 15px; border-left: none; height: 36px; border-top: 8px solid darkolivegreen; border-bottom: 4px solid darkolivegreen;"><font color="olive">.</font>');
                 }
                 return s;
             },
    'ocp':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/ocp]', '');
                 } else {
                     s = s.replace('[ocp]', '</td></tr><tr><td style="background: olive; width:10px; border: 8px solid darkolivegreen; border-right: none; font-size: 20px; height: 36px; border-top: 4px solid darkolivegreen; width: 40px; text-align: center;">C.</td><td style="background: olivedrab; border: 8px solid darkolivegreen; font-size: 15px; border-left: none; height: 36px; border-top: 4px solid darkolivegreen; border-right: 4px solid darkolivegreen; width: 244px;"><font color="olive">.</font>');
                 }
                 return s;
             },
    'odp':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/odp]', '');
                 } else {
                     s = s.replace('[odp]', '</td><td style="background: olive; width:10px; border: 8px solid darkolivegreen; border-right: none; font-size: 20px; height: 36px; border-top: 4px solid darkolivegreen; width: 40px; text-align: center; border-left: 4px solid darkolivegreen;">D.</td><td style="background: olivedrab; border: 8px solid darkolivegreen; font-size: 15px; border-left: none; height: 36px; border-top: 4px solid darkolivegreen;"><font color="olive">.</font>');
                 }
                 return s;
             },
    'oak':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/oak]', '');
                 } else {
                    try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', ''); 
                         s = s.replace('[oak="' + t[1] + '"]', '</center></td></tr><tr><td style="background: olive; width:10px; border: 8px solid darkolivegreen; border-right: none; font-size: 20px; height: 36px; border-top: 8px solid darkolivegreen; border-bottom: 4px solid darkolivegreen; width: 40px; text-align: center;">A.</td><td style="background:' + mw.html.escape(t[1]) + '; border: 8px solid darkolivegreen; font-size: 15px; border-left: none; height: 36px; border-top: 8px solid darkolivegreen; border-bottom: 4px solid darkolivegreen; border-right: 4px solid darkolivegreen; width: 244px;"></td>');
                    } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'obk':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/obk]', '');
                 } else {
                    try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', ''); 
                         s = s.replace('[obk="' + t[1] + '"]', '<td style="background: olive; width:10px; border: 8px solid darkolivegreen; border-right: none; font-size: 20px; height: 36px; border-top: 8px solid darkolivegreen; border-bottom: 4px solid darkolivegreen; width: 40px; text-align: center; border-left: 4px solid darkolivegreen;">B.</td><td style="background:' + mw.html.escape(t[1]) + '; border: 8px solid darkolivegreen; font-size: 15px; border-left: none; height: 36px; border-top: 8px solid darkolivegreen; border-bottom: 4px solid darkolivegreen;"></td></tr><tr>');
                    } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'ock':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/ock]', '');
                 } else {
                    try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', ''); 
                         s = s.replace('[ock="' + t[1] + '"]', '<td style="background: olive; width:10px; border: 8px solid darkolivegreen; border-right: none; font-size: 20px; height: 36px; border-top: 4px solid darkolivegreen; width: 40px; text-align: center;">C.</td><td style="background:' + mw.html.escape(t[1]) + '; border: 8px solid darkolivegreen; font-size: 15px; border-left: none; height: 36px; border-top: 4px solid darkolivegreen; border-right: 4px solid darkolivegreen; width: 244px;"></td>');
                    } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'odk':  function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/odk]', '');
                 } else {
                    try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', ''); 
                         s = s.replace('[odk="' + t[1] + '"]', '<td style="background: olive; width:10px; border: 8px solid darkolivegreen; border-right: none; font-size: 20px; height: 36px; border-top: 4px solid darkolivegreen; width: 40px; text-align: center; border-left: 4px solid darkolivegreen;">D.</td><td style="background:' + mw.html.escape(t[1]) + '; border: 8px solid darkolivegreen; font-size: 15px; border-left: none; height: 36px; border-top: 4px solid darkolivegreen;"></td></tr></table></center>');
                    } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'stop': function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/stop]', '');
                 } else {
                     s = s.replace('[stop]', '<div style="padding: 1em; border:4px solid white; background: red; box-shadow: 5px -5px 5px grey; width: 300px; line-height: 25px"><font color="white"><bold><big><big><big><big><center>STOP!<br>Czas minął!</center></big></big></big></big></bold></font></div>');
                 }
                 return s;
             },
    'p':    function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/p]', '');
                 } else {
                     s = s.replace('[p]', '</center></td></tr><tr><td style="background: olive; border: 8px solid darkolivegreen; text-align: center; font-size: 15px; height: 100px;">');
                 }
                 return s;
             },
    'pl':    function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/pl]', '');
                 } else {
                     s = s.replace('[pl]', '<span style="background-color:white">....</span>');
                 }
                 return s;
             },
    'sp':    function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/sp]', '');
                 } else {
                     s = s.replace('[sp]', '<font color="olive">......</font>');
                 }
                 return s;
             },
    'br':    function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/br]', '');
                 } else {
                     s = s.replace('[br]', '<br><br>');
                 }
                 return s;
             },
    'zdj':   function (s,t) {
                 if (chatags.images !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[zdj="' + t[1] + '"]', '</center></td></tr><tr><td style="background: darkolivegreen; border: 8px solid darkolivegreen;"><center><img style="width: 450px" src="http://' + mw.html.escape(t[1]) + '"/></center></td></tr>');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'w':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/w]', '</center></td></tr>');
                 } else {
                     s = s.replace('[w]', '<table border="0" cellpadding="1" cellspacing="1" class="article-table" style="width: 400px; border: 8px solid darkolivegreen; color: white; font-family: Comic Sans Ms; border-spacing: 0px !important; box-shadow: 5px -5px 5px grey;"><tr><td colspan="2" style="background: darkolivegreen; font-size: 30px; border-top: 10px solid darkolivegreen;">');
                 }
                 return s;
             },
    'k1':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/k1]', '');
                 } else {
                     s = s.replace('[k1]', '<tr><td style="background: olive; width:10px; border-right: none; font-size: 20px; width: 60px; text-align: center; height: 36px; border-top: 4px solid darkolivegreen; border-bottom: 4px solid darkolivegreen;">');
                 }
                 return s;
             },
    'k2':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/k2]', '</td></tr>');
                 } else {
                     s = s.replace('[k2]', '</td><td style="background: olivedrab; border-top: 4px solid darkolivegreen; border-bottom: 4px solid darkolivegreen; font-size: 15px; border-left: none; height: 36px;"><font color="olive">.</font>');
                 }
                 return s;
             },
    'pa':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/pa]', '');
                 } else {
                     s = s.replace('[pa]', '<table border="0" cellpadding="1" cellspacing="1" class="article-table" style="width: 400px; border: 8px solid darkolivegreen; color: white; font-family: Comic Sans Ms; border-spacing: 0px; box-shadow: 5px -5px 5px grey;"><tr><td style="background: darkolivegreen; border: 10px solid darkolivegreen; font-size: 30px;"><center>Poprawna odpowiedź:</center></td><td style="background: olive; width:10px; font-size: 20px; width: 33px; text-align: center">A.</td></tr><tr>');
                 }
                 return s;
             },
    'pb':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/pb]', '');
                 } else {
                     s = s.replace('[pb]', '<table border="0" cellpadding="1" cellspacing="1" class="article-table" style="width: 400px; border: 8px solid darkolivegreen; color: white; font-family: Comic Sans Ms; border-spacing: 0px; box-shadow: 5px -5px 5px grey;"><tr><td style="background: darkolivegreen; border: 10px solid darkolivegreen; font-size: 30px;"><center>Poprawna odpowiedź:</center></td><td style="background: olive; width:10px; font-size: 20px; width: 33px; text-align: center">B.</td></tr><tr>');
                 }
                 return s;
             },
    'pc':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/pc]', '');
                 } else {
                     s = s.replace('[pc]', '<table border="0" cellpadding="1" cellspacing="1" class="article-table" style="width: 400px; border: 8px solid darkolivegreen; color: white; font-family: Comic Sans Ms; border-spacing: 0px; box-shadow: 5px -5px 5px grey;"><tr><td style="background: darkolivegreen; border: 10px solid darkolivegreen; font-size: 30px;"><center>Poprawna odpowiedź:</center></td><td style="background: olive; width:10px; font-size: 20px; width: 33px; text-align: center">C.</td></tr><tr>');
                 }
                 return s;
             },
    'pd':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/pd]', '');
                 } else {
                     s = s.replace('[pd]', '<table border="0" cellpadding="1" cellspacing="1" class="article-table" style="width: 400px; border: 8px solid darkolivegreen; color: white; font-family: Comic Sans Ms; border-spacing: 0px; box-shadow: 5px -5px 5px grey;"><tr><td style="background: darkolivegreen; border: 10px solid darkolivegreen; font-size: 30px;"><center>Poprawna odpowiedź:</center></td><td style="background: olive; width:10px; font-size: 20px; width: 33px; text-align: center">D.</td></tr><tr>');
                 }
                 return s;
             },
    'po':     function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/po]', '');
                 } else {
                     s = s.replace('[po]', '<table border="0" cellpadding="1" cellspacing="1" class="article-table" style="width: 400px; border: 8px solid darkolivegreen; color: white; font-family: Comic Sans Ms; border-spacing: 0px; box-shadow: 5px -5px 5px grey;"><tr><td style="background: darkolivegreen; font-size: 30px; border-top: 10px solid darkolivegreen; border-bottom: 20px solid darkolivegreen;"><center>Poprawna odpowiedź:</center></td></tr><tr><td style="background: olive; font-size: 20px; text-align: center; height: 36px; line-height: 25px; border-top: 2px solid olive; border-bottom: 4px solid olive; border-left: 5px solid olive; border-right: 5px solid olive;">');
                 }
                 return s;
             },
    'mem':   function (s,t) {
                 if (chatags.images !== true) return s;
                 if (t.charAt(0) !== '/') {
                     try {
                         t = t.split('="');
                         t[1] = t[1].replace('"', '');
                         s = s.replace('[mem="' + t[1] + '"]', '<div style="border:10px solid black; width: 50%; max-width: 600px; height: 400px;  box-shadow: grey 5px -5px 5px;"><table style="width: 100%; height: 100%; background: url(http://wallpapercave.com/wp/aHkzRLc.jpg); background-size: 100% 100%"><tr><td style="width: 15%"></td><td style="width: 70%"><table style="width: 100%; height:100%; background: url(http://' + mw.html.escape(t[1]) + '); background-size: cover">');
                     } catch(e) { console.log(e) }
                 }
                 return s;
             },
    'napis1': function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/napis1]', '');
                 } else {
                     s = s.replace('[napis1]', '<tr style="height: 25%"><td><center><span style="color: white; text-shadow: black -1px -1px; font-size: 36px;"><bold>');
                 }
                 return s;
             },
    'napis2': function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/napis2]', '');
                 } else {
                     s = s.replace('[napis2]', '</bold></span></center></td></tr><tr style="height: 50%"></tr><tr style="height: 25%; color: white; text-shadow: black"><td><center><span style="color: white; text-shadow: black -1px -1px; font-size: 36px;"><bold>');
                 }
                 return s;
             },
    'm':      function (s,t) {
                 if (t.charAt(0) === '/') {
                     s = s.replace('[/m]', '</bold></span></center></td></tr></table></center></td><td style="width: 15%"></td></tr></table></div></center>');
                 } else {
                     s = s.replace('[m]', '');
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