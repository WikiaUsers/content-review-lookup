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
    $(function () {
        if (!$('#forge-calculator-app').length) return;

        // --- HELPER: Get Wiki Image URL ---
        function getImg(filename) {
            if (!filename) return '';
            return '/wiki/Special:FilePath/' + filename + '?width=64';
        }

        // --- 1. ORE DATA ---
        var cores = {
            // --- STONEWAKE ---
            "Stone Ore": { rarity: "Common", multiplier: 0.2, rarityColor: "#7e7e7e", image: "Stone.png", traits: [] },
            "Sand Stone": { rarity: "Common", multiplier: 0.25, rarityColor: "#7e7e7e", image: "Sand_Stone.png", traits: [] },
            "Copper Ore": { rarity: "Common", multiplier: 0.3, rarityColor: "#7e7e7e", image: "Copper.png", traits: [] },
            "Iron Ore": { rarity: "Common", multiplier: 0.35, rarityColor: "#7e7e7e", image: "Iron.png", traits: [] },
            "Tin Ore": { rarity: "Uncommon", multiplier: 0.425, rarityColor: "#5bd46a", image: "Tin.png", traits: [] },
            "Silver Ore": { rarity: "Uncommon", multiplier: 0.5, rarityColor: "#5bd46a", image: "Silver.png", traits: [] },
            "Gold Ore": { rarity: "Uncommon", multiplier: 0.65, rarityColor: "#5bd46a", image: "Gold.png", traits: [] },
            "Mushroomite Ore": { rarity: "Rare", multiplier: 0.8, rarityColor: "#5E9AD6", image: "Mushroomite.png", traits: [] },
            "Platinum Ore": { rarity: "Rare", multiplier: 0.8, rarityColor: "#5E9AD6", image: "Platinum.png", traits: [] },
            "Bananite Ore": { rarity: "Uncommon", multiplier: 0.85, rarityColor: "#5bd46a", image: "Bananite.png", traits: [] },
            "Cardboardite Ore": { rarity: "Common", multiplier: 0.7, rarityColor: "#7e7e7e", image: "Cardboardite.png", traits: [] },
            "Aite Ore": { rarity: "Epic", multiplier: 1.0, rarityColor: "#d47cff", image: "Aite.png", traits: [] },
            "Poopite Ore": { 
                rarity: "Epic", multiplier: 1.2, rarityColor: "#d47cff", image: "Poopite.png", 
                traitType: "All", traits: [{ description: "Poison Cloud (<35% HP)", maxStat: 15 }] 
            },
            "Fichillium": { rarity: "Relic", multiplier: 0.0, rarityColor: "#ffec45", image: "Fichillium.png", traits: [] },

            // --- FORGOTTEN KINGDOM ---
            "Cobalt Ore": { rarity: "Uncommon", multiplier: 1.0, rarityColor: "#5bd46a", image: "Cobalt.png", traits: [] },
            "Titanium Ore": { rarity: "Uncommon", multiplier: 1.15, rarityColor: "#5bd46a", image: "Titanium.png", traits: [] },
            "Lapis Lazuli Ore": { rarity: "Uncommon", multiplier: 1.3, rarityColor: "#5bd46a", image: "Lapis.png", traits: [] },
            "Boneite": { rarity: "Rare", multiplier: 1.2, rarityColor: "#5E9AD6", image: "Boneite.png", traits: [] },
            "Volcanic Rock": { rarity: "Rare", multiplier: 1.55, rarityColor: "#5E9AD6", image: "VolcanicRock.png", traits: [] },
            "Quartz Ore": { rarity: "Rare", multiplier: 1.5, rarityColor: "#5E9AD6", image: "Quartz.png", traits: [] },
            "Amethyst Ore": { rarity: "Rare", multiplier: 1.65, rarityColor: "#5E9AD6", image: "Amethyst.png", traits: [] },
            "Topaz Ore": { rarity: "Rare", multiplier: 1.75, rarityColor: "#5E9AD6", image: "Topaz.png", traits: [] },
            "Diamond Ore": { rarity: "Rare", multiplier: 2.0, rarityColor: "#5E9AD6", image: "Diamond.png", traits: [] },
            "Dark Boneite": { rarity: "Rare", multiplier: 2.25, rarityColor: "#5E9AD6", image: "Dark_boneite.png", traits: [] },
            "Sapphire Ore": { rarity: "Rare", multiplier: 2.25, rarityColor: "#5E9AD6", image: "Sapphire.png", traits: [] },
            "Cuprite Ore": { rarity: "Epic", multiplier: 2.43, rarityColor: "#d47cff", image: "Cuprite.png", traits: [] },
            "Obsidian Ore": { 
                rarity: "Epic", multiplier: 2.35, rarityColor: "#d47cff", image: "Obsidian.png", 
                traitType: "Armor", traits: [{ description: "Extra Defense", maxStat: 30 }] 
            },
            "Emerald Ore": { rarity: "Epic", multiplier: 2.55, rarityColor: "#d47cff", image: "Emerald.png", traits: [] },
            "Ruby Ore": { rarity: "Epic", multiplier: 2.95, rarityColor: "#d47cff", image: "Ruby.png", traits: [] },
            "Rivalite Ore": { 
                rarity: "Epic", multiplier: 3.33, rarityColor: "#d47cff", image: "Rivalite.png", 
                traitType: "Weapon", traits: [{ description: "Crit Chance", maxStat: 20 }] 
            },
            "Slimite Ore": { rarity: "Epic", multiplier: 2.25, rarityColor: "#d47cff", image: "Slimite.png", traits: [] },
            "Uranium Ore": { 
                rarity: "Legendary", multiplier: 3.0, rarityColor: "#ffd966", image: "Uranium.png", 
                traitType: "Armor", traits: [{ description: "Max HP AoE Dmg", maxStat: 1.2 }] 
            },
            "Mythril Ore": { 
                rarity: "Legendary", multiplier: 3.5, rarityColor: "#ffd966", image: "Mythril.png", 
                traitType: "Armor", traits: [{ description: "Extra Defense", maxStat: 15 }] 
            },
            "Eye Ore": { 
                rarity: "Legendary", multiplier: 4.0, rarityColor: "#ffd966", image: "Eye_Ore.png", 
                traitType: "All", traits: [{ description: "Weapon Damage", maxStat: 15 }, { description: "Health", maxStat: -10 }] 
            },
            "Fireite Ore": { 
                rarity: "Legendary", multiplier: 4.5, rarityColor: "#ffd966", image: "Fireite.png", 
                traitType: "Weapon", traits: [{ description: "Burn Chance", maxStat: 20 }] 
            },
            "Magmaite Ore": { 
                rarity: "Legendary", multiplier: 5.0, rarityColor: "#ffd966", image: "Magmaite.png", 
                traitType: "Weapon", traits: [{ description: "AoE Explosion Chance", maxStat: 35 }, { description: "Explosion Dmg", maxStat: 50 }] 
            },
            "Lightite Ore": { 
                rarity: "Legendary", multiplier: 4.6, rarityColor: "#ffd966", image: "Lightite.png", 
                traitType: "Armor", traits: [{ description: "Movement Speed", maxStat: 15 }] 
            },
            "Demonite Ore": { 
                rarity: "Mythical", multiplier: 5.5, rarityColor: "#cc0000", image: "Demonite.png", 
                traitType: "Armor", traits: [{ description: "Reflect Burn Chance", maxStat: 25 }] 
            },
            "Darkryte Ore": { 
                rarity: "Mythical", multiplier: 6.3, rarityColor: "#cc0000", image: "Darkryte.png", 
                traitType: "Armor", traits: [{ description: "Dodge Chance", maxStat: 15 }] 
            },

            // --- GOBLIN CAVE ---
            "Orange Crystal Ore": { rarity: "Epic", multiplier: 3.0, rarityColor: "#d47cff", image: "OrangeCrystal.png", traits: [] },
            "Magenta Crystal Ore": { rarity: "Epic", multiplier: 3.1, rarityColor: "#d47cff", image: "MagentaCrystal.png", traits: [] },
            "Green Crystal Ore": { rarity: "Epic", multiplier: 3.2, rarityColor: "#d47cff", image: "GreenCrystal.png", traits: [] },
            "Crimson Crystal Ore": { rarity: "Epic", multiplier: 3.3, rarityColor: "#d47cff", image: "CrimsonCrystal.png", traits: [] },
            "Blue Crystal Ore": { rarity: "Epic", multiplier: 3.4, rarityColor: "#d47cff", image: "BlueCrystal.png", traits: [] },
            "Rainbow Crystal Ore": { rarity: "Legendary", multiplier: 5.25, rarityColor: "#ffd966", image: "Rainbow_Crystal.gif", traits: [] },
            "Arcane Crystal Ore": { rarity: "Mythical", multiplier: 7.5, rarityColor: "#cc0000", image: "ArcaneCrystal.png", traits: [] },

            // --- FROSTSPIRE EXPANSE ---
            "Tungsten Ore": { rarity: "Common", multiplier: 2.6, rarityColor: "#adadad", image: "Tungsten_Ore.png", traits: [] },
            "Sulfur Ore": { rarity: "Uncommon", multiplier: 2.75, rarityColor: "#55ff55", image: "Sulfur_Ore.png", traits: [] },
            "Pumice Ore": { rarity: "Rare", multiplier: 2.9, rarityColor: "#5555ff", image: "Pumice_Ore.png", traits: [] },
            "Graphite Ore": { 
                rarity: "Rare", multiplier: 3.1, rarityColor: "#5555ff", image: "Graphite_Ore.png", 
                traitType: "Armor", traits: [{ description: "Vitality", maxStat: 5 }, { description: "Dmg Reduction (20% Chance)", maxStat: 12 }] 
            },
            "Aetherit Ore": { 
                rarity: "Rare", multiplier: 3.4, rarityColor: "#5555ff", image: "Aetherit_Ore.png", 
                traitType: "Armor", traits: [{ description: "Speed", maxStat: 5 }] 
            },
            "Scheelite Ore": { rarity: "Rare", multiplier: 3.7, rarityColor: "#5555ff", image: "Scheelite_Ore.png", traits: [] },
            "Larimar Ore": { rarity: "Epic", multiplier: 4.1, rarityColor: "#aa00aa", image: "Larimar_Ore.png", traits: [] },
            "Neurotite Ore": { rarity: "Epic", multiplier: 4.3, rarityColor: "#aa00aa", image: "Neurotite_Ore.png", traits: [] },
            "Frost Fossil Ore": { 
                rarity: "Epic", multiplier: 4.5, rarityColor: "#aa00aa", image: "Frost_Fossil_Ore.png", 
                traitType: "All", traits: [{ description: "Physical Dmg", maxStat: 17.5 }, { description: "Speed", maxStat: -5 }] 
            },
            "Tide Carve Ore": { rarity: "Epic", multiplier: 4.7, rarityColor: "#aa00aa", image: "Tide_Carve_Ore.png", traits: [] },
            "Velchire Ore": { 
                rarity: "Legendary", multiplier: 5.5, rarityColor: "#ffaa00", image: "Velchire_Ore.png", 
                traitType: "Armor", traits: [{ description: "Speed", maxStat: 20 }] 
            },
            "Sanctis Ore": { 
                rarity: "Legendary", multiplier: 6.0, rarityColor: "#ffaa00", image: "Sanctis_Ore.png", 
                traitType: "Armor", traits: [{ description: "Stamina", maxStat: 18 }] 
            },
            "Snowite Ore": { 
                rarity: "Legendary", multiplier: 8.0, rarityColor: "#ffaa00", image: "Snowite_Ore.png", 
                traitType: "Weapon", traits: [{ description: "Atk Speed", maxStat: 15 }] 
            },
            "Iceite Ore": { 
                rarity: "Mythical", multiplier: 10.5, rarityColor: "#cc0000", image: "Iceite.png", 
                traitType: "All", traits: [{ description: "Freeze Chance (2s)", maxStat: 25 }] 
            },

            // --- THE PEAK ---
            "Mistvein Ore": { rarity: "Rare", multiplier: 7.2, rarityColor: "#5E9AD6", image: "Mistvein_Ore.png", traits: [] },
            "Lgarite Ore": { rarity: "Rare", multiplier: 7.5, rarityColor: "#5E9AD6", image: "Lgarite_Ore.png", traits: [] },
            "Voidfractal Ore": { rarity: "Rare", multiplier: 8.0, rarityColor: "#5E9AD6", image: "Voidfractal_Ore.png", traits: [] },
            "Moltenfrost Ore": { rarity: "Epic", multiplier: 8.3, rarityColor: "#aa00aa", image: "Moltenfrost_Ore.png", traits: [] },
            "Crimsonite Ore": { 
                rarity: "Epic", multiplier: 8.5, rarityColor: "#aa00aa", image: "Crimsonite.png", 
                traitType: "Weapon", traits: [{ description: "Physical Dmg", maxStat: 20 }] 
            },
            "Malachite Ore": { 
                rarity: "Epic", multiplier: 8.8, rarityColor: "#aa00aa", image: "Malachite_Ore.png", 
                traitType: "Weapon", traits: [{ description: "Poison Tick Dmg %", maxStat: 10 }] 
            },
            "Aqujade Ore": { rarity: "Epic", multiplier: 9.0, rarityColor: "#aa00aa", image: "Aqujade_Ore.png", traits: [] },
            "Cryptex Ore": { rarity: "Epic", multiplier: 9.3, rarityColor: "#aa00aa", image: "Cryptex_Ore.png", traits: [] },
            "Galestor Ore": { rarity: "Epic", multiplier: 9.5, rarityColor: "#aa00aa", image: "Galestor_Ore.png", traits: [] },
            "Voidstar Ore": { 
                rarity: "Legendary", multiplier: 10.0, rarityColor: "#ffaa00", image: "Voidstar_Ore.png", 
                traitType: "Weapon", traits: [{ description: "Crit Chance", maxStat: 33 }, { description: "Crit Dmg", maxStat: 15 }, { description: "Vitality", maxStat: -15 }] 
            },
            "Etherealite Ore": { 
                rarity: "Mythical", multiplier: 11.1, rarityColor: "#cc0000", image: "Etherealite_Ore.png", 
                traitType: "Armor", traits: [{ description: "Vitality", maxStat: 35 }] 
            },
            "Suryafal Ore": { 
                rarity: "Relic", multiplier: 15.0, rarityColor: "#ffec45", image: "Suryafal_Ore.png", traits: [] 
            },
            "Heavenite": { 
                rarity: "Divine", multiplier: 20.0, rarityColor: "#ff9bdd", image: "Heavenite.png", 
                traitType: "Weapon", traits: [{ description: "Smite Dmg", maxStat: 30 }, { description: "Smite Chance", maxStat: 50 }] 
            },
            "Gargantuan Ore": { 
                rarity: "Divine", multiplier: 25.0, rarityColor: "#ff9bdd", image: "Gargantuan_Ore.png", 
                traitType: "Weapon", traits: [{ description: "Fire DoT", maxStat: 20 }, { description: "Fire Chance", maxStat: 20 }, { description: "AoE Chance", maxStat: 35 }, { description: "AoE Dmg", maxStat: 50 }] 
            },
            "Mosasaursit": { 
                rarity: "Exotic", multiplier: 7.0, rarityColor: "#2596be", image: "Mosasaursit.png", 
                traitType: "All", traits: [{ description: "Swiftness", maxStat: -25 }, { description: "Vitality", maxStat: 35 }] 
            },
            "Galaxite Ore": { rarity: "Divine", multiplier: 11.5, rarityColor: "#ff9bdd", image: "Galaxite.png", traits: [] },
            "Vooite Ore": { rarity: null, multiplier: 0.0, rarityColor: "#7e7e7e", image: "Vooite.png", traits: [] }
        };

        // --- NEW: RUNE DATA & TRAITS ---
        const weaponTraits = [
            "Lethality (5-15%)", "Attack Speed (5-18%)", "Critical Chance (6-15%)", "Critical Damage (5-15%)", "Fracture (5-20%)"
        ];
        const armourTraits = [
            "Swiftness (4-10%)", "Vitality (4-10%)", "Endurance (4-10%)", "Phase (4-11%)", "Surge (3-11%)", "Stride (4-15%)"
        ];

        var runes = {
            "Flame Spark": {
                image: "FlamingSpark.png",
                type: "Weapon",
                description: "Deals 5–10% of base weapon damage per second as Burn.<br>15–25% chance to trigger on hit.<br>Burn lasts 1–2 seconds.",
                traits: weaponTraits
            },
            "Drain Edge": {
                image: "DrainEdge.png",
                type: "Weapon",
                description: "Heals 4–11% of base weapon damage on hit.<br>Maximum heal: 5% of max HP per hit.",
                traits: weaponTraits
            },
            "Venom Crumb": {
                image: "VenomCrumb.png",
                type: "Weapon",
                description: "Deals 4–7% of base weapon damage per second as Poison.<br>25–35% chance to trigger on hit.<br>Poison lasts 3–6 seconds.",
                traits: weaponTraits
            },
            "Blast Chip": {
                image: "BlastChip.png",
                type: "Weapon",
                description: "Causes an AOE explosion.<br>Explosion deals 20–40% of base weapon damage.<br>8–20% chance to explode on hit.",
                traits: weaponTraits
            },
            "Frost Speck": {
                image: "FrostSpeck.png",
                type: "Weapon",
                description: "Freezes enemies for 1–2 seconds.<br>9–20% chance to trigger on hit.<br>Cooldown: 15–20 seconds.",
                traits: weaponTraits
            },
             "Frost Speck II": {
                image: "FrostSpeck.png",
                type: "Weapon",
                description: "Freezes enemies for 1–3 seconds.<br>18–40% chance to trigger on hit.<br>Cooldown: 10–20 seconds.",
                traits: weaponTraits
            },
            "Chill Dust": {
                image: "ChillDust.png",
                type: "Weapon",
                description: "Slows enemy movement and attack speed by 14–32%.<br>Effect lasts 3–7 seconds.<br>27–60% chance to trigger on hit.",
                traits: weaponTraits
            },
            "Chill Dust II": {
                image: "ChillDust.png",
                type: "Weapon",
                description: "Slows enemy movement and attack speed by 14–32%.<br>Effect lasts 3–7 seconds.<br>27–60% chance to trigger on hit.",
                traits: weaponTraits
            },
            "Briar Notch": {
                image: "BriarNotch.png",
                type: "Armor",
                description: "Reflects 2–10% of physical damage back to attackers.<br>Maximum reflect: 5% of max HP.<br>Cooldown: 0.05 seconds.",
                traits: armourTraits
            },
            "Rage Mark": {
                image: "RageMark.png",
                type: "Armor",
                description: "Activates when HP drops below 35%.<br>Increases movement speed and physical damage by 12–26%.<br>Buff lasts 4–7 seconds.<br>Cooldown: 50–60 seconds.",
                traits: armourTraits
            },
            "Ward Patch": {
                image: "Ward_Patch.png",
                type: "Armor",
                description: "Reduces incoming damage by 6–14%.<br>5–15% chance to trigger when hit.",
                traits: armourTraits
            },
            "Rot Stitch": {
                image: "RotStitch.png",
                type: "Weapon",
                description: "Stats pending...",
                traits: weaponTraits 
            }
        };

        // --- 2. WEAPON & ARMOR ODDS DATA ---
        var categoryMap = {
            "Dagger": "Daggers", "Straight Sword": "Straight Swords", "Gauntlet": "Gauntlets",
            "Great Sword": "Great Swords", "Great Axe": "Great Axes", "Katana": "Katanas", "Colossal Sword": "Colossal Swords",
            "Mace": "Mace", "Axe": "Axe", "Spear": "Spears"
        };
        
        var weaponOdds = {
            "3":{"Dagger":1.0},
            "4":{"Dagger":0.80,"Straight Sword":0.15,"Mace":0.05},
            "5":{"Dagger":0.30,"Straight Sword":0.50,"Mace":0.10,"Axe":0.10},
            "6":{"Dagger":0.10,"Straight Sword":0.60,"Mace":0.15,"Axe":0.15},
            "7":{"Dagger":0.05,"Straight Sword":0.40,"Gauntlet":0.15,"Mace":0.20,"Axe":0.20},
            "8":{"Straight Sword":0.25,"Gauntlet":0.25,"Mace":0.25,"Axe":0.25},
            "9":{"Straight Sword":0.15,"Gauntlet":0.35,"Mace":0.20,"Axe":0.20,"Katana":0.10},
            "10":{"Gauntlet":0.30,"Katana":0.30,"Mace":0.15,"Axe":0.15,"Great Sword":0.10},
            "11":{"Gauntlet":0.20,"Katana":0.40,"Great Sword":0.20,"Spear":0.10},
            "12":{"Katana":0.30,"Great Sword":0.30,"Spear":0.25,"Gauntlet":0.15},
            "13":{"Katana":0.20,"Great Sword":0.30,"Spear":0.40,"Great Axe":0.10},
            "14":{"Great Sword":0.25,"Spear":0.50,"Great Axe":0.15,"Katana":0.10},
            "15":{"Great Sword":0.20,"Spear":0.55,"Great Axe":0.20,"Katana":0.05},
            "16":{"Great Sword":0.15,"Spear":0.60,"Great Axe":0.25},
            "17":{"Great Sword":0.10,"Spear":0.68,"Great Axe":0.22},
            "18":{"Great Sword":0.05,"Spear":0.55,"Great Axe":0.35,"Colossal Sword":0.05},
            "19":{"Spear":0.40,"Great Axe":0.45,"Colossal Sword":0.15},
            "20":{"Spear":0.25,"Great Axe":0.55,"Colossal Sword":0.20},
            "21":{"Great Axe":0.60,"Colossal Sword":0.30,"Spear":0.10},
            "22":{"Great Axe":0.67,"Colossal Sword":0.33},
            "23":{"Great Axe":0.60,"Colossal Sword":0.40},
            "24":{"Great Axe":0.50,"Colossal Sword":0.50},
            "25":{"Great Axe":0.40,"Colossal Sword":0.60},
            "30":{"Great Axe":0.20,"Colossal Sword":0.80},
            "40":{"Colossal Sword":1.0}
        };

        var armorOdds = {"3":{"Light Helmet":1.0},"4":{"Light Helmet":1.0},"5":{"Light Helmet":0.89,"Light Leggings":0.11},"6":{"Light Helmet":0.56,"Light Leggings":0.44},"7":{"Light Helmet":0.32,"Light Leggings":0.67,"Light Chestplate":0.01},"8":{"Light Helmet":0.17,"Light Leggings":0.17,"Light Chestplate":0.17},"9":{"Light Helmet":0.08,"Light Leggings":0.51,"Light Chestplate":0.41},"10":{"Light Helmet":0.04,"Light Leggings":0.34,"Light Chestplate":0.53,"Medium Helmet":0.04},"11":{"Light Helmet":0.02,"Light Leggings":0.2,"Light Chestplate":0.47,"Medium Helmet":0.31},"12":{"Light Helmet":0.01,"Light Leggings":0.12,"Light Chestplate":0.37,"Medium Helmet":0.5},"13":{"Light Leggings":0.04,"Light Chestplate":0.28,"Medium Helmet":0.6,"Medium Leggings":0.04},"14":{"Light Leggings":0.04,"Light Chestplate":0.19,"Medium Helmet":0.55,"Medium Leggings":0.22},"15":{"Light Leggings":0.02,"Light Chestplate":0.12,"Medium Helmet":0.43,"Medium Leggings":0.43},"16":{"Light Leggings":0.01,"Light Chestplate":0.08,"Medium Helmet":0.32,"Medium Leggings":0.57,"Medium Chestplate":0.08},"17":{"Light Leggings":0.01,"Light Chestplate":0.05,"Medium Helmet":0.22,"Medium Leggings":0.57,"Medium Chestplate":0.16},"18":{"Light Chestplate":0.03,"Medium Helmet":0.14,"Medium Leggings":0.48,"Medium Chestplate":0.35},"19":{"Light Chestplate":0.02,"Medium Helmet":0.09,"Medium Leggings":0.39,"Medium Chestplate":0.5},"20":{"Light Chestplate":0.01,"Medium Helmet":0.06,"Medium Leggings":0.32,"Medium Chestplate":0.6,"Heavy Helmet":0.01},"21":{"Light Chestplate":0.01,"Medium Helmet":0.07,"Medium Leggings":0.25,"Medium Chestplate":0.63,"Heavy Helmet":0.07},"22":{"Medium Helmet":0.03,"Medium Leggings":0.19,"Medium Chestplate":0.59,"Heavy Helmet":0.19},"23":{"Medium Helmet":0.02,"Medium Leggings":0.14,"Medium Chestplate":0.52,"Heavy Helmet":0.32},"24":{"Medium Helmet":0.01,"Medium Leggings":0.1,"Medium Chestplate":0.44,"Heavy Helmet":0.44},"25":{"Medium Leggings":0.07,"Medium Chestplate":0.36,"Heavy Helmet":0.51,"Heavy Leggings":0.05},"26":{"Medium Leggings":0.05,"Medium Chestplate":0.28,"Heavy Helmet":0.51,"Heavy Leggings":0.15},"27":{"Medium Leggings":0.04,"Medium Chestplate":0.21,"Heavy Helmet":0.47,"Heavy Leggings":0.28,"Heavy Chestplate":0.21},"28":{"Medium Leggings":0.03,"Medium Chestplate":0.16,"Heavy Helmet":0.42,"Heavy Leggings":0.39},"29":{"Medium Leggings":0.02,"Medium Chestplate":0.11,"Heavy Helmet":0.35,"Heavy Leggings":0.47,"Heavy Chestplate":0.04},"30":{"Medium Leggings":0.01,"Medium Chestplate":0.08,"Heavy Helmet":0.28,"Heavy Leggings":0.49,"Heavy Chestplate":0.13},"31":{"Medium Leggings":0.01,"Medium Chestplate":0.06,"Heavy Helmet":0.22,"Heavy Leggings":0.46,"Heavy Chestplate":0.25},"32":{"Medium Leggings":0.01,"Medium Chestplate":0.04,"Heavy Helmet":0.17,"Heavy Leggings":0.42,"Heavy Chestplate":0.37},"33":{"Medium Chestplate":0.03,"Heavy Helmet":0.13,"Heavy Leggings":0.37,"Heavy Chestplate":0.47},"34":{"Medium Chestplate":0.02,"Heavy Helmet":0.1,"Heavy Leggings":0.33,"Heavy Chestplate":0.54},"35":{"Medium Chestplate":0.02,"Heavy Helmet":0.08,"Heavy Leggings":0.3,"Heavy Chestplate":0.6},"36":{"Medium Chestplate":0.01,"Heavy Helmet":0.07,"Heavy Leggings":0.27,"Heavy Chestplate":0.64},"37":{"Medium Chestplate":0.01,"Heavy Helmet":0.06,"Heavy Leggings":0.25,"Heavy Chestplate":0.68},"38":{"Medium Chestplate":0.01,"Heavy Helmet":0.05,"Heavy Leggings":0.23,"Heavy Chestplate":0.71},"39":{"Medium Chestplate":0.01,"Heavy Helmet":0.04,"Heavy Leggings":0.22,"Heavy Chestplate":0.73},"40":{"Medium Chestplate":0.01,"Heavy Helmet":0.04,"Heavy Leggings":0.2,"Heavy Chestplate":0.75},"41":{"Medium Chestplate":0.01,"Heavy Helmet":0.04,"Heavy Leggings":0.19,"Heavy Chestplate":0.77},"42":{"Heavy Helmet":0.03,"Heavy Leggings":0.18,"Heavy Chestplate":0.78},"43":{"Heavy Helmet":0.03,"Heavy Leggings":0.17,"Heavy Chestplate":0.79},"44":{"Heavy Helmet":0.03,"Heavy Leggings":0.17,"Heavy Chestplate":0.8},"45":{"Heavy Helmet":0.03,"Heavy Leggings":0.16,"Heavy Chestplate":0.81},"46":{"Heavy Helmet":0.02,"Heavy Leggings":0.16,"Heavy Chestplate":0.82},"47":{"Heavy Helmet":0.02,"Heavy Leggings":0.15,"Heavy Chestplate":0.82},"48":{"Heavy Helmet":0.02,"Heavy Leggings":0.15,"Heavy Chestplate":0.83},"49":{"Heavy Helmet":0.02,"Heavy Leggings":0.14,"Heavy Chestplate":0.83},"50":{"Heavy Helmet":0.02,"Heavy Leggings":0.14,"Heavy Chestplate":0.84},"51":{"Heavy Helmet":0.02,"Heavy Leggings":0.14,"Heavy Chestplate":0.84},"52":{"Heavy Helmet":0.02,"Heavy Leggings":0.13,"Heavy Chestplate":0.85},"53":{"Heavy Helmet":0.02,"Heavy Leggings":0.13,"Heavy Chestplate":0.85},"54":{"Heavy Helmet":0.02,"Heavy Leggings":0.13,"Heavy Chestplate":0.85},"55":{"Heavy Helmet":0.02,"Heavy Leggings":0.12,"Heavy Chestplate":0.86}};

        // --- 3. WEAPON & ARMOR VARIANTS ---
        var weaponVariants = {
            "Daggers": {
                "Dagger": [{ chance: 1, dmg: 4.3, time: 0.35, image: "DaggerIcon.png" }],
                "Falchion Knife": [{ chance: 0.5, dmg: 4.3, time: 0.35, image: "FalchionKnife.png" }],
                "Gladius Daggers": [{ chance: 0.25, dmg: 4.3, time: 0.35, image: "GladiusDagger.png" }],
                "Hook": [{ chance: 0.0625, dmg: 4.73, time: 0.39, image: "Hook.png" }]
            },
            "Straight Swords": {
                "Falchion Sword": [{ chance: 1, dmg: 7.5, time: 0.59, image: "FalchionSword.png" }],
                "Gladius Sword": [{ chance: 0.5, dmg: 7.5, time: 0.5, image: "GladiusSword.png" }],
                "Cutlass": [{ chance: 0.5, dmg: 9.375, time: 0.66, image: "Cutlass.png" }],
                "Rapier": [{ chance: 0.25, dmg: 7.5, time: 0.49, image: "Rapier.png" }],
                "Chaos": [{ chance: 0.0625, dmg: 9.375, time: 0.59, image: "Chaos.png" }],
                "Candy Cane": [{ chance: 0.125, dmg: 7.5, time: 0.44, image: "CandyCane.png" }],
                "Hell Slayer": [{ chance: 0.1, dmg: 10.175, time: 0.59, image: "HellSlayer.png" }]
            },
            "Great Swords": {
                "Crusader Sword": [{ chance: 1, dmg: 12, time: 1, image: "CrusaderSword.png" }],
                "Long Sword": [{ chance: 0.5, dmg: 12, time: 1.11, image: "LongSword.png" }]
            },
            "Gauntlets": {
                "Ironhand": [{ chance: 1, dmg: 7.6, time: 0.51, image: "Ironhand.png" }],
                "Boxing Gloves": [{ chance: 0.25, dmg: 8, time: 0.59, image: "Boxingglove.png" }],
                "Relevator": [{ chance: 0.25, dmg: 9.6, time: 0.69, image: "Relevator.png" }],
                "Savage Claws": [{ chance: 0.25, dmg: 8, time: 0.47, image: "SavageClaws.png" }]
            },
            "Katanas": {
                "Uchigatana": [{ chance: 1, dmg: 8.5, time: 0.6, image: "Uchigatana.png" }],
                "Tachi": [{ chance: 0.25, dmg: 8.925, time: 0.63, image: "Tachi.png" }]
            },
            "Great Axes": {
                "Double Battle Axe": [{ chance: 1, dmg: 15.75, time: 1.05, image: "DoubleBattleAxe.png" }],
                "Scythe": [{ chance: 0.25, dmg: 14.25, time: 0.95, image: "Scythe.png" }],
                "Greater Battle Axe": [{ chance: 0.25, dmg: 17.25, time: 1, image: "GreaterBattleAxe.png" }],
                "Wyvern Axe": [{ chance: 0.25, dmg: 18.75, time: 0.91, image: "Wyvern Axe.png" }]
            },
            "Colossal Swords": {
                "Great Sword": [{ chance: 1, dmg: 20, time: 1.12, image: "GreatSword.png" }],
                "Hammer": [{ chance: 0.25, dmg: 22, time: 1.24, image: "Hammer.png" }],
                "Skull Crusher": [{ chance: 0.125, dmg: 24, time: 1.4, image: "SkullCrusher.png" }],
                "Dragon Slayer": [{ chance: 0.0625, dmg: 22, time: 1.12, image: "DragonSlayer.png" }],
                "Comically Large Spoon": [{ chance: 0.0625, dmg: 18, time: 1.12, image: "ComicallyLargeSpoon.png" }],
                "Excalibur": [{ chance: 0.001, dmg: 26, time: 1.12, image: "Excalibur.png" }]
            },
            "Mace": {
                "Mace": [{ chance: 1, dmg: 6, time: 0.46, image: "Mace.png" }],
                "Spiked Mace": [{ chance: 0.5, dmg: 6.3, time: 0.46, image: "Spiked Mace.png" }],
                "Winged Mace": [{ chance: 0.25, dmg: 6.6, time: 0.46, image: "Winged Mace.png" }],
                "Hammerhead Mace": [{ chance: 0.125, dmg: 6.9, time: 0.46, image: "HammerheadMace.png" }],
                "Grave Maker": [{ chance: 0.0625, dmg: 7.8, time: 0.46, image: "Grave Maker.png" }]
            },
            "Axe": {
                "Axe": [{ chance: 1, dmg: 7, time: 0.48, image: "Axe.png" }],
                "Battleaxe": [{ chance: 1, dmg: 7.35, time: 0.48, image: "Battleaxe.png" }],
                "Curved Handle Axe": [{ chance: 0.25, dmg: 7.7, time: 0.48, image: "CurvedHandleAxe.png" }],
                "Spade Armed Axe": [{ chance: 0.125, dmg: 8.05, time: 0.48, image: "Spade Armed Axe.png" }]
            },
            "Spears": {
                "Spear": [{ chance: 1, dmg: 7.5, time: 0.45, image: "Spear.png" }],
                "Trident": [{ chance: 0.5, dmg: 7.5, time: 0.45, image: "Trident.png" }],
                "Angelic Spear": [{ chance: 0.125, dmg: 9.75, time: 0.41, image: "AngelicSpear.png" }]
            }
        };

        var armorVariants = {
            "Light Helmet": [
                { name: "Light Helmet", image: "LightHelmet.png", chance: 1, baseDef: 3.75 }
            ],
            "Light Chestplate": [
                { name: "Light Chestplate", image: "LightChestplate.png", chance: 1, baseDef: 5 }
            ],
            "Light Leggings": [
                { name: "Light Leggings", image: "LightLeggings.png", chance: 1, baseDef: 4.375 }
            ],
            "Medium Helmet": [
                { name: "Medium Helmet", image: "MediumHelmet.png", chance: 1, baseDef: 6.25 },
                { name: "Samurai Helmet", image: "SamuraiHelmet.png", chance: 0.5, baseDef: 8 }
            ],
            "Medium Chestplate": [
                { name: "Medium Chestplate", image: "MediumChestplate.png", chance: 1, baseDef: 8.75 },
                { name: "Samurai Chestplate", image: "SamuraiChestplate.png", chance: 0.5, baseDef: 12.75 }
            ],
            "Medium Leggings": [
                { name: "Medium Leggings", image: "MediumLeggings.png", chance: 1, baseDef: 7.5 },
                { name: "Samurai Leggings", image: "SamuraiLeggings.png", chance: 0.5, baseDef: 9 }
            ],
            "Heavy Helmet": [
                { name: "Knight Helmet", image: "KnightHelmet.png", chance: 1, baseDef: 12.5 },
                { name: "Dark Knight Helmet", image: "DarkKnightHelmet.png", chance: 0.5, baseDef: 18.75 },
                { name: "Wolf Helmet", image: "WolfHelmet.png", chance: 0.125, baseDef: 25 }
            ],
            "Heavy Chestplate": [
                { name: "Knight Chestplate", image: "KnightChestplate.png", chance: 1, baseDef: 16.25 },
                { name: "Dark Knight Chestplate", image: "DarkKnightChestplate.png", chance: 0.5, baseDef: 25 },
                { name: "Wolf Chestplate", image: "WolfChestPlate.png", chance: 0.125, baseDef: 35 }
            ],
            "Heavy Leggings": [
                { name: "Knight Leggings", image: "KnightLeggings.png", chance: 1, baseDef: 13.75 },
                { name: "Dark Knight Leggings", image: "DarkKnightLeggings.png", chance: 0.5, baseDef: 21.875 },
                { name: "Wolf Leggings", image: "WolfLeggings.png", chance: 0.125, baseDef: 28 }
            ]
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
            Object.keys(runes).forEach(name => {
                let r = runes[name];
                
                // Only show runes that match the current craft type (Weapon/Armor)
                if (r.type !== currentCraftType) return; 

                let item = $(`<li class="grid-item" style="border-color:#555"></li>`);
                if (r.image) item.append(`<div class="grid-image" style="background-image:url('${getImg(r.image)}')"></div>`);
                item.append(`<div class="item-name">${name}</div>`);
                item.click(() => addRune(name));
                runeListEl.append(item);
            });
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

        function addRune(name) {
            let empty = runeSlots.find(s => s.attr('data-rune-name') == '' && s.is(':visible'));
            if(empty) { 
                empty.attr('data-rune-name', name).attr('data-rune-count', '1'); 
                updateSlotDisplay(empty, true); 
                doAutoUpdate();
            }
        }

        function updateSlotDisplay(slot, isRune=false) {
            let name = slot.attr(isRune ? 'data-rune-name' : 'data-ore-name');
            let count = slot.attr(isRune ? 'data-rune-count' : 'data-ore-count');
            let nameEl = slot.find('.slot-name');
            let countEl = slot.find('.slot-count');
            slot.find('.grid-image').remove();

            if(!countEl.length) { slot.append('<div class="slot-count"></div>'); countEl = slot.find('.slot-count'); }

            if(count > 0) {
                slot.addClass('filled'); nameEl.text(name); countEl.text(isRune ? '' : count); // Don't show count 1 for runes
                
                let imgFile = '';
                if(isRune) {
                    if(runes[name]) imgFile = runes[name].image;
                } else {
                    if(cores[name]) imgFile = cores[name].image;
                }

                if (imgFile) slot.append(`<div class="grid-image" style="background-image:url('${getImg(imgFile)}')"></div>`);
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
            if(decimal === 0.001) return "1/1000";
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

            // --- TRAITS LOGIC ---
            let traitsHTML = '';
            
            // 1. ORE Traits
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

            // 2. RUNE Traits (UPDATED to Separate Desc from Traits)
            runeSlots.forEach(slot => {
                if(!slot.is(':visible')) return;
                let rName = slot.attr('data-rune-name');
                let rData = runes[rName];
                
                if (rName && rData) {
                    traitsHTML += `<div style="margin-bottom:10px; border-left:2px solid #d47cff; padding-left:5px;">
                        <div style="font-weight:bold; font-size:12px; color:#d47cff; margin-bottom:4px;">${rName} (Rune)</div>`;
                    
                    // A. Description
                    if(rData.description) {
                         traitsHTML += `<div style="font-size:11px; color:#fff; margin-bottom:6px; font-style:italic; line-height:1.3;">${rData.description}</div>`;
                    }
                    
                    // B. Subtraits
                    if(rData.traits && rData.traits.length > 0) {
                        rData.traits.forEach(t => {
                             traitsHTML += `<div style="font-size:11px; color:#aaa;">• ${t}</div>`;
                        });
                    }
                    
                    traitsHTML += `</div>`;
                }
            });

            if(!traitsHTML) traitsHTML = '<div style="color:#666; font-style:italic;">No active traits</div>';
            $('#traits-area').html(traitsHTML);

            // --- ODDS ---
            let oddsKey = total >= 40 ? 40 : (total > 30 ? 30 : total);
            // Fallback for missing keys in mid-range
            if (!weaponOdds[oddsKey] && currentCraftType === 'Weapon') {
                let keys = Object.keys(weaponOdds).map(Number).sort((a,b)=>a-b);
                oddsKey = keys.filter(k => k <= total).pop();
            }

            let dict = currentCraftType === 'Weapon' ? weaponOdds : armorOdds;
            let odds = dict[oddsKey] || {};

            let oddsHTML = '';
            Object.entries(odds).sort((a,b)=>b[1]-a[1]).forEach(([categoryName, probability]) => {
                oddsHTML += `<div class="odds-type-card"><div class="odds-type-header"><span>${categoryName}</span><span style="color:#3a8bff">${(probability*100).toFixed(1)}%</span></div>`;
                
                if(currentCraftType === 'Weapon') {
                    let variantCategory = categoryMap[categoryName];
                    if(variantCategory && weaponVariants[variantCategory]) {
                        Object.keys(weaponVariants[variantCategory]).forEach(vName => {
                            weaponVariants[variantCategory][vName].forEach(v => {
                                let quality = (parseInt($('#quality-amt').val()) || 100) / 100;
                                let enh = parseInt($('#enhAmt').val()) || 0;
                                // Quality Formula for Weapon (Standard)
                                let finalDmg = v.dmg * combinedMult * 2 * quality * (1 + (enh * 0.05));
                                let dps = finalDmg / v.time;
                                let imgStyle = v.image ? `background-image:url('${getImg(v.image)}')` : '';

                                oddsHTML += `<div class="odds-grid-row"><div class="col-img" style="${imgStyle}"></div><div class="col-name">${vName}</div><div class="col-chance">${simpleFraction(v.chance)}</div><div class="col-dmg">${Math.round(finalDmg)}</div><div class="col-dps">${dps.toFixed(1)}</div></div>`;
                            });
                        });
                    }
                } else {
                    // RENDER ARMOR VARIANTS
                    if(armorVariants[categoryName]) {
                        armorVariants[categoryName].forEach(v => {
                            let qualityInput = (parseInt($('#quality-amt').val()) || 100);
                            let enh = parseInt($('#enhAmt').val()) || 0;
                            
                            // OPTIMIZED FORMULA: 
                            // Final Defense = Base * Mult * 2 * (0.52 + 0.48 * (Quality/100))
                            let qualityFactor = 0.52 + (0.48 * (qualityInput / 100));
                            let finalDef = Math.round(v.baseDef * combinedMult * 2 * qualityFactor * (1 + (enh * 0.05)));
                            
                            let imgStyle = v.image ? `background-image:url('${getImg(v.image)}')` : '';
                            // Show Calculated Defense in "Damage" col
                            oddsHTML += `<div class="odds-grid-row"><div class="col-img" style="${imgStyle}"></div><div class="col-name">${v.name}</div><div class="col-chance">${simpleFraction(v.chance)}</div><div class="col-dmg" style="color:#88ff88;">${finalDef} Def</div><div class="col-dps" style="font-size:0.8em; color:#ddd;"></div></div>`;
                        });
                    }
                }
                oddsHTML += `</div>`;
            });
            $('#odds-area').html(oddsHTML);
        }

        init();
    });
});// calculated by KamrynH-CS



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


