importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/Reseau.js', // Barre Réseau
    ]
});
/* Spoiler */
SpoilerAlert = {
    question: 'Cette page contient les réponses d\'un jeu. Êtes-vous sûr(e) de vouloir la consulter ?',
    yes: 'Oui',
    no: 'Finalement, non',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Solutions');
    }
};