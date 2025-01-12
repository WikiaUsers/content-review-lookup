(function ($, mw) {
    'use strict';

    // Fonction principale
    var ExploreNavToggler = {
        init: function () {
            // Vérifier si la fonctionnalité est activée dans le localStorage
            var isActive = window.localStorage.getItem('ExploreNavHidden') === 'true';
            if (isActive) {
                this.applyCSS();
            }

            // Ajouter un événement de clic sur les éléments avec la classe 'explorenav'
            $('.explorenav').on('click', this.toggleFeature.bind(this));
        },
        
        // Activer le CSS
        applyCSS: function () {
            $('head').append('<style id="explorenav-style">.global-explore-navigation { display: none; }</style>');
        },

        // Désactiver le CSS
        removeCSS: function () {
            $('#explorenav-style').remove();
        },

        // Basculer la fonctionnalité
        toggleFeature: function () {
            var isActive = window.localStorage.getItem('ExploreNavHidden') === 'true';

            if (isActive) {
                // Si activé, désactiver
                this.removeCSS();
                window.localStorage.setItem('ExploreNavHidden', 'false');
            } else {
                // Si désactivé, activer
                this.applyCSS();
                window.localStorage.setItem('ExploreNavHidden', 'true');
            }
        }
    };

    // Initialisation après le chargement de la page
    $(function () {
        ExploreNavToggler.init();
    });

})(window.jQuery, window.mediaWiki);