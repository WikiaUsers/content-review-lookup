window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = false;
/* LockOldComments */

window.customThemes = {
    "Star": "Star_Theme",
    "Tower Defense": "Tower_Defense_Theme",
    "Alpha Deluxe": "Alpha_Deluxe_Theme",
    "Alpha Classic": "Alpha_Classic_Theme"
};

window.applyTheme = function(themeName) {
    var gadgetName = window.customThemes[themeName];
    if (!gadgetName) return;

    console.log("Applying theme:", themeName);

    if (!mw.user.isAnon()) {
        // Create an array of promises for all gadget posts
        var promises = Object.values(window.customThemes).map(function(name) {
            var value = (name === gadgetName) ? 1 : 0;
            return new mw.Api().post({
                action: "options",
                token: mw.user.tokens.get("csrfToken"),
                optionname: "gadget-" + name,
                optionvalue: value
            }).done(function() {
                mw.user.options.set("gadget-" + name, value);
            });
        });

        // Also add the custom-theme option
        promises.push(
            new mw.Api().post({
                action: "options",
                token: mw.user.tokens.get("csrfToken"),
                optionname: "custom-theme",
                optionvalue: themeName
            }).done(function() {
                mw.user.options.set("custom-theme", themeName);
            })
        );

        // Wait for all to finish, then reload
        Promise.all(promises).then(function() {
            console.log("All gadget options saved. Reloading page...");
            location.reload();
        });

    } else {
        // Anonymous: save locally then reload
        localStorage.setItem("selectedTheme", themeName);
        location.reload();
    }
};

// Attach buttons
mw.loader.using(["mediawiki.util"]).then(function() {
    function attachThemeButtons() {
        var buttons = document.querySelectorAll(".theme-test-button");

        buttons.forEach(function(btn) {
            btn.style.cursor = "pointer";
            var themeName = btn.getAttribute("data-theme");

            btn.onclick = function() {
                applyTheme(themeName);
            };
        });
    }

    attachThemeButtons();
    mw.hook("wikipage.content").add(attachThemeButtons);
});