/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
/*Ajout d'un bouton permettant de revenir en haut de la page - lié à dev:BackToTopButton */
window.BackToTopModern = true;

// Modèle:EditConflictAlert
window.EditConflictAlertInterval = 5000;
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EditConflictAlert/code.js',
    ]
});

// Modèle:Onglet
$(function() {
    // Si un sous-onglet est "sélectionné", rend aussi les onglets parents "sélectionnés"
    $('.at-selected').parents('.article-tabs li').each(function () {
        $(this).addClass('at-selected');
    });

    // Fixe les marges
    $('.article-tabs .at-selected .article-tabs').each(function () {
        // Obtenir la hauteur des sous-onglets
        var $TabsHeight = $(this).height();

        // Augmente la marge inférieure des onglets principaux
        $(this).parents('.article-tabs').last().css('margin-bottom' , '+=' + $TabsHeight);
    });
});
// Fin de Modèle:Onglet