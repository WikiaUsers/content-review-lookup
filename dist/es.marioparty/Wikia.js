// CHAT OPCI�N:
importScriptPage('MediaWiki:ChatOptions.js/es.js', 'pintorkagamine');
 
// IMPORTANDO SCRIPT:
importArticles({
    type: "script",
    articles: [
        // Chat-Tags
         "MediaWiki:Chat.js/ChatTags.js",
        // Dropdown
        "MediaWiki:Chat.js/Dropdown.js",
        // !Kick
        "u:dev:!kick/code.js",
        // Alerta del MP
        "u:dev:MediaWiki:PrivateMessageAlert/code.js"
    ]
});
 
// CHAT ANUNCIOS:
//Permite al usuario hacer anuncios a trav�s del chat.
//Para utilizarlo, escribe /announce (acci�n).
importScriptPage('ChatAnnouncements/code.js','dev');
chatAnnouncementsAll = true;