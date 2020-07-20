/* RelatedDiscussionsModule - CSS - Version 1.6          */
/*                                                       */
/* Script by Eladkse                                     */
/* Using code by Lunarity                                */
/* Multi-language support adapted from script by Dantman */
(function() {
    var $discussion = $('#mw-content-text > #RelatedForumDiscussion'),
        $rail = $('#WikiaRail');
    if (
        !$discussion.exists() ||
        !$rail.exists() ||
        window.RelatedDiscussionsModuleLoaded
    ) {
        return;
    }
    function place(i18n) {
        console.log(i18n);
        var $ads = $('.rail-sticky-module');
        if ($ads.exists()) {
            $discussion.insertBefore($ads);
        } else {
            $rail.append($discussion);
        }
        $discussion
            .addClass('rail-module')
            .find('h2')
            .text(i18n.msg('relatedDiscuss').plain());
    }
    function load() {
        var promise = $.Deferred();
        if ($rail.hasClass('loaded')) {
            promise.resolve();
        } else {
            console.log('Setting load listener');
            $rail.on('afterLoad.rail', function() {
                promise.resolve();
            });
        }
        return promise;
    }
    function init(i18n) {
        $.when(
            i18n.loadMessages('RelatedDiscussionsModule'),
            load()
        ).then(place);
    }
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:RelatedDiscussionsModule.css'
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(init);
})();