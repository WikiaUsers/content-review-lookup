/* Le JavaScript plac� ici se chargera uniquement pour les administrateurs */
QuickCommentsreason = "Insertion de d�chets dans les pages";
QuickCommentsdeletereason = "Commentaire inutile";
var Advancedcomments = {
    defaultreason: "Commentaire inutile"
};
importArticles({
    type: 'script',
    articles: [
        'u:dev:QuickComments/code.js',
        'u:dev:QuickComments/advanced.js'
    ]
});