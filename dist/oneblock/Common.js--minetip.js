// Originally from https://minecraft.gamepedia.com/MediaWiki:Common.js
// and https://hypixel.fandom.com/wiki/MediaWiki:Common.js/minetip.js

/* global mw */

$(function () {
    "use strict";
    /* Wiki config */
    var useSlashEscape = false;

    window.minetipConfig = window.minetipConfig || {};

    var SVG_FILTER = '<svg style="position:fixed;top:-1000px"><filter id="mcglint"><feImage href="https://static.wikia.nocookie.net/oneblock/images/3/32/Mcglint.gif" x="0" y="0" preserveAspectRatio="none" result="IMAGE"/><feBlend in="IMAGE" in2="SourceGraphic" mode="screen" result="BLEND"/><feComposite operator="in" in="BLEND" in2="SourceGraphic"/></filter></svg>';
    $("body").append($(SVG_FILTER));

    (window.updateTooltips = (function () {
        var escapeChars = {
            "\\&": "&#38;",
            "<": "&#60;",
            ">": "&#62;",
        };
        var escape = function (text) {
            // "\" must be escaped first
            return text.replace(/\\&|[<>]/g, function (char) {
                return escapeChars[char];
            });
        };
        var $tooltip = $();
        var $win = $(window),
            winWidth, winHeight, width, height;
        var savedX, savedY;
        var cacheMousemove = function (e) {
            savedX = e.clientX;
            savedY = e.clientY;
        };

        $(document.body).on({
            "mouseenter": function (e, trigger, x, y) {
                $tooltip.remove();

                var $elem = $(this),
                    title = $elem.attr("data-minetip-title");
                if (title === undefined) {
                    title = $elem.attr("title");
                    if (title !== undefined) {
                        title = $.trim(title.replace(/&/g, "\\&"));
                        $elem.attr("data-minetip-title", escape(title));
                    }
                }

                var $follow = $elem.find(".invslot-pickup");
                if ($follow.length !== 0 && $follow.is(":visible")) {
                    $elem.trigger("mouseleave");
                    return;
                }

                // No title or title only contains formatting codes
                if (title === undefined || title !== "" && title.replace(/&([0-9a-fk-or])/g, "") === "") {
                    // Find deepest child title
                    var childElem = $($elem[0]),
                        childTitle;
                    do {
                        if (typeof childElem.attr("title") !== "undefined" && childElem.attr("title") !== false) {
                            childTitle = childElem.title;
                        }
                        childElem = childElem.children(":first");
                    } while (childElem.length !== 0);
                    if (childTitle === undefined) {
                        return;
                    }

                    // Append child title as title may contain formatting codes
                    if (!title) {
                        title = "";
                    }
                    title += $.trim(childTitle.replace(/&/g, "\\&"));

                    // Set the retrieved title as data for future use
                    $elem.attr("data-minetip-title", title);
                }

                if (!$elem.data("minetip-ready")) {
                    // Remove title attributes so the native tooltip doesn't get in the way
                    $elem.find("[title]").addBack().removeAttr("title");
                    $elem.data("minetip-ready", true);
                }

                if (title === "") {
                    return;
                }

                var content = "<span class=\"minetip-title\">&f" + escape(title) + "&r</span>";

                var description = $.trim($elem.attr("data-minetip-text"));
                // Apply normal escaping plus new line
                if (description) {
                    description = escape(description).replace(/\\\\/g, "&#92;").replace(/\\\//g, "&#47;");
                    content += "<span class=\"minetip-description\">&f" + description.replace(useSlashEscape ? /\//g : /\\n/g, "&r<br>") + "&r</span>";
                }

                // Add classes for minecraft formatting codes
                while (content.search(/&[0-9a-fk-o]/) > -1) {
                    content = content.replace(/&([0-9a-fk-o])(.*?)(&[0-9a-fr]|$)/g, "<span class=\"format-$1\">$2&r</span>$3");
                }
                // Remove reset formatting
                content = content.replace(/&r/g, "");

                $tooltip = $("<div id=\"minetip-tooltip\">");
                $tooltip.html(content).hide().appendTo("body");

                // Cache current window and tooltip size
                winWidth = $win.width();
                winHeight = $win.height();
                width = $tooltip.outerWidth(true);
                height = $tooltip.outerHeight(true);

                // Trigger a mouse movement to position the tooltip
                $elem.trigger("mousemove", [e || trigger, x, y]);
            },
            "mousemove": function (e, trigger, x, y) {
                if (!$tooltip.length) {
                    $(this).trigger("mouseenter", [e || trigger, x, y]);
                    return;
                }

                var $follow = $(this).find(".invslot-pickup");
                if ($follow.length !== 0 && $follow.is(":visible")) {
                    $(this).trigger("mouseleave");
                    return;
                }

                if (!$(e.target).is(":hover"))
                    return;

                // Get event data from remote trigger
                x = e.clientX || trigger.clientX || x;
                y = e.clientY || trigger.clientY || y;

                if (typeof y !== "number") return;

                // Get mouse position and add default offsets
                var top = y - 34;
                var left = x + 14;

                // If going off the right of the screen, go to the left of the cursor
                if (left + width > winWidth) {
                    left -= width + 36;
                }

                // If now going off to the left of the screen, resort to going above the cursor
                if (left < 0) {
                    left = 0;
                    top -= height - 22;

                    // Go below the cursor if too high
                    if (top < 0) {
                        top += height + 47;
                    }
                    // Don't go off the top of the screen
                } else if (top < 0) {
                    top = 0;
                    // Don't go off the bottom of the screen
                } else if (top + height > winHeight) {
                    top = winHeight - height;
                }

                // Apply the positions
                $tooltip.css({
                    top: top,
                    left: left
                }).show();
            },
            "mouseleave": function () {
                if (!$tooltip.length) {
                    return;
                }

                $tooltip.remove();
                $tooltip = $();
            },
        }, ".invslot .invitem, .minetip");

        $(document.body).on({
            // pick up slot item for 300ms
            // allowed: left/right click
            "mousedown": function (e) {
                var $this = $(this);
                if (e.which !== 2 && !window.minetipConfig.noPickup) {
                    var iid = $this.attr("data-iid");
                    var $source = $this.find("img, .invsprite");
                    if ((typeof iid === "string") || ($source.length > 0)) {
                        var $target = $this;
                        $target.addClass("invslot-pickup");
                        var offset = $this.offset();
                        $target.css({
                            "top": e.pageY - offset.top - 16,
                            "left": e.pageX - offset.left - 16,
                        }).show();
                        savedX = e.clientX, savedY = e.clientY;
                        $(document.body).on("mousemove", cacheMousemove);
                        $this.trigger("mouseleave");
                        var timer = setInterval(function () {
                            $target.css("top", ""); // removing top styling
                            $target.css("left", ""); // removing left styling
                            $target.removeClass("invslot-pickup");
                            $(document.body).off("mousemove", cacheMousemove);
                            $this.trigger("mousemove", [e, savedX, savedY]);
                            clearInterval(timer);
                        }, 300);
                    }
                }
            },
        }, ".invslot .invitem");

        $(document.body).on("mousemove", function (e) {
            $(".invslot-pickup").each(function () {
                if ($(this).is(":visible")) {
                    var offset = $(this).parent().offset();
                    $(this).css({
                        "top": e.pageY - offset.top - 16,
                        "left": e.pageX - offset.left - 16,
                    });
                }
            });
            if ($(".minetip:hover, .invslot .invitem:hover").length < 1 && $("#minetip-tooltip").length > 0)
                $("#minetip-tooltip").remove();
        });
    })());
    (function () {
        var listChoice = "ÀÁÂÈÊËÓÔÕÚßãõğŒŞşŴŵžȇ#$%&+-/0123456789=?ABCDEFGHJKLMNOPQRSTUVWXYZ\^_abcdeghjmnopqrsuvwxyzÇüéâäàåçêëèîÄÅÉæÆôöòûùÿÖÜø£ØƒáóúñÑªº¿¬½¼«»│┤╡╕╛┐┘∈⌡∙·²",
            listLength = listChoice.length;

        function genObfuscatedText() {
            var pos = Math.floor(Math.random() * listLength);
            return listChoice.substring(pos, pos + 1);
        }

        function obfuscateText(element) {
            $(element || ".format-k").contents().each(function () {
                if (this.nodeType === 3) {
                    var text = "";
                    this.wholeText.split("").forEach(function (ch, i) {
                        if (/\S/.test(ch))
                            text += genObfuscatedText();
                        else
                            text += ch;
                    });
                    this.textContent = text;
                } else if (this.nodeType === 1) {
                    obfuscateText(this);
                }
            });
        }

        setInterval(obfuscateText, 70);

        // This hook forces it to apply script even in TabViews
        mw.hook("wikipage.content").add(function (pSection) {
            $(".invslot *").removeAttr("title"); // prevent unwatned browser tooltips for invslots
            $(pSection).find(".format-k .format-k").removeClass("format-k"); // remove nested obfuscated class
        });
    }());
});