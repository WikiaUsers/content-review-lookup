/* Personal use only */
(function () {
    if (mw.config.get('wgVersion') === '1.19.24') {
        if (
            window.MinimalTestModeAlertLoaded ||
            !$('.wds-community-header').exists() ||
            !mw.config.get('wgContentReviewTestModeEnabled')
        ) {
            return;
        }
        window.MinimalTestModeAlertLoaded = true;
    
        //Hide banner container
        $('.wds-banner-notification__container').hide();
    
        function disableTestMode () {
            $.nirvana.sendRequest({
                controller: 'ContentReviewApiController',
                method: 'disableTestMode',
                callback: function () {
                    new Wikia.Querystring().addCb().goTo();
                },
                onErrorCallback: function (e) {
                    console.error('[MinimalTestMode] ' + e);
                }
            });
        }
    
        function main (msg) {
            $('.wds-community-header__wiki-buttons > .wds-button.wds-is-secondary:last').after($('<a>', {
                class: 'wds-button wds-is-secondary',
                title: msg,
                click: disableTestMode,
                html: '<svg class="wds-icon wds-icon-small" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g transform="scale(1.2) translate(-2 -2)"><path d="m5 19a1 1 0 0 0 1 1h12a1 1 0 0 0 1 -1c0-.21-.07-.41-.18-.57l-5.82-10.08v-4.35h-2v4.35l-5.82 10.08c-.11.16-.18.36-.18.57m1 3a3 3 0 0 1 -3 -3c0-.6.18-1.16.5-1.63l5.5-9.56v-1.81a1 1 0 0 1 -1 -1v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1a1 1 0 0 1 -1 1v1.81l5.5 9.56c.32.47.5 1.03.5 1.63a3 3 0 0 1 -3 3h-12m7-6l1.34-1.34 1.93 3.34h-8.54l2.66-4.61 2.61 2.61m-.5-4a.5 .5 0 0 1 .5 .5 .5 .5 0 0 1 -.5 .5 .5 .5 0 0 1 -.5 -.5 .5 .5 0 0 1 .5 -.5z"></path></g></svg>'
            }));
            
            //If we don't make it time to trick Wikia into not showing the banner, we should attempt to hide it
            if ($('.wds-banner-notification .content-review-module-test-mode-disable').exists()) {
                $('.wds-banner-notification .content-review-module-test-mode-disable').parent().parent().hide();
            }
    
            //Show banner container
            $('.wds-banner-notification__container').fadeIn();
            
            //Reset `wgContentReviewTestModeEnabled` if it wasn't changed back in the require below
            if (!mw.config.get('wgContentReviewTestModeEnabled')) {
                mw.config.set('wgContentReviewTestModeEnabled', true);
            }
        }
        
        //By the time we run, Wikia will have already `require`d `ext.wikia.contentReview.testMode`,
        //so all we can do is trick it into not running the bulk of `showTestModeNotification` and then clean up.
        mw.config.set('wgContentReviewTestModeEnabled', false);
        require(['ext.wikia.contentReview.testMode'], function () {
            mw.config.set('wgContentReviewTestModeEnabled', true);
        });
    
        if (mw.messages.get('content-review-module-test-mode-disable')) {
            main(mw.messages.get('content-review-module-test-mode-disable'));
        } else {
            mw.loader.using('mediawiki.api').done(function () {
                new mw.Api().get({
                    action: 'query',
                    meta: 'allmessages',
                    ammessages: 'content-review-module-test-mode-disable',
                    format: 'json'
                }).done(function (d) {
                    main(d.query.allmessages[0]["*"]);
                });
            });
        }
    } else {
        if (window.MinimalTestModeAlertLoaded || !mw.config.get('wgIsTestModeEnabled')) {
            return;
        }
        window.MinimalTestModeAlertLoaded = true;
    
        function exitTestMode () {
            mw.loader.using('mediawiki.util').then(function () {
                $.ajax({
                    url: mw.util.wikiScript('wikia') + '?controller=ContentReview&method=disableTestMode&format=json',
                    method: 'POST',
                    data: {
                        token: mw.user.tokens.get('editToken')
                    }
                }).done(function () {
                    location.reload();
                }).fail(function (e) {
                    console.error('[MinimalTestMode] ' + e);
                });
            });
        }
    
        $('<a>', {
            class: 'wds-button wds-is-secondary',
            title: mw.messages.get('content-review-module-test-mode-disable'),
            click: exitTestMode,
            insertAfter: $('.wds-community-header__wiki-buttons > .wds-button.wds-is-secondary:last'),
            html: '<svg class="wds-icon wds-icon-small" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g transform="scale(1.2) translate(-2 -2)"><path d="m5 19a1 1 0 0 0 1 1h12a1 1 0 0 0 1 -1c0-.21-.07-.41-.18-.57l-5.82-10.08v-4.35h-2v4.35l-5.82 10.08c-.11.16-.18.36-.18.57m1 3a3 3 0 0 1 -3 -3c0-.6.18-1.16.5-1.63l5.5-9.56v-1.81a1 1 0 0 1 -1 -1v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1a1 1 0 0 1 -1 1v1.81l5.5 9.56c.32.47.5 1.03.5 1.63a3 3 0 0 1 -3 3h-12m7-6l1.34-1.34 1.93 3.34h-8.54l2.66-4.61 2.61 2.61m-.5-4a.5 .5 0 0 1 .5 .5 .5 .5 0 0 1 -.5 .5 .5 .5 0 0 1 -.5 -.5 .5 .5 0 0 1 .5 -.5z"></path></g></svg>'
        });
    
        $('.wds-banner-notification').has('#disable-test-mode-link').hide();
    }
})();