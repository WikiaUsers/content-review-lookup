
$(document.body).append('<audio src="https://vignette.wikia.nocookie.net/fanonverse3/images/d/d7/Replay_your_Nightmare.ogg/revision/latest?cb=20200218201012&path-prefix=es" controls autoplay loop class="musica"></audio><style>.musica { position:fixed; bottom:1rem; right:10rem; opacity:0.5; } .musica:hover { opacity:1; }</style>');
 
var chatags = { images: true, videos: true };

window.pingEveryone = {
    modsOnly: false, 
    color: 'inherit',
    phrase: '',
    titleAlert: 'Chat',
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EmoticonsWindow/code.js',    
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:MediaWiki:ChatStatus/code.js',
        'u:dev:ChatTags/code.js',
        'u:dev:MediaWiki:PingEveryone/code.js',
        'u:dev:MediaWiki:NewMessageCount.js',
        'u:dev:MediaWiki:IsTyping.js',
        'u:dev:MediaWiki:ChatOptions/code.js',
        // 'u:dev:MediaWiki:ChatToolbox/code.js',
        'u:dev:MediaWiki:ChatSendButton.js'
    ]
});