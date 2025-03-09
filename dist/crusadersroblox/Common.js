const rarityBaseCosts = {
    Common: 100,
    Uncommon: 110,
    Rare: 120,
    Epic: 130,
    Legendary: 140,
    Mythical: 200,
};

function calculateUpgradeChance(upgrade) {
    if (upgrade == 0) return 0.98;
    if (upgrade == 1) return 0.95;
    if (upgrade >= 2 && upgrade <= 19) return 1 - (upgrade - 1) * 0.05;
    if (upgrade == 20) return 0.08;
    if (upgrade == 21) return 0.07;
    if (upgrade == 22) return 0.05;
    return 1;
}

function calculateGoldCost(currUpgrade, finalUpgrade, rarity, itemLevel) {
    let baseCost = rarityBaseCosts[rarity];
    let totalGold = 0;

    for (let i = currUpgrade; i < finalUpgrade; i++) {
        let chance = calculateUpgradeChance(i);
        let attemptCost = Math.floor(baseCost * (itemLevel + i) * 0.9);
        let averageAttempts = Math.ceil(1 / chance);
        totalGold += attemptCost * averageAttempts;
    }
    return totalGold;
}

$(document).ready(function () {
    if ($(".custom-calculator").length) {
        console.log("Calculator found! Injecting UI...");

        $(".custom-calculator").html(`
            <h3>Multi-Function Calculator</h3>
            <label for="calc-type">Select Calculator:</label>
            <select id="calc-type">
                <option value="strength">Item Strength</option>
                <option value="base-stat">Base Stat Finder</option>
                <option value="upgrade-cost">Total Upgrade Cost</option>
                <option value="tier-range">Tier/Star Ranges</option>
            </select>
            <div id="calculator-fields"></div>
            <button id="calc-btn">Calculate</button>
            <div id="calc-output">Result:</div>
        `);

        function loadFields(type) {
            let fieldsHTML = "";
            if (type === "strength") {
                fieldsHTML = `
                    <input type="number" id="statline" placeholder="Enter base stat">
                    <input type="number" id="upgrade" placeholder="Enter upgrade goal">
                `;
            } else if (type === "base-stat") {
                fieldsHTML = `
                    <input type="number" id="stat" placeholder="Enter current stat">
                    <input type="number" id="upgrade" placeholder="Enter current upgrade">
                `;
            } else if (type === "upgrade-cost") {
                fieldsHTML = `
                    <label for="rarity">Item Rarity:</label>
                    <select id="rarity">
                        <option value="Common">Common</option>
                        <option value="Uncommon">Uncommon</option>
                        <option value="Rare">Rare</option>
                        <option value="Epic">Epic</option>
                        <option value="Legendary">Legendary</option>
                        <option value="Mythical">Mythical</option>
                    </select>
                    <input type="number" id="lvl" placeholder="Enter item level">
                    <input type="number" id="item-upg" placeholder="Enter current upgrade">
                    <input type="number" id="target-upg" placeholder="Upgrade goal">
                `;
            } else if (type === "tier-range") {
                fieldsHTML = `
                    <input type="number" id="min-pot" placeholder="Enter minimum pot">
                    <input type="number" id="max-pot" placeholder="Enter maximum pot">
                `;
            }
            $("#calculator-fields").html(fieldsHTML);
        }

        loadFields("strength");

        $("#calc-type").on("change", function () {
            loadFields($(this).val());
        });

        $("#calc-btn").on("click", function () {
            let calcType = $("#calc-type").val();
            let result = "Invalid input!";

            if (calcType === "strength") {
                let statline = parseFloat($("#statline").val());
                let upgrade = parseInt($("#upgrade").val());

                if (!isNaN(statline) && !isNaN(upgrade)) {
                    result = Math.floor(upgrade + statline + (statline * (upgrade * 0.02)));
                }
            } else if (calcType === "base-stat") {
                let stat = parseFloat($("#stat").val());
                let upgrade = parseInt($("#upgrade").val());

                if (!isNaN(stat) && !isNaN(upgrade)) {
                    result = Math.floor((stat - upgrade) / (1 + (upgrade * 0.02)));
                }
            } else if (calcType === "upgrade-cost") {
                let rarity = $("#rarity").val();
                let lvl = parseInt($("#lvl").val());
                let itemUpg = parseInt($("#item-upg").val());
                let targetUpg = parseInt($("#target-upg").val());

                if (!isNaN(lvl) && !isNaN(itemUpg) && !isNaN(targetUpg) && rarityBaseCosts[rarity]) {
                    let totalCost = calculateGoldCost(itemUpg, targetUpg, rarity, lvl);
                    result = `Total Upgrade Cost: ${totalCost.toLocaleString()} Gold`;
                }
            } else if (calcType === "tier-range") {
                let minPot = parseFloat($("#min-pot").val());
                let maxPot = parseFloat($("#max-pot").val());

                if (!isNaN(minPot) && !isNaN(maxPot) && minPot < maxPot) {
                    let diff = maxPot - minPot;
                    let range = Math.floor(diff / 4);
                    let output = `
<br>
<div class="tier-result d-tier"><span>D Tier</span> <span class="star">★1</span>: ${minPot}-${minPot + range}</div>
<div class="tier-result c-tier"><span>C Tier</span> <span class="star">★2</span>: ${minPot + range + 1}-${minPot + range * 2}</div>
<div class="tier-result b-tier"><span>B Tier</span> <span class="star">★3</span>: ${minPot + range * 2 + 1}-${minPot + range * 3}</div>
<div class="tier-result a-tier"><span>A Tier</span> <span class="star">★4</span>: ${minPot + range * 3 + 1}-${maxPot - 1}</div>
<div class="tier-result s-tier"><span>S Tier</span> <span class="star">★5</span>: ${maxPot}</div>
`;
                    result = output;
                }
            }

            $("#calc-output").html("Result: " + result);
        });
    } else {
        console.log("Calculator div not found!");
    }
});


