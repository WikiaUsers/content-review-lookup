/* Spoiler alert */
SpoilerAlert = {
    question: 'Cette page contient des spoilers. La lire est à vos risques et périls. Souhaitez-vous vraiment la faire apparaître ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};


/* Scripts importés */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SpoilerAlert/code.js', /* Spoiler alert */
    ]
});