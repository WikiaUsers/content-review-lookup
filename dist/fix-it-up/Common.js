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