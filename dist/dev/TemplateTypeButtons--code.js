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
    Main.isUCP = config.wgVersion !== '1.19.24';
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
            console.log(k, v);
            $('<span>', {
                'class': (Main.isUCP ? 'wds-button' : 'button') + ' temptype-button',
                'data-id': v,
                'text': Main.isUCP ?
                    mw.message(Main.messages[k]).plain() :
                    i18n()[k]
            }).insertAfter('#PageHeader');
        });
        $('.temptype-button').click(function () {
            var that = $(this);
            if (
                $('.template-classification-type-label').text() !==
                that.text()
            ) {
                $.post(mw.util.wikiScript('wikia') + '?' + $.param({
                    controller: Main.isUCP ?
                        'Fandom\\TemplateClassification\\Api\\ClassificationController' :
                        'TemplateClassificationApi',
                    method: 'classifyTemplate',
                    format: 'json'
                }), {
                    articleId: config.wgArticleId,
                    pageId: config.wgArticleId,
                    type: that.data().id,
                    editToken: mw.user.tokens.get('editToken'),
                    token: mw.user.tokens.get('csrfToken')
                }, function (d) {
                    if (Main.isUCP) {
                        mw.notify(d.status);
                    } else {
                        new BannerNotification(
                            i18n(14),
                            'confirm'
                        ).show();
                    }
                });
            }
        });
    };
    /**
     * @method init
     * @description Initiates the script by getting the messages
     * @param {Function} fetch - Variable for Fetch
     */
    Main.init = function (fetch) {
        fetch({
            lang: config.wgContentLanguage,
            messages: this.messages
        }).then($.proxy(this.buttons, this));
    };
    /**
     * @method preload
     * @description Preloads the hook
     */
    Main.preload = function () {
        mw.hook('dev.fetch').add(
            $.proxy(this.init, this)
        );
    };
    mw.loader.using('mediawiki.user').then(
        Main.isUCP ?
            $.proxy(Main.buttons, Main) :
            $.proxy(Main.preload, Main)
    );
    if (!Main.isUCP) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:Fetch.js'
        });
    }
})();