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
        var handleLineBreak = function (line, maxchar, opt) {
            // opt in kw (keep-word, default), bw (break-word)
            var t = [line];
            while (true) {
                var lastline = t[t.length - 1];
                if (lastline.length <= maxchar)
                    break;
                // choose break point
                var pos;
                if (opt === "bw") {
                    pos = lastline.substring(0, maxchar);
                } else {
                    var selectedLen = maxchar + 1;
                    while (selectedLen - (lastline.substring(0, selectedLen).match(/\\./g) || []).length !== maxchar + 1)
                        selectedLen++;
                    pos = lastline.substring(0, selectedLen).search(/ \S*$/); // last space in target range
                    if (pos === -1)
                        pos = lastline.search(/ /); // if no space in target range, use the first space following it
                    if (pos === -1)
                        break;
                }
                // find preceding color codes
                var colcode = "";
                var matchCodes = lastline.substring(0, pos).replaceAll("\\\\", "").replaceAll("\\&", "").match(/&[0-9a-fk-o]/g);
                if (matchCodes)
                    colcode = matchCodes.join("").replaceAll(/^.*?(&[0-9a-f][^0-9a-f]*)$/g, "$1");
                // split line at pos
                t[t.length - 1] = lastline.substring(0, pos);
                t.push(colcode + lastline.substring(pos).trimStart());
            }
            return t;
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
                    description = escape(description).replace(/\\\//g, "&#47;");
                    var desclines = [];
                    description.split(useSlashEscape ? "/" : "\\n").forEach(function (v) {
                        var match1 = v.match(/^\$\[(.*?)\]/), // line options: $[]
                            match2;
                        if (!match1)
                            desclines.push(v);
                        else {
                            // identify line options
                            v = v.replace(/^\$\[.*?\]/g, "").replace(/&#47;/g, "\\/"); // this is to maintain genuine line length
                            if (match2 = match1[1].match(/(?:^| )([kb]w):(\d+)(?:$| )/))
                                desclines = desclines.concat(handleLineBreak(v, Number(match2[2]), match2[1]));
                        }
                    });

                    description = desclines.join("&r<br>").replace(/\\\\/g, "&#92;").replace(/\\\//g, "&#47;");
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

        /*** Scrollable Tooltip (Experimental) ***/
        $(document.body).on("keydown", function (e) {
            if (!$tooltip.length)
                return;
            if (e.which === 27) { // esc
                $tooltip.remove();
                $tooltip = $();
            } else if (overflowBottom || overflowTop) {
                var top;
                if (e.which === 40) { // down
                    top = Math.max(winHeight - height, topPos - 14);
                } else if (e.which === 38) { // up
                    top = Math.min(0, topPos + 14);
                }
                if (!isNaN(top)) {
                    e.preventDefault();
                    // Recording
                    overflowTop = top < 0;
                    overflowBottom = top + height > winHeight;
                    topPos = top;
                    // Apply the positions
                    $tooltip.css("top", top);
                }
            }
        });

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
        }, ".invslot .invslot-item");
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