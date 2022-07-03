/*global $ */
/*jslint devel: true, browser: true, indent: 2, white: true, plusplus: true, bitwise: true, vars: true, ass: true */

$(function () {
  'use strict';
  var
    //shared variables for MediaWiki:Outfiter/Template.js and MediaWiki:Outfiter.js START
    loading_img = 'https://static.wikia.nocookie.net/tibia/en/images/8/81/Outfiter_Loading.gif',
    error_img = 'https://static.wikia.nocookie.net/tibia/en/images/f/f6/Outfiter_Error.png',
    //mounts, the array index is the idm
    //must also be added to Template:Infobox_Mount
    outfiter_mount_names = [
      //0
      'None', 'Widow_Queen', 'Racing_Bird', 'War_Bear', 'Black_Sheep',
      //5
      'Midnight_Panther', 'Draptor', 'Titanica', 'Tin_Lizzard', 'Blazebringer',
      //10
      'Rapid_Boar', 'Stampor', 'Undead_Cavebear', 'Crystal_Wolf', 'Dromedary',
      //15
      'Kingly_Deer', 'Donkey', 'Scorpion_King', 'Tamed_Panda', 'Tiger_Slug',
      //20
      'Uniwheel', 'Rented_Horse_(A)', 'Rented_Horse_(B)', 'Rented_Horse_(C)', 'Armoured_War_Horse',
      //25
      'War_Horse', 'Lady_Bug', 'Manta_Ray', 'Shadow_Draptor', 'Gnarlhound',
      //30
      'Dragonling', 'Magma_Crawler', 'Ironblight', 'Crimson_Ray', 'Steelbeak',
      //35
      'Water_Buffalo', 'Tombstinger', 'Platesaurian', 'Ursagrodon', 'The_Hellgrip',
      //40
      'Noble_Lion', 'Desert_King', 'Shock_Head', 'Walker', 'Azudocus',
      //45
      'Carpacosaurus', 'Death_Crawler', 'Flamesteed', 'Jade_Lion', 'Jade_Pincer',
      //50
      'Nethersteed', 'Tempest', 'Winter_King', 'Blackpelt', 'Shadow_Hart',
      //55
      'Black_Stag', 'Emperor_Deer', 'Flying_Divan', 'Magic_Carpet', 'Floating_Kashmir',
      //60
      'Doombringer', 'Tundra_Rambler', 'Highland_Yak', 'Glacier_Vagabond', 'Golden_Dragonfly',
      //65
      'Steel_Bee', 'Copper_Fly', 'Hailstorm_Fury', 'Poisonbane', 'Siegebreaker',
      //70
      'Woodland_Prince', 'Glooth_Glider', 'Ringtail_Waccoon', 'Night_Waccoon', 'Emerald_Waccoon',
      //75
      'Flitterkatzen', 'Venompaw', 'Batcat', 'Sea_Devil', 'Coralripper',
      //80
      'Plumfish', 'Gorongra', 'Noctungra', 'Silverneck', 'Rented_Horse_(Recruiter)',
      //85
      'Slagsnare', 'Nightstinger', 'Razorcreep', 'Rift_Runner', 'Nightdweller',
      //90
      'Frostflare', 'Cinderhoof', 'Bloodcurl', 'Leafscuttler', 'Mouldpincer',
      //95
      'Sparkion', 'Swamp_Snapper', 'Mould_Shell', 'Reed_Lurker', 'Neon_Sparkid',
      //100
      'Vortexion', 'Ivory_Fang', 'Shadow_Claw', 'Snow_Pelt', 'Stone_Rhino',
      //105
      'Arctic_Unicorn', 'Blazing_Unicorn', 'Prismatic_Unicorn', 'Cranium_Spider', 'Cave_Tarantula',
      //110
      'Gloom_Widow', 'Mole', 'Marsh_Toad', 'Sanguine_Frog', 'Toxic_Toad',
      //115
      'Fleeting_Knowledge', 'Ebony_Tiger', 'Feral_Tiger', 'Jungle_Tiger', 'Tawny_Owl',
      //120
      'Snowy_Owl', 'Boreal_Owl', 'Lacewing_Moth', 'Hibernal_Moth', 'Cold_Percht_Sleigh',
      //125
      'Bright_Percht_Sleigh', 'Dark_Percht_Sleigh', 'Festive_Snowman', 'Muffled_Snowman', 'Caped_Snowman',
      //130
      'Rabbit_Rickshaw', 'Bunny_Dray', 'Cony_Cart', 'Nightmarish_Crocovile', 'River_Crocovile',
      //135
      'Swamp_Crocovile', 'Cerberus_Champion', 'Jousting_Eagle', 'Gryphon', 'Battle_Badger',
      //140
      'Ether_Badger', 'Zaoan_Badger', 'Blue_Rolling_Barrel', 'Green_Rolling_Barrel', 'Red_Rolling_Barrel',
      //145
      'Antelope', 'Haze', 'Snow_Strider', 'Dusk_Pryer', 'Dawn_Strayer',
      //150
      'Cold_Percht_Sleigh_Variant', 'Bright_Percht_Sleigh_Variant', 'Dark_Percht_Sleigh_Variant', 'Finished_Cold_Percht_Sleigh', 'Finished_Bright_Percht_Sleigh',
      //155
      'Finished_Dark_Percht_Sleigh', 'Benevolent_Coral_Rhea', 'Benevolent_Eventide_Nandu', 'Benevolent_Savanna_Ostrich', 'Coral_Rhea',
      //160
      'Eventide_Nandu', 'Savanna_Ostrich', 'Phantasmal_Jade', 'White_Lion_(Mount)', 'Cunning_Hyaena',
      //165
      'Scruffy_Hyaena', 'Voracious_Hyaena', 'Krakoloss', 'Festive_Mammoth', 'Holiday_Mammoth',
      //170
      'Merry_Mammoth', 'Void_Watcher', 'Rune_Watcher', 'Rift_Watcher', 'Dandelion',
      //175
      'Hyacinth', 'Peony', 'Singeing_Steed', 'Shellodon', 'Phant',
      //180
      'Rustwurm', 'Bogwurm', 'Gloomwurm', 'Emerald_Raven', 'Mystic_Raven',
      //185
      'Radiant_Raven', 'Gloothomotive', 'Dreadhare', 'Ember_Saurian', 'Emerald_Sphinx',
      //190
      'Floating_Augur', 'Floating_Sage', 'Floating_Scholar', 'Gold_Sphinx', 'Jackalope',
      //195
      'Jungle_Saurian', 'Lagoon_Saurian', 'Shadow_Sphinx', 'Wolpertinger', 'Topaz_Shrine',
      //200
      'Jade_Shrine', 'Obsidian_Shrine', 'Poppy_Ibex', 'Mint_Ibex', 'Cinnamon Ibex'
    ],
    //outfits the array index is the id(from 0 to 99)
    //must also be added to Template:OutfiterLink
    outfiter_names0 = [
      //0
      'Citizen', 'Hunter', 'Mage', 'Knight', 'Nobleman',
      //5
      'Summoner', 'Warrior', 'Barbarian', 'Druid', 'Wizard',
      //10
      'Oriental', 'Pirate', 'Assassin', 'Beggar', 'Shaman',
      //15
      'Norseman', 'Jester', 'Brotherhood', 'Nightmare', 'Demon_Hunter',
      //20
      'Yalaharian', 'Newly_Wed', 'Warmaster', 'Wayfarer', 'Afflicted',
      //25
      'Elementalist', 'Deepling', 'Insectoid', 'Entrepreneur', 'Crystal_Warlord',
      //30
      'Soil_Guardian', 'Demon', 'Cave_Explorer', 'Dream_Warden', 'Jersey',
      //35
      'Glooth_Engineer', 'Beastmaster', 'Champion', 'Conjurer', 'Chaos_Acolyte',
      //40
      'Ranger', 'Death_Herald', 'Ceremonial_Garb', 'Puppeteer', 'Spirit_Caller',
      //45
      'Evoker', 'Seaweaver', 'Recruiter', 'Sea_Dog', 'Royal_Pumpkin',
      //50
      'Rift_Warrior', 'Winter_Warden', 'Philosopher', 'Arena_Champion', 'Lupine_Warden',
      //55
      'Retro_Warrior', 'Retro_Summoner', 'Retro_Nobleman', 'Retro_Mage', 'Retro_Knight',
      //60
      'Retro_Hunter', 'Retro_Citizen', 'Festive', 'Grove_Keeper', 'Pharaoh',
      //65
      'Trophy_Hunter', 'Herbalist', 'Sun_Priest', 'Makeshift_Warrior', 'Siege_Master',
      //70
      'Mercenary', 'Discoverer', 'Battle_Mage', 'Sinister_Archer', 'Pumpkin_Mummy',
      //75
      'Dream_Warrior', 'Percht_Raider', 'Owl_Keeper', 'Guidon_Bearer', 'Lion_of_War',
      //80
      'Veteran_Paladin', 'Void_Master', 'Golden_Outfit', 'Hand_of_the_Inquisition', 'Breezy_Garb',
      //85
      'Orcsoberfest_Garb', 'Poltergeist', 'Falconer', 'Herder', 'Trailblazer',
      //90
      'Dragon_Slayer', 'Revenant', 'Jouster', 'Moth_Cape', 'Rascoohan',
      //95
      'Merry_Garb', 'Rune_Master', 'Forest_Warden', 'Citizen_of_Issavi', 'Royal_Bounacean_Advisor'
      //DO NOT ADD MORE OUTFITS HERE, GO TO outfiter_names200
    ],
    //other outfits the array index is the id (starting at 100)
    //must also be added to Template:OutfiterLink
    outfiter_names100 = [
      //100
      'Frog', 'Elf', 'Dwarf', 'Archdemon', 'CM',
      //105
      'None', 'Barbarian_(A)', 'Barbarian_(B)', 'Barbarian_(C)', 'Barbarian_(D)',
      //110
      'Gnome', 'Corym_(A)', 'Corym_(B)', 'Corym_(C)', 'Cultist',
      //115
      'Demon_Hellfire', 'Demon_Ram_(A)', 'Destroyer_from_Beyond', 'Galvanic_Terror', 'Pit_Demon',
      //120
      'Faun', 'Orclops_Ravager', 'Shaper', 'The_First_Dragon', 'Falcon_(A)',
      //125
      'Falcon_(B)', 'True_Asura', 'Squid', 'Book', 'Guardian_of_Tales',
      //130
      'Demon_Ram_(B)', 'Dreamelf', 'Spectre_(A)', 'Spectre_(B)', 'Carnivora',
      //135
      'Hireling_Banker', 'Hireling_Trader', 'Hireling_Cook', 'Hireling_Steward', 'Hireling_Servant',
      //140
      'Cobra_Mercenary', 'Issavi_Villager', 'Energy_Wisp', 'Lamassu', 'Sphinx',
      //145
      'Manticore', 'Lich_Knight_(A)', 'Lich_Knight_(B)', 'Lich_Knight_(C)', 'Orger',
      //150
      'Lost_Soul', 'Phantom', 'Lion_(A)', 'Lion_(B)', 'Werehyaena',
      //155
      'Werelion', 'Pirat', 'Raccoon', 'Tyrant', 'Girtablilu',
      //160
      'Bashmu', 'Carnisylvan', 'Chimera', 'Naga_(A)', 'Naga_(B)',
      //170
      'Naga_(C)', 'Naga_(D)'
    ],
    //outfits the array index is the id (starting at 200)
    //must also be added to Template:OutfiterLink
    outfiter_names200 = [
      //200
      'Dragon_Knight', 'Arbalester', 'Royal_Costume', 'Formal_Dress', 'Ghost_Blade',
      //205
      'Nordic_Chieftain_Outfit', 'Fire-Fighter'
    ],
    //outfits with irregular amount of sprites, regular is 1 standing, 8 walking
    outfiter_sprites_standing = {
      Chaos_Acolyte: 8,
      Evoker: 8,
      Battle_Mage: 8,
      Lion_of_War: 8,
      Veteran_Paladin: 8,
      Void_Master: 8,
      Squid: 8,
      Book: 8,
      Guardian_of_Tales: 8,
      'Spectre_(A)': 8,
      'Spectre_(B)': 8,
      Hireling_Banker: 13,
      Hireling_Trader: 11,
      Hireling_Cook: 11,
      Hireling_Steward: 12,
      Hireling_Servant: 5, //pingpong
      Golden_Outfit: 8,
      Energy_Wisp: 8,
      Trailblazer: 8,
      Lost_Soul: 8,
      Revenant: 8,
      Rune_Master: 8,
      Tyrant: 8,
      Ghost_Blade: 8,
      'Fire-Fighter': 8
    },
    outfiter_sprites_walking = {
      CM: 2,
      //None: 2,
      Gnome: 2,
      'Corym_(C)': 2,
      Hireling_Banker: 13,
      Hireling_Trader: 11,
      Hireling_Cook: 11,
      Hireling_Steward: 12,
      Hireling_Servant: 5 //pingpong
    },
    //outfits with different frame delays for some sprites
    outfiter_special_delays_standing = {
      //First frame of Special Delays must be adjusted so that all delays sum to 4000ms
      Lion_of_War: [3100, 100, 300, 100, 100, 100, 100, 100],
      Veteran_Paladin: [3100, 100, 300, 100, 100, 100, 100, 100],
      Hireling_Banker: [2000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      Hireling_Trader: [1000, 100, 300, 100, 100, 100, 100, 100, 1000, 100, 100],
      Hireling_Cook: [2000, 100, 300, 100, 100, 100, 100, 100, 100, 200, 100],
      Hireling_Steward: [1000, 100, 100, 100, 200, 100, 100, 100, 1000, 100, 300, 100],
      Hireling_Servant: [2000, 100, 100, 100, 2000, 100, 100, 100] //pingpong
    },
    outfiter_special_delays_moving = {
      Hireling_Banker: [2000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      Hireling_Trader: [1000, 100, 300, 100, 100, 100, 100, 100, 1000, 100, 100],
      Hireling_Cook: [2000, 100, 300, 100, 100, 100, 100, 100, 100, 200, 100],
      Hireling_Steward: [1000, 100, 100, 100, 200, 100, 100, 100, 1000, 100, 300, 100],
      Hireling_Servant: [2000, 100, 100, 100, 2000, 100, 100, 100] //pingpong
    },
    outfiter_special_delays_mount_standing = {
      Copper_Fly: [70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
      Glooth_Glider: [70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
      Golden_Dragonfly: [70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
      Steel_Bee: [70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
      //First frame of Special Delays must be adjusted so that all delays sum to 4000ms
      Jousting_Eagle: [3100, 100, 100, 200, 200, 100, 100, 100],
      Cerberus_Champion: [2900, 100, 100, 100, 500, 100, 100, 100]
    },
    //outfits that use ping-pong animation. ping-pong animation means 5 unique sprites, middle ones repeat backwards (1-2-3-4-5-4-3-2)
    outfiter_pingpong_animation = {
      Hireling_Servant: true
    },
    //outfits limited to height 4096
    outfiter_4096h = {
      Chaos_Acolyte: true,
      Evoker: true
    },
    //mounts with irregular amount of sprites, regular is 1 standing, 8 walking
    outfiter_sprites_mount_standing = {
      Flying_Divan: 8,
      Magic_Carpet: 8,
      Floating_Kashmir: 8,
      Copper_Fly: 10,
      Flamesteed: 8,
      Glooth_Glider: 10,
      Golden_Dragonfly: 10,
      Nethersteed: 8,
      Steel_Bee: 10,
      Tempest: 8,
      Flitterkatzen: 8,
      Venompaw: 8,
      Batcat: 8,
      Sea_Devil: 8,
      Coralripper: 8,
      Plumfish: 8,
      Nightdweller: 8,
      Frostflare: 8,
      Cinderhoof: 8,
      Fleeting_Knowledge: 8,
      Cerberus_Champion: 8,
      Jousting_Eagle: 8,
      Haze: 8,
      Snow_Strider: 8,
      Dusk_Pryer: 8,
      Dawn_Strayer: 8,
      Phantasmal_Jade: 8,
      Void_Watcher: 8,
      Rune_Watcher: 8,
      Rift_Watcher: 8,
      Singeing_Steed: 8,
      Emerald_Raven: 8,
      Mystic_Raven: 8,
      Radiant_Raven: 8,
      Gloothomotive: 8,
      Floating_Augur: 8,
      Floating_Sage: 8,
      Floating_Scholar: 8
    },
    outfiter_sprites_mount_walking = {
    },
    //mounts that are colourisable
    outfiter_mount_colourisable = {
      Krakoloss: true,
      Shellodon: true
    },
    //image names with _Female suffix for female
    outfiter_f_suffix_inames = {
      Gnome: true,
      Dreamelf: true,
      Hireling_Trader: true,
      Hireling_Banker: true,
      Hireling_Cook: true,
      Hireling_Steward: true,
      Hireling_Servant: true,
      Issavi_Villager: true
    },
    //no female
    outfiter_u_names = {
      Archdemon: true,
      'Barbarian_(A)': true,
      'Barbarian_(B)': true,
      'Barbarian_(C)': true,
      'Barbarian_(D)': true,
      CM: true,
      'Corym_(A)': true,
      'Corym_(B)': true,
      'Corym_(C)': true,
      Cultist: true,
      Dwarf: true,
      Elf: true,
      Frog: true,
      Demon_Hellfire: true,
      'Demon_Ram_(A)': true,
      Destroyer_from_Beyond: true,
      Galvanic_Terror: true,
      Pit_Demon: true,
      Faun: true,
      Orclops_Ravager: true,
      Shaper: true,
      The_First_Dragon: true,
      'Falcon_(A)': true,
      'Falcon_(B)': true,
      True_Asura: true,
      Squid: true,
      Book: true,
      Guardian_of_Tales: true,
      'Demon_Ram_(B)': true,
      'Spectre_(A)': true,
      'Spectre_(B)': true,
      Carnivora: true,
      Cobra_Mercenary: true,
      Lamassu: true,
      Sphinx: true,
      Manticore: true,
      'Lich_Knight_(A)': true,
      'Lich_Knight_(B)': true,
      'Lich_Knight_(C)': true,
      Energy_Wisp: true,
      Orger: true,
      Lost_Soul: true,
      Phantom: true,
      'Lion_(A)': true,
      'Lion_(B)': true,
      Werehyaena: true,
      Werelion: true,
      Pirat: true,
      Raccoon: true,
      Tyrant: true,
      Bashmu: true,
      Girtablilu: true,
      Carnisylvan: true,
      Chimera: true,
      'Naga_(A)': true,
      'Naga_(B)': true,
      'Naga_(C)': true,
      'Naga_(D)': true,
      None: true
    },
    //no mount
    outfiter_m_names = {
      Archdemon: true,
      'Barbarian_(A)': true,
      'Barbarian_(B)': true,
      'Barbarian_(C)': true,
      'Barbarian_(D)': true,
      CM: true,
      'Corym_(A)': true,
      'Corym_(B)': true,
      'Corym_(C)': true,
      Cultist: true,
      Dwarf: true,
      Elf: true,
      Frog: true,
      Gnome: true,
      Demon_Hellfire: true,
      'Demon_Ram_(A)': true,
      Destroyer_from_Beyond: true,
      Galvanic_Terror: true,
      Pit_Demon: true,
      Faun: true,
      Orclops_Ravager: true,
      Shaper: true,
      The_First_Dragon: true,
      'Falcon_(A)': true,
      'Falcon_(B)': true,
      True_Asura: true,
      Squid: true,
      Book: true,
      Guardian_of_Tales: true,
      'Demon_Ram_(B)': true,
      Dreamelf: true,
      'Spectre_(A)': true,
      'Spectre_(B)': true,
      Carnivora: true,
      Hireling_Banker: true,
      Hireling_Trader: true,
      Hireling_Cook: true,
      Hireling_Steward: true,
      Hireling_Servant: true,
      Cobra_Mercenary: true,
      Issavi_Villager: true,
      Lamassu: true,
      Sphinx: true,
      Manticore: true,
      'Lich_Knight_(A)': true,
      'Lich_Knight_(B)': true,
      'Lich_Knight_(C)': true,
      Energy_Wisp: true,
      Orger: true,
      Lost_Soul: true,
      Phantom: true,
      'Lion_(A)': true,
      'Lion_(B)': true,
      Werehyaena: true,
      Werelion: true,
      Pirat: true,
      Raccoon: true,
      Tyrant: true,
      Girtablilu: true,
      Bashmu: true,
      Carnisylvan: true,
      Chimera: true,
      'Naga_(A)': true,
      'Naga_(B)': true,
      'Naga_(C)': true,
      'Naga_(D)': true
    },
    //no addon
    outfiter_a_names = {
      Archdemon: true,
      'Barbarian_(A)': true,
      'Barbarian_(B)': true,
      'Barbarian_(C)': true,
      'Barbarian_(D)': true,
      CM: true,
      'Corym_(A)': true,
      'Corym_(B)': true,
      'Corym_(C)': true,
      Cultist: true,
      Dwarf: true,
      Elf: true,
      Frog: true,
      Gnome: true,
      Jersey: true,
      Newly_Wed: true,
      None: true,
      Retro_Warrior: true,
      Retro_Summoner: true,
      Retro_Nobleman: true,
      Retro_Mage: true,
      Retro_Knight: true,
      Retro_Hunter: true,
      Retro_Citizen: true,
      Faun: true,
      Orclops_Ravager: true,
      Shaper: true,
      Squid: true,
      Book: true,
      'Spectre_(A)': true,
      'Spectre_(B)': true,
      Hireling_Banker: true,
      Hireling_Trader: true,
      Hireling_Cook: true,
      Hireling_Steward: true,
      Hireling_Servant: true,
      Lamassu: true,
      Manticore: true,
      Energy_Wisp: true,
      Lost_Soul: true,
      Phantom: true,
      Werehyaena: true
    },
    //no ride frame
    outfiter_no_ride_names = {
      Archdemon: true,
      'Barbarian_(A)': true,
      'Barbarian_(B)': true,
      'Barbarian_(C)': true,
      'Barbarian_(D)': true,
      CM: true,
      'Corym_(A)': true,
      'Corym_(B)': true,
      'Corym_(C)': true,
      Cultist: true,
      Dwarf: true,
      Elf: true,
      Frog: true,
      Gnome: true,
      None: true,
      Demon_Hellfire: true,
      'Demon_Ram_(A)': true,
      Destroyer_from_Beyond: true,
      Galvanic_Terror: true,
      Pit_Demon: true,
      Faun: true,
      Orclops_Ravager: true,
      Shaper: true,
      'Falcon_(A)': true,
      'Falcon_(B)': true,
      True_Asura: true,
      Squid: true,
      Book: true,
      Guardian_of_Tales: true,
      'Demon_Ram_(B)': true,
      Dreamelf: true,
      'Spectre_(A)': true,
      'Spectre_(B)': true,
      Carnivora: true,
      Hireling_Banker: true,
      Hireling_Trader: true,
      Hireling_Cook: true,
      Hireling_Steward: true,
      Hireling_Servant: true,
      Cobra_Mercenary: true,
      Issavi_Villager: true,
      Lamassu: true,
      Sphinx: true,
      Manticore: true,
      'Lich_Knight_(A)': true,
      'Lich_Knight_(B)': true,
      'Lich_Knight_(C)': true,
      Energy_Wisp: true,
      Orger: true,
      Lost_Soul: true,
      Phantom: true,
      'Lion_(A)': true,
      'Lion_(B)': true,
      Werehyaena: true,
      Werelion: true,
      Pirat: true,
      Raccoon: true,
      Tyrant: true,
      Girtablilu: true,
      Bashmu: true,
      Carnisylvan: true,
      Chimera: true,
      'Naga_(A)': true,
      'Naga_(B)': true,
      'Naga_(C)': true,
      'Naga_(D)': true,
    },
    //outfits with no floor movement
    outfiter_no_floor_move_names = {
      Hireling_Banker: true,
      Hireling_Cook: true,
      Hireling_Servant: true,
      Hireling_Steward: true,
      Hireling_Trader: true
    },
    //shared variables for MediaWiki:Outfiter/Template.js and MediaWiki:Outfiter.js END

    //outfits with one addon
    outfiter_o_names = {
      Yalaharian: true
    },
    //outfits not on the main list
    outfiter_names_extra = [105, 103, 106, 107, 108, 109, 160, 128, 161, 134, 162, 104, 140, 111, 112, 113, 114, 115, 116, 130, 117, 131, 102, 142, 101, 124, 125, 120, 100, 118, 159, 110, 129, 135, 137, 139, 138, 136, 141, 143, 146, 147, 148, 152, 153, 150, 145, 149, 121, 151, 156, 119, 157, 122, 132, 133, 144, 127, 123, 126, 158, 154, 155],
    //outfits with separator on list
    outfiter_separator = {None: true},
    //mounts with separator on list
    outfiter_mount_separator = {},
    //names for female
    outfiter_f_names = {
      Nobleman: 'Noblewoman',
      Retro_Nobleman: 'Retro_Noblewoman',
      Norseman: 'Norsewoman'
    },
    //combine outfit names preserving indexes/ids
    outfiter_names = outfiter_names0;
  if (outfiter_names100.length) {
    outfiter_names.length = 100;
    outfiter_names = outfiter_names.concat(outfiter_names100);
  }
  if (outfiter_names200.length) {
    outfiter_names.length = 200;
    outfiter_names = outfiter_names.concat(outfiter_names200);
  }

  $('#outfiter_container').html(
    '<div class="outfiter">' +
    '<table>' +
    '<tr>' +
    '<td>' +
    '<div class="outer_border radio_list_wrap">' +
    '<div class="div2_no_padding">' +
    '<div class="div2_title">Mounts shortcut</div>' +
    '<div class="radio_list_cont">' +
    '<div class="radio_list_out radio_mounts">' +
    '<input type="text" size="15" class="dark_input omsearch" placeholder="Search" />' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="outer_border radio_list_wrap">' +
    '<div class="div2_no_padding">' +
    '<div class="div2_title">Outfits shortcut</div>' +
    '<div class="radio_list_cont">' +
    '<div class="radio_list_out radio_outfits">' +
    '<input type="text" size="15" class="dark_input omsearch" placeholder="Search" />' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</td>' +
    '<td>' +
    '<div class="outer_border">' +
    '<div class="div2">' +
    '<div class="div2_title">Outfit Selector</div>' +
    '<div class="omain_wrap">' +
    '<div class="omain_wrap_left">' +
    '<div class="omain_cont_left">' +
    '<div class="divtitle">Preview:</div>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk animate" /><span class="darkchk_in"></span>Animate' +
    '</label>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk sanim" /><span class="darkchk_in"></span>Standing Animation' +
    '</label>' +
    '<label class="divcheck">' +
    '<input type="checkbox" checked="checked" class="darkchk show_outfit" /><span class="darkchk_in"></span>Show Outfit' +
    '</label>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk floor" /><span class="darkchk_in"></span>Show Floor' +
    '</label>' +
    '</div>' +
    '<div class="omain_cont_left">' +
    '<div class="divtitle">Extra:</div>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk soft" /><span class="darkchk_in"></span>Soft Image' +
    '</label>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk hpbar" /><span class="darkchk_in"></span>HP Bar' +
    '</label>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk anistep" /><span class="darkchk_in"></span>Animation Steps' +
    '</label>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk template_code" /><span class="darkchk_in"></span>Template Code' +
    '</label>' +
    '</div>' +
    '<div class="omain_cont_left">' +
    '<div class="divtitle">Configure:</div>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk addon1" /><span class="darkchk_in"></span>Addon 1' +
    '</label>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk addon2" /><span class="darkchk_in"></span>Addon 2' +
    '</label>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk show_mount" /><span class="darkchk_in"></span>Mount' +
    '</label>' +
    '<label class="divcheck">' +
    '<input type="checkbox" class="darkchk female" /><span class="darkchk_in"></span>Female' +
    '</label>' +
    '</div>' +
    '</div>' +
    '<div class="omain_wrap_right">' +
    '<div class="omain_cont_right">' +
    '<div class="body_main_div">' +
    '<img class="body_main" width="128" height="128" src="' + encodeURI(loading_img) + '" alt="" />' +
    '<button class="leftb tleftb facingp"></button>' +
    '<button class="rightb trightb facingm"></button>' +
    '</div>' +
    '<div class="oitem_select_cont">' +
    '<button class="leftb outfitm"></button>' +
    '<button class="rightb outfitp"></button>' +
    '<div class="oitem_select_name outfit_name"></div>' +
    '<div class="clear"></div>' +
    '</div>' +
    '<div class="oitem_select_cont">' +
    '<button class="leftb mountm"></button>' +
    '<button class="rightb mountp"></button>' +
    '<div class="oitem_select_name mount_name"></div>' +
    '<div class="clear"></div>' +
    '</div>' +
    '<div class="colourise_cont">' +
    '<div class="colourise_title">Colourise:</div>' +
    '<button class="nbutton colourise_copy">Copy to Mount</button>' +
    '<label class="colourise_item">' +
    '<input type="radio" name="radio_colourise" class="darkrad" value="outfit" checked="checked" /><span class="darkrad_in"></span><div class="t">Outfit</div>' +
    '</label><label class="colourise_item">' +
    '<input type="radio" name="radio_colourise" class="darkrad" value="mount" /><span class="darkrad_in"></span><div class="t">Mount</div>' +
    '</label>' +
    '<div class="clear"></div>' +
    '</div>' +
    '<div class="colors_cont">' +
    '<button class="color_tab cb_1 sel"><span class="color_tab_in outer_border_no_bottom">Head</span></button>' +
    '<button class="color_tab cb_2"><span class="color_tab_in outer_border_no_bottom">Primary</span></button>' +
    '<button class="color_tab cb_3"><span class="color_tab_in outer_border_no_bottom">Secondary</span></button>' +
    '<button class="color_tab cb_4"><span class="color_tab_in outer_border_no_bottom">Detail</span></button>' +
    '<div class="clear"></div>' +
    '<div class="dcolor_table_out outer_border">' +
    '<div class="dcolor_table">' +
    '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="charn_cont">' +
    '<div class="charn_title">Char name:</div>' +
    '<button class="nbutton clear_name">Clear Name</button>' +
    '<button class="nbutton use_name">Use Name</button>' +
    '<input type="text" size="15" value="" class="dark_input charn" />' +
    '<div class="clear"></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="clear"></div>' +
    '<div class="sep_line"></div>' +
    '<div class="url_input_cont">' +
    '<span class="url_input_text">Link:&nbsp;</span><span class="url_input_out">' +
    '<input type="text" value="" readonly="readonly" class="dark_input url_input" />' +
    '</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</td>' +
    '</tr>' +
    '</table>' +
    '<div class="anistep_step_cont"></div>' +
    '<div class="template_code_code_cont"></div>' +
    '<div class="hide hide_canvas">' +
    '<input type="hidden" value="0" class="show_outfit_prev" />' +
    '<input type="hidden" value="0" class="outfit" />' +
    '<input type="hidden" value="0" class="mount" />' +
    '<input type="hidden" value="0" class="show_mount_prev" />' +
    '<input type="hidden" value="1" class="facing" />' +
    '<input type="hidden" value="0" class="c1" />' +
    '<input type="hidden" value="0" class="c2" />' +
    '<input type="hidden" value="0" class="c3" />' +
    '<input type="hidden" value="0" class="c4" />' +
    '<input type="hidden" value="0" class="mc1" />' +
    '<input type="hidden" value="0" class="mc2" />' +
    '<input type="hidden" value="0" class="mc3" />' +
    '<input type="hidden" value="0" class="mc4" />' +

    '<img class="floor_image" alt="floor_image" src="" />' +
    '<img class="letters_image" alt="letters_image" src="" />' +
    '<img class="hp_bar" alt="hp_bar" src="" />' +

    '<div>' +
    '<canvas class="canvas_work" width="64" height="64"></canvas>' +
    '<canvas class="canvas_zoom" width="64" height="64"></canvas>' +
    '</div>' +

    '<img class="main_image" src="" alt="main_image" />' +
    '<img class="mount_image" src="" alt="mount_image" />' +

    '<div>' +
    '<canvas class="canvas_main" width="512" height="6144"></canvas>' +
    '<canvas class="canvas_mount" width="256" height="1152"></canvas>' +
    '</div>' +


    '</div>' +
    '</div>'
  );
  $('div.outfiter').each(function () {
    var
      $this_main = $(this),
      browsers_base = 'Firefox/Chrome/Opera/Safari/Edge',
      browsers_apng = 'Firefox/Chrome/Opera/Safari/Edge',
      outfiter_mount_names_extra = [], //mounts not on the main list
      outfiter_mount_names_sorted = [], //list will be auto populated alphabetically
      outfiter_names_sorted = [], //list will be auto populated alphabetically
      outfiter_color_t = [
        [255, 255, 255], [255, 212, 191], [255, 233, 191], [255, 255, 191], [233, 255, 191], [212, 255, 191], [191, 255, 191], [191, 255, 212], [191, 255, 233], [191, 255, 255], [191, 233, 255], [191, 212, 255], [191, 191, 255], [212, 191, 255], [233, 191, 255], [255, 191, 255], [255, 191, 233], [255, 191, 212], [255, 191, 191],
        [218, 218, 218], [191, 159, 143], [191, 175, 143], [191, 191, 143], [175, 191, 143], [159, 191, 143], [143, 191, 143], [143, 191, 159], [143, 191, 175], [143, 191, 191], [143, 175, 191], [143, 159, 191], [143, 143, 191], [159, 143, 191], [175, 143, 191], [191, 143, 191], [191, 143, 175], [191, 143, 159], [191, 143, 143],
        [182, 182, 181], [191, 127, 95], [191, 159, 95], [191, 191, 95], [159, 191, 95], [127, 191, 95], [95, 191, 95], [95, 191, 127], [95, 191, 159], [95, 191, 191], [95, 159, 191], [95, 127, 191], [95, 95, 191], [127, 95, 191], [159, 95, 191], [191, 95, 191], [191, 95, 159], [191, 95, 127], [191, 95, 95],
        [145, 145, 144], [191, 106, 63], [191, 148, 63], [191, 191, 63], [148, 191, 63], [106, 191, 63], [63, 191, 63], [63, 191, 106], [63, 191, 148], [63, 191, 191], [63, 148, 191], [63, 106, 191], [63, 63, 191], [106, 63, 191], [148, 63, 191], [191, 63, 191], [191, 63, 148], [191, 63, 106], [191, 63, 63],
        [109, 109, 109], [255, 85, 0], [255, 170, 0], [255, 255, 0], [170, 255, 0], [84, 255, 0], [0, 255, 0], [0, 255, 84], [0, 255, 170], [0, 255, 255], [0, 169, 255], [0, 85, 255], [0, 0, 255], [85, 0, 255], [169, 0, 255], [254, 0, 255], [255, 0, 170], [255, 0, 85], [255, 0, 0],
        [72, 72, 68], [191, 63, 0], [191, 127, 0], [191, 191, 0], [127, 191, 0], [63, 191, 0], [0, 191, 0], [0, 191, 63], [0, 191, 127], [0, 191, 191], [0, 127, 191], [0, 63, 191], [0, 0, 191], [63, 0, 191], [127, 0, 191], [191, 0, 191], [191, 0, 127], [191, 0, 63], [191, 0, 0],
        [36, 36, 36], [127, 42, 0], [127, 85, 0], [127, 127, 0], [85, 127, 0], [42, 127, 0], [0, 127, 0], [0, 127, 42], [0, 127, 85], [0, 127, 127], [0, 84, 127], [0, 42, 127], [0, 0, 127], [42, 0, 127], [84, 0, 127], [127, 0, 127], [127, 0, 85], [127, 0, 42], [127, 0, 0]
      ],
      outfiter_outfit_none_id = (function () {
        var ret;
        outfiter_names.some(function (v, i) {
          if (v === 'None') { ret = i; return true; }
        });
        return ret;
      }()),

      outfiter_GET = {},
      outfiter_aframes,
      outfiter_images_loaded = [false, false],
      outfiter_atime,
      outfiter_acurrent = 0,
      //default outfiter options
      outfiter_def = {
        outfit: 0, addon1: false, addon2: false, female: false, facing: 1,
        c1: 0, c2: 0, c3: 0, c4: 0,
        soft: false, animate: false, sanim: false,
        hpbar: false, charn: '',
        mount: 0,
        mc1: 0, mc2: 0, mc3: 0, mc4: 0,
        floor: false
      },
      outfiter_def_template = {
        outfit: 0, addon1: false, addon2: false, female: false, facing: 2,
        c1: 0, c2: 0, c3: 0, c4: 0,
        soft: false, animate: false, sanim: false,
        hpbar: false, charn: '',
        mount: 0,
        mc1: 0, mc2: 0, mc3: 0, mc4: 0,
        floor: false
      },
      //long name and short name options that can be used
      outfiter_opt_names = {
        outfit: 'o', addon1: 'a1', addon2: 'a2', female: 'fm', facing: 'f',
        c1: 'c1', c2: 'c2', c3: 'c3', c4: 'c4',
        soft: 's', animate: 'a', sanim: 'sa',
        hpbar: 'h', charn: 'n',
        mount: 'm',
        mc1: 'mc1', mc2: 'mc2', mc3: 'mc3', mc4: 'mc4',
        floor: 'fl'
      },
      outfiter_opt_namesr = {
        o: 'outfit', a1: 'addon1', a2: 'addon2', fm: 'female', f: 'facing',
        c1: 'c1', c2: 'c2', c3: 'c3', c4: 'c4',
        s: 'soft', a: 'animate', sa: 'sanim',
        h: 'hpbar', n: 'charn',
        m: 'mount',
        mc1: 'mc1', mc2: 'mc2', mc3: 'mc3', mc4: 'mc4',
        fl: 'floor'
      },
      //floor
      floor_move_per_frame = 8, //has to be a factor of floor_spr_w and floor_spr_h
      floor_spr_w = 128, //has to be a multiple of floor_move_per_frame
      floor_spr_h = 64, //has to be a multiple of floor_move_per_frame
      floor_offset_x = 16, //left
      floor_offset_y = 16, //top
      floor_offset_y_bottom = 15, //bottom
      floor_w = 318 / 2,
      floor_h = (128 / 2) + floor_offset_y + floor_offset_y_bottom,
      outfiter_title = '', //fix for wikia
      //APNG support
      outfiter_apng_supported,
      ogebi = function (classname, all) { return $this_main.find(all === 1 ? classname : '.' + classname); },
      //canvases
      $canvas_main = ogebi('canvas_main'),
      $canvas_mount = ogebi('canvas_mount'),
      $canvas_work = ogebi('canvas_work'),
      $canvas_zoom = ogebi('canvas_zoom'),
      canvas_main = $canvas_main[0],
      canvas_mount = $canvas_mount[0],
      canvas_work = $canvas_work[0],
      canvas_zoom = $canvas_zoom[0],
      //map values depending on key/value.
      empty_string_maps_to = {
        addon1: true,
        addon2: true,
        female: true,
        soft: true,
        animate: true,
        sanim: true,
        hpbar: true,
        floor: true
      },
      map_GET_values = function (key, value) {
        if (value === '') {
          if (empty_string_maps_to.hasOwnProperty(key)) {
            return empty_string_maps_to[key];
          }
        }
        return decodeURIComponent(decodeURI(value));
      },
      //get options from url "search"
      outfiter_get_get = function () {
        var
          i, key, assign, array = window.location.search.substring(1).split(/&|;/);
        //URLs can be like either "sample.html?test1=hi&test2=bye" or "sample.html?test1=hi;test2=bye"
        for (i = 0; i < array.length; i++) {
          if (array[i] !== '') { //if no data, keep going
            assign = array[i].indexOf('=');
            if (array[i].substr(0, 5) === 'title') { outfiter_title = array[i].substring(assign + 1); } //fix for wikia
            else {
              key = assign === -1 ? array[i] : array[i].substring(0, assign);
              if (outfiter_opt_namesr[key] !== undefined || outfiter_def[key] === undefined) {
                if (outfiter_opt_namesr[key] !== 'undefined') { key = outfiter_opt_namesr[key]; }
                outfiter_GET[key] = map_GET_values(key, assign === -1 ? '' : array[i].substring(assign + 1));
              }
            }
          }
        }
      },
      //generate url for current options
      outfiter_gen_url = function () {
        var
          l = location.protocol + '//' + location.host + location.pathname + '?',
          basea = l.split('?'), base = basea[0],
          params = '?',
          mount_n = outfiter_mount_names[outfiter_GET.mount],
          can_color_mount = outfiter_mount_colourisable[mount_n] === true,
          opt;
        if (outfiter_title !== '') { params += 'title=' + outfiter_title + '&'; } //fix for wikia
        for (opt in outfiter_def) {
          if (
            outfiter_def.hasOwnProperty(opt) &&
            outfiter_GET[opt] !== outfiter_def[opt] &&
            (can_color_mount || !opt.match(/mc\d/))
          ) {
            params += outfiter_opt_names[opt] +
            (typeof outfiter_GET[opt] === 'boolean' ? (outfiter_GET[opt] === true ? '' : '=!') : '=' + outfiter_GET[opt]) + '&';
          }
        }
        while (params.substr(-1) === '&') { params = params.substr(0, params.length - 1); }
        ogebi('url_input').val(encodeURI(base + (params.length > 1 ? params : '')));
      },
      //generate template code for current options
      outfiter_gen_template = function () {
        var
          params = [],
          opt;
        for (opt in outfiter_def_template) { if (outfiter_def_template.hasOwnProperty(opt)) { if (outfiter_GET[opt] !== outfiter_def_template[opt]) {
          params.push(opt + '=' + outfiter_GET[opt]);
        } } }
        params.push('height=' + canvas_zoom.height);
        params.push('width=' + canvas_zoom.width);
        return params.join('|');
      },
      //get options from currently selected options
      outfiter_options_to_get = function () {
        var
          opt;
        for (opt in outfiter_GET) { if (outfiter_GET.hasOwnProperty(opt)) {
          if (typeof outfiter_GET[opt] === 'boolean') { outfiter_GET[opt] = ogebi(opt).is(':checked'); }
          else if (typeof outfiter_def[opt] === 'number') { outfiter_GET[opt] = parseInt(ogebi(opt).val(), 10); }
          else { outfiter_GET[opt] = encodeURIComponent(ogebi(opt).val()); }
        } }
      },
      //help other functions to handle default parameters
      outfiter_parameters_get = function (defp, par) {
        var
          attrname;
        if ((typeof par) !== 'object') { par = defp; }
        else { for (attrname in defp) { if (defp.hasOwnProperty(attrname)) { if (!par.hasOwnProperty(attrname)) { par[attrname] = defp[attrname]; } } } }
        return par;
      },
      //get pixel data from canvases
      outfiter_pixels_get_sub = function (par) {
        par = outfiter_parameters_get({x: 0, y: 0, w: 64, h: 64, src: 'main', pink: true}, par);
        var
          big_canvas, context, r, p, m,
          outfit_n = outfiter_names[outfiter_GET.outfit],
          is_4096h = outfiter_4096h[outfit_n] === true;
        big_canvas = par.src === 'mount' ? canvas_mount : canvas_main;
        context = big_canvas.getContext('2d');
        r = context.getImageData(
          (is_4096h && par.y >= 64 ? (Math.floor(par.y / 64) * 8) + par.x : par.x) * par.w,
          (is_4096h && par.y >= 64 ? par.y - 64 : par.y) * par.h,
          par.w,
          par.h
        );
        if (par.pink) {
          p = 0; m = r.width * r.height * 4;
          while (p < m) { if (r.data[p] === 255 && r.data[p + 1] === 0 && r.data[p + 2] === 255) { r.data[p + 3] = 0; } p += 4; }
        }
        return r;
      },
      //merge pixel data
      outfiter_pixels_merge = function (bottomp, topp) {
        if (bottomp === false) { return topp; }
        if (topp === false) { return bottomp; }
        var
          i,
          bpix = bottomp.data,
          tpix = topp.data,
          p = bottomp.width * bottomp.height,
          pixr = p * 4, pixg, pixb, pixa,
          r1, g1, b1, a1,
          res = canvas_work.getContext('2d').createImageData(bottomp.width, bottomp.height),
          rpix;
        rpix = res.data;
        if (rpix.set) { rpix.set(bpix); }
        else { for (i = 0; i < bpix.length; i++) { rpix[i] = bpix[i]; } }
        while (p--) {
          r1 = tpix[pixr -= 4];
          g1 = tpix[pixg = pixr + 1];
          b1 = tpix[pixb = pixr + 2];
          a1 = tpix[pixa = pixr + 3];
          if (a1 !== 0) {
            rpix[pixr] = r1;
            rpix[pixg] = g1;
            rpix[pixb] = b1;
            rpix[pixa] = a1;
          }
        }
        return res;
      },
      //apply colors to pixel data
      outfiter_pixels_blend = function (main, blend, is_mount) {
        var
          color_t = outfiter_color_t,
          c1 = is_mount ? outfiter_GET.mc1 : outfiter_GET.c1,
          c2 = is_mount ? outfiter_GET.mc2 : outfiter_GET.c2,
          c3 = is_mount ? outfiter_GET.mc3 : outfiter_GET.c3,
          c4 = is_mount ? outfiter_GET.mc4 : outfiter_GET.c4,
          bpix = blend.data,
          mpix = main.data,
          p = blend.width * blend.height,
          pixr = p * 4, pixg, pixb,
          r1, g1, b1;
        while (p--) {
          r1 = bpix[pixr -= 4]; g1 = bpix[pixg = pixr + 1]; b1 = bpix[pixb = pixr + 2];
          //change blend colors
          if (r1 === 255 && g1 === 255 && b1 === 0) { r1 = color_t[c1][0]; g1 = color_t[c1][1]; b1 = color_t[c1][2]; }
          else if (r1 === 255 && g1 === 0 && b1 === 0) { r1 = color_t[c2][0]; g1 = color_t[c2][1]; b1 = color_t[c2][2]; }
          else if (r1 === 0 && g1 === 255 && b1 === 0) { r1 = color_t[c3][0]; g1 = color_t[c3][1]; b1 = color_t[c3][2]; }
          else if (r1 === 0 && g1 === 0 && b1 === 255) { r1 = color_t[c4][0]; g1 = color_t[c4][1]; b1 = color_t[c4][2]; }
          if (mpix[pixr] === 255 && mpix[pixg] === 0 && mpix[pixb] === 255) { mpix[pixb + 1] = 0; }
          if (!(r1 === 255 && g1 === 0 && b1 === 255)) {
            //Multiply
            mpix[pixr] = r1 * mpix[pixr] / 255;
            mpix[pixg] = g1 * mpix[pixg] / 255;
            mpix[pixb] = b1 * mpix[pixb] / 255;
          }
        }
        return main;
      },
      //get outfit pixel data merged and colored
      outfiter_pixels_get_out = function (anim) {
        var
          pixel_data = false,
          outfit_n = outfiter_names[outfiter_GET.outfit],
          noaddons = outfiter_a_names[outfit_n] === true,
          noride = outfiter_no_ride_names[outfit_n] === true,
          pingpong = outfiter_pingpong_animation[outfit_n] === true,
          //Don't treat "other" outfits differently
          //mult_y = outfiter_GET.outfit >= 100 ? 1 : (noaddons ? 2 : 6),
          mult_y = (noaddons ? 1 : 3) * (noride ? 1 : 2);
        anim = pingpong ? Math.abs(anim - (anim % (8 / 2)) * 2) : anim;
        var base_y = (outfiter_GET.mount ? (noaddons ? 1 : 3) : 0) + (anim * mult_y);
        base_y += (outfiter_GET.animate ?
          (!outfiter_GET.sanim && outfiter_sprites_standing.hasOwnProperty(outfit_n) ?
            outfiter_sprites_standing[outfit_n] : 0
          ) : 0) * mult_y;
        $.each([true, outfiter_GET.addon1, outfiter_GET.addon2], function (i, v) {
          if (v) {
            pixel_data = outfiter_pixels_merge(
              pixel_data,
              outfiter_pixels_blend(
                outfiter_pixels_get_sub({x: outfiter_GET.facing * 2, y: base_y + i}),
                outfiter_pixels_get_sub({x: outfiter_GET.facing * 2 + 1, y: base_y + i})
              )
            );
          }
        });
        return pixel_data;
      },
      //get mount pixel data merged and colored
      outfiter_pixels_get_mount = function (anim) {
        if (anim === undefined) { anim = 0; }
        var
          pixel_data = false,
          colourisable,
          colourisable_mult,
          base_y_m,
          mount_n = outfiter_mount_names[outfiter_GET.mount];
        if (outfiter_GET.mount) {
          colourisable = outfiter_mount_colourisable[mount_n] === true;
          colourisable_mult = colourisable ? 2 : 1;
          base_y_m = anim + (outfiter_GET.animate ?
            (!outfiter_GET.sanim && outfiter_sprites_mount_standing.hasOwnProperty(mount_n) ?
              outfiter_sprites_mount_standing[mount_n] : 0
            ) : 0
          );
          //base
          pixel_data = outfiter_pixels_get_sub({x: outfiter_GET.facing * colourisable_mult, y: base_y_m, src: 'mount'});
          //blend color
          if (colourisable) {
            pixel_data = outfiter_pixels_merge(
              false,
              outfiter_pixels_blend(
                pixel_data,
                outfiter_pixels_get_sub({x: outfiter_GET.facing * colourisable_mult + 1, y: base_y_m, src: 'mount'}),
                true
              )
            );
          }
        }
        return pixel_data;
      },
      //draw pixel data to a canvas
      outfiter_pixels_draw = function (par) {
        par = outfiter_parameters_get({$canvas: $canvas_work, pixels: false, x: 0, y: 0, clear: false, resize: false}, par);
        if (par.pixels === false) { return; }
        if (par.resize) { par.$canvas.attr({width: par.pixels.width, height: par.pixels.height}); }
        if (par.clear) { par.$canvas.attr({width: par.$canvas[0].width, height: par.$canvas[0].height}); }
        par.$canvas[0].getContext('2d').putImageData(par.pixels, par.x, par.y);
      },
      //draw floor on canvas
      outfiter_floor_draw = function (par) {
        par = outfiter_parameters_get({$canvas: $canvas_work, ctx: false, img: ogebi('floor_image')[0], floor_x: 0, floor_y: 0, clear: true}, par);
        if (!par.ctx) { par.ctx = par.$canvas[0].getContext('2d'); }
        var
          floor_xs = [par.floor_x],
          floor_ys = [par.floor_y];
        while (floor_xs[0] > 0) { floor_xs.unshift(floor_xs[0] - floor_spr_w); }
        while (floor_xs[floor_xs.length - 1] + floor_spr_w < floor_w) { floor_xs.push(floor_xs[floor_xs.length - 1] + floor_spr_w); }
        while (floor_ys[0] > 0) { floor_ys.unshift(floor_ys[0] - floor_spr_h); }
        while (floor_ys[floor_ys.length - 1] + floor_spr_h < floor_h) { floor_ys.push(floor_ys[floor_ys.length - 1] + floor_spr_h); }
        if (par.clear) { par.$canvas.attr({width: par.$canvas[0].width, height: par.$canvas[0].height}); }
        floor_xs.forEach(function (floor_x) {
          floor_ys.forEach(function (floor_y) {
            par.ctx.drawImage(
              ogebi('floor_image')[0],
              0, 0, floor_spr_w, floor_spr_h,
              floor_x, floor_y, floor_spr_w, floor_spr_h
            );
          });
        });
      },
      //get the limits to horizontally crop pixel data
      outfiter_pixels_hlimits = function (pixels) {
        var
          ppix = pixels.data,
          x, y,
          pixr,
          startx = false,
          endx = false;
        for (x = 0; x < pixels.width; x++) {
          for (y = 0; y < pixels.height; y++) {
            pixr = (y * pixels.width + x) * 4;
            if (ppix[pixr + 3] !== 0) {
              startx = x;
              x = pixels.width; break;
            }
          }
          if (startx !== false) { break; }
        }
        for (x = pixels.width; x >= 0; x--) {
          for (y = pixels.height; y >= 0; y--) {
            pixr = (y * pixels.width + x) * 4;
            if (ppix[pixr + 3] !== 0) {
              endx = x;
              break;
            }
          }
          if (endx !== false) { break; }
        }
        return (startx === false || endx === false) ? [0, pixels.width] : [startx, endx];
      },
      //horizontally crops or extends area of pixel data
      outfiter_pixels_hcrop_expand = function (pixels, left, right, min_width) {
        if (min_width === undefined) { min_width = false; }
        var
          ppix = pixels.data,
          npix,
          x, y,
          pixr,
          npixr,
          new_pixels,
          neww = right - left,
          x_extra = min_width === false ? 0 : neww < min_width ? Math.floor((min_width - neww) / 2) : 0;
        new_pixels = canvas_work.getContext('2d').createImageData(neww, pixels.height);
        npix = new_pixels.data;
        for (x = 0; x < neww; x++) {
          for (y = 0; y < pixels.height; y++) {
            pixr = (y * pixels.width + x + left) * 4;
            npixr = (y * neww + x) * 4;
            npix[npixr] = ppix[pixr];
            npix[npixr + 1] = ppix[pixr + 1];
            npix[npixr + 2] = ppix[pixr + 2];
            npix[npixr + 3] = ppix[pixr + 3];
          }
        }
        if (x_extra > 0) {
          $canvas_work.attr({width: min_width, height: pixels.height});
          canvas_work.getContext('2d').putImageData(new_pixels, x_extra, 0);
          new_pixels = canvas_work.getContext('2d').getImageData(0, 0, min_width, pixels.height);
        }
        return new_pixels;
      },
      //toggle loading and some controls usability
      outfiter_hide_body = function (h, is_fail) {
        if (h === true) {
          clearTimeout(outfiter_atime);
          var
            i = ogebi('.body_main_div .body_main', 1),
            src = i.attr('src'),
            new_src = is_fail ? error_img : loading_img;
          ogebi(':button, :checkbox, :radio', 1)
          .not('.outfitm, .outfitp, .mountm, .mountp, [name="radio_outfits"], [name="radio_mounts"]')
          .prop({disabled: true});
          $this_main.addClass('outfiter_loading');
          if (new_src && src !== new_src) {
            i
            .attr('src', '') //Firefox fix
            .attr('src', new_src)
            .css({height: '', width: ''}).attr({height: 128, width: 128}).removeClass('body_main_with_floor');
          }
        }
        else {
          ogebi(':button, :checkbox, :radio', 1).filter(':disabled').prop({disabled: false});
          $this_main.removeClass('outfiter_loading');
        }
      },
      //get mount or outfit images
      outfiter_get_ajax = function (item_n, type, female_suffix) {
        var
          iname = item_n + (female_suffix ? '_Female' : ''),
          utype = type.substr(0, 1).toUpperCase() + type.substr(1),
          retry_max = 1,
          retry_wait = 500,
          retry_i = 0,
          ajax_call = function () {
            $.ajax({
              dataType: 'text',
              success: function (text) {
                var
                  r = text.match(
                    new RegExp('id="' + (iname.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&').replace(/\s/g, '_').replace(/_/g, '[ _]')) + '">' + '([\\w\\W]*)' + '<' + '/pre>', 'i')
                  );
                if (r !== null) {
                  text = r[1].replace(/\s+/g, '');
                  if (type === 'mount') { ogebi('mount_image').attr('src', '').attr('src', text); }
                  else { ogebi('main_image').attr('src', '').attr('src', text); }
                }
              },
              error: function () {
                retry_i++;
                //retry
                if (retry_i <= retry_max) { setTimeout(ajax_call, retry_wait); }
                //lock and mark as fail
                else { outfiter_hide_body(true, true); }
              },
              url: window.location.host.match(/(tibia|dantest)\.fandom\.com/) ?
                //For wikia
                '/index.php?title=Outfiter/' + utype + '/' + iname + '&action=raw' :
                //For local
                'base64/' + utype + '/' + iname + '.txt'
            });
          };
        ajax_call();
      },
      outfiter_load_outfit = function (param) {
        //show_outfit_prev save
        if (param !== 'mount') {
          ogebi('show_outfit_prev').val(
            ogebi('show_outfit').prop('checked') ? parseInt(ogebi('outfit').val(), 10) : outfiter_GET.outfit
          );
        }
        //
        outfiter_options_to_get();
        var
          outfit = outfiter_GET.outfit,
          mount = outfiter_GET.mount,
          outfit_n = outfiter_names[outfit],
          mount_n = outfiter_mount_names[mount],
          has_standing_animation_any = outfiter_sprites_standing.hasOwnProperty(outfit_n) || outfiter_sprites_mount_standing.hasOwnProperty(mount_n);
        if (outfiter_m_names[outfit_n] === true || outfiter_mount_names[mount] === undefined) {
          mount = 0; ogebi('mount').val(0);
          mount_n = outfiter_mount_names[mount];
          ogebi('radio_mounts_0').trigger('click');
          if (param === 'mount') { return; }
          outfiter_options_to_get();
        }
        if (outfiter_u_names[outfit_n] === true) {
          ogebi('female').prop({checked: false});
          if (param === 'female') { return; }
          outfiter_options_to_get();
        }
        if (!has_standing_animation_any) {
          ogebi('sanim').prop({checked: false});
          outfiter_options_to_get();
        }
        ogebi('radio_outfits_' + outfit).trigger('click');
        outfiter_hide_body(true);
        ogebi('outfit_name').text((
          (outfiter_GET.female && outfiter_f_names[outfit_n]) ?
            outfiter_f_names[outfit_n] : outfit_n
        ).replace(/_/g, ' '));
        ogebi('mount_name').text(mount_n.replace(/_/g, ' '));
        outfiter_images_loaded[1] = mount === 0;
        outfiter_images_loaded[0] = false;
        if (mount !== 0) { outfiter_get_ajax(mount_n, 'mount'); }
        outfiter_get_ajax(
          outfit_n,
          outfit >= 100 && outfit < 200 ? 'other' : (outfiter_GET.female ? 'female' : 'male'),
          outfiter_GET.female && outfiter_f_suffix_inames[outfit_n] === true
        );
      },
      outfiter_do_get_outfit_pos = function (outfit) {
        var
          x;
        for (x = 0; x < outfiter_names_sorted.length; x++) { if (outfit === outfiter_names_sorted[x]) { break; } }
        if (outfiter_names_sorted[x] !== undefined) { return x; }
        return -1;
      },
      outfiter_do_get_mount_pos = function (mount) {
        var
          x;
        for (x = 0; x < outfiter_mount_names_sorted.length; x++) { if (mount === outfiter_mount_names_sorted[x]) { break; } }
        if (outfiter_mount_names_sorted[x] !== undefined) { return x; }
        return -1;
      },
      outfiter_do_mount = function (i, absolute) {
        var
          mount = outfiter_GET.mount,
          mount_pos = absolute ? outfiter_do_get_mount_pos(i) : outfiter_do_get_mount_pos(mount) + i;
        mount = outfiter_mount_names[outfiter_mount_names_sorted[mount_pos]];
        if (outfiter_mount_names_sorted[mount_pos] === undefined) {
          if (mount_pos < 0) { mount_pos = outfiter_mount_names_sorted.length - 1; }
          else if (mount_pos >= outfiter_mount_names_sorted.length) { mount_pos = 0; }
        }
        ogebi('show_mount_prev').val(
          ogebi('show_mount').prop('checked') ? outfiter_mount_names_sorted[mount_pos] : outfiter_GET.mount
        );
        ogebi('mount').val(outfiter_mount_names_sorted[mount_pos]);
        outfiter_load_outfit('mount');
      },
      outfiter_do_outfit = function (i, absolute) {
        outfiter_options_to_get();
        var
          mount = outfiter_GET.mount,
          mount_pos = outfiter_do_get_mount_pos(mount),
          outfit = outfiter_GET.outfit,
          outfit_pos = (absolute ? outfiter_do_get_outfit_pos(i) : outfiter_do_get_outfit_pos(outfit) + i),
          has_standing_animation;
        outfit = outfiter_names[outfiter_names_sorted[outfit_pos]];
        mount = outfiter_mount_names[outfiter_mount_names_sorted[mount_pos]];
        if (outfiter_names_sorted[outfit_pos] === undefined) {
          if (outfit_pos < 0) { outfit_pos = outfiter_names_sorted.length - 1; }
          else if (outfit_pos >= outfiter_names_sorted.length) { outfit_pos = 0; }
        }
        ogebi('outfit').val(outfiter_names_sorted[outfit_pos]);
        if (outfiter_a_names[outfit] === true) {
          ogebi('addon1').prop({checked: false});
          ogebi('addon2').prop({checked: false});
        }
        else if (outfiter_o_names[outfit] === true) {
          if (ogebi('addon1').is(':checked')) { ogebi('addon2').prop({checked: false}); }
          else if (ogebi('addon2').is(':checked')) { ogebi('addon1').prop({checked: false}); }
        }
        if (outfiter_m_names[outfit] === true || outfiter_mount_names[mount_pos] === undefined) {
          ogebi('radio_mounts_0').trigger('click');
          outfiter_options_to_get();
          mount = outfiter_GET.mount;
          mount_pos = outfiter_do_get_mount_pos(mount);
        }
        if (ogebi('sanim').is(':checked')) {
          has_standing_animation = outfiter_sprites_standing.hasOwnProperty(outfit) ||
          outfiter_sprites_mount_standing.hasOwnProperty(mount);
          if (!has_standing_animation) { ogebi('sanim').prop({checked: false}); }
        }
        outfiter_load_outfit();
      },
      outfiter_animate_char = function () {
        clearTimeout(outfiter_atime);
        outfiter_acurrent++;
        if (outfiter_acurrent >= outfiter_aframes.length) { outfiter_acurrent = 0; }
        if (!ogebi('animate').is(':checked')) { return; }
        ogebi('.body_main_div .body_main', 1).attr('src', '').attr('src', outfiter_aframes[outfiter_acurrent]);
        outfiter_atime = setTimeout(outfiter_animate_char, outfiter_outfit_speed(outfiter_acurrent));
      },
      greatest_common_factor = function (x, y) {
        var
          a = Math.max(x, y),
          b = Math.min(x, y),
          c = 1,
          res;
        do {
          c = a % b;
          //capture last value of $b as the potential last GCF result
          res = b;
          //if $c did not = 0 we need to repeat with the values held in $b and $c
          //at this point $b is higher than $c so we set up for the next iteration
          //set $a to the higher number and $b to the lower number
          a = b;
          b = c;
        } while (c !== 0);
        return res;
      },
      least_common_multiple = function (x, y) {
        return (x * y) / greatest_common_factor(x, y);
      },
      use_special_delays = false,
      special_delays = [],
      outfiter_outfit_speed = function (i) {
        var
          res = 100,
          outfit_n = outfiter_names[outfiter_GET.outfit];
        //if (outfiter_special_delays_standing.hasOwnProperty(outfit_n) &&
        //  outfiter_GET.sanim) {
        //res = outfiter_special_delays_standing[outfit_n][i];
        //} else if (outfiter_special_delays_moving.hasOwnProperty(outfit_n) &&
        //!outfiter_GET.sanim) {
        //res = outfiter_special_delays_moving[outfit_n][i];
        if (use_special_delays) {
          res = special_delays[i];
        }
        else {
          res = 800 / (outfiter_sprites_walking.hasOwnProperty(outfit_n) ?
            outfiter_sprites_walking[outfit_n] :
            8
          );
          res = res < 100 ? 100 : res;
        }
        return res;
      },
      outfiter_do_display2 = function () {
        var
          outfiter_readCookie = function (cname) { var i, c, cl = document.cookie.split(';'); for (i = 0; i < cl.length; i++) { c = $.trim(cl[i]); if (c.indexOf(cname + '=') === 0) { return c.substring(cname.length + 1); } } return null; },
          //[row, col, width, offset left, offset right]
          outfiter_letters = {
            'À': [0, 5, 9, 0, 0], 'Á': [1, 5, 9, 0, 0], 'Â': [2, 5, 9, 0, 0], 'Ã': [3, 5, 9, 0, 0], 'Ä': [4, 5, 9, 0, 0], 'Å': [5, 5, 9, 0, 0], 'Æ': [6, 5, 12, 0, 0], 'Ç': [7, 5, 8, 0, 0],
            'È': [8, 5, 8, 0, 0], 'É': [9, 5, 8, 0, 0], 'Ê': [10, 5, 8, 0, 0], 'Ë': [11, 5, 8, 0, 0], 'Ì': [12, 5, 6, 0, 0], 'Í': [13, 5, 6, 0, 0], 'Î': [14, 5, 6, 0, 0], 'Ï': [15, 5, 6, 0, 0],
            'Ð': [16, 5, 9, 0, 0], 'Ñ': [17, 5, 9, 0, 0], 'Ò': [18, 5, 9, 0, 0], 'Ó': [19, 5, 9, 0, 0], 'Ô': [20, 5, 9, 0, 0], 'Õ': [21, 5, 9, 0, 0], 'Ö': [22, 5, 9, 0, 0], '×': [23, 5, 10, 0, 0],
            'Ø': [24, 5, 9, 0, 0], 'Ù': [25, 5, 9, 0, 0], 'Ú': [26, 5, 9, 0, 0], 'Û': [27, 5, 9, 0, 0], 'Ü': [28, 5, 9, 0, 0], 'Ý': [29, 5, 8, 0, 0], 'Þ': [30, 5, 8, 0, 0], 'ß': [31, 5, 8, 0, 0],
            'à': [0, 6, 8, 0, 0], 'á': [1, 6, 8, 0, 0], 'â': [2, 6, 8, 0, 0], 'ã': [3, 6, 8, 0, 0], 'ä': [4, 6, 8, 0, 0], 'å': [5, 6, 8, 0, 0], 'æ': [6, 6, 12, 0, 0], 'ç': [7, 6, 7, 0, 0],
            'è': [8, 6, 8, 0, 0], 'é': [9, 6, 8, 0, 0], 'ê': [10, 6, 8, 0, 0], 'ë': [11, 6, 8, 0, 0], 'ì': [12, 6, 4, 0, 0], 'í': [13, 6, 4, 0, 0], 'î': [14, 6, 4, 0, 0], 'ï': [15, 6, 4, 0, 0],
            'ð': [16, 6, 8, 0, 0], 'ñ': [17, 6, 8, 0, 0], 'ò': [18, 6, 8, 0, 0], 'ó': [19, 6, 8, 0, 0], 'ô': [20, 6, 8, 0, 0], 'õ': [21, 6, 8, 0, 0], 'ö': [22, 6, 8, 0, 0], '÷': [23, 6, 9, 0, 0],
            'ø': [24, 6, 8, 0, 0], 'ù': [25, 6, 8, 0, 0], 'ú': [26, 6, 8, 0, 0], 'û': [27, 6, 8, 0, 0], 'ü': [28, 6, 8, 0, 0], 'ý': [29, 6, 8, 0, 0], 'þ': [30, 6, 8, 0, 0], 'ÿ': [31, 6, 8, 0, 0],
            ' ': [0, 0, 4, 0, 0], '.': [14, 0, 4, 0, 0], '-': [13, 4, 6, 0, 0],
            '@': [0, 1, 9, 0, 0], 'A': [1, 1, 9, 0, 0], 'B': [2, 1, 8, 0, 0], 'C': [3, 1, 8, 0, 0], 'D': [4, 1, 9, 0, 0], 'E': [5, 1, 8, 0, 0], 'F': [6, 1, 8, 0, 0], 'G': [7, 1, 9, 0, 0],
            'H': [8, 1, 9, 0, 0], 'I': [9, 1, 6, 0, 0], 'J': [10, 1, 6, 1, 0], 'K': [11, 1, 8, 0, 0], 'L': [12, 1, 7, 0, 1], 'M': [13, 1, 10, 0, 0], 'N': [14, 1, 9, 0, 0], 'O': [15, 1, 9, 0, 0],
            'P': [16, 1, 8, 0, 0], 'Q': [17, 1, 9, 0, 0], 'R': [18, 1, 8, 0, 1], 'S': [19, 1, 8, 0, 0], 'T': [20, 1, 8, 1, 1], 'U': [21, 1, 9, 0, 0], 'V': [22, 1, 8, 0, 0], 'W': [23, 1, 12, 0, 0],
            'X': [24, 1, 8, 0, 0], 'Y': [25, 1, 8, 0, 0], 'Z': [26, 1, 8, 0, 0],
            '\'': [7, 0, 4, 0, 0], 'a': [1, 2, 8, 0, 0], 'b': [2, 2, 8, 0, 0], 'c': [3, 2, 7, 0, 0], 'd': [4, 2, 8, 0, 0], 'e': [5, 2, 8, 0, 0], 'f': [6, 2, 5, 1, 1], 'g': [7, 2, 8, 0, 0],
            'h': [8, 2, 8, 0, 0], 'i': [9, 2, 4, 0, 0], 'j': [10, 2, 5, 1, 0], 'k': [11, 2, 8, 0, 0], 'l': [12, 2, 4, 0, 0], 'm': [13, 2, 12, 0, 0], 'n': [14, 2, 8, 0, 0], 'o': [15, 2, 8, 0, 0],
            'p': [16, 2, 8, 0, 0], 'q': [17, 2, 8, 0, 0], 'r': [18, 2, 6, 0, 1], 's': [19, 2, 7, 0, 0], 't': [20, 2, 5, 1, 1], 'u': [21, 2, 8, 0, 0], 'v': [22, 2, 8, 0, 0], 'w': [23, 2, 10, 0, 0],
            'x': [24, 2, 8, 0, 0], 'y': [25, 2, 8, 0, 0], 'z': [26, 2, 7, 0, 0]
          },
          outfit_n = outfiter_names[outfiter_GET.outfit],
          mount_n = outfiter_mount_names[outfiter_GET.mount],
          af_o = outfiter_GET.animate ?
            (outfiter_GET.sanim ?
              (outfiter_sprites_standing.hasOwnProperty(outfit_n) ?
                outfiter_sprites_standing[outfit_n] +
              (outfiter_pingpong_animation.hasOwnProperty(outfit_n) ?
                outfiter_sprites_standing[outfit_n] - 2 : 0) :
                1
              ) :
              (outfiter_sprites_walking.hasOwnProperty(outfit_n) ?
                outfiter_sprites_walking[outfit_n] +
            (outfiter_pingpong_animation.hasOwnProperty(outfit_n) ?
              outfiter_sprites_walking[outfit_n] - 2 : 0) :
                8
              )
            ) : 0,
          af_m = outfiter_GET.mount ?
            (outfiter_GET.animate ?
              (outfiter_GET.sanim ?
                (outfiter_sprites_mount_standing.hasOwnProperty(mount_n) ?
                  outfiter_sprites_mount_standing[mount_n] : 1
                ) :
                (outfiter_sprites_mount_walking.hasOwnProperty(mount_n) ?
                  outfiter_sprites_mount_walking[mount_n] : 8
                )
              ) : 0
            ) : af_o,
          done = false,
          delays_o, delays_m, total_o, total_m,
          keyframes_o, keyframes_m, keyframes,
          af = (af_o === 0 || af_m === 0) ? 0 : least_common_multiple(af_o, af_m),
          af_tmp,
          afi,
          frames_all = [],
          frames_o = [],
          frames_m = [],
          pos_o,
          pos_m,
          limit_left = false,
          limit_right = false,
          pixel_data,
          ctx_zoom,
          ctx_work,
          neww, newh,
          output_image,
          soft_mult = outfiter_GET.soft ? 2 : 1,
          //name vars
          bar_xpos = outfiter_GET.soft ? (outfiter_GET.outfit === 103 ? 44 : 82) : (outfiter_GET.outfit === 103 ? 16 : 34),
          namew,
          name_center = bar_xpos + 13,
          name_left,
          name_right,
          char_name = decodeURIComponent(outfiter_GET.charn).split(''),
          lastpos,
          //floor
          floor_offset = {x: 0, y: 0},
          floor_move = outfiter_GET.animate && !outfiter_GET.sanim && outfiter_no_floor_move_names[outfit_n] !== true,
          floor_x,
          floor_y,
          //
          has_standing_animation_o = outfiter_GET.animate && outfiter_sprites_standing.hasOwnProperty(outfit_n),
          has_standing_animation_m = outfiter_GET.animate && outfiter_sprites_mount_standing.hasOwnProperty(mount_n),
          has_standing_animation_any = outfiter_sprites_standing.hasOwnProperty(outfit_n) || outfiter_sprites_mount_standing.hasOwnProperty(mount_n),
          has_outfit = outfiter_GET.outfit !== outfiter_outfit_none_id,
          can_have_mount = outfiter_m_names[outfit_n] !== true && has_outfit,
          can_color_mount = outfiter_mount_colourisable[mount_n] === true,
          show_mount_prev = parseInt(ogebi('show_mount_prev').val(), 10),
          show_mount_checked = false,
          show_mount_disabled = false,
          show_outfit_prev = parseInt(ogebi('show_outfit_prev').val(), 10),
          show_outfit_checked = false,
          show_outfit_disabled = false,
          draw_text_char = function (i) {
            var
              v = char_name[i];
            if (outfiter_letters.hasOwnProperty(v)) {
              ctx_zoom.drawImage(
                ogebi('letters_image')[0],
                outfiter_letters[v][0] * 16 - outfiter_letters[v][3],
                outfiter_letters[v][1] * 16,
                outfiter_letters[v][2] + outfiter_letters[v][3] + outfiter_letters[v][4],
                15,
                lastpos + 1 + floor_offset.x - outfiter_letters[v][3],
                (outfiter_GET.soft ? 48 : 16) - 1 + floor_offset.y,
                outfiter_letters[v][2] + outfiter_letters[v][3] + outfiter_letters[v][4],
                15
              );
              lastpos += outfiter_letters[v][2];
            }
          },
          namew_add = function (i) { if (outfiter_letters.hasOwnProperty(char_name[i])) { namew += outfiter_letters[char_name[i]][2]; } },
          array_fill = function (amount, val) {
            var i, ret = [];
            for (i = 0; i < amount; i++) { ret.push(typeof val === 'function' ? val(i) : val); }
            return ret;
          };
        //clean saved image frames
        outfiter_aframes = [];
        //clear canvases
        $canvas_main.attr({width: canvas_main.width, height: canvas_main.height});
        $canvas_mount.attr({width: canvas_mount.width, height: canvas_mount.height});
        //fill canvases with images
        try { canvas_main.getContext('2d').drawImage(ogebi('main_image')[0], 0, 0); } catch (ignore) { } //Firefox fix
        try { canvas_mount.getContext('2d').drawImage(ogebi('mount_image')[0], 0, 0); } catch (ignore) { } //Firefox fix
        ctx_zoom = canvas_zoom.getContext('2d');
        ctx_work = canvas_work.getContext('2d');
        use_special_delays = false;
        if (outfiter_GET.sanim && (
          outfiter_special_delays_standing.hasOwnProperty(outfit_n) ||
          outfiter_special_delays_mount_standing.hasOwnProperty(mount_n))
        ) {
          delays_o = [];
          delays_m = [];
          var special_o = outfiter_special_delays_standing.hasOwnProperty(outfit_n);
          var special_m = outfiter_special_delays_mount_standing.hasOwnProperty(mount_n);
          if (special_o && special_m) {
            delays_o = outfiter_special_delays_standing[outfit_n];
            delays_m = outfiter_special_delays_mount_standing[mount_n];
          } else if (special_o) {
            delays_o = outfiter_special_delays_standing[outfit_n];
            if (outfiter_sprites_mount_standing.hasOwnProperty(mount_n)) {
              delays_m = array_fill(outfiter_sprites_mount_standing[mount_n], 100);
            } else {
              delays_m = [delays_o.reduce(function (a, b) { return Math.min(a, b); })];
            }
          } else if (special_m) {
            delays_m = outfiter_special_delays_mount_standing[mount_n];
            if (outfiter_sprites_standing.hasOwnProperty(outfit_n)) {
              delays_o = array_fill(outfiter_sprites_standing[outfit_n], 100);
            } else {
              delays_o = [delays_m.reduce(function (a, b) { return Math.min(a, b); })];
            }
          }
          total_o = delays_o.reduce(function (a, b) { return a + b; });
          total_m = delays_m.reduce(function (a, b) { return a + b; });
          var
            anim_duration = least_common_multiple(total_o, total_m),
            delays_all_o = [],
            delays_all_m = [],
            d_all_i, keyframes_i;
          keyframes_o = [];
          keyframes_m = [];
          keyframes = [];
          special_delays = [];
          for (d_all_i = 0; d_all_i < anim_duration / total_o; d_all_i++) {
            delays_all_o = delays_all_o.concat(delays_o);
          }
          for (d_all_i = 0; d_all_i < anim_duration / total_m; d_all_i++) {
            delays_all_m = delays_all_m.concat(delays_m);
          }
          delays_all_o.reduce(function (a, b, i) { return (keyframes_o[i] = a + b); }, 0);
          delays_all_m.reduce(function (a, b, i) { return (keyframes_m[i] = a + b); }, 0);
          keyframes = keyframes_o.concat(keyframes_m).sort(function (a, b) { return a - b; });
          keyframes = keyframes.filter(function (v, i) { return keyframes.indexOf(v) === i; });
          keyframes.unshift(0);
          for (keyframes_i = 1; keyframes_i < keyframes.length; keyframes_i++) {
            special_delays[keyframes_i - 1] = keyframes[keyframes_i] - keyframes[keyframes_i - 1];
          }
          use_special_delays = true;
          af = keyframes.length - 1;
          //console.log(delays_o.join(','));
          //console.log(keyframes_o.join(','));
          //console.log(delays_m.join(','));
          //console.log(keyframes_m.join(','));
          //console.log(keyframes.join(','));
          //console.log(special_delays.join(','));
        }
        //floor_move frame adjust
        if (floor_move) {
          af_tmp = least_common_multiple(af, floor_spr_w / floor_move_per_frame);
          af = af_tmp < 128 ? af_tmp : af;
        }
        //getting animation frame
        var kf_red = function (a, b) { return keyframes[afi + 1] < b ? a : b; };
        for (afi = 0; afi < af || (af === 0 && done === false); afi++) {
          //get basic data
          if (af === 0) {
            pixel_data = outfiter_pixels_merge(outfiter_pixels_get_mount(0), outfiter_pixels_get_out(0));
            done = true;
          } else if (use_special_delays) {
            pos_o = keyframes_o.indexOf(keyframes_o.reduce(kf_red));
            pos_o = pos_o % delays_o.length;
            pos_m = keyframes_m.indexOf(keyframes_m.reduce(kf_red));
            pos_m = pos_m % delays_m.length;
            //console.log({afi: afi, pos_o: pos_o, pos_m: pos_m});
            if (!frames_m[pos_m]) { frames_m[pos_m] = outfiter_pixels_get_mount(pos_m); }
            if (!frames_o[pos_o]) { frames_o[pos_o] = outfiter_pixels_get_out(pos_o); }
            pixel_data = outfiter_pixels_merge(frames_m[pos_m], frames_o[pos_o]);
          } else {
            pos_o = (afi % af_o) + (has_standing_animation_o ? 0 : (outfiter_GET.sanim ? 0 : 1));
            pos_m = (afi % af_m) + (has_standing_animation_m ? 0 : (outfiter_GET.sanim ? 0 : 1));
            //console.log({afi: afi, pos_o: pos_o, pos_m: pos_m});
            if (!frames_m[pos_m]) { frames_m[pos_m] = outfiter_pixels_get_mount(pos_m); }
            if (!frames_o[pos_o]) { frames_o[pos_o] = outfiter_pixels_get_out(pos_o); }
            pixel_data = outfiter_pixels_merge(frames_m[pos_m], frames_o[pos_o]);
          }
          //floor
          if (outfiter_GET.floor) {
            //resize/reposition
            $canvas_work.attr({width: floor_w, height: floor_h});
            floor_offset.x = (floor_w - 64) / 2;
            floor_offset.y = floor_offset_y;
            outfiter_pixels_draw({pixels: pixel_data, x: floor_offset.x, y: floor_offset.y});
            pixel_data = ctx_work.getImageData(0, 0, canvas_work.width, canvas_work.height);
            //coords (0 north 1 east 2 south 3 west)
            floor_x = (floor_move && (outfiter_GET.facing % 2) ? (afi * floor_move_per_frame * (outfiter_GET.facing === 1 ? -1 : 1)) : 0) - floor_offset_x;
            floor_y = (floor_move && !(outfiter_GET.facing % 2) ? (afi * floor_move_per_frame * (outfiter_GET.facing === 2 ? -1 : 1)) : 0) - floor_offset_y;
            outfiter_floor_draw({ctx: ctx_work, floor_x: floor_x, floor_y: floor_y});
            //merge
            pixel_data = outfiter_pixels_merge(
              ctx_work.getImageData(0, 0, canvas_work.width, canvas_work.height),
              pixel_data
            );
            //update offset
            floor_offset.x *= soft_mult;
            floor_offset.y *= soft_mult;
          }
          else {
            $canvas_work.attr({width: 64, height: 64});
          }
          //draw normal
          outfiter_pixels_draw({pixels: pixel_data, clear: true});
          //draw zoomed
          $canvas_zoom.attr({width: canvas_work.width * soft_mult, height: canvas_work.height * soft_mult});
          ctx_zoom.drawImage(
            canvas_work,
            0, 0, canvas_work.width, canvas_work.height,
            0, 0, canvas_work.width * soft_mult, canvas_work.height * soft_mult
          );
          pixel_data = ctx_zoom.getImageData(0, 0, canvas_zoom.width, canvas_zoom.height);
          //hp bar
          if (outfiter_GET.hpbar) {
            ctx_zoom.drawImage(
              ogebi('hp_bar')[0],
              0, 0, 64, 64,
              bar_xpos + floor_offset.x, (outfiter_GET.soft ? 60 : 28) + floor_offset.y, 64, 64
            );
            pixel_data = ctx_zoom.getImageData(0, 0, canvas_zoom.width, canvas_zoom.height);
          }
          //name
          if (outfiter_GET.charn !== '') {
            namew = 0;
            name_left = 0;
            name_right = 0;
            //get total length
            $.each(char_name, namew_add);
            namew += 2;
            //resize canvas if needed and set start position
            if (canvas_zoom.width - name_center < namew / 2) { name_right = Math.ceil((namew / 2) - (canvas_zoom.width - name_center)); }
            if (name_center < namew / 2) { name_left = Math.ceil((namew / 2) - name_center); }
            $canvas_zoom.attr({width: canvas_zoom.width + name_left + name_right});
            outfiter_pixels_draw({$canvas: $canvas_zoom, pixels: pixel_data, x: name_left});
            lastpos = name_center + name_left - Math.floor(namew / 2);
            //draw the text
            $.each(char_name, draw_text_char);
            pixel_data = ctx_zoom.getImageData(0, 0, canvas_zoom.width, canvas_zoom.height);
          }
          //save frame pixel_data
          frames_all[afi] = pixel_data;
        }
        //get limits
        if (outfiter_GET.floor) {
          limit_left = 0;
          limit_right = canvas_zoom.width;
        }
        else {
          $.each(frames_all, function (i) {
            var
              limits = outfiter_pixels_hlimits(frames_all[i]);
            limit_left = limit_left === false ? limits[0] : Math.min(limits[0], limit_left);
            limit_right = limit_right === false ? limits[1] : Math.max(limits[1], limit_right);
          });
        }
        //crop/expand to limits (frames_all & outfiter_aframes)
        $.each(frames_all, function (i) {
          frames_all[i] = outfiter_pixels_hcrop_expand(frames_all[i], limit_left, limit_right, 64 * soft_mult);
          outfiter_pixels_draw({$canvas: $canvas_zoom, pixels: frames_all[i], resize: true});
          outfiter_aframes[i] = canvas_zoom.toDataURL();
        });
        //output the image
        output_image = outfiter_aframes[0];
        if (outfiter_GET.animate) {
          if (outfiter_readCookie('outfiter_apng_warn') !== 'done') {
            if (outfiter_apng_supported) {
              alert('APNG has been enabled, you can save the animation as a single image but you can only see it animated on recent versions of ' + browsers_apng + '.');
            }
            else if (outfiter_apng_supported === '') {
              alert('APNG not enabled, you need to use a recent version of ' + browsers_apng + ' to be able to save and view the animation as a single image.');
            }
            else {
              alert('APNG not supported, you need to use a recent version of ' + browsers_apng + ' to be able to save and view the animation as a single image.');
            }
            var
              date = new Date(); date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
            date = date.toGMTString();
            document.cookie = 'outfiter_apng_warn=done; expires=' + date + '; path=/';
          }
          if (outfiter_apng_supported) {
            //APNG support functions
            var
              keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
              encode64 = function (b) { var c = []; var a, d, f; var e, j, h, i; var g = 0; do { a = b[g++]; d = b[g++]; f = b[g++]; e = a >> 2; j = ((a & 3) << 4) | (d >> 4); h = ((d & 15) << 2) | (f >> 6); i = f & 63; if (isNaN(d)) { h = i = 64; } else if (isNaN(f)) { i = 64; } c = c + keyStr.charAt(e) + keyStr.charAt(j) + keyStr.charAt(h) + keyStr.charAt(i); } while (g < b.length); return c; },
              decode64 = function (b) { var c = []; var a, d, f; var e, j, h, i; var g = 0; do { e = keyStr.indexOf(b[g++]); j = keyStr.indexOf(b[g++]); h = keyStr.indexOf(b[g++]); i = keyStr.indexOf(b[g++]); a = (e << 2) | (j >> 4); d = ((j & 15) << 4) | (h >> 2); f = ((h & 3) << 6) | i; c[c.length] = a; if (h !== 64) { c[c.length] = d; } if (i !== 64) { c[c.length] = f; } } while (g < b.length); return c; },
              bin2int = function (b) { var c, a, d = 0; for (a = c = b.length - 1; a >= 0; a--) { d += b[a] * Math.pow(256, c - a); } return d; },
              int2bin = function (b, c) { if (c === undefined) { c = 4; } var a = b, d = [], f = 0, e; while (a > 255) { a = Math.floor(a / 256); f++; } for (e = f; e >= 0; e--) { a = Math.floor(b / Math.pow(256, e)); d[d.length] = a; b = b - (a * Math.pow(256, e)); } while (d.length < c) { d = [0].concat(d); } return d; },
              crc32 = function (g) { var a, d = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D', c, e = 0, b = 0, h = 0; e = e ^ (-1); for (c = 0, a = g.length; c < a; c++) { h = (e ^ g[c]) & 255; b = '0x' + d.substr(h * 9, 8); e = (e >>> 8) ^ b; } e = e ^ (-1); return e < 0 ? 4294967296 + e : e; },
              chunks = {
                sign1: int2bin(2303741511),
                sign2: int2bin(218765834),
                ihdr1: int2bin(1229472850),
                actl: int2bin(1633899596),
                fctl: int2bin(1717785676),
                idat: int2bin(1229209940),
                fdat: int2bin(1717846356),
                iend: int2bin(1229278788)
              },
              head, ihdr, actl, pre_sprites, sprites = [], iend;
            head = chunks.sign1.concat(chunks.sign2);
            ihdr = chunks.ihdr1.concat(
              int2bin(frames_all[0].width), //width
              int2bin(frames_all[0].height), //height
              int2bin(8, 1), //8 bit depth
              int2bin(6, 1), //Truecolour with alpha
              int2bin(0, 1), //Compression method
              int2bin(0, 1), //Filter method
              int2bin(0, 1) //Interlace method, 0 = no interlace
            );
            ihdr = int2bin(13).concat(ihdr, int2bin(crc32(ihdr)));
            actl = chunks.actl.concat(
              int2bin(frames_all.length), //Number of frames
              int2bin(0) //Number of times to loop this APNG.  0 indicates infinite looping.
            );
            actl = int2bin(8).concat(actl, int2bin(crc32(actl)));
            pre_sprites = head.concat(ihdr, actl);
            $.each(outfiter_aframes, function (i, v) {
              var
                bytes_array = decode64(v.replace('data:image/png;base64,', '')),
                idat_positions = [],
                fctl,
                data,
                idat_fdat,
                is_idat = i === 0;
              //find IDATs and add position
              $.each(bytes_array, function (j, this_byte) {
                if (this_byte === 73 && bytes_array[j + 1] === 68 && bytes_array[j + 2] === 65 && bytes_array[j + 3] === 84) { idat_positions.push(j); }
              });
              //frame control chunk
              fctl = chunks.fctl.concat(
                int2bin(Math.max(0, i * 2 - 1)), //Sequence number of the animation chunk
                int2bin(frames_all[0].width), //width
                int2bin(frames_all[0].height), //height
                int2bin(0), //x_offset
                int2bin(0), //_offset
                int2bin(outfiter_outfit_speed(i), 2), //Frame delay fraction numerator
                int2bin(1000, 2), //Frame delay fraction denominator
                int2bin(1, 1), //dispose_op: 1 = APNG_DISPOSE_OP_BACKGROUND
                int2bin(1, 1) //blend_op: 1 = APNG_BLEND_OP_OVER
              );
              fctl = int2bin(26).concat(fctl, int2bin(crc32(fctl)));
              //reading and merging IDATs
              data = [];
              $.each(idat_positions, function (k) {
                var
                  size = bin2int(bytes_array.slice(idat_positions[k] - 4, idat_positions[k]));
                data = data.concat(bytes_array.slice(idat_positions[k] + 4, size + idat_positions[k] + 4));
              });
              //idat or fdat
              if (is_idat) { idat_fdat = chunks.idat.concat(data); }
              else {
                idat_fdat = chunks.fdat.concat(
                  int2bin(i * 2), //Sequence number of the animation chunk
                  data
                );
              }
              idat_fdat = int2bin(data.length + (is_idat ? 0 : 4)).concat(idat_fdat, int2bin(crc32(idat_fdat)));
              sprites = sprites.concat(fctl, idat_fdat);
            });

            iend = chunks.iend;
            iend = int2bin(0).concat(iend, int2bin(crc32(iend)));

            output_image = 'data:image/png;base64,' + encode64(pre_sprites.concat(sprites, iend));
          }
          else { outfiter_animate_char(); }
        }
        neww = frames_all[0].width * 2 / soft_mult;
        newh = frames_all[0].height * 2 / soft_mult;
        ogebi('.body_main_div .body_main', 1)
        .attr('src', '') //Firefox fix
        .attr({height: newh, src: output_image, width: neww}).css({height: newh, width: neww}).toggleClass('body_main_with_floor', outfiter_GET.floor);
        //animation steps
        ogebi('anistep_step_cont').empty();
        if (ogebi('anistep').is(':checked')) {
          $.each(outfiter_aframes, function (i, v) {
            ogebi('anistep_step_cont').append(
              $('<div />', {class: 'anistep_step'}).append(
                $('<img />', {alt: 'Animation step ' + i, title: 'Animation step ' + i, src: v})
              )
            );
          });
        }
        //template_code
        ogebi('template_code_code_cont').empty();
        if (ogebi('template_code').is(':checked')) {
          ogebi('template_code_code_cont').append(
            $('<textarea />', {class: 'template_code_code', rows: 3, cols: 40}).text(
              '{{Outfitter|' + outfiter_gen_template() + '}}'
            )
          );
        }
        //hide loading
        outfiter_hide_body(false);
        //update colourise
        if (!can_color_mount) {
          ogebi('[name="radio_colourise"][value="outfit"]', 1).prop({checked: true}).trigger('change');
        }
        ogebi('[name="radio_colourise"]', 1).prop({disabled: !can_color_mount}).parent().toggleClass('disabled', !can_color_mount);
        ogebi('colourise_copy').prop({disabled: !can_color_mount});
        //update checkboxes
        ogebi('female').parent().toggleClass('disabled', outfiter_u_names[outfit_n] === true);
        ogebi('.addon1, .addon2', 1).parent().toggleClass('disabled', outfiter_a_names[outfit_n] === true);
        ogebi('sanim').prop({disabled: !has_standing_animation_any}).parent().toggleClass('disabled', !has_standing_animation_any);
        if (outfiter_GET.outfit === outfiter_outfit_none_id && show_outfit_prev === outfiter_outfit_none_id) { show_outfit_disabled = true; }
        else { show_outfit_checked = has_outfit; }
        ogebi('show_outfit').prop({checked: show_outfit_checked, disabled: show_outfit_disabled})
        .parent().toggleClass('disabled', show_outfit_disabled);
        if ((has_outfit && !can_have_mount) || (!outfiter_GET.mount && !show_mount_prev)) { show_mount_disabled = true; }
        show_mount_checked = !!outfiter_GET.mount;
        ogebi('show_mount').prop({checked: show_mount_checked, disabled: show_mount_disabled})
        .parent().toggleClass('disabled', show_mount_disabled);
        //update buttons
        ogebi('.mountm, .mountp', 1).parent().toggleClass('disabled', !can_have_mount);
        //update url
        outfiter_gen_url();
      },
      outfiter_do_display = function () {
        var display2_delay;
        outfiter_options_to_get();
        outfiter_hide_body(true);
        clearTimeout(outfiter_atime);
        display2_delay = (outfiter_GET.animate && outfiter_apng_supported === '') ? 1500 : 1; //delay the display if animated and apng support is still unknown
        setTimeout(outfiter_do_display2, display2_delay);
      },
      outfiter_do_addon = function (id) {
        id = (typeof id === 'number') ? id : 0;
        var
          tmp, has_standing_animation,
          outfit_n = outfiter_names[outfiter_GET.outfit],
          mount_n = outfiter_mount_names[outfiter_GET.mount];
        if (outfiter_a_names[outfit_n] === true) {
          ogebi('addon1, .addon2').prop({checked: false});
          if (id) { return; }
        }
        else if (id && outfiter_o_names[outfit_n] === true) {
          tmp = ogebi('addon' + id).is(':checked');
          ogebi('addon1, .addon2').prop({checked: false});
          if (tmp) { ogebi('addon' + id).prop({checked: true}); }
        }
        if (ogebi('sanim').is(':checked')) {
          has_standing_animation = outfiter_sprites_standing.hasOwnProperty(outfit_n) ||
          outfiter_sprites_mount_standing.hasOwnProperty(mount_n);
          if (!has_standing_animation) { ogebi('sanim').prop({checked: false}); }
          if (!ogebi('animate').is(':checked')) {
            if ($(this).hasClass('animate')) { ogebi('sanim').prop({checked: false}); }
            else if ($(this).hasClass('sanim')) { ogebi('animate').prop({checked: true}); }
          }
        }
        if (outfiter_m_names[outfit_n] === true) { ogebi('mount').val(0); ogebi('radio_mounts_0').trigger('click'); }
        outfiter_do_display();
      },
      outfiter_do_facing = function (i) {
        var
          facing = parseInt(ogebi('facing').val(), 10) + parseInt(i, 10);
        if (facing < 0) { facing = 3; }
        else if (facing > 3) { facing = 0; }
        ogebi('facing').val(facing);
        outfiter_do_display();
      },
      outfiter_do_colourise_copy = function () {
        var
          i,
          from_suffix = ogebi('[name="radio_colourise"]:checked', 1).val() === 'mount' ? 'm' : '',
          to_suffix = from_suffix === 'm' ? '' : 'm',
          value = to_suffix === 'm' ? 'mount' : 'outfit';
        for (i = 1; i <= 4; i++) { ogebi(to_suffix + 'c' + i).val(ogebi(from_suffix + 'c' + i).val()); }
        ogebi('[name="radio_colourise"][value="' + value + '"]', 1).prop({checked: true}).trigger('change', {is_copy: true});
      },
      outfiter_do_show_outfit = function () {
        var
          checked = $(this).prop('checked'),
          show_outfit_prev = checked ? parseInt(ogebi('show_outfit_prev').val(), 10) : outfiter_outfit_none_id;
        outfiter_do_outfit(show_outfit_prev, true);
      },
      outfiter_do_show_mount = function () {
        var
          checked = $(this).prop('checked'),
          show_mount_prev = checked ? parseInt(ogebi('show_mount_prev').val(), 10) : 0;
        outfiter_do_mount(show_mount_prev, true);
      },
      outfiter_init = function () {
        //Populating mounts list
        $.each(outfiter_mount_names, function (i, v) { if ($.inArray(i, outfiter_mount_names_extra) === -1) { outfiter_mount_names_sorted.push([i, v]); } });
        outfiter_mount_names_sorted.sort(function (a, b) { if (a[1] < b[1] || a[0] === 0) { return -1; } if (a[1] > b[1] || b[0] === 0) { return 1; } return 0; });
        $.each(outfiter_mount_names_sorted, function (i, v) { outfiter_mount_names_sorted[i] = v[0]; });
        outfiter_mount_names_sorted = outfiter_mount_names_sorted.concat(outfiter_mount_names_extra);

        //Populating outfits list
        $.each(outfiter_names, function (i, v) {
          if (v !== undefined && $.inArray(i, outfiter_names_extra) === -1) { outfiter_names_sorted.push([i, v]); }
        });
        outfiter_names_sorted.sort(function (a, b) { if (a[1] < b[1]) { return -1; } if (a[1] > b[1]) { return 1; } return 0; });
        $.each(outfiter_names_sorted, function (i, v) { outfiter_names_sorted[i] = v[0]; });
        outfiter_names_sorted = outfiter_names_sorted.concat(outfiter_names_extra);

        //Get options from url
        outfiter_get_get();
        var
          opt;
        for (opt in outfiter_def) { if (outfiter_def.hasOwnProperty(opt)) {
          if (!outfiter_GET.hasOwnProperty(opt)) { outfiter_GET[opt] = outfiter_def[opt]; }
          if (outfiter_GET[opt] === true) { ogebi(opt).prop({checked: true}); }
          else { ogebi(opt).val(outfiter_GET[opt]); }
        } }

        //Prepare color table
        var d2h = function (d) { d = d.toString(16); return d.length === 1 ? '0' + d : d; };
        //var h2d = function (h) { return parseInt(h, 16); };
        ogebi('dcolor_table div').removeClass('color_table_d_sel')
        .each(function (i) {
          $(this).css('background-color', '#' + d2h(outfiter_color_t[i][0]) + d2h(outfiter_color_t[i][1]) + d2h(outfiter_color_t[i][2]));
        });
        ogebi('.cb_1, .cb_2, .cb_3, .cb_4', 1).on('click', function () {
          ogebi('.cb_1, .cb_2, .cb_3, .cb_4', 1).removeClass('sel');
          $(this).addClass('sel');
          var
            num = ($(this).attr('class').match(/\bcb_(\d+)\b/) || [])[1],
            i = parseInt(num, 10),
            col_type = ogebi('[name="radio_colourise"]:checked', 1).val(),
            val_name = (col_type === 'mount' ? 'm' : '') + 'c' + i;
          ogebi('.dcolor_table div', 1).removeClass('color_table_d_sel')
          .filter(':eq(' + ogebi(val_name).val() + ')').addClass('color_table_d_sel');
        });
        ogebi('cb_1').trigger('click');

        //Check browser support
        var
          comp = true,
          big_canvas = ogebi('canvas_main')[0],
          context;
        if (!big_canvas || !big_canvas.getContext) { comp = false; }
        else {
          context = big_canvas.getContext('2d');
          if (!context || !context.getImageData || !context.putImageData || !context.drawImage) { comp = false; }
        }
        if (!comp) {
          outfiter_hide_body(true);
          alert('Browser not compatible, try latest version of ' + browsers_base); //For wikia
          return false;
        }

        //Prepare color table events
        ogebi('.dcolor_table div', 1).on('click', function () {
          if ($this_main.hasClass('outfiter_loading')) { return; }
          var
            num = (ogebi('.cb_1, .cb_2, .cb_3, .cb_4', 1).filter('.sel').attr('class').match(/\bcb_(\d+)\b/) || [])[1],
            i = parseInt(num, 10),
            col_type = ogebi('[name="radio_colourise"]:checked', 1).val(),
            val_name = (col_type === 'mount' ? 'm' : '') + 'c' + i;
          ogebi('.dcolor_table div', 1).removeClass('color_table_d_sel');
          $(this).addClass('color_table_d_sel');
          ogebi(val_name).val($(this).index());
          outfiter_do_addon();
        });
        ogebi('[name="radio_colourise"]', 1).on('change', function (e, data) {
          ogebi('colourise_copy').text('Copy to ' + (
            ogebi('[name="radio_colourise"]:checked', 1).val() === 'mount' ?
              'Outfit' : 'Mount'
          ));
          ogebi('.cb_1, .cb_2, .cb_3, .cb_4', 1).filter('.sel').trigger('click');
          if (data && data.is_copy) { outfiter_do_addon(); }
        });

        //APNG support
        outfiter_apng_supported = ''; //unknown as default
        try {
          //will set outfiter_apng_supported after a few
          (function () {
            var canvas = document.createElement('canvas');
            if (!(canvas.getContext && canvas.getContext('2d'))) { outfiter_apng_supported = false; }
            var image = new Image();
            var ctx = canvas.getContext('2d');
            image.onload = function () {
              if (!canvas.getContext) { outfiter_apng_supported = false; }
              else {
                ctx.drawImage(image, 0, 0);
                outfiter_apng_supported = ctx.getImageData(0, 0, 1, 1).data[3] === 0;
              }
            };
            image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==';
          }());
        } catch (ignore) { }

        //Images event
        ogebi('.mount_image, .main_image', 1).each(function (i) {
          $(this).on('load', function () {
            outfiter_images_loaded[i] = true;
            //resize canvases
            (i === 0 ? $canvas_main : $canvas_mount).attr({height: $(this).height(), width: $(this).width()});
            //process canvases
            if (outfiter_images_loaded[0] && outfiter_images_loaded[1]) { outfiter_do_display(); }
            return true;
          });
        });

        //Prepare radio lists
        var
          x, t = $(), toggle = true, sep_line = false;
        for (x = 0; x < outfiter_names_sorted.length; x++) {
          if (outfiter_separator[outfiter_names[outfiter_names_sorted[x]]]) { sep_line = true; }
          toggle = !toggle;
          if (sep_line) { t = t.add($('<div />', {class: 'sep_line'})); }
          t = t.add(
            $('<label />', {class: 'list_el'}).append(
              $('<input type="radio" />').attr({name: 'radio_outfits', class: 'darkrad radio_outfits_' + outfiter_names_sorted[x]}),
              $('<span>').attr({class: 'darkrad_in'}),
              $('<div />', {class: 't'}).text(outfiter_names[outfiter_names_sorted[x]].replace(/_/g, ' '))
            ).css({color: (toggle ? '#8F8F8F' : '#bfbfbf')})
          );
          sep_line = false;
        }
        ogebi('radio_outfits').append(t).find('[name=radio_outfits]').on('click', function () {
          var
            cls = $(this).attr('class').split(/\s+/),
            id;
          $.each(cls, function (i) { if (cls[i].substr(0, 13) === 'radio_outfits') { id = parseInt(cls[i].split(/_/g)[2], 10); } });
          if (id !== parseInt(ogebi('outfit').val(), 10)) { outfiter_do_outfit(id, true); }
        });
        t = $(); toggle = true; sep_line = false;
        for (x = 0; x < outfiter_mount_names_sorted.length; x++) {
          if (outfiter_mount_separator[outfiter_mount_names[outfiter_mount_names_sorted[x]]]) { sep_line = true; }
          toggle = !toggle;
          if (sep_line) { t = t.add($('<div />', {class: 'sep_line'})); }
          t = t.add(
            $('<label />', {class: 'list_el'}).append(
              $('<input type="radio" />').attr({name: 'radio_mounts', class: 'darkrad radio_mounts_' + outfiter_mount_names_sorted[x]})
              .prop({checked: String(outfiter_mount_names_sorted[x]) === ogebi('mount').val()}),
              $('<span>').attr({class: 'darkrad_in'}),
              $('<div />', {class: 't'}).text(outfiter_mount_names[outfiter_mount_names_sorted[x]].replace(/_/g, ' '))
            ).css({color: (toggle ? '#8F8F8F' : '#bfbfbf')})
          );
          sep_line = false;
        }
        ogebi('radio_mounts').append(t).find('[name=radio_mounts]').on('click', function () {
          var
            num = ($(this).attr('class').match(/\bradio_mounts_(\d+)\b/) || [])[1],
            id = parseInt(num, 10);
          if (id !== parseInt(ogebi('mount').val(), 10)) { outfiter_do_mount(id, true); }
        });

        //Click events
        ogebi('animate').on('change', outfiter_do_addon);
        ogebi('sanim').on('change', outfiter_do_addon);
        ogebi('show_outfit').on('change', outfiter_do_show_outfit);
        ogebi('floor').on('change', outfiter_do_addon);
        ogebi('soft').on('change', outfiter_do_addon);
        ogebi('hpbar').on('change', outfiter_do_addon);
        ogebi('anistep').on('change', outfiter_do_addon);
        ogebi('template_code').on('change', outfiter_do_addon);
        ogebi('addon1').on('change', function () { outfiter_do_addon(1); });
        ogebi('addon2').on('change', function () { outfiter_do_addon(2); });
        ogebi('show_mount').on('change', outfiter_do_show_mount);
        ogebi('female').on('change', function () { outfiter_load_outfit('female'); });

        ogebi('facingm').on('click', function () { outfiter_do_facing(-1); });
        ogebi('facingp').on('click', function () { outfiter_do_facing(1); });
        ogebi('outfitm').on('click', function () { outfiter_do_outfit(-1); });
        ogebi('outfitp').on('click', function () { outfiter_do_outfit(1); });
        ogebi('mountm').on('click', function () { outfiter_do_mount(-1); });
        ogebi('mountp').on('click', function () { outfiter_do_mount(1); });
        ogebi('colourise_copy').on('click', outfiter_do_colourise_copy);
        ogebi('use_name').on('click', outfiter_do_addon);
        ogebi('clear_name').on('click', function () { ogebi('charn').val(''); outfiter_do_addon(); });
        ogebi('url_input').on('click', function () { $(this).select(); });

        //Filter Mounts and Outfits lists
        ogebi('omsearch').keyup(function () {
          var query = $(this).val().toLowerCase();
          $(this).siblings('label').each(function (i, v) {
            if (!$(v).children('div').first().html().toLowerCase().includes(query)) {
              $(v).hide();
            } else {
              $(v).show();
            }
          });
        });

        //CSS images
        var
          bgs = {
            floor: 'data:image/png;base64,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',
            arrows: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABQCAMAAABcUcfzAAAANlBMVEVGRkZJSUlDQ0NMTEw/Pz9TU1MmJiZwcHB0dHQqKytfX194eHizs7N/f3/GxsaZmZmOjo6pqalcreFfAAADoElEQVR4Xs2TyZLqRhQFz3Br0AT0//+sqSup6RYmvHA4nmtBEMlJsSglWu9taX3prfW29L60VqY67Wd8qXV8BhoIkAEIQgCMOhEIO4CgIBXFgg1QxCCSMCzV6c1VR5MiLCnnhkO1vrnoaBQcJYapEEIxVeriRkcPSN4cEJA7TTWuLls+UcudMJlcGk+82FrQGZzX27o+7v0+99KEWhkXGwtaRPm6Pc993b7mbW7hWiMuths65rF7DYFpAvTbZkeP7fYaLiWHcbXV0eDtx/Apq1bwYqthEZO+ZNUqXmx0LAR4X+/3ZRuzMgt1IojfdkODqPkRiGIhrHCdoIvNjg4IbIIYkCOIOuFqs6HnlQpREDBgolbpYqOhg3DefYAIxLhr8OJywxJQKBeMCEfEVN9cNcR432udfr7+pe1RjDyWLKW3f2hm+h81o70Zfzejv28mYm9mK2cz+O2ezZCUadz72YwudjbTyjI/g3msX7d15t5MXOxspj0L+NrW+wjiq+zNvOw17dEM+ry1HOZyzmZwsUcz6CfLs2UzV3s0w/ZzuDib4cXOZnK47GzD3szVzmbm0sozmOXxTIfcm8HFPpqRlM085rMZXeyjGWBvppWzGVzss5m4NqOL/bEZvlz9+WYCcCEggQYF1OmdjWYCtrkDCXCd3llHs4ZeDKDAIFjrO+uZK2GmbjKIqb6zjg7f8qyzCBIew5Rs4GSjGd6O4+EDZaokT/tgCzp4rGiXADG6Jk77YAsatJMZtmfSrBVyMn6zhq6nnLiQchE4Tfq2T9b3v8Y66PpoLiUwTfnXSttBl0BH03PlyOXxS635xIM9eimOhsWEjO8lylyr+bTxw547FoAwHfOOLdbpZKctNjQbYIEhECBR6vTNDhslb0YADJACwoE6vbNMIQiCCJHAGNY3lkMAQcPIoMyY6jvbsEAiAGJAKqipvrH/phnmu1wKmPUD/tCMbdgy7YHD/NAMYKJowCJA8KdmbNoOgLQKwh+aCdDDKsfF6r0ZZTMIBYQ4y0FkMwZed30bzSg8oEIlmZHNmIZ92qMZI0gIpRyyshmJAs9tNlMYQ88dn6xkM7RAe97t0YzhwvbYq4nbTcpmAAHDzvRGMzRSSoTbCmYzeNnP4WgG5jFbCTOA0Qx1wGHe1mzG3sHsYjJCezOvnX00U0wbUFCFxbE3c9jZUTZD2qZhqBAF/NSMbWt4kGDM9KdmDBeXQiHXBZ+aYXapIhnD8r9r5i+G6EJJ783BBQAAAABJRU5ErkJggg==',
            base: 'data:image/png;base64,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',
            hp_bar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEX///8AAAAAwAC1q34TAAAAAXRSTlMAQObYZgAAAB9JREFUOE9jCAWDEAY4yFoFAkvwCGBoGQWjYBSMSAAAZB0NZefq320AAAAASUVORK5CYII=',
            inputs: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkBAMAAABh4ecdAAAAJFBMVEVHcExwcHAnJyc2NjZ2dna+vr4tLS1GRkZYWFhQUFChoaGGhobMWLNQAAAAAXRSTlMAQObYZgAAANRJREFUeF6djjFLBEEMRj+2sDassK3MgGIZEhktF+4PiAyIdpfiznLY7joRK6vDzn4L/6XMhOMWtBCbwOMlMw8XYR3CFlgHAFFERBFEAmAV+KTOczfcLUB9QprxZb9Rn7Cl8e32wOkvwPVTAl5oXI1nwLgCfrbdLts+98e2m3nfSc4VPmT3oPE653vF81eaX9kqMK4e3+9EzY29zb0cTOSnlpNzy+n/1ZaWbaUc2xKVTogqTFIGjUzUKzZDoomtAuOSyiBqbqzQJAcT09ByiFrO9Ie2b2LhVKVMtycmAAAAAElFTkSuQmCC',
            letters: 'data:image/png;base64,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',
            dark: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAQBAMAAAAblGfKAAAAGFBMVEU4ODg1NjY5Ojo8PDwzMzQ/P0AvMDBDRERjbuM9AAACK0lEQVQYGQUAy3LbIHBZUHxdQPYZgZzzAlZ8BUnuWdbj7qT5gE7a/58OxDR7T2nyTAIUlVHUEKUTGiBvOoAVWRe+1sB5GFAECIOffIwXGTZjXFRkSRN7ZJscrzI4VRawdh/J9HkdPUi5ULyd4+iQK4haq3POcNsEqhxtPobZaiMadICBlYbkBueXur7payhin+lr01T0x1vecDjQS/szaoCKTnfCtwEaTmzO9Tp0X7nO069R2MWDXstrg3x3LqMHPSPfJjS2PluoTz8ow7oul+BE7WfgLYI66/eT9S5ZsqeIvZge39oxwxVyBjcY2My5M5zLLGaDBEHuzaNvlnUSPWUdJTRKfQEyAe0rRgQNanulDouKNUGp7VrkD1UTe7DAUrBPr5KKfYJYzuQBCIxVqZkUTDPkIvSmmuy5V1q2IBP6EOpnqMAA9uEmXhBU+zFrhPrW14DNxxhhOOBkEcHQ2SFLUlalAKsou3LInZweg1FjC6Uk7o87mrMPuKqOb2DvcD0WsUvB8LhpnGwe8PsmVDJKv0wnewfcmHSIEeNSn7qCu8Hht3YneK2KxCTl9j46nD21CoWPYgQfhD1l4vM3td1jQc/do1wFXBpLcuqCOEZsY1UztUYlh4BNaFL+Z9ReRwzBuLya/RthgL03ZpOpGcMpf8a24qSMJhLRkMt3l8ou+2vDJP6qI28Af9BZ00EeL8Veb9j9ft3cHDskEzF7+8SoP5+YQeyjapT7D2DRagKDaYcKAAAAAElFTkSuQmCC'
          },
          css_text;
        if (!$('head .outfiter_style').length) {
          css_text =
          '.outfiter .leftb,' +
          '.outfiter .rightb {' +
          '  background-image: url(\'' + bgs.arrows + '\');' +
          '}' +
          '.outfiter .darkchk_in,' +
          '.outfiter .darkrad_in {' +
          '  background-image: url(\'' + bgs.inputs + '\');' +
          '}' +
          '.outfiter .dark_input,' +
          '.outfiter .div2,' +
          '.outfiter .div2_no_padding {' +
          '  background: #383839 url(\'' + bgs.dark + '\') repeat;' +
          '}' +
          '.outfiter .template_code_code,' +
          '.outfiter .template_code_code[disabled]:active,' +
          '.outfiter .anistep_step,' +
          '.outfiter .color_tab,' +
          '.outfiter .color_tab[disabled]:active,' +
          '.outfiter .nbutton,' +
          '.outfiter .radio_list_out,' +
          '.outfiter .omain_wrap {' +
          '  background: #464747 url(\'' + bgs.base + '\') repeat;' +
          '}';
          $('head').append('<style class="outfiter_style" type="text/css">' + css_text + '<' + '/style>');
        }
        ogebi('floor_image').attr('src', bgs.floor);
        ogebi('letters_image').attr('src', bgs.letters);
        ogebi('hp_bar').attr('src', bgs.hp_bar);
        return true;
      };
    if (outfiter_init()) { outfiter_load_outfit(); }
    $('.outfiter_img').hide();
  });
});