importArticles({
    type: "script",
    articles: [
        'MediaWiki:Common.js/Reseau.js', // Barre R�seau
    ]
});
/* Spoiler */
SpoilerAlert = {
    question: 'Cette page contient les r�ponses d\'un jeu. �tes-vous s�r(e) de vouloir la consulter ?',
    yes: 'Oui',
    no: 'Finalement, non',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Solutions');
    }
};