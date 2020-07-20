/*
 * @name        TDLChatBot.js
 * @description Browser-based chatbot JS, certain sections are modified from ChatLogger and BotAntiSpam.
 * @author     Dorumin, KockaAdmiralac, TheGoldenPatrik1, Qstlijku, TheKorraFanatic.
 */

// Imports
window.logInterval = 900000;
if (wgCityId == '1534124') {
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatLogger.js',
        'u:dev:Chat-js.js'
    ]
});

// BotAntiSpam
 (function() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' || window.BotAntiSpamLoaded) {
        return;
    }
    window.BotAntiSpamLoaded = true;
    var BotAntiSpam = {
        config: $.extend({
            banAfter: 3,
            time: 5,
            size: 10,
            reason: 'Automatically banned for misbehaving in chat.',
            length: 86400,
            lineSep: 1.5,
            links: 10,
            overflow: 300
        }, window.BotAntiSpamConfig),
        init: function() {
            this.data = JSON.parse(localStorage.getItem('BotAntiSpamData') || '{}');
            this.joinTime = Number(new Date());
            this.flood = {};
            mainRoom.model.chats.bind('afteradd', $.proxy(this.onMessage, this));
        },
        onMessage: function(msg) {
            var attr = msg.attributes,
                user = attr.name,
                time = attr.timeStamp,
                text = attr.text;
            if (time < this.joinTime) {
                return;
            }
            var match = text.match(/https?:\/\//g);
            if (match && match.length > this.config.links) {
                this.execute(user);
                return;
            }
            var lines = Math.ceil(text.split('\n').length / this.config.lineSep) +
                        Math.round(text.length / this.config.overflow);
            for (var i = 0; i < lines; ++i) {
                this.flood[user] = this.flood[user] || [];
                this.flood[user].push(time);
                if (this.flood[user].length > this.config.size) {
                    this.flood[user].shift();
                    if ((time - this.flood[user][0]) / 1000 <= this.config.time) {
                        this.execute(user);
                    }
                }
            }
        },
        execute: function(user) {
            this.data[user] = (this.data[user] || 0) + 1;
            if (this.data[user] === this.config.banAfter) {
                delete this.data[user];
                mainRoom.socket.send(new models.BanCommand({
                    userToBan: user,
                    reason: this.config.reason,
                    time: this.config.length
                }).xport());
            } else {
                mainRoom.socket.send(new models.KickCommand({
                    userToKick: user
                }).xport());
            }
            localStorage.setItem('BotAntiSpamData', JSON.stringify(this.data));
        }
    };
    $($.proxy(BotAntiSpam.init, BotAntiSpam));
})();
 
// Word filters
 var words = ['fuck', 'hahaha', 'oo hoo', 'hehehe'],
    mainRoom;
mw.hook('dev.chat').add(function (chat) {
    if (wgCityId != '1534124') return;
    mainRoom.socket.bind('chat:add', function(msg) {
        var send = function(m) {
            mainRoom.socket.send(new models.ChatEntry({
            roomId: this.roomId,
            name: mw.config.get('wgUserName'),
            text: String(m)
            }).xport());
        };
        var data = JSON.parse(msg.data).attrs,
        user = mainRoom.model.users.findByName(data.name),
        since = user.attributes.since[0] * 1000 || Date.now();
        if (new RegExp(words.join('|').toUpperCase(), 'm').test(data.text) && Date.now() - since < 1000 * 60 * 60 * 24 * 30) {
            mainRoom.socket.send(JSON.stringify({
                attrs: {
                    msgType: 'command',
                    command: 'ban',
                    userToBan: data.name,
                    time: 86400,
                    reason: 'Automatically banned for misbehaving in chat.'
                }
            }));
        }
// Chat commands
        switch (data.text) {
            case '!test':
                send('!pass');
                break;
            case '!party':
                send('You say a party? C\'mon, let\'s party! (dance)');
                break;
            case '!rules':
                send('[[Project:Wiki Policy]]');
                break;
            case '!rp':
                send('[[Project:Role-play Guidelines]]');
                break;
            case '!mos':
                send('[[Project:Manual of Style]]');
                break;
            case '!help':
                send('If you have questions about the bot or its coding, please contact either [[Message_Wall:Qstlijku|Qstlijku]] or [[Message_Wall:TheKorraFanatic|TheKorraFanatic]]. For a list of commands, please use !commands.');
                break;
            case '!commands':
                send('All defined commands are: !test, !party, !rules, !rp, !mos, !help ');
                break;
            case '!reply':
                send('https://the-demons-light.fandom.com/f/p/3287928419647652604 I want you to reply.');
                break;                
        }
    });
});
}