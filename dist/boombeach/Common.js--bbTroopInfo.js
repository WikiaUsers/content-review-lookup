function timeStamp_bbTroopInfo_js() {
   return "2014.06.20 15:08 (UTC-7)";
}

/*
 * Function to return all relevant troop info.
 *
 * Usage: bbTroopInfo(troop type, info type, (optional) troop level)
 *
 * Information (info type) currently provided:
 * ===========================================
 * General (information is not level-dependent)
 *
 * 'size'               (amount of space used by troop on landing craft)
 * 'training time'      (training time in seconds)
 * 'movement speed'     (in-game-reported movement speed)
 * 'attack speed'       (attack speed in seconds [healing speed for Medic])
 * 'headquarters level' (level of headquarters that unlocks the troop)
 * 'range'              (attack range [healing range for Medic])
 * 'description'        (in-game troop description)
 * 'levels'             (returns number of troop levels defined)
 *
 * Level-specific information
 * 
 * 'health'        (troop hit points)
 * 'dps'           (damage per second)
 * 'hps'           (healing per second, presently only defined on Medic and Warrior)
 * 'training cost' (training cost in gold)
 * 'armory level'  (armory required to upgrade troop to that level)
 * 'research time' (research time in hours)
 * 'research cost' (research cost in gold)
 *
 * For the level-specific information:
 * If you do not provide the 'intLevel' argument you will receive the 
 * entire array of information. Providing that argument will return a
 * single number for that particular troop level.
 */

/* Load information into global variables for performance */
var bbTroopData;

function bbTroopInfo(strTroop, strInfo, intLevel) {
   if (!(Array.isArray(bbTroopData)))
      populateBbTroopData();

   var sTroop = strTroop.toLowerCase();
   var sInfo  = (arguments.length > 1 ? strInfo.toLowerCase() : '');

   if (sTroop === 'list') {
      return bbTroopData['list'];
   }

   // No intLevel provided
   if (arguments.length === 2 && sInfo !== 'levels')
      return bbTroopData[sTroop][sInfo];

   switch (sInfo) {
      case 'levels':
         return bbTroopData[sTroop]['health'].length;
      case 'health':
      case 'dps':
      case 'hps':
      case 'training cost':
      case 'armory level':
      case 'research time':
      case 'research cost':
         return bbTroopData[sTroop][sInfo][intLevel - 1];
      default:
         return bbTroopData[sTroop][sInfo];
   }
}

