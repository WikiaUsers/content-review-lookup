// Return if user is in light or dark mode (Thundermaker300)
function darkModeCheck(element) {
	var filename = element.getAttribute("data-image-name").replace(" light icon.png", " dark icon.png");
	var newsrc = "https://roblox.fandom.com/wiki/Special:Redirect/file/" + filename;
	element.setAttribute("alt", element.getAttribute("alt").replace(" light icon.png", " dark icon.png"));
	element.setAttribute("data-image-name", element.getAttribute("data-image-name").replace(" light icon.png", " dark icon.png"));
	element.setAttribute("data-image-key", element.getAttribute("data-image-key").replace("_light_icon.png", "_dark_icon.png"));
	element.setAttribute("data-src", newsrc);
	element.src = newsrc;
}
function swapIcons() {
	document.querySelectorAll(".theme-fandomdesktop-dark img[data-image-name$=' light icon.png']").forEach(darkModeCheck);
}

window.addEventListener('load', function () {
  swapIcons();
})

// NoLicenseWarning script
window.NoLicenseWarning = {
    forceLicense: true,
    excludedGroups: []
};

// Import user group scripts (Mark Otaris)
var ug = mw.config.get("wgUserGroups").join(), group;

if      (/sysop/.test(ug))             group = "sysop";
else if (/content-moderator/.test(ug)) group = "content-moderator";

if (group)
    importScript("MediaWiki:Group-" + group + ".js");