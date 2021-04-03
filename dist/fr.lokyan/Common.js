SpoilerAlert = {
    question: 'Bienvenue, ceci est un wiki personnel d'école, ou des enfants font travailler leurs imagination, merci de respecter ceux-ci ! Toutes les informations inclus sur ce wiki sont purement fictifs. Êtes-vous sûr(e) de vouloir la lire ?',
    yes: 'Oui',
    no: 'Non',
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('LoKy');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');