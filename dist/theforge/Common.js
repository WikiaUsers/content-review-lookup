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
                traitType: "Armor", traits: [{ description: "Poison Cloud (<35% HP)", maxStat: 15 }] 
            },
            "Fichillium": { rarity: "Relic", multiplier: 0.0, rarityColor: "#fff000", image: "Fichillium.png", traits: [] },

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
                rarity: "Mythical", multiplier: 5.5, rarityColor: "#b0232b", image: "Demonite.png", 
                traitType: "Armor", traits: [{ description: "Reflect Burn Chance", maxStat: 25 }] 
            },
            "Darkryte Ore": { 
                rarity: "Mythical", multiplier: 6.3, rarityColor: "#b0232b", image: "Darkryte.png", 
                traitType: "Armor", traits: [{ description: "Dodge Chance", maxStat: 15 }] 
            },

            // --- GOBLIN CAVE ---
            "Orange Crystal Ore": { rarity: "Epic", multiplier: 3.0, rarityColor: "#d47cff", image: "OrangeCrystal.png", traits: [] },
            "Magenta Crystal Ore": { rarity: "Epic", multiplier: 3.1, rarityColor: "#d47cff", image: "MagentaCrystal.png", traits: [] },
            "Green Crystal Ore": { rarity: "Epic", multiplier: 3.2, rarityColor: "#d47cff", image: "GreenCrystal.png", traits: [] },
            "Crimson Crystal Ore": { rarity: "Epic", multiplier: 3.3, rarityColor: "#d47cff", image: "CrimsonCrystal.png", traits: [] },
            "Blue Crystal Ore": { rarity: "Epic", multiplier: 3.4, rarityColor: "#d47cff", image: "BlueCrystal.png", traits: [] },
            "Rainbow Crystal Ore": { rarity: "Legendary", multiplier: 5.25, rarityColor: "#ffd966", image: "Rainbow_Crystal.gif", traits: [] },
            "Arcane Crystal Ore": { rarity: "Mythical", multiplier: 7.5, rarityColor: "#b0232b", image: "ArcaneCrystal.png", traits: [] },

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
                rarity: "Legendary", multiplier: 5.5, rarityColor: "#ffd966", image: "Velchire_Ore.png", 
                traitType: "Armor", traits: [{ description: "Speed", maxStat: 20 }] 
            },
            "Sanctis Ore": { 
                rarity: "Legendary", multiplier: 6.0, rarityColor: "#ffd966", image: "Sanctis_Ore.png", 
                traitType: "Armor", traits: [{ description: "Stamina", maxStat: 18 }] 
            },
            "Snowite Ore": { 
                rarity: "Legendary", multiplier: 8.0, rarityColor: "#ffd966", image: "Snowite_Ore.png", 
                traitType: "Weapon", traits: [{ description: "Atk Speed", maxStat: 15 }] 
            },
            "Iceite Ore": { 
                rarity: "Mythical", multiplier: 10.5, rarityColor: "#b0232b", image: "Iceite.png", 
                traitType: "Weapon", traits: [{ description: "Freeze Chance (2s)", maxStat: 25 }] 
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
                rarity: "Legendary", multiplier: 10.0, rarityColor: "#ffd966", image: "Voidstar_Ore.png", 
                traitType: "Weapon", traits: [{ description: "Crit Chance", maxStat: 33 }, { description: "Crit Dmg", maxStat: 15 }, { description: "Vitality", maxStat: -15 }] 
            },
            "Etherealite Ore": { 
                rarity: "Mythical", multiplier: 11.1, rarityColor: "#b0232b", image: "Etherealite_Ore.png", 
                traitType: "Armor", traits: [{ description: "Vitality", maxStat: 35 }] 
            },
            "Suryafal Ore": { 
                rarity: "Relic", multiplier: 15.0, rarityColor: "#fff000", image: "Suryafal_Ore.png", traits: [] 
            },
            "Heavenite": { 
                rarity: "Divine", multiplier: 20.0, rarityColor: "#47188E", image: "Heavenite.png", 
                traitType: "Weapon", traits: [{ description: "Smite Dmg", maxStat: 30 }, { description: "Smite Chance", maxStat: 50 }] 
            },
            "Gargantuan Ore": { 
                rarity: "Divine", multiplier: 25.0, rarityColor: "#47188E", image: "Gargantuan_Ore.png", 
                traitType: "Weapon", traits: [{ description: "Fire DoT", maxStat: 20 }, { description: "Fire Chance", maxStat: 20 }, { description: "AoE Chance", maxStat: 35 }, { description: "AoE Dmg", maxStat: 50 }] 
            },
            "Mosasaursit": { 
                rarity: "Exotic", multiplier: 7.0, rarityColor: "#2596be", image: "Mosasaursit.png", 
                traitType: "Armor", traits: [{ description: "Swiftness", maxStat: -25 }, { description: "Vitality", maxStat: 35 }] 
            },
            
            // --- Raven Cave ---
            "Frogite": { 
                rarity: "Epic", multiplier: 8.5, rarityColor: "#aa00aa", image: "Frogite.png", 
                traitType: "Armor", traits: [{ description: "Jump heigh", maxStat: 12.5 }, { description: "Stride", maxStat: 7.5 }] 
            },
            "Moon Stone": { 
                rarity: "Legendary", multiplier: 9.5, rarityColor: "#ffd966", image: "Moon_Stone.png", 
                traitType: "Weapon", traits: [{ description: "Moon Boost", maxStat: 25 }] 
            },
            "Gulabite": { rarity: "Legendary", multiplier: 9.99, rarityColor: "#ffd966", image: "Gulabite.png", traits: [] },
            "Coinite": { rarity: "Legendary", multiplier: 1, rarityColor: "#ffd966", image: "Coinite.png", traits: [] },
            "Duranite": { 
                rarity: "Mythical", multiplier: 12, rarityColor: "#b0232b", image: "Duranite.png", 
                traitType: "Armor", traits: [{ description: "Vitality", maxStat: 20 }, { description: "Shield (25% Chance)", maxStat: 25 }] 
            },
            "Evil Eye Ore": { rarity: "Mythical", multiplier: 13.3, rarityColor: "#b0232b", image: "Evil_Eye.png", traits: [] },
            "Stolen Heart": { 
                rarity: "Divine", multiplier: 15.4, rarityColor: "#47188E", image: "Stolen_Heart.png", 
                traitType: "Weapon", traits: [{ description: "Lifesteal", maxStat: 7 }] 
            },
            "Heart Of The Island": { 
                rarity: "Relic", multiplier: 18.5, rarityColor: "#fff000", image: "Heart_of_The_Island.png", 
                traitType: "Armor", traits: [{ description: "Vitality", maxStat: 15 }, { description: "Lethality Under 35% HP", maxStat: 25 }, { description: "Speed Under 35% HP", maxStat: 25 }] 
            },
            "Prismatic Heart": { 
                rarity: "Legendary", multiplier: 5.5, rarityColor: "#ffd966", image: "Prismatic_Heart.png", 
                traitType: "Weapon", traits: [{ description: "Crit Chance", maxStat: 20 }, { description: "Crit Dmg", maxStat: 5 }, { description: "Freeze Chance (2s)", maxStat: 15 }] 
            },
            "Yeti Heart": { 
                rarity: "Mythical", multiplier: 7.7, rarityColor: "#b0232b", image: "Yeti_Heart.png", 
                traitType: "Weapon", traits: [{ description: "Crit Chance", maxStat: 30 }, { description: "Crit Dmg", maxStat: 10 }, { description: "Atk Speed", maxStat: 10 }] 
            },
            "Golem Heart": { 
                rarity: "Divine", multiplier: 10, rarityColor: "#47188E", image: "Golem_Heart.png", 
                traitType: "Weapon", traits: [{ description: "Crit Chance", maxStat: 40 }, { description: "Crit Dmg", maxStat: 15 }, { description: "Slow enemy attacks (3s)", maxStat: 25 }] 
            },
            
            "Galaxite Ore": { rarity: "Divine", multiplier: 11.5, rarityColor: "#47188E", image: "Galaxite.png", traits: [] },
            "Vooite Ore": { rarity: null, multiplier: 0.0, rarityColor: "#000000", image: "Vooite.png", traits: [] }
        };
        
        let oreSortDesc = true;

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
        
        // World 1 Odds (Stonewake)
        var weaponOdds = { "3":{"Dagger":1.0}, "4":{"Dagger":0.86,"Straight Sword":0.14}, "5":{"Dagger":0.35,"Straight Sword":0.65}, "6":{"Dagger":0.14,"Straight Sword":0.86}, "7":{"Dagger":0.06,"Straight Sword":0.74,"Gauntlet":0.20}, "8":{"Dagger":0.02,"Straight Sword":0.44,"Gauntlet":0.54}, "9":{"Dagger":0.01,"Straight Sword":0.24,"Gauntlet":0.65,"Katana":0.10}, "10":{"Straight Sword":0.11,"Gauntlet":0.47,"Katana":0.42}, "11":{"Straight Sword":0.05,"Gauntlet":0.32,"Katana":0.63}, "12":{"Straight Sword":0.03,"Gauntlet":0.22,"Katana":0.72,"Great Sword":0.03}, "13":{"Straight Sword":0.01,"Gauntlet":0.14,"Katana":0.62,"Great Sword":0.22}, "14":{"Straight Sword":0.01,"Gauntlet":0.08,"Katana":0.46,"Great Sword":0.45}, "15":{"Gauntlet":0.05,"Katana":0.34,"Great Sword":0.60}, "16":{"Gauntlet":0.03,"Katana":0.26,"Great Sword":0.69,"Great Axe":0.01}, "17":{"Gauntlet":0.02,"Katana":0.19,"Great Sword":0.68,"Great Axe":0.11}, "18":{"Gauntlet":0.01,"Katana":0.13,"Great Sword":0.57,"Great Axe":0.28}, "19":{"Gauntlet":0.01,"Katana":0.09,"Great Sword":0.46,"Great Axe":0.45}, "20":{"Gauntlet":0.01,"Katana":0.06,"Great Sword":0.36,"Great Axe":0.57}, "21":{"Katana":0.04,"Great Sword":0.29,"Great Axe":0.65,"Colossal Sword":0.02}, "22":{"Katana":0.03,"Great Sword":0.23,"Great Axe":0.67,"Colossal Sword":0.07}, "23":{"Katana":0.02,"Great Sword":0.18,"Great Axe":0.66,"Colossal Sword":0.13}, "24":{"Katana":0.02,"Great Sword":0.15,"Great Axe":0.64,"Colossal Sword":0.20}, "25":{"Katana":0.01,"Great Sword":0.12,"Great Axe":0.60,"Colossal Sword":0.26}, "26":{"Katana":0.01,"Great Sword":0.10,"Great Axe":0.56,"Colossal Sword":0.32}, "27":{"Katana":0.01,"Great Sword":0.09,"Great Axe":0.53,"Colossal Sword":0.37}, "28":{"Katana":0.01,"Great Sword":0.07,"Great Axe":0.50,"Colossal Sword":0.42}, "29":{"Katana":0.01,"Great Sword":0.07,"Great Axe":0.47,"Colossal Sword":0.46}, "30":{"Katana":0.01,"Great Sword":0.06,"Great Axe":0.45,"Colossal Sword":0.49}, "31":{"Great Sword":0.05,"Great Axe":0.43,"Colossal Sword":0.51}, "32":{"Great Sword":0.05,"Great Axe":0.41,"Colossal Sword":0.54}, "33":{"Great Sword":0.04,"Great Axe":0.39,"Colossal Sword":0.56}, "34":{"Great Sword":0.04,"Great Axe":0.38,"Colossal Sword":0.58}, "35":{"Great Sword":0.04,"Great Axe":0.37,"Colossal Sword":0.59}, "36":{"Great Sword":0.03,"Great Axe":0.36,"Colossal Sword":0.61}, "37":{"Great Sword":0.03,"Great Axe":0.35,"Colossal Sword":0.62}, "38":{"Great Sword":0.03,"Great Axe":0.34,"Colossal Sword":0.63}, "39":{"Great Sword":0.03,"Great Axe":0.33,"Colossal Sword":0.64}, "40":{"Great Sword":0.03,"Great Axe":0.32,"Colossal Sword":0.65}, "41":{"Great Sword":0.03,"Great Axe":0.32,"Colossal Sword":0.65}, "42":{"Great Sword":0.03,"Great Axe":0.31,"Colossal Sword":0.66}, "43":{"Great Sword":0.02,"Great Axe":0.31,"Colossal Sword":0.67}, "44":{"Great Sword":0.02,"Great Axe":0.30,"Colossal Sword":0.67}, "45":{"Great Sword":0.02,"Great Axe":0.30,"Colossal Sword":0.68}, "46":{"Great Sword":0.02,"Great Axe":0.29,"Colossal Sword":0.69}, "47":{"Great Sword":0.02,"Great Axe":0.29,"Colossal Sword":0.69}, "48":{"Great Sword":0.02,"Great Axe":0.28,"Colossal Sword":0.69}, "49":{"Great Sword":0.02,"Great Axe":0.28,"Colossal Sword":0.70}, "50":{"Great Sword":0.02,"Great Axe":0.28,"Colossal Sword":0.70}, "51":{"Great Sword":0.02,"Great Axe":0.27,"Colossal Sword":0.71}, "52":{"Great Sword":0.02,"Great Axe":0.27,"Colossal Sword":0.71}, "53":{"Great Sword":0.02,"Great Axe":0.27,"Colossal Sword":0.71}, "54":{"Great Sword":0.02,"Great Axe":0.27,"Colossal Sword":0.72}, "55":{"Great Sword":0.02,"Great Axe":0.26,"Colossal Sword":0.72}, "60":{"Great Sword":0.02,"Great Axe":0.25,"Colossal Sword":0.73}, "65":{"Great Sword":0.02,"Great Axe":0.25,"Colossal Sword":0.74}, "70":{"Great Sword":0.01,"Great Axe":0.24,"Colossal Sword":0.75} };
        
        // World 3 Odds (Frostspire - High Tier)
		var weaponOdds3 = { "3":{"Dagger":1.0}, "4":{"Dagger":0.86,"Straight Sword":0.14}, "5":{"Dagger":0.35,"Straight Sword":0.65}, "6":{"Dagger":0.14,"Straight Sword":0.86}, "7":{"Dagger":0.06,"Straight Sword":0.74,"Mace":0.20}, "8":{"Dagger":0.02,"Straight Sword":0.44,"Mace":0.54}, "9":{"Dagger":0.01,"Straight Sword":0.24,"Mace":0.65,"Axe":0.10}, "10":{"Straight Sword":0.11,"Mace":0.47,"Axe":0.42}, "11":{"Straight Sword":0.05,"Mace":0.32,"Axe":0.63}, "12":{"Straight Sword":0.03,"Mace":0.22,"Axe":0.72,"Spear":0.03}, "13":{"Straight Sword":0.01,"Mace":0.14,"Axe":0.62,"Spear":0.22}, "14":{"Straight Sword":0.01,"Mace":0.08,"Axe":0.46,"Spear":0.45}, "15":{"Mace":0.05,"Axe":0.34,"Spear":0.60}, "16":{"Mace":0.03,"Axe":0.26,"Spear":0.69,"Great Axe":0.01}, "17":{"Mace":0.02,"Axe":0.19,"Spear":0.68,"Great Axe":0.11}, "18":{"Mace":0.01,"Axe":0.13,"Spear":0.57,"Great Axe":0.28}, "19":{"Mace":0.01,"Axe":0.09,"Spear":0.46,"Great Axe":0.45}, "20":{"Mace":0.01,"Axe":0.06,"Spear":0.36,"Great Axe":0.57}, "21":{"Axe":0.04,"Spear":0.29,"Great Axe":0.65,"Colossal Sword":0.02}, "22":{"Axe":0.03,"Spear":0.23,"Great Axe":0.67,"Colossal Sword":0.07}, "23":{"Axe":0.02,"Spear":0.18,"Great Axe":0.66,"Colossal Sword":0.13}, "24":{"Axe":0.02,"Spear":0.15,"Great Axe":0.64,"Colossal Sword":0.20}, "25":{"Axe":0.01,"Spear":0.12,"Great Axe":0.60,"Colossal Sword":0.26}, "26":{"Axe":0.01,"Spear":0.09,"Great Axe":0.53,"Colossal Sword":0.32}, "27":{"Axe":0.01,"Spear":0.10,"Great Axe":0.56,"Colossal Sword":0.37}, "28":{"Axe":0.01,"Spear":0.07,"Great Axe":0.50,"Colossal Sword":0.42}, "29":{"Axe":0.01,"Spear":0.07,"Great Axe":0.47,"Colossal Sword":0.46}, "30":{"Axe":0.01,"Spear":0.06,"Great Axe":0.45,"Colossal Sword":0.49}, "31":{"Spear":0.05,"Great Axe":0.43,"Colossal Sword":0.51}, "32":{"Spear":0.05,"Great Axe":0.41,"Colossal Sword":0.54}, "33":{"Spear":0.04,"Great Axe":0.39,"Colossal Sword":0.55}, "34":{"Spear":0.04,"Great Axe":0.38,"Colossal Sword":0.58}, "35":{"Spear":0.04,"Great Axe":0.37,"Colossal Sword":0.59}, "36":{"Spear":0.03,"Great Axe":0.36,"Colossal Sword":0.61}, "37":{"Spear":0.03,"Great Axe":0.35,"Colossal Sword":0.62}, "38":{"Spear":0.03,"Great Axe":0.34,"Colossal Sword":0.63}, "39":{"Spear":0.03,"Great Axe":0.33,"Colossal Sword":0.64}, "40":{"Spear":0.03,"Great Axe":0.32,"Colossal Sword":0.65}, "41":{"Spear":0.03,"Great Axe":0.32,"Colossal Sword":0.65}, "42":{"Spear":0.03,"Great Axe":0.31,"Colossal Sword":0.66}, "43":{"Spear":0.02,"Great Axe":0.31,"Colossal Sword":0.67}, "44":{"Spear":0.02,"Great Axe":0.30,"Colossal Sword":0.67}, "45":{"Spear":0.02,"Great Axe":0.30,"Colossal Sword":0.68}, "46":{"Spear":0.02,"Great Axe":0.29,"Colossal Sword":0.69}, "47":{"Spear":0.02,"Great Axe":0.29,"Colossal Sword":0.69}, "48":{"Spear":0.02,"Great Axe":0.28,"Colossal Sword":0.69}, "49":{"Spear":0.02,"Great Axe":0.28,"Colossal Sword":0.70}, "50":{"Spear":0.02,"Great Axe":0.28,"Colossal Sword":0.70}, "51":{"Spear":0.02,"Great Axe":0.27,"Colossal Sword":0.71}, "52":{"Spear":0.02,"Great Axe":0.27,"Colossal Sword":0.71}, "53":{"Spear":0.02,"Great Axe":0.27,"Colossal Sword":0.71}, "54":{"Spear":0.02,"Great Axe":0.27,"Colossal Sword":0.72}, "55":{"Spear":0.02,"Great Axe":0.26,"Colossal Sword":0.72}, "60":{"Spear":0.02,"Great Axe":0.25,"Colossal Sword":0.73}, "65":{"Spear":0.02,"Great Axe":0.25,"Colossal Sword":0.74}, "70":{"Spear":0.01,"Great Axe":0.24,"Colossal Sword":0.75} };
        
        // World 2 Odds (Forgotten - Mixed)
        var weaponOdds2 = JSON.parse(JSON.stringify(weaponOdds)); 

        var armorOdds = {"3":{"Light Helmet":1.0},"4":{"Light Helmet":1.0},"5":{"Light Helmet":0.89,"Light Leggings":0.11},"6":{"Light Helmet":0.56,"Light Leggings":0.44},"7":{"Light Helmet":0.32,"Light Leggings":0.67,"Light Chestplate":0.01},"8":{"Light Helmet":0.17,"Light Leggings":0.17,"Light Chestplate":0.17},"9":{"Light Helmet":0.08,"Light Leggings":0.51,"Light Chestplate":0.41},"10":{"Light Helmet":0.04,"Light Leggings":0.34,"Light Chestplate":0.53,"Medium Helmet":0.04},"11":{"Light Helmet":0.02,"Light Leggings":0.2,"Light Chestplate":0.47,"Medium Helmet":0.31},"12":{"Light Helmet":0.01,"Light Leggings":0.12,"Light Chestplate":0.37,"Medium Helmet":0.5},"13":{"Light Leggings":0.04,"Light Chestplate":0.28,"Medium Helmet":0.6,"Medium Leggings":0.04},"14":{"Light Leggings":0.04,"Light Chestplate":0.19,"Medium Helmet":0.55,"Medium Leggings":0.22},"15":{"Light Leggings":0.02,"Light Chestplate":0.12,"Medium Helmet":0.43,"Medium Leggings":0.43},"16":{"Light Leggings":0.01,"Light Chestplate":0.08,"Medium Helmet":0.32,"Medium Leggings":0.57,"Medium Chestplate":0.08},"17":{"Light Leggings":0.01,"Light Chestplate":0.05,"Medium Helmet":0.22,"Medium Leggings":0.57,"Medium Chestplate":0.16},"18":{"Light Chestplate":0.03,"Medium Helmet":0.14,"Medium Leggings":0.48,"Medium Chestplate":0.35},"19":{"Light Chestplate":0.02,"Medium Helmet":0.09,"Medium Leggings":0.39,"Medium Chestplate":0.5},"20":{"Light Chestplate":0.01,"Medium Helmet":0.06,"Medium Leggings":0.32,"Medium Chestplate":0.6,"Heavy Helmet":0.01},"21":{"Light Chestplate":0.01,"Medium Helmet":0.07,"Medium Leggings":0.25,"Medium Chestplate":0.63,"Heavy Helmet":0.07},"22":{"Medium Helmet":0.03,"Medium Leggings":0.19,"Medium Chestplate":0.59,"Heavy Helmet":0.19},"23":{"Medium Helmet":0.02,"Medium Leggings":0.14,"Medium Chestplate":0.52,"Heavy Helmet":0.32},"24":{"Medium Helmet":0.01,"Medium Leggings":0.1,"Medium Chestplate":0.44,"Heavy Helmet":0.44},"25":{"Medium Leggings":0.07,"Medium Chestplate":0.36,"Heavy Helmet":0.51,"Heavy Leggings":0.05},"26":{"Medium Leggings":0.05,"Medium Chestplate":0.28,"Heavy Helmet":0.51,"Heavy Leggings":0.15},"27":{"Medium Leggings":0.04,"Medium Chestplate":0.21,"Heavy Helmet":0.47,"Heavy Leggings":0.28,"Heavy Chestplate":0.21},"28":{"Medium Leggings":0.03,"Medium Chestplate":0.16,"Heavy Helmet":0.42,"Heavy Leggings":0.39},"29":{"Medium Leggings":0.02,"Medium Chestplate":0.11,"Heavy Helmet":0.35,"Heavy Leggings":0.47,"Heavy Chestplate":0.04},"30":{"Medium Leggings":0.01,"Medium Chestplate":0.08,"Heavy Helmet":0.28,"Heavy Leggings":0.49,"Heavy Chestplate":0.13},"31":{"Medium Leggings":0.01,"Medium Chestplate":0.06,"Heavy Helmet":0.22,"Heavy Leggings":0.46,"Heavy Chestplate":0.25},"32":{"Medium Leggings":0.01,"Medium Chestplate":0.04,"Heavy Helmet":0.17,"Heavy Leggings":0.42,"Heavy Chestplate":0.37},"33":{"Medium Chestplate":0.03,"Heavy Helmet":0.13,"Heavy Leggings":0.37,"Heavy Chestplate":0.47},"34":{"Medium Chestplate":0.02,"Heavy Helmet":0.1,"Heavy Leggings":0.33,"Heavy Chestplate":0.54},"35":{"Medium Chestplate":0.02,"Heavy Helmet":0.08,"Heavy Leggings":0.3,"Heavy Chestplate":0.6},"36":{"Medium Chestplate":0.01,"Heavy Helmet":0.07,"Heavy Leggings":0.27,"Heavy Chestplate":0.64},"37":{"Medium Chestplate":0.01,"Heavy Helmet":0.06,"Heavy Leggings":0.25,"Heavy Chestplate":0.68},"38":{"Medium Chestplate":0.01,"Heavy Helmet":0.05,"Heavy Leggings":0.23,"Heavy Chestplate":0.71},"39":{"Medium Chestplate":0.01,"Heavy Helmet":0.04,"Heavy Leggings":0.22,"Heavy Chestplate":0.73},"40":{"Medium Chestplate":0.01,"Heavy Helmet":0.04,"Heavy Leggings":0.2,"Heavy Chestplate":0.75},"41":{"Medium Chestplate":0.01,"Heavy Helmet":0.04,"Heavy Leggings":0.19,"Heavy Chestplate":0.77},"42":{"Heavy Helmet":0.03,"Heavy Leggings":0.18,"Heavy Chestplate":0.78},"43":{"Heavy Helmet":0.03,"Heavy Leggings":0.17,"Heavy Chestplate":0.79},"44":{"Heavy Helmet":0.03,"Heavy Leggings":0.17,"Heavy Chestplate":0.8},"45":{"Heavy Helmet":0.03,"Heavy Leggings":0.16,"Heavy Chestplate":0.81},"46":{"Heavy Helmet":0.02,"Heavy Leggings":0.16,"Heavy Chestplate":0.82},"47":{"Heavy Helmet":0.02,"Heavy Leggings":0.15,"Heavy Chestplate":0.82},"48":{"Heavy Helmet":0.02,"Heavy Leggings":0.15,"Heavy Chestplate":0.83},"49":{"Heavy Helmet":0.02,"Heavy Leggings":0.14,"Heavy Chestplate":0.83},"50":{"Heavy Helmet":0.02,"Heavy Leggings":0.14,"Heavy Chestplate":0.84},"51":{"Heavy Helmet":0.02,"Heavy Leggings":0.14,"Heavy Chestplate":0.84},"52":{"Heavy Helmet":0.02,"Heavy Leggings":0.13,"Heavy Chestplate":0.85},"53":{"Heavy Helmet":0.02,"Heavy Leggings":0.13,"Heavy Chestplate":0.85},"54":{"Heavy Helmet":0.02,"Heavy Leggings":0.13,"Heavy Chestplate":0.85},"55":{"Heavy Helmet":0.02,"Heavy Leggings":0.12,"Heavy Chestplate":0.86}};

        // --- DEFINE PLACEHOLDERS FOR ARMOR REGIONS 2 & 3 ---
        var armorOdds2 = JSON.parse(JSON.stringify(armorOdds));
        var armorOdds3 = JSON.parse(JSON.stringify(armorOdds));

		let currentRegion = "1"; // Default to Stonewake (1)

        // --- 3. WEAPON & ARMOR VARIANTS (UPDATED WITH REGIONS) ---
        var weaponVariants = {
            "Daggers": {
                "Dagger": [{ chance: 1, dmg: 4.3, time: 0.35, image: "DaggerIcon.png", minRegion: 1 }],
                "Falchion Knife": [{ chance: 0.5, dmg: 4.3, time: 0.35, image: "FalchionKnife.png", minRegion: 1, maxRegion: 1 }],
                "Gladius Daggers": [{ chance: 0.25, dmg: 4.3, time: 0.35, image: "GladiusDagger.png", minRegion: 1 }],
                "Hook": [{ chance: 0.0625, dmg: 4.73, time: 0.39, image: "Hook.png", minRegion: 2 }],
                "Cultist Dagger": [{ chance: 0, dmg: 5.25, time: 0.35, image: "CultistDagger.png", minRegion: 3 }],
                "Shark's Fangs": [{ chance: 0.16, dmg: 3.87, time: 0.27, image: "Shark's_Fangs.webp", minRegion: 3 }],
                "Curved Dagger": [{ chance: 0.125, dmg: 4.95, time: 0.3, image: "CurvedDagger.png", minRegion: 2 }]
            },
            "Straight Swords": {
                "Falchion Sword": [{ chance: 1, dmg: 7.5, time: 0.59, image: "FalchionSword.png", minRegion: 1 }],
                "Gladius Sword": [{ chance: 0.5, dmg: 7.5, time: 0.5, image: "GladiusSword.png", minRegion: 1, maxRegion: 1 }],
                "Cutlass": [{ chance: 0.5, dmg: 9.375, time: 0.66, image: "Cutlass.png", minRegion: 2 }],
                "Rapier": [{ chance: 0.25, dmg: 7.5, time: 0.49, image: "Rapier.png", minRegion: 1 }],
                "Chaos": [{ chance: 0.0625, dmg: 9.375, time: 0.59, image: "Chaos.png", minRegion: 2 }],
                "Candy Cane": [{ chance: 0.125, dmg: 7.5, time: 0.44, image: "CandyCane.png", minRegion: 2 }],
                "Hell Slayer": [{ chance: 0.1, dmg: 10.175, time: 0.59, image: "HellSlayer.png", minRegion: 3 }],
                "Crystallized Broadsword": [{ chance: 0.16, dmg: 9.975, time: 0.62, image: "Crystallized Broadsword.png", minRegion: 3 }],
                "Hook Blade": [{ chance: 0.2, dmg: 8.25, time: 0.44, image: "HookBlade.png", minRegion: 2 }]
            },
            "Great Swords": {
                "Crusader Sword": [{ chance: 1, dmg: 12, time: 1, image: "CrusaderSword.png", minRegion: 1 }],
                "Long Sword": [{ chance: 0.5, dmg: 12, time: 1.11, image: "LongSword.png", minRegion: 2 }],
                "Anchored Greatsword": [{ chance: 0.16, dmg: 13.8, time: 0.91, image: "Anchored Greatsword.png", minRegion: 2 }],
                "Dark Knight's Greatsword": [{ chance: 0.25, dmg: 15, time: 1.11, image: "DarkKnightGreatsword.png", minRegion: 2 }]
            },
            "Gauntlets": {
                "Ironhand": [{ chance: 1, dmg: 7.6, time: 0.51, image: "Ironhand.png", minRegion: 1 }],
                "Boxing Gloves": [{ chance: 0.25, dmg: 8, time: 0.59, image: "Boxingglove.png", minRegion: 1 }],
                "Relevator": [{ chance: 0.25, dmg: 9.6, time: 0.69, image: "Relevator.png", minRegion: 2 }],
                "Savage Claws": [{ chance: 0.25, dmg: 8, time: 0.47, image: "SavageClaws.png", minRegion: 3 }],
                "Dark Knight's Gauntlets": [{ chance: 0.16, dmg: 10, time: 0.47, image: "DarkKnightGauntlets.png", minRegion: 2 }]
            },
            "Katanas": {
                "Uchigatana": [{ chance: 1, dmg: 8.5, time: 0.6, image: "Uchigatana.png", minRegion: 1 }],
                "Tachi": [{ chance: 0.25, dmg: 8.925, time: 0.63, image: "Tachi.png", minRegion: 2 }],
                "Straight Edge Katana": [{ chance: 0.16, dmg: 9.35, time: 0.6, image: "StraightEdgeKatana.png", minRegion: 2 }]
            },
            "Great Axes": {
                "Double Battle Axe": [{ chance: 1, dmg: 15.75, time: 1.05, image: "DoubleBattleAxe.png", minRegion: 1 }],
                "Scythe": [{ chance: 0.25, dmg: 14.25, time: 0.95, image: "Scythe.png", minRegion: 2 }],
                "Greater Battle Axe": [{ chance: 0.25, dmg: 17.25, time: 1, image: "GreaterBattleAxe.png", minRegion: 3 }],
                "Wyvern Axe": [{ chance: 0.25, dmg: 18.75, time: 0.91, image: "Wyvern Axe.png", minRegion: 3 }],
                "Anchored Straight Blade": [{ chance: 0.16, dmg: 18, time: 1, image: "Anchored Greatsword.png", minRegion: 3 }],
                "Executioner's Greataxe": [{ chance: 0.2, dmg: 19.5, time: 1.05, image: "Executioner's Greataxe.png", minRegion: 3 }]
            },
            "Colossal Swords": {
                "Great Sword": [{ chance: 1, dmg: 20, time: 1.12, image: "GreatSword.png", minRegion: 1 }],
                "Hammer": [{ chance: 0.25, dmg: 22, time: 1.24, image: "Hammer.png", minRegion: 1 }],
                "Comically Large Spoon": [{ chance: 0.0625, dmg: 18, time: 1.12, image: "ComicallyLargeSpoon.png", minRegion: 1, maxRegion: 1 }],
                "Skull Crusher": [{ chance: 0.125, dmg: 24, time: 1.4, image: "SkullCrusher.png", minRegion: 2 }],
                "Dragon Slayer": [{ chance: 0.0625, dmg: 22, time: 1.12, image: "DragonSlayer.png", minRegion: 2 }],
                "Excalibur": [{ chance: 0.001, dmg: 26, time: 1.12, image: "Excalibur.png", minRegion: 3 }],
                "Colossal TerrorBlade": [{ chance: 0.5, dmg: 22, time: 1.02, image: "ColossalTerrorBlade.png", minRegion: 3 }],
                "Colossal Gemblade": [{ chance: 0.16, dmg: 23, time: 1.12, image: "ColossalGemblade.png", minRegion: 3 }]
            },
            "Mace": {
                "Mace": [{ chance: 1, dmg: 6, time: 0.46, image: "Mace.png", minRegion: 1 }],
                "Spiked Mace": [{ chance: 0.5, dmg: 6.3, time: 0.46, image: "Spiked Mace.png", minRegion: 1 }],
                "Winged Mace": [{ chance: 0.25, dmg: 6.6, time: 0.46, image: "Winged Mace.png", minRegion: 2 }],
                "Hammerhead Mace": [{ chance: 0.125, dmg: 6.9, time: 0.46, image: "HammerheadMace.png", minRegion: 2 }],
                "Grave Maker": [{ chance: 0.0625, dmg: 7.8, time: 0.46, image: "Grave Maker.png", minRegion: 3 }]
            },
            "Axe": {
                "Axe": [{ chance: 1, dmg: 7, time: 0.48, image: "Axe.png", minRegion: 1 }],
                "Battleaxe": [{ chance: 1, dmg: 7.35, time: 0.48, image: "Battleaxe.png", minRegion: 1 }],
                "Curved Handle Axe": [{ chance: 0.25, dmg: 7.7, time: 0.48, image: "CurvedHandleAxe.png", minRegion: 2 }],
                "Spade Armed Axe": [{ chance: 0.125, dmg: 8.05, time: 0.48, image: "Spade Armed Axe.png", minRegion: 2 }],
                "Ornate Short Axe": [{ chance: 0.16, dmg: 8.4, time: 0.48, image: "OrnateShortAxe.png", minRegion: 3 }]
            },
            "Spears": {
                "Spear": [{ chance: 1, dmg: 7.5, time: 0.45, image: "Spear.png", minRegion: 1 }],
                "Trident": [{ chance: 0.5, dmg: 7.5, time: 0.45, image: "Trident.png", minRegion: 1 }],
                "Angelic Spear": [{ chance: 0.125, dmg: 9.75, time: 0.41, image: "AngelicSpear.png", minRegion: 2 }],
                "Knight Spear": [{ chance: 0.25, dmg: 10.125, time: 0.38, image: "Knight Spear.png", minRegion: 2 }],
                "Compass Spear": [{ chance: 0.16, dmg: 10.5, time: 0.47, image: "CompassSpear.png", minRegion: 3 }]
            }
        };

        var armorVariants = {
            "Light Helmet": [
                { name: "Light Helmet", image: "LightHelmet.png", chance: 1, baseDef: 3.75, minRegion: 1 }
            ],
            "Light Chestplate": [
                { name: "Light Chestplate", image: "LightChestplate.png", chance: 1, baseDef: 5, minRegion: 1 }
            ],
            "Light Leggings": [
                { name: "Light Leggings", image: "LightLeggings.png", chance: 1, baseDef: 4.375, minRegion: 1 }
            ],
            "Medium Helmet": [
                { name: "Medium Helmet", image: "MediumHelmet.png", chance: 1, baseDef: 6.25, minRegion: 1 },
                { name: "Samurai Helmet", image: "SamuraiHelmet.png", chance: 0.5, baseDef: 8, minRegion: 2 },
                { name: "Viking Helmet", image: "VikingHelmet.png", chance: 0.25, baseDef: 10.5, minRegion: 3 }
            ],
            "Medium Chestplate": [
                { name: "Medium Chestplate", image: "MediumChestplate.png", chance: 1, baseDef: 8.75, minRegion: 1 },
                { name: "Samurai Chestplate", image: "SamuraiChestplate.png", chance: 0.5, baseDef: 12.75, minRegion: 2 },
                { name: "Viking Chestplate", image: "VikingChestplate.png", chance: 0.25, baseDef: 15, minRegion: 3 }
            ],
            "Medium Leggings": [
                { name: "Medium Leggings", image: "MediumLeggings.png", chance: 1, baseDef: 7.5, minRegion: 1 },
                { name: "Samurai Leggings", image: "SamuraiLeggings.png", chance: 0.5, baseDef: 9, minRegion: 2 },
                { name: "Viking Leggings", image: "VikingLeggings.png", chance: 0.25, baseDef: 11, minRegion: 3 }
            ],
            "Heavy Helmet": [
                { name: "Knight Helmet", image: "KnightHelmet.png", chance: 1, baseDef: 12.5, minRegion: 1 },
                { name: "Dark Knight Helmet", image: "DarkKnightHelmet.png", chance: 0.5, baseDef: 18.75, minRegion: 2 },
                { name: "Wolf Helmet", image: "WolfHelmet.png", chance: 0.25, baseDef: 25, minRegion: 3 },
                { name: "Raven's Helmet", image: "RavenHelmet.png", chance: 0.125, baseDef: 26.5, minRegion: 3 },
                { name: "Goblin's Crown", image: "GoblinCrown.png", chance: 0.16, baseDef: 26, minRegion: 3 }
            ],
            "Heavy Chestplate": [
                { name: "Knight Chestplate", image: "KnightChestplate.png", chance: 1, baseDef: 16.25, minRegion: 1 },
                { name: "Dark Knight Chestplate", image: "DarkKnightChestplate.png", chance: 0.5, baseDef: 25, minRegion: 2 },
                { name: "Wolf Chestplate", image: "WolfChestPlate.png", chance: 0.25, baseDef: 35, minRegion: 3 },
                { name: "Raven's Chestplate", image: "RavenChestplate.png", chance: 0.125, baseDef: 37, minRegion: 3 }
            ],
            "Heavy Leggings": [
                { name: "Knight Leggings", image: "KnightLeggings.png", chance: 1, baseDef: 13.75, minRegion: 1 },
                { name: "Dark Knight Leggings", image: "DarkKnightLeggings.png", chance: 0.5, baseDef: 21.875, minRegion: 2 },
                { name: "Wolf Leggings", image: "WolfLeggings.png", chance: 0.25, baseDef: 28, minRegion: 3 },
                { name: "Raven's Leggings", image: "RavenLeggings.png", chance: 0.125, baseDef: 29.25, minRegion: 3 }
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
    							<div class="ore-header-row">
        							<h3>Select Ores</h3>
        							<button id="ore-sort-btn">⬇</button>
    							</div>
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
                            <div class="enhancement-bar">
                                <div style="display:flex; align-items:center; gap:10px;"><span style="font-weight:bold;">Enhancement</span><input id="enhAmt" class="enh-input" type="number" min="0" max="9" value="0"></div>
                                <div style="display:flex; gap:10px;">
                                    <button class="seg-btn active" data-type="Weapon">Weapon</button>
                                    <button class="seg-btn" data-type="Armor">Armor</button>
                                    <button id="clear-all-btn" style="background:#442222; border:none; padding:6px 12px; border-radius:4px; color:#fff; cursor:pointer;">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <aside class="panel">
                    <div class="panel-inner">
						<div class="region-field">
						  <div class="card-header">REGION</div>
						  <div class="region-dropdown" id="regionDropdown">
						    <span id="regionValue">Stonewake's Cross</span>
						    <span class="region-arrow">▾</span>
						  </div>
						  <div class="region-options" id="regionOptions">
						    <div data-value="1">Stonewake's Cross</div>
						    <div data-value="2">Forgotten Kingdom</div>
                            <div data-value="3">Frostspire Expanse</div>
						  </div>
						</div>
                        <div class="card-header">Composition</div><div id="composition-area" class="result-card"></div>
                        <div class="card-header">Traits</div><div id="traits-area" class="result-card"></div>
                        <div class="card-header">Odds</div><div id="odds-area" class="result-card"></div>
                    </div>
                </aside>
            </div>
        `);
        
        const dropdown = document.getElementById("regionDropdown");
		const options = document.getElementById("regionOptions");
		const value = document.getElementById("regionValue");
		
		dropdown.onclick = () => {
		  options.style.display = options.style.display === "block" ? "none" : "block";
		};
		
		options.querySelectorAll("div").forEach(opt => {
		  opt.onclick = () => {
		    value.textContent = opt.textContent;
		    currentRegion = opt.dataset.value;
		    options.style.display = "none";
		    doAutoUpdate();
		  };
		});
		
		document.addEventListener("click", e => {
		  if (!dropdown.contains(e.target) && !options.contains(e.target)) {
		    options.style.display = "none";
		  }
		});

        // --- 5. LOGIC ---
        const oreListEl = $('#ore-list');
        const runeListEl = $('#rune-list');
        const oreSlots = [$('#slot1'), $('#slot2'), $('#slot3'), $('#slot4')];
        const runeSlots = [$('#rune-slot-1'), $('#rune-slot-2'), $('#rune-slot-3')];
        let currentCraftType = 'Weapon';

        function init() {
            renderOreList();
            $('#ore-sort-btn').click(()=>{
    			oreSortDesc = !oreSortDesc;
    			$('#ore-sort-btn').text(oreSortDesc ? '⬇' : '⬆');
    			renderOreList($('#ore-search').val() || '');
			});
            renderRuneList();
            $('#ore-search').on('input', function() { renderOreList(this.value); });
            $('#enhAmt').on('input', function() { updateRuneVisibility(); doAutoUpdate(); });
            $('#quality-amt').on('input', doAutoUpdate);
            $('#clear-all-btn').on('click', clearAll);
            $('.seg-btn').on('click', function() {
                $('.seg-btn').removeClass('active');
				$(this).addClass('active');
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

    		Object.entries(cores)
    			.filter(([k]) => k.toLowerCase().includes(f))
        		.sort((a,b)=>oreSortDesc ? b[1].multiplier-a[1].multiplier : a[1].multiplier-b[1].multiplier)
        		.forEach(([name,d])=>{
            		let item = $('<li class="grid-item" style="border-color:'+d.rarityColor+'"></li>');
            		item.append('<div class="grid-image" style="background-image:url(\''+getImg(d.image)+'\')"></div>');
            		item.append('<div class="item-name">'+name+'</div>');
            		item.append('<div class="item-mult">'+d.multiplier+'x</div>');
            		item.click(()=>addOre(name));
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
            	if (!isRune && cores[name] && cores[name].rarityColor) {
    				slot.css({
        				borderColor: cores[name].rarityColor,
        				boxShadow: `0 0 6px ${cores[name].rarityColor}66`
    				});
				}

                slot.addClass('filled'); nameEl.text(name); countEl.text(isRune ? '' : count); // Don't show count 1 for runes
                
                let imgFile = '';
                if(isRune) {
                    if(runes[name]) imgFile = runes[name].image;
                } else {
                    if(cores[name]) imgFile = cores[name].image;
                }

                if (imgFile) slot.append(`<div class="grid-image" style="background-image:url('${getImg(imgFile)}')"></div>`);
            } else {
            	slot.css({
    				borderColor: '',
    				boxShadow: ''
				});

                slot.removeClass('filled'); slot.attr(isRune ? 'data-rune-name' : 'data-ore-name', ''); nameEl.text('Empty'); countEl.empty();
            }
        }

        function clearAll() {
            oreSlots.forEach(s => { s.attr('data-ore-name','').attr('data-ore-count','0'); updateSlotDisplay(s); });
            runeSlots.forEach(s => { s.attr('data-rune-name','').attr('data-rune-count','0'); updateSlotDisplay(s, true); });
            doAutoUpdate();
        }

        function simpleFraction(decimal) {
        	if(decimal === 0) return "N/A";
            if(decimal === 1) return "1/1";
            if(decimal === 0.5) return "1/2";
            if(decimal === 0.25) return "1/4";
            if(decimal === 0.2) return "1/5";
            if (decimal > 0.15 && decimal < 0.18) return "1/6";
            if(decimal === 0.125) return "1/8";
            if(decimal === 0.1) return "1/10";
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
                    traitsHTML += `<div style="margin-bottom:5px; border-left:2px solid var(--fc-accent-gold-light); padding-left:5px;">
                        <div style="font-weight:bold; font-size:11px; color:var(--fc-accent-gold-light);">${oreName}</div>
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
                    traitsHTML += `<div style="margin-bottom:10px; border-left:2px solid #8b2a2a; padding-left:5px;">
                        <div style="font-weight:bold; font-size:12px; color:#c94a4a; margin-bottom:4px;">${rName} (Rune)</div>`;
                    
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

            // --- ODDS CALCULATION START ---
            
            // Use exact total ore count, clamped to valid table range
            let totalOres = total;
            if (totalOres < 3) totalOres = 3;
            if (totalOres > 55) totalOres = 55;
            
            // --- SELECT ODDS TABLE BASED ON REGION & TYPE ---
            let dict;
            
            if (currentCraftType === 'Weapon') {
                 if (currentRegion === "3") dict = weaponOdds3; // Frostspire Weapon
                 else if (currentRegion === "2") dict = weaponOdds2; // Forgotten Kingdom Weapon
                 else dict = weaponOdds; // Stonewake Weapon (Default)
            } else {
                 if (currentRegion === "3") dict = armorOdds3; // Frostspire Armor
                 else if (currentRegion === "2") dict = armorOdds2; // Forgotten Kingdom Armor
                 else dict = armorOdds; // Stonewake Armor (Default)
            }
            
            // Use exact total as string key, with fallback for missing keys
            let oddsKey = String(totalOres);
            if (!dict[oddsKey]) {
                // Find the closest available key that is <= totalOres
                let keys = Object.keys(dict).map(Number).sort((a,b)=>a-b);
                let closestKey = keys.filter(k => k <= totalOres).pop();
                if (closestKey) oddsKey = String(closestKey);
            }
            
            let odds = dict[oddsKey] || {};

            let oddsHTML = '';
            
            // Get current region integer for filtering
            let regionInt = parseInt(currentRegion) || 1;
            
            Object.entries(odds).sort((a,b)=>b[1]-a[1]).forEach(([categoryName, probability]) => {
                
                // Temp buffer for rows so we only show header if rows exist after filtering
                let rowsHTML = '';
                
                if(currentCraftType === 'Weapon') {
                    let variantCategory = categoryMap[categoryName];
                    if(variantCategory && weaponVariants[variantCategory]) {
                        Object.keys(weaponVariants[variantCategory]).forEach(vName => {
                            weaponVariants[variantCategory][vName].forEach(v => {
                                // --- FILTER: Region Lock (Min Region) ---
                                if ((v.minRegion || 1) > regionInt) return;

                                // --- FILTER: Region Lock (Max Region - e.g. Spoon is World 1 Only) ---
                                if (v.maxRegion && regionInt > v.maxRegion) return;
                                
                                let base = Number(v.dmg);
								let quality = Number($('#quality-amt').val()) / 100 || 0;
								let enhancementFactor = 1 + ((Number($('#enhAmt').val()) || 0) * 0.05);
								let mult = Number(combinedMult);
								
								let finalDmg = (base + base * quality) * mult * enhancementFactor;
								let dps = finalDmg / v.time;
								let dpsText = isFinite(dps) ? dps.toFixed(2) : '—';
                                let imgStyle = v.image ? `background-image:url('${getImg(v.image)}')` : '';
                                
                                let dmgText = isFinite(finalDmg) ? finalDmg.toFixed(2) : '—';

                                rowsHTML += `<div class="odds-grid-row"><div class="col-img" style="${imgStyle}"></div><div class="col-name">${vName}</div><div class="col-chance">${simpleFraction(v.chance)}</div><div class="col-dmg">${dmgText}</div><div class="col-dps">${dpsText}</div></div>`;
                            });
                        });
                    }
                } else {
                    // RENDER ARMOR VARIANTS
                    if(armorVariants[categoryName]) {
                        armorVariants[categoryName].forEach(v => {
                             // --- FILTER: Region Lock (Min Region) ---
                             if ((v.minRegion || 1) > regionInt) return;

                             // --- FILTER: Region Lock (Max Region) ---
                             if (v.maxRegion && regionInt > v.maxRegion) return;

                            let quality = (parseInt($('#quality-amt').val()) || 100) / 100;
							let enh = parseInt($('#enhAmt').val()) || 0;
							let enhancementFactor = 1 + (enh * 0.05);
							
							let finalDef = (v.baseDef + (v.baseDef * quality)) * combinedMult * enhancementFactor;
							let defText = isFinite(finalDef) ? Math.round(finalDef) : '—';
                            
                            let imgStyle = v.image ? `background-image:url('${getImg(v.image)}')` : '';
                            // Show Calculated Defense in "Damage" col
                            rowsHTML += `<div class="odds-grid-row"><div class="col-img" style="${imgStyle}"></div><div class="col-name">${v.name}</div><div class="col-chance">${simpleFraction(v.chance)}</div><div class="col-dmg" style="color:#88ff88;">${defText} Def</div><div class="col-dps"></div></div>`;
                        });
                    }
                }
                
                // Only append the category header if there are valid items to show
                if (rowsHTML) {
                    oddsHTML += `<div class="odds-type-card"><div class="odds-type-header"><span>${categoryName}</span><span style="color:var(--fc-accent-gold-light)">${(probability*100).toFixed(1)}%</span></div>` + rowsHTML + `</div>`;
                }
            });
            $('#odds-area').html(oddsHTML);
        }

        init();
    });
});