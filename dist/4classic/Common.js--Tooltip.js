(function() {

    function initViewportAwareTooltips() {

        document.addEventListener("mouseenter", function(e) {

            var item = e.target.closest(".om-item");
            if (!item) return;

            var tooltip = item.querySelector(".om-item-tooltip");
            if (!tooltip) return;

            tooltip.classList.remove("open-up", "open-left");

            var boundary = item.closest(".lv-desc.active");
            if (!boundary) {
                boundary = document.querySelector(".mw-parser-output");
            }
            if (!boundary) return;

            var boundaryRect = boundary.getBoundingClientRect();
            var itemRect = item.getBoundingClientRect();

            var estimatedHeight = tooltip.offsetHeight || 200;
            var estimatedWidth = tooltip.offsetWidth || 340;

            var spaceBelow = boundaryRect.bottom - itemRect.bottom;
            if (spaceBelow < estimatedHeight + 20) {
                tooltip.classList.add("open-up");
            }

            var spaceRight = boundaryRect.right - itemRect.left;
            if (spaceRight < estimatedWidth + 20) {
                tooltip.classList.add("open-left");
            }

        }, true);
    }

    function scan() {
        initViewportAwareTooltips();
    }

    scan();
    mw.hook("wikipage.content").add(scan);

})();