importScriptPage('ChatOptions/code.js', 'dev');
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js',
        // ...
    ]
} );
window.absentMessage = '<user> is currently not at the chat.';
importScriptPage('!kick.js', 'dev');
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!mods/code.js',
        // ...
    ]
} );
importScriptPage('CapsFirst/code.js', 'dev');
importScriptPage('ChatAnnouncements/code.js','dev');
importArticles( {
    type: 'script',
    articles: [
        "u:dev:tictactoe/code.js"
    ]
} );