// Taken from https://minecraft.gamepedia.com/MediaWiki:Common.js
// Creates minecraft style tooltips

/* jshint
    esversion: 5, esnext: false, forin: true, immed: true, indent: 4,
    latedef: true, newcap: true, noarg: true, undef: true, unused: true,
    browser: true, jquery: true, onevar: true, eqeqeq: true, multistr: true,
    maxerr: 999999, forin: false, -W082, -W084
*/
/* global mw */

$(function () {
    "use strict";
    /* Wiki config */
    var useSlashEscape = true;

    window.minetipConfig = window.minetipConfig || {};
    if (window.minetipLoaded)
        return;
    window.minetipLoaded = true;
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
        var $tooltip = $(),
            overflowTop = false,
            overflowBottom = false,
            topPos, leftPos;
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

                var $elem = $(this);

                // Pickup effect handling
                var $follow = $elem.find(".invslot-pickup");
                if ($follow.length !== 0 && $follow.is(":visible")) {
                    $elem.trigger("mouseleave");
                    return;
                }

                var title = $elem.attr("data-minetip-title"),
                    description = $.trim($elem.attr("data-minetip-text"));
                if ((!title || title === "") && (!description || description === ""))
                    return;
                if (!title || title === "")
                    title = " ";

                var content = "<span class=\"minetip-title\">&f" + escape(title) + "&r</span>";

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

                // Pickup effect handling
                var $follow = $(this).find(".invslot-pickup");
                if ($follow.length !== 0 && $follow.is(":visible")) {
                    $(this).trigger("mouseleave");
                    return;
                }

                // Get event data from remote trigger
                x = e.clientX || trigger.clientX || x;
                y = e.clientY || trigger.clientY || y;
                if (!$(e.target).is(":hover") || typeof x !== "number" || typeof y !== "number")
                    return;

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
                // Recording
                overflowTop = top < 0;
                overflowBottom = top + height > winHeight;
                topPos = top;
                leftPos = left;

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
            }
        }, ".invslot .invslot-item, .minetip");

        /*** Item Pickup Effect ***/
        $(document.body).on({
            // pick up slot item for 300ms
            // allowed: left/right click
            "mousedown": function (e) {
                var $this = $(this);
                if (e.which !== 2 && !window.minetipConfig.noPickup) {
                    var iid = $this.attr("data-iid");
                    var $source = $this.find("img");
                    if ((typeof iid === "string") || ($source.length > 0) || $this.hasClass("invsprite")) {
                        var $target = $this;
                        $target.addClass("invslot-pickup");
                        var offset = $this.offset();
                        $target.css({
                            // calculation: Imagine cursor at center of slot. Then top & left should be -2px to show
                            // in normal position.
                            // "Cursor coord" and "top-left coord of border-box of the .invslot" should be separated by 
                            // 18px horizontally and vertically. This separation value minus 20 yields -2px.
                            "top": e.pageY - offset.top - 20,
                            "left": e.pageX - offset.left - 20,
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
        }, ".invslot .invslot-item");
        $(document.body).on("mousemove", function (e) {
            $(".invslot-pickup").each(function () {
                if ($(this).is(":visible")) {
                    var offset = $(this).parent().offset();
                    $(this).css({
                        // calculation method is written somewhere before here
                        "top": e.pageY - offset.top - 20,
                        "left": e.pageX - offset.left - 20,
                    });
                }
            });
            if ($(".minetip:hover, .invslot .invslot-item:hover").length < 1 && $("#minetip-tooltip").length > 0)
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
                    this.wholeText.split("").forEach(function (ch) {
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
            $(pSection).find(".format-k .format-k").removeClass("format-k");
        });
    }());
});