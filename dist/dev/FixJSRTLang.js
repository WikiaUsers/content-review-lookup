require(['wikia.loader'], function (loader) {
    if (
        mw.config.get('wgNamespaceNumber') !== 8 ||
        mw.config.get('wgPageName').slice(-3) !== '.js' ||
        window.FixJSRTLangLoaded
    ) {
        return;
    }
    window.FixJSRTLangLoaded = true;

    var statusRgx = /content-review-status-([^-\s]+)/;

    function loadMWMessagesIfMissing(messages) {
        var deferred = $.Deferred(),
            missingMessages = messages.filter(function (message) { return !mw.messages.exists(message); });
        if (!missingMessages.length) {
            deferred.resolve();
        } else {
            $.get(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'query',
                meta: 'allmessages',
                ammessages: missingMessages.join('|'),
                amlang: mw.config.get('wgUserLanguage')
            }).then(function (data) {
                if ($.isArray(data.query.allmessages)) {
                    $.each(data.query.allmessages, function (_, message) {
                        if (message.missing !== '') {
                            mw.messages.set(message.name, message['*']);
                        }
                    });
                }
                deferred.resolve();
            }, function () {
                // Silently swallow failures; we don't want error reporting to stall just because we failed to fetch some messages.
                deferred.resolve();
            });
        }
        return deferred;
    }

    function execute () {
        $('.content-review-module .content-review-status').each(function (_, el) {
            if (!statusRgx.test(el.className)) {
                return;
            }

            var cls = el.className || '',
                state = cls.match(statusRgx)[1],
                msg = mw.message('content-review-module-status-' + state).text(),
                msgNode = (el.childNodes.length === 1) ? el.childNodes[0] : el.querySelector('a:first-child').nextSibling;

            // NB: Assumptions around where nodes are relative to one another are based on <https://github.com/Wikia/app/blob/release-908.001/extensions/wikia/ContentReview/templates/ContentReviewModuleStatus.mustache>.
            if (msgNode && msgNode.nodeType === Node.TEXT_NODE) {
                if (msgNode.previousSibling) {
                    msg = ' ' + msg;
                }
                // Handle rejections as a special case, per <https://github.com/Wikia/app/blob/release-908.001/extensions/wikia/ContentReview/services/ContentReviewStatusesService.class.php#L293-L295>.
                if (state === 'rejected') {
                    var reasonLinkNode = el.querySelector('a:last-child');
                    if (reasonLinkNode) {
                        // Unfortunately, the message we're after isn't part of any bundle that we can eagerly load;
                        // see <https://github.com/Wikia/app/blob/release-908.001/extensions/wikia/ContentReview/ContentReview.setup.php#L72-L91>.
                        loadMWMessagesIfMissing(['content-review-rejection-reason-link']).then(function () {
                            reasonLinkNode.textContent = mw.message('content-review-rejection-reason-link').text();
                        });
                    }
                    msg += ' (';
                }
                msgNode.textContent = msg;
            }

        });
    }
    
    var $rail = $('.WikiaRail');
    function init () {
        loader({
            type: loader.MULTI,
            resources: {
                messages: 'ContentReviewModule'
            }
        }).then(call);
    }
    function call (d) {
        mw.messages.set(d.messages);
        if ($rail.hasClass('loading')) {
            $rail.on('afterLoad.rail', execute);
        } else {
            execute();
        }
    }
    init();
});