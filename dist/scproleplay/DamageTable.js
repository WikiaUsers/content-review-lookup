$(function () {
    const container = document.querySelector(".damage-calculator");
    if (!container) {
        return;
    }

    const SP_MULTS = {default: 75, pistol: 35, shotgun: 12};
    const BODY_PARTS = [
        ["Face",        1.50],
        ["Head",        1.35],
        ["Lungs",       1.25],
        ["Stomach",     1.15],
        ["Kidneys",     1.10],
        ["Torso",       1.00],
        ["Limbs",       0.75],
        ["Extremities", 0.50]
    ];

    function formatNum(num) {
        return Number(num.toFixed(3)).toLocaleString();
    }

    function formatDamage(num, weapon) {
        if (weapon.class === "shotgun") {
            return `${formatNum(num / weapon.count)} × ${weapon.count}`;
        }
        if (weapon.burst_tbs) {
            return `${formatNum(num)} × 3`;
        }

        return formatNum(num);
    }

    function distancePenalty(damage, weapon, distance) {
        if ((weapon.name === "AA-12" || weapon.name === "Spas - 12") && distance > 30) {
            const multiplier = Math.max(1 / Math.sqrt(distance - 30), 0.5);
            return damage * multiplier;
        }

        return damage;
    }

	function calcTTK(shots, tbs, burstTbs, distance, velocity) {
    	let time = 0;

    	if (burstTbs) {
        	for (let i = 1; i < shots; i++) {
            	time += (i % 3 === 0) ? (tbs + burstTbs) : tbs;
        	}
    	} else {
        	time = tbs * (shots - 1);
    	}
    	
    	time += (distance / velocity) * shots;
    	return time;
	}

    function createRow(label, multiplier, damage, tbs, burstTbs, weapon, settings) {
        damage = distancePenalty(damage, weapon, settings.distance);
        const finalDamage = damage * multiplier * settings.multiplier * (weapon.use_bonus ? 1.25 : 1);
        
        const shots = Math.max(1, Math.ceil(settings.health / finalDamage));
        const ttk = shots === Infinity ? Infinity : calcTTK(shots, tbs, burstTbs, settings.distance, weapon.velocity);

        return `
            <tr>
                <td><b>${label}</b></td>
                <td>${formatDamage(finalDamage, weapon)}</td>
                <td>${formatNum(finalDamage / tbs)}</td>
                <td>${formatNum(finalDamage * weapon.clip)}</td>
                <td>${ttk === Infinity ? "Infinite" : ttk === 0 ? "Instant" : formatNum(ttk) + "s"}</td>
                <td>${shots}</td>
                <td>${Math.floor(weapon.clip / shots)}</td>
            </tr>
        `;
    }

    function calcTable(weapon, settings) {
        let {damage, tbs} = weapon;
        let burstTbs = weapon.burst_tbs;

        if (settings.sp) {
            damage += tbs * SP_MULTS[weapon.class];

            tbs *= 1.5;
            if (burstTbs) {
                burstTbs *= 1.5;
            }
        }

        let html =
        `
        <table class="wikitable" width="100%" style="text-align: center">
            <tr>
                <th>Location</th>
                <th>Damage</th>
                <th>Damage/Sec</th>
                <th>Damage/Mag</th>
                <th>Time to Kill</th>
                <th>Shots to Kill</th>
                <th>Kills/Mag</th>
            </tr>
        `;

        BODY_PARTS.forEach(([location, multiplier]) => {
            const label = (!weapon.use_bonus && location === "Torso") ? "Default" : location;

            html += createRow(label, multiplier, damage, tbs, burstTbs, weapon, settings);
        });

        if (weapon.use_bonus) {
            html += createRow("Default", 0.8, damage, tbs, burstTbs, weapon, settings);
        }

        return html + "</table>";
    }

    function createControls(container, update) {
        const controls = container.querySelector(".damage-controls");

        controls.innerHTML =
        `
        <label>Multiplier <input class="damage-mult" type="number" value="1" min="0.1" step="0.01"></label>
        <label>Health <input class="target-health" type="number" value="100" min="1" step="1"></label>
        <label>Distance <input class="distance" type="number" value="0" min="0" step="1"></label>
        <label>Stopping Power? <input class="sp-check" type="checkbox"></label>
        `;

        controls.querySelectorAll("input").forEach(element => {
            element.addEventListener("input", update);
        });
    }

    function getNumber(input, fallback) {
        const value = input.valueAsNumber;
        return Number.isNaN(value) ? fallback : Math.max(0, value);
    }

    const weapon = JSON.parse(container.dataset.weapon);
    const table = container.querySelector(".damage-table");

    createControls(container, update);

    const controls = container.querySelector(".damage-controls");
    const multInput = controls.querySelector(".damage-mult");
    const healthInput = controls.querySelector(".target-health");
    const distanceInput = controls.querySelector(".distance");
    const spCheck = controls.querySelector(".sp-check");

    function update() {
        table.innerHTML = calcTable(weapon, {
            sp: spCheck.checked,
            multiplier: getNumber(multInput, 1),
            health: getNumber(healthInput, 100),
            distance: getNumber(distanceInput, 0)
        });
    }

    update();
});