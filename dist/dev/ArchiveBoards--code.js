/**
 * Script Name: ArchiveBoards
 * Author: SuperSajuuk
 * Credits: UltimateSupreme, Shining-Armor, Dantman
 *
 * Disable posting rights in specific boards.
 * Useful for creating archive boards and
 * enforcing local policy / community consensus
 *
 * See the documentation page for update info
 * Used files: [[File:ArchiveBoards lock.png]]
 *
 * Version: 1.1.0
 */

/* global mediaWiki */
(function ($, mw) {
    "use strict";

    window.ArchiveBoards = window.ArchiveBoards || {};
    if (window.ArchiveBoards.loaded) {
        return;
    }
    window.ArchiveBoards.loaded = true;
    var config = window.ArchiveBoards;
    var i18n, groups;
    console.log("This wiki is using ArchiveBoards, which will soon become an obsolete wiki-wide script and is now deprecated. It will only continue to operate as long as Special:Forum remains: once the wiki has been converted to use Discussions, this script will cease to function and should be removed from your wiki.");

    // Default usergroups. We cannot allow these ones to be overwritten.
    // If overwritten, this will violate Fandom TOU on customisation.
    var groupDefaults = [
        "threadmoderator",
        "sysop",
        "soap",
        "helper",
        "wiki-manager",
        "staff"
    ];

    // Configuration caching.
    var mwconfig = mw.config.get([
        "wgArticlePath",
        "wgCanonicalSpecialPageName",
        "wgNamespaceNumber",
        "wgTitle",
        "wgUserGroups"
    ]);

    // Some needed functions.
    // Is the user in an "allowed" group?
    function isAllowed(groups) {
        for (var i = groups.length; i >= 0 ; i--) {
            if (mwconfig.wgUserGroups.indexOf(groups[i]) > -1) {
                return true;
            }
        }
        return false;
    }

    function isArchived(name) {
        return $.inArray(name, config.boards) > -1;
    }

    function constructNotice(cls) {
        return $("<div>", {
            "class": cls + " ArchiveBoardsNotice"
        }).append(
            $("<table>", {
                "class": (config.style ? "ArchiveBoardsInline" : "ArchiveBoardsDefault"),
                style: config.style
            }).append(
                $("<td>", {
                    html: config.boardNotice
                })
            )
        );
    }

    // Main script.
    // Viewing Special:Forum?
    function forum() {
        if (config.post) {
            return;
        }
        $("li.board").each(function() {
            var $name = $(this).find("div.heading > h4 > a");
            var name = $name.text();

            if (isArchived(name)) {
                // Add a padlock image.
                $name.after(
                    " ",
                    $("<img>", {
                        alt: i18n.msg("alt").plain(),
                        "class": "ArchiveBoardsHelp",
                        height: 20,
                        src: "https://vignette.wikia.nocookie.net/dev/images/6/69/ArchiveBoards_lock.png/revision/latest/scale-to-width-down/20",
                        title: i18n.msg("title").plain(),
                        width: 20
                    })
                );
            }
        });
    }

    // Viewing the forum namespace?
    function board() {
        if (config.post && isAllowed(groups)) {
            return;
        }
        if (isArchived(mwconfig.wgTitle)) {
            $(".ForumNewMessage").remove();

            // Make the new notice.
            constructNotice("forumClosed").insertAfter(".board-description");
        }
    }

    // Viewing the thread namespace?
    function thread() {
        // Reconfigure the threads if they're in a matching board.
        if (!isArchived(new mw.Title(
            decodeURIComponent(new mw.Uri(
                $(".page-header__page-subtitle nav a:eq(1)").attr("href")
            ).path.replace(
                mwconfig.wgArticlePath.replace("$1", ""),
                ""
            ))
        ).getMainText())) {
            return;
        }
        // Remove the New Reply block and "Edit Topics" button.
        $("li.new-reply, li.edit-topic").remove();

        // Add the notice.
        constructNotice("ClosedBoard").insertBefore("h4.related-topics-heading");

        // Remove the buttons based on the array. Default is to exclude admins/Fandom Staff/SOAP.
        // Exclusion means local sysops and Fandom Staff can reopen threads that were accidentally
        // "closed" due to the script.
        if (!isAllowed(groups)) {
            $("div.buttonswrapper").remove();
        }
    }

    // Prevent posting from the Topic namespace
    function topic() {
        $.each(config.boards, function(i, v) {
            $("#BoardList option[value='" + v + "']").remove();
        });
    }

    function init(i18nd) {
        i18n = i18nd;
        config = $.extend({
            boards: [],
            boardNotice: i18n.msg("back").parse(),
            threadNotice: i18n.msg("closed").parse(),
            groupCustom: [],
            threads: true,
            post: false
        }, config);
        groups = $.merge(config.groupCustom, groupDefaults);
        if (mwconfig.wgCanonicalSpecialPageName === "Forum") {
            forum();
        } else if (mwconfig.wgNamespaceNumber === 2000) {
            board();
        } else if (mwconfig.wgNamespaceNumber === 1201) {
            if (config.threads) {
                thread();
            }
        } else if (mwconfig.wgNamespaceNumber === 2002) {
            topic();
        }
    }

    function hook(i18no) {
        i18no.loadMessages("ArchiveBoards").then(init);
    }

    mw.hook("dev.i18n").add(hook);
    importArticles(
        {
            type: "script",
            article: "u:dev:MediaWiki:I18n-js/code.js"
        },
        {
            type: "style",
            article: "u:dev:MediaWiki:ArchiveBoards.css"
        }
    );
}(jQuery, mediaWiki));