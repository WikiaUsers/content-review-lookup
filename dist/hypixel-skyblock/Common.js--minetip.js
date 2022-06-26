/* jshint jquery: true, maxerr: 99999999, esversion: 5, undef: true, esnext: false */

// Taken from https://minecraft.gamepedia.com/MediaWiki:Common.js
// Creates minecraft style tooltips
// Replaces normal tooltips. Supports minecraft [[formatting codes]] (except k), and a description with line breaks (/).

/* global mw */

$(function () {
    "use strict";
    window.minetipConfig = window.minetipConfig || {};
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

                var $follow = $elem.find(".slot-image-follow");
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
                if (description) {
                    // Apply normal escaping plus "/"
                    description = escape(description).replace(/\\\\/g, "&#92;").replace(/\\\//g, "&#47;");
                    content += "<span class=\"minetip-description\">&f" + description.replace(/\//g, "&r<br>") + "&r</span>";
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

                var $follow = $(this).find(".slot-image-follow");
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
        }, ".minetip, .invslot-item");

        $(document.body).on({
            "mouseenter": function () {
                if (!window.minetipConfig.noOverlay) {
                    var $links = $(this).find("a:not(.invslot-hover-overlay)");
                    switch ($(this).find(".invslot-hover-overlay").length) {
                        case 0:
                            $(this).append(
                                $("<a>").addClass("invslot-hover-overlay")
                                .attr("href", $($links[2] || $links[1] || $links[0]).attr("href"))
                            );
                            break;
                        case 1:
                            break;
                        default:
                            $(this).find(".invslot-hover-overlay").each(function (i, el) {
                                if (i) $(el).remove();
                            });
                            break;
                    }
                }
            },
            // pick up slot item for 300ms
            // allowed: left/right click
            "mousedown": function (e) {
                var $this = $(this);
                if (e.which !== 2) {
                    var $source = $this.find("img:first");
                    if ($source.length !== 0) {
                        var $target;
                        if (!window.minetipConfig.noOverlay) {
                            switch ($this.find(".slot-image-follow").length) {
                                case 0:
                                    $target = $source.clone();
                                    $target.addClass("slot-image-follow").appendTo($this.find(".invslot-hover-overlay"));
                                    break;
                                case 1:
                                    $target = $this.find(".slot-image-follow");
                                    break;
                                default:
                                    $this.find(".slot-image-follow").each(function (i, elm) {
                                        if (i) elm.remove();
                                        else $target = elm;
                                    });
                                    break;
                            }
                        }
                        var offset = $this.offset();
                        $target.css({
                            "top": e.pageY - offset.top - 16,
                            "left": e.pageX - offset.left - 16,
                        }).show();
                        $source.hide();
                        savedX = e.clientX, savedY = e.clientY;
                        $(document.body).on("mousemove", cacheMousemove);
                        $this.trigger("mouseleave");
                        var timer = setInterval(function () {
                            $source.show();
                            $target.css({
                                "top": 0,
                                "left": 0,
                            }).hide();
                            $(document.body).off("mousemove", cacheMousemove);
                            $this.trigger("mousemove", [e, savedX, savedY]);
                            clearInterval(timer);
                        }, 300);
                    }
                }
            },
        }, ".invslot-item");

        $(document.body).on("mousemove", function (e) {
            $(".slot-image-follow").each(function () {
                if ($(this).is(":visible")) {
                    var offset = $(this).parent().offset();
                    $(this).css({
                        "top": e.pageY - offset.top - 16,
                        "left": e.pageX - offset.left - 16,
                    });
                }
            });
            if ($(".minetip:hover, .invslot-item:hover").length < 1 && $("#minetip-tooltip").length > 0)
                $("#minetip-tooltip").remove();
        });
    })());
    (function () {
        var listChoice = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÂÄÅÆÇÈÉÊËÍÑÓÔÕÖÚÜßàáâãäåæçèéêëìíîïñòóôõöùúûüÿğİıŒœŞşŴŵžȇ",
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
            $(pSection).find(".format-k .format-k").removeClass("format-k");
        });
    }());
});