/*
This script is assigned to Max Content Population Table template:
http://masterofmagic.wikia.com/wiki/Template:MaxContentPop
Data in this script are imported by other scripts.
Unrest source  : http://masterofmagic.wikia.com/wiki/Unrest
Graphics source: http://masterofmagic.wikia.com/wiki/Template:MaxContentPopGraphics

Table of contents:
1. Non-Racial Unrest Data
2. Racial Data (non-unrest)
3. Racial Unrest Data
*/
// TODO:
// Separate different racial data into different scripts
// and solve dependencies in better way.
var raceCount = 14;

////////////////////////////////////////////////////////////
// 1. Non-Racial Unrest Data
////////////////////////////////////////////////////////////

var integerUnrest = {	// Absolute amount of rebels.
  cause :     -1,	// Just Cause
  gaia :      -2,	// Gaia's Blessing
  ritual :     1,	// Dark Rituals
  curse :      1,	// Cursed Lands
  pestilence : 2,	// Pestilence
  wasting :    1,	// Great Wasting
  armageddon : 2	// Armageddon
};

var relativeUnrest = {	// Percentage of town population.
  famine : 0.25,	// Famine
  // Following numbers represent unrest from taxes.
  // tax: unrest
  "0"   : 0.0 ,
  "0.5" : 0.1 ,
  "1"   : 0.2 ,
  "1.5" : 0.3 ,
  "2"   : 0.45,
  "2.5" : 0.6 ,
  "3"   : 0.75
};


////////////////////////////////////////////////////////////
// 2. Racial Data (non-unrest)
////////////////////////////////////////////////////////////

var raceMap = {
  BA : {
    uppercase : "BA",
    lowercase : "ba",
    name : "Barbarians",
    href : "/wiki/Barbarians"
  },
  GN : {
    uppercase : "GN",
    lowercase : "gn",
    name : "Gnolls",
    href : "/wiki/Gnolls"
  },
  HF : {
    uppercase : "HF",
    lowercase : "hf",
    name : "Halflings",
    href : "/wiki/Halflings"
  },
  HE : {
    uppercase : "HE",
    lowercase : "he",
    name : "High Elves",
    href : "/wiki/High_Elves"
  },
  HM : {
    uppercase : "HM",
    lowercase : "hm",
    name : "High Men",
    href : "/wiki/High_Men"
  },
  KL : {
    uppercase : "KL",
    lowercase : "kl",
    name : "Klackons",
    href : "/wiki/Klackons"
  },
  LZ : {
    uppercase : "LZ",
    lowercase : "lz",
    name : "Lizardmen",
    href : "/wiki/Lizardmen"
  },
  NO : {
    uppercase : "NO",
    lowercase : "no",
    name : "Nomads",
    href : "/wiki/Nomads"
  },
  OC : {
    uppercase : "OC",
    lowercase : "oc",
    name : "Orcs",
    href : "/wiki/Orcs"
  },
  BE : {
    uppercase : "BE",
    lowercase : "be",
    name : "Beastmen",
    href : "/wiki/Beastmen"
  },
  DE : {
    uppercase : "DE",
    lowercase : "de",
    name : "Dark Elves ",
    href : "/wiki/Dark_Elves "
  },
  DR : {
    uppercase : "DR",
    lowercase : "dr",
    name : "Draconians",
    href : "/wiki/Draconians"
  },
  DW : {
    uppercase : "DW",
    lowercase : "dw",
    name : "Dwarves",
    href : "/wiki/Dwarves"
  },
  TR : {
    uppercase : "TR",
    lowercase : "tr",
    name : "Trolls",
    href : "/wiki/Trolls"
  }
};

// Bidirectional linking between map and array.
var indexToRace = [
  "BA",  "GN",  "HF",  "HE",  "HM",  "KL",  "LZ",  "NO",  "OC",
  "BE",  "DE",  "DR",  "DW",  "TR"
];
var raceArray = [];
indexToRace.forEach( function(uppercase) {
  raceMap[uppercase].index = raceArray.length;
  raceArray.push(raceMap[uppercase]);
} );

// Economical order - heuristic value used for sorting.
var economyIndexToRace = [	// (bigger = better)
  "LZ", "GN", "KL", "TR", "BA", "HF", "OC", "HM",
  "NO", "DW", "HE", "BE", "DR", "DE"
];
var raceEconomyArray = [];
economyIndexToRace.forEach( function(uppercase) {
  raceMap[uppercase].economyIndex = raceEconomyArray.length;
  raceEconomyArray.push(raceMap[uppercase]);
} );

// TODO: Ruler index.

