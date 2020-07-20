/*jslint browser */
/*global require */

require([
    "jquery",
    "mw",
    "fosl.codeload",
    "BannerNotification"
], function ($, mw, cl, Banner) {
    "use strict";

    var banner = new Banner(
        mw.message("codeload-clear-cache-success").escaped(),
        "confirm"
    );

    // clear prefs cache in local storage
    function clearCache() {
        localStorage.removeItem(cl.userDataKey);
        banner.hide().show();
    }

    function main() {
        var $notice = $("#mw-clearyourcache");

        $notice
            .css("margin-bottom", "1em")
            .msg("codeload-user-page-info");

        // add necessary querystring to CodeLoad prefs page link
        // the link should always exist, but a broken translation
        // may mean it's missing so better to explicitly check
        var blankLink = $notice.find("a[title='Special:BlankPage']")[0];

        if (blankLink) {
            blankLink.href += "?blankspecial=CodeLoadPrefs";
        }

        // if cache is in use, add a clear cache button
        if (cl.localStorageIsUsable) {
            $("#mw-content-text").append(
                $("<span>")
                    .addClass("button")
                    .click(clearCache)
                    .msg("codeload-clear-cache")
            );
        }
    }

    $.when(
        cl.messagesReady,
        mw.loader.using(["mediawiki.jqueryMsg"])
    ).done(function () {
        $(main);
    });
});