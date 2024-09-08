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
    'NinjaDogDB': ['former_staff'],
    'Trashh': ['former_staff'],
    'EQUENOS': ['former_staff'],
    'ImSpiriti': ['former_staff'],
    'Hellogillyface': ['impactful'],
    'Iceslasher123': ['impactful'],
    '010010000110100I': ['impactful'],
    'SaltyNoobz': ['impactful'],
    'Airpodes': ['impactful'],
    'Jack1o7': ['impactful'],
    'VoidDrin': ['impactful'],
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
        { name: "Yokai Peak", difficulties: ["Insane [200]", "Nightmare [205]"]},
        { name: "Gilded Skies", difficulties: ["Insane [190]", "Nightmare [195]"]},
        { name: "Northern Lands", difficulties: ["Insane [180]", "Nightmare [185]", "Nightmare With Odin-R"]},
        { name: "Enchanted Forest", difficulties: ["Insane [170]", "Nightmare [175]"]},
        { name: "Aquatic Temple", difficulties: ["Insane [160]", "Nightmare [165]"]},
        { name: "Volcanic Chambers", difficulties: ["Insane [150]", "Nightmare [155]"]},
        { name: "Orbital Outpost", difficulties: ["Insane [135]", "Nightmare [140]"]},
        { name: "Steampunk Sewers", difficulties: ["Insane [120]", "Nightmare [125]"]},
        { name: "Ghastly Harbor", difficulties: ["Insane [110]", "Nightmare [115]"]},
        { name: "The Canals", difficulties: ["Insane [100]", "Nightmare [105]"]},
        { name: "Samurai Palace", difficulties: ["Insane [90]", "Nightmare [95]"]},
        { name: "The Underworld", difficulties: ["Insane [80]", "Nightmare [85]"]},
        { name: "King's Castle", difficulties: ["Insane [70]", "Nightmare [75]"]},
        { name: "Pirate Island", difficulties: ["Insane [60]", "Nightmare [65]"]},
        { name: "Winter Outpost (Current)", difficulties: ["Easy [30]", "Medium [40]", "Hard [50]"]},
        { name: "Winter Outpost (Legacy)", difficulties: ["Easy [30]", "Medium [40]", "Hard [45]", "Insane [50]", "Nightmare [55]"]},
        { name: "Desert Temple (Current)", difficulties: ["Easy [1]", "Medium [5]", "Hard [15]"]},
        { name: "Desert Temple (Legacy)", difficulties: ["Easy [1]", "Medium [6]", "Hard [12]", "Insane [20]", "Nightmare [27]"]},
    ];
    var dungeonsWithEXP = [
        {name: "Yokai Peak Insane [200]", baseEXP: 192650000000},
        {name: "Yokai Peak Nightmare [205]", baseEXP: 350950000000},
        {name: "Gilded Skies Insane [190]", baseEXP: 63500000000},
        {name: "Gilded Skies Nightmare [195]", baseEXP: 115500000000},
        {name: "Northern Lands Insane [180]", baseEXP: 21820000000},
        {name: "Northern Lands Nightmare [185]", baseEXP: 36600000000},
        {name: "Northern Lands Nightmare With Odin-R", baseEXP: 58600000000},
        {name: "Enchanted Forest Insane [170]", baseEXP: 6900000000},
        {name: "Enchanted Forest Nightmare [175]", baseEXP: 11280000000},
        {name: "Aquatic Temple Insane [160]", baseEXP: 2034000000},
        {name: "Aquatic Temple Nightmare [165]", baseEXP: 3564000000},
        {name: "Volcanic Chambers Insane [150]", baseEXP: 755000000},
        {name: "Volcanic Chambers Nightmare [155]", baseEXP: 1225000000},
        {name: "Orbital Outpost Insane [135]", baseEXP: 329000000},
        {name: "Orbital Outpost Nightmare [140]", baseEXP: 506500000},
        {name: "Steampunk Sewers Insane [120]", baseEXP: 35700000},
        {name: "Steampunk Sewers Nightmare [125]", baseEXP: 59600000},
        {name: "Ghastly Harbor Insane [110]", baseEXP: 12840000},
        {name: "Ghastly Harbor Nightmare [115]", baseEXP: 24160000},
        {name: "The Canals Insane [100]", baseEXP: 4594000},
        {name: "The Canals Nightmare [105]", baseEXP: 8005000},
        {name: "Samurai Palace Insane [90]", baseEXP: 1934000},
        {name: "Samurai Palace Nightmare [95]", baseEXP: 3500000},
        {name: "The Underworld Insane [80]", baseEXP: 546000},
        {name: "The Underworld Nightmare [85]", baseEXP: 924000},
        {name: "King's Castle Insane [70]", baseEXP: 135900},
        {name: "King's Castle Nightmare [75]", baseEXP: 271800},
        {name: "Pirate Island Insane [60]", baseEXP: 51150},
        {name: "Pirate Island Nightmare [65]", baseEXP: 82200},
        {name: "Winter Outpost (Current) Easy [30]", baseEXP: 18800},
        {name: "Winter Outpost (Current) Medium [40]", baseEXP: 46800},
        {name: "Winter Outpost (Current) Hard [50]", baseEXP: 69000},
        {name: "Winter Outpost (Legacy) Easy [30]", baseEXP: 8340},
        {name: "Winter Outpost (Legacy) Medium [40]", baseEXP: 11300},
        {name: "Winter Outpost (Legacy) Hard [45]", baseEXP: 16140},
        {name: "Winter Outpost (Legacy) Insane [50]", baseEXP: 27840},
        {name: "Winter Outpost (Legacy) Nightmare [55]", baseEXP: 46180},
        {name: "Desert Temple (Current) Easy [1]", baseEXP: 490},
        {name: "Desert Temple (Current) Medium [5]", baseEXP: 1296},
        {name: "Desert Temple (Current) Hard [15]", baseEXP: 4789},
        {name: "Desert Temple (Legacy) Easy [1]", baseEXP: 253},
        {name: "Desert Temple (Legacy) Medium [6]", baseEXP: 396},
        {name: "Desert Temple (Legacy) Hard [12]", baseEXP: 785},
        {name: "Desert Temple (Legacy) Insane [20]", baseEXP: 1307},
        {name: "Desert Temple (Legacy) Nightmare [27]", baseEXP: 2669},
    ];
    var difficulties = ["Pick Dungeon First"];
    var dungeonsNames = dungeons.map(function (a) { return a.name; });

    function addLevelCalculator(div) {
        createSpan(div).update("DQ Wiki Level Calculator");
        var eventCheckBox = createCheckBox("event", "2x EXP Event");
        var boosterCheckBox = createCheckBox("booster", "EXP Potion activated");
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
		// GS
	{ name: "Blade Barrage / God Spear / Amethyst Beams / Jade Rain", multiplier: 133 },
	{ name: "Jade Roller", multiplier: 126 },
	{ name: "Solar Beam (2 ticks)", multiplier: 126 / 2 },
		// NL
	{ name: "Flame Shuriken / Geyser", multiplier: 119 },
	{ name: "Gale Barrage (3 ticks)", multiplier: 119 / 3 },
	{ name: "Soul Drain (6 ticks)", multiplier: 119 / 6 },
	{ name: "Frost Cone / Flame Strike", multiplier: 112 },
		// EF
	{ name: "Wind Blast / Crystalline Cannon / Lightning Burst / Agony Orbs", multiplier: 107 },
	{ name: "Piercing Roots", multiplier: 100 },
	{ name: "Fungal Poison (6 ticks)", multiplier: 100 / 6 },
		// AT
	{ name: "Ice Crash / Ice Barrage / Aquatic Smite / Ice Spikes", multiplier: 92 },
	{ name: "Spear Strike / Water Orb", multiplier: 86 },
		// VC
	{ name: "Lava Cage (5 ticks)", multiplier: 84 / 5 },
	{ name: "Lava Barrage (3 ticks)", multiplier: 83.2 / 3 },
	{ name: "Blade Fall / Amethyst Blast", multiplier: 82 },
	{ name: "Molten Shards / Lava Beam Orb", multiplier: 75 },
		// OO
	{ name: "Electric Field (4 ticks)", multiplier: 66.8 / 4 },
	{ name: "Energy Orb", multiplier: 65 },
	{ name: "Vortex Grenade (5 ticks)", multiplier: 62.5 / 5 },
	{ name: "Mystery Matter (3 ticks)", multiplier: 61.35 / 3 },
	{ name: "Explosive Mine", multiplier: 53 },
	{ name: "Focus Beam", multiplier: 47 },
		// BR
	{ name: "Orb Of Destruction (4 ticks)", multiplier: 51 / 4 },
	{ name: "Demonic Curse (10 ticks)", multiplier: 46 / 10 },
	{ name: "Infernal Blast", multiplier: 43.5 },
	{ name: "Electric Grinder (4 ticks)", multiplier: 42 / 4 },
	{ name: "Arrow Barrage", multiplier: 40 },
		{ name: "Molten Ball (2 ticks)", multiplier: 40 / 2 },
	{ name: "Chain Lightning", multiplier: 38 },
	{ name: "Explosive Punch", multiplier: 37 },
	{ name: "Ground Stomp", multiplier: 32 },
	{ name: "Twin Slash (2 ticks)", multiplier: 22 / 2 },
		// SS
	{ name: "Chromatic Rain (9 ticks)", multiplier: 54.9 / 9 },
	{ name: "Star Barrage (6 ticks)", multiplier: 44.4 / 6 },
	{ name: "Overcharge (3 ticks)", multiplier: 44.25 / 3 },
	{ name: "Chained Energy Blasts (4 ticks)", multiplier: 44 / 4 },
	{ name: "Triple Blade Throw (2 ticks)", multiplier: 42 / 2 },
	{ name: "Starfall", multiplier: 38 },
	{ name: "Arrow Rain (10 ticks)", multiplier: 35 / 10 },
	{ name: "Pulse Waves (6 ticks)", multiplier: 33 / 6 },
		// GH
	{ name: "Void Spheres (10 ticks)", multiplier: 43 / 10 },
	{ name: "Phantom Striker (6 ticks)", multiplier: 40.8 / 6 },
	{ name: "Spirit Bomb", multiplier: 38 },
	{ name: "Phantom Blades (6 ticks)", multiplier: 34.8 / 6 },
	{ name: "Pulse Beam (2 ticks)", multiplier: 33 / 2 },
	{ name: "Earth Spikes", multiplier: 32 },
	{ name: "Smite", multiplier: 25 },
	{ name: "Mighty Leap", multiplier: 24.7 },
		// TC
	{ name: "Vortex (10 ticks)", multiplier: 41.5 / 10 },
	{ name: "Forgotten Army (8 ticks)", multiplier: 32.8 / 8 },
	{ name: "Blade Storm (12 ticks)", multiplier: 46.8 / 12 },
	{ name: "Blade Revolver (6 ticks)", multiplier: 34.2 / 6 },
	{ name: "Icicle Barrage (2 ticks)", multiplier: 33 / 2 },
	{ name: "Tsunami", multiplier: 29.5 },
	{ name: "Earth Kick", multiplier: 22 },
	{ name: "Electric Slash (4 ticks)", multiplier: 38.4 / 4 },
	{ name: "Runic Strike", multiplier: 18.5 },
		// SP
	{ name: "Illusion Blast (4 ticks)", multiplier: 38 / 4 },
	{ name: "Ghostly Rampage (6 ticks)", multiplier: 30.6 / 6 },
	{ name: "Flame Cyclone (15 ticks)", multiplier: 39 / 15 },
	{ name: "Enchanted Shuriken (2 ticks)", multiplier: 26 / 2 },
	{ name: "Earth Clap", multiplier: 21 },
	{ name: "Hand Cannon", multiplier: 12 },
	{ name: "Lava Lash (2 ticks)", multiplier: 17.4 },
	{ name: "Berserk (11 ticks)", multiplier: 28.6 / 11 },
		// TU
	{ name: "Ice Totem (10 ticks)", multiplier: 31 / 10 },
	{ name: "Ice Nova (12 ticks)", multiplier: 27 / 12 },
	{ name: "Infernal Strike (7 ticks)", multiplier: 19.6 / 7 },
	{ name: "Demonic Spikes (12 ticks)", multiplier: 27.12 / 12 },
	{ name: "Infernal Orbs (12 ticks)", multiplier: 26.4 / 12 },
	{ name: "Rending Slice (15 ticks)", multiplier: 18 / 15 },
		// KC
	{ name: "Electric Boom (6 ticks)", multiplier: 25.5 / 6 },
	{ name: "Void Beam (6 ticks)", multiplier: 27.9 / 6 },
	{ name: "Blade Throw (2 ticks)", multiplier: 12.4 / 2 },
	{ name: "Thunderous Blast", multiplier: 9 },
	{ name: "Glacial Blows (4 ticks)", multiplier: 16.8 / 4 },
		// PI
	{ name: "Skull Flames (8 ticks)/Phantom Flames (8 ticks)", multiplier: 29.2 / 8 },
	{ name: "Enchanted Spinning Blades (12 ticks)", multiplier: 21 / 12 },
	{ name: "Pulsefire (16 ticks)", multiplier: 27.2 / 16 },
	{ name: "Ghostly Cannon Barrage (12 ticks)", multiplier: 27.6 / 12 },
	{ name: "Demonic Strike", multiplier: 5.5 },
		// WO
	{ name: "Piercing Rain (12 ticks)", multiplier: 18 / 12 },
	{ name: "Ground Slam", multiplier: 12 },
	{ name: "Searing Beam (6 ticks)", multiplier: 17.4 / 6 },
	{ name: "Fire Bomb", multiplier: 16.5 },
	{ name: "Arcane Barrage (11 ticks)", multiplier: 13.2 / 11 },
	{ name: "Lightning Beam (6 ticks)", multiplier: 15 / 6 },
	{ name: "Ice Needles (5 ticks)", multiplier: 8 / 5 },
	{ name: "Gale Slice (6 ticks)", multiplier: 7.2 / 6 },
		// DT
	{ name: "Lightning Strikes", multiplier: 5.2 },
	{ name: "Poison Cloud (6 ticks)", multiplier: 13.2 / 6 },
	{ name: "Arcane Spray (6 ticks)", multiplier: 12 / 2 },
	{ name: "Blue Fireball", multiplier: 2.75 },
	{ name: "Whirlwind (9 ticks)", multiplier: 9 / 9 },
	{ name: "Fireball", multiplier: 1 }
    ];
    var abilityNames = abilities.map(function (a) { return a.name; });
    
    function addDamageCalculator(div) {
        createSpan(div).update("DQ Wiki Damage Calculator");
        var abilityField = createSelectField("ability", "Select ABILITY", abilityNames);
        var helmField = createField("helm", "HELMET power");
        var armorField = createField("armor", "ARMOR power");
        var weaponField = createField("weapon", "WEAPON power");
        var ring1Field = createField("ring1", "RING 1 power");
        var ring2Field = createField("ring2", "RING 2 power");
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
            ring1Field.label, ring1Field.input, createBr(),
            ring2Field.label, ring2Field.input, createBr(),
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

            var weapon = (function() {
                        return weaponField.input.value !== '' ? parseInt(weaponField.input.value) : 0;
            }());
            var armor = (function() {
                        return armorField.input.value !== '' ? parseInt(armorField.input.value) : 0;
            }());
            var helm = (function() {
                        return helmField.input.value !== '' ? parseInt(helmField.input.value) : 0;
            }());
            var ring1 = (function() {
                        return ring1Field.input.value !== '' ? parseInt(ring1Field.input.value) : 0;
            }());
            var ring2 = (function() {
                        return ring2Field.input.value !== '' ? parseInt(ring2Field.input.value) : 0;
            }());
            var skill = (function() {
                        return skillField.input.value !== '' ? parseInt(skillField.input.value) : 1;
            }());

            var dmg = calculateDMG(weapon, armor, helm, ring1, ring2, skill, ability);
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

    function calculateDMG(wep, arm, helm, ring1, ring2, skill, ability) {
        return Math.floor(wep * (0.6597 + 0.013202 * skill) * (arm + helm + ring1 + ring2) * 0.0028 * ability);
    }

    function removeChildren(parent){
        while (parent.lastChild){
            parent.removeChild(parent.lastChild);
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


// Add a notice to the Reverse and God Pots (ID 37764) article.
(function() {
	if (mw.config.get('wgArticleId') == 37764 && mw.config.get('wgAction') == 'view') {
		const text = "<div class='theme-bg2 sticky' style='padding:0.5em;text-align:center;font-size:120%'><span style='font-weight:bold;font-size:130%'><span style='color:#FFA500'>⚠</span> Unofficial Content <span style='color:#FFA500'>⚠</span></span><br>" + 'This article discusses a value system created by the community to aid in trading. These numbers are not endorsed by Voldex and may change drastically over time. Make sure to exercise caution and common sense while trading.<br><p>All edits are saved in the article\'s <a href="' + mw.config.get('wgServer') + '/wiki/' + mw.config.get('wgPageName') + '?action=history">' + 'revision history</a>, including recent edits.</p></div><br/>';
		document.getElementById('content').insertAdjacentHTML('beforebegin', text);
	}
}());