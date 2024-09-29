$(document).ready(function () {
    mw.loader.using('mediawiki.api', function () {
        var api = new mw.Api();

        mw.hook('wikipage.content').add(function () {
            const pageName = mw.config.get('wgPageName').replaceAll('_', ' ');;

            function generatePage() {
                var $articleText = $('.noarticletext'); $('#p-views').hide();

                if ($articleText.length) {
                    var index = pageName.indexOf(" Dragon");
                    var dragonName = index !== -1 ? pageName.substring(0, index) : pageName;

                    var $form = $('<div>', {
                        id: 'dragon-form-container',
                        'data-edit': dragonName
                    });

                    var $parent = $articleText.parent(); $parent.empty();
                    $parent.append($form);
                    $articleText.remove();
                }
            }

            if (pageName.indexOf(" Dragon/Edit", pageName.length - " Dragon/Edit".length) !== -1) {
                function initializeWhenDivIsReady(className, callback) {
                    var observer = new MutationObserver(function (mutations, observerInstance) {
                        var elements = document.getElementsByClassName(className);

                        if (elements.length > 0) {
                            observerInstance.disconnect();
                            callback(elements[0]);
                        }
                    });

                    observer.observe(document.body, {
                        childList: true,
                        subtree: true
                    });
                }

                initializeWhenDivIsReady('noarticletext', function () {
                    generatePage();
                });
            }
        });
    });
});