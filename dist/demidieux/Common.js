/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
window.enableReadProgressBarOnArticles = true;

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

/* Problème réglé : Affichage des Succès sur les Pages Utilisateurs (<br />s considérés comme du texte au lieu d'être un élément HTML) - Par LucyKuranSKYDOME */
function fixBadgeBreaks(root = document) {
    root.querySelectorAll('.profile-hover-text p').forEach(function (paragraph) {
        const walker = document.createTreeWalker(
            paragraph,
            NodeFilter.SHOW_TEXT
        );

        const nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        nodes.forEach(function (node) {
            node.nodeValue = node.nodeValue.replace(
                /\s*<br\s*\/?>\s*/gi,
                ' '
            );
        });
    });
}

fixBadgeBreaks();

new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            if (node.nodeType !== Node.ELEMENT_NODE) {
                return;
            }

            if (node.matches('.profile-hover-text')) {
                fixBadgeBreaks(node.parentNode);
            } else if (node.querySelector('.profile-hover-text')) {
                fixBadgeBreaks(node);
            }
        });
    });
}).observe(document.body, {
    childList: true,
    subtree: true
});
/**/