//MAKE IT BEAUTIFULLLL!!!!!
mw.util.addCSS(`
:root {
    --background-color: #4B2675; /* Main Background */
    --border-color: #3A1D5D; /* Border */
    --button-color: #6B3FB1; /* Button */
    --button-hover: #8D4EDD; /* Hover */
    --text-color: #E0C3FC; /* Text */
}

.tier-result {
    margin-top: 10px;
    padding: 5px;
    font-weight: bold;
    text-align: center;
    text-shadow: 1px 1px 2px black;
    display: inline-block;
    border-radius: 5px;
    width: 80%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
    margin-bottom: 5px;
}

.tier-result span {
    color: white; /* Tier Text Color */
    font-weight: bold;
}

.d-tier {
    background: #E63946; /* Red */
    border: 2px solid #9B2226; /* Dark Red Border */
}

.c-tier {
    background: #F4A261; /* Orange */
    border: 2px solid #E76F51; /* Dark Orange Border */
}

.b-tier {
    background: #F4D35E; /* Yellow */
    border: 2px solid #F6B93B; /* Dark Yellow Border */
}

.a-tier {
    background: #6A994E; /* Green */
    border: 2px solid #386641; /* Dark Green Border */
}

.s-tier {
    background: #4A90E2; /* Blue */
    border: 2px solid #3066BE; /* Dark Blue Border */
}

.star {
    color: #FFD700; /* Always Yellow Stars */
    text-shadow: 1px 1px 2px black;
}

.xp-calculator {
    background-color: var(--background-color);
    border: 2px solid var(--border-color);
    padding: 20px;
    text-align: center;
    max-width: 400px;
    margin: 20px auto;
    color: var(--text-color);
    font-family: Arial, sans-serif;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
}

.xp-calculator h3 {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 1px 1px 2px black;
}

.xp-calculator input[type="number"],
.xp-calculator select {
    width: 80%;
    padding: 5px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    text-align: center;
    background-color: #E0C3FC; /* Input Background */
    color: #4B2675; /* Input Text */
}

.xp-calculator button {
    padding: 8px 15px;
    background-color: var(--button-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.xp-calculator button:hover {
    background-color: var(--button-hover);
}

.xp-result {
    margin-top: 15px;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
}

.custom-calculator {
    background-color: var(--background-color); /* Same purple as XP calculator */
    border: 2px solid var(--border-color);
    padding: 20px;
    text-align: center;
    max-width: 400px;
    margin: 20px auto;
    color: var(--text-color);
    font-family: Arial, sans-serif;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
}

.custom-calculator h3 {
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 1px 1px 2px black;
}

.custom-calculator label {
    display: block;
    margin: 5px 0;
}

.custom-calculator input[type="number"],
.custom-calculator select {
    width: 80%;
    padding: 5px;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    text-align: center;
    background-color: #E0C3FC; /* Lavender Input Background */
    color: #4B2675; /* Purple Text */
}

.custom-calculator button {
    padding: 8px 15px;
    background-color: var(--button-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.custom-calculator button:hover {
    background-color: var(--button-hover);
}

.custom-result {
    margin-top: 15px;
    font-weight: bold;
    text-shadow: 1px 1px 2px black;
}

.xp-calculator label {
    display: flex;
    align-items: center; /* Vertically center the image and text */
    justify-content: center; /* Keep everything centered */
}

.xp-calculator .xp-potion-img {
    width: 35px; /* Adjust the size of the image */
    height: auto;
}

.xp-calculator .vip-img {
    width: 25px; /* Adjust the size of the image */
    height: auto;
    margin-right: 4px;
}
`);

// XP CALC
$(document).ready(function () {
    $(".xp-calculator").html(`
        <h3>XP Calculator</h3>
        <label>Current Level:</label>
        <input type="number" class="xp-current" min="1" value="1">
        <br>

        <label>Goal Level:</label>
        <input type="number" class="xp-goal" min="2" value="2">
        <br>

        <label>Dungeon (Optional):</label>
        <select class="xp-dungeon">
            <option value="">None</option>
        </select>
        <br>

        <label>Difficulty:</label>
        <select class="xp-difficulty" disabled>
            <option value="">Select Dungeon First</option>
        </select>
        <br>

        <label>Modifier:</label>
        <select class="xp-modifier">
            <option value="0">No Modifier</option>
            <option value="0.5">Nightmare (+50%)</option>
            <option value="1">Chaotic (+100%)</option>
            <option value="4">Impossible (+400%)</option>
        </select>
        <br>

        <label for="VIP Bonus"><img src="https://static.wikia.nocookie.net/crusadersroblox/images/6/6d/Vip.png/revision/latest?cb=20240916185949&format=original" alt="VIP" class="vip-img">VIP Bonus</label> 
        <input type="checkbox" class="xp-vip"> (+20%)
        <br>

        <label for="xp-potion"><img src="https://static.wikia.nocookie.net/crusadersroblox/images/9/9d/XP_Potion.png/revision/latest?cb=20240916192102" alt="XP Potion" class="xp-potion-img"> 2x XP Potion</label>

        <input type="checkbox" class="xp-potion"> (+100%)
        <br>

        <button class="xp-calculate">Calculate XP</button>
        <div class="xp-result"></div>
    `);

    const dungeons = {
        "Pirate Cove": {
            "Normal": 400,
            "Advanced": 2750,
            "Expert": 7500
        },
        "Sunken Ruins": {
            "Normal": 25000,
            "Advanced": 60000,
            "Expert": 90000
        }
    };

    // Load Dungeon Options
    Object.keys(dungeons).forEach(dungeon => {
        $(".xp-dungeon").append(`<option value="${dungeon}">${dungeon}</option>`);
    });

    // Update Difficulty Dropdown
    $(".xp-dungeon").on("change", function () {
        let selectedDungeon = $(this).val();
        let difficultyDropdown = $(".xp-difficulty");

        difficultyDropdown.empty().prop("disabled", !selectedDungeon);
        if (!selectedDungeon) {
            difficultyDropdown.append(`<option value="">Select Dungeon First</option>`);
            return;
        }

        Object.keys(dungeons[selectedDungeon]).forEach(difficulty => {
            difficultyDropdown.append(`<option value="${difficulty}">${difficulty}</option>`);
        });
    });

    function xpNeeded(level) {
        let v1 = 1 + level / 500;
        let v2 = 20 + level / 10;
        return Math.floor(Math.pow((v2 * Math.pow(level + 1, v1) * (level + 1)) - (v2 * (level + 1)), v1));
    }

    $(document).on("click", ".xp-calculate", function () {
        let currentLevel = parseInt($(".xp-current").val());
        let goalLevel = parseInt($(".xp-goal").val());
        let selectedDungeon = $(".xp-dungeon").val();
        let selectedDifficulty = $(".xp-difficulty").val();
        let selectedModifier = parseFloat($(".xp-modifier").val());
        let vip = $(".xp-vip").is(":checked");
        let potion = $(".xp-potion").is(":checked");
        let result = $(".xp-result");

        if (goalLevel <= currentLevel) {
            result.html("Goal level must be higher than current level.");
            return;
        }

        let totalXP = 0;
        for (let lvl = currentLevel; lvl < goalLevel; lvl++) {
            totalXP += xpNeeded(lvl);
        }

        let message = `Total XP needed: **${totalXP.toLocaleString()}**`;

        if (selectedDungeon && selectedDifficulty) {
            let xpPerRun = dungeons[selectedDungeon][selectedDifficulty];

            let modifierMultiplier = 1 + selectedModifier;

            // VIP Bonus
            let totalBuff = 0;
            if (vip) totalBuff += 20;
            if (potion) totalBuff += 100;

            let finalXP = Math.floor((xpPerRun * (1 + totalBuff / 100)) * modifierMultiplier);
            let runs = Math.ceil(totalXP / finalXP);

            message += `<br>Runs needed: **${runs}** (${selectedDungeon} - ${selectedDifficulty})`;
        }

        result.html(message);
    });
});