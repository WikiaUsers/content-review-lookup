$(function () {
    if (window.mcuiLoadedV3) return;
    window.mcuiLoadedV3 = true;

    // Removes legacy handlers if any
    $(document.body).off("click", ".sbw-ui-tabber .sbw-ui-tab");
    $(document.body).off("click", ".sbw-ui-tabber .invslot[class*='goto-'] a");
    $(document.body).off("click", ".sbw-ui-tabber .invslot");

    function clickTab(elem, id) {
        var $parent = elem.closest(".sbw-ui-tabber");
        id = "ui-" + id;
        
        var $target = $parent.find(".sbw-ui-tab-content#" + id);
        if (!$target.length) {
            console.warn("No such tab ID \"" + id + "\"");
            return;
        }

        // Hide all sibling tabs
        $parent.find(".sbw-ui-tab-content").not($target).addClass("hidden").hide();
        // Show target tab
        $target.removeClass("hidden").show();

        // Lazy load trigger
        var onloadEl = $target.find(".lazyload, .lzy[onload]");
        if (onloadEl.length && typeof $(window).trigger === "function") {
            $(window).trigger("scroll");
        }
    }

    // Event Delegation for standard tabs
    $(document.body).on("click", ".sbw-ui-tabber .sbw-ui-tab", function (e) {
        var id = $(this).data("tab");
        if (id) {
            clickTab($(this), id);
        }
    });

    // Event Delegation for inventory slots (The robust fix)
    $(document.body).on("click", ".sbw-ui-tabber .invslot", function (e) {
        var classes = Array.from(this.classList).filter(function (c) {
            return c.indexOf("goto-") === 0 || c.indexOf("ui-") === 0;
        });
        if (classes.length) {
            // Prevent link navigation if it has an A tag
            if ($(e.target).closest("a").length) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
            
            var className = classes[classes.length - 1]
                .replace("goto-", "")
                .replace("ui-", "");
            
            clickTab($(this), className);
        }
    });

    // Event Delegation for return buttons
    $(document.body).on("click", ".sbw-ui-tabber .mcui-returnbutton", function (e) {
        var className = $(this).data("return-id");
        if (className) {
            clickTab($(this), className);
        }
    });

    mw.hook("wikipage.content").add(function (pSection) {
        if (pSection.find(".sbw-ui-tabber").length) {
            // Hide everything that starts as hidden
            pSection.find(".sbw-ui-tab-content.hidden").hide();

            // makes an extra button to go back to the first UI tab
            pSection.find(".sbw-ui-tabber").each(function () {
                var elementId = $(this).find("> .sbw-ui-tab-content:first-child").attr("id");
                if (!elementId) return;
                var className = elementId.replace("ui-", "");
                
                $(this).find(".mcui").each(function() {
                    // Only append if it doesn't already have one
                    if (!$(this).find(".mcui-returnbutton").length) {
                        $(this).append(
                            $("<div>").addClass("mcui-returnbutton noselect").text("↻")
                            .attr("data-return-id", className)
                        );
                    }
                });
            });
        }
    });
});