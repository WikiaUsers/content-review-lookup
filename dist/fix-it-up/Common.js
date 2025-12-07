// Applies color to the spawn rates of new cars
$(document).ready(function () {

    function classifySpawnRate(elem) {
        const raw = elem.getAttribute("data-spawn");
        if (!raw) return;

        const value = parseFloat(raw);
        if (isNaN(value)) return;

        // Apply rarity classes based on your ranges
        if (value >= 30 && value <= 50) {
            elem.classList.add("rarity-common");
        } else if (value >= 11 && value < 30) {
            elem.classList.add("rarity-uncommon");
        } else if (value >= 2 && value < 11) {
            elem.classList.add("rarity-rare");
        } else if (value >= 0.5 && value < 2) {
            elem.classList.add("rarity-veryrare");
        } else if (value >= 0.1 && value < 0.5) {
            elem.classList.add("rarity-superrare");
        } else if (value >= 0.02 && value < 0.1) {
            elem.classList.add("rarity-ultrarare");
        }
    }

    function classifyPrice(elem) {
        const price = elem.getAttribute("data-price");
        if (!price) return;

        const text = price.toLowerCase();

        if (text.includes("robux")) {
            elem.classList.add("rarity-epic");
        } else if (text.includes("event")) {
            elem.classList.add("rarity-legendary");
        } else if (text.includes("moderator")) {
            elem.classList.add("rarity-staff")
        } else if (text.includes("hr")) {
        	elem.classList.add("rarity-staff")
        } else if (text.includes("offsale")) {
        	elem.classList.add("offsale-txt")
        } else if (text.includes("auction")) {
        	elem.classList.add("auction")
        }
    }

    // Process spawn rates
    document.querySelectorAll(".carrow-spawn[data-spawn]").forEach(el => {
        classifySpawnRate(el);
    });

    // Process price rarities
    document.querySelectorAll(".carrow-price[data-price]").forEach(el => {
        classifyPrice(el);
    });

});

// Adds that "NEW" tag to new cars on the cars page
mw.loader.using('mediawiki.util').then(function () {

    if (!document.getElementById("use-new-ribbons")) return;

    function addNewRibbon(target) {
        target.style.position = "relative";

        const ribbon = document.createElement("div");
        ribbon.textContent = "NEW";

        Object.assign(ribbon.style, {
            position: "absolute",
            top: "45px",
            padding: "2px 10px",
            background: "linear-gradient(135deg, #46f415, #01c171)",
            color: "white",
            fontSize: "12px",
            fontWeight: "800",
            letterSpacing: "0.5px",
            textAlign: "center",
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0,0,0,.35)",
            zIndex: 60,
            pointerEvents: "none",
        });

        target.appendChild(ribbon);
    }

    function applyRibbons() {
        
        document.querySelectorAll('.vehicle-row[data-new="yes"]').forEach(row => {

            const firstCell = row.querySelector(".vehicle-cell.vehicle-image");
            if (firstCell && !firstCell.dataset.ribbonApplied) {
                addNewRibbon(firstCell);
                firstCell.dataset.ribbonApplied = "true";
            }
        });
    }

    applyRibbons();
});