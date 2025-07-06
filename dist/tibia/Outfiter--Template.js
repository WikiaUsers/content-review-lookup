/*global $, jQuery */
/*jslint devel: true, browser: true, indent: 2, white: true, plusplus: true, bitwise: true, vars: true, ass: true */

$(function () {
  'use strict';
  var
    //shared variables for MediaWiki:Outfiter/Template.js and MediaWiki:Outfiter.js START
    loading_img = 'https://static.wikia.nocookie.net/tibia/en/images/8/81/Outfiter_Loading.gif',
    error_img = 'https://static.wikia.nocookie.net/tibia/en/images/f/f6/Outfiter_Error.png',
    //mounts, the array index is the id
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
      'Eventide_Nandu', 'Savanna_Ostrich', 'Phantasmal_Jade', 'White_Lion', 'Cunning_Hyaena',
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
      'Jade_Shrine', 'Obsidian_Shrine', 'Poppy_Ibex', 'Mint_Ibex', 'Cinnamon_Ibex',
      //205
      'Giant_Beaver', 'Ripptor', 'Parade_Horse', 'Jousting_Horse', 'Tourney_Horse',
      //210
      'Mutated_Abomination', 'Brass_Speckled_Koi', 'Ink_Spotted_Koi', 'Tangerine_Flecked_Koi', 'Frostbringer',
      //215
      'Winterstride', 'Icebreacher', 'Boisterous_Bull', 'Obstinate_Ox', 'Surly_Steer',
      //220
      'Foxmouse_(Mount)', 'Spirit_of_Purity', 'Darkfire_Devourer', 'Mystic_Jaguar_(Mount)','Gorgon_Hydra',
      //225
      'Dawnbringer_Pegasus', 'Wrathfire_Pegasus', 'Skybreaker_Pegasus'
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
      'Soil_Guardian', 'Demon_Outfit', 'Cave_Explorer', 'Dream_Warden', 'Jersey',
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
      'Retro_Hunter', 'Retro_Citizen', 'Festive_Outfit', 'Grove_Keeper', 'Pharaoh',
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
    ],
    //other outfits the array index is the id(starting at 100)
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
      'Naga_(C)', 'Naga_(D)', 'Gnome_Female', 'Scientist', 'Weretiger',
      //180
      'Werecrocodile', 'Werepanther'
    ],
    //outfits the array index is the id(starting at 200)
    //must also be added to Template:OutfiterLink
    outfiter_names200 = [
      //200
      'Dragon_Knight', 'Arbalester', 'Royal_Costume', 'Formal_Dress', 'Ghost_Blade',
      //205
      'Nordic_Chieftain', 'Fire-Fighter', 'Fencer', 'Shadowlotus_Disciple', 'Ancient_Aucar',
      //210
      'Frost_Tracer', 'Armoured_Archer', 'Decaying_Defender', 'Darklight_Evoker', 'Flamefury_Mage',
      //215
      'Draccoon_Herald', 'Doom_Knight', 'Celestial_Avenger', 'Blade_Dancer', 'Rootwalker',
      //220
      'Beekeeper', 'Fiend_Slayer', 'Field_Surgeon', 'Monk', 'Winged_Druid',
      //225
      'Martial_Artist', 'Necromancer', 'Illuminator'
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
      Revenant: 8,
      Rune_Master: 8,
      Tyrant: 8,
      Ghost_Blade: 8,
      'Fire-Fighter': 8,
      Armoured_Archer: 8,
      Decaying_Defender: 8,
      Darklight_Evoker: 8,
      Frost_Tracer: 8,
      Celestial_Avenger: 8
    },
    outfiter_sprites_walking = {
      //None: 2,
      Gnome_Female: 2,
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
      Floating_Scholar: 8,
      Brass_Speckled_Koi: 8,
      Ink_Spotted_Koi: 8,
      Tangerine_Flecked_Koi: 8,
      Gorgon_Hydra: 8,
      Dawnbringer_Pegasus: 8,
      Wrathfire_Pegasus: 8,
      Skybreaker_Pegasus: 8
    },
    outfiter_sprites_mount_walking = {
    },
    //mounts that are colourisable
    outfiter_mount_colourisable = {
      Krakoloss: true,
      Shellodon: true,
      Mutated_Abomination: true,
      Gorgon_Hydra: true,
	  Primal_Demonosaur: true,
	  Gloom_Maw_(Mount): true
    },
    //image names with _Female suffix for female
    outfiter_f_suffix_inames = {
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
      Gnome: true,
      Gnome_Female: true,
      Scientist: true,
      Weretiger: true,
      Werecrocodile: true,
      Werepanther: true,
      None: true
    },
    //no mount
    outfiter_m_names = {
      Archdemon: true,
      'Barbarian_(A)': true,
      'Barbarian_(B)': true,
      'Barbarian_(C)': true,
      'Barbarian_(D)': true,
      'Corym_(A)': true,
      'Corym_(B)': true,
      'Corym_(C)': true,
      Cultist: true,
      Dwarf: true,
      Elf: true,
      Frog: true,
      Gnome: true,
      Gnome_Female: true,
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
      'Naga_(D)': true,
      Scientist: true,
      Weretiger: true,
      Werecrocodile: true,
      Werepanther: true
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
      Gnome_Female: true,
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
      Werehyaena: true,
      Scientist: true,
      Werecrocodile: true
    },
    //no ride frame
    outfiter_no_ride_names = {
      Archdemon: true,
      'Barbarian_(A)': true,
      'Barbarian_(B)': true,
      'Barbarian_(C)': true,
      'Barbarian_(D)': true,
      'Corym_(A)': true,
      'Corym_(B)': true,
      'Corym_(C)': true,
      Cultist: true,
      Dwarf: true,
      Elf: true,
      Frog: true,
      Gnome: true,
      Gnome_Female: true,
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
      Scientist: true,
      Weretiger: true,
      Werecrocodile: true,
      Werepanther: true
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

  var
    outfiter_template_loader = function () {
      $('div.outfiter_template:not(.load_started)').filter(function () {
        //checking if the image is visible
        return $(this).visible(true);
      }).each(function () {
        var
          //marking the element so it is not loaded again
          $this_main = $(this).addClass('load_started'),
          $this_image = $('<img />', {class: 'outfiter_image', src: loading_img, alt: 'Loading'}).css({height: 'auto', maxHeight: '100%', maxWidth: '100%', width: 'auto'}),
          outfiter_color_t = [
            [255, 255, 255], [255, 212, 191], [255, 233, 191], [255, 255, 191], [233, 255, 191], [212, 255, 191], [191, 255, 191], [191, 255, 212], [191, 255, 233], [191, 255, 255], [191, 233, 255], [191, 212, 255], [191, 191, 255], [212, 191, 255], [233, 191, 255], [255, 191, 255], [255, 191, 233], [255, 191, 212], [255, 191, 191],
            [218, 218, 218], [191, 159, 143], [191, 175, 143], [191, 191, 143], [175, 191, 143], [159, 191, 143], [143, 191, 143], [143, 191, 159], [143, 191, 175], [143, 191, 191], [143, 175, 191], [143, 159, 191], [143, 143, 191], [159, 143, 191], [175, 143, 191], [191, 143, 191], [191, 143, 175], [191, 143, 159], [191, 143, 143],
            [182, 182, 181], [191, 127, 95], [191, 159, 95], [191, 191, 95], [159, 191, 95], [127, 191, 95], [95, 191, 95], [95, 191, 127], [95, 191, 159], [95, 191, 191], [95, 159, 191], [95, 127, 191], [95, 95, 191], [127, 95, 191], [159, 95, 191], [191, 95, 191], [191, 95, 159], [191, 95, 127], [191, 95, 95],
            [145, 145, 144], [191, 106, 63], [191, 148, 63], [191, 191, 63], [148, 191, 63], [106, 191, 63], [63, 191, 63], [63, 191, 106], [63, 191, 148], [63, 191, 191], [63, 148, 191], [63, 106, 191], [63, 63, 191], [106, 63, 191], [148, 63, 191], [191, 63, 191], [191, 63, 148], [191, 63, 106], [191, 63, 63],
            [109, 109, 109], [255, 85, 0], [255, 170, 0], [255, 255, 0], [170, 255, 0], [84, 255, 0], [0, 255, 0], [0, 255, 84], [0, 255, 170], [0, 255, 255], [0, 169, 255], [0, 85, 255], [0, 0, 255], [85, 0, 255], [169, 0, 255], [254, 0, 255], [255, 0, 170], [255, 0, 85], [255, 0, 0],
            [72, 72, 68], [191, 63, 0], [191, 127, 0], [191, 191, 0], [127, 191, 0], [63, 191, 0], [0, 191, 0], [0, 191, 63], [0, 191, 127], [0, 191, 191], [0, 127, 191], [0, 63, 191], [0, 0, 191], [63, 0, 191], [127, 0, 191], [191, 0, 191], [191, 0, 127], [191, 0, 63], [191, 0, 0],
            [36, 36, 36], [127, 42, 0], [127, 85, 0], [127, 127, 0], [85, 127, 0], [42, 127, 0], [0, 127, 0], [0, 127, 42], [0, 127, 85], [0, 127, 127], [0, 84, 127], [0, 42, 127], [0, 0, 127], [42, 0, 127], [84, 0, 127], [127, 0, 127], [127, 0, 85], [127, 0, 42], [127, 0, 0]
          ],

          outfiter_GET = {},
          outfiter_aframes,
          outfiter_images_loaded = [false, false],
          outfiter_atime,
          outfiter_acurrent = 0,
          //default outfiter options
          outfiter_def = {
            outfit: 0, addon1: false, addon2: false, female: false, facing: 2,
            c1: 0, c2: 0, c3: 0, c4: 0,
            soft: false, animate: false, sanim: false,
            hpbar: false, charn: '',
            mount: 0,
            mc1: 0, mc2: 0, mc3: 0, mc4: 0,
            floor: false
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
          //APNG support
          outfiter_apng_supported,
          ogebi = function (classname, all) { return $this_main.find(all === 1 ? classname : '.' + classname); },
          //canvases
          $canvas_main,
          $canvas_mount,
          $canvas_work,
          $canvas_zoom,
          canvas_main,
          canvas_mount,
          canvas_work,
          canvas_zoom,
          //get options from div data
          outfiter_get_get = function () {
            $.each(outfiter_def, function (option, def) {
              var data = $this_main.data('outfiter_' + option);
              outfiter_GET[option] = data === undefined ? def : (typeof def === 'number' ? parseInt(data, 10) : data);
            });
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
                    else { $this_image.attr({src: error_img}); }
                  },
                  url: window.location.host.match(/(tibia|dantest)\.fandom\.com/) ?
                    //For wikia
                    '/index.php?title=Outfiter:' + utype + '/' + iname + '&action=raw' :
                    //For local
                    'base64/' + utype + '/' + iname + '.txt'
                });
              };
            ajax_call();
          },
          outfiter_load_outfit = function (param) {
            var
              outfit = outfiter_GET.outfit,
              mount = outfiter_GET.mount,
              outfit_n = outfiter_names[outfit],
              mount_n = outfiter_mount_names[mount],
              has_standing_animation_any = outfiter_sprites_standing.hasOwnProperty(outfit_n) || outfiter_sprites_mount_standing.hasOwnProperty(mount_n);
            if (outfiter_m_names[outfit_n] === true || outfiter_mount_names[mount] === undefined) {
              if (param === 'mount') { return; }
              outfiter_GET.mount = 0;
              mount = 0;
              mount_n = outfiter_mount_names[mount];
            }
            if (outfiter_u_names[outfit_n] === true) {
              if (param === 'female') { return; }
              outfiter_GET.female = 0;
            }
            if (!has_standing_animation_any) {
              outfiter_GET.sanim = false;
            }
            outfiter_images_loaded[1] = mount === 0;
            outfiter_images_loaded[0] = false;
            if (mount !== 0) { outfiter_get_ajax(mount_n, 'mount'); }
            outfiter_get_ajax(
              outfit_n,
              outfit >= 100 ? 'other' : (outfiter_GET.female ? 'female' : 'male'),
              outfiter_GET.female && outfiter_f_suffix_inames[outfit_n] === true
            );
          },
          outfiter_animate_char = function () {
            clearTimeout(outfiter_atime);
            outfiter_acurrent++;
            if (outfiter_acurrent >= outfiter_aframes.length) { outfiter_acurrent = 0; }
            $this_image.attr('src', '').attr('src', outfiter_aframes[outfiter_acurrent]);
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
              outfiter_letters = {
                'À': [0, 5, 9], 'Á': [1, 5, 9], 'Â': [2, 5, 9], 'Ã': [3, 5, 9], 'Ä': [4, 5, 9], 'Å': [5, 5, 9], 'Æ': [6, 5, 12], 'Ç': [7, 5, 8],
                'È': [8, 5, 8], 'É': [9, 5, 8], 'Ê': [10, 5, 8], 'Ë': [11, 5, 8], 'Ì': [12, 5, 6], 'Í': [13, 5, 6], 'Î': [14, 5, 6], 'Ï': [15, 5, 6],
                'Ð': [16, 5, 9], 'Ñ': [17, 5, 9], 'Ò': [18, 5, 9], 'Ó': [19, 5, 9], 'Ô': [20, 5, 9], 'Õ': [21, 5, 9], 'Ö': [22, 5, 9], '×': [23, 5, 10],
                'Ø': [24, 5, 9], 'Ù': [25, 5, 9], 'Ú': [26, 5, 9], 'Û': [27, 5, 9], 'Ü': [28, 5, 9], 'Ý': [29, 5, 8], 'Þ': [30, 5, 8], 'ß': [31, 5, 8],
                'à': [0, 6, 8], 'á': [1, 6, 8], 'â': [2, 6, 8], 'ã': [3, 6, 8], 'ä': [4, 6, 8], 'å': [5, 6, 8], 'æ': [6, 6, 12], 'ç': [7, 6, 7],
                'è': [8, 6, 8], 'é': [9, 6, 8], 'ê': [10, 6, 8], 'ë': [11, 6, 8], 'ì': [12, 6, 4], 'í': [13, 6, 4], 'î': [14, 6, 4], 'ï': [15, 6, 4],
                'ð': [16, 6, 8], 'ñ': [17, 6, 8], 'ò': [18, 6, 8], 'ó': [19, 6, 8], 'ô': [20, 6, 8], 'õ': [21, 6, 8], 'ö': [22, 6, 8], '÷': [23, 6, 9],
                'ø': [24, 6, 8], 'ù': [25, 6, 8], 'ú': [26, 6, 8], 'û': [27, 6, 8], 'ü': [28, 6, 8], 'ý': [29, 6, 8], 'þ': [30, 6, 8], 'ÿ': [31, 6, 8],
                ' ': [0, 0, 4], '.': [14, 0, 4], '-': [13, 4, 6],
                '@': [0, 1, 9], 'A': [1, 1, 9], 'B': [2, 1, 8], 'C': [3, 1, 8], 'D': [4, 1, 9], 'E': [5, 1, 8], 'F': [6, 1, 8], 'G': [7, 1, 9],
                'H': [8, 1, 9], 'I': [9, 1, 6], 'J': [10, 1, 6], 'K': [11, 1, 8], 'L': [12, 1, 7], 'M': [13, 1, 10], 'N': [14, 1, 9], 'O': [15, 1, 9],
                'P': [16, 1, 8], 'Q': [17, 1, 9], 'R': [18, 1, 8], 'S': [19, 1, 8], 'T': [20, 1, 8], 'U': [21, 1, 9], 'V': [22, 1, 8], 'W': [23, 1, 12],
                'X': [24, 1, 8], 'Y': [25, 1, 8], 'Z': [26, 1, 8],
                '\'': [7, 0, 4], 'a': [1, 2, 8], 'b': [2, 2, 8], 'c': [3, 2, 7], 'd': [4, 2, 8], 'e': [5, 2, 8], 'f': [6, 2, 5], 'g': [7, 2, 8],
                'h': [8, 2, 8], 'i': [9, 2, 4], 'j': [10, 2, 5], 'k': [11, 2, 8], 'l': [12, 2, 4], 'm': [13, 2, 12], 'n': [14, 2, 8], 'o': [15, 2, 8],
                'p': [16, 2, 8], 'q': [17, 2, 8], 'r': [18, 2, 6], 's': [19, 2, 7], 't': [20, 2, 5], 'u': [21, 2, 8], 'v': [22, 2, 8], 'w': [23, 2, 10],
                'x': [24, 2, 8], 'y': [25, 2, 8], 'z': [26, 2, 7]
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
              draw_text_char = function (i) {
                var
                  v = char_name[i];
                if (outfiter_letters.hasOwnProperty(v)) {
                  ctx_zoom.drawImage(
                    ogebi('letters_image')[0],
                    outfiter_letters[v][0] * 16,
                    outfiter_letters[v][1] * 16,
                    outfiter_letters[v][2],
                    15,
                    lastpos + 1 + floor_offset.x,
                    (outfiter_GET.soft ? 48 : 16) - 1 + floor_offset.y,
                    outfiter_letters[v][2],
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
                namew += 1;
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
            $this_image
            .attr('src', '') //Firefox fix
            .attr({src: output_image});
          },
          outfiter_do_display = function () {
            var display2_delay;
            clearTimeout(outfiter_atime);
            display2_delay = (outfiter_GET.animate && outfiter_apng_supported === '') ? 1500 : 1; //delay the display if animated and apng support is still unknown
            setTimeout(function () {
              try { outfiter_do_display2(); } catch (err) { $this_image.attr({src: error_img}); }
            }, display2_delay);
          },
          outfiter_init = function () {
            //Get options from data
            outfiter_get_get();
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
              $this_image.attr({src: error_img});
              return false;
            }

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

            //CSS images
            var
              bgs = {
                floor: 'data:image/png;base64,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',
                hp_bar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEX///8AAAAAwAC1q34TAAAAAXRSTlMAQObYZgAAAB9JREFUOE9jCAWDEAY4yFoFAkvwCGBoGQWjYBSMSAAAZB0NZefq320AAAAASUVORK5CYII=',
                letters: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfoAAACAAgMAAACetUPJAAAACVBMVEX///8AAAAAwAC1q34TAAAAAXRSTlMAQObYZgAACgNJREFUeF7tmt2K4zwShiVo+TgDdiC6mhqY3WM3OA2dY6dBvhoNzDR0HzsNyVVuFVWZF/nn+zLb7M7CRvAitazS0/otWY67B1XdWoIAqFmeLF40+iwVnDRy4htzsnOBiMV5jKiyxtt2DpAHoWU5iVVuw3HH9XC66ZC/FAJZNcb3b8xmXvyeXTRuJNVLzxCa8+NoZUaV6zk+O1dxejgjH1C0OeaSH960bDpl/rvkS1mfS7yXMok5JLHKC69TNQn5tTHdgVyzZwbbHEfwZfzjhVx6Y+7H3qUTsQ3G4KVf5x+I7ZPyKuG3zGTpc5Nxwsm5gTnbH859AV+Cq46c/iH8geKrwMCX8W9+KrchK5+VH0lYyt5Zfw8sb2nw9X+T9vsk9iV/29t4vX3k9EEF3zv9vyUMecq3Mkn71Podz8/o/6MTvsCI7Uq+zJctA8Mz81PB56Dtr639dcFX1UnrqCf8kMCPrbbDq12xjHfc9y8CPDL/MOf7jL7SuQl+6jTd/BpzPA9jOf7Sfhn/gLqUn69raKD4IVC0bZlvY51trWHMy3WZwXfXdtG8/Q8yji0nNo0LjzTjOxIubJLtOw1hr3GtxsW+RCiP9W/JiSqa/J3BFPVIIv9GwXZdvsTb/o+w+cT2D9u7/v+EfashAPye1FezgsVNpwqsOoid2dYsJyK38fqc7RCz9nuxsbJ1bbHWN9hakti1yq8uWX01/Ab7bVVkpUhiJ4If8dn1FclzsUM8On+5kNiY30sWa32JlL/N6psk7Pa98LXcs8Wd6UnriqQ21zPB8M/sEvPTwTgSm/3TT7fIbyR28FXVWfnHS+9iMu4DKxL4Xus2G/Tfe+b/ga4cxJ2UK/nXvdifS340//LyrvzB2ib8a/+nhuMLgU/Kf2Hf8PI64VsdxlduGpUl+SN8mShxAnyMbdF+BqL94B9fM7tI5TNT45POg4J/Ub4o5pJfe7Sf21j2v0NfsGb93/P494O1vzUbPXeU/NdRYvQd+BJs/DPmD+af8g/gPwl71Gc9Q/pIaucw/47Kl3zlvGY7h6BOP5b83V4Z5fpTfrzYs+z8hbCO+grrLzmsU20rxgF8sVvmV8yow3T/Mf+8x/6zd9hHNh77T21nmjqovSfJ19h/JbaRtNol0oHdGr+RvY8Znw4D3VZMuEliM7to4tNqbt//XS0x2n8Pf1Y14iIRCPl4JPpE6IRTTpeEGIni3Rhn5SS6sT1zwQcNBH6kZX5CvvmtG/h/87z6Af+vAe8IiRVEyf62fSS1ODOlWvnNY1vsV1KubmFX16ZHsrSWq/LkfbKTCPtuFJ3tHJNxrtE+g48cPkbs12aTRtilZPrIOP+MJT949fESwrV8C9tEEoN5IJx/cK6BhtHsaZnfjHaGsnGIfH45Plv7z+CYj7G0COM/5DW+svEc/Di60gfbPDy+kut3ygcH/ve3+U444EsafLVH+xf56P/nZX4a/5rfCJPAjweC/5/Mv54T6P/p/INfL/ip5GP+4Vwf4f8L/nT+bWrMP7w/aDrYmgsJ7xwHQtreK7BuE9ZoIPj/ENQmktaP9Y/1tx60fdi6lkO64SIg0vr+t67y3rRb9R9/7xTCyv5/1z34bvkc6UkVRES/5mJYODPWV7WiEhA2XO2X5W8ADxu8B0/P0Xhvs+8Bthbjwpk5XTWKSkbsudoXMvtSO34Wn+iXH/Yn2G1/iKzOD22/F0bS8tCcHwiMl8yct8z2ev8WGtjJ3jSc4If9CD7nsbQ/05v5MFK+PoPEjfTWnqP12TV8IeXHUcvE4WpvfqKDH8BYoP0S4lF9UhT+kKV8oQfmbGw8N6Q+oenwfrH7mdW3OfWJaoe74343b3+VwQ/vhPuJRFK+0CTgDsnmygMRc8yHXbLZKT9+1XStfJ3Dj8R8jEvFgxjPv8NH++FLjH+CfZV1/h2f4Rd1vuWi/Tvps2T2SctDcz7GH2qu/XdC/+s9FM5b2wlfJKEfyOafrr9y/q1/14NsnDmO72R2yve2Fnpb/ses/a/7j/I3jb3b6/4zXX83hYZs/f0Ddp7Ku/FGYmPedde6/vP3J7VEq/Nx/f4o/Lss5vjW2hXIvq3pevT7+Zr2e21/MNvGqSLhTI//CfbBqxqWJ/hvn/WOeMPOZDhke59SfnUh/f7uy3tDZzyxHUiVHN5pNOD7/Waj752igVVltD9wOl790vVe9Vn7f7fPLoj/ZRsNmifhmJW/NdXO/Pob+IO9u/U9p429fSW039oav2lcXX1N55Rx7vX5AfwXzrvym5/ld9KUlF+j/czX/PhcszqJrf3G4vKx1TNEOKltHI312pu9jDmL9N7c6tb7c5L2l/xU8qVfmZtYZ7d9SyX/h/hN5ccLWT3G/67tT0lZQ0b7g9P2S95A4Efw8V4q/OPZxf5Ag8RU8mPLGtH+lND+0Kp980RovwWf7RuZAz+g/+291PJfkgt9cg3HaVP2f+ps/l3I5gTGX4LMP/tADb623wL4nvll0PnnXy/kv58kptSX82846/oLJ81rUjnXvXfKRx5LxwRB6gEfS1bXn/+eWBeSOJbrD768Vf4xFWtd5ed5zX7S/g78rZpCVLP2Ehd7ms9Io0+w1yGs58EW/ORuDGgO+qT9hO/4hvT/cvCkjfUti//nhwdNF/6s1byHDX4TFwi+Uew8aTnUs8SwfNSvPiCp76l4zHY7TVsof9vU45weWcdsdbxpnpZDPXOG5nvUz2lVTMy257vnwlZ5SfmRsJ8qX+yMnYt6DDBh7HCuD9f+wr0bx8bfd3q/3U1EphZx/ah2pYzxRK7eO5FrGvue18G/VCvyl7PtSRPlidjGvkXO5PBtshDuMcGb6b3Te9iuVKRCUgd+C1BK5prEy/xW+XFRxn+4gX/Q8wQYkIx1GmZ8u7c1n5xWdDi75Kb9P+P7yzuxf1zmV7Je3pf5KalW+ZeO+be1//ixzPd5mV9l8IcLLUnq1f53hWZ84fTDevuHwzJ/0D4QzrLi7fOvj7CDbPzn+cLHt4ZIK/r0+pP5v5hfZdyX1WFNnZ0JJqKJ5F7Nr+8/x4V8T7ivvOHe/lPafMI2uHv4E/L032MFFs4tdiee188/reXVuF8XoRyhnhmDLL8Ve01HmpxbetHa+UeS+Bb/Ve/XRSiXUc+sjiz5mk5O08X5ZgR/7fzDkci/kkh5L1li1G/1aGc9FM+MCX5oTR3SwguPLZ4V3yVVe5OwGrMrpe0Mz8V9P0vTqdV0HFf0MS7mJ1cqcGJYqQO/v58K/iesKsFHQAUb34iX1ezJ0uuK5xVdls4fc/563Xo/ls4LzNHi01/ZL50/buWj/UNa5iNe07P2/3Oh3+L7lfqrjHi1/99vm39oy/r8Kxnl7wFCt6J/tC7k+ZqqXSHNqyWey7GO7ZRh+1cr8Z/w/8bX+A/4f/iPP3C+uOuuu+6666677uFfzp4oQWhJJ3MAAAAASUVORK5CYII='
              },
              css_text;
            if (!$('head .outfiter_template_style').length) {
              css_text =
              '.outfiter_template { background: #FBFBFB; text-align: center; }' +
              '.outfiter_template > * { display: none; }' +
              '.outfiter_template > .hide_canvas { display: block; height: 0; overflow: hidden; }' +
              '.outfiter_template .outfiter_image { display: block; margin: auto; width: 64px; height: 64px; max-height: 100%; max-width: 100%; }';
              $('head').append('<style class="outfiter_template_style" type="text/css">' + css_text + '<' + '/style>');
            }
            ogebi('floor_image').attr('src', bgs.floor);
            ogebi('letters_image').attr('src', bgs.letters);
            ogebi('hp_bar').attr('src', bgs.hp_bar);
            return true;
          };

        $this_main.append(
          $this_image,
          $('<div />', {class: 'hide_canvas'}).append(
            $canvas_work = $('<canvas class="canvas_work" width="64" height="64"><' + '/canvas>'),
            $canvas_zoom = $('<canvas class="canvas_zoom" width="64" height="64"><' + '/canvas>'),
            '<hr />',
            $canvas_main = $('<canvas class="canvas_main" width="512" height="6144"><' + '/canvas>'),
            $canvas_mount = $('<canvas class="canvas_mount" width="256" height="1152"><' + '/canvas>'),
            '<img class="main_image" src="" alt="main_image" />',
            '<img class="mount_image" src="" alt="mount_image" />',
            '<img class="floor_image" alt="floor_image" src="" />',
            '<img class="letters_image" alt="letters_image" src="" />',
            '<img class="hp_bar" alt="hp_bar" src="" />'
          )
        );
        canvas_main = $canvas_main[0];
        canvas_mount = $canvas_mount[0];
        canvas_work = $canvas_work[0];
        canvas_zoom = $canvas_zoom[0];
        if (outfiter_init()) { outfiter_load_outfit(); }
      });
    },
    resize_scroll_timer,
    resize_scroll_time = 500,
    resize_scroll_do = function () { outfiter_template_loader(); },
    resize_scroll_on = function () {
      clearTimeout(resize_scroll_timer);
      resize_scroll_timer = setTimeout(resize_scroll_do, resize_scroll_time);
    };

  //jQuery visible 1.0.0 teamdf.com/jquery-plugins | teamdf.com/jquery-plugins/license
  //eslint-disable-next-line
  (function(d){'use strict';d.fn.visible=function(e,i){var a=d(this).eq(0),f=a.get(0),c=d(window),g=c.scrollTop();c=g+c.height();var b=a.offset().top,h=b+a.height();a=e===true?h:b;b=e===true?b:h;return!!(i===true?f.offsetWidth*f.offsetHeight:true)&&b<=c&&a>=g;};}(jQuery));

  //page load
  outfiter_template_loader();
  //add load events
  $(window).on('resize scroll', resize_scroll_on);
});