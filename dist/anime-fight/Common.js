$(document).ready(function () {

    function makeId(prefix) {
        return prefix + "-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 10000);
    }
    
    function getStarsFromModule(cb) {
        $.get("/api.php", {
            action: "parse",
            format: "json",
            text: "{{#invoke:Stars|exportedJson}}"
        }).done(function(d){
            try {
                var raw = d.parse.text["*"].replace(/[\s\S]*?(\[.*\])[\s\S]*/, "$1").trim();
                cb(JSON.parse(raw));
            } catch(e) {
                cb([]);
            }
        });
    }

function shortNum(n) {
    const units = [
        "", "k", "m", "b", "t", "qa", "qi", "sx", "sp", "oc",
        "no", "dc", "udc", "ddc", "tdc", "qdc", "qndc", "sdc", "spdc", "ocdc",
        "nvdc", "vg"
    ];
    let i = 0;
    while (n >= 1000 && i < units.length - 1) {
        n /= 1000;
        i++;
    }
    return n.toFixed(2).replace(/\.?0+$/, "") + units[i];
}

    function wrapContainer(c) {
        if (!c.parent().hasClass("calculator-container")) {
            c.wrap('<div class="calculator-container"></div>');
        }
    }

    function buildTowerCalculator(c) {
        wrapContainer(c);
        var uid = makeId("tower");
        c.html(`
            <div class="calculator-box">
                <h2>Tower HP Calculator</h2>
                <input id="${uid}-wave" type="number" placeholder="Wave number">
                <button id="${uid}-btn">Calculate</button>
                <div id="${uid}-out" class="calculator-output"></div>
            </div>
        `);
        $("#" + uid + "-btn").on("click", function () {
            var wave = parseInt($("#" + uid + "-wave").val());
            var out = $("#" + uid + "-out");
            if (isNaN(wave) || wave < 1) { out.html("Enter a valid wave."); return; }
            var base = 8702, mult = 2.32085411230381;
            var t1 = base * Math.pow(mult, wave - 1);
            var tiers = [t1, t1*1.67, t1*2.34, t1*7.99, t1*23.33];
            out.html(`
                Approximate values (not 100% exact)<br>
                Tier 1 Mob: ${shortNum(tiers[0])} HP<br>
                Tier 2 Mob: ${shortNum(tiers[1])} HP<br>
                Tier 3 Mob: ${shortNum(tiers[2])} HP<br>
                Tier 4 Mob: ${shortNum(tiers[3])} HP<br>
                Tier 5 Mob: ${shortNum(tiers[4])} HP
            `);
        });
    }

    function buildTraitCalculator(c) {
        wrapContainer(c);
        var uid = makeId("trait");
        c.html(`
            <div class="calculator-box">
                <h2>Trait Chance Calculator</h2>
                <input id="${uid}-luck" type="number" placeholder="Luck value">
                <button id="${uid}-btn">Calculate</button>
                <div id="${uid}-out" class="calculator-output"></div>
            </div>
        `);
        $("#" + uid + "-btn").on("click", function () {
            var luck = parseFloat($("#" + uid + "-luck").val());
            var out = $("#" + uid + "-out");
            if (isNaN(luck)) { out.html("Enter a valid number."); return; }
            var rarities = [
                { name: "Common", base: 57, mult: 0.9 },
                { name: "Rare", base: 30, mult: 1.0 },
                { name: "Epic", base: 7, mult: 1.05 },
                { name: "Legendary", base: 3, mult: 1.125 },
                { name: "Mythical", base: 0.07, mult: 1.2 },
                { name: "Secret", base: 0.007, mult: 1.1 }
            ];
            var adjusted = rarities.map(r => ({ name: r.name, weight: r.base * Math.pow(r.mult, luck) }));
            var total = adjusted.reduce((s,r) => s+r.weight,0);
            var html = "Results:<br>(approximate values)<br>";
            adjusted.forEach(r => html += `${r.name}: ${(r.weight/total*100/3).toFixed(6)}%<br>`);
            out.html(html);
        });
    }

function buildXPListCalculator(c) {
    wrapContainer(c);
    var uid = makeId("xp");
    c.html(`
        <div class="calculator-box">
            <h2>Star & XP Calculator</h2>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
                <select id="${uid}-star" style="min-width:160px"></select>
                <select id="${uid}-rarity">
                    <option value="Common">Fighter Rarity: Common</option>
                    <option value="Uncommon">Fighter Rarity: Uncommon</option>
                    <option value="Rare">Fighter Rarity: Rare</option>
                    <option value="Epic">Fighter Rarity: Epic</option>
                    <option value="Legendary">Fighter Rarity: Legendary</option>
                    <option value="Mythical">Fighter Rarity: Mythical</option>
                    <option value="Secret">Fighter Rarity: Secret</option>
                </select>
                <input id="${uid}-goal" type="number" placeholder="Goal Level" style="width:120px">
                <input id="${uid}-clvl" type="number" placeholder="Current Level (optional)" style="width:160px">
                <input id="${uid}-cxp" type="number" placeholder="Current XP (optional)" style="width:160px">
                <input id="${uid}-luck" type="number" placeholder="Luck (optional)" style="width:120px">
                <input id="${uid}-xpm" type="number" placeholder="XP Multiplier (optional, 1 = none)" style="width:160px">
                <input id="${uid}-batch" type="number" placeholder="Stars per open (optional)" style="width:160px">
                <label style="display:flex;align-items:center;gap:6px"><input id="${uid}-vip" type="checkbox"> VIP (25% off)</label>
            </div>
            <div style="margin-top:8px">
                <button id="${uid}-btn">Calculate</button>
            </div>
            <div id="${uid}-out" class="calculator-output" style="margin-top:8px"></div>
        </div>
    `);

    getStarsFromModule(function(stars){
        var sel = $("#" + uid + "-star");
        stars.forEach(s => sel.append(`<option value="${s.name}">${s.name} (cost ${s.cost} - avg lvl ${s.lvl})</option>`));

        $("#" + uid + "-btn").on("click", function(){
            var chosen = sel.val();
            var star = stars.find(z => z.name === chosen);
            var rarity = $("#" + uid + "-rarity").val();
            var goal = parseInt($("#" + uid + "-goal").val());
            var clvl = parseInt($("#" + uid + "-clvl").val());
            var cxp = parseFloat($("#" + uid + "-cxp").val());
            var luck = parseFloat($("#" + uid + "-luck").val());
            var xpm = parseFloat($("#" + uid + "-xpm").val());
            var batch = parseInt($("#" + uid + "-batch").val());
            var vip = $("#" + uid + "-vip").is(":checked");
            var out = $("#" + uid + "-out");

            if (!star || isNaN(goal) || goal <= 0) { out.html("Enter valid star and goal level."); return; }
            if (isNaN(clvl)) clvl = 0;
            if (isNaN(cxp)) cxp = 0;
            if (isNaN(luck)) luck = 0;
            if (isNaN(xpm) || xpm <= 0) xpm = 1;
            if (isNaN(batch) || batch < 1) batch = 1;

            var rarities = [
                { name: "Common", base: 100, mult: 0.9 },
                { name: "Uncommon", base: 50, mult: 1.0 },
                { name: "Rare", base: 24, mult: 1.05 },
                { name: "Epic", base: 9, mult: 1.1 },
                { name: "Legendary", base: 2, mult: 1.125 },
                { name: "Mythical", base: 0.07, mult: 1.15 },
                { name: "Secret", base: 0.00000777, mult: 1.1 }
            ];

            var weights = rarities.map(r => ({ name: r.name, w: r.base * Math.pow(r.mult, luck) }));
            var totalWeight = weights.reduce((a,b)=>a+b.w,0);
            var chances = {};
            weights.forEach(r => chances[r.name] = r.w/totalWeight);

           convertBase = {
    Common:175,
    Uncommon:350,
    Rare:700,
    Epic:1250,
    Legendary:2000,
    Mythical:2950,
    Secret:4000
};

convertScale = {
    Common:1.3,
    Uncommon:1.35,
    Rare:1.4,
    Epic:1.42,
    Legendary:1.43,
    Mythical:1.45,
    Secret:1.55
};

            function rollRarity() {
                var r = Math.random();
                var s = 0;
                for (var k in chances) {
                    s += chances[k];
                    if (r <= s) return k;
                }
                return "Common";
            }

            function simulateBatch() {
                var total = 0;
                for (var i=0;i<batch;i++){
                    var rr = rollRarity();
                    var xp = convertBase[rr] * Math.pow(convertScale[rr], star.lvl);
                    total += xp;
                }
                return total * xpm;
            }

            var sim = 0;
            for (var i=0;i<100;i++) sim += simulateBatch();
            var avgXPperPull = sim / 100;

            var xpUp = {
    Common:1.25,
    Uncommon:1.3,
    Rare:1.35,
    Epic:1.4,
    Legendary:1.45,
    Mythical:1.5,
    Secret:1.59
};


            function xpToLevel(r,l){ return 50 * Math.pow(xpUp[r], l); }

            var totalNeeded = 0;
            for (var L=clvl;L<goal;L++) totalNeeded += xpToLevel(rarity, L);
            totalNeeded -= cxp;
            if (totalNeeded < 0) totalNeeded = 0;

            var pulls = avgXPperPull > 0 ? Math.ceil(totalNeeded / avgXPperPull) : Infinity;
            var cost = pulls === Infinity ? Infinity : pulls * star.cost;
            if (cost !== Infinity && vip) cost = Math.ceil(cost * 0.75);

            out.html(
                "Total XP Needed: " + shortNum(totalNeeded) + "<br>" +
                "Average XP per Pull: " + shortNum(avgXPperPull) + "<br>" +
                "Estimated Stars Opened: " + (
    pulls === Infinity ? "∞" : (pulls.toLocaleString() + " pulls → " + (pulls * batch).toLocaleString() + " stars")
) + "<br>" +

                "Estimated Cost: " + (cost === Infinity ? "∞" : shortNum(cost))
            );
        });
    });
}

    function buildStarCalculator(c) {
        wrapContainer(c);
        var uid = makeId("star");
        c.html(`
            <div class="calculator-box">
                <h2>Star Chance Calculator</h2>
                <input id="${uid}-luck" type="number" placeholder="Luck value">
                <button id="${uid}-btn">Calculate</button>
                <div id="${uid}-out" class="calculator-output"></div>
            </div>
        `);
        var rarities = [
            { name: "Common", base: 100, mult: 0.9 },
            { name: "Uncommon", base: 50, mult: 1.0 },
            { name: "Rare", base: 24, mult: 1.05 },
            { name: "Epic", base: 9, mult: 1.1 },
            { name: "Legendary", base: 2, mult: 1.125 },
            { name: "Mythical", base: 0.07, mult: 1.15 },
            { name: "Secret", base: 0.00000777, mult: 1.1 }
        ];
        function chanceRound(p3, p4) {
            if (!p3 || p3 === 0) return 0;
            var v5 = Math.log10 ? Math.log10(p3) : Math.log(p3) / Math.LN10;
            var v6 = p4 - Math.floor(v5) - 1;
            var v7 = Math.pow(10, v6) * p3;
            return Math.floor(v7) / Math.pow(10, v6);
        }
        $("#" + uid + "-btn").on("click", function () {
            var luck = parseFloat($("#" + uid + "-luck").val());
            var out = $("#" + uid + "-out");
            if (isNaN(luck)) { out.html("Enter a valid number."); return; }
            var adjusted = rarities.map(r => ({ name: r.name, weight: r.base * Math.pow(r.mult, luck) }));
            var total = adjusted.reduce((s, r) => s + r.weight, 0);
            var html = "Star Chances:<br>";
            adjusted.forEach(r => {
                var pct = total > 0 ? (r.weight / total * 100) : 0;
                var rounded = chanceRound(pct, 4);
                if (r.name === "Mythical" || r.name === "Secret") {
                    var decimal = rounded / 100;
                    var oneIn = decimal > 0 ? Math.round(1 / decimal).toLocaleString() : "∞";
                    html += `${r.name}: ${rounded}% (1 in ${oneIn})<br>`;
                } else {
                    html += `${r.name}: ${rounded}%<br>`;
                }
            });
            out.html(html);
        });
    }

    $(".tower-calculator").each(function() { buildTowerCalculator($(this)); });
    $(".trait-calculator").each(function() { buildTraitCalculator($(this)); });
    $(".xp-calculator").each(function() { buildXPListCalculator($(this)); });
    $(".star-calculator").each(function() { buildStarCalculator($(this)); });

    function getWorldsFromModule(cb) {
        $.get("/api.php", {
            action: "parse",
            format: "json",
            text: "{{#invoke:Worlds|exportedJson}}"
        }).done(function(d){
            try {
                var raw = d.parse.text["*"].replace(/[\s\S]*?(\[.*\])[\s\S]*/, "$1").trim();
                cb(JSON.parse(raw));
            } catch(e) {
                cb([]);
            }
        });
    }

    function getRealImageUrl(f, cb) {
        $.get("/api.php", {
            action: "query",
            format: "json",
            titles: "File:" + f,
            prop: "imageinfo",
            iiprop: "url"
        }).done(function(d){
            var pages = d.query.pages;
            var first = pages[Object.keys(pages)[0]];
            if (first.imageinfo && first.imageinfo[0].url) cb(first.imageinfo[0].url);
            else cb(null);
        });
    }
    
 function buildTrialCalculator(c) {
    wrapContainer(c);
    var uid = makeId("trial");
    c.html(`
        <div class="calculator-box">
            <h2>Trial HP Calculator</h2>
            <input id="${uid}-wave" type="number" placeholder="Wave number">
            <button id="${uid}-btn">Calculate</button>
            <div id="${uid}-out" class="calculator-output"></div>
        </div>
    `);
    $("#" + uid + "-btn").on("click", function () {
        var wave = parseInt($("#" + uid + "-wave").val());
        var out = $("#" + uid + "-out");
        if (isNaN(wave) || wave < 1) { out.html("Enter a valid wave."); return; }
        var base = 32450, mult = 1.44225;
        var t1 = base * Math.pow(mult, wave - 1);
        var tiers = [t1, t1 * (5/3), t1 * (7/3), t1 * 8, t1 * (70/3)];
        out.html(`
            Approximate values (not 100% exact)<br>
            Tier 1 Mob: ${shortNum(tiers[0])} HP<br>
            Tier 2 Mob: ${shortNum(tiers[1])} HP<br>
            Tier 3 Mob: ${shortNum(tiers[2])} HP<br>
            Tier 4 Mob: ${shortNum(tiers[3])} HP<br>
            Tier 5 Mob: ${shortNum(tiers[4])} HP
        `);
    });
}

    function buildWorldUI(c, worlds) {
        var uid = makeId("worlds");
        var wrapper = $('<div class="worlds-wrapper"></div>');
        var title = $('<div class="worlds-title">Worlds</div>');
        var grid = $('<div class="worlds-grid" id="' + uid + '"></div>');
        var cards = new Array(worlds.length);
        var loaded = 0;

        worlds.forEach(function (w, i) {
            getRealImageUrl(w.image, function(url){
                var card = $(`
                    <div class="world-card">
                        <img src="${url || "https://static.wikia.nocookie.net/common/avatars/default.png"}" alt="${w.name}">
                        <div class="world-name">${w.name}</div>
                    </div>
                `);
                card.on("click", function () {
                    window.location.href = "/wiki/" + w.name.replace(/ /g, "_");
                });
                cards[i] = card;
                loaded++;
                if (loaded === worlds.length) cards.forEach(c => grid.append(c));
            });
        });

        wrapper.append(title).append(grid);
        c.html(wrapper);
    }

    $(".worlds-ui").each(function () {
        var c = $(this);
        getWorldsFromModule(function (w) {
            buildWorldUI(c, w);
        });
    });


    $(".trial-calculator").each(function() { buildTrialCalculator($(this)); });

});