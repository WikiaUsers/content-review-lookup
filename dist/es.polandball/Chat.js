// Permitir imagenes y videos en chat tags //
 
var chatags = { images: true, videos: true };

// Nunca se pone nada debajo de import articles 

importArticles({
    type: 'script',
    articles: [
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatTags/code.js',
        'u:es.halflife:MediaWiki:Tags-import.js',
        'u:kocka:MediaWiki:Emoticons.js',
         "u:dev:IsTyping/code.js",
    ]
});

/* Insignias del chat 
importScriptPage('MediaWiki:ClassicModIcons.js', 'dev');
 
.ChatWindow .chatmoderator .badge,
.ChatWindow .vstf .badge,
.ChatWindow .helper .badge,
.ChatWindow .sysop .badge {
    background-image: url('URL') !important; /* mod icon */
}
/*.ChatWindow .staff .badge {
    background-image: url('URL') !important; /* staff icon */
}