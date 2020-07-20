/*global $ */
/*jslint devel: true, browser: true, indent: 2, white: true, plusplus: true, bitwise: true, vars: true, ass: true */
/* Initialise the document */
$('#outfiter_container').html(
'<div class="outfiter">'+
'<div class="div0">'+
'<table><tr><td>'+
'<div class="div1">'+
'  <div class="div2">'+
'    Mounts'+
'    <div class="pl w130">'+
'      <div class="div4list div4list2 radio_mounts"></div>'+
'    </div>'+
'  </div>'+
'</div><br />'+
'<div class="div1" style="margin-top: 4px;">'+
'  <div class="div2">'+
'    Outfits Shortcut'+
'    <div class="pl w130">'+
'      <div class="div4list div4list2 radio_outfits"></div>'+
'    </div>'+
'  </div>'+
'</div>'+
'</td><td>'+
'<div class="div1">'+
'<div class="div2">'+
'Outfit Selector'+
'<div class="p1">'+
'<div class="div4">'+
'<div class="div5">'+
'<div class="body_main_div pushed body_main">'+
'<img class="body_main show" width="128" height="128" src="https://images.wikia.nocookie.net/tibia/en/images/8/81/Outfiter_Loading.gif" alt="" />'+
'</div>'+
'</div>'+
'<div class="div55">'+
'<div class="pushed w56 nbutton cb_1 button">Head</div>'+
'<br/>'+
'<div class="unpushed w56 nbutton cb_2 button">Primary</div>'+
'<br/>'+
'<div class="unpushed w56 nbutton cb_3 button">Secondary</div>'+
'<br/>'+
'<div class="unpushed w56 nbutton cb_4 button">Detail</div>'+
'</div>'+
'<div class="div6">'+
'<div class="dcolor_table">'+
'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
'<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>'+
'</div>'+
'</div>'+
'<div class="clear"></div>'+
'<div class="div91"><div class="leftb outfitm button"></div><div class="outfit_name w76"></div><div class="button rightb outfitp"></div></div>'+
'<div class="div91"><div class="button leftb facingm"></div><div class="button nesw no_pointer"></div><div class="button rightb facingp"></div></div>'+
'<div class="clear"></div>'+
''+
'<div class="div911">'+
'<label class="w120 divcheck">'+
'<input type="checkbox" class="darkchk addon1" /><span>&nbsp;Addon 1</span>'+
'</label>'+
'<label class="w120 divcheck">'+
'<input type="checkbox" class="darkchk addon2" /><span>&nbsp;Addon 2</span>'+
'</label>'+
'<label class="w120 divcheck">'+
'<input type="checkbox" class="darkchk female" /><span>&nbsp;Female</span>'+
'</label>'+
'<label class="w120 divcheck">'+
'<input type="checkbox" class="darkchk soft" />&nbsp;Soft Image'+
'</label>'+
'</div>'+
''+
'<div class="div911">'+
'<label class="w120 divcheck">'+
'<input type="checkbox" class="darkchk hpbar" />&nbsp;HP Bar'+
'</label>'+
'<div class="div913"><div class="w120">Char name</div></div>'+
'<div class="div913"><input type="text" size="18" value="" class="pushed url charn" />'+
'</div>'+
'<div class="div913">'+
'<div class="unpushed w76 button nbutton use_name">Use Name</div>'+
'</div>'+
'<div class="div913">'+
'<div class="unpushed w76 button nbutton clear_name">Clear Name</div>'+
'</div>'+
'</div>'+
''+
'<div class="div911">'+
'<label class="w120 divcheck">'+
'<input type="checkbox" class="darkchk animate" />&nbsp;Animate'+
'</label>'+
'<label class="w120 divcheck">'+
'<input type="checkbox" class="darkchk sanim" />&nbsp;Standing animation'+
'</label>'+
'<label class="divcheck w120 sep">'+
'<input type="checkbox" class="darkchk anistep" />&nbsp;Animation steps'+
'</label>'+
'<label class="divcheck w120">'+
'<input type="checkbox" class="darkchk template_code" />&nbsp;Template Code'+
'</label>'+
'</div>'+
''+
'<div class="clear"></div>'+
''+
'<div style="text-align: center;">'+
'<div class="clear hr1"></div>'+
'Link:<input type="text" value="" readonly="readonly" class="pushed url url_input" />'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</div>'+
'</td></tr></table>'+
'</div>'+
'<div class="hide hide_canvas">'+
''+
'<input type="hidden" value="0" class="outfit" />'+
'<input type="hidden" value="0" class="mount" />'+
'<input type="hidden" value="1" class="facing" />'+
'<input type="hidden" value="0" class="c1" />'+
'<input type="hidden" value="0" class="c2" />'+
'<input type="hidden" value="0" class="c3" />'+
'<input type="hidden" value="0" class="c4" />'+
''+
''+
'<div>'+
'<canvas class="canvas_work" width="64" height="64"></canvas>'+
'<canvas class="canvas_zoom" width="64" height="64"></canvas>'+
'</div>'+
'<div>'+
'<canvas class="canvas_main" width="512" height="6144"></canvas>'+
'<canvas class="canvas_mount" width="256" height="1152"></canvas>'+
'</div>'+
''+
'<img class="main_image" src="" alt="main_image" />'+
'<img class="mount_image" src="" alt="mount_image" />'+
'<img class="letters_image" alt="letters_image" src=""/>'+
'<img class="hp_bar" alt="hp_bar" src=""/>'+
''+
'</div>'+
'</div>'
);


