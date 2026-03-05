/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
window.ajaxRefresh = 30000;

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

// Création d'une page Utilisateur
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{:w:User:User1}}',
        3: '{{:w:User:User1/talk}}'
    },
    summary: 'Création de la page Utilisateur',
    notify: '<a href="/wiki/User:$2">Voici un lien vers ta page Utilisateur, $1!</a>'
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

// Intégration d'un Google Doc
mw.hook('wikipage.content').add(function ($content) {

	$content.find('[data-widget-id]:not(.loaded)').each(function () {

		const $container = $(this);
		const rawId = $container.attr('data-widget-id');

		if (!rawId) {
			return;
		}
		const id = encodeURIComponent(rawId);

		if ($container.hasClass('EmbeddedGoogleDoc')) {
			const $iframe = $('<iframe>', {
				src: 'https://docs.google.com/document/d/e/' + id + '/pub?embedded=true',
				allowfullscreen: true
			}).css({
				width: 'inherit',
				height: 'inherit',
				border: '0'
			});
			$container.empty().append($iframe);
		}
		$container.addClass('loaded');
	});
});
// Fin d'Intégration d'un Google Doc