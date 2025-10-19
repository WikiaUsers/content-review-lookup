/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
window.ajaxRefresh = 30000;

/*Ajout d'un bouton permettant de revenir en haut de la page - lié à dev:BackToTopButton */
window.BackToTopModern = true;

/*Modèles Préchargés*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:PreloadTemplates.js'
    ]
});
preloadTemplates_list = "MediaWiki:Custom-PreloadTemplatesList";
preloadTemplates_namespace = 'Modèle';
preloadTemplates_subpage = "case-by-case";

// Modèle:EditConflictAlert
window.EditConflictAlertInterval = 5000;
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:EditConflictAlert/code.js',
    ]
});

// Création d'une page Utilisateur
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{:w:User:User1}}',
        3: '{{:w:User:User1/talk}}'
    },
    summary: 'Création de la page Utilisateur',
};

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