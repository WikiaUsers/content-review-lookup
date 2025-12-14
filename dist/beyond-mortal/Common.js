/* Any JavaScript here will be loaded for all users on every page load. */

/* ======================================================
   SEASONAL EFFECT TEST PANEL — Snowflake Toggle (Stable)
   ====================================================== */

(function () {

    var monthClasses = [
        "january-frost",
        "february-hearts",
        "march-bloom",
        "april-sakura",
        "may-sunshine",
        "june-pride",
        "july-fireflies",
        "august-heat",
        "september-leaves",
        "october-bats",
        "november-embers",
        "december-snow"
    ];

    function applyAutoSeason() {
        var month = new Date().getMonth();
        document.body.classList.add(monthClasses[month]);
    }

    function clearSeasonal() {
        for (var i = 0; i < monthClasses.length; i++) {
            document.body.classList.remove(monthClasses[i]);
        }
    }

    function initSeasonalToggle() {

        /* Permissions check */
        var groups = mw.config.get("wgUserGroups") || [];
        if (groups.indexOf("sysop") === -1 && groups.indexOf("content-moderator") === -1) {
            return;
        }

        /* Apply automatic month FIRST (always) */
        if (!document.body.classList.contains(monthClasses[new Date().getMonth()])) {
            applyAutoSeason();
        }

        /* Prevent duplicates */
        if (document.getElementById("seasonal-toggle-button")) {
            return;
        }

        /* Snowflake button */
        var toggleButton = document.createElement("div");
        toggleButton.id = "seasonal-toggle-button";
        toggleButton.textContent = "❄";
        document.body.appendChild(toggleButton);

        /* Panel */
        var panel = document.createElement("div");
        panel.id = "seasonal-test-panel";
        panel.innerHTML =
            '<div id="seasonal-panel-inner">' +
                '<select id="seasonal-selector">' +
                    '<option value="">— Select Effect —</option>' +
                    '<option value="auto">Auto Mode (Current Month)</option>' +
                    '<option value="january-frost">January — Frost</option>' +
                    '<option value="february-hearts">February — Hearts</option>' +
                    '<option value="march-bloom">March — Bloom</option>' +
                    '<option value="april-sakura">April — Sakura</option>' +
                    '<option value="may-sunshine">May — Sunshine</option>' +
                    '<option value="june-pride">June — Pride</option>' +
                    '<option value="july-fireflies">July — Fireflies</option>' +
                    '<option value="august-heat">August — Heat</option>' +
                    '<option value="september-leaves">September — Leaves</option>' +
                    '<option value="october-bats">October — Bats</option>' +
                    '<option value="november-embers">November — Embers</option>' +
                    '<option value="december-snow">December — Snow</option>' +
                '</select>' +
            '</div>';

        document.body.appendChild(panel);

        toggleButton.addEventListener("click", function () {
            panel.classList.toggle("open");
        });

        /* Manual override logic (ONLY when changed) */
        document.getElementById("seasonal-selector").addEventListener("change", function () {
            var value = this.value;

            clearSeasonal();

            if (!value) return;

            if (value === "auto") {
                applyAutoSeason();
                return;
            }

            document.body.classList.add(value);
        });
    }

    /* Run on page render + SPA navigation */
    mw.hook('wikipage.content').add(initSeasonalToggle);
    mw.hook('postEdit').add(initSeasonalToggle);

    /* Safety fallback */
    setTimeout(initSeasonalToggle, 500);

})();