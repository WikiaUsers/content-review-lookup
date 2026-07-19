// Refer to User:Smallam/Sandbox to test.
$(function () {
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
        if (weapon.class === "shotgun" && weapon.count) {
            return `${formatNum(num / weapon.count)} × ${weapon.count}`;
        }

        return formatNum(num);
    }

    function calcTTK(shots, tbs, burstTbs, distance, velocity) {
        let time = 0;

        if (burstTbs) {
            for (let i = 1; i < shots; i++) {
                time += (i % 3 === 0) ? tbs : burstTbs;
            }
        } else {
            time = tbs * (shots - 1);
        }

        if (distance && velocity) {
            time += distance / velocity;
        }

        return time;
    }

    function calculateTable(weapon, settings) {
        let damage = weapon.damage;
        let tbs = weapon.tbs;
        let burstTbs = weapon.burst_tbs;

        if (settings.sp) {
            damage += tbs * SP_MULTS[weapon.class];

            tbs *= 1.5;

            if (burstTbs) {
                burstTbs *= 1.5;
            }
        }

        let damageMult = settings.multiplier;

        if (weapon.use_bonus) {
            damageMult *= 1.25;
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
            let label = location;

            if (!weapon.use_bonus && location === "Torso") {
                label = "Default";
            }

            let finalDamage = damage * multiplier * damageMult;
            let shots = Math.ceil(settings.health / finalDamage);

            let ttk = calcTTK(shots, tbs, burstTbs, settings.distance, weapon.velocity);

            html +=
            `
            <tr>
                <td><b>${label}</b></td>
                <td>${formatDamage(finalDamage, weapon)}</td>
                <td>${formatNum(finalDamage / tbs)}</td>
                <td>${formatNum(finalDamage * weapon.clip)}</td>
                <td>${ttk === 0 ? "Instant" : formatNum(ttk) + "s"}</td>
                <td>${shots}</td>
                <td>${Math.floor(weapon.clip / shots)}</td>
            </tr>
            `;
        });

        if (weapon.use_bonus) {
            let finalDamage = damage * 0.8 * damageMult;
            let shots = Math.ceil(settings.health / finalDamage);

            let ttk = calcTTK(shots, tbs, burstTbs, settings.distance, weapon.velocity);

            html +=
            `
            <tr>
                <td><b>Default</b></td>
                <td>${formatDamage(finalDamage, weapon)}</td>
                <td>${formatNum(finalDamage / tbs)}</td>
                <td>${formatNum(finalDamage * weapon.clip)}</td>
                <td>${ttk === 0 ? "Instant" : formatNum(ttk) + "s"}</td>
                <td>${shots}</td>
                <td>${Math.floor(weapon.clip / shots)}</td>
            </tr>
            `;
        }

        return html + "</table>";
    }

    function createControls(container, update) {
        const controls = container.querySelector(".damage-controls");

        controls.innerHTML =
        `
        <label>Multiplier <input class="damage-mult" type="number" value="1" min="0" step="0.01"></label>
        <label>Health <input class="target-health" type="number" value="100" min="0" step="1"></label>
        <label>Distance <input class="distance" type="number" value="0" min="0" step="1"></label>
        <label>Stopping Power?<input class="sp-check" type="checkbox"></label>
        `;

        controls.querySelectorAll("input").forEach(element => {
            element.addEventListener("input", update);
        });
    }

    document.querySelectorAll(".damage-calculator").forEach(container => {
        const weapon = JSON.parse(container.dataset.weapon);
        const table = container.querySelector(".damage-table");

        function update() {
            const controls = container.querySelector(".damage-controls");

            table.innerHTML = calculateTable(weapon, {
                sp: controls.querySelector(".sp-check").checked,
                multiplier: Number(controls.querySelector(".damage-mult").value) || 1,
                health: Number(controls.querySelector(".target-health").value) || 100,
                distance: Number(controls.querySelector(".distance").value) || 0
            });
        }

        createControls(container, update);
        update();
    });
});