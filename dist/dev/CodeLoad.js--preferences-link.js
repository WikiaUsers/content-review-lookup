/*jslint browser, long */
/*global jQuery, mediaWiki, require */

(function ($, mw) {
    "use strict";

    // should match 'heading' message in [[MediaWiki:Custom-CodeLoad/i18n.json]]
    // note that full i18n isn't loaded here to keep script overhead low
    var msg = {
        ar: "تفضيلات البرنامج النصي",
        be: "Налады скрыпту",
        bg: "Предпочитания за скриптове",
        ca: "Preferències de script",
        el: "Προτιμήσεις σεναρίου",
        en: "Script preferences",
        es: "Preferencias de script",
        fi: "Skriptiasetukset",
        fr: "Préférences du script",
        hi: "स्क्रिप्ट प्राथमिकताएँ",
        hr: "Postavke skripte",
        ja: "スクリプト設定",
        ka: "სკრიპტის პარამეტრები",
        ko: "스크립트 설정",
        pl: "Preferencje skryptów",
        "pt-br": "Preferências de script",
        ru: "Настройки скрипта",
        tr: "Komut dosya tercihleri",
        uk: "Налаштування скрипта",
        "zh-hans": "脚本首选项",
        "zh-hant": "腳本首選項"
    };
    // use user language, with English as fallback
    msg = msg[mw.config.get("wgUserLanguage")] || msg.en;

    function main() {
        var prefsUrl = mw.util.getUrl("Special:BlankPage", {blankspecial: "CodeLoadPrefs"});

        // append to 'My Tools' menu in Oasis, 'Toolbox' portlet in MonoBook
        $("#my-tools-menu, #p-tb > .pBody > ul").append(
            $("<li>").append(
                $("<a>").attr({
                    href: prefsUrl,
                    title: msg
                }).text(msg)
            )
        );

        // add to shortcuts
        if (window.require) {
            require([require.optional("PageActions")], function (pageActions) {
                if (pageActions) {
                    pageActions.add({
                        id: "special:CodeLoadPrefs",
                        caption: msg,
                        href: prefsUrl,
                        category: mw.message("global-shortcuts-category-current-wikia").escaped()
                    });
                }
            });
        }
    }

    mw.loader.using("mediawiki.util", function () {
        $(main);
    });
}(jQuery, mediaWiki));