/*Timer for Update Cards */
$(function() {
    setInterval(function() {
        $('.custom-js-timer').each(function() {
            var startStr = $(this).attr('data-start');
            var endStr = $(this).attr('data-end');

            var now = new Date().getTime();
            var startTime = startStr ? new Date(startStr).getTime() : 0;
            var endTime = endStr ? new Date(endStr).getTime() : 0;

            var targetTime = 0;
            var prefix = "";
            var color = "#ffd700"; 

            if (startTime && now < startTime) {

                targetTime = startTime;
                prefix = "Starts In: ";
                color = "#6db3f2"; 

            } else if (endTime && now < endTime) {

                targetTime = endTime;
                prefix = "Ends In: ";
                color = "#ffd700"; 

            } else if (startTime && now >= startTime && !endTime) {

                $(this).text("LIVE NOW!");
                $(this).css("color", "#44ff44"); 

                return;
            } else {

                $(this).text("ENDED");
                $(this).css("color", "#ff4444"); 

                return;
            }

            var distance = targetTime - now;

            if (isNaN(distance)) {
                $(this).text("Check Date Format");
                return;
            }

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $(this).text(prefix + days + "d " + hours + "h " + minutes + "m " + seconds + "s ");
            $(this).css("color", color);
        });
    }, 1000);
});



/*Timer that reset for 30 minutes*/

$(document).ready(function() {

    $('.custom-timer').each(function() {
        var $timer = $(this);

        var interval = parseInt($timer.data('interval')) || 30; 

        setInterval(function() {
            var now = new Date();
            var minutes = now.getUTCMinutes();
            var seconds = now.getUTCSeconds();

            var minutesLeft = (interval - 1) - (minutes % interval);
            var secondsLeft = 59 - seconds;

            var displayMin = minutesLeft < 10 ? "0" + minutesLeft : minutesLeft;
            var displaySec = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

            $timer.text(displayMin + ":" + displaySec);

        }, 1000);
    });
});