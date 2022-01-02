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
    'TopKaps': ['former_staff'],
    'HaxMagician': ['former_staff'],
    "It'sABidoof": ['former_staff'],
    'ObviouslyHidden': ['former_staff'],
    'LilyKillyKitty': ['former_staff'],
    'TheTreasureHunter': ['contributor'],
    'Hellogillyface': ['impactful'],
    'Iceslasher123': ['impactful'],
    '010010000110100I': ['impactful'],
    'SaltyNoobz': ['impactful'],
    'GetTrolld': ['impactful'],
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
    function addLevelCalculator(div) {
        createSpan(div).update("DQ Wiki Level Calculator");
        var currentField = createField("current", "Your current level");
        var goalField = createField("goal", "Your goal level");
        var submit = document.createElement("button");
        submit.append("Calculate");
        var result = createSpan(div);

        div.append(
            createBr(),
            currentField.label, currentField.input, createBr(),
            goalField.label, goalField.input, createBr(),
            submit, createBr()
        );

        submit.onclick = function () {
            var current = parseInt(currentField.input.value);
            var goal = parseInt(goalField.input.value);

            var xp = calculateXp(current, goal);

            var xpString = addCommas(xp);

            result.update("You will need about " + xpString + " experience.");
        };
    }

    function addDamageCalculator(div) {
        createSpan(div).update("DQ Wiki Damage Calculator");
        var helmField = createField("helm", "HELMET power");
        var armorField = createField("armor", "ARMOR power");
        var weaponField = createField("weapon", "WEAPON power");
        var skillField = createField("skill", "Damage Skill Points");
        var submit = document.createElement("button");
        submit.append("Calculate");
        var result = createSpan(div);

        div.append(
            createBr(),
            helmField.label, helmField.input, createBr(),
            armorField.label, armorField.input, createBr(),
            weaponField.label, weaponField.input, createBr(),
            skillField.label, skillField.input, createBr(),
            submit, createBr()
        );

        submit.onclick = function () {
            var weapon = parseInt(weaponField.input.value);
            var armor = parseInt(armorField.input.value);
            var helm = parseInt(helmField.input.value);
            var skill = parseInt(skillField.input.value);

            var dmg = calculateDMG(weapon, armor, helm, skill);
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

    function calculateDMG(wep, arm, helm, skill) {
        return Math.floor(wep * (0.6597 + 0.013202 * skill) * (arm + helm) * 0.0028 * 119);
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