/* Function called only if bbTroopData does not contain an array */
function populateBbTroopData() {
   bbTroopData         = [];
   bbTroopData['list'] = [];

   bbTroopData['list'].push('Rifleman');
   bbTroopData['rifleman'] = [];
   bbTroopData['rifleman']['size']           = 1;
   bbTroopData['rifleman']['training time']  = 60;
   bbTroopData['rifleman']['movement speed'] = 220;
   bbTroopData['rifleman']['attack speed']   = 1.0;
   bbTroopData['rifleman']['headquarters']   = 1;
   bbTroopData['rifleman']['range']          = 470;
   bbTroopData['rifleman']['description'] =
      'Rifleman at the ready! Basic infantry units, the Riflemen are able ' +
      'to deal out and withstand moderate damage. In large enough numbers, ' +
      'they are almost unstoppable.';
   bbTroopData['rifleman']['health'] = [
      140, // lv1
      150, // lv2
      160, // lv3
      172, // lv4
      184, // lv5
      196, // lv6
      210, // lv7
      225, // lv8
      241, // lv9
      257, // lv10
      275, // lv11
      295, // lv12
      315, // lv13
      337, // lv14
      361, // lv15
      386, // lv16
      413, // lv17
      442, // lv18
      473, // lv19
      506, // lv20
   ];
   bbTroopData['rifleman']['dps'] = [
       30, // lv1
       32, // lv2
       35, // lv3
       38, // lv4
       41, // lv5
       44, // lv6
       48, // lv7
       52, // lv8
       56, // lv9
       61, // lv10
       66, // lv11
       71, // lv12
       77, // lv13
       84, // lv14
       90, // lv15
       98, // lv16
      106, // lv17
      115, // lv18
      124, // lv19
      134, // lv20
   ];
   bbTroopData['rifleman']['training cost'] = [
        20, // lv1
        50, // lv2
       100, // lv3
       150, // lv4
       300, // lv5
       400, // lv6
       500, // lv7
       600, // lv8
       700, // lv9
       800, // lv10
       900, // lv11
      1000, // lv12
      1100, // lv13
      1200, // lv14
      1300, // lv15
      1400, // lv16
      1500, // lv17
      1600, // lv18
      1700, // lv19
      1800, // lv20
   ];
   bbTroopData['rifleman']['armory level'] = [
       0, // lv1
       1, // lv2
       2, // lv3
       3, // lv4
       4, // lv5
       5, // lv6
       6, // lv7
       7, // lv8
       8, // lv9
       9, // lv10
      10, // lv11
      11, // lv12
      12, // lv13
      13, // lv14
      14, // lv15
      15, // lv16
      16, // lv17
      17, // lv18
      18, // lv19
      19, // lv20
   ];
   bbTroopData['rifleman']['research time'] = [
       0, // lv1
       2, // lv2
       3, // lv3
       6, // lv4
       9, // lv5
      14, // lv6
      19, // lv7
      25, // lv8
      28, // lv9
      28, // lv10
      31, // lv11
      38, // lv12
      45, // lv13
      45, // lv14
      56, // lv15
      62, // lv16
      66, // lv17
      70, // lv18
      72, // lv19
      76, // lv20
   ];
   bbTroopData['rifleman']['research cost'] = [
            0, // lv1
         9500, // lv2
        19500, // lv3
        42000, // lv4
        83000, // lv5
       140000, // lv6
       236000, // lv7
       370000, // lv8
       540000, // lv9
       630000, // lv10
       710000, // lv11
       970000, // lv12
      1320000, // lv13
      1500000, // lv14
      1800000, // lv15
      2480000, // lv16
      2850000, // lv17
      3200000, // lv18
      3800000, // lv19
      4400000, // lv20
   ];

   bbTroopData['list'].push('Heavy');
   bbTroopData['heavy'] = [];
   bbTroopData['heavy']['size']           = 4;
   bbTroopData['heavy']['training time']  = 240;
   bbTroopData['heavy']['movement speed'] = 230;
   bbTroopData['heavy']['attack speed']   = 0.2;
   bbTroopData['heavy']['headquarters']   = 2;
   bbTroopData['heavy']['range']          = 330;
   bbTroopData['heavy']['description'] =
      "The Heavy can absorb a lot of damage and still keep on moving forward. He's " +
      "happy to draw all the attention, and will take a punch to give a punch!";
   bbTroopData['heavy']['health'] = [
      1000, // lv1
      1080, // lv2
      1166, // lv3
      1260, // lv4
      1360, // lv5
      1469, // lv6
      1587, // lv7
      1714, // lv8
      1851, // lv9
      1999, // lv10
      2159, // lv11
      2332, // lv12
      2518, // lv13
      2720, // lv14
      2937, // lv15
      3172, // lv16
      3426, // lv17
      3700, // lv18
      3996, // lv19
      4316, // lv20
   ];
   bbTroopData['heavy']['dps'] = [
       26, // lv1
       28, // lv2
       31, // lv3
       33, // lv4
       36, // lv5
       40, // lv6
       44, // lv7
       46, // lv8
       52, // lv9
       56, // lv10
       62, // lv11
       67, // lv12
       69, // lv13
       80, // lv14
       87, // lv15
       95, // lv16
      103, // lv17
      104, // lv18
      113, // lv19
      123, // lv20
   ];
   bbTroopData['heavy']['training cost'] = [
        300, // lv1
        500, // lv2
        800, // lv3
       1100, // lv4
       1300, // lv5
       1700, // lv6
       2100, // lv7
       2500, // lv8
       3000, // lv9
       3500, // lv10
       4000, // lv11
       4500, // lv12
       5000, // lv13
       5500, // lv14
       6000, // lv15
       6500, // lv16
       7000, // lv17
       8000, // lv18
       9000, // lv19
      10000, // lv20
   ];
   bbTroopData['heavy']['research cost'] = [
            0, // lv1
        10400, // lv2
        21800, // lv3
        47000, // lv4
        94000, // lv5
       159000, // lv6
       268000, // lv7
       420000, // lv8
       610000, // lv9
       720000, // lv10
       800000, // lv11
      1100000, // lv12
      1500000, // lv13
      1700000, // lv14
      2040000, // lv15
      2810000, // lv16
      3200000, // lv17
      3600000, // lv18
      4300000, // lv19
      5600000, // lv20
   ];
   bbTroopData['heavy']['armory level'] = [
       0, // lv1
       1, // lv2
       2, // lv3
       3, // lv4
       4, // lv5
       5, // lv6
       6, // lv7
       7, // lv8
       8, // lv9
       9, // lv10
      10, // lv11
      11, // lv12
      12, // lv13
      13, // lv14
      14, // lv15
      15, // lv16
      16, // lv17
      17, // lv18
      18, // lv19
      19, // lv20
   ];
   bbTroopData['heavy']['research time'] = [
       0, // lv1
       3, // lv2
       4, // lv3
       7, // lv4
      11, // lv5
      15, // lv6
      21, // lv7
      28, // lv8
      32, // lv9
      32, // lv10
      35, // lv11
      44, // lv12
      51, // lv13
      51, // lv14
      64, // lv15
      70, // lv16
      68, // lv17
      79, // lv18
      82, // lv19
      86, // lv20
   ];

   bbTroopData['list'].push('Zooka');
   bbTroopData['zooka'] = [];
   bbTroopData['zooka']['size']           = 2;
   bbTroopData['zooka']['training time']  = 240;
   bbTroopData['zooka']['movement speed'] = 180;
   bbTroopData['zooka']['attack speed']   = 1;
   bbTroopData['zooka']['headquarters']   = 5;
   bbTroopData['zooka']['range']          = 720;
   bbTroopData['zooka']['description'] =
      "For long-range attacks, call in the Zooka. A few Zookas can completely devastate " +
      "a whole enemy base, but don't let them come under fire from enemy turrets!";
   bbTroopData['zooka']['health'] = [
       50, // lv1
       54, // lv2
       59, // lv3
       67, // lv4
       70, // lv5
       76, // lv6
       83, // lv7
       90, // lv8
       98, // lv9
      107, // lv10
      116, // lv11
      126, // lv12
      138, // lv13
      150, // lv14
      163, // lv15
      177, // lv16
      193, // lv17
      210, // lv18
      228, // lv19
      248, // lv20
   ];
   bbTroopData['zooka']['dps'] = [
       80, // lv1
       88, // lv2
       97, // lv3
      106, // lv4
      117, // lv5
      129, // lv6
      142, // lv7
      156, // lv8
      171, // lv9
      189, // lv10
      207, // lv11
      228, // lv12
      251, // lv13
      276, // lv14
      304, // lv15
      334, // lv16
      368, // lv17
      404, // lv18
      445, // lv19
      489, // lv20
   ];
   bbTroopData['zooka']['training cost'] = [
       220, // lv1
       330, // lv2
       450, // lv3
       600, // lv4
       800, // lv5
      1000, // lv6
      1200, // lv7
      1400, // lv8
      1600, // lv9
      1800, // lv10
      2000, // lv11
      2200, // lv12
      2400, // lv13
      2600, // lv14
      2800, // lv15
      3000, // lv16
      3300, // lv17
      3600, // lv18
      3900, // lv19
      4200, // lv20
   ];
   bbTroopData['zooka']['research cost'] = [
            0, // lv1
        17100, // lv2
        46000, // lv3
        99000, // lv4
       168000, // lv5
       284000, // lv6
       450000, // lv7
       650000, // lv8
       760000, // lv9
       850000, // lv10
      1160000, // lv11
      1540000, // lv12
      1800000, // lv13
      2160000, // lv14
      2970000, // lv15
      3400000, // lv16
      3800000, // lv17
      4500000, // lv18
      5300000, // lv19
      6100000, // lv20
   ];
   bbTroopData['zooka']['armory level'] = [
      0, // lv1
      2, // lv2
      3, // lv3
      4, // lv4
      5, // lv5
      6, // lv6
      7, // lv7
      8, // lv8
      9, // lv9
     10, // lv10
     11, // lv11
     12, // lv12
     13, // lv13
     14, // lv14
     15, // lv15
     16, // lv16
     17, // lv17
     18, // lv18
     19, // lv19
     20, // lv20
   ];
   bbTroopData['zooka']['research time'] = [
        0, // lv1
        4, // lv2
        9, // lv3
       12, // lv4
       18, // lv5
       25, // lv6
       33, // lv7
       37, // lv8
       37, // lv9
       41, // lv10
       51, // lv11
       60, // lv12
       60, // lv13
       75, // lv14
       83, // lv15
       83, // lv16
       93, // lv17
       96, // lv18
      102, // lv19
      104, // lv20
   ];

   bbTroopData['list'].push('Warrior');
   bbTroopData['warrior'] = [];
   bbTroopData['warrior']['size']           = 3;
   bbTroopData['warrior']['training time']  = 180;
   bbTroopData['warrior']['movement speed'] = 300;
   bbTroopData['warrior']['attack speed']   = 1;
   bbTroopData['warrior']['headquarters']   = 8;
   bbTroopData['warrior']['range']          = 90;
   bbTroopData['warrior']['description'] =
      "The Tribal Warrior is an awesome sight in battle. He charges fearlessly, knowing " +
      "that his Crystal Hammer will heal him with every blow.";
   bbTroopData['warrior']['health'] = [
       400, // lv1
       424, // lv2
       449, // lv3
       475, // lv4
       503, // lv5
       533, // lv6
       564, // lv7
       597, // lv8
       633, // lv9
       670, // lv10
       710, // lv11
       751, // lv12
       796, // lv13
       843, // lv14
       892, // lv15
       945, // lv16
      1001, // lv17
      1060, // lv18
   ];
   bbTroopData['warrior']['dps'] = [
      160, // lv1
      169, // lv2
      179, // lv3
      189, // lv4
      200, // lv5
      212, // lv6
      224, // lv7
      237, // lv8
      251, // lv9
      266, // lv10
      281, // lv11
      297, // lv12
      315, // lv13
      333, // lv14
      352, // lv15
      373, // lv16
      394, // lv17
      417, // lv18
   ];
   bbTroopData['warrior']['hps'] = [
      40, // lv1
      42, // lv2
      44, // lv3
      46, // lv4
      48, // lv5
      50, // lv6
      52, // lv7
      54, // lv8
      56, // lv9
      58, // lv10
      60, // lv11
      62, // lv12
      64, // lv13
      66, // lv14
      68, // lv15
      70, // lv16
      72, // lv17
      74, // lv18
   ];
   bbTroopData['warrior']['training cost'] = [
      1000, // lv1
      1200, // lv2
      1400, // lv3
      1600, // lv4
      1800, // lv5
      2000, // lv6
      2200, // lv7
      2400, // lv8
      2700, // lv9
      3000, // lv10
      3300, // lv11
      3600, // lv12
      3900, // lv13
      4200, // lv14
      4500, // lv15
      4800, // lv16
      5200, // lv17
      5600, // lv18
   ];
   bbTroopData['warrior']['research cost'] = [
            0, // lv1
       155000, // lv2
       294000, // lv3
       470000, // lv4
       680000, // lv5
       800000, // lv6
       900000, // lv7
      1230000, // lv8
      1680000, // lv9
      1900000, // lv10
      2280000, // lv11
      3140000, // lv12
      3600000, // lv13
      4000000, // lv14
      4500000, // lv15
      4800000, // lv16
      5600000, // lv17
      6400000, // lv18
   ];
   bbTroopData['warrior']['armory level'] = [
      0, // lv1
      5, // lv2
      6, // lv3
      7, // lv4
      8, // lv5
      9, // lv6
     10, // lv7
     11, // lv8
     12, // lv9
     13, // lv10
     14, // lv11
     15, // lv12
     16, // lv13
     17, // lv14
     17, // lv15
     18, // lv16
     19, // lv17
     20, // lv18
   ];
   bbTroopData['warrior']['research time'] = [
        0, // lv1
       18, // lv2
       25, // lv3
       33, // lv4
       37, // lv5
       37, // lv6
       41, // lv7
       51, // lv8
       60, // lv9
       60, // lv10
       75, // lv11
       83, // lv12
       83, // lv13
       93, // lv14
       93, // lv15
       96, // lv16
      102, // lv17
      104, // lv18
   ];

   bbTroopData['list'].push('Tank');
   bbTroopData['tank'] = [];
   bbTroopData['tank']['size']           = 8;
   bbTroopData['tank']['training time']  = 2160;
   bbTroopData['tank']['movement speed'] = 150;
   bbTroopData['tank']['attack speed']   = 2;
   bbTroopData['tank']['headquarters']   = 11;
   bbTroopData['tank']['range']          = 850;
   bbTroopData['tank']['description'] =
      "With its powerful gun and thick armor, the Tank is a real war machine! Due to " +
      "its weight, each Tank needs extra Energy to land ashore. Cannons, Boom Cannons " +
      "and Boom Mines deal double damage to Tanks.";
   bbTroopData['tank']['health'] = [
      2300, // lv1
      2484, // lv2
      2683, // lv3
      2897, // lv4
      3129, // lv5
      3379, // lv6
      3650, // lv7
      3942, // lv8
      4257, // lv9
      4598, // lv10
      4966, // lv11
      5363, // lv12
      5792, // lv13
      6255, // lv14
      6756, // lv15
   ];
   bbTroopData['tank']['dps'] = [
      130, // lv1
      142, // lv2
      154, // lv3
      168, // lv4
      184, // lv5
      200, // lv6
      218, // lv7
      238, // lv8
      259, // lv9
      282, // lv10
      308, // lv11
      335, // lv12
      366, // lv13
      399, // lv14
      434, // lv15
   ];
   bbTroopData['tank']['training cost'] = [
      10000, // lv1
      11000, // lv2
      12000, // lv3
      13000, // lv4
      14500, // lv5
      16000, // lv6
      17500, // lv7
      19000, // lv8
      20500, // lv9
      22000, // lv10
      23500, // lv11
      25000, // lv12
      26500, // lv13
      28000, // lv14
      30000, // lv15
   ];
   bbTroopData['tank']['research cost'] = [
            0, // lv1
       620000, // lv2
      1030000, // lv3
      1890000, // lv4
      2540000, // lv5
      2570000, // lv6
      3900000, // lv7
      5300000, // lv8
      5300000, // lv9
      5400000, // lv10
      6300000, // lv11
      7300000, // lv12
      7400000, // lv13
      7500000, // lv14
      7600000, // lv15
   ];
   bbTroopData['tank']['armory level'] = [
      0, // lv1
      9, // lv2
     10, // lv3
     11, // lv4
     12, // lv5
     13, // lv6
     14, // lv7
     15, // lv8
     15, // lv9
     16, // lv10
     17, // lv11
     18, // lv12
     19, // lv13
     20, // lv14
     20, // lv15
   ];
   bbTroopData['tank']['research time'] = [
        0, // lv1
       47, // lv2
       52, // lv3
       64, // lv4
       76, // lv5
       76, // lv6
       94, // lv7
      103, // lv8
      103, // lv9
      103, // lv10
      116, // lv11
      120, // lv12
      127, // lv13
      130, // lv14
      130, // lv15
   ];

   bbTroopData['list'].push('Medic');
   bbTroopData['medic'] = [];
   bbTroopData['medic']['size']           = 5;
   bbTroopData['medic']['training time']  = 600;
   bbTroopData['medic']['movement speed'] = 270;
   bbTroopData['medic']['attack speed']   = 1;
   bbTroopData['medic']['headquarters']   = 15;
   bbTroopData['medic']['range']          = 400;
   bbTroopData['medic']['description'] =
      "Make love, not war! The Medic is opposed to all kinds of violence. Instead of " +
      "grabbing a rifle, he heals other troops to help our cause.";
   bbTroopData['medic']['health'] = [
       500, // lv1
       544, // lv2
       592, // lv3
       644, // lv4
       701, // lv5
       762, // lv6
       829, // lv7
       902, // lv8
       982, // lv9
      1068, // lv10
      1162, // lv11
   ];
   bbTroopData['medic']['hps'] = [
      20, // lv1
      21, // lv2
      22, // lv3
      23, // lv4
      24, // lv5
      25, // lv6
      26, // lv7
      27, // lv8
      28, // lv9
      29, // lv10
      30, // lv11
   ];
   bbTroopData['medic']['training cost'] = [
       5000, // lv1
       6000, // lv2
       7000, // lv3
       8000, // lv4
       9000, // lv5
      10000, // lv6
      11000, // lv7
      12000, // lv8
      13000, // lv9
      14000, // lv10
      15000, // lv11
   ];
   bbTroopData['medic']['research cost'] = [
            0, // lv1
      1680000, // lv2
      2740000, // lv3
      3300000, // lv4
      3400000, // lv5
      3800000, // lv6
      4500000, // lv7
      4800000, // lv8
      5300000, // lv9
      6100000, // lv10
      6400000, // lv11
   ];
   bbTroopData['medic']['armory level'] = [
      0, // lv1
     14, // lv2
     15, // lv3
     15, // lv4
     16, // lv5
     17, // lv6
     18, // lv7
     18, // lv8
     19, // lv9
     20, // lv10
     20, // lv11
   ];
   bbTroopData['medic']['research time'] = [
        0, // lv1
       83, // lv2
       91, // lv3
       91, // lv4
       91, // lv5
      102, // lv6
      106, // lv7
      106, // lv8
      112, // lv9
      114, // lv10
      114, // lv11
   ];
}