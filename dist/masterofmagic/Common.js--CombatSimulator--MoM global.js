console.log("load MoM_global.js");

// Global variables

function MoM_global()
{
   with (this)
   {

   // Configuration
   this.g_music = true;
   this.g_debug = false;            // Whether to detect and show errors
   this.g_verbose = false;          // Whether to generate verbose output in a separate window
   this.g_window_verbose = null;    // The window for verbose output
   this.g_lines_output = 10;        // The number of lines in the output window
   this.g_method = 1;               // Method to calculate combat results (1=Old, 2=New, 3=SimOnce, 4=MonteCarlo)
   this.g_nr_simulations = 100;     // Nr of simulations to use for the Monte Carlo method

   // Constants
   /*
   this.eWeaponTypeUnspec = 0;
   this.eWeaponTypeNormal = 1;
   this.eWeaponTypeMagic = 2;
   this.eWeaponTypeMithril = 3;
   this.eWeaponTypeAdamantium = 4;
   this.eWeaponTypeMax = 5;
   */

   // List of all units
   this.g_units = new Array(
      new BaseUnit("", 0, 0, 0, 0, 0, 0, 0, ""),
      new BaseUnit("BA Spearmen", 8, 1, 1, 2, 5, 1, 0, "Thrown 1"),
      new BaseUnit("BA Swordsmen", 6, 3, 1, 2, 5, 1, 0, "Large Shield, Thrown 1"),
      new BaseUnit("BA Bowmen", 6, 1, 1, 1, 5, 1, 0, "Arrowsx8"),
      new BaseUnit("BA Cavalry", 4, 4, 1, 2, 5, 3, 0, "First Strike, Thrown 1"),
      new BaseUnit("BA Shaman", 4, 2, 2, 3, 7, 1, 0, "Healer, Purify, Spellx4, Nature Priest"),
      new BaseUnit("BA Settlers", 1, 0, 0, 1, 5, 10, 0, "Create Outpost"),
      new BaseUnit("BA Berserkers", 6, 7, 3, 3, 7, 3, 0, "Thrown 3"),
      new BaseUnit("BE Spearmen", 8, 2, 0, 2, 5, 2, 0, ""),
      new BaseUnit("BE Swordsmen", 6, 4, 0, 2, 5, 2, 0, "Large Shield"),
      new BaseUnit("BE Halberdiers", 6, 5, 0, 3, 5, 2, 0, ""),
      new BaseUnit("BE Bowmen", 6, 2, 1, 1, 5, 2, 0, "Arrowsx8"),
      new BaseUnit("BE Priests", 4, 4, 4, 4, 8, 2, 0, "Healer, Purify, Healing Spell, Spellx4, Nature Priest"),
      new BaseUnit("BE Magicians", 4, 2, 5, 3, 9, 2, 0, "Missile Imm, Fire Ball Spell, Spellx4, Chaos Firebolt"),
      new BaseUnit("BE Engineers", 6, 2, 0, 1, 5, 2, 0, "Construction, Wall Crusher"),
      new BaseUnit("BE Settlers", 1, 1, 0, 1, 5, 20, 0, "Create Outpost"),
      new BaseUnit("BE Centaurs", 4, 3, 2, 3, 5, 3, 0, "Arrowsx6"),
      new BaseUnit("BE Manticores", 2, 5, 6, 3, 6, 7, 0, "Scout 2, Poison 6"),
      new BaseUnit("BE Minotaurs", 2, 12, 0, 4, 7, 12, +2, "Large Shield"),
      new BaseUnit("DE Spearmen", 8, 1, 1, 2, 7, 1, 0, "Spellx4, Chaos Drow"),
      new BaseUnit("DE Swordsmen", 6, 3, 1, 2, 7, 1, 0, "Large Shield, Spellx4, Chaos Drow"),
      new BaseUnit("DE Halberdiers", 6, 4, 1, 3, 7, 1, 0, "Spellx4, Chaos Drow"),
      new BaseUnit("DE Cavalry", 4, 4, 1, 2, 7, 3, 0, "First Strike, Spellx4, Chaos Drow"),
      new BaseUnit("DE Priests", 4, 3, 6, 4, 10, 1, 0, "Healer, Purify, Healing Spell, Spellx4, Nature Priest"),
      new BaseUnit("DE Settlers", 1, 0, 0, 1, 7, 10, 0, "Create Outpost"),
      new BaseUnit("DE Nightblades", 6, 4, 0, 3, 7, 1, 0, "Invisibility, Poison 1"),
      new BaseUnit("DE Warlocks", 4, 1, 7, 4, 9, 1, 0, "Missile Imm, Doombolt Spell, Spellx4, Chaos Firebolt"),
      new BaseUnit("DE Nightmares", 2, 8, 5, 4, 8, 10, 0, "Scout 2, Spellx4, Flying, Chaos Drow"),
      new BaseUnit("DR Spearmen", 8, 1, 1, 3, 6, 1, 0, "Fire Breath 1, Flying"),
      new BaseUnit("DR Swordsmen", 6, 3, 1, 3, 6, 1, 0, "Large Shield, Fire Breath 1, Flying"),
      new BaseUnit("DR Halberdiers", 6, 4, 1, 4, 6, 1, 0, "Fire Breath 1, Flying"),
      new BaseUnit("DR Bowmen", 6, 1, 1, 2, 6, 1, 0, "Arrowsx8, Flying"),
      new BaseUnit("DR Shaman", 4, 2, 2, 4, 8, 1, 0, "Healer, Purify, Spellx4, Flying, Nature Priest"),
      new BaseUnit("DR Magicians", 4, 1, 5, 4, 10, 1, 0, "Missile Imm, Fire Ball Spell, Spellx4, Flying, Chaos Firebolt"),
      new BaseUnit("DR Engineers", 6, 1, 1, 2, 6, 1, 0, "Construction, Wall Crusher, Flying"),
      new BaseUnit("DR Settlers", 1, 0, 0, 2, 6, 10, 0, "Create Outpost, Flying"),
      new BaseUnit("DR Doom Drakes", 2, 8, 6, 3, 9, 10, 0, "Scout 2, Fire Breath 6, Flying"),
      new BaseUnit("DR Air Ship", 1, 5, 10, 5, 8, 20, 0, "Scout 2, Wall Crusher, Rocksx10, Flying"),
      new BaseUnit("DW Swordsmen", 6, 3, 0, 2, 8, 3, 0, "Mountaineer, Large Shield"),
      new BaseUnit("DW Halberdiers", 6, 4, 0, 3, 8, 3, 0, "Mountaineer"),
      new BaseUnit("DW Engineers", 6, 1, 0, 1, 8, 3, 0, "Construction, Mountaineer, Wall Crusher"),
      new BaseUnit("DW Hammerhands", 6, 8, 0, 4, 9, 4, 0, "Mountaineer"),
      new BaseUnit("DW Steam Cannon", 1, 0, 12, 2, 9, 12, 0, "Mountaineer, Rocksx10"),
      new BaseUnit("DW Golem", 1, 12, 0, 8, 15, 20, 0, "Poison Imm, Death Imm"),
      new BaseUnit("DW Settlers", 1, 0, 0, 1, 8, 30, 0, "Create Outpost"),
      new BaseUnit("GN Spearmen", 8, 3, 0, 2, 4, 1, 0, ""),
      new BaseUnit("GN Swordsmen", 6, 5, 0, 2, 4, 1, 0, "Large Shield"),
      new BaseUnit("GN Halberdiers", 6, 6, 0, 3, 4, 1, 0, "Negate First Strike"),
      new BaseUnit("GN Bowmen", 6, 3, 1, 1, 4, 1, 0, "Arrowsx8"),
      new BaseUnit("GN Settlers", 1, 2, 0, 1, 4, 10, 0, "Create Outpost"),
      new BaseUnit("GN Wolf Riders", 4, 7, 0, 3, 4, 5, 0, ""),
      new BaseUnit("HE Spearmen", 8, 1, 0, 2, 6, 1, +1, "Forester"),
      new BaseUnit("HE Swordsmen", 6, 3, 0, 2, 6, 1, +1, "Forester, Large Shield"),
      new BaseUnit("HE Halberdiers", 6, 4, 0, 3, 6, 1, +1, "Forester"),
      new BaseUnit("HE Cavalry", 4, 4, 0, 2, 6, 3, +1, "Forester, First Strike"),
      new BaseUnit("HE Magicians", 4, 1, 5, 3, 10, 1, +1, "Forester, Missile Imm, Fire Ball Spell, Spellx4, Chaos Firebolt"),
      new BaseUnit("HE Settlers", 1, 0, 0, 1, 6, 10, +1, "Create Outpost, Forester"),
      new BaseUnit("HE Longbowmen", 6, 1, 3, 2, 6, 1, +1, "Arrowsx8, Forester"),
      new BaseUnit("HE Elven Lords", 4, 5, 0, 4, 9, 3, +2, "Forester, Armor Piercing, First Strike"),
      new BaseUnit("HE Pegasai", 2, 5, 3, 4, 8, 5, +1, "Scout 2, Arrowsx8, Flying"),
      new BaseUnit("HF Spearmen", 8, 1, 0, 2, 6, 1, 0, "Lucky"),
      new BaseUnit("HF Swordsmen", 8, 2, 0, 2, 6, 1, 0, "Large Shield, Lucky"),
      new BaseUnit("HF Bowmen", 6, 1, 1, 1, 6, 1, 0, "Lucky, Arrowsx8"),
      new BaseUnit("HF Shaman", 4, 1, 2, 3, 8, 1, 0, "Healer, Purify, Lucky, Spellx4, Nature Priest"),
      new BaseUnit("HF Settlers", 1, 0, 0, 1, 6, 10, 0, "Create Outpost, Lucky"),
      new BaseUnit("HF Slingers", 8, 1, 2, 2, 6, 1, 0, "Lucky, Bulletsx6"),
      new BaseUnit("HM Spearmen", 8, 1, 0, 2, 4, 1, 0, ""),
      new BaseUnit("HM Swordsmen", 6, 3, 0, 2, 4, 1, 0, "Large Shield"),
      new BaseUnit("HM Bowmen", 6, 1, 1, 1, 4, 1, 0, "Arrowsx8"),
      new BaseUnit("HM Cavalry", 4, 4, 0, 2, 4, 3, 0, "First Strike"),
      new BaseUnit("HM Priests", 4, 3, 4, 4, 7, 1, 0, "Healer, Purify, Healing Spell, Spellx4, Nature Priest"),
      new BaseUnit("HM Magicians", 6, 1, 5, 3, 8, 1, 0, "Missile Imm, Fire Ball Spell, Spellx4, Chaos Firebolt"),
      new BaseUnit("HM Engineers", 6, 1, 0, 1, 4, 1, 0, "Construction, Wall Crusher"),
      new BaseUnit("HM Settlers", 1, 0, 0, 1, 4, 10, 0, "Create Outpost"),
      new BaseUnit("HM Pikemen", 8, 5, 0, 3, 5, 1, 0, "Negate First Strike, Armor Piercing"),
      new BaseUnit("HM Paladins", 4, 6, 0, 5, 8, 4, 0, "Magic Imm, Holy Bonus 1, Armor Piercing, First Strike"),
      new BaseUnit("KL Spearmen", 8, 1, 0, 4, 5, 1, 0, ""),
      new BaseUnit("KL Swordsmen", 6, 3, 0, 4, 5, 1, 0, "Large Shield"),
      new BaseUnit("KL Halberdiers", 6, 4, 0, 5, 5, 1, 0, ""),
      new BaseUnit("KL Engineers", 6, 1, 0, 1, 5, 1, 0, "Construction, Wall Crusher"),
      new BaseUnit("KL Settlers", 1, 0, 0, 1, 5, 10, 0, "Create Outpost"),
      new BaseUnit("KL Stag Beetle", 1, 15, 5, 7, 6, 20, 0, "Fire Breath 5"),
      new BaseUnit("LZ Spearmen", 8, 1, 0, 3, 4, 2, 0, "Swim"),
      new BaseUnit("LZ Swordsmen", 6, 3, 0, 3, 4, 2, 0, "Large Shield, Swim"),
      new BaseUnit("LZ Halberdiers", 6, 4, 0, 4, 4, 2, 0, "Negate First Strike, Swim"),
      new BaseUnit("LZ Javelineers", 6, 4, 3, 4, 5, 2, 0, "Arrowsx6, Swim"),
      new BaseUnit("LZ Shaman", 4, 2, 2, 3, 6, 2, 0, "Healer, Purify, Spellx4, Swim, Nature Priest"),
      new BaseUnit("LZ Settlers", 1, 0, 0, 2, 4, 20, 0, "Create Outpost, Swim"),
      new BaseUnit("LZ Dragon Turtle", 1, 10, 5, 8, 8, 15, 0, "Fire Breath 5, Swim"),
      new BaseUnit("NO Spearmen", 8, 1, 0, 2, 4, 1, 0, ""),
      new BaseUnit("NO Swordsmen", 6, 3, 0, 2, 4, 1, 0, "Large Shield"),
      new BaseUnit("NO Bowmen", 6, 1, 1, 1, 4, 1, 0, "Arrowsx8"),
      new BaseUnit("NO Priests", 4, 3, 4, 4, 7, 1, 0, "Healer, Purify, Healing Spell, Spellx4, Nature Priest"),
      new BaseUnit("NO Magicians", 4, 1, 5, 3, 8, 1, 0, "Missile Imm, Fire Ball Spell, Spellx4, Chaos Firebolt"),
      new BaseUnit("NO Settlers", 1, 0, 0, 1, 4, 10, 0, "Create Outpost"),
      new BaseUnit("NO Horsebowmen", 4, 4, 2, 2, 4, 3, 0, "Arrowsx8"),
      new BaseUnit("NO Pikemen", 8, 5, 0, 3, 5, 1, 0, "Negate First Strike, Armor Piercing"),
      new BaseUnit("NO Rangers", 4, 4, 3, 4, 6, 2, 0, "Forester, Mountaineer, Arrowsx8"),
      new BaseUnit("NO Griffins", 2, 9, 0, 5, 7, 10, 0, "Armor Piercing, First Strike, Flying"),
      new BaseUnit("OC Spearmen", 8, 1, 0, 2, 4, 1, 0, ""),
      new BaseUnit("OC Swordsmen", 6, 3, 0, 2, 4, 1, 0, "Large Shield"),
      new BaseUnit("OC Halberdiers", 6, 4, 0, 3, 4, 1, 0, ""),
      new BaseUnit("OC Bowmen", 6, 1, 1, 1, 4, 1, 0, "Arrowsx8"),
      new BaseUnit("OC Cavalry", 4, 4, 0, 2, 4, 3, 0, ""),
      new BaseUnit("OC Shaman", 4, 2, 2, 3, 6, 1, 0, "Healer, Purify, Spellx4, Nature Priest"),
      new BaseUnit("OC Magicians", 4, 1, 5, 3, 8, 1, 0, "Missile Imm, Fire Ball Spell, Spellx4, Chaos Firebolt"),
      new BaseUnit("OC Engineers", 6, 1, 0, 1, 4, 1, 0, "Construction, Wall Crusher"),
      new BaseUnit("OC Settlers", 1, 0, 0, 1, 4, 10, 0, "Create Outpost"),
      new BaseUnit("OC Wyvern Riders", 2, 5, 0, 5, 7, 10, 0, "Poison 6, Flying"),
      new BaseUnit("TR Spearmen", 4, 3, 0, 2, 7, 4, 0, "Regeneration"),
      new BaseUnit("TR Swordsmen", 4, 5, 0, 2, 7, 4, 0, "Large Shield, Regeneration"),
      new BaseUnit("TR Halberdiers", 4, 6, 0, 3, 7, 4, 0, "Regeneration, Negate First Strike"),
      new BaseUnit("TR Shaman", 4, 4, 2, 3, 8, 4, 0, "Healer, Regeneration, Purify, Spellx4, Nature Priest"),
      new BaseUnit("TR Settlers", 1, 0, 0, 1, 7, 40, 0, "Create Outpost, Regeneration"),
      new BaseUnit("TR War Trolls", 4, 8, 0, 4, 8, 5, 0, "Regeneration"),
      new BaseUnit("TR War Mammoths", 2, 10, 0, 6, 9, 12, 0, "Wall Crusher, First Strike"),
      new BaseUnit("Generic Trireme", 1, 6, 0, 4, 4, 10, 0, "Sailing"),
      new BaseUnit("Generic Galley", 1, 8, 2, 4, 6, 20, 0, "Arrowsx8, Sailing"),
      new BaseUnit("Generic Warship", 1, 10, 10, 5, 7, 30, 0, "Long Range, Rocksx99, Sailing"),
      new BaseUnit("Generic Catapult", 1, 0, 10, 2, 4, 10, 0, "Wall Crusher, Long Range, Rocksx10"),
      new BaseUnit("Arcane Magic Spirit", 1, 5, 0, 4, 8, 10, 0, "Meld With Node, Non Corporeal"),
      new BaseUnit("Black Skeletons", 6, 3, 0, 4, 5, 1, +1, "Missile Imm, Poison/Illusion/Cold/Death Imm"),
      new BaseUnit("Black Ghouls", 4, 4, 0, 3, 6, 3, +1, "Create Undead, Poison/Illusion/Cold/Death Imm, Poison 1"),
      new BaseUnit("Black Lycanthropy - Werewolves", 6, 5, 0, 1, 6, 5, +1, "Regeneration, Weapon Imm, Poison/Illusion/Cold/Death Imm"),
      new BaseUnit("Black Night Stalker", 1, 7, 1, 3, 8, 10, +1, "Invisibility, Poison/Illusion/Cold/Death Imm, Death Gaze -2"),
      new BaseUnit("Black Shadow Demons", 4, 5, 4, 4, 8, 5, +2, "Plane Shift, Non Corporeal, Regeneration, Weapon Imm, Poison/Illusion/Cold/Death Imm, Spellx8, Flying, Chaos Deathbolt"),
      new BaseUnit("Black Wraiths", 4, 7, 0, 6, 8, 8, +2, "Non Corporeal, Weapon Imm, Poison/Illusion/Cold/Death Imm, Life Steal -3, Flying"),
      new BaseUnit("Black Death Knights", 4, 9, 0, 8, 10, 8, +3, "Poison/Weapon/Cold/Death Imm, Armor Piercing, First Strike, Life Steal -4, Flying"),
      new BaseUnit("Black Demon Lord", 1, 20, 10, 10, 12, 20, +3, "Summon Demons 3, Weapon Imm, Poison/Illusion/Cold/Death Imm, Cause Fear Spell, Life Steal -5, Spellx8, Flying, Chaos Deathbolt"),
      new BaseUnit("Black Zombie Mastery - Zombies", 6, 4, 0, 3, 3, 3, +1, "Poison/Illusion/Cold/Death Imm"),
      new BaseUnit("Black Demon Lord - Demon", 1, 14, 0, 5, 7, 12, +1, "Weapon Imm, Missile Imm, Poison/Illusion/Cold/Death Imm, Flying"),
      new BaseUnit("Blue Phantom Warriors", 6, 3, 0, 0, 6, 1, 0, "Non Corporeal, Poison Imm, Stoning Imm, Death Imm, Illusion, Combat only"),
      new BaseUnit("Blue Phantom Beast", 1, 18, 0, 0, 8, 20, +1, "Non Corporeal, Poison Imm, Stoning Imm, Death Imm, Illusion, Combat only"),
      new BaseUnit("Blue Air Elemental", 1, 15, 0, 8, 9, 10, +1, "Invisibility, Poison Imm, Stoning Imm, Weapon Imm, Combat only, Flying"),
      new BaseUnit("Blue Floating Island", 1, 0, 0, 0, 10, 30, 0, "Poison Imm, Stoning Imm, Death Imm, Sailing"),
      new BaseUnit("Blue Nagas", 2, 4, 0, 3, 7, 6, +1, "First Strike, Poison 4, Swim"),
      new BaseUnit("Blue Storm Giant", 1, 12, 10, 7, 9, 20, +2, "Wall Crusher, Armor Piercing, Spellx4, Chaos Lightning"),
      new BaseUnit("Blue Djinn", 1, 15, 8, 8, 10, 20, +3, "Teleporting, Wind Walking, Caster 20, Flying, Nature Icebolt"),
      new BaseUnit("Blue Sky Drake", 1, 20, 20, 10, 14, 25, +3, "Illusion Imm, Magic Imm, Lightning 20, Flying"),
      new BaseUnit("Green War Bears", 2, 7, 0, 3, 6, 8, 0, "Forester"),
      new BaseUnit("Green Sprites", 4, 2, 3, 2, 8, 1, +1, "Forester, Spellx4, Flying, Nature Shimmer"),
      new BaseUnit("Green Giant Spiders", 2, 4, 0, 3, 7, 10, +1, "Web Spell, Poison 4"),
      new BaseUnit("Green Cockatrices", 4, 4, 0, 3, 7, 3, +1, "Stoning Touch -3, Flying"),
      new BaseUnit("Green Basilisk", 1, 15, 0, 4, 7, 30, +1, "Stoning Gaze -1"),
      new BaseUnit("Green Stone Giant", 1, 15, 15, 8, 9, 20, +2, "Rocksx2, Mount, Wall Crusher, Poison Imm, Stoning Imm"),
      new BaseUnit("Green Gorgons", 4, 8, 0, 7, 9, 9, +2, "Stoning Gaze -2, Flying"),
      new BaseUnit("Green Earth Elemental", 1, 25, 0, 4, 8, 30, +1, "Wall Crusher, Poison Imm, Stoning Imm, Combat only"),
      new BaseUnit("Green Behemoth", 1, 25, 0, 9, 10, 45, +2, ""),
      new BaseUnit("Green Colossus", 1, 20, 20, 10, 15, 30, +3, "Rocksx2, Wall Crusher, Poison Imm, Stoning Imm, First Strike"),
      new BaseUnit("Green Great Wyrm", 1, 25, 0, 12, 12, 45, +3, "Merging, Poison 15"),
      new BaseUnit("Red Fire Elemental", 1, 12, 0, 4, 6, 10, 0, "Poison Imm, Fire Imm, Stoning Imm, Combat only"),
      new BaseUnit("Red Hell Hounds", 4, 3, 3, 2, 6, 4, +1, "Fire Breath 3"),
      new BaseUnit("Red Fire Giant", 1, 10, 10, 5, 7, 15, +1, "Rocksx2, Mountaineer, Wall Crusher, Fire Imm"),
      new BaseUnit("Red Gargoyles", 4, 4, 0, 8, 7, 4, +1, "Poison Imm, Stoning Imm, Flying"),
      new BaseUnit("Red Doom Bat", 1, 10, 0, 5, 9, 20, +1, "Immolation, Flying"),
      new BaseUnit("Red Chimera", 4, 7, 4, 5, 8, 8, +1, "Fire Breath 4, Flying"),
      new BaseUnit("Red Chaos Spawn", 1, 1, 4, 6, 10, 15, 0, "Cause Fear Spell, Poison 4, Doom Gaze 4, Death Gaze -4, Stoning Gaze -4, Flying"),
      new BaseUnit("Red Efreet", 1, 9, 9, 7, 10, 12, +2, "Caster 20, Fire Imm, Flying, Chaos Firebolt"),
      new BaseUnit("Red Hydra Heads", 9, 6, 5, 4, 11, 10, +1, "Regeneration, Fire Breath 5, 9 Heads"),
      new BaseUnit("Red Great Drake", 1, 30, 30, 10, 12, 30, +3, "Fire Breath 30, Flying"),
      new BaseUnit("White Guardian Spirit", 1, 10, 0, 4, 10, 10, 0, "Meld With Node, Non Corporeal, Resistance to All 1, Protects node"),
      new BaseUnit("White Unicorns", 4, 5, 0, 3, 7, 6, +2, "Teleporting, Poison Imm, Resistance to All 2"),
      new BaseUnit("White Incarnation - The Chosen", 1, 12, 0, 8, 12, 12, +0, "Cast 15, Magic Imm, Missile Imm, Pray, Might x, Const, Lead x, Random Any 2"),
      new BaseUnit("White Angel", 1, 13, 0, 7, 8, 15, +2, "Illusion Imm, Holy Bonus 1, Dispel Evil, Flying"),
      new BaseUnit("White Arch Angel", 1, 15, 0, 10, 12, 18, +3, "Caster 40, Illusion Imm, Holy Bonus 2, Flying"),
      new BaseUnit("Hero Brax, The Dwarf", 1, 5, 0, 4, 10, 10, +0, "Const, Mount"),
      new BaseUnit("Hero Gunther, The Barbarian", 1, 5, 3, 3, 6, 9, +0, "Might, Thrown 3"),
      new BaseUnit("Hero Zaldron, The Sage", 1, 1, 6, 4, 6, 5, +0, "Sage 3, Cast 7, Sorcery Illusion"),
      new BaseUnit("Hero B'Shan, The Dervish", 1, 4, 4, 4, 6, 6, +0, "Noble, Arrows 8"),
      new BaseUnit("Hero Rakir, The Beastmaster", 1, 5, 0, 4, 6, 7, +0, "Cast 5, Scout 3, Forest"),
      new BaseUnit("Hero Valana, The Bard", 1, 4, 0, 5, 6, 6, +0, "Lead, Cast 5"),
      new BaseUnit("Hero Bahgtru, The Orc Warrior", 1, 6, 3, 4, 6, 8, +0, "Mount, Thrown 3, Random Ftr"),
      new BaseUnit("Hero Serena, The Healer", 1, 3, 6, 5, 7, 5, +0, "Cast 7, Healer, Random Mage, Nature Priest"),
      new BaseUnit("Hero Shuri, The Huntress", 1, 5, 4, 3, 6, 7, +0, "Blade, Arrows 8, Pathf, Random Ftr"),
      new BaseUnit("Hero Theria, The Thief", 1, 5, 0, 5, 6, 7, +0, "Agl, Charmed"),
      new BaseUnit("Hero Greyfairer, The Druid", 1, 1, 8, 5, 6, 5, +0, "Cast 7, Scout 3, Purify, Nature Green"),
      new BaseUnit("Hero Taki, The War Monk", 1, 6, 0, 5, 6, 6, +0, "Agl x, Random Ftr"),
      new BaseUnit("Hero Reywind, The Warrior Mage", 1, 4, 4, 4, 6, 7, +0, "Cast 5, Random Any, Chaos Firebolt"),
      new BaseUnit("Hero Malleus, The Magician", 1, 1, 8, 5, 10, 5, +0, "Arcane, Cast 10, Missile Imm, Random Mage, Chaos Firebolt"),
      new BaseUnit("Hero Tumu, The Assassin", 1, 3, 0, 5, 6, 6, +0, "Blade, Poison 5, Random Ftr"),
      new BaseUnit("Hero Jaer, The Wind Mage", 1, 1, 6, 5, 6, 5, +0, "Cast 7, Wind Walking, Missile Imm, Random Mage, Nature Icebolt"),
      new BaseUnit("Hero Marcus, The Ranger", 1, 6, 5, 5, 6, 8, +0, "Arrows 8, Scout 2, Pathfinding, Might, Cast 5"),
      new BaseUnit("Hero Fang, The Draconian", 1, 7, 5, 5, 6, 8, +0, "Flying, Fire Breath 5, Might, 2 Random Ftr"),
      new BaseUnit("Hero Morgana, The Witch", 1, 1, 8, 5, 6, 5, +0, "Charmed, Cast 10, Missile Imm, 2 Random Mage, Chaos Firebolt"),
      new BaseUnit("Hero Aureus, The Golden One", 1, 6, 6, 6, 6, 6, +0, "Cast 5, 2 Random Any, Chaos Firebolt"),
      new BaseUnit("Hero Shin Bo, The Ninja", 1, 6, 0, 5, 6, 7, +0, "Invisibility, Blade, 2 Random Ftr"),
      new BaseUnit("Hero Spyder, The Rogue", 1, 7, 0, 5, 6, 8, +0, "Lead, Legend x, Random Ftr"),
      new BaseUnit("Hero Shalla, The Amazon", 1, 7, 4, 4, 6, 8, +0, "Charmed, Thrown 4, Might, Blade, Random Ftr"),
      new BaseUnit("Hero Yramrag, The Warlock", 1, 1, 8, 5, 10, 5, +0, "Cast 15, Missile Imm, Random Mage, Chaos Lightning"),
      new BaseUnit("Hero Mystic X, The Unknown", 1, 5, 5, 4, 10, 8, +0, "Cast 5, 5 Random Any, Chaos Firebolt"),
      new BaseUnit("Hero Aerie, The Illusionist", 1, 1, 5, 4, 6, 5, +0, "Illusion, Cast 10, Missile Imm, 2 Random Mage, Sorcery Illusion"),
      new BaseUnit("Hero Deth Stryke, The Swordsman", 1, 6, 0, 5, 6, 10, +0, "Arms, Const, Might, Lead, Legend, Random Ftr"),
      new BaseUnit("Hero Elana, The Priestess", 1, 2, 8, 5, 6, 5, +0, "Heal, Purify, Cast 12, Pray x, Charmed, Noble, Arcane, Nature Priest"),
      new BaseUnit("Hero Roland, The Paladin", 1, 9, 0, 5, 6, 8, +0, "Magic Imm, AP, First Strike, Legend, Healer, Pray, Might x, Random Ftr"),
      new BaseUnit("Hero Mortu, The Black Knight", 1, 9, 0, 5, 6, 10, +0, "Magic Imm, AP, First Strike, Legend, Might, Const, Blade, Random Ftr"),
      new BaseUnit("Hero Alorra, The Elven Archer", 1, 5, 8, 6, 6, 6, +0, "Arrows 8, Forest, Blade, 3 Random Any"),
      new BaseUnit("Hero Sir Harold, The Knight", 1, 8, 0, 5, 6, 9, +0, "Lead x, Legend x, Const, Noble, Random Ftr"),
      new BaseUnit("Hero Ravashack, The Necromancer", 1, 1, 7, 5, 6, 5, +0, "Arcane, Cast 12, Life Steal, Missile Imm, 2 Random Mage, Chaos Deathbolt"),
      new BaseUnit("Hero Warrax, The Chaos Warrior", 1, 8, 8, 5, 9, 8, +0, "AP, Cast 10, Arcane, Const, 3 Random Any, Chaos Lightning"),
      new BaseUnit("Hero Torin, The Chosen", 1, 12, 0, 8, 12, 12, +0, "Cast 15, Magic Imm, Missile Imm, Pray, Might x, Const, Lead x, 2 Random Any")
   );

   // List of item powers, which are handled
   this.g_items = new Object();
   g_items["Sword"]           = 0;     // Melee only
   g_items["Mace"]            = 0;     // Melee only
   g_items["Axe"]             = 0;     // Melee + Thrown
   g_items["Bow"]             = 0;     // Ranged only
   g_items["Staff"]           = 0;     // Melee + Ranged
   g_items["Wand"]            = 0;     // Melee + Ranged
   g_items["Shield"]          = 0;     // Large Shield (Df_Ra +2)
   g_items["Chain Mail"]      = 0;     // Df +1
   g_items["Plate Mail"]      = 0;     // Df +2
   g_items["Jewelry"]         = 0;     // All

   g_items["Chaos"]           = 0.5;   // Half damage
   g_items["Death"]           = -3;    // Save modifier
   g_items["Destruction"]     = -0;    // Save modifier
   g_items["Flaming"]         = +3;    // Melee bonus
   g_items["Holy Avenger"]    = "-4/-9/+3";    // Save modifier (Dispel Evil -4, or -9 for undead), Bless +3
   g_items["Lightning"]       = 0;
   g_items["Phantasmal"]      = 0;
   g_items["Power Drain"]     = 0;
   g_items["Stoning"]         = -1;    // Save modifier
   g_items["Vampiric"]        = -0;    // Save modifier (actually gaze-modifier of the unit)

      // List of spells, which are handled
   this.g_spells = new Array(
      "Berserk",
      "Black Channels",
      "Black Prayer",
      "Black Sleep",
      "Bless",
      "Blur",
      "Chaos Channel",
      "Chaos Surge",
      "Charm of Life",
      "Cloak of Fear",
      "Darkness",
      "Eldritch Weapon",
      "Elemental Armor",
      "Flame Blade",
      "Flight",
      "Giant Strength",
      "Guardian Wind",
      "Haste",
      "High Prayer",
      "Holy Armor",
      "Holy Weapon",
      "Immolation",
      "Invisibility",
      "Invulnerability",
      "Iron Skin",
      "Lion Heart",
      "Magic Immunity",
      "Metal Fires",
      "Prayer",
      "Regeneration",
      "Resist Elements",
      "Resist Magic",
      "Righteousness",
      "Shatter",
      "Stone Skin",
      "Terror",
      "True Light",
      "True Sight",
      "Vertigo",
      "Warp Creature",
      "Warp Reality",
      "Warp Wood",
      "Weakness",
      "Web",
      "Wrack",
      "Wraith Form"
   );


   this.g_level_normal = new Array(
      "",
      "1 Green",
      "2 Regular",
      "3 Veteran",
      "4 Elite",
      "5 Ultra-Elite",
      "6 Champion"
   );


   this.g_level_fantastic = new Array(
      "",
      "Normal",
      "Node"
   );


   this.g_level_hero = new Array(
      "",
      "1 Hero",
      "2 Myrmidon",
      "3 Captain",
      "4 Commander",
      "5 Champion",
      "6 Lord",
      "7 Grand Lord",
      "8 Super Hero",
      "9 Demi-God"
   );


   this.g_abbrev = new Object();
   g_abbrev["Agl"] = "Agility";
   g_abbrev["Arcane"] = "Arcane Power";
   g_abbrev["AP"] = "Armor Piercing";
   g_abbrev["Arms"] = "Armsmaster";
   g_abbrev["Blade"] = "Blademaster";
   g_abbrev["Const"] = "Constitution";
   g_abbrev["Forest"] = "Forester";
   g_abbrev["Heal"] = "Healer";
   g_abbrev["Lead"] = "Leadership";
   g_abbrev["Legend"] = "Legendary";
   g_abbrev["Mount"] = "Mountaineer";
   g_abbrev["Pathf"] = "Pathfinding";
   g_abbrev["Pray"] = "Prayermaster";
   g_abbrev["Cast"] = "Caster";

   this.g_ability = new Object();
   g_ability["Agility"] = 0;
   g_ability["Agility x"] = 0;
   g_ability["Arcane Power"] = 0;
   g_ability["Arcane Power x"] = 0;
   g_ability["Armor Piercing"] = 0;
   g_ability["Armsmaster"] = 0;
   g_ability["Armsmaster x"] = 0;
   g_ability["Arrows"] = "X";
   g_ability["Blademaster"] = 0;
   g_ability["Blademaster x"] = 0;
   g_ability["Bullets"] = "X";
   g_ability["Caster"] = "X";
   g_ability["Cause Fear Spell"] = 0;
   g_ability["Charmed"] = 0;
   g_ability["Chaos Deathbolt"] = 0;
   g_ability["Chaos Drow"] = 0;
   g_ability["Chaos Firebolt"] = 0;
   g_ability["Chaos Lightning"] = 0;
   g_ability["Cold Imm"] = 0;
   g_ability["Combat only"] = 0;
   g_ability["Constitution"] = 0;
   g_ability["Constitution x"] = 0;
   g_ability["Construction"] = 0;
   g_ability["Create Outpost"] = 0;
   g_ability["Create Undead"] = 0;
   g_ability["Death Gaze"] = "X";
   g_ability["Death Imm"] = 0;
   g_ability["Dispel Evil"] = 0;
   g_ability["Doom Gaze"] = "X";
   g_ability["Doombolt Spell"] = 0;
   g_ability["Endurance"] = 0;
   g_ability["Fire Ball Spell"] = 0;
   g_ability["Fire Breath"] = "X";
   g_ability["Fire Imm"] = 0;
   g_ability["First Strike"] = 0;
   g_ability["Flying"] = 0;
   g_ability["Forester"] = 0;
   g_ability["Heads"] = "X";
   g_ability["Healer"] = 0;
   g_ability["Healing Spell"] = 0;
   g_ability["Holy Bonus"] = "X";
   g_ability["Illusion"] = 0;
   g_ability["Illusion Imm"] = 0;
   g_ability["Immolation"] = 0;
   g_ability["Invisibility"] = 0;
   g_ability["Large Shield"] = 0;
   g_ability["Leadership"] = 0;
   g_ability["Leadership x"] = 0;
   g_ability["Legendary"] = 0;
   g_ability["Legendary x"] = 0;
   g_ability["Life Steal"] = 0;
   g_ability["Lightning"] = "X";
   g_ability["Lightning Imm"] = 0;  // Note: does not exist
   g_ability["Long Range"] = 0;
   g_ability["Lucky"] = 0;
   g_ability["Magic Imm"] = 0;
   g_ability["Magic Weapon"] = 0;
   g_ability["Meld With Node"] = 0;
   g_ability["Merging"] = 0;
   g_ability["Might"] = 0;
   g_ability["Might x"] = 0;
   g_ability["Missile Imm"] = 0;
   g_ability["Mountaineer"] = 0;
   g_ability["Nature Green"] = 0;
   g_ability["Nature Icebolt"] = 0;
   g_ability["Nature Priest"] = 0;
   g_ability["Nature Shimmer"] = 0;
   g_ability["Negate First Strike"] = 0;
   g_ability["Noble"] = 0;
   g_ability["Non Corporeal"] = 0;
   g_ability["Pathfinding"] = 0;
   g_ability["Plane Shift"] = 0;
   g_ability["Poison Imm"] = 0;
   g_ability["Poison"] = "X";
   g_ability["Prayermaster"] = 0;
   g_ability["Prayermaster x"] = 0;
   g_ability["Protects node"] = 0;
   g_ability["Purify"] = 0;
   g_ability["Random Any"] = 0;
   g_ability["Random Ftr"] = 0;
   g_ability["Random Mage"] = 0;
   g_ability["Regeneration"] = 0;
   g_ability["Resistance to All"] = "X";
   g_ability["Rocks"] = "X";
   g_ability["Sage"] = 0;
   g_ability["Sage x"] = 0;
   g_ability["Sailing"] = 0;
   g_ability["Scout"] = "X";
   g_ability["Sorcery Illusion"] = 0;
   g_ability["Spell"] = "X";
   g_ability["Stoning Gaze"] = "X";
   g_ability["Stoning Imm"] = 0;
   g_ability["Stoning Touch"] = "X";
   g_ability["Summon Demons"] = "X";
   g_ability["Swim"] = 0;
   g_ability["Teleporting"] = 0;
   g_ability["Thrown"] = "X";
   g_ability["Undead"] = 0;
   g_ability["Wall Crusher"] = 0;
   g_ability["Weapon Imm"] = 0;
   g_ability["Web"] = 0;
   g_ability["Web Spell"] = 0;
   g_ability["Wind Walking"] = 0;

   // Status
   this.g_attacker = null;          // The currently selected attacker
   this.g_defender = null;          // The currently selected defender
   this.g_shoot_range = 6;          // The currently active shooting range
   this.g_output = "";              // The current output

   }
}


// Check if a given ability exists, i.e., there are no spelling errors (debug only)
MoM_global.prototype.ability_exists = function(ability)
{
   if (this.g_ability[ability] != null || this.g_items[ability] != null) 
      return true;
   // Strip "-x" if present
//   if (ability.length >= 2 && ability.substr(ability.length - 2) == "-x")
//      if (this.g_ability[ability.substr(0, ability.length - 2)] != null)
//         return true;
   return false;
}