/* 
Any JavaScript here will be loaded for all users on every page load.
*/

/* Table of Contents
-----------------------
 Deferred [mw.loader.using]
 * (Y00) importScripts (at top, so it doesn't get affected by other scripts)
 * (W00) Small scripts
 * (W01) Scripts that are attached to wikipage content load
 * (C00) My Block ID
 * (D00) Anchor Hash Links
 * (Y01) Less
 * (Y02) Less Source Updater

 Immediately Executed
 * (X00) importJS pre-script actions
*/

/* jshint
    esversion: 5, esnext: false, forin: true,
    immed: true, indent: 4,
    latedef: true, newcap: true,
    noarg: true, undef: true,
    undef: true, unused: true,
    browser: true, jquery: true,
    onevar: true, eqeqeq: true,
    multistr: true, maxerr: 999999,
    forin: false,
    -W082, -W084
*/

/* global mw, importScripts, BannerNotification */

// code snippet from https://stackoverflow.com/questions/46041831/copy-to-clipboard-with-break-line
function copyToClipboard(text) {
    var $temp = $("<textarea>");
    var brRegex = /<br\s*[\/]?>/gi;
    $("body").append($temp);
    $temp.val(text.replace(brRegex, "\r\n")).select();
    document.execCommand("copy");
    $temp.remove();
    if (BannerNotification)
        new BannerNotification($("<div>", {
            html: "<div>Copied to clipboard</div>",
        }).prop("outerHTML"), "confirm", null, 2000).show();
}

