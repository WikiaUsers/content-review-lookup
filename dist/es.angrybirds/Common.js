var WikiaNotificationMessage = "<a href='/wiki/Usuario_Blog:Tobias_Alcaraz/Ayuda_a_la_wiki'>¿Quieres ayudar a la wiki? ¡Lea este artículo para saber más!</a>";
var WikiaNotificationexpiry = 0;
importScriptPage('WikiaNotification/code.js', 'dev');

window.MessageWallUserTags = {
    //...other options...
    users: {
        'Tobias Alcaraz': 'Administrador • Moderador del Chat',
    }
};

// Importe del parallax.
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Parallax.js'
    ]
});

// Ultima edición

importArticles({
    type: 'script',
    articles: [
        // ...
        'u:dev:LastEdited/code.js',
        // ...
    ]
});

// Ultima edición - CONFIGURACIÓN.

window.lastEdited = {
    avatar: false,
    size: true,
    diff: true,
    comment: true,
    time: 'timestamp',
    lang: 'es',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};

// Prueba de Uso - CONTDOWN
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});

// RailWAM

window.railWAM = {
    logPage:"Project:WAM Log"
};