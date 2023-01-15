$(function () {
    const almanac2All = document.querySelectorAll(".almanac2-plant");
    almanac2All.forEach(almanac2Family);
    almanac2All.forEach(almanac2FindMore);
    function almanac2Family(almanac2) {
        const lines = almanac2.querySelectorAll(".almanac2-data--line");
        if (lines.length > 1) {
            const familyLine = lines[lines.length - 1];
            const prevLine = lines[lines.length - 2];
            if (familyLine.classList.contains("almanac2-data--family-line") && prevLine.childNodes.length == 1) {
                prevLine.appendChild(familyLine.childNodes[0]);
                familyLine.parentNode.removeChild(familyLine);
            }
        }
    }
    function almanac2FindMore(almanac2) {
        const findMore = almanac2.querySelector(".almanac2-find-more");
        if (findMore && !findMore.classList.contains("almanac2-find-more--broken")) {
            findMore.addEventListener("click", almanac2FindMoreShowTooltip);
        }
    }
    function almanac2FindMoreShowTooltip(e) {
        this.classList.add("almanac2-find-more--show-tooltip");
        const tooltip = this.querySelector(".almanac2-find-more--tooltip");
        tooltip.addEventListener("click", almanac2FindMoreFocusTooltip);
        document.addEventListener("click", almanac2FindMoreHideTooltip, { once: true });
        e.stopPropagation();
    }
    function almanac2FindMoreFocusTooltip(e) {
        e.stopPropagation();
    }
    function almanac2FindMoreHideTooltip() {
        const findMoreAllShowing = this.querySelectorAll(".almanac2-find-more--show-tooltip");
        findMoreAllShowing.forEach(almanac2FindMoreHideTooltipCallback);
        function almanac2FindMoreHideTooltipCallback(findMore) {
            findMore.classList.remove("almanac2-find-more--show-tooltip");
            findMore.querySelector(".almanac2-find-more--tooltip").removeEventListener("click", almanac2FindMoreFocusTooltip);
        }
    }
});