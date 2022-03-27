/*'''importScriptPage('User:Monchoman45/ChatHacks.js', 'c');''' */

/*'''importScriptURI('http://botcentral.wikia.com/index.php?title=Auto-Warner&action=raw&ctype=text/javascript');''' */

/*Remember not to add the '*/' or '/*' just keep it plain and simple */

//<syntaxhighlight lang="javascript">
// Swearing crap. Auto kick
var pingToKickList = [
  "\\bfuck",
  "\\bmotherfuck",
  "\\bshit\\b",
  "\\bshitt",
  "\\bbitch",
  "\\bcunt",
  "\\bwhore\\b",
  "\\bCharlie Foxtrot",
  "\\bgtfo\\b",
  "\\bstfu\\b",
  "\\bwtf\\b",
  "\\bidfk\\b",
  "\\bidfc\\b",
  "\\bidgaf\\b",
  "\\bidefk\\b",
  "\\bjfc\\b",
  "\\bomf",
  "\\bffs\\b",
  "\\bw t f",
  "\\bmilf\\b"
];

var SLUR_LIST = [
  "\\bnigg",
  "\\bniglet\\b",
  "\\bfag\\b",
  "\\bfagg"
];

// Is after
$.fn.isAfter = function(sel) {
    return this.prevAll(sel).length !== 0;
};

// Send function
var send = function (m) {
    mainRoom.socket.send(new models.ChatEntry({
        roomId: this.roomId,
        name: mw.config.get('wgUserName'),
        text: m
    }).xport());
},

// Function itself.
PMActRoom,
wasInactive = false;
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') == 'Chat') {
        $('.Chat').on('DOMNodeInserted', function(e) {
            if (! $('#' + e.target.id).isAfter('.inline-alert') ) {
                return;
            }
            var msg = $.parseHTML(e.target.innerHTML)[7];
            var mee = $(".User .username").html();
            var mid = e.target.id;
            var userToKick = e.target.getAttribute('data-user');
            if (userToKick == mee) return;
            if (msg !== void 0) {
                for (var i = 0; i < pingToKickList.length; i++) {
                    if (new RegExp(pingToKickList[i], "mi").test(msg.innerHTML) === true) {
                        send(userToKick + ', please don\'t swear!');
                    }
                }
                // ban for slurs
                for (var i = 0; i < SLUR_LIST.length; i++) {
                    if (new RegExp(SLUR_LIST[i], "mi").test(msg.innerHTML) === true) {
                        send(userToKick + ', please don\'t use that language.');
                    }
                }
            }
        });
    }
});
// </syntaxhighlight>