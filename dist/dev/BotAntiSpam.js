/**
 * Name:        BotAntiSpam
 * Version:     v1.2
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Simple anti-spam script for Chat.
 */
(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        window.BotAntiSpamLoaded
    ) {
        return;
    }
    window.BotAntiSpamLoaded = true;
    var BotAntiSpam = {
        config: $.extend({
            banAfter: 3,
            time: 5,
            size: 10,
            reason: 'Flooding',
            length: 31536000000,
            lineSep: 1.5,
            links: 10,
            overflow: 300
        }, window.BotAntiSpamConfig),
        init: function(mainRoom) {
            this.data = JSON.parse(localStorage.getItem('BotAntiSpamData') || '{}');
            this.joinTime = Number(new Date());
            this.flood = {};
            this.mainRoom = mainRoom;
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
                this.mainRoom.socket.send(new models.BanCommand({
                    userToBan: user,
                    reason: this.config.reason,
                    time: this.config.length
                }).xport());
            } else {
                this.mainRoom.socket.send(new models.KickCommand({
                    userToKick: user
                }).xport());
            }
            localStorage.setItem('BotAntiSpamData', JSON.stringify(this.data));
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:Chat-js.js'
    });
    mw.hook('dev.chat.render').add($.proxy(BotAntiSpam.init, BotAntiSpam));
})();