/*jslint browser: true, devel: true, plusplus: true, white: true, indent: 2 */
/*global $ */
/*
Data used on loot statistics scripts:
  MediaWiki:LootStatistics.js
  MediaWiki:LootStatistics-Checker.js
  MediaWiki:LootPercentages.js

Creatures should only appear once per version number
  If a creature is repeated inside an object, only the bottom one can be seen by the browser.
  If a creature appears on both 'changed' and 'new' objects, the cleanup function will make it so only the one with the highest version is kept.
Creature names as they appear on server log but using the TibiaWiki page capitalisation e.g.: 'Owin': '10.8'
Creatures that don't have a "(Creature)" page exception can be added for completeness e.g.: 'Feroxa (Gloom Wolf)': '10.8'
Pages with different name than the server log like "Owin" with page "Owin (Creature)" are to be set on the loot statistics scripts on the variable: lootparser_creature_special_names
*/
window.loot_parser_data = {
  current_tibia_version: '8.6',
  versions: {
    '8.6': {
      'changed': {
// Changes made on June 01, 2021
'Brachiodemon': '12.66.10866',
'Infernal Demon': '12.66.10866',
'Infernal Phantom': '12.66.10866',
'Bony Sea Devil': '12.66.10866',
'Turbulent Elemental': '12.66.10866',
'Capricious Phantom': '12.66.10866',
'Hazardous Phantom': '12.66.10866',
'Many Faces': '12.66.10866',
'Druid\'s Apparition': '12.66.10866',
'Knight\'s Apparition': '12.66.10866',
'Paladin\'s Apparition': '12.66.10866',
'Sorcerer\'s Apparition': '12.66.10866',
'Distorted Phantom': '12.66.10866',
'Cloak of Terror': '12.66.10866',
'Courage Leech': '12.66.10866',
'Vibrant Phantom': '12.66.10866',
'Rotten Golem': '12.66.10866',
'Branchy Crawler': '12.66.10866',
'Mould Phantom': '12.66.10866',
// Changes made on April 15, 2021 - documented in [[Updates/12.65.10733 (2)]]
'Cobra Vizier': '12.65.10733',
'Cobra Assassin': '12.65.10733',
'Cobra Scout': '12.65.10733',
//'Brachiodemon': '12.65.10733',
//'Infernal Demon': '12.65.10733',
//'Infernal Phantom': '12.65.10733',
//'Bony Sea Devil': '12.65.10733',
//'Turbulent Elemental': '12.65.10733',
//'Capricious Phantom': '12.65.10733',
//'Many Faces': '12.65.10733',
//'Druid\'s Apparition': '12.65.10733',
//'Knight\'s Apparition': '12.65.10733',
//'Paladin\'s Apparition': '12.65.10733',
//'Sorcerer\'s Apparition': '12.65.10733',
//'Distorted Phantom': '12.65.10733',
// Changes made on December 01, 2020
//'Brachiodemon': '12.60.10468',
//'Infernal Demon': '12.60.10468',
//'Infernal Phantom': '12.60.10468',
//'Cloak of Terror': '12.60.10468',
//'Courage Leech': '12.60.10468',
//'Vibrant Phantom': '12.60.10468',
// Changes made on September 01, 2020
//'Rotten Golem': '12.50.10135',
//'Branchy Crawler': '12.50.10135',
//'Mould Phantom': '12.50.10135',
// Changes made on July 28, 2020
'Ancient Lion Knight': '12.10.10043', //Now uses RC instead of regular
//'Cobra Assassin': '12.40.10043',
//'Cobra Scout': '12.40.10043',
//'Cobra Vizier': '12.40.10043',
// Changes made on March 24, 2020
// Documented here: https://www.tibia.com/forum/?action=announcement&announcementid=98 (+ post #38897080)
'Cave Devourer': '12.31.9618',
'Tunnel Tyrant': '12.31.9618',
'Bellicose Orger': '12.31.9593',
// Changes made on March 06, 2020
'Hellflayer': '12.31.9580',
'Vexclaw': '12.31.9580',
'Juggernaut': '12.31.9580',
'Icecold Book': '12.31.9580',
'Squid Warden': '12.31.9580',
'Animated Feather': '12.31.9580',
'Black Sphinx Acolyte': '12.31.9580',
'Priestess of the Wild Sun': '12.31.9580',
'Burning Gladiator': '12.31.9580',
'Crypt Warden': '12.31.9580',
//'Cobra Assassin': '12.31.9580',
//'Cobra Scout': '12.31.9580',
// Changes made on February 04, 2020
'Plaguesmith': '12.31.9471',
'Grimeleech': '12.31.9471',
'Dark Torturer': '12.31.9471',
'Grim Reaper': '12.31.9471',
'Glooth Golem': '12.31.9471',
'Silencer': '12.31.9471',
'Crazed Winter Vanguard': '12.31.9471',
'Crazed Winter Rearguard': '12.31.9471',
'Crazed Summer Vanguard': '12.31.9471',
'Crazed Summer Rearguard': '12.31.9471',
// Changes made on January 28, 2020
// Version 12.31.9434.
//'Grimeleech': '12.31',
//'Hellflayer': '12.31',
//'Plaguesmith': '12.31',
//'Juggernaut': '12.31',
//'Vexclaw': '12.31',
'Fury': '12.31',
//'Dark Torturer': '12.31',
'Spectre': '12.31',
//'Glooth Golem': '12.31',
'Metal Gargoyle': '12.31',
'Rustheap Golem': '12.31',
'War Golem': '12.31',
'Devourer': '12.31',
'Glooth Anemone': '12.31',
'Spiky Carnivor': '12.31',
'Menacing Carnivor': '12.31',
'Lumbering Carnivor': '12.31',
'Hellhound': '12.31',
'Hellfire Fighter': '12.31',
'Nightmare': '12.31',
'Rage Squid': '12.31',
'Burning Book': '12.31',
'Guardian of Tales': '12.31',
//'Icecold Book': '12.31',
//'Squid Warden': '12.31',
//'Animated Feather': '12.31',
'Biting Book': '12.31',
'Energetic Book': '12.31',
'Energuardian of Tales': '12.31',
'Ink Blob': '12.31',
'Brain Squid': '12.31',
'Knowledge Elemental': '12.31',
'Cursed Book': '12.31',
'Hellspawn': '12.31',
'Dawnfire Asura': '12.31',
'Midnight Asura': '12.31',
'Destroyer': '12.31',
//'Grim Reaper': '12.31',
'Choking Fear': '12.31',
'Retching Horror': '12.31',
//'Silencer': '12.31',
'Frazzlemaw': '12.31',
'Guzzlemaw': '12.31',
'Deathling Scout': '12.31',
'Deathling Spellsinger': '12.31',
'Arachnophobica': '12.31',
'Gazer Spectre': '12.31',
'Burster Spectre': '12.31',
'Ripper Spectre': '12.31',
//'Crazed Winter Rearguard': '12.31',
//'Crazed Winter Vanguard': '12.31',
//'Crazed Summer Rearguard': '12.31',
//'Crazed Summer Vanguard': '12.31',
'Insane Siren': '12.31',
'Wiggler': '12.30.9391',
'Mutated Bat': '12.15.8659',
//'Hellspawn': '12.15.8659',
'Lost Soul': '12.15.8659',
'Young Sea Serpent': '12.15.8659',
//'Crazed Winter Vanguard': '12.03',
'The Percht Queen': '12.03',
'The Scourge of Oblivion': '12.00',
//'Guardian of Tales': '11.94',
//'Burning Book': '11.94',
//'Rage Squid': '11.94',
//'Icecold Book': '11.94',
//'Squid Warden': '11.94',
//'Animated Feather': '11.94',
'Animated Snowman': '12.02',
//'Cursed Book': '11.94',
//'Ink Blob': '11.94',
//'Brain Squid': '11.94',
//'Energetic Book': '11.94',
//'Knowledge Elemental': '11.94',
//'Biting Book': '11.94',
//'Deathling Scout': '11.83',
//'Deathling Spellsinger': '11.83',
'Falcon Knight': '11.83',
'Falcon Paladin': '11.83',
'True Dawnfire Asura': '11.83',
'True Frost Flower Asura': '11.83',
'True Midnight Asura': '11.83',
'Deepworm': '12.00',
'Diremaw': '12.00',
'Putrid Mummy': '11.50',
'Werebadger': '11.50',
'Werebear': '11.50',
'Wereboar': '11.50',
'Enfeebled Silencer': '11.41',
'High Voltage Elemental': '11.41',
'Instable Sparkion': '11.41',
'Massive Energy Elemental': '11.41',
'Sparkion': '11.41',
'Weakened Frazzlemaw': '11.41',
'Cyclops': '11.02',
'Ghoul': '11.02',
'Orc': '11.02',
'Orc Shaman': '11.02',
'Orc Spearman': '11.02',
'Orc Warrior': '11.02',
'Skeleton': '11.02',
'Troll': '11.02',
// Changes to Dawnport: no longer dropping creature products.
'Mountain Troll': '10.93',
'Troll-Trained Salamander': '10.93',
'Minotaur Bruiser': '10.93',
'Muglex Clan Footman': '10.93',
'Woodling': '10.93',
'Meadow Strider': '10.93',
'Dawnfly': '10.93',
'Scar Tribe Shaman': '10.93',
'Scar Tribe Warrior': '10.93',
'Brittle Skeleton': '10.93',
'Minotaur Poacher': '10.93',
'Dawn Scorpion': '10.93',
'Juvenile Cyclops': '10.93',
'Muglex Clan Assassin': '10.93',
'Muglex Clan Scavenger': '10.93',
'Minotaur Occultist': '10.93',
'Crazed Dwarf': '10.93',
'Lesser Fire Devil': '10.93',
'Troll Marauder': '10.93',
'Ancient Scarab': '10.8',
//'Choking Fear': '10.8',
'Corym Charlatan': '10.8',
'Corym Skirmisher': '10.8',
'Corym Vanguard': '10.8',
'Elder Bonelord': '10.8',
'Kongra': '10.8',
'Lizard Sentinel': '10.8',
'Massive Water Elemental': '10.8',
'Orc Berserker': '10.8',
//'Retching Horror': '10.8',
'Waspoid': '10.8',
'Water Elemental': '10.8',
'Werewolf': '10.8',
'Wild Warrior': '10.8',
//'Devourer': '10.7',
//'Glooth Anemone': '10.7',
//'Glooth Golem': '10.7',
//'Metal Gargoyle': '10.7',
//'Rustheap Golem': '10.7',
'Terofar': '10.5',
'Zavarash': '10.5',
'Chakoya Toolshaper': '10.37',
'Chakoya Tribewarden': '10.37',
'Chakoya Windcaller': '10.37',
'Demon': '10.37',
//'Hellhound': '10.37',
//'Juggernaut': '10.3',
'Demon Skeleton': '10.1',
'Lich': '10.1',
'Nightfiend': '10.1',
'Vampire': '10.1',
'Betrayed Wraith': '9.86',
'Blightwalker': '9.86',
'Crystal Spider': '9.86',
'Deathbine': '9.86',
'Gargoyle': '9.86',
'Hand of Cursed Fate': '9.86',
'Hide': '9.86',
'Ice Golem': '9.86',
//'Lost Soul': '9.86',
'Mammoth': '9.86',
'Phantasm': '9.86',
'Quara Constrictor Scout': '9.86',
'Quara Hydromancer Scout': '9.86',
'Quara Mantassin Scout': '9.86',
'Quara Pincher Scout': '9.86',
'Quara Predator Scout': '9.86',
'Stone Golem': '9.86',
'Terramite': '9.86',
'The Bloodtusk': '9.86',
'Thornback Tortoise': '9.86',
'Tortoise': '9.86',
'Swamp Troll': '9.8',
'Bug': '9.63',
'Poison Spider': '9.63',
'Rat': '9.63',
'Spider': '9.63',
'Young Troll': '9.63',
'Massive Fire Elemental': '9.6',
'Behemoth': '9.5',
//'Dark Torturer': '9.5',
'Defiler': '9.5',
'Draken Spellweaver': '9.5',
'Eternal Guardian': '9.5',
'Ethershreck': '9.5',
'Ghastly Dragon': '9.5',
'Giant Spider': '9.5',
'Gnarlhound': '9.5',
'Gorgo': '9.5',
'Hydra': '9.5',
'Kerberos': '9.5',
'Killer Caiman': '9.5',
'Lizard Zaogun': '9.5',
'Mutated Tiger': '9.5',
'Quara Constrictor': '9.5',
'Quara Hydromancer': '9.5',
'Quara Mantassin': '9.5',
'Quara Pincher': '9.5',
'Sea Serpent': '9.5',
'Stonecracker': '9.5',
'Undead Dragon': '9.5',
'Wailing Widow': '9.5',
'Wyvern': '9.5',
'Esmeralda': '9.2',
'Leviathan': '9.2',
'Shardhead': '9.2',
'The Many': '9.2',
'The Noxious Spawn': '9.2',
'The Old Widow': '9.2',
'The Snapper': '9.2',
'Thul': '9.2',
'Blazing Fire Elemental': '9.1',
'Blistering Fire Elemental': '9.1',
'Carrion Worm': '9.1',
'Draken Abomination': '9.1',
'Dwarf Guard': '9.1',
'Earth Elemental': '9.1',
'Fire Overlord': '9.1',
//'Hellfire Fighter': '9.1',
'Jagged Earth Elemental': '9.1',
'Muddy Earth Elemental': '9.1',
'Tarantula': '9.1',
'Witch': '9.1',
'Worker Golem': '9.1'
      },
      'new': {
'Anmothra': '12.50.10135',
'Irahsae': '12.50.10135',
'Teneshpar': '12.50.10135',
'Chikhaton': '12.50.10135',
'Phrodomo':  '12.50.10135',
//'Bellicose Orger': '12.20.9066',
'Cow': '12.20.9066',
'Fat Porker': '12.20.9066',
'Loricate Orger': '12.20.9066',
'Orger': '12.20.9066',
'Orger Treasure': '12.20.9066',
'Roast Pork': '12.20.9066',
'Spawn of the Schnitzel': '12.20.9066',
'Scarlett Etzel': '12.20',
'Urmahlullu the Weakened': '12.20',
'Lamassu': '12.20',
//'Burning Gladiator': '12.20',
//'Black Sphinx Acolyte': '12.20',
'Feral Sphinx': '12.20',
//'Crypt Warden': '12.20',
'Adult Goanna': '12.20',
'Cobra Vizier': '12.20',
//'Cobra Scout': '12.20',
//'Priestess of the Wild Sun': '12.20',
//'Cobra Assassin': '12.20',
'Sun-Marked Goanna': '12.20',
'Young Goanna': '12.20',
'Sphinx': '12.20',
'Manticore': '12.20',
'Ogre Ruffian': '12.20',
'Ogre Sage': '12.20',
'Ogre Rowdy': '12.20',
'Earworm': '12.20',
'Gryphon': '12.20',
'Soulless Minion': '12.20',
'Cart Packed with Gold': '12.20',
//'Arachnophobica': '12.00',
//'Burster Spectre': '12.00',
//'Crazed Summer Rearguard': '12.00',
//'Crazed Summer Vanguard': '12.00',
//'Crazed Winter Rearguard': '12.00',
//'Crazed Winter Vanguard': '12.00',
//'Gazer Spectre': '12.00',
'Hibernal Moth': '12.00',
//'Insane Siren': '12.00',
'Lacewing Moth': '12.00',
'Lucifuga Aranea': '12.00',
//'Lumbering Carnivor': '12.00',
//'Menacing Carnivor': '12.00',
//'Ripper Spectre': '12.00',
'Soul-Broken Harbinger': '12.00',
//'Spiky Carnivor': '12.00',
'Thanatursus': '12.00',
'Alptramun': '12.00',
'Faceless Bane': '12.00',
'Izcandar Champion of Summer': '12.00',
'Izcandar Champion of Winter': '12.00',
'Izcandar the Banished': '12.00',
'Malofur Mangrinder': '12.00',
'Maxxenius': '12.00',
'Plagueroot': '12.00',
'The Nightmare Beast': '12.00',
'Cave Devourer': '12.00',
'Chasm Spawn': '12.00',
'Tunnel Tyrant': '12.00',
//'Dawnfire Asura': '10.8',
'Ekatrix': '10.8',
'Elder Forest Fury': '10.8',
'Feroxa': '10.8',
'Feroxa (Gloom Wolf)': '10.8',
'Feroxa (Killable Werewolf)': '10.8',
'Feroxa (Werewolf)': '10.8',
'Ghost Wolf': '10.8',
'Gloom Wolf': '10.8',
'Mahatheb': '10.8',
//'Midnight Asura': '10.8',
'Omnivora': '10.8',
'Oodok Witchmaster': '10.8',
'Owin': '10.8',
'Redeemed Soul': '10.8',
'Renegade Knight': '10.8',
'Tainted Soul': '10.8',
'The Flaming Orchid': '10.8',
'The Manhunter': '10.8',
'The Mean Masher': '10.8',
'Tzumrah the Dazzler': '10.8',
'Vicious Squire': '10.8',
'Vile Grandmaster': '10.8',
'Abyssal Calamary': '10.7',
'Control Tower': '10.7',
'Deep Terror': '10.7',
'Depowered Minotaur': '10.7',
'Empowered Glooth Horror': '10.7',
'Energy Pulse': '10.7',
'Feeble Glooth Horror': '10.7',
'Glooth Bandit': '10.7',
'Glooth Battery': '10.7',
'Glooth Bomb': '10.7',
'Glooth Brigand': '10.7',
'Glooth Horror': '10.7',
'Glooth Masher': '10.7',
'Glooth Powered Minotaur': '10.7',
'Glooth Slasher': '10.7',
'Glooth Trasher': '10.7',
'Glooth-Generator': '10.7',
'Minotaur Commander': '10.7',
'Minotaur Invader': '10.7',
'Minotaur Totem': '10.7',
'Minotaur Wallbreaker': '10.7',
'Moohtant Wallbreaker': '10.7',
'Noble Lion': '10.7',
'Professor Maxxen': '10.7',
'Renegade Quara Constrictor': '10.7',
'Renegade Quara Hydromancer': '10.7',
'Renegade Quara Mantassin': '10.7',
'Renegade Quara Pincher': '10.7',
'Renegade Quara Predator': '10.7',
'Roaring Lion': '10.7',
'Seacrest Serpent': '10.7',
'Strong Glooth Horror': '10.7',
'Tentacle of the Deep Terror': '10.7',
'Tremor Worm': '10.7',
'Unstable Tunnel': '10.7',
'Weakened Glooth Horror': '10.7',
'Brittle Skeleton': '10.55',
'Crazed Dwarf': '10.55',
'Dawn Scorpion': '10.55',
'Dawnfly': '10.55',
'Juvenile Cyclops': '10.55',
'Lesser Fire Devil': '10.55',
'Meadow Strider': '10.55',
'Minotaur Bruiser': '10.55',
'Minotaur Occultist': '10.55',
'Minotaur Poacher': '10.55',
'Mountain Troll': '10.55',
'Muglex Clan Assassin': '10.55',
'Muglex Clan Footman': '10.55',
'Muglex Clan Scavenger': '10.55',
'Sacred Snake': '10.55',
'Salamander Trainer': '10.55',
'Scar Tribe Shaman': '10.55',
'Scar Tribe Warrior': '10.55',
'Troll-Trained Salamander': '10.55',
'Woodling': '10.55',
'Blood Beast': '10.5',
'Bullwark': '10.5',
'Death Priest Shargon': '10.5',
'Execowtioner': '10.5',
'Glooth Blob': '10.5',
'Glooth Fairy': '10.5',
'Lisa': '10.5',
'Minotaur Amazon': '10.5',
'Minotaur Hunter': '10.5',
'Mooh\'Tah Warrior': '10.5',
'Moohtant': '10.5',
'Rot Elemental': '10.5',
'The Ravager': '10.5',
'Walker': '10.5',
'Worm Priestess': '10.5',
'Demon Outcast': '10.3',
'Feversleep': '10.3',
//'Frazzlemaw': '10.3',
'Gaz\'Haragoth': '10.3',
'Gaz\'haragoth': '10.3',
//'Guzzlemaw': '10.3',
'Horadron': '10.3',
'Mawhawk': '10.3',
'Omrafir': '10.3',
'Prince Drazzak': '10.3',
'Shiversleep': '10.3',
'Shock Head': '10.3',
'Sight of Surrender': '10.3',
//'Silencer': '10.3',
'Terrorsleep': '10.3',
'Enraged Soul': '10.2',
'Furyosa': '10.2',
'Hirintror': '10.2',
'Ocyakao': '10.2',
'Shlorg': '10.2',
'The Pale Count': '10.2',
'The Welter': '10.2',
'Tyrn': '10.2',
'Weakened Shlorg': '10.2',
'White Pale': '10.2',
'Zushuka': '10.2',
'Blood Hand': '10.1',
'Blood Priest': '10.1',
'Elder Wyrm': '10.1',
'Forest Fury': '10.1',
'Gravedigger': '10.1',
'Leaf Golem': '10.1',
'Rorc': '10.1',
'Shadow Pupil': '10.1',
'Tarnished Spirit': '10.1',
'Vampire Viscount': '10.1',
'Vicious Manbat': '10.1',
'White Shade': '10.1',
'Wilting Leaf Golem': '10.1',
'Adventurer': '9.8',
'Angry Adventurer': '9.8',
'Drillworm': '9.8',
'Emerald Damselfly': '9.8',
'Little Corym Charlatan': '9.8',
'Lost Basher': '9.8',
'Lost Husher': '9.8',
'Lost Thrower': '9.8',
'Marsh Stalker': '9.8',
'Party Skeleton': '9.8',
'Pigeon': '9.8',
'Salamander': '9.8',
'Swampling': '9.8',
'Water Buffalo': '9.8',
'Abyssador': '9.6',
'Armadile': '9.6',
'Bibby Bloodbath': '9.6',
'Cliff Strider': '9.6',
'Crystalcrusher': '9.6',
'Damaged Crystal Golem': '9.6',
'Deathstrike': '9.6',
'Dragonling': '9.6',
'Enraged Crystal Golem': '9.6',
'Enslaved Dwarf': '9.6',
'Gnomevil': '9.6',
'Hideous Fungus': '9.6',
'Humongous Fungus': '9.6',
'Humorless Fungus': '9.6',
'Ironblight': '9.6',
'Lava Golem': '9.6',
'Lost Berserker': '9.6',
'Magma Crawler': '9.6',
'Modified Gnarlhound': '9.6',
'Mushroom Sniffer': '9.6',
'Orewalker': '9.6',
'Stone Devourer': '9.6',
'Versperoth': '9.6',
'Vesperoth': '9.6',
'Vulcongra': '9.6',
'Weeper': '9.6',
//'Wiggler': '9.6',
'Bretzecutioner': '9.5',
'Bruise Payne': '9.5',
'Chopper': '9.5',
'Fazzrah': '9.5',
'Fleshslicer': '9.5',
'Hemming': '9.5',
'Maw': '9.5',
'Mindmasher': '9.5',
'Paiz the Pauperizer': '9.5',
'Rotspit': '9.5',
'Shadowstalker': '9.5',
'Tormentor': '9.5',
'Tromphonyte': '9.5',
'Zanakeph': '9.5',
'Calamary': '9.4',
'Crawler': '9.4',
'Deepling Guard': '9.4',
'Deepling Spellsinger': '9.4',
'Deepling Warrior': '9.4',
'Deepling Worker': '9.4',
'Fish': '9.4',
'Floor Blob': '9.4',
'Hive Pore': '9.4',
'Insectoid Worker': '9.4',
'Jaul': '9.4',
'Jellyfish': '9.4',
'Kollos': '9.4',
'Lady Bug': '9.4',
'Ladybug': '9.4',
'Lesser Swarmer': '9.4',
'Manta Ray': '9.4',
'Northern Pike': '9.4',
'Obujos': '9.4',
'Shark': '9.4',
'Slippery Northern Pike': '9.4',
'Spidris': '9.4',
'Spidris Elite': '9.4',
'Spitter': '9.4',
'Swarmer': '9.4',
'Swarmer Hatchling': '9.4',
'Tanjis': '9.4',
'Flameborn': '9.2',
'Fleshcrawler': '9.2',
'Ribstride': '9.2',
'Sulphur Scuttler': '9.2',
'The Bloodweb': '9.2',
'Askarak Demon': '9.1',
'Askarak Lord': '9.1',
'Askarak Prince': '9.1',
'Bog Frog': '9.1',
'Clay Guardian': '9.1',
'Crystal Wolf': '9.1',
'Death Priest': '9.1',
'Deepling Scout': '9.1',
'Desperate White Deer': '9.1',
'Diamond Servant': '9.1',
'Donkey': '9.1',
'Dromedary': '9.1',
'Elder Mummy': '9.1',
'Elf Overseer': '9.1',
'Energized Raging Mage': '9.1',
'Enraged White Deer': '9.1',
'Feverish Citizen': '9.1',
'Filth Toad': '9.1',
'Firestarter': '9.1',
'Ghoulish Hyaena': '9.1',
'Golden Servant': '9.1',
'Grave Guard': '9.1',
'Groam': '9.1',
'Honour Guard': '9.1',
'Horestis': '9.1',
'Horse': '9.1',
'Insectoid Scout': '9.1',
'Iron Servant': '9.1',
'Kraknaknork': '9.1',
'Kraknaknork\'s Demon': '9.1',
'Mad Mage': '9.1',
'Raging Mage': '9.1',
'Sacred Spider': '9.1',
'Sandstone Scorpion': '9.1',
'Shaburak Demon': '9.1',
'Shaburak Lord': '9.1',
'Shaburak Prince': '9.1',
'Slug': '9.1',
'Spider Queen': '9.1',
'Starving Wolf': '9.1',
'Thornfire Wolf': '9.1',
'Tomb Servant': '9.1',
'Weakened Demon': '9.1',
'White Deer': '9.1',
'Yielothax': '9.1'
      }
    }
  }
};
//cleanup function
(function () {
  'use strict';
  var
    lootparser_version = window.loot_parser_data.versions[window.loot_parser_data.current_tibia_version],
    cname,
    vchanged, vnew;
  for (cname in lootparser_version.changed) {
    if (lootparser_version.changed.hasOwnProperty(cname) && lootparser_version['new'].hasOwnProperty(cname)) {
      vchanged = parseFloat(lootparser_version.changed[cname]) || 0;
      vnew = parseFloat(lootparser_version['new'][cname]) || 0;
      if (vchanged >= vnew) {
        delete lootparser_version['new'][cname];
      }
      else {
        delete lootparser_version.changed[cname];
      }
    }
  }
}());
//combine changed and new
(function () {
  'use strict';
  var
    versions = window.loot_parser_data.versions,
    version,
    v;
  for (v in versions) { if (versions.hasOwnProperty(v)) {
    version = versions[v];
    version.combined = $.extend({}, version.changed || {}, version['new'] || {});
  } }
}());