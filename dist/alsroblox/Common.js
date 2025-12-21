/* Any JavaScript here will be loaded for all users on every page load. */

document.addEventListener('click', function(e) {
    var el = e.target.closest('.copy-area');
    if (!el) return;

    var text = el.getAttribute('data-copy');

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function(){
            el.innerHTML = "✔ Copied!";
            setTimeout(() => el.innerHTML = "Copy!", 1500);
        });
    } else {
        var temp = document.createElement("textarea");
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);

        el.innerHTML = "✔ Copied!";
        setTimeout(() => el.innerHTML = "Copy!", 1500);
    }
});

let tooltipLayer = null;
$(document).ready(function () {
    tooltipLayer = document.createElement("div");
    tooltipLayer.id = "tooltip-layer";
    tooltipLayer.style.position = "absolute";
    tooltipLayer.style.top = "0";
    tooltipLayer.style.left = "0";
    tooltipLayer.style.pointerEvents = "none";
    tooltipLayer.style.zIndex = 100;
    document.body.appendChild(tooltipLayer);
});

$(document).on("mouseenter", ".tooltip-container", function (e) {
    const tooltip = $(this).find(".tooltip-content").clone(true);

    tooltipLayer.innerHTML = "";
    tooltipLayer.appendChild(tooltip[0]);

    tooltip.css({
        position: "absolute",
        visibility: "visible",
        opacity: "1"
    });
});

$(document).on("mousemove", ".tooltip-container", function (e) {
    const tooltip = tooltipLayer.querySelector(".tooltip-content");
    if (!tooltip) return;

    tooltip.style.left = (e.pageX + 15) + "px";
    tooltip.style.top = (e.pageY + 15) + "px";
});

$(document).on("mouseleave", ".tooltip-container", function () {
    const tooltip = tooltipLayer.querySelector(".tooltip-content");
    if (!tooltip) return;

    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
});