mw.loader.using(["mediawiki.api", "mediawiki.util", "mediawiki.Uri"]).then(function () {
    var api = new mw.Api();
    var conf = mw.config.get([
        "wgUserGroups",
        "wgEditCount",
        "wgPageName",
        "wgSiteName",
        "wgFormattedNamespaces",
        "wgServer",
        "profileUserId",
        "wgNamespaceNumber",
        "wgAction",
        "wgContentLanguage",
    ]);

    //##############################################################
    /* ==importArticles== (Y00)*/
    // Imports scripts from other pages/wikis.
    window.importScripts = function (pages) {
        if (!Array.isArray(pages)) {
            pages = [pages];
        }
        pages.forEach(function (v) {
            var match = v.match(/^(?:u|url):(.+?):(.+)$/);
            var wiki = match && match[1] || (conf.wgServer.replace("https://", "").replace(".fandom.com", ""));
            var match2 = (match && match[2] || v).match(/^(\w\w):(.+)$/);
            var serverlang = conf.wgContentLanguage;
            var langcode = match2 ? ("/" + match2[1]) : (match ? "" : serverlang === "en" ? "" : ("/" + serverlang));
            var page = "/" + (match2 ? match2[2] : match ? match[2] : v);
            var url = "https://" + wiki + ".fandom.com" + langcode + page + "?action=raw&ctype=text/javascript&redirect=no";
            $.ajax({
                url: url,
                dataType: "script",
                cache: true,
            }).then(function () {
                console.log(v + ": Imported Successfully!");
            });
        });
    };
    // Please note that ES5 script imports are moved to MediaWiki:ImportJS
    // ES6 scripts needs to be imported here
    // (for convenience to promptly disable any script at any time)
    importScripts([
        "MediaWiki:Common.js/skydate.js",
        "MediaWiki:Common.js/search.js"
    ]);

    //##############################################################
    /* ==Small scripts== (W00)*/

    // Small script to change wall text
    $("a[title=\"Message Wall\"]").html("wall");
    $("a.external, a[rel^=\"noreferrer\"]").removeAttr("target");

    // Add custom "focusable" class
    $(".focusable").attr("tabindex", 0);

    // Add comment guidelines notice (wiki/fandom staff/users with > 100 edits exempt)
    if (!/bureaucrat|sysop|codeeditor|content-moderator|threadmoderator|rollback|util|staff|helper|global-discussions-moderator|wiki-manager|soap/.test(conf.wgUserGroups.join("\n")) && conf.wgEditCount < 100) {
        api.get({
                action: "parse",
                text: "{{MediaWiki:Custom-comment-guidelines-notice}}",
                contentmodel: "wikitext"
            })
            .done(function (data) {
                if (!data.error)
                    $("#articleComments").before($(data.parse.text["*"]));
            });
    }

    // Script to make linking comments easier
    if (conf.wgPageName.startsWith(new mw.Title("Comment", -1))) {
        var split = conf.wgPageName.split("/").slice(1);
        if (split.length) {
            window.location.replace(new mw.Uri(mw.util.getUrl(split[0]) + "?" + $.param({
                commentId: split[1],
                replyId: split[2]
            })));
        }
    }

    $(document.body).on("click", "ul[class^=\"ActionDropdown_list__\"] > li:first-of-type, [class^=\"Comment_wrapper__\"]", function (e) {
        if (e.ctrlKey) {
            if ($("[class^=\"EditorForm_editor-form\"]").length) return;

            var el = $(e.target).parents("[class^=\"Comment_wrapper__\"]");
            var replyId = el.attr("data-reply-id");

            window.navigator.clipboard.writeText("[[Special:Comment/" + conf.wgPageName + "/" + el.attr("data-thread-id") + (replyId ? "/" + replyId : "") + "|comment]]");
        }
    });

    // Small script to change wiki activity/article comments links, and display comment/reply IDs
    var canBlock = /bureaucrat|sysop|util|staff|helper|global-discussions-moderator|wiki-manager|content-team-member|soap/.test(conf.wgUserGroups.join("\n"));

    function changeActivityLinks() {
        $(".recent-wiki-activity__details a:contains('A Fandom user')").each(function () {
            var user = decodeURIComponent($(this).attr("href")).replace(
                new RegExp(mw.util.getUrl("") + conf.wgFormattedNamespaces[2] + ":|" + new mw.Title("Contributions", -1).getUrl() + "/"), ""
            );

            // Don't reveal IP's if the user is not an admin/bureaucrat/global groups
            if (!canBlock && mw.util.isIPAddress(user, true)) return;

            $(this).text(user);
        });
    }

    if ($(".right-rail-wrapper").length) {
        var activityInter = setInterval(function () {
            if ($("#wikia-recent-activity").length) {
                clearInterval(activityInter);
                changeActivityLinks();
            }
        }, 200);
    }

    function changeCommentLinks() {
        $("span[class^=\"EntityHeader_header-details\"] > div[class^=\"wds-avatar EntityHeader_avatar\"] > a").each(function () {
            var user = decodeURIComponent($(this).attr("href")).replace(
                    new RegExp(mw.util.getUrl("") + conf.wgFormattedNamespaces[2] + ":|" + new mw.Title("Contributions", -1).getUrl() + "/"), ""
                ),
                $link = $(this).parent().parent().children("a:last-of-type:not(.mw-user-anon-link)"),
                $this = $(this);

            // Don't reveal IP's if the user is not an admin/bureaucrat/global groups
            if (!canBlock && mw.util.isIPAddress(user, true)) return;

            $link
                .attr("href", new mw.Title("Contributions/" + user, -1).getUrl())
                .html(user);

            $this.attr("href", new mw.Title("Contributions/" + user, -1).getUrl());

            $link.after(
                "&nbsp;(",
                $("<a>", {
                    href: new mw.Title(user, 1200).getUrl(),
                    html: "wall",
                    title: "Message_wall:" + user,
                    class: "mw-user-anon-link",
                }),
                canBlock ? "&nbsp;<b>&bull;</b>&nbsp;" : "",
                canBlock ? $("<a>", {
                    href: new mw.Title("Block/" + user, -1).getUrl(),
                    html: "block",
                    title: "Special:Block/" + user,
                    class: "mw-user-anon-link",
                }) : "",
                ")"
            );
        });
    }

    function addCommentId() {
        $("[class^=\"Comment_comment\"], [class^=\"Reply_reply\"]").each(function () {
            var $this = $(this);
            if ($this.append) { // if $this is a jquery element
                var threadIsComment = $this.is("[class^=\"Comment_comment\"]");
                var threadClassName = (threadIsComment ? "comment" : "reply") + "-id-display";
                switch ($this.find("." + threadClassName).length) {
                    case 0:
                        var replyID = $this.attr("data-reply-id");
                        var commentID = $this.parent().attr("data-thread-id") || $this.parent().parent().parent().attr("data-thread-id");
                        var threadLink = "commentId=" + commentID + (replyID ? "&replyId=" + replyID : "");
                        $this.append(
                            $("<div>", {
                                class: threadClassName,
                                "data-link": threadLink,
                                html: $("<abbr>", {
                                    title: "click to copy",
                                    class: "article-click-copy",
                                    text: (threadIsComment ? "Comment" : "Reply") + " ID : " + (replyID || commentID),
                                    "data-copy": conf.wgServer + mw.util.getUrl(conf.wgPageName) + "?" + (threadLink || ""),
                                }),
                            })
                        );
                        break;
                    case 1:
                        break; // do nothing
                    default:
                        $this.find("." + threadClassName).each(function (i, elem) {
                            if (i) /* not zero (i.e. not first element) */ elem.remove();
                        });
                }
            }
        });
    }

    function mainCommentHandler() {
        changeCommentLinks();
        addCommentId();
    }

    if ($("#articleComments, #MessageWall").length) {
        var WikiCommentObserver = new MutationObserver(function (mutationsList) {
            var operate = false;
            for (var i in mutationsList) {
                var mutation = mutationsList[i];
                if ($(mutation.target).is("[class^=\"CommentList_comment-list\"], [class^=\"ReplyList_container\"], [class^=\"ReplyList_list-wrapper\"]")) {
                    operate = true;
                    break;
                }
            }
            if (operate) mainCommentHandler();

            var inter = setInterval(function () {
                if ($("[class*=\"Comment_wrapper\"], [class *=\"Message__wrapper\"]").length) {
                    clearInterval(inter);
                    mainCommentHandler();
                }
            }, 200);
        });

        WikiCommentObserver.observe($("#articleComments, #MessageWall").get(0), {
            childList: true,
            subtree: true,
        });
    }

    var clickCopyCooldown = false;
    // small script to allow copying of text inside class "article-click-copy"
    $("body").on("click", ".article-click-copy", function () {
        if (!clickCopyCooldown) {
            copyToClipboard($(this).attr("data-copy") || $(this).text().trim());
            clickCopyCooldown = true;
            var clickCopyCooldownInterval = setInterval(function () {
                clickCopyCooldown = false;
                clearInterval(clickCopyCooldownInterval);
            }, 30);
        }
    });

    // QOL tooltip on ajax link
    $("a[href=\"#ajaxundo\"]").attr("title", "Instantly undo this edit without leaving the page");

    /* Temp fix to force scrollbars to appear on very wide tables when they are collapsed by default */
    $("div[class^=\"mw-customtoggle-\"],div[class*=\" mw-customtoggle-\"]").on("click", function () {
        $(".mw-collapsible").resize();
    });

    // Change profile links
    var count = 0;
    var inter2 = setInterval(function () {
        if (count > 12000) return;
        if (conf.profileUserId && $("#userProfileApp").length) $("#userProfileApp .user-identity-stats a[href*=\"" + new mw.Title("UserProfileActivity", -1).getUrl() + "\"]").attr("href", "/f/u/" + conf.profileUserId), clearInterval(inter2);
    }, 5);

    // Script to respond to ANI reports
    if (
        conf.wgUserGroups.find(function (v) {
            return ["bureaucrat", "sysop"].includes(v);
        }) &&
        conf.wgPageName.includes("Administrator's_Noticeboard") &&
        conf.wgNamespaceNumber === 4
    )
        $(".mw-editsection").append(" | ", $("<a>", {
            class: "mw-complete-report",
            text: "mark as complete",
            title: "Mark this report as compelete",
            css: {
                cursor: "pointer",
            },
            click: function () {
                var user = $(this).parent().parent().next().find("li:first-of-type").children("a:first-of-type").text();
                var message = prompt("Enter a message to respond with:");

                if (message === null) return;

                api.postWithEditToken({
                    action: "edit",
                    appendtext: "\n:\{\{AIV|done\}\} " + message + " \{\{Subst:sig\}\}",
                    title: conf.wgPageName,
                    summary: "Marking report of [[Special:Contributions/" + user + "|" + user + "]] as completed",
                    section: new mw.Uri($(this).parent().find("a[href*=\"&section=\"]").attr("href")).query.section,
                }).then(console.log, console.warn);
            },
        }));

    if (conf.wgPageName.match(/^S:(.+)$/i)) {
        window.location.replace(mw.util.getUrl("Special:" + conf.wgPageName.match(/^S:(.+)$/i)[1]));
    }

    // if (conf.wgPageName.match(/^HSW:(.+)$/i) && conf.wgAction === "view") {
    //     window.location.replace(mw.util.getUrl("Project:" + conf.wgPageName.match(/^HSW:(.+)$/i)[1]));
    // }

    // Code to compromise "srcset" in order to display images in infoboxes with maximum width
    $(".pi-image-thumbnail").removeAttr("srcset");

    // Script to change the displayed text for Lua Errors
    $(".scribunto-error").text("There was a problem when loading this.");
    $(".scribunto-error").eq(0).text("There was a problem when loading this. Refresh and contact the admins if the issue persists.");

    //##############################################################
    /* ==Scripts that are attached to wikipage content load== (W01)*/

    // This hook forces it to apply script even in TabViews and page preview
    mw.hook("wikipage.content").add(function (pSection) {

        /* Script to make page-specific styling (see [[Project:Page Styles]]) */
        pSection.find(".pageStyles").each(function () {
            var $this = $(this);
            var css = $this.text();
            var id = $this.attr("id");

            /* For security purposes, DO NOT REMOVE! */
            function validateCSS(css) {
                return css
                    .replaceAll(/([\t ]*)[a-z0-9\-]+\s*:.*url\(["']?(.*?)["']?\)[^;}]*;?[\t ]*/gi, "$1/* url() is not allowed */") // url()
                    .replaceAll(/([\t ]*)[a-z0-9\-]+\s*:.*expression\(["']?(.*?)["']?\)[^;}]*;?[\t ]*/gi, "$1/* expression() is not allowed */") // expression()
                    .replaceAll(/([\t ]*)@import.*/gi, "$1/* @import is not allowed */") // @import
                    .replaceAll(/([\t ]*)[a-z0-9\-]+\s*:[ \t]*["']?javascript:([^;\n]*)?;?[\t ]*/gi, '$1/* javascript: is not allowed */') // javascript:
                    .replaceAll(/^([\t ]*)@font-face\s*{[^\0]*?}/gi, "$1/* @font-face is not allowed */"); // @font-face
            }

            $("<style>", {
                text: validateCSS(css),
                type: "text/css",
                class: $this.attr("class") && $this.attr("class").replaceAll(/^pageStyles\s*|pageStyles\s*$/g, ""),
                id: id,
            }).appendTo("head");
        });
    });

    //##############################################################
    /* ==My Block ID== (C00)*/
    // Special:MyBlockID
    if (conf.wgPageName.toLowerCase() === conf.wgFormattedNamespaces[-1].toLowerCase() + ":myblockid") {
        document.title = "My Block ID | " + conf.wgSiteName + " | Fandom";
        $("#firstHeading").text("My Block ID");
        var $content = mw.util.$content || $('#mw-content-text');
        $content.empty().html(
            $("<div>", {
                html: [
                    $("<h3>", {
                        text: "Loading..."
                    }),
                ],
            })
        );

        api.get({
            action: "query",
            meta: "userinfo",
            uiprop: ["name", "blockinfo"],
        }).then(function (r) {
            r = r.query.userinfo;
            var name = r.name;

            mw.messages.set("", r.blockreason || "");
            // var parsedReason = mw.message("").parse();

            console.log(r);
            mw.messages.set("");
            $content.html([
                $("<h3>", {
                    html: [
                        "Displaying block information for \"", $("<a>", {
                            href: mw.util.getUrl("Special:Contribs/" + name),
                            text: name
                        }), "\".",
                    ],
                })
            ].concat(r.blockreason ? [
                "You are currently blocked, your Block ID is ",
                $("<a>", {
                    href: mw.util.getUrl("Special:BlockList", {
                        wpTarget: name
                    }),
                    text: "#" + r.blockid
                }),
                $("<small>", {
                    html: [" (", $("<a>", {
                        href: "#",
                        click: function () {
                            copyToClipboard("#" + r.blockid);
                        },
                        text: "click to copy"
                    }), ")"]
                }),
                "."
            ] : [
                "You are not currently blocked. If you are still sure you're blocked, please try again with a different account, or contact an admin via discord for assistance."
            ]));
        });
    }

    //##############################################################
    /* ==Anchor Hash Links== (D00)*/
    // 1) Moves ID from {{Text anchor}} onto a parent tr tag (if it exists), allowing the whole row to be styliszed in CSS (using the :target seloector)
    // 2) If links are hidden in a collapsed area / tab, automatically open it so element can be accessed
    $((function () {
        function _goToID(id) {
            var $elem = $("#" + id);
            // If this is called when an element is hidden prevent scrolling top top of page
            if (!$elem.length || $elem.offset().top <= 0) {
                return;
            }

            $("html, body").animate({
                scrollTop: $elem.offset().top - 65
            }, {
                step: function (now, fx) {
                    if ($elem.offset().top > 0) {
                        // this updates the animation postion encase page shifts (due to page load) while we're animating
                        fx.end = $elem.offset().top - 65;
                    }
                }
            });
        }
        // If the element passed is inside of a tabber, the tabber will open to the tab it belongs in
        function _openTabberTabBelongingToChild(element) {
            if (!element) return;

            var closestTabber = element.closest(".wds-tabber");
            var closestTabberContent = element.closest(".wds-tab__content");

            // If table row is in a tabber
            if (closestTabber && closestTabberContent && closestTabberContent.parentNode) {
                // Get a list of tab sections and find out the index of ours in that list
                var indexOfTab = Array.from(closestTabberContent.parentNode.querySelectorAll(":scope > .wds-tab__content")).indexOf(closestTabberContent);

                // Using the index from above, change all tab states to point to the tab containing the element passed in to this function
                closestTabber.querySelectorAll(":scope > .wds-tab__content").forEach(function (elem, i) {
                    elem.classList.toggle("wds-is-current", indexOfTab === i);
                });
                closestTabber.querySelectorAll(":scope > .wds-tabs__wrapper .wds-tabs__tab").forEach(function (elem, i) {
                    elem.classList.toggle("wds-is-current", indexOfTab === i);
                });
            }
        }

        function _openCollapsedElementBelongingToChild($element) {
            if (!$element) return;
            var $collapsedParent = $element.closest(".mw-collapsed");
            if ($collapsedParent) {
                // if JS for collapsed sections already parsed them, auto click to open them
                if ($collapsedParent.hasClass('mw-made-collapsible')) {
                    var collapseID = $collapsedParent.attr("id").replace("mw-customcollapsible-", "");
                    $(".mw-customtoggle-" + collapseID).click();
                } else {
                    // otherwise if not collapsible yet, just secretly change css to have it not be collapsed
                    $collapsedParent.removeClass("mw-collapsed");
                    $collapsedParent.find("tr").stop().show();
                }
            }
        }

        // Let's you re-add `:target` css without messing up browser history
        // Needed when wanting to have a row highlighted after waiting for text anchors and such to be setup
        // https://stackoverflow.com/a/59013961/1411473
        function _pushHashAndFixTargetSelector(hash) {
            history.pushState({}, document.title, hash); //called as you would normally
            var onpopstate = window.onpopstate; //store the old event handler to restore it later
            window.onpopstate = function () { //this will be called when we call history.back()
                window.onpopstate = onpopstate; //restore the original handler
                history.forward(); //go forward again to update the CSS
            };
            history.back(); //go back to trigger the above function
        }

        function _doHashIdCheck($content, doHashFix) {
            var hash = location.hash.replace("#", "");
            $content.find("tr[id]").each(function () {
                var $row = $(this),
                    id = $row.attr("id");
                if (id === hash) {
                    // hash fix should only be needed right after new content is added to the page
                    if (doHashFix) _pushHashAndFixTargetSelector(location.hash);

                    _openCollapsedElementBelongingToChild($row);
                    _openTabberTabBelongingToChild($row[0]);
                    _goToID(id);
                }
            });
        }

        // do hook here to also re-run code on tabviews/lazy loaded content
        mw.hook("wikipage.content").add(function ($content) {
            // Convert any text anchors to row IDs
            $content.find("tr .text-anchor").each(function () {
                var $textAnchor = $(this);
                var id = $textAnchor.attr("id");
                $textAnchor.removeAttr("id");
                $textAnchor.closest("tr").attr("id", id);
            });

            // Now dectect if hash matches any row IDs

            // Delay check so that scroll doesn't happen until page layout has settled
            // Otherwise the scroll to the id will be incorrect as other loaded content has moved the position before we get to it
            setTimeout(function () {
                _doHashIdCheck($content, true);
            }, 250);
        });

        $(window).on("hashchange", function () {
            _doHashIdCheck($("#mw-content-text"));
        });
    })());

    //###########################################
    /* ===Less=== (Y01) */
    function getJsonOrEmpty(url, dontLoadForEnglishWiki) {
        return $.Deferred(function (def) {
            if (dontLoadForEnglishWiki && conf.wgContentLanguage === "en")
                def.resolve([]);
            $.getJSON(url + "?action=raw&ctype=text/json")
                .done(function (dt) {
                    def.resolve(dt);
                })
                .fail(function () {
                    def.resolve([]);
                });
        });
    }
    $.when(
        // get list of pages from the English Wiki
        getJsonOrEmpty("https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Custom-Less.json", false),
        // also enable for pages from local wiki [[MediaWiki:Custom-Less.json]]
        getJsonOrEmpty(mw.util.getUrl("MediaWiki:Custom-Less.json"), true)
    ).then(function (lessJson, lessJsonLocal) {
        var lessPages = lessJson.concat(lessJsonLocal);
        var mwns = conf.wgFormattedNamespaces[8] + ":"; // localized mw namespace
        lessPages = ["Common.css", "Custom-common.less"].concat(lessPages).map(function (s) {
            return mwns + s;
        });
        window.lessOpts = window.lessOpts || [];
        window.lessOpts.push({
            // this is the page that has the compiled CSS
            target: mwns + "Common.css",
            // this is the page that lists the LESS files to compile
            source: mwns + "Custom-common.less",
            // these are the pages that you want to be able to update the target page from
            // note, you should not have more than one update button per page
            load: lessPages,
            // target page header
            header: mwns + "Custom-css-header/common",
        });
        window.lessConfig = window.lessConfig || [];
        window.lessConfig = {
            // reloads the page after the target page has successfully been updated
            reload: true,
            // wraps the parsed CSS in pre tags to prevent any unwanted links to templates, pages or files
            wrap: true,
            // allowed groups
            allowed: ["codeeditor"],
        };
        importScripts("u:dev:Less/code.2.js");
    }).catch(console.warn);

    //###########################################
    /* ===Less Source Updater=== (Y02) */
    function updateLessSource() {
        return $.get("https://hypixel-skyblock.fandom.com/api.php", {
            action: "query",
            format: "json",
            prop: "revisions",
            titles: "MediaWiki:Custom-common.less",
            formatversion: 2,
            rvprop: "content",
            rvslots: "*",
        }).then(function (d) {
            if (d.query)
                if (d.query.pages[0].missing !== true)
                    // also replaces @lang with the local variable code
                    return d.query.pages[0].revisions[0].slots.main.content
                        .replace(/@lang: ".*?"/g, "@lang: \"/" + conf.wgContentLanguage + "\"");
                else {
                    new BannerNotification($("<div>", {
                        html: "<div>Update failed. Failed to fetch source.</div>",
                    }).prop("outerHTML"), "warn", null, 5000).show();
                    return false;
                }
            else {
                new BannerNotification($("<div>", {
                    html: "<div>Update failed. See console for error.</div>",
                }).prop("outerHTML"), "warn", null, 5000).show();
                console.warn(d);
            }
        }).then(function (content) {
            if (content) {
                api.postWithEditToken({
                        action: "edit",
                        format: "json",
                        watchlist: "nochange",
                        title: "MediaWiki:Custom-common.less",
                        text: content,
                        summary: "Updated Less Source (source: [[:en:MediaWiki:Custom-common.less]])",
                    }).done(function () {
                        new BannerNotification($("<div>", {
                            html: "<div>Update successful!</div>",
                        }).prop("outerHTML"), "confirm", null, 5000).show();
                    })
                    .fail(function (err) {
                        new BannerNotification($("<div>", {
                            html: "<div>Update failed. See console for error.</div>",
                        }).prop("outerHTML"), "warn", null, 5000).show();
                        console.warn(err);
                    });
            }
        });
    }
    var allowedPages = [conf.wgFormattedNamespaces[8] + ":" + "Custom-common.less", conf.wgFormattedNamespaces[8] + ":" + "Common.css"];
    if (allowedPages.includes(conf.wgPageName) &&
        conf.wgAction === "view" &&
        conf.wgContentLanguage !== "en" &&
        /bureaucrat|sysop|codeeditor|util|staff|helper|global-discussions-moderator|wiki-manager|content-team-member|soap/.test(conf.wgUserGroups.join("\n"))) {
        $("#mw-content-text").prepend($("<a>", {
            class: "wds-button",
            html: $("<div>", {
                click: function () {
                    var $this = $(this);
                    if (confirm("Update Less Source from English Wiki?")) {
                        $this.text("Updating...");
                        $this.attr({
                            disabled: true
                        });
                        updateLessSource().then(function () {
                            $this.text("Update Less Source");
                            $this.removeAttr("disabled");
                        });
                    }
                },
                text: "Update Less Source",
                title: "Update Less Source from English Wiki",
            }),
            title: "Update Less Source from English Wiki",
            css: {
                cursor: "pointer",
                margin: "0 0 5px 5px",
            }
        }));
    }

});

//##############################################################
/* ==importArticle pre-script actions== (X00)*/
// The code in this section is for a script imported below

// preconnect: only do for external resources that are very frequently used
$('head').append('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
$('head').append('<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>');

// AjaxRC
window.ajaxRefresh = 30000;
window.ajaxSpecialPages = [
    "RecentChanges",
    "WikiActivity",
    "Watchlist",
    "Log",
    "Contributions",
    "AbuseLog",
];
// Custom text
$.extend(true, window, {
    dev: {
        i18n: {
            overrides: {
                AjaxRC: {
                    "ajaxrc-refresh-text": "Auto Refresh",
                    "ajaxrc-refresh-hover": "Enable automatically refreshing of this page",
                }
            }
        }
    }
});