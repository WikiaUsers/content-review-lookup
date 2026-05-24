/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
window.ajaxRefresh = 30000;

// Cartes Interactives
/* window.mapsExtendedConfig = {
    "minimalLayout": true,
    "enableSearch": true,
    "enableSidebar": true,
    "sidebarInitialState": "hide",
    "openPopupsOnHover": false,
    "enableFullscreen": true,
    "fullscreenMode": "window"
}; */

importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Scroll.js'
    ]
});

// Création d'une page Utilisateur
window.AutoCreateUserPagesConfig = {
    content: {
        2: '{{:w:User:User1}}',
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

// ----- Modèle Pseudo3D ------
// px of drag required to advance one frame (higher = slower).
window.PseudoSpeed = 7; // default: 10

// enable skybox background parallax on the parent .pi-item.
window.PseudoSkybox = true; // default: false

// skybox pan multiplier (higher = faster).
window.PseudoSkyboxSpeed = 0.07; // default: 0.01

// if you have your own css and want to avoid the split
// second of unstyled css when js is still loading.
window.PseudoImportCSS = false; // default: true