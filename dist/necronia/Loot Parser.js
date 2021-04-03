//<noinclude>{{protected|this page contains javascript and therefore VERY vulnerable to vandalism or hackers}}</noinclude><pre id="pre_lootparser">
/*jslint browser: true, devel: true, ass: true, eqeq: true, plusplus: true, vars: true, white: true, indent: 2 */
/*global $, wgUserName, wgUserGroups */
(function () {
'use strict';
var current_game_version = '1.24',
lootparser_game_versions = {'1.24': '1.24 to 1.24.6'},
lootparser_versions_ex =
{'1.24': {
/*changed*/
  //'Acid Blob': '1.25',
} },

lootparser_creature_special_names =
{'Arkhothep': 'Arkhothep (Creature)', 'Armenius': 'Armenius (Creature)',
'Avalanche': 'Avalanche (Creature)', 'Fish': 'Fish (Creature)', 'Gamemaster': 'Gamemaster (Creature)', 'Hacker': 'Hacker (Creature)', 'Nomad': 'Nomad (Basic)', 'Northern Pike': 'Northern Pike (Creature)', 'Mooh\'tah Warrior': 'Mooh\'Tah Warrior', 'Pythius the Rotten': 'Pythius the Rotten (Creature)', 'Thief': 'Thief (Creature)', 'Yalahari': 'Yalahari (Creature)'},/*name of the page for creatures*/

lootparser_s_words =
{
'*Knife': 'Knives', 
'*Piece of *': 'Pieces of ',
'Bunch of *': 'Bunches of ',
'Haunch of *': 'Haunches of ', 
'Flask of *': 'Flasks of ', 
'Vein of *': 'Veins of ',
'Bowl of *': 'Bowls of ', 
'*Sandwich': 'Sandwiches', 
}, /*Singular exceptions*/

lootparser_p_words =
{
'Bunches of *': 'Bunch of ',
'Cookies': 'Cookie', 
'Mushroom Pies' : 'Mushroom Pie', 
'*Pieces of *': 'Piece of ', 
'Haunches of *': 'Haunch of ', 
'Flasks of *': 'Flask of ', 
'Gooey Masses' : 'Gooey Mass', 
'Veins of *': 'Vein of ',
'Bowls of *': 'Bowl of ',
'Amethysts *': 'Amethyst ',
'Diamonds *': 'Diamond ',
'Emeralds *': 'Emerald ',
'Rubies *': 'Ruby ',
'Sapphires *': 'Sapphire ',
'Topazes *': 'Topaz ',
'Topazs *': 'Topaz ',
'Turquoises *': 'Turquoise ',
'Essences of *': 'Essence of ',
'Hands of *': 'Hand of ',
'Lumps of *': 'Lump of ',
'Stacks of *': 'Stack of ',
'River Plant Leaves': 'River Plant Leaf',
'*Teeth': 'Tooth',
'Stacks of *': 'Stack of ',
'Daggers of the Shadow': 'Dagger of the Shadow',
'Heaps of Insect Eggs': 'Insect Eggs',
'Heaps of Pollen Powder' : 'Heap of Pollen Powder',
'* Toes': ' Toe',
'(Trophy) Cyclopal': 'Cyclopal Trophy',
'Throwing Knives': 'Throwing Knife',
'Handfuls of *': 'Handful of ',
'Nuggets of *': 'Nugget of ',
'Swarms of *': 'Swarm of ',
'Dusts of *': 'Dust of ',
'Pairs of Red Fangs' : 'Red Fangs',
'Compasses' : 'Compass',
'Keys' : 'Key',
'Gears of War' : 'Gear of War',
'Pairs of Charged Scrap Covers' : 'Pair of Charged Scrap Covers',
'Terramite\'s legs' : 'Terramite Legs',
'Keys of Moltencore Chest' : 'Key of Moltencore Chest',
'Bloody Pincers' : 'Bloody Pincer',
/* should remain the same */
'Pair of Ranger Legs' : 'Pair of Ranger Legs',
'Pair of Terra Legs' : 'Pair of Terra Legs',
'Repair Tools' : 'Repair Tools',
'Handful of Swamp Mucus' : 'Handful of Swamp Mucus',
'Distorted Lump of Darkness' : 'Distorted Lump of Darkness'
}, /*Plural exceptions*/

leave_unchanged = [
'Dress',
'Grass',
'Grapes',
'Gloves',
'Leaves',
'Insides',
'Pincers',
'Lakes',
'Grains',
'Boots'
],// if item name ends with this word, parser leaves item name unchanged

lootparser_p_ends =
{'che': 'ch', 
'she': 'sh', 
'ie': 'y', 
've': 'f', 
'oe': 'o', 
'ze': 'z',}, /*Exceptions for plural endings (after removing the last 's')*/

creature_items_name_change = {
  'Acolyte of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (Second Verse)'},
  'Adept of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (Third Verse)'},
  'Annihilon': {'Rusty Armor': 'Rusty Armor (Rare)'},
  'Barbarian Brutetamer': {'Book': 'Book (Grey)'},
  'Blue Djinn': {'Book': 'Book (Blue)'},
  'Chopper': {'Dung Ball': 'Dung Ball (Quest)'},
  'Crazed Beggar': {'Rusty Armor': 'Rusty Armor (Common)'},
  'Damaged Worker Golem': {'Rusty Armor': 'Rusty Armor (Common)'},
  'Deepling Scout': {'Rusty Armor': 'Rusty Armor (Semi-Rare)'},
  'Demodras': {'Book': 'Book (Gemmed)'},
  'Dragon Lord': {'Book': 'Book (Gemmed)'},
  'Earth Elemental': {'Rusty Armor': 'Rusty Armor (Common)'},
  'Enlightened of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (Fourth Verse)'},
  'Fleshslicer': {'Dung Ball': 'Dung Ball (Quest)'},
  'Frost Dragon': {'Book': 'Book (Gemmed)'},
  'Fury': {'Rusty Legs': 'Rusty Legs (Rare)', 'Jalapeńo Pepper': 'Jalapeño Pepper'},
  'Ghastly Dragon': {'Rusty Armor': 'Rusty Armor (Rare)'},
  'Ghost': {'Book': 'Book (Orange)'},
  'Green Djinn': {'Book': 'Book (Green)'},
  'Grim Reaper': {'Rusty Armor': 'Rusty Armor (Rare)'},
  'Groam': {'Rusty Armor': 'Rusty Armor (Semi-Rare)'},
  'Hellgorak': {'Rusty Armor': 'Rusty Armor (Rare)', 'Rusty Legs': 'Rusty Legs (Rare)'},
  'Horestis': { 'Rusty Legs': 'Rusty Legs (Rare)' },
  'Iron Servant': {'Rusty Armor': 'Rusty Armor (Common)'},
  'Juggernaut': {'Rusty Armor': 'Rusty Armor (Rare)'},
  'Leviathan': {'Rusty Armor': 'Rusty Armor (Semi-Rare)', 'Rusty Legs': 'Rusty Legs (Semi-Rare)'},
  'Madareth': {'Rusty Armor': 'Rusty Armor (Rare)', 'Rusty Legs': 'Rusty Legs (Rare)'},
  'Massive Earth Elemental': {'Rusty Armor': 'Rusty Armor (Semi-Rare)'},
  'Massive Energy Elemental': {'Rusty Armor': 'Rusty Armor (Semi-Rare)'},
  'Massive Fire Elemental': {'Rusty Armor': 'Rusty Armor (Semi-Rare)'},
  'Maw': {'Dung Ball': 'Dung Ball (Quest)'},
  'Medusa': {'Rusty Armor': 'Rusty Armor (Rare)'},
  'Mindmasher': {'Dung Ball': 'Dung Ball (Quest)'},
  'Mutated Human': {'Rusty Armor': 'Rusty Armor (Common)'},
  'Novice of the Cult': {'Book': 'Book (Orange)', 'Music Sheet': 'Music Sheet (First Verse)'},
  'Ogre Brute': {'Rusty Helmet': 'Rusty Helmet (Semi-Rare)'},
  'Orc Shaman': {'Book': 'Book (Grey)'},
  'Pirate Buccaneer': {'Treasure Map': 'Treasure Map (Pirate)'},
  'Pirate Cutthroat': {'Treasure Map': 'Treasure Map (Pirate)'},
  'Pirate Marauder': {'Treasure Map': 'Treasure Map (Pirate)'},
  'Plaguesmith': {'Rusty Armor': 'Rusty Armor (Rare)'},
  'Priestess': {'Book': 'Book (Orange)'},
  'Rotspit': {'Dung Ball': 'Dung Ball (Quest)'},
  'Rustheap Golem': {'Rusty Armor': 'Rusty Armor (Rare)', 'Rusty Legs': 'Rusty Legs (Rare)'},
  'Shadowstalker': {'Dung Ball': 'Dung Ball (Quest)'},
  'Tarnished Spirit': {'Book': 'Book (Orange)'},
  'The Many': {'Egg of the Many': 'Egg of The Many'},
  'Ushuriel': {'Rusty Armor': 'Rusty Armor (Rare)'},
  'Vampire Bride': {'Rusty Armor': 'Rusty Armor (Semi-Rare)'},
  'War Golem': {'Rusty Armor': 'Rusty Armor (Semi-Rare)'},
  'Werewolf': {'Rusty Armor': 'Rusty Armor (Semi-Rare)'},
  'Worker Golem': {'Rusty Armor': 'Rusty Armor (Semi-Rare)', 'Rusty Legs': 'Rusty Legs (Semi-Rare)'},
  'Zanakeph': {'Rusty Armor': 'Rusty Armor (Rare)'},
  'Zombie': {'Rusty Armor': 'Rusty Armor (Common)'},
  'Zugurosh': {'Rusty Armor': 'Rusty Armor (Rare)', 'Rusty Legs': 'Rusty Legs (Rare)'},
  'Zulazza the Corruptor': {'Rusty Armor': 'Rusty Armor (Rare)'}
},
event_items = {
/*
item: [creatures that drop them normally]
all here needs to be lower case
*/
  '...': {},/*this is not event item and should not have any creature added to it*/
  'bunch of winterberries': {},
  'envelope from the wizards': {},
  'fireworks rocket': {},
  'party trumpet': {},
  'snowball': {'yeti': '', 'grynch clan goblin': ''},
  'party hat': {},
  'silver raid token': {},
  'golden raid token': {}
},
// ' has to be escaped like this: 'Mooh\'Tah Master',
not_player_names = ['-', 'player', 'Abyssador', 'Anmothra', 'Annihilon', 'Apocalypse', 'Apprentice Sheng', 'Arachir the Ancient One', 'Arkhothep (Creature)', 'Armenius (Creature)', 'Arthei', 'Azerus', 'Bane Lord', 'Barbaria', 'Battlemaster Zunzu', 'Bazir', 'Bibby Bloodbath', 'Big Boss Trolliver', 'Bloom of Doom', 'Bolfrim (Creature)', 'Bones', 'Boogey', 'Boreth', 'Bretzecutioner', 'Bruise Payne', 'Brutus Bloodbeard', 'Captain Jones', 'Chayenne (Creature)', 'Chikhaton', 'Chizzoron the Distorter', 'Chopper', 'Cocoon', 'Count Tofifti', 'Countess Sorrow', 'Craban (Creature)', 'Cublarc the Plunderer', 'Deadeye Devious', 'Deathbine', 'Deathstrike', 'Delany (Creature)', 'Demodras', 'Denson Larika', 'Devovorga', 'Devovorga (Invincible)', 'Dharalion', 'Diblis the Fair', 'Dirtbeard', 'Diseased Bill', 'Diseased Dan', 'Diseased Fred', 'Doctor Perhaps', 'Dracola', 'Dreadmaw', 'Earth Overlord', 'Elvira Hammerthrust', 'Energized Raging Mage', 'Energy Overlord', 'Esmeralda', 'Ethershreck', 'Evil Mastermind', 'Fahim the Wise', 'Fazzrah', 'Fernfang', 'Ferumbras', 'Fire Overlord', 'Flameborn', 'Flamecaller Zazrak', 'Fleabringer', 'Fleshcrawler', 'Fleshslicer', 'Fluffy', 'Foreman Kneebiter', 'Freegoiz', 'Fury of the Emperor', 'Furyosa', 'General Murius', 'Ghazbaran', 'Glitterscale', 'Gnomevil', 'Golgordan', 'Gorgo', 'Grand Mother Foulscale', 'Grandfather Tridian', 'Gravelord Oshuran', 'Grimrat', 'Groam', 'Grorlam', 'Hairman The Huge', 'Hatebreeder', 'Hellgorak', 'Hemming', 'Heoni', 'Hide', 'High Templar Cobrass', 'Hirintror', 'Horestis', 'Ice Overlord', 'Infernatil', 'Inky', 'Irahsae', 'Jaul', 'Jesse the Wicked', 'Kerberos', 'Koshei the Deathless', 'Kraknaknork', 'Kraknaknork\'s Demon', 'Lagatos', 'Latrivan', 'Lersatio', 'Lethal Lissy', 'Leviathan', 'Lionet (Creature)', 'Lizard Abomination', 'Lizard Gate Guardian', 'Lord of the Elements', 'Lyxoph (Creature)', 'Mad Mage', 'Mad Technomancer', 'Madareth', 'Mamma Longlegs', 'Man in the Cave', 'Marziel', 'Massacre', 'Maw', 'Mephiles', 'Merikh the Slaughterer', 'Mindmasher', 'Minishabaal', 'Mirade (Creature)', 'Monstor', 'Mooh\'Tah Master', 'Mooh\'Tah Warrior', 'Morgaroth', 'Morik the Gladiator', 'Mornenion', 'Mr. Punish', 'Munster', 'Mutated Zalamon', 'Necropharus', 'Obujos', 'Ocyakao', 'Orshabaal', 'Paiz the Pauperizer', 'Penciljack', 'Phrodomo', 'Pythius the Rotten (Creature)', 'Raging Mage', 'Rejana (Creature)', 'Renegade Orc', 'Ribstride', 'Robby the Reckless', 'Ron the Ripper', 'Rotspit', 'Rottie the Rotworm', 'Rotworm Queen', 'Rukor Zad', 'Scorn of the Emperor', 'Shadow of Boreth', 'Shadow of Lersatio', 'Shadow of Marziel', 'Shadowstalker', 'Shard of Corruption', 'Shardhead', 'Sharptooth', 'Shlorg', 'Sir Valorcrest', 'Siramal (Creature)', 'Skyrr', 'Smuggler Baron Silvertoe', 'Snake God Essence', 'Snake Thing', 'Spite of the Emperor', 'Splasher', 'Stonecracker', 'Sulphur Scuttler', 'Tanjis', 'Teleskor', 'Teneshpar', 'The Abomination', 'The Big Bad One', 'The Blightfather', 'The Bloodtusk', 'The Bloodweb', 'The Collector', 'The Count', 'The Evil Eye', 'The Frog Prince', 'The Handmaiden', 'The Horned Fox', 'The Imperor', 'The Keeper', 'The Many', 'The Mutated Pumpkin', 'The Noxious Spawn', 'The Old Whopper', 'The Old Widow', 'The Pale Count', 'The Plasmother', 'The Snapper', 'The Voice of Ruin', 'The Weakened Count', 'The Welter', 'Thul', 'Tiquandas Revenge', 'Tjured (Creature)', 'Tormentor', 'Tromphonyte', 'Tyrn', 'Ungreez', 'Ushuriel', 'Verminor', 'Versperoth', 'Vulnerable Cocoon', 'Warlord Ruzad', 'Weakened Shlorg', 'White Pale', 'Willi Wasp', 'Wrath of the Emperor', 'Xenia', 'Yaga the Crone', 'Yakchal', 'Zanakeph', 'Zarabustor', 'Zevelon Duskbringer', 'Zomba', 'Zoralurk', 'Zugurosh', 'Zulazza the Corruptor', 'Zushuka', 'Achad', 'Avalanche (Creature)', 'Axeitus Headbanger', 'Baron Brute', 'Bloodpaw', 'Bovinus', 'Coldheart', 'Colerian the Barbarian', 'Cursed Gladiator', 'Darakan the Executioner', 'Deathbringer', 'Doomhowl', 'Drasilla', 'Dreadwing', 'Fallen Mooh\'Tah Master Ghar', 'Fatality', 'Frostfur', 'Gnorre Chyllson', 'Grimgor Guteater', 'Haunter', 'Incineron', 'Kreebosh the Exile', 'Menace', 'Norgle Glacierbeard', 'Orcus the Cruel', 'Rocko', 'Rocky', 'Slim', 'Spirit of Earth', 'Spirit of Fire', 'Spirit of Water', 'Svoren the Mad', 'The Axeorcist', 'The Dark Dancer', 'The Dreadorian', 'The Hag', 'The Hairy One', 'The Masked Marauder', 'The Obliverator', 'The Pit Lord', 'Tirecz', 'Tremorak', 'Webster'],
not_player_nameso = {},
/* Code used for Loot_Statistics */
lootparser_use_version,
lootparser_use_loot2,
ajax_load_bar = new Image(),
uploading_all = 0, uploading_all_result = [], $uploading_all_to_do, uploading_all_blink = 0, uploading_all_blinks = true,
ucwords = function (str) {
/*jslint regexp: true */
  str = String(str).replace(/^(.)|\s(.)/g, function ($1) { return $1.toUpperCase(); });
/*jslint regexp: false */
  return str.replace(/( To The | In The | In A | Of The | Of A | On A | Of | The | From The | From | And )/, function ($1) { return $1.toLowerCase(); });
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
crc32 = function (g) {
/*jslint bitwise: true */
  var a, d = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D", c, e = 0, b = 0, h = 0; e = e ^ (-1); for (c = 0, a = g.length; c < a; c++) { h = (e ^ g[c]) & 255; b = "0x" + d.substr(h * 9, 8); e = (e >>> 8) ^ b; } e = e ^ (-1);
/*jslint bitwise: false */
  return e < 0 ? 4294967296 + e : e;
},
array_sort = function (inputArr, numeric, by_key, reverse, sub_key) {
  var tmp_arr = {}, valArr = [], keyArr = [], keys = [], sorter, i, k, populateArr = [],
  is_numeric = function (v) { v = parseFloat(String(v).replace('|', '')); return (typeof v === 'number' && !isNaN(v)); },
  bubbleSort;
  if (numeric === undefined) { numeric = false; }
  if (by_key === undefined) { by_key = false; }
  if (reverse === undefined) { reverse = false; }
  if (sub_key === undefined) { sub_key = ''; }
  if (numeric) { sorter = function (a, b) {
    a = parseFloat(String(a).replace('|', '')) || 0; b = parseFloat(String(b).replace('|', '')) || 0;
    return (reverse ? b - a : a - b);
  }; }
  else {
    sorter = function (a, b) {
      var x = a, y = b, tmp;
      if (!is_numeric(a) && !is_numeric(b)) {
        tmp = (function (a, b) { a = a.search(/[a-z]/); b = b.search(/[a-z]/); if ((a !== 0 && b !== 0) || a === b) { return 0; } if (a === 0) { return -1; } if (b === 0) { return 1; } }(x, y));
        if (tmp !== 0) { return tmp * (reverse ? -1 : 1); }
        if (a.search(/a[n]? /i) === 0) { a = a.substr(a.indexOf(' ') + 1); }
        if (b.search(/a[n]? /i) === 0) { b = b.substr(b.indexOf(' ') + 1); }
        if (a === b) { return 0; }
        if (a > b) { return (reverse ? -1 : 1); }
        return (reverse ? 1 : -1);
      }
      a = parseFloat(a) || 0; b = parseFloat(a) || 0; return (reverse ? b - a : a - b);
    };
  }
  if (by_key) {
/*Make a list of key names*/
    for (k in inputArr) { if (inputArr.hasOwnProperty(k)) { keys.push(k); } }
    keys.sort(sorter);
/*Rebuild array with sorted key names*/
    for (i = 0; i < keys.length; i++) { k = keys[i]; tmp_arr[k] = inputArr[k]; }
    for (i in tmp_arr) { if (tmp_arr.hasOwnProperty(i)) { populateArr[i] = tmp_arr[i]; } }
  }
  else {
    bubbleSort = function (keyArr, inputArr, sub_key) {
      var i, j, tempValue, tempKeyVal, ret;
      for (i = inputArr.length - 2; i >= 0; i--) {
        for (j = 0; j <= i; j++) {
          ret = (sub_key === '') ? sorter(inputArr[j + 1], inputArr[j]) : sorter(inputArr[j + 1][sub_key], inputArr[j][sub_key]);
          if (ret < 0) {
            tempValue = inputArr[j];
            inputArr[j] = inputArr[j + 1];
            inputArr[j + 1] = tempValue;
            tempKeyVal = keyArr[j];
            keyArr[j] = keyArr[j + 1];
            keyArr[j + 1] = tempKeyVal;
          }
        }
      }
    };
/*Get key and value*/
    for (k in inputArr) { if (inputArr.hasOwnProperty(k)) { valArr.push(inputArr[k]); keyArr.push(k); } }
/*Sort our new temporary arrays*/
    try { bubbleSort(keyArr, valArr, sub_key); } catch (e) { return false; }
/*Repopulate the old array*/
    for (i = 0; i < valArr.length; i++) { populateArr[keyArr[i]] = valArr[i]; }
  }
  return populateArr;
},

lootparser_to_singular = function (t) {
  var x, lastletter; 

  for (x in lootparser_p_words) { 
    if (lootparser_p_words.hasOwnProperty(x)) {
      if ((new RegExp('^' + x.replace(/\*/g, '.*?') + '$')).test(t)) { 
        return t.replace(x.replace(/\*/g, ''), lootparser_p_words[x]); 
      }
    } 
  }

  var last_word = t.split(/[, ]+/).pop();
  for (var y = 0; leave_unchanged.length > y; y++){
    if(leave_unchanged[y] == last_word){
      return t;
    }
  }

  lastletter = t.slice(t.length - 1);

  if (lastletter === 's') {
    t = t.slice(0, t.length - 1); /*remove the s*/

    lastletter = t.slice(t.length - 3); /*check last 3 letters*/
    if (lootparser_p_ends[lastletter] !== undefined) {
      t = t.slice(0, t.length - 3) + lootparser_p_ends[lastletter]; 
    }

    lastletter = t.slice(t.length - 2); /*check last 2 letters*/
    if (lootparser_p_ends[lastletter] !== undefined) {
      t = t.slice(0, t.length - 2) + lootparser_p_ends[lastletter]; 
    }
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
  if (encoded) { t = encodeURIComponent(t).replace(/%20/g, ' '); }
  return t;
},
/* a is item name in singular, b is item max count */
lootparser_wiki_links = function (a, b) {
  a = stripslashes(a);
  if (a === 'Empty') { return 'Empty'; }
  if (b < 2) { return '[[' + a + ']]'; }
  var ap = lootparser_to_plural(a);
  if (ap.substr(0, a.length) === a) { return '[[' + a + ']]' + ap.substr(a.length); }
  return '[[' + a + '|' + ap + ']]';
},
lootparser_array_to_wiki2 = function (inp) {
  var r, x, tmp;
  /*Sort*/
  inp = array_sort(inp, false, true);
  tmp = {'version': inp.version, 'kills': inp.kills, 'name': inp.name}; /*Excluding named parameters from sort*/
  delete inp.version; delete inp.kills; delete inp.name;
  if (inp.Empty !== undefined) { tmp.Empty = inp.Empty; delete inp.Empty; } /*Making 'Empty' the first one*/
  inp = array_sort(inp, true, false, true, 'times');
  for (x in inp) { if (inp.hasOwnProperty(x)) { tmp[x] = inp[x]; } }
  inp = tmp;
  r = '{' + '{Loot2\r\n|version=' + inp.version + '\r\n|kills=' + inp.kills + '\r\n|name=' + inp.name + '\r\n';
  for (x in inp) { if (inp.hasOwnProperty(x)) { if (typeof inp[x] === 'object') {
    r += '|' + x + ', times:' + inp[x].times +
    (inp[x].min > 0 ? (', amount:' + (inp[x].min === inp[x].max ? inp[x].min : String(inp[x].min) + '-' + String(inp[x].max))) : '') +
    (inp[x].total > 0 ? ', total:' + inp[x].total : '') + '\r\n';
  } } }
  r += '}' + '}\r\n';
  return r;
},
lootparser_array_to_wiki1 = function (inp) {
  var r, x, tmp, av_gold = 0;
  /*Sort*/
  inp = array_sort(inp, false, true);
  tmp = {'version': inp.version, 'kills': inp.kills, 'name': inp.name}; /*Excluding named parameters from sort*/
  delete inp.version; delete inp.kills; delete inp.name;
  if (inp.Empty !== undefined) { tmp.Empty = inp.Empty; delete inp.Empty; } /*Making 'Empty' the first one*/
  inp = array_sort(inp, true, false, true, 'total');
  for (x in inp) { if (inp.hasOwnProperty(x)) { tmp[x] = inp[x]; } }
  inp = tmp;
  r = '{' + '{Loot\r\n|version=' + inp.version + '\r\n|kills=' + inp.kills + '\r\n|name=' + inp.name + '\r\n';
  for (x in inp) { if (inp.hasOwnProperty(x)) { if (typeof inp[x] === 'object') {
    if (x.substr(0, 9) === 'Gold Coin') { av_gold = Math.round((inp[x].total / inp.kills) * 100) / 100; }
    r += '|' +
    lootparser_wiki_links(x, 1) +
    ', ' +
    inp[x].total +
    '\r\n';
  } } }
  r += '}' + '}\r\n' +
  '<br />Average gold: ' + av_gold;
  return r;
},

/*
Returns [<markup>, <Kills added>, <version>]
textold can be an input from a wiki textarea
textnew should be generated by lootparser_loot_process()
Gives alert and returns false on failure*/
lootparser_add = function (textold, textnew, wysiwygtag) {
  var errors = ['Wrong data in New Statistics',
                'Wrong data in Old Statistics',
                'Names of creatures doesn\'t match',
                'names/kills/version is missing'],
  textolda, textoldo, textnewa, textoldao = {}, textnewao = {}, x, tmp,
  matches, matches_len = 0, vo, vn, textold_match = false,
  out, res;
  if (wysiwygtag === undefined) { wysiwygtag = true; }
  textoldo = textold; /*original old text*/
  textnew = textnew.slice(textnew.search('{' + '{'), textnew.search('}' + '}') + 2); /*Take only the Template part*/
  lootparser_use_loot2 = (textnew.match(/\{\{Loot[2]{0,1}/).join('').indexOf('2') >= 0); /*Determine version of loot data on "new"*/
  textnew = textnew.slice(textnew.search(/\|/) + 1, textnew.search('}')); /*Take only the parameters*/
  textnewa = textnew.split(/[\s]{1,2}\|/); /*make it an array*/
  for (x in textnewa) { if (textnewa.hasOwnProperty(x) && textnewa[x] !== undefined) {/*parse values into an associative array*/
    if (textnewa[x].search('=') !== -1) {
      tmp = textnewa[x].split('='); tmp[0] = $.trim(tmp[0]);
      if (tmp[0] === 'version') { textnewao.version = $.trim(tmp[1]); }
      else if (tmp[0] === 'kills') { textnewao.kills = parseInt($.trim(tmp[1]), 10); }
      else if (tmp[0] === 'name') { textnewao.name = ucwords($.trim(tmp[1])); }
    }
    else {
      if (textnewa[x].search(',') === -1) { alert(errors[0] + '(1)'); return false; }
      textnewa[x] = $.trim((textnewa[x].substr(0, 1) === '|') ? textnewa[x].substr(1) : textnewa[x]);
/*jslint regexp: true */
      tmp = (lootparser_use_loot2 ?
            textnewa[x].match(/(.*?), ?(?:times:(\d*),? ?)(?:amount:(\d*)-?(\d*))?,? ?(?:total:(\d*))?/) :
            textnewa[x].match(/(.*?), ?(?:(\d*))?/)
      );
/*jslint regexp: false */
      if (tmp === null || tmp[1] === undefined || tmp[2] === undefined || tmp[1] === '' || tmp[2] === '') { alert(errors[0] + '(2)'); return false; }
      tmp[1] = tmp[1].split('[').join('').split(']', 1).join('').split('|', 1).join('');
      tmp[2] = parseInt(tmp[2], 10);
      textnewao[tmp[1]] = {};
      if (lootparser_use_loot2) {
        tmp[3] = (tmp[3] === undefined || tmp[3] === '') ? 0 : parseInt(tmp[3], 10);
        tmp[4] = (tmp[4] === undefined || tmp[4] === '') ? tmp[3] : parseInt(tmp[4], 10);
        tmp[5] = (tmp[5] === undefined || tmp[5] === '') ? 0 : parseInt(tmp[5], 10);
        textnewao[tmp[1]].times = tmp[2];
        textnewao[tmp[1]].min = tmp[3];
        textnewao[tmp[1]].max = tmp[4];
      }
      textnewao[tmp[1]].total = (lootparser_use_loot2 ? tmp[5] : tmp[2]);
    }
  } }
/*Looking for matching version number on textold & textnew*/
  matches = (lootparser_use_loot2 ?
            textold.match(/\{\{Loot2\s*?\|[\s]{0,1}version=[\s\S]*?[\s]{0,3}?\|[\s\S]*?\}\}(?:[\s\S]{0,20}Average [\[]{0,2}gold[\]]{0,2}:[\s]{0,3}[\d\.]*[\s]?[\w]{0,6}|[\s\S]*?)/gi) :
            textold.match(/\{\{Loot\s*?\|[\s]{0,1}version=[\s\S]*?[\s]{0,3}?\|[\s\S]*?\}\}(?:[\s\S]{0,20}Average [\[]{0,2}gold[\]]{0,2}:[\s]{0,3}[\d\.]*[\s]?[\w]{0,6}|[\s\S]*?)/gi)
  );
  for (x in matches) { if (matches.hasOwnProperty(x)) { matches_len++; } }
  if (textnewao.version !== undefined && matches_len > 0) {
    for (x in matches) { if (matches.hasOwnProperty(x) && typeof matches[x] === 'string') {/* Fix for IE*/
      vo = matches[x].match(/[\s\S]*version=([\s\S]*?)[\s]{0,3}?\|[\s\S]*/i)[1];
      vn = textnew.match(/[\s\S]*version=([\s\S]*?)[\s]{0,3}?\|[\s\S]*/i)[1];
      if (vo === vn) {
        textold_match = matches[x];
        break;
      }
    } }
  }
  if (textold_match === false) { textoldao = textnewao; }/*will insert the new loot at beginning of page*/
  else { /*will add the new loot to an existing one*/
    textold = textold_match;
    textold = textold.slice(textold.search('{' + '{'), textold.search('}' + '}') + 2); /*Take only the Template part*/
    textold = textold.slice(textold.search(/\|/) + 1, textold.search('}')); /*Take only the parameters*/
    textolda = textold.split(/[\s]{1,2}\|/);
    for (x in textolda) { if (textolda.hasOwnProperty(x) && textolda[x] !== undefined) {/*parse values into an associative array*/
      if (textolda[x].search('=') !== -1) {
        tmp = textolda[x].split('='); tmp[0] = $.trim(tmp[0]);
        if (tmp[0] === 'version') { textoldao.version = $.trim(tmp[1]); }
        else if (tmp[0] === 'kills') { textoldao.kills = parseInt($.trim(tmp[1]), 10); }
        else if (tmp[0] === 'name') {
          textoldao.name = ucwords($.trim(tmp[1]));
          if (textnewao.name !== textoldao.name) { alert(errors[2] + '(1)'); return false; }
        }
      }
      else {
        if (textolda[x].search(',') === -1) { alert(errors[1] + '(1)'); return false; }
        textolda[x] = $.trim((textolda[x].substr(0, 1) === '|') ? textolda[x].substr(1) : textolda[x]);
/*jslint regexp: true */
        tmp = (lootparser_use_loot2 ?
              textolda[x].match(/(.*?), ?times:(\d*),? ?(?:amount:(\d*)-?(\d*))?,? ?(?:total:(\d*))?/) :
              textolda[x].match(/(.*?), ?(?:(\d*))?/)
        );
/*jslint regexp: false */
        if (tmp === null || tmp[1] === undefined || tmp[2] === undefined || tmp[1] === '' || tmp[2] === '') { alert(errors[1] + '(2)'); return false; }
        tmp[1] = tmp[1].split('[').join('').split(']', 1).join('').split('|', 1).join('');
        tmp[2] = parseInt(tmp[2], 10);
        textoldao[tmp[1]] = {};
        if (lootparser_use_loot2) {
          tmp[3] = (tmp[3] === undefined || tmp[3] === '') ? 0 : parseInt(tmp[3], 10);
          tmp[4] = (tmp[4] === undefined || tmp[4] === '') ? tmp[3] : parseInt(tmp[4], 10);
          tmp[5] = (tmp[5] === undefined || tmp[5] === '') ? 0 : parseInt(tmp[5], 10);
          textoldao[tmp[1]].times = tmp[2];
          textoldao[tmp[1]].min = tmp[3];
          textoldao[tmp[1]].max = tmp[4];
        }
        textoldao[tmp[1]].total = (lootparser_use_loot2 ? tmp[5] : tmp[2]);
      }
    } }
    for (x in textnewao) { if (textnewao.hasOwnProperty(x)) {/*Sum both loots*/
      if (textoldao[x] === undefined) { textoldao[x] = textnewao[x]; }
      else if (x === 'kills') { textoldao[x] += textnewao[x]; }
      else if (x !== 'version' && x !== 'name') {
        if (lootparser_use_loot2) {
          textoldao[x].min = (textoldao[x].min === 0) ? 0 : Math.min(textoldao[x].min, textnewao[x].min);
          textoldao[x].max = (textoldao[x].max === 0) ? 0 : Math.max(textoldao[x].max, textnewao[x].max);
          textoldao[x].times = textoldao[x].times + textnewao[x].times;
        }
        textoldao[x].total = textoldao[x].total + textnewao[x].total;
      }
    } }
  }
  /*Generating wiki markup*/
  if (!textoldao.hasOwnProperty('name') || !textoldao.hasOwnProperty('kills') || !textoldao.hasOwnProperty('version')) { alert(errors[3] + '(2)'); return false; }
  out = (lootparser_use_loot2 ? lootparser_array_to_wiki2(textoldao) : lootparser_array_to_wiki1(textoldao));
  res = (!textold_match ? out + '\n\n\n' + textoldo : textoldo.replace(textold_match, out + '\n\n\n'));
  res = (wysiwygtag ? '__NOWYSIWYG__\n\n' : '') + res.replace(/__NOWYSIWYG__/g, '');
  while (res.search(/(?:\r\n|\r|\n){3,}/) !== -1) { res = res.replace(/(?:\r\n|\r|\n){3,}/g, '\n\n'); }
  while (res.search('&a' + 'mp;') !== -1) { res = res.replace('&a' + 'mp;', '&'); }
  while (res.search('&l' + 't;') !== -1) { res = res.replace('&l' + 't;', '<'); }
  while (res.search('&g' + 't;') !== -1) { res = res.replace('&g' + 't;', '>'); }
  while (res.search('<p />') !== -1) { res = res.replace('<p />', ''); }
  return [res, textnewao.kills, textnewao.version];
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
    var x, allerrors = true, error_count = 0, idn;
    if (uploading_all > 0) {
      idn = id.split('block');/*lootparser_stats_block/lootparser_loot_block1*/
      idn = parseInt(idn[idn.length - 1], 10) || 0;
      uploading_all_result.push(is_error ? [msg, idn] : ['', '']);
      if (uploading_all_result.length === uploading_all) {
        uploading_all = 0;
        for (x = 0; x < uploading_all_result.length; x++) {
          if (uploading_all_result[x][0] === '') { allerrors = false; }
          else { error_count++; }
        }
        $('.lootparser_loot_up').first().click();
        if (allerrors) {
          $('#lootparser_upload_all_t').html('"Upload All" finished, nothing was uploaded because of errors,<br />try to reload the page.');
        }
        else {
          if (error_count > 0) { for (x = 0; x < uploading_all_result.length; x++) {
            $('#lootparser_loot_results0 a[href="#' + (uploading_all_result[x][1] === 0 ? 'Creature_Statistics' : 'lootparser_creature_' + uploading_all_result[x][1]) + '"]')
            .css('background-color', '#F0D2D2');
          } }
          $('#lootparser_upload_all_t').html(
            '"Upload All" finished,<br />' +
            (error_count === 0 ?
            'everything was uploaded correctly.' :
            (error_count === 1 ? 'there was 1 errror' : 'there were ' + error_count + ' errors') +
            '. Scroll down to upload the missing statistics.')
          );
        }
        $('input[id^="lootparser_loot_combined_c"], #lootparser_stats_c').parent().hide();
        uploading_all_blink = 15;
        $('input[id^="lootparser_loot_combined_b"], input[id^="lootparser_loot_combined_c"]')
        .add('#lootparser_stats_b, #lootparser_stats_c')
        .add('#lootparser_upload_all')
        .removeAttr('disabled');
      }
      else { multi_upload_click(); }
    }
  },
  enable_controls = function () {
    if (uploading_all === 0) {
      $('input[id^="lootparser_loot_combined_b"], input[id^="lootparser_loot_combined_c"]')
      .add('#lootparser_stats_b, #lootparser_stats_c')
      .add('#lootparser_upload_all')
      .removeAttr('disabled');
      if (is_error) {
        $('#' + id).closest('td').next().find(':checkbox').attr('checked', 'checked');
      }
    }
    else { check_uploading_all(); }
  },
  idn;
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
    idn = id.split('block');/*lootparser_stats_block/lootparser_loot_block1*/
    idn = parseInt(idn[idn.length - 1], 10) || 0;
    $('#lootparser_loot_results0 a[href="#' + (idn === 0 ? 'Creature_Statistics' : 'lootparser_creature_' + idn) + '"]')
    .css('background-color', '');
  }
},
upload_to_wikia = function (div_id) {
  var $tmp, tmp, parser_text, user_modified = false, creature, token, basetimestamp, page_text, new_page_text, summary,
  ta_multi_version_no_ok_wrong = 0, ta_version_ok = false, cvtext, vdata,
  request_end = function (msg, is_error) {
    if (is_error === undefined) { is_error = true; }
    if (is_error) {
      $('#lootparser_loot_combined_b' + div_id).parent().show();
    }
    upload_to_wikia_end('lootparser_loot_block' + div_id, (msg === undefined) ? '' : msg, is_error);
  },
  lootparser_ajax_check_upload = function () {
    var errort = 'There was a problem uploading statistics for ' + creature.replace(/_/g, ' ') + ', try again.',
    captcha = '';
    page_text = $.trim(page_text);
    parser_text = parser_text.slice(parser_text.search('{' + '{'), parser_text.search('}' + '}') + 2); /*Take only the Template part*/
    if ((new_page_text = lootparser_add(page_text, parser_text)) === false) { request_end(errort); }
    else {
      summary = new_page_text[1] + ' kills added with loot parser' + (user_modified ? '.' : '') + ' (' + new_page_text[2] + ')';
      new_page_text = new_page_text[0];
      $.ajax({
        url: '/api.php', type: 'POST', dataType: 'json',
        data : {
          'action': 'edit', 'title': 'Loot_Statistics:' + lootparser_pagename(creature, true, false), 'format': 'json',
          'summary': summary, 'text': new_page_text,
          'token': token, 'basetimestamp': basetimestamp, 'minor': 'minor'
        },
        error: function () { request_end(errort); },
        success: function (obj) {
          var $parent_td, last_scrolltop;
          if (obj.hasOwnProperty('edit') && obj.edit.hasOwnProperty('result')) {
            if (obj.edit.result === 'Success') {
              request_end('You added current loot view to the statistics page for:\n' + creature.replace(/_/g, ' '), false);
            }
            else if (obj.edit.result === 'Failure' && obj.edit.hasOwnProperty('captcha')) {
              $parent_td = $('#lootparser_loot_combined_b' + div_id).parent().parent();
              $parent_td.append(
                $('<img />', {'alt': 'captcha', 'id': 'lootparser_captcha_img', 'src': obj.edit.captcha.url}).css({'border': '2px ridge black'})
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
    $.ajax({
      url: '/api.php', type: 'GET', dataType: 'json',
      data : {
        'action': 'query', 'titles': 'Loot_Statistics:' + lootparser_pagename(creature, true, false), 'format': 'json',
        'rvprop': 'content', 'prop': 'info|revisions', 'intoken': 'edit'
      },
      error: function () { request_end(errort); },
      success: function (obj) {
        var x;
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
    });
  },
  lootparser_ajax_start = function () {
    var errort = 'There was a problem getting current statistics for ' + creature.replace(/_/g, ' ') + ', try again.';
    $.ajax({
      url: '/api.php', type: 'GET', dataType: 'json',
      data : {
        'action': 'query', 'titles': 'Loot_Statistics:' + lootparser_pagename(creature, true, false), 'format': 'json',
        'prop': 'info|revisions', 'intoken': 'edit'
      },
      error: function () { request_end(errort); },
      success: function (obj) {
        var x;
        for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
          token = obj.query.pages[x].edittoken;
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
    });
  };
  /*Disabling buttons, overlay div*/
  $('#lootparser_loot_combined_c' + div_id).removeAttr('checked');
  $('#lootparser_loot_combined_b' + div_id + ', #lootparser_loot_combined_c' + div_id).attr('disabled', 'disabled');
  $('input[id^="lootparser_loot_combined_b"], input[id^="lootparser_loot_combined_c"]')
  .add('#lootparser_stats_b, #lootparser_stats_c')
  .add('#lootparser_upload_all').attr('disabled', 'disabled');
  $('#lootparser_loot_combined_b' + div_id).parent().hide();
  if ($('#lootparser_loot_block' + div_id).size() === 0) {
    $tmp = $('#lootparser_loot_results' + div_id).find('textarea:first');
    $tmp.after(
    $('<div></div>', {'id': 'lootparser_loot_block' + div_id}).css({
      'display': 'none', 'opacity': 0, 'position': 'absolute',
      'top': $tmp.position().top + 'px', 'left': $tmp.position().left + 'px',
      'width': $tmp.outerWidth() + 'px', 'height': $tmp.outerHeight() + 'px', 'background-color': '#666666', 'text-align': 'center'
    })
    .html('<p style="font-size:xx-large;font-weight:bolder;font-family:Arial;color:white"><br />Uploading<br /><br /><img src="https://hydra-media.cursecdn.com/necronia.gamepedia.com/d/de/Ajax_Load_Bar.gif" alt="Uploading" /></p><br />')
  ); }
  $('#lootparser_loot_block' + div_id).fadeTo(400, 0.8);

  parser_text = $('#lootparser_loot_combined' + div_id).val();
  if ($('#lootparser_loot_combined' + div_id).data('crc32') !== crc32(parser_text)) { user_modified = true; }

  if ((tmp = parser_text.match(/\{\{[\s\S]*?name=([\s\S]*?)\|[\s\S]*?\}\}/i)) === null) {
    request_end('There was a problem getting statistics from parser page.');
  }
  else {
    creature = ucwords($.trim(tmp[1])).replace(/ /g, '_');
    ta_multi_version_no_ok_wrong = 0; ta_version_ok = false; vdata = parser_text.match(/version\s*?=\s*?([.\d]{3,5})/i);
    if (vdata === null) { request_end('Version info couldn\'t be found, please verify in case you manually edited the statistics.'); }
    else {
      if (lootparser_game_versions.hasOwnProperty(vdata[1])) { ta_version_ok = true; }
      cvtext = lootparser_game_versions[current_game_version];
      if (lootparser_versions_ex.hasOwnProperty(lootparser_use_version) &&
      lootparser_versions_ex[lootparser_use_version].hasOwnProperty(creature.replace(/_/g, ' '))) {
        ta_multi_version_no_ok_wrong  = (vdata[1] === lootparser_versions_ex[lootparser_use_version][creature.replace(/_/g, ' ')] ? 1 : 2);
      }
      if (ta_multi_version_no_ok_wrong === 2) {
        request_end('There is no LOOT VERSION "' + vdata[1] + '"' + ' for ' + '"' + (creature.replace(/_/g, ' ')) + '"' +
          '\n\nCurrent LOOT VERSION for this creature is ' +
          lootparser_versions_ex[current_game_version][creature.replace(/_/g, ' ')] +
          '\n\nThe parser should give the correct version always,' +
          '\nif you have any doubts about versions you can check\nthe Talk page of the parser.' +
          '\n\nYou can review the version info and try to upload again.'
        );
      }
      else if (ta_multi_version_no_ok_wrong === 0 && !ta_version_ok) {
        request_end('There is no LOOT VERSION "' + vdata[1] + '"' + ' for ' + '"' + (creature.replace(/_/g, ' ')) + '"' +
          '\n\nCurrent LOOT VERSION for this creature is ' +
          current_game_version +
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

lootparser_loot_process = function () {
/*Clean*/
    $('#lootparser_loot_results, #lootparser_loot_totallines').empty();
    $('#lootparser_loot_totalexp').remove();
    $('#lootparser_upload_all_td').empty().css('border', 'none');
/*Display*/
    $('#lootparser_loot_main1').hide(); $('#lootparser_loot_main2').show();
/*Scroll*/
  $('html, body').scrollTop($("#lootparser_loot_main2").offset().top - 10);
/*
monsters[a_monster_name] = amount_killed
loot_exp[a_monster_name][A_Item_Name] = repetitions
loot_tem[Monster_Name][Item_Name][min/max/total/times] = val
*/
  lootparser_use_version = $('#lootparser_use_version').val();
  lootparser_use_loot2 = (parseFloat(lootparser_use_version, 10) > parseFloat(0, 10)); // guwno

  /*time counter */
  var startdate = new Date(), starttime = startdate.getTime(), enddate, endtime, totaltime,

  monsters = {}, loot_exp = {}, loot_tem = {}, loot_tmp = {}, /*temp loot info for template*/
  data = $.trim($('#lootparser_loot_log').val()).replace(/\./g,'').replace(/\[Loot\s\|\s/g, "Loot of ").split("\n"),
  totallines = data.length,

  x, y, theline, line,
  lootmatch, loot, monster, amonster,
  itemlooted, aitemlooted, amount,
  removed_event_items, remove_this_item,

  ins_tmp, tmp, line_start, origin, target, action, origin_target = {}, stats = {'heal': {}, 'damage': {}}, stats_new = {'heal': {}, 'damage': {}},
  exp_got = 0,

  got_stats, name_is_player, in_tmp, i, i_creat,

  killed, k1, k2, monstername, id_inc, tmp_version;

  for (x = 0; x < not_player_names.length; x++) { not_player_nameso[$.trim(not_player_names[x].replace(/\((creature|invincible)\)/gi, ''))] = 0; }

  $('#lootparser_loot_totallines').text('Analysing ' + totallines + ' lines...');

  for (x = 0; x < data.length; x++) {
    theline = $.trim(data[x]).replace(/]/,'').replace(/\[/g,'(').replace(/\]/g,')');
    lootmatch = theline.indexOf('Loot of ');
    if (lootmatch !== -1) {
      line = theline.substr(lootmatch + 8);
      loot = line.substr(line.indexOf(':') + 2);
      amonster = line.slice(0, line.indexOf(':'));
      if (monsters[amonster] === undefined) { monsters[amonster] = 0; loot_tem[amonster] = {}; loot_exp[amonster] = {}; }
      monsters[amonster]++;
      loot_tmp = {};
      loot =  loot.split(',');
      removed_event_items = 0;
      for (y = 0; y < loot.length; y++) {
        remove_this_item = false;
        aitemlooted = ucwords($.trim(loot[y])); /*capitalized name of the looted item with amount*/
        amount = parseInt(aitemlooted.match(/^a[n]? /i) ? 1 : (aitemlooted.match(/^\d+ /i) ? aitemlooted.match(/^\d+ /i) : 0), 10);
        itemlooted = aitemlooted.substr((amount > 0) ? aitemlooted.indexOf(' ') + 1 : 0);
        itemlooted = (amount >= 1) ? lootparser_to_singular(itemlooted) : itemlooted; /*capitalized name of the looted item*/
        /*event_items*/
        if (event_items.hasOwnProperty(itemlooted.toLowerCase())) {
          monster = (amonster.match(/^a[n]? /i) ? amonster.substr(amonster.indexOf(' ') + 1) : amonster).toLowerCase();
          if (!event_items[itemlooted.toLowerCase()].hasOwnProperty(monster)) {
            removed_event_items++;
            if (removed_event_items !== loot.length || loot.length - 1 !== y) { remove_this_item = true; }
            else { amount = 0; aitemlooted = itemlooted = 'Nothing'; }
          }
        }
        if (!remove_this_item) {
          /*loot_exp*/
          if (loot_exp[amonster][aitemlooted] === undefined) { loot_exp[amonster][aitemlooted] = 0; }
          loot_exp[amonster][aitemlooted]++;

          if (lootparser_use_loot2) {
            /*creature_items_name_change exception*/
            monstername = ucwords(amonster.match(/^a[n]? /i) ? amonster.substr(amonster.indexOf(' ') + 1) : amonster);
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

          /*loot_tmp*/
          if (loot_tmp[itemlooted] === undefined) { loot_tmp[itemlooted] = 0; }
          loot_tmp[itemlooted] += amount;
        }
      }
      for (y in loot_tmp) { if (loot_tmp.hasOwnProperty(y)) {/*loot_tem*/
        if (lootparser_use_loot2) { if (y === 'Nothing') { y = 'Empty'; } }
        if (loot_tem[amonster][y] === undefined) { loot_tem[amonster][y] = {}; }
        if (loot_tem[amonster][y].total === undefined) { loot_tem[amonster][y].total = 0; }
        loot_tem[amonster][y].total += loot_tmp[y];
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
    }
    else {/*statistics*/
      tmp = [];
      line = theline.substr(0, theline.length - (theline.substr(theline.length - 1) === '.' ? 1 : 0));
      line_start = line.substr(2, 1) === ':' ? 6 : 0;
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
        exp_got += (parseInt(line.slice(tmp[0] + 11, tmp[1]), 10) || 0);
      }
    }
  }
  /*Sort*/
  monsters = array_sort(monsters, false, true);
  for (x in loot_exp) { if (loot_exp.hasOwnProperty(x)) { loot_exp[x] = array_sort(loot_exp[x], false, true); } }
  killed = false; got_stats = false;
  for (x in loot_tem) { if (loot_tem.hasOwnProperty(x)) { killed = true; break; } }
  for (action in stats) { if (stats.hasOwnProperty(action)) { for (origin in stats[action]) { if (stats[action].hasOwnProperty(origin)) {
    got_stats = true; break;
  } } } }
  if (got_stats) {/*statistics*/
    name_is_player = function (c) {
      if ((c === 'You') || (c.substr(0, 2).toLowerCase() !== 'a ' && c.substr(0, 3).toLowerCase() !== 'an ' && !not_player_nameso.hasOwnProperty(c))) { return true; }
      return false;
    };
    for (action in stats) { if (stats.hasOwnProperty(action)) {/*cleaning data*/
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
    got_stats = false; for (action in stats_new) { if (stats_new.hasOwnProperty(action)) { for (origin in stats_new[action]) { if (stats_new[action].hasOwnProperty(origin)) {
      got_stats = true; break;
    } } } }
    if (got_stats) {
      ins_tmp = '';
      for (action in stats_new) { if (stats_new.hasOwnProperty(action)) {
        stats_new[action] = array_sort(stats_new[action], false, true);
        for (origin in stats_new[action]) { if (stats_new[action].hasOwnProperty(origin)) {
          stats_new[action][origin] = array_sort(stats_new[action][origin], false, true);
          for (target in stats_new[action][origin]) { if (stats_new[action][origin].hasOwnProperty(target)) {
            ins_tmp += origin + '|' + action + '|' + (target === '-' ? '' : target);
            for (amount in stats_new[action][origin][target]) { if (stats_new[action][origin][target].hasOwnProperty(amount) && amount.substr(0, 1) !== '|') {
              stats_new[action][origin][target]['|' + amount] = stats_new[action][origin][target][amount];
              delete (stats_new[action][origin][target][amount]);
            } }
            stats_new[action][origin][target] = array_sort(stats_new[action][origin][target], true, true);
            for (amount in stats_new[action][origin][target]) { if (stats_new[action][origin][target].hasOwnProperty(amount)) {
              ins_tmp += amount + ',' + stats_new[action][origin][target][amount];
            } }
            ins_tmp += '|\n';
          } }
        } }
      } }
    }
  }
  if (!killed && !got_stats) { $('#lootparser_loot_results').html('<b>No monsters to process!</b>'); }
  else {
    if (exp_got !== 0) {
      $('#lootparser_loot_totallines').closest('tr').after(
        $('<tr />', {'id': 'lootparser_loot_totalexp'}).append(
          $('<td />', {'colspan': '2'}).text('Experience points received on this log: ' + lootparser_numcs(exp_got))
        )
      );
    }
    in_tmp = ''; i = 0; i_creat = 1;
    if (got_stats) {
      in_tmp += '<td style="vertical-align:top;padding: 0px 2px 2px 2px;"><table>' +
      '<tr><td><a href="#Creature_Statistics">Creature Statistics</a></td></tr>' + "\r\n";
      i++;
    }
    for (x in monsters) { if (monsters.hasOwnProperty(x)) {/*Contents*/
      if ((i / 15) === Math.floor(i / 15)) {
        if (i !== 0) { in_tmp += '</table></td>'; }
        in_tmp += '<td style="vertical-align:top;padding: 0px 2px 2px 2px;' + (i !== 0 ? 'border-left:1px solid #AAA;' : '') + '"><table>';
      }
      in_tmp += '<tr><td><a href="#lootparser_creature_' + i_creat + '">' + encodeURIComponent(x).replace(/%20/g, ' ') + '</a></td></tr>' + "\r\n";
      i++; i_creat++;
    } }
    in_tmp += "</table></td></tr></table><br />";
    in_tmp = '<br /><table style="background-color:#000;border:1px solid #AAA;font-size:95%"><tr><th colspan="' + (Math.floor(i / 15) + 1) + '">Contents</th></tr><tr>' + "\r\n" + in_tmp;
    $('#lootparser_loot_results').append(
      $('<div></div>', {'id': 'lootparser_loot_results0'}).css('position', 'relative').html(in_tmp)
    );

    if (got_stats || killed) {
      if (wgUserName !== null && wgUserName !== '' && $.inArray('autoconfirmed', wgUserGroups) !== -1) {
        $('#lootparser_upload_all_td').append(
          $('<input />', {'type': 'button', 'value': 'Upload All', 'id': 'lootparser_upload_all'})
          .css({'margin-right': '10px'}),
          $('<span />', {'id': 'lootparser_upload_all_t'})
        );
      }
    }
    if (got_stats) {
      in_tmp = '<a href="#Parser" class="lootparser_loot_up" style="float: right;">top</a><a name="Creature_Statistics"></a><b>Creature heal and damage statistics:</b>';
      in_tmp += '<br /><table style="width: 100%;">' + '<tr><td>' +
      '<a href="/wiki/NecroniaWiki:Creature_Statistics" target="_blank">NecroniaWiki:Creature_Statistics</a>' +
      '<i style="margin-left: 150px;">Code:</i>' +
      '</td>' + '<td>&nbsp;' + '</td>' + '</tr>' +
      '<tr><td>' +
      '<textarea rows="12" cols="50" id="lootparser_stats_t" readonly="readonly" >' +
      ins_tmp +
      '</textarea></td>' +
      '<td style="vertical-align: bottom; text-align: center;">' +
      ((wgUserName !== null && wgUserName !== '') ?
        '<div>' +
        '<span>' +
        (($.inArray('autoconfirmed', wgUserGroups) !== -1) ?
          '<input type="checkbox" value="1" checked="checked" id="lootparser_stats_c" /><span> Include in "Upload All"</span>' +
          '<br />or<br />' :
          ''
        ) +
        '</span>' +
        '<input type="button" value="Upload Now" id="lootparser_stats_b" /></div>' :
        '&nbsp;'
      ) +
      '</td>' +
      '</tr></table><hr />';
      $('#lootparser_loot_results').append(
        $('<div></div>', {'id': 'lootparser_stats_results'}).css('position', 'relative').html(in_tmp)
      );
      $('#lootparser_stats_b').click(function () {
        var $tmp, request_error = function () {
          $('#lootparser_stats_b').parent().show();
          upload_to_wikia_end('lootparser_stats_block', 'There was an error uploading the Creature Statistics, try again.', true);
        };

        $('#lootparser_stats_c').removeAttr('checked');
        $('input[id^="lootparser_loot_combined_b"], input[id^="lootparser_loot_combined_c"]')
        .add('#lootparser_stats_b, #lootparser_stats_c')
        .add('#lootparser_upload_all').attr('disabled', 'disabled');
        $('#lootparser_stats_b').parent().hide();
        if ($('#lootparser_stats_block').size() === 0) {
          $tmp = $('#lootparser_stats_results').find('textarea:first');
          $tmp.after(
            $('<div></div>', {'id': 'lootparser_stats_block'})
              .css({
                'display': 'none', 'opacity': 0, 'position': 'absolute',
                'top': $tmp.position().top + 'px', 'left': $tmp.position().left + 'px',
                'width': $tmp.outerWidth() + 'px', 'height': $tmp.outerHeight() + 'px', 'background-color': '#666666', 'text-align': 'center'
              })
              .html('<p style="font-size:xx-large;font-weight:bolder;font-family:Arial;color:white"><br />Uploading<br /><br /><img src="https://hydra-media.cursecdn.com/necronia.gamepedia.com/d/de/Ajax_Load_Bar.gif" alt="Uploading" /></p><br />')
          );
        }
        $('#lootparser_stats_block').fadeTo(400, 0.8);
        $.ajax({
          url: '/api.php', type: 'GET', dataType: 'json',
          data : {
            'action': 'query', 'titles': 'NecroniaWiki:Creature_Statistics/Statistics', 'format': 'json',
            'prop': 'info', 'intoken': 'edit'
          },
          error: request_error, success: function (obj) {
            var x, token;
            for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
              token = obj.query.pages[x].edittoken;
              break;
            } }
            $.ajax({
              url: '/api.php', type: 'POST', dataType: 'json',
              data : {
                'action': 'edit', 'title': 'NecroniaWiki:Creature_Statistics/Statistics', 'format': 'json',
                'section': 'new', 'text': $('#lootparser_stats_t').val(),
                'token': token, 'minor': 'minor'
              },
              error: request_error, success: function (obj) {
                if (obj.edit !== undefined && obj.edit.result !== undefined
                && obj.edit.result === 'Success') {
                  upload_to_wikia_end('lootparser_stats_block', 'You uploaded the Creature Statistics.');
                }
                else { request_error(); }
              }
            });
          }
        });
      });
    }
    if (killed) {
      id_inc = 1;
      for (k1 in monsters) { if (monsters.hasOwnProperty(k1)) {/*lists and markup*/
        in_tmp = '<a href="#Parser" class="lootparser_loot_up" style="float: right;">top</a><a name="lootparser_creature_' + id_inc + '"></a>' +
                 '<b>Killed ' + monsters[k1] + 'x ' + encodeURIComponent(k1).replace(/%20/g, ' ') + ', which dropped:</b>' +
                 ' <input id="lootparser_loot_showhide' + id_inc + '" type="button" value="Show" />' +
                 '<br /><div style="display: none;" id="lootparser_loot_results_list' + id_inc + '">';
        for (k2 in loot_exp[k1]) { if (loot_exp[k1].hasOwnProperty(k2)) {
          in_tmp += loot_exp[k1][k2] + 'x ' + encodeURIComponent(stripslashes(k2.toLowerCase())).replace(/%20/g, ' ') + '<br />\r\n';
        } }
        in_tmp += '</div>';
        monstername = ucwords(k1.match(/^a[n]? /i) ? k1.substr(k1.indexOf(' ') + 1) : k1);
        in_tmp += '<table style="width: 100%;">' + '<tr>' + '<td>' +
        '<a href="/Loot_Statistics:' + lootparser_pagename(monstername, true) + '" target="_blank">Loot_Statistics:' + lootparser_pagename(monstername, false) + '</a>' +
        '<i style="margin-left: 150px;">Wiki markup:</i>' +
        '</td>' + '<td>&nbsp;' + '</td>' + '</tr>' +
        '<tr><td>' +
        '<textarea rows="12" cols="55" id="lootparser_loot_combined' + id_inc + '" readonly="readonly">';
        tmp_version = lootparser_use_version; //for multi version exception list
        if (lootparser_versions_ex.hasOwnProperty(tmp_version) && lootparser_versions_ex[tmp_version].hasOwnProperty(monstername)) {
          tmp_version = lootparser_versions_ex[tmp_version][monstername];
        }
        loot_tem[k1].version = tmp_version; loot_tem[k1].kills = monsters[k1]; loot_tem[k1].name = monstername;
        in_tmp += (lootparser_use_loot2 ? lootparser_array_to_wiki2(loot_tem[k1]) : lootparser_array_to_wiki1(loot_tem[k1]));
        in_tmp += '</textarea></td>' +
        '<td style="vertical-align: bottom; text-align: center;">' +
        ((wgUserName !== null && wgUserName !== '') ?
          '<div>' +
          '<span>' +
          (($.inArray('autoconfirmed', wgUserGroups) !== -1) ?
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
        $('#lootparser_loot_results').append(
          $('<div></div>', {'id': 'lootparser_loot_results' + id_inc}).css('position', 'relative').html(in_tmp)
        );
        $('#lootparser_loot_combined' + id_inc).data('crc32', crc32($('#lootparser_loot_combined' + id_inc).val()));
        id_inc++;
      } }
      $('input[id^="lootparser_loot_combined_b"]').click(function () {
        upload_to_wikia(parseInt($(this).attr('id').replace(/lootparser_loot_combined_b/, ''), 10));
      });
      $('input[id^="lootparser_loot_showhide"]').toggle(
        function () {
          var i = $(this).val('Hide').attr('id').replace(/lootparser_loot_showhide/, '');
          $('#lootparser_loot_results_list' + i).show();
          $(this).nextAll('table:first').find('div[id^="lootparser_loot_block"]:first').each(function () {
            $(this).css('top', $(this).prev().position().top + 'px');
          });
        }, function () {
          var i = $(this).val('Show').attr('id').replace(/lootparser_loot_showhide/, '');
          $('#lootparser_loot_results_list' + i).hide();
          $(this).nextAll('table:first').find('div[id^="lootparser_loot_block"]:first').each(function () {
            $(this).css('top', $(this).prev().position().top + 'px');
          });
        }
      );
      $('a.lootparser_loot_up').click(function () {
        $('html, body').scrollTop($("#lootparser_loot_main2").offset().top - 10);
        return false;
      });
    }
    $('#lootparser_upload_all').click(function () {
      $(this).attr('disabled', 'disabled').hide();
      $uploading_all_to_do = $('#lootparser_stats_b:enabled, input[id^="lootparser_loot_combined_b"]:enabled').filter(function () {
        return $(this).parent().find('input:checkbox').is(':checked');
      });
      if ($uploading_all_to_do.size() === 0) {
        $('#lootparser_upload_all_t').text('No stats selected to be included.');
        $(this).removeAttr('disabled').show();
      }
      else {
        uploading_all_result = [];
        uploading_all_blink = 0;
        var anikeep = function () {
          if (uploading_all_blink > 0) { uploading_all_blink -= 2; }
          uploading_all_blinks = !uploading_all_blinks;
          $('#lootparser_upload_all_td').css({'border': '2px solid #' + (uploading_all_blinks ? '006CB0' : '00C9FF')});
          if (uploading_all_blink < 0) {
            uploading_all_blink = 0;
            $('#lootparser_upload_all_td').css({'border': '2px solid #006CB0'});
          }
          else if ($('#lootparser_upload_all').size()) { setTimeout(anikeep, 400); }
        };
        anikeep();
        uploading_all = $uploading_all_to_do.size();
        multi_upload_click();
      }
    });
  }
  /*execution time counter */
  enddate = new Date(); endtime = enddate.getTime();
  totaltime = Math.round((endtime - starttime) * 1000);
  $('#lootparser_loot_totallines').append('<br />Calculation made in ' + (totaltime / 1000000) + ' seconds');
},

lootparser_add_process = function () {
/* start execution time counter */
  var startdate = new Date(), starttime = startdate.getTime(), endtime, enddate, totaltime,
/* end execution time counter */
  tmp = lootparser_add($('#lootparser_add_log1').val(), $('#lootparser_add_log2').val())[0];
  $('#lootparser_add_results').val(!tmp ? '' : tmp);
/* start execution time counter */
  endtime = new Date();
  enddate = endtime.getTime();
  totaltime = Math.round((endtime - starttime) * 1000);
  $('#lootparser_add_totaltime').html('Calculation made in ' + (totaltime / 1000000) + ' seconds');
/* end execution time counter */
},
lootparser_add_init = function () {
  ajax_load_bar.src = "https://hydra-media.cursecdn.com/necronia.gamepedia.com/d/de/Ajax_Load_Bar.gif";
  $('#lootparser_add').append(
    $('<div></div>', {'id': 'lootparser_add_main1'}).css('display', 'none').html(
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
    $('<div></div>', {'id': 'lootparser_add_main2'}).css('display', 'none').html(
      '<input id="lootparser_add_bb" type="button" value="Go back to the form" />' +
      '<br /><br />' +
      '<table><tr><td><textarea id="lootparser_add_results" rows="12" cols="60"></textarea></td></tr></table>' +
      '<br /><br />' +
      '<div id="lootparser_add_totaltime"></div>'
    )
  )
  .css({'font-size': '100%', 'border': '1px solid #bfcfcf', 'color': '#FFF',
        'background-color': '#0B1D2F', 'padding': '5px 10px 5px 10px', 'margin': '0px 0px 10px 0px'});
  $('#lootparser_add_bb').click(function () { $('#lootparser_add_main2').hide(); $('#lootparser_add_main1').show(); });
  $('#lootparser_add_bc').click(function () { $('#lootparser_add_log1, #lootparser_add_log2, #lootparser_add_results').val(''); });
  $('#lootparser_add_bp').click(function () { $('#lootparser_add_main1').hide(); $('#lootparser_add_main2').show(); lootparser_add_process(); });
  $('#lootparser_add_main1').show();
},
lootparser_go_back_to_form = function () {
  $('#lootparser_loot_main2').hide();
  $('#lootparser_loot_main1').show();
  $('#lootparser_loot_log').val('');
  $('#lootparser_use_version').val(current_game_version);
},
lootparser_loot_init = function () {
  var tmp = '', x;
  for (x in lootparser_game_versions) { if (lootparser_game_versions.hasOwnProperty(x)) {
    tmp += '<option value="' + x + '"' +
    (current_game_version === x ? ' selected="selected"' : '') +
    '>' + lootparser_game_versions[x] + '</option>';
  } }
  $('#lootparser_loot').append(
    $('<div></div>', {'id': 'lootparser_loot_main1'}).css('display', 'none').html(
      '<div style="border-bottom-color:#aaaaaa;border-bottom-style:solid;border-bottom-width:1px;"><font size="+1">Log Analyzer/Uploader</font></div>' +
      'This page will analyse your Server Log file and will then give you an overview of the monsters killed, and their loot. ' +
      'If you are logged in to wikia it will give you the option to upload statistics.<br />' +
      'All this is to make your life easier, you do not have to manually count or edit anything.<br />' +
      '<b>Copy the Server Log in this box:</b><br />' +
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
    $('<div></div>', {'id': 'lootparser_loot_main2'}).css('display', 'none').html(
      '<input id="lootparser_loot_bb" type="button" value="Go back to the form" />' + '<br /><br />' +
      '<table><tr><td id="lootparser_loot_totallines" style="width: 230px; vertical-align: top;">' +
      '</td><td>' +
      '<div id="lootparser_upload_all_td" style="display: block; width: 390px; text-align: center; padding:0px 4px; border: 2px solid #bfcfcf;"></div>' +
      '</td></table>' +
      '<div id="lootparser_loot_results"></div>'
    )
  )
  .css({'font-size': '100%', 'border': '1px solid #bfcfcf', 'color': '#FFF',
        'background-color': '#0B1D2F', 'padding': '5px 10px 5px 10px', 'margin': '0px 0px 10px 0px'});
  $('#lootparser_loot_bb').click(function () { lootparser_go_back_to_form(); });
  $('#lootparser_loot_bc').click(function () { $('#lootparser_loot_log').val(''); });
  $('#lootparser_loot_bp').click(function () { lootparser_loot_process(); });
  $('#lootparser_loot_main1').show();
};
/* End of Code used for Loot_Statistics */

/*Hide bar and show loot parser */
lootparser_add_init();
$('#lootparser_add_img').hide();
$('#lootparser_add').show();
lootparser_loot_init();
$('#lootparser_loot_img').hide();
$('#lootparser_loot').show();
}());
//</pre>