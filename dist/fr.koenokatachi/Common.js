/* 
Wiki Koe no Katachi
JavaScript cr�� le 14 f�vrier 2021 � 17:45
Version actuelle du 14 f�vrier 2021 � 17:45
*/

/* Module AddRailModule (cr�dits : Undertale Wiki) */
(function() {
	// Configuration du module AddRailModule
    var ns = mw.config.get('wgNamespaceNumber');
    window.AddRailModule = (
        !localStorage.getItem('spoiler-warning') &&
        [0, 6, 14].indexOf(mw.config.get('wgNamespaceNumber')) !== -1
    ) ? [
        {
            page: 'Mod�le:RailModule',
            prepend: true
        }
    ] : [];

	
    // D�place le module vers le haut de la page et sous la publicit� affich�e
    // Cr�e un listener afin de retirer le module une fois le bouton cliqu�
    mw.hook('AddRailModule.module').add(function(module) {
        if (module === 'Mod�le:RailModule') {
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