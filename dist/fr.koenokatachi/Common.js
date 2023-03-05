/* 
Wiki Koe no Katachi
JavaScript créé le 14 février 2021 à 17:45
Version actuelle du 14 février 2021 à 17:45
*/

/* Module AddRailModule (crédits : Undertale Wiki) */
(function() {
	// Configuration du module AddRailModule
    var ns = mw.config.get('wgNamespaceNumber');
    window.AddRailModule = (
        !localStorage.getItem('spoiler-warning') &&
        [0, 6, 14].indexOf(mw.config.get('wgNamespaceNumber')) !== -1
    ) ? [
        {
            page: 'Modèle:RailModule',
            prepend: true
        }
    ] : [];

	
    // Déplace le module vers le haut de la page et sous la publicité affichée
    // Crée un listener afin de retirer le module une fois le bouton cliqué
    mw.hook('AddRailModule.module').add(function(module) {
        if (module === 'Modèle:RailModule') {
            var $module = $('#WikiaRail .railModule');
            $module.find('#spoiler-warning-button').click(function() {
                localStorage.setItem('spoiler-warning', '1');
                $module.slideToggle();
            });
        }
    });

    mw.hook('DiscordIntegrator.added').add(function() {
        var $content = $('#WikiaRail .railModule');
        $content.insertBefore('.DiscordIntegratorModule');
    });
})();