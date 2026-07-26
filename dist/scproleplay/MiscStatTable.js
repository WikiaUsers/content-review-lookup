$(function () {
    const container = document.querySelector(".misc-stat-calculator");
    if (!container) {
        return;
    }

    function getNumber(input, fallback) {
        const value = input.valueAsNumber;
        return Number.isNaN(value) ? fallback : Math.max(0, value);
    }

    function formatNum(num) {
        return Number(num.toFixed(3)).toLocaleString();
    }

    function calcTable(weapon, settings) {
        let {tbs, burst_tbs: burstTbs, reload, clip, count} = weapon;
        const ammoType = weapon.class === "shotgun" ? "Shells" : "Rounds";

        if (settings.tactical) {
            clip += 1;
            reload = Math.max(0, reload - 0.2);
        }
        if (settings.sp) {
            reload *= 1.1;
            tbs *= 1.5;
            if (burstTbs) {
    			burstTbs *= 1.5;
			}
        }

        reload *= settings.reloadMult;
        const reloadText = weapon.name == "Spas - 12" ? `${formatNum(reload / 8)}s/shell` : `${formatNum(reload)}s`;

        const rpm = (count > 1 && burstTbs) ? (60 * count) / ((count * burstTbs) + tbs): 60 / tbs;

        let html =
        `
        <table class="wikitable" width="100%" style="text-align: center">
            <tr>
                <th>Reload Time</th>
                <th>Ammo Capacity</th>
                <th>Reserve Ammo</th>
                <th>TBS</th>
        `;

        if (burstTbs) {
            html += `<th>TBB</th>`;
        }

        html +=
        `
                <th>RPM</th>
                <th>Muzzle Velocity</th>
                <th>Weight</th>
            </tr>
            <tr>
                <td>${reloadText}</td>
                <td>${Number(clip).toLocaleString()} ${ammoType}</td>
                <td>${Number(weapon.reserve).toLocaleString()} ${ammoType}</td>
                <td>${formatNum(tbs)}s</td>
        `;

        if (burstTbs) {
            html += `<td>${formatNum(burstTbs)}s</td>`;
        }

        html +=
        `
                <td>${formatNum(rpm)}</td>
                <td>${Number(weapon.velocity).toLocaleString()} Studs/sec</td>
                <td>-${formatNum(weapon.weight)}%</td>
            </tr>
        </table>
        `;

        return html;
    }

    function createControls(container, update, weapon) {
        const controls = container.querySelector(".misc-stat-controls");

        controls.innerHTML =
        `
        <label>Reload Multiplier <input class="reload-mult" type="number" value="1" min="0" step="0.01"></label>
        ${weapon.tac_reload !== false ? `<label>Tactical Reload <input class="tactical-check" type="checkbox"></label>` : ""}
        <label>Stopping Power <input class="sp-check" type="checkbox"></label>
        `;

        controls.querySelectorAll("input").forEach(element => {
            element.addEventListener("input", update);
        });
    }

    const weapon = JSON.parse(container.dataset.weaponMisc);
    const table = container.querySelector(".misc-stat-table");

    createControls(container, update, weapon);

    const controls = container.querySelector(".misc-stat-controls");
    const reloadMultInput = controls.querySelector(".reload-mult");
    const tacticalCheck = controls.querySelector(".tactical-check");
    const spCheck = controls.querySelector(".sp-check");

    function update() {
        table.innerHTML = calcTable(weapon, {
            reloadMult: getNumber(reloadMultInput, 1),
            tactical: tacticalCheck ? tacticalCheck.checked : false,
            sp: spCheck.checked
        });
    }

    update();
});