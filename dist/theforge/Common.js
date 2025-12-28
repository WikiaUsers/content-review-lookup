/* Discord Widget Loader */
mw.loader.using('jquery', function () {
    const $widgetElement = $("#discord-widget");
    if (!$widgetElement.length) return;
    const src = `https://discord.com/widget?id=${$widgetElement.data("id")}&theme=${$widgetElement.data("theme")}`;
    
    const $iframe = $("<iframe>", {
        src: src,
        width: $widgetElement.data("width"),
        height: $widgetElement.data("height"),
        allowtransparency: "true",
        frameborder: "0",
        sandbox: "allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    });
    $widgetElement.html($iframe);
});

/* Filter for weapons and ores */
mw.loader.using(['jquery'], function () {
    mw.hook('wikipage.content').add(function ($content) {
        function setupFilterSystem(buttonClass, tableClass, rowClass) {
            var $buttons = $content.find(buttonClass);
            if (!$buttons.length) return;
            
            var $buttonArea = $buttons.first().parent();
            if ($buttonArea.prev().hasClass('custom-search-injected')) return;
            
            console.log("Injecting Search Bar for: " + tableClass);
            
            var $input = $('<input>', {
                class: 'custom-search-injected',
                type: 'text',
                placeholder: 'Search Name...',
                css: {
                    'width': '97%',
                    'padding': '12px',
                    'margin-bottom': '15px',
                    'background': '#1a1412',
                    'color': '#f5f5f7',
                    'border': '1px solid #4a3b32',
                    'border-radius': '8px',
                    'font-size': '14px',
                    'display': 'block'
                }
            });
            $buttonArea.before($input);
            
            var $rows = $content.find(tableClass + ' ' + rowClass);
            
            $buttons.on('click', function() {
                var filterType = $(this).attr('data-filter');
                $buttons.css({'opacity': '0.5', 'border-color': 'transparent'});
                $(this).css({'opacity': '1', 'border-color': '#fff'});
                if (filterType === 'all') {
                    $rows.show();
                } else {
                    $rows.hide();
                    $content.find(tableClass + ' .filter-' + filterType).show();
                }
                $input.val(''); 
            });
            
            $input.on('keyup', function() {
                var val = $(this).val().toLowerCase();
                if (val === '') {
                    var activeType = $buttons.filter(function() { 
                        return $(this).css('opacity') == '1'; 
                    }).attr('data-filter') || 'all';
                    if (activeType === 'all') { $rows.show(); }
                    else { $rows.hide(); $content.find(tableClass + ' .filter-' + activeType).show(); }
                    return;
                }
                $rows.each(function() {
                    var name = $(this).attr('data-name');
                    if (name && name.indexOf(val) > -1) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            });
        }
        
        setupFilterSystem('.filter-btn', '.weapon-filter-table', '.weapon-row');
        setupFilterSystem('.ore-filter-btn', '.ore-filter-table', '.ore-row');
        setupFilterSystem('.armor-filter-btn', '.armor-filter-table', '.armor-row');
    });
});

/* wooah number slay */
mw.loader.load( '/w/index.php?title=MediaWiki:SqXlPyU.js&action=raw&ctype=text/javascript' );




/* Forge Calculator */
mw.loader.using(['jquery'], function () {
    $(function () {
        if (!$('#forge-calculator-app').length) return;

        // --- HELPER: Get Wiki Image URL ---
        function getImg(filename) {
            if (!filename) return '';
            return '/wiki/Special:FilePath/' + filename + '?width=64';
        }

        // --- 1. ORE DATA (UPDATED WITH BONEITE & FISCHILIUM) ---
        var cores = {
            "Stone Ore": { "rarity": "Common", "multiplier": 0.2, "rarityColor": "#a1a1aa", "image": "Stone.png", "traits": [] },
            "Sand Stone": { "rarity": "Common", "multiplier": 0.25, "rarityColor": "#a1a1aa", "image": "Sand_Stone.webp", "traits": [] },
            "Copper Ore": { "rarity": "Common", "multiplier": 0.3, "rarityColor": "#a1a1aa", "image": "Copper.webp", "traits": [] },
            "Iron Ore": { "rarity": "Common", "multiplier": 0.35, "rarityColor": "#a1a1aa", "image": "Iron.webp", "traits": [] },
            "Tin Ore": { "rarity": "Uncommon", "multiplier": 0.425, "rarityColor": "#22c55e", "image": "Tin.webp", "traits": [] },
            "Silver Ore": { "rarity": "Uncommon", "multiplier": 0.5, "rarityColor": "#22c55e", "image": "Silver.webp", "traits": [] },
            "Gold Ore": { "rarity": "Uncommon", "multiplier": 0.65, "rarityColor": "#22c55e", "image": "Gold.webp", "traits": [] },
            "Mushroomite Ore": { "rarity": "Rare", "multiplier": 0.8, "rarityColor": "#3b82f6", "image": "Mushroomite.webp", "traits": [] },
            "Platinum Ore": { "rarity": "Rare", "multiplier": 0.8, "rarityColor": "#3b82f6", "image": "Platinum.webp", "traits": [] },
            "Bananite Ore": { "rarity": "Uncommon", "multiplier": 0.85, "rarityColor": "#22c55e", "image": "Bananite.webp", "traits": [] },
            "Cardboardite Ore": { "rarity": "Common", "multiplier": 0.7, "rarityColor": "#a1a1aa", "image": "Cardboardite.webp", "traits": [] },
            "Aite Ore": { "rarity": "Epic", "multiplier": 1.0, "rarityColor": "#a855f7", "image": "Aite.webp", "traits": [] },
            "Poopite Ore": { 
                "rarity": "Epic", 
                "multiplier": 1.2, 
                "rarityColor": "#a855f7", 
                "image": "Poopite.png", 
                "traitType": "All",
                "traits": [{ "description": "Poison Cloud (<35% HP)", "maxStat": 100 }] 
            },
            // --- NEW ORE: BONEITE ---
            "Boneite": { 
                "rarity": "Common", 
                "multiplier": 1.2, 
                "rarityColor": "#a1a1aa", 
                "image": "Boneite.png", 
                "traits": [] 
            },
            // ------------------------
            "Cobalt Ore": { "rarity": "Uncommon", "multiplier": 1.0, "rarityColor": "#22c55e", "image": "Cobalt.png", "traits": [] },
            "Titanium Ore": { "rarity": "Uncommon", "multiplier": 1.15, "rarityColor": "#22c55e", "image": "Titanium.png", "traits": [] },
            "Lapis Lazuli Ore": { "rarity": "Uncommon", "multiplier": 1.3, "rarityColor": "#22c55e", "image": "Lapis.png", "traits": [] },
            "Volcanic Rock": { "rarity": "Rare", "multiplier": 1.55, "rarityColor": "#3b82f6", "image": "VolcanicRock.png", "traits": [] },
            "Quartz Ore": { "rarity": "Rare", "multiplier": 1.5, "rarityColor": "#3b82f6", "image": "Quartz.png", "traits": [] },
            "Amethyst Ore": { "rarity": "Rare", "multiplier": 1.65, "rarityColor": "#3b82f6", "image": "Amethyst.png", "traits": [] },
            "Topaz Ore": { "rarity": "Rare", "multiplier": 1.75, "rarityColor": "#3b82f6", "image": "Topaz.png", "traits": [] },
            "Diamond Ore": { "rarity": "Rare", "multiplier": 2.0, "rarityColor": "#3b82f6", "image": "Diamond.png", "traits": [] },
            "Sapphire Ore": { "rarity": "Rare", "multiplier": 2.25, "rarityColor": "#3b82f6", "image": "Sapphire.png", "traits": [] },
            "Cuprite Ore": { "rarity": "Epic", "multiplier": 2.43, "rarityColor": "#a855f7", "image": "Cuprite.png", "traits": [] },
            "Obsidian Ore": { 
                "rarity": "Epic", 
                "multiplier": 2.35, 
                "rarityColor": "#a855f7", 
                "image": "Obsidian.png", 
                "traitType": "Armor", 
                "traits": [{ "description": "Extra Defense", "maxStat": 30 }] 
            },
            "Emerald Ore": { "rarity": "Epic", "multiplier": 2.55, "rarityColor": "#a855f7", "image": "Emerald.png", "traits": [] },
            "Ruby Ore": { "rarity": "Epic", "multiplier": 2.95, "rarityColor": "#a855f7", "image": "Ruby.png", "traits": [] },
            "Rivalite Ore": { 
                "rarity": "Epic", 
                "multiplier": 3.33, 
                "rarityColor": "#a855f7", 
                "image": "Rivalite.png", 
                "traitType": "Weapon", 
                "traits": [{ "description": "Crit Chance", "maxStat": 20 }] 
            },
            "Uranium Ore": { 
                "rarity": "Legendary", 
                "multiplier": 3.0, 
                "rarityColor": "#eab308", 
                "image": "Uranium.png", 
                "traitType": "Armor", 
                "traits": [{ "description": "Max HP AoE Dmg", "maxStat": 5 }] 
            },
            "Mythril Ore": { 
                "rarity": "Legendary", 
                "multiplier": 3.5, 
                "rarityColor": "#eab308", 
                "image": "Mythril.png", 
                "traitType": "Armor", 
                "traits": [{ "description": "Extra Defense", "maxStat": 15 }] 
            },
            "Eye Ore": { 
                "rarity": "Legendary", 
                "multiplier": 4.0, 
                "rarityColor": "#eab308", 
                "image": "Eye_Ore.png", 
                "traitType": "All", 
                "traits": [{ "description": "Weapon Damage", "maxStat": 15 }, { "description": "Health", "maxStat": -10 }] 
            },
            "Fireite Ore": { 
                "rarity": "Legendary", 
                "multiplier": 4.5, 
                "rarityColor": "#eab308", 
                "image": "Fireite.png", 
                "traitType": "Weapon", 
                "traits": [{ "description": "Burn Chance", "maxStat": 30 }] 
            },
            "Magmaite Ore": { 
                "rarity": "Legendary", 
                "multiplier": 5.0, 
                "rarityColor": "#eab308", 
                "image": "Magmaite.png", 
                "traitType": "Weapon", 
                "traits": [{ "description": "AoE Explosion Chance", "maxStat": 35 }] 
            },
            "Lightite Ore": { 
                "rarity": "Legendary", 
                "multiplier": 4.6, 
                "rarityColor": "#eab308", 
                "image": "Lightite.png", 
                "traitType": "Armor", 
                "traits": [{ "description": "Movement Speed", "maxStat": 15 }] 
            },
            "Demonite Ore": { 
                "rarity": "Mythical", 
                "multiplier": 5.5, 
                "rarityColor": "#ef4444", 
                "image": "Demonite.png", 
                "traitType": "Armor", 
                "traits": [{ "description": "Reflect Burn Chance", "maxStat": 25 }] 
            },
            "Darkryte Ore": { 
                "rarity": "Mythical", 
                "multiplier": 6.3, 
                "rarityColor": "#ef4444", 
                "image": "Darkryte.png", 
                "traitType": "Armor", 
                "traits": [{ "description": "Dodge Chance", "maxStat": 15 }] 
            },
            "Magenta Crystal Ore": { "rarity": "Epic", "multiplier": 3.1, "rarityColor": "#a855f7", "image": "MagentaCrystal.png", "traits": [] },
            "Crimson Crystal Ore": { "rarity": "Epic", "multiplier": 3.3, "rarityColor": "#a855f7", "image": "CrimsonCrystal.png", "traits": [] },
            "Green Crystal Ore": { "rarity": "Epic", "multiplier": 3.2, "rarityColor": "#a855f7", "image": "GreenCrystal.png", "traits": [] },
            "Orange Crystal Ore": { "rarity": "Epic", "multiplier": 3.0, "rarityColor": "#a855f7", "image": "OrangeCrystal.png", "traits": [] },
            "Blue Crystal Ore": { "rarity": "Epic", "multiplier": 3.4, "rarityColor": "#a855f7", "image": "BlueCrystal.png", "traits": [] },
            "Rainbow Crystal Ore": { "rarity": "Legendary", "multiplier": 5.25, "rarityColor": "#eab308", "image": "RainbowCrystal.png", "traits": [] },
            "Arcane Crystal Ore": { "rarity": "Epic", "multiplier": 7.5, "rarityColor": "#a855f7", "image": "ArcaneCrystal.png", "traits": [] },
            "Galaxite Ore": { "rarity": "Divine", "multiplier": 11.5, "rarityColor": "#ec4899", "image": "Galaxite.webp", "traits": [] },
            "Vooite Ore": { "rarity": null, "multiplier": 0.0, "rarityColor": "#a1a1aa", "image": "Vooite.webp", "traits": [] },
            // --- NEW ORE: FISCHILIUM ---
            "Fischilium": { 
                "rarity": "Relic", 
                "multiplier": 0.0, 
                "rarityColor": "#ffec45", 
                "image": "Fischilium.png", 
                "traits": [] 
            }
        };

        // --- 2. WEAPON & ODDS DATA ---
        var categoryMap = {
            "Dagger": "Daggers", "Straight Sword": "Straight Swords", "Gauntlet": "Gauntlets",
            "Great Sword": "Great Swords", "Great Axe": "Great Axes", "Katana": "Katanas", "Colossal Sword": "Colossal Swords"
        };
        var weaponOdds = {"3":{"Dagger":1.0},"4":{"Dagger":0.86,"Straight Sword":0.14},"5":{"Dagger":0.35,"Straight Sword":0.65},"6":{"Dagger":0.14,"Straight Sword":0.86},"7":{"Dagger":0.06,"Straight Sword":0.74,"Gauntlet":0.2},"8":{"Dagger":0.02,"Straight Sword":0.44,"Gauntlet":0.54},"9":{"Dagger":0.01,"Straight Sword":0.24,"Gauntlet":0.65},"10":{"Straight Sword":0.11,"Gauntlet":0.47,"Katana":0.42},"11":{"Straight Sword":0.05,"Gauntlet":0.32,"Katana":0.63},"12":{"Straight Sword":0.03,"Gauntlet":0.22,"Katana":0.72},"13":{"Straight Sword":0.01,"Gauntlet":0.14,"Katana":0.62,"Great Sword":0.22},"14":{"Straight Sword":0.01,"Gauntlet":0.08,"Katana":0.46,"Great Sword":0.45},"15":{"Gauntlet":0.05,"Katana":0.34,"Great Sword":0.6},"16":{"Gauntlet":0.03,"Katana":0.26,"Great Sword":0.69,"Great Axe":0.01},"17":{"Gauntlet":0.02,"Katana":0.19,"Great Sword":0.68,"Great Axe":0.11},"18":{"Gauntlet":0.01,"Katana":0.13,"Great Sword":0.57,"Great Axe":0.28},"19":{"Gauntlet":0.01,"Katana":0.09,"Great Sword":0.46,"Great Axe":0.45},"20":{"Gauntlet":0.01,"Katana":0.06,"Great Sword":0.36,"Great Axe":0.57},"21":{"Katana":0.04,"Great Sword":0.29,"Great Axe":0.65,"Colossal Sword":0.02},"22":{"Katana":0.03,"Great Sword":0.23,"Great Axe":0.67,"Colossal Sword":0.07},"23":{"Katana":0.02,"Great Sword":0.18,"Great Axe":0.66,"Colossal Sword":0.13},"24":{"Katana":0.02,"Great Sword":0.15,"Great Axe":0.64,"Colossal Sword":0.2},"25":{"Katana":0.01,"Great Sword":0.12,"Great Axe":0.6,"Colossal Sword":0.26},"26":{"Katana":0.01,"Great Sword":0.1,"Great Axe":0.56,"Colossal Sword":0.32},"27":{"Katana":0.01,"Great Sword":0.09,"Great Axe":0.53,"Colossal Sword":0.37},"28":{"Katana":0.01,"Great Sword":0.07,"Great Axe":0.5,"Colossal Sword":0.42},"29":{"Katana":0.01,"Great Sword":0.07,"Great Axe":0.47,"Colossal Sword":0.46},"30":{"Katana":0.01,"Great Sword":0.06,"Great Axe":0.45,"Colossal Sword":0.49},"31":{"Great Sword":0.05,"Great Axe":0.43,"Colossal Sword":0.51},"32":{"Great Sword":0.05,"Great Axe":0.41,"Colossal Sword":0.54},"33":{"Great Sword":0.04,"Great Axe":0.39,"Colossal Sword":0.56},"34":{"Great Sword":0.04,"Great Axe":0.38,"Colossal Sword":0.58},"35":{"Great Sword":0.04,"Great Axe":0.37,"Colossal Sword":0.59},"36":{"Great Sword":0.03,"Great Axe":0.36,"Colossal Sword":0.61},"37":{"Great Sword":0.03,"Great Axe":0.35,"Colossal Sword":0.62},"38":{"Great Sword":0.03,"Great Axe":0.34,"Colossal Sword":0.63},"39":{"Great Sword":0.03,"Great Axe":0.33,"Colossal Sword":0.64},"40":{"Great Sword":0.03,"Great Axe":0.32,"Colossal Sword":0.65},"41":{"Great Sword":0.03,"Great Axe":0.32,"Colossal Sword":0.65},"42":{"Great Sword":0.03,"Great Axe":0.31,"Colossal Sword":0.66},"43":{"Great Sword":0.02,"Great Axe":0.31,"Colossal Sword":0.67},"44":{"Great Sword":0.02,"Great Axe":0.3,"Colossal Sword":0.67},"45":{"Great Sword":0.02,"Great Axe":0.3,"Colossal Sword":0.68},"46":{"Great Sword":0.02,"Great Axe":0.29,"Colossal Sword":0.69},"47":{"Great Sword":0.02,"Great Axe":0.29,"Colossal Sword":0.69},"48":{"Great Sword":0.02,"Great Axe":0.28,"Colossal Sword":0.69},"49":{"Great Sword":0.02,"Great Axe":0.28,"Colossal Sword":0.7},"50":{"Great Sword":0.02,"Great Axe":0.28,"Colossal Sword":0.7},"51":{"Great Sword":0.02,"Great Axe":0.27,"Colossal Sword":0.71},"52":{"Great Sword":0.02,"Great Axe":0.27,"Colossal Sword":0.71},"53":{"Great Sword":0.02,"Great Axe":0.27,"Colossal Sword":0.71},"54":{"Great Sword":0.01,"Great Axe":0.27,"Colossal Sword":0.72},"55":{"Great Sword":0.01,"Great Axe":0.26,"Colossal Sword":0.73}};

        var armorOdds = {"3":{"Light Helmet":1.0},"4":{"Light Helmet":1.0},"5":{"Light Helmet":0.89,"Light Leggings":0.11},"6":{"Light Helmet":0.56,"Light Leggings":0.44},"7":{"Light Helmet":0.32,"Light Leggings":0.67,"Light Chestplate":0.01},"8":{"Light Helmet":0.17,"Light Leggings":0.17,"Light Chestplate":0.17},"9":{"Light Helmet":0.08,"Light Leggings":0.51,"Light Chestplate":0.41},"10":{"Light Helmet":0.04,"Light Leggings":0.34,"Light Chestplate":0.53,"Medium Helmet":0.04},"11":{"Light Helmet":0.02,"Light Leggings":0.2,"Light Chestplate":0.47,"Medium Helmet":0.31},"12":{"Light Helmet":0.01,"Light Leggings":0.12,"Light Chestplate":0.37,"Medium Helmet":0.5},"13":{"Light Leggings":0.04,"Light Chestplate":0.28,"Medium Helmet":0.6,"Medium Leggings":0.04},"14":{"Light Leggings":0.04,"Light Chestplate":0.19,"Medium Helmet":0.55,"Medium Leggings":0.22},"15":{"Light Leggings":0.02,"Light Chestplate":0.12,"Medium Helmet":0.43,"Medium Leggings":0.43},"16":{"Light Leggings":0.01,"Light Chestplate":0.08,"Medium Helmet":0.32,"Medium Leggings":0.57,"Medium Chestplate":0.08},"17":{"Light Leggings":0.01,"Light Chestplate":0.05,"Medium Helmet":0.22,"Medium Leggings":0.57,"Medium Chestplate":0.16},"18":{"Light Chestplate":0.03,"Medium Helmet":0.14,"Medium Leggings":0.48,"Medium Chestplate":0.35},"19":{"Light Chestplate":0.02,"Medium Helmet":0.09,"Medium Leggings":0.39,"Medium Chestplate":0.5},"20":{"Light Chestplate":0.01,"Medium Helmet":0.06,"Medium Leggings":0.32,"Medium Chestplate":0.6,"Heavy Helmet":0.01},"21":{"Light Chestplate":0.01,"Medium Helmet":0.07,"Medium Leggings":0.25,"Medium Chestplate":0.63,"Heavy Helmet":0.07},"22":{"Medium Helmet":0.03,"Medium Leggings":0.19,"Medium Chestplate":0.59,"Heavy Helmet":0.19},"23":{"Medium Helmet":0.02,"Medium Leggings":0.14,"Medium Chestplate":0.52,"Heavy Helmet":0.32},"24":{"Medium Helmet":0.01,"Medium Leggings":0.1,"Medium Chestplate":0.44,"Heavy Helmet":0.44},"25":{"Medium Leggings":0.07,"Medium Chestplate":0.36,"Heavy Helmet":0.51,"Heavy Leggings":0.05},"26":{"Medium Leggings":0.05,"Medium Chestplate":0.28,"Heavy Helmet":0.51,"Heavy Leggings":0.15},"27":{"Medium Leggings":0.04,"Medium Chestplate":0.21,"Heavy Helmet":0.47,"Heavy Leggings":0.28,"Heavy Chestplate":0.21},"28":{"Medium Leggings":0.03,"Medium Chestplate":0.16,"Heavy Helmet":0.42,"Heavy Leggings":0.39},"29":{"Medium Leggings":0.02,"Medium Chestplate":0.11,"Heavy Helmet":0.35,"Heavy Leggings":0.47,"Heavy Chestplate":0.04},"30":{"Medium Leggings":0.01,"Medium Chestplate":0.08,"Heavy Helmet":0.28,"Heavy Leggings":0.49,"Heavy Chestplate":0.13},"31":{"Medium Leggings":0.01,"Medium Chestplate":0.06,"Heavy Helmet":0.22,"Heavy Leggings":0.46,"Heavy Chestplate":0.25},"32":{"Medium Leggings":0.01,"Medium Chestplate":0.04,"Heavy Helmet":0.17,"Heavy Leggings":0.42,"Heavy Chestplate":0.37},"33":{"Medium Chestplate":0.03,"Heavy Helmet":0.13,"Heavy Leggings":0.37,"Heavy Chestplate":0.47},"34":{"Medium Chestplate":0.02,"Heavy Helmet":0.1,"Heavy Leggings":0.33,"Heavy Chestplate":0.54},"35":{"Medium Chestplate":0.02,"Heavy Helmet":0.08,"Heavy Leggings":0.3,"Heavy Chestplate":0.6},"36":{"Medium Chestplate":0.01,"Heavy Helmet":0.07,"Heavy Leggings":0.27,"Heavy Chestplate":0.64},"37":{"Medium Chestplate":0.01,"Heavy Helmet":0.06,"Heavy Leggings":0.25,"Heavy Chestplate":0.68},"38":{"Medium Chestplate":0.01,"Heavy Helmet":0.05,"Heavy Leggings":0.23,"Heavy Chestplate":0.71},"39":{"Medium Chestplate":0.01,"Heavy Helmet":0.04,"Heavy Leggings":0.22,"Heavy Chestplate":0.73},"40":{"Medium Chestplate":0.01,"Heavy Helmet":0.04,"Heavy Leggings":0.2,"Heavy Chestplate":0.75},"41":{"Medium Chestplate":0.01,"Heavy Helmet":0.04,"Heavy Leggings":0.19,"Heavy Chestplate":0.77},"42":{"Heavy Helmet":0.03,"Heavy Leggings":0.18,"Heavy Chestplate":0.78},"43":{"Heavy Helmet":0.03,"Heavy Leggings":0.17,"Heavy Chestplate":0.79},"44":{"Heavy Helmet":0.03,"Heavy Leggings":0.17,"Heavy Chestplate":0.8},"45":{"Heavy Helmet":0.03,"Heavy Leggings":0.16,"Heavy Chestplate":0.81},"46":{"Heavy Helmet":0.02,"Heavy Leggings":0.16,"Heavy Chestplate":0.82},"47":{"Heavy Helmet":0.02,"Heavy Leggings":0.15,"Heavy Chestplate":0.82},"48":{"Heavy Helmet":0.02,"Heavy Leggings":0.15,"Heavy Chestplate":0.83},"49":{"Heavy Helmet":0.02,"Heavy Leggings":0.14,"Heavy Chestplate":0.83},"50":{"Heavy Helmet":0.02,"Heavy Leggings":0.14,"Heavy Chestplate":0.84},"51":{"Heavy Helmet":0.02,"Heavy Leggings":0.14,"Heavy Chestplate":0.84},"52":{"Heavy Helmet":0.02,"Heavy Leggings":0.13,"Heavy Chestplate":0.85},"53":{"Heavy Helmet":0.02,"Heavy Leggings":0.13,"Heavy Chestplate":0.85},"54":{"Heavy Helmet":0.02,"Heavy Leggings":0.13,"Heavy Chestplate":0.85},"55":{"Heavy Helmet":0.02,"Heavy Leggings":0.12,"Heavy Chestplate":0.86}};

        // --- 3. WEAPON VARIANTS ---
        var weaponVariants = {
            "Daggers": {
                "Dagger": [{ "chance": 1, "dmg": 4.3, "time": 0.35, "image": "Daggericon2.webp" }],
                "Falchion Knife": [{ "chance": 0.5, "dmg": 4.3, "time": 0.35, "image": "FalchionKnife2.webp" }],
                "Gladius Daggers": [{ "chance": 0.25, "dmg": 4.3, "time": 0.35, "image": "GladiusDagger2.webp" }],
                "Hook": [{ "chance": 0.0625, "dmg": 4.73, "time": 0.39, "image": "Hook.webp" }]
            },
            "Straight Swords": {
                "Falchion Sword": [{ "chance": 1, "dmg": 7.5, "time": 0.59, "image": "FalchionSword.webp" }],
                "Gladius Sword": [{ "chance": 0.5, "dmg": 7.5, "time": 0.5, "image": "GladiusSword.webp" }],
                "Cutlass": [{ "chance": 0.5, "dmg": 9.375, "time": 0.66, "image": "Cutlass.webp" }],
                "Rapier": [{ "chance": 0.25, "dmg": 7.5, "time": 0.49, "image": "Rapier.webp" }],
                "Chaos": [{ "chance": 0.0625, "dmg": 9.375, "time": 0.59, "image": "Chaos.webp" }]
            },
            "Great Swords": {
                "Crusader Sword": [{ "chance": 1, "dmg": 12, "time": 1, "image": "BastardSword.webp" }],
                "Long Sword": [{ "chance": 0.5, "dmg": 12, "time": 1.11, "image": "LongSword.webp" }]
            },
            "Gauntlets": {
                "Ironhand": [{ "chance": 1, "dmg": 7.6, "time": 0.51, "image": "Ironhand.webp" }],
                "Boxing Gloves": [{ "chance": 0.25, "dmg": 8, "time": 0.59, "image": "Boxingglove.webp" }],
                "Relevator": [{ "chance": 0.25, "dmg": 9.6, "time": 0.69, "image": "Relavator.webp" }]
            },
            "Katanas": {
                "Uchigatana": [{ "chance": 1, "dmg": 8.5, "time": 0.6, "image": "Uchigatana.webp" }],
                "Tachi": [{ "chance": 0.25, "dmg": 8.925, "time": 0.63, "image": "Tachi.webp" }]
            },
            "Great Axes": {
                "Double Battle Axe": [{ "chance": 1, "dmg": 15.75, "time": 1.05, "image": "DoubleBattleAxe.webp" }],
                "Scythe": [{ "chance": 0.25, "dmg": 14.25, "time": 0.95, "image": "Scythe.webp" }]
            },
            "Colossal Swords": {
                "Great Sword": [{ "chance": 1, "dmg": 20, "time": 1.12, "image": "GreatSword.webp" }],
                "Hammer": [{ "chance": 0.25, "dmg": 22, "time": 1.24, "image": "Hammer.webp" }],
                "Skull Crusher": [{ "chance": 0.125, "dmg": 24, "time": 1.4, "image": "SkullCrusher.webp" }],
                "Dragon Slayer": [{ "chance": 0.0625, "dmg": 22, "time": 1.12, "image": "DragonSlayer.webp" }],
                "Comically Large Spoon": [{ "chance": 0.0625, "dmg": 18, "time": 1.12, "image": "ComicallyLargeSpoon.webp" }]
            }
        };

        // --- 4. BUILD HTML ---
        var $app = $('#forge-calculator-app');
        $app.html(`
            <div class="site-frame">
                <aside class="panel">
                    <div class="panel-inner left-panel-flex">
                        <div class="list-box-container">
                            <div class="ore-header">
                                <h3>Select Ores</h3>
                                <input type="text" id="ore-search" placeholder="Search...">
                            </div>
                            <ul id="ore-list" class="grid-list"></ul>
                        </div>
                        <div class="list-box-container">
                            <div class="ore-header"><h3>Select Runes</h3></div>
                            <ul id="rune-list" class="grid-list"></ul>
                        </div>
                    </div>
                </aside>
                <main class="panel">
                    <div class="panel-inner center-inner">
                        <div id="calculator-box">
                            <h1>Forge Calculator</h1>
                            <div class="rarity-card">
                                <div><div id="rarity-value">?</div><div id="combined-multiplier" style="color:#aaa; font-size:0.8em;">Mult: ×0.00</div></div>
                                <div><label style="color:#aaa; font-size:0.8em;">Quality</label><input id="quality-amt" class="enh-input" type="number" min="0" max="100" value="100">%</div>
                            </div>
                            <div class="ore-slots">
                                ${[1,2,3,4].map(i => `<div class="slot" id="slot${i}" data-ore-name="" data-ore-count="0"><div class="slot-name" style="color:#666; font-size:10px;">Empty</div></div>`).join('')}
                            </div>
                            <div class="rune-section">
                                <h3 style="margin:0; font-size:14px; color:#aaa;">Rune Slots (Req. Enh +3/6/9)</h3>
                                <div class="rune-slots">
                                    ${[1,2,3].map(i => `<div class="slot rune-slot" id="rune-slot-${i}" data-rune-name="" data-rune-count="0" style="display:none;"><div class="slot-name" style="color:#666; font-size:10px;">Empty</div></div>`).join('')}
                                </div>
                            </div>
                            <div style="background:#222; padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                                <div style="display:flex; align-items:center; gap:10px;"><span style="font-weight:bold;">Enhancement</span><input id="enhAmt" class="enh-input" type="number" min="0" max="9" value="0"></div>
                                <div style="display:flex; gap:10px;">
                                    <button class="seg-btn active" data-type="Weapon" style="background:#3a8bff; border:none; padding:6px 12px; border-radius:4px; color:#fff; cursor:pointer;">Weapon</button>
                                    <button class="seg-btn" data-type="Armor" style="background:transparent; border:1px solid #555; padding:6px 12px; border-radius:4px; color:#fff; cursor:pointer;">Armor</button>
                                    <button id="clear-all-btn" style="background:#442222; border:none; padding:6px 12px; border-radius:4px; color:#fff; cursor:pointer;">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <aside class="panel">
                    <div class="panel-inner">
                        <div class="card-header">Composition</div><div id="composition-area" class="result-card"></div>
                        <div class="card-header">Traits</div><div id="traits-area" class="result-card"></div>
                        <div class="card-header">Odds</div><div id="odds-area" class="result-card"></div>
                    </div>
                </aside>
            </div>
        `);

        // --- 5. LOGIC ---
        const oreListEl = $('#ore-list');
        const runeListEl = $('#rune-list');
        const oreSlots = [$('#slot1'), $('#slot2'), $('#slot3'), $('#slot4')];
        const runeSlots = [$('#rune-slot-1'), $('#rune-slot-2'), $('#rune-slot-3')];
        let currentCraftType = 'Weapon';

        function init() {
            renderOreList();
            renderRuneList();
            $('#ore-search').on('input', function() { renderOreList(this.value); });
            $('#enhAmt').on('input', function() { updateRuneVisibility(); doAutoUpdate(); });
            $('#quality-amt').on('input', doAutoUpdate);
            $('#clear-all-btn').on('click', clearAll);
            $('.seg-btn').on('click', function() {
                $('.seg-btn').removeClass('active').css('background', 'transparent');
                $(this).addClass('active').css('background', '#3a8bff');
                currentCraftType = $(this).data('type');
                renderRuneList();
                doAutoUpdate();
            });

            oreSlots.forEach(slot => slot.on('click', function() {
                let count = parseInt($(this).attr('data-ore-count')) || 0;
                if(count > 0) { $(this).attr('data-ore-count', count - 1); updateSlotDisplay($(this)); doAutoUpdate(); }
            }));

            runeSlots.forEach(slot => slot.on('click', function() {
                $(this).attr('data-rune-name', '').attr('data-rune-count', '0'); updateSlotDisplay($(this), true); doAutoUpdate();
            }));

            updateRuneVisibility();
        }

        function updateRuneVisibility() {
            let enh = parseInt($('#enhAmt').val()) || 0;
            let visible = (enh >= 9) ? 3 : (enh >= 6 ? 2 : (enh >= 3 ? 1 : 0));
            runeSlots.forEach((s, i) => { if(i < visible) s.show(); else s.hide(); });
        }

        function renderOreList(filter = '') {
            oreListEl.empty();
            let f = filter.toLowerCase();
            Object.keys(cores).filter(k => k.toLowerCase().includes(f)).forEach(name => {
                let d = cores[name];
                let item = $(`<li class="grid-item" style="border-color:${d.rarityColor}"></li>`);
                if (d.image) item.append(`<div class="grid-image" style="background-image:url('${getImg(d.image)}')"></div>`);
                item.append(`<div class="item-name">${name}</div>`);
                item.append(`<div class="item-mult">${d.multiplier}x</div>`);
                item.click(() => addOre(name));
                oreListEl.append(item);
            });
        }

        function renderRuneList() {
            runeListEl.empty();
            runeListEl.append('<div style="font-size:10px; color:#888; padding:5px;">Runes data missing.</div>');
        }

        function addOre(name) {
            let existing = oreSlots.find(s => s.attr('data-ore-name') === name);
            if(existing) {
                let c = parseInt(existing.attr('data-ore-count')) || 0;
                existing.attr('data-ore-count', c + 1);
                updateSlotDisplay(existing);
            } else {
                let empty = oreSlots.find(s => s.attr('data-ore-count') == '0');
                if(empty) { empty.attr('data-ore-name', name).attr('data-ore-count', '1'); updateSlotDisplay(empty); }
            }
            doAutoUpdate();
        }

        function updateSlotDisplay(slot, isRune=false) {
            let name = slot.attr(isRune ? 'data-rune-name' : 'data-ore-name');
            let count = slot.attr(isRune ? 'data-rune-count' : 'data-ore-count');
            let nameEl = slot.find('.slot-name');
            let countEl = slot.find('.slot-count');
            slot.find('.grid-image').remove();

            if(!countEl.length) { slot.append('<div class="slot-count"></div>'); countEl = slot.find('.slot-count'); }

            if(count > 0) {
                slot.addClass('filled'); nameEl.text(name); countEl.text(count);
                let d = cores[name];
                if (d && d.image) slot.append(`<div class="grid-image" style="background-image:url('${getImg(d.image)}')"></div>`);
            } else {
                slot.removeClass('filled'); slot.attr(isRune ? 'data-rune-name' : 'data-ore-name', ''); nameEl.text('Empty'); countEl.empty();
            }
        }

        function clearAll() {
            oreSlots.forEach(s => { s.attr('data-ore-name','').attr('data-ore-count','0'); updateSlotDisplay(s); });
            runeSlots.forEach(s => { s.attr('data-rune-name','').attr('data-rune-count','0'); updateSlotDisplay(s, true); });
            doAutoUpdate();
        }

        function simpleFraction(decimal) {
            if(decimal === 1) return "1/1";
            if(decimal === 0.5) return "1/2";
            if(decimal === 0.25) return "1/4";
            if(decimal === 0.125) return "1/8";
            if(decimal === 0.0625) return "1/16";
            return decimal.toFixed(2);
        }

        // --- TRAIT CALCULATION ---
        function calculateTransferredStat(x) {
            let y = 4.5 * x - 35;
            if (y < 0) y = 0;
            if (y > 100) y = 100;
            return y / 100;
        }

        function doAutoUpdate() {
            let selected = {};
            oreSlots.forEach(s => {
                let n = s.attr('data-ore-name');
                let c = parseInt(s.attr('data-ore-count')) || 0;
                if(n && c > 0) selected[n] = (selected[n] || 0) + c;
            });

            let total = Object.values(selected).reduce((a,b)=>a+b, 0);
            if(total < 3) {
                $('#rarity-value').text('?'); $('#composition-area').text('Add at least 3 ores'); $('#traits-area').empty(); $('#odds-area').empty(); return;
            }

            let mult = 0;
            for(let o in selected) mult += (cores[o].multiplier * selected[o]);
            let combinedMult = mult / total;
            $('#combined-multiplier').text(`Mult: ×${combinedMult.toFixed(2)}`);

            // --- COMPOSITION ---
            let composition = {};
            for(let o in selected) composition[o] = (selected[o]/total*100);
            
            $('#composition-area').html(Object.entries(composition).map(([k,v]) => `<div>${k}: ${v.toFixed(1)}%</div>`).join(''));

            // --- TRAITS LOGIC RESTORED ---
            let traitsHTML = '';
            for (let oreName in composition) {
                let pct = composition[oreName];
                let d = cores[oreName];

                if (!d || !d.traits || d.traits.length === 0) continue;
                if (d.traitType && d.traitType !== "All" && d.traitType !== currentCraftType) continue;

                if (pct < 10) continue;

                let transfer = calculateTransferredStat(pct);
                let oreTraits = [];

                d.traits.forEach(t => {
                    if (typeof t.maxStat !== "number") return;
                    let val = (transfer * t.maxStat).toFixed(2);
                    oreTraits.push(`${val}% ${t.description}`);
                });

                if (oreTraits.length > 0) {
                    traitsHTML += `<div style="margin-bottom:5px; border-left:2px solid #3a8bff; padding-left:5px;">
                        <div style="font-weight:bold; font-size:11px; color:#3a8bff;">${oreName}</div>
                        ${oreTraits.map(t => `<div style="font-size:11px; color:#ddd;">${t}</div>`).join('')}
                    </div>`;
                }
            }
            if(!traitsHTML) traitsHTML = '<div style="color:#666; font-style:italic;">No active traits</div>';
            $('#traits-area').html(traitsHTML);

            // --- ODDS ---
            let oddsKey = total > 55 ? 55 : total;
            let dict = currentCraftType === 'Weapon' ? weaponOdds : armorOdds;
            let odds = dict[oddsKey] || {};

            let oddsHTML = '';
            Object.entries(odds).sort((a,b)=>b[1]-a[1]).forEach(([categoryName, probability]) => {
                oddsHTML += `<div class="odds-type-card"><div class="odds-type-header"><span>${categoryName}</span><span style="color:#3a8bff">${(probability*100).toFixed(1)}%</span></div>`;
                
                let variantCategory = categoryMap[categoryName];
                if(currentCraftType === 'Weapon' && variantCategory && weaponVariants[variantCategory]) {
                    Object.keys(weaponVariants[variantCategory]).forEach(vName => {
                        weaponVariants[variantCategory][vName].forEach(v => {
                            let quality = (parseInt($('#quality-amt').val()) || 100) / 100;
                            let enh = parseInt($('#enhAmt').val()) || 0;
                            let finalDmg = v.dmg * combinedMult * 2 * quality * (1 + (enh * 0.05));
                            let dps = finalDmg / v.time;
                            let imgStyle = v.image ? `background-image:url('${getImg(v.image)}')` : '';

                            oddsHTML += `<div class="odds-grid-row"><div class="col-img" style="${imgStyle}"></div><div class="col-name">${vName}</div><div class="col-chance">${simpleFraction(v.chance)}</div><div class="col-dmg">${finalDmg.toFixed(1)}</div><div class="col-dps">${dps.toFixed(1)}</div></div>`;
                        });
                    });
                }
                oddsHTML += `</div>`;
            });
            $('#odds-area').html(oddsHTML);
        }

        init();
    });
});
// calculated by KamrynH-CS



// animation for the rules
mw.hook('wikipage.content').add(function($content) {
    'use strict';
    console.log("[Rules Animation] Script started...");
    var items = $content[0].querySelectorAll('.rule-item');
    console.log("[Rules Animation] Found items:", items.length);
    if (!items.length) return;
    var observer = new IntersectionObserver(function(entries, observerInstance) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    items.forEach(function(item, index) {
        item.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(item);
    });
});


// Beginner's Guide Button Hover Animation
$(document).ready(function() {
    // Target the link containing the guide-button-wrapper
    $('a').has('.guide-button-wrapper').css('text-decoration', 'none');
    
    $('.guide-button-wrapper').parent('a').hover(
        function() {
            // Mouse enter - target the div inside the link
            $(this).find('.guide-button-wrapper').css({
                'transform': 'translateY(-3px) scale(1.01)',
                'box-shadow': '0 0 20px rgba(212,197,160,0.3), 0 12px 28px rgba(0,0,0,0.8)',
                'border-color': 'rgba(212,197,160,0.5)'
            });
        },
        function() {
            // Mouse leave
            $(this).find('.guide-button-wrapper').css({
                'transform': 'translateY(0) scale(1)',
                'box-shadow': '0 0 12px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.7)',
                'border-color': 'rgba(180,160,120,0.3)'
            });
        }
    );
});

// Import Maintopic.js
mw.loader.load('/index.php?title=MediaWiki:Maintopic.js&action=raw&ctype=text/javascript');

// Import Maintopic.js
mw.loader.load('/index.php?title=MediaWiki:Maintopic.js&action=raw&ctype=text/javascript');

// Table of Contents hover effects
$(document).ready(function() {
    $('.toc-button').hover(
        function() {
            $(this).css({
                'transform': 'translateY(-2px)',
                'box-shadow': '0 4px 12px ' + $(this).data('glow-color'),
                'border-color': $(this).data('border-color')
            });
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': '',
                'border-color': $(this).data('original-border')
            });
        }
    );
});

// Items page navigation bar logic 
mw.hook("wikipage.content").add(function () {

  if (mw.config.get("wgPageName") !== "Items") return;

  const buttons = document.querySelectorAll(".item-filter-btn");
  const sections = document.querySelectorAll(".item-section");

  if (!buttons.length || !sections.length) return;

  buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    buttons.forEach(b => {
      b.classList.remove("active");
      b.style.opacity = ".6";
      b.style.background = "#161412";
      b.style.color = "#f5f5f7";
      b.style.boxShadow = "none";
    });

    btn.classList.add("active");
    btn.style.opacity = "1";
    btn.style.background = "linear-gradient(180deg,#fff2c4 0,#ffd47c 60%,#f29a3f 100%)";
    btn.style.color = "#1a1208";
    btn.style.boxShadow = "0 0 12px rgba(255,214,140,.6)";

    sections.forEach(section => {
      section.style.display =
        filter === "all" || section.classList.contains(filter)
          ? "block"
          : "none";
    });
  });
});

});



/*tes*/
document.addEventListener("DOMContentLoaded",function(){
document.querySelectorAll(".forge-version-header").forEach(header=>{
header.addEventListener("click",()=>{
const content=header.nextElementSibling;
if(!content)return;
content.classList.toggle("mw-collapsed");
const btn=header.querySelector(".forge-expand-btn");
btn.textContent=content.classList.contains("mw-collapsed")?"[Expand]":"[Collapse]";
});
});
});