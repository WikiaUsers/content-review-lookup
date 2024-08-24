SpoilerAlert = {
    question: 'Esta p�gina contiene Spoilers. �Seguro quieres leerla?',
    Si: 'Si, Por Favor',
    no: 'No, a�n no',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');

importArticles({
    type: "script",
    articles: [Joanna Beauchamp
    ]
});