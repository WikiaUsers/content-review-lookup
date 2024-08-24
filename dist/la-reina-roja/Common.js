/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */

// Etiqueta Inactivo
InactiveUsers = { text: 'Perdida en acci�n' };

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
    question: '�ADVERTENCIA! Esta p�gina contiene SPOILERS o informaci�n tentativa que tal vez<br />no desees saber. �A�n as� quieres leer la informaci�n?',
    yes: 'Si, por favor',
    no: 'No, a�n no',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoilers');
    }
};
// - end -  Spoiler and Not Final Alert