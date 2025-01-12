mw.loader.using(['mediawiki.user', 'mediawiki.api'], function () {
    if (mw.user.isAnon()) {
        return;
    }

    mw.hook('wikipage.content').add(function () {
        // Liste des gadgets
        var nkch_gst_gadgets = [
            {
                name: "Spoilers-9",
                title: "Alertes Spoilers - Tome 9.5",
                description: "M'avertir quand la page contient des spoilers du tome 9.5"
            },
            {
                name: "FluentUI",
                title: "Navigation moderne (recommandé)",
                description: "Adapte l'interface au style du wiki et simplifie la navigation"
            },
            {
                name: "DiscordWidget",
                title: "Bulle Discord",
                description: "Ajoute une bulle pour discuter sur le serveur Discord"
            }
        ];

        // Conteneur principal
        var container = document.createElement('div');
        container.className = 'gadgets-state-toggler-container';
        container.style.marginTop = '24px';

        // Titre
        var title = document.createElement('h2');
        title.className = 'rail-module__header';
        title.textContent = 'Mes paramètres';
        container.appendChild(title);

        // Liste des gadgets
        var list = document.createElement('ul');
        list.className = 'gadgets-list';

        for (var i = 0; i < nkch_gst_gadgets.length; i++) {
            var gadget = nkch_gst_gadgets[i];
            var listItem = document.createElement('li');
            listItem.className = 'gadget-item';

            if (i !== 0) {
                listItem.style.marginTop = '4px';
            }

            // Checkbox
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'wds-toggle__input';
            checkbox.id = 'gst-toggle-' + i;
            checkbox.checked = (mw.loader.getState('ext.gadget.' + gadget.name) === 'ready');

            checkbox.onchange = (function (gadgetName) {
                return function () {
                    var api = new mw.Api();
                    var optionName = 'gadget-' + gadgetName;
                    var optionValue = this.checked ? '1' : '0';

                    api.postWithToken('csrf', {
                        action: 'options',
                        optionname: optionName,
                        optionvalue: optionValue
                    }).done(function () {
                        mw.user.options.set(optionName, optionValue);
                        mw.notify('Les modifications ont été enregistrées. Veuillez recharger la page pour appliquer les changements.');
                    }).fail(function () {
                        mw.notify('Une erreur est survenue lors de la sauvegarde des modifications.', { type: 'error' });
                    });
                };
            })(gadget.name);

            // Label du gadget
            var label = document.createElement('label');
            label.className = 'wds-toggle__label';
            label.setAttribute('for', 'gst-toggle-' + i);
            label.textContent = gadget.title;
            label.style.fontSize = '14px';
            label.style.fontWeight = '500';

            // Description du gadget
            var description = document.createElement('p');
            description.className = 'gadget-description';
            description.textContent = gadget.description;
            description.style.paddingBottom = '5px';
            description.style.lineHeight = '1.4';
            description.style.borderBottom = '1px solid var(--theme-border-color)';
            description.style.color = 'var(--theme-page-text-color)';
            description.style.fontSize = '13px';

            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            listItem.appendChild(description);
            list.appendChild(listItem);
        }

        container.appendChild(list);

        var stickyModulesWrapper = document.querySelector('.sticky-modules-wrapper');
        if (stickyModulesWrapper) {
            stickyModulesWrapper.insertBefore(container, stickyModulesWrapper.firstChild);
        } else {
            console.error('Le conteneur sticky-modules-wrapper n\'a pas été trouvé sur cette page.');
        }
    });
});