/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// Etiqueta Inactivo
InactiveUsers = { text: 'Perdida en acción' };

importArticles({
    type: "script",
    articles: [
        "w:c:dev:MediaWiki:Countdown/code.js"
    ]
});

importArticles({
    type: 'script',
    articles: [
        // ...
        'w:c:dev:ReferencePopups/custom.js',
        // ...
    ]
});

// Spoiler and Not Final Alert
SpoilerAlert = {
    question: '¡ADVERTENCIA! Esta página contiene SPOILERS o información tentativa que tal vez<br />no desees saber. ¿Aún así quieres leer la información?',
    yes: 'Si, por favor',
    no: 'No, aún no',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};
// - end -  Spoiler and Not Final Alert