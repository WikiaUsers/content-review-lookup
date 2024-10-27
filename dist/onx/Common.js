/* Any JavaScript here will be loaded for all users on every page load. */

/* Replaces the default 'no image' image on page previews. */
window.pPreview = {};
window.pPreview.noimage = "https://static.wikia.nocookie.net/onx/images/e/e6/Site-logo.png/revision/latest?cb=20240304175616";
window.pPreview.RegExp = {};
window.pPreview.RegExp.iclasses = ['image'];
window.pPreview.RegExp.ipages= [/^File:/i];
window.pPreview.RegExp.ilinks = [/File:/i, /static\.wikia/i];

/* Loads Discord Integrator at the bottom of the rail every time. */
$(function() {
    mw.hook('DiscordIntegrator.added').add(function($el) {
        $el.appendTo('#WikiaRail');
    });
    
    var banner = document.createElement("div");
    // Add the content and class to the banner
    banner.textContent = "This wiki is designed as an OOC resource for documenting roleplay on ONX for the sake of viewer experience and community enjoyment/archiving";
    banner.style.backgroundColor = "#ff6666";
    banner.style.color = "white";
    banner.style.textAlign = "center";
    banner.style.padding = "10px";
    banner.style.fontSize = "10px";
    banner.style.fontWeight = "bold";
    banner.style.width = "100%";
    banner.style.position = "absolute";
    banner.style.top = "0";
    banner.style.left = "0";
    banner.style.zIndex = "1000";
    banner.style.zIndex = "1";
    var mainElement = document.querySelector(".fandom-community-header");
    if (mainElement) {
        mainElement.append(banner);
    }
});