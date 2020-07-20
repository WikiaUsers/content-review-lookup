function timeStamp_BuildingInfo_js() {
   return "2017.10.17 17:47 (UTC-7)";
}

/*
 * Function to return all relevant building info.
 *
 * Usage: buildingInfo(building type, info type, (optional) building level/mode)
 *
 * Information (info type) currently provided:
 * ===========================================
 * General (information is not level-dependent)
 *
 * 'type'              (Defense, Resource, Army or Other)
 * 'modes'             (Descriptions of various modes, 'None' if only one mode)
 * 'preferred target'  (Which unit the building will attack, and receive its multiplier for)
 * 'multiplier'        (Damage multiplier vs. preferred target)
 * 'boost duration'    (number of hours a gem boost lasts)
 * 'boost multiplier'  (how much the boost affects the operation of the building)
 * 'ground attack'     (whether a defense can attack ground targets (true/false))
 * 'air attack'        (whether a defense can attack air targets (true/false))
 * 'number of targets' (number of individual units the defense can attack --
 *                      defenses like the mortar and wizard tower only attack one individual unit
 *                      but cause splash damage to units around that target. Inferno towers are
 *                      currently the only unit that can attack more than one unit simultaneously)
 * 'number of rounds'  (0 for unlimited)
 * 'rounds per burst'  (how many shots in a single burst - for geared cannon and eagle)
 * 'splash radius'     (tile radius of splash damage; -1 for single target)
 * 'size'              (amount of space required for the building -- format: '3x3')
 * 'attack speed'      (attack speed in seconds)
 * 'range'             (attack range, <= 1 is considered melee)
 * 'minimum range'     (minimum range for defense to shoot (like mortar))
 * 'trigger range'     (only for traps, hidden tesla and clan castle)
 * 'description'       (in-game building description)
 * 'levels'            (returns number of building levels defined -- not explicitly defined)
 *
 * For buildings that have multiple modes, supply a 'mode' (0 or 1) to get the various statistics.
 * Modes:
 *   X-Bow (mode 0):         ground only
 *   X-Bow (mode 1):         air and ground
 *   Inferno Tower (mode 0): single target
 *   Inferno Tower (mode 1): multiple target
 *   Cannon (mode 0):        normal
 *   Cannon (mode 1):        burst fire (geared up)
 *   Archer Tower (mode 0):  long range
 *   Archer Tower (mode 1):  fast attack (geared up)
 *
 * Town Hall level-specific information
 * 'number available'   (number available at each TOWN HALL level [NOT building level])
 *
 * Building level-specific information
 * 
 * 'dps'                (damage per second)
 * 'hitpoints'          (building hit points)
 * 'required town hall' (town hall required to upgrade building to that level)
 * 'boost cost'         (boost cost in gems for those buildings that allow it, -1 if it does not)
 * 'upgrade time'       (build time in seconds for level 1, upgrade time in seconds for level 2+)
 * 'housing space'      (for army camp, clan castle and spring trap only)
 * 'spell storage'      (for spell factory, dark spell factory and clan castle only)
 * 'push strength'      (for air sweeper only)
 * 'death damage'       (for bomb tower only)
 * 
 * For all resource-related information: all statistics are in a triple-array format:
 *   [gold, elixir, dark elixir]
 * If a single number is used, that single number refers to gems, not any standard resource.
 *
 * 'capacity'           (maximum amount of storage capacity for that resource)
 * 'production'         (production per hour of that resource)
 * 'upgrade cost'       (build cost for level 1, upgrade cost for level 2+)
 * 'rearm cost'         (for traps and limited-ammunition turrets)
 * 
 * For the level-specific information:
 * If you do not provide the 'intLevel' argument you will receive the 
 * entire array of information. Providing that argument will return a
 * single number for that particular building level.
 *
 * To return a simple list of buildings, provide a first argument of 'list'.
 * You can filter the list with the following second arguments:
 *   'defense'           for defensive-related buildings (not including traps)
 *   'army'              for offensive-related buildings
 *   'resource'          for resource-related buildings
 *   'other'             for other buildings
 *   'traps'             for traps
 *   'unavailable[ <x>]' for formerly-available buildings, traps, etc.
 *   'all[ <x>]'         for all buildings, traps, etc. regardless of status
 */

/* Load information into global variables for performance */
var buildingData;

