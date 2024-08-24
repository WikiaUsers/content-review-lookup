importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');

/* Chat Options */
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
 
// Code bouton des smileys provenant du Wikia Undertale anglais
 
importArticles({
    type: 'script',
    articles: [
        "u:dev:MediaWiki:ChatOptions/code.js",
        "u:kocka:MediaWiki:Emoticons/code.js"
    ]
});
 
window.kockaEmoticons = {
    vocab: {
        emoticons: "Émoticônes",
        close: "Fermer"
    },
    helpText: "Choisissez un émoticône en cliquant dessus"
};