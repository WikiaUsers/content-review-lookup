/*jslint browser, long */
/*global require */

require(["jquery", "mw", require.optional("PageActions")], function ($, mw, pageActions) {
    "use strict";

    // should match 'heading' message in [[MediaWiki:Custom-CodeLoad/i18n.json]]
    // note that full i18n isn't loaded here to keep script overhead low
    var msg = {
        ar: "تفضيلات البرنامج النصي",
        be: "Налады скрыпту",
        ca: "Preferències de script",
        en: "Script preferences",
        es: "Preferencias de script",
        fr: "Préférences du script",
        pl: "Preferencje skryptów",
        ru: "Настройки скрипта",
        tr: "Betik tercihleri",
        uk: "Налаштування скрипта"
    };
    // use user language, with English as fallback
    msg = msg[mw.config.get("wgUserLanguage")] || msg.en;

    function main() {
        var prefsUrl = mw.util.getUrl("Special:BlankPage", {blankspecial: "CodeLoadPrefs"});

        // append to 'My Tools' menu in Oasis, 'Toolbox' portlet in MonoBook
        $("#my-tools-menu, #p-tb > .pBody > ul").append(
            $("<li>").append(
                $("<a>")
                    .attr({
                        href: prefsUrl,
                        title: msg
                    })
                    .text(msg)
            )
        );

        // add to shortcuts
        if (pageActions) {
            pageActions.add({
                id: "special:CodeLoadPrefs",
                caption: msg,
                href: prefsUrl,
                category: mw.message("global-shortcuts-category-current-wikia").escaped()
            });
        }
    }

    mw.loader.using("mediawiki.util", function () {
        $(main);
    });
});