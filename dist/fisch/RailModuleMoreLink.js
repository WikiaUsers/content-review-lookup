(function() {
    'use strict';

    function loadWDSIcons() {
        var deferred = $.Deferred();
        if (!window.dev || !window.dev.wds) {
            importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });
        }
        mw.hook('dev.wds').add(function() {
            deferred.resolve(window.dev.wds);
        });
        return deferred.promise();
    }

    function addMoreLinks() {
        $('.new-pages-rail-module[data-more-link]').each(function() {
            var $module = $(this);
            var moreLink = $module.data('more-link');
            var moreTitle = $module.data('more-title') || 'See more';
            var $moreContainer = $module.children('h2');

            if ($moreContainer.find('.rail-module-more-button').length === 0) {
                loadWDSIcons().done(function(wds) {
                    var $moreButton = $('<a>', {
                        'href': mw.util.getUrl(moreLink),
                        'class': 'wds-button wds-is-text',
                        'id': 'rail-module-more-button',
                        'title': moreTitle,
                        html: wds.icon('menu-control-small').cloneNode(true)
                    });

                    $moreContainer.append($moreButton);
                });
            }
        });
    }

    $(document).ready(addMoreLinks);
    mw.hook('wikipage.content').add(addMoreLinks);
})();