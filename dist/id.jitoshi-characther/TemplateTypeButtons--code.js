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
        'wgNamespaceNumber',
        'wgUserLanguage'
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
     */
    Main.buttons = function () {
        $.each(this.types, function (k, v) {
            $('<span>', {
                'class': 'wds-button temptype-button',
                'data-id': v,
                'text': mw.message('template-classification-type-' + v).plain()
            }).insertAfter('#PageHeader, .page-header__bottom');
        });
        $('.temptype-button').click(function () {
            var that = $(this);
            if (
                $('.template-classification-type-label').text() !==
                that.text()
            ) {
                $.post(mw.util.wikiScript('wikia') + '?' + $.param({
                    controller: 'Fandom\\TemplateClassification\\Api\\Classification',
                    method: 'classifyTemplate',
                    format: 'json'
                }), {
                    articleId: config.wgArticleId,
                    pageId: config.wgArticleId,
                    type: that.data().id,
                    token: mw.user.tokens.get('csrfToken'),
                    uselang: config.wgUserLanguage
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
    mw.loader.using(['ext.fandom.tcs.dialog.js', 'mediawiki.user']).then(
        Main.buttons.bind(Main),
        mw.util.addCSS('.temptype-button { margin: 3px 3px 0 0; padding: 4px 10px; }') // Smaller buttons (more like legacy version)
    );
})();