window.logInterval = 900000;
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatLogger.js',
        'u:kocka:User:KockaAdmiralac/BotAntiSpam.javascript',
    ]
});
 
 var words = ['fuck', 'hahaha',],
    mainRoom;
mw.hook('dev.chat').add(function (chat) {
    mainRoom.socket.bind('chat:add', function(msg) {
        var data = JSON.parse(msg.data).attrs;
        if (new RegExp(words.join('|').toUpperCase(), 'm').test(data.text)) {
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
    });
});
importArticle({
    type: 'script',
    article: 'u:dev:Chat-js.js'
});