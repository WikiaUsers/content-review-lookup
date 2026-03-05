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
    var useSlashEscape = false;

    window.minetipConfig = window.minetipConfig || {};

    var $tooltip = $();
    function removeTooltip() {
        if (!$tooltip.length) {
            return;
        }

        $tooltip.remove();
        $tooltip = $();
    }
    function positionTooltip(event, element, x, y) {
        element.trigger("mousemove", [event, x, y]);
    }

    (function () {
        /* Enchantment glint created by User:Fewfre */
        /* https://hypixel-skyblock.fandom.com/wiki/MediaWiki:Gadget-ResourcePacks.js */
        var SVG_FILTER = '<svg style="position:fixed;top:-1000px"><filter id="mcglint"><feImage href="https://static.wikia.nocookie.net/hypixel-skyblock/images/3/32/Mcglint.gif" x="0" y="0" preserveAspectRatio="none" result="IMAGE"/><feBlend in="IMAGE" in2="SourceGraphic" mode="screen" result="BLEND"/><feComposite operator="in" in="BLEND" in2="SourceGraphic"/></filter></svg>';
        $("body").append($(SVG_FILTER));
    })();

    (function () {
        function convertSpecialPatterns(text) {
            return text
                .replaceAll("<", "&#60;")  // convert < to <
                .replaceAll(">", "&#62;")  // convert > to >
                .replaceAll("\\\\", "&#92;")  // convert \\ to \
                .replaceAll("\\&", "&#38;")  // convert \& to &
                .replaceAll("\\/", "&#47;");  // convert \/ to /
        }

        function escapeSpecialCharacters(text) {
            return text
                .replaceAll("\\", "\\\\")
                .replaceAll("&", "\\&")
                .replaceAll("/", "\\/");
        }

        function getTitleText($elem) {
            function storeMinetipTitle(title, $elem) {
                $elem.attr("data-minetip-title", convertSpecialPatterns(title));
            }

            function getMinetipTitle($elem) {
                return $elem.attr("data-minetip-title");
            }

            function getTitleAttr($elem) {
                var title = $elem.attr("title");

                if (title === undefined) {
                    return;
                }

                title = $.trim(escapeSpecialCharacters(title));

                storeMinetipTitle(title, $elem);

                return title;
            }

            function getDeepestChildTitleAttr($elem) {
                // Find deepest child title
                var childElem = $($elem[0]),
                    childTitle;

                do {
                    var childTitleAttr = childElem.attr("title");
                    if (childTitleAttr !== undefined && childTitleAttr !== false) {
                        childTitle = childTitleAttr;
                    }
                    childElem = childElem.children(":first");
                } while (childElem.length !== 0);

                if (childTitle === undefined) {
                    return;
                }

                var title = $.trim(escapeSpecialCharacters(title));

                storeMinetipTitle(title, $elem);

                return title;
            }

            function titleNotFound(title) {
                var isUndefined = title === undefined;
                var isEmpty = title === "";
                var onlyContainsFormattingCodes = title.replace(/&([0-9a-fk-or])/g, "") === "";
                return !isUndefined && !isEmpty && !onlyContainsFormattingCodes;
            }

            var title = getMinetipTitle($elem);

            if (!titleNotFound(title)) {
                title = getTitleAttr($elem);
            }

            if (!titleNotFound(title)) {
                title = getDeepestChildTitleAttr($elem);
            }

            return title;
        }

        function getDescriptionText($elem) {
            return $elem.attr("data-minetip-text");
        }

        function constructTooltipContent(title, description) {
            var content = "";

            if (title) {
                content += "<span class=\"minetip-title\">&f" + convertSpecialPatterns(title) + "&r</span>";
            }

            // Apply normal escaping plus new line
            if (description) {
                description = convertSpecialPatterns(description);
                description = description.replace(useSlashEscape ? /\//g : /\\n/g, "&r<br>");
                content += "<span class=\"minetip-description\">&f" + description + "&r</span>";
            }

            // Add classes for minecraft formatting codes
            while (content.search(/&[0-9a-fk-o]/) > -1) {
                content = content.replace(/&([0-9a-fk-o])(.*?)(&[0-9a-fr]|$)/g, "<span class=\"format-$1\">$2&r</span>$3");
            }

            // Remove reset formatting
            content = content.replace(/&r/g, "");

            return content;
        }

        function removeTitleAndMarkAsReady($elem) {
            if (!$elem.data("minetip-ready")) {
                // Remove title attributes so the native tooltip doesn't get in the way
                $elem.find("[title]").addBack().removeAttr("title");
                $elem.data("minetip-ready", true);
            }
        }

        var windowWidth, windowHeight, tooltipWidth, tooltipHeight;
        function storeWindowAndTooltipSizes(windowElement, tooltipElement) {
            // Cache current window and tooltip size
            windowWidth = windowElement.width();
            windowHeight = windowElement.height();
            tooltipWidth = tooltipElement.outerWidth(true);
            tooltipHeight = tooltipElement.outerHeight(true);
        }

        function computeTooltipPosition(mouseX, mouseY) {
            // Get mouse position and add default offsets
            var top = mouseY - 34;
            var left = mouseX + 14;

            // If going off the right of the screen, go to the left of the cursor
            if (left + tooltipWidth > windowWidth) {
                left -= tooltipWidth + 36;
            }

            // If now going off to the left of the screen, resort to going above the cursor
            if (left < 0) {
                left = 0;
                top -= tooltipHeight - 22;

                // Go below the cursor if too high
                if (top < 0) {
                    top += tooltipHeight + 47;
                }
                // Don't go off the top of the screen
            } else if (top < 0) {
                top = 0;
                // Don't go off the bottom of the screen
            } else if (top + tooltipHeight > windowHeight) {
                top = windowHeight - tooltipHeight;
            }

            return { top: top, left: left };
        }

        $(document.body).on({
            "mouseenter": function (e, trigger, x, y) {
                removeTooltip();

                var $elem = $(this);
                var $window = $(window);

                if ($elem.hasClass("invpickup-active")) {
                    return;
                }

                var title = getTitleText($elem);
                var description = getDescriptionText($elem);

                var nothingToDisplay = (!title || title === "") && (!description || description === "");

                if (nothingToDisplay) {
                    return;
                }

                var tooltipContent = constructTooltipContent(title, description);
                $tooltip = $("<div id=\"minetip-tooltip\">");
                $tooltip.html(tooltipContent).hide().appendTo("body");

                removeTitleAndMarkAsReady($elem);

                // Cache current window and tooltip size
                storeWindowAndTooltipSizes($window, $tooltip);

                // Trigger a mouse movement to position the tooltip
                positionTooltip(e || trigger, $elem, x, y);
            },

            "mousemove": function (e, trigger, x, y) {
                var $this = $(this);

                if (!$tooltip.length) {
                    $this.trigger("mouseenter", [e || trigger, x, y]);
                    return;
                }

                if ($this.hasClass("invpickup-active")) {
                    return;
                }

                var elementIsHovered = $(e.target).is(":hover");

                if (!elementIsHovered) {
                    return;
                }

                // Get event data from remote trigger
                var mouseX = e.clientX || trigger.clientX || x;
                var mouseY = e.clientY || trigger.clientY || y;

                var positionsAreValid = typeof mouseX === "number" && typeof mouseY === "number";

                if (!positionsAreValid) {
                    return;
                }

                var resultPos = computeTooltipPosition(mouseX, mouseY);

                // Apply the positions
                $tooltip.css({
                    top: resultPos.top,
                    left: resultPos.left
                }).show();
            },

            "mouseleave": function () {
                removeTooltip();
            },

        }, ".minetip");

    })();

    (function () {
        var savedX, savedY;
        var saveMousePosition = function (e) {
            savedX = e.clientX;
            savedY = e.clientY;
        };

        function setElementPosition(event, pickedupElement) {
            var offset = pickedupElement.parent().offset();
            // Calculation: Imagine cursor at center of slot. Then top & left should be -2px to show
            // in normal position.
            // "Cursor position" and "top-left position of border-box of the .invslot" should be separated by 
            // 18px horizontally and vertically. This separation value minus 20 yields -2px.
            pickedupElement.css({
                "top": event.pageY - offset.top - 20,
                "left": event.pageX - offset.left - 20,
            });
        }

        $(document.body).on({
            // pick up slot item for 300ms
            // allowed: left/right click
            "mousedown": function (e) {
                removeTooltip();
                var $this = $(this);

                var isMiddleClick = e.which === 2;
                var noPickupEnabled = window.minetipConfig.noPickup;

                if (isMiddleClick || noPickupEnabled) {
                    return;
                }

                $this.addClass("invpickup-active");
                setElementPosition(e, $this);

                saveMousePosition(e);
                $(document.body).on("mousemove", saveMousePosition);

                var timer = setTimeout(function () {
                    clearTimeout(timer);

                    $(document.body).off("mousemove", saveMousePosition);

                    $this.css("top", "");
                    $this.css("left", "");
                    $this.removeClass("invpickup-active");
                    positionTooltip(e, $this, savedX, savedY);
                }, 300);
            },

        }, ".invpickup");

        $(document.body).on({
            "mousemove": function (e) {
                $(".invpickup-active").each(function () {
                    setElementPosition(e, $(this));
                });
            }
        });

    })();

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
            $(pSection).find(".format-k .format-k").removeClass("format-k"); // remove nested obfuscated class
        });
    }());

});