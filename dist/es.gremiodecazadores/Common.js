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

// Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;February;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

// Etiqueta Inactivo
InactiveUsers = { text: 'Durmiente' };

importArticles({
    type: "style",
    articles: [
        "w:c:dev:FontAwesome/code.css"
    ]
});