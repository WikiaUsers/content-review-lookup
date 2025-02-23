mw.hook("wikipage.content").add(function($content) {
	/*
	This element serves as a tooltip for showing article info on a link's hover.
	It pulls the desired infobox's information and displays it; if none is found, no tooltip is displayed.
	Supports targeting of specific infoboxes in case an article contains multiple infoboxes. This is done with the help of a parameter named "anchor" assigned to each of the infoboxes' templates. For example, one might have a link to an article's section such as "Gems#Amethyst" which has multiple infoboxes. Our Amethyst infobox should then include a parameter such as "anchor=Amethyst" in order for the tooltip to know which infobox to display.
	Supports display of panels within an infobox as well. The tooltip will display each panel's information separately, switching panels every 5 seconds. In addition, a 'summary' panel will be displayed before the other content panels with aggregated quantities of the content panels' values.
	*/
	
    // Tooltip is placed at the bottom of the page.
    var tooltip = $('<div id="item-tooltip"></div>');

    var htmlTagRgx = /<.+>/;

    // Cache for already-checked items, to save resources.
    var cache = {};
    // To properly load the tooltip when the user changes focus quickly.
    var hovered_article = null;
    // For positioning the tooltip.
    var lastX = 0,
        lastY = 0;
    // For rotating through the tooltip's panels if needed.
    var nextPanel,
        currentPanel = 0;

    // Initialize.
    tooltip.hide();
    $(document.body).append(tooltip);
    var wind = $(window);

    // Follow the cursor.
    $(document).on("mousemove", function(e) {
        lastX = e.clientX;
        lastY = e.clientY;
        updatePosition();
    });

    function updatePosition() {
        tooltip.css({
            left: Math.min(wind.width() - tooltip.width() - 35, lastX + 10),
            top: Math.min(wind.height() - tooltip.height() - 35, lastY + 50),
        });
    }

    function findByProp(object, property, value) {
        return object.filter(function(obj) {
            return obj[property] === value || value.indexOf(obj[property]) > -1;
        });
    }

    // Find the correct infobox given an anchor by comparing it to the "anchor" parameter given to the template.
    function findBoxByAnchor(data, anchor) {
        return data.filter(function(infobox) {
            return findByProp(infobox, "type", "data").filter(function(
                parameter
            ) {
                return (
                    parameter.data.source === "anchor" &&
                    parameter.data.value === anchor
                );
            }).length;
        });
    }

    /**
     * Generates a section of key-value pairs to the tooltip.
     * The infobox's headers are reflected in the tooltip, as well as the content (rows) beneath those headers, presented as key-value pairs.
     * @param {object[]} data - Array of objects, each containing information about the infobox's row names and values.
     * @param {boolean} isSmart - Whether the infobox section has a smart layout (e.g. multiple rows and/or columns).
     * @param {HTMLElement} [parent=tooltip] - An optional parent element to append the generated section to, opposed to the tooltip by default.
     */
    function generateSection(data, isSmart, parent) {
        parent = parent || tooltip;
        var section = $('<div class="it-infobox"></div>');
        var isGroup = Array.isArray(data);
        var header = isGroup && findByProp(data, "type", "header")[0];
        var items = isGroup ? findByProp(data, "type", "data") : [data];
        if (header) {
            var title = $('<div class="it-infobox-title"></div>');
            title.html(header.data.value); // To unescape HTML entities.
            parent.append(title);
        }
        items.forEach(function(item) {
            if (
                item.data.source === "sketchfab_link" ||
                (isSmart && item.data.value === "-")
            ) {
                return;
            }
            var secItem = $(
                '<div class="it-infoitem"><span class="it-infoitem-key"></span><span class="it-infoitem-val"></span></div>'
            );
            var itemKey = secItem.find(".it-infoitem-key");
            var itemVal = secItem.find(".it-infoitem-val");

            itemKey.text(
                item.data.label.replace(isSmart ? htmlTagRgx : "", "")
            );
            itemVal.html(
                item.data.value.replace(isSmart ? htmlTagRgx : "", "")
            ); // To allow for templates and listing.

            var valImage = secItem.find(".it-infoitem-val > img");
            if (valImage.length && valImage.attr("src").startsWith("data:"))
                valImage.attr("src", valImage.attr("data-src"));

            section.append(secItem);
        });
        parent.append(section);
    }

    /**
     * Generate the panels containing a summary and section contents to the tooltip.
     * This splits the tooltip into as many panels as the infobox has, with only one being visible at a time.
     * The tooltip automatically rotates between each panel, displaying their information for 5 seconds before moving to the next one.
     * @param {HTMLElement} summaryHeader - The element containing the infobox's title and main image to serve as the first panel's (summary) header.
     * @param {object[]} panels - Array of objects, each containing information about the infobox panel's images and row names and values.
     */
    function generatePanels(summaryHeader, panels) {
        var summary = {};

        panels.forEach(function(panel, i) {
            var itPanel = $('<div class="it-panel"></div>'); // Separate panel content from the other panels.
            itPanel.attr("data-panel", i + 1);
            var panelData = {};

            findByProp(panel.value, "type", ["data", "group"]).forEach(
                function(section) {
                    generateSection(
                        section.data.value,
                        section.data["row-items"] !== null,
                        itPanel
                    );

                    findByProp(section.data.value, "type", "data").forEach(
                        // Store panel values to use in summary.
                        function(item) {
                            var header = findByProp(
                                section.data.value,
                                "type",
                                "header"
                            )[0].data.value;
                            if (panelData[header] === undefined) {
                                panelData[header] = {};
                            }
                            var itemKey = item.data.label.replace(
                                htmlTagRgx,
                                ""
                            );
                            var itemVal = parseFloat(
                                item.data.value.replace(/<.+>|,/g, "")
                            );
                            panelData[header][itemKey] = isNaN(itemVal) ? 0 : itemVal;
                        }
                    );
                }
            );

            for (var header in panelData) {
                // Calculate aggregated totals of all the panel's values to display in summary.
                if (summary[header] === undefined) {
                    summary[header] = {};
                }
                for (var itemKey in panelData[header]) {
                    var sumValue = summary[header][itemKey];
                    var currentNumValue = panelData[header][itemKey];

                    if (sumValue === undefined) {
                        sumValue = currentNumValue;
                    } else {
                        sumValue += currentNumValue;
                    }

                    summary[header][itemKey] = sumValue;
                }
            }

            var panelHeader = $(
                '<div class="it-header"><img/><div class="it-title">-</div></div>'
            );
            var image = findByProp(panel.value, "type", "image")[0];
            var imageData = image ? image.data[0] : null;
            if (image)
                itPanel.prepend(
                    $('<div class="it-infobox it-desc"></div>').text(
                        imageData.caption
                    )
                );
            itPanel.prepend(panelHeader);
            panelHeader.find(".it-title").text(panel.label);
            if (image) {
                panelHeader
                    .find("img")
                    .attr("src", imageData.url.split("/rev")[0]);
            }

            tooltip.append(itPanel);
        });

        var summaryPanel = $('<div class="it-panel" data-panel="0"></div>');
        summaryPanel.html(summaryHeader);
        for (var header in summary) {
            var title = $('<div class="it-infobox-title"></div>');
            summaryPanel.append(title.text(header + " (Total)"));
            var section = $('<div class="it-infobox"></div>');
            for (var itemKey in summary[header]) {
                var itemVal = summary[header][itemKey];
                if (!itemVal) {
                    continue;
                }
                var secItem = $(
                    '<div class="it-infoitem"><span class="it-infoitem-key"></span><span class="it-infoitem-val"></span></div>'
                );
                secItem.find(".it-infoitem-key").text(itemKey);
                secItem.find(".it-infoitem-val").text(itemVal.toLocaleString());
                section.append(secItem);
            }
            summaryPanel.append(section);
        }
        tooltip.prepend(summaryPanel); // Summary panel containing aggregated values of the other panels' contents.

        var panelCount = tooltip.find(".it-panel").length;
        var bulletBar = $('<div class="it-bullet-bar"></div>');
        for (var i = 0; i < panelCount; i++)
            bulletBar.append(
                $('<div class="it-bullet"></div>').attr("data-bullet", i)
            );
        tooltip.append(bulletBar); // Bottom bar containing bullet points which indicate the panels' progression.

        function displayPanel() {
            for (var i = 0; i < panelCount; i++) {
                var iPanel = $(tooltip.find(".it-panel")[i]);
                var iBullet = $(tooltip.find(".it-bullet")[i]);
                if (parseInt(iPanel.attr("data-panel")) === currentPanel) {
                    iPanel.show();
                } else {
                    iPanel.hide();
                }
                if (parseInt(iBullet.attr("data-bullet")) === currentPanel) {
                    iBullet.addClass("animate");
                } else {
                    iBullet.removeClass("animate");
                }
            }
        }
        displayPanel();

        nextPanel = setInterval(function() {
            // Loop through available panels, switching every 5 seconds.
            currentPanel++;
            if (currentPanel + 1 > panelCount) {
                currentPanel = 0;
            }
            displayPanel();
            setOverflowSections();
            updatePosition();
        }, 5000);
    }

    /**
     * Updates the DOM for our tooltip element using the found data.
     * Here, the header (containing the tooltip title and image) is added (if present in the infobox), as well as other standard content.
     * This content can contain simple headers and rows, but it may also contain smart-layout sections and/or panels which are all handled accordingly.
     * @param {object[]} data - Array of objects, each containing information about the infobox. This includes the title, images, headers, groups and panels as well as their data.
     */
    function setTooltip(data) {
        var title = findByProp(data, "type", "title")[0];
        var titleData = title.data.value;
        var image = findByProp(data, "type", "image")[0];
        var imageData = image.data[0];
        var imageURL = image ? imageData.url.split("/rev")[0] : null;
        var caption = image ? imageData.caption : null;
        var header = $(
            '<div class="it-header"><img/><div class="it-title">-</div></div>'
        );
        if (title) {
            header.find(".it-title").text(titleData);
        }
        header.find("img").attr("src", imageURL);

        if (findByProp(data, "type", "panel").length) {
            // The infobox is separated into panels, so we'll do the same with the tooltip.
            tooltip.empty();
            generatePanels(
                header,
                findByProp(data, "type", "panel")[0].data.value.map(function(
                    section
                ) {
                    return section.data;
                })
            );
        } else {
            tooltip.html(header);

            if (caption && imageData.alt === null)
                tooltip.append(
                    $('<div class="it-infobox it-desc"></div>').text(caption)
                );

            var sections = findByProp(data, "type", ["data", "group"]);
            sections.forEach(function(section) {
                generateSection(
                    section.type === "group" ? section.data.value : section,
                    section.data["row-items"] !== null
                );
            });
        }

        tooltip.show();
        setOverflowSections();
        updatePosition();
    }

    function setOverflowSections() {
        tooltip.find(".it-infobox").each(function () {
            var box = $(this);
            if (box[0].offsetHeight < box[0].scrollHeight) {
                box.addClass("overflow"); // Applies some overflow-look through pseudoclasses.
                animateScroll(box, box[0].scrollHeight); // Scroll through box's contents automatically in a loop.
            }
        });
    }

    function animateScroll(jQElement, scrollHeight) {
        jQElement[0].scrollTop = 0;
        if (jQElement.is(":visible")) {
            setTimeout(function() {
                jQElement.stop().animate(
                    {
                        scrollTop: scrollHeight,
                    },
                    {
                        duration: (scrollHeight / 75) * 1000,
                        easing: "linear",
                        complete: function() {
                            jQElement[0].scrollTop = 0;
                            animateScroll(jQElement, scrollHeight);
                        },
                    }
                );
            }, 1750);
        }
    }

    // Checks if we have cached data on the article, and loads/sets accordingly.
    function updateTooltip(article) {
        tooltip.hide();
        hovered_article = article;
        var queryParts = article.split("#");
        var articleName = queryParts[0];

        function handleParse(parseData) {
            var infobox = parseData[0]; // By default, grab first infobox in the article.
            if (queryParts.length > 1 && parseData.length > 1) {
                // URL has anchor, look for the right infobox.
                var infoboxMatches = findBoxByAnchor(
                    parseData,
                    decodeURIComponent(queryParts[1]).replaceAll("_", " ") // Escape HTML characters and convert to user-readable format.
                );

                if (infoboxMatches.length) infobox = infoboxMatches[0]; // The anchor matches an infobox, we'll use it.
            }

            if (hovered_article == article) setTooltip(infobox);
        }

        if (articleName in cache) {
            if (cache[articleName] !== false) handleParse(cache[articleName]); // The article data was cached, load it.
        } else {
            // The article wasn't found in cache, pull it.
            tooltip.html('<div class="it-title it-loading">Loading...</div>');
            tooltip.show();
            updatePosition();

            if (articleName in cache){
                handleParse(cache[articleName]);
            } else {
                // We use the MediaWiki API to parse solely the article's infoboxes.
                $.getJSON(
                    "/api.php?action=parse&prop=properties&format=json&callback=?&page=" + articleName,
                    function (data) {
                        if ("error" in data || !data.parse.properties.length) {
                            // Article did not exist or doesn't have an infobox, so we'll mark this article as not having a tooltip.
                            cache[articleName] = false;
                            if (hovered_article == article) tooltip.hide();
                        } else {
                            var infoboxes = findByProp(
                                data.parse.properties,
                                "name",
                                "infoboxes"
                            );
                            
                            if (!infoboxes.length) {
                                // Article now definitely doesn't have an infobox, mark it as not having a tooltip.
                                cache[articleName] = false;
                                if (hovered_article == article) tooltip.hide();
                            } else {
                                var parsedInfoboxes = JSON.parse(
                                    infoboxes[0]["*"]
                                ).map(function (parsed) {
                                    return parsed.data;
                                });
                                
                                cache[articleName] = parsedInfoboxes;
                                handleParse(parsedInfoboxes);
                            }
                        }
                    }
                );
            }
        }
    }

    // Hook up tooltips to wiki links. If elements are loaded in after article load, we catch those too.
    $("#content").on(
        "mouseenter",
        "*:not(.mw-editsection, .mw-editform-cancel) > a[href^='/wiki/']",
        function() {
            var article = $(this).attr("href").substr(6); // Trim away /wiki/.
            if (article.indexOf("action=") > -1) return; // Don't allow pulling any links with "action=", as it may be a URL query part.
            updateTooltip(article);
        }
    );
    $("#content").on(
        "mouseleave",
        "*:not(.mw-editsection) > a[href^='/wiki/']",
        function() {
            tooltip.hide();
            hovered_article = null;
            clearInterval(nextPanel);
            currentPanel = 0;
        }
    );
});