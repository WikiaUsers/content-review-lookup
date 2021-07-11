/**
* @author      Noreplyz
* @author      TheGoldenPatrik1
* @version     2.1
* @description Adds quick buttons for all template types.
*/
(function() {
    'use strict';
    var config = mw.config.get([
        'wgArticleId',
        'wgContentLanguage',
        'wgNamespaceNumber',
        'wgVersion'
    ]);
    if (
        config.wgNamespaceNumber !== 10 ||
        config.wgArticleId === 0 ||
        window.TemplateTypeButtonsLoaded
    ) {
        return;
    }
    window.TemplateTypeButtonsLoaded = true;
    /**
     * @class Main
     * @classdesc Main TemplateTypeButtons class
     */
    var Main = {};
    /**
     * @type {Array}.{String}
     * @description System messages to get
     */
    Main.messages = [
        'template-classification-type-infobox',
        'template-classification-type-quote',
        'template-classification-type-navbox',
        'template-classification-type-notice',
        'template-classification-type-context-link',
        'template-classification-type-infoicon',
        'template-classification-type-scrollbox', 
        'template-classification-type-references',
        'template-classification-type-media',
        'template-classification-type-data',
        'template-classification-type-design',
        'template-classification-type-navigation',
        'template-classification-type-nonarticle',
        'template-classification-type-unknown',
        'template-classification-edit-modal-success'
    ];
    /**
     * @type {Array}.{String}
     * @description Template types
     */
    Main.types = [
        'infobox',
        'quote',
        'navbox',
        'notice',
        'context-link',
        'infoicon',
        'scrollbox', 
        'references',
        'media',
        'data',
        'design',
        'navigation',
        'nonarticle',
        'unknown'
    ];
    /**
     * @method buttons
     * @description Creates the buttons and changes the type when clicked
     * @param {Function} i18n - Variable for I18n
     */
    Main.buttons = function (i18n) {
        $.each(this.types, function (k, v) {
            // console.log(k, v);
            $('<span>', {
                'class': 'wds-button temptype-button',
                'data-id': v,
                'text': mw.message(Main.messages[k]).plain()
            }).insertAfter('#PageHeader, .page-header__bottom');
        });
        $('.temptype-button').click(function () {
            var that = $(this);
            if (
                $('.template-classification-type-label').text() !==
                that.text()
            ) {
                $.post(mw.util.wikiScript('wikia') + '?' + $.param({
                    controller: 'Fandom\\TemplateClassification\\Api\\ClassificationController',
                    method: 'classifyTemplate',
                    format: 'json'
                }), {
                    articleId: config.wgArticleId,
                    pageId: config.wgArticleId,
                    type: that.data().id,
                    editToken: mw.user.tokens.get('editToken'),
                    token: mw.user.tokens.get('csrfToken')
                }, function (d) {
                    mw.notify(d.status);
                });
            }
        });
    };
    /**
     * @method preload
     * @description Preloads the hook
     */
    mw.loader.using('mediawiki.user').then(
        $.proxy(Main.buttons, Main),
        mw.util.addCSS('.temptype-button { margin: 3px 3px 0 0; padding: 4px 10px; }') // Smaller buttons (more like legacy version)
    );
})();