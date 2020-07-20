/* jshint maxerr: 1000 */
//Creates tables for use in Abilities and Augments maximization

//Credits: Kselia, TunaInABottle, #javascript channel of DevWiki's Discord
//Source: https://jsfiddle.net/TunaInABottle/47enrfuc/

//原始碼位置：https://jsfiddle.net/mo2gr3e9/

//中文化尚在進行中by鋼砲

$(function() {
  // Warframes
  var AshMap = {
    手裡劍: [
      ["ash1_str1", "基礎傷害"],
      ["ash1_str2", "流血持續傷害"],
      ["ash1_str3", "傷害總和"],
      ["ash1_eff", "能量"]
    ],
    削甲手裡劍: [
      ["ash1_aug_dur", "削弱持續時間"],
      ["ash1_aug_str", "護甲削弱"]
    ],
    煙幕: [
      ["ash2_dur", "持續時間"],
      ["ash2_rng", "範圍"],
      ["ash2_eff", "能量"]
    ],
    庇護煙幕: "N/A",
    瞬移: [
      ["ash3_rng", "範圍"],
      ["ash3_eff", "能量"]
    ],
    致命傳送: [
      ["ash3_aug_str", "額外傷害"]
    ],
    劍刃風暴: [
      ["ash4_str1", "基礎傷害"],
      ["ash4_str2", "流血持續傷害"],
      ["ash4_str3", "傷害總和"],
      ["ash4_rng", "範圍"],
      ["ash4_eff1", "每一次標記耗能(未隱身)"],
      ["ash4_eff2", "每一次標記耗能(隱身)"]
    ],
    風起雲湧: [
      ["ash4_aug_str", "近戰連擊"]
    ]
  };
  var AtlasMap = {
    landslide: [
      ["atlas1_str", "傷害"],
      ["atlas1_dur", "連擊空檔"],
      ["atlas1_rng1", "衝刺距離"],
      ["atlas1_rng2", "衝擊半徑"],
      ["atlas1_eff", "能量"]
    ],
    path_of_statues: [
      ["atlas1_aug_dur1", "痕跡維持時間"],
      ["atlas1_aug_dur2", "石化持續時間"]
    ],
    tectonics: [
      ["atlas2_health", "生命"],
      ["atlas2_str1", "滾石碰撞傷害"],
      ["atlas2_str2", "爆炸傷害"],
      ["atlas2_rng", "爆炸半徑"],
      ["atlas2_eff", "能量"]
    ],
    tectonic_fracture: "N/A",
    petrify: [
      ["atlas3_dur", "石化持續時間"],
      ["atlas3_rng", "扇形半徑"],
      ["atlas3_eff", "能量"]
    ],
    ore_gaze: [
      ["atlas3_aug_str", "額外掉落機率"]
    ],
    rumblers: [
      ["atlas4_dur", "持續時間"],
      ["atlas4_health", "生命"],
      ["atlas4_armor", "護甲"],
      ["atlas4_str1", "近戰傷害"],
      ["atlas4_str2", "石像傷害"],
      ["atlas4_str3", "爆炸傷害"],
      ["atlas4_rng1", "石像/爆炸傷害"],
      ["atlas4_rng2", "速度倍率"],
      ["atlas4_eff", "能量"]
    ],
    titanic_rumbler: [
      ["atlas4_aug_health", "生命"],
      ["atlas4_aug_str1", "近戰傷害"],
      ["atlas4_aug_str2", "石像傷害"],
      ["atlas4_aug_str3", "爆炸傷害"],
      ["atlas4_aug_rng", "速度倍率"]
    ]
  };
  var BansheeMap = {
    sonic_boom: [
      ["banshee1_str", "傷害"],
      ["banshee1_rng", "扇形半徑"],
      ["banshee1_eff", "能量"]
    ],
    sonic_fracture: [
      ["banshee1_aug_str", "護甲削弱"],
      ["banshee1_aug_dur", "削弱持續時間"]
    ],
    sonar: [
      ["banshee2_dur", "持續時間"],
      ["banshee2_str", "Damage multiplier"],
      ["banshee2_rng", "範圍"],
      ["banshee2_eff", "能量"]
    ],
    resonance: "N/A",
    silence: [
      ["banshee3_dur", "持續時間"],
      ["banshee3_rng", "範圍"],
      ["banshee3_eff", "能量"]
    ],
    savage_silence: [
      ["banshee3_aug_str", "Damage multiplier"]
    ],
    sound_quake: [
      ["banshee4_str", "傷害"],
      ["banshee4_rng", "範圍"],
      ["banshee4_eff", "能量"],
      ["banshee4_cha", "Energy drain"]
    ],
    resonating_quake: [
      ["banshee4_aug_str", "傷害"],
      ["banshee4_aug_rng", "範圍"],
      ["banshee4_aug_eff", "能量"]
    ]
  };
  var BaruukMap = {
    "": "",
    elude: [
      ["baruuk1_rng", "Evasion angle"],
      ["baruuk1_eff", "能量"],
      ["baruuk1_cha", "Energy drain"]
    ],
    lull: [
      ["baruuk2_dur1", "Wave duration"],
      ["baruuk2_dur2", "Sleep duration"],
      ["baruuk2_rng" , "範圍"],
      ["baruuk2_eff", "能量"]
    ],
    desolate_hands: [
      ["baruuk3_str1", "傷害"],
      ["baruuk3_str2", "Charges"],
      ["baruuk3_str3", "Damage reduction"],
      ["baruuk3_rng1", "Seek range"],
      ["baruuk3_rng2", "Explosion range"],
      ["baruuk3_eff" , "能量"]
    ],
    serene_storm: [
      ["baruuk4_str1", "傷害"],
      ["baruuk4_str2", "Damage reduction"]
    ],
  };
  var EmberMap = {
    fireball: [
      ["ember1_str1", "Impact Damage"],
      ["ember1_str2", "Area Damage"],
      ["ember1_eff", "能量"]
    ],
    fireball_frenzy: [
      ["ember1_aug_str", "Damage bonus"],
      ["ember1_aug_dur", "持續時間"],
      ["ember1_aug_rng", "範圍"]
    ],
    accelerant: [
      ["ember2_str", "Fire damage multiplier"],
      ["ember2_dur", "持續時間"],
      ["ember2_rng", "範圍"],
      ["ember2_eff", "能量"]
    ],
    flash_accelerant: [
      ["ember2_aug_str", "Fire damage multiplier"]
    ],
    fire_blast: [
      ["ember3_str1", "Wave damage"],
      ["ember3_str2", "Ring damage"],
      ["ember3_dur", "持續時間"],
      ["ember3_eff", "能量"]
    ],
    fire_fright: "N/A",
    world_on_fire: [
      ["ember4_str1", "傷害"],
      ["ember4_str2", "Status chance"],
      ["ember4_rng", "範圍"],
      ["ember4_eff", "能量"],
      ["ember4_cha", "Energy drain"]
    ],
    firequake: "N/A"
  };
  var ExcaliburMap = {
    slash_dash: [
      ["excalibur1_str", "傷害"],
      ["excalibur1_rng", "範圍"],
      ["excalibur1_eff", "能量"]
    ],
    surging_dash: [
      ["excalibur1_aug_str", "Combo counter hits"]
    ],
    radial_blind: [
      ["excalibur2_dur", "持續時間"],
      ["excalibur2_rng", "範圍"],
      ["excalibur2_eff", "能量"]
    ],
    radial_finish: [
      ["excalibur2_aug_str", "Damage multiplier"]
    ],
    radial_javelin: [
      ["excalibur3_str", "傷害"],
      ["excalibur3_rng", "範圍"],
      ["excalibur3_eff", "能量"]
    ],
    furious_javelin: [
      ["excalibur3_aug_str", "Bonus melee damage"],
      ["excalibur3_aug_dur", "Buff duration"]
    ],
    exalted_blade: [
      ["excalibur4_str", "傷害"],
      ["excalibur4_dur", "持續時間"],
      ["excalibur4_rng", "範圍"],
      ["excalibur4_eff", "能量"],
      ["excalibur4_cha", "Energy drain"]
    ],
    chromatic_blade: [
      ["excalibur4_aug_str", "Status chance"]
    ]
  };
  var FrostMap = {
    freeze: [
      ["frost1_str1", "Impact damage"],
      ["frost1_str2", "Area damage"],
      ["frost1_dur1", "Freeze duration"],
      ["frost1_dur2", "Ice duration"],
      ["frost1_eff", "能量"]
    ],
    freeze_force: [
      ["frost1_aug_str", "Damage bonus"],
      ["frost1_aug_dur", "持續時間"],
      ["frost1_aug_rng", "範圍"]
    ],
    ice_wave: [
      ["frost2_str", "傷害"],
      ["frost2_rng1", "Angle"],
      ["frost2_rng2", "Initial width"],
      ["frost2_rng3", "Length"],
      ["frost2_eff", "能量"]
    ],
    ice_wave_impedance: [
      ["frost2_aug_dur", "持續時間"]
    ],
    snow_globe: [
      ["frost3_health", "生命"],
      ["frost3_str", "Explosion Damage"],
      ["frost3_rng", "範圍"],
      ["frost3_eff", "能量"]
    ],
    chilling_globe: [
      ["frost3_aug_dur", "持續時間"]
    ],
    avalanche: [
      ["frost4_str1", "Initial damage"],
      ["frost4_str2", "爆炸傷害"],
      ["frost4_str3", "Armor Reduction"],
      ["frost4_rng1", "Freeze range"],
      ["frost4_rng2", "Explosion range"],
      ["frost4_dur", "持續時間"],
      ["frost4_eff", "能量"]
    ],
    icy_avalanche: [
      ["frost4_aug_str", "Shield health"]
    ]
  };
  var GaraMap = {
    "": "",
    shattered_lash: [
      ["gara1_str", "傷害"],
      ["gara1_rng", "範圍"],
      ["gara1_eff", "能量"]
    ],
    splinter_storm: [
      ["gara2_str1", "傷害"],
      ["gara2_str2", "Damage Reduction"],
      ["gara2_str3", "Damage Multiplier"],
      ["gara2_dur", "持續時間"],
      ["gara2_rng1", "Cast range"],
      ["gara2_rng2", "Ability range"],
      ["gara2_eff", "能量"]
    ],
    mending_splinters: [
      ["gara2_aug_str4", "Health regen"]
    ],
    spectrorage: [
      ["gara3_str1", "Mirror damage"],
      ["gara3_str2", "Collapse damage"],
      ["gara3_dur", "持續時間"],
      ["gara3_rng1", "Mirrors"],
      ["gara3_rng2", "Collapse threshold"],
      ["gara3_rng3", "Charm radius"],
      ["gara3_eff", "能量"]
    ],
    spectrosiphon: "N/A",
    mass_vitrify: [
      ["gara4_str1", "Damage multiplier"],
      ["gara4_str2", "Segment base health"],
      ["gara4_str3", "Segment explosion damage"],
      ["gara4_str4", "Shatter explosion damage"],
      ["gara4_dur1", "Expansion duration"],
      ["gara4_dur2", "Vitrify duration"],
      ["gara4_rng1", "Initial radius"],
      ["gara4_rng2", "Max radius"],
      ["gara4_rng3", "Segment explosion range"],
      ["gara4_rng4", "Shatter explosion range"],
      ["gara4_eff", "能量"],
      ["gara4_cha", "Energy drain"]
    ]
  };
  var GarudaMap = {
    "": "",
    dread_mirror: [
      ["garuda1_str", "Damage multiplier"],
      ["garuda1_dur", "持續時間"],
      ["garuda1_rng1", "Pounce range"],
      ["garuda1_rng2", "爆炸半徑"],
      ["garuda1_eff", "能量"],
      ["garuda1_cha", "Energy drain"]
    ],
    dread_ward: [
      ["garuda1_aug_dur", "持續時間"]
    ],
    blood_altar: [
      ["garuda2_str", "Health regen"],
      ["garuda2_dur", "持續時間"],
      ["garuda2_rng1", "Pounce range"],
      ["garuda2_rng2", "Heal radius"],
      ["garuda2_eff", "能量"]
    ],
    bloodletting: [
      ["garuda3_eff", "Energy gain"]
    ],
    seeking_talons: [
      ["garuda4_str1", "傷害"],
      ["garuda4_str2", "Bleed chance"],
      ["garuda4_dur", "持續時間"],
      ["garuda4_eff", "能量"]
    ]
  };
  var GaussMap = {
    "": "",
    mach_rush: [
      ["gauss1_str" , "傷害"],
      ["gauss1_rng1", "Knockdown range"],
      ["gauss1_rng2", "Shockwave range"],
      ["gauss1_eff" , "能量"]
    ],
    kinetic_plating: [
      ["gauss2_str", "Damage reduction"],
      ["gauss2_dur", "持續時間"],
      ["gauss2_eff", "能量"]
    ],
    thermal_sunder: [
      ["gauss3_str1", "Cold/Heat damage"],
      ["gauss3_str2", "Blast damage"],
      ["gauss3_dur1", "Area duration"],
      ["gauss3_dur2", "Status duration"],
      ["gauss3_rng" , "範圍"],
      ["gauss3_eff" , "能量"]
    ],
    redline: [
      ["gauss4_str" , "傷害"],
      ["gauss4_dur1", "持續時間"],
      ["gauss4_dur2", "Fire rate buff"],
      ["gauss4_dur3", "Attack speed buff"],
      ["gauss4_dur4", "Reload speed buff"],
      ["gauss4_dur5", "Holster speed buff"],
      ["gauss4_eff", "能量"]
    ]
  };
  var HarrowMap = {
    "": "",
    condemn: [
      ["harrow1_str", "Shields"],
      ["harrow1_dur", "持續時間"],
      ["harrow1_rng", "範圍"],
      ["harrow1_eff", "能量"]
    ],
    penance: [
      ["harrow2_str1", "Lifesteal"],
      ["harrow2_str2", "Bonus fire rate"],
      ["harrow2_str3", "Bonus reload speed"],
      ["harrow2_dur1", "Base duration"],
      ["harrow2_dur2", "Duration every 100 shields"],
      ["harrow2_eff", "能量"]
    ],
    thurible: [
      ["harrow3_str", "Conversion efficiency"],
      ["harrow3_dur", "持續時間"],
      ["harrow3_rng", "範圍"],
      ["harrow3_eff", "能量"]
    ],
    warding_thurible: [
      ["harrow3_aug_str1", "Damage reduction"],
      ["harrow3_aug_str2", "Energy per hit"]
    ],
    covenant: [
      ["harrow4_str", "critical chance every 100 damage"],
      ["harrow4_dur1", "Invulnerability duration"],
      ["harrow4_dur2", "Critical chance duration"],
      ["harrow4_eff", "能量"]
    ],
    lasting_covenant: [
      ["harrow4_aug_dur", "Bonus duration per headshot"]
    ]
  };
  var HildrynMap = {
    "": "",
    balefire: [
      ["hildryn1_str", "Damage per bolt"],
      ["hildryn1_rng", "爆炸半徑"],
      ["hildryn1_eff1", "Shields"],
      ["hildryn1_eff2", "Shields per shot"]
    ],
    shield_pillage: [
      ["hildryn2_str", "Shields/Armor reduction"],
      ["hildryn2_dur", "持續時間"],
      ["hildryn2_rng", "Final pulse radius"],
      ["hildryn2_eff", "Shields"]
    ],
    haven: [
      ["hildryn3_str1", "Ally bonus shields"],
      ["hildryn3_str2", "傷害"],
      ["hildryn3_dur", "Recharge rate bonus"],
      ["hildryn3_eff", "Shields"],
      ["hildryn3_cha1", "Shields drain per ally"],
      ["hildryn3_cha2", "Shields drain per enemy"]
    ],
    aegis_storm: [
      ["hildryn4_str1", "Damage/sec"],
      ["hildryn4_str2", "Damage on deactivation"],
      ["hildryn4_rng", "Max field radius"],
      ["hildryn4_eff", "Shields"],
      ["hildryn4_cha1", "Shields drain per second"],
      ["hildryn4_cha2", "Shields drain per enemy"]
    ]
  };
  var HydroidMap = {
    tempest_barrage: [
      ["hydroid1_str", "傷害"],
      ["hydroid1_dur", "持續時間"],
      ["hydroid1_rng", "Explosion range"],
      ["hydroid1_eff", "能量"]
    ],
    corroding_barrage: "N/A",
    tidal_surge: [
      ["hydroid2_str", "傷害"],
      ["hydroid2_dur", "持續時間"],
      ["hydroid2_rng", "Speed"],
      ["hydroid2_eff", "能量"]
    ],
    tidal_impunity: [
      ["hydroid2_aug_dur", "持續時間"]
    ],
    undertow: [
      ["hydroid3_str1", "傷害"],
      ["hydroid3_str2", "Damage increase"],
      ["hydroid3_rng1", "Puddle size"],
      ["hydroid3_rng2", "Grab range"],
      ["hydroid3_eff1", "能量"],
      ["hydroid3_eff2", "Energy/grab"],
      ["hydroid3_eff3", "Meters/Energy"],
      ["hydroid3_cha", "Energy drain"]
    ],
    curative_undertow: [
      ["hydroid3_aug_str1", "ally max health restored"],
      ["hydroid3_aug_str2", "self max health restored"]
    ],
    tentacle_swarm: [
      ["hydroid4_str1", "Contact amage"],
      ["hydroid4_str2", "Capture damage"],
      ["hydroid4_dur", "持續時間"],
      ["hydroid4_rng", "範圍"],
      ["hydroid4_eff", "能量"]
    ],
    pilfering_swarm: "N/A"
  };
  var InarosMap = {
    "": "",
    desiccation: [
      ["inaros1_str", "傷害"],
      ["inaros1_dur", "持續時間"],
      ["inaros1_rng", "範圍"],
      ["inaros1_eff", "能量"]
    ],
    desiccations_curse: "N/A",
    devour: [
      ["inaros2_str", "傷害"],
      ["inaros2_dur", "持續時間"],
      ["inaros2_rng", "範圍"],
      ["inaros2_eff", "能量"]
    ],
    sandstorm: [
      ["inaros3_str", "傷害"],
      ["inaros3_rng", "範圍"],
      ["inaros3_eff", "能量"],
      ["inaros3_cha", "Energy drain"]
    ],
    elemental_sandstorm: [
      ["inaros3_aug_str", "Status chance/sec"]
    ],
    scarab_swarm: [
      ["inaros4_str", "傷害"],
      ["inaros4_dur", "持續時間"],
      ["inaros4_rng1", "Cast range"],
      ["inaros4_rng2", "Heal range"],
      ["inaros4_eff", "能量"]
    ],
    negation_swarm: "N/A"
  };
  var IvaraMap = {
    quiver: [
      ["ivara1_dur1", "Bubble duration"],
      ["ivara1_dur2", "Sleep duration"],
      ["ivara1_rng1", "Bubble range"],
      ["ivara1_rng2", "Noise range"],
      ["ivara1_rng3", "Sleep range"],
      ["ivara1_eff", "能量"]
    ],
    empowered_quiver: [
      ["ivara1_aug_str1", "Critical damage bonus"],
      ["ivara1_aug_str2", "Chance to resistist statuses"]
    ],
    navigator: [
      ["ivara2_str", "Maximum damage multiplier"],
      ["ivara2_dur", "Multiplier growth"],
      ["ivara2_eff", "能量"],
      ["ivara2_cha", "Energy drain"]
    ],
    piercing_navigator: [
      ["ivara2_aug_str1", "Critical chance per hit"],
      ["ivara2_aug_str2", "Maximum Critical chance"]
    ],
    prowl: [
      ["ivara3_str1", "Bonus headshot damage"],
      ["ivara3_str2", "額外掉落機率"],
      ["ivara3_dur", "Steal time"],
      ["ivara3_rng", "Steal range"],
      ["ivara3_eff", "能量"],
      ["ivara3_cha", "Energy drain"]
    ],
    infiltrate: [
      ["ivara3_aug_str", "Movement speed bonus"]
    ],
    artemis_bow: [
      ["ivara4_str", "基礎傷害"],
      ["ivara4_eff1", "能量"],
      ["ivara4_eff2", "Energy/shot"]
    ],
    concentrated_arrow: [
      ["ivara4_aug_rng", "範圍"]
    ]
  };
  var KhoraMap = {
    "": "",
    whipclaw: [
      ["khora1_str", "基礎傷害"],
      ["khora1_rng1", "Cast range"],
      ["khora1_rng2", "Explosion range"],
      ["khora1_eff", "能量"]
    ],
    accumulating_whipclaw: [
      ["khora1_aug_str", "Maximum damage"]
    ],
    ensnare: [
      ["khora2_dur1", "持續時間"],
      ["khora2_dur2", "Spread delay"],
      ["khora2_rng1", "Cast range"],
      ["khora2_rng2", "Spread range"],
      ["khora2_eff", "能量"]
    ],
    venari: [
      ["khora3_str1", "速度倍率"],
      ["khora3_str2", "Snare damage"],
      ["khora3_str3", "Health regen"],
      ["khora3_eff1", "Command energy"],
      ["khora3_eff2", "Revive energy"]
    ],
    venari_bodyguard: "N/A",
    strangledome: [
      ["khora4_str", "傷害"],
      ["khora4_dur", "持續時間"],
      ["khora4_rng1", "Dome range"],
      ["khora4_rng2", "Grab range"],
      ["khora4_eff", "能量"]
    ],
    pilfering_strangledome: "N/A"
  };
  var LimboMap = {
    "": "",
  	banish: [
      ["limbo1_str", "傷害"],
      ["limbo1_dur", "持續時間"],
      ["limbo1_rng", "範圍"],
      ["limbo1_eff", "能量"]
    ],
  	rift_haven: [
      ["limbo1_aug_str", "Health restored"]
    ],
  	stasis: [
      ["limbo2_dur", "持續時間"],
      ["limbo2_eff", "能量"]
    ],
    rift_surge: [
      ["limbo3_dur1", "Surge duration"],
      ["limbo3_dur2", "Banish duration"],
      ["limbo3_rng1", "Surge/transfer radius"],
      ["limbo3_rng2", "Banish radius"],
      ["limbo3_eff" , "能量"]
    ],
    rift_torrent: [
      ["limbo3_aug_str", "Damage bonus while rifted"],
    ],
    cataclysm: [
      ["limbo4_str" , "傷害"],
      ["limbo4_dur" , "持續時間"],
      ["limbo4_rng1", "Initial radius"],
      ["limbo4_rng2", "Final radius"],
      ["limbo4_eff" , "能量"]
    ],
    cataclysm_continuum: "N/A",
  };
  var LokiMap = {
  	decoy: [
      ["loki1_dur" , "持續時間"],
      ["loki1_eff" , "能量"]
    ],
    savior_decoy: "N/A",
    invisibility: [
      ["loki2_dur" , "持續時間"],
      ["loki2_eff" , "能量"]
    ],
    hushed_invisibility: "N/A",
    switch_teleport: [
      ["loki3_rng" , "範圍"],
      ["loki3_eff" , "能量"]
    ], 
    safeguard_switch: [
      ["loki3_aug_dur" , "範圍"]
    ], 
    radial_disarm: [
      ["loki4_str" , "傷害"],
      ["loki4_rng" , "範圍"],
      ["loki4_eff" , "能量"]
    ], 
    irradiating_disarm: "N/A",
  };
  var MagMap = {
  	pull: [
      ["mag1_str1", "傷害"],
      ["mag1_str2", "Energy drop chance"],
      ["mag1_rng" , "範圍"],
      ["mag1_eff" , "能量"]
    ],
    greedy_pull: "N/A",
    magnetize: [
      ["mag2_str1", "Multiplier"],
      ["mag2_str2", "爆炸傷害"],
      ["mag2_dur" , "持續時間"],
      ["mag2_rng1", "Field radius"],
      ["mag2_rng2", "爆炸半徑"],
      ["mag2_eff" , "能量"]
    ],
    magnetized_discharge: [
      ["mag2_aug_str", "Disarm chance"]
    ],
    polarize: [
      ["mag3_str1", "傷害"],
      ["mag3_str2", "Damage multiplier"],
      ["mag3_dur" , "持續時間"],
      ["mag3_rng1", "Initial/explosion radius"],
      ["mag3_rng2", "Maximum pulse range"],
      ["mag3_eff" , "能量"]
    ],
    counter_pulse: [
      ["mag3_aug_dur", "Disable/jamming duration"]
    ],
    crush: [
      ["mag4_str1", "傷害"],
      ["mag4_str2", "Shields restored"],
      ["mag4_rng" , "範圍"],
      ["mag4_eff" , "能量"]
    ],
    fracturing_crush: [
      ["mag4_aug_str", "護甲削弱"],
      ["mag4_aug_dur", "Root duration"]
    ],
  };
  var MesaMap = {
  	ballistic_battery: [
    	["mesa1_str1", "Damage conversion"],
    	["mesa1_str2", "Max damage per instance"],
    	["mesa1_str3", "Max stored damage"],
    	["mesa1_eff" , "能量"]
    ],
    ballistic_bullseye: "N/A",
    shooting_gallery: [
			["mesa2_str", "Damage bonus"],
			["mesa2_dur", "持續時間"],
			["mesa2_rng", "範圍"],
			["mesa2_eff", "能量"],
    ],
    muzzle_flash: [
			["mesa2_aug_rng", "Blind range"],
			["mesa2_aug_dur", "Blind duration"]
    ],
    shatter_shield: [
			["mesa3_str", "Damage reduction"],
			["mesa3_dur", "持續時間"],
			["mesa3_rng", "範圍"],
			["mesa3_eff", "能量"]
    ],
    staggering_shield: "N/A",
    peacemaker: [
			["mesa4_str", "Damage bonus"],
			["mesa4_eff", "能量"],
			["mesa4_cha", "Energy drain"]
    ],
    mesas_waltz: "N/A",
  };
	var MirageMap = {
    "": "",
  	hall_of_mirrors: [
    	["mirage1_str", "傷害"],
    	["mirage1_dur", "持續時間"],
    	["mirage1_eff" , "能量"]
    ],
    hall_of_malevolence: "N/A",
  	sleight_of_hand: [
    	["mirage2_str" , "Pickup/Jewel explosion damage"],
    	["mirage2_dur1", "Trap duration"],
    	["mirage2_dur2", "Blind duration"],
    	["mirage2_rng1", "Trap radius"],
    	["mirage2_rng2", "Jewel charm radius"],
    	["mirage2_rng3", "Explosion/blind radius"],
    	["mirage2_eff" , "能量"]
    ],
    explosive_legerdemain: [
    	["mirage2_aug_str", "Mine damage"]
    ],
    eclipse: [
    	["mirage3_str1", "Maximum damage bonus"],
    	["mirage3_str2", "Maximum damage reduction"],
    	["mirage3_dur" , "持續時間"],
    	["mirage3_eff" , "能量"]
    ],
  	total_eclipse: [
    	["mirage3_aug_rng" , "範圍"]
    ],
    prism: [
    	["mirage4_str1", "Minimum damage"],
    	["mirage4_str2", "Minimum damage"],
    	["mirage4_dur1", "Prism duration"],
    	["mirage4_dur2", "Blind duration"],
    	["mirage4_rng1", "Laser range"],
    	["mirage4_rng2", "Blind radius"],
    	["mirage4_eff" , "能量"],
    	["mirage4_cha" , "Energy drain"],
    	
    ],
  };
  var NekrosMap = {
    soul_punch: [
      ["nekros1_str", "Initial damage"],
      ["nekros1_rng", "Cast range"],
      ["nekros1_eff", "能量"]
    ],
    soul_survivor: [
      ["nekros1_aug_str", "Health restored"]
    ],
    terrify: [
      ["nekros2_str1", "Affected enemies"],
      ["nekros2_str2", "護甲削弱"],
      ["nekros2_dur" , "持續時間"],
      ["nekros2_rng" , "範圍"],
      ["nekros2_eff" , "能量"]
    ],
    creeping_terrify: [
      ["nekros2_aug_str", "Movement speed reduction"]
    ],
    desecrate: [
      ["nekros3_rng", "範圍"],
      ["nekros3_eff", "Energy/energy per corpse"]
    ],
    despoil: [
      ["nekros3_aug_eff", "Health per corpse"]
    ],
    shadows_of_the_dead: [
      ["nekros4_str1", "Damage bonus"],
      ["nekros4_str2", "Shield/health bonus"],
      ["nekros4_dur" , "Health decay"],
      ["nekros4_eff" , "能量"]
    ],
    shield_of_shadows: [
      ["nekros4_aug_str1", "Damage reduction per shadow"],
      ["nekros4_aug_str2", "Max damage reduction"],
      ["nekros4_aug_rng" , "Link range"]
    ],
  };
  
  var NezhaMap = {
    "": "",
  	fire_walker: [
      ["nezha1_str1", "傷害"],
      ["nezha1_str2", "爆炸傷害"],
      ["nezha1_dur1", "Ability duration"],
      ["nezha1_dur2", "Flame duration"],
      ["nezha1_rng" , "爆炸半徑"],
      ["nezha1_eff" , "能量"]
    ],
  	pyroclastic_flow: [
      ["nezha1_aug_dur", "Trail duration"],
    ],
  	blazing_chakram: [
      ["nezha2_str1", "傷害"],
      ["nezha2_str2", "Boosted damage"],
      ["nezha2_str3", "Damage multiplier"],
      ["nezha2_dur" , "持續時間"],
      ["nezha2_eff" , "能量"]
    ],
    reaping_chakram: "N/A",
  	warding_halo: [
      ["nezha3_str1", "Base health"],
      ["nezha3_str2", "傷害"],
      ["nezha3_str3", "Absorption multiplier"],
      ["nezha3_rng" , "範圍"],
      ["nezha3_eff" , "能量"]
    ],
    safeguard: "N/A",
  	divine_spears: [
      ["nezha4_str", "Impale/slam damage"],
      ["nezha4_dur", "持續時間"],
      ["nezha4_rng", "範圍"],
      ["nezha4_eff", "能量"]
    ],
  };
  var NidusMap = {
  	"": "",
  	virulence: [
      ["nidus1_str", "傷害"],
      ["nidus1_rng", "範圍"],
      ["nidus1_eff", "能量"]
    ],
  	teeming_virulence: [
      ["nidus1_aug_str", "Critical chance bonus"],
      ["nidus1_aug_dur", "持續時間"]
    ],
  	larva: [
      ["nidus2_dur", "持續時間"],
      ["nidus2_rng", "範圍"],
      ["nidus2_eff", "能量"]
    ],
  	larva_burst: [
      ["nidus2_aug_str", "傷害"],
      ["nidus2_aug_rng", "範圍"],
    ],
  	parasitic_link: [
      ["nidus3_str1", "Ability Strength multiplier"],
      ["nidus3_str2", "Damage redirection"],
      ["nidus3_dur" , "持續時間"],
      ["nidus3_rng1", "Ally link"],
      ["nidus3_rng2", "Enemy link"],
    ],
  	ravenous: [
      ["nidus4_str1", "爆炸傷害"],
      ["nidus4_str2", "Health regen"],
      ["nidus4_dur" , "持續時間"],
      ["nidus4_rng" , "爆炸半徑"],
    ],
    insatiable: "N/A",
  };
  
  var NovaMap = {
  	null_star: [
      ["nova1_str" , "傷害"],
      ["nova1_dur1", "Particles"],
      ["nova1_dur2", "Maximum damage reduction"],
      ["nova1_rng" , "範圍"],
      ["nova1_eff", "能量"]
    ],
    neutron_star: [
      ["nova1_aug_str1", "Damage per particle"],
      ["nova1_aug_str2", "Maximum damage"],
      ["nova1_aug_rng" , "explosion range"],
    ],
    antimatter_drop: [
      ["nova2_str1", "基礎傷害"],
      ["nova2_str2", "Contact damage"],
      ["nova2_eff" , "能量"]
    ],
    antimatter_absorb: [
      ["nova2_aug_rng", "Absorb radius"],
    ],
    worm_hole: [
      ["nova3_dur", "持續時間"],
      ["nova3_eff" , "能量"]
    ],
    escape_velocity: [
      ["nova3_aug_dur", "持續時間"],
    ],
    molecular_prime: [
      ["nova4_str1", "傷害"],
      ["nova4_str2", "Movement speed reduction"],
      ["nova4_dur1", "Wave duration"],
      ["nova4_dur2", "Maximum range"],
      ["nova4_dur3", "Prime duration"],
      ["nova4_rng" , "爆炸半徑"],
      ["nova4_eff" , "能量"],
    ],
    molecular_fission: "N/A",
  };
  var NyxMap = {
  	mind_control: [
      ["nyx1_dur", "持續時間"],
      ["nyx1_rng", "範圍"],
      ["nyx1_eff", "能量"],
    ],
  	mind_freak: [
      ["nyx1_aug_str", "Damage bonus"]
    ],
  	psychic_bolts: [
      ["nyx2_str", "Debuff"],
      ["nyx2_dur", "持續時間"],
      ["nyx2_eff", "能量"],
    ],
  	pacifying_bolts: [
      ["nyx2_aug_dur", "持續時間"]
    ],
  	chaos: [
      ["nyx3_dur", "持續時間"],
      ["nyx3_rng", "範圍"],
      ["nyx3_eff", "能量"],
    ],
    chaos_sphere: "N/A",
    absorb: [
      ["nyx4_str1", "Passive damage gain"],
      ["nyx4_str2", "Minimum damage"],
      ["nyx4_str3", "Damage conversion"],
      ["nyx4_rng" , "範圍"],
      ["nyx4_eff1", "能量"],
      ["nyx4_eff2", "Energy per 1000 damage"],
      ["nyx4_cha" , "Energy drain"],
    ],
    assimilate: "N/A",
  };
  var OberonMap = {
  	smite: [
      ["oberon1_str1", "Initial damage"],
      ["oberon1_str2", "Orb base damage"],
      ["oberon1_str3", "Number of orbs"],
      ["oberon1_dur" , "持續時間"],
      ["oberon1_rng1", "Cast range"],
      ["oberon1_rng2", "Orb range"],
      ["oberon1_eff" , "能量"]
    ],
  	smite_infusion: [
      ["oberon1_aug_str", "Damage bonus"],
      ["oberon1_aug_dur", "持續時間"],
      ["oberon1_aug_rng", "範圍"]
    ],
  	hallowed_ground: [
      ["oberon2_str1", "傷害"],
      ["oberon2_str2", "Status chance"],
      ["oberon2_dur" , "持續時間"],
      ["oberon2_rng1", "Angle"],
      ["oberon2_rng2", "Radius"],
      ["oberon2_eff" , "能量"]
    ],
  	hallowed_eruption: [
      ["oberon2_aug_dur" , "持續時間"],
      ["oberon2_aug_str", "Maximum damage"]
    ],
  	renewal: [
      ["oberon3_str1", "Wave duration"],
      ["oberon3_str2", "Armor buff"],
      ["oberon3_str3", "Initial heal"],
      ["oberon3_str4", "Health regen"],
      ["oberon3_dur1", "Bleedout slow"],
      ["oberon3_dur2", "持續時間"],
      ["oberon3_rng" , "範圍"],
      ["oberon3_eff" , "能量"],
      ["oberon3_cha" , "Energy drain"]
    ],
    phoenix_renewal: [
      ["oberon3_aug_str", "Health restored"]
    ],
  	reckoning: [
      ["oberon4_str1", "護甲削弱"],
      ["oberon4_str2", "傷害"],
      ["oberon4_str3", "Extra damage"],
      ["oberon4_dur" , "持續時間"],
      ["oberon4_rng1", "Blind range"],
      ["oberon4_rng2", "Cast range"],
      ["oberon4_eff" , "能量"]
    ],
  	hallowed_reckoning: [
      ["oberon4_aug_str1", "傷害"],
      ["oberon4_aug_str2", "Armor bonus"],
      ["oberon4_aug_dur" , "持續時間"]
    ],
  };
  var OctaviaMap = {
  	"": "",
  	mallet: [
      ["octavia1_str", "Damage multiplier"],
      ["octavia1_dur", "持續時間"],
      ["octavia1_rng", "範圍"],
      ["octavia1_eff", "能量"],
    ],
    partitioned_mallet: "N/A",
  	resonator: [
      ["octavia2_str", "傷害"],
      ["octavia2_dur", "持續時間"],
      ["octavia2_rng", "Charm radius"],
      ["octavia2_eff", "能量"],
    ],
    conductor: "N/A",
  	metronome: [
      ["octavia3_str1", "Armor bonus"],
      ["octavia3_str2", "Speed/multishot/melee damage bonus"],
      ["octavia3_dur1", "Ability duration"],
      ["octavia3_dur2", "Buff duration"],
      ["octavia3_rng" , "範圍"],
      ["octavia3_eff" , "能量"],
    ],
  	amp: [
      ["octavia4_str", "Damage multiplier"],
      ["octavia4_dur" , "持續時間"],
      ["octavia4_rng" , "範圍"],
      ["octavia4_eff" , "能量"],
    ],
  };
  var RevenantMap = {
  	"": "",
  	enthrall: [
      ["revenant1_str" , "傷害"],
      ["revenant1_dur1", "Thrall duration"],
      ["revenant1_dur2", "Pillar duration"],
      ["revenant1_rng1", "Cast range"],
      ["revenant1_rng2", "Effect range"],
      //["revenant1_rng3", "Projectile range"],
      ["revenant1_eff", "能量"],
    ],
    mesmer_skin: [
      ["revenant2_str" , "Charges"],
      ["revenant2_dur", "stun duration"],
      ["revenant2_eff", "能量"],
    ],
    reave: [
      ["revenant3_str1" , "Hitpoints drain/restore"],
      ["revenant3_str2" , "Thrall hitpoints drain/restore"],
      ["revenant3_dur", "持續時間"],
      ["revenant3_rng" , "Width"],
      ["revenant3_eff", "能量"],
    ],
    blinding_reave: [
      ["revenant3_aug_dur", "持續時間"],
    ],
    danse_macabre: [
      ["revenant4_str", "傷害"],
      ["revenant4_rng", "Beam radius"],
      ["revenant4_eff", "能量"],
      ["revenant4_cha", "Energy drain"],
    ],
  };
  var RhinoMap = {
    rhino_charge: [
      ["rhino1_str", "傷害"],
      ["rhino1_dur", "Combo Window"],
      ["rhino1_rng1", "Charge radius"],
      ["rhino1_rng2", "衝擊半徑"],
      ["rhino1_eff", "能量"]
    ],
    ironclad_charge: [
      ["rhino1_aug_str", "Armor bonus"],
      ["rhino1_aug_dur", "持續時間"]
    ],
    iron_skin: [
      ["rhino2_str", "Base health"],
      ["rhino2_eff", "能量"]
    ],
    iron_shrapnel: [
      ["rhino2_aug_rng", "範圍"]
    ],
    roar: [
      ["rhino3_str", "額外傷害"],
      ["rhino3_rng", "範圍"],
      ["rhino3_eff", "能量"],
    ],
    piercing_roar: [
      ["rhino3_aug_str", "傷害"],
      ["rhino3_aug_dur", "持續時間"],
      ["rhino3_aug_rng", "範圍"]
    ],
    rhino_stomp: [
      ["rhino4_str", "傷害"],
      ["rhino4_dur", "持續時間"],
      ["rhino4_rng", "範圍"],
      ["rhino4_eff", "能量"]
    ],
    reinforcing_stomp: [
      ["rhino4_aug_str", "Iron Skin restoration"]
    ]
	};
  var SarynMap = {
    "": "",
  	spores: [
      ["saryn1_str1", "傷害"],
      ["saryn1_str2", "Damage growth per enemy"],
      ["saryn1_str3", "Status chance"],
      ["saryn1_str4", "Reset decay"],
      ["saryn1_dur" , "Damage decay rate"],
      ["saryn1_rng1", "Cast range"],
      ["saryn1_rng2", "Spread range"],
      ["saryn1_eff" , "能量"],
		],
  	venom_dose: [
      ["saryn1_aug_str" , "Damage bonus"],
      ["saryn1_aug_dur", "持續時間"],
      ["saryn1_aug_rng", "範圍"]
		],
  	molt: [
      ["saryn2_str1", "生命"],
      ["saryn2_str2", "爆炸傷害"],
      ["saryn2_str3", "速度倍率"],
      ["saryn2_dur1", "Decoy duration"],
      ["saryn2_dur2", "Speed duration"],
      ["saryn2_rng" , "範圍"],
      ["saryn2_eff" , "能量"],
		],
  	regenerative_molt: [
      ["saryn2_aug_str", "Health regen"],
		],
  	toxic_lash: [
      ["saryn3_str1", "Bonus gun damage"],
      ["saryn3_str2", "Bonus melee damage"],
      ["saryn3_str3", "Damage block"],
      ["saryn3_dur" , "持續時間"],
      ["saryn3_eff" , "能量"],
		],
    contagion_cloud: [
      ["saryn3_aug_str", "傷害"],
      ["saryn3_aug_dur", "持續時間"],
      ["saryn3_aug_rng", "範圍"],
    ],
  	miasma: [
      ["saryn4_str", "傷害"],
      ["saryn4_dur", "持續時間"],
      ["saryn4_rng", "範圍"],
      ["saryn4_eff", "能量"],
		],
  };
  var TitaniaMap = {
    "": "",
    spellbind: [
      ["titania1_dur", "持續時間"],
      ["titania1_rng1", "Ability range"],
      ["titania1_rng2", "Cast range"],
      ["titania1_eff", "能量"]
    ],
    tribute: [
      ["titania2_str", "傷害"],
      ["titania2_dur", "持續時間"],
      ["titania2_rng", "範圍"],
      ["titania2_eff", "能量"]
    ],
    lantern: [
      ["titania3_str1", "傷害"],
      ["titania3_str2", "爆炸傷害"],
      ["titania3_dur", "持續時間"],
      ["titania3_rng1", "Cast range"],
      ["titania3_rng2", "Attract range"],
      ["titania3_rng3", "Blast range"],
      ["titania3_rng4", "DoT range"],
      ["titania3_eff", "能量"]
    ],
    beguiling_lantern: [
      ["titania3_aug_str", "Bonus melee damage"]
    ],
    razorwing: [
      ["titania4_str1", "Gun damage"],
      ["titania4_str2", "近戰傷害"],
      ["titania4_str3", "Drone damage"],
      ["titania4_eff" , "能量"],
      ["titania4_cha" , "Energy drain"]
    ],
    razorwing_blitz: [
      ["titania4_aug_str", "Flight speed/fire rate increase"],
      ["titania4_aug_dur", "持續時間"]
    ],
  };
  var TrinityMap = {
    "": "",
    well_of_life: [
      ["trinity1_str1", "Lifesteal"],
      ["trinity1_str2", "Max health"],
      ["trinity1_dur", "持續時間"],
      ["trinity1_rng", "範圍"],
      ["trinity1_eff", "能量"]
    ],
    pool_of_life: [
      ["trinity1_aug_str", "Energy orb chance"]
    ],
    energy_vampire: [
      ["trinity2_str1", "Restored energy"],
      ["trinity2_str2", "傷害"],
      ["trinity2_dur" , "持續時間"],
      ["trinity2_rng1", "Cast range"],
      ["trinity2_rng2", "Pulse range"],
      ["trinity2_eff", "能量"]
    ],
    vampire_leech: "N/A",
    link: [
      ["trinity3_dur", "持續時間"],
      ["trinity3_rng", "範圍"],
      ["trinity3_eff", "能量"]
    ],
    abating_link: [
      ["trinity3_aug_str", "護甲削弱"]
    ],
    blessing: [
      ["trinity4_str1", "Shields/health restored"],
      ["trinity4_str2", "Damage reduction"],
      ["trinity4_dur", "持續時間"],
      ["trinity4_eff", "能量"]
    ],
  };
  var ValkyrMap = {
    rip_line: [
      ["valkyr1_str", "傷害"],
      ["valkyr1_dur", "持續時間"],
      ["valkyr1_rng", "範圍"],
      ["valkyr1_eff", "能量"]
    ],
    swing_line: "N/A",
    warcry: [
      ["valkyr2_str1", "Attack speed/Armor buff"],
      ["valkyr2_str2", "Movement speed reduction"],
      ["valkyr2_dur", "持續時間"],
      ["valkyr2_rng", "範圍"],
      ["valkyr2_eff", "能量"]
    ],
    eternal_war: [
      ["valkyr2_aug_dur", "Duration per kill"]
    ],
    paralysis: [
      ["valkyr3_str1", "Damage multiplier"],
      ["valkyr3_str2", "knockback strength"],
      ["valkyr3_rng", "範圍"],
      ["valkyr3_eff", "能量"]
    ],
    prolonged_paralysis: [
      ["valkyr3_aug_str", "Stun duration"]
    ],
    hysteria: [
      ["valkyr4_str", "傷害"],
      ["valkyr4_eff", "能量"],
      ["valkyr4_cha", "Energy drain"]
    ],
    hysterical_assault: [
      ["valkyr4_aug_rng", "範圍"]
    ],
  };
  var VoltMap = {
  	shock: [
      ["volt1_str", "傷害"],
      ["volt1_rng", "Chain range"],
      ["volt1_eff", "能量"]
    ],
    shock_trooper: [
      ["volt1_aug_str", "Damage bonus"],
      ["volt1_aug_dur", "持續時間"],
      ["volt1_aug_rng", "範圍"]
    ],
  	speed: [
      ["volt2_str1", "Attack/movement Speed buff"],
      ["volt2_str2", "Reload speed buff"],
      ["volt2_dur" , "持續時間"],
      ["volt2_rng" , "範圍"],
      ["volt2_eff" , "能量"]
    ],
  	shocking_speed: [
      ["volt2_aug_str", "傷害"]
    ],
  	electric_shield: [
      ["volt3_dur", "持續時間"],
      ["volt3_eff1", "能量"],
      ["volt3_eff2", "Meters per energy"]
    ],
    transistor_shield: [
      ["volt3_aug_str", "Damage conversion"]
    ],
    discharge: [
      ["volt4_str" , "傷害"],
      ["volt4_dur" , "持續時間"],
      ["volt4_rng1", "Ability range"],
      ["volt4_rng2", "Tesla range"],
      ["volt4_eff" , "能量"]
    ],
    capacitance: "N/A",
  };
  var WispMap = {
    "": "",
    reservoirs: [
      ["wisp1_str1", "Max health"],
      ["wisp1_str2", "Health regen"],
      ["wisp1_str3", "Bonus movement speed"],
      ["wisp1_str4", "Bonus attack speed"],
      ["wisp1_str5", "Shock damage"],
      ["wisp1_rng1", "Reservoir range"],
      ["wisp1_rng2", "Shock range"],
      ["wisp1_dur", "Mote lifespan"],
      ["wisp1_eff", "能量"]
    ],
    wil_o_wisp: [
      ["wisp2_dur", "持續時間"],
      ["wisp2_eff", "能量"]
    ],
    breach_surge: [
      ["wisp3_str1", "Damage multiplier"],
      ["wisp3_str2", "Status chance"],
      ["wisp3_dur", "Blind duration"],
      ["wisp3_rng", "範圍"],
      ["wisp3_eff", "能量"],
    ],
    sol_gate: [
      ["wisp4_str", "傷害"],
      ["wisp4_rng", "Beam length"],
      ["wisp4_eff", "能量"],
      ["wisp4_cha", "Energy drain"],
    ]
  };
  var WukongMap = {
    "": "",
    celestial_twin: [
      ["wukong1_str", "Health multiplier"],
      ["wukong1_eff", "能量"]
    ],
    celestial_stomp: [
      ["wukong1_aug_rng", "範圍"],
      ["wukong1_aug_eff", "能量"]
    ],
    cloud_walker: [
      ["wukong2_str", "Health regen"],
      ["wukong2_dur", "持續時間"],
      ["wukong2_rng", "範圍"],
      ["wukong2_eff", "能量"]
    ],
    enveloping_cloud: [
      ["wukong2_aug_dur", "持續時間"],
      ["wukong2_aug_rng", "範圍"]
    ],
    defy: [
      ["wukong3_str1", "Damage multiplier"],
      ["wukong3_str2", "Armor multiplier"],
      ["wukong3_dur1", "Invulnerability duration"],
      ["wukong3_dur2", "Armor duration"],
      ["wukong3_rng" , "範圍"],
      ["wukong3_eff", "能量"]
    ],
    primal_fury: [
      ["wukong4_str", "傷害"],
      ["wukong4_eff", "能量"],
      ["wukong4_cha", "Energy drain"]
    ],
    primal_rage: [
      ["wukong4_aug_str", "Critical chance per kill"],
      ["wukong4_aug_dur", "Decay"],
    ],
  };
  var ZephyrMap = {
    "": "",
    tail_wind: [
      ["zephyr1_str" , "傷害"],
      ["zephyr1_dur1", "Speed"],
      ["zephyr1_dur2", "Hover height"],
      ["zephyr1_rng1", "Contact range"],
      ["zephyr1_rng2", "Explosion range"],
      ["zephyr1_eff" , "能量"]
    ],
    target_fixation: "N/A",
    airburst: [
      ["zephyr2_str" , "Contact/explosion damage"],
      ["zephyr2_rng" , "範圍"],
      ["zephyr2_eff" , "能量"]
    ],
    turbulence: [
      ["zephyr3_dur" , "持續時間"],
      ["zephyr3_rng" , "範圍"],
      ["zephyr3_eff" , "能量"]
    ],
    jet_stream: [
      ["zephyr3_aug_str1", "Movement speed bonus"],
      ["zephyr3_aug_str2", "Projectile speed bonus"]
    ],
    tornado: [
      ["zephyr4_str", "傷害"],
      ["zephyr4_dur", "持續時間"],
      ["zephyr4_rng", "Spawn range"],
      ["zephyr4_eff", "能量"]
    ],
    funnel_clouds: "N/A",
  };

  // with every updade, gives a value to every stat
  function update_table() {
    var STR = reasonableInput('#in_STR') / 100;
    var RNG = reasonableInput('#in_RNG') / 100;
    var base_EFF = 2 - reasonableInput('#in_EFF') / 100;
    var EFF = Math.max(base_EFF, 0.25);
    var DUR = reasonableInput('#in_DUR') / 100;
    var CHA = Math.max(base_EFF / DUR, 0.25);
    var xARMOR = reasonableInput('#in_xARMOR') / 100;
    var aARMOR = reasonableInput('#in_aARMOR');
    var HEALTH = reasonableInput('#in_HEALTH') / 100;
    var SHIELDS = reasonableInput('#in_SHIELDS') / 100;
    var TARGET = reasonableInput('#in_TARGET');
    var COMBO = comboCheck(parseInt($('#in_COMBO').val()));

		var STACK = Math.min(Math.max(reasonableInput('#in_STACK'), 0), 100);
    var IRONCLAD_CHARGE = (STR * 50 * TARGET) / 100;


    // limits the input to a [0, 9999] range
    function reasonableInput(num) {
      var value = parseInt($(num).val());
      if (value < 0) {
        return 0;
      } else if (value > 9999) {
        return 9999;
      } else {
        return value;
      }
    }

    // gives 1, 2, or 4. Used for COMBO
    function comboCheck(num) {
      if (num <= 1) {
        return 1;
      } else if (num == 2) {
        return 2;
      } else {
        return 4;
      }
    }

    // Every cell is assigned with a formula
    // Ash
    formula_loader(['ash', 'ash1_aug', 'ash1'], [
      ['str1', (STR * 500).toFixed(0)],
      ['str2', (STR * 500 * 0.4375).toFixed(0) + "/s"],
      ['str3', (STR * 500 + 10 * (STR * 500 * 0.437)).toFixed(0)],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['ash', 'ash1_aug'], [
      ['dur', (DUR * 8).toFixed(2) + "s"],
      ['str', Math.min((STR * 70), 100).toFixed(2) + "%"]
    ]);
    formula_loader(['ash', 'ash2_aug', 'ash2'], [
      ['dur', (DUR * 8).toFixed(2) + "s"],
      ['rng', (RNG * 10).toFixed(2) + "m"],
      ['eff', (EFF * 35).toFixed(2)]
    ]);
    formula_loader(['ash', 'ash2_aug'], [
      ['rng', (RNG * 15).toFixed(2) + "m"],
    ]);
    formula_loader(['ash', 'ash3_aug', 'ash3'], [
      ['rng', (RNG * 60).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['ash', 'ash3_aug'], [
      ['str', (STR * 2).toFixed(2) + "x"]
    ]);
    formula_loader(['ash', 'ash4_aug', 'ash4'], [
      ['str1', (STR * 2000).toFixed(0)],
      ['str2', (STR * 2000 * 0.4375).toFixed(0) + "/s"],
      ['str3', (STR * 2000 + 10 * (STR * 2000 * 0.437)).toFixed(0)],
      ['rng', (RNG * 60).toFixed(2) + "m"],
      ['eff1', (EFF * 12).toFixed(2)],
      ['eff2', (EFF * 6).toFixed(2)]
    ]);
    formula_loader(['ash', 'ash4_aug'], [
      ['str', (STR * 4).toFixed(0)]
    ]);
    // Atlas
    formula_loader(['atlas', 'atlas1_aug', 'atlas1'], [
      ['str', (STR * 350 * COMBO).toFixed(0)],
      ['dur', (DUR).toFixed(2) + "s"],
      ['rng1', (RNG * 15).toFixed(2) + "m"],
      ['rng2', (RNG * 2 * Math.min(3, COMBO)).toFixed(2) + "m"],
      ['eff', (EFF * 25 * (1 / COMBO)).toFixed(2)]
    ]);
    formula_loader(['atlas', 'atlas1_aug'], [
      ['dur1', (DUR * 7).toFixed(2) + "s"],
      ['dur2', (DUR * 14).toFixed(2) + "s"]
    ]);
    formula_loader(['atlas', 'atlas2_aug', 'atlas2'], [
      ['health', (3750 + 5 * (450 * xARMOR * STR + aARMOR)).toFixed(0)],
      ['str1', (STR * 600).toFixed(0)],
      ['str2', (STR * 500).toFixed(0)],
      ['rng', (RNG * 5).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['atlas', 'atlas3_aug', 'atlas3'], [
      ['dur', (DUR * 20).toFixed(2) + "s"],
      ['rng', (RNG * 14).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['atlas', 'atlas3_aug'], [
      ['str', Math.min(STR * 25, 100).toFixed(2) + "%"]
    ]);
    formula_loader(['atlas', 'atlas4_aug', 'atlas4'], [
      ['dur', (45 * DUR).toFixed(2) + "s"],
      ['health', (1200 * (4 + HEALTH + SHIELDS + STR)).toFixed(0)],
      ['armor', (500 * (xARMOR + STR) + aARMOR).toFixed(0)],
      ['str1', (STR * 2000).toFixed(0)],
      ['str2', (STR * 500).toFixed(0)],
      ['str3', (STR * 1250).toFixed(0)],
      ['rng1', (RNG * 6).toFixed(2) + "m"],
      ['rng2', RNG.toFixed(2) + "x"],
      ['eff', (EFF * 100).toFixed(2)]
    ]);
    formula_loader(['atlas', 'atlas4_aug'], [
      ['health', (1.5 * 1200 * (4 + HEALTH + SHIELDS + STR)).toFixed(0)],
      ['str1', (STR * 2000 * 1.35).toFixed(0)],
      ['str2', (STR * 500 * 1.35).toFixed(0)],
      ['str3', (STR * 1250 * 1.35).toFixed(0)],
      ['rng', (RNG * 0.65).toFixed(2) + "x"]
    ]);
    // Banshee
    formula_loader(['banshee', 'banshee1_aug', 'banshee1'], [
      ['str', (STR * 50).toFixed(0)],
      ['rng', (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['banshee', 'banshee1_aug'], [
      ['str', Math.min((STR * 70), 100).toFixed(2) + "%"],
      ['dur', (DUR * 8).toFixed(2) + "s"]
    ]);
    formula_loader(['banshee', 'banshee2'], [
      ['dur', (DUR * 30).toFixed(2) + "s"],
      ['str', (STR * 5).toFixed(2) + "x"],
      ['rng', (RNG * 35).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['banshee', 'banshee3_aug', 'banshee3'], [
      ['dur', (DUR * 30).toFixed(2) + "s"],
      ['rng', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['banshee', 'banshee3_aug'], [
      ['str', (STR * 3).toFixed(2) + "x"]
    ]);
    formula_loader(['banshee', 'banshee4_aug', 'banshee4'], [
      ['str', (STR * 200).toFixed(0) + "/s"],
      ['rng', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)],
      ['cha', (CHA * 12).toFixed(2) + "/s"]
    ]);
    formula_loader(['banshee', 'banshee4_aug'], [
      ['str', "~" + (STR * 4000 * 2 / 3).toFixed(0) + " - " + (STR * 4000).toFixed(0)],
      ['rng', (RNG * 35).toFixed(2) + "m"],
      ['eff', (EFF * 100).toFixed(2)]
    ]);
    //Baruuk
    formula_loader(['baruuk', 'baruuk1'], [
      ['rng', Math.min((RNG * 180), 360).toFixed(2) + "°"],
      ['eff', (EFF * 25).toFixed(2)],
      ['cha', (CHA * 2.5).toFixed(2) + "/s"]
    ]);
    formula_loader(['baruuk', 'baruuk2'], [
      ['dur1', (DUR * 5).toFixed(2) + "s"],
      ['dur2', (DUR * 25).toFixed(2) + "s"],
      ['rng' , (RNG * 25).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['baruuk', 'baruuk3'], [
      ['str1', (STR * 250).toFixed(0)],
      ['str2', (STR * 8).toFixed(0)],
      ['str3', Math.min(((STR * 8).toFixed(0) * 10), 90).toFixed(0) + "%"],
      ['rng1', (RNG * 6).toFixed(2) + "m"],
      ['rng2', (RNG * 3).toFixed(2) + "m"],
      ['eff' , (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['baruuk', 'baruuk4'], [
      ['str1', (STR * 250).toFixed(0)],
      ['str2', Math.min((STR * 25), 40).toFixed(2) + "%"]
    ]);
    //Ember
    formula_loader(['ember', 'ember1_aug', 'ember1'], [
      ['str1', (STR * 400).toFixed(0) + " - " + (STR * 800).toFixed(0)],
      ['str2', (STR * 150).toFixed(0) + " - " + (STR * 300).toFixed(0)],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['ember', 'ember1_aug'], [
      ['str', (STR * 100).toFixed(0) + "%"],
      ['dur', (DUR * 40).toFixed(2) + "s"],
      ['rng', (RNG * 15).toFixed(2) + "m"]
    ]);
    formula_loader(['ember', 'ember2_aug', 'ember2'], [
      ['str', (STR * 2.5).toFixed(2) + "x"],
      ['dur', (DUR * 30).toFixed(2) + "s"],
      ['rng', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['ember', 'ember2_aug'], [
      ['str', (STR * 0.5).toFixed(2) + "x"]
    ]);
    formula_loader(['ember', 'ember3'], [
      ['str1', (STR * 200).toFixed(0)],
      ['str2', (STR * 225).toFixed(0) + "/s"],
      ['dur', (DUR * 20).toFixed(2) + "s"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['ember', 'ember4'], [
      ['str1', (STR * 400).toFixed(0) + " - " + (STR * 800).toFixed(0)],
      ['str2', Math.min((STR * 35), 100).toFixed(2) + "%"],
      ['rng', (RNG * 15).toFixed(2) + "m - " + (RNG * 7.5).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)],
      ['cha', (CHA * 3).toFixed(2) + "/s - " + (CHA * 6).toFixed(2) + "/s"],
    ]);
    //Excalibur
    formula_loader(['excalibur', 'excalibur1_aug', 'excalibur1'], [
      ['str', (STR * 250).toFixed(0)],
      ['rng', (RNG * 12).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['excalibur', 'excalibur1_aug'], [
      ['str', ((STR * 4 + 1) * TARGET).toFixed(0)]
    ]);
    formula_loader(['excalibur', 'excalibur2_aug', 'excalibur2'], [
      ['dur', (DUR * 15).toFixed(2) + "s"],
      ['rng', (RNG * 25).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['excalibur', 'excalibur2_aug'], [
      ['str', (STR * 300).toFixed(0) + "%"]
    ]);
    formula_loader(['excalibur', 'excalibur3_aug', 'excalibur3'], [
      ['str', (STR * 1000).toFixed(0)],
      ['rng', (RNG * 25).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['excalibur', 'excalibur3_aug'], [
      ['str', (STR * 10 * Math.min(TARGET, 12)).toFixed(2) + "%"],
      ['dur', (DUR * 16).toFixed(2) + "s"]
    ]);
    formula_loader(['excalibur', 'excalibur4_aug', 'excalibur4'], [
      ['str', (STR * 250).toFixed(0)],
      ['dur', (DUR * 6).toFixed(2) + "s"],
      ['rng', (RNG * 5).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)],
      ['cha', (EFF * 2.5).toFixed(2) + "/s"]
    ]);
    formula_loader(['excalibur', 'excalibur4_aug'], [
      ['str', Math.min((10 + 50 * STR), 100).toFixed(2) + "%"]
    ]);
    //Frost
    formula_loader(['frost', 'frost1_aug', 'frost1'], [
      ['str1', (STR * 350).toFixed(0)],
      ['str2', (STR * 150).toFixed(0)],
      ['dur1', (DUR * 15).toFixed(2) + "s"],
      ['dur2', (DUR * 12).toFixed(2) + "s"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['frost', 'frost1_aug'], [
      ['str', (STR * 100).toFixed(0) + "%"],
      ['dur', (DUR * 40).toFixed(2) + "s"],
      ['rng', (RNG * 15).toFixed(2) + "m"]
    ]);
    formula_loader(['frost', 'frost2_aug', 'frost2'], [
      ['str', (STR * 700).toFixed(0)],
      ['rng1', Math.min((50 * RNG), 60).toFixed(2) + "°"],
      ['rng2', (RNG * 3).toFixed(2) + "m"],
      ['rng3', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['frost', 'frost2_aug'], [
      ['dur', (DUR * 12).toFixed(2) + "s"]
    ]);
    formula_loader(['frost', 'frost3_aug', 'frost3'], [
      ['health', ((5000 + 5 * (300 * xARMOR + aARMOR)) * STR).toFixed(0)],
      ['str', (STR * 150).toFixed(0)],
      ['rng', (RNG * 5).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['frost', 'frost3_aug'], [
      ['dur', (DUR * 8).toFixed(2) + "s"]
    ]);
    formula_loader(['frost', 'frost4_aug', 'frost4'], [
      ['str1', (STR * 1500).toFixed(0)],
      ['str2', (STR * 400).toFixed(0)],
      ['str3', Math.min((STR * 40), 100).toFixed(2) + "%"],
      ['rng1', (RNG * 15).toFixed(2) + "m"],
      ['rng2', (RNG * 4.5).toFixed(2) + "m"],
      ['dur', (DUR * 8).toFixed(2) + "s"],
      ['eff', (EFF * 100).toFixed(2)]
    ]);
    formula_loader(['frost', 'frost4_aug'], [
      ['str', (STR * 60 * TARGET).toFixed(0)]
    ]);
    //Gara
    formula_loader(['gara', 'gara1'], [
      ['str', (STR * 800).toFixed(0)],
      ['rng', (RNG * 10).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['gara', 'gara2_aug', 'gara2'], [
      ['str1', (STR * 250).toFixed(0)],
      ['str2', Math.min((STR * 70), 90).toFixed(2) + "%"],
      ['str3', (STR * 35).toFixed(2) + "%"],
      ['dur', (DUR * 22).toFixed(2) + "s"],
      ['rng1', (RNG * 30).toFixed(2) + "m"],
      ['rng2', (RNG * 2.5).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['gara', 'gara2_aug'], [
      ['str4', (STR * 3).toFixed(2) + "/s"],
    ]);
    formula_loader(['gara', 'gara3'], [
      ['str1', (STR * 800).toFixed(0)],
      ['str2', (STR * 1500).toFixed(0)],
      ['dur', (DUR * 22).toFixed(2) + "s"],
      ['rng1', (RNG * 12).toFixed(0)],
      ['rng2', (RNG * 6).toFixed(0)],
      ['rng3', (RNG * 4).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['gara', 'gara4'], [
      ['str1', (STR * 50).toFixed(2) + "%"],
      ['str2', (STR * 2225).toFixed(0)],
      ['str3', (STR * 350).toFixed(0)],
      ['str4', (STR * 800).toFixed(0)],
      ['dur1', (DUR * 3).toFixed(2) + "s"],
      ['dur2', (DUR * 16).toFixed(2) + "s"],
      ['rng1', (RNG * 2).toFixed(2) + "m"],
      ['rng2', (RNG * 11).toFixed(2) + "m"],
      ['rng3', (RNG * 8).toFixed(2) + "m"],
      ['rng4', (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)],
      ['cha', (CHA * 3).toFixed(2) + "/s - " + (CHA * 5).toFixed(2) + "/s"]
    ]);
    //Garuda
    formula_loader(['garuda', 'garuda1_aug', 'garuda1'], [
      ['str', (STR * 200).toFixed(0) + "%"],
      ['dur', (DUR * 20).toFixed(2) + "s"],
      ['rng1', (RNG * 30).toFixed(2) + "m"],
      ['rng2', (RNG * 10).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)],
      ['cha', (CHA * 50).toFixed(2) + "/s"]
    ]);
    formula_loader(['garuda', 'garuda1_aug'], [
      ['dur', (DUR * 5).toFixed(2) + "s"],
    ]);
    formula_loader(['garuda', 'garuda2'], [
      ['str', (STR * 25).toFixed(0) + "%/s"],
      ['dur', (DUR * 20).toFixed(2) + "s"],
      ['rng1', (RNG * 30).toFixed(2) + "m"],
      ['rng2', (RNG * 8).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)],
    ]);
    formula_loader(['garuda', 'garuda3'], [
      ['eff', (25 / EFF).toFixed(2) + "%"],
    ]);
    formula_loader(['garuda', 'garuda4'], [
      ['str1', (STR * 150).toFixed(0)],
      ['str2', Math.min((STR * 50), 100).toFixed(2) + "%"],
      ['dur', (DUR * 10).toFixed(2)],
      ['eff', (EFF * 100).toFixed(2)],
    ]);
    // Gauss  
    formula_loader(['gauss', 'gauss1'], [
      ['str' , (STR * 800).toFixed(0)],
      ['rng1', (RNG * 4).toFixed(2) + "m"],
      ['rng2', (RNG * 10).toFixed(2) + "m"],
      ['eff' , (EFF * 15).toFixed(2)]
    ]);  
    formula_loader(['gauss', 'gauss2'], [
      ['str', Math.min((STR * 20), 50).toFixed(0) + "% - " + Math.min((STR * 100), 100).toFixed(0) + "%"],
      ['dur', (DUR * 30).toFixed(2) + "s"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);  
    formula_loader(['gauss', 'gauss3'], [
      ['str1', (STR * 150).toFixed(0) + " - " + (STR * 750).toFixed(0)],
      ['str2', (STR * 300).toFixed(0) + " - " + (STR * 1500).toFixed(0)],
      ['dur1', (DUR * 10).toFixed(2) + "s"],
      ['dur2', (DUR * 8).toFixed(2) + "s"],
      ['rng' , (RNG * 4).toFixed(2) + "m - " + (RNG * 12).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);  
    formula_loader(['gauss', 'gauss4'], [
      ['str' , (STR * 400).toFixed(0)],
      ['dur1', (DUR * 30).toFixed(2) + "s"],
      ['dur2', (DUR * 15).toFixed(2) + "% - " + (DUR * 75).toFixed(2) + "%"],
      ['dur3', (DUR * 8).toFixed(2) + "% - " + (DUR * 40).toFixed(2) + "%"],
      ['dur4', (DUR * 10).toFixed(2) + "% - " + (DUR * 50).toFixed(2) + "%"],
      ['dur5', (DUR * 20).toFixed(2) + "% - " + (DUR * 100).toFixed(2) + "%"],
      ['eff' , (EFF * 100).toFixed(2)]
    ]);
    // Harrow  
    formula_loader(['harrow', 'harrow1'], [
      ['str', (STR * 150 * TARGET).toFixed(0)],
      ['dur', (DUR * 6).toFixed(2) + "s"],
      ['rng', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['harrow', 'harrow2'], [
      ['str1', (STR * 5).toFixed(2) + "%"],
      ['str2', (STR * 35).toFixed(2) + "%"],
      ['str3', (STR * 70).toFixed(2) + "%"],
      ['dur1', (DUR * 6).toFixed(2) + "s"],
      ['dur2', (DUR * 1.54).toFixed(2) + "s"],
      ['eff', (EFF * 50).toFixed(2)],
    ]);
    formula_loader(['harrow', 'harrow3_aug', 'harrow3'], [
      ['str', (5 / EFF * STR).toFixed(2) + "%"],
      ['dur', (DUR * 35).toFixed(2) + "s"],
      ['rng', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['harrow', 'harrow3_aug'], [
      ['str1', Math.min((STR * 40), 90).toFixed(2) + "%"],
      ['str2', (STR * 0.5).toFixed(2)]
    ]);
    formula_loader(['harrow', 'harrow4_aug', 'harrow4'], [
      ['str', (STR * 1.5).toFixed(2) + "%"],
      ['dur1', (DUR * 6).toFixed(2) + "s"],
      ['dur2', (DUR * 12).toFixed(2) + "s"],
      ['eff', (EFF * 100).toFixed(2)]
    ]);
    formula_loader(['harrow', 'harrow4_aug'], [
      ['dur', (DUR * 3).toFixed(2) + "s"]
    ]);
    //Hildryn
    formula_loader(['hildryn', 'hildryn1_aug', 'hildryn1'], [
      ['str', (STR * 500).toFixed(0)],
      ['rng', (RNG * 3).toFixed(2) + "m"],
      ['eff1', (EFF * 50).toFixed(2)],
      ['eff2', (EFF * 100).toFixed(2)]
    ]);
    formula_loader(['hildryn', 'hildryn2_aug', 'hildryn2'], [
      ['str', Math.min((STR * 25), 100).toFixed(2) + "%"],
      ['dur', (DUR * 2).toFixed(2) + "s"],
      ['rng', (RNG * 8).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['hildryn', 'hildryn3_aug', 'hildryn3'], [
      ['str1', (STR * 500).toFixed(0)],
      ['str2', (STR * 200).toFixed(0) + "/s"],
      ['dur', (DUR * 80).toFixed(2) + "%"],
      ['eff', (EFF * 250).toFixed(2)],
      ['cha1', (CHA * 5).toFixed(2) + "/s"],
      ['cha2', (CHA * 25).toFixed(2) + "/s"]
    ]);
    formula_loader(['hildryn', 'hildryn4_aug', 'hildryn4'], [
      ['str1', (STR * 200).toFixed(0) + "/s"],
      ['str2', (STR * 500).toFixed(0)],
      ['rng', (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 100).toFixed(2)],
      ['cha1', (CHA * 25).toFixed(2) + "/s"],
      ['cha2', (CHA * 25).toFixed(2) + "/s"]
    ]);
    //Hydroid
    formula_loader(['hydroid', 'hydroid1'], [
      ['str', (STR * 150).toFixed(0) + " - " + (STR * 300).toFixed(0)],
      ['dur', (DUR * 5).toFixed(2) + "s - " + (DUR * 10).toFixed(2) + "s"],
      ['rng', (RNG * 5).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2) + " - " + (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['hydroid', 'hydroid2_aug', 'hydroid2'], [
      ['str', (STR * 300).toFixed(0)],
      ['dur', (DUR * 30).toFixed(2) + "m/s"],
      ['rng', (RNG * 6).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['hydroid', 'hydroid2_aug'], [
      ['dur', (DUR * 12).toFixed(2) + "s"],
    ]);
    formula_loader(['hydroid', 'hydroid3_aug', 'hydroid3'], [
      ['str1', (STR * 25).toFixed(0) + "/s"],
      ['str2', (STR * 2).toFixed(2) + "%/s"],
      ['rng1', (Math.sqrt(RNG * 4)).toFixed(2) + "m"],
      ['rng2', (RNG * 15).toFixed(2) + "m"],
      ['eff1', (EFF * 15).toFixed(2)],
      ['eff2', (EFF * 5).toFixed(2)],
      ['eff3', (0.2 / EFF).toFixed(2) + "m"],
      ['cha', (CHA * 2).toFixed(2)]
    ]);
    formula_loader(['hydroid', 'hydroid3_aug'], [
      ['str1', Math.min((STR * 30), 100).toFixed(2) + "%"],
      ['str2', Math.min((STR * 10), 100).toFixed(2) + "%"],
    ]);
    formula_loader(['hydroid', 'hydroid4'], [
      ['str1', (STR * 300).toFixed(0)],
      ['str2', (STR * 200).toFixed(0) + "/s"],
      ['dur', (DUR * 20).toFixed(2) + "s"],
      ['rng', (RNG * 5).toFixed(2) + "m - " + (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2) + " - " + (EFF * 100).toFixed(2)]
    ]);
    //Inaros
    formula_loader(['inaros', 'inaros1'], [
      ['str', (STR * 150).toFixed(0) + " + " + (STR * 8).toFixed(0) + "/s"],
      ['dur', (DUR * 8).toFixed(2) + "s"],
      ['rng', (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['inaros', 'inaros2'], [
      ['str', (STR * 125).toFixed(0) + "/s - " + (STR * 250).toFixed(0) + "/s"],
      ['dur', (DUR * 30).toFixed(2) + "s"],
      ['rng', (RNG * 50).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['inaros', 'inaros3_aug', 'inaros3'], [
      ['str', (STR * 500).toFixed(0) + "/s"],
      ['rng', (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)],
      ['cha', (CHA * 10).toFixed(2)]
    ]);
    formula_loader(['inaros', 'inaros3_aug'], [
      ['str', Math.min((STR * 50), 100).toFixed(0) + "%"]
    ]);
    formula_loader(['inaros', 'inaros4'], [
      ['str', (STR * 500).toFixed(0) + "/s"],
      ['dur', (DUR * 15).toFixed(2) + "s"],
      ['rng1', (RNG * 30).toFixed(2) + "m"],
      ['rng2', (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    //Ivara
    formula_loader(['ivara', 'ivara1_aug', 'ivara1'], [
      ['dur1', (DUR * 12).toFixed(2) + "s"],
      ['dur2', (DUR * 10).toFixed(2) + "s"],
      ['rng1', (RNG * 2.5).toFixed(2) + "m"],
      ['rng2', (RNG * 20).toFixed(2) + "m"],
      ['rng3', (RNG * 6).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['ivara', 'ivara1_aug'], [
      ['str1', (STR * 100).toFixed(2) + "%"],
      ['str2', Math.min((STR * 100), 100).toFixed(2) + "%"],
    ]);
    formula_loader(['ivara', 'ivara2_aug', 'ivara2'], [
      ['str', (STR * 5).toFixed(2) + "x"],
      ['dur', (DUR * 1).toFixed(2) + "x/s"],
      ['eff', (EFF * 25).toFixed(2)],
      ['cha', (CHA * 3).toFixed(2) + "/s + " + (CHA * 2).toFixed(2) + "/s\xB2"]
    ]);
    formula_loader(['ivara', 'ivara2_aug'], [
      ['str1', (STR * 10).toFixed(2) + "%"],
      ['str2', (STR * 50).toFixed(2) + "%"],
    ]);
    formula_loader(['ivara', 'ivara3_aug', 'ivara3'], [
      ['str1', (STR * 40).toFixed(2) + "%"],
      ['str2', Math.min((STR * 100), 100).toFixed(2) + "%"],
      ['dur', (DUR * 2.5).toFixed(2) + "s"],
      ['rng', (RNG * 4).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)],
      ['cha', (CHA * 1).toFixed(2) + "/s - " + (CHA * 3).toFixed(2) + "/s"]
    ]);
    formula_loader(['ivara', 'ivara3_aug'], [
      ['str', (STR * 25).toFixed(2) + "%"],
    ]);
    formula_loader(['ivara', 'ivara4_aug', 'ivara4'], [
      ['str', (STR * 160).toFixed(0)],
      ['eff1', (EFF * 50).toFixed(2)],
      ['eff2', (EFF * 15).toFixed(2)]
    ]);
    formula_loader(['ivara', 'ivara4_aug'], [
      ['rng', (RNG * 7).toFixed(2) + "m"]
    ]);
    //Khora
    formula_loader(['khora', 'khora1_aug', 'khora1'], [
      ['str', (STR * 300).toFixed(0)],
      ['rng1', (RNG * 10).toFixed(2) + "m"],
      ['rng2', (RNG * 5).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['khora', 'khora1_aug'], [
      ['str', ((STR + 3.5) * 300).toFixed(0)]
    ]);
    formula_loader(['khora', 'khora2'], [
      ['dur1', (DUR * 15).toFixed(2) + "s"],
      ['dur2', (0.5 / DUR).toFixed(2) + "s"],
      ['rng1', (RNG * 30).toFixed(2) + "m"],
      ['rng2', (RNG * 10).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['khora', 'khora3'], [
      ['str1', (1 + STR * 0.15).toFixed(2) + "%"],
      ['str2', (STR * 350).toFixed(2)],
      ['str3', (STR * 50).toFixed(2) + "/s"],
      ['eff1', (EFF * 25).toFixed(2)],
      ['eff2', "≤" + (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['khora', 'khora4'], [
      ['str' , (STR * 250).toFixed(0) + "/s"],
      ['dur' , (DUR * 20).toFixed(2) + "s"],
      ['rng1', (RNG * 5).toFixed(2) + "m"],
      ['rng2', (RNG * 10).toFixed(2) + "m"],
      ['eff' , (EFF * 100).toFixed(2)]
    ]);
    //Limbo
    formula_loader(['limbo', 'limbo1_aug', 'limbo1'], [
      ['str', (STR * 250).toFixed(0)],
      ['dur', (DUR * 25).toFixed(2) + "s"],
      ['rng', (RNG * 35).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['limbo', 'limbo1_aug'], [
      ['str', Math.min((STR * 25), 100).toFixed(2) + "%"]
    ]);
    formula_loader(['limbo', 'limbo2'], [
      ['dur', (DUR * 15).toFixed(2) + "s"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['limbo', 'limbo3_aug' ,'limbo3'], [
      ['dur1', (DUR * 25).toFixed(2) + "s"],
      ['dur2', (DUR * 18).toFixed(2) + "s"],
      ['rng1', (RNG * 25).toFixed(2) + "m"],
      ['rng2', (RNG * 5).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['limbo', 'limbo3_aug'], [
      ['str', (STR * 30 * TARGET).toFixed(2) + "%"]
    ]);
    formula_loader(['limbo', 'limbo4'], [
      ['str' , (STR * 500).toFixed(0)],
      ['dur' , (DUR * 30).toFixed(2) + "s"],
      ['rng1', (RNG * 16).toFixed(2) + "m"],
      ['rng2', (RNG * 5).toFixed(2) + "m"],
      ['eff' , (EFF * 100).toFixed(2)]
    ]);
    //Loki
    formula_loader(['loki', 'loki1'], [
      ['dur', (DUR * 25).toFixed(2) + "s"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['loki', 'loki2'], [
      ['dur', (DUR * 12).toFixed(2) + "s"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['loki', 'loki3_aug', 'loki3'], [
      ['rng', (RNG * 75).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['loki', 'loki3_aug'], [
      ['dur', (DUR * 6).toFixed(2) + "s"]
    ]);
    formula_loader(['loki', 'loki4'], [
      ['str', (STR * 500).toFixed(0)],
      ['rng', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 100).toFixed(2)]
    ]);
    //Mag
    formula_loader(['mag', 'mag1'], [
      ['str1', (STR * 300).toFixed(0)],
      ['str2', Math.min(STR * 25, 100).toFixed(0) + "%"],
      ['rng', (RNG * 25).toFixed(2) + "s"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['mag', 'mag2_aug', 'mag2'], [
      ['str1', (STR * 2).toFixed(2) + "%"],
      ['str2', (STR * 300).toFixed(0)],
      ['dur' , (DUR * 15).toFixed(2) + "s"],
      ['rng1', (RNG * 4).toFixed(2) + "m"],
      ['rng2', (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['mag', 'mag2_aug'], [
      ['str',  Math.min(STR * 50, 100).toFixed(2) + "%"]
    ]);
    formula_loader(['mag', 'mag3_aug', 'mag3'], [
      ['str1', (STR * 400).toFixed(0)],
      ['str2', (STR * 2.5).toFixed(2) + "x"],
      ['dur' , (DUR * 5).toFixed(2) + "s"],
      ['rng1', (RNG * 8).toFixed(2) + "m"],
      ['rng2', (RNG * 8 + DUR * 5 * 5.9).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['mag', 'mag3_aug'], [
      ['dur' , (DUR * 4).toFixed(2) + "s"]
    ]);
    formula_loader(['mag', 'mag4_aug', 'mag4'], [
      ['str1', (STR * 1500).toFixed(0)],
      ['str2', (STR * 25 * TARGET).toFixed(2)],
      ['rng' , (RNG * 18).toFixed(2) + "m"],
      ['eff', (EFF * 100).toFixed(2)]
    ]);
    formula_loader(['mag', 'mag4_aug'], [
      ['str', Math.min(STR * 50, 100).toFixed(2) + "%"],
      ['dur' , (RNG * 7).toFixed(2) + "s"]
    ]);
    //Mesa
    formula_loader(['mesa', 'mesa1'], [
      ['str1', (STR * 30).toFixed(2) + "%"],
      ['str2', (STR * 140).toFixed(0)],
      ['str3', (STR * 1600).toFixed(0)],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['mesa', 'mesa2_aug', 'mesa2'], [
      ['str', (STR * 25).toFixed(2) + "%"],
      ['dur', (DUR * 30).toFixed(2) + "s"],
      ['rng', (RNG * 16).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['mesa', 'mesa2_aug'], [
      ['rng', (RNG * 8).toFixed(2) + "m"],
      ['dur', (DUR * 7).toFixed(2) + "s"]
    ]);
    formula_loader(['mesa', 'mesa3'], [
      ['str', Math.min(STR * 80, 95).toFixed(2) + "%"],
      ['dur', (DUR * 25).toFixed(2) + "s"],
      ['rng', (RNG * 11).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['mesa', 'mesa4'], [
      ['str', (STR * 150).toFixed(2) + "%"],
      ['eff', (EFF * 25).toFixed(2)],
      ['cha', (CHA * 15).toFixed(2) + "/s"]
    ]);
    //Mirage
    formula_loader(['mirage', 'mirage1'], [
      ['str', (STR * 20).toFixed(2) + "%"],
      ['dur', (DUR * 25).toFixed(2) + "s"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['mirage', 'mirage2_aug', 'mirage2'], [
      ['str' , (STR * 200).toFixed(0)],
      ['dur1', (DUR * 18).toFixed(2) + "s"],
      ['dur2', (DUR * 5).toFixed(2) + "s"],
      ['rng1', (RNG * 40).toFixed(2) + "m"],
      ['rng2', (RNG * 12).toFixed(2) + "m"],
      ['rng3', (RNG * 8).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['mirage', 'mirage2_aug'], [
      ['str' , (STR * 500).toFixed(0)],
    ]);
    formula_loader(['mirage', 'mirage3_aug', 'mirage3'], [
      ['str1', (STR * 200).toFixed(2) + "%"],
      ['str2', Math.min(STR * 75, 95).toFixed(2) + "%"],
      ['dur', (DUR * 25).toFixed(2) + "s"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['mirage', 'mirage3_aug'], [
      ['rng', (RNG * 15).toFixed(2) + "m"]
    ]);
    formula_loader(['mirage', 'mirage4'], [
      ['str1', (STR * 250).toFixed(0)],
      ['str2', (STR * 500).toFixed(0)],
      ['dur1', (DUR * 12).toFixed(2) + "s"],
      ['dur2', (DUR * 15).toFixed(2) + "s"],
      ['rng1', (RNG * 30).toFixed(2) + "m"],
      ['rng2', (RNG * 25).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)],
      ['cha' , (CHA * 10).toFixed(2) + "/s"]
    ]);
    //Nekros
    formula_loader(['nekros', 'nekros1_aug', 'nekros1'], [
      ['str', (STR * 500).toFixed(0)],
      ['rng', (RNG * 50).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['nekros', 'nekros1_aug'], [
      ['str', Math.min(STR * 30, 100).toFixed(2) + "%"]
    ]);
    formula_loader(['nekros', 'nekros2_aug', 'nekros2'], [
      ['str1', (STR * 20).toFixed(0)],
      ['str2', Math.min(STR * 20, 100).toFixed(2) + "%"],
      ['dur' , (DUR * 25).toFixed(2) + "s"],
      ['rng' , (RNG * 15).toFixed(2) + "m"],
      ['eff' , (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['nekros', 'nekros2_aug'], [
      ['str', Math.min(STR * 60, 80).toFixed(2) + "%"]
    ]);
    formula_loader(['nekros', 'nekros3_aug', 'nekros3'], [
      ['rng' , (RNG * 25).toFixed(2) + "m"],
      ['eff' , (EFF * 10).toFixed(2)]
    ]);
    formula_loader(['nekros', 'nekros3_aug'], [
      ['eff' , (EFF * 10).toFixed(2)]
    ]);
    formula_loader(['nekros', 'nekros4_aug', 'nekros4'], [
      ['str1', (STR * 150).toFixed(2) + "%"],
      ['str2', (STR * 100).toFixed(2) + "%"],
      ['dur' , (3 / DUR).toFixed(2) + "%/s"],
      ['eff' , (EFF * 100).toFixed(2)]
    ]);
    formula_loader(['nekros', 'nekros4_aug'], [
      ['str1', (STR * 6).toFixed(2) + "%"],
      ['str2', Math.min(STR * 6 * 7, 90).toFixed(2) + "%"],
      ['rng' , (RNG * 50).toFixed(2) + "m"],
    ]);
    //Nezha
    formula_loader(['nezha', 'nezha1_aug', 'nezha1'], [
      ['str1', (STR * 200).toFixed(0) + "/s"],
      ['str2', (STR * 1250).toFixed(0)],
      ['dur1', (DUR * 30).toFixed(2) + "s"],
      ['dur2', (DUR * 10).toFixed(2) + "s"],
      ['rng' , (RNG * 6).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['nezha', 'nezha1_aug'], [
      ['dur', (DUR * 10).toFixed(2) + "s"],
    ]);
    formula_loader(['nezha', 'nezha2'], [
      ['str1', (STR * 250).toFixed(0)],
      ['str2', (STR * 1000).toFixed(0)],
      ['str3', (STR * 100).toFixed(2) + "%"],
      ['dur' , (DUR * 15).toFixed(2) + "s"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['nezha', 'nezha3'], [
      ['str1', ((1000 + 2.5 * (175 * (1 + xARMOR) + aARMOR)) * STR ).toFixed(0)],
      ['str2', (STR * 125).toFixed(0) + "/s"],
      ['str3', (STR * 2.5).toFixed(2) + "%"],
      ['rng' , (RNG * 2).toFixed(2) + "s"],
      ['eff' , (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['nezha', 'nezha4'], [
      ['str', (STR * 600).toFixed(0)],
      ['dur' , (DUR * 12).toFixed(2) + "s"],
      ['rng' , (RNG * 19).toFixed(2) + "m"],
      ['eff' , (EFF * 100).toFixed(2)]
    ]);
    //Nidus
    formula_loader(['nidus', 'nidus1_aug', 'nidus1'], [
      ['str', (STR * 200 * (1 + STACK)).toFixed(0)],
      ['rng' , (RNG * 16).toFixed(2) + "m"],
      ['eff' , (EFF * 40).toFixed(2)]
    ]);
    formula_loader(['nidus', 'nidus1_aug'], [
      ['str', (STR * 120).toFixed(0) + "%"],
      ['dur' , (DUR * 15).toFixed(2) + "s"]
    ]);
    formula_loader(['nidus', 'nidus2_aug', 'nidus2'], [
      ['dur' , (DUR * 7).toFixed(2) + "s"],
      ['rng' , (RNG * 12).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['nidus', 'nidus2_aug'], [
      ['str', (STR * 300).toFixed(0)],
      ['rng' , (RNG * 5).toFixed(2) + "m"]
    ]);
    formula_loader(['nidus', 'nidus3'], [
      ['str1', "+" + (STR * 25).toFixed(2) + "%"],
      ['str2', Math.min(STR * 50, 90).toFixed(2) + "%"],
      ['dur' , (DUR * 60).toFixed(2) + "s"],
      ['rng1', (RNG * 40).toFixed(2) + "m"],
      ['rng2', (RNG * 20).toFixed(2) + "m"]
    ]);
    formula_loader(['nidus', 'nidus4'], [
      ['str1', (STR * 150 * Math.max((1 + STACK - 3),0)).toFixed(2)], //-3 because the ability refers to the value after the cast, which is always 3 less than actual value
      ['str2', (STR * 20).toFixed(2) + "/s"],
      ['dur' , (DUR * 40).toFixed(2) + "s"],
      ['rng' , (RNG * 4).toFixed(2) + "m"]
    ]);
    //Nova
    formula_loader(['nova', 'nova1_aug', 'nova1'], [
      ['str' , (STR * 200).toFixed(0)],
      ['dur1', (DUR * 6).toFixed(0)],
      ['dur2',  Math.min((Math.round(DUR * 6) * 5), 100).toFixed(0) + "%"],
      ['rng' , (RNG * 12).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['nova', 'nova1_aug'], [
      ['str1', (STR * 120).toFixed(0)],
      ['str2', (Math.round(DUR * 6) * STR * 120).toFixed(0)],
      ['rng' , (RNG * 8).toFixed(2) + "m"],
    ]);
    formula_loader(['nova', 'nova2_aug', 'nova2'], [
      ['str1', (STR * 200).toFixed(0)],
      ['str2', (STR * 10).toFixed(0)],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['nova', 'nova2_aug'], [
      ['rng' , (RNG * 3).toFixed(2) + "m"],
    ]);
    formula_loader(['nova', 'nova3_aug', 'nova3'], [
      ['dur', (DUR * 16).toFixed(2) + "s"],
      ['rng', (RNG * 50).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['nova', 'nova3_aug'], [
      ['dur', (DUR * 7).toFixed(2) + "s"]
    ]);
    formula_loader(['nova', 'nova4'], [
      ['str1', (STR * 800).toFixed(0)],
      ['str2',  Math.min((30 + (STR*100-100)), 75).toFixed(2) + "%"],
      ['dur1', (DUR * 6).toFixed(2) + "s"],
      ['dur2', (5 + DUR * 6 * 5).toFixed(2) + "m"],
      ['dur3', (DUR * 30).toFixed(2) + "s"],
      ['rng' , (RNG * 10).toFixed(2) + "m"],
      ['eff' , (EFF * 100).toFixed(2)]
    ]);
    //Nyx
    formula_loader(['nyx', 'nyx1_aug', 'nyx1'], [
      ['dur', (DUR * 30).toFixed(2) + "s"],
      ['rng', (RNG * 60).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['nyx', 'nyx1_aug'], [
      ['str', (STR * 500).toFixed(2) + "%"]
    ]);
    formula_loader(['nyx', 'nyx2_aug', 'nyx2'], [
      ['str',  Math.min((STR * 80), 100).toFixed(2) + "%"],
      ['dur', (DUR * 11).toFixed(2) + "s"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['nyx', 'nyx2_aug'], [
      ['dur', (DUR * 10).toFixed(2) + "s"]
    ]);
    formula_loader(['nyx', 'nyx3'], [
      ['dur', (DUR * 25).toFixed(2) + "s"],
      ['rng', (RNG * 25).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['nyx', 'nyx4'], [
      ['str1', (STR * 200).toFixed(0) + "/s"],
      ['str2', (STR * 1500).toFixed(0)],
      ['str3', (STR * 0.03).toFixed(2) + "%"],
      ['dur' , (DUR * 8).toFixed(2) + "s"],
      ['rng' , (RNG * 10).toFixed(2) + "m"],
      ['eff1', (EFF * 25).toFixed(2)],
      ['eff2', (EFF * 8).toFixed(2)],
      ['cha' , (CHA * 4).toFixed(2) + "/s"],
    ]);
    //Oberon
    formula_loader(['oberon', 'oberon1_aug', 'oberon1'], [
      ['str1', (STR * 500).toFixed(0)],
      ['str2', (STR * 150).toFixed(0)],
      ['str3', (STR * 6).toFixed(0)],
      ['dur' , (DUR * 12).toFixed(2) + "s"],
      ['rng1', (RNG * 50).toFixed(2) + "m"],
      ['rng2', (RNG * 12.5).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['oberon', 'oberon1_aug'], [
      ['str', (STR * 100).toFixed(2) + "%"],
      ['dur', (DUR * 40).toFixed(2) + "s"],
      ['rng', (RNG * 15).toFixed(2) + "m"]
    ]);
    formula_loader(['oberon', 'oberon2_aug', 'oberon2'], [
      ['str1', (STR * 100).toFixed(0) + "/s"],
      ['str2',  Math.min((STR * 15), 100).toFixed(2) + "%"],
      ['dur' , (DUR * 20).toFixed(2) + "s"],
      ['rng1', (Math.min(180 + 135 * (RNG - 1), 360 )).toFixed(2) + "°"],
      ['rng2', (15 + 11.25 * (RNG - 1)).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['oberon', 'oberon2_aug'], [
      ['dur' , (DUR * 40).toFixed(2) + "s"],
      ['str', (STR * 100 * DUR * 40).toFixed(0)],
    ]);
    formula_loader(['oberon', 'oberon3_aug', 'oberon3'], [
      ['str1', (4 / STR).toFixed(2) + "s"],
      ['str2',  "+" + (STR * 200).toFixed(0)],
      ['str3', (STR * 125).toFixed(0)],
      ['str4', (STR * 40).toFixed(0) + "/s"],
      ['dur1', (DUR * 45).toFixed(2) + "%"],
      ['dur2', (DUR * 20).toFixed(2) + "s"],
      ['rng' , (RNG * 25).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)],
      ['cha' , (CHA * (2 + 3 * TARGET)).toFixed(2) + "/s"]
    ]);
    formula_loader(['oberon', 'oberon3_aug'], [
      ['str',  Math.min((STR * 50), 100).toFixed(2) + "%"]
    ]);
    formula_loader(['oberon', 'oberon4_aug', 'oberon4'], [
      ['str1', Math.min((STR * 30), 100).toFixed(2) + "%"],
      ['str2', (STR * 1250).toFixed(0)],
      ['str3', (STR * 625).toFixed(0)],
      ['dur' , (DUR * 4).toFixed(2) + "s"],
      ['rng1', (RNG * 4).toFixed(2) + "m"],
      ['rng2', (RNG * 15).toFixed(2) + "m"],
      ['eff' , (EFF * 100).toFixed(2)]
    ]);
    formula_loader(['oberon', 'oberon4_aug'], [
      ['str1', (STR * 150).toFixed(0) + "/s"],
      ['str2',  "+" + (STR * 250).toFixed(0)],
      ['dur' , (DUR * 10).toFixed(2) + "s"]
    ]);
    //Octavia
    formula_loader(['octavia', 'octavia1'], [
      ['str', (STR * 2.5).toFixed(2) + "%"],
      ['dur', (DUR * 20).toFixed(2) + "s"],
      ['rng', (RNG * 10).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['octavia', 'octavia2'], [
      ['str', (STR * 125).toFixed(2)],
      ['dur', (DUR * 20).toFixed(2) + "s"],
      ['rng', (RNG * 6).toFixed(2) + "m - " + (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['octavia', 'octavia3'], [
      ['str1', (STR * 35).toFixed(2) + "%"],
      ['str2', (STR * 30).toFixed(2) + "%"],
      ['dur1', (DUR * 20).toFixed(2) + "s"],
      ['dur2', (DUR * 15).toFixed(2) + "s"],
      ['rng' , (RNG * 12).toFixed(2) + "m"],
      ['eff' , (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['octavia', 'octavia4'], [
      ['str', (STR * 0.25).toFixed(2) + "x - " + (STR * 2).toFixed(2) + "x"],
      ['dur', (DUR * 30).toFixed(2) + "s"],
      ['rng', (RNG * 14).toFixed(2) + "m"],
      ['eff', (EFF * 100).toFixed(2)]
    ]);
    //Revenant
    formula_loader(['revenant', 'revenant1'], [
      ['str' , (STR * 1000).toFixed(0) + "/s"],
      ['dur1', (DUR * 30).toFixed(2) + "s"],
      ['dur2', (DUR * 10).toFixed(2) + "s"],
      ['rng1', (RNG * 25).toFixed(2) + "m"],
      ['rng2', (RNG * 2).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['revenant', 'revenant2'], [
      ['str', (STR * 6).toFixed(0)],
      ['dur', (DUR * 5).toFixed(2) + "s"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['revenant', 'revenant3_aug', 'revenant3'], [
      ['str1',  Math.min((STR * 8), 100).toFixed(0) + "%"],
      ['str2',  Math.min((STR * 40), 100).toFixed(0) + "%"],
      ['dur' , (DUR).toFixed(2) + "s"],
      ['rng' , (RNG * 6).toFixed(2) + "s"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['revenant', 'revenant3_aug'], [
      ['dur' , (DUR * 10).toFixed(2) + "s"]
    ]);
    formula_loader(['revenant', 'revenant4'], [
      ['str' , (STR * 1250).toFixed(0) + "/s - " + (STR * 2500).toFixed(0) + "/s"],
      ['rng' , (RNG * 0.1).toFixed(2) + "m - " + (RNG * 0.2).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)],
      ['cha' , (CHA * 20).toFixed(2) + "/s - " + (CHA * 40).toFixed(2) + "/s"],
    ]);
    //Rhino
    formula_loader(['rhino', 'rhino1_aug', 'rhino1'], [
      ['str', (STR * 650 * COMBO).toFixed(0)],
      ['dur', (DUR).toFixed(2) + "s"],
      ['rng1', (RNG * 12 * (1 + 0.25 * Math.min(COMBO - 1, 2))).toFixed(2) + "m"],
      ['rng2', (RNG * 2).toFixed(2) + "m"],
      ['eff', (EFF * 25 / COMBO).toFixed(2)]
    ]);
    formula_loader(['rhino', 'rhino1_aug'], [
      ['str', (STR * 50 * TARGET).toFixed(2) + "%"],
      ['dur', (DUR * 10).toFixed(2) + "s"]
    ]);
    formula_loader(['rhino', 'rhino2_aug', 'rhino2'], [
      ['str', ((1200 + (2.5 * ((190 + aARMOR) * (1 + xARMOR)) * (1 + existance(IRONCLAD_CHARGE)))) * STR).toFixed(0)],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['rhino', 'rhino2_aug'], [
      ['rng', (RNG * 8).toFixed(2) + "m"]
    ]);
    formula_loader(['rhino', 'rhino3_aug', 'rhino3'], [
      ['str', (STR * 50).toFixed(2) + "%"],
      ['rng', (RNG * 25).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['rhino', 'rhino3_aug'], [
      ['str', (STR * 150).toFixed(0)],
      ['dur', (DUR * 6).toFixed(2) + "s"],
      ['rng', (RNG * 25).toFixed(2) + "m"]
    ]);
    formula_loader(['rhino', 'rhino4_aug', 'rhino4'], [
      ['str', (STR * 800).toFixed(0)],
      ['dur', (DUR * 8).toFixed(2) + "s"],
      ['rng', (RNG * 25).toFixed(2) + "m"],
      ['eff', (EFF * 100).toFixed(2)]
    ]);
    formula_loader(['rhino', 'rhino4_aug'], [
      ['str', (STR * 80 * TARGET).toFixed(0)]
    ]);
    //Saryn
    formula_loader(['saryn', 'saryn1_aug', 'saryn1'], [
      ['str1', (STR * 10).toFixed(0)],
      ['str2', (STR * 2).toFixed(2)],
      ['str3', Math.min((STR * 50), 100).toFixed(2) + "%"],
      ['str4', (20 / STR).toFixed(2) + "%"],
      ['dur' , (10 /DUR).toFixed(2) + "%"],
      ['rng1', (RNG * 60).toFixed(2) + "m"],
      ['rng2', (RNG * 16).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['saryn', 'saryn1_aug'], [
      ['str', (STR * 100).toFixed(2) + "%"],
      ['dur', (DUR * 40).toFixed(2) + "s"],
      ['rng', (RNG * 15).toFixed(2) + "m"]
    ]);
    formula_loader(['saryn', 'saryn2_aug', 'saryn2'], [
      ['str1', (STR * 500).toFixed(0)],
      ['str2', (STR * 400).toFixed(2)],
      ['str3', (STR * 1.5).toFixed(2) + "x"],
      ['dur1', (DUR * 10).toFixed(2) + "s"],
      ['dur2', (DUR * 5).toFixed(2) + "s"],
      ['rng' , (RNG * 10).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['saryn', 'saryn2_aug'], [
      ['str', (STR * 50).toFixed(0) + "/s"],
    ]);
    formula_loader(['saryn', 'saryn3_aug', 'saryn3'], [
      ['str1', (STR * 30).toFixed(2) + "%"],
      ['str2', (STR * 60).toFixed(2) + "%"],
      ['str3', Math.min((STR * 40), 90).toFixed(2) + "%"],
      ['dur' , (DUR * 45).toFixed(2) + "s"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['saryn', 'saryn3_aug'], [
      ['str', (STR * 300).toFixed(0) + " - " + (STR * 600).toFixed(0)],
      ['dur', (DUR * 12).toFixed(2) + "s"],
      ['rng', (RNG * 5).toFixed(2) + "m"],
    ]);
    formula_loader(['saryn', 'saryn4'], [
      ['str', (STR * 150).toFixed(0) + "/s - " + (STR * 600).toFixed(0) + "/s"],
      ['dur', (DUR * 6).toFixed(2) + "s"],
      ['rng', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2) + "m"]
    ]);
    //Titania
    formula_loader(['titania', 'titania1'], [
      ['dur' , (DUR * 16).toFixed(2) + "s"],
      ['rng1', (RNG * 5).toFixed(2) + "m"],
      ['rng2', (RNG * 50).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['titania', 'titania2'], [
      ['str', (STR * 500).toFixed(0)],
      ['dur', (DUR * 12).toFixed(2) + "s"],
      ['rng', (RNG * 25).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['titania', 'titania3_aug', 'titania3'], [
      ['str1', (STR * 350).toFixed(0) + "/s"],
      ['str2', (STR * 2500).toFixed(0)],
      ['dur' , (DUR * 25).toFixed(2) + "s"],
      ['rng1', (RNG * 25).toFixed(2) + "m"],
      ['rng2', (RNG * 20).toFixed(2) + "m"],
      ['rng3', (RNG * 8).toFixed(2) + "m"],
      ['rng4', (RNG * 2.5).toFixed(2) + "m"],
      ['eff' , (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['titania', 'titania3_aug',], [
      ['str', (STR * 100).toFixed(2) + "%"]
    ]);
    formula_loader(['titania', 'titania4_aug', 'titania4'], [
      ['str1', (STR * 160).toFixed(0)],
      ['str2', (STR * 200).toFixed(0)],
      ['str3', (STR * 80).toFixed(0)],
      ['eff' , (EFF * 25).toFixed(2)],
      ['cha' , (EFF * 5).toFixed(2) + "/s"]
    ]);
    formula_loader(['titania', 'titania4_aug'], [
      ['str', (STR * 25).toFixed(0) + "% - " + (STR * 100).toFixed(0) + "%"],
      ['dur' , (DUR * 8).toFixed(2) + "s"]
    ]);
    //Trinity
    formula_loader(['trinity', 'trinity1_aug', 'trinity1'], [
      ['str1', (STR * 45).toFixed(2) + "%"],
      ['str2', (STR * 400).toFixed(0)],
      ['dur' , (DUR * 12).toFixed(2) + "s"],
      ['rng' , (RNG * 100).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['trinity', 'trinity1_aug'], [
      ['str', (STR * 25).toFixed(2) + "%"]
    ]);
    formula_loader(['trinity', 'trinity2'], [
      ['str1', (STR * 25).toFixed(0)],
      ['str2', (STR * 6.25).toFixed(2) + "%"],
      ['dur' , (DUR * 9).toFixed(2) + "s"],
      ['rng1', (RNG * 100).toFixed(2) + "m"],
      ['rng2', (RNG * 25).toFixed(2) + "m"],
      ['eff' , (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['trinity', 'trinity3_aug', 'trinity3'], [
      ['dur', (DUR * 12).toFixed(2) + "s"],
      ['rng', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['trinity', 'trinity3_aug'], [
      ['str',  Math.min((STR * 45), 100).toFixed(2) + "%"]
    ]);
    formula_loader(['trinity', 'trinity4'], [
      ['str1',  Math.min((STR * 80), 100).toFixed(2) + "%"],
      ['str2',  Math.min((STR * 50), 75).toFixed(2) + "%"],
      ['dur' , (DUR * 10).toFixed(2) + "s"],
      ['eff' , (EFF * 100).toFixed(2)]
    ]);
    //Valkyr
    formula_loader(['valkyr', 'valkyr1'], [
      ['str', (STR * 500 * COMBO).toFixed(0)],
      ['dur', (DUR).toFixed(2) + "s"],
      ['rng', (RNG * 75).toFixed(2) + "m"],
      ['eff', (EFF * 25 * (1 / COMBO)).toFixed(2)]
    ]);
    formula_loader(['valkyr', 'valkyr2_aug', 'valkyr2'], [
      ['str1', (STR * 50).toFixed(2) + "%"],
      ['str2',  Math.min((STR * 30), 75).toFixed(2) + "%"],
      ['dur' , (DUR * 15).toFixed(2) + "s"],
      ['rng' , (RNG * 25).toFixed(2) + "m"],
      ['eff' , (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['valkyr', 'valkyr2_aug'], [
      ['dur', (DUR * 2).toFixed(2) + "s"]
    ]);
    formula_loader(['valkyr', 'valkyr3_aug', 'valkyr3'], [
      ['str1', (STR * 3.5).toFixed(2) + "x"],
      ['str2', (STR * 1000).toFixed(0)],
      ['rng' , (RNG * 10).toFixed(2) + "m"],
      ['eff' , (EFF * 5).toFixed(2)]
    ]);
    formula_loader(['valkyr', 'valkyr3_aug'], [
      ['str', (STR * 200).toFixed(2) + "%"]
    ]);
    formula_loader(['valkyr', 'valkyr4_aug', 'valkyr4'], [
      ['str', (STR * 250).toFixed(0)],
      ['eff', (EFF * 25).toFixed(2)],
      ['cha', (CHA * 2.5).toFixed(2) + "/s - " + (CHA * 15).toFixed(2) + "/s"]
    ]);
    formula_loader(['valkyr', 'valkyr4_aug'], [
      ['rng' , (RNG * 50).toFixed(2) + "m"]
    ]);
    //Volt
    formula_loader(['volt', 'volt1_aug', 'volt1'], [
      ['str', (STR * 200).toFixed(0)],
      ['rng', (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['volt', 'volt1_aug'], [
      ['str', (STR * 100).toFixed(2) + "%"],
      ['dur', (DUR * 40).toFixed(2) + "s"],
      ['rng', (RNG * 15).toFixed(2) + "m"]
    ]);
    formula_loader(['volt', 'volt2_aug', 'volt2'], [
      ['str1', (STR * 50).toFixed(2) + "%"],
      ['str2', (STR * 17).toFixed(2) + "%"],
      ['dur' , (DUR * 10).toFixed(2) + "s"],
      ['rng' , (RNG * 25).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['volt', 'volt2_aug'], [
      ['str', (STR * 175).toFixed(0)]
    ]);
    formula_loader(['volt', 'volt3_aug', 'volt3'], [
      ['dur' , (DUR * 25).toFixed(2) + "s"],
      ['eff1', (EFF * 50).toFixed(2)],
      ['eff2', (4 / EFF).toFixed(2) + "m"]
    ]);
    formula_loader(['volt', 'volt3_aug'], [
      ['str', (STR * 300).toFixed(2) + "%"]
    ]);
    formula_loader(['volt', 'volt4'], [
      ['str' , (STR * 1000).toFixed(0)],
      ['dur' , (DUR * 6).toFixed(2) + "s"],
      ['rng1', (RNG * 20).toFixed(2) + "m"],
      ['rng2', (RNG * 8).toFixed(2) + "m"],
      ['eff' , (EFF * 100).toFixed(2)]
    ]);
    //Wisp
    formula_loader(['wisp', 'wisp1'], [
      ['str1', (STR * 300).toFixed(0)],
      ['str2', (STR * 30).toFixed(2) + "/s"],
      ['str3', (STR * 20).toFixed(2) + "%"],
      ['str4', (STR * 30).toFixed(2) + "%"],
      ['str5', (STR * 5).toFixed(0)],
      ['rng1', (RNG * 5).toFixed(2) + "m"],
      ['rng2', (RNG * 15).toFixed(2) + "m"],
      ['dur' , (DUR * 30).toFixed(2) + "s"],
      ['eff' , (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['wisp', 'wisp2'], [
      ['dur', (DUR * 4).toFixed(2) + "s"],
      ['eff', (EFF * 35).toFixed(2)]
    ]);
    formula_loader(['wisp', 'wisp3'], [
      ['str1', (STR * 2).toFixed(2) + "x"],
      ['str2', Math.min((STR * 20), 100).toFixed(2) + "/s"],
      ['dur', (DUR * 16).toFixed(2) + "s"],
      ['rng', (RNG * 15).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['wisp', 'wisp4'], [
      ['str', (STR * 1500).toFixed(0) + "/s"],
      ['rng', (RNG * 40).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)],
      ['cha', (EFF * 12).toFixed(2) + "/s"]
    ]);
    //Wukong
    formula_loader(['wukong', 'wukong1_aug', 'wukong1'], [
      ['str', (STR * 2).toFixed(2) + "x"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['wukong', 'wukong1_aug'], [
      ['rng', (RNG * 20).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['wukong', 'wukong2_aug', 'wukong2'], [
      ['str', (STR * 1).toFixed(2) + "%/m"],
      ['dur', (DUR * 2).toFixed(2) + "s"],
      ['rng', (RNG * 8).toFixed(2) + "m"],
      ['eff', (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['wukong', 'wukong2_aug'], [
      ['rng', (RNG * 4).toFixed(2) + "m"],
      ['dur', (DUR * 14).toFixed(2) + "s"]
    ]);
    formula_loader(['wukong', 'wukong3'], [
      ['str1', (STR * 7.5).toFixed(2) + "x"],
      ['str2', (STR * 1.5).toFixed(2) + "x"],
      ['dur1', (DUR * 2).toFixed(2) + "s"],
      ['dur2', (DUR * 25).toFixed(2) + "s"],
      ['rng', (RNG * 12).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2)]
    ]);
    formula_loader(['wukong', 'wukong4_aug', 'wukong4'], [
      ['str', (STR * 250).toFixed(0)],
      ['eff', (EFF * 10).toFixed(2)],
      ['cha', (CHA * 5).toFixed(2) + "/s"]
    ]);
    formula_loader(['wukong', 'wukong4_aug'], [
      ['str', (STR * 15).toFixed(2) + "%"],
      ['dur', (1 / DUR).toFixed(2) + "/s"]
    ]);
    //Zephyr
    formula_loader(['zephyr', 'zephyr1'], [
      ['str' , (STR * 500).toFixed(0)],
      ['dur1', (DUR * 30).toFixed(2) + "s"],
      ['dur2', "≤" + (DUR * 12.5).toFixed(2) + "m"],
      ['rng1', (RNG * 2).toFixed(2) + "m"],
      ['rng2', (RNG * 7).toFixed(2) + "m"],
      ['eff' , (EFF * 25).toFixed(2) + " - " + (EFF * 12.5).toFixed(2)]
    ]);
    formula_loader(['zephyr', 'zephyr2'], [
      ['str', (STR * 500).toFixed(0)],
      ['rng', (RNG * 8).toFixed(2) + "m"],
      ['eff', (EFF * 50).toFixed(2) + " - " + (EFF * 25).toFixed(2)]
    ]);
    formula_loader(['zephyr', 'zephyr3_aug', 'zephyr3'], [
      ['dur', (DUR * 20).toFixed(2) + "s"],
      ['rng', (RNG * 6).toFixed(2) + "m"],
      ['eff', (EFF * 75).toFixed(2)]
    ]);
    formula_loader(['zephyr', 'zephyr3_aug'], [
      ['str1', (STR * 40).toFixed(2) + "%"],
      ['str2', (STR * 100).toFixed(2) + "%"]
    ]);
    formula_loader(['zephyr', 'zephyr4'], [
      ['str', (STR * 120).toFixed(0)],
      ['dur', (DUR * 20).toFixed(2) + "s"],
      ['rng', (RNG * 25).toFixed(2) + "m"],
      ['eff', (EFF * 100).toFixed(2)]
    ]);
  } // function update_table end

  // prepares formulas for certain range of IDs and puts them inside output cells
  function formula_loader(idCall, meta_array) {
    var i, j;
    var idName = "#" + idCall[idCall.length - 1] + "_"; //LAST ELEMENT IS RELEVANT!
    for (i = 0; i < idCall.length; i++) {
      if ($("#maximization_" + idCall[i]).length) {
        for (j = 0; j < meta_array.length; j++) {
          $(idName + meta_array[j][0]).text(meta_array[j][1]);
        }
      }
    }
  }
  
  // gives a value in case there is none available
  function existance(val) {
      if (val) {
        return val;
      } else {
        return 0;
      }
    }

  //  loaders
  // input tables
  table_loader("table_main", buildTable);
  table_loader("table_armor", buildTable([
    ['Armor multiplier', 'xARMOR', '0'],
    ['Additive Armor', 'aARMOR', '0']
  ]));
  table_loader("table_armor_target", buildTable([
    ['Armor multiplier', 'xARMOR', '0'],
    ['Additive Armor', 'aARMOR', '0'],
    ['Number of targets', 'TARGET', '1']
  ]));
  table_loader("table_atlas", buildTable([
    ['Armor multiplier', 'xARMOR', '0'],
    ['Additive Armor', 'aARMOR', '0'],
    ['Health bonus', 'HEALTH', '0'],
    ['Shields bonus', 'SHIELDS', '0'],
    ['Combo N°', 'COMBO', '1']
  ]));
  table_loader("table_combo", buildTable([
    ['Combo N°', 'COMBO', '1']
  ]));
  table_loader("table_nidus", buildTable([
    ['Stack N°', 'STACK', '0']
  ]));
  table_loader("table_rhino", buildTable([
    ['Armor multiplier', 'xARMOR', '0'],
    ['Additive Armor', 'aARMOR', '85'],
    ['Combo N°', 'COMBO', '1'],
    ['Number of targets', 'TARGET', '0']
  ]));
  table_loader("table_rumblers", buildTable([
    ['Armor multiplier', 'xARMOR', '0'],
    ['Additive Armor', 'aARMOR', '0'],
    ['Health bonus', 'HEALTH', '0'],
    ['Shields bonus', 'SHIELDS', '0']
  ]));
  table_loader("table_target", buildTable([
    ['Number of targets', 'TARGET', '1']
  ]));

  //  Warframes
  // Ash
  table_loader("ash1", abilityGenerator(AshMap.手裡劍));
  table_loader("ash2", abilityGenerator(AshMap.煙幕));
  table_loader("ash3", abilityGenerator(AshMap.瞬移));
  table_loader("ash4", abilityGenerator(AshMap.劍刃風暴));
  table_loader("ash1_aug", augmentGenerator(AshMap, "手裡劍", "削甲手裡劍"));
  table_loader("ash3_aug", augmentGenerator(AshMap, "瞬移", "致命傳送"));
  table_loader("ash4_aug", augmentGenerator(AshMap, "劍刃風暴", "風起雲湧"));
  table_loader("ash", warframeGenerator(
    AshMap,
    "手裡劍",
    "削甲手裡劍",
    "煙幕",
    "庇護煙幕",
    "瞬移",
    "致命傳送",
    "劍刃風暴",
    "風起雲湧"
  ));
  // Atlas
  table_loader("atlas1", abilityGenerator(AtlasMap.landslide));
  table_loader("atlas2", abilityGenerator(AtlasMap.tectonics));
  table_loader("atlas3", abilityGenerator(AtlasMap.petrify));
  table_loader("atlas4", abilityGenerator(AtlasMap.rumblers));
  table_loader("atlas1_aug", augmentGenerator(AtlasMap, "Landslide", "Path of Statues"));
  table_loader("atlas3_aug", augmentGenerator(AtlasMap, "Petrify", "Ore Gaze"));
  table_loader("atlas4_aug", augmentGenerator(AtlasMap, "Rumblers", "Titanic Rumbler"));
  table_loader("atlas", warframeGenerator(
    AtlasMap,
    "Landslide",
    "Path of Statues",
    "Tectonics",
    "Tectonic Fracture",
    "Petrify",
    "Ore Gaze",
    "Rumblers",
    "Titanic Rumbler"
  ));
  //Banshee
  table_loader("banshee1", abilityGenerator(BansheeMap.sonic_boom));
  table_loader("banshee2", abilityGenerator(BansheeMap.sonar));
  table_loader("banshee3", abilityGenerator(BansheeMap.silence));
  table_loader("banshee4", abilityGenerator(BansheeMap.sound_quake));
  table_loader("banshee1_aug", augmentGenerator(BansheeMap, "Sonic Boom", "Sonic Fracture"));
  table_loader("banshee3_aug", augmentGenerator(BansheeMap, "Silence", "Savage silence"));
  table_loader("banshee4_aug", augmentGenerator(BansheeMap, "Sound Quake", "Resonating Quake"));
  table_loader("banshee", warframeGenerator(
    BansheeMap,
    "Sonic Boom",
    "Sonic Fracture",
    "Sonar",
    "Resonance",
    "Silence",
    "Savage Silence",
    "Sound Quake",
    "Resonating Quake"
  ));
  //Baruuk
  table_loader("baruuk1", abilityGenerator(BaruukMap.elude));
  table_loader("baruuk2", abilityGenerator(BaruukMap.lull));
  table_loader("baruuk3", abilityGenerator(BaruukMap.desolate_hands));
  table_loader("baruuk4", abilityGenerator(BaruukMap.serene_storm));
  table_loader("baruuk", warframeGenerator(
    BaruukMap,
    "Elude",
    "",
    "Lull",
    "",
    "Desolate Hands",
    "",
    "Serene Storm",
    ""
  ));
  //Chroma
  //Ember
  table_loader("ember1", abilityGenerator(EmberMap.fireball));
  table_loader("ember2", abilityGenerator(EmberMap.accelerant));
  table_loader("ember3", abilityGenerator(EmberMap.fire_blast));
  table_loader("ember4", abilityGenerator(EmberMap.world_on_fire));
  table_loader("ember1_aug", augmentGenerator(EmberMap, "Fireball", "Fireball Frenzy"));
  table_loader("ember2_aug", augmentGenerator(EmberMap, "Accelerant", "Flash Accelerant"));
  table_loader("ember", warframeGenerator(
    EmberMap,
    "Fireball",
    "Fireball Frenzy",
    "Accelerant",
    "Flash Accelerant",
    "Fire Blast",
    "Fire Fright",
    "World On Fire",
    "Firequake"
  ));
  //Excalibur
  table_loader("excalibur1", abilityGenerator(ExcaliburMap.slash_dash));
  table_loader("excalibur2", abilityGenerator(ExcaliburMap.radial_blind));
  table_loader("excalibur3", abilityGenerator(ExcaliburMap.radial_javelin));
  table_loader("excalibur4", abilityGenerator(ExcaliburMap.exalted_blade));
  table_loader("excalibur1_aug", augmentGenerator(ExcaliburMap, "Slash Dash", "Surging Dash"));
  table_loader("excalibur2_aug", augmentGenerator(ExcaliburMap, "Radial Blind", "Radial Finish"));
  table_loader("excalibur3_aug", augmentGenerator(ExcaliburMap, "Radial Javelin", "Furious Javelin"));
  table_loader("excalibur4_aug", augmentGenerator(ExcaliburMap, "Exalted Blade", "Chromatic Blade"));
  table_loader("excalibur", warframeGenerator(
    ExcaliburMap,
    "Slash Dash",
    "Surging Dash",
    "Radial Blind",
    "Radial Finish",
    "Radial Javelin",
    "Furious Javelin",
    "Exalted Blade",
    "Chromatic Blade"
  ));
  //Frost
  table_loader("frost1", abilityGenerator(FrostMap.freeze));
  table_loader("frost2", abilityGenerator(FrostMap.ice_wave));
  table_loader("frost3", abilityGenerator(FrostMap.snow_globe));
  table_loader("frost4", abilityGenerator(FrostMap.avalanche));
  table_loader("frost1_aug", augmentGenerator(FrostMap, "Freeze", "Freeze Force"));
  table_loader("frost2_aug", augmentGenerator(FrostMap, "Ice Wave", "Ice Wave Impedance"));
  table_loader("frost3_aug", augmentGenerator(FrostMap, "Snow Globe", "Chilling Globe"));
  table_loader("frost4_aug", augmentGenerator(FrostMap, "Avalanche", "Icy Avalanche"));
  table_loader("frost", warframeGenerator(
    FrostMap,
    "Freeze",
    "Freeze Force",
    "Ice Wave",
    "Ice Wave Impedance",
    "Snow Globe",
    "Chilling Globe",
    "Avalanche",
    "Icy Avalanche"
  ));
  //Gara
  table_loader("gara1", abilityGenerator(GaraMap.shattered_lash));
  table_loader("gara2", abilityGenerator(GaraMap.splinter_storm));
  table_loader("gara3", abilityGenerator(GaraMap.spectrorage));
  table_loader("gara4", abilityGenerator(GaraMap.mass_vitrify));
  table_loader("gara2_aug", augmentGenerator(GaraMap, "Splinter Storm", "Mending Splinters"));
  table_loader("gara", warframeGenerator(
    GaraMap,
    "Shattered Lash",
    "",
    "Splinter Storm",
    "Mending Splinters",
    "Spectrorage",
    "Spectrosiphon",
    "Mass Vitrify",
    ""
  ));
  //Garuda
  table_loader("garuda1", abilityGenerator(GarudaMap.dread_mirror));
  table_loader("garuda2", abilityGenerator(GarudaMap.blood_altar));
  table_loader("garuda3", abilityGenerator(GarudaMap.bloodletting));
  table_loader("garuda4", abilityGenerator(GarudaMap.seeking_talons));
  table_loader("garuda1_aug", augmentGenerator(GarudaMap, "Dread Mirror", "Dread Ward"));
  table_loader("garuda", warframeGenerator(
    GarudaMap,
    "Dread Mirror",
    "Dread Ward",
    "Blood Altar",
    "",
    "Bloodletting",
    "",
    "Seeking Talons",
    ""
  ));
  //Gauss
  table_loader("gauss1", abilityGenerator(GaussMap.mach_rush));
  table_loader("gauss2", abilityGenerator(GaussMap.kinetic_plating));
  table_loader("gauss3", abilityGenerator(GaussMap.thermal_sunder));
  table_loader("gauss4", abilityGenerator(GaussMap.redline));
  table_loader("gauss", warframeGenerator(
    GaussMap,
    "Mach Rush",
    "",
    "Kinetic Plating",
    "",
    "Thermal Sunder",
    "",
    "Redline",
    ""
  ));
  //Harrow
  table_loader("harrow1", abilityGenerator(HarrowMap.condemn));
  table_loader("harrow2", abilityGenerator(HarrowMap.penance));
  table_loader("harrow3", abilityGenerator(HarrowMap.thurible));
  table_loader("harrow4", abilityGenerator(HarrowMap.covenant));
  table_loader("harrow3_aug", augmentGenerator(HarrowMap, "Thurible", "Warding Thurible"));
  table_loader("harrow4_aug", augmentGenerator(HarrowMap, "Covenant", "Lasting Covenant"));
  table_loader("harrow", warframeGenerator(
    HarrowMap,
    "Condemn",
    "",
    "Penance",
    "",
    "Thurible",
    "Warding Thurible",
    "Covenant",
    "Lasting Covenant"
  ));
  //Hildryn
  table_loader("hildryn1", abilityGenerator(HildrynMap.balefire));
  table_loader("hildryn2", abilityGenerator(HildrynMap.shield_pillage));
  table_loader("hildryn3", abilityGenerator(HildrynMap.haven));
  table_loader("hildryn4", abilityGenerator(HildrynMap.aegis_storm));
  table_loader("hildryn", warframeGenerator(
    HildrynMap,
    "Balefire",
    "",
    "Shield Pillage",
    "",
    "Haven",
    "",
    "Aegis Storm",
    ""
  ));
  //Hydroid
  table_loader("hydroid1", abilityGenerator(HydroidMap.tempest_barrage));
  table_loader("hydroid2", abilityGenerator(HydroidMap.tidal_surge));
  table_loader("hydroid3", abilityGenerator(HydroidMap.undertow));
  table_loader("hydroid4", abilityGenerator(HydroidMap.tentacle_swarm));
  table_loader("hydroid2_aug", augmentGenerator(HydroidMap, "Tidal Surge", "Tidal Impunity"));
  table_loader("hydroid3_aug", augmentGenerator(HydroidMap, "Undertow", "Curative Undertow"));
  table_loader("hydroid", warframeGenerator(
    HydroidMap,
    "Tempest Barrage",
    "Corroding Barrage",
    "Tidal Surge",
    "Tidal Impunity",
    "Undertow",
    "Curative Undertow",
    "Tentacle Swarm",
    "Pilfering Swarm"
  ));
  //Inaros
  table_loader("inaros1", abilityGenerator(InarosMap.desiccation));
  table_loader("inaros2", abilityGenerator(InarosMap.devour));
  table_loader("inaros3", abilityGenerator(InarosMap.sandstorm));
  table_loader("inaros4", abilityGenerator(InarosMap.scarab_swarm));
  table_loader("inaros1_aug", augmentGenerator(InarosMap, "Desiccation", "Desiccation's Curse"));
  table_loader("inaros3_aug", augmentGenerator(InarosMap, "Sandstorm", "Elemental Sandstorm"));
  table_loader("inaros4_aug", augmentGenerator(InarosMap, "Scarab Swarm", "Negation Swarm"));
  table_loader("inaros", warframeGenerator(
    InarosMap,
    "Desiccation",
    "Desiccation's Curse",
    "Devour",
    "",
    "Sandstorm",
    "Elemental Sandstorm",
    "Scarab Swarm",
    "Negation Swarm"
  ));
  //Ivara
  table_loader("ivara1", abilityGenerator(IvaraMap.quiver));
  table_loader("ivara2", abilityGenerator(IvaraMap.navigator));
  table_loader("ivara3", abilityGenerator(IvaraMap.prowl));
  table_loader("ivara4", abilityGenerator(IvaraMap.artemis_bow));
  table_loader("ivara1_aug", augmentGenerator(IvaraMap, "Quiver", "Empowered Quiver"));
  table_loader("ivara2_aug", augmentGenerator(IvaraMap, "Navigator", "Piercing Navigator"));
  table_loader("ivara3_aug", augmentGenerator(IvaraMap, "Prowl", "Infiltrate"));
  table_loader("ivara4_aug", augmentGenerator(IvaraMap, "Artemis Bow", "Concentrated Arrow"));
  table_loader("ivara", warframeGenerator(
    IvaraMap,
    "Quiver",
    "Empowered Quiver",
    "Navigator",
    "Piercing Navigator",
    "Prowl",
    "Infiltrate",
    "Artemis Bow",
    "Concentrated Arrow"
  ));
  //Khora
  table_loader("khora1", abilityGenerator(KhoraMap.whipclaw));
  table_loader("khora2", abilityGenerator(KhoraMap.ensnare));
  table_loader("khora3", abilityGenerator(KhoraMap.venari));
  table_loader("khora4", abilityGenerator(KhoraMap.strangledome));
  table_loader("khora1_aug", augmentGenerator(KhoraMap, "Whipclaw", "Accumulating Whipclaw"));
  table_loader("khora", warframeGenerator(
    KhoraMap,
    "Whipclaw",
    "Accumulating Whipclaw",
    "Ensnare",
    "",
    "Venari",
    "Venari Bodyguard",
    "Strangledome",
    "Pilfering Strangledome"
  ));
	//Limbo
  table_loader("limbo1", abilityGenerator(LimboMap.banish));
  table_loader("limbo2", abilityGenerator(LimboMap.stasis));
  table_loader("limbo3", abilityGenerator(LimboMap.rift_surge));
  table_loader("limbo4", abilityGenerator(LimboMap.cataclysm));
  table_loader("limbo1_aug", augmentGenerator(LimboMap, "Banish", "Rift Haven"));
  table_loader("limbo3_aug", augmentGenerator(LimboMap, "Rift Surge", "Rift Torrent"));
	table_loader("limbo", warframeGenerator(
    LimboMap,
    "Banish",
    "Rift Haven",
    "Stasis",
    "",
    "Rift Surge",
    "Rift Torrent",
    "Cataclysm",
    "Cataclysm Continuum"
  ));
	//Loki
  table_loader("loki1", abilityGenerator(LokiMap.decoy));
  table_loader("loki2", abilityGenerator(LokiMap.invisibility));
  table_loader("loki3", abilityGenerator(LokiMap.switch_teleport));
  table_loader("loki4", abilityGenerator(LokiMap.radial_disarm));
  table_loader("loki3_aug", augmentGenerator(LokiMap, "Switch Teleport", "Safeguard Switch"));
	table_loader("loki", warframeGenerator(
    LokiMap,
    "Decoy",
    "Savior Decoy",
    "Invisibility",
    "Hushed Invisibility",
    "Switch Teleport",
    "Safeguard Switch",
    "Radial Disarm",
    "Irradiating Disarm"
  ));
  //Mag
  table_loader("mag1", abilityGenerator(MagMap.pull));
  table_loader("mag2", abilityGenerator(MagMap.magnetize));
  table_loader("mag3", abilityGenerator(MagMap.polarize));
  table_loader("mag4", abilityGenerator(MagMap.crush));
  table_loader("mag2_aug", augmentGenerator(MagMap, "Magnetize", "Magnetized Discharge"));
  table_loader("mag3_aug", augmentGenerator(MagMap, "Polarize", "Counter Pulse"));
  table_loader("mag4_aug", augmentGenerator(MagMap, "Crush", "Fracturing Crush"));
	table_loader("mag", warframeGenerator(
    MagMap,
    "Pull",
    "Greedy Pull",
    "Magnetize",
    "Magnetized Discharge",
    "Polarize",
    "Counter Pulse",
    "Crush",
    "Fracturing Crush"
  ));
  //Mesa
  table_loader("mesa1", abilityGenerator(MesaMap.ballistic_battery));
  table_loader("mesa2", abilityGenerator(MesaMap.shooting_gallery));
  table_loader("mesa3", abilityGenerator(MesaMap.shatter_shield));
  table_loader("mesa4", abilityGenerator(MesaMap.peacemaker));
  table_loader("mesa2_aug", augmentGenerator(MesaMap, "Shooting Gallery", "Muzzle Flash"));
	table_loader("mesa", warframeGenerator(
    MesaMap,
    "Ballistic Battery",
    "Ballistic Bullseye",
    "Shooting Gallery",
    "Muzzle Flash",
    "Shatter Shield",
    "Staggering Shield",
    "Peacemaker",
    "Mesa's Waltz"
  ));
  //Mirage
  table_loader("mirage1", abilityGenerator(MirageMap.hall_of_mirrors));
  table_loader("mirage2", abilityGenerator(MirageMap.sleight_of_hand));
  table_loader("mirage3", abilityGenerator(MirageMap.eclipse));
  table_loader("mirage4", abilityGenerator(MirageMap.prism));
  table_loader("mirage2_aug", augmentGenerator(MirageMap, "Sleight Of Hand", "Explosive Legerdemain"));
  table_loader("mirage3_aug", augmentGenerator(MirageMap, "Eclipse", "Total Eclipse"));
	table_loader("mirage", warframeGenerator(
    MirageMap,
    "Hall of Mirrors",
    "Hall of Malevolence",
    "Sleight Of Hand",
    "Explosive Legerdemain",
    "Eclipse",
    "Total Eclipse",
    "Prism",
    ""
  ));
  //Nekros
  table_loader("nekros1", abilityGenerator(NekrosMap.soul_punch));
  table_loader("nekros2", abilityGenerator(NekrosMap.terrify));
  table_loader("nekros3", abilityGenerator(NekrosMap.desecrate));
  table_loader("nekros4", abilityGenerator(NekrosMap.shadows_of_the_dead));
  table_loader("nekros1_aug", augmentGenerator(NekrosMap, "Soul Punch", "Soul Survivor"));
  table_loader("nekros2_aug", augmentGenerator(NekrosMap, "Terrify", "Creeping Terrify"));
  table_loader("nekros3_aug", augmentGenerator(NekrosMap, "Desecrate", "Despoil"));
  table_loader("nekros4_aug", augmentGenerator(NekrosMap, "Shadows Of The Dead", "Shield Of Shadows"));
	table_loader("nekros", warframeGenerator(
    NekrosMap,
    "Soul Punch",
    "Soul Survivor",
    "Terrify",
    "Creeping Terrify",
    "Desecrate",
    "Despoil",
    "Shadows Of The Dead",
    "Shield Of Shadows"
  ));
  //Nezha
  table_loader("nezha1", abilityGenerator(NezhaMap.fire_walker));
  table_loader("nezha2", abilityGenerator(NezhaMap.blazing_chakram));
  table_loader("nezha3", abilityGenerator(NezhaMap.warding_halo));
  table_loader("nezha4", abilityGenerator(NezhaMap.divine_spears));
  table_loader("nezha1_aug", augmentGenerator(NezhaMap, "Fire Walker", "Pyroclastic Flow"));
	table_loader("nezha", warframeGenerator(
    NezhaMap,
    "Fire Walker",
    "Pyroclastic Flow",
    "Blazing Chakram",
    "Reaping Chakram",
    "Warding Halo",
    "Safeguard",
    "Divine Spears",
    ""
  ));
  //Nidus
  table_loader("nidus1", abilityGenerator(NidusMap.virulence));
  table_loader("nidus2", abilityGenerator(NidusMap.larva));
  table_loader("nidus3", abilityGenerator(NidusMap.parasitic_link));
  table_loader("nidus4", abilityGenerator(NidusMap.ravenous));
  table_loader("nidus1_aug", augmentGenerator(NidusMap, "Virulence", "Teeming Virulence"));
  table_loader("nidus2_aug", augmentGenerator(NidusMap, "Larva", "Larva Burst"));
	table_loader("nidus", warframeGenerator(
    NidusMap,
    "Virulence",
    "Teeming Virulence",
    "Larva",
    "Larva Burst",
    "Parasitic Link",
    "",
    "Ravenous",
    "Insatiable"
  ));
  //Nova
  table_loader("nova1", abilityGenerator(NovaMap.null_star));
  table_loader("nova2", abilityGenerator(NovaMap.antimatter_drop));
  table_loader("nova3", abilityGenerator(NovaMap.worm_hole));
  table_loader("nova4", abilityGenerator(NovaMap.molecular_prime));
  table_loader("nova1_aug", augmentGenerator(NovaMap, "Null Star", "Neutron Star"));
  table_loader("nova2_aug", augmentGenerator(NovaMap, "Antimatter Drop", "Antimatter Absorb"));
  table_loader("nova3_aug", augmentGenerator(NovaMap, "Worm Hole", "Escape Velocity"));
	table_loader("nova", warframeGenerator(
    NovaMap,
    "Null Star",
    "Neutron Star",
    "Antimatter Drop",
    "Antimatter Absorb",
    "Worm Hole",
    "Escape Velocity",
    "Molecular Prime",
    "Molecular Fission"
  ));
  //Nyx
  table_loader("nyx1", abilityGenerator(NyxMap.mind_control));
  table_loader("nyx2", abilityGenerator(NyxMap.psychic_bolts));
  table_loader("nyx3", abilityGenerator(NyxMap.chaos));
  table_loader("nyx4", abilityGenerator(NyxMap.absorb));
  table_loader("nyx1_aug", augmentGenerator(NyxMap, "Mind Control", "Mind Freak"));
  table_loader("nyx2_aug", augmentGenerator(NyxMap, "Psychic Bolts", "Pacifying Bolts"));
	table_loader("nyx", warframeGenerator(
    NyxMap,
    "Mind Control",
    "Mind Freak",
    "Psychic Bolts",
    "Pacifying Bolts",
    "Chaos",
    "Chaos Sphere",
    "Absorb",
    "Assimilate"
  ));
  //Oberon
  table_loader("oberon1", abilityGenerator(OberonMap.smite));
  table_loader("oberon2", abilityGenerator(OberonMap.hallowed_ground));
  table_loader("oberon3", abilityGenerator(OberonMap.renewal));
  table_loader("oberon4", abilityGenerator(OberonMap.reckoning));
  table_loader("oberon1_aug", augmentGenerator(OberonMap, "Smite", "Smite Infusion"));
  table_loader("oberon2_aug", augmentGenerator(OberonMap, "Hallowed Ground", "Hallowed Eruption"));
  table_loader("oberon3_aug", augmentGenerator(OberonMap, "Renewal", "Phoenix Renewal"));
  table_loader("oberon4_aug", augmentGenerator(OberonMap, "Reckoning",
    "Hallowed Reckoning"));
	table_loader("oberon", warframeGenerator(
    OberonMap,
    "Smite",
    "Smite Infusion",
    "Hallowed Ground",
    "Hallowed Eruption",
    "Renewal",
    "Phoenix Renewal",
    "Reckoning",
    "Hallowed Reckoning"
  ));
  //Octavia
  table_loader("octavia1", abilityGenerator(OctaviaMap.mallet));
  table_loader("octavia2", abilityGenerator(OctaviaMap.resonator));
  table_loader("octavia3", abilityGenerator(OctaviaMap.metronome));
  table_loader("octavia4", abilityGenerator(OctaviaMap.amp));
  table_loader("octavia", warframeGenerator(
    OctaviaMap,
    "Mallet",
    "Partitioned Mallet",
    "Resonator",
    "Conductor",
    "Metronome",
    "",
    "Amp",
    ""
  ));
  //Revenant
  table_loader("revenant1", abilityGenerator(RevenantMap.enthrall));
  table_loader("revenant2", abilityGenerator(RevenantMap.mesmer_skin));
  table_loader("revenant3", abilityGenerator(RevenantMap.reave));
  table_loader("revenant4", abilityGenerator(RevenantMap.danse_macabre));
  table_loader("revenant3_aug", augmentGenerator(RevenantMap, "Reave", "Blinding Reave"));
  table_loader("revenant", warframeGenerator(
    RevenantMap,
    "Enthrall",
    "",
    "Mesmer Skin",
    "",
    "Reave",
    "Blinding Reave",
    "Danse Macabre",
    ""
  ));
  //Rhino
  table_loader("rhino1", abilityGenerator(RhinoMap.rhino_charge));
  table_loader("rhino2", abilityGenerator(RhinoMap.iron_skin));
  table_loader("rhino3", abilityGenerator(RhinoMap.roar));
  table_loader("rhino4", abilityGenerator(RhinoMap.rhino_stomp));
  table_loader("rhino1_aug", augmentGenerator(RhinoMap, "Rhino Charge", "Ironclad Charge"));
  table_loader("rhino2_aug", augmentGenerator(RhinoMap, "Iron Skin", "Iron Shrapnel"));
  table_loader("rhino3_aug", augmentGenerator(RhinoMap, "Roar", "Piercing Roar"));
  table_loader("rhino4_aug", augmentGenerator(RhinoMap, "Rhino Stomp", "Reinforcing Stomp"));
  table_loader("rhino", warframeGenerator(
    RhinoMap,
    "Rhino Charge",
    "Ironclad Charge",
    "Iron Skin",
    "Iron Shrapnel",
    "Roar",
    "Piercing Roar",
    "Rhino Stomp",
    "Reinforcing Stomp"
  ));
	//Saryn
  table_loader("saryn1", abilityGenerator(SarynMap.spores));
  table_loader("saryn2", abilityGenerator(SarynMap.molt));
  table_loader("saryn3", abilityGenerator(SarynMap.toxic_lash));
  table_loader("saryn4", abilityGenerator(SarynMap.miasma));
  table_loader("saryn1_aug", augmentGenerator(SarynMap, "Spores", "Venom Dose"));
  table_loader("saryn2_aug", augmentGenerator(SarynMap, "Molt", "Regenerative Molt"));
  table_loader("saryn3_aug", augmentGenerator(SarynMap, "Toxic Lash", "Contagion Cloud"));
  table_loader("saryn", warframeGenerator(
    SarynMap,
    "Spores",
    "Venom Dose",
    "Molt",
    "Regenerative Molt",
    "Toxic Lash",
    "Contagion Cloud",
    "Miasma",
    ""
  ));
	//Titania
  table_loader("titania1", abilityGenerator(TitaniaMap.spellbind));
  table_loader("titania2", abilityGenerator(TitaniaMap.tribute));
  table_loader("titania3", abilityGenerator(TitaniaMap.lantern));
  table_loader("titania4", abilityGenerator(TitaniaMap.razorwing));
  table_loader("titania3_aug", augmentGenerator(TitaniaMap, "Lantern", "Beguiling Lantern"));
  table_loader("titania4_aug", augmentGenerator(TitaniaMap, "Razorwing", "Razorwing Blitz"));
  table_loader("titania", warframeGenerator(
    TitaniaMap,
    "Spellbind",
    "",
    "Tribute",
    "",
    "Lantern",
    "Beguiling Lantern",
    "Razorwing",
    "Razorwing Blitz"
  ));
  //Trinity
  table_loader("trinity1", abilityGenerator(TrinityMap.well_of_life));
  table_loader("trinity2", abilityGenerator(TrinityMap.energy_vampire));
  table_loader("trinity3", abilityGenerator(TrinityMap.link));
  table_loader("trinity4", abilityGenerator(TrinityMap.blessing));
  table_loader("trinity1_aug", augmentGenerator(TrinityMap, "Well Of Life", "Pool of Life"));
  table_loader("trinity3_aug", augmentGenerator(TrinityMap, "Link", "Abating Link"));
  table_loader("trinity", warframeGenerator(
    TrinityMap,
    "Well Of Life",
    "Pool of Life",
    "Energy Vampire",
    "Vampire Leech",
    "Link",
    "Abating Link",
    "Blessing",
    ""
  ));
  //Valkyr
  table_loader("valkyr1", abilityGenerator(ValkyrMap.rip_line));
  table_loader("valkyr2", abilityGenerator(ValkyrMap.warcry));
  table_loader("valkyr3", abilityGenerator(ValkyrMap.paralysis));
  table_loader("valkyr4", abilityGenerator(ValkyrMap.hysteria));
  table_loader("valkyr2_aug", augmentGenerator(ValkyrMap, "Warcry", "Eternal War"));
  table_loader("valkyr3_aug", augmentGenerator(ValkyrMap, "Paralysis", "Prolonged Paralysis"));
  table_loader("valkyr4_aug", augmentGenerator(ValkyrMap, "Hysteria", "Hysterical Assault"));
  table_loader("valkyr", warframeGenerator(
    ValkyrMap,
    "Rip Line",
    "Swing Line",
    "Warcry",
    "Eternal War",
    "Paralysis",
    "Prolonged Paralysis",
    "Hysteria",
    "Hysterical Assault"
  ));
  //Volt
  table_loader("volt1", abilityGenerator(VoltMap.shock));
  table_loader("volt2", abilityGenerator(VoltMap.speed));
  table_loader("volt3", abilityGenerator(VoltMap.electric_shield));
  table_loader("volt4", abilityGenerator(VoltMap.discharge));
  table_loader("volt1_aug", augmentGenerator(VoltMap, "Shock", "Shock Trooper"));
  table_loader("volt2_aug", augmentGenerator(VoltMap, "Speed", "Shocking Speed"));
  table_loader("volt3_aug", augmentGenerator(VoltMap, "Electric Shield", "Transistor Shield"));
  table_loader("volt", warframeGenerator(
    VoltMap,
    "Shock",
    "Shock Trooper",
    "Speed",
    "Shocking Speed",
    "Electric Shield",
    "Transistor Shield",
    "Discharge",
    "Capacitance"
  ));
  //Wisp
  table_loader("wisp1", abilityGenerator(WispMap.reservoirs));
  table_loader("wisp2", abilityGenerator(WispMap.wil_o_wisp));
  table_loader("wisp3", abilityGenerator(WispMap.breach_surge));
  table_loader("wisp4", abilityGenerator(WispMap.sol_gate));
  table_loader("wisp", warframeGenerator(
    WispMap,
    "Reservoirs",
    "",
    "Wil-O-Wisp",
    "",
    "Breach Surge",
    "",
    "Sol Gate",
    ""
  ));
  //Wukong
  table_loader("wukong1", abilityGenerator(WukongMap.celestial_twin));
  table_loader("wukong2", abilityGenerator(WukongMap.cloud_walker));
  table_loader("wukong3", abilityGenerator(WukongMap.defy));
  table_loader("wukong4", abilityGenerator(WukongMap.primal_fury));
  table_loader("wukong1_aug", augmentGenerator(WukongMap, "Celestial Twin", "Celestial Stomp"));
  table_loader("wukong2_aug", augmentGenerator(WukongMap, "Cloud Walker", "Enveloping Cloud"));
  table_loader("wukong4_aug", augmentGenerator(WukongMap, "Primal Fury", "Primal Rage"));
  table_loader("wukong", warframeGenerator(
    WukongMap,
    "Celestial Twin",
    "Celestial Stomp",
    "Cloud Walker",
    "Enveloping Cloud",
    "Defy",
    "",
    "Primal Fury",
    "Primal Rage"
  ));
	//Zephyr
  table_loader("zephyr1", abilityGenerator(ZephyrMap.tail_wind));
  table_loader("zephyr2", abilityGenerator(ZephyrMap.airburst));
  table_loader("zephyr3", abilityGenerator(ZephyrMap.turbulence));
  table_loader("zephyr4", abilityGenerator(ZephyrMap.tornado));
  table_loader("zephyr3_aug", augmentGenerator(ZephyrMap, "Turbulence", "Jet Stream"));
  table_loader("zephyr", warframeGenerator(
    ZephyrMap,
    "Tail Wind",
    "Target Fixation",
    "Airburst",
    "",
    "Turbulence",
    "Jet Stream",
    "Tornado",
    "Funnel Clouds"
  ));



  // if the proper ID is called, it uses a function
  function table_loader(idCall, func) {
    var idName = "#maximization_" + idCall;
    if ($(idName).length) {
      $(idName).html(func);
    }
    update_table();
  }

  // generates the input table
  function buildTable(additions) {
    var vals = [
      ['Strength', 'STR', '100'],
      ['Range', 'RNG', '100'],
      ['Efficiency', 'EFF', '100'],
      ['Duration', 'DUR', '100']
    ];
    if (additions != []) { //keeps base input table clean 
      vals = vals.concat(additions);
    }
    var rows = [];
    var i;
    for (i = 0; i < vals.length; i++) {
      rows[i] = $('<tr>', {
        border: 0,
        append: [
          $('<td>', {
            text: vals[i][0] + ':',
          }),
          $('<td>', {
            append: $('<input>', {
              class: 'inputField',
              min: 0,
              max: 9999,
              id: 'in_' + vals[i][1],
              type: 'number',
              value: vals[i][2],
              on: {
                input: update_table
              }
            })
          })
        ]
      });
    }
    return $('<table>').append(rows);
  }

  // creates the entire table of a Warframe.
  function warframeGenerator(map, ability1, augment1, ability2, augment2, ability3, augment3, ability4, augment4) {
    var i = 0;
    var rows = [];
    var abilities = [ability1, ability2, ability3, ability4];
    var augments = [augment1, augment2, augment3, augment4];
    for (i = 0; i < 4; i++) {
      var abilityKey = abilities[i].replace(/ /g, "_").replace(/&/g, "and").replace(/'/g, "").toLowerCase().replace(/-/g, "_").toLowerCase();
      var augmentKey = augments[i].replace(/ /g, "_").replace(/&/g, "and").replace(/'/g, "").toLowerCase().replace(/-/g, "_").toLowerCase();
      rows[2 * i] = $('<tr>', { //every ability/augment name goes in even rows
        append: [
          $('<td>', {
            append: [
              abilityName(abilities[i])
            ]
          }),
          $('<td>', {
            append: [
              augmentName(augments[i])
            ]
          })
        ]
      });
      rows[2 * i + 1] = $('<tr>', { //every output cells goes in odd rows
        valign: "top",
        append: [
          $('<td>', {
            append: [
              abilityGenerator(map[abilityKey])
            ]
          }),
          $('<td>', {
            append: [
              abilityGenerator(map[augmentKey])
            ]
          })
        ]
      });
    }
    return $('<table>').append(rows);
  }

  // creates a table with Ability and Augment
  function augmentGenerator(map, ability, augment) {
    var ability_call = ability.replace(/ /g, "_").replace(/&/g, "and").replace(/'/g, "").replace(/-/g, "_").toLowerCase();
    var augment_call = augment.replace(/ /g, "_").replace(/&/g, "and").replace(/'/g, "").replace(/-/g, "_").toLowerCase();
    return $('<table>', {
      append: [
        $('<tr>', {
          append: [
            abilityName(ability),
            $('<td>', {
              text: augment
            })
          ]
        }),
        $('<tr>', {
          append: [
            $('<td>', {
              valign: "top",
              append: [
                abilityGenerator(map[ability_call])
              ]
            }),
            $('<td>', {
              valign: "top",
              append: [
                abilityGenerator(map[augment_call])
              ]
            })
          ]
        })
      ]
    });
  }

  // Generates the graphical aspect of the output cells
  function abilityGenerator(meta_array) {
    if (meta_array == "N/A") {
      return "N/A";
    }
    var i;
    var rows = [];
    for (i = 0; i < meta_array.length; i++) {
      rows[i] = $('<tr>', {
        append: [
          $('<td>', {
            class: 'resultingStat',
            append: [
              $('<span>', {
                id: meta_array[i][0],
                value: 'NaN'
              })
            ]
          }),
          $('<td>', {
            text: meta_array[i][1]
          })
        ]
      });
    }
    return $('<table>').append(rows);
  }


  // creates the title a of the ability
  function abilityName(name) {
    var link = name.replace(/ /g, "_");
    return '<span class="ability-tooltip" data-param="' + name + '" style="white-space:pre"><a href="/zh-tw/wiki/' + link + '">' + name + '</a></span>';
  }

  // (for now) identical to abilityName, creates the title of the augment. The difference should be in the tooltip if implemented
  function augmentName(name) {
    var link = name.replace(/ /g, "_");
    return '<span class="mod-tooltip" data-param="' + name + '" style="white-space:pre"><a href="/zh-tw/wiki/' + link + '">' + name + '</a></span>';
  }

});