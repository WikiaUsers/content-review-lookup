/* Spoiler alert */
SpoilerAlert = {
    question: 'Cette page contient des spoilers. La lire est � vos risques et p�rils. Souhaitez-vous vraiment la faire appara�tre ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};


/* Scripts import�s */
importArticles({
    type: 'script',
    articles: [
        'u:dev:SpoilerAlert/code.js', /* Spoiler alert */
    ]
});