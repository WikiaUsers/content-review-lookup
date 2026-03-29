window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = false;
/* LockOldComments */

// ===== CUSTOM THEME SYSTEM =====

window.customThemes = {
    "Star": "MediaWiki:Gadget-StarTheme.css",
    "Tower Defense": "MediaWiki:Gadget-TowerDefenseTheme.css",
    "Alpha Deluxe": "MediaWiki:Gadget-AlphaDeluxeTheme.css",
    "Alpha Classic": "MediaWiki:Gadget-AlphaClassicTheme.css"
};

window.applyTheme = function(themeName) {

    console.log("Applying theme:", themeName);

    var page = window.customThemes[themeName];

    if (!page) {
        console.warn("Theme not found:", themeName);
        return;
    }

    // Remove old theme
    var old = document.getElementById("custom-theme-css");
    if (old) old.remove();

    // Load CSS
    var link = document.createElement("link");
    link.id = "custom-theme-css";
    link.rel = "stylesheet";
    link.href =
        mw.util.wikiScript("load") +
        "?mode=articles&only=styles&articles=" +
        encodeURIComponent(page);

    document.head.appendChild(link);

    // Save persistently
    if (!mw.user.isAnon()) {
        new mw.Api().post({
            action: "options",
            token: mw.user.tokens.get("csrfToken"),
            optionname: "custom-theme",
            optionvalue: themeName
        }).done(function () {
            mw.user.options.set("custom-theme", themeName);
            console.log("Theme saved:", themeName);
        });
    }

    localStorage.setItem("selectedTheme", themeName);
};


// Auto-load saved theme immediately
(function () {

    var saved =
        mw.user.options.get("custom-theme") ||
        localStorage.getItem("selectedTheme");

    if (!saved) return;

    var page = window.customThemes[saved];
    if (!page) return;

    var link = document.createElement("link");
    link.id = "custom-theme-css";
    link.rel = "stylesheet";
    link.href =
        mw.util.wikiScript("load") +
        "?mode=articles&only=styles&articles=" +
        encodeURIComponent(page);

    document.head.appendChild(link);

})();


// Attach onclick to buttons
mw.loader.using(["mediawiki.util"]).then(function () {

    function attachThemeButtons() {

        var buttons = document.querySelectorAll(".theme-test-button");

        buttons.forEach(function(btn) {

            btn.style.cursor = "pointer";

            var themeName = btn.getAttribute("data-theme");

            btn.onclick = function () {
                console.log("Button clicked:", themeName);
                applyTheme(themeName);
            };

        });

        console.log("Theme buttons attached:", buttons.length);

    }

    // Run now
    attachThemeButtons();

    // Also run after AJAX navigation (Fandom uses dynamic page loads)
    mw.hook("wikipage.content").add(function () {
        attachThemeButtons();
    });

});