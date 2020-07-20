(function ($, mw) {
    'use strict';
 
    if (window.quickDiffLoaded) {
        return;
    }
    window.quickDiffLoaded = true;
 
 
    var msg = {
       ru: {
            error: 'Что-то пошло не так, во время загрузки страницы на “%url”.',
            loading: 'Загрузка…',
            title: 'Изменения: %pagename'
       },
        en: {
            error: 'Something went wrong while getting the page at “%url”.',
            loading: 'Loading…',
            title: 'Changes: %pagename'
        },
        vi: {
            error: 'Đã có sự cố xảy ra khi tải trang tại đường dẫn “%url”.',
            loading: 'Đang tải…',
            title: 'Thay đổi: %pagename'
        }
    };
    msg = $.extend(msg.en, msg[mw.config.get('wgUserLanguage')]);
 
 
    var specialDiff = {
        en: 'Diff'
    };
    specialDiff = mw.config.get('wgFormattedNamespaces')['-1'] + ':' +
            (specialDiff[mw.config.get('wgContentLanguage')] || specialDiff.en);
 
 
    var currentModal = null;
    var pendingModal = null;
    var uiModalFactory = null;
 
    function updateModal(modal) {
        if (!currentModal) {
            currentModal = modal;
            modal.$buttons = modal.$element.find('> footer > .buttons');
            modal.$content.addClass('WikiaArticle');  // better Oasis styling
            pendingModal['1'] = pendingModal['1'] || msg.loading;
        }
 
        var shouldFire = pendingModal['2'];
        if (pendingModal['1']) {
            modal.setTitle(msg.title.replace('%pagename', pendingModal['1']));
        }
        modal.setContent(pendingModal['0']);
        pendingModal = null;
        modal.$buttons.empty();
 
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
            pendingModal = [content, title, shouldFire];
            return;
        }
 
        pendingModal = [content, title, shouldFire];
        if (currentModal) {
            updateModal(currentModal);
        } else {
            loadModal();
        }
    }
 
 
    function loadDiff(url) {
        showModal('<div class="wikiaThrobber">&nbsp;</div>');
 
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
                'box-sizing: border-box;' +
                'font-size: 13px;' +
                'line-height: 21px;' +
                'overflow: auto;' +
                'position: relative;' + 
            '}'
        );
        $(document.body).on('click.quickdiff', 'a', function (event) {
            var url = new mw.Uri(event.currentTarget.href);
 
            if (url.host !== location.hostname) {
                return;
            }
 
            var hasDiffParam = url.query.diff && !url.fragment;
            var isSpecialDiffLink = event.currentTarget.title.indexOf(specialDiff + '/') === 0;
 
            if (hasDiffParam || isSpecialDiffLink) {
                event.preventDefault();
                loadDiff(url);
            }
        });
    }
 
    $(init);
    mw.hook('quickdiff.ready').add(function (modal) {
        var $buttons = modal.$content.find('.diff-ntitle')
            .find('.mw-rev-head-action > a, .mw-rollback-link > a, .patrollink > a')
            .clone()
            .addClass('button');
 
        modal.$buttons.append($buttons);
    });
 
}(jQuery, mediaWiki));