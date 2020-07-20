/**
 * @name            MinimalTemplateClassification
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @description     Hides the Template Classification modal descriptions.
 */
require([
    'wikia.window',
    'jquery',
    'mw',
], function (window, $, mw) {
    'use strict';
    var $link = $('a.template-classification-type-text');
    if (
        window.MinimalTemplateClassification ||
        !$link.exists()
    ) {
        return;
    }
    window.MinimalTemplateClassification = true;
    var $body;
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
            var $button = $('#toggle-template-classification-descriptions');
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
            $body  = $('label > div > p');
            $('#blackout_TemplateClassificationEditModal .buttons').append(
                $('<button>', {
                    'type': 'button',
                    'class': 'button normal secondary',
                    'click': Main.click,
                    'text':
                        i18n.msg(
                            window.isMTCTextShown ?
                            'hide' :
                            'show'
                        ).plain(),
                    'id': 'toggle-template-classification-descriptions'
                })
            );        
        },
        /**
         * @method wait
         * @description Checks to see if the modal exists yet
         * @returns {void}
         */
        wait: function () {
            if ($('#TemplateClassificationEditModal').length) {
                Main.button();
            } else {
                Main.delay();
            }
        },
        /**
         * @method delay
         * @description Gives the modal time to load
         * @returns {void}
         */
        delay: function () {
            setTimeout(
                Main.wait,
                500
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
                mw.util.addCSS('label > div > p { display: none; }');
            }
            if ($('#TemplateClassificationEditModal').length) {
                Main.button();
            }
            $link.click(Main.delay);
        }
    };
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('MinimalTemplateClassification').then(Main.init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});