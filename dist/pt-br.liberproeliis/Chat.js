

importArticles({
    type: 'script',
    articles: [
        'u:dev:FandomizedChat/code.js',
        'u:dev:MediaWiki:!kick/pt-br/code.js',
        'u:dev:MediaWiki:!ban/code.js',
        'u:dev:ChatMessageWallCount.js',
        'u:kocka:MediaWiki:Emoticons/code.js',
        'u:dev:MediaWiki:!mods/code.js',
        'u:dev:ChatAvatarUserPageLink.js',
        'u:dev:ChatImages/code.js',
    ]
});

window.EmoticonsWindowConfig = {
    chatOptionsIntegration: true
};

importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

importScriptPage('MediaWiki:ChatNotifications/code.js', 'dev');

window.EmoticonsWindowConfig = {
    chatOptionsIntegration: true
};

window.EmoticonsWindowVocab = {
    help: "Clicar em um emoticon o fará aparecer em sua caixa de texto!!"
};