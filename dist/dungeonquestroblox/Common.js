window.UserTagsJS = {
    modules: {},
    tags: {
        former_staff: { u: 'Former DQ Wiki Staff', order: 100 },
        contributor: { u: 'Contributor', order: 101 },
        impactful: { u: 'Impactful User', order: 102 },
        bureaucrat: { order: 1 }
    }
};
UserTagsJS.modules.custom = {
    'MeboX': ['former_staff'],
    'DankRendezvous': ['former_staff'],
    'Bloodywalsh': ['former_staff'],
    'Ghostman1856': ['former_staff'],
    'HaxMagician': ['former_staff'],
    "It'sABidoof": ['former_staff'],
    'ObviouslyHidden': ['former_staff'],
    'LilyKillyKitty': ['former_staff'],
    'Noobyrblx011': ['former_staff'],
    'TotallyNotJullian': ['former_staff'],
    'TheTreasureHunter': ['former_staff'],
    'Hellogillyface': ['impactful'],
    'Iceslasher123': ['impactful'],
    '010010000110100I': ['impactful'],
    'SaltyNoobz': ['impactful'],
    'Airpodes': ['impactful'],
    'Jack1o7': ['impactful'],
};

UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 45; 
UserTagsJS.modules.metafilter = {
    sysop: ['bureaucrat'], // Remove administrator group from bureaucrats

};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];

