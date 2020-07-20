/* Chat Options */
importScriptPage('MediaWiki:ChatOptions/code.js', 'dev');
 
// Code bouton des smileys provenant du Wikia Undertale anglais
 
importArticles({
    type: "script",
    articles: [
        "u:kocka:MediaWiki:Emoticons.js"
    ]
});
 
window.kockaEmoticons = {
    vocab: {
        emoticons: "Émoticônes",
        close: "Fermer"
    },
    helpText: "Choisissez un émoticône dans la liste !"
};