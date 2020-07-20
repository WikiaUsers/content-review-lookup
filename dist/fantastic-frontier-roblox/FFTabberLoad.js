/*
The purpose of this add-on is to better handle nested tabbers. Currently this isn't handled by default.
*/

$(function() {
    var queryParts = window.location.hash.substring(1);
    var articleContainer = $("#WikiaArticle");
    var chosenTabs = {}; // Lookup for chosen tabs per toplevel tabber.
    
    // Measurement to avoid mess-up for our jQuery selector statement, as it's influenced by user input.
    function escapeHtml(unsafe) {
        return decodeURIComponent(unsafe
            .replace(/"/g, "&quot;")
            .replace(/%~/g, "-")
            .replace(/_/g, " ")
            .replace(/\\/g, ""));
    }
    
    // Reverse of above.
    function encodeTitle(title) {
        return encodeURIComponent(title)
            .replace(/\-/g, "%~")
            .replace(/ /g, "_")
            .replace(/&quot;/, "\"");
    }
    
    // Gets the topmost tabber from the element. This is the tabber highest up towards the article.
    function getTopmostTabber(elem) {
        var tabber = elem;
        while (elem !== articleContainer && elem.length > 0) {
            elem = elem.parent(); // Traverse upwards.
            if (elem.hasClass("tabber")) // If the parent is a tabber, update our var.
                tabber = elem;
        }
        return tabber;
    }
    
    function buildDefaultTabs(tabber) {
        var list = [];
        var tabPages = $(tabber).find(">.tabbertab");
        while (tabPages.length > 0) {
            list.push($(tabPages[0]).attr("title"));
            tabPages = $($(tabPages[0]).find(">.tabber>.tabbertab"));
        }
        return list;
    }
    
    function getTabberLevel(elem) {
        var level = -1;
        while (elem !== articleContainer && elem.length > 0) {
            elem = elem.parent(); // Traverse upwards.
            if (elem.hasClass("tabber")) // If the parent is a tabber, increment level.
                level++;
        }
        return Math.max(0, level);
    }
    
    function getHashFromButton(button) {
        var tabber = getTopmostTabber(button);
        
        if (!(tabber in chosenTabs)) {
            chosenTabs[tabber] = buildDefaultTabs(tabber);
        }
        
        var level = getTabberLevel(button);
        chosenTabs[tabber][level] = encodeTitle(button.attr("title"));
        
        return chosenTabs[tabber].join("-");
    }
    
    if (queryParts.length > 0) {
        var currentTabber = $("#WikiaArticle>div");
        var anchorParts = queryParts.split("-");
        var hasFocused = false;
        for (var i = 0; i < anchorParts.length; i++) {
            var newTabber = $(currentTabber.find(">.tabber>.tabbertab[title='" + escapeHtml(anchorParts[i]) + "'],>.small-tabber>.tabber>.tabbertab[title='" + escapeHtml(anchorParts[i]) + "']"));
            if (newTabber.length > 0) {
                currentTabber = newTabber;
                // Focus in on the loaded tabber tab by automating a click.
                var button = currentTabber.parent().find(".tabbernav a[title='" + escapeHtml(anchorParts[i]) + "']");
                button.click();
                hasFocused = true;
                getHashFromButton(button); // Update internal hash array for the button selection.
            }
        }
        if (hasFocused) // Keep the old hash.
            window.location.hash = "#" + queryParts;
        
        // Handle infobox tabs.
        if ($(".portable-infobox .pi-tab-link").length > 1) {
            var escapedAnchor = escapeHtml(queryParts);
            $(".portable-infobox .pi-tab-link").each(function() {
                if ($(this).text().trim() == escapedAnchor) {
                    $(this).click();
                }
            });
        }
    }
    $(".tabbernav a[title]").each(function() {
        var button = $(this);
        
        button.click(function() {
            var newHash = getHashFromButton(button); // Update hash array for this tabber hierarchy.
            var updateHash = function() {
                console.log("SET HASH:", newHash);
                window.location.hash = "#" + newHash; // Update hash in URL.
            };
            setTimeout(function() {
                window.location.hash = "#" + newHash; // Update hash in URL.
            }, 1);
        });
    });
});