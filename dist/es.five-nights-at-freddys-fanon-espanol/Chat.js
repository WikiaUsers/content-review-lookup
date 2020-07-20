importScriptPage('ChatOptions/code.js', 'dev');
importScriptPage('ChatTags/code.js', 'dev')
var chatags = { images: true, videos: true };
 
importArticles({
    type: 'script',
    articles: [
        // ...
        'u:kocka:MediaWiki:Emoticons.js',
        // ...
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BlinkingTabAlert.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MessageBlocker/code.js',
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:CustomModIcons.js',
    ]
});

//Estados del chat //
window.ChatStatus = {
statuses: {
afk: "AFK",
edit: "Editando.",
food: "Comiendo.", 
tv: "Escuchando Spotify.",
game: "Durmiendo.",
ufo: "Estudiando.",
cake: "Mirando a boquita.",
book: "Jugando Maincra.",
code: "Sexroleando.",
homo: "Stalkeando.",
notsoos: "Entrenando.",
google: "Plano Espiritual.",
},
debug: false
};