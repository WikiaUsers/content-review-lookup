function showTooltip(tooltip, element) {
    var position = tooltip.getBoundingClientRect();
    var direction = tooltip.dataset.wdsTooltipPosition;

    element.remove();
    element.setAttribute("class", "wds-tooltip");
    element.textContent = tooltip.dataset.wdsTooltip || "";
    element.classList.add("is-" + direction);

    switch (direction) {
        case "right":
            element.style.left = position.right + 6 + "px", element.style.top = (position.bottom - position.top) / 2 + position.top + "px";
            break;
        case "top":
            element.style.top = position.top - 6 + "px", element.style.left = (position.right - position.left) / 2 + position.left + "px";
            break;
        case "bottom":
            element.style.top = position.bottom + 6 + "px", element.style.left = (position.right - position.left) / 2 + position.left + "px";
            break;
        case "left":
            element.style.left = position.left - 6 + "px", element.style.top = (position.bottom - position.top) / 2 + position.top + "px";
            break;
    }

    document.body.appendChild(element);
}

function hideTooltip(tooltip) {
    tooltip.remove();
}

function setupTooltip(tooltip) {
    if (!tooltip.dataset.tooltipAttached && tooltip.dataset.wdsTooltip) {
        var element = document.createElement("div");

        tooltip.addEventListener("mouseenter", (function () { showTooltip(tooltip, element) }));
        tooltip.addEventListener("focus", (function () { showTooltip(tooltip, element) }));
        tooltip.addEventListener("mouseleave", (function () { hideTooltip(element) }));
        tooltip.addEventListener("blur", (function () { hideTooltip(element) }));
        tooltip.addEventListener("click", (function () { hideTooltip(element) }));
        tooltip.dataset.tooltipAttached = "1";
    }
}

document.querySelectorAll("[data-wds-tooltip]").forEach(setupTooltip);