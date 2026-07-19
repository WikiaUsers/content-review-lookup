/* Any JavaScript here will be loaded for all users on every page load. */

$(function () {

    function wrapSidebar() {

        const rail = document.getElementById("WikiaRail");
        if (!rail) return;

        if (rail.querySelector(".custom-sidebar")) return;

        const wrapper = document.createElement("div");
        wrapper.className = "custom-sidebar";

        Array.from(rail.children).forEach(child => {
            wrapper.appendChild(child);
        });

        rail.appendChild(wrapper);
    }

    wrapSidebar();

    // Just incase...!
    new MutationObserver(wrapSidebar).observe(document.body, {
        childList: true,
        subtree: true
    });

});