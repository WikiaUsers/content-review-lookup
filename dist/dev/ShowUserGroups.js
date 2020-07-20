/* [[ShowUserGroups]] - list all groups a user is in on their user page */

/*jslint browser, long */
/*global jQuery, mediaWiki */

(function ($, mw) {
    "use strict";

    // double-run protection
    if (window.loadedShowUserGroups) {
        return;
    }
    window.loadedShowUserGroups = true;

    var inUserNamespace = [2, 3, 1200].indexOf(mw.config.get("wgNamespaceNumber")) !== -1;
    var isOasis = mw.config.get("skin") === "oasis" &&  mw.config.get("wgVersion") === "1.19.24";
    var langEnd = document.dir === "rtl" ? "left" : "right";

    function addGroupsToPage(data, i18n) {
        var groups = data[0].query.users[0].groups;
        var $content = isOasis ? $("<li>") : $("<span>");

        if (!groups) {
            // likely a not-existing or invalid username
            return;
        }

        // remove '*' and 'user' groups
        groups.splice(groups.indexOf("*"), 1);
        groups.splice(groups.indexOf("user"), 1);

        // if provided, run external sorter function
        if (typeof window.ShowUserGroups_sorter === "function") {
            groups.sort(window.ShowUserGroups_sorter);
        }

        // stringify
        groups = groups.join(", ") || i18n.msg("nogroups").plain();

        // add styling for non-Oasis skins
        if (!isOasis) {
            mw.util.addCSS(
                ".ShowUserGroups {"
                    + "font-size: small;"
                    + "float:" + langEnd
                + " }"
                + ".ShowUserGroups-label {"
                    + "font-weight: bold;"
                + "}"
                + ".mw-indicators + .firstHeading > .ShowUserGroups {"
                    + "padding-" + langEnd + ": 0.5em;"
                + "}"
            );
        }

        // add groups + label to newly created element, then add to DOM
        $content
            .addClass("ShowUserGroups")
            .text(" " + groups)
            .prepend(
                $("<span>")
                    .addClass("ShowUserGroups-label")
                    .text(i18n.msg("label").plain())
            );
        $(".masthead-info > .details > ul, #firstHeading").eq(0).append($content);
    }

    function getUserNameFromPage() {
        var userName;

        if (isOasis) {
            // for oasis skin, run on all pages with the user masthead
            userName = $(".masthead-info > hgroup > h1").text();
        } else if (inUserNamespace) {
            // wgRelevantUserName available in MW 1.23+ - fallback to wgTitle when unavailable
            userName = mw.config.get("wgRelevantUserName", mw.config.get("wgTitle").split("/")[0]);
        }

        // ignore anon user pages
        if (mw.util.isIPv4Address(userName) || mw.util.isIPv6Address(userName)) {
            userName = null;
        }

        return userName;
    }

    function main() {
        var userName = getUserNameFromPage();

        if (!userName) {
            return;
        }

        var getGroupsRequest = $.get(mw.util.wikiScript("api"), {
            action: "query",
            format: "json",
            list: "users",
            ususers: userName,
            usprop: "groups"
        });

        mw.hook("dev.i18n").add(function (i18njs) {
            $.when(
                getGroupsRequest,
                i18njs.loadMessages("ShowUserGroups")
            ).done(addGroupsToPage);
        });

        if (!(window.dev && window.dev.i18n && window.dev.i18n.loadMessages)) {
            mw.loader.load("https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:I18n-js/code.js");
        }
    }

    mw.loader.using(["mediawiki.util"], function () {
        $(main);
    });
}(jQuery, mediaWiki));