mw.loader.using(['jquery'], function () {
    $(function () {

        /* ==== SAFETY GUARDS ==== */
        if (!$('#forge-calculator-app').length) return;
        if (window.forgeCalculatorLoaded) return;
        window.forgeCalculatorLoaded = true;

        /* ==== IMAGE HELPER (SAFE) ==== */
        function getImg(filename) {
            if (!filename) return '';
            return mw.util.getUrl('Special:FilePath/' + filename, { width: 64 });
        }

        /* ==== ORE DATA ==== */
        var cores = {
            "Stone Ore": { rarity: "Common", multiplier: 0.2, rarityColor: "#a1a1aa", image: "Stone.png", traits: [] },
            "Sand Stone": { rarity: "Common", multiplier: 0.25, rarityColor: "#a1a1aa", image: "Sand_Stone.webp", traits: [] },
            "Copper Ore": { rarity: "Common", multiplier: 0.3, rarityColor: "#a1a1aa", image: "Copper.webp", traits: [] },
            "Iron Ore": { rarity: "Common", multiplier: 0.35, rarityColor: "#a1a1aa", image: "Iron.webp", traits: [] },
            "Tin Ore": { rarity: "Uncommon", multiplier: 0.425, rarityColor: "#22c55e", image: "Tin.webp", traits: [] },
            "Silver Ore": { rarity: "Uncommon", multiplier: 0.5, rarityColor: "#22c55e", image: "Silver.webp", traits: [] },
            "Gold Ore": { rarity: "Uncommon", multiplier: 0.65, rarityColor: "#22c55e", image: "Gold.webp", traits: [] },

            "Mushroomite Ore": { rarity: "Rare", multiplier: 0.8, rarityColor: "#3b82f6", image: "Mushroomite.webp", traits: [] },
            "Platinum Ore": { rarity: "Rare", multiplier: 0.8, rarityColor: "#3b82f6", image: "Platinum.webp", traits: [] },
            "Bananite Ore": { rarity: "Uncommon", multiplier: 0.85, rarityColor: "#22c55e", image: "Bananite.webp", traits: [] },
            "Cardboardite Ore": { rarity: "Common", multiplier: 0.7, rarityColor: "#a1a1aa", image: "Cardboardite.webp", traits: [] },

            "Aite Ore": { rarity: "Epic", multiplier: 1.0, rarityColor: "#a855f7", image: "Aite.webp", traits: [] },

            "Poopite Ore": {
                rarity: "Epic",
                multiplier: 1.2,
                rarityColor: "#a855f7",
                image: "Poopite.png",
                traitType: "All",
                traits: [{ description: "Poison Cloud (<35% HP)", maxStat: 100 }]
            },

            "Boneite": { rarity: "Common", multiplier: 1.2, rarityColor: "#a1a1aa", image: "Boneite.png", traits: [] },

            "Cobalt Ore": { rarity: "Uncommon", multiplier: 1.0, rarityColor: "#22c55e", image: "Cobalt.png", traits: [] },
            "Titanium Ore": { rarity: "Uncommon", multiplier: 1.15, rarityColor: "#22c55e", image: "Titanium.png", traits: [] },
            "Lapis Lazuli Ore": { rarity: "Uncommon", multiplier: 1.3, rarityColor: "#22c55e", image: "Lapis.png", traits: [] },

            "Quartz Ore": { rarity: "Rare", multiplier: 1.5, rarityColor: "#3b82f6", image: "Quartz.png", traits: [] },
            "Diamond Ore": { rarity: "Rare", multiplier: 2.0, rarityColor: "#3b82f6", image: "Diamond.png", traits: [] },

            "Obsidian Ore": {
                rarity: "Epic",
                multiplier: 2.35,
                rarityColor: "#a855f7",
                image: "Obsidian.png",
                traitType: "Armor",
                traits: [{ description: "Extra Defense", maxStat: 30 }]
            },

            "Rivalite Ore": {
                rarity: "Epic",
                multiplier: 3.33,
                rarityColor: "#a855f7",
                image: "Rivalite.png",
                traitType: "Weapon",
                traits: [{ description: "Crit Chance", maxStat: 20 }]
            },

            "Uranium Ore": {
                rarity: "Legendary",
                multiplier: 3.0,
                rarityColor: "#eab308",
                image: "Uranium.png",
                traitType: "Armor",
                traits: [{ description: "Max HP AoE Dmg", maxStat: 5 }]
            },

            "Mythril Ore": {
                rarity: "Legendary",
                multiplier: 3.5,
                rarityColor: "#eab308",
                image: "Mythril.png",
                traitType: "Armor",
                traits: [{ description: "Extra Defense", maxStat: 15 }]
            },

            "Darkryte Ore": {
                rarity: "Mythical",
                multiplier: 6.3,
                rarityColor: "#ef4444",
                image: "Darkryte.png",
                traitType: "Armor",
                traits: [{ description: "Dodge Chance", maxStat: 15 }]
            },

            "Galaxite Ore": {
                rarity: "Divine",
                multiplier: 11.5,
                rarityColor: "#ec4899",
                image: "Galaxite.webp",
                traits: []
            },

            "Fischilium": {
                rarity: "Relic",
                multiplier: 0.0,
                rarityColor: "#ffec45",
                image: "Fischilium.png",
                traits: []
            }
        };

        /* ==== BUILD UI ==== */
        $('#forge-calculator-app').html(`
            <div class="site-frame">
                <aside class="panel"><div class="panel-inner">
                    <div class="ore-header">
                        <h3>Select Ores</h3>
                        <input id="ore-search" placeholder="Search...">
                    </div>
                    <ul id="ore-list" class="grid-list"></ul>
                </div></aside>

                <main class="panel"><div class="panel-inner">
                    <h1>Forge Calculator</h1>
                    <div class="ore-slots">
                        ${[1,2,3,4].map(i=>`
                            <div class="slot" data-ore="" data-count="0">
                                <div class="slot-name">Empty</div>
                                <div class="slot-count"></div>
                            </div>
                        `).join('')}
                    </div>
                </div></main>

                <aside class="panel"><div class="panel-inner">
                    <div class="card-header">Composition</div>
                    <div id="composition-area" class="result-card"></div>
                </div></aside>
            </div>
        `);

        /* ==== LOGIC ==== */
        var oreList = $('#ore-list');
        var slots = $('.slot');
        var oreKeys = Object.keys(cores);

        function renderOres(filter='') {
            oreList.empty();
            oreKeys.filter(o=>o.toLowerCase().includes(filter.toLowerCase()))
                .forEach(o=>{
                    let d = cores[o];
                    oreList.append(`
                        <li class="grid-item" style="border-color:${d.rarityColor}">
                            <div class="grid-image" style="background-image:url('${getImg(d.image)}')"></div>
                            <div class="item-name">${o}</div>
                            <div class="item-mult">${d.multiplier}x</div>
                        </li>
                    `).children().last().click(()=>addOre(o));
                });
        }

        function addOre(name) {
            let slot = [...slots].find(s => s.dataset.ore === name || s.dataset.count === "0");
            if (!slot) return;
            slot.dataset.ore = name;
            slot.dataset.count = (parseInt(slot.dataset.count) + 1);
            update();
        }

        function update() {
            let total = 0, comp = {};
            slots.each(function(){
                let c = parseInt(this.dataset.count);
                if(c>0){
                    total+=c;
                    comp[this.dataset.ore]=(comp[this.dataset.ore]||0)+c;
                    this.querySelector('.slot-name').textContent=this.dataset.ore;
                    this.querySelector('.slot-count').textContent=c;
                } else {
                    this.querySelector('.slot-name').textContent="Empty";
                    this.querySelector('.slot-count').textContent="";
                }
            });
            if(total<3){
                $('#composition-area').text("Add at least 3 ores");
                return;
            }
            $('#composition-area').html(
                Object.entries(comp).map(([k,v])=>`${k}: ${(v/total*100).toFixed(1)}%`).join('<br>')
            );
        }

        $('#ore-search').on('input', e=>renderOres(e.target.value));
        renderOres();
    });
});