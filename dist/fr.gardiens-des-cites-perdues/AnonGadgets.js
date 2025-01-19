mw.loader.using(['mediawiki.user', 'mediawiki.api'], function () {
  if (mw.user.isAnon())
    mw.hook('wikipage.content').add(function () {
        // Chargement de la liste des fonctionnalités depuis MediaWiki:Custom-features-list.json
        var api = new mw.Api();
        api.get({
            action: 'query',
            prop: 'revisions',
            titles: 'MediaWiki:Custom-features-list.json',
            rvprop: 'content',
            formatversion: 2
        }).done(function (data) {
            var pages = data.query.pages;
            if (!pages || !pages[0] || !pages[0].revisions || !pages[0].revisions[0].content) {
                console.error('Erreur : liste non trouvée.');
                return;
            }

            // Parsing du contenu JSON
            var features;
            try {
                features = JSON.parse(pages[0].revisions[0].content);
            } catch (e) {
                console.error('Erreur JSON.');
                return;
            }

            // Conteneur principal
            var container = document.createElement('div');
            container.className = 'features-toggler-container';
            container.style.marginTop = '24px';

            var title = document.createElement('h2');
            title.className = 'rail-module__header';
            title.textContent = 'Mes paramètres';
            container.appendChild(title);

            var list = document.createElement('ul');
            list.className = 'features-list';

            for (var i = 0; i < features.length; i++) {
                var feature = features[i];

                var listItem = document.createElement('li');
                listItem.className = 'feature-item';
                listItem.style.marginTop = '4px';

                // Checkbox
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'wds-toggle__input';
                checkbox.id = 'feature-toggle-' + feature.id;
                checkbox.checked = (window.localStorage.getItem('FeatureActive-' + feature.id) === 'true');

                checkbox.onchange = (function (feature) {
                    return function () {
                        var isActive = this.checked;
                        var localStorageKey = 'FeatureActive-' + feature.id;

                        if (isActive) {
                            // Charger CSS/JS
                            if (feature.css) {
                                importArticle({ type: 'style', article: feature.css });
                            }
                            if (feature.js) {
                                importArticle({ type: 'script', article: feature.js });
                            }
                            window.localStorage.setItem(localStorageKey, 'true');
                            mw.notify('La fonctionnalité a été activée.');
                        } else {
                            // Désactiver CSS/JS
                            if (feature.css) {
                                $('link[rel="stylesheet"][href*="' + feature.css + '"]').remove();
                            }
                            if (feature.js) {
                                $('script[src*="' + feature.js + '"]').remove();
                            }
                            window.localStorage.setItem(localStorageKey, 'false');
                            mw.notify('La fonctionnalité a été désactivée. Rechargez la page pour appliquer tous les effets.');
                        }
                    };
                })(feature);

                // Label pour la checkbox
                var label = document.createElement('label');
                label.className = 'wds-toggle__label';
                label.setAttribute('for', 'feature-toggle-' + feature.id);
                label.textContent = feature.title;
                label.style.fontSize = '14px';
                label.style.fontWeight = '500';

                // Description
                var description = document.createElement('p');
                description.className = 'feature-description';
                description.textContent = feature.description;
                description.style.paddingBottom = '5px';
                description.style.lineHeight = '1.4';
                description.style.borderBottom = '1px solid var(--theme-border-color)';
                description.style.color = 'var(--theme-page-text-color)';
                description.style.fontSize = '13px';

                // Ajout des éléments dans la liste
                listItem.appendChild(checkbox);
                listItem.appendChild(label);
                listItem.appendChild(description);
                list.appendChild(listItem);
            }

            container.appendChild(list);

            // Ajouter le module dans le rail de droite
            var stickyModulesWrapper = document.querySelector('.sticky-modules-wrapper');
            if (stickyModulesWrapper) {
                stickyModulesWrapper.insertBefore(container, stickyModulesWrapper.firstChild);
            } else {
                console.error('Erreur : sticky-module-wrapper non trouvé.');
            }

            // Activer les fonctionnalités déjà enregistrées
            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                if (window.localStorage.getItem('FeatureActive-' + feature.id) === 'true') {
                    if (feature.css) {
                        importArticle({ type: 'style', article: feature.css });
                    }
                    if (feature.js) {
                        importArticle({ type: 'script', article: feature.js });
                    }
                }
            }
        }).fail(function () {
            console.error('Erreur API.');
        });
    });
});