/* Outfiter logic */
$('div.outfiter').each(function () {
  'use strict';
  var
    $this_main = $(this),
    outfiter_mount_names = [
      /*0*/
      'None', 'Widow_Queen', 'Racing_Bird', 'War_Bear', 'Black_Sheep',
      /*5*/
      'Midnight_Panther', 'Draptor', 'Titanica', 'Tin_Lizzard', 'Blazebringer',
      /*10*/
      'Rapid_Boar', 'Stampor', 'Undead_Cavebear', 'Crystal_Wolf', 'Dromedary',
      /*15*/
      'Kingly_Deer', 'Donkey', 'King_Scorpion', 'Tamed_Panda', 'Tiger_Slug',
      /*20*/
      'Uniwheel', 'Rented_Horse_(A)', 'Rented_Horse_(B)', 'Rented_Horse_(C)', 'Armoured_War_Horse',
      /*25*/
      'War_Horse', 'Lady_Bug', 'Manta_Ray', 'Shadow_Draptor', 'Gnarlhound',
      /*30*/
      'Dragonling', 'Magma_Crawler', 'Ironblight', 'Crimson_Ray', 'Steelbeak',
      /*35*/
      'Water_Buffalo', 'Tombstinger', 'Platesaurian', 'Ursagrodon', 'Hellgrip',
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
      'Slagsnare', 'Nightstinger', 'Razorcreep‎', '848', '849',
      /*90*/
      '850', '851'
    ],
    outfiter_mount_names_extra = [], //mounts not on the main list
    outfiter_mount_names_sorted = [], //list will be auto populated alphabetically
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
      '845', '852'
    ];
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
  outfiter_names[115] = '862';
  var
    outfiter_names_extra = [115, 105, 103, 106, 107, 108, 109, 104, 111, 112, 113, 114, 102, 101, 100, 110,], //outfits not on the main list
    outfiter_names_sorted = [], //list will be auto populated alphabetically
    //outfits with irregular amount of sprites, regular is 1 standing, 8 walking
    outfiter_sprites_standing = {
      'Chaos_Acolyte': 8,
      'Evoker': 8
    },
    outfiter_sprites_walking = {
      'CM': 2,
//      'None': 2,
      'Barbarian_(B)': 2,
      'Barbarian_(C)': 2,
      'Barbarian_(D)': 2,
      'Gnome': 2,
      'Corym_(C)': 2,
      'Cultist': 2
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
      '849': 8,
      '850': 8,
      '851': 8
    },
    //outfits limited to height 4096
    outfiter_4096h = {
      'Chaos_Acolyte': true,
      'Evoker': true
    },
    outfiter_sprites_mount_walking = {
    },
    //outfits and mounts with separator on list
    outfiter_separator = {
      None: true
    }, /*outfits with separator on list*/
    outfiter_mount_separator = {
    }, /*mounts with separator on list*/
    outfiter_f_names = {
      Nobleman: 'Noblewoman',
      Norseman: 'Norsewoman'
    }, /*names for female*/
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
      862: true,
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
      862: true
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
      None: true
    }, /*no addon*/
    outfiter_o_names = {
      Yalaharian: true
    }, /*one addon*/
    outfiter_no_ride_names = {
        862: true
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
    outfiter_def = {outfit: 0, addon1: false, addon2: false, female: false, facing: 1, c1: 0, c2: 0, c3: 0, c4: 0, soft: true, animate: false, sanim: false, hpbar: false, charn: '', mount: 0},
    outfiter_def_template = {outfit: 0, addon1: false, addon2: false, female: false, facing: 2, c1: 0, c2: 0, c3: 0, c4: 0, soft: false, animate: false, sanim: false, hpbar: false, charn: '', mount: 0},
    //long name and short name options that can be used
    outfiter_opt_names = {outfit: 'o', addon1: 'a1', addon2: 'a2', female: 'fm', facing: 'f', c1: 'c1', c2: 'c2', c3: 'c3', c4: 'c4', soft: 's', animate: 'a', sanim: 'sa', hpbar: 'h', charn: 'n', mount: 'm'},
    outfiter_opt_namesr = {o: 'outfit', a1: 'addon1', a2: 'addon2', fm: 'female', f: 'facing', c1: 'c1', c2: 'c2', c3: 'c3', c4: 'c4', s: 'soft', a: 'animate', sa: 'sanim', h: 'hpbar', n: 'charn', m: 'mount'},

    outfiter_title = '',/*fix for wikia*/
    /*APNG support*/
    outfiter_apng_supported,

    ogebi = function (classname, all) { return $this_main.find(all === 1 ? classname : '.' + classname); },

    /* canvases */
    $canvas_main = ogebi('canvas_main'),
    $canvas_mount = ogebi('canvas_mount'),
    $canvas_work = ogebi('canvas_work'),
    $canvas_zoom = ogebi('canvas_zoom'),

    //get options from url "search"
    outfiter_get_get = function () {
      var
        i, key, assign, array = window.location.search.substring(1).split(/&|;/);
      /*URLs can be like either "sample.html?test1=hi&test2=bye" or "sample.html?test1=hi;test2=bye"*/
      for (i = 0; i < array.length; i++) {
        if (array[i] !== '') {/*if no data, keep going*/
          assign = array[i].indexOf('=');
          if (array[i].substr(0, 5) === 'title') { outfiter_title = array[i].substring(assign + 1); }/*fix for wikia*/
          else {
            key = assign === -1 ? array[i] : array[i].substring(0, assign);
            if (outfiter_opt_namesr[key] !== undefined || outfiter_def[key] === undefined) {
              if (outfiter_opt_namesr[key] !== 'undefined') { key = outfiter_opt_namesr[key]; }
              if (assign === -1) { outfiter_GET[key] = true; }/*if no value, treat as true*/
              else {
                outfiter_GET[key] = decodeURIComponent(decodeURI(array[i].substring(assign + 1)));
                if (outfiter_GET[key] === 'true') { outfiter_GET[key] = true; }
                else if (outfiter_GET[key] === 'false' || outfiter_GET[key] === '!') { outfiter_GET[key] = false; }
              }
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
        opt;
      if (outfiter_title !== '') { params += 'title=' + outfiter_title + '&'; }/*fix for wikia*/
      for (opt in outfiter_def) { if (outfiter_def.hasOwnProperty(opt)) { if (outfiter_GET[opt] !== outfiter_def[opt]) {
        params += outfiter_opt_names[opt] +
        (typeof outfiter_GET[opt] === 'boolean' ? (outfiter_GET[opt] === true ? '' : '=!') : '=' + outfiter_GET[opt]) + '&';
      } } }
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
      params.push('height=' + (outfiter_GET.soft ? 128 : 64));
      params.push('width=' + $canvas_zoom.attr('width'));
      return params.join('|');
    },
    //get options from currently selected options
    outfiter_options_to_get = function () {
      var
        opt;
      for (opt in outfiter_GET) { if (outfiter_GET.hasOwnProperty(opt)) {
        if (typeof outfiter_GET[opt] === 'boolean') { outfiter_GET[opt] = ogebi(opt).is(':checked'); }
        else if (typeof outfiter_def[opt] === 'number') { outfiter_GET[opt] = parseInt(encodeURIComponent(ogebi(opt).val()), 10); }
        else { outfiter_GET[opt] = encodeURIComponent(ogebi(opt).val()); }
      }  }
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
        is_4096h = outfiter_4096h[outfiter_names[outfiter_GET.outfit]] === true;
      big_canvas = ogebi('canvas_' + par.src)[0];
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
        if (r1 === 255 && g1 === 255 && b1 === 0) { r1 = color_t[c1][0]; g1 = color_t[c1][1]; b1 = color_t[c1][2]; }
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
    //toggle loading and some controls usability
    outfiter_hide_body = function (h) {
      if (h === true) {
        try { clearInterval(outfiter_atime); } catch (ignore) { }
        var
          i = ogebi('.body_main_div .body_main', 1),
          s = 'https://images.wikia.nocookie.net/tibia/en/images/8/81/Outfiter_Loading.gif';
        if (i.attr('src') !== s) {
          ogebi('input', 1).filter(':button, :checkbox, :radio').attr('disabled', 'disabled');
          i
            .attr('src', '')/*Firefox fix*/
            .attr('src', s);
        }
        return;
      }
      ogebi('input:disabled', 1).filter(':button, :checkbox, :radio').prop('disabled', false);
    },
    //get mount or outfit images
    outfiter_get_ajax = function (name, type) {
      var
        rname = name,
        utype = type.substr(0, 1).toUpperCase() + type.substr(1),
        t;
      if (name === 'Gnome') { rname = name + (outfiter_GET.female ? '_Female' : ''); }
      t = window.location.host.match(/(tibia|dantest)\.wikia\.com/) ?
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
      outfiter_options_to_get();
      var
        outfit = outfiter_GET.outfit,
        mount = outfiter_GET.mount,
        outfiter_n = outfiter_names[outfit],
        mount_n = outfiter_mount_names[mount],
        has_standing_animation_any = outfiter_sprites_standing.hasOwnProperty(outfiter_names[outfiter_GET.outfit]) || outfiter_sprites_mount_standing.hasOwnProperty(outfiter_mount_names[outfiter_GET.mount]);

      if (outfiter_m_names[outfiter_n] === true || outfiter_mount_names[mount] === undefined) {
        mount = 0; ogebi('mount').val(0);
        mount_n = outfiter_mount_names[mount];
        ogebi('radio_mounts_0').click();
        if (param === 'mount') { return; }
        outfiter_options_to_get();
      }
      if (outfiter_u_names[outfiter_n] === true) {
        ogebi('female').prop('checked', false);
        if (param === 'female') { return; }
        outfiter_options_to_get();
      }
      if (!has_standing_animation_any) {
        ogebi('sanim').prop('checked', false);
        outfiter_options_to_get();
      }
      ogebi('radio_outfits_' + outfit).click();
      outfiter_hide_body(true);
      ogebi('outfit_name').html(
        ((outfiter_GET.female && outfiter_f_names[outfiter_n]) ?
        outfiter_f_names[outfiter_n] : outfiter_n).replace(/_/g, ' '));
      outfiter_images_loaded[1] = (mount === 0 ? true : false);
      outfiter_images_loaded[0] = false;
      if (mount !== 0) { outfiter_get_ajax(mount_n, 'mount'); }
      outfiter_get_ajax(outfiter_n, outfit >= 100 ? 'other' : (outfiter_GET.female ? 'female' : 'male'));
    },
    outfiter_do_outfit = function (i, absolute) {
      outfiter_options_to_get();
      var
        get_outfit_pos = function (outfit) {
          var
            x;
          for (x = 0; x < outfiter_names_sorted.length; x++) { if (outfit === outfiter_names_sorted[x]) { break; } }
          if (outfiter_names_sorted[x] !== undefined) { return x; }
          return -1;
        },
        get_mount_pos = function (mount) {
          var
            x;
          for (x = 0; x < outfiter_mount_names_sorted.length; x++) { if (mount === outfiter_mount_names_sorted[x]) { break; } }
          if (outfiter_mount_names_sorted[x] !== undefined) { return x; }
          return -1;
        },
        mount = outfiter_GET.mount,
        mount_pos = get_mount_pos(outfiter_GET.mount),
        outfit = parseInt(ogebi('outfit').val(), 10),
        outfit_pos = (absolute ? get_outfit_pos(i) : get_outfit_pos(outfit) + i),
        has_standing_animation;
      if (absolute === undefined) { absolute = false; }
      outfit = outfiter_names[outfiter_names_sorted[outfit_pos]];
      mount = outfiter_mount_names[outfiter_mount_names_sorted[mount_pos]];
      if (outfiter_names_sorted[outfit_pos] === undefined) {
        if (outfit_pos < 0) { outfit_pos = outfiter_names_sorted.length - 1; }
        else if (outfit_pos >= outfiter_names_sorted.length) { outfit_pos = 0; }
      }
      ogebi('outfit').val(outfiter_names_sorted[outfit_pos]);
      if (outfiter_a_names[outfit] === true) {
        ogebi('addon1').prop('checked', false);
        ogebi('addon2').prop('checked', false);
      }
      else if (outfiter_o_names[outfit] === true) {
        if (ogebi('addon1').is(':checked')) { ogebi('addon2').prop('checked', false); }
        else if (ogebi('addon2').is(':checked')) { ogebi('addon1').prop('checked', false); }
      }
      if (outfiter_m_names[outfit] === true || outfiter_mount_names[mount_pos] === undefined) {
        ogebi('radio_mounts_0').click();
        outfiter_options_to_get();
        mount = outfiter_GET.mount;
        mount_pos = get_mount_pos(mount);
      }
      if (ogebi('sanim').is(':checked')) {
        has_standing_animation = outfiter_sprites_standing.hasOwnProperty(outfit) ||
          outfiter_sprites_mount_standing.hasOwnProperty(mount);
        if (!has_standing_animation) { ogebi('sanim').prop('checked', false); }
      }
      outfiter_load_outfit();
    },
    outfiter_animate_char = function () {
      outfiter_acurrent++;
      if (
        outfiter_acurrent >= outfiter_aframes.length
      ) { outfiter_acurrent = 0; }
      if (!ogebi('animate').is(':checked')) { return; }
      ogebi('.body_main_div .body_main', 1).attr('src', '').attr('src', outfiter_aframes[outfiter_acurrent]);
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
        outfiter_readCookie = function (name) { var i, c, cl = document.cookie.split(';'); for (i = 0; i < cl.length; i++) { c = $.trim(cl[i]); if (c.indexOf(name + '=') === 0) { return c.substring(name.length + 1); } } return null; },
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
        neww,
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
        has_standing_animation_any = outfiter_sprites_standing.hasOwnProperty(outfiter_names[outfiter_GET.outfit]) || outfiter_sprites_mount_standing.hasOwnProperty(outfiter_mount_names[outfiter_GET.mount]),
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
        if (outfiter_readCookie('outfiter_apng_warn') !== 'done') {
          if (outfiter_apng_supported) { alert("APNG has been enabled, you can save the animated image, but you can only see it animated on updated versions of Firefox and Opera(pre 15.0)"); }
          else { alert("APNG not supported, you can't save animated image, you need to use updated Firefox or Opera(pre 15.0) to be able to save animated image"); }
          var
            date = new Date(); date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000));
          date = date.toGMTString();
          document.cookie = 'outfiter_apng_warn=done; expires=' + date + '; path=/';
        }
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
//console.log('running at interval: ' + outfiter_outfit_speed());
          outfiter_atime = setInterval(outfiter_animate_char, outfiter_outfit_speed());
        }
      }
      neww = frames[0].width * (outfiter_GET.soft ? 1 : 2);
      ogebi('body_main_div').css({width: neww + 10});
      ogebi('.body_main_div .body_main', 1)
        .attr('src', '')/*Firefox fix*/
        .attr({
          src: output_image,
          width: neww
        })
        .css({width: neww});
      //template_code
      ogebi('template_code_code').remove();
      if (ogebi('template_code').is(':checked')) {
        ogebi('div0').append(
          $('<textarea />', {'class': 'div4 pushed template_code_code', rows: 3, cols: 40}).text(
            '{{Outfitter|' + outfiter_gen_template() + '}}'
          )
        );
      }
      //animation steps
      ogebi('anistep_step').remove();
      if (ogebi('anistep').is(':checked')) {
        $.each(outfiter_aframes, function (i, v) {
          ogebi('div0').append(
            $('<div />', {'class': 'div4 pushed body_main anistep_step'}).append(
              $('<img />', {alt: 'Animation step ' + i, title: 'Animation step ' + i, width: 128, height: 128, src: v})
            )
          );
        });
      }
      //hide loading
      outfiter_hide_body(false);
      //update checkboxes
      ogebi('female').parent().toggleClass('disabled', outfiter_u_names[outfiter_names[outfiter_GET.outfit]] === true);
      ogebi('.addon1, .addon2', 1).parent().toggleClass('disabled', outfiter_a_names[outfiter_names[outfiter_GET.outfit]] === true);
      ogebi('sanim').parent().toggleClass('disabled', !has_standing_animation_any);
      //update url
      outfiter_gen_url();
    },
    outfiter_do_display = function () {
      outfiter_options_to_get();
      outfiter_hide_body(true);
      try { clearInterval(outfiter_atime); } catch (ignore) { }
      setTimeout(function () {
        //try {
          outfiter_do_display2();
        //} catch (e) { alert('Browser not compatible, try latest Firefox/Opera/Chrome'); }
      }, 1);
    },
    outfiter_do_addon = function (id) {
      var
        tmp, has_standing_animation;
      if (outfiter_a_names[outfiter_names[outfiter_GET.outfit]] === true) {
       ogebi('addon1').prop('checked', false); ogebi('addon2').prop('checked', false);
       if (id > 0) { return; }
      }
      else if (outfiter_o_names[outfiter_names[outfiter_GET.outfit]] === true) {
        tmp = false;
        if (id > 0) { tmp = ogebi('addon' + id).is(':checked'); }
        ogebi('addon1').prop('checked', false); ogebi('addon2').prop('checked', false);
        if (tmp) { ogebi('addon' + id).attr('checked', 'checked'); }
      }
      if (ogebi('sanim').is(':checked')) {
        has_standing_animation = outfiter_sprites_standing.hasOwnProperty(outfiter_names[outfiter_GET.outfit]) ||
          outfiter_sprites_mount_standing.hasOwnProperty(outfiter_mount_names[outfiter_GET.mount]);
        if (!has_standing_animation) { ogebi('sanim').prop('checked', false); }
        if (!ogebi('animate').is(':checked')) {
          if ($(this).hasClass('animate')) { ogebi('sanim').prop('checked', false); }
          else if ($(this).hasClass('sanim')) { ogebi('animate').prop('checked', true); }
        }
      }
      if (outfiter_m_names[outfiter_names[outfiter_GET.outfit]] === true) { ogebi('mount').val(0); ogebi('radio_mounts_0').click(); }
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
    outfiter_init = function () {
      /* Populating mounts list */
      $.each(outfiter_mount_names, function (i, v) { if ($.inArray(i, outfiter_mount_names_extra) === -1) { outfiter_mount_names_sorted.push([i, v]); } });
      outfiter_mount_names_sorted.sort(function (a, b) { if (a[1] < b[1] || a[0] === 0) { return -1; }  if (a[1] > b[1] || b[0] === 0) { return 1; } return 0; });
      $.each(outfiter_mount_names_sorted, function (i, v) { outfiter_mount_names_sorted[i] = v[0]; });
      outfiter_mount_names_sorted = outfiter_mount_names_sorted.concat(outfiter_mount_names_extra);
      /* Populating outfits list */
      $.each(outfiter_names, function (i, v) {
        if (v !== undefined && $.inArray(i, outfiter_names_extra) === -1) { outfiter_names_sorted.push([i, v]); } });
      outfiter_names_sorted.sort(function (a, b) { if (a[1] < b[1]) { return -1; }  if (a[1] > b[1]) { return 1; } return 0; });
      $.each(outfiter_names_sorted, function (i, v) { outfiter_names_sorted[i] = v[0]; });
      outfiter_names_sorted = outfiter_names_sorted.concat(outfiter_names_extra);

      /*Get options from url*/
      outfiter_get_get();
      var
        opt;
      for (opt in outfiter_def) { if (outfiter_def.hasOwnProperty(opt)) {
        if (!outfiter_GET.hasOwnProperty(opt)) { outfiter_GET[opt] = outfiter_def[opt]; }
        if (typeof outfiter_GET[opt] === 'boolean' && outfiter_GET[opt]) { ogebi(opt).attr('checked', 'checked'); }
        else { ogebi(opt).val(outfiter_GET[opt]); }
      } }
    /*Prepare color table*/
      var d2h = function (d) { d = d.toString(16); return d.length === 1 ? '0' + d : d; };
  //  var h2d = function (h) { return parseInt(h, 16); };
      ogebi('dcolor_table div').removeClass('color_table_d_inv').addClass('color_table_d')
      .each(function (i) {
        $(this).css('background-color', '#' + d2h(outfiter_color_t[i][0]) + d2h(outfiter_color_t[i][1]) + d2h(outfiter_color_t[i][2]));
      });
      ogebi('.cb_1, .cb_2, .cb_3, .cb_4', 1).click(function () {
        ogebi('.cb_1, .cb_2, .cb_3, .cb_4', 1).removeClass('pushed').addClass('unpushed');
        $(this).removeClass('unpushed').addClass('pushed');
        var
          id = $(this).hasClass('cb_1') ? 1 : ($(this).hasClass('cb_2') ? 2 : ($(this).hasClass('cb_3') ? 3 : 4));
        ogebi('.dcolor_table div', 1).removeClass('color_table_d_inv').addClass('color_table_d')
          .filter(':eq(' + ogebi('.c' + id, 1).val() + ')').removeClass('color_table_d').addClass('color_table_d_inv');
      });
      ogebi('cb_1').click();
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
        outfiter_hide_body(true);
        alert('Browser not compatible, try latest version of Firefox/Opera/Chrome');/*For wikia*/
        return false;
      }
      /*Prepare color table events*/
      ogebi('.dcolor_table div', 1).click(function () {
        var
          i = ogebi('cb_1').hasClass('pushed') ? 1 : (ogebi('cb_2').hasClass('pushed') ? 2 : (ogebi('cb_3').hasClass('pushed') ? 3 : 4));
        ogebi('.dcolor_table div', 1).removeClass('color_table_d_inv').addClass('color_table_d');
        $(this).removeClass('color_table_d').addClass('color_table_d_inv');
        ogebi('c' + i).val($(this).index());
        outfiter_do_addon();
      });

      /*APNG support*/
      outfiter_apng_supported = false;
      var
        ua = navigator.userAgent;
      if (ua.search('Opera/') !== -1) { if (parseFloat(ua.slice(ua.search('Opera/') + 6)) > 9.5 && parseFloat(ua.slice(ua.search('Opera/') + 6)) < 15) { outfiter_apng_supported = true; } }
      else if (ua.search('Firefox/') !== -1) { if (parseFloat(ua.slice(ua.search('Firefox/') + 8)) > 3) { outfiter_apng_supported = true; } }

      /*Images event*/
      ogebi('.mount_image, .main_image', 1).each(function (i) {
        $(this).load(function () {
          outfiter_images_loaded[i] = true;
          //resize canvases
          ogebi(i === 0 ? 'canvas_main' : 'canvas_mount').attr({height: $(this).height(), width: $(this).width()});
          //process canvases
          if (outfiter_images_loaded[0] && outfiter_images_loaded[1]) { outfiter_do_display(); }
          return true;
        });
      });
      /*Prepare radio lists*/
      var
        x, t = $(), toggle = true, border_top = false;
      for (x = 0; x < outfiter_names_sorted.length; x++) {
        if (outfiter_separator[outfiter_names[outfiter_names_sorted[x]]]) { border_top = true; }
        toggle = !toggle;
        if (border_top) { t = t.add($('<div />', {'class': 'border_top'})); }
        t = t.add(
          $('<label />', {'class': 'list_el'}).append(
              $('<input type="radio" />').attr({name: 'radio_outfits', 'class': 'darkchk radio_outfits_' + outfiter_names_sorted[x]}),
              $('<div />', {'class': 't'}).text(outfiter_names[outfiter_names_sorted[x]].replace(/_/g, ' '))
            ).css({color: (toggle ? '#8F8F8F' : '#bfbfbf')})
        );
        border_top = false;
      }
      ogebi('radio_outfits').append(t).find('[name=radio_outfits]').click(function () {
        var
          cls = $(this).attr('class').split(/\s+/),
          id;
        $.each(cls, function (i) { if (cls[i].substr(0, 13) === 'radio_outfits') { id = parseInt(cls[i].split(/_/g)[2], 10); } });
        if (id !== parseInt(ogebi('outfit').val(), 10)) { outfiter_do_outfit(id, true); }
      });
      t = $(); toggle = true; border_top = false;
      for (x = 0; x < outfiter_mount_names_sorted.length; x++) {
        if (outfiter_mount_separator[outfiter_mount_names[outfiter_mount_names_sorted[x]]]) { border_top = true; }
        toggle = !toggle;
        if (border_top) { t = t.add($('<div />', {'class': 'border_top'})); }
        t = t.add(
          $('<label />', {'class': 'list_el'}).append(
            $('<input type="radio" />').attr({name: 'radio_mounts', 'class': 'darkchk radio_mounts_' + outfiter_mount_names_sorted[x]})
              .attr('checked', (String(outfiter_mount_names_sorted[x]) === ogebi('mount').val() ? 'checked' : false)),
            $('<div />', {'class': 't'}).text(outfiter_mount_names[outfiter_mount_names_sorted[x]].replace(/_/g, ' '))
          ).css({color: (toggle ? '#8F8F8F' : '#bfbfbf')})
        );
        border_top = false;
      }
      ogebi('radio_mounts').append(t).find('[name=radio_mounts]').click(function () {
        var
          cls = $(this).attr('class').split(/\s+/),
          id;
        $.each(cls, function (i) { if (cls[i].substr(0, 12) === 'radio_mounts') { id = parseInt(cls[i].split(/_/g)[2], 10); } });
        if (id !== parseInt(ogebi('mount').val(), 10)) { ogebi('mount').val(id); outfiter_load_outfit('mount'); }
      });

      /* Click events */
      ogebi('hpbar').change(outfiter_do_addon);
      ogebi('animate').change(outfiter_do_addon);
      ogebi('sanim').change(outfiter_do_addon);
      ogebi('soft').change(outfiter_do_addon);
      ogebi('anistep').change(outfiter_do_addon);
      ogebi('template_code').change(outfiter_do_addon);
      ogebi('addon1').change(function () { outfiter_do_addon(1); });
      ogebi('addon2').change(function () { outfiter_do_addon(2); });
      ogebi('female').change(function () { outfiter_load_outfit('female'); });
      ogebi('outfitm').click(function () { outfiter_do_outfit(-1); });
      ogebi('facingm').click(function () { outfiter_do_facing(-1); });
      ogebi('facingp').click(function () { outfiter_do_facing(1); });
      ogebi('outfitp').click(function () { outfiter_do_outfit(1); });
      ogebi('use_name').click(outfiter_do_addon);
      ogebi('clear_name').click(function () { ogebi('charn').val(''); outfiter_do_addon(); });
      ogebi('url_input').click(function () { $(this).select(); });

      /* CSS images */
      var
        bgs = [
          'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQW RvYmUgSW1hZ2VSZWFkeXHJZTwAAAQqSURBVHjaHFNLbxtlFJ3vMW/P2GM7duy6bUydOG6SBlFRKUGibcqGZoGQkBAS EmLBuouKDT+BLQs2SAghVUKpRBasskAthBYBSQW1HBJDGh552Y7n4ce8v+GWWYw0uvfcOefcc9Ht26tRFAkCzyFECH HHYxaOJRGrqi7KKpRCfzwc2p4fUVFHmHAJF8fQL3IcRxmL/cAPwwA/L0SqjLjUBS7VEPLVQSgNPaQYvhydou62298J IyTK6ZixsTsiAJiZmaGEIIQ9b5DRNaH46sUX367PL9tR5qBDuwPBDnSXTokTL2WypWT0LPAdWdYxQowxUq1W4ygmmF HCG5dW33zr3evXpp409x8+bhULmUKGWr2DJHScoRsrtWJl2us1fdcSZY3FMaaUer4b+O5k7caHd95/43r5k883vvrm l8gzp8raZF7hQodyIzHp28fN7siYaLwTMxQFLuV5DA9KYm2idvfOB4vT+nt3v9x48CSvBlkNySQUsC/zEfOsyLdk6v WPW0yaKtVuhP4I/S/VxVS49drri7OTH3389eaPv167UhGwx6MgDmz4v4gDRWTlgobZCIem2d1PlxaIqMdRgBMWpzOF V5Ze/mJt8979jQkt4rHXmKlUz+fss3/9Ye9iJTs7fS4lJaBcFmKz8wcszJiY8r3Rc9r12frB36effnZPJsOUGDq9f/ JpAQASDVQxmqufz2l0aB5ykRO4vWjci307bUzELKEJx/E8/fbh94tzLyzMzzKWdLpdxz5iXt/uHUISCDcKg/DqlVo+ n0cYt9t7w6Gp61rCYQqJMU3Tdu0LlYpMQ0xIpBEUE00V99tn4GbRqHo+1lQEzsEnYSNwQaISBJJGMeNYZKTknx4/2P 75O1VVJUmG5JSLlauLdQhsaTLTbDb3WtseqByOxq578+ZNxz5LEoYhKO54lE0rOSOV0RUWeYpEjLQ6sHsizwmUGw/N jC7FkSvxCHpyhlrIp/tnXUIoFkXx+OQEElrIGzxPdE293Kj3zzq7uzv5XFbT1N3fd3hK5y434AoYixqzdcSxvw4OAA jpxo7jnHY6pfI5GJZKafv7z9rtP/t9M5fPF4rFbrfXarVs29Z1neeF+fmF3542LduGUYAlgiA8bTbH4/FMreZ5Hpwh 9CWMQXKBESHATnIGgziOV1ZWDo+Otra2ioVikiRkenqacQks4+TkZKZeL5XKjmPDFUP6JEnqdrtACmEkCsLy0lIQhG tr91VFkWU5hJ7V1VXP86Hsuq7A88vLy5VKJQgCIGZbFuwZWExOlgwj026319fXFVVNp9PACwiSS7Ua4jhBFAEJzu+1 9yzLgjJggDG8DSNrWeYPjx5tbm6KkqQoCmiBoUANrdxagXuG3cLeCCVgw2AwCMNQ0zVKKDS5nmf2++BLNpeDcT4kBl SIYhCG/wkwAP2vHvl2vdyLAAAAAElFTkSuQmCC'.replace(/\s+/, ''),
          'iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQW RvYmUgSW1hZ2VSZWFkeXHJZTwAAAYwSURBVHja7JdNb1NHFIbvt6+/nQiUkEDTGJAoRKq7giVdgFpgwz+h/4yyaCUW SGxAkNAVSNhAUJoASYhNTGxf3+8+MxPAsWmJLaGqUq8iZ3xn5px3znnPmdf6jRu/GIaeLxQ6e3uappumkSSJaZr9fj +TcTUtjaLYzbq6rnf2Oo5jM9ANwzLNe/fubW9va5pmmpbX90zDYMxkmqYGFnXdcRzP83iZyWTiODYtK/B9BszWajWL f4/+eJTP5XnFnjAMbNuR03qSpJZlgiMIgmw2x5swigzhV4DbbbdZNjc3z5pypdJqtnhvmEYKbsvyej3XzaZpEoZRvp Bnpr3bzmQcAdSy5ufnsaMBP4rCJE3ERstKtVT8peBP41hYwV8UR72e5/f7kXwEGt8nMJac9Xoe5+NrFIbYiMJInRKD tm0RyzAIC4W8JkHrmngMTOIhDEM3k8Fb1s1i0bYsASVOWBH4gUvM0zSfz7ERl2xJ5CNjOwlu23EM182wDQN7e3txEv d63XK5EgQhAedhkcy6yEKv1wM1L1X+DJlUEE+G28AH4YqFA1ZHxVKpVvtekYj0EKi+70M9yQCtLyEDpdvt8ga7uVxu AtxE22BCnYBYwYvTp0/PzMyACCLgHoIAHx/ZbJbYaHJDKuDnZaY03w8mwG3IujBZxPGxXKlUfrx40XXdubk5DrH64k WpVKrXG4uL396/fx8qrv25Pj1VefLkieMIXNhS5ceY8A3ixgg0UgWicMuSCQXuBKqHFt9hoOftzs7OXLt2bWpqinOw js9Wszk9Pb2xsXHkyBEOhC3LNJxMhlQRUojDgWzbptjGxS1ODOXwf/LkycuXLy8uLmoDj6SmpnIpioE4yxABVKZNUT uZADc2LU0aqFarJ06c0EYe2aYEe+ELSdkHpBG0yBLUjQKCliTj4hYFLao+jh4+fHj79m3f94ccszmR++GFKlyoy2bb sWVfNCbDDWFlZzZMXC4vL9+5c4dDDEFOBGRoIrgNgdgnylAwhpY+IW4ACXYASrU39gMcarx8+ZI9r1+/5hrY2dmp1+ s9r9dsNqnFVqulST7uOx/AjYVLly6Rgi/iFjlmJ77hF+Qk/3fv3q39UPv9t98ZczttbW1Sso3GM4y+3X6LJfgcyetE WVddYlzcYKC1igRwAlAzQYE+f/acANKJsOfK+lMhVc6A+HHMIJ4INx3GkslPCXqhUCAT3W7nzZtYkY6IlEslkAIL0z hjmXAWx7LraUSLlxPg7vd9A6i8YU+n05H0C8Rb0XRsuh37C8UigOCC6syDN4S4jgRX93GTXYn7zSBuDDIO5UNSWCkS TEVLFIE6gep8PrcXniybnsplADJxv8vCAIfofFzAnsd+ugErJ8DNFuvVq1dgVHIHQ7Ldm6owaEAYgg7MKk0j6yHh7o tjsaxSLl84f15w7UPMC8UCg74HbiKhcwaSragXi1syBUe308GghXY5fvz4xJrr5s2b/2uu/57mwvqodikWi19Xc+ky T6Pa5dzSUqFQPIzmOgzuA5pL0zXZRWNTcodciK6XcXPZLF/njh1bWjonmpdh/IPmOiTuA5rr7NnvaOiU1tvt7fMXLq yurp45c6bdbp86dQpP5XKZe359faPZ3FGtcUhzpdo+biyqggS3QCGPAW7APXjwQGnFA5qLTzoGR2nZNoJtc3Pz6NGj WGOsDsfsz1d+uvXrLc/rj2qusXCLIyvNpZqUugNUqD+2qsGnuli9fv16tbqIv0HNRfV/xG1K3OQe3PhjPDs7yxRSEN zIP6W59rULMcFTXz4f6kSXH/qQb67bbxYWBjXXBLg/aS7V1kFNDPCt7pARp1DJR+KsLC8Paa5xcX/SXKBWFcY5YApf 5W+LA5A5H6JsZWWF7AxprnFxH9Bc79+/5zbd2trCa71R31jfMOS1qG6qhYUFLrHl5RXVCIc011i4U6l5P2mutbU1rr CnT58SRijN+N27XaVdaAhXr155/PixH/gOi6NoVHONhfszmovfep1uZ1S7UB4YhTh/p7nGwu1IihiD2sXzerSqUe3S aDRU31H525euA5qLscLNO4W72+t+Hrfgwec0F4ZGtYshfwd8UXMdEvdX0VyHwf1vaq6/BBgAfEl6THz23GQAAAAASU VORK5CYII='.replace(/\s+/, ''),
          'iVBORw0KGgoAAAANSUhEUgAAAGQAAAAQCAMAAADXjyqxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5cc llPAAAAYBQTFRFOTk5PDw8QUFBQEBANzc2RERENzg3ODg3Ojs7ODk4Ojs6NDU1Ly8vOTo6MjIyOzw7Nzg4Q0NDPD08 Ozs6Ojo7NTY2NjY1Pz8/NTY1OTo5Ozw8NjY3Njc3Njc2ODk5MzQzNDU0MzQ0PT08PDw7MDAwOTk4MTIyQEA/Ozs8OD g5PT49QkJCNzc4Ojo5MjMzLCwsMTIxOTk6RkZGLzAwMjIzQkNCPT0+Ly8uLi4uNDQ1KysrP0A/MzM0QkJBNTU2PDw9 NDQzODc3Pj49Li8uR0dHQUFAPz8+QEBBMDExMjIxP0BAQ0RDQEFAOTo4LS0tLS0sPD09Ly8wQkNDKisrRUZFPj8+Nj c1MzMyPj4/RUVEPj8/NTU0REVEPT4+R0dGMTEwSEhIMjMyQUBANDM0Pj9AR0hHODg6QUJBLC0tQ0REQ0NELi8vLi4v KywrLzAvKiorLS4uR0hILC0sMDEwTk9PNjY2Pj4+MTExNDQ0Ozs7NTU1Ojo6ODg4Nzc3PT09MzMzAT5fgwAABLdJRE FUeNoUVGWTLSkSpey6u/Rtd+/n7v7GfXd03X0LSOWvDxP1hYiKhGN5jHpth/OrIQ29WHIKtFNFqXjZ44DS6e1f8e/C g7aqN4cg7DdQcs63dw603CCVle/yuJvgLMgnVco6SANlq1po2huJHx2ODuNkTe3JEFpKbcUvPd5Z3wZNLRISSHdz6R 4svc6qZYm9QX0Op5SsbSY6bEjCxby+GCpI7lye5fwV6iRJQws2eULQSZKMbhDEr6ZmfVDRd4y8g88u/XcWHQ0rdVAJ yBG3azp/fheE5I9cwieCQd6RYu42tlnHuJO8+m0xmIaOV+/9nL0UPIdKzgxDVSNh/Gj8aH1gug0S/T3V25AaN8lIPt +cUXamwUiZOuf88u/QT5o4Fice7Z/NbfvqoRp49jLrcwMadUV7rXZZQ+QVc2eSA3Bz68qjbxN+XdOadhtGCmWlAZcj 33dIqS3I34EvNaB720laF2EkW/6bv/birDR9HwLf4UxFVJ9dOzMNTlSu6Jd/WyFIFPOwc6kMY9rSjv91866766QwDq dI9H0abY4i+QctTNl/BAnICh2O9t2beOFpdmuBIhL8TV/C88p/ZhrF7llALeWR8jW7VSFya+j07cG/dr2vHS04IjFQ QOHQqLXdCjfYvkYSmWpJWMAYazZiddIKez5KRky4JhLTdJw6ftf5FXwt97NqWguPxbeDP1WLTYsS75UTccvrF21hgY WUpowvGC833WdQp8TLyEgz4uWQPv7HkQJsMFxWem7x4DoqLE2LQ+lDRk4q+gOU0vHjK0U6Z/HKYnmtyxu6Nyeli+if zgOjvsSX6MUI3hfMvLRHslxbR2GOXBanTmnv5IZykLpLnFvG7LuKlE1fHOf/rN+3ryCKWzvnfV+KYqizdJUM0YdnCu r8vRklDuuiVa0KGn66qa20LU4PJV3nuG9H+2W49e/rbuaZOKZQPiIXJmSFOLUXLdAnUtWT9CDiuYaDVZRS1pDuymZG vXyoK1Y0FYcD+VEp0lJ+arIho6v2AzsSJl1BXPygn6bab8LaviP8VPh/7GT7w2QPWmmhP1WhHOGUzkArkJFxVHbNjm PGxL7IJ9S/n77PqzH+dZWJrdpqNjThQB2ODTiL1i60X5nf/pu6U38UduLWxzz5/y6x3YiiQIA6r6K3ByXpPJvWMRBD 12c95/u+6Xdnqxigbqjn/fcNSG359qFDQQkH5nY1pdzFqtp0KnY9yY7p891YKUKXv4FaWcEbyzcylwnAThk5U14BiB KUmPAXuojpZPzLnf3Zehlq3hUn1UrM9oDBhw92v4L3+ZP8ye2qmXzMr70iGw227SGOfzZ1IIC7276DHEKnybPgIZpG kAuZKCpPo+tZElvzhSuBQ3HdbcWlpdhksfVgL9GHZ9/CTXfhTAzD5GNzXORrhaM32MbG9HEvGQBPIxPlF1bvxdd9q7 W1Tue3OGwC+pInzD7xG/RLKtTq/8l8Qzd6N53cGrWoz1n3aZNl4w8D49IslvF2sX1cRGBfrAzMDUYMhOtHah35e45L rWXa6hGVz/VeVVsUSSk2vKEN8bTw9VqSEHn7p60YF4/j583XZTxZ5t7sA7dbKx1POTSiS8I/CzAAFMoFBKDyUm4AAA AASUVORK5CYII='.replace(/\s+/, ''),
          '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'.replace(/\s+/, ''),
          /* letters */
          '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'.replace(/\s+/, ''),
          /* hp bar */
          'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAdklEQVR42u3TgQkAIRADwVxnlv6dxS5E3tkGAgOZJM 2h2k4ua5I034GlBeBigJcv0DYvBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAADAT9pxtcWBahtSgAAAAABJRU5ErkJggg=='.replace(/\s+/, '')
        ],
        css_text =
        '.outfiter .nesw { background:#757575 url(\'data:image/png;base64,' + bgs[0] + '\') !important; }\n' +
        '.outfiter .leftb, .outfiter .leftb[disabled]:active, .outfiter .rightb, .outfiter .rightb[disabled]:active {' +
        '  background: #757575 url(\'data:image/png;base64,' + bgs[1] + '\') !important;' +
        '}\n' +
        '.outfiter .url, .outfiter .div2 {' +
        '  background: #383838 url(\'data:image/png;base64,' + bgs[2] + '\') repeat;' +
        '}\n' +
        '.outfiter .nbutton, .outfiter .div4, .outfiter .div4list {' +
        '  background: #383838 url(\'data:image/png;base64,' + bgs[3] + '\') repeat !important;' +
        '}\n' +
        '.outfiter .leftb, .outfiter .leftb[disabled]:active { background-position: left top !important ; }\n' +
        '.outfiter .leftb:active { background-position: right top !important ; }\n' +
        '.outfiter .rightb, .outfiter .rightb[disabled]:active { background-position: left bottom !important ; }\n' +
        '.outfiter .rightb:active { background-position: right bottom !important ; }';
      if ($('head .outfiter_style').length === 0) {
        $('head').append('<style class="outfiter_style" type="text/css">' + css_text + '</style>');
      }
      ogebi('letters_image').attr('src', 'data:image/png;base64,' + bgs[4]);
      ogebi('hp_bar').attr('src', 'data:image/png;base64,' + bgs[5]);
      return true;
    };

  if (outfiter_init()) { outfiter_load_outfit(); }
  $('.outfiter_img').hide();
});