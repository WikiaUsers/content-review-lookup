/* [[QuickDiff]] - quickly view any diff link */

/*jslint browser, long */
/*global jQuery, mediaWiki, dev */

(function ($, mw) {
    "use strict";

    // double-run protection
    if (window.quickDiffLoaded) {
        return;
    }
    window.quickDiffLoaded = true;

    var i18n;
    var modal;
    var special = {};

    function isElementOrChildFrontmost(element) {
        var pos = element.getBoundingClientRect();
        var frontmostElement = document.elementFromPoint(pos.left, pos.top);
        return element.contains(frontmostElement);
    }

    // "Special:Diff/12345" and "Special:ComparePages" link detection
    function initSpecialPageStrings() {
        special.diffDefault = mw.util.getUrl("Special:Diff/");
        special.compareDefault = mw.util.getUrl("Special:ComparePages");

        var wiki = mw.config.get("wgDBname");
        var storageKeyDiff = "QuickDiff-specialdiff_" + wiki;
        var storageKeyCompare = "QuickDiff-specialcompare_" + wiki;

        try {
            special.diff = localStorage.getItem(storageKeyDiff);
            special.compare = localStorage.getItem(storageKeyCompare);
        } catch (ignore) {}

        if (special.diff && special.compare) {
            // using stored values - no need for api request
            return;
        }

        $.getJSON(mw.util.wikiScript("api"), {
            action: "parse",
            contentmodel: "wikitext",
            format: "json",
            prop: "text",
            text: "<span class='diff'>[[Special:Diff/]]</span><span class='compare'>[[Special:ComparePages]]</span>",
            disablelimitreport: ""
        }).done(function (data) {
            var $parsed = $(data.parse.text["*"]);

            special.diff = $parsed.find(".diff > a").attr("href");
            special.compare = $parsed.find(".compare > a").attr("href");

            try {
                localStorage.setItem(storageKeyDiff, special.diff);
                localStorage.setItem(storageKeyCompare, special.compare);
            } catch (ignore) {}
        });
    }

    // support for patrolling edits directly from modal
    // ideally this wouldn't be needed and we'd rely on MediaWiki's own handler,
    // but that's run only on document ready and isn't easily reusable
    function initAjaxPatrolHandler() {
        var $spinner = mw.libs.QDmodal.getSpinner();

        $spinner.css({
            "--qdmodal-spinner-size": "2em",
            position: "relative",
            top: "-6px",
            verticalAlign: "top"
        });

        mw.hook("quickdiff.ready").add(function (modal) {
            var $patrolLinks = modal.$element.find(".patrollink[data-mw='interface'] > a");

            $patrolLinks.on("click", function (event) {
                event.preventDefault();

                if ($patrolLinks.is("[disabled]")) {
                    return;
                }

                $patrolLinks.find(".qdmodal-spinner-container").remove().end()
                    .attr("disabled", "").append(" ", $spinner.clone());

                var $spinners = $patrolLinks.find(".qdmodal-spinner-container");

                mw.loader.using("mediawiki.api").done(function () {
                    new mw.Api().postWithToken("patrol", {
                        action: "patrol",
                        rcid: mw.util.getParamValue("rcid", event.target.href)
                    }).done(function (data) {
                        $spinners.removeAttr("style").text("✅")
                            .parent().wrap("<s>");
                    }).fail(function (data) {
                        $spinners.removeAttr("style").text("❌")
                            .parent().removeAttr("disabled");
                    });
                });
            });
        });
    }

    function getDiffTitle($diff) {
        var prevTitle = $diff.find("#mw-diff-otitle1 a").attr("title");
        var currTitle = $diff.find("#mw-diff-ntitle1 a").attr("title");

        if (prevTitle && prevTitle !== currTitle) {
            return i18n("differences-multipage", prevTitle, currTitle).plain();
        }

        return i18n("differences", currTitle).plain();
    }

    function addDiffActions() {
        var prevTitle = modal.$content.find("#mw-diff-otitle1 a").attr("title");
        var currTitle = modal.$content.find("#mw-diff-ntitle1 a").attr("title");

        // collect action links (edit, undo, rollback, patrol) from the diff
        var $actions = modal.$content.find(".diff-ntitle").find(
            ".mw-diff-edit, .mw-diff-undo, .mw-rollback-link, .patrollink, .mw-diff-tool"
        ).clone();

        // remove text nodes (the brackets around each link)
        $actions.contents().filter(function (ignore, element) {
            return element.nodeType === 3;
        }).remove();

        $actions.find("a")
            .addClass("qdmodal-button")
            .attr("target", "_blank");

        // if diff is for one page, add a page history action
        if (prevTitle === currTitle) {
            $actions = $actions.add(
                $("<a>").attr({
                    "class": "qdmodal-button",
                    href: mw.util.getUrl(currTitle, {action: "history"}),
                    target: "_blank"
                }).text(i18n("history").plain())
            );
        }

        modal.$footer.append($actions);
    }

    function loadDiff(url) {
        modal.show({
            loading: true,
            title: !modal.visible && i18n("loading").plain()
        });

        // add 'action=render' and 'diffonly' params to save some bytes on each request
        url.extend({
            action: "render",
            diffonly: "1"
        });

        // pass through 'bot' param for rollback links if it's in use on the current page
        if (mw.util.getParamValue("bot")) {
            url.extend({bot: "1"});
        }

        $.when(
            $.get(url.getRelativePath()),
            mw.loader.using(["mediawiki.diff.styles", "mediawiki.interface.helpers.styles"])
        ).always(function (response) {
            delete url.query.action;
            delete url.query.diffonly;
            delete url.query.bot;

            var data = {
                url: url,
                buttons: [{
                    text: i18n("link").plain(),
                    href: url.toString(),
                    attr: {"data-disable-quickdiff": ""}
                }],
                content: i18n("error", url.toString()).escape()
            };
            var $diff;

            if (typeof response[0] === "string") {
                var $content = $(response[0]);
                $diff = $content.filter("table.diff, #mw-rev-deleted-no-diff");

                if (!$diff.length) {
                    // $content is a complete page - see if a diff can be found
                    // needed for diffs from special pages as they ignore action=render URL parameter
                    $diff = $content.find("table.diff");
                }
            }

            if (!$diff || $diff.length === 0) {
                // default content is error msg
                return modal.show(data);
            }

            data.content = $diff;
            data.hook = "quickdiff.ready";
            data.onBeforeShow = addDiffActions;
            data.title = getDiffTitle($diff);

            // if a diff, fire the standard MW hook
            if ($diff.is("table.diff[data-mw='interface']")) {
                mw.hook("wikipage.diff").fire($diff);
            }

            modal.show(data);
        });
    }

    function keydownHandler(event) {
        // only handle key presses if QuickDiff is frontmost
        if (!isElementOrChildFrontmost(modal.$container[0])) {
            return;
        }

        if (event.key === "ArrowLeft") {
            modal.$content.find("#differences-prevlink").trigger("click");
        } else if (event.key === "ArrowRight") {
            modal.$content.find("#differences-nextlink").trigger("click");
        }
    }

    function linkClickHandler(event) {
        // ignore clicks with modifier keys to avoid overriding browser features
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
            return;
        }

        // ignore click if link has "data-disable-quickdiff" attribute set
        if (event.currentTarget.dataset.disableQuickdiff !== undefined) {
            return;
        }

        var url = event.currentTarget.href;

        try {
            url = new mw.Uri(url);
        } catch (ignore) {
            // quit if url couldn't be parsed
            // it wouldn't be a link QuickDiff could handle anyway
            return;
        }

        // cross-domain requests not supported
        if (url.host !== location.hostname) {
            return;
        }

        // no fragment check is to ensure section links/collapsible trigger links on diff pages are ignored
        var hasDiffParam = url.query.diff !== undefined
                && url.fragment === undefined;
        var isSpecialDiffLink = url.path.indexOf(special.diff) === 0
                || url.path.indexOf(special.diffDefault) === 0;
        var isSpecialCompareLink = url.path.indexOf(special.compare) === 0
                || url.path.indexOf(special.compareDefault) === 0;

        if (hasDiffParam || isSpecialDiffLink || isSpecialCompareLink) {
            event.preventDefault();
            loadDiff(url);
        }
    }

    function init() {
        var $body = $(document.body);
        modal = new mw.libs.QDmodal("quickdiff-modal");

        // full screen modal
        var css = "#quickdiff-modal { height: 100%; width: 100% }";
        // always show modal footer for UI consistency
        css += "#quickdiff-modal > footer { display: flex }";
        // hide square brackets around rollback link in footer
        css += "#quickdiff-modal > footer .mw-rollback-link::before, #quickdiff-modal > footer .mw-rollback-link::after { content: none }";
        mw.util.addCSS(css);

        // attach to body for compatibility with ajax-loaded content
        // also, one attached event handler is better than hundreds!
        $body.on("click.quickdiff", "a[href]", linkClickHandler);

        // listen for left/right arrow keys, to move between prev/next diff
        $body.on("keydown.quickdiff", keydownHandler);

        initSpecialPageStrings();
        initAjaxPatrolHandler();
    }

    function initDependencies() {
        var devLoadUrl = "https://dev.fandom.com/load.php?mode=articles&only=scripts&articles=MediaWiki:";
        var i18nMsgs = new $.Deferred();
        var waitFor = [
            i18nMsgs,
            mw.loader.using(["mediawiki.Uri", "mediawiki.util"])
        ];

        if (!(mw.libs.QDmodal && mw.libs.QDmodal.version >= 20201108)) {
            waitFor.push($.ajax({
                cache: true,
                dataType: "script",
                url: devLoadUrl + "QDmodal.js&cb=20201108"
            }));
        }

        if (!(window.dev && dev.i18n && dev.i18n.loadMessages)) {
            mw.loader.load(devLoadUrl + "I18n-js/code.js&*");
        }

        mw.hook("dev.i18n").add(function (i18njs) {
            i18njs.loadMessages("QuickDiff").done(function (i18nData) {
                i18n = i18nData.msg;
                i18nMsgs.resolve();
            });
        });

        $.when.apply($, waitFor).done(init);
    }

    initDependencies();
}(jQuery, mediaWiki));