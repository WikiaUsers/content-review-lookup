$(document).ready(function () {
    mw.loader.using('mediawiki.api', function () {
        mw.hook('wikipage.content').add(function () {
            var pageName = mw.config.get('wgPageName').replaceAll('_', ' ');
            var namespaceNumber = mw.config.get('wgNamespaceNumber');
            var action = mw.config.get('wgAction');
            var contentModel = mw.config.get('wgPageContentModel');
            var user = mw.config.get('wgUserName');
            var userId = mw.config.get('wgUserId');
            var userGroups = mw.config.get('wgUserGroups') || [];

            function generatePage($element, $views, callback) {
                if ($element.length) {
                    if ($views.length) { $views.hide();}
                    callback($element);
                }
            }

            var api = new mw.Api();
            DataHelpers.loadJsonData(api, 'Data:' + 'PageViews' + '.json').then(function (config) {
                config.forEach(function (page) {
                    var matchesAll = page.enabled === undefined ? true : page.enabled;

                    if (page.matcher) {
                        if (page.matcher.pagePattern)
                            matchesAll = matchesAll && new RegExp(page.matcher.pagePattern).test(pageName);

                        if (page.matcher.namespace)
                            matchesAll = matchesAll && namespaceNumber === page.matcher.namespace;

                        if (page.matcher.editMode)
                            matchesAll = matchesAll && action === page.matcher.editMode;

                        if (page.matcher.contentModel)
                            matchesAll = matchesAll && contentModel === page.matcher.contentModel;

                        if (page.matcher.whitelist)
                            if(page.matcher.whitelist.includes(userId) || page.matcher.whitelist.includes(user))
                                matchesAll = false;

                        if (page.matcher.excludeAdmin === true)
                            if (userGroups.includes('sysop'))
                                matchesAll = false
                    }

                    if (user && matchesAll) {
                        DataHelpers.initializeWhenSelectorReady(page.selector, function ($element, _) {
                            setTimeout(function () {
                                generatePage($element, page.views.length ? $(page.views.join(',')) : null, function ($element) {
                                    var $newElement = $('<' + page.tag + '>', {
                                        id: page.id,
                                        class: page.class,
                                        'data-page': pageName
                                    });

                                    var $parent = $element.parent();
                                    $parent.empty().append($newElement);
                                    $element.remove();
                                });
                            }, 100);
                        });
                    }
                });
            })
            .catch(function (error) {
                console.error(error);
            });
        });
    });
});