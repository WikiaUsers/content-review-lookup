/* Any JavaScript here will be loaded for all users on every page load. */
mw.loader.using(['mediawiki.util'], function () {

    const markers = document.querySelectorAll('.hit-chance-calculator');
    if (!markers.length) return;

    markers.forEach(marker => {
        marker.appendChild(createCalculator());
    });

    function createCalculator() {
        const box = document.createElement('div');

        // Theme-safe styling
        box.style.border = '1px solid var(--border-color, #3a3a3a)';
        box.style.padding = '12px';
        box.style.margin = '12px 0';
        box.style.background = 'transparent';
        box.style.borderRadius = '6px';

        box.innerHTML = `
            <h3>Hit Chance Calculator</h3>

            <label>Enemy Attack:
                <input type="number" id="enemyAttack" value="100000">
            </label><br>

            <label>Defence Level:
                <input type="number" id="defenceLevel" value="99">
            </label><br>

            <label>Equipment Defence:
                <input type="number" id="equipmentDefence" value="10000">
            </label><br>

            <label>Equipment Bonus:
                <input type="number" id="equipmentBonus" value="2000">
            </label><br>

            <label>Defence Wish Level:
                <input type="number" id="defenceWish" value="150">
            </label><br>

            <label>
                <input type="checkbox" id="defenceStance">
                Using Defence Stance
            </label><br><br>

            <button id="calculate">Calculate</button>

            <div id="result" style="margin-top:10px;"></div>
        `;

        box.querySelector('#calculate').addEventListener('click', () => {
            calculate(box);
        });

        return box;
    }

    function calculate(box) {
        const enemyAttack = Number(box.querySelector('#enemyAttack').value) || 0;
        const defenceLevel = Number(box.querySelector('#defenceLevel').value) || 0;
        const equipmentDefence = Number(box.querySelector('#equipmentDefence').value) || 0;
        const equipmentBonus = Number(box.querySelector('#equipmentBonus').value) || 0;
        const defenceWish = Number(box.querySelector('#defenceWish').value) || 0;
        const defenceStance = box.querySelector('#defenceStance').checked;

        const totalDefence =
            defenceLevel +
            equipmentDefence +
            equipmentBonus +
            defenceWish;

        const scaledDefence = totalDefence / 5;
        const scaledAttack = (enemyAttack + 9) * 130;

        let hitChance =
            1 - ((scaledDefence / scaledAttack) * 100);

        if (defenceStance) {
            hitChance -= 0.05;
        }

        hitChance = Math.max(0, Math.min(1, hitChance));

        box.querySelector('#result').innerHTML = `
            <b>Enemy Attack:</b> ${enemyAttack}<br>
            <b>Defence Level:</b> ${defenceLevel}<br>
            <b>Equipment Defence:</b> ${equipmentDefence}<br>
            <b>Equipment Bonus:</b> ${equipmentBonus}<br>
            <b>Defence Wish Level:</b> ${defenceWish}<br>
            <b>Defence Stance:</b> ${defenceStance ? 'Yes' : 'No'}<br>
            <b>Total Defence:</b> ${totalDefence}<br>
            <b>Final Hit Chance:</b> ${(hitChance * 100).toFixed(2)}%
        `;
    }

});
mw.loader.using('mediawiki.util', function () {

    const markers = document.querySelectorAll('.basecamp-calculator');
    if (!markers.length) return;

    const BASE_CAMP = {
        1:{costs:{Coins:10000,Wood:200,Thread:500},rewards:{"Small Exp Scroll":1}},
        2:{costs:{Coins:20000,Hide:500,Iron:250},rewards:{"Small Exp Scroll":1}},
        3:{costs:{Coins:30000,Yarn:250,Barrel:200},rewards:{"Small Exp Scroll":1}},
        4:{costs:{Coins:40000,"Attack Potion":200,Waterskin:100},rewards:{"Small Exp Scroll":1}},
        5:{costs:{Coins:50000,"Gold Coin":15,Thread:1000},rewards:{"Small Exp Scroll":1}},
        6:{costs:{Coins:60000,"Strength Potion":250,"Coin Purse":100},rewards:{"Small Exp Scroll":2}},
        7:{costs:{Coins:70000,Perch:250,"Raw Perch":250},rewards:{"Small Exp Scroll":2}},
        8:{costs:{Coins:80000,"Red Onion":100,Strawberry:100},rewards:{"Small Exp Scroll":2}},
        9:{costs:{Coins:90000,"Steel Bar":200,Wood:300},rewards:{"Small Exp Scroll":2}},
        10:{costs:{Coins:100000,"Gold Coin":30,"Energy Potion":300},rewards:{"Small Exp Scroll":2}},
        11:{costs:{Coins:200000,"Super Defence Potion":200,Hammer:100},rewards:{"Medium Exp Scroll":1}},
        12:{costs:{Coins:300000,Crab:500,"Raw Crab":500},rewards:{"Medium Exp Scroll":1}},
        13:{costs:{Coins:400000,Lemon:250,"Red Onion":250},rewards:{"Medium Exp Scroll":1}},
        14:{costs:{Coins:500000,Clownfish:500,"Raw Clownfish":500},rewards:{"Medium Exp Scroll":1}},
        15:{costs:{Coins:1000000,"Gold Coin":45,Yarn:2000},rewards:{"Medium Exp Scroll":1}},
        16:{costs:{Coins:1500000,"Super Defence Potion":500,Raft:200},rewards:{"Medium Exp Scroll":2}},
        17:{costs:{Coins:2000000,Diary:100,Notebook:100},rewards:{"Medium Exp Scroll":2}},
        18:{costs:{Coins:2500000,Anchor:100,"Fish Hook":200},rewards:{"Medium Exp Scroll":2}},
        19:{costs:{Coins:3000000,Jellyfish:200,"Super Forestry Potion":100},rewards:{"Medium Exp Scroll":2}},
        20:{costs:{Coins:5000000,"Gold Coin":60,"Mithril Bar":500},rewards:{"Medium Exp Scroll":2}},
        21:{costs:{Coins:6000000,"Super Strength Potion":500,"Super Defence Potion":500},rewards:{"Large Exp Scroll":1}},
        22:{costs:{Coins:7000000,Pufferfish:500,"Raw Pufferfish":500},rewards:{"Large Exp Scroll":1}},
        23:{costs:{Coins:8000000,"Extreme Energy Potion":300,Crate:250},rewards:{"Large Exp Scroll":1}},
        24:{costs:{Coins:9000000,Workbench:250,Rope:1000},rewards:{"Large Exp Scroll":1}},
        25:{costs:{Coins:10000000,"Gold Coin":75,"Dragon Leather":500},rewards:{"Large Exp Scroll":1}},
        26:{costs:{Coins:15000000,"Extreme Attack Potion":750,"Extreme Defence Potion":750},rewards:{"Large Exp Scroll":2}},
        27:{costs:{Coins:20000000,"Extreme Defence Potion":750,"Mithril Top":200},rewards:{"Large Exp Scroll":2}},
        28:{costs:{Coins:25000000,"Extreme Strength Potion":500,"Mithril Axe":250},rewards:{"Large Exp Scroll":3}},
        29:{costs:{Coins:30000000,Bestiary:500,"Extreme Forestry Potion":250},rewards:{"Large Exp Scroll":4}},
        30:{costs:{Coins:100000000,"Gold Coin":100,"Extreme Strength Potion":500},rewards:{"Large Exp Scroll":5}},
        31:{costs:{Coins:120000000,"Blue Shrimp":5000,"Blue Crab":5000},rewards:{"Large Exp Scroll":6}},
        32:{costs:{Coins:140000000,"Coin Purse":1000},rewards:{"Large Exp Scroll":7}},
        33:{costs:{Coins:160000000,"Extreme Energy Potion":2000},rewards:{"Large Exp Scroll":8}},
        34:{costs:{Coins:180000000,"Lightning Potion":1000,"Dragon Rider Greaves":1000},rewards:{"Large Exp Scroll":9}},
        35:{costs:{Coins:200000000,Blueberry:10000,"Cedar Log":2500},rewards:{"Large Exp Scroll":10}},
        36:{costs:{Coins:220000000,"Super Power Stone":5,"Elder Log":5000},rewards:{"Queens Armour Fragment":10}},
        37:{costs:{Coins:240000000,"Crystal Chest":2000,"Crystal Key":2000},rewards:{"Queens Armour Fragment":10}},
        38:{costs:{Coins:260000000,"Blue Thread":25000,"Redwood Log":5000},rewards:{"Queens Armour Fragment":10}},
        39:{costs:{Coins:280000000,"Golden Necklace":500,"Fish Soup":2500},rewards:{"Queens Armour Fragment":10}},
        40:{costs:{Coins:300000000,"Gold Coin":150,"Ember Fern":5000},rewards:{"Queens Armour Fragment":10}},
        41:{costs:{Coins:350000000,"Sunburst Flower":10000,"Fish Steak":2500},rewards:{"Queens Weapon Fragment":5}},
        42:{costs:{Coins:400000000,"Rock Skin Potion":500,"Bone Stew":3000},rewards:{"Queens Weapon Fragment":10}},
        43:{costs:{Coins:450000000,"Liquid Death Potion":500,"Thieving Potion":2500},rewards:{"Queens Weapon Fragment":15}},
        44:{costs:{Coins:500000000,"Mahogany Log":5000,"Cherry Blossom Log":5000},rewards:{"Queens Weapon Fragment":20}},
        45:{costs:{Coins:550000000,"Gold Coin":200,"Coin Purse":10000},rewards:{"Queens Weapon Fragment":25}},
        46:{costs:{Coins:600000000,"Mushroom Soup":5000,"Mahogany Log":7500},rewards:{"Kings Weapon Fragment":2}},
        47:{costs:{Coins:650000000,"Ultimate Power Potion":2500,"Extreme Power Potion":4000},rewards:{"Kings Weapon Fragment":5}},
        48:{costs:{Coins:700000000,"Dragon Skull":1000,"Dragon Tail":1000},rewards:{"Kings Weapon Fragment":10}},
        49:{costs:{Coins:750000000,"Coin Purse":10000,"Crab Soup":10000},rewards:{"Kings Weapon Fragment":25}},
        50:{costs:{Coins:1000000000,"Invincibility Potion":2500,"Golden Touch Potion":2500},rewards:{"Kings Weapon Fragment":50}},
        51:{costs:{Coins:1100000000,"Gold Coin":10000,"Ring Fragments":500},rewards:{"Challenge Coin":20}},
        52:{costs:{Coins:1200000000,"Necromancer Top":50,"Necromancer Greaves":50},rewards:{"Enhancement Ticket":5}},
        53:{costs:{Coins:1300000000,"Mystic Robe":25,"Mystic Bottoms":25},rewards:{"Soul Gem":50}},
        54:{costs:{Coins:1400000000,"Scythe of Demeter":10,"Restoration Fragment 4":10},rewards:{"Casket of Treasure":100}},
        55:{costs:{Coins:1500000000,"Gold Coin":25000,"Ancient Elven Book":5},rewards:{"Challenge Coin":20}},
        56:{costs:{Coins:1600000000,"Challenger Boots":2,"Challenger Gloves":2},rewards:{"Enhancement Ticket":5}},
        57:{costs:{Coins:1700000000,"Drakes Diary":15,"Elven Grace Potion":15000},rewards:{"Massive Exp Scroll":1}},
        58:{costs:{Coins:1800000000,"Ring Fragments":1000,"Barbarian Top":50},rewards:{"Casket of Treasure":100}},
        59:{costs:{Coins:1900000000,"Challenger Hat":2,"Burnt Lobster":10000},rewards:{"Elven Weapon Fragment":100}},
        60:{costs:{Coins:2000000000,"Gold Coin":100000,"Eternal Ring":5},rewards:{"Challenge Coin":20}},
        61:{costs:{Coins:2000000000,"Large Exp Scroll":250,"Necklace of Health":10},rewards:{"Enhancement Ticket":5}},
        62:{costs:{Coins:2000000000,"Challenger Legs":2,"Challenger Top":2},rewards:{"Soul Gem":50}},
        63:{costs:{Coins:2000000000,"Ring Fragments":2000,"Ring of Renewal":25},rewards:{"Elven Weapon Fragment":100}},
        64:{costs:{Coins:2000000000,"Primal Gloves":2,"Primal Boots":2},rewards:{"Massive Exp Scroll":1}},
        65:{costs:{Coins:2000000000,"Gold Coin":500000,"Chefs Hat":5},rewards:{"Casket of Treasure":250}},
        66:{costs:{Coins:2000000000,"Primal Legs":2,"Primal Top":2},rewards:{"Elven Armour Fragment":500}},
        67:{costs:{Coins:2000000000,"Ring of Life":20,"Ring of Death":20},rewards:{"Elven Weapon Fragment":100}},
        68:{costs:{Coins:2000000000,"Ring Fragments":2500,"Wooden Stick":5},rewards:{"Soul Gem":50}},
        69:{costs:{Coins:2000000000,"Blessed Eternal Sacrifice":5,"Goblin Cleaver":50},rewards:{"Massive Exp Scroll":5}},
        70:{costs:{Coins:2000000000,"Gold Coin":1000000,"Cognium Ring":2},rewards:{"Casket of Treasure":250}},
        71:{costs:{Coins:2000000000,"Necklace of Amaran":1,"Mystic Staff (E)":1},rewards:{"Elven Weapon Fragment":500}},
        72:{costs:{Coins:2000000000,"Hatchet of the Gods":10,"Rabbits Foot":25},rewards:{"Soul Gem":100}},
        73:{costs:{Coins:2000000000,"Burnt Shrimp":25000,"Burnt Snail":25000},rewards:{"Massive Exp Scroll":5}},
        74:{costs:{Coins:2000000000,"Ring Fragments":5000,"Ring of Souls (E)":1},rewards:{"Casket of Treasure":1000}},
        75:{costs:{Coins:2000000000,"Gold Coin":5000000,"Eternal Berserker Ring":10},rewards:{"Casket of Treasure":5000}}
    };

    markers.forEach(m => m.appendChild(ui()));

    function ui() {
        const d = document.createElement('div');
        d.innerHTML = `
            <h3>Base Camp Calculator</h3>
            Current: <input type="number" class="cur" min="1" max="75" value="1">
            Target: <input type="number" class="tar" min="1" max="75" value="10">
            <button class="go">Calculate</button>
            <div class="out"></div>
        `;
        d.querySelector('.go').onclick = () => calc(d);
        return d;
    }

    function calc(d) {
        const c = +d.querySelector('.cur').value;
        const t = +d.querySelector('.tar').value;
        if (c >= t) return d.querySelector('.out').innerHTML = 'Target must be higher.';
        const cost = {}, reward = {};
        for (let i = c + 1; i <= t; i++) {
            add(cost, BASE_CAMP[i].costs);
            add(reward, BASE_CAMP[i].rewards);
        }
        d.querySelector('.out').innerHTML =
            `<h4>Requirements</h4>${list(cost)}<h4>Rewards</h4>${list(reward)}`;
    }

    function add(t, s) { for (const k in s) t[k] = (t[k] || 0) + s[k]; }
    function list(o) {
        return '<ul>' + Object.entries(o).map(e => `<li>${e[1].toLocaleString()} × ${e[0]}</li>`).join('') + '</ul>';
    }

});