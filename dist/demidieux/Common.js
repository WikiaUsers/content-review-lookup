/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

/* Imports de Scripts */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:RemoveLegacyThreads.js', /* Suppression des anciens fils de discussion devenus inaccessibles */
        'MediaWiki:Scroll.js', /* Icône de Scroll */
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