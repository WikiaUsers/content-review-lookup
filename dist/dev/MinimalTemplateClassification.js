/**
 * @name            MinimalTemplateClassification
 * @version         v1.1
 * @author          TheGoldenPatrik1
 * @description     Hides the Template Classification modal descriptions.
 */
(function() {
    'use strict';
    var $link = $('.template-classification-entry-point__toggle');
    if (
        window.MinimalTemplateClassification ||
        $link.length === 0
    ) {
        return;
    }
    window.MinimalTemplateClassification = true;
    var i18n;
    /**
     * @class Main
     * @description Main MinimalTemplateClassification class
     */
    var Main = {
        /**
         * @method click
         * @description Hides or shows the descriptions when clicked
         * @returns {void}
         */
        click: function () {
            var $button = $('.toggle-template-classification-descriptions');
            var $body = $('.template-classification-dialog__description');
            if (window.isMTCTextShown === true) {
                window.isMTCTextShown = false;
                $body.hide();
                $button.text(i18n.msg('show').plain());
            } else {
                window.isMTCTextShown = true;
                $body.show();
                $button.text(i18n.msg('hide').plain());
            }
        },
        /**
         * @method button
         * @description Adds the show/hide button
         * @returns {void}
         */
        button: function () {
            if ($('.toggle-template-classification-descriptions').length) {
                return;
            }
            $('.oo-ui-processDialog-actions-other').append(
                $('<span>', {
                    'class': 'oo-ui-widget oo-ui-widget-enabled oo-ui-buttonElement oo-ui-buttonElement-framed oo-ui-labelElement oo-ui-flaggedElement-safe oo-ui-buttonWidget oo-ui-actionWidget'
                }).append(
                    $('<a>', {
                        'class': 'oo-ui-buttonElement-button',
                        'click': Main.click
                    }).append(
                        $('<span>', {
                            'class': 'oo-ui-labelElement-label toggle-template-classification-descriptions',
                            'text': i18n.msg(
                                window.isMTCTextShown ?
                                'hide' :
                                'show'
                            ).plain()
                        })
                    )
                )
            );        
        },
        /**
         * @method init
         * @description Initiates the script
         * @param {String} i18nData - Variable for I18n-js
         * @returns {void}
         */
        init: function (i18nData) {
            i18n = i18nData;
            if (!window.isMTCTextShown) {
                mw.util.addCSS('.template-classification-dialog__description { display: none; }');
            }
            $link.click(Main.button);
        }
    };
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('MinimalTemplateClassification').then(Main.init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})();