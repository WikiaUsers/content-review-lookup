importArticles({
    type: 'script',
    articles: [
        'u:kocka:MediaWiki:Emoticons.js',
        'u:dev:AjaxRC/code.js', // Atualiza��o Autom�tica
        'u:dev:ChatHacks.js', // ChatHack
        'u:dev:ChatPMs.js', // Chat M�ltiplo
        'u:xiaolinpedia:MediaWiki:Chat.js/options.js', // Op��es M�ltiplas

    ]
});
 
window.kockaEmoticons = {
    vocab: {
        emoticons: "Emoticons",
        close: "Fechar"
    },
    helpText: "Escolha um emoticon clicando em nele"
};
/* ChatTags criado por User:Shining-Armor */
var chatags = { images: true, videos: true };
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
importScriptPage('MediaWiki:Chat.js/ChatOptions.js', 'pt-br.naruto');
importScriptPage('MediaWiki:ChatAnnouncements/code.js','dev');