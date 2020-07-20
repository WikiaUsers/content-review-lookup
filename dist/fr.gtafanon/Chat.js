importScriptPage('ChatOptions/code.js', 'dev');
importArticles( {
    type: 'script',
    articles: [
        // ...
        'u:dev:!kick/code.js', // Ajoute la commande !kick pour éjecter
        'u:dev:!mods/code.js', // Ajoute la commande !mods pour promouvoir
        'u:dev:ChatTags/code.js', // Ajoute des tags HTML similaires au BBCode
        'u:dev:ChatBlockButton/code.2.js', // Ajoute un bouton "Bloquer" sur le chat
        // ...
    ]
} );

/* !kick */
window.absentMessage = '<user> n\'est pas sur le chat.';