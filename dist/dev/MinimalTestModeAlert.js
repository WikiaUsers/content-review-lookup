/* Personal use only */
(function () {
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
        insertAfter: $(mw.config.get('skin') === 'fandomdesktop' ? '.wiki-tools > .wds-button.wds-is-secondary:last' : '.wds-community-header__wiki-buttons > .wds-button.wds-is-secondary:last'),
        html: '<svg class="wds-icon wds-icon-small" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g transform="scale(1.2) translate(-2 -2)"><path d="m5 19a1 1 0 0 0 1 1h12a1 1 0 0 0 1 -1c0-.21-.07-.41-.18-.57l-5.82-10.08v-4.35h-2v4.35l-5.82 10.08c-.11.16-.18.36-.18.57m1 3a3 3 0 0 1 -3 -3c0-.6.18-1.16.5-1.63l5.5-9.56v-1.81a1 1 0 0 1 -1 -1v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1a1 1 0 0 1 -1 1v1.81l5.5 9.56c.32.47.5 1.03.5 1.63a3 3 0 0 1 -3 3h-12m7-6l1.34-1.34 1.93 3.34h-8.54l2.66-4.61 2.61 2.61m-.5-4a.5 .5 0 0 1 .5 .5 .5 .5 0 0 1 -.5 .5 .5 .5 0 0 1 -.5 -.5 .5 .5 0 0 1 .5 -.5z"></path></g></svg>'
    });

    $('.wds-banner-notification').has('#disable-test-mode-link').hide();
})();