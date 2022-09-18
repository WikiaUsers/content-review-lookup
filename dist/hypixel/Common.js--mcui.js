// Taken from https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Common.js/mcui.js

/* Table of Contents
-----------------------
 Deferred [mw.loader.using]
 * (A00) UI Tabber
 * (B00) Element animator

 Immediately Executed
 * None
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

/* global mw */

mw.loader.using(["mediawiki.api", "mediawiki.util", "mediawiki.Uri"]).then(function () {
    //##############################################################
    /* ==UI Tabber== (A00)*/
    // Code to allow making {{Slot}} clickable to show different content [Part 1/2]
    function clickTab(id) {
        var $parent = $(this).parents(".mcui-tabber").eq(0);
        id = "ui-" + id;
        if (!$("#" + id).length) {
            console.warn("No such tab ID \"" + id + "\"");
            return;
        }
        $parent.find(".mcui-tab-content#" + id).siblings(".mcui-tab-content").addClass("hidden");
        $parent.find(".mcui-tab-content#" + id).removeClass("hidden");
        // Since images don't load on hidden tabs, force them to load
        var onloadEl = $parent.find(".mcui-tab-content#" + id + " .lzy[onload]");
        if (onloadEl.length) onloadEl.load();
    }

    $(document.body).on("click", ".mcui-tabber .mcui-tab", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var id = $(this).data("tab");
        if (id)
            clickTab.call(this, id);
    });
    $(document.body).on("click", ".mcui-tabber .invitem[data-invlink*='UI:'] a", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    //##############################################################
    /* Scripts that are attached to wikipage content load */

    // This hook forces it to apply script even in TabViews and page preview
    mw.hook("wikipage.content").add(function (pSection) {
        // Handle tabber content on load
        pSection.find(".mcui-tabber .mcui-tab-content ~ .mcui-tab-content").each(function () {
            $(this).addClass("hidden");
        });

        // Allow making {{Slot}} clickable to show different content [Part 2/2]
        (function () {
            if (!pSection.find(".mcui-tabber").length) return;

            pSection.find(".mcui-tabber .invitem[data-invlink]").each(function () {
                var invlink = $(this).attr("data-invlink");
                if ((invlink || "").indexOf("UI:") === 0) {
                    var target = invlink.replace("UI:", "");
                    $(this).click(clickTab.bind(this, target));
                }
            });

            // Makes an extra button to go back to the first UI tab
            pSection.find(".mcui-tabber").each(function () {
                var elementId = $(this).find(":first-child").attr("id");
                if (!elementId) return;
                var className = elementId.replace("ui-", "");
                $(this).find(".mcui").append(
                    $("<div>").addClass("mcui-returnbutton noselect").text("↻")
                    .click(function () {
                        clickTab.call(this, className);
                    })
                );
            });
        })();
    });

    //##############################################################
    /* ==Element animator== (B00)*/
    // Taken from https://minecraft.gamepedia.com/MediaWiki:Gadget-site.js
    /**
     * Element animator
     *
     * Cycles through a set of elements (or "frames") on a 2 second timer per frame
     * Add the "animated" class to the frame containing the elements to animate.
     * Optionally, add the "animated-active" class to the frame to display first.
     * Animations with the "animated-paused" class will be skipped each interval.
     *
     * Requires some styling in wiki's CSS.
     */

    $(function () {

        (function () {
            var $content = $("#mw-content-text");
            var advanceFrame = function (parentElem, parentSelector) {
                var curFrame = parentElem.querySelector(parentSelector + " > .animated-active");
                $(curFrame).removeClass("animated-active");
                var $nextFrame = $(curFrame && curFrame.nextElementSibling || parentElem.firstElementChild);
                return $nextFrame.addClass("animated-active");
            };

            // Set the name of the hidden property
            var hidden;
            if (typeof document.hidden !== "undefined")
                hidden = "hidden";
            else if (typeof document.msHidden !== "undefined")
                hidden = "msHidden";
            else if (typeof document.webkitHidden !== "undefined")
                hidden = "webkitHidden";

            setInterval(function () {
                if (hidden && document[hidden]) return;

                $content.find(".animated").each(function () {
                    if ($(this).is(".animated-paused, .animated-paused *")) return;

                    advanceFrame(this, ".animated");
                });
            }, 2000);
        }());

        /**
         * Pause animations on mouseover of a designated container (.animated-container and .mcui)
         *
         * This is so people have a chance to look at the image and click on pages they want to view.
         */
        $("#mw-content-text").on("mouseenter mouseleave", ".animated-container, .mcui", function (e) {
            if ($(this).find(".animated").length > 0 || $(this).is(".animated")) {
                $(this).toggleClass("animated-paused", e.type === "mouseenter");
            }
        });

        // A work around to force wikia's lazy loading to fire
        setTimeout(function () {
            var onloadEl = $(".animated .lzy[onload]");
            if (onloadEl.length) onloadEl.load();
        }, 1000);

    });
});