// Bouton de Navigation moderne
mw.loader.using(['mediawiki.api'], function () {
    if (mw.user.isAnon()) {
        return;
    }

    function activerNavigationModerne() {
        var api = new mw.Api();
        var optionName = 'gadget-NavigationModerne';
        var optionValue = '1';

        api.postWithToken('csrf', {
            action: 'options',
            optionname: optionName,
            optionvalue: optionValue
        }).done(function () {
            mw.user.options.set(optionName, optionValue);
            mw.notify('Le gadget Navigation moderne a été activé. Veuillez recharger la page pour appliquer les changements.');
        }).fail(function () {
            mw.notify('Une erreur est survenue lors de l\'activation du gadget.', { type: 'error' });
        });
    }

    document.addEventListener('click', function (e) {
        var target = e.target;

        if (target.classList && target.classList.contains('activer-personnalisation')) {
            // Désactive l'action si l'option est déjà activée
            if (mw.user.options.get('gadget-NavigationModerne') === '1') {
                mw.notify('Le gadget Navigation moderne est déjà activé.');
                return;
            }

            activerNavigationModerne();
        }
    });
});