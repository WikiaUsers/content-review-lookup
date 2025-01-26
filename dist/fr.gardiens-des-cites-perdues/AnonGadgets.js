mw.loader.using(['mediawiki.user', 'mediawiki.api'], function () {
    if (mw.user.isAnon())
        mw.hook('wikipage.content').add(function () {
            if (document.querySelector('.features-toggler-container')) return;
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

                var features;
                try {
                    features = JSON.parse(pages[0].revisions[0].content);
                } catch (e) {
                    console.error('Erreur JSON.');
                    return;
                }

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

                    var localStorageKey = 'FeatureActive-' + feature.id;
                    var storedValue = window.localStorage.getItem(localStorageKey);
                    var isDefault = feature.default === true;
                    var isChecked = storedValue === 'true' || (storedValue === null && isDefault);

                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'wds-toggle__input';
                    checkbox.id = 'feature-toggle-' + feature.id;
                    checkbox.checked = isChecked;

                    checkbox.onchange = (function (feature, isDefault) {
                        return function () {
                            var isActive = this.checked;
                            var localStorageKey = 'FeatureActive-' + feature.id;
                            var activating = (isDefault && !isActive) || (!isDefault && isActive);

                            if (activating) {
                                if (feature.css) importArticle({ type: 'style', article: feature.css });
                                if (feature.js) importArticle({ type: 'script', article: feature.js });
                                window.localStorage.setItem(localStorageKey, isDefault ? 'false' : 'true');
                                mw.notify(isDefault ? 'La fonctionnalité a été désactivée.' : 'La fonctionnalité a été activée.');
                            } else {
                                if (feature.css) $('link[rel="stylesheet"][href*="' + feature.css + '"]').remove();
                                if (feature.js) $('script[src*="' + feature.js + '"]').remove();
                                window.localStorage.setItem(localStorageKey, isDefault ? 'true' : 'false');
                                mw.notify(isDefault ? 'La fonctionnalité a été activée. Rechargez la page pour voir tous les effets.' : 'La fonctionnalité a été désactivée. Rechargez la page pour voir tous les effets.');
                            }
                        };
                    })(feature, isDefault);

                    var label = document.createElement('label');
                    label.className = 'wds-toggle__label';
                    label.setAttribute('for', 'feature-toggle-' + feature.id);
                    label.textContent = feature.title;
                    label.style.fontSize = '14px';
                    label.style.fontWeight = '500';

                    var description = document.createElement('p');
                    description.className = 'feature-description';
                    description.textContent = feature.description;
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
                    console.error('Erreur : sticky-module-wrapper non trouvé.');
                }

                for (var i = 0; i < features.length; i++) {
                    var feature = features[i];
                    var localStorageKey = 'FeatureActive-' + feature.id;
                    var storedValue = window.localStorage.getItem(localStorageKey);
                    var isDefault = feature.default === true;
                    var isChecked = storedValue === 'true' || (storedValue === null && isDefault);

                    if ((isDefault && !isChecked) || (!isDefault && isChecked)) {
                        if (feature.css) importArticle({ type: 'style', article: feature.css });
                        if (feature.js) importArticle({ type: 'script', article: feature.js });
                    }
                }
            }).fail(function () {
                console.error('Erreur API.');
            });
        });
});