// Crate links for each race.
raceArray.forEach( function(race) {
// Text links.
  race.initials = '<a href="/wiki/' + race.name
                + '" title="' + race.name
                + '" style="color: inherit;"'
                + '">' + race.uppercase + '</a>';
// Image links.
// Images are copied from Template:MaxContentPopGraphics used on page.
  race.worker = document.getElementById("maxpop_worker_" + race.index);
  race.worker = (race.worker ? race.worker.innerHTML : undefined);
  race.rebel  = document.getElementById("maxpop_rebel_"  + race.index);
  race.rebel  = (race.rebel  ? race.rebel.innerHTML  : undefined);
  race.unit   = document.getElementById("maxpop_unit_"   + race.index);
  race.unit   = (race.unit   ? race.unit.innerHTML   : undefined);
} );


////////////////////////////////////////////////////////////
// 3. Racial Unrest Data
////////////////////////////////////////////////////////////

var raceUnrestMap = {
  BA : {
    buildReligion : 3,
    buildOther : 0,
    unrest : [	// Relation with other races.
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.0, 0.1, 0.1, 0.1, 0.1, 0.2, 0.1, 0.0, 0.0, 0.1, 0.1, 0.1, 0.1, 0.1
    ]
  },
  GN : {
    buildReligion : 2,
    buildOther : 0,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.0, 0.0, 0.1, 0.1, 0.2, 0.1, 0.1, 0.0, 0.0, 0.2, 0.1, 0.1, 0.0
    ]
  },
  HF : {
    buildReligion : 4,
    buildOther : 0,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0, 0.0, 0.0, 0.1, 0.2, 0.1, 0.0, 0.0
    ]
  },
  HE : {
    buildReligion : 2,
    buildOther : 1,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.1, 0.0, 0.0, 0.0, 0.2, 0.1, 0.0, 0.2, 0.2, 0.4, 0.1, 0.3, 0.3
    ]
  },
  HM : {
    buildReligion : 4,
    buildOther : 3,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.1, 0.0, 0.0, 0.0, 0.2, 0.1, 0.0, 0.0, 0.1, 0.2, 0.1, 0.0, 0.1
    ]
  },
  KL : {
    buildReligion : 1,
    buildOther : 0,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.2, 0.2, 0.2, 0.2, 0.2,-0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2
    ]
  },
  LZ : {
    buildReligion : 2,
    buildOther : 0,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.1, 0.0, 0.1, 0.1, 0.2, 0.0, 0.1, 0.1, 0.1, 0.2, 0.1, 0.1, 0.1
    ]
  },
  NO : {
    buildReligion : 4,
    buildOther : 3,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.0, 0.1, 0.0, 0.0, 0.0, 0.2, 0.1, 0.0, 0.0, 0.1, 0.2, 0.1, 0.0, 0.1
    ]
  },
  OC : {
    buildReligion : 4,
    buildOther : 3,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.0, 0.0, 0.0, 0.2, 0.0, 0.2, 0.1, 0.0, 0.0, 0.1, 0.2, 0.1, 0.3, 0.0
    ]
  },
  BE : {
    buildReligion : 4,
    buildOther : 3,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.0, 0.1, 0.2, 0.1, 0.2, 0.1, 0.1, 0.1, 0.0, 0.2, 0.2, 0.2, 0.2
    ]
  },
  DE : {
    buildReligion : 3,
    buildOther : 3,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.0, 0.2, 0.3, 0.3
    ]
  },
  DR : {
    buildReligion : 4,
    buildOther : 3,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.1, 0.1, 0.1, 0.2, 0.2, 0.0, 0.2, 0.2
    ]
  },
  DW : {
    buildReligion : 2,
    buildOther : 0,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.1, 0.0, 0.3, 0.0, 0.2, 0.1, 0.0, 0.3, 0.2, 0.3, 0.2, 0.0, 0.4
    ]
  },
  TR : {
    buildReligion : 4,
    buildOther : 1,
    unrest : [
    // BA,  GN,  HF,  HE,  HM,  KL,  LZ,  NO,  OC,  BE,  DE,  DR,  DW,  TR
      0.1, 0.0, 0.0, 0.3, 0.1, 0.2, 0.1, 0.1, 0.0, 0.2, 0.3, 0.2, 0.4, 0.0
    ]
  }
};

var raceUnrestArray = [];
indexToRace.forEach( function(uppercase) {
  raceUnrestArray.push(raceUnrestMap[uppercase]);
} );

// TODO: Differ between Animist's guild and Oracle in 'buildOther'.

// Divine/Infernal power retort = +50% of religious buildings effect.
// TODO: Variable Divine/Infernal power retort.
raceUnrestArray.forEach( function(race) {
  race.retort = (race.buildReligion * 0.5) | 0;	// Conversion to integer.
} );

// TODO: Security.