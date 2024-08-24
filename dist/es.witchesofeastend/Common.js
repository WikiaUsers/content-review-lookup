SpoilerAlert = {
    question: 'Esta página contiene Spoilers. ¿Seguro quieres leerla?',
    Si: 'Si, Por Favor',
    no: 'No, aún no',
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