function buildingInfo(strBuilding, strInfo, intLevel, intMode) {
   if (!(Array.isArray(buildingData)))
      populateBuildingData();

   var sBuilding = strBuilding.toLowerCase();
   var sInfo     = (arguments.length > 1 ? strInfo.toLowerCase() : '');

   if (sBuilding === 'list') {
      var criteria    = [];
      var value       = [];
      var available   = true;
      var unavailable = false;
      
      if (sInfo.substring(0, 12) === 'unavailable ') {
         unavailable = true;
         available   = false;
         sInfo = sInfo.substring(12);
      }
      else if (sInfo.substring(0, 4) === 'all ') {
         unavailable = true;
         sInfo = sInfo.substring(4);
      }

      switch (sInfo) {
         case 'defense':
            criteria = ['type'  ];
            value    = ['Defense'];
            break;
         case 'army':
            criteria = ['type'];
            value    = ['Army'];
            break;
         case 'resource':
            criteria = ['type'    ];
            value    = ['Resource'];
            break;
         case 'other':
            criteria = ['type' ];
            value    = ['Other'];
            break;
         case 'trap':
            criteria = ['type'];
            value    = ['Trap'];
            break;
      }

      if (unavailable && !available) {
         criteria.push('available');
         value.push(false);
      }
      else if (!unavailable && available) {
         criteria.push('available');
         value.push(true);
      }
      
      var retData = [];
      var bData   = buildingData['list'];

      for (var i = 0; i < bData.length; i ++) {
         var include = true;

         for (var j = 0; j < criteria.length; j ++) {
            // Be careful here, we're calling ourselves -- don't pass 'list' as an argument!
            if (buildingInfo(bData[i], criteria[j]) !== value[j]) {
               include = false;
               break;
            }
         }

         if (include)
            retData.push(bData[i]);
      }

      return safe(retData);
   }
   else if (sBuilding === 'number available') {
      // Remove any spaces and quotation marks
      sInfo = sInfo.replace(/["' ]/g,'');
      
      if (arguments.length === 2)
         return safe(buildingData[sBuilding][sInfo]);
      else
         return safe(buildingData[sBuilding][sInfo][intLevel - 1]);
   }

   // Remove any spaces and quotation marks
   sBuilding = sBuilding.replace(/["' ]/g,'');

   // No intLevel provided (let 'levels' fall through)
   if (arguments.length === 2 && sInfo !== 'levels')
      return safe(buildingData[sBuilding][sInfo]);

   switch (sInfo) {
      case 'levels':
         return safe(buildingData[sBuilding]['hitpoints'].length);
      case 'number available':
         return safe(buildingData[sInfo][sBuilding][intLevel - 1]);
      case 'capacity':
      case 'production':
      case 'upgrade cost':
      case 'rearm cost':
         // These are the resource-related attributes...all should be arrays.
         // Currently we assume that mode does not affect costs, or else players
         // could upgrade or re-arm buildings in the cheaper mode and then
         // switch to the more expensive mode.
         return safe(buildingData[sBuilding][sInfo][intLevel - 1]);
      case 'dps':
      case 'hitpoints':
      case 'required town hall':
      case 'boost cost':
      case 'upgrade time':
      case 'housing space':
      case 'spell storage':
      case 'push strength':
      case 'subtroops':
      case 'max subtroops':
         var retVal = buildingData[sBuilding][sInfo][intLevel - 1];

         if (Array.isArray(retVal) && arguments.length > 3)
            return safe(retVal[intMode]);
         else
            return safe(retVal);
      default:
         var retVal = buildingData[sBuilding][sInfo];

         // The Giant Bomb is the only building (currently) whose splash radius changes with level
         if (sBuilding === 'giantbomb' && sInfo === 'splash radius') {
            if (arguments.length > 2)
               return safe(retVal[intLevel - 1]);
            else
               return safe(retVal);
         }

         if (Array.isArray(retVal) && arguments.length > 3)
            return safe(retVal[intMode]);
         else
            return safe(retVal);
   }

   function safe(val) {
      return (Array.isArray(val) ? $.extend(true, [], val) : val);
   }
}

/* Function called only if buildingData does not contain an array */
function populateBuildingData() {
   buildingData                     = [];
   buildingData['list']             = [];
   buildingData['number available'] = [];

   // *********************************
   // *          Town Hall            *
   // *********************************
   buildingData['list'].push('Town Hall');
   buildingData['number available']['townhall'] = [ 
      1, // Town Hall Level 1
      1, // Town Hall Level 2
      1, // Town Hall Level 3
      1, // Town Hall Level 4
      1, // Town Hall Level 5
      1, // Town Hall Level 6
      1, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['townhall'] = [];
   buildingData['townhall']['type']              = "Other";
   buildingData['townhall']['available']         = true;
   buildingData['townhall']['modes']             = "None";
   buildingData['townhall']['preferred target']  = "None";
   buildingData['townhall']['multiplier']        = 0;
   buildingData['townhall']['boost duration']    = 0;
   buildingData['townhall']['boost multiplier']  = 1;
   buildingData['townhall']['ground attack']     = false;
   buildingData['townhall']['air attack']        = false;
   buildingData['townhall']['number of targets'] = 0;
   buildingData['townhall']['number of rounds']  = 0;
   buildingData['townhall']['splash radius']     = -1;
   buildingData['townhall']['size']              = '4x4';
   buildingData['townhall']['attack speed']      = 0;
   buildingData['townhall']['range']             = 0;
   buildingData['townhall']['minimum range']     = 0;
   buildingData['townhall']['trigger range']     = 0;
   buildingData['townhall']['description'] =
      'This is the heart of your village. Upgrading your Town Hall unlocks new defenses, ' +
      'buildings, traps and much more.';
   buildingData['townhall']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
   ];
   buildingData['townhall']['hitpoints'] = [
      450, // Level 1
      1600, // Level 2
      1850, // Level 3
      2100, // Level 4
      2400, // Level 5
      2800, // Level 6
      3200, // Level 7
      3900, // Level 8
      4600, // Level 9
      5500, // Level 10
      6800, // Level 11
   ];
   buildingData['townhall']['required town hall'] = [
      0, // Level 1
      1, // Level 2
      2, // Level 3
      3, // Level 4
      4, // Level 5
      5, // Level 6
      6, // Level 7
      7, // Level 8
      8, // Level 9
      9, // Level 10
      10, // Level 11
   ];
   buildingData['townhall']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
      -1, // Level 10
      -1, // Level 11
   ];
   buildingData['townhall']['upgrade time'] = [
            0, // Level 1
           10, // Level 2
        10800, // Level 3
        86400, // Level 4
       172800, // Level 5
       345600, // Level 6
       518400, // Level 7
       691200, // Level 8
       864000, // Level 9
      1036800, // Level 10
      1209600, // Level 11
   ];
   buildingData['townhall']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
   ];
   buildingData['townhall']['capacity'] = [
      [1000, 1000, 0], // Level 1
      [1000, 1000, 0], // Level 2
      [10000, 10000, 0], // Level 3
      [50000, 50000, 0], // Level 4
      [100000, 100000, 0], // Level 5
      [300000, 300000, 0], // Level 6
      [500000, 500000, 2500], // Level 7
      [750000, 750000, 5000], // Level 8
      [1000000, 1000000, 10000], // Level 9
      [1500000, 1500000, 20000], // Level 10
      [2000000, 2000000, 20000], // Level 11
   ];
   buildingData['townhall']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
   ];
   buildingData['townhall']['upgrade cost'] = [
      [      0, 0, 0], // Level 1
      [   1000, 0, 0], // Level 2
      [   4000, 0, 0], // Level 3
      [  25000, 0, 0], // Level 4
      [ 150000, 0, 0], // Level 5
      [ 750000, 0, 0], // Level 6
      [1200000, 0, 0], // Level 7
      [2000000, 0, 0], // Level 8
      [3000000, 0, 0], // Level 9
      [5000000, 0, 0], // Level 10
      [7000000, 0, 0], // Level 11]
   ];
   buildingData['townhall']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
   ];

   // *********************************
   // *         Clan Castle           *
   // *********************************
   buildingData['list'].push('Clan Castle');
   buildingData['number available']['clancastle'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      1, // Town Hall Level 3
      1, // Town Hall Level 4
      1, // Town Hall Level 5
      1, // Town Hall Level 6
      1, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['clancastle'] = [];
   buildingData['clancastle']['type']              = "Other";
   buildingData['clancastle']['available']         = true;
   buildingData['clancastle']['modes']             = "None";
   buildingData['clancastle']['preferred target']  = "None";
   buildingData['clancastle']['multiplier']        = 0;
   buildingData['clancastle']['boost duration']    = 0;
   buildingData['clancastle']['boost multiplier']  = 1;
   buildingData['clancastle']['ground attack']     = false;
   buildingData['clancastle']['air attack']        = false;
   buildingData['clancastle']['number of targets'] = 0;
   buildingData['clancastle']['number of rounds']  = 0;
   buildingData['clancastle']['splash radius']     = -1;
   buildingData['clancastle']['size']              = '3x3';
   buildingData['clancastle']['attack speed']      = 0;
   buildingData['clancastle']['range']             = 0;
   buildingData['clancastle']['minimum range']     = 0;
   buildingData['clancastle']['trigger range']     = 12;
   buildingData['clancastle']['description'] =
      'The Clan Castle houses any reinforcement troops sent by your clanmates. ' +
      'Bonus loot won in Clan Wars is automatically stored in the Clan Castle ' +
      'at the end of every war.';
   buildingData['clancastle']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
   ];
   buildingData['clancastle']['hitpoints'] = [
      1000, // Level 1
      1400, // Level 2
      2000, // Level 3
      2600, // Level 4
      3000, // Level 5
      3400, // Level 6
      3800, // Level 7
   ];
   buildingData['clancastle']['required town hall'] = [
       3, // Level 1
       4, // Level 2
       6, // Level 3
       8, // Level 4
       9, // Level 5
      10, // Level 6
      11, // Level 7
   ];
   buildingData['clancastle']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
   ];
   buildingData['clancastle']['upgrade time'] = [
            0, // Level 1
        21600, // Level 2
        86400, // Level 3
       172800, // Level 4
       518400, // Level 5
       864000, // Level 6
      1209600, // Level 7 
   ];
   buildingData['clancastle']['housing space'] = [
      10, // Level 1
      15, // Level 2
      20, // Level 3
      25, // Level 4
      30, // Level 5
      35, // Level 6
      35, // Level 7
   ];
   buildingData['clancastle']['capacity'] = [
      [0,0,0], // Level 1
      [0,0,0], // Level 2
      [0,0,0], // Level 3
      [0,0,0], // Level 4
      [0,0,0], // Level 5
      [0,0,0], // Level 6
      [0,0,0], // Level 7
   ];
   buildingData['clancastle']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
   ];
   buildingData['clancastle']['upgrade cost'] = [
      [  10000, 0, 0], // Level 1
      [ 100000, 0, 0], // Level 2
      [ 800000, 0, 0], // Level 3
      [1800000, 0, 0], // Level 4
      [4000000, 0, 0], // Level 5
      [7000000, 0, 0], // Level 6
      [10000000, 0, 0], // Level 7
   ];
   buildingData['clancastle']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
   ];
   buildingData['clancastle']['spell storage'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      1, // Level 4
      1, // Level 5
      1, // Level 6
      2, // Level 7
   ];

   // *********************************
   // *         Builder's Hut         *
   // *********************************
   buildingData['list'].push('Builder\'s Hut');
   buildingData['number available']['buildershut'] = [ 
      5, // Town Hall Level 1
      5, // Town Hall Level 2
      5, // Town Hall Level 3
      5, // Town Hall Level 4
      5, // Town Hall Level 5
      5, // Town Hall Level 6
      5, // Town Hall Level 7
      5, // Town Hall Level 8
      5, // Town Hall Level 9
      5, // Town Hall Level 10
      5, // Town Hall Level 11
   ];
   buildingData['buildershut'] = [];
   buildingData['buildershut']['type']              = "Other";
   buildingData['buildershut']['available']         = true;
   buildingData['buildershut']['modes']             = "None";
   buildingData['buildershut']['preferred target']  = "None";
   buildingData['buildershut']['multiplier']        = 0;
   buildingData['buildershut']['boost duration']    = 0;
   buildingData['buildershut']['boost multiplier']  = 1;
   buildingData['buildershut']['ground attack']     = false;
   buildingData['buildershut']['air attack']        = false;
   buildingData['buildershut']['number of targets'] = 0;
   buildingData['buildershut']['number of rounds']  = 0;
   buildingData['buildershut']['splash radius']     = -1;
   buildingData['buildershut']['size']              = '2x2';
   buildingData['buildershut']['attack speed']      = 0;
   buildingData['buildershut']['range']             = 0;
   buildingData['buildershut']['minimum range']     = 0;
   buildingData['buildershut']['trigger range']     = 0;
   buildingData['buildershut']['description'] =
      'Nothing gets done around here without Builders! You can hire more Builders to ' +
      'start multiple construction projects, or speed up their work by using green gems.';
   buildingData['buildershut']['dps'] = [ 
      0, // Level 1
   ];
   buildingData['buildershut']['hitpoints'] = [
      250, // Level 1
   ];
   buildingData['buildershut']['required town hall'] = [
      1, // Level 1
   ];
   buildingData['buildershut']['boost cost'] = [
      -1, // Level 1
   ];
   buildingData['buildershut']['upgrade time'] = [
      0, // Level 1
   ];
   buildingData['buildershut']['housing space'] = [
      0, // Level 1
   ];
   buildingData['buildershut']['capacity'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['buildershut']['production'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['buildershut']['upgrade cost'] = [
      '0|250|500|1000|2000', // Level 1
   ];
   buildingData['buildershut']['rearm cost'] = [
      [0, 0, 0], // Level 1
   ];

   // *********************************
   // *            Cannon             *
   // *********************************
   buildingData['list'].push('Cannon');
   buildingData['number available']['cannon'] = [ 
      2, // Town Hall Level 1
      2, // Town Hall Level 2
      2, // Town Hall Level 3
      2, // Town Hall Level 4
      3, // Town Hall Level 5
      3, // Town Hall Level 6
      5, // Town Hall Level 7
      5, // Town Hall Level 8
      5, // Town Hall Level 9
      6, // Town Hall Level 10
      7, // Town Hall Level 11
   ];
   buildingData['cannon'] = [];
   buildingData['cannon']['type']              = "Defense";
   buildingData['cannon']['available']         = true;
   buildingData['cannon']['modes']             = ["Normal","Burst"];
   buildingData['cannon']['preferred target']  = "None";
   buildingData['cannon']['multiplier']        = 1;
   buildingData['cannon']['boost duration']    = 0;
   buildingData['cannon']['boost multiplier']  = 1;
   buildingData['cannon']['ground attack']     = true;
   buildingData['cannon']['air attack']        = false;
   buildingData['cannon']['number of targets'] = 1;
   buildingData['cannon']['number of rounds']  = 0;
   buildingData['cannon']['splash radius']     = -1;
   buildingData['cannon']['size']              = '3x3';
   buildingData['cannon']['attack speed']      = [0.8,0.4];
   buildingData['cannon']['range']             = [9,7];
   buildingData['cannon']['minimum range']     = 0;
   buildingData['cannon']['trigger range']     = 0;
   buildingData['cannon']['description'] =
      'Cannons are great for point defense. Upgrade cannons to increase their firepower, ' +
      'but beware that your defensive turrets cannot shoot while being upgraded!';
   buildingData['cannon']['dps'] = [ 
      [9,-1], // Level 1
      [11,-1], // Level 2
      [15,-1], // Level 3
      [19,-1], // Level 4
      [25,-1], // Level 5
      [31,-1], // Level 6
      [40,80], // Level 7
      [48,96], // Level 8
      [56,112], // Level 9
      [65,130], // Level 10
      [80,160], // Level 11
      [95,190], // Level 12
      [110,220], // Level 13
      [120,240], // Level 14
      [130,260], // Level 15
   ];
   buildingData['cannon']['hitpoints'] = [
       420, // Level 1
       470, // Level 2
       520, // Level 3
       570, // Level 4
       620, // Level 5
       670, // Level 6
       730, // Level 7
       800, // Level 8
       880, // Level 9
       960, // Level 10
      1060, // Level 11
      1160, // Level 12
      1260, // Level 13
      1380, // Level 14
      1500, // Level 15
   ];
   buildingData['cannon']['required town hall'] = [
       1, // Level 1
       1, // Level 2
       2, // Level 3
       3, // Level 4
       4, // Level 5
       5, // Level 6
       6, // Level 7
       7, // Level 8
       8, // Level 9
       8, // Level 10
       9, // Level 11
      10, // Level 12
      10, // Level 13
      11, // Level 14
      11, // Level 15
   ];
   buildingData['cannon']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
      -1, // Level 10
      -1, // Level 11
      -1, // Level 12
      -1, // Level 13
      -1, // Level 14
      -1, // Level 15
   ];
   buildingData['cannon']['upgrade time'] = [
          10, // Level 1
         900, // Level 2
        2700, // Level 3
        7200, // Level 4
       21600, // Level 5
       43200, // Level 6
       86400, // Level 7
      172800, // Level 8
      259200, // Level 9
      345600, // Level 10
      432000, // Level 11
      518400, // Level 12
      604800, // Level 13
      691200, // Level 14
      777600, // Level 15
   ];
   buildingData['cannon']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
      0, // Level 13
      0, // Level 14
      0, // Level 15
   ];
   buildingData['cannon']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
      [0, 0, 0], // Level 13
      [0, 0, 0], // Level 14
      [0, 0, 0], // Level 15
   ];
   buildingData['cannon']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
      [0, 0, 0], // Level 13
      [0, 0, 0], // Level 14
      [0, 0, 0], // Level 15
   ];
   buildingData['cannon']['upgrade cost'] = [
      [    250, 0, 0], // Level 1
      [   1000, 0, 0], // Level 2
      [   4000, 0, 0], // Level 3
      [  16000, 0, 0], // Level 4
      [  50000, 0, 0], // Level 5
      [ 100000, 0, 0], // Level 6
      [ 200000, 0, 0], // Level 7
      [ 400000, 0, 0], // Level 8
      [ 800000, 0, 0], // Level 9
      [1500000, 0, 0], // Level 10
      [3000000, 0, 0], // Level 11
      [4500000, 0, 0], // Level 12
      [6000000, 0, 0], // Level 13
      [7500000, 0, 0], // Level 14
      [9000000, 0, 0], // Level 15
   ];
   buildingData['cannon']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
      [0, 0, 0], // Level 13
      [0, 0, 0], // Level 14
      [0, 0, 0], // Level 15
   ];

   // *********************************
   // *         Archer Tower          *
   // *********************************
   buildingData['list'].push('Archer Tower');
   buildingData['number available']['archertower'] = [ 
      0, // Town Hall Level 1
      1, // Town Hall Level 2
      1, // Town Hall Level 3
      2, // Town Hall Level 4
      3, // Town Hall Level 5
      3, // Town Hall Level 6
      4, // Town Hall Level 7
      5, // Town Hall Level 8
      6, // Town Hall Level 9
      7, // Town Hall Level 10
      8, // Town Hall Level 11
   ];
   buildingData['archertower'] = [];
   buildingData['archertower']['type']              = "Defense";
   buildingData['archertower']['available']         = true;
   buildingData['archertower']['modes']             = ['Long Range', 'Fast Attack'];
   buildingData['archertower']['preferred target']  = "None";
   buildingData['archertower']['multiplier']        = 1;
   buildingData['archertower']['boost duration']    = 0;
   buildingData['archertower']['boost multiplier']  = 1;
   buildingData['archertower']['ground attack']     = true;
   buildingData['archertower']['air attack']        = true;
   buildingData['archertower']['number of targets'] = 1;
   buildingData['archertower']['number of rounds']  = 0;
   buildingData['archertower']['splash radius']     = -1;
   buildingData['archertower']['size']              = '3x3';
   buildingData['archertower']['attack speed']      = [0.5,0.25];
   buildingData['archertower']['range']             = [10,7];
   buildingData['archertower']['minimum range']     = 0;
   buildingData['archertower']['trigger range']     = 0;
   buildingData['archertower']['description'] =
      'Archer Towers have longer range than cannons, and unlike cannons they can ' +
      'attack flying enemies.';
   buildingData['archertower']['dps'] = [ 
      [11,-1], // Level 1
      [15,-1], // Level 2
      [19,-1], // Level 3
      [25,-1], // Level 4
      [30,-1], // Level 5
      [35,-1], // Level 6
      [42,-1], // Level 7
      [48,-1], // Level 8
      [56,-1], // Level 9
      [65,130], // Level 10
      [75,150], // Level 11
      [86,172], // Level 12
      [98,196], // Level 13
      [110,220], // Level 14
      [120,240], // Level 15
   ];
   buildingData['archertower']['hitpoints'] = [
       380, // Level 1
       420, // Level 2
       460, // Level 3
       500, // Level 4
       540, // Level 5
       580, // Level 6
       630, // Level 7
       690, // Level 8
       750, // Level 9
       810, // Level 10
       890, // Level 11
       970, // Level 12
      1050, // Level 13
      1130, // Level 14
      1230, // Level 15
   ];
   buildingData['archertower']['required town hall'] = [
       2, // Level 1
       2, // Level 2
       3, // Level 3
       4, // Level 4
       5, // Level 5
       5, // Level 6
       6, // Level 7
       7, // Level 8
       8, // Level 9
       8, // Level 10
       9, // Level 11
      10, // Level 12
      10, // Level 13
      11, // Level 14
      11, // Level 15
   ];
   buildingData['archertower']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
      -1, // Level 10
      -1, // Level 11
      -1, // Level 12
      -1, // Level 13
      -1, // Level 14
      -1, // Level 15
   ];
   buildingData['archertower']['upgrade time'] = [
          60, // Level 1
        1800, // Level 2
        2700, // Level 3
       14400, // Level 4
       43200, // Level 5
       86400, // Level 6
      172800, // Level 7
      259200, // Level 8
      345600, // Level 9
      432000, // Level 10
      518400, // Level 11
      604800, // Level 12
      691200, // Level 13
      777600, // Level 14
      864000, // Level 15
   ];
   buildingData['archertower']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
      0, // Level 13
      0, // Level 14
      0, // Level 15
   ];
   buildingData['archertower']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
      [0, 0, 0], // Level 13
      [0, 0, 0], // Level 14
      [0, 0, 0], // Level 15
   ];
   buildingData['archertower']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
      [0, 0, 0], // Level 13
      [0, 0, 0], // Level 14
      [0, 0, 0], // Level 15
   ];
   buildingData['archertower']['upgrade cost'] = [
      [   1000, 0, 0], // Level 1
      [   2000, 0, 0], // Level 2
      [   5000, 0, 0], // Level 3
      [  20000, 0, 0], // Level 4
      [  80000, 0, 0], // Level 5
      [ 180000, 0, 0], // Level 6
      [ 360000, 0, 0], // Level 7
      [ 720000, 0, 0], // Level 8
      [1000000, 0, 0], // Level 9
      [2000000, 0, 0], // Level 10
      [3500000, 0, 0], // Level 11
      [5000000, 0, 0], // Level 12
      [6500000, 0, 0], // Level 13
      [8000000, 0, 0], // Level 14
      [9500000, 0, 0], // Level 15
   ];
   buildingData['archertower']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
      [0, 0, 0], // Level 13
      [0, 0, 0], // Level 14
      [0, 0, 0], // Level 15
   ];

   // *********************************
   // *            Mortar             *
   // *********************************
   buildingData['list'].push('Mortar');
   buildingData['number available']['mortar'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      1, // Town Hall Level 3
      1, // Town Hall Level 4
      1, // Town Hall Level 5
      2, // Town Hall Level 6
      3, // Town Hall Level 7
      4, // Town Hall Level 8
      4, // Town Hall Level 9
      4, // Town Hall Level 10
      4, // Town Hall Level 11
   ];
   buildingData['mortar'] = [];
   buildingData['mortar']['type']              = "Defense";
   buildingData['mortar']['available']         = true;
   buildingData['mortar']['modes']             = "None";
   buildingData['mortar']['preferred target']  = "None";
   buildingData['mortar']['multiplier']        = 1;
   buildingData['mortar']['boost duration']    = 0;
   buildingData['mortar']['boost multiplier']  = 1;
   buildingData['mortar']['ground attack']     = true;
   buildingData['mortar']['air attack']        = false;
   buildingData['mortar']['number of targets'] = 1;
   buildingData['mortar']['number of rounds']  = 0;
   buildingData['mortar']['splash radius']     = 1.5;
   buildingData['mortar']['size']              = '3x3';
   buildingData['mortar']['attack speed']      = 5;
   buildingData['mortar']['range']             = 11;
   buildingData['mortar']['minimum range']     = 4;
   buildingData['mortar']['trigger range']     = 0;
   buildingData['mortar']['description'] =
      'The Mortar can mow down hordes of enemies by the splash damage from ' +
      'its shell. Don\'t let enemies get too close to it!';
   buildingData['mortar']['dps'] = [ 
       4, // Level 1
       5, // Level 2
       6, // Level 3
       7, // Level 4
       8, // Level 5
       9, // Level 6
      11, // Level 7
      14, // Level 8
      17, // Level 9
      20, // Level 10
   ];
   buildingData['mortar']['hitpoints'] = [
      400, // Level 1
      450, // Level 2
      500, // Level 3
      550, // Level 4
      600, // Level 5
      650, // Level 6
      700, // Level 7
      750, // Level 8
      800, // Level 9
      850, // Level 10
   ];
   buildingData['mortar']['required town hall'] = [
       3, // Level 1
       4, // Level 2
       5, // Level 3
       6, // Level 4
       7, // Level 5
       8, // Level 6
       9, // Level 7
      10, // Level 8
      11, // Level 9
      11, // Level 10
   ];
   buildingData['mortar']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
      -1, // Level 10
   ];
   buildingData['mortar']['upgrade time'] = [
       28800, // Level 1
       43200, // Level 2
       86400, // Level 3
      172800, // Level 4
      345600, // Level 5
      432000, // Level 6
      604800, // Level 7
      691200, // Level 8
      864000, // Level 9
     1036800, // Level 10
   ];
   buildingData['mortar']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
   ];
   buildingData['mortar']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
   ];
   buildingData['mortar']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
   ];
   buildingData['mortar']['upgrade cost'] = [
      [   8000, 0, 0], // Level 1
      [  32000, 0, 0], // Level 2
      [ 120000, 0, 0], // Level 3
      [ 400000, 0, 0], // Level 4
      [ 800000, 0, 0], // Level 5
      [1600000, 0, 0], // Level 6
      [3200000, 0, 0], // Level 7
      [5000000, 0, 0], // Level 8
      [7000000, 0, 0], // Level 9
      [9000000, 0, 0], // Level 10
   ];
   buildingData['mortar']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
   ];

   // *********************************
   // *          Air Defense          *
   // *********************************
   buildingData['list'].push('Air Defense');
   buildingData['number available']['airdefense'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      1, // Town Hall Level 4
      1, // Town Hall Level 5
      1, // Town Hall Level 6
      2, // Town Hall Level 7
      3, // Town Hall Level 8
      4, // Town Hall Level 9
      4, // Town Hall Level 10
      4, // Town Hall Level 11
   ];
   buildingData['airdefense'] = [];
   buildingData['airdefense']['type']              = "Defense";
   buildingData['airdefense']['available']         = true;
   buildingData['airdefense']['modes']             = "None";
   buildingData['airdefense']['preferred target']  = "None";
   buildingData['airdefense']['multiplier']        = 1;
   buildingData['airdefense']['boost duration']    = 0;
   buildingData['airdefense']['boost multiplier']  = 1;
   buildingData['airdefense']['ground attack']     = false;
   buildingData['airdefense']['air attack']        = true;
   buildingData['airdefense']['number of targets'] = 1;
   buildingData['airdefense']['number of rounds']  = 0;
   buildingData['airdefense']['splash radius']     = -1;
   buildingData['airdefense']['size']              = '3x3';
   buildingData['airdefense']['attack speed']      = 1;
   buildingData['airdefense']['range']             = 10;
   buildingData['airdefense']['minimum range']     = 0;
   buildingData['airdefense']['trigger range']     = 0;
   buildingData['airdefense']['description'] =
      'This anti-air tower is deadly against flying enemies, but can\'t ' +
      'target foes on the ground. Place it wisely to cover as much airspace ' +
      'as possible.';
   buildingData['airdefense']['dps'] = [ 
       80, // Level 1
      110, // Level 2
      140, // Level 3
      160, // Level 4
      190, // Level 5
      230, // Level 6
      280, // Level 7
      320, // Level 8
      360, // Level 9
   ];
   buildingData['airdefense']['hitpoints'] = [
       800, // Level 1
       850, // Level 2
       900, // Level 3
       950, // Level 4
      1000, // Level 5
      1050, // Level 6
      1110, // Level 7
      1170, // Level 8
      1230, // Level 9
   ];
   buildingData['airdefense']['required town hall'] = [
       4, // Level 1
       4, // Level 2
       5, // Level 3
       6, // Level 4
       7, // Level 5
       8, // Level 6
       9, // Level 7
      10, // Level 8
      11, // Level 9
   ];
   buildingData['airdefense']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
   ];
   buildingData['airdefense']['upgrade time'] = [
        18000, // Level 1
        86400, // Level 2
       259200, // Level 3
       345600, // Level 4
       432000, // Level 5
       518400, // Level 6
       691200, // Level 7
       864000, // Level 8
      1036800, // Level 9
   ];
   buildingData['airdefense']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
   ];
      buildingData['airdefense']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
   ];
   buildingData['airdefense']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
   ];
   buildingData['airdefense']['upgrade cost'] = [
      [  22500, 0, 0], // Level 1
      [  90000, 0, 0], // Level 2
      [ 270000, 0, 0], // Level 3
      [ 540000, 0, 0], // Level 4
      [1000000, 0, 0], // Level 5
      [2000000, 0, 0], // Level 6
      [4000000, 0, 0], // Level 7
      [6300000, 0, 0], // Level 8
      [8800000, 0, 0], // Level 9
   ];
   buildingData['airdefense']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
   ];

   // *********************************
   // *         Wizard Tower          *
   // *********************************
   buildingData['list'].push('Wizard Tower');
   buildingData['number available']['wizardtower'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      1, // Town Hall Level 5
      2, // Town Hall Level 6
      2, // Town Hall Level 7
      3, // Town Hall Level 8
      4, // Town Hall Level 9
      4, // Town Hall Level 10
      5, // Town Hall Level 11
   ];
   buildingData['wizardtower'] = [];
   buildingData['wizardtower']['type']              = "Defense";
   buildingData['wizardtower']['available']         = true;
   buildingData['wizardtower']['modes']             = "None";
   buildingData['wizardtower']['preferred target']  = "None";
   buildingData['wizardtower']['multiplier']        = 1;
   buildingData['wizardtower']['boost duration']    = 0;
   buildingData['wizardtower']['boost multiplier']  = 1;
   buildingData['wizardtower']['ground attack']     = true;
   buildingData['wizardtower']['air attack']        = true;
   buildingData['wizardtower']['number of targets'] = 1;
   buildingData['wizardtower']['number of rounds']  = 0;
   buildingData['wizardtower']['splash radius']     = 1;
   buildingData['wizardtower']['size']              = '3x3';
   buildingData['wizardtower']['attack speed']      = 1.3;
   buildingData['wizardtower']['range']             = 7;
   buildingData['wizardtower']['minimum range']     = 0;
   buildingData['wizardtower']['trigger range']     = 0;
   buildingData['wizardtower']['description'] =
      'The Ultimate Arcane Defense! Tower Wizards cast powerful area effect ' +
      'spells that target both flying and ground troops.';
   buildingData['wizardtower']['dps'] = [ 
      11, // Level 1
      13, // Level 2
      16, // Level 3
      20, // Level 4
      24, // Level 5
      32, // Level 6
      40, // Level 7
      48, // Level 8
      56, // Level 9
      62, // Level 10
   ];
   buildingData['wizardtower']['hitpoints'] = [
       620, // Level 1
       650, // Level 2
       680, // Level 3
       730, // Level 4
       840, // Level 5
       960, // Level 6
      1200, // Level 7
      1440, // Level 8
      1680, // Level 9
      2000, // Level 10
   ];
   buildingData['wizardtower']['required town hall'] = [
       5, // Level 1
       5, // Level 2
       6, // Level 3
       7, // Level 4
       8, // Level 5
       8, // Level 6
       9, // Level 7
      10, // Level 8
      10, // Level 9
      11, // Level 10
   ];
   buildingData['wizardtower']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
      -1, // Level 10
   ];
   buildingData['wizardtower']['upgrade time'] = [
       43200, // Level 1
       86400, // Level 2
      172800, // Level 3
      259200, // Level 4
      345600, // Level 5
      432000, // Level 6
      518400, // Level 7
      691200, // Level 8
      864000, // Level 9
     1036800, // Level 10
   ];
   buildingData['wizardtower']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
   ];
   buildingData['wizardtower']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
   ];
   buildingData['wizardtower']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
   ];
   buildingData['wizardtower']['upgrade cost'] = [
      [ 180000, 0, 0], // Level 1
      [ 360000, 0, 0], // Level 2
      [ 700000, 0, 0], // Level 3
      [1200000, 0, 0], // Level 4
      [1700000, 0, 0], // Level 5
      [2200000, 0, 0], // Level 6
      [3700000, 0, 0], // Level 7
      [5200000, 0, 0], // Level 8
      [7200000, 0, 0], // Level 9
      [9200000, 0, 0], // Level 10
   ];
   buildingData['wizardtower']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
   ];


   // ********************************
   // *         Air Sweeper          *
   // ********************************
   buildingData['list'].push('Air Sweeper');
   buildingData['number available']['airsweeper'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      1, // Town Hall Level 6
      1, // Town Hall Level 7
      1, // Town Hall Level 8
      2, // Town Hall Level 9
      2, // Town Hall Level 10
      2, // Town Hall Level 11
   ];
   buildingData['airsweeper'] = [];
   buildingData['airsweeper']['type']              = "Defense";
   buildingData['airsweeper']['available']         = true;
   buildingData['airsweeper']['modes']             = "None";
   buildingData['airsweeper']['preferred target']  = "None";
   buildingData['airsweeper']['multiplier']        = 1;
   buildingData['airsweeper']['boost duration']    = 0;
   buildingData['airsweeper']['boost multiplier']  = 1;
   buildingData['airsweeper']['ground attack']     = false;
   buildingData['airsweeper']['air attack']        = true;
   buildingData['airsweeper']['number of targets'] = 0;
   buildingData['airsweeper']['number of rounds']  = 0;
   buildingData['airsweeper']['splash radius']     = 0;
   buildingData['airsweeper']['size']              = '2x2';
   buildingData['airsweeper']['attack speed']      = 5;
   buildingData['airsweeper']['range']             = 15;
   buildingData['airsweeper']['minimum range']     = 1;
   buildingData['airsweeper']['trigger range']     = 0;
   buildingData['airsweeper']['description'] =
      'Air Sweepers control the sky with strong blasts of air that ' +
      'push back flying enemies. Air Sweepers can only face one ' +
      'direction, so rotate them to maximize their effectiveness.';
   buildingData['airsweeper']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
   ];
   buildingData['airsweeper']['hitpoints'] = [
       750, // Level 1
       800, // Level 2
       850, // Level 3
       900, // Level 4
       950, // Level 5
      1000, // Level 6
      1050, // Level 7
   ];
   buildingData['airsweeper']['required town hall'] = [
        6, // Level 1
        6, // Level 2
        7, // Level 3
        8, // Level 4
        9, // Level 5
       10, // Level 6
       11, // Level 7
   ];
   buildingData['airsweeper']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
   ];
   buildingData['airsweeper']['upgrade time'] = [
       86400, // Level 1
      259200, // Level 2
      432000, // Level 3
      604800, // Level 4
      691200, // Level 5
      777600, // Level 6
      864000, // Level 7
   ];
   buildingData['airsweeper']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
   ];
   buildingData['airsweeper']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
   ];
   buildingData['airsweeper']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
   ];
   buildingData['airsweeper']['upgrade cost'] = [
      [ 500000, 0, 0], // Level 1
      [ 750000, 0, 0], // Level 2
      [1250000, 0, 0], // Level 3
      [2400000, 0, 0], // Level 4
      [4800000, 0, 0], // Level 5
      [7200000, 0, 0], // Level 6
      [9600000, 0, 0], // Level 7
   ];
   buildingData['airsweeper']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
   ];
   buildingData['airsweeper']['push strength'] = [
      1.6, // Level 1
      2.0, // Level 2
      2.4, // Level 3
      2.8, // Level 4
      3.2, // Level 5
      3.6, // Level 6
      4.0, // Level 7
   ];

   // *********************************
   // *         Bomb Tower          *
   // *********************************
   buildingData['list'].push('Bomb Tower');
   buildingData['number available']['bombtower'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      0, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      2, // Town Hall Level 10
      2, // Town Hall Level 11
   ];
   buildingData['bombtower'] = [];
   buildingData['bombtower']['type']              = "Defense";
   buildingData['bombtower']['available']         = true;
   buildingData['bombtower']['modes']             = "None";
   buildingData['bombtower']['preferred target']  = "None";
   buildingData['bombtower']['multiplier']        = 1;
   buildingData['bombtower']['boost duration']    = 0;
   buildingData['bombtower']['boost multiplier']  = 1;
   buildingData['bombtower']['ground attack']     = true;
   buildingData['bombtower']['air attack']        = false;
   buildingData['bombtower']['number of targets'] = 1;
   buildingData['bombtower']['number of rounds']  = 0;
   buildingData['bombtower']['splash radius']     = 0.3;
   buildingData['bombtower']['size']              = '3x3';
   buildingData['bombtower']['attack speed']      = 1.1;
   buildingData['bombtower']['range']             = 6;
   buildingData['bombtower']['minimum range']     = 0;
   buildingData['bombtower']['trigger range']     = 0;
   buildingData['bombtower']['description'] =
      'Bomb Towers bombard nearby ground troops and go up in a big BOOM when destroyed! ' +
      'Melee units best stand clear!'
   buildingData['bombtower']['dps'] = [ 
      24, // Level 1
      28, // Level 2
      32, // Level 3
      40, // Level 4
      44, // Level 5
      48, // Level 6
   ];
   buildingData['bombtower']['hitpoints'] = [
      650, // Level 1
      700, // Level 2
      750, // Level 3
      850, // Level 4
     1000, // Level 5
     1200, // Level 6
   ];
   buildingData['bombtower']['required town hall'] = [
        8, // Level 1
        8, // Level 2
        9, // Level 3
       10, // Level 4
       11, // Level 5
       11, // Level 6
   ];
   buildingData['bombtower']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
   ];
   buildingData['bombtower']['upgrade time'] = [
       345600, // Level 1
       518400, // Level 2
       691200, // Level 3
       864000, // Level 4
      1209600, // Level 5
      1209600, // Level 6
   ];
   buildingData['bombtower']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
   ];
      buildingData['bombtower']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
   ];
   buildingData['bombtower']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
   ];
   buildingData['bombtower']['upgrade cost'] = [
      [2000000, 0, 0], // Level 1
      [3500000, 0, 0], // Level 2
      [5000000, 0, 0], // Level 3
      [7000000, 0, 0], // Level 4
      [9000000, 0, 0], // Level 5
     [10000000, 0, 0], // Level 6
   ];
   buildingData['bombtower']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
   ];
   buildingData['bombtower']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
   ];
   buildingData['bombtower']['death damage'] = [
      150, // Level 1
      180, // Level 2
      220, // Level 3
      260, // Level 4
      300, // Level 5
      340, // Level 6
   ];

   // *********************************
   // *              X-Bow            *
   // *   [ground, air and ground]    *
   // *********************************
   buildingData['list'].push('X-Bow');
   buildingData['number available']['x-bow'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      0, // Town Hall Level 7
      0, // Town Hall Level 8
      2, // Town Hall Level 9
      3, // Town Hall Level 10
      4, // Town Hall Level 11
   ];
   buildingData['x-bow'] = [];
   buildingData['x-bow']['type']              = "Defense";
   buildingData['x-bow']['available']         = true;
   buildingData['x-bow']['modes']             = ["Ground Only", "Air and Ground"];
   buildingData['x-bow']['preferred target']  = "None";
   buildingData['x-bow']['multiplier']        = 1;
   buildingData['x-bow']['boost duration']    = 0;
   buildingData['x-bow']['boost multiplier']  = 1;
   buildingData['x-bow']['ground attack']     = true;
   buildingData['x-bow']['air attack']        = [false, true];
   buildingData['x-bow']['number of targets'] = 1;
   buildingData['x-bow']['number of rounds']  = 1500;
   buildingData['x-bow']['splash radius']     = -1;
   buildingData['x-bow']['size']              = '3x3';
   buildingData['x-bow']['attack speed']      = 0.128;
   buildingData['x-bow']['range']             = [14, 11];
   buildingData['x-bow']['minimum range']     = 0;
   buildingData['x-bow']['trigger range']     = 0;
   buildingData['x-bow']['description'] =
      'The X-Bow shoots mystical bolts with terrifying power. Load it with ' +
      'Elixir and the X-Bow works automagically. You can set it to target ' +
      'ground units at long ranges, or all targets at reduced range.';
   buildingData['x-bow']['dps'] = [ 
      50, // Level 1
      70, // Level 2
      90, // Level 3
     100, // Level 4
     110, // Level 5
      
   ];
   buildingData['x-bow']['hitpoints'] = [
      1500, // Level 1
      1900, // Level 2
      2300, // Level 3
      2700, // Level 4
      3100, // Level 5
   ];
   buildingData['x-bow']['required town hall'] = [
       9, // Level 1
       9, // Level 2
       9, // Level 3
      10, // Level 4
      11, // Level 5
   ];
   buildingData['x-bow']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
   ];
   buildingData['x-bow']['upgrade time'] = [
       604800, // Level 1
       691200, // Level 2
       864000, // Level 3
      1036800, // Level 4
      1209600, // Level 5
   ];
   buildingData['x-bow']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
   ];
   buildingData['x-bow']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
   ];
   buildingData['x-bow']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
   ];
   buildingData['x-bow']['upgrade cost'] = [
      [3000000, 0, 0], // Level 1
      [4000000, 0, 0], // Level 2
      [5000000, 0, 0], // Level 3
      [7000000, 0, 0], // Level 4
      [9500000, 0, 0], // Level 5
   ];
   buildingData['x-bow']['rearm cost'] = [
      [0, 16000, 0], // Level 1
      [0, 19000, 0], // Level 2
      [0, 22000, 0], // Level 3
      [0, 24000, 0], // Level 4
      [0, 26000, 0], // Level 5
   ];

   // ************************************
   // *          Inferno Tower           *
   // * [single target, multiple target] *
   // ************************************
   buildingData['list'].push('Inferno Tower');
   buildingData['number available']['infernotower'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      0, // Town Hall Level 7
      0, // Town Hall Level 8
      0, // Town Hall Level 9
      2, // Town Hall Level 10
      3, // Town Hall Level 11
   ];
   buildingData['infernotower'] = [];
   buildingData['infernotower']['type']              = "Defense";
   buildingData['infernotower']['available']         = true;
   buildingData['infernotower']['modes']             = ["Single-Target", "Multi-Target"];
   buildingData['infernotower']['preferred target']  = "None";
   buildingData['infernotower']['multiplier']        = 1;
   buildingData['infernotower']['boost duration']    = 0;
   buildingData['infernotower']['boost multiplier']  = 1;
   buildingData['infernotower']['ground attack']     = true;
   buildingData['infernotower']['air attack']        = true;
   buildingData['infernotower']['number of targets'] = [1, 5];
   buildingData['infernotower']['number of rounds']  = 1000;
   buildingData['infernotower']['splash radius']     = -1;
   buildingData['infernotower']['size']              = '2x2';
   buildingData['infernotower']['attack speed']      = 0.128;
   buildingData['infernotower']['range']             = 9;
   buildingData['infernotower']['minimum range']     = 0;
   buildingData['infernotower']['trigger range']     = 0;
   buildingData['infernotower']['description'] =
      'Set the Inferno Tower\'s Dark Elixir fueled flame to build up unbelieveble ' +
      'damage to single targets, or to constantly roast multiple targets at once. ' +
      'Healing effects get blocked by its extreme heat!';
   buildingData['infernotower']['dps'] = [ 
      ['0:30|2:100|5:1000', 30], // Level 1
      ['0:37|2:125|5:1250', 37], // Level 2
      ['0:41|2:140|5:1400', 41], // Level 3
      ['0:50|2:155|5:1550', 50], // Level 4
      ['0:57|2:175|5:1750', 57], // Level 5
   ];
   buildingData['infernotower']['hitpoints'] = [
      1500, // Level 1
      1800, // Level 2
      2100, // Level 3
      2400, // Level 4
      2700, // Level 5
   ];
   buildingData['infernotower']['required town hall'] = [
      10, // Level 1
      10, // Level 2
      10, // Level 3
      11, // Level 4
      11, // Level 5
   ];
   buildingData['infernotower']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
   ];
   buildingData['infernotower']['upgrade time'] = [
       604800, // Level 1
       691200, // Level 2
       864000, // Level 3
      1036800, // Level 4
      1209600, // Level 5
   ];
   buildingData['infernotower']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
   ];
   buildingData['infernotower']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
   ];
   buildingData['infernotower']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
   ];
   buildingData['infernotower']['upgrade cost'] = [
      [5000000, 0, 0], // Level 1
      [6000000, 0, 0], // Level 2
      [7000000, 0, 0], // Level 3
      [9000000, 0, 0], // Level 4
     [10000000, 0, 0], // Level 5
   ];
   buildingData['infernotower']['rearm cost'] = [
      [0, 0, 500], // Level 1
      [0, 0, 600], // Level 2
      [0, 0, 700], // Level 3
      [0, 0, 800], // Level 4
      [0, 0, 900], // Level 5
   ];

   // *********************************
   // *       Eagle Artillery         *
   // *********************************
   buildingData['list'].push('Eagle Artillery');
   buildingData['number available']['eagleartillery'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      0, // Town Hall Level 7
      0, // Town Hall Level 8
      0, // Town Hall Level 9
      0, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['eagleartillery'] = [];
   buildingData['eagleartillery']['type']              = "Defense";
   buildingData['eagleartillery']['available']         = true;
   buildingData['eagleartillery']['modes']             = "None";
   buildingData['eagleartillery']['preferred target']  = "Golem";
   buildingData['eagleartillery']['multiplier']        = 3;
   buildingData['eagleartillery']['boost duration']    = 0;
   buildingData['eagleartillery']['boost multiplier']  = 1;
   buildingData['eagleartillery']['ground attack']     = true;
   buildingData['eagleartillery']['air attack']        = true;
   buildingData['eagleartillery']['number of targets'] = 1;
   buildingData['eagleartillery']['number of rounds']  = 90;
   buildingData['eagleartillery']['splash radius']     = 0.3;
   buildingData['eagleartillery']['size']              = '4x4';
   buildingData['eagleartillery']['attack speed']      = 3.333;
   buildingData['eagleartillery']['range']             = 50;
   buildingData['eagleartillery']['minimum range']     = 7;
   buildingData['eagleartillery']['trigger range']     = 0;
   buildingData['eagleartillery']['description'] =
      'The Eagle Artillery has nearly unlimited range and targets tough enemies with exploding shells. ' +
      'However, it won\'t activate until a large amount of troops have been deployed.';
   buildingData['eagleartillery']['dps'] = [ 
      75, // Level 1
      90, // Level 2
   ];
   buildingData['eagleartillery']['hitpoints'] = [
      4000, // Level 1
      4400, // Level 2
   ];
   buildingData['eagleartillery']['required town hall'] = [
      11, // Level 1
      11, // Level 2
   ];
   buildingData['eagleartillery']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
   ];
   buildingData['eagleartillery']['upgrade time'] = [
       864000, // Level 1
      1209600, // Level 2
   ];
   buildingData['eagleartillery']['housing space'] = [
      0, // Level 1
      0, // Level 2
   ];
   buildingData['eagleartillery']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
   ];
   buildingData['eagleartillery']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
   ];
   buildingData['eagleartillery']['upgrade cost'] = [
      [8000000, 0, 0], // Level 1
     [10000000, 0, 0], // Level 2
   ];
   buildingData['eagleartillery']['rearm cost'] = [
      [0, 35000, 0], // Level 1
      [0, 40000, 0], // Level 2
   ];

   // *********************************
   // *             Bomb              *
   // *********************************
   buildingData['list'].push('Bomb');
   buildingData['number available']['bomb'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      2, // Town Hall Level 3
      2, // Town Hall Level 4
      4, // Town Hall Level 5
      4, // Town Hall Level 6
      6, // Town Hall Level 7
      6, // Town Hall Level 8
      6, // Town Hall Level 9
      6, // Town Hall Level 10
      6, // Town Hall Level 11
   ];
   buildingData['bomb'] = [];
   buildingData['bomb']['type']              = "Trap";
   buildingData['bomb']['available']         = true;
   buildingData['bomb']['modes']             = "None";
   buildingData['bomb']['preferred target']  = "None";
   buildingData['bomb']['multiplier']        = 0;
   buildingData['bomb']['boost duration']    = 0;
   buildingData['bomb']['boost multiplier']  = 1;
   buildingData['bomb']['ground attack']     = true;
   buildingData['bomb']['air attack']        = false;
   buildingData['bomb']['number of targets'] = 0;
   buildingData['bomb']['number of rounds']  = 0;
   buildingData['bomb']['splash radius']     = 3;
   buildingData['bomb']['size']              = '1x1';
   buildingData['bomb']['attack speed']      = 1;
   buildingData['bomb']['range']             = 0;
   buildingData['bomb']['minimum range']     = 0;
   buildingData['bomb']['trigger range']     = 1.5;
   buildingData['bomb']['description'] =
      'Nothing says \'STAY OUT\' quite like a good old-fashioned hidden bomb.';
   buildingData['bomb']['dps'] = [ 
      20, // Level 1
      24, // Level 2
      29, // Level 3
      35, // Level 4
      42, // Level 5
      54, // Level 6
   ];
   buildingData['bomb']['hitpoints'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
   ];
   buildingData['bomb']['required town hall'] = [
      3, // Level 1
      3, // Level 2
      5, // Level 3
      7, // Level 4
      8, // Level 5
      9, // Level 6
   ];
   buildingData['bomb']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
   ];
   buildingData['bomb']['upgrade time'] = [
           0, // Level 1
         900, // Level 2
        7200, // Level 3
       28800, // Level 4
       86400, // Level 5
      172800, // Level 6
   ];
   buildingData['bomb']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
   ];
   buildingData['bomb']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
   ];
   buildingData['bomb']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
   ];
   buildingData['bomb']['upgrade cost'] = [
      [    400, 0, 0], // Level 1
      [   1000, 0, 0], // Level 2
      [  10000, 0, 0], // Level 3
      [ 100000, 0, 0], // Level 4
      [1000000, 0, 0], // Level 5
      [1500000, 0, 0], // Level 6
   ];
   buildingData['bomb']['rearm cost'] = [
       [50, 0, 0], // Level 1
      [100, 0, 0], // Level 2
      [150, 0, 0], // Level 3
      [200, 0, 0], // Level 4
      [250, 0, 0], // Level 5
      [300, 0, 0], // Level 6
   ];

   // *********************************
   // *         Spring Trap           *
   // *********************************
   buildingData['list'].push('Spring Trap');
   buildingData['number available']['springtrap'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      2, // Town Hall Level 4
      2, // Town Hall Level 5
      4, // Town Hall Level 6
      4, // Town Hall Level 7
      6, // Town Hall Level 8
      6, // Town Hall Level 9
      6, // Town Hall Level 10
      6, // Town Hall Level 11
   ];
   buildingData['springtrap'] = [];
   buildingData['springtrap']['type']              = "Trap";
   buildingData['springtrap']['available']         = true;
   buildingData['springtrap']['modes']             = "None";
   buildingData['springtrap']['preferred target']  = "None";
   buildingData['springtrap']['multiplier']        = 0;
   buildingData['springtrap']['boost duration']    = 0;
   buildingData['springtrap']['boost multiplier']  = 1;
   buildingData['springtrap']['ground attack']     = true;
   buildingData['springtrap']['air attack']        = false;
   buildingData['springtrap']['number of targets'] = 15;
   buildingData['springtrap']['number of rounds']  = 0;
   buildingData['springtrap']['splash radius']     = 0;
   buildingData['springtrap']['size']              = '1x1';
   buildingData['springtrap']['attack speed']      = 0;
   buildingData['springtrap']['range']             = 0;
   buildingData['springtrap']['minimum range']     = 0;
   buildingData['springtrap']['trigger range']     = 0.7;
   buildingData['springtrap']['description'] =
      'This bouncy little number will toss unwanted visitors right off your property!';
   buildingData['springtrap']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
   ];
   buildingData['springtrap']['hitpoints'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
   ];
   buildingData['springtrap']['required town hall'] = [
      4, // Level 1
      7, // Level 2
      8, // Level 3
      9, // Level 4
     10, // Level 5
   ];
   buildingData['springtrap']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
   ];
   buildingData['springtrap']['upgrade time'] = [
           0, // Level 1
       57600, // Level 2
       86400, // Level 3
      172800, // Level 4
      259200, // Level 5
   ];
   buildingData['springtrap']['housing space'] = [
      15, // Level 1
      16, // Level 2
      17, // Level 3
      18, // Level 4
      19, // Level 5
   ];
   buildingData['springtrap']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
   ];
   buildingData['springtrap']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
   ];
   buildingData['springtrap']['upgrade cost'] = [
         [2000, 0, 0], // Level 1
       [500000, 0, 0], // Level 2
      [1000000, 0, 0], // Level 3
      [1500000, 0, 0], // Level 4
      [2000000, 0, 0], // Level 5
   ];
   buildingData['springtrap']['rearm cost'] = [
       [500, 0, 0], // Level 1
       [650, 0, 0], // Level 2
       [800, 0, 0], // Level 3
       [950, 0, 0], // Level 4
      [1100, 0, 0], // Level 5
   ];

   // *********************************
   // *           Air Bomb            *
   // *********************************
   buildingData['list'].push('Air Bomb');
   buildingData['number available']['airbomb'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      2, // Town Hall Level 5
      2, // Town Hall Level 6
      2, // Town Hall Level 7
      4, // Town Hall Level 8
      4, // Town Hall Level 9
      5, // Town Hall Level 10
      5, // Town Hall Level 11
   ];
   buildingData['airbomb'] = [];
   buildingData['airbomb']['type']              = "Trap";
   buildingData['airbomb']['available']         = true;
   buildingData['airbomb']['modes']             = "None";
   buildingData['airbomb']['preferred target']  = "None";
   buildingData['airbomb']['multiplier']        = 0;
   buildingData['airbomb']['boost duration']    = 0;
   buildingData['airbomb']['boost multiplier']  = 1;
   buildingData['airbomb']['ground attack']     = false;
   buildingData['airbomb']['air attack']        = true;
   buildingData['airbomb']['number of targets'] = 0;
   buildingData['airbomb']['number of rounds']  = 0;
   buildingData['airbomb']['splash radius']     = 3;
   buildingData['airbomb']['size']              = '1x1';
   buildingData['airbomb']['attack speed']      = 1;
   buildingData['airbomb']['range']             = 5;
   buildingData['airbomb']['minimum range']     = 0;
   buildingData['airbomb']['trigger range']     = 5;
   buildingData['airbomb']['description'] =
      'Latest invention in the field of flying pest control. This trap ' +
      'can blast multiple air units in a small area.';
   buildingData['airbomb']['dps'] = [
      100, // Level 1
      120, // Level 2
      144, // Level 3
      173, // Level 4
   ];
   buildingData['airbomb']['hitpoints'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
   ];
   buildingData['airbomb']['required town hall'] = [
      5, // Level 1
      5, // Level 2
      7, // Level 3
      9, // Level 4
   ];
   buildingData['airbomb']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
   ];
   buildingData['airbomb']['upgrade time'] = [
          0, // Level 1
      14400, // Level 2
      43200, // Level 3
      86400, // Level 4
   ];
   buildingData['airbomb']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
   ];
   buildingData['airbomb']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
   ];
   buildingData['airbomb']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
   ];
   buildingData['airbomb']['upgrade cost'] = [
      [   4000, 0, 0], // Level 1
      [  20000, 0, 0], // Level 2
      [ 200000, 0, 0], // Level 3
      [1500000, 0, 0], // Level 4
   ];
   buildingData['airbomb']['rearm cost'] = [
       [400, 0, 0], // Level 1
       [600, 0, 0], // Level 2
       [800, 0, 0], // Level 3
      [1000, 0, 0], // Level 4
   ];
   
   // *********************************
   // *          Giant Bomb           *
   // *********************************
   buildingData['list'].push('Giant Bomb');
   buildingData['number available']['giantbomb'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      1, // Town Hall Level 6
      2, // Town Hall Level 7
      3, // Town Hall Level 8
      4, // Town Hall Level 9
      5, // Town Hall Level 10
      5, // Town Hall Level 11
   ];
   buildingData['giantbomb'] = [];
   buildingData['giantbomb']['type']              = "Trap";
   buildingData['giantbomb']['available']         = true;
   buildingData['giantbomb']['modes']             = "None";
   buildingData['giantbomb']['preferred target']  = "None";
   buildingData['giantbomb']['multiplier']        = 1;
   buildingData['giantbomb']['boost duration']    = 0;
   buildingData['giantbomb']['boost multiplier']  = 1;
   buildingData['giantbomb']['ground attack']     = true;
   buildingData['giantbomb']['air attack']        = false;
   buildingData['giantbomb']['number of targets'] = 0;
   buildingData['giantbomb']['number of rounds']  = 0;
   buildingData['giantbomb']['splash radius']     = [3, 3.5, 3.5, 4];
   buildingData['giantbomb']['size']              = '2x2';
   buildingData['giantbomb']['attack speed']      = 1;
   buildingData['giantbomb']['range']             = 0;
   buildingData['giantbomb']['minimum range']     = 0;
   buildingData['giantbomb']['trigger range']     = 2;
   buildingData['giantbomb']['description'] =
      'When you\'re looking for a Big Boom, you need the Giant Bomb.';
   buildingData['giantbomb']['dps'] = [ 
      175, // Level 1
      200, // Level 2
      225, // Level 3
      250, // Level 4
   ];
   buildingData['giantbomb']['hitpoints'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
   ];
   buildingData['giantbomb']['required town hall'] = [
       6, // Level 1
       6, // Level 2
       8, // Level 3
      10, // Level 4
   ];
   buildingData['giantbomb']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
   ];
   buildingData['giantbomb']['upgrade time'] = [
           0, // Level 1
       21600, // Level 2
       86400, // Level 3
      259200, // Level 4
   ];
   buildingData['giantbomb']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
   ];
   buildingData['giantbomb']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
   ];
   buildingData['giantbomb']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
   ];
   buildingData['giantbomb']['upgrade cost'] = [
      [  12500, 0, 0], // Level 1
      [  75000, 0, 0], // Level 2
      [ 750000, 0, 0], // Level 3
      [2500000, 0, 0], // Level 4
   ];
   buildingData['giantbomb']['rearm cost'] = [
      [2000, 0, 0], // Level 1
      [3000, 0, 0], // Level 2
      [4000, 0, 0], // Level 3
      [5000, 0, 0], // Level 4
   ];

   // *********************************
   // *       Seeking Air Mine        *
   // *********************************
   buildingData['list'].push('Seeking Air Mine');
   buildingData['number available']['seekingairmine'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      1, // Town Hall Level 7
      2, // Town Hall Level 8
      4, // Town Hall Level 9
      5, // Town Hall Level 10
      5, // Town Hall Level 11
   ];
   buildingData['seekingairmine'] = [];
   buildingData['seekingairmine']['type']              = "Trap";
   buildingData['seekingairmine']['available']         = true;
   buildingData['seekingairmine']['modes']             = "None";
   buildingData['seekingairmine']['preferred target']  = "None";
   buildingData['seekingairmine']['multiplier']        = 0;
   buildingData['seekingairmine']['boost duration']    = 0;
   buildingData['seekingairmine']['boost multiplier']  = 1;
   buildingData['seekingairmine']['ground attack']     = false;
   buildingData['seekingairmine']['air attack']        = true;
   buildingData['seekingairmine']['number of targets'] = 1;
   buildingData['seekingairmine']['number of rounds']  = 0;
   buildingData['seekingairmine']['splash radius']     = -1;
   buildingData['seekingairmine']['size']              = '1x1';
   buildingData['seekingairmine']['attack speed']      = 1;
   buildingData['seekingairmine']['range']             = 4;
   buildingData['seekingairmine']['minimum range']     = 0;
   buildingData['seekingairmine']['trigger range']     = 4;
   buildingData['seekingairmine']['description'] =
      'Is it a bird? Is it a plane? Well it makes no difference as the ' +
      'Seeking Air Mine will blow it sky high. This trap does devastating ' +
      'damage to a single air unit.';
   buildingData['seekingairmine']['dps'] = [
      1500, // Level 1
      1800, // Level 2
      2100, // Level 3
   ];
   buildingData['seekingairmine']['hitpoints'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
   ];
   buildingData['seekingairmine']['required town hall'] = [
       7, // Level 1
       9, // Level 2
      10, // Level 3
   ];
   buildingData['seekingairmine']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
   ];
   buildingData['seekingairmine']['upgrade time'] = [
           0, // Level 1
       86400, // Level 2
      259200, // Level 3
   ];
   buildingData['seekingairmine']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
   ];
   buildingData['seekingairmine']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
   ];
   buildingData['seekingairmine']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
   ];
   buildingData['seekingairmine']['upgrade cost'] = [
      [  15000, 0, 0], // Level 1
      [2000000, 0, 0], // Level 2
      [4000000, 0, 0], // Level 3
   ];
   buildingData['seekingairmine']['rearm cost'] = [
      [3000, 0, 0], // Level 1
      [4000, 0, 0], // Level 2
      [5000, 0, 0], // Level 3
   ];

   // *********************************
   // *         Skeleton Trap         *
   // *********************************
   buildingData['list'].push('Skeleton Trap');
   buildingData['number available']['skeletontrap'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      0, // Town Hall Level 7
      2, // Town Hall Level 8
      2, // Town Hall Level 9
      3, // Town Hall Level 10
      3, // Town Hall Level 11
   ];
   buildingData['skeletontrap'] = [];
   buildingData['skeletontrap']['type']              = "Trap";
   buildingData['skeletontrap']['available']         = true;
   buildingData['skeletontrap']['modes']             = ["Ground", "Air"];
   buildingData['skeletontrap']['preferred target']  = "None";
   buildingData['skeletontrap']['multiplier']        = 0;
   buildingData['skeletontrap']['boost duration']    = 0;
   buildingData['skeletontrap']['boost multiplier']  = 1;
   buildingData['skeletontrap']['ground attack']     = [true, false];
   buildingData['skeletontrap']['air attack']        = [false, true];
   buildingData['skeletontrap']['number of targets'] = 1;
   buildingData['skeletontrap']['number of rounds']  = 0;
   buildingData['skeletontrap']['splash radius']     = -1;
   buildingData['skeletontrap']['size']              = '1x1';
   buildingData['skeletontrap']['attack speed']      = 1;
   buildingData['skeletontrap']['range']             = 5;
   buildingData['skeletontrap']['minimum range']     = 0;
   buildingData['skeletontrap']['trigger range']     = 5;
   buildingData['skeletontrap']['description'] =
      'Ambush and distract unsuspecting foes with a surprise skirmish of short-lived, ' +
      'but sneaky skeleton troops! Skeleton Traps can be configured to pursue either ' +
      'ground or air troops.';
   buildingData['skeletontrap']['dps'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
   ];
   buildingData['skeletontrap']['hitpoints'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
   ];
   buildingData['skeletontrap']['required town hall'] = [
      8, // Level 1
      8, // Level 2
      9, // Level 3
   ];
   buildingData['skeletontrap']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
   ];
   buildingData['skeletontrap']['upgrade time'] = [
          0, // Level 1
      21600, // Level 2
      86400, // Level 3
   ];
   buildingData['skeletontrap']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
   ];
   buildingData['skeletontrap']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
   ];
   buildingData['skeletontrap']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
   ];
   buildingData['skeletontrap']['upgrade cost'] = [
      [   6000, 0, 0], // Level 1
      [ 600000, 0, 0], // Level 2
      [1300000, 0, 0], // Level 3
   ];
   buildingData['skeletontrap']['rearm cost'] = [
      [3000, 0, 0], // Level 1
      [4000, 0, 0], // Level 2
      [5000, 0, 0], // Level 3
   ];
   buildingData['skeletontrap']['subtroops'] = [
      2, // Level 1
      3, // Level 2
      4, // Level 3
   ];
   buildingData['skeletontrap']['max subtroops'] = [
      2, // Level 1
      3, // Level 2
      4, // Level 3
   ];

   // *********************************
   // *         Pumpkin Bomb          *
   // *********************************
   buildingData['list'].push('Pumpkin Bomb');
   buildingData['number available']['pumpkinbomb'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      1, // Town Hall Level 4
      1, // Town Hall Level 5
      1, // Town Hall Level 6
      1, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['pumpkinbomb'] = [];
   buildingData['pumpkinbomb']['type']              = "Trap";
   buildingData['pumpkinbomb']['available']         = false;
   buildingData['pumpkinbomb']['modes']             = "None";
   buildingData['pumpkinbomb']['preferred target']  = "None";
   buildingData['pumpkinbomb']['multiplier']        = 0;
   buildingData['pumpkinbomb']['boost duration']    = 0;
   buildingData['pumpkinbomb']['boost multiplier']  = 1;
   buildingData['pumpkinbomb']['ground attack']     = true;
   buildingData['pumpkinbomb']['air attack']        = false;
   buildingData['pumpkinbomb']['number of targets'] = 1;
   buildingData['pumpkinbomb']['number of rounds']  = 0;
   buildingData['pumpkinbomb']['splash radius']     = 3;
   buildingData['pumpkinbomb']['size']              = '1x1';
   buildingData['pumpkinbomb']['attack speed']      = 1;
   buildingData['pumpkinbomb']['range']             = 1.5;
   buildingData['pumpkinbomb']['minimum range']     = 0;
   buildingData['pumpkinbomb']['trigger range']     = 1.5;
   buildingData['pumpkinbomb']['description'] =
      'Boo! This creepy bomb is available for a limited time only.';
   buildingData['pumpkinbomb']['dps'] = [
      25, // Level 1
   ];
   buildingData['pumpkinbomb']['hitpoints'] = [
      0, // Level 1
   ];
   buildingData['pumpkinbomb']['required town hall'] = [
      4, // Level 1
   ];
   buildingData['pumpkinbomb']['boost cost'] = [
      -1, // Level 1
   ];
   buildingData['pumpkinbomb']['upgrade time'] = [
      0, // Level 1
   ];
   buildingData['pumpkinbomb']['housing space'] = [
      0, // Level 1
   ];
   buildingData['pumpkinbomb']['capacity'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['pumpkinbomb']['production'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['pumpkinbomb']['upgrade cost'] = [
      [1000, 0, 0], // Level 1
   ];
   buildingData['pumpkinbomb']['rearm cost'] = [
      [1000, 0, 0], // Level 1
   ];

   // *********************************
   // *         Santa Strike          *
   // *********************************
   buildingData['list'].push('Santa Strike');
   buildingData['number available']['santastrike'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      1, // Town Hall Level 4
      1, // Town Hall Level 5
      1, // Town Hall Level 6
      1, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['santastrike'] = [];
   buildingData['santastrike']['type']              = "Trap";
   buildingData['santastrike']['available']         = false;
   buildingData['santastrike']['modes']             = "None";
   buildingData['santastrike']['preferred target']  = "None";
   buildingData['santastrike']['multiplier']        = 0;
   buildingData['santastrike']['boost duration']    = 0;
   buildingData['santastrike']['boost multiplier']  = 1;
   buildingData['santastrike']['ground attack']     = true;
   buildingData['santastrike']['air attack']        = true;
   buildingData['santastrike']['number of targets'] = 5;
   buildingData['santastrike']['number of rounds']  = 0;
   buildingData['santastrike']['splash radius']     = -1;
   buildingData['santastrike']['size']              = '1x1';
   buildingData['santastrike']['attack speed']      = 1;
   buildingData['santastrike']['range']             = 1;
   buildingData['santastrike']['minimum range']     = 0;
   buildingData['santastrike']['trigger range']     = 1;
   buildingData['santastrike']['description'] =
      'Leave a special surprise gift for your enemies. Your generosity will ' +
      'surely be rewarded!';
   buildingData['santastrike']['dps'] = [
      20, // Level 1
   ];
   buildingData['santastrike']['hitpoints'] = [
      0, // Level 1
   ];
   buildingData['santastrike']['required town hall'] = [
      4, // Level 1
   ];
   buildingData['santastrike']['boost cost'] = [
      -1, // Level 1
   ];
   buildingData['santastrike']['upgrade time'] = [
      0, // Level 1
   ];
   buildingData['santastrike']['housing space'] = [
      0, // Level 1
   ];
   buildingData['santastrike']['capacity'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['santastrike']['production'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['santastrike']['upgrade cost'] = [
      [1000, 0, 0], // Level 1
   ];
   buildingData['santastrike']['rearm cost'] = [
      [1000, 0, 0], // Level 1
   ];

   // *********************************
   // *             Walls             *
   // *********************************
   buildingData['list'].push('Walls');
   buildingData['number available']['walls'] = [ 
        0, // Town Hall Level 1
       25, // Town Hall Level 2
       50, // Town Hall Level 3
       75, // Town Hall Level 4
      100, // Town Hall Level 5
      125, // Town Hall Level 6
      175, // Town Hall Level 7
      225, // Town Hall Level 8
      250, // Town Hall Level 9
      275, // Town Hall Level 10
      300, // Town Hall Level 11
   ];
   buildingData['walls'] = [];
   buildingData['walls']['type']              = "Walls";
   buildingData['walls']['available']         = true;
   buildingData['walls']['modes']             = "None";
   buildingData['walls']['preferred target']  = "None";
   buildingData['walls']['multiplier']        = 0;
   buildingData['walls']['boost duration']    = 0;
   buildingData['walls']['boost multiplier']  = 0;
   buildingData['walls']['ground attack']     = false;
   buildingData['walls']['air attack']        = false;
   buildingData['walls']['number of targets'] = 0;
   buildingData['walls']['number of rounds']  = 0;
   buildingData['walls']['splash radius']     = -1;
   buildingData['walls']['size']              = '1x1';
   buildingData['walls']['attack speed']      = 0;
   buildingData['walls']['range']             = 0;
   buildingData['walls']['minimum range']     = 0;
   buildingData['walls']['trigger range']     = 0;
   buildingData['walls']['description'] =
      'Walls are great for keeping your village safe and your enemies in the line of fire.';
   buildingData['walls']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['walls']['hitpoints'] = [
       300, // Level 1
       500, // Level 2
       700, // Level 3
       900, // Level 4
      1400, // Level 5
      2000, // Level 6
      2500, // Level 7
      3000, // Level 8
      4000, // Level 9
      5500, // Level 10
      7000, // Level 11
      8500, // Level 12
   ];
   buildingData['walls']['required town hall'] = [
       2, // Level 1
       2, // Level 2
       3, // Level 3
       4, // Level 4
       5, // Level 5
       6, // Level 6
       7, // Level 7
       8, // Level 8
       9, // Level 9
       9, // Level 10
      10, // Level 11
      11, // Level 12
   ];
   buildingData['walls']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
      -1, // Level 10
      -1, // Level 11
      -1, // Level 12
   ];
   buildingData['walls']['upgrade time'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['walls']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['walls']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];
   buildingData['walls']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];
   buildingData['walls']['upgrade cost'] = [
      [     50,       0, 0], // Level 1
      [   1000,       0, 0], // Level 2
      [   5000,       0, 0], // Level 3
      [  10000,       0, 0], // Level 4
      [  30000,       0, 0], // Level 5
      [  75000,       0, 0], // Level 6
      [ 200000,       0, 0], // Level 7
      [ 500000,       0, 0], // Level 8
      [1000000, 1000000, 0], // Level 9
      [2000000, 2000000, 0], // Level 10
      [3000000, 3000000, 0], // Level 11
      [4000000, 4000000, 0], // Level 12
   ];
   buildingData['walls']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];

   // *********************************
   // *           Gold Mine           *
   // *********************************
   buildingData['list'].push('Gold Mine');
   buildingData['number available']['goldmine'] = [ 
      1, // Town Hall Level 1
      2, // Town Hall Level 2
      3, // Town Hall Level 3
      4, // Town Hall Level 4
      5, // Town Hall Level 5
      6, // Town Hall Level 6
      6, // Town Hall Level 7
      6, // Town Hall Level 8
      7, // Town Hall Level 9
      7, // Town Hall Level 10
      7, // Town Hall Level 11
   ];
   buildingData['goldmine'] = [];
   buildingData['goldmine']['type']              = "Resource";
   buildingData['goldmine']['available']         = true;
   buildingData['goldmine']['modes']             = "None";
   buildingData['goldmine']['preferred target']  = "None";
   buildingData['goldmine']['multiplier']        = 0;
   buildingData['goldmine']['boost duration']    = 24;
   buildingData['goldmine']['boost multiplier']  = 2;
   buildingData['goldmine']['ground attack']     = false;
   buildingData['goldmine']['air attack']        = false;
   buildingData['goldmine']['number of targets'] = 0;
   buildingData['goldmine']['number of rounds']  = 0;
   buildingData['goldmine']['splash radius']     = -1;
   buildingData['goldmine']['size']              = '3x3';
   buildingData['goldmine']['attack speed']      = 0;
   buildingData['goldmine']['range']             = 0;
   buildingData['goldmine']['minimum range']     = 0;
   buildingData['goldmine']['trigger range']     = 0;
   buildingData['goldmine']['description'] =
      'The Gold Mine produces gold. Upgrade it to boost its production and ' +
      'gold storage capacity.';
   buildingData['goldmine']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['goldmine']['hitpoints'] = [
      400, // Level 1
      440, // Level 2
      480, // Level 3
      520, // Level 4
      560, // Level 5
      600, // Level 6
      640, // Level 7
      680, // Level 8
      720, // Level 9
      780, // Level 10
      860, // Level 11
      960, // Level 12
   ];
   buildingData['goldmine']['required town hall'] = [
      1, // Level 1
      1, // Level 2
      2, // Level 3
      2, // Level 4
      3, // Level 5
      3, // Level 6
      4, // Level 7
      4, // Level 8
      5, // Level 9
      5, // Level 10
      7, // Level 11
      8, // Level 12
   ];
   buildingData['goldmine']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
       4, // Level 5
       5, // Level 6
       6, // Level 7
       7, // Level 8
       8, // Level 9
       9, // Level 10
      10, // Level 11
      10, // Level 12
   ];
   buildingData['goldmine']['upgrade time'] = [
          10, // Level 1
          60, // Level 2
         900, // Level 3
        3600, // Level 4
        7200, // Level 5
       21600, // Level 6
       43200, // Level 7
       86400, // Level 8
      172800, // Level 9
      259200, // Level 10
      345600, // Level 11
      432000, // Level 12
   ];
   buildingData['goldmine']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['goldmine']['capacity'] = [
      [   500, 0, 0], // Level 1
      [  1000, 0, 0], // Level 2
      [  1500, 0, 0], // Level 3
      [  2500, 0, 0], // Level 4
      [ 10000, 0, 0], // Level 5
      [ 20000, 0, 0], // Level 6
      [ 30000, 0, 0], // Level 7
      [ 50000, 0, 0], // Level 8
      [ 75000, 0, 0], // Level 9
      [100000, 0, 0], // Level 10
      [150000, 0, 0], // Level 11
      [200000, 0, 0], // Level 12
   ];
   buildingData['goldmine']['production'] = [
      [ 200, 0, 0], // Level 1
      [ 400, 0, 0], // Level 2
      [ 600, 0, 0], // Level 3
      [ 800, 0, 0], // Level 4
      [1000, 0, 0], // Level 5
      [1300, 0, 0], // Level 6
      [1600, 0, 0], // Level 7
      [1900, 0, 0], // Level 8
      [2200, 0, 0], // Level 9
      [2500, 0, 0], // Level 10
      [3000, 0, 0], // Level 11
      [3500, 0, 0], // Level 12
   ];
   buildingData['goldmine']['upgrade cost'] = [
      [0,    150, 0], // Level 1
      [0,    300, 0], // Level 2
      [0,    700, 0], // Level 3
      [0,   1400, 0], // Level 4
      [0,   3000, 0], // Level 5
      [0,   7000, 0], // Level 6
      [0,  14000, 0], // Level 7
      [0,  28000, 0], // Level 8
      [0,  56000, 0], // Level 9
      [0,  84000, 0], // Level 10
      [0, 168000, 0], // Level 11
      [0, 336000, 0], // Level 12
   ];
   buildingData['goldmine']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];

   // *********************************
   // *       Elixir Collector        *
   // *********************************
   buildingData['list'].push('Elixir Collector');
   buildingData['number available']['elixircollector'] = [ 
      1, // Town Hall Level 1
      2, // Town Hall Level 2
      3, // Town Hall Level 3
      4, // Town Hall Level 4
      5, // Town Hall Level 5
      6, // Town Hall Level 6
      6, // Town Hall Level 7
      6, // Town Hall Level 8
      7, // Town Hall Level 9
      7, // Town Hall Level 10
      7, // Town Hall Level 11
   ];
   buildingData['elixircollector'] = [];
   buildingData['elixircollector']['type']              = "Resource";
   buildingData['elixircollector']['available']         = true;
   buildingData['elixircollector']['modes']             = "None";
   buildingData['elixircollector']['preferred target']  = "None";
   buildingData['elixircollector']['multiplier']        = 0;
   buildingData['elixircollector']['boost duration']    = 24;
   buildingData['elixircollector']['boost multiplier']  = 2;
   buildingData['elixircollector']['ground attack']     = false;
   buildingData['elixircollector']['air attack']        = false;
   buildingData['elixircollector']['number of targets'] = 0;
   buildingData['elixircollector']['number of rounds']  = 0;
   buildingData['elixircollector']['splash radius']     = -1;
   buildingData['elixircollector']['size']              = '3x3';
   buildingData['elixircollector']['attack speed']      = 0;
   buildingData['elixircollector']['range']             = 0;
   buildingData['elixircollector']['minimum range']     = 0;
   buildingData['elixircollector']['trigger range']     = 0;
   buildingData['elixircollector']['description'] =
      'Elixir is pumped from the Ley Lines coursing underneath your village. ' +
      'Upgrade your Elixir Collectors to maximize elixir production.';
   buildingData['elixircollector']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['elixircollector']['hitpoints'] = [
      400, // Level 1
      440, // Level 2
      480, // Level 3
      520, // Level 4
      560, // Level 5
      600, // Level 6
      640, // Level 7
      680, // Level 8
      720, // Level 9
      780, // Level 10
      860, // Level 11
      960, // Level 12
   ];
   buildingData['elixircollector']['required town hall'] = [
      1, // Level 1
      1, // Level 2
      2, // Level 3
      2, // Level 4
      3, // Level 5
      3, // Level 6
      4, // Level 7
      4, // Level 8
      5, // Level 9
      5, // Level 10
      7, // Level 11
      8, // Level 12
   ];
   buildingData['elixircollector']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
       4, // Level 5
       5, // Level 6
       6, // Level 7
       7, // Level 8
       8, // Level 9
       9, // Level 10
      10, // Level 11
      10, // Level 12
   ];
   buildingData['elixircollector']['upgrade time'] = [
          10, // Level 1
          60, // Level 2
         900, // Level 3
        3600, // Level 4
        7200, // Level 5
       21600, // Level 6
       43200, // Level 7
       86400, // Level 8
      172800, // Level 9
      259200, // Level 10
      345600, // Level 11
      432000, // Level 12
   ];
   buildingData['elixircollector']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['elixircollector']['capacity'] = [
      [0,    500, 0], // Level 1
      [0,   1000, 0], // Level 2
      [0,   1500, 0], // Level 3
      [0,   2500, 0], // Level 4
      [0,  10000, 0], // Level 5
      [0,  20000, 0], // Level 6
      [0,  30000, 0], // Level 7
      [0,  50000, 0], // Level 8
      [0,  75000, 0], // Level 9
      [0, 100000, 0], // Level 10
      [0, 150000, 0], // Level 11
      [0, 200000, 0], // Level 12
   ];
   buildingData['elixircollector']['production'] = [
      [0,  200, 0], // Level 1
      [0,  400, 0], // Level 2
      [0,  600, 0], // Level 3
      [0,  800, 0], // Level 4
      [0, 1000, 0], // Level 5
      [0, 1300, 0], // Level 6
      [0, 1600, 0], // Level 7
      [0, 1900, 0], // Level 8
      [0, 2200, 0], // Level 9
      [0, 2500, 0], // Level 10
      [0, 3000, 0], // Level 11
      [0, 3500, 0], // Level 12
   ];
   buildingData['elixircollector']['upgrade cost'] = [
      [   150, 0, 0], // Level 1
      [   300, 0, 0], // Level 2
      [   700, 0, 0], // Level 3
      [  1400, 0, 0], // Level 4
      [  3500, 0, 0], // Level 5
      [  7000, 0, 0], // Level 6
      [ 14000, 0, 0], // Level 7
      [ 28000, 0, 0], // Level 8
      [ 56000, 0, 0], // Level 9
      [ 84000, 0, 0], // Level 10
      [168000, 0, 0], // Level 11
      [336000, 0, 0], // Level 12
   ];
   buildingData['elixircollector']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];

   // *********************************
   // *       Dark Elixir Drill       *
   // *********************************
   buildingData['list'].push('Dark Elixir Drill');
   buildingData['number available']['darkelixirdrill'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      1, // Town Hall Level 7
      2, // Town Hall Level 8
      2, // Town Hall Level 9
      3, // Town Hall Level 10
      3, // Town Hall Level 11
   ];
   buildingData['darkelixirdrill'] = [];
   buildingData['darkelixirdrill']['type']              = "Resource";
   buildingData['darkelixirdrill']['available']         = true;
   buildingData['darkelixirdrill']['modes']             = "None";
   buildingData['darkelixirdrill']['preferred target']  = "None";
   buildingData['darkelixirdrill']['multiplier']        = 0;
   buildingData['darkelixirdrill']['boost duration']    = 24;
   buildingData['darkelixirdrill']['boost multiplier']  = 2;
   buildingData['darkelixirdrill']['ground attack']     = false;
   buildingData['darkelixirdrill']['air attack']        = false;
   buildingData['darkelixirdrill']['number of targets'] = 0;
   buildingData['darkelixirdrill']['number of rounds']  = 0;
   buildingData['darkelixirdrill']['splash radius']     = -1;
   buildingData['darkelixirdrill']['size']              = '3x3';
   buildingData['darkelixirdrill']['attack speed']      = 0;
   buildingData['darkelixirdrill']['range']             = 0;
   buildingData['darkelixirdrill']['minimum range']     = 0;
   buildingData['darkelixirdrill']['trigger range']     = 0;
   buildingData['darkelixirdrill']['description'] =
      'Our Alchemists have finally figured a way to extract pure Dark ' +
      'Elixir, the rarest form of the magical substance.';
   buildingData['darkelixirdrill']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
   ];
   buildingData['darkelixirdrill']['hitpoints'] = [
       800, // Level 1
       860, // Level 2
       920, // Level 3
       980, // Level 4
      1060, // Level 5
      1160, // Level 6
   ];
   buildingData['darkelixirdrill']['required town hall'] = [
      7, // Level 1
      7, // Level 2
      7, // Level 3
      9, // Level 4
      9, // Level 5
      9, // Level 6
   ];
   buildingData['darkelixirdrill']['boost cost'] = [
       7, // Level 1
      10, // Level 2
      15, // Level 3
      20, // Level 4
      25, // Level 5
      30, // Level 6
   ];
   buildingData['darkelixirdrill']['upgrade time'] = [
       86400, // Level 1
      172800, // Level 2
      259200, // Level 3
      345600, // Level 4
      518400, // Level 5
      691200, // Level 6
   ];
   buildingData['darkelixirdrill']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
   ];
   buildingData['darkelixirdrill']['capacity'] = [
      [0, 0,  160], // Level 1
      [0, 0,  300], // Level 2
      [0, 0,  540], // Level 3
      [0, 0,  840], // Level 4
      [0, 0, 1280], // Level 5
      [0, 0, 1800], // Level 6
   ];
   buildingData['darkelixirdrill']['production'] = [
      [0, 0,  20], // Level 1
      [0, 0,  30], // Level 2
      [0, 0,  45], // Level 3
      [0, 0,  60], // Level 4
      [0, 0,  80], // Level 5
      [0, 0, 100], // Level 6
   ];
   buildingData['darkelixirdrill']['upgrade cost'] = [
      [0, 1000000, 0], // Level 1
      [0, 1500000, 0], // Level 2
      [0, 2000000, 0], // Level 3
      [0, 3000000, 0], // Level 4
      [0, 4000000, 0], // Level 5
      [0, 5000000, 0], // Level 6
   ];
   buildingData['darkelixirdrill']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
   ];

   // *********************************
   // *         Gold Storage          *
   // *********************************
   buildingData['list'].push('Gold Storage');
   buildingData['number available']['goldstorage'] = [ 
      1, // Town Hall Level 1
      1, // Town Hall Level 2
      2, // Town Hall Level 3
      2, // Town Hall Level 4
      2, // Town Hall Level 5
      2, // Town Hall Level 6
      2, // Town Hall Level 7
      3, // Town Hall Level 8
      4, // Town Hall Level 9
      4, // Town Hall Level 10
      4, // Town Hall Level 11
   ];
   buildingData['goldstorage'] = [];
   buildingData['goldstorage']['type']              = "Resource";
   buildingData['goldstorage']['available']         = true;
   buildingData['goldstorage']['modes']             = "None";
   buildingData['goldstorage']['preferred target']  = "None";
   buildingData['goldstorage']['multiplier']        = 0;
   buildingData['goldstorage']['boost duration']    = 0;
   buildingData['goldstorage']['boost multiplier']  = 1;
   buildingData['goldstorage']['ground attack']     = false;
   buildingData['goldstorage']['air attack']        = false;
   buildingData['goldstorage']['number of targets'] = 0;
   buildingData['goldstorage']['number of rounds']  = 0;
   buildingData['goldstorage']['splash radius']     = -1;
   buildingData['goldstorage']['size']              = '3x3';
   buildingData['goldstorage']['attack speed']      = 0;
   buildingData['goldstorage']['range']             = 0;
   buildingData['goldstorage']['minimum range']     = 0;
   buildingData['goldstorage']['trigger range']     = 0;
   buildingData['goldstorage']['description'] =
      'All your precious gold is stored here. Don\'t let sneaky goblins ' +
      'anywhere near! Upgrade the storage to increase its capacity and ' +
      'durability against attack.';
   buildingData['goldstorage']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['goldstorage']['hitpoints'] = [
       400, // Level 1
       600, // Level 2
       800, // Level 3
      1000, // Level 4
      1200, // Level 5
      1400, // Level 6
      1600, // Level 7
      1700, // Level 8
      1800, // Level 9
      1900, // Level 10
      2100, // Level 11
      2500, // Level 12
   ];
   buildingData['goldstorage']['required town hall'] = [
      1, // Level 1
      2, // Level 2
      2, // Level 3
      3, // Level 4
      3, // Level 5
      3, // Level 6
      4, // Level 7
      4, // Level 8
      5, // Level 9
      6, // Level 10
      7, // Level 11
     11, // Level 12
   ];
   buildingData['goldstorage']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
      -1, // Level 10
      -1, // Level 11
      -1, // Level 12
   ];
   buildingData['goldstorage']['upgrade time'] = [
          10, // Level 1
        1800, // Level 2
        3600, // Level 3
        7200, // Level 4
       10800, // Level 5
       14400, // Level 6
       21600, // Level 7
       28800, // Level 8
       43200, // Level 9
       86400, // Level 10
      172800, // Level 11
      604800, // Level 12
   ];
   buildingData['goldstorage']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['goldstorage']['capacity'] = [
      [   1500, 0, 0], // Level 1
      [   3000, 0, 0], // Level 2
      [   6000, 0, 0], // Level 3
      [  12000, 0, 0], // Level 4
      [  25000, 0, 0], // Level 5
      [  45000, 0, 0], // Level 6
      [ 100000, 0, 0], // Level 7
      [ 225000, 0, 0], // Level 8
      [ 450000, 0, 0], // Level 9
      [ 850000, 0, 0], // Level 10
      [1750000, 0, 0], // Level 11
      [2000000, 0, 0], // Level 12
   ];
   buildingData['goldstorage']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];
   buildingData['goldstorage']['upgrade cost'] = [
      [0,    300, 0], // Level 1
      [0,    750, 0], // Level 2
      [0,   1500, 0], // Level 3
      [0,   3000, 0], // Level 4
      [0,   6000, 0], // Level 5
      [0,  12000, 0], // Level 6
      [0,  25000, 0], // Level 7
      [0,  50000, 0], // Level 8
      [0, 100000, 0], // Level 9
      [0, 250000, 0], // Level 10
      [0, 500000, 0], // Level 11
     [0, 2500000, 0], // Level 11
   ];
   buildingData['goldstorage']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];

   // *********************************
   // *        Elixir Storage         *
   // *********************************
   buildingData['list'].push('Elixir Storage');
   buildingData['number available']['elixirstorage'] = [ 
      1, // Town Hall Level 1
      1, // Town Hall Level 2
      2, // Town Hall Level 3
      2, // Town Hall Level 4
      2, // Town Hall Level 5
      2, // Town Hall Level 6
      2, // Town Hall Level 7
      3, // Town Hall Level 8
      4, // Town Hall Level 9
      4, // Town Hall Level 10
      4, // Town Hall Level 11
   ];
   buildingData['elixirstorage'] = [];
   buildingData['elixirstorage']['type']              = "Resource";
   buildingData['elixirstorage']['available']         = true;
   buildingData['elixirstorage']['modes']             = "None";
   buildingData['elixirstorage']['preferred target']  = "None";
   buildingData['elixirstorage']['multiplier']        = 0;
   buildingData['elixirstorage']['boost duration']    = 0;
   buildingData['elixirstorage']['boost multiplier']  = 1;
   buildingData['elixirstorage']['ground attack']     = false;
   buildingData['elixirstorage']['air attack']        = false;
   buildingData['elixirstorage']['number of targets'] = 0;
   buildingData['elixirstorage']['number of rounds']  = 0;
   buildingData['elixirstorage']['splash radius']     = -1;
   buildingData['elixirstorage']['size']              = '3x3';
   buildingData['elixirstorage']['attack speed']      = 0;
   buildingData['elixirstorage']['range']             = 0;
   buildingData['elixirstorage']['minimum range']     = 0;
   buildingData['elixirstorage']['trigger range']     = 0;
   buildingData['elixirstorage']['description'] =
      'These storages contain the elixir pumped from underground. ' +
      'Upgrade them to increase the maximum amount of elixir you can store.';
   buildingData['elixirstorage']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['elixirstorage']['hitpoints'] = [
       400, // Level 1
       600, // Level 2
       800, // Level 3
      1000, // Level 4
      1200, // Level 5
      1400, // Level 6
      1600, // Level 7
      1700, // Level 8
      1800, // Level 9
      1900, // Level 10
      2100, // Level 11
      2500, // Level 12
   ];
   buildingData['elixirstorage']['required town hall'] = [
      1, // Level 1
      2, // Level 2
      2, // Level 3
      3, // Level 4
      3, // Level 5
      3, // Level 6
      4, // Level 7
      4, // Level 8
      5, // Level 9
      6, // Level 10
      7, // Level 11
     11, // Level 12
   ];
   buildingData['elixirstorage']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
      -1, // Level 10
      -1, // Level 11
      -1, // Level 12
   ];
   buildingData['elixirstorage']['upgrade time'] = [
          10, // Level 1
        1800, // Level 2
        3600, // Level 3
        7200, // Level 4
       10800, // Level 5
       14400, // Level 6
       21600, // Level 7
       28800, // Level 8
       43200, // Level 9
       86400, // Level 10
      172800, // Level 11
      604800, // Level 12
   ];
   buildingData['elixirstorage']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['elixirstorage']['capacity'] = [
      [0,    1500, 0], // Level 1
      [0,    3000, 0], // Level 2
      [0,    6000, 0], // Level 3
      [0,   12000, 0], // Level 4
      [0,   25000, 0], // Level 5
      [0,   45000, 0], // Level 6
      [0,  100000, 0], // Level 7
      [0,  225000, 0], // Level 8
      [0,  450000, 0], // Level 9
      [0,  850000, 0], // Level 10
      [0, 1750000, 0], // Level 11
      [0, 2000000, 0], // Level 12
   ];
   buildingData['elixirstorage']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];
   buildingData['elixirstorage']['upgrade cost'] = [
      [   300, 0, 0], // Level 1
      [   750, 0, 0], // Level 2
      [  1500, 0, 0], // Level 3
      [  3000, 0, 0], // Level 4
      [  6000, 0, 0], // Level 5
      [ 12000, 0, 0], // Level 6
      [ 25000, 0, 0], // Level 7
      [ 50000, 0, 0], // Level 8
      [100000, 0, 0], // Level 9
      [250000, 0, 0], // Level 10
      [500000, 0, 0], // Level 11
     [2500000, 0, 0], // Level 12
   ];
   buildingData['elixirstorage']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];

   // *********************************
   // *      Dark Elixir Storage      *
   // *********************************
   buildingData['list'].push('Dark Elixir Storage');
   buildingData['number available']['darkelixirstorage'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      1, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['darkelixirstorage'] = [];
   buildingData['darkelixirstorage']['type']              = "Resource";
   buildingData['darkelixirstorage']['available']         = true;
   buildingData['darkelixirstorage']['modes']             = "None";
   buildingData['darkelixirstorage']['preferred target']  = "None";
   buildingData['darkelixirstorage']['multiplier']        = 0;
   buildingData['darkelixirstorage']['boost duration']    = 0;
   buildingData['darkelixirstorage']['boost multiplier']  = 1;
   buildingData['darkelixirstorage']['ground attack']     = false;
   buildingData['darkelixirstorage']['air attack']        = false;
   buildingData['darkelixirstorage']['number of targets'] = 0;
   buildingData['darkelixirstorage']['number of rounds']  = 0;
   buildingData['darkelixirstorage']['splash radius']     = -1;
   buildingData['darkelixirstorage']['size']              = '3x3';
   buildingData['darkelixirstorage']['attack speed']      = 0;
   buildingData['darkelixirstorage']['range']             = 0;
   buildingData['darkelixirstorage']['minimum range']     = 0;
   buildingData['darkelixirstorage']['trigger range']     = 0;
   buildingData['darkelixirstorage']['description'] =
      'The power of Dark Elixir could not be contained in a regularly ' +
      'shaped Elixir vat. As it\'s three times as powerful, we had to ' +
      'invent a cubical form of storage!';
   buildingData['darkelixirstorage']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
   ];
   buildingData['darkelixirstorage']['hitpoints'] = [
      2000, // Level 1
      2200, // Level 2
      2400, // Level 3
      2600, // Level 4
      2900, // Level 5
      3200, // Level 6
   ];
   buildingData['darkelixirstorage']['required town hall'] = [
      7, // Level 1
      7, // Level 2
      8, // Level 3
      8, // Level 4
      9, // Level 5
      9, // Level 6
   ];
   buildingData['darkelixirstorage']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
   ];
   buildingData['darkelixirstorage']['upgrade time'] = [
       86400, // Level 1
      172800, // Level 2
      259200, // Level 3
      345600, // Level 4
      432000, // Level 5
      518400, // Level 6
   ];
   buildingData['darkelixirstorage']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
   ];
   buildingData['darkelixirstorage']['capacity'] = [
      [0, 0,  10000], // Level 1
      [0, 0,  17500], // Level 2
      [0, 0,  40000], // Level 3
      [0, 0,  75000], // Level 4
      [0, 0, 140000], // Level 5
      [0, 0, 180000], // Level 6
   ];
   buildingData['darkelixirstorage']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
   ];
   buildingData['darkelixirstorage']['upgrade cost'] = [
      [0,  600000, 0], // Level 1
      [0, 1200000, 0], // Level 2
      [0, 1800000, 0], // Level 3
      [0, 2400000, 0], // Level 4
      [0, 3000000, 0], // Level 5
      [0, 3600000, 0], // Level 6
   ];
   buildingData['darkelixirstorage']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
   ];

   // *********************************
   // *           Army Camp           *
   // *********************************
   buildingData['list'].push('Army Camp');
   buildingData['number available']['armycamp'] = [ 
      1, // Town Hall Level 1
      1, // Town Hall Level 2
      2, // Town Hall Level 3
      2, // Town Hall Level 4
      3, // Town Hall Level 5
      3, // Town Hall Level 6
      4, // Town Hall Level 7
      4, // Town Hall Level 8
      4, // Town Hall Level 9
      4, // Town Hall Level 10
      4, // Town Hall Level 11
   ];
   buildingData['armycamp'] = [];
   buildingData['armycamp']['type']              = "Army";
   buildingData['armycamp']['available']         = true;
   buildingData['armycamp']['modes']             = "None";
   buildingData['armycamp']['preferred target']  = "None";
   buildingData['armycamp']['multiplier']        = 0;
   buildingData['armycamp']['boost duration']    = 0;
   buildingData['armycamp']['boost multiplier']  = 1;
   buildingData['armycamp']['ground attack']     = false;
   buildingData['armycamp']['air attack']        = false;
   buildingData['armycamp']['number of targets'] = 0;
   buildingData['armycamp']['number of rounds']  = 0;
   buildingData['armycamp']['splash radius']     = -1;
   buildingData['armycamp']['size']              = '5x5';
   buildingData['armycamp']['attack speed']      = 0;
   buildingData['armycamp']['range']             = 0;
   buildingData['armycamp']['minimum range']     = 0;
   buildingData['armycamp']['trigger range']     = 0;
   buildingData['armycamp']['description'] =
      'Your troops are stationed in Army Camps. Build more camps ' +
      'and upgrade them to muster a powerful army.';
   buildingData['armycamp']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
   ];
   buildingData['armycamp']['hitpoints'] = [
      250, // Level 1
      270, // Level 2
      290, // Level 3
      310, // Level 4
      330, // Level 5
      350, // Level 6
      400, // Level 7
      500, // Level 8
   ];
   buildingData['armycamp']['required town hall'] = [
       1, // Level 1
       2, // Level 2
       3, // Level 3
       4, // Level 4
       5, // Level 5
       6, // Level 6
       9, // Level 7
      10, // Level 8
   ];
   buildingData['armycamp']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
   ];
   buildingData['armycamp']['upgrade time'] = [
         300, // Level 1
        3600, // Level 2
       10800, // Level 3
       28800, // Level 4
       86400, // Level 5
      259200, // Level 6
      432000, // Level 7
      864000, // Level 8
   ];
   buildingData['armycamp']['housing space'] = [
      20, // Level 1
      30, // Level 2
      35, // Level 3
      40, // Level 4
      45, // Level 5
      50, // Level 6
      55, // Level 7
      60, // Level 8
   ];
   buildingData['armycamp']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
   ];
   buildingData['armycamp']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
   ];
   buildingData['armycamp']['upgrade cost'] = [
      [0,     250, 0], // Level 1
      [0,    2500, 0], // Level 2
      [0,   10000, 0], // Level 3
      [0,  100000, 0], // Level 4
      [0,  250000, 0], // Level 5
      [0,  750000, 0], // Level 6
      [0, 2250000, 0], // Level 7
      [0, 6750000, 0], // Level 8
   ];
   buildingData['armycamp']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
   ];

   // *********************************
   // *           Barracks            *
   // *********************************
   buildingData['list'].push('Barracks');
   buildingData['number available']['barracks'] = [ 
      1, // Town Hall Level 1
      2, // Town Hall Level 2
      2, // Town Hall Level 3
      3, // Town Hall Level 4
      3, // Town Hall Level 5
      3, // Town Hall Level 6
      4, // Town Hall Level 7
      4, // Town Hall Level 8
      4, // Town Hall Level 9
      4, // Town Hall Level 10
      4, // Town Hall Level 11
   ];
   buildingData['barracks'] = [];
   buildingData['barracks']['type']              = "Army";
   buildingData['barracks']['available']         = true;
   buildingData['barracks']['modes']             = "None";
   buildingData['barracks']['preferred target']  = "None";
   buildingData['barracks']['multiplier']        = 0;
   buildingData['barracks']['boost duration']    = 1;
   buildingData['barracks']['boost multiplier']  = 4;
   buildingData['barracks']['ground attack']     = false;
   buildingData['barracks']['air attack']        = false;
   buildingData['barracks']['number of targets'] = 0;
   buildingData['barracks']['number of rounds']  = 0;
   buildingData['barracks']['splash radius']     = -1;
   buildingData['barracks']['size']              = '3x3';
   buildingData['barracks']['attack speed']      = 0;
   buildingData['barracks']['range']             = 0;
   buildingData['barracks']['minimum range']     = 0;
   buildingData['barracks']['trigger range']     = 0;
   buildingData['barracks']['description'] =
      'The Barracks allow you to train troops to attack your enemies. ' +
      'Upgrade the Barracks to unlock advanced units that can win epic ' +
      'battles.';
   buildingData['barracks']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['barracks']['hitpoints'] = [
      250, // Level 1
      290, // Level 2
      330, // Level 3
      370, // Level 4
      420, // Level 5
      470, // Level 6
      520, // Level 7
      580, // Level 8
      650, // Level 9
      730, // Level 10
      810, // Level 11
      900, // Level 12
   ];
   buildingData['barracks']['required town hall'] = [
      1, // Level 1
      1, // Level 2
      1, // Level 3
      2, // Level 4
      3, // Level 5
      4, // Level 6
      5, // Level 7
      6, // Level 8
      7, // Level 9
      8, // Level 10
      9, // Level 11
      10, // Level 12
   ];
   buildingData['barracks']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      30, // Level 4
      30, // Level 5
      30, // Level 6
      30, // Level 7
      30, // Level 8
      30, // Level 9
      30, // Level 10
      30, // Level 11
      30, // Level 12
   ];
   buildingData['barracks']['upgrade time'] = [
          10, // Level 1
         900, // Level 2
        7200, // Level 3
       14400, // Level 4
       36000, // Level 5
       57600, // Level 6
       86400, // Level 7
      172800, // Level 8
      345600, // Level 9
      518400, // Level 10
      691200, // Level 11
      864000, // Level 12
   ];
   buildingData['barracks']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
      0, // Level 10
      0, // Level 11
      0, // Level 12
   ];
   buildingData['barracks']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];
   buildingData['barracks']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];
   buildingData['barracks']['upgrade cost'] = [
      [0,     200, 0], // Level 1
      [0,    1000, 0], // Level 2
      [0,    2500, 0], // Level 3
      [0,    5000, 0], // Level 4
      [0,   10000, 0], // Level 5
      [0,   80000, 0], // Level 6
      [0,  240000, 0], // Level 7
      [0,  700000, 0], // Level 8
      [0, 1500000, 0], // Level 9
      [0, 2000000, 0], // Level 10
      [0, 3000000, 0], // Level 11
      [0, 4000000, 0], // Level 12
   ];
   buildingData['barracks']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
      [0, 0, 0], // Level 10
      [0, 0, 0], // Level 11
      [0, 0, 0], // Level 12
   ];

   // *********************************
   // *         Dark Barracks         *
   // *********************************
   buildingData['list'].push('Dark Barracks');
   buildingData['number available']['darkbarracks'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      1, // Town Hall Level 7
      2, // Town Hall Level 8
      2, // Town Hall Level 9
      2, // Town Hall Level 10
      2, // Town Hall Level 11
   ];
   buildingData['darkbarracks'] = [];
   buildingData['darkbarracks']['type']              = "Army";
   buildingData['darkbarracks']['available']         = true;
   buildingData['darkbarracks']['modes']             = "None";
   buildingData['darkbarracks']['preferred target']  = "None";
   buildingData['darkbarracks']['multiplier']        = 0;
   buildingData['darkbarracks']['boost duration']    = 1;
   buildingData['darkbarracks']['boost multiplier']  = 4;
   buildingData['darkbarracks']['ground attack']     = false;
   buildingData['darkbarracks']['air attack']        = false;
   buildingData['darkbarracks']['number of targets'] = 0;
   buildingData['darkbarracks']['number of rounds']  = 0;
   buildingData['darkbarracks']['splash radius']     = -1;
   buildingData['darkbarracks']['size']              = '3x3';
   buildingData['darkbarracks']['attack speed']      = 0;
   buildingData['darkbarracks']['range']             = 0;
   buildingData['darkbarracks']['minimum range']     = 0;
   buildingData['darkbarracks']['trigger range']     = 0;
   buildingData['darkbarracks']['description'] =
      'The Dark Barracks will open doors for creatures born out of Dark Elixir. ' +
      'Upgrade the barracks to unlock more troops with unique battle skills.';
   buildingData['darkbarracks']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
   ];
   buildingData['darkbarracks']['hitpoints'] = [
      500, // Level 1
      550, // Level 2
      600, // Level 3
      650, // Level 4
      700, // Level 5
      750, // Level 6
      800, // Level 7
   ];
   buildingData['darkbarracks']['required town hall'] = [
      7, // Level 1
      7, // Level 2
      8, // Level 3
      8, // Level 4
      9, // Level 5
      9, // Level 6
      10, // Level 7
   ];
   buildingData['darkbarracks']['boost cost'] = [
      30, // Level 1
      30, // Level 2
      30, // Level 3
      30, // Level 4
      30, // Level 5
      30, // Level 6
      30, // Level 7
   ];
   buildingData['darkbarracks']['upgrade time'] = [
      259200, // Level 1
      432000, // Level 2
      518400, // Level 3
      604800, // Level 4
      691200, // Level 5
      777600, // Level 6
      1036800, // Level 7
   ];
   buildingData['darkbarracks']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
   ];
   buildingData['darkbarracks']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
   ];
   buildingData['darkbarracks']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
   ];
   buildingData['darkbarracks']['upgrade cost'] = [
      [0,  750000, 0], // Level 1
      [0, 1250000, 0], // Level 2
      [0, 1750000, 0], // Level 3
      [0, 2250000, 0], // Level 4
      [0, 2750000, 0], // Level 5
      [0, 3500000, 0], // Level 6
      [0, 6000000, 0], // Level 7
   ];
   buildingData['darkbarracks']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
   ];

   // *********************************
   // *          Laboratory           *
   // *********************************
   buildingData['list'].push('Laboratory');
   buildingData['number available']['laboratory'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      1, // Town Hall Level 3
      1, // Town Hall Level 4
      1, // Town Hall Level 5
      1, // Town Hall Level 6
      1, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['laboratory']= [];
   buildingData['laboratory']['type']              = "Army";
   buildingData['laboratory']['available']         = true;
   buildingData['laboratory']['modes']             = "None";
   buildingData['laboratory']['preferred target']  = "None";
   buildingData['laboratory']['multiplier']        = 0;
   buildingData['laboratory']['boost duration']    = 0;
   buildingData['laboratory']['boost multiplier']  = 1;
   buildingData['laboratory']['ground attack']     = false;
   buildingData['laboratory']['air attack']        = false;
   buildingData['laboratory']['number of targets'] = 0;
   buildingData['laboratory']['number of rounds']  = 0;
   buildingData['laboratory']['splash radius']     = -1;
   buildingData['laboratory']['size']              = '4x4';
   buildingData['laboratory']['attack speed']      = 0;
   buildingData['laboratory']['range']             = 0;
   buildingData['laboratory']['minimum range']     = 0;
   buildingData['laboratory']['trigger range']     = 0;
   buildingData['laboratory']['description'] =
      'What dark secrets do the Alchemists hide inside their Laboratory? ' +
      'Nobody has dared to look. All we know is that their research makes ' +
      'our spells and troops harder, better, faster and stronger!';
   buildingData['laboratory']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
   ];
   buildingData['laboratory']['hitpoints'] = [
      500, // Level 1
      550, // Level 2
      600, // Level 3
      650, // Level 4
      700, // Level 5
      750, // Level 6
      830, // Level 7
      950, // Level 8
      1070, // Level 9
   ];
   buildingData['laboratory']['required town hall'] = [
       3, // Level 1
       4, // Level 2
       5, // Level 3
       6, // Level 4
       7, // Level 5
       8, // Level 6
       9, // Level 7
      10, // Level 8
      11, // Level 9
   ];
   buildingData['laboratory']['boost cost'] = [
      -1, // Level 1
      -1, // Level 2
      -1, // Level 3
      -1, // Level 4
      -1, // Level 5
      -1, // Level 6
      -1, // Level 7
      -1, // Level 8
      -1, // Level 9
   ];
   buildingData['laboratory']['upgrade time'] = [
        1800, // Level 1
       18000, // Level 2
       43200, // Level 3
       86400, // Level 4
      172800, // Level 5
      345600, // Level 6
      432000, // Level 7
      518400, // Level 8
      604800, // Level 9
   ];
   buildingData['laboratory']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
      0, // Level 6
      0, // Level 7
      0, // Level 8
      0, // Level 9
   ];
   buildingData['laboratory']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
   ];
   buildingData['laboratory']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
   ];
   buildingData['laboratory']['upgrade cost'] = [
      [0,   25000, 0], // Level 1
      [0,   50000, 0], // Level 2
      [0,   90000, 0], // Level 3
      [0,  270000, 0], // Level 4
      [0,  500000, 0], // Level 5
      [0, 1000000, 0], // Level 6
      [0, 2500000, 0], // Level 7
      [0, 4000000, 0], // Level 8
      [0, 6000000, 0], // Level 9
   ];
   buildingData['laboratory']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
      [0, 0, 0], // Level 6
      [0, 0, 0], // Level 7
      [0, 0, 0], // Level 8
      [0, 0, 0], // Level 9
   ];

   // *********************************
   // *         Spell Factory         *
   // *********************************
   buildingData['list'].push('Spell Factory');
   buildingData['number available']['spellfactory'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      1, // Town Hall Level 5
      1, // Town Hall Level 6
      1, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['spellfactory'] = [];
   buildingData['spellfactory']['type']              = "Army";
   buildingData['spellfactory']['available']         = true;
   buildingData['spellfactory']['modes']             = "None";
   buildingData['spellfactory']['preferred target']  = "None";
   buildingData['spellfactory']['multiplier']        = 0;
   buildingData['spellfactory']['boost duration']    = 1;
   buildingData['spellfactory']['boost multiplier']  = 4;
   buildingData['spellfactory']['ground attack']     = false;
   buildingData['spellfactory']['air attack']        = false;
   buildingData['spellfactory']['number of targets'] = 0;
   buildingData['spellfactory']['number of rounds']  = 0;
   buildingData['spellfactory']['splash radius']     = -1;
   buildingData['spellfactory']['size']              = '3x3';
   buildingData['spellfactory']['attack speed']      = 0;
   buildingData['spellfactory']['range']             = 0;
   buildingData['spellfactory']['minimum range']     = 0;
   buildingData['spellfactory']['trigger range']     = 0;
   buildingData['spellfactory']['description'] =
      'The Spell Factory is home to veteran Wizards who are better suited to ' +
      'creating magical weapons than front-line combat. Use their powerful Attack ' +
      'Spells to turn the tide of a battle in your favor!';
   buildingData['spellfactory']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
   ];
   buildingData['spellfactory']['hitpoints'] = [
      425, // Level 1
      470, // Level 2
      520, // Level 3
      600, // Level 4
      720, // Level 5
   ];
   buildingData['spellfactory']['required town hall'] = [
       5, // Level 1
       6, // Level 2
       7, // Level 3
       9, // Level 4
      10, // Level 5
   ];
   buildingData['spellfactory']['boost cost'] = [
      10, // Level 1
      10, // Level 2
      10, // Level 3
      10, // Level 4
      10, // Level 5
   ];
   buildingData['spellfactory']['upgrade time'] = [
       86400, // Level 1
      172800, // Level 2
      345600, // Level 3
      432000, // Level 4
      518400, // Level 5
   ];
   buildingData['spellfactory']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      0, // Level 5
   ];
   buildingData['spellfactory']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
   ];
   buildingData['spellfactory']['spell storage'] = [
       2, // Level 1
       4, // Level 2
       6, // Level 3
       8, // Level 4
      10, // Level 5
   ];
   buildingData['spellfactory']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
   ];
   buildingData['spellfactory']['upgrade cost'] = [
      [0,  200000, 0], // Level 1
      [0,  400000, 0], // Level 2
      [0,  800000, 0], // Level 3
      [0, 1600000, 0], // Level 4
      [0, 3200000, 0], // Level 5
   ];
   buildingData['spellfactory']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
      [0, 0, 0], // Level 5
   ];

   // *********************************
   // *      Dark Spell Factory       *
   // *********************************
   buildingData['list'].push('Dark Spell Factory');
   buildingData['number available']['darkspellfactory'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      0, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['darkspellfactory'] = [];
   buildingData['darkspellfactory']['type']              = "Army";
   buildingData['darkspellfactory']['available']         = true;
   buildingData['darkspellfactory']['modes']             = "None";
   buildingData['darkspellfactory']['preferred target']  = "None";
   buildingData['darkspellfactory']['multiplier']        = 0;
   buildingData['darkspellfactory']['boost duration']    = 1;
   buildingData['darkspellfactory']['boost multiplier']  = 4;
   buildingData['darkspellfactory']['ground attack']     = false;
   buildingData['darkspellfactory']['air attack']        = false;
   buildingData['darkspellfactory']['number of targets'] = 0;
   buildingData['darkspellfactory']['number of rounds']  = 0;
   buildingData['darkspellfactory']['splash radius']     = -1;
   buildingData['darkspellfactory']['size']              = '3x3';
   buildingData['darkspellfactory']['attack speed']      = 0;
   buildingData['darkspellfactory']['range']             = 0;
   buildingData['darkspellfactory']['minimum range']     = 0;
   buildingData['darkspellfactory']['trigger range']     = 0;
   buildingData['darkspellfactory']['description'] =
      'Only the most brilliant or reckless Master Wizards dabble in Dark Elixir ' +
      'brewery. Their compact Dark Spells require keen insight to master, but ' +
      'provide unique tactical advantages.';
   buildingData['darkspellfactory']['dps'] = [ 
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
   ];
   buildingData['darkspellfactory']['hitpoints'] = [
      600, // Level 1
      660, // Level 2
      720, // Level 3
      780, // Level 4
   ];
   buildingData['darkspellfactory']['required town hall'] = [
       8, // Level 1
       8, // Level 2
       9, // Level 3
       9, // Level 4
   ];
   buildingData['darkspellfactory']['boost cost'] = [
      10, // Level 1
      10, // Level 2
      10, // Level 3
      10, // Level 4
   ];
   buildingData['darkspellfactory']['upgrade time'] = [
      345600, // Level 1
      518400, // Level 2
      691200, // Level 3
      864000, // Level 4
   ];
   buildingData['darkspellfactory']['housing space'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
   ];
   buildingData['darkspellfactory']['capacity'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
   ];
   buildingData['darkspellfactory']['spell storage'] = [
      1, // Level 1
      1, // Level 2
      1, // Level 3
      1, // Level 4
   ];
   buildingData['darkspellfactory']['production'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
   ];
   buildingData['darkspellfactory']['upgrade cost'] = [
      [0,  1500000, 0], // Level 1
      [0,  2500000, 0], // Level 2
      [0,  3500000, 0], // Level 3
      [0,  4500000, 0], // Level 4
   ];
   buildingData['darkspellfactory']['rearm cost'] = [
      [0, 0, 0], // Level 1
      [0, 0, 0], // Level 2
      [0, 0, 0], // Level 3
      [0, 0, 0], // Level 4
   ];

   // *********************************
   // *     Barbarian King Altar      *
   // *********************************
   buildingData['list'].push('Barbarian King Altar');
   buildingData['number available']['barbariankingaltar'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      1, // Town Hall Level 7
      1, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['barbariankingaltar'] = [];
   buildingData['barbariankingaltar']['type']              = "Army";
   buildingData['barbariankingaltar']['available']         = true;
   buildingData['barbariankingaltar']['modes']             = "None";
   buildingData['barbariankingaltar']['preferred target']  = "None";
   buildingData['barbariankingaltar']['multiplier']        = 0;
   buildingData['barbariankingaltar']['boost duration']    = 0;
   buildingData['barbariankingaltar']['boost multiplier']  = 1;
   buildingData['barbariankingaltar']['ground attack']     = false;
   buildingData['barbariankingaltar']['air attack']        = false;
   buildingData['barbariankingaltar']['number of targets'] = 0;
   buildingData['barbariankingaltar']['number of rounds']  = 0;
   buildingData['barbariankingaltar']['splash radius']     = -1;
   buildingData['barbariankingaltar']['size']              = '3x3';
   buildingData['barbariankingaltar']['attack speed']      = 0;
   buildingData['barbariankingaltar']['range']             = 0;
   buildingData['barbariankingaltar']['minimum range']     = 0;
   buildingData['barbariankingaltar']['trigger range']     = 0;
   buildingData['barbariankingaltar']['description'] =
      'The Barbarian King is the toughest and meanest barbarian in all the realm, ' +
      'whose appetite for Dark Elixir has caused him to grow to a giant size. He ' +
      'can attack enemy villages or guard your village.';
   buildingData['barbariankingaltar']['dps'] = [ 
      0, // Level 1
   ];
   buildingData['barbariankingaltar']['hitpoints'] = [
      250, // Level 1
   ];
   buildingData['barbariankingaltar']['required town hall'] = [
      7, // Level 1
   ];
   buildingData['barbariankingaltar']['boost cost'] = [
      -1, // Level 1
   ];
   buildingData['barbariankingaltar']['upgrade time'] = [
      0, // Level 1
   ];
   buildingData['barbariankingaltar']['housing space'] = [
      0, // Level 1
   ];
   buildingData['barbariankingaltar']['capacity'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['barbariankingaltar']['production'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['barbariankingaltar']['upgrade cost'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['barbariankingaltar']['rearm cost'] = [
      [0, 0, 0], // Level 1
   ];

   // *********************************
   // *      Archer Queen Altar       *
   // *********************************
   buildingData['list'].push('Archer Queen Altar');
   buildingData['number available']['archerqueenaltar'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      0, // Town Hall Level 7
      0, // Town Hall Level 8
      1, // Town Hall Level 9
      1, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['archerqueenaltar'] = [];
   buildingData['archerqueenaltar']['type']              = "Army";
   buildingData['archerqueenaltar']['available']         = true;
   buildingData['archerqueenaltar']['modes']             = "None";
   buildingData['archerqueenaltar']['preferred target']  = "None";
   buildingData['archerqueenaltar']['multiplier']        = 0;
   buildingData['archerqueenaltar']['boost duration']    = 0;
   buildingData['archerqueenaltar']['boost multiplier']  = 1;
   buildingData['archerqueenaltar']['ground attack']     = false;
   buildingData['archerqueenaltar']['air attack']        = false;
   buildingData['archerqueenaltar']['number of targets'] = 0;
   buildingData['archerqueenaltar']['number of rounds']  = 0;
   buildingData['archerqueenaltar']['splash radius']     = -1;
   buildingData['archerqueenaltar']['size']              = '3x3';
   buildingData['archerqueenaltar']['attack speed']      = 0;
   buildingData['archerqueenaltar']['range']             = 0;
   buildingData['archerqueenaltar']['minimum range']     = 0;
   buildingData['archerqueenaltar']['trigger range']     = 0;
   buildingData['archerqueenaltar']['description'] =
      'The Archer Queen is an eagle-eyed warrior, whose weapon of choice is a ' +
      'modified X-Bow that few men could dream of wielding. She can attack enemy ' +
      'villages or guard your village.';
   buildingData['archerqueenaltar']['dps'] = [ 
      0, // Level 1
   ];
   buildingData['archerqueenaltar']['hitpoints'] = [
      250, // Level 1
   ];
   buildingData['archerqueenaltar']['required town hall'] = [
      9, // Level 1
   ];
   buildingData['archerqueenaltar']['boost cost'] = [
      -1, // Level 1
   ];
   buildingData['archerqueenaltar']['upgrade time'] = [
      0, // Level 1
   ];
   buildingData['archerqueenaltar']['housing space'] = [
      0, // Level 1
   ];
   buildingData['archerqueenaltar']['capacity'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['archerqueenaltar']['production'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['archerqueenaltar']['upgrade cost'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['archerqueenaltar']['rearm cost'] = [
      [0, 0, 0], // Level 1
   ];

   // *********************************
   // *      Grand Warden Altar       *
   // *********************************
   buildingData['list'].push('Grand Warden Altar');
   buildingData['number available']['grandwardenaltar'] = [ 
      0, // Town Hall Level 1
      0, // Town Hall Level 2
      0, // Town Hall Level 3
      0, // Town Hall Level 4
      0, // Town Hall Level 5
      0, // Town Hall Level 6
      0, // Town Hall Level 7
      0, // Town Hall Level 8
      0, // Town Hall Level 9
      0, // Town Hall Level 10
      1, // Town Hall Level 11
   ];
   buildingData['grandwardenaltar'] = [];
   buildingData['grandwardenaltar']['type']              = "Army";
   buildingData['grandwardenaltar']['available']         = true;
   buildingData['grandwardenaltar']['modes']             = "None";
   buildingData['grandwardenaltar']['preferred target']  = "None";
   buildingData['grandwardenaltar']['multiplier']        = 0;
   buildingData['grandwardenaltar']['boost duration']    = 0;
   buildingData['grandwardenaltar']['boost multiplier']  = 1;
   buildingData['grandwardenaltar']['ground attack']     = false;
   buildingData['grandwardenaltar']['air attack']        = false;
   buildingData['grandwardenaltar']['number of targets'] = 0;
   buildingData['grandwardenaltar']['number of rounds']  = 0;
   buildingData['grandwardenaltar']['splash radius']     = -1;
   buildingData['grandwardenaltar']['size']              = '3x3';
   buildingData['grandwardenaltar']['attack speed']      = 0;
   buildingData['grandwardenaltar']['range']             = 0;
   buildingData['grandwardenaltar']['minimum range']     = 0;
   buildingData['grandwardenaltar']['trigger range']     = 0;
   buildingData['grandwardenaltar']['description'] =
      'This veteran battle-scholar seeks out groups of friendly troops to fight behind and boost with his Life Aura, ' +
      'and assumes the form of a tower on defence. Attacking, he can walk over walls or fly high, ' +
      'and can make nearby troops immune to damage once his Eternal Tome ability is unlocked!';
   buildingData['grandwardenaltar']['dps'] = [ 
      0, // Level 1
   ];
   buildingData['grandwardenaltar']['hitpoints'] = [
      250, // Level 1
   ];
   buildingData['grandwardenaltar']['required town hall'] = [
      11, // Level 1
   ];
   buildingData['grandwardenaltar']['boost cost'] = [
      -1, // Level 1
   ];
   buildingData['grandwardenaltar']['upgrade time'] = [
      0, // Level 1
   ];
   buildingData['grandwardenaltar']['housing space'] = [
      0, // Level 1
   ];
   buildingData['grandwardenaltar']['capacity'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['grandwardenaltar']['production'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['grandwardenaltar']['upgrade cost'] = [
      [0, 0, 0], // Level 1
   ];
   buildingData['grandwardenaltar']['rearm cost'] = [
      [0, 0, 0], // Level 1
   ];
}