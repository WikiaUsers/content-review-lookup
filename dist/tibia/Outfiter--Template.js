/*global $, jQuery */
/*jslint devel: true, browser: true, indent: 2, white: true, plusplus: true, bitwise: true, vars: true, ass: true */

/*! jQuery visible 1.0.0 teamdf.com/jquery-plugins | teamdf.com/jquery-plugins/license */
(function(d){'use strict';d.fn.visible=function(e,i){var a=d(this).eq(0),f=a.get(0),c=d(window),g=c.scrollTop();c=g+c.height();var b=a.offset().top,h=b+a.height();a=e===true?h:b;b=e===true?b:h;return!!(i===true?f.offsetWidth*f.offsetHeight:true)&&b<=c&&a>=g;};}(jQuery));

var outfiter_template_loader = function () {
'use strict';
$('div.outfiter_template:not(.load_started)').filter(function () {
  //checking if the image is visible
  return $(this).visible(true);
}).each(function () {
  var
    loading_img = 'http://images1.wikia.nocookie.net/tibia/en/images/8/81/Outfiter_Loading.gif',
    not_compatible_img = 'http://images2.wikia.nocookie.net/dantest/images/f/f6/Outfiter_Error.png',
    //marking the element so it is not loaded again
    $this_main = $(this).addClass('load_started'),
    $this_image = $('<img />', {'class': 'outfiter_image', src: loading_img, alt: 'Loading'}),
    outfiter_mount_names = [
      /*0*/
      'None', 'Widow_Queen', 'Racing_Bird', 'War_Bear', 'Black_Sheep',
      /*5*/
      'Midnight_Panther', 'Draptor', 'Titanica', 'Tin_Lizzard', 'Blazebringer',
      /*10*/
      'Rapid_Boar', 'Stampor', 'Undead_Cavebear', 'Crystal_Wolf', 'Dromedary',
      /*15*/
      'Kingly_Deer', 'Donkey', 'Scorpion_King', 'Tamed_Panda', 'Tiger_Slug',
      /*20*/
      'Uniwheel', 'Rented_Horse_(A)', 'Rented_Horse_(B)', 'Rented_Horse_(C)', 'Armoured_War_Horse',
      /*25*/
      'War_Horse', 'Lady_Bug', 'Manta_Ray', 'Shadow_Draptor', 'Gnarlhound',
      /*30*/
      'Dragonling', 'Magma_Crawler', 'Ironblight', 'Crimson_Ray', 'Steelbeak',
      /*35*/
      'Water_Buffalo', 'Tombstinger', 'Platesaurian', 'Ursagrodon', 'The_Hellgrip',
      /*40*/
      'Noble_Lion', 'Desert_King', 'Shock_Head', 'Walker', 'Azudocus',
      /*45*/
      'Carpacosaurus', 'Death_Crawler', 'Flamesteed', 'Jade_Lion', 'Jade_Pincer',
      /*50*/
      'Nethersteed', 'Tempest', 'Winter_King', 'Blackpelt', 'Shadow_Hart',
      /*55*/
      'Black_Stag', 'Emperor_Deer', 'Flying_Divan', 'Magic_Carpet', 'Floating_Kashmir',
      /*60*/
      'Doombringer', 'Tundra_Rambler', 'Highland_Yak', 'Glacier_Vagabond', 'Golden_Dragonfly',
      /*65*/
      'Steel_Bee', 'Copper_Fly', 'Hailstorm_Fury', 'Poisonbane', 'Siegebreaker',
      /*70*/
      'Woodland_Prince', 'Glooth_Glider', 'Ringtail_Wacoon', 'Night_Wacoon', 'Emerald_Wacoon',
      /*75*/
      'Flitterkatzen', 'Venompaw', 'Batcat', 'Sea Devil', 'Coralripper',
      /*80*/
      'Plumfish', 'Gorongra', 'Noctungra', 'Silverneck', 'Rented_Horse_(Recruiter)',
      /*85*/
      'Slagsnare', 'Nightstinger', 'Razorcreep', 'Rift_Runner', 'Nightdweller',
      /*90*/
      'Frostflare', 'Cinderhoof', 'Bloodcurl', 'Leafscuttler', 'Mouldpincer',
      /*95*/
      'Sparkion', 'Swamp_Snapper', 'Mould_Shell', 'Reed_Lurker', 'Neon_Sparkid',
      /*100*/
      'Vortexion', 'Ivory_Fang', 'Shadow_Claw', 'Snow_Pelt', 'Stone_Rhino',
      /*105*/
      'Arctic_Unicorn', 'Blazing_Unicorn', 'Prismatic_Unicorn', 'Cranium_Spider', 'Cave_Tarantula',
      /*110*/
      'Gloom_Widow', 'Mole', 'Marsh_Toad', 'Sanguine_Frog', 'Toxic_Toad',
      /*115*/
      'Fleeting_Knowledge', 'Ebony_Tiger', 'Feral_Tiger', 'Jungle_Tiger', 'Tawny_Owl',
      /*120*/
      'Snowy_Owl', 'Boreal_Owl', 'Lacewing_Moth', 'Hibernal_Moth', 'Cold_Percht_Sleigh',
      /*125*/
      'Bright_Percht_Sleigh', 'Dark_Percht_Sleigh', 'Festive_Snowman', 'Muffled_Snowman', 'Caped_Snowman',
      /*130*/
      'Rabbit_Rickshaw', 'Bunny_Dray', 'Cony_Cart', 'Nightmarish_Crocovile', 'River_Crocovile',
      /*135*/
      'Swamp_Crocovile', 'Cerberus_Champion', 'Jousting_Eagle', 'Gryphon', 'Battle_Badger',
      /*140*/
      'Ether_Badger', 'Zaoan_Badger', 'Blue_Rolling_Barrel', 'Green_Rolling_Barrel', 'Red_Rolling_Barrel',
      /*145*/
      'Antelope', 'Haze', 'Snow_Strider', 'Dusk_Pryer', 'Dawn_Strayer',
      /*150*/
      'Cold_Percht_Sleigh_Variant', 'Bright_Percht_Sleigh_Variant', 'Dark_Percht_Sleigh_Variant', 'Cold_Percht_Sleigh_Final', 'Bright_Percht_Sleigh_Final',
      /*155*/
      'Dark_Percht_Sleigh_Final', 'Benevolent_Coral_Rhea', 'Benevolent_Eventide_Nandu', 'Benevolent_Savanna_Ostrich'
    ], //new mounts must also be added to MediaWiki:Outfiter.js and Template:Infobox_Mount
    outfiter_names = [
      /*0*/
      'Citizen', 'Hunter', 'Mage', 'Knight', 'Nobleman',
      /*5*/
      'Summoner', 'Warrior', 'Barbarian', 'Druid', 'Wizard',
      /*10*/
      'Oriental', 'Pirate', 'Assassin', 'Beggar', 'Shaman',
      /*15*/
      'Norseman', 'Jester', 'Brotherhood', 'Nightmare', 'Demon_Hunter',
      /*20*/
      'Yalaharian', 'Newly_Wed', 'Warmaster', 'Wayfarer', 'Afflicted',
      /*25*/
      'Elementalist', 'Deepling', 'Insectoid', 'Entrepreneur', 'Crystal_Warlord',
      /*30*/
      'Soil_Guardian', 'Demon', 'Cave_Explorer', 'Dream_Warden', 'Jersey',
      /*35*/
      'Glooth_Engineer', 'Beastmaster', 'Champion', 'Conjurer', 'Chaos_Acolyte',
      /*40*/
      'Ranger', 'Death_Herald', 'Ceremonial_Garb', 'Puppeteer', 'Spirit_Caller',
      /*45*/
      'Evoker', 'Seaweaver', 'Recruiter', 'Sea_Dog', 'Royal_Pumpkin',
      /*50*/
      'Rift_Warrior', 'Winter_Warden', 'Philosopher', 'Arena_Champion', 'Lupine_Warden',
      /*55*/
      'Retro_Warrior', 'Retro_Summoner', 'Retro_Nobleman', 'Retro_Mage', 'Retro_Knight',
      /*60*/
      'Retro_Hunter', 'Retro_Citizen', 'Festive', 'Grove_Keeper', 'Pharaoh',
      /*65*/
      'Trophy_Hunter', 'Herbalist', 'Sun_Priest', 'Makeshift_Warrior', 'Siege_Master',
      /*70*/
      'Mercenary', 'Discoverer', 'Battle_Mage', 'Sinister_Archer', 'Pumpkin_Mummy',
      /*75*/
      'Dream_Warrior', 'Percht_Raider', 'Owl_Keeper', 'Guidon_Bearer', 'Lion_of_War',
      /*80*/
      'Veteran_Paladin', 'Void_Master', 'Golden_Outfit', 'Hand_of_the_Inquisition', 'Breezy_Garb',
      /*85*/
      'Traditionalist', 'Poltergeist', 'Falconer', 'Herder', 'Trailblazer',
      /*90*/
      'Dragon_Slayer'
    ]; //new outfits must also be added to MediaWiki:Outfiter.js and Template:OutfiterLink
  outfiter_names[100] = 'Frog';
  outfiter_names[101] = 'Elf';
  outfiter_names[102] = 'Dwarf';
  outfiter_names[103] = 'Archdemon';
  outfiter_names[104] = 'CM';
  outfiter_names[105] = 'None';
  outfiter_names[106] = 'Barbarian_(A)';
  outfiter_names[107] = 'Barbarian_(B)';
  outfiter_names[108] = 'Barbarian_(C)';
  outfiter_names[109] = 'Barbarian_(D)';
  outfiter_names[110] = 'Gnome';
  outfiter_names[111] = 'Corym_(A)';
  outfiter_names[112] = 'Corym_(B)';
  outfiter_names[113] = 'Corym_(C)';
  outfiter_names[114] = 'Cultist';
  outfiter_names[115] = 'Demon_Hellfire';
  outfiter_names[116] = 'Demon_Ram_(A)';
  outfiter_names[117] = 'Destroyer_from_Beyond';
  outfiter_names[118] = 'Galvanic_Terror';
  outfiter_names[119] = 'Pit_Demon';
  outfiter_names[120] = 'Faun';
  outfiter_names[121] = 'Orclops_Ravager';
  outfiter_names[122] = 'Shaper';
  outfiter_names[123] = 'The_First_Dragon';
  outfiter_names[124] = 'Falcon_(A)';
  outfiter_names[125] = 'Falcon_(B)';
  outfiter_names[126] = 'True_Asura';
  outfiter_names[127] = 'Squid';
  outfiter_names[128] = 'Book';
  outfiter_names[129] = 'Guardian_of_Tales';
  outfiter_names[130] = 'Demon_Ram_(B)';
  outfiter_names[131] = 'Dreamelf';
  outfiter_names[132] = 'Spectre_(A)';
  outfiter_names[133] = 'Spectre_(B)';
  outfiter_names[134] = 'Carnivora';
  outfiter_names[135] = 'Hireling_Banker';
  outfiter_names[136] = 'Hireling_Trader';
  outfiter_names[137] = 'Hireling_Cook';
  outfiter_names[138] = 'Hireling_Steward';
  outfiter_names[139] = 'Hireling_Servant';
  outfiter_names[140] = 'Cobra_Mercenary';
  outfiter_names[141] = 'Issavi_Villager';
  outfiter_names[142] = 'Energy_Wisp';
  outfiter_names[143] = 'Lamassu';
  outfiter_names[144] = 'Sphinx';
  outfiter_names[145] = 'Manticore';
  outfiter_names[146] = 'Lich_Knight_(A)';
  outfiter_names[147] = 'Lich_Knight_(B)';
  outfiter_names[148] = 'Lich_Knight_(C)';
  var
    //outfits with irregular amount of sprites, regular is 1 standing, 8 walking
    outfiter_sprites_standing = {
      'Chaos_Acolyte': 8,
      'Evoker': 8,
      'Battle_Mage': 8,
      'Lion_of_War': 8,
      'Veteran_Paladin': 8,
      'Void_Master': 8,
      'Squid': 8,
      'Book': 8,
      'Guardian_of_Tales': 8,
      'Spectre_(A)': 8,
      'Spectre_(B)': 8,
      'Hireling_Banker': 13,
      'Hireling_Trader': 11,
      'Hireling_Cook': 11,
      'Hireling_Steward': 12,
      'Hireling_Servant': 5, //pingpong
      'Golden_Outfit': 8,
      'Energy_Wisp': 8,
      'Trailblazer': 8
    },
    outfiter_sprites_walking = {
      'CM': 2,
//      'None': 2,
      'Gnome': 2,
      'Corym_(C)': 2,
      'Hireling_Banker': 13,
      'Hireling_Trader': 11,
      'Hireling_Cook': 11,
      'Hireling_Steward': 12,
      'Hireling_Servant': 5 //pingpong
    },
    //mounts with irregular amount of sprites, regular is 1 standing, 8 walking
    outfiter_sprites_mount_standing = {
      'Flying_Divan': 8,
      'Magic_Carpet': 8,
      'Floating_Kashmir': 8,
      'Copper_Fly': 10,
      'Flamesteed': 8,
      'Glooth_Glider': 10,
      'Golden_Dragonfly': 10,
      'Nethersteed': 8,
      'Steel_Bee': 10,
      'Tempest': 8,
      'Flitterkatzen': 8,
      'Venompaw': 8,
      'Batcat': 8,
      'Sea Devil': 8,
      'Coralripper': 8,
      'Plumfish': 8,
      'Nightdweller': 8,
      'Frostflare': 8,
      'Cinderhoof': 8,
      'Fleeting_Knowledge': 8,
      'Cerberus_Champion': 8,
      'Jousting_Eagle': 8
    },
    outfiter_sprites_mount_walking = {
    },
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
      'Demon_Hellfire': true,
      'Demon_Ram_(A)': true,
      'Destroyer_from_Beyond': true,
      'Galvanic_Terror': true,
      'Pit_Demon': true,
      'Faun': true,
      'Orclops_Ravager': true,
      'Shaper': true,
      'The_First_Dragon': true,
      'Falcon_(A)': true,
      'Falcon_(B)': true,
      'True_Asura': true,
      Squid: true,
      Book: true,
      'Guardian_of_Tales': true,
      'Demon_Ram_(B)': true,
      'Spectre_(A)': true,
      'Spectre_(B)': true,
      Carnivora: true,
      'Cobra_Mercenary': true,
      Lamassu: true,
      Sphinx: true,
      Manticore: true,
      'Lich_Knight_(A)': true,
      'Lich_Knight_(B)': true,
      'Lich_Knight_(C)': true,
      'Energy_Wisp': true,
      None: true
    }, /*no female*/
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
      'Demon_Hellfire': true,
      'Demon_Ram_(A)': true,
      'Destroyer_from_Beyond': true,
      'Galvanic_Terror': true,
      'Pit_Demon': true,
      'Faun': true,
      'Orclops_Ravager': true,
      'Shaper': true,
      'The_First_Dragon': true,
      'Falcon_(A)': true,
      'Falcon_(B)': true,
      'True_Asura': true,
      Squid: true,
      Book: true,
      'Guardian_of_Tales': true,
      'Demon_Ram_(B)': true,
      Dreamelf: true,
      'Spectre_(A)': true,
      'Spectre_(B)': true,
      Carnivora: true,
      'Hireling_Banker': true,
      'Hireling_Trader': true,
      'Hireling_Cook': true,
      'Hireling_Steward': true,
      'Hireling_Servant': true,
      'Cobra_Mercenary': true,
      'Issavi_Villager': true,
      Lamassu: true,
      Sphinx: true,
      Manticore: true,
      'Lich_Knight_(A)': true,
      'Lich_Knight_(B)': true,
      'Lich_Knight_(C)': true,
      'Energy_Wisp': true
    }, /*no mount*/
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
      Elf: true,
      Dwarf: true,
      Frog: true,
      Gnome: true,
      Jersey: true,
      Newly_Wed: true,
      None: true,
      'Retro_Warrior': true,
      'Retro_Summoner': true,
      'Retro_Nobleman': true,
      'Retro_Mage': true,
      'Retro_Knight': true,
      'Retro_Hunter': true,
      'Retro_Citizen': true,
      'Faun': true,
      'Orclops_Ravager': true,
      'Shaper': true,
      'Falcon_(A)': true,
      'Falcon_(B)': true,
      'True_Asura': true,
      'Guardian_of_Tales': true,
      Squid: true,
      Book: true,
      'Spectre_(A)': true,
      'Spectre_(B)': true,
      'Hireling_Banker': true,
      'Hireling_Trader': true,
      'Hireling_Cook': true,
      'Hireling_Steward': true,
      'Hireling_Servant': true,
      Lamassu: true,
      Manticore: true,
      'Energy_Wisp': true
    }, /*no addon*/
    outfiter_o_names = {
      Yalaharian: true
    }, /*one addon*/
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
      Elf: true,
      Dwarf: true,
      Frog: true,
      Gnome: true,
      None: true,
      'Demon_Hellfire': true,
      'Demon_Ram_(A)': true,
      'Destroyer_from_Beyond': true,
      'Galvanic_Terror': true,
      'Pit_Demon': true,
      'Faun': true,
      'Orclops_Ravager': true,
      'Shaper': true,
      'Falcon_(A)': true,
      'Falcon_(B)': true,
      'True_Asura': true,
      Squid: true,
      Book: true,
      'Guardian_of_Tales': true,
      'Demon_Ram_(B)': true,
      'Dreamelf': true,
      'Spectre_(A)': true,
      'Spectre_(B)': true,
      'Carnivora': true,
      'Hireling_Banker': true,
      'Hireling_Trader': true,
      'Hireling_Cook': true,
      'Hireling_Steward': true,
      'Hireling_Servant': true,
      'Cobra_Mercenary': true,
      'Issavi_Villager': true,
      Lamassu: true,
      Sphinx: true,
      Manticore: true,
      'Lich_Knight_(A)': true,
      'Lich_Knight_(B)': true,
      'Lich_Knight_(C)': true,
      'Energy_Wisp': true
    },/* no ride frame */
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
    outfiter_def = {outfit: 0, addon1: false, addon2: false, female: false, facing: 2, c1: 0, c2: 0, c3: 0, c4: 0, soft: false, animate: false, sanim: false, hpbar: false, charn: '', mount: 0},

    /*APNG support*/
    outfiter_apng_supported,

    ogebi = function (classname, all) { return $this_main.find(all === 1 ? classname : '.' + classname); },

    /* canvases */
    $canvas_main,
    $canvas_mount,
    $canvas_work,
    $canvas_zoom,

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
        big_canvas, context, r, p, m;
      big_canvas = par.src === 'mount' ? $canvas_mount[0] : $canvas_main[0];
      context = big_canvas.getContext('2d');
      r = context.getImageData(par.x * par.w, par.y * par.h, par.w, par.h);
      if (par.pink) {
        p = 0; m = r.width * r.height * 4;
        while (p < m) { if (r.data[p] === 255 && r.data[p + 1] === 0 && r.data[p + 2] === 255) { r.data[p + 3] = 0; } p += 4; }
      }
      return r;
    },
    //merge pixel data
    outfiter_pixels_merge = function (bottom, top) {
      if (bottom === false) { return top; }
      if (top === false) { return bottom; }
      var
        i,
        bpix = bottom.data,
        tpix = top.data,
        p = bottom.width * bottom.height,
        pixr = p * 4, pixg, pixb, pixa,
        r1, g1, b1, a1,
        res = $canvas_work[0].getContext('2d').createImageData(bottom.width, bottom.height),
        rpix;
      rpix = res.data;
      if (rpix.set) { rpix.set(bpix); }
      else { for (i = 0; i < bpix.length; i++) { rpix[i] = bpix[i];} }
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
    outfiter_pixels_blend = function (main, blend) {
      var
        color_t = outfiter_color_t,
        c1 = outfiter_GET.c1, c2 = outfiter_GET.c2, c3 = outfiter_GET.c3, c4 = outfiter_GET.c4,
        bpix = blend.data,
        mpix = main.data,
        p = blend.width * blend.height,
        pixr = p * 4, pixg, pixb,
        r1, g1, b1;
      while (p--) {
        r1 = bpix[pixr -= 4]; g1 = bpix[pixg = pixr + 1]; b1 = bpix[pixb = pixr + 2];
    /*change blend colors*/
        if ((r1 === 255) && g1 === 255 && (b1 === 0)) { r1 = color_t[c1][0]; g1 = color_t[c1][1]; b1 = color_t[c1][2]; }
        else if (r1 === 255 && g1 === 0 && b1 === 0) { r1 = color_t[c2][0]; g1 = color_t[c2][1]; b1 = color_t[c2][2]; }
        else if (r1 === 0 && g1 === 255 && b1 === 0) { r1 = color_t[c3][0]; g1 = color_t[c3][1]; b1 = color_t[c3][2]; }
        else if (r1 === 0 && g1 === 0 && b1 === 255) { r1 = color_t[c4][0]; g1 = color_t[c4][1]; b1 = color_t[c4][2]; }
        if (mpix[pixr] === 255 && mpix[pixg] === 0 && mpix[pixb] === 255) { mpix[pixb + 1] = 0; }
        if (!(r1 === 255 && g1 === 0 && b1 === 255)) {
    /*Multiply*/
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
        noaddons = outfiter_a_names[outfiter_names[outfiter_GET.outfit]] === true,
        noride = outfiter_no_ride_names[outfiter_names[outfiter_GET.outfit]] === true,
        // Don't treat "other" outfits differently
        //mult_y = outfiter_GET.outfit >= 100 ? 1 : (noaddons ? 2 : 6),
        mult_y = (noaddons ? 1 : 3) * (noride ? 1 : 2),
        base_y = (outfiter_GET.mount ? (noaddons ? 1 : 3) : 0) + (anim * mult_y);
        base_y += (outfiter_GET.animate ?
          (!outfiter_GET.sanim && outfiter_sprites_standing.hasOwnProperty(outfiter_names[outfiter_GET.outfit]) ?
          outfiter_sprites_standing[outfiter_names[outfiter_GET.outfit]] : 0
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
        base_y_m;
      if (outfiter_GET.mount) {
        base_y_m = anim + (outfiter_GET.animate ?
          (!outfiter_GET.sanim && outfiter_sprites_mount_standing.hasOwnProperty(outfiter_mount_names[outfiter_GET.mount]) ?
            outfiter_sprites_mount_standing[outfiter_mount_names[outfiter_GET.mount]] : 0
          ) : 0
        );
        pixel_data = outfiter_pixels_get_sub({x: outfiter_GET.facing, y: base_y_m, src: 'mount'});
      }
      return pixel_data;
    },
    //draw pixel data to a canvas
    outfiter_pixels_draw = function (par) {
      par = outfiter_parameters_get({$canvas: $canvas_work, pixels: false, x: 0, y: 0, clear: false, resize: false}, par);
      if (par.pixels === false) { return; }
      if (par.resize) { par.$canvas.attr({width: par.pixels.width, height: par.pixels.height}); }
      if (par.clear) { par.$canvas.attr({width: par.$canvas.attr('width'), height: par.$canvas.attr('height')}); }
      par.$canvas[0].getContext('2d').putImageData(par.pixels, par.x, par.y);
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
      new_pixels = $canvas_work[0].getContext('2d').createImageData(neww, pixels.height);
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
        $canvas_work[0].getContext('2d').putImageData(new_pixels, x_extra, 0);
        new_pixels = $canvas_work[0].getContext('2d').getImageData(0, 0, min_width, pixels.height);
      }
      return new_pixels;
    },
    //get mount or outfit images
    outfiter_get_ajax = function (name, type) {
      var
        rname = name,
        utype = type.substr(0, 1).toUpperCase() + type.substr(1),
        t;
      if (name === 'Gnome' || name === 'Dreamelf' || name === 'Hireling_Trader' || name === 'Hireling_Banker' || name === 'Hireling_Cook' || name === 'Hireling_Steward' || name === 'Hireling_Servant' || name === 'Issavi_Villager') { rname = name + (outfiter_GET.female ? '_Female' : ''); }
      t = window.location.host.match(/(tibia|dantest)\.fandom\.com/) ?
        /*For wikia*/
        '/index.php?title=Outfiter/' + utype + '/' + rname + '&action=raw' :
        /*For local*/
        'base64/' + utype + '/' + rname + '.txt';
      $.ajax({url: t, dataType: 'text', success: function (text) {
        var
          r = text.match(new RegExp('id="' + (rname.replace(/\(/, '\\(').replace(/\)/, '\\)')) + '">' + '([\\w\\W]*)' + '</' + 'pre>', 'i'));
        if (r !== null) {
          text = r[1].replace(/\s+/g, '');
          if (type === 'mount') { ogebi('mount_image').attr('src', '').attr('src', text); }
          else { ogebi('main_image').attr('src', '').attr('src', text); }
        }
      }});
    },
    outfiter_load_outfit = function (param) {
      var
        outfit = outfiter_GET.outfit,
        mount = outfiter_GET.mount,
        outfiter_n = outfiter_names[outfit],
        mount_n = outfiter_mount_names[mount],
        has_standing_animation_any = outfiter_sprites_standing.hasOwnProperty(outfiter_names[outfiter_GET.outfit]) || outfiter_sprites_mount_standing.hasOwnProperty(outfiter_mount_names[outfiter_GET.mount]);

      if (outfiter_m_names[outfiter_n] === true || outfiter_mount_names[mount] === undefined) {
        if (param === 'mount') { return; }
        outfiter_GET.mount = 0;
        mount = 0;
        mount_n = outfiter_mount_names[mount];
      }
      if (outfiter_u_names[outfiter_n] === true) {
        if (param === 'female') { return; }
        outfiter_GET.female = 0;
      }
      if (!has_standing_animation_any) {
        outfiter_GET.sanim = false;
      }
      outfiter_images_loaded[1] = (mount === 0 ? true : false);
      outfiter_images_loaded[0] = false;
      if (mount !== 0) { outfiter_get_ajax(mount_n, 'mount'); }
      outfiter_get_ajax(outfiter_n, outfit >= 100 ? 'other' : (outfiter_GET.female ? 'female' : 'male'));
    },
    outfiter_animate_char = function () {
      outfiter_acurrent++;
      if (
        outfiter_acurrent >= outfiter_aframes.length
      ) { outfiter_acurrent = 0; }
      $this_image.attr('src', '').attr('src', outfiter_aframes[outfiter_acurrent]);
    },
    greatest_common_factor = function (x, y) {
      var
        a = Math.max(x, y),
        b = Math.min(x, y),
        c = 1,
        res;
      do {
        c = a % b;
        // capture last value of $b as the potential last GCF result
        res = b;
        // if $c did not = 0 we need to repeat with the values held in $b and $c
        // at this point $b is higher than $c so we set up for the next iteration
        // set $a to the higher number and $b to the lower number
        a = b;
        b = c;
      }
      while (c !== 0);
      return res;
    },
    least_common_multiple = function (x, y) {
      return (x * y) / greatest_common_factor(x, y);
    },
    outfiter_outfit_speed = function () {
      var
        res = 504 / (outfiter_sprites_walking.hasOwnProperty(outfiter_names[outfiter_GET.outfit]) ?
          outfiter_sprites_walking[outfiter_names[outfiter_GET.outfit]] :
          8
        );
      return res;
    },
    outfiter_do_display2 = function () {
      var
        outfiter_letters = {
          'À': [0, 5, 9], 'Á': [1, 5, 9], 'Â': [2, 5, 9], 'Ã': [3, 5, 9], 'Ä': [4, 5, 9], 'Å': [5, 5, 9], 'Æ': [6, 5, 10], 'Ç': [7, 5, 8],
          'È': [8, 5, 8], 'É': [9, 5, 8], 'Ê': [10, 5, 8], 'Ë': [11, 5, 8], 'Ì': [12, 5, 6], 'Í': [13, 5, 6], 'Î': [14, 5, 6], 'Ï': [15, 5, 6],
          'Ð': [16, 5, 10], 'Ñ': [17, 5, 9], 'Ò': [18, 5, 9], 'Ó': [19, 5, 9], 'Ô': [20, 5, 9], 'Õ': [21, 5, 9], 'Ö': [22, 5, 9], '×': [23, 5, 7],
          'Ø': [24, 5, 9], 'Ù': [25, 5, 9], 'Ú': [26, 5, 9], 'Û': [27, 5, 9], 'Ü': [28, 5, 9], 'Ý': [29, 5, 8], 'Þ' : [30, 5, 8], 'ß': [31, 5, 8],
          'à': [0, 6, 8], 'á': [1, 6, 8], 'â': [2, 6, 8], 'ã': [3, 6, 8], 'ä': [4, 6, 8], 'å': [5, 6, 8], 'æ': [6, 6, 9], 'ç': [7, 6, 7],
          'è': [8, 6, 8], 'é': [9, 6, 8], 'ê': [10, 6, 8], 'ë': [11, 6, 8], 'ì': [12, 6, 5], 'í': [13, 6, 5], 'î': [14, 6, 6], 'ï': [15, 6, 6],
          'ð': [16, 6, 8], 'ñ': [17, 6, 8], 'ò': [18, 6, 8], 'ó': [19, 6, 8], 'ô': [20, 6, 8], 'õ': [21, 6, 8], 'ö': [22, 6, 8], '÷': [23, 6, 8],
          'ø': [24, 6, 8], 'ù': [25, 6, 8], 'ú': [26, 6, 8], 'û': [27, 6, 8], 'ü': [28, 6, 8], 'ý': [29, 6, 8], 'þ': [30, 6, 8], 'ÿ': [31, 6, 8],
          ' ': [0, 0, 4],
          '@': [0, 1, 9], 'A': [1, 1, 9], 'B': [2, 1, 8], 'C': [3, 1, 8], 'D': [4, 1, 9], 'E': [5, 1, 8], 'F': [6, 1, 8], 'G': [7, 1, 9],
          'H': [8, 1, 9], 'I': [9, 1, 6], 'J': [10, 1, 7], 'K': [11, 1, 8], 'L': [12, 1, 8], 'M': [13, 1, 10], 'N': [14, 1, 9], 'O': [15, 1, 9],
          'P': [16, 1, 8], 'Q': [17, 1, 9], 'R': [18, 1, 9], 'S': [19, 1, 8], 'T': [20, 1, 10], 'U': [21, 1, 9], 'V': [22, 1, 8], 'W': [23, 1, 10],
          'X': [24, 1, 8], 'Y': [25, 1, 8], 'Z': [26, 1, 8],
          "'": [0, 2, 4], 'a': [1, 2, 8], 'b': [2, 2, 8], 'c': [3, 2, 7], 'd': [4, 2, 8], 'e': [5, 2, 8], 'f': [6, 2, 7], 'g': [7, 2, 8],
          'h': [8, 2, 8], 'i': [9, 2, 4], 'j': [10, 2, 6], 'k': [11, 2, 8], 'l': [12, 2, 4], 'm': [13, 2, 10], 'n': [14, 2, 8], 'o': [15, 2, 8],
          'p': [16, 2, 8], 'q': [17, 2, 8], 'r': [18, 2, 7], 's': [19, 2, 7], 't': [20, 2, 7], 'u': [21, 2, 8], 'v': [22, 2, 8], 'w': [23, 2, 10],
          'x': [24, 2, 8], 'y': [25, 2, 8], 'z': [26, 2, 7]
        },
        af_o = outfiter_GET.animate ?
          (outfiter_GET.sanim ?
            (outfiter_sprites_standing.hasOwnProperty(outfiter_names[outfiter_GET.outfit]) ?
              outfiter_sprites_standing[outfiter_names[outfiter_GET.outfit]] : 1
            ) :
            (outfiter_sprites_walking.hasOwnProperty(outfiter_names[outfiter_GET.outfit]) ?
              outfiter_sprites_walking[outfiter_names[outfiter_GET.outfit]] : 8
            )
          ) : 0,
        af_m = outfiter_GET.mount ?
          (outfiter_GET.animate ?
            (outfiter_GET.sanim ?
              (outfiter_sprites_mount_standing.hasOwnProperty(outfiter_mount_names[outfiter_GET.mount]) ?
                outfiter_sprites_mount_standing[outfiter_mount_names[outfiter_GET.mount]] : 1
              ) :
              (outfiter_sprites_mount_walking.hasOwnProperty(outfiter_mount_names[outfiter_GET.mount]) ?
                outfiter_sprites_mount_walking[outfiter_mount_names[outfiter_GET.mount]] : 8
              )
            ) : 0
          ) : af_o,
        done = false,
        af = (af_o === 0 || af_m === 0) ? 0 : least_common_multiple(af_o, af_m),
        afi,
        frames = [],
        frames_o = [],
        frames_m = [],
        pos_o,
        pos_m,
        limit_left = false,
        limit_right = false,
        pixel_data,
        ctx_zoom,
        output_image,
        //name vars
        bar_xpos = outfiter_GET.soft ? (outfiter_GET.outfit === 103 ? 44 : 82) : (outfiter_GET.outfit === 103 ? 16 : 34),
        namew,
        name_center = bar_xpos + 13,
        name_left,
        name_right,
        char_name = decodeURI(outfiter_GET.charn).split(''),
        lastpos,
        has_standing_animation_o = outfiter_GET.animate && outfiter_sprites_standing.hasOwnProperty(outfiter_names[outfiter_GET.outfit]),
        has_standing_animation_m = outfiter_GET.animate && outfiter_sprites_mount_standing.hasOwnProperty(outfiter_mount_names[outfiter_GET.mount]),
        draw_text_char = function (i) {
          var
            v = char_name[i];
          if (outfiter_letters.hasOwnProperty(v)) {
            ctx_zoom.drawImage(
              ogebi('letters_image')[0],
              outfiter_letters[v][0] * 16, outfiter_letters[v][1] * 16, outfiter_letters[v][2], 15,
              lastpos, (outfiter_GET.soft ? 48 : 16), outfiter_letters[v][2], 15
            );
            lastpos += outfiter_letters[v][2] - 1;
          }
        },
        namew_add = function (i) { if (outfiter_letters.hasOwnProperty(char_name[i])) { namew += outfiter_letters[char_name[i]][2] - 1; } };
      //clean saved image frames
      outfiter_aframes = [];
      //clear canvases
      $canvas_main.attr({width: $canvas_main.attr('width'), height: $canvas_main.attr('height')});
      $canvas_mount.attr({width: $canvas_mount.attr('width'), height: $canvas_mount.attr('height')});
      //fill canvases with images
      try { $canvas_main[0].getContext('2d').drawImage(ogebi('main_image')[0], 0, 0); } catch (ignore) {/*Firefox fix*/}
      try { $canvas_mount[0].getContext('2d').drawImage(ogebi('mount_image')[0], 0, 0); } catch (ignore) {/*Firefox fix*/}
      ctx_zoom = $canvas_zoom[0].getContext('2d');
      //getting animation frames
      for (afi = 0; afi < af || (af === 0 && done === false); afi++) {
        //get basic data
        if (af === 0) {
          pixel_data = outfiter_pixels_merge(outfiter_pixels_get_mount(0), outfiter_pixels_get_out(0));
          done = true;
        }
        else {
         pos_o = (afi % af_o) + (has_standing_animation_o ? 0 : (outfiter_GET.sanim ? 0 : 1));
         pos_m = (afi % af_m) + (has_standing_animation_m ? 0 : (outfiter_GET.sanim ? 0 : 1));
//console.log({afi: afi, pos_o: pos_o, pos_m: pos_m});
          if (!frames_m[pos_m]) { frames_m[pos_m] = outfiter_pixels_get_mount(pos_m); }
          if (!frames_o[pos_o]) { frames_o[pos_o] = outfiter_pixels_get_out(pos_o); }
          pixel_data = outfiter_pixels_merge(frames_m[pos_m], frames_o[pos_o]);
        }
        //draw normal
        outfiter_pixels_draw({pixels: pixel_data, clear: true});
        //draw zoomed
        $canvas_zoom.attr({width: outfiter_GET.soft ? 128 : 64, height: outfiter_GET.soft ? 128 : 64});
        ctx_zoom.drawImage(
          $canvas_work[0],
          0, 0, 64, 64,
          0, 0, outfiter_GET.soft ? 128 : 64, outfiter_GET.soft ? 128 : 64
        );
        pixel_data = ctx_zoom.getImageData(0, 0, parseInt($canvas_zoom.attr('width'), 10), parseInt($canvas_zoom.attr('height'), 10));
        //hp bar
        if (outfiter_GET.hpbar) {
          ctx_zoom.drawImage(
            ogebi('hp_bar')[0],
            0, 0, 64, 64,
            bar_xpos, outfiter_GET.soft ? 60 : 28, 64, 64
          );
          pixel_data = ctx_zoom.getImageData(0, 0, parseInt($canvas_zoom.attr('width'), 10), parseInt($canvas_zoom.attr('height'), 10));
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
          if (parseInt($canvas_zoom.attr('width'), 10) - name_center < namew / 2) { name_right = Math.ceil((namew / 2) - (parseInt($canvas_zoom.attr('width'), 10) - name_center)); }
          if (name_center < namew / 2) { name_left = Math.ceil((namew / 2) - name_center); }
          $canvas_zoom.attr('width', parseInt($canvas_zoom.attr('width'), 10) + name_left + name_right);
          outfiter_pixels_draw({$canvas: $canvas_zoom, pixels: pixel_data, x: name_left, clear: false});
          lastpos = name_center + name_left - Math.floor(namew / 2);
          //draw the text
          $.each(char_name, draw_text_char);
          pixel_data = ctx_zoom.getImageData(0, 0, parseInt($canvas_zoom.attr('width'), 10), parseInt($canvas_zoom.attr('height'), 10));
        }

        //save frame pixel_data
        frames[afi] = pixel_data;
      }

      //get limits
      $.each(frames, function (i) {
        var
          limits = outfiter_pixels_hlimits(frames[i]);
        limit_left = limit_left === false ? limits[0] : Math.min(limits[0], limit_left);
        limit_right = limit_right === false ? limits[1] : Math.max(limits[1], limit_right);
      });
      //crop/expand to limits (frames & outfiter_aframes)
      $.each(frames, function (i) {
        frames[i] = outfiter_pixels_hcrop_expand(frames[i], limit_left, limit_right, outfiter_GET.soft ? 128 : 64);
        outfiter_pixels_draw({$canvas: $canvas_zoom, pixels: frames[i], resize: true});
        outfiter_aframes[i] = $canvas_zoom[0].toDataURL();
      });
      //output the image
      output_image = outfiter_aframes[0];
      if (outfiter_GET.animate) {
        if (outfiter_apng_supported) {
          /*APNG support functions*/
          var
            keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode64 = function (b) { var c = []; var a, d, f; var e, j, h, i; var g = 0; do { a = b[g++]; d = b[g++]; f = b[g++]; e = a >> 2; j = ((a & 3) << 4) | (d >> 4); h = ((d & 15) << 2) | (f >> 6); i = f & 63; if (isNaN(d)) { h = i = 64; } else if (isNaN(f)) { i = 64; } c = c + keyStr.charAt(e) + keyStr.charAt(j) + keyStr.charAt(h) + keyStr.charAt(i); } while (g < b.length); return c; },
            decode64 = function (b) { var c = []; var a, d, f; var e, j, h, i; var g = 0; do {e = keyStr.indexOf(b[g++]); j = keyStr.indexOf(b[g++]); h = keyStr.indexOf(b[g++]); i = keyStr.indexOf(b[g++]); a = (e << 2) | (j >> 4); d = ((j & 15) << 4) | (h >> 2); f = ((h & 3) << 6) | i; c[c.length] = a; if (h !== 64) {c[c.length] = d; } if (i !== 64) { c[c.length] = f; } } while (g < b.length); return c; },
            bin2int = function (b) { var c, a, d = 0; for (a = c = b.length - 1; a >= 0; a--) {d += b[a] * Math.pow(256, c - a); } return d; },
            int2bin = function (b, c) { if (c === undefined) { c = 4; } var a = b, d = [], f = 0, e; while (a > 255) { a = Math.floor(a / 256); f++; } for (e = f; e >= 0; e--) { a = Math.floor(b / Math.pow(256, e)); d[d.length] = a; b = b - (a * Math.pow(256, e)); } while (d.length < c) { d = [0].concat(d); } return d; },
            crc32 = function (g) { var a, d = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D", c, e = 0, b = 0, h = 0; e = e ^ (-1); for (c = 0, a = g.length; c < a; c++) { h = (e ^ g[c]) & 255; b = "0x" + d.substr(h * 9, 8); e = (e >>> 8) ^ b; } e = e ^ (-1); return e < 0 ? 4294967296 + e : e; },
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
            int2bin(frames[0].width),//width
            int2bin(frames[0].height),//height
            int2bin(8, 1),//8 bit depth
            int2bin(6, 1),//Truecolour with alpha
            int2bin(0, 1),//Compression method
            int2bin(0, 1),//Filter method
            int2bin(0, 1)//Interlace method, 0 = no interlace
          );
          ihdr = int2bin(13).concat(ihdr, int2bin(crc32(ihdr)));
          actl = chunks.actl.concat(
            int2bin(frames.length),//Number of frames
            int2bin(0)//Number of times to loop this APNG.  0 indicates infinite looping.
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
              int2bin(Math.max(0, i * 2 - 1)),//Sequence number of the animation chunk
              int2bin(frames[0].width),//width
              int2bin(frames[0].height),//height
              int2bin(0),//x_offset
              int2bin(0),//_offset
              int2bin(outfiter_outfit_speed(), 2),//Frame delay fraction numerator
              int2bin(1000, 2),//Frame delay fraction denominator
              int2bin(1, 1),//dispose_op: 1 = APNG_DISPOSE_OP_BACKGROUND
              int2bin(1, 1)//blend_op: 1 = APNG_BLEND_OP_OVER
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
                int2bin(i * 2),//Sequence number of the animation chunk
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
        else {
          outfiter_atime = setInterval(outfiter_animate_char, outfiter_outfit_speed());
        }
      }
      $this_image
        .attr('src', '')/*Firefox fix*/
        .attr({src: output_image}).css({
          height: 'auto',
          maxHeight: '100%',
          maxWidth: '100%',
          width: 'auto'
        });
    },
    outfiter_do_display = function () {
      var display2_delay;
      try { clearInterval(outfiter_atime); } catch (ignore) { }
      display2_delay = (outfiter_GET.animate && outfiter_apng_supported === '') ? 1500 : 1; //delay the display if animated and apng support is still unknown
      setTimeout(function () {
        try {
          outfiter_do_display2();
        } catch (e) {
          $this_image.attr({src: not_compatible_img});
        }
      }, display2_delay);
    },
    outfiter_init = function () {
      /*Get options from data*/
      outfiter_get_get();
      /*Check browser support*/
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
        $this_image.attr({src: not_compatible_img});
        return false;
      }

      /*APNG support*/
      outfiter_apng_supported = ''; //unknown as default
      try {
        //will set outfiter_apng_supported after a few
        (function () {
          var canvas = document.createElement('canvas');
          if (!(canvas.getContext && canvas.getContext('2d'))) { outfiter_apng_supported = false; }
          var image = new Image();
          var ctx = canvas.getContext('2d');
          image.onload = function() {
            if (typeof canvas.getContext == 'undefined') { outfiter_apng_supported = false; }
            else {
              ctx.drawImage(image, 0, 0);
              outfiter_apng_supported = ctx.getImageData(0, 0, 1, 1).data[3] === 0;
            }
          };
          image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==';
        }());
      } catch (ignore) {  }


      /*Images event*/
      ogebi('.mount_image, .main_image', 1).each(function (i) {
        $(this).load(function () {
          outfiter_images_loaded[i] = true;
          //resize canvases
          (i === 0 ? $canvas_main : $canvas_mount).attr({height: $(this).height(), width: $(this).width()});
          //process canvases
          if (outfiter_images_loaded[0] && outfiter_images_loaded[1]) { outfiter_do_display(); }
          return true;
        });
      });

      /* CSS images */
      var
        bgs = [
          '',
          '',
          '',
          '',
          /* letters */
          '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'.replace(/\s+/, ''),
          /* hp bar */
          'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAdklEQVR42u3TgQkAIRADwVxnlv6dxS5E3tkGAgOZJM 2h2k4ua5I034GlBeBigJcv0DYvBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAADAT9pxtcWBahtSgAAAAABJRU5ErkJggg=='.replace(/\s+/, '')
        ],
        css_text =
        '.outfiter_template { background: #FBFBFB; text-align: center; }' +
        '.outfiter_template > * { display: none; }' +
        '.outfiter_template > .hide_canvas { display: block; height: 0; overflow: hidden; }' +
        '.outfiter_template .outfiter_image { display: block; margin: auto; width: 64px; height: 64px; max-height: 100%; max-width: 100%; }' +
        '.outfiter_template canvas { border: 1px solid green; }';
      if ($('head .outfiter_template_style').length === 0) {
        $('head').append('<style class="outfiter_template_style" type="text/css">' + css_text + '<\/style>');
      }
      ogebi('letters_image').attr('src', 'data:image/png;base64,' + bgs[4]);
      ogebi('hp_bar').attr('src', 'data:image/png;base64,' + bgs[5]);
      return true;
    };


  $this_main.append(
    $this_image,
    $('<div />', {'class': 'hide_canvas'}).append(
      $canvas_work = $('<canvas class="canvas_work" width="64" height="64"><\/canvas>'),
      $canvas_zoom = $('<canvas class="canvas_zoom" width="64" height="64"><\/canvas>'),
      '<hr />',
      $canvas_main = $('<canvas class="canvas_main" width="512" height="6144"><\/canvas>'),
      $canvas_mount = $('<canvas class="canvas_mount" width="256" height="1152"><\/canvas>'),
      '<img class="main_image" src="" alt="main_image" />',
      '<img class="mount_image" src="" alt="mount_image" />',
      '<img class="letters_image" alt="letters_image" src=""/>',
      '<img class="hp_bar" alt="hp_bar" src=""/>'
    )
  );
  if (outfiter_init()) {
    outfiter_load_outfit();
  }
});
};
//page load
outfiter_template_loader();
//add load events
$(window).on('resize scroll', outfiter_template_loader);