// Big churgus 1: Add da calculators  
(function () {
    mw.hook("wikipage.content").add(function ($content) {
        $content.find(".level-calculator").each(function (i, elem) {
            addLevelCalculator(elem);
        });
        $content.find(".damage-calculator").each(function (i, elem) {
            addDamageCalculator(elem);
        });
        $content.find(".potential-calculator").each(function (i, elem) {
            addPotentialCalculator(elem);
        });
    });

    //Create da calculators
    var dungeons = [
        { name: "None", difficulties: ["Pick Dungeon First"]},
        { name: "Yokai Peak", difficulties: ["Insane", "Nightmare"]},
        { name: "Gilded Skies", difficulties: ["Insane", "Nightmare"]},
        { name: "Northern Lands", difficulties: ["Insane", "Nightmare", "Nightmare With Odin-R"]},
        { name: "Enchanted Forest", difficulties: ["Insane", "Nightmare"]},
        { name: "Aquatic Temple", difficulties: ["Insane", "Nightmare"]},
        { name: "Volcanic Chambers", difficulties: ["Insane", "Nightmare"]},
        { name: "Orbital Outpost", difficulties: ["Insane", "Nightmare"]},
        { name: "Boss Raids", difficulties: ["Unapplicable"]},
        { name: "Steampunk Sewers", difficulties: ["Insane", "Nightmare"]},
        { name: "Ghastly Harbor", difficulties: ["Insane", "Nightmare"]},
        { name: "The Canals", difficulties: ["Insane", "Nightmare"]},
        { name: "Samurai Palace", difficulties: ["Insane", "Nightmare"]},
        { name: "The Underworld", difficulties: ["Insane", "Nightmare"]},
        { name: "King's Castle", difficulties: ["Insane", "Nightmare"]},
        { name: "Pirate Island", difficulties: ["Insane", "Nightmare"]},
        { name: "Winter Outpost", difficulties: ["Easy", "Medium", "Hard", "Insane", "Nightmare"]},
        { name: "Desert Temple", difficulties: ["Easy", "Medium", "Hard", "Insane", "Nightmare"]},
    ];
    var dungeonsWithEXP = [
        {name: "Yokai Peak Insane", baseEXP: 192650000000},
        {name: "Yokai Peak Nightmare", baseEXP: 350950000000},
        {name: "Gilded Skies Insane", baseEXP: 63500000000},
        {name: "Gilded Skies Nightmare", baseEXP: 115500000000},
        {name: "Northern Lands Insane", baseEXP: 21820000000},
        {name: "Northern Lands Nightmare", baseEXP: 36600000000},
        {name: "Northern Lands Nightmare With Odin-R", baseEXP: 58600000000},
        {name: "Enchanted Forest Insane", baseEXP: 6900000000},
        {name: "Enchanted Forest Nightmare", baseEXP: 11280000000},
        {name: "Aquatic Temple Insane", baseEXP: 2034000000},
        {name: "Aquatic Temple Nightmare", baseEXP: 3564000000},
        {name: "Volcanic Chambers Insane", baseEXP: 755000000},
        {name: "Volcanic Chambers Nightmare", baseEXP: 1225000000},
        {name: "Orbital Outpost Insane", baseEXP: 329000000},
        {name: "Orbital Outpost Nightmare", baseEXP: 506500000},
        {name: "Boss Raids Unapplicable", baseEXP: 130000000},
        {name: "Steampunk Sewers Insane", baseEXP: 35700000},
        {name: "Steampunk Sewers Nightmare", baseEXP: 59600000},
        {name: "Ghastly Harbor Insane", baseEXP: 12840000},
        {name: "Ghastly Harbor Nightmare", baseEXP: 24160000},
        {name: "The Canals Insane", baseEXP: 4594000},
        {name: "The Canals Nightmare", baseEXP: 8005000},
        {name: "Samurai Palace Insane", baseEXP: 1934000},
        {name: "Samurai Palace Nightmare", baseEXP: 3500000},
        {name: "The Underworld Insane", baseEXP: 546000},
        {name: "The Underworld Nightmare", baseEXP: 924000},
        {name: "King's Castle Insane", baseEXP: 135900},
        {name: "King's Castle Nightmare", baseEXP: 271800},
        {name: "Pirate Island Insane", baseEXP: 51150},
        {name: "Pirate Island Nightmare", baseEXP: 82200},
        {name: "Winter Outpost Easy", baseEXP: 6564},
        {name: "Winter Outpost Medium", baseEXP: 9180},
        {name: "Winter Outpost Hard", baseEXP: 16140},
        {name: "Winter Outpost Insane", baseEXP: 27840},
        {name: "Winter Outpost Nightmare", baseEXP: 46180},
        {name: "Desert Temple Easy", baseEXP: 253},
        {name: "Desert Temple Medium", baseEXP: 396},
        {name: "Desert Temple Hard", baseEXP: 785},
        {name: "Desert Temple Insane", baseEXP: 1307},
        {name: "Desert Temple Nightmare", baseEXP: 2669},
    ];
    var difficulties = ["Pick Dungeon First"];
    var dungeonsNames = dungeons.map(function (a) { return a.name; });

    function addLevelCalculator(div) {
        createSpan(div).update("DQ Wiki Level Calculator");
        var eventCheckBox = createCheckBox("event", "2x EXP Event");
        var boosterCheckBox = createCheckBox("booster", "Booster activated");
        var dungeonField = createSelectField("dungeon", "Pick Dungeon (optional)", dungeonsNames);
        var difficultyField = createSelectField("difficulty", "Pick Difficulty (optional)", difficulties);
        var currentField = createField("current", "Your current level");
        var goalField = createField("goal", "Your goal level");
        var submit = document.createElement("button");
        submit.append("Calculate");
        var result = createSpan(div);

        div.append(
            createBr(),
            eventCheckBox.label, eventCheckBox.input, createBr(),
            boosterCheckBox.label, boosterCheckBox.input, createBr(),
            dungeonField.label, dungeonField.select, createBr(),
            difficultyField.label, difficultyField.select, createBr(),
            currentField.label, currentField.input, createBr(),
            goalField.label, goalField.input, createBr(),
            submit, createBr()
        );
        
        dungeonField.select.oninput = function() {
            dungeons.forEach(function (a) {
                if (a.name == dungeonField.select.value) {
                    removeChildren(difficultyField.select);
                    
                    a.difficulties.forEach(function (value) {
                        var option = document.createElement("option");
                        option.value = option.label = value;
                        difficultyField.select.append(option);
                    });
                }
            });
        };
        submit.onclick = function () {
            var dungeonEXP = 1;
            var selectedDungeon = dungeonField.select.value + " " + difficultyField.select.value;
            dungeonsWithEXP.forEach(function (a) {
                if (a.name == selectedDungeon) {
                    dungeonEXP = a.baseEXP;
                }
            });
            var current = parseInt(currentField.input.value);
            var goal = parseInt(goalField.input.value);

            var xp = calculateXp(current, goal);
            var xpString = addCommas(xp);
            var modifier = 1;
            if (eventCheckBox.input.checked) {
                modifier++;
            }
            if (boosterCheckBox.input.checked) {
                modifier++;
            }
            var amountOfRuns = Math.ceil((xp/modifier/dungeonEXP));
            var amountOfVIPRuns = Math.ceil((xp/(modifier+0.2)/dungeonEXP));

            if (dungeonEXP == 1) {
            result.update("You will need about " + xpString + " experience.");
            }
            else {
            result.update("You will need about " + xpString + " experience." + "\n" +
            "Without VIP, you will need at least " + amountOfRuns + " runs of " + selectedDungeon + " to reach your goal level" + "\n" +
            "With VIP, you will need at least " + amountOfVIPRuns + " runs of " + selectedDungeon + " to reach your goal level"
            );  
            }
        };
    }

    var abilities = [
        { name: "Blade Barrage / God Spear / Amethyst Beams / Jade Rain", multiplier: 133 },
        { name: "Jade Roller", multiplier: 126 },
        { name: "Solar Beam (2 ticks)", multiplier: 126 / 2 },
        { name: "Flame Shuriken / Geyser", multiplier: 119 },
        { name: "Gale Barrage (3 ticks)", multiplier: 119 / 3 },
        { name: "Soul Drain (6 ticks)", multiplier: 119 / 6 },
        { name: "Frost Cone / Flame Strike", multiplier: 112 },
        { name: "Wind Blast / Crystalline Cannon / Lightning Burst / Agony Orbs", multiplier: 107 },
        { name: "Piercing Roots", multiplier: 100 },
        { name: "Fungal Poison (6 ticks)", multiplier: 100 / 6 },
        { name: "Ice Crash / Ice Barrage / Aquatic Smite / Ice Spikes", multiplier: 92 },
        { name: "Spear Strike / Water Orb", multiplier: 86 }
    ];
    var abilityNames = abilities.map(function (a) { return a.name; });
    
    function addDamageCalculator(div) {
        createSpan(div).update("DQ Wiki Damage Calculator");
        var abilityField = createSelectField("ability", "Select ABILITY", abilityNames);
        var helmField = createField("helm", "HELMET power");
        var armorField = createField("armor", "ARMOR power");
        var weaponField = createField("weapon", "WEAPON power");
        var skillField = createField("skill", "Damage Skill Points");
        var submit = document.createElement("button");
        submit.append("Calculate");
        var result = createSpan(div);

        div.append(
            createBr(),
            abilityField.label, abilityField.select, createBr(),
            helmField.label, helmField.input, createBr(),
            armorField.label, armorField.input, createBr(),
            weaponField.label, weaponField.input, createBr(),
            skillField.label, skillField.input, createBr(),
            submit, createBr()
        );

        submit.onclick = function () {
            var ability = 0;
            var selectedAbility = abilityField.select.value;
            abilities.forEach(function (a) {
                if (a.name == selectedAbility) {
                    ability = a.multiplier;
                }
            });

            var weapon = parseInt(weaponField.input.value);
            var armor = parseInt(armorField.input.value);
            var helm = parseInt(helmField.input.value);
            var skill = parseInt(skillField.input.value);

            var dmg = calculateDMG(weapon, armor, helm, skill, ability);
            var low = dmg * 0.95;
            var high = dmg * 1.05;

            var lowInner = dmg * 1.8 * 0.95;
            var baseInner = dmg * 1.8;
            var highInner = dmg * 1.8 * 1.05;

            var lowEInner = dmg * 1.9 * 0.95;
            var baseEInner = dmg * 1.9;
            var highEInner = dmg * 1.9 * 1.05;

            var lowDamage = truncate(low);
            var baseDamage = truncate(dmg);
            var highDamage = truncate(high);

            var lowInnerDamage = truncate(lowInner);
            var baseInnerDamage = truncate(baseInner);
            var highInnerDamage = truncate(highInner);

            var lowEInnerDamage = truncate(lowEInner);
            var baseEInnerDamage = truncate(baseEInner);
            var highEInnerDamage = truncate(highEInner);

            result.update("No Inner \n" +
                "Low Damage: " + lowDamage + "\n" +
                "Average: " + baseDamage + "\n" +
                "High Damage: " + highDamage + "\n\n" +

                "With Inner \n" +
                "Low Damage: " + lowInnerDamage + "\n" +
                "Average: " + baseInnerDamage + "\n" +
                "High Damage: " + highInnerDamage + "\n\n" +

                "With Enhanced Inner \n" +
                "Low Damage: " + lowEInnerDamage + "\n" +
                "Average: " + baseEInnerDamage + "\n" +
                "High Damage: " + highEInnerDamage + "\n\n" 
            ); 

        };
    }

    function addPotentialCalculator(div) {
        var powerField = createField("pot-power", "Current power (optional)");
        var currentField = createField("pot-current", "Upgrades already done");
        var totalField = createField("pot-total", "Total upgrades");
        var submit = document.createElement("button");
        submit.append("Calculate");
        var result = createSpan(div);

        div.append(
            powerField.label, powerField.input, createBr(),
            currentField.label, currentField.input, createBr(),
            totalField.label, totalField.input, createBr(),
            submit, createBr()
        );

        var power;
        var current;
        var total;

        submit.onclick = function () {
            var errString = parseFields();
            if (errString) {
                result.update(errString);
                return;
            }

            var cost = calculateUpgradeCost(current, total);
            var costString = addCommas(cost);

            if (isNaN(power)) {
                result.update("It will cost " + costString +
                    " gold to upgrade.");
            } else {
                var pot = calculatePotential(power, current, total);
                var potString = addCommas(pot);
                result.update("The potential power is " + potString +
                    ", and it will cost " + costString + " gold to upgrade.");
            }
        };

        function parseFields() {
            var message = "Remove any decimal points or thousands " +
                "separators from the ";
            if (hasDotsOrCommas(powerField.input.value)) {
                return message + "current power.";
            } else if (hasDotsOrCommas(currentField.input.value)) {
                return message + "upgrades already done.";
            } else if (hasDotsOrCommas(totalField.input.value)) {
                return message + "total upgrades.";
            }

            power = parseInt(powerField.input.value);
            current = parseInt(currentField.input.value);
            total = parseInt(totalField.input.value);

            if (isNaN(current) || isNaN(total)) {
                return "Both upgrades done and total upgrades " +
                    "must contain numbers.";
            } else if (power < 0 || current < 0 || total < 0) {
                return "All numbers cannot be negative.";
            } else if (current > total) {
                return "Upgrades already done (" + current +
                    ") cannot be more than total number of upgrades (" +
                    total + ").";
            }
        }
    }

    function createField(name, description) {
        var label = document.createElement("label");
        label.htmlFor = name;
        label.append(description);

        var input = document.createElement("input");
        input.name = input.id = name;
        input.type = "number";

        return { label: label, input: input };
    }
    
        function createCheckBox(name, description) {
        var label = document.createElement("label");
        label.htmlFor = name;
        label.append(description);

        var input = document.createElement("input");
        input.name = input.id = name;
        input.type = "checkbox";

        return { label: label, input: input };
    }
    
    function createSelectField(name, description, values) {
        var label = document.createElement("label");
        label.htmlFor = name;
        label.append(description);

        var select = document.createElement("select");
        select.name = select.id = name;

        values.forEach(function (value) {
            var option = document.createElement("option");
            option.value = option.label = value;
            select.append(option);
        });

        return { label: label, select: select };
    }
    

    function createSpan(parentElement) {
        var span = document.createElement("span");
        var node = document.createTextNode("");
        span.append(node);
        var appended = false;
        function update(text) {
            if (!appended) {
                appended = true;
                parentElement.append(span);
            }
            node.nodeValue = text;
        }
        return { span: span, node: node, update: update };
    }

    function createBr() {
        return document.createElement("br");
    }

    function hasDotsOrCommas(string) {
        return string.indexOf(".") != -1 || string.indexOf(",") != -1;
    }

    function addCommas(num) {
        return num.toLocaleString();
    }

    function calculateXp(currentLevel, goalLevel) {
        var xp = 0;
        for (var x = currentLevel; x < goalLevel; x++) {
            xp += Math.round(84 * Math.pow(1.13, x - 1));
        }
        return xp;
    }

    function calculateDMG(wep, arm, helm, skill, ability) {
        return Math.floor(wep * (0.6597 + 0.013202 * skill) * (arm + helm) * 0.0028 * ability);
    }

    function removeChildren(parent){
        while (parent.lastChild){
            parent.removeChild(parent.lastChild)
        }
    }
    function truncate(num) {
        // Leave numbers below 1K unchanged
        if (num < 1e3) {
            return num.toLocaleString();
        }

        var units = ["", "K", "M", "B", "T", "Q", "Qi", "sx", "Sp", "O", "N", "de"];
        // Get index of unit above (1 = K, 2 = M)
        var index = Math.floor((num.toFixed().length - 1) / 3);
        // Calculate the significant figures
        var sig = (+(num + 'e-' + index * 3)).toFixed(2);
        var unit = units[index];
        return sig + unit;
    }

    function calculatePotential(power, current, total) {
        var potential = power;
        var upgrades = current;
        while (potential < 200 && upgrades < total) {
            if (potential < 20) {
                potential++;
            } else {
                potential += Math.floor(potential / 20);
            }
            upgrades++;
        }
        potential += (total - upgrades) * 10;
        return potential;
    }

    function calculateUpgradeCost(current, total) {
        var cost = 0;
        if (current < 24) {
            if (current === 0 && total > 0) cost = 100;
            var c = 100;
            for (var i = 1; i < 24 && i < total; i++) {
                c = c * 1.06 + 50;
                if (i >= current) cost += Math.floor(c);
            }
        }
        var s = current < 24 ? 24
            : current > 466 ? 466
            : current;
        var e = total < 24 ? 24
            : total > 466 ? 466
            : total;
        cost += (e - s) * (110 * (e + s) - 2445);
        s = current < 466 ? 466 : current;
        e = total < 466 ? 466 : total;
        cost += (e - s) * 100000;
        return cost;
    }
})();