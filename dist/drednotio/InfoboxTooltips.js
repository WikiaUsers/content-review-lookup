$(function() {
    // This element is placed at the bottom of the page. It serves as a tooltip for showing article info on hover.
    var tooltip = $("<div id=\"item-tooltip\"></div>");

    // Cache for already-checked items, to save resources.
    var cache = {};
    var failed = {};
    var cachePages = {};
    // To properly load the tooltip when the user changes focus quickly.
    var hovered_article = null;
    // For positioning the tooltip.
    var lastX = 0, lastY = 0;

    function updatePosition() {
        tooltip.css({
           "left": Math.min(wind.width() - tooltip.width() - 35, lastX + 10),
           "top":  Math.min(wind.height() - tooltip.height() - 35, lastY + 50)
        });
    }

    // Generates a section of key-value pairs to the tooltip.
    function generateSection(sec, items) {
        for (var i = 0; i < items.length; i++) {
            var item = $("<div class=\"it-infoitem\"><span class=\"it-infoitem-key\"></span><span class=\"it-infoitem-val\"></span></div>");
            var current = $(items[i]);
            item.find(".it-infoitem-key").text(current.find(".pi-data-label").text());
            item.find(".it-infoitem-val").html(current.find(".pi-data-value").html()); // To allow for listing.
            sec.append(item);
        }
    }

    function splitByMany(str, sep) {
        var result = [];
        var buffer = "";
        for (var i = 0; i < str.length; i++) {
            if (sep.indexOf(str.substr(i, 1)) > -1) {
                if (buffer.length > 0)
                    result.push(buffer);
                buffer = "";
            }
            buffer += str.substr(i, 1);
        }
        if (buffer.length > 0)
            result.push(buffer);
        return result;
    }

    // Generates a section of key-value pairs to the tooltip from our own syntax.
    function generateDataSection(str) {
        var sec = $("<div class=\"it-infobox\"></div>");
        var item;

        var lines = splitByMany(str, ["!", "~"]);
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].indexOf("!") === 0) {
                if (item !== undefined)
                    sec.append(item);
                item = $("<div class=\"it-infoitem\"><span class=\"it-infoitem-key\"></span><span class=\"it-infoitem-val\"></span></div>");
                item.find(".it-infoitem-key").text(lines[i].substr(1).trim());
            } else if (item !== undefined)
                item.find(".it-infoitem-val").append($("<p></p>").text(lines[i].substr(1).trim()));
        }
        if (item !== undefined)
            sec.append(item);

        return sec;
    }

    function attrIsSet(val, defValue) {
        return val !== null && val !== undefined && val.length > 0 && val != defValue;
    }

    // Updates the DOM for our tooltip element using the found data.
    function setTooltip(data) {
        tooltip.html("<div class=\"it-header\"><img/><div class=\"it-title\">-</div></div>");
        if (data.hasClass("tooltip-data")) {
            tooltip.find(".it-title").text(data.attr("data-title"));
            tooltip.find(".it-header img").attr("src",
                (data.find("img").attr("data-src") !== undefined && data.find("img").attr("data-src").length > 0) ? data.find("img").attr("data-src") : data.find("img").attr("src"));
            if (attrIsSet(tooltip.attr("data-desc"), "{{{Description}}}"))
                tooltip.append($("<div class=\"it-infobox it-desc\"></div>").text(tooltip.attr("data-desc")));
            for (var i = 1; i <= 5; i++) {
                if (attrIsSet(data.attr("data-sectiontitle" + i), "{{{Section title " + i + "}}}")) {
                    tooltip.append($("<div class=\"it-infobox-title\"></div>").text(data.attr("data-sectiontitle" + i)));
                    tooltip.append(generateDataSection(data.attr("data-sectionlist" + i)));
                }
            }
        } else {
            tooltip.find(".it-title").text(data.find(".pi-title").text());
            tooltip.find(".it-header img").attr("src", data.find(".pi-image img").attr("src"));
            if (data.find(".pi-image .pi-caption").length > 0)
                tooltip.append($("<div class=\"it-infobox it-desc\"></div>").text(data.find(".pi-image .pi-caption").text()));
            var dsec = data.find("section, >.pi-data");
            for (var i = 0; i < dsec.length; i++) {
                var csec = $(dsec[i]);
                var sec = $("<div class=\"it-infobox\"></div>");
                if (csec.is("section")) {
                    var ibTitle = csec.find(".pi-header"); // Collapsible sections can have titles.
                    if (ibTitle.length > 0)
                        tooltip.append($("<div class=\"it-infobox-title\"></div>").text(ibTitle.text()));
                    generateSection(sec, csec.find(".pi-data"));
                } else
                    generateSection(sec, csec);
                tooltip.append(sec);
            }
        }
        tooltip.show();
        tooltip.find(".it-infobox").each(function() {
            if (this.offsetHeight < this.scrollHeight)
                sec.addClass("overflow"); // Applies some overflow-look through pseudoclasses.
        });
        updatePosition();
    }

    // Measurement to avoid mess-up for our jQuery selector statement, as it's influenced by user input.
    function escapeHtml(unsafe) {
        return decodeURIComponent(unsafe
            .replace(/"/g, "&quot;")
            .replace(/%~/g, "-")
            .replace(/_/g, " ")
            .replace(/\\/g, ""));
    }

    // Checks if we have cached data on the article, and loads/sets accordingly.
    function updateTooltip(article) {
        tooltip.hide();
        hovered_article = article;
        if (article in cache) {
            if (cache[article] !== false) {
                setTooltip(cache[article]); // The article data was cached, load it.
            }
        } else { // The article wasn't found in cache, pull it.
            tooltip.html("<div class=\"it-title\">Loading. . . </div>");
            tooltip.show();
            updatePosition();

            var handleDom = function(domString) {
                var dom = $(domString);
                var queryParts = article.split("#");

                // We're showing information from the first infobox in the tooltip.
                var infobox = $(dom.find(".portable-infobox"));

                // Check if there is a infobox, if not hide the tooltip automatically.
                if (infobox.length === 0) {
                    tooltip.hide();
                }


                if (dom.find(".tooltip-data").length > 0)
                    infobox = dom.find(".tooltip-data");

                if (queryParts.length > 1) { // URL has anchor, look for the right infobox.
                    var currentTabber = $(dom.find("#WikiaArticle>div"));
                    var anchorParts = queryParts[1].split("-");
                    for (var i = 0; i < anchorParts.length; i++) {
                        var newTabber = $(currentTabber.find(">.tabber>.tabbertab[title='" + escapeHtml(anchorParts[i]) + "']"));
                        if (newTabber.length > 0)
                            currentTabber = newTabber;
                        if (currentTabber.find(">.tooltip-data").length > 0) {
                            infobox = currentTabber.find(">.tooltip-data");
                            break;
                        }
                    }
                    // If our nested tabbers contains any infobox, we'll use that over the first one one the page.
                    if ($(currentTabber.find(".portable-infobox")).length > 0) {
                        infobox = $(currentTabber.find(".portable-infobox"));
                    }
                    if (currentTabber.find(">.tooltip-data").length > 0) {
                        infobox = currentTabber.find(">.tooltip-data");
                    }
                }

                if (infobox.length > 0) {
                    infobox = $(infobox[0]);

                    // Handle infobox tabs.
                    if (queryParts.length > 1 && infobox.find(".pi-tab-link").length > 1) {
                        var tabId = "pi-tab-0";
                        var escapedAnchor = escapeHtml(queryParts[1]);
                        infobox.find(".pi-tab-link").each(function() {
                            if ($(this).text().trim() == escapedAnchor) {
                                tabId = $(this).attr("data-pi-tab");
                            }
                        });
                        infobox.find(".pi-image-collection-tab-content").each(function() {
                            if ($(this).attr("id") != tabId)
                                $(this).remove();
                        });
                        infobox.find(".pi-title").text(
                            infobox.find(".pi-title").text() + " » " + escapedAnchor
                        );
                    }

                    cache[article] = infobox;
                    if (hovered_article == article)
                        setTooltip(infobox);
                } else {
                    // No infobox, so we'll mark this article as not having a tooltip.
                    cache[article] = false;
                }
            };

            // Cache page content for sets.
            var articleName = article.split("#")[0];
            if (articleName in cachePages)
                handleDom(cachePages[articleName]);
            else
                $.get("https://drednotio.fandom.com/wiki/" + article, function(domString) {
                    cachePages[articleName] = domString;
                    handleDom(domString);
                }).fail(function() {
                    // Article did not exist, so we'll mark this article as not having a tooltip.
                    cache[article] = false;
                });
        }
    }

    // Assigns hover-logic for an element to display tooltips.
    function setupElement(elem) {
        var article = elem.is("div") ? elem.attr("data-article") : elem.attr("href").substr(6); // Trim away /wiki/.
        elem.hover(function() {
            updateTooltip(article);
        }, function() {
            tooltip.hide();
            hovered_article = null;
        });
    }

    // Hook up tooltips to wiki links.
    $("#WikiaArticle a[href^='/wiki/'], #WikiaArticle .tooltip-linker").each(function() {
        setupElement($(this));
    });

    // Initialize.
    tooltip.hide();
    $(document.body).append(tooltip);
    var wind = $(window);

    // Follow the cursor.
    $(document).on('mousemove', function(e){
        lastX = e.clientX;
        lastY = e.clientY;
        updatePosition();
    });
});