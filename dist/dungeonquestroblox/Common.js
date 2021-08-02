window.UserTagsJS = {
	modules: {},
	tags: {
		helper: { u: 'Helper', order: 100 },
		trusted: { u: 'Trusted', order: 101 },
		active: { u: 'Active', order: 102 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Oofydidinamemyselfnoob': ['active'],
	'Hellogillyface': ['helper'],
	'Iceslasher123': ['helper'],
	'010010000110100I': ['helper'],
	'SaltyNoobz': ['helper'],
	'DontReadMePls10': ['helper'],
	'GetTrolld': ['helper'],
	'Jack1o7': ['active'],
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
        var weaponField = createField("weapon", "Weapon's power");
        var armorField = createField("armor", "Armor's power");
        var helmField = createField("helm", "Helm's power");
        var skillField = createField("skill", "Skill points");
        var submit = document.createElement("button");
        submit.append("Calculate");
        var result = createSpan(div);

        div.append(
            createBr(),
            weaponField.label, weaponField.input, createBr(),
            armorField.label, armorField.input, createBr(),
            helmField.label, helmField.input, createBr(),
            skillField.label, skillField.input, createBr(),
            submit, createBr()
        );

        submit.onclick = function () {
            var weapon = parseInt(weaponField.input.value);
            var armor = parseInt(armorField.input.value);
            var helm = parseInt(helmField.input.value);
			var skill = parseInt(skillField.input.value);
			
			var dmg = calculateDMG(weapon, armor, helm, skill);
			var low = dmg * .95;
			var high = dmg * 1.05;
			
			var baseDamage = addCommas(dmg);
			var lowDamage = addCommas(low);
			var highDamage = addCommas(high);
			
			result.update("No Inner" + "<br>" +
			"Average:" + baseDamage + "<br>" +
			"Low Damage:" + lowDamage + "<br>" +
			"High Damage:" + highDamage + "<br>"
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
        var damage = Math.floor((wep * (0.6597 + 0.013202 * skill)*((arm+helm)*0.0028))*107);
        return damage;
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