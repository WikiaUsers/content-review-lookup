(function($, mw) {
    'use strict';

    var action = mw.config.get('wgAction');
    if (action !== 'edit' && action !== 'submit') return;

    var CONFIG_PAGE = 'MediaWiki:Custom-ForcePreview.json';
    var I18N_NAME = 'ForcePreview';

    var state = {
        originalLabel: '',
        originalTitle: '',
        originalAccesskey: ''
    };

    mw.loader.using(['mediawiki.api', 'mediawiki.util', 'oojs-ui-core']).done(function() {
        loadI18n();
    });

    function loadI18n() {
        mw.hook('dev.i18n').add(function(i18no) {
            i18no.loadMessages(I18N_NAME).done(init);
        });
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }

    function init(i18n) {
        new mw.Api().get({
            action: 'query',
            titles: CONFIG_PAGE,
            prop: 'revisions',
            rvprop: 'content',
            rvslots: 'main',
            formatversion: 2
        }).done(function(data) {
            var config = {
                ExemptUserGroups: [],
                NameSpaces: []
            };
            var page = data.query.pages[0];

            if (page && !page.missing) {
                try {
                    config = JSON.parse(page.revisions[0].slots.main.content);
                } catch(e) {
                    console.warn(i18n.msg('configurationwarning').plain());
                }
            }
            checkConditionsAndApply(config, i18n);
        });
    }

    function checkConditionsAndApply(config, i18n) {
        var userGroups = mw.config.get('wgUserGroups') || [];
        var currentNs = mw.config.get('wgNamespaceNumber');

        if (config.ExemptUserGroups && config.ExemptUserGroups.length > 0) {
            var isExempt = config.ExemptUserGroups.some(function(group) {
                return userGroups.indexOf(group) !== -1;
            });
            if (isExempt) return;
        }

        if (config.NameSpaces && config.NameSpaces.length > 0) {
            if (config.NameSpaces.indexOf(currentNs) === -1) return;
        }

        applyForcePreview(i18n);
    }

    function applyForcePreview(i18n) {
        var $saveWidget = $('#wpSaveWidget');
        var $saveInput = $('#wpSave');
        if (!$saveWidget.length) return;

        var saveButton;
        try {
            saveButton = OO.ui.infuse($saveWidget);
        } catch(e) {
            return;
        }

        state.originalLabel = saveButton.getLabel();
        state.originalTitle = $saveInput.attr('title') || '';
        state.originalAccesskey = $saveInput.attr('accesskey') || '';

        function updateButtonState() {
            var isPreviewing = $('#wikiPreview').is(':visible') || $('#wikiDiff').is(':visible');

            if (isPreviewing) {
                saveButton.setDisabled(false);
                saveButton.setLabel(state.originalLabel);
                $saveInput.attr('title', state.originalTitle);
                if (state.originalAccesskey) {
                    $saveInput.attr('accesskey', state.originalAccesskey);
                }
            } else {
                saveButton.setDisabled(true);

                saveButton.setLabel(i18n.msg('buttontext', state.originalLabel).plain());

                $saveInput.attr('title', i18n.msg('buttontip').plain());
                $saveInput.removeAttr('accesskey');
            }
        }

        updateButtonState();

        mw.hook('wikipage.content').add(function() {
            updateButtonState();
        });
    }

})(window.jQuery, window.mediaWiki);