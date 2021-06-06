/*jslint browser */
/*global alert, jQuery, mediaWiki, codeLoad */

(function ($, mw, cl) {
    "use strict";

    function notify(msg, options) {
        if (window.BannerNotification && !notify.banner) {
            notify.banner = new window.BannerNotification();
            notify.typeMap = {
                success: "confirm",
                error: "error"
            };
        }

        if (mw.notification) {
            mw.notification.notify(msg, options);
        } else if (notify.banner) {
            notify.banner.hide();
            notify.banner.setContent(msg);
            if (options.type) {
                notify.banner.setType(notify.typeMap[options.type]);
            }
            notify.banner.show();
        } else {
            alert(msg);
        }
    }

    // clear prefs cache in local storage
    function clearCache() {
        localStorage.removeItem(cl.userDataKey);
        notify(
            mw.message("codeload-clear-cache-success").escaped(),
            {type: "success"}
        );
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
                    .addClass("wds-button")
                    .css("margin-top", "1em")
                    .on("click", clearCache)
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
}(jQuery, mediaWiki, codeLoad));