/* Original code: http://dev.wikia.com/wiki/MediaWiki:QuickDiff/code.js and modified by Dcsuper */
/* Update: 12/09/2016. Check it here to make it up-to-date: http://dev.wikia.com/wiki/MediaWiki:QuickDiff/code.js?action=history */

/* QuickDiff - quickly view any diff link */
 
/*jslint browser, single */
/*global window, jQuery, mediaWiki, require */
 
(function ($, mw) {
    'use strict';
 
    // double-run protection
    if (window.quickDiffLoaded) {
        return;
    }
    window.quickDiffLoaded = true;
 
 
    // translations
    var msg = {
        en: {
            error: 'Đã có sự cố xảy ra khi tải trang tại đường dẫn “%url”.',
            loading: 'Đang tải…',
            title: 'Thay đổi: %pagename'
        },
        vi: {
            error: 'Đã có sự cố xảy ra khi tải trang tại đường dẫn “%url”.',
            loading: 'Đang tải…',
            title: 'Thay đổi: %pagename'
        }
    };
    // use user language, with English as fallback
    msg = $.extend(msg.en, msg[mw.config.get('wgUserLanguage')]);
 
 
    // used to detect "Special:Diff/12345" links
    // must be equal to the language's default alias for Special:Diff
    // as of 2016-09-12, only the en translation seems to be available on Wikia
    var specialDiff = {
        en: 'Diff'
    };
    specialDiff = mw.config.get('wgFormattedNamespaces')['-1'] + ':' +
            (specialDiff[mw.config.get('wgContentLanguage')] || specialDiff.en);
 
 
    var currentModal = null;
    var pendingModal = null;
    var uiModalFactory = null;
 
    function updateModal(modal) {
        //initialise if new modal
        if (!currentModal) {
            currentModal = modal;
            modal.$buttons = modal.$element.find('> footer > .buttons');
            modal.$content.addClass('WikiaArticle');  // better Oasis styling
            pendingModal['1'] = pendingModal['1'] || msg.loading;
        }
 
        // update modal content + clear pending data
        var shouldFire = pendingModal['2'];
        if (pendingModal['1']) {
            modal.setTitle(msg.title.replace('%pagename', pendingModal['1']));
        }
        modal.setContent(pendingModal['0']);
        pendingModal = null;
        modal.$buttons.empty();
 
        // fire event handlers if needed
        if (shouldFire) {
            mw.hook('quickdiff.ready').fire(modal);
        }
 
        modal.show();
    }
 
    function loadModal() {
        if (uiModalFactory) {
            uiModalFactory.createComponent({
                vars: {
                    content: '',
                    id: 'quickdiff-modal',
                    size: 'large'
                },
                confirmCloseModal: function () {
                    currentModal = null;
                    return true;
                }
            }, updateModal);
        } else {
            require(['wikia.ui.factory'], function (uiFactory) {
                uiFactory.init('modal').then(function (uiModal) {
                    uiModalFactory = uiModal;
                    loadModal();
                });
            });
        }
    }
 
    function showModal(content, title, shouldFire) {
        if (pendingModal) {
            // modal is pending update - replace previous content with latest
            pendingModal = [content, title, shouldFire];
            return;
        }
 
        pendingModal = [content, title, shouldFire];
        if (currentModal) {
            // modal is ready - update content
            updateModal(currentModal);
        } else {
            // no modal loaded
            loadModal();
        }
    }
 
 
    function loadDiff(url) {
        showModal('<div class="wikiaThrobber">&nbsp;</div>');
 
        // add 'action=render' and 'diffonly' params to save some bytes on each request
        url.extend({
            action: 'render',
            diffonly: '1'
        });
 
        var urlString = url.toString();
        $.get(urlString).always(function (content) {
            var $content = null;
            var valid = false;
 
            if (typeof content === 'string') {
                $content = $(content);
            }
 
            if ($content && $content.hasClass('diff')) {
                valid = true;
            }
 
            // not diff, but instead a complete page - see if a diff can be found
            // needed for diffs from Special:Diff / Special:Undelete, as they ignore action=render URL parameter
            if (!valid && $content) {
                var $contentDiff = $content.find('table.diff');
                if ($contentDiff.length) {
                    $content = $contentDiff;
                    content = $contentDiff.prop('outerHTML');
                    valid = true;
                }
            }
 
            if (valid) {
                var title = $content.find('#mw-diff-ntitle1 > strong > a').attr('title');
                mw.loader.using('mediawiki.action.history.diff', function () {
                    showModal(content, title, true);
                });
            } else {
                showModal(msg.error.replace('%url', urlString));
            }
        });
    }
 
    function init() {
        mw.util.addCSS(
            '#quickdiff-modal > section {' +
                'box-sizing: border-box;' +  // prevent overflowing in IE 11
                'font-size: 13px;' +         // better MonoBook font styling
                'line-height: 21px;' +
                'overflow: auto;' +          // defaults to visible on .WikiaArticle in message wall / forum namespaces
                'position: relative;' +      // prevent throbber showing over title
            '}'
        );
 
        // attach to body for compatibility with ajax-loaded content
        // also, one attached event handler is better than hundreds!
        $(document.body).on('click.quickdiff', 'a', function (event) {
            var url = new mw.Uri(event.currentTarget.href);
 
            // cannot load cross-domain
            if (url.host !== location.hostname) {
                return;
            }
 
            // has diff param + no fragment (prevents triggering by section links on diff pages)
            var hasDiffParam = url.query.diff && !url.fragment;
            var isSpecialDiffLink = event.currentTarget.title.indexOf(specialDiff + '/') === 0;
 
            if (hasDiffParam || isSpecialDiffLink) {
                event.preventDefault();
                loadDiff(url);
            }
        });
    }
 
    $(init);
 
 
    // collect action links (edit, undo, rollback, patrol) and add them to modal footer
    mw.hook('quickdiff.ready').add(function (modal) {
        var $buttons = modal.$content.find('.diff-ntitle')
            .find('.mw-rev-head-action > a, .mw-rollback-link > a, .patrollink > a')
            .clone()
            .addClass('button');
 
        modal.$buttons.append($buttons);
    });
 
}(jQuery, mediaWiki));