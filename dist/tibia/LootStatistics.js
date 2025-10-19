
/*jslint browser: true, devel: true, plusplus: true, white: true, indent: 2 */
/*global $, wgUserName, wgUserGroups */
(function () {
  'use strict';
  var
  //list of tibia versions on the parser
  lootparser_tibia_versions = {'8.4': '8.4', '8.5': '8.5', '8.54': '8.54', '8.6': 'Current version'},
  //maximum version that will use the old template
  lootparser_template1_max_tibia_version = '8.54',
  //from MediaWiki:LootStatistics-Data.js
  current_tibia_version = window.loot_parser_data.current_tibia_version,
  //from MediaWiki:LootStatistics-Data.js
  lootparser_versions_ex = window.loot_parser_data.versions,
  //to generate list: "-", "player", {{#dpl:include={Infobox Creature}:name|format=,","&#44; ,|category=Creatures|category=Bosses|notcategory=Lists|namespace=|nottitlematch=Vampire Lords}}{{#dpl:include={Infobox Creature}:name|format=,","&#44; ,|category=Creatures|category=Arena Bosses|notcategory=Lists|namespace=|nottitlematch=Vampire Lords}}
  //remove the comma at the end, text inside parenthesis should be removed if it doesn't appear on the server log: e.g.: "Owin (Creature)" should be "Owin"
  not_player_names = [
    "-", "player", "A Shielded Astral Glyph", "Abyssador", "Aftershock", "Alptramun", "An Astral Glyph", "An Observer Eye", "Ancient Spawn of Morgathla", "Anmothra", "Annihilon", "Anomaly", "Apocalypse", "Apprentice Sheng", "Arachir the Ancient One", "Arkhothep", "Armenius", "Arthei", "Arthom the Hunter", "Ascending Ferumbras", "Azerus", "Bane Lord", "Barbaria", "Bazir", "Bibby Bloodbath", "Big Boss Trolliver", "Black Vixen", "Bloodback", "Bloom of Doom", "Bones", "Boogey", "Boreth", "Bretzecutioner", "Brokul", "Brother Chill", "Brother Freeze", "Bruise Payne", "Brutus Bloodbeard", "Bullwark", "Burster", "Captain Jones", "Cave Spider", "Charged Anomaly", "Charged Disruption", "Charging Outburst", "Chayenne", "Chikhaton", "Chizzoron the Distorter", "Chopper", "Cocoon", "Count Tofifti", "Countess Sorrow", "Craban", "Cublarc the Plunderer", "Damage Resonance", "Darkfang", "Deadeye Devious", "Death Priest Shargon", "Deathbine", "Deathstrike", "Deep Terror", "Demodras", "Denson Larika", "Destabilized Ferumbras", "Devovorga", "Dharalion", "Diblis the Fair", "Dirtbeard", "Diseased Bill", "Diseased Dan", "Diseased Fred", "Doctor Perhaps", "Dragonking Zyrtarch", "Dreadmaw", "Earth Overlord", "Ekatrix", "Elvira Hammerthrust", "Energized Raging Mage", "Energy Overlord", "Eradicator", "Esmeralda", "Essence of Malice", "Ethershreck", "Evil Mastermind", "Faceless Bane", "Fahim the Wise", "Fazzrah", "Fernfang", "Feroxa", "Ferumbras Essence", "Ferumbras Mortal Shell", "Ferumbras Soul Splinter", "Fire Overlord", "Flameborn", "Flamecaller Zazrak", "Fleabringer", "Fleshcrawler", "Fleshslicer", "Fluffy", "Football", "Foreman Kneebiter", "Foreshock", "Freegoiz", "Frenzy", "Fury of the Emperor", "Furyosa", "Gaz'haragoth", "Gelidrazah the Frozen", "General Murius", "Ghazbaran", "Ghulosh", "Ghulosh' Deathgaze", "Glitterscale", "Glooth Bomb", "Glooth Fairy", "Gnomevil", "Golgordan", "Gorgo", "Gorzindel", "Grand Canon Dominus", "Grand Chaplain Gaunder", "Grand Commander Soeren", "Grand Master Oberon", "Grand Mother Foulscale", "Grandfather Tridian", "Gravelord Oshuran", "Greed", "Grimrat", "Groam", "Grorlam", "Hairman the Huge", "Hatebreeder", "Hellgorak", "Hemming", "Heoni", "Hide", "High Templar Cobrass", "Hirintror", "Horadron", "Horestis", "Ice Overlord", "Infernatil", "Inky", "Irahsae", "Izcandar Champion of Summer", "Izcandar Champion of Winter", "Izcandar the Banished", "Jailer", "Jaul", "Jesse the Wicked", "Kalyassa", "Kerberos", "Koshei the Deathless", "Kraknaknork", "Kraknaknork's Demon", "Kroazur", "Lady Tenebris", "Lagatos", "Last Planegazer", "Latrivan", "Leiden", "Lersatio", "Lethal Lissy", "Leviathan", "Lisa", "Lizard Abomination", "Lizard Gate Guardian", "Lloyd", "Lokathmor", "Lord of the Elements", "Lyxoph", "Mad Technomancer", "Madareth", "Mahatheb", "Malofur Mangrinder", "Mamma Longlegs", "Marziel", "Massacre", "Maw", "Mawhawk", "Maxxenius", "Mazoran", "Mazzinor", "Melting Frozen Horror", "Mephiles", "Merikh the Slaughterer", "Mindmasher", "Minishabaal", "Monstor", "Mooh'Tah Master", "Moohtant Wallbreaker", "Morik the Gladiator", "Mornenion", "Mounted Thorn Knight", "Mr. Punish", "Munster", "Mutated Zalamon", "Necropharus", "Obujos", "Ocyakao", "Oodok Witchmaster", "Orshabaal", "Outburst", "Overcharged Disruption", "Owin", "Paiz the Pauperizer", "Penciljack", "Phrodomo", "Plagirath", "Plagueroot", "Preceptor Lazare", "Prince Drazzak", "Professor Maxxen", "Pythius the Rotten", "Ragiaz", "Raging Mage", "Ravennous Hunger", "Raxias", "Razzagorn", "Realityquake", "Reflection of Obujos", "Renegade Orc", "Ribstride", "Robby the Reckless", "Ron the Ripper", "Rotspit", "Rottie the Rotworm", "Rotworm Queen", "Rukor Zad", "Rupture", "Scorn of the Emperor", "Shadow of Boreth", "Shadow of Lersatio", "Shadow of Marziel", "Shadowpelt", "Shadowstalker", "Shard of Corruption", "Shardhead", "Sharpclaw", "Sharptooth", "Shlorg", "Shulgrax", "Sir Valorcrest", "Skyrr", "Smuggler Baron Silvertoe", "Snake God Essence", "Snake Thing", "Solid Frozen Horror", "Soul of Dragonking Zyrtarch", "Spite of the Emperor", "Splasher", "Stonecracker", "Sulphur Scuttler", "Supercharged Mazzinor", "Tanjis", "Tarbaz", "Tazhadur", "Teleskor", "Teneshpar", "Terofar", "The Abomination", "The Armored Voidborn", "The Astral Source", "The Baron from Below", "The Big Bad One", "The Blazing Rose", "The Blazing Time Guardian", "The Blightfather", "The Bloodtusk", "The Bloodweb", "The Book of Death", "The Collector", "The Corruptor of Souls", "The Count", "The Count of the Core", "The Destruction", "The Devourer of Secrets", "The Diamond Blossom", "The Distorted Astral Source", "The Duke of the Depths", "The Enraged Thorn Knight", "The Evil Eye", "The False God", "The Fettered Shatterer", "The Fire Empowered Duke", "The First Dragon", "The Flaming Orchid", "The Freezing Time Guardian", "The Frog Prince", "The Handmaiden", "The Horned Fox", "The Hunger", "The Hungry Baron from Below", "The Imperor", "The Keeper", "The Last Lore Keeper", "The Lily of Night", "The Manhunter", "The Many", "The Mean Masher", "The Nightmare Beast", "The Noxious Spawn", "The Old Whopper", "The Old Widow", "The Pale Count", "The Plasmother", "The Rage", "The Ravager", "The Remorseless Corruptor", "The Sandking", "The Scion of Havoc", "The Scourge of Oblivion", "The Shatterer", "The Shielded Thorn Knight", "The Sinister Hermit", "The Snapper", "The Souldespoiler", "The Source of Corruption", "The Spellstealer", "The Time Guardian", "The Unarmored Voidborn", "The Voice of Ruin", "The Weakened Count", "The Welter", "Tiquandas Revenge", "Tjured", "Tormentor", "Tromphonyte", "Tyrn", "Tzumrah the Dazzler", "Ungreez", "Ushuriel", "Verminor", "Versperoth", "Vulnerable Cocoon", "Warlord Ruzad", "Weakened Shlorg", "White Pale", "Willi Wasp", "World Devourer", "Wrath of the Emperor", "Xenia", "Yaga the Crone", "Yakchal", "Zamulosh", "Zanakeph", "Zarabustor", "Zarcorix of Yalahar", "Zavarash", "Zevelon Duskbringer", "Zomba", "Zoralurk", "Zorvorax", "Zugurosh", "Zulazza the Corruptor", "Zushuka", "Achad", "Avalanche", "Axeitus Headbanger", "Baron Brute", "Bloodpaw", "Bovinus", "Coldheart", "Colerian the Barbarian", "Cursed Gladiator", "Darakan the Executioner", "Deathbringer", "Doomhowl", "Drasilla", "Dreadwing", "Fallen Mooh'Tah Master Ghar", "Fatality", "Frostfur", "Gnorre Chyllson", "Grimgor Guteater", "Haunter", "Incineron", "Kreebosh the Exile", "Menace", "Norgle Glacierbeard", "Orcus the Cruel", "Rocko", "Rocky", "Slim", "Spirit of Earth", "Spirit of Fire", "Spirit of Water", "Svoren the Mad", "The Axeorcist", "The Dark Dancer", "The Dreadorian", "The Hag", "The Hairy One", "The Masked Marauder", "The Obliverator", "The Pit Lord", "Tirecz", "Tremorak", "Webster"
  ],
  //name of the page for creatures (when updating copy to MediaWiki:LootStatistics-Checker.js)
  lootparser_creature_special_names = {
    'Arkhothep': 'Arkhothep (Creature)',
    'Armenius': 'Armenius (Creature)',
    'Avalanche': 'Avalanche (Creature)',
    'Fish': 'Fish (Creature)',
    'Gamemaster': 'Gamemaster (Creature)',
    'Goshnar\'s Greed (Feeding)': 'Goshnar\'s Greed',
    'Hacker': 'Hacker (Creature)',
    'Lionet': 'Lionet (Creature)',
    'Mirade': 'Mirade (Creature)',
    'Mooh\'tah Warrior': 'Mooh\'Tah Warrior',
    'Nomad': 'Nomad (Basic)',
    'Northern Pike': 'Northern Pike (Creature)',
    'Owin': 'Owin (Creature)',
    'Pythius the Rotten': 'Pythius the Rotten (Creature)',
    'Sabretooth': 'Sabretooth (Creature)',
    'Thief': 'Thief (Creature)',
    'The Sinister Hermit': 'The Sinister Hermit (Blue)',
    'Yalahari': 'Yalahari (Creature)'
  },
  //exceptions for items that are dropped by specific creatures (when updating copy to MediaWiki:LootStatistics-Checker.js)
  creature_items_name_change = {
    'Acolyte of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (Second Verse)'},
    'Adept of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (Third Verse)'},
    'Ahau': {'Amber': 'Amber (Item)', 'Ritual Teeth': 'Ritual Tooth'},
    'Barbarian Brutetamer': {'Book': 'Book (Grey)'},
    'Blemished Spawn': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Blightwalker': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Blue Djinn': {'Book': 'Book (Blue)'},
    'Bony Sea Devil': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)', 'Rod': 'Rod (Creature Product)'},
    'Brachiodemon': {'Head': 'Head (Brachiodemon)'},
    'Bragrumol': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Brain Squid': {'Inkwell': 'Inkwell (Black)'},
    'Brain Head': {'Amber': 'Amber (Item)'},
    'Cave Chimera': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Chopper': {'Dung Ball': 'Dung Ball (Quest)'},
    'Cloak of Terror': {'Crown': 'Crown (Plant)'},
    'Cobra Vizier': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Control Tower': {'Crystal Pedestal': 'Crystal Pedestal (Red)'},
    'Converter': {'Darklight Core': 'Darklight Core (Object)', 'Darklight Matter': 'Darklight Matter (Object)'},
    'Crape Man': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Crazed Winter Rearguard': {'Ice Flower': 'Ice Flower (Item)'},
    'Crazed Winter Vanguard': {'Ice Flower': 'Ice Flower (Item)'},
    'Crusader': {'Cookbook': 'Cookbook (Creature Product)'},
    'Darklight Construct': {'Darklight Core': 'Darklight Core (Object)'},
    'Darklight Emitter': {'Darklight Core': 'Darklight Core (Object)'},
    'Darklight Matter': {'Darklight Core': 'Darklight Core (Object)', 'Darklight Matter': 'Darklight Matter (Object)'},
    'Darklight Striker': {'Darklight Core': 'Darklight Core (Object)'},
    'Darklight Source': {'Darklight Core': 'Darklight Core (Object)'},
    'Deepworm': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Demodras': {'Book': 'Book (Gemmed)'},
    'Dharalion': {'Parchment': 'Parchment (Rewritable)'},
    'Diamond Servant': {'Crystal Pedestal': 'Crystal Pedestal (Cyan)'},
    'Diamond Servant Replica': {'Crystal Pedestal': 'Crystal Pedestal (Cyan)'},
    'Diremaw': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Dragon Lord': {'Book': 'Book (Gemmed)'},
    'Emerald Tortoise': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Enlightened of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (Fourth Verse)'},
    'Falcon Knight': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Falcon Paladin': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Ferumbras Mortal Shell': {'Ferumbras\' Staff': 'Ferumbras\' Staff (Blunt)'},
    'Fleshslicer': {'Dung Ball': 'Dung Ball (Quest)'},
    'Flimsy Lost Soul': {'Lost Soul': 'Lost Soul (Item)'},
    'Foam Stalker': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Freakish Lost Soul': {'Lost Soul': 'Lost Soul (Item)'},
    'Frost Dragon': {'Book': 'Book (Gemmed)'},
    'Fury': {'Jalapeño Pepper': 'Jalapeno Pepper', 'Jalapeńo Pepper': 'Jalapeno Pepper', 'Jalape\uFFFDo Pepper': 'Jalapeno Pepper'},
    'Furyosa': {'Jalapeño Pepper': 'Jalapeno Pepper', 'Jalapeńo Pepper': 'Jalapeno Pepper', 'Jalape\uFFFDo Pepper': 'Jalapeno Pepper'},
    'Ghost': {'Book': 'Book (Orange)'},
    'Glooth Battery': {'Crystal Pedestal': 'Crystal Pedestal (Red)'},
    'Glooth Brigand': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Gore Horn': {'Gore Horn': 'Gore Horn (Item)'},
    'Green Djinn': {'Book': 'Book (Green)'},
    'Grynch Clan Goblin': {'Picture': 'Picture (Landscape)'},
    'Hand of Cursed Fate': {'Book': 'Book (Orange)'},
    'Headwalker': {'Book with An Hourglass': 'Book with an Hourglass'},
    'Hellflayer': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Hive Overseer': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Iks Ahpututu': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Iks Pututu': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Ink Blob': {'Inkwell': 'Inkwell (Black)', 'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Juggernaut': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Killer Caiman': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Kollos': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Last Lore Keeper': {'Key To Knowledge': 'Key to Knowledge'},
    'Lady Tenebris': {'Part of a Rune': 'Part of a Rune (Four)'},
    'Lloyd': {'Part of a Rune': 'Part of a Rune (Six)'},
    'Lumbering Carnivor': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Many Faces': {'Head': 'Head (Many Faces)'},
    'Maw': {'Dung Ball': 'Dung Ball (Quest)'},
    'Mean Lost Soul': {'Lost Soul': 'Lost Soul (Item)'},
    'Melting Frozen Horror': {'Part of a Rune': 'Part of a Rune (Five)'},
    'Memory of a Banshee': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Book': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Carnisylvan': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Dwarf': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Faun': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Frazzlemaw': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Fungus': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Golem': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Hero': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Hydra': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Lizard': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Mammoth': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Manticore': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Pirate': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Scarab': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Shaper': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Vampire': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Werelion': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Wolf': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of a Yalahari': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of an Amazon': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of an Elf': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of an Insectoid': {'Candy Floss': 'Candy Floss (Large)'},
    'Memory of an Ogre': {'Candy Floss': 'Candy Floss (Large)'},
    'Mindmasher': {'Dung Ball': 'Dung Ball (Quest)'},
    'Novice of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (First Verse)'},
    'Ogre Rowdy': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Ogre Savage': {'Jalapeño Pepper': 'Jalapeno Pepper', 'Jalapeńo Pepper': 'Jalapeno Pepper', 'Jalape\uFFFDo Pepper': 'Jalapeno Pepper'},
    'Orc Shaman': {'Book': 'Book (Grey)'},
    'Parder': {'Parder Teeth': 'Parder Tooth'},
    'Piñata Dragon': {'Costume Bag': 'Costume Bag (Retro)'},
    'Pirate Buccaneer': {'Treasure Map': 'Treasure Map (Pirate)'},
    'Pirate Cutthroat': {'Treasure Map': 'Treasure Map (Pirate)'},
    'Pirate Ghost': {'Parchment': 'Parchment (Rewritable)'},
    'Pirate Marauder': {'Treasure Map': 'Treasure Map (Pirate)'},
    'Poisonous Carnisylvan': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Priestess': {'Book': 'Book (Orange)'},
    'Prince Drazzak': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Rage Squid': {'Inkwell': 'Inkwell (Black)'},
    'Ratmiral Blackwhiskers': {'Amber': 'Amber (Item)'},
    'Ravenous Hunger': {'Blood of the Mountain': 'Blood of the Mountain (Item)'},
    'Renegade Quara Hydromancer': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Renegade Quara Pincher': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Retros Treasure': {'Watermelon Tourmaline': 'Watermelon Tourmaline (Slice)'},
    'Rootthing Amber Shaper': {'Amber': 'Amber (Item)'},
    'Rotten Golem': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Rotspit': {'Dung Ball': 'Dung Ball (Quest)'},
    'Seacrest Serpent': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Shadowpelt': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Shadowstalker': {'Dung Ball': 'Dung Ball (Quest)'},
    'Shark': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Soul of Dragonking Zyrtarch': {'Part of a Rune': 'Part of a Rune (Two)'},
    'Soul-Broken Harbinger': {'Ice Flower': 'Ice Flower (Item)'},
    'Sorcerer\'s Apparition': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Spidris': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Spidris Elite': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Srezz Yellow Eyes': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Sulphur Spouter': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Squid Warden': {'Inkwell': 'Inkwell (Black)'},
    'Tarnished Spirit': {'Book': 'Book (Orange)'},
    'Thaian': {'Amber': 'Amber (Item)'},
    'Thawing Dragon Lord': {'Ice Cream Cone': 'Ice Cream Cone (Blue-Barian)'},
    'The Baron from Below': {'Chitinous Mouth': 'Chitinous Mouth (Baron from Below)'},
    'The Blazing Time Guardian': {'Part of a Rune': 'Part of a Rune (Three)'},
    'The Dread Maiden': {'Amber': 'Amber (Item)', 'Dark Bell': 'Dark Bell (Silver)'},
    'The Count of the Core': {'Chitinous Mouth': 'Chitinous Mouth (Count of the Core)'},
    'The Enraged Thorn Knight': {'Part of a Rune': 'Part of a Rune (One)'},
    'The False God': {'Blood of the Mountain': 'Blood of the Mountain (Item)'},
    'The Fear Feaster': {'Amber': 'Amber (Item)'},
    'The Freezing Time Guardian': {'Part of a Rune': 'Part of a Rune (Three)'},
    'The Many': {'Egg of the Many': 'Egg of The Many'},
    'The Pale Worm': {'Amber': 'Amber (Item)'},
    'The Percht Queen': {'Icicle': 'Icicle (Percht)', 'Fly Agaric': 'Fly Agaric (Item)'},
    'The Rootkraken': {'Amber': 'Amber (Item)'},
    'The Sandking': {'Heart of the Mountain': 'Heart of the Mountain (Item)'},
    'The Scourge of Oblivion': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'The Time Guardian': {'Part of a Rune': 'Part of a Rune (Three)'},
    'The Unarmored Voidborn': {'Heart of the Mountain': 'Heart of the Mountain (Item)'},
    'The Unwelcome': {'Amber': 'Amber (Item)', 'Amber With A Bug': 'Amber With a Bug'},
    'Two-Headed Turtle': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Unexpected': {'Candy Floss': 'Candy Floss (Large)', 'Ice Cream Cone': 'Ice Cream Cone (Sprinkles)'},
    'Uninvited': {'Candy Floss': 'Candy Floss (Large)', 'Ice Cream Cone': 'Ice Cream Cone (Sprinkles)'},
    'Unsolicited': {'Candy Floss': 'Candy Floss (Large)', 'Ice Cream Cone': 'Ice Cream Cone (Sprinkles)'},
    'Usurper Archer': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Usurper Commander': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Usurper Warlock': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Green)'},
    'Unwanted': {'Candy Floss': 'Candy Floss (Large)', 'Ice Cream Cone': 'Ice Cream Cone (Sprinkles)'},
    'Vibrant Phantom': {'Giant Shimmering Pearl': 'Giant Shimmering Pearl (Brown)'},
    'Walking Pillar': {'Darklight Core': 'Darklight Core (Object)'},
    'Wandering Pillar': {'Darklight Core': 'Darklight Core (Object)'},
    'War Golem': {'Crystal Pedestal': 'Crystal Pedestal (Red)'},
    'Worker Golem': {'Crystal Pedestal': 'Crystal Pedestal (Cyan)'},
    'White Pale': {'Horn': 'Horn (Ring)'}
  },

  //singular exceptions
  lootparser_s_words = {
    '*Knife': 'Knives',
    '*Piece of *': 'Pieces of ',
    '*Sandwich': 'Sandwiches',
    'Bunch of *': 'Bunches of ',
    'Haunch of *': 'Haunches of ',
    'Flask of *': 'Flasks of ',
    'Vein of *': 'Veins of ',
    'Bowl of *': 'Bowls of ',
    '*Hoof' : 'Hooves'
  },
  
  //plural exceptions
  lootparser_p_words = {
    '*Pieces of *': 'Piece of ',
    'Bowls of *': 'Bowl of ',
    'Bunches of *': 'Bunch of ',
    'Cookies': 'Cookie',
    'Flasks of *': 'Flask of ',
    'Clusters of *': 'Cluster of ',
    'Gooey Masses' : 'Gooey Mass',
    'Haunches of *': 'Haunch of ',
    'Huge Chunks *': 'Huge Chunk ',
    'Mushroom Pies' : 'Mushroom Pie',
    'Essences of *': 'Essence of ',
    'Veins of *': 'Vein of ',
    'Bars of *': 'Bar of '
  },

  //exceptions for plural endings (after removing the last 's')
  lootparser_p_ends = {
    'che': 'ch', 'she': 'sh', 'ie': 'y', 've': 'fe', 'oe': 'o', 'ze': 'z'
  },
  
  //exceptions for items that should not be changed to singular
  lootparser_p_items = [
  	'Corrupt Naga Scales', 'Rogue Naga Scales', 'Naga Archer Scales', 'Naga Warrior Scales',
  	'Ripptor Scales', 'Stalking Seeds', 'Fairy Wings', 'Prehemoth Horns', 'Moonlight Crystals',
  	'Grapes', 'Stampor Talons', 'Deepling Warts', 'Deepworm Spike Roots', 'Diremaw Legs',
  	'Half-Digested Stones', 'Terramite Eggs', 'Crab Man Claws', 'Seeds'
  ],
  
  //exceptions for items that don't match the auto to_singular rules
  lootparser_s_items = {
  	'Boar Man Hooves': 'Boar Man Hoof' //doesn't match the ve / fe ending
  },

  //skip/rename creatures if they drop any of the loot in the list
  lootparser_creature_by_loot = {
    'a demon': [
      {
        loot_match: ['Nothing', 'Bone', 'Leather Armor', 'Mouldy Cheese', 'Small Stone'],
        new_name: 'a demon (goblin)',
        rename: true
      }
    ]
  },

  //exceptions for template names
  lootparser_t_creature_special_names = {
    //'Demon (Goblin)': 'Demon (Goblin)'
  },
 //list of all archfoe bosses to be updated so they can show gems in their statistics
 archfoe_bosses = {
	'the winter bloom': '',
	'utua stone sting': '',
	'yirkas blue scales': '',
	'ancient spawn of morgathla': '',
	'anomaly': '',
	'bibby bloodbath': '',
	'essence of malice': '',
	'faceless bane': '',
	'amenef the burning': '',
	'timira the many-headed': '',
	'gelidrazah the frozen': '',
	'ghulosh': '',
	'gorzindel': '',
	'goshnar\'s cruelty': '',
	'goshnar\'s greed': '',
	'goshnar\'s hatred': '',
	'goshnar\'s malice': '',
	'goshnar\'s spite': '',
	'grand master oberon': '',
	'irgix the flimsy': '',
	'kalyassa': '',
	'king zelos': '',
	'lady tenebris': '',
	'lloyd': '',
	'lokathmor': '',
	'lord azaram': '',
	'lord of the elements': '',
	'lord retro': '',
	'mazoran': '',
	'mazzinor': '',
	'neferi the spy': '',
	'outburst': '',
	'plagirath': '',
	'ragiaz': '',
	'ratmiral blackwhiskers': '',
	'ravenous hunger': '',
	'razzagorn': '',
	'realityquake': '',
	'rupture': '',
	'shulgrax': '',
	'sir baeloc': '',
	'sir nictros': '',
	'sister hetai': '',
	'soul of dragonking zyrtarch': '',
	'tarbaz': '',
	'tazhadur': '',
	'tentugly\'s head': '',
	'thaian': '',
	'the blazing rose': '',
	'the brainstealer': '',
	'the dread maiden': '',
	'the enraged thorn knight': '',
	'the false god': '',
	'the fear feaster': '',
	'the lily of night': '',
	'the mega magmaoid': '',
	'the nightmare beast': '',
	'the pale worm': '',
	'the sandking': '',
	'the scourge of oblivion': '',
	'the souldespoiler': '',
	'the source of corruption': '',
	'the time guardian': '',
	'the unarmored voidborn': '',
	'the unwelcome': '',
	'unaz the mean': '',
	'vok the freakish': '',
	'zamulosh': '',
	'zorvorax': '',
	'owin (creature)': '',
	'raging mage': '',
	'melting frozen horror': '',
	'the diamond blossom': '',
	'ahau': '',
	'the monster': '',
	'ayana the crimson curse': '',
	'murcion': '',
	'chagorz': '',
	'vemiath': '',
	'ichgahal': '',
	'urmahlullu the weakened': '',
	'tamru the black': '',
	'brokul': '',
	'despor': '',
	'dragon hoard': '',	
	'mitmah vanguard': ''
	},
  //item: {creatures that drop them normally as keys}
  //all here needs to be lower case
  event_items = {
    '...': {}, //this is not event item and should not have any creature added to it
    'bunch of winterberries': {},
    'coloured egg': {},
    'envelope from the wizards': {},
    'fireworks rocket': {},
    'party hat': {},
    'party trumpet': {},
    'party lampions': {},
    'party wall tinsel': {},
    'party wall snake': {},
    'very old piece of paper': {},
    'snowball': {'yeti': '', 'grynch clan goblin': '', 'animated snowman': ''},
    'silver raid token': {},
    'sliver': {},
    'old rag': {},
    'orc tusk': {},
	'greater gem' : archfoe_bosses,
	'greater guardian gem' : archfoe_bosses,
	'greater marksman gem' : archfoe_bosses,
	'greater mystic gem' : archfoe_bosses,
	'greater sage gem' : archfoe_bosses,
	'guardian gem' : archfoe_bosses,
	'lesser gem' : archfoe_bosses,
	'lesser guardian gem' : archfoe_bosses,
	'lesser marksman gem' : archfoe_bosses,
	'lesser mystic gem' : archfoe_bosses,
	'lesser sage gem' : archfoe_bosses,
	'marksman gem' : archfoe_bosses,
	'mystic gem' : archfoe_bosses,
	'regular gem' : archfoe_bosses,
	'sage gem' : archfoe_bosses
  },

  //loot contents rows
  loot_contents_rows = 10,

  not_player_nameso = {},

  //code used for Loot_Statistics
  lootparser_use_version,
  lootparser_use_loot2,
  ajax_load_bar = new Image(),
  uploading_all = 0, uploading_all_result = [], $uploading_all_to_do, uploading_all_blink = 0, uploading_all_blinks = true,
  ucwords = function (str) {
    /*jslint regexp: true */
    str = String(str).replace(/\((.)/g, function ($1) { return $1.toUpperCase(); }).replace(/^(.)|\s(.)|-(.)/g, function ($1) { return $1.toUpperCase(); });
    //str = String(str).replace(/\b(.)/g, function ($1) { return $1.toUpperCase(); });
    /*jslint regexp: false */
    return str.replace(/( To The | In The | In A | Of The | Of A | Of An | On A | Of | The | For A | From The | From | And | With A | With )/, function ($1) { return $1.toLowerCase(); });
  },
  lootparser_numcs = function (n) { n = String(n); while ((/\d{4}/).test(n)) { n = n.replace(/(\d{3},|\d{3}$)/, ',$1'); } return n; },
  stripslashes = function (str) {
    /*jslint regexp: true, unparam: true */
    var r = String(str).replace(/\\(.?)/g, function (s, n1) {
      switch (n1) {
        case '\\': return '\\';
        case '': return '';
        default: return n1;
      }
    });
    /*jslint regexp: false, unparam: false */
    return r;
  },
  html_e = function (t) {
    var cmap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
    return String(t).replace(/[&<>"']/g, function (m) { return cmap[m]; });
  },
  crc32 = function (g) {
    /*jslint bitwise: true */
    var a, d = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D", c, e = 0, b = 0, h = 0; e = e ^ (-1); for (c = 0, a = g.length; c < a; c++) { h = (e ^ g[c]) & 255; b = "0x" + d.substr(h * 9, 8); e = (e >>> 8) ^ b; } e = e ^ (-1);
    /*jslint bitwise: false */
    return e < 0 ? 4294967296 + e : e;
  },
  sort_functions = {
    creature: function (a, b) {
      var ta, tb;
      if (a === b) { return 0; }
      //bosses last
      ta = /^a[n]? /.test(a); tb = /^a[n]? /.test(b);
      if (!ta || !tb) {
        if (ta || tb) {
          if (!ta) { return 1; }
          if (!tb) { return -1; }
        }
      }
      //text without article
      if (/^a[n]? /.test(a)) { a = a.substr(a.indexOf(' ') + 1); }
      if (/^a[n]? /.test(b)) { b = b.substr(b.indexOf(' ') + 1); }
      //compare
      if (a > b) { return 1; }
      return -1;
    },
    creature2: function (a, b) {
      var ta, tb;
      if (a === b) { return 0; }
      //bosses last
      ta = /^a[n]? /.test(a); tb = /^a[n]? /.test(b);
      if (!ta || !tb) {
        if (ta || tb) {
          if (!ta) { return -1; }
          if (!tb) { return 1; }
        }
      }
      //text without article
      if (/^a[n]? /.test(a)) { a = a.substr(a.indexOf(' ') + 1); }
      if (/^a[n]? /.test(b)) { b = b.substr(b.indexOf(' ') + 1); }
      //compare
      if (a > b) { return 1; }
      return -1;
    },
    numeric: function (a, b) {
      a = parseFloat(String(a).replace('|', '')) || 0;
      b = parseFloat(String(b).replace('|', '')) || 0;
      return (a - b);
    },
    item_w_article: function (a, b) {
      var na, nb;
      if (a === b) { return 0; }
      //nothing
      if (a === 'Nothing') { return -1; }
      if (b === 'Nothing') { return 1; }
      //numeric
      na = /^\d/.test(a); nb = /^\d/.test(b);
      if (na || nb) {
        if (na && nb) {
          na = parseFloat(a) || 0; nb = parseFloat(b) || 0;
          if (na !== nb) { return (a - b); }
        }
        else {
          if (na) { return 1; }
          if (nb) { return -1; }
        }
      }
      //text without article/number
      if (/^(a[n]?|\d+) /i.test(a)) { a = a.substr(a.indexOf(' ') + 1); }
      if (/^(a[n]?|\d+) /i.test(b)) { b = b.substr(b.indexOf(' ') + 1); }
      if (a > b) { return 1; }
      return -1;
    },
    text: function (a, b) {
      if (a === b) { return 0; }
      if (a > b) { return 1; }
      return -1;
    }
  },
  obj_list_sort = function (obj, sort, by_key, reverse, sub_key, wiki) {
    var k, list = [], sorter;
    if (sort === undefined) { sort = 'text'; }
    if (by_key === undefined) { by_key = false; }
    if (reverse === undefined) { reverse = false; }
    if (sub_key === undefined) { sub_key = ''; }
    if (wiki === undefined) { wiki = false; }
    sorter = sort_functions[sort] || sort_functions.text;
    //list of keys or values
    for (k in obj) { if (obj.hasOwnProperty(k)) { list.push(k); } }
    //sort
    list.sort(function (a, b) {
      var ca = a, cb = b;
      //Empty first for wiki
      if (wiki) {
        if (ca === 'Empty') { return 1; }
        if (cb === 'Empty') { return -1; }
      }
      //by value
      if (!by_key) { ca = obj[ca]; cb = obj[cb]; }
      //subkey value
      if (sub_key !== '') { ca = ca[sub_key]; cb = cb[sub_key]; }
      //sort same values by name
      if ((!by_key || sub_key !== '') && ca === cb) {
        return (sort_functions.text(a, b) * (reverse ? -1 : 1));
      }
      return sorter(ca, cb);
    });
    if (reverse) { list.reverse(); }
    return list;
  },
  lootparser_to_singular = function (t) {
  	if (lootparser_p_items.includes(t)) {
  		//Since SU 22 all items are appearing with amounts before their names
  		//Some of them have names in the plural even as single units and should not be changed to singular
  		return t;
  	} else if (lootparser_s_items.hasOwnProperty(t)) {
  		//to singular exceptions
  		return lootparser_s_items[t];
  	}
    var x, lastletter;
    for (x in lootparser_p_words) { if (lootparser_p_words.hasOwnProperty(x)) {
      if ((new RegExp('^' + x.replace(/\*/g, '.*?') + '$')).test(t)) { return t.replace(x.replace(/\*/g, ''), lootparser_p_words[x]); }
    } }
    lastletter = t.slice(t.length - 1);
    if (lastletter === 's') {
      t = t.slice(0, t.length - 1); //remove the s
      //check last 3 letters
      lastletter = t.slice(t.length - 3);
      if (lootparser_p_ends[lastletter] !== undefined) { t = t.slice(0, t.length - 3) + lootparser_p_ends[lastletter]; }
      //check last 2 letters
      lastletter = t.slice(t.length - 2);
      if (lootparser_p_ends[lastletter] !== undefined) { t = t.slice(0, t.length - 2) + lootparser_p_ends[lastletter]; }
    }
    return t;
  },
  lootparser_to_plural = function (t) {
    var x, lastletter;
    for (x in lootparser_s_words) { if (lootparser_s_words.hasOwnProperty(x)) {
      if ((new RegExp('^' + x.replace(/\*/g, '.*?') + '$')).test(t)) { return t.replace(x.replace(/\*/g, ''), lootparser_s_words[x]); }
    } }
    if (lootparser_s_words[t.substr(1 + t.lastIndexOf(' '))] !== undefined) { return t.substr(0, 1 + t.lastIndexOf(' ')) + lootparser_s_words[t.substr(1 + t.lastIndexOf(' '))]; }
    lastletter = t.substr(-1);
    /*jslint regexp: true */
    if (lastletter === 's' || lastletter === 'h' || (lastletter === 'o' && t.match(/.*[^aeiou]o$/i))) { t += 'es'; }
    else if (lastletter === 'y') { t = t.substr(0, t.length - 1) + 'ies'; }
    else { t += 's'; }
    /*jslint regexp: false */
    return t;
  },
  lootparser_pagename = function (t, us, encoded) {
    if (us === undefined) { us = false; }
    if (encoded === undefined) { encoded = true; }
    t = t.replace(/_/g, ' ');
    if (lootparser_creature_special_names[t] !== undefined) { t = lootparser_creature_special_names[t]; }
    if (us) { t = t.replace(/ /g, '_'); }
    if (encoded) { t = html_e(t); }
    return t;
  },
  //check last 2 lettersa is item name in singular, b is item max count
  lootparser_wiki_links = function (a, b) {
    a = stripslashes(a);
    if (a === 'Empty') { return 'Empty'; }
    if (b < 2) { return '[[' + a + ']]'; }
    var ap = lootparser_to_plural(a);
    if (ap.substr(0, a.length) === a) { return '[[' + a + ']]' + ap.substr(a.length); }
    return '[[' + a + '|' + ap + ']]';
  },
  lootparser_array_to_wiki2 = function (inp) {
    var r, i, x, name_to_use, inp_list;
    name_to_use = lootparser_t_creature_special_names.hasOwnProperty(inp.name) ? lootparser_t_creature_special_names[inp.name] : inp.name;
    inp_list = obj_list_sort(inp, 'numeric', false, true, 'times', true);

    r = '{' + '{Loot2' + (inp.suffix === '2_RC' ? '_RC' : '') + '\r\n|version=' + inp.version + '\r\n|kills=' + inp.kills + '\r\n|name=' + name_to_use + '\r\n';
    for (i = 0; i < inp_list.length; i++) {
      x = inp_list[i];
      //only process objects
      if (typeof inp[x] === 'object') {
        r += '|' + x + ', times:' + inp[x].times +
        (inp[x].min > 0 ? (', amount:' + (inp[x].min === inp[x].max ? inp[x].min : String(inp[x].min) + '-' + String(inp[x].max))) : '') +
        (inp[x].total > 0 ? ', total:' + inp[x].total : '') + '\r\n';
      }
    }
    r += '}' + '}\r\n';
    return r;
  },
  lootparser_array_to_wiki1 = function (inp) {
    var r, i, x, name_to_use, av_gold = 0, inp_list;
    name_to_use = lootparser_t_creature_special_names.hasOwnProperty(inp.name) ? lootparser_t_creature_special_names[inp.name] : inp.name;
    inp_list = obj_list_sort(inp, 'numeric', false, true, 'total', true);

    r = '{' + '{Loot\r\n|version=' + inp.version + '\r\n|kills=' + inp.kills + '\r\n|name=' + name_to_use + '\r\n';
    for (i = 0; i < inp_list.length; i++) {
      x = inp_list[i];
      //only process objects
      if (typeof inp[x] === 'object') {
        if (x.substr(0, 9) === 'Gold Coin') { av_gold = Math.round((inp[x].total / inp.kills) * 100) / 100; }
        r += '|' +
        lootparser_wiki_links(x, 1) +
        ', ' +
        inp[x].total +
        '\r\n';
      }
    }
    r += '}' + '}\r\n' +
    '<br />Average gold: ' + av_gold;
    return r;
  },

  lootparser_add_parse = function (t, isnew) {
    var
    ret = [],
    teo,
    tematch, tematch2, tematch3,
    teregexp, teregexp2, teregexp3, teregexp3_2,
    use_loot2, itemo;
    /*jslint regexp: true */
    teregexp = /\{\{(Loot2_RC|Loot2|Loot)[^\}]*\}\}(?:[\s\S]{0,20}Average \[{0,2}gold\]{0,2}:\s*[\d\.]*\s*)?/gi;
    teregexp2 = /(?:\s*\|\s*(?:(version|kills|name)\s*=\s*)?([^|}]+))/gi;
    teregexp3 = /(.*?),\s*(?:(\d*))?/;
    teregexp3_2 = /(.*?),\s*times:(\d*),?\s*(?:amount:(\d*)-?(\d*))?,?\s*(?:total:(\d*))?/;
    /*jslint regexp: false */
    //templates to objects
    /*jslint ass: true */
    while ((tematch = teregexp.exec(t)) !== null) {
      teo = {iserror: false, isnew: !!isnew, suffix: (tematch[1] || '').replace(/Loot/, '')};
      use_loot2 = teo.suffix.indexOf('2') === 0;
      //properties
      while ((tematch2 = teregexp2.exec(tematch[0])) !== null) {
        //version/kills/name
        if (tematch2[1]) {
          tematch2[2] = $.trim(tematch2[2]);
          teo[tematch2[1]] = tematch2[1] === 'kills' ? parseInt(tematch2[2], 10) : tematch2[2];
        }
        //loot
        else {
          tematch3 = tematch2[2].match(use_loot2 ? teregexp3_2 : teregexp3);
          if (!tematch3 || !tematch3[1] || !tematch3[2]) { teo.iserror = 'loot'; }
          else {
            tematch3[1] = tematch3[1].split('[').join('').split(']', 1).join('');
            tematch3[2] = parseInt(tematch3[2], 10);
            itemo = {};
            if (use_loot2) {
              tematch3[3] = parseInt(tematch3[3], 10) || 0;
              tematch3[4] = parseInt(tematch3[4], 10) || tematch3[3];
              tematch3[5] = parseInt(tematch3[5], 10) || 0;
              itemo.times = tematch3[2];
              itemo.min = tematch3[3];
              itemo.max = tematch3[4];
            }
            itemo.total = (use_loot2 ? tematch3[5] : tematch3[2]);
            teo[tematch3[1]] = itemo;
          }
        }
      }
      ret.push({t: tematch[0], o: teo});
    }
    /*jslint ass: false */
    return ret;
  },
  //returns [<markup>, <Kills added>, <version>]
  //textold can be an input from a wiki textarea
  //textnew should be generated by lootparser_loot_process()
  //gives alert and returns false on failure
  lootparser_add = function (textold, textnew, wysiwygtag) {
    var
    olda = lootparser_add_parse(textold),
    newa = lootparser_add_parse(textnew, true),
    use_loot2,
    x, oldi, newi, oldo, newo, newt, addedo,
    merge_new_to_old = [], merge_2_to_2rc = [],
    res,
    errors = {
      loot: 'loot error',
      name: 'Names of creatures doesn\'t match',
      parameter: 'names/kills/version is missing'
    },
    do_error = function (err) { alert(err); return false; };
    if (wysiwygtag === undefined) { wysiwygtag = true; }
    //chck if news match olds
    for (newi = 0; newi < newa.length; newi++) {
      newo = newa[newi].o;
      merge_new_to_old[newi] = -1;
      merge_2_to_2rc[newi] = 0;
      //parameters check
      if (!newo.kills || !newo.name || !newo.version) { newo.iserror = 'parameter'; }
      //error
      if (newo.iserror) { return do_error(errors[newo.iserror] + ' in New Statistics'); }
      for (oldi = 0; oldi < olda.length; oldi++) {
        oldo = olda[oldi].o;
        //parameters check
        //if (!oldo.kills || !oldo.name || !oldo.version) { oldo.iserror = 'parameter'; }
        //error
        if (oldo.iserror) { return do_error(errors[oldo.iserror] + ' in Old Statistics'); }
        //same version
        if (oldo.version === newo.version) {
          //same suffix
          if (oldo.suffix === newo.suffix) {
            //name error
            if (
              oldo.name !== newo.name &&
              lootparser_creature_special_names[oldo.name] !== newo.name &&
              oldo.name !== lootparser_creature_special_names[newo.name]
            ) { return do_error(errors.name); }
            //found & next newo
            merge_new_to_old[newi] = oldi;
            merge_2_to_2rc[newi] = 0;
            break;
          }
          //2/2_RC suffix
          if (oldo.suffix === '2_RC' && newo.suffix === '2') { merge_2_to_2rc[newi] = -(oldi + 1); }
          else if (oldo.suffix === '2' && newo.suffix === '2_RC') { merge_2_to_2rc[newi] = (oldi + 1); }
        }
      }
    }
    //merge/add news
    res = textold;
    for (newi = 0; newi < merge_new_to_old.length; newi++) {
      oldi = merge_new_to_old[newi];
      newo = newa[newi].o;
      if (!addedo) { addedo = newo; }
      //merge
      if (oldi > -1) {
        oldo = olda[oldi].o;
        use_loot2 = oldo.suffix.indexOf('2') === 0;
        //sum
        for (x in newo) { if (newo.hasOwnProperty(x)) {
          if (!oldo.hasOwnProperty(x)) { oldo[x] = newo[x]; }
          else if (x === 'kills') { oldo[x] += newo[x]; }
          else if (typeof newo[x] === 'object') {
            if (use_loot2) {
              oldo[x].min = Math.min(oldo[x].min, newo[x].min);
              oldo[x].max = Math.max(oldo[x].max, newo[x].max);
              oldo[x].times += newo[x].times;
            }
            oldo[x].total += newo[x].total;
          }
        } }
        newt = (use_loot2 ? lootparser_array_to_wiki2(oldo) : lootparser_array_to_wiki1(oldo)) + '\n\n\n';
        res = res.replace(olda[oldi].t, newt);
        olda[oldi].t = newt;
      }
      //add
      else {
        use_loot2 = newo.suffix.indexOf('2') === 0;
        newt = '\n\n\n' + (use_loot2 ? lootparser_array_to_wiki2(newo) : lootparser_array_to_wiki1(newo)) + '\n\n\n';
        //top
        if (merge_2_to_2rc[newi] === 0) { res = newt + res; }
        //before/after another
        else {
          oldi = Math.abs(merge_2_to_2rc[newi]) - 1;
          res = res.replace(
            olda[oldi].t,
            merge_2_to_2rc[newi] < 0 ? (newt + olda[oldi].t) : (olda[oldi].t + newt)
          );
        }
      }
    }
    //wiki markup
    res = $.trim(res);
    res = (wysiwygtag ? '__NOWYSIWYG__\n\n' : '') + res.replace(/__NOWYSIWYG__/g, '');
    while (res.search(/(?:\r\n|\r|\n){3,}/) !== -1) { res = res.replace(/(?:\r\n|\r|\n){3,}/g, '\n\n'); }
    while (res.search('&a' + 'mp;') !== -1) { res = res.replace('&a' + 'mp;', '&'); }
    while (res.search('&l' + 't;') !== -1) { res = res.replace('&l' + 't;', '<'); }
    while (res.search('&g' + 't;') !== -1) { res = res.replace('&g' + 't;', '>'); }
    while (res.search('<p />') !== -1) { res = res.replace('<p />', ''); }
    return [res, addedo && addedo.kills ? addedo.kills : 0, addedo && addedo.version ? addedo.version : ''];
  },
  lootparser_btns_cbs_enable = function () {
    $('input[id^="lootparser_loot_combined_b"], input[id^="lootparser_loot_combined_c"]')
    .add('#lootparser_stats_b, #lootparser_stats_c')
    .add('#lootparser_stats_rc_b, #lootparser_stats_rc_c')
    .add('#lootparser_upload_all')
    .prop({disabled: false});
  },
  lootparser_btns_cbs_disable = function () {
    $('input[id^="lootparser_loot_combined_b"], input[id^="lootparser_loot_combined_c"]')
    .add('#lootparser_stats_b, #lootparser_stats_c')
    .add('#lootparser_stats_rc_b, #lootparser_stats_rc_c')
    .add('#lootparser_upload_all')
    .prop({disabled: true});
  },
  multi_upload_click = function () {
    $uploading_all_to_do.eq(0).click();
    $uploading_all_to_do = $uploading_all_to_do.slice(1);
    $('#lootparser_upload_all_t').text(
      'Uploading ' + (uploading_all_result.length + 1) + ' / ' + uploading_all
    );
  },
  upload_to_wikia_end = function (id, msg, is_error) {
    if (is_error === undefined) { is_error = false; }
    if (msg === undefined) { msg = ''; }
    var check_uploading_all = function () {
      var x, allerrors = true, error_count = 0, idna, anamea;
      if (uploading_all > 0) {
        idna = id.split('block'); //lootparser_stats_block/lootparser_loot_block1
        idna = parseInt(idna[idna.length - 1], 10) || 0;
        uploading_all_result.push(is_error ? [msg, idna, id] : ['', '']);
        if (uploading_all_result.length === uploading_all) {
          uploading_all = 0;
          for (x = 0; x < uploading_all_result.length; x++) {
            if (uploading_all_result[x][0] === '') { allerrors = false; }
            else { error_count++; }
          }
          $('.lootparser_loot_up').first().click();
          if (allerrors) {
            $('#lootparser_upload_all_t').html('"Upload All" finished, nothing was uploaded <br />because of errors, try to reload the page.');
          }
          else {
            if (error_count > 0) { for (x = 0; x < uploading_all_result.length; x++) {
              anamea = uploading_all_result[x];
              anamea = anamea[1] === 0 ?
              (anamea[2] === 'lootparser_stats_rc_block' ? 'Reward_Container_Statistics' : 'Creature_Statistics') :
              'lootparser_creature_' + anamea[1];
              $('#lootparser_loot_results0 a[href="#' + anamea + '"]')
              .css('background-color', '#F0D2D2');
            } }
            $('#lootparser_upload_all_t').html(
              '"Upload All" finished, ' +
              (error_count === 0 ?
                '<br />everything was uploaded correctly.' :
                (error_count === 1 ? 'there was 1 errror' : 'there were ' + error_count + ' errors') +
                '. <br />Scroll down to upload the missing statistics.'
              )
            );
          }
          $('input[id^="lootparser_loot_combined_c"], #lootparser_stats_c, #lootparser_stats_rc_c').parent().hide();
          uploading_all_blink = 15;
          lootparser_btns_cbs_enable();
        }
        else { multi_upload_click(); }
      }
    },
    enable_controls = function () {
      if (uploading_all === 0) {
        lootparser_btns_cbs_enable();
        if (is_error) {
          $('#' + id).closest('td').next().find(':checkbox').prop({checked: true});
        }
      }
      else { check_uploading_all(); }
    },
    idn, aname;
    if (is_error) {
      if (uploading_all === 0) { $('#' + id).fadeOut(400, function () {
        if (msg !== '') { alert(msg); }
        enable_controls();
      }); }
      else { $('#' + id).fadeOut(0); enable_controls(); }
    }
    else {
      if (uploading_all === 0) { $('#' + id).fadeTo(400, 0.95, enable_controls); }
      else { $('#' + id).fadeTo(0, 0.95); enable_controls(); }
      $('#' + id).click(function () { $(this).fadeOut(600); }).find('p').html(
        '<br />Upload OK<br /><br /><div style="font-size: small;">Click here to see the text</div>'
      );
      idn = id.split('block'); //lootparser_stats_block/lootparser_loot_block1
      idn = parseInt(idn[idn.length - 1], 10) || 0;
      aname = idn === 0 ?
      (id === 'lootparser_stats_rc_block' ? 'Reward_Container_Statistics' : 'Creature_Statistics') :
      'lootparser_creature_' + idn;
      $('#lootparser_loot_results0 a[href="#' + aname + '"]')
      .css('background-color', '');
    }
  },
  upload_to_wikia = function (div_id) {
    var $tmp, tmp, off_cont, off_tmp, parser_text, user_modified = false, creature, token = mw.user.tokens.get('csrfToken'), basetimestamp, page_text, new_page_text, summary,
    ta_multi_version_no_ok_wrong = 0, ta_version_ok = false, cvtext, vdata,
    request_st, request_end = function (msg, is_error) {
      if (is_error === undefined) { is_error = true; }
      setTimeout(function () {
        if (is_error) { $('#lootparser_loot_combined_b' + div_id).parent().show(); }
        upload_to_wikia_end('lootparser_loot_block' + div_id, (msg === undefined) ? '' : msg, is_error);
      }, is_error ? Math.max(0, 250 - ($.now() - request_st)) : 0);
    },
    lootparser_ajax_check_upload = function () {
      var errort = 'There was a problem uploading statistics for ' + creature.replace(/_/g, ' ') + ', try again.',
      captcha = '';
      page_text = $.trim(page_text);
      parser_text = (parser_text.match(/\{\{[\s\S]*?\}\}/g) || []).join('\n'); //take only the Template(s) part
      new_page_text = lootparser_add(page_text, parser_text);
      if (new_page_text === false) { request_end(errort); }
      else {
        summary = new_page_text[1] + ' kills added with TibiaWiki loot parser' + (user_modified ? '.' : '') + ' (' + new_page_text[2] + ')';
        new_page_text = new_page_text[0];
        request_st = $.now();
        $.ajax({
          url: '/api.php',
          type: 'POST',
          dataType: 'json',
          data : {
            action: 'edit',
            title: 'Loot_Statistics:' + lootparser_pagename(creature, true, false),
            format: 'json',
            summary: summary,
            text: new_page_text,
            token: token,
            basetimestamp: basetimestamp,
            minor: 'minor'
          },
          error: function () { request_end(errort); },
          success: function (obj) {
            var $parent_td, last_scrolltop;
            if (obj && obj.hasOwnProperty('edit') && obj.edit.hasOwnProperty('result')) {
              if (obj.edit.result === 'Success') {
                request_end('You added current loot view to the statistics page for:\n' + creature.replace(/_/g, ' '), false);
              }
              else if (obj.edit.result === 'Failure' && obj.edit.hasOwnProperty('captcha')) {
                $parent_td = $('#lootparser_loot_combined_b' + div_id).parent().parent();
                $parent_td.append(
                  $('<img />', {alt: 'captcha', id: 'lootparser_captcha_img', src: obj.edit.captcha.url}).css({border: '2px ridge black'})
                );
                last_scrolltop = $('html, body').scrollTop();
                $('html, body').scrollTop(($parent_td.offset().top + $parent_td.outerHeight()) - 80);
                captcha = prompt('Solve the captcha shown in the page');
                $('#lootparser_captcha_img').remove();
                if (uploading_all === 0) { $('html, body').scrollTop(last_scrolltop); }
                else { $('.lootparser_loot_up').first().click(); }

                if (captcha !== null && captcha !== '') {
                  if (typeof this.data === 'string') {
                    this.data += '&captchaword=' + encodeURIComponent(captcha) + '&captchaid=' + obj.edit.captcha.id;
                  }
                  else { this.data.captchaword = captcha; this.data.captchaid = obj.edit.captcha.id; }
                  $.ajax(this);
                  return;
                }
                request_end(errort);
              }
              else { request_end(errort); }
            }
            else { request_end(errort); }
          }
        });
      }
    },
    lootparser_ajax_get_current = function () {
      var errort = 'There was a problem getting current statistics for ' + creature.replace(/_/g, ' ') + ', try again.';
      request_st = $.now();
      $.ajax({
        url: '/api.php', type: 'GET', dataType: 'json',
        data : {
          action: 'query',
          titles: 'Loot_Statistics:' + lootparser_pagename(creature, true, false),
          format: 'json',
          rvprop: 'content',
          prop: 'info|revisions'
        },
        error: function () { request_end(errort); },
        success: function (obj) {
          var x;
          if (obj) {
            for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
              if (obj.query.pages[x].missing !== undefined) {
                request_end(errort);
              }
              else {
                page_text = obj.query.pages[x].revisions[0]['*'];
                lootparser_ajax_check_upload();
              }
              break;
            } }
          }
          else { request_end(errort); }
        }
      });
    },
    lootparser_ajax_start = function () {
      var errort = 'There was a problem getting current statistics for ' + creature.replace(/_/g, ' ') + ', try again.';
      request_st = $.now();
      $.ajax({
        url: '/api.php',
        type: 'GET',
        dataType: 'json',
        data : {
          action: 'query',
          titles: 'Loot_Statistics:' + lootparser_pagename(creature, true, false),
          format: 'json',
          prop: 'info|revisions'
        },
        error: function () { request_end(errort); },
        success: function (obj) {
          var x;
          if (obj) {
            for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
              if (obj.query.pages[x].missing !== undefined) {
                basetimestamp = '';
                page_text = '';
                lootparser_ajax_check_upload();
              }
              else {
                basetimestamp = obj.query.pages[x].revisions[0].timestamp;
                page_text = obj.query.pages;
                lootparser_ajax_get_current();
              }
              break;
            } }
          }
          else { request_end(errort); }
        }
      });
    };
    //disabling buttons, overlay div
    $('#lootparser_loot_combined_c' + div_id).prop({checked: false});
    $('#lootparser_loot_combined_b' + div_id + ', #lootparser_loot_combined_c' + div_id).prop({disabled: true});
    lootparser_btns_cbs_disable();
    $('#lootparser_loot_combined_b' + div_id).parent().hide();
    if ($('#lootparser_loot_block' + div_id).length === 0) {
      $tmp = $('#lootparser_loot_results' + div_id).find('textarea:first');
      off_cont = $('#lootparser_loot_results' + div_id).offset();
      off_tmp = $tmp.offset();
      $tmp.after(
        $('<div></div>', {id: 'lootparser_loot_block' + div_id}).css({
          display: 'none', opacity: 0, position: 'absolute',
          top: (off_tmp.top - off_cont.top) + 'px', left: (off_tmp.left - off_cont.left) + 'px',
          width: $tmp.outerWidth() + 'px', height: $tmp.outerHeight() + 'px', backgroundColor: '#666666', textAlign: 'center'
        })
        .html('<p style="font-size:xx-large;font-weight:bolder;font-family:Arial;color:white"><br />Uploading<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Uploading" /></p><br />')
      );
    }
    $('#lootparser_loot_block' + div_id).fadeTo(400, 0.8);

    parser_text = $('#lootparser_loot_combined' + div_id).val();
    if ($('#lootparser_loot_combined' + div_id).data('crc32') !== crc32(parser_text)) { user_modified = true; }

    tmp = parser_text.match(/\{\{[\s\S]*?name=([\s\S]*?)\|[\s\S]*?\}\}/i);
    if (tmp === null) {
      request_end('There was a problem getting statistics from parser page.');
    }
    else {
      creature = ucwords($.trim(tmp[1])).replace(/ /g, '_');
      ta_multi_version_no_ok_wrong = 0; ta_version_ok = false; vdata = parser_text.match(/version\s*?=\s*?([.\da-f]{3,}(\s\(\d\))?)/i);
      if (vdata === null) { request_end('Version info couldn\'t be found, please verify in case you manually edited the statistics.'); }
      else {
        if (lootparser_tibia_versions.hasOwnProperty(vdata[1])) { ta_version_ok = true; }
        cvtext = lootparser_tibia_versions[current_tibia_version];
        if (
          lootparser_versions_ex.hasOwnProperty(lootparser_use_version) &&
          lootparser_versions_ex[lootparser_use_version].combined.hasOwnProperty(creature.replace(/_/g, ' '))
        ) {
          ta_multi_version_no_ok_wrong  = (vdata[1] === lootparser_versions_ex[lootparser_use_version].combined[creature.replace(/_/g, ' ')] ? 1 : 2);
        }
        if (ta_multi_version_no_ok_wrong === 2) {
          request_end(
            'There is no LOOT VERSION "' + vdata[1] + '"' + ' for ' + '"' + (creature.replace(/_/g, ' ')) + '"' +
            '\n\nCurrent tibiawiki LOOT VERSION for this creature is ' +
            lootparser_versions_ex[current_tibia_version].combined[creature.replace(/_/g, ' ')] +
            '\n\nThe parser should give the correct version always,' +
            '\nif you have any doubts about versions you can check\nthe Talk page of the parser.' +
            '\n\nYou can review the version info and try to upload again.'
          );
        }
        else if (ta_multi_version_no_ok_wrong === 0 && !ta_version_ok) {
          request_end(
            'There is no LOOT VERSION "' + vdata[1] + '"' + ' for ' + '"' + (creature.replace(/_/g, ' ')) + '"' +
            '\n\nCurrent tibiawiki LOOT VERSION for this creature is ' +
            current_tibia_version +
            '\nand it is used for clients ' + cvtext +
            '\n\nThe parser should give the correct version always,' +
            '\nif you have any doubts about versions you can check\nthe Talk page of the parser.' +
            '\n\nYou can review the version info and try to upload again.'
          );
        }
        else { lootparser_ajax_start(); }

      }
    }
  },
  lootparser_loot_process_loot = function (amonster_o, loot_o, monsters, loot_exp, loot_tem, reward_chest, stats_rc) {
    var
    loot, monster, amonster,
    y, ibl, breaky,
    removed_event_items, remove_this_item,
    itemlooted, aitemlooted, amount,
    loot_tmp, //temp loot amounts
    monstername,
    loot_stats_rc;
    //loot
    loot_tmp = {};
    loot = loot_o.split(',');
    if (reward_chest) { loot_stats_rc = ''; }
    //monster
    amonster = amonster_o;
    monstername = ucwords(/^a[n]? /.test(amonster) ? amonster.substr(amonster.indexOf(' ') + 1) : amonster);
    //change/skip monster name by loot
    if (lootparser_creature_by_loot.hasOwnProperty(amonster)) {
      breaky = false;
      for (y = 0; y < loot.length; y++) {
        aitemlooted = ucwords($.trim(loot[y])); //capitalized name of the looted item with amount
        amount = parseInt(/^a[n]? /i.test(aitemlooted) ? 1 : (/^\d+ /.test(aitemlooted) ? aitemlooted.match(/^\d+ /) : 0), 10);
        itemlooted = aitemlooted.substr((amount > 0) ? aitemlooted.indexOf(' ') + 1 : 0);
        itemlooted = (amount > 1) ? lootparser_to_singular(itemlooted) : itemlooted; //capitalized name of the looted item
        for (ibl = 0; ibl < lootparser_creature_by_loot[amonster].length; ibl++) {
          if ($.inArray(itemlooted, lootparser_creature_by_loot[amonster][ibl].loot_match) !== -1) {
            //change name
            if (lootparser_creature_by_loot[amonster][ibl].rename && lootparser_creature_by_loot[amonster][ibl].new_name) {
              amonster = lootparser_creature_by_loot[amonster][ibl].new_name;
              monstername = ucwords(/^a[n]? /.test(amonster) ? amonster.substr(amonster.indexOf(' ') + 1) : amonster);
              breaky = true;
              break;
            }
            //skip
            return false;
          }
        }
        if (breaky) { break; }
      }
    }
    //monster add
    if (monsters.killed[amonster] === undefined) { monsters.killed[amonster] = 0; }
    if (monsters.reward_chest[amonster] === undefined) { monsters.reward_chest[amonster] = 0; }
    if (loot_tem[amonster] === undefined) { loot_tem[amonster] = {}; }
    if (loot_exp[amonster] === undefined) { loot_exp[amonster] = {}; }
    if (reward_chest) { monsters.reward_chest[amonster]++; }
    else { monsters.killed[amonster]++; }
    //through loot
    removed_event_items = 0;
    for (y = 0; y < loot.length; y++) {
      remove_this_item = false;
      aitemlooted = ucwords($.trim(loot[y])); //capitalized name of the looted item with amount
      amount = parseInt(/^a[n]? /i.test(aitemlooted) ? 1 : (/^\d+ /.test(aitemlooted) ? aitemlooted.match(/^\d+ /) : 0), 10);
      itemlooted = aitemlooted.substr((amount > 0) ? aitemlooted.indexOf(' ') + 1 : 0);
      itemlooted = (amount > 1) ? lootparser_to_singular(itemlooted) : itemlooted; //capitalized name of the looted item
      //event_items
      if (event_items.hasOwnProperty(itemlooted.toLowerCase())) {
        monster = (/^a[n]? /.test(amonster) ? amonster.substr(amonster.indexOf(' ') + 1) : amonster).toLowerCase();
        if (!event_items[itemlooted.toLowerCase()].hasOwnProperty(monster)) {
          removed_event_items++;
          if (removed_event_items !== loot.length || loot.length - 1 !== y) { remove_this_item = true; }
          else { amount = 0; aitemlooted = itemlooted = 'Nothing'; }
        }
      }
      if (!remove_this_item) {
        //loot_exp
        if (loot_exp[amonster][aitemlooted] === undefined) { loot_exp[amonster][aitemlooted] = 0; }
        loot_exp[amonster][aitemlooted]++;

        if (lootparser_use_loot2) {
          //creature_items_name_change exception
          if (creature_items_name_change.hasOwnProperty(monstername)) {
            if (creature_items_name_change[monstername].hasOwnProperty(itemlooted)) {
              itemlooted = creature_items_name_change[monstername][itemlooted];
            }
          }
        }
        else {
          if (amount === 0) { amount = 1; }
          if (itemlooted === 'Nothing') { itemlooted = 'Empty'; }
        }
        //uncountable items always appear with amounts if > 0 now, so we can treat them as countable
		if (amount === 0) { amount = 1; }
        //loot_tmp
        if (loot_tmp[itemlooted] === undefined) { loot_tmp[itemlooted] = 0; }
        loot_tmp[itemlooted] += amount;

        //reward chest
        if (reward_chest) { loot_stats_rc += '|' + (amount ? (amount + '*') : '') + itemlooted.toLowerCase(); }
      }
    }
    //loot_tem
    for (y in loot_tmp) { if (loot_tmp.hasOwnProperty(y)) {
      if (lootparser_use_loot2) { if (y === 'Nothing') { y = 'Empty'; } }
      if (loot_tem[amonster][y] === undefined) { loot_tem[amonster][y] = {}; }
      if (loot_tem[amonster][y].total === undefined) { loot_tem[amonster][y].total = 0; }
      loot_tem[amonster][y].total += loot_tmp[y] || 0;
      if (lootparser_use_loot2) {
        if (loot_tem[amonster][y].times === undefined) { loot_tem[amonster][y].times = 0; }
        loot_tem[amonster][y].times++;
        if (loot_tem[amonster][y].min === undefined || loot_tmp[y] < loot_tem[amonster][y].min) {
          loot_tem[amonster][y].min = loot_tmp[y];
        }
        if (loot_tem[amonster][y].max === undefined || loot_tmp[y] > loot_tem[amonster][y].max) {
          loot_tem[amonster][y].max = loot_tmp[y];
        }
      }
    } }
    //stats reward chest
    if (reward_chest) {
      if (!stats_rc.hasOwnProperty(amonster)) { stats_rc[amonster] = {}; }
      if (!stats_rc[amonster].hasOwnProperty(loot_stats_rc)) { stats_rc[amonster][loot_stats_rc] = 0; }
      stats_rc[amonster][loot_stats_rc]++;
    }
    return true;
  },
  lootparser_loot_process_stats = function (theline, stats, exp_got) {
    var
    amount,
    tmp, line, line_start, origin, target, action;
    tmp = [];
    line = theline.substr(0, theline.length - (theline.substr(theline.length - 1) === '.' ? 1 : 0));
    line_start = line.substr(2, 1) === ':' ? 6 : 0;
    /*jslint ass: true */
    if ((tmp[0] = line.indexOf(' healed ')) !== -1 && (tmp[1] = line.indexOf('self ')) !== -1 && line.indexOf('You ') === -1) {
      action = 'heal'; origin = line.slice(line_start, tmp[0]); target = '-'; amount = String(parseInt(line.substr(tmp[1] + 9, 5), 10));
      if (stats[action][origin] === undefined) { stats[action][origin] = {}; }
      if (stats[action][origin][target] === undefined) { stats[action][origin][target] = {}; }
      if (stats[action][origin][target][amount] === undefined) { stats[action][origin][target][amount] = 0; }
      stats[action][origin][target][amount]++;
    }
    else if ((tmp[0] = line.indexOf(' loses ')) !== -1 && (tmp[1] = line.indexOf(' by ')) !== -1) {
      action = 'damage'; target = line.slice(line_start, tmp[0]); origin = line.substr(tmp[1] + 4); amount = String(parseInt(line.substr(tmp[0] + 7, 5), 10));
      if (stats[action][origin] === undefined) { stats[action][origin] = {}; }
      if (stats[action][origin][target] === undefined) { stats[action][origin][target] = {}; }
      if (stats[action][origin][target][amount] === undefined) { stats[action][origin][target][amount] = 0; }
      stats[action][origin][target][amount]++;
    }
    else if ((tmp[0] = line.indexOf('You lose ')) !== -1 && (tmp[1] = line.indexOf(' by ')) !== -1) {
      action = 'damage'; target = 'player'; origin = line.substr(tmp[1] + 4); amount = String(parseInt(line.substr(tmp[0] + 9, 5), 10));
      if (stats[action][origin] === undefined) { stats[action][origin] = {}; }
      if (stats[action][origin][target] === undefined) { stats[action][origin][target] = {}; }
      if (stats[action][origin][target][amount] === undefined) { stats[action][origin][target][amount] = 0; }
      stats[action][origin][target][amount]++;
    }
    else if ((tmp[0] = line.indexOf('You gained ')) !== -1 && (tmp[1] = line.indexOf(' experience ')) !== -1) {
      exp_got.val += (parseInt(line.slice(tmp[0] + 11, tmp[1]), 10) || 0);
    }
    /*jslint ass: false */
  },

  lootparser_stats_click = function (rc) {
    var
    $tmp, off_cont, off_tmp,
    id_prefix = 'lootparser_stats' + (rc ? '_rc' : ''),
    stats_name = rc ? 'Reward Container Statistics' : 'Creature Statistics',
    page_name = 'TibiaWiki:' + (rc ? 'Reward_Container_Statistics' : 'Creature_Statistics') + '/Statistics',
    request_error = function () {
      $('#' + id_prefix + '_b').parent().show();
      upload_to_wikia_end(id_prefix + '_block', 'There was an error uploading the ' + stats_name + ', try again.', true);
    };

    $('#' + id_prefix + '_c').prop({checked: false});
    lootparser_btns_cbs_disable();
    $('#' + id_prefix + '_b').parent().hide();
    if ($('#' + id_prefix + '_block').length === 0) {
      $tmp = $('#' + id_prefix + '_results').find('textarea:first');
      off_cont = $('#' + id_prefix + '_results').offset();
      off_tmp = $tmp.offset();
      $tmp.after(
        $('<div></div>', {id: id_prefix + '_block'})
        .css({
          display: 'none', opacity: 0, position: 'absolute',
          top: (off_tmp.top - off_cont.top) + 'px', left: (off_tmp.left - off_cont.left) + 'px',
          width: $tmp.outerWidth() + 'px', height: $tmp.outerHeight() + 'px', backgroundColor: '#666666', textAlign: 'center'
        })
        .html('<p style="font-size:xx-large;font-weight:bolder;font-family:Arial;color:white"><br />Uploading<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Uploading" /></p><br />')
      );
    }
    $('#' + id_prefix + '_block').fadeTo(400, 0.8);
    $.ajax({
      url: '/api.php', type: 'GET', dataType: 'json',
      data : {
        action: 'query',
        titles: page_name,
        format: 'json',
        prop: 'info'
      },
      error: request_error, success: function (obj) {
        var xe, token = mw.user.tokens.get('csrfToken');
        if (obj) {
          for (xe in obj.query.pages) { if (obj.query.pages.hasOwnProperty(xe)) {
            break;
          } }
          $.ajax({
            url: '/api.php',
            type: 'POST',
            dataType: 'json',
            data : {
              action: 'edit',
              title: page_name,
              format: 'json',
              section: 'new',
              text: $('#' + id_prefix + '_t').val(),
              token: token,
              minor: 'minor'
            },
            error: request_error, success: function (obj) {
              if (
                obj.edit !== undefined && obj.edit.result !== undefined &&
                obj.edit.result === 'Success'
              ) {
                upload_to_wikia_end(id_prefix + '_block', 'You uploaded the ' + stats_name + '.');
              }
              else { request_error(); }
            }
          });
        }
        else { request_error(); }
      }
    });
  },
  lootparser_loot_process_contents_html = function (got_stats, got_stats_rc, monsters_list) {
    var
    in_tmp = '', x, i = 0, i_creat = 1, listi;
    if (got_stats) {
      in_tmp += i === 0 ? '<td style="vertical-align:top;padding: 0px 2px 2px 2px;"><table>' : '';
      in_tmp += '<tr><td><a href="#Creature_Statistics">Creature Statistics</a></td></tr>' + "\r\n";
      i++;
    }
    if (got_stats_rc) {
      in_tmp += i === 0 ? '<td style="vertical-align:top;padding: 0px 2px 2px 2px;"><table>' : '';
      in_tmp += '<tr><td><a href="#Reward_Container_Statistics">Reward Container Statistics</a></td></tr>' + "\r\n";
      i++;
    }
    for (listi = 0; listi < monsters_list.killed.length; listi++) {
      x = monsters_list.killed[listi];
      if (i % loot_contents_rows === 0) {
        if (i !== 0) { in_tmp += '</table></td>'; }
        in_tmp += '<td style="vertical-align:top;padding: 0px 2px 2px 2px;' + (i !== 0 ? 'border-left:1px solid #AAA;' : '') + '"><table>';
      }
      in_tmp += '<tr><td><a href="#lootparser_creature_' + i_creat + '">' + html_e(x) + '</a></td></tr>' + "\r\n";
      i++; i_creat++;
    }
    in_tmp += "</table></td></tr></table>";
    in_tmp = '<br /><table style="background-color:#F9F9F9;border:1px solid #AAA;font-size:95%;"><tr><th colspan="' + (Math.floor(i / loot_contents_rows) + 1) + '" style="text-align: left;">Contents</th></tr><tr>' + "\r\n" + in_tmp;
    $('#lootparser_loot_results').append(
      '<div id="lootparser_loot_results0" style="overflow: auto;position: relative;white-space: nowrap;">' + in_tmp + '</div>'
    );
  },
  lootparser_loot_process_uploadall_html = function () {
    $('#lootparser_upload_all_td').append(
      $('<input />', {type: 'button', value: 'Upload All', id: 'lootparser_upload_all'})
      .css({marginRight: '10px'}),
      $('<span />', {id: 'lootparser_upload_all_t'})
    );
    //click
    $('#lootparser_upload_all').click(function () {
      $(this).prop({disabled: true}).hide();
      $uploading_all_to_do = $('#lootparser_stats_b:enabled, #lootparser_stats_rc_b:enabled, input[id^="lootparser_loot_combined_b"]:enabled').filter(function () {
        return $(this).parent().find('input:checkbox').is(':checked');
      });
      if ($uploading_all_to_do.length === 0) {
        $('#lootparser_upload_all_t').text('No stats selected to be included.');
        $(this).prop({disabled: false}).show();
      }
      else {
        uploading_all_result = [];
        uploading_all_blink = 0;
        var anikeep = function () {
          if (uploading_all_blink > 0) { uploading_all_blink -= 2; }
          uploading_all_blinks = !uploading_all_blinks;
          $('#lootparser_upload_all_td').css({border: '2px solid #' + (uploading_all_blinks ? '006CB0' : '00C9FF')});
          if (uploading_all_blink < 0) {
            uploading_all_blink = 0;
            $('#lootparser_upload_all_td').css({border: '2px solid #006CB0'});
          }
          else if ($('#lootparser_upload_all').length) { setTimeout(anikeep, 400); }
        };
        anikeep();
        uploading_all = $uploading_all_to_do.length;
        multi_upload_click();
      }
    });
  },
  lootparser_loot_process_stats_html = function (ins_tmp, rc, got_stats) {
    var
    id_prefix = 'lootparser_stats' + (rc ? '_rc' : ''),
    stats_name = rc ? 'Reward container statistics' : 'Creature heal and damage statistics',
    stats_url = rc ? 'Reward_Container_Statistics' : 'Creature_Statistics',
    in_tmp;
    in_tmp = (!rc || !got_stats ? '<br />' : '') + '<a href="#Parser" class="lootparser_loot_up" style="float: right;">top</a><a name="' + stats_url + '"></a><b>' + stats_name + ':</b>';
    in_tmp += '<br /><table style="width: 100%;">' + '<tr><td>' +
    '<a href="/wiki/TibiaWiki:' + stats_url + '" target="_blank">TibiaWiki:' + stats_url + '</a>' +
    '<i style="margin-left: 150px;">Code:</i>' +
    '</td>' + '<td>&nbsp;' + '</td>' + '</tr>' +
    '<tr><td>' +
    '<textarea rows="12" cols="50" id="' + id_prefix + '_t" readonly="readonly" >' +
    ins_tmp +
    '</textarea></td>' +
    '<td style="vertical-align: bottom; text-align: center;">' +
    (
      (mw.config.get('wgUserName') !== null && mw.config.get('wgUserName') !== '') ?
      '<div>' +
      '<span>' +
      (
        ($.inArray('autoconfirmed', mw.config.get('wgUserGroups')) !== -1) ?
        '<input type="checkbox" value="1" checked="checked" id="' + id_prefix + '_c" /><span> Include in "Upload All"</span>' +
        '<br />or<br />' :
        ''
      ) +
      '</span>' +
      '<input type="button" value="Upload Now" id="' + id_prefix + '_b" /></div>' :
      '&nbsp;'
    ) +
    '</td>' +
    '</tr></table><hr />';
    $('#lootparser_loot_results').append(
      '<div id="' + id_prefix + '_results" style="position: relative;">' + in_tmp + '</div>'
    );
    //click
    $('#' + id_prefix + '_b').click(function () {
      lootparser_stats_click(rc);
    });
  },
  lootparser_loot_process_kills_html = function (got_stats, got_stats_rc, monsters, monsters_list, loot_tem, loot_tem_rc, loot_exp, loot_exp_list, loot_exp_rc, loot_exp_rc_list) {
    var
    in_tmp, out_tmp = '', $tmp,
    k1, k2, monstername, id_inc = 1, id_t,
    listi, listj,
    tmp_version;
    //lists and markup
    for (listi = 0; listi < monsters_list.killed.length; listi++) {
      k1 = monsters_list.killed[listi];
      in_tmp = '<a href="#Parser" class="lootparser_loot_up" style="float: right;">top</a><a name="lootparser_creature_' + id_inc + '" style="position: absolute; top: -70px;"></a>' +
      '<b>Killed ' + monsters.killed[k1] + 'x ' + html_e(k1) + ', which dropped:</b>' +
      ' <input id="lootparser_loot_showhide' + id_inc + '" type="button" value="Show" />' +
      '<br /><div style="display: none;" id="lootparser_loot_results_list' + id_inc + '">';
      if (loot_exp_list[k1]) {
        for (listj = 0; listj < loot_exp_list[k1].length; listj++) {
          k2 = loot_exp_list[k1][listj];
          in_tmp += loot_exp[k1][k2] + 'x ' + html_e(stripslashes(k2.toLowerCase())) + '<br />\r\n';
        }
      }
      if (loot_exp_rc_list[k1]) {
        in_tmp += '&bull; From reward chest: <br />\r\n';
        for (listj = 0; listj < loot_exp_rc_list[k1].length; listj++) {
          k2 = loot_exp_rc_list[k1][listj];
          in_tmp += loot_exp_rc[k1][k2] + 'x ' + html_e(stripslashes(k2.toLowerCase())) + '<br />\r\n';
        }
      }
      in_tmp += '</div>';
      monstername = ucwords(/^a[n]? /.test(k1) ? k1.substr(k1.indexOf(' ') + 1) : k1);
      in_tmp += '<table style="width: 100%;">' + '<tr>' + '<td>' +
      '<a href="/wiki/Loot_Statistics:' + lootparser_pagename(monstername, true) + '" target="_blank">Loot_Statistics:' + lootparser_pagename(monstername, false) + '</a>' +
      '<i style="margin-left: 150px;">Wiki markup:</i>' +
      '</td>' + '<td>&nbsp;' + '</td>' + '</tr>' +
      '<tr><td>' +
      '<textarea rows="12" cols="55" id="lootparser_loot_combined' + id_inc + '" readonly="readonly">';
      tmp_version = lootparser_use_version; //for multi version exception list
      if (lootparser_versions_ex.hasOwnProperty(tmp_version) && lootparser_versions_ex[tmp_version].combined.hasOwnProperty(monstername)) {
        tmp_version = lootparser_versions_ex[tmp_version].combined[monstername];
      }
      if (loot_tem[k1]) {
        loot_tem[k1].version = tmp_version; loot_tem[k1].kills = monsters.killed[k1]; loot_tem[k1].name = monstername;
        in_tmp += (lootparser_use_loot2 ? lootparser_array_to_wiki2(loot_tem[k1]) : lootparser_array_to_wiki1(loot_tem[k1]));
      }
      if (loot_tem_rc[k1]) {
        if (loot_tem[k1]) { in_tmp += '\n\n'; }
        loot_tem_rc[k1].version = tmp_version; loot_tem_rc[k1].kills = monsters.reward_chest[k1]; loot_tem_rc[k1].name = monstername;
        loot_tem_rc[k1].suffix = '2_RC';
        in_tmp += (lootparser_use_loot2 ? lootparser_array_to_wiki2(loot_tem_rc[k1]) : lootparser_array_to_wiki1(loot_tem_rc[k1]));
      }
      in_tmp += '</textarea></td>' +
      '<td style="vertical-align: bottom; text-align: center;">' +
      (
        (mw.config.get('wgUserName') !== null && mw.config.get('wgUserName') !== '') ?
        '<div>' +
        '<span>' +
        (
          ($.inArray('autoconfirmed', mw.config.get('wgUserGroups')) !== -1) ?
          '<input type="checkbox" value="1" checked="checked" id="lootparser_loot_combined_c' + id_inc + '" /><span> Include in "Upload All"</span>' +
          '<br />or<br />' :
          ''
        ) +
        '</span>' +
        '<input type="button" value="Upload Now" id="lootparser_loot_combined_b' + id_inc + '" /></div>' :
        '&nbsp;'
      ) +
      '</td>' +
      '</tr></table><hr />';
      out_tmp += '<div id="lootparser_loot_results' + id_inc + '" style="position: relative;">' + ((id_inc === 1 && !got_stats && !got_stats_rc) ? '<br />' : '') + in_tmp + '</div>';
      id_inc++;
    }
    $('#lootparser_loot_results').append(out_tmp);
    id_t = id_inc;
    for (id_inc = 1; id_inc < id_t; id_inc++) {
      $tmp = $('#lootparser_loot_combined' + id_inc);
      $tmp.data('crc32', crc32($tmp.val()));
    }
    //clicks
    $('input[id^="lootparser_loot_combined_b"]').click(function () {
      upload_to_wikia(parseInt($(this).attr('id').replace(/lootparser_loot_combined_b/, ''), 10));
    });
    $('input[id^="lootparser_loot_showhide"]').click(function () {
      var
      show = $(this).val() === 'Show',
      it = $(this).val(show ? 'Hide' : 'Show').attr('id').replace(/lootparser_loot_showhide/, ''),
      $results = $('#lootparser_loot_results' + it),
      $ta = $results.find('textarea:first'),
      off_cont, off_tmp;
      $('#lootparser_loot_results_list' + it)[show ? 'show' : 'hide']();
      off_cont = $results.offset();
      off_tmp = $ta.offset();
      $('#lootparser_loot_block' + it).css({top: (off_tmp.top - off_cont.top) + 'px'});
    });
    $('a.lootparser_loot_up').click(function () {
      $('html, body').scrollTop($("#lootparser_loot_main2").offset().top - 10);
      return false;
    });
  },
  lootparser_loot_process = function () {
    //clean
    $('#lootparser_loot_results, #lootparser_loot_totallines').empty();
    $('#lootparser_loot_totalexp').remove();
    $('#lootparser_upload_all_td').empty().css('border', 'none');
    //display
    $('#lootparser_loot_main1').hide(); $('#lootparser_loot_main2').show();
    //scroll
    $('html, body').scrollTop($("#lootparser_loot_main2").offset().top - 10);
    lootparser_use_version = $('#lootparser_use_version').val();
    lootparser_use_loot2 = (parseFloat(lootparser_use_version, 10) > parseFloat(lootparser_template1_max_tibia_version, 10));
    //time counter
    var startdate = new Date(), starttime = startdate.getTime(), enddate, endtime, totaltime,
    //monsters[all/reward_chest][amonster] = amount_killed/chest reward amount
    //loot_exp[amonster][A_Item_Name] = repetitions
    //loot_tem[amonster][Item_Name][min/max/total/times] = val
    monsters = {killed: {}, reward_chest: {}}, loot_exp = {}, loot_tem = {}, //temp loot info for template
    monsters_list, loot_exp_list,
    loot_exp_rc = {}, loot_tem_rc = {}, //temp loot info for template reward chest
    loot_exp_rc_list,
    data = $.trim($('#lootparser_loot_log').val()).split("\n"),
    totallines = data.length,

    not_player_names_regexp_remove,
    loot_regexps,
    x, y, theline,
    lootignore, lootmatch,
    lootmatch_rc,
    amount,

    ins_tmp, tmp, origin, target, action, origin_target = {}, stats = {heal: {}, damage: {}}, stats_new = {heal: {}, damage: {}},
    ins_rc_tmp, stats_rc = {},
    name_is_player, stats_new_list1, stats_new_list2, stats_new_list3,
    listi, listj, listk,
    exp_got = {val: 0},

    got_stats = false, got_stats_rc = false, got_kills = false, got_kills_rc = false;

    /*jslint regexp: true */
    not_player_names_regexp_remove = /\((.+)\)/g;
    loot_regexps = [
      /Loot of (.+?): (.+?)\.?$/,
      /(?:Your deeds have been noticed and )?[tT]he following items dropped by (.+?) are available in your reward chest: (.+?)\.?$/
    ];
    /*jslint regexp: false */
    //read lines
    $('#lootparser_loot_totallines').text('Analysing ' + totallines + ' lines...');
    for (x = 0; x < data.length; x++) {
      theline = $.trim(data[x]);
      lootmatch = theline.match(loot_regexps[0]);
      //regular loot
      if (lootmatch) {
        lootignore = theline.match(/\b(?:active prey bonus|boss bonus|gut charm|increased loot|boosted loot|active wealth duplex|due to low stamina|goshnar's tribute|hazard|bakragore's tribute)\b/i);
        if (!lootignore) {
          lootparser_loot_process_loot(lootmatch[1], lootmatch[2], monsters, loot_exp, loot_tem);
        }
      }
      else {
        //reward container loot
        lootmatch_rc = theline.match(loot_regexps[1]);
        if (lootmatch_rc) {
          lootignore = theline.match(/\b(?:active prey bonus|boss bonus|gut charm|increased loot|boosted loot|active wealth duplex|due to low stamina|goshnar's tribute)\b/i);
          if (!lootignore) {
            lootparser_loot_process_loot(lootmatch_rc[1], lootmatch_rc[2], monsters, loot_exp_rc, loot_tem_rc, true, stats_rc);
          }
        }
        //stats
        else {
          lootparser_loot_process_stats(theline, stats, exp_got);
        }
      }
    }
    //sort
    monsters_list = {
      killed: obj_list_sort(monsters.killed, 'creature', true),
      reward_chest: obj_list_sort(monsters.reward_chest, 'creature', true)
    };
    loot_exp_list = {};
    for (x in loot_exp) { if (loot_exp.hasOwnProperty(x)) {
      loot_exp_list[x] = obj_list_sort(loot_exp[x], 'item_w_article', true);
    } }
    loot_exp_rc_list = {};
    for (x in loot_exp_rc) { if (loot_exp_rc.hasOwnProperty(x)) {
      loot_exp_rc_list[x] = obj_list_sort(loot_exp_rc[x], 'item_w_article', true);
    } }
    for (x in loot_tem) { if (loot_tem.hasOwnProperty(x)) { got_kills = true; break; } }
    for (x in loot_tem_rc) { if (loot_tem_rc.hasOwnProperty(x)) { got_kills_rc = true; break; } }
    for (action in stats) { if (stats.hasOwnProperty(action)) { for (origin in stats[action]) { if (stats[action].hasOwnProperty(origin)) { got_stats = true; break; } } } }
    for (x in stats_rc) { if (stats_rc.hasOwnProperty(x)) { got_stats_rc = true; break; } }
    //stats
    if (got_stats) {
      for (x = 0; x < not_player_names.length; x++) { not_player_nameso[$.trim(not_player_names[x].replace(not_player_names_regexp_remove, ''))] = 0; }
      name_is_player = function (c) {
        if ((c === 'You') || (c.substr(0, 2).toLowerCase() !== 'a ' && c.substr(0, 3).toLowerCase() !== 'an ' && !not_player_nameso.hasOwnProperty(c))) { return true; }
        return false;
      };
      //cleaning data
      for (action in stats) { if (stats.hasOwnProperty(action)) {
        for (origin in stats[action]) { if (stats[action].hasOwnProperty(origin)) {
          if (origin_target[origin] === undefined) {
            tmp = name_is_player(origin);
            origin_target[origin] = tmp ? 'player' : origin.toLowerCase();
          }
          if (origin_target[origin] !== 'player') {
            if (stats_new[action][origin_target[origin]] === undefined) { stats_new[action][origin_target[origin]] = {}; }
            for (target in stats[action][origin]) { if (stats[action][origin].hasOwnProperty(target)) {
              if (origin_target[target] === undefined) {
                tmp = name_is_player(target);
                origin_target[target] = tmp ? 'player' : target.toLowerCase();
              }
              if (stats_new[action][origin_target[origin]][origin_target[target]] === undefined) { stats_new[action][origin_target[origin]][origin_target[target]] = {}; }
              for (amount in stats[action][origin][target]) { if (stats[action][origin][target].hasOwnProperty(amount)) {
                if (stats_new[action][origin_target[origin]][origin_target[target]][amount] === undefined) { stats_new[action][origin_target[origin]][origin_target[target]][amount] = 0; }
                stats_new[action][origin_target[origin]][origin_target[target]][amount] += stats[action][origin][target][amount];
              } }
            } }
          }
        } }
      } }
      got_stats = false;
      for (action in stats_new) { if (stats_new.hasOwnProperty(action)) { for (origin in stats_new[action]) { if (stats_new[action].hasOwnProperty(origin)) { got_stats = true; break; } } } }
      if (got_stats) {
        ins_tmp = '';
        for (action in stats_new) { if (stats_new.hasOwnProperty(action)) {
          stats_new_list1 = obj_list_sort(stats_new[action], 'creature2', true);
          for (listi = 0; listi < stats_new_list1.length; listi++) {
            origin = stats_new_list1[listi];
            stats_new_list2 = obj_list_sort(stats_new[action][origin], 'creature2', true);
            for (listj = 0; listj < stats_new_list2.length; listj++) {
              target = stats_new_list2[listj];
              ins_tmp += origin + '|' + action + '|' + (target === '-' ? '' : target);
              for (amount in stats_new[action][origin][target]) { if (stats_new[action][origin][target].hasOwnProperty(amount) && amount.substr(0, 1) !== '|') {
                stats_new[action][origin][target]['|' + amount] = stats_new[action][origin][target][amount];
                delete (stats_new[action][origin][target][amount]);
              } }
              stats_new_list3 = obj_list_sort(stats_new[action][origin][target], 'numeric', true);
              for (listk = 0; listk < stats_new_list3.length; listk++) {
                amount = stats_new_list3[listk];
                ins_tmp += amount + ',' + stats_new[action][origin][target][amount];
              }
              ins_tmp += '|\n';
            }
          }
        } }
      }
    }
    //stats reward chest
    if (got_stats_rc) {
      ins_rc_tmp = '';
      for (x in stats_rc) { if (stats_rc.hasOwnProperty(x)) {
        for (y in stats_rc[x]) { if (stats_rc[x].hasOwnProperty(y)) {
          ins_rc_tmp += x + '|' + stats_rc[x][y] + y + '\n';
        } }
      } }
    }
    //no data
    if (!got_kills && !got_kills_rc && !got_stats && !got_stats_rc) { $('#lootparser_loot_results').html('<b>No creatures to process!</b>'); }
    //there is data
    else {
      //experience points
      if (exp_got.val !== 0) {
        $('#lootparser_loot_totallines').closest('tr').after(
          $('<tr />', {id: 'lootparser_loot_totalexp'}).append(
            $('<td />', {colspan: '2'}).text('Experience points received on this log: ' + lootparser_numcs(exp_got.val))
          )
        );
      }
      //contents table
      lootparser_loot_process_contents_html(got_stats, got_stats_rc, monsters_list);
      //upload all
      if (got_stats || got_stats_rc || got_kills || got_kills_rc) {
        if (mw.config.get('wgUserName') !== null && mw.config.get('wgUserName') !== '' && $.inArray('autoconfirmed', mw.config.get('wgUserGroups')) !== -1) {
          lootparser_loot_process_uploadall_html();
        }
      }
      //stats
      if (got_stats) {
        lootparser_loot_process_stats_html(ins_tmp, false, got_stats);
      }
      //stats reward chest
      if (got_stats_rc) {
        lootparser_loot_process_stats_html(ins_rc_tmp, true, got_stats);
      }
      //kills
      if (got_kills || got_kills_rc) {
        lootparser_loot_process_kills_html(got_stats, got_stats_rc, monsters, monsters_list, loot_tem, loot_tem_rc, loot_exp, loot_exp_list, loot_exp_rc, loot_exp_rc_list);
      }
    }
    //execution time counter
    enddate = new Date(); endtime = enddate.getTime();
    totaltime = Math.round((endtime - starttime) * 1000);
    $('#lootparser_loot_totallines').append('<br />Calculation made in ' + (totaltime / 1000000) + ' seconds');
  },

  lootparser_add_process = function () {
    //start execution time counter
    var starttime = $.now(), endtime,
    //end execution time counter
    tmp = lootparser_add($('#lootparser_add_log1').val(), $('#lootparser_add_log2').val())[0];
    $('#lootparser_add_results').val(!tmp ? '' : tmp);
    //start execution time counter
    endtime = $.now();
    $('#lootparser_add_totaltime').html('Calculation made in ' + ((endtime - starttime) / 1000) + ' seconds');
    //end execution time counter
  },
  lootparser_add_init = function () {
    ajax_load_bar.src = "http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif";
    $('#lootparser_add').append(
      $('<div></div>', {id: 'lootparser_add_main1'}).css('display', 'none').html(
        '<div style="border-bottom-color:#aaaaaa;border-bottom-style:solid;border-bottom-width:1px;"><font size="+1">Loot Merger</font></div>' +
        'This one is provided in case you need to merge/sort some statistics.<br />' +
        'To merge statistics, copy the "old" statistics in the left box, then copy the ones that need to be added to it into the right one.<br />' +
        'To sort statistics, just left "old" statistics blank and paste the statistics to sort on the right.<br />' +
        'Note that only 1 statistics table will be processed on "New statistics" field.<br />' +
        '<table border="0">' +
        '<tr><td align="center" style="width:50%"><b>Old statistics</b></td><td>&nbsp;</td><td align="center" style="width:50%"><b>New statistics</b></td></tr>' +
        '<tr><td><textarea id="lootparser_add_log1" rows="12" cols="50" style="width:98%">' +
        '</textarea></td><td>&nbsp;</td><td>' +
        '<textarea id="lootparser_add_log2" rows="12" cols="50" style="width:98%">' +
        '</textarea></td><td>&nbsp;</td></tr></table>' +
        '<br />' +
        '<input id="lootparser_add_bp" type="button" value="Process" />' +
        '&nbsp;' +
        '<input id="lootparser_add_bc" type="button" value="Clear" />'
      ),
      $('<div></div>', {id: 'lootparser_add_main2'}).css('display', 'none').html(
        '<input id="lootparser_add_bb" type="button" value="Go back to the form" />' +
        '<br /><br />' +
        '<table><tr><td><textarea id="lootparser_add_results" rows="12" cols="60"></textarea></td></tr></table>' +
        '<br /><br />' +
        '<div id="lootparser_add_totaltime"></div>'
      )
    )
    .css({fontSize: '100%', border: '1px solid #bfcfcf', color: '#000000',
    backgroundColor: '#f9fcff', padding: '5px 10px 5px 10px', margin: '0px 0px 10px 0px'});
    $('#lootparser_add_bb').click(function () { $('#lootparser_add_main2').hide(); $('#lootparser_add_main1').show(); });
    $('#lootparser_add_bc').click(function () { $('#lootparser_add_log1, #lootparser_add_log2, #lootparser_add_results').val(''); });
    $('#lootparser_add_bp').click(function () { $('#lootparser_add_main1').hide(); $('#lootparser_add_main2').show(); lootparser_add_process(); });
    $('#lootparser_add_main1').show();
  },
  lootparser_go_back_to_form = function () {
    $('#lootparser_loot_main2').hide();
    $('#lootparser_loot_main1').show();
    $('#lootparser_loot_log').val('');
    $('#lootparser_use_version').val(current_tibia_version);
  },
  lootparser_loot_init = function () {
    var tmp = '', x;
    for (x in lootparser_tibia_versions) { if (lootparser_tibia_versions.hasOwnProperty(x)) {
      tmp += '<option value="' + x + '"' +
      (current_tibia_version === x ? ' selected="selected"' : '') +
      '>' + lootparser_tibia_versions[x] + '</option>';
    } }
    $('#lootparser_loot').append(
      $('<div></div>', {id: 'lootparser_loot_main1'}).css('display', 'none').html(
        '<div style="border-bottom-color:#aaaaaa;border-bottom-style:solid;border-bottom-width:1px;"><font size="+1">Log Analyzer/Uploader</font></div>' +
        'This page will analyse your Server Log or Loot Channel file and will then give you an overview of the creatures killed, and their loot. ' +
        'If you are logged in to wikia it will give you the option to upload statistics.<br />' +
        'All this is to make your life easier, you do not have to manually count or edit anything.<br />' +
        '<b>Copy the Server Log or Loot Channel in this box:</b><br />' +
        '<div style="text-align:center;"><textarea id="lootparser_loot_log" rows="12" cols="60" style="width:98%;"></textarea></div>' +
        '<br />' +
        '<table><tr><td>' +
        '<input id="lootparser_loot_bp" type="button" value="Process" />' +
        '&nbsp;' +
        '<input id="lootparser_loot_bc" type="button" value="Clear" />' +
        '</td><td width="10%">&nbsp;</td>' +
        '<td>Version: <select id="lootparser_use_version" size="1">' +
        tmp +
        '</select> Don\'t change this unless you are absolutely sure.</td></tr></table>'
      ),
      $('<div></div>', {id: 'lootparser_loot_main2'}).css('display', 'none').html(
        '<input id="lootparser_loot_bb" type="button" value="Go back to the form" />' + '<br /><br />' +
        '<table><tr><td id="lootparser_loot_totallines" style="width: 230px; vertical-align: top;">' +
        '</td><td>' +
        '<div id="lootparser_upload_all_td" style="display: block; width: 390px; text-align: center; padding:0px 4px; border: 2px solid #bfcfcf;"></div>' +
        '</td></table>' +
        '<div id="lootparser_loot_results"></div>'
      )
    )
    .css({fontSize: '100%', border: '1px solid #bfcfcf', color: '#000000',
    backgroundColor: '#f9fcff', padding: '5px 10px 5px 10px', margin: '0px 0px 10px 0px'});
    $('#lootparser_loot_bb').click(function () { lootparser_go_back_to_form(); });
    $('#lootparser_loot_bc').click(function () { $('#lootparser_loot_log').val(''); });
    $('#lootparser_loot_bp').click(function () { lootparser_loot_process(); });
    $('#lootparser_loot_main1').show();
  };
  //end of Code used for Loot_Statistics

  //hide bar and show loot parser
  lootparser_add_init();
  $('#lootparser_add_img').hide();
  $('#lootparser_add').show();
  lootparser_loot_init();
  $('#lootparser_loot_img').hide();
  $('#lootparser_loot').show();

}());