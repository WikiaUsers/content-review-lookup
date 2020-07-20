function timeStamp_TroopInfo_js() {
   return "2017.10.16 00:18 (UTC-7)";
}

/*
 * Function to return all relevant troop info.
 *
 * Usage: troopInfo(troop type, info type, (optional) troop level)
 *
 * Information (info type) currently provided:
 * ===========================================
 * General (information is not level-dependent)
 *
 * 'subtroop'          ('Skeleton' for Witch, 'Lava Pup' for Lava Hound, etc.)
 * 'subtype'           ('Witch' for Skeleton, 'Golem' for Golemite, etc.)
 * 'subtroop cooldown' (seconds between summons, 'death' for on death)
 * 'type'              (Ground or Air)
 * 'preferred target'  (None, Defenses, Resources, etc.)
 * 'multiplier'        (Damage multiplier vs. preferred target)
 * 'ground attack'     (whether a troop can attack ground targets (true/false))
 * 'air attack'        (whether a troop can attack air targets (true/false))
 * 'splash radius'     (tile radius of splash damage; -1 for single target)
 * 'housing space'     (amount of housing space used by troop)
 * 'training time'     (training time in seconds)
 * 'movement speed'    (in-game-reported movement speed)
 * 'attack speed'      (attack speed in seconds)
 * 'barracks type'     (Normal or Dark)
 * 'barracks level'    (level of Barracks that unlocks the troop)
 * 'range'             (attack range, <= 1 is considered melee)
 * 'death range'       (splash range of damage caused upon death, -1 if none)
 * 'description'       (in-game troop description)
 * 'levels'            (returns number of troop levels defined)
 *
 * Level-specific information
 * 
 * 'dps'              (damage per second)
 * 'death damage'     (damage caused upon death (undefined if none))
 * 'hitpoints'        (troop hit points)
 * 'training cost'    (training cost (Normal=elixir, Dark=DE))
 * 'laboratory level' (lab required to upgrade troop to that level)
 * 'research time'    (research time in hours)
 * 'research cost'    (research cost (Normal=elixir, Dark=DE))
 * 'subtroops'        (number of subtroops spawned, if any)
 * 'max subtroops'    (maximum number of subtroops on the battlefield at once)
 *
 * For the level-specific information:
 * If you do not provide the 'intLevel' argument you will receive the 
 * entire array of information. Providing that argument will return a
 * single number for that particular troop level.
 *
 * To return a simple list of troops, provide a first argument of 'list'.
 * You can filter the list with the following second arguments:
 *   'normal'          for normal-barracks troops
 *   'dark'            for dark-barracks troops
 *   'trainable'       for all regular trainable troops (no Skeletons, etc.)
 *   'non-trainable'   for Golemites, Skeletons and Lava Pups only
 * Also defined are:
 *   'normal trainable'
 *   'dark trainable'
 *   'normal non-trainable'
 *   'dark non-trainable'
 */

/* Load information into global variables for performance */
var troopData;
var spellData;
var heroData;
var abilityData;

function troopInfo(strTroop, strInfo, intLevel) {
   if (!(Array.isArray(troopData)))
      populateTroopData();

   var sTroop = strTroop.toLowerCase();
   var sInfo  = (arguments.length > 1 ? strInfo.toLowerCase() : '');

   if (sTroop === 'list') {
      var criteria = [];
      var value    = [];

      switch (sInfo) {
         case 'normal':
            criteria = ['barracks type'];
            value    = ['Normal'       ];
            break;
         case 'dark':
            criteria = ['barracks type'];
            value    = ['Dark'         ];
            break;
         case 'trainable':
            criteria = ['trainable'];
            value    = [true       ];
            break;
         case 'non-trainable':
            criteria = ['trainable'];
            value    = [false      ];
            break;
         case 'normal trainable':
            criteria = ['barracks type', 'trainable'];
            value    = ['Normal',        true       ];
            break;
         case 'dark trainable':
            criteria = ['barracks type', 'trainable'];
            value    = ['Dark',          true       ];
            break;
         case 'normal non-trainable':
            criteria = ['barracks type', 'trainable'];
            value    = ['Normal',        false      ];
            break;
         case 'dark non-trainable':
            criteria = ['barracks type', 'trainable'];
            value    = ['Dark',          false      ];
            break;
      }

      var retData = [];
      var tData   = troopData['list'];

      for (var i = 0; i < tData.length; i ++) {
         var include = true;

         for (var j = 0; j < criteria.length; j ++) {
            // Be careful here, we're calling ourselves -- don't pass 'list' as an argument!
            if (troopInfo(tData[i], criteria[j]) !== value[j]) {
               include = false;
               break;
            }
         }

         if (include)
            retData.push(tData[i]);
      }

      return retData;
   }

   // Remove any spaces
   sTroop = sTroop.replace(/ /g,'');

   // No intLevel provided (let 'levels' fall through)
   if (arguments.length === 2 && sInfo !== 'levels')
      return troopData[sTroop][sInfo];

   switch (sInfo) {
      case 'levels':
         return (typeof troopData[sTroop] !== 'undefined' ?
            troopData[sTroop]['hitpoints'].length : 0);
      case 'dps':
      case 'hps':
      case 'death damage':
      case 'hitpoints':
      case 'training cost':
      case 'laboratory level':
      case 'research time':
      case 'research cost':
      case 'subtroops':
      case 'max subtroops':
         return troopData[sTroop][sInfo][intLevel - 1];
      default:
         return troopData[sTroop][sInfo];
   }
}

/* Function called only if troopData does not contain an array */
function populateTroopData() {
   troopData         = [];
   troopData['list'] = [];

   /**************************************/
   /*              Barbarian             */
   /**************************************/
   troopData['list'].push('Barbarian');
   troopData['barbarian'] = [];
   troopData['barbarian']['type']             = "Ground";
   troopData['barbarian']['preferred target'] = "None";
   troopData['barbarian']['multiplier']       = 1;
   troopData['barbarian']['ground attack']    = true;
   troopData['barbarian']['air attack']       = false;
   troopData['barbarian']['splash radius']    = -1;
   troopData['barbarian']['housing space']    = 1;
   troopData['barbarian']['training time']    = 5;
   troopData['barbarian']['movement speed']   = 16;
   troopData['barbarian']['attack speed']     = 1.0;
   troopData['barbarian']['barracks type']    = "Normal";
   troopData['barbarian']['barracks level']   = 1;
   troopData['barbarian']['trainable']        = true;
   troopData['barbarian']['range']            = 0.4;
   troopData['barbarian']['death range']      = -1;
   troopData['barbarian']['description'] =
      'This fearless warrior relies on his bulging muscles and striking ' +
      'mustache to wreak havoc in enemy villages. Release a horde of ' +
      'Barbarians and enjoy the mayhem!';
   troopData['barbarian']['dps'] =
      [ 8,    11,     14,     18,      23,      26,      30];
   troopData['barbarian']['hitpoints'] =
      [45,    54,     65,     78,      95,     110,     125];
   troopData['barbarian']['training cost'] =
      [25,    40,     60,    100,     150,     200,     250];
   troopData['barbarian']['laboratory level'] =
      [ 0,     1,      3,      5,       6,       7,       8];
   troopData['barbarian']['research time'] =
      [ 0,     6,     24,     72,     120,     240,     336];
   troopData['barbarian']['research cost'] =
      [ 0, 50000, 150000, 500000, 1500000, 4500000, 6000000];

   /**************************************/
   /*               Archer               */
   /**************************************/
   troopData['list'].push('Archer');
   troopData['archer'] = [];
   troopData['archer']['type']             = "Ground";
   troopData['archer']['preferred target'] = "None";
   troopData['archer']['multiplier']       = 1;
   troopData['archer']['ground attack']    = true;
   troopData['archer']['air attack']       = true;
   troopData['archer']['splash radius']    = -1;
   troopData['archer']['housing space']    = 1;
   troopData['archer']['training time']    = 6;
   troopData['archer']['movement speed']   = 24;
   troopData['archer']['attack speed']     = 1.0;
   troopData['archer']['barracks type']    = "Normal";
   troopData['archer']['barracks level']   = 2;
   troopData['archer']['trainable']        = true;
   troopData['archer']['range']            = 3.5;
   troopData['archer']['death range']      = -1;
   troopData['archer']['description'] =
      'These sharpshooters like to keep their distance on the battlefield ' +
      'and in life. Nothing makes them happier than single-mindedly taking ' +
      'down their target.';
   troopData['archer']['dps'] =
      [ 7,     9,     12,     16,      20,      22,      25];
   troopData['archer']['hitpoints'] =
      [20,    23,     28,     33,      40,      44,      48];
   troopData['archer']['training cost'] =
      [50,    80,    120,    200,     300,     400,     500];
   troopData['archer']['laboratory level'] =
      [ 0,     1,      3,      5,       6,       7,       8];
   troopData['archer']['research time'] =
      [ 0,    12,     48,     72,     120,     240,     336];
   troopData['archer']['research cost'] =
      [ 0, 50000, 250000, 750000, 2250000, 6000000, 7500000];

   /**************************************/
   /*               Goblin               */
   /**************************************/
   troopData['list'].push('Goblin');
   troopData['goblin'] = [];
   troopData['goblin']['type']             = "Ground";
   troopData['goblin']['preferred target'] = "Resources";
   troopData['goblin']['multiplier']       = 2;
   troopData['goblin']['ground attack']    = true;
   troopData['goblin']['air attack']       = false;
   troopData['goblin']['splash radius']    = -1;
   troopData['goblin']['housing space']    = 1;
   troopData['goblin']['training time']    = 7;
   troopData['goblin']['movement speed']   = 32;
   troopData['goblin']['attack speed']     = 1.0;
   troopData['goblin']['barracks type']    = "Normal";
   troopData['goblin']['barracks level']   = 4;
   troopData['goblin']['trainable']        = true;
   troopData['goblin']['range']            = 0.4;
   troopData['goblin']['death range']      = -1;
   troopData['goblin']['description'] =
      'These peaky little creatures only have eyes for one thing: LOOT! ' +
      'They are faster than a Spring Trap, and their hunger for resources ' +
      'is limitless.';
   troopData['goblin']['dps'] =
      [11,    14,     19,     24,      32,      42,     52];
   troopData['goblin']['hitpoints'] =
      [25,    30,     36,     43,      52,      68,     74];
   troopData['goblin']['training cost'] =
      [25,    40,     60,     80,     100,     150,     200];
   troopData['goblin']['laboratory level'] =
      [ 0,     1,      3,      5,       6,       7,     8];
   troopData['goblin']['research time'] =
      [ 0,    12,     48,     72,     120,     192,     240];
   troopData['goblin']['research cost'] =
      [ 0, 50000, 250000, 750000, 2250000, 4500000, 6750000];

   /**************************************/
   /*                Giant               */
   /**************************************/
   troopData['list'].push('Giant');
   troopData['giant'] = [];
   troopData['giant']['type']             = "Ground";
   troopData['giant']['preferred target'] = "Defenses";
   troopData['giant']['multiplier']       = 1;
   troopData['giant']['ground attack']    = true;
   troopData['giant']['air attack']       = false;
   troopData['giant']['splash radius']    = -1;
   troopData['giant']['housing space']    = 5;
   troopData['giant']['training time']    = 30;
   troopData['giant']['movement speed']   = 12;
   troopData['giant']['attack speed']     = 2.0;
   troopData['giant']['barracks type']    = "Normal";
   troopData['giant']['barracks level']   = 3;
   troopData['giant']['trainable']        = true;
   troopData['giant']['range']            = 1;
   troopData['giant']['death range']      = -1;
   troopData['giant']['description'] =
      'These big guys may seem calm, but show them a turret or cannon and ' +
      'you\'ll see their fury unleashed! Slow yet durable, these warriors ' +
      'are best used to soak up hits.';
   troopData['giant']['dps'] =
      [ 11,     14,     19,     24,      31,      43,      50,      57];
   troopData['giant']['hitpoints'] =
      [300,    360,    430,    520,     670,     940,    1100,      1260];
   troopData['giant']['training cost'] =
      [250,    750,   1250,   1750,    2250,    3000,    3500,      4000];
   troopData['giant']['laboratory level'] =
      [  0,      2,      4,      5,       6,       7,       8,      9];
   troopData['giant']['research time'] =
      [  0,     24,     48,     72,     120,     240,     288,      336];
   troopData['giant']['research cost'] =
      [  0, 100000, 250000, 750000, 2250000, 5000000, 6000000,9500000];

   /**************************************/
   /*            Wall Breaker            */
   /**************************************/
   troopData['list'].push('Wall Breaker');
   troopData['wallbreaker'] = [];
   troopData['wallbreaker']['type']             = "Ground";
   troopData['wallbreaker']['preferred target'] = "Walls";
   troopData['wallbreaker']['multiplier']       = 40;
   troopData['wallbreaker']['ground attack']    = true;
   troopData['wallbreaker']['air attack']       = false;
   troopData['wallbreaker']['splash radius']    = 2;
   troopData['wallbreaker']['housing space']    = 2;
   troopData['wallbreaker']['training time']    = 15;
   troopData['wallbreaker']['movement speed']   = 24;
   troopData['wallbreaker']['attack speed']     = 1.0;
   troopData['wallbreaker']['barracks type']    = "Normal";
   troopData['wallbreaker']['barracks level']   = 5;
   troopData['wallbreaker']['trainable']        = true;
   troopData['wallbreaker']['range']            = 1;
   troopData['wallbreaker']['death range']      = -1;
   troopData['wallbreaker']['description'] =
      'Nothing warms a Wall Breaker\'s cold and undead heart like blowing ' +
      'up walls. A squad of them will make way for your ground units, and ' +
      'they will do it with a BANG!';
   troopData['wallbreaker']['dps'] =
      [  12,     16,     24,     32,      46,      60,      78];
   troopData['wallbreaker']['hitpoints'] =
      [  20,     24,     29,     35,      42,      54,      62];
   troopData['wallbreaker']['training cost'] =
      [1000,   1500,   2000,   2500,    3000,    3500,      4000];
   troopData['wallbreaker']['laboratory level'] =
      [   0,      2,      4,      5,       6,       8,      9];
   troopData['wallbreaker']['research time'] =
      [   0,     24,     48,     72,     120,     240,      288];
   troopData['wallbreaker']['research cost'] =
      [   0, 100000, 250000, 750000, 2000000, 6000000,  9000000];

   /**************************************/
   /*               Balloon              */
   /**************************************/
   troopData['list'].push('Balloon');
   troopData['balloon'] = [];
   troopData['balloon']['type']             = "Air";
   troopData['balloon']['preferred target'] = "Defenses";
   troopData['balloon']['multiplier']       = 1;
   troopData['balloon']['ground attack']    = true;
   troopData['balloon']['air attack']       = false;
   troopData['balloon']['splash radius']    = 1.2;
   troopData['balloon']['housing space']    = 5;
   troopData['balloon']['training time']    = 30;
   troopData['balloon']['movement speed']   = 10;
   troopData['balloon']['attack speed']     = 3.0;
   troopData['balloon']['barracks type']    = "Normal";
   troopData['balloon']['barracks level']   = 6;
   troopData['balloon']['trainable']        = true;
   troopData['balloon']['range']            = 0.5;
   troopData['balloon']['death range']      = 1.2;
   troopData['balloon']['description'] =
      'These promoted skeletons have traded in their joy of destroying ' +
      'walls for a joy of destroying defenses. Deploy them to take out ' +
      'pesky mortars and cannons!';
   troopData['balloon']['dps'] =
      [  25,     32,     48,      72,     108,     162,     198];
   troopData['balloon']['death damage'] =
      [  25,     32,     48,      72,     108,     162,     214];
   troopData['balloon']['hitpoints'] =
      [ 150,    180,    216,     280,     390,     545,     690];
   troopData['balloon']['training cost'] =
      [2000,   2500,   3000,    3500,    4000,    4500,    5000];
   troopData['balloon']['laboratory level'] =
      [   0,      2,      4,       5,       6,       7,       9];
   troopData['balloon']['research time'] =
      [   0,     24,     48,      72,     120,     240,     336];
   troopData['balloon']['research cost'] =
      [   0, 150000, 450000, 1350000, 2500000, 6000000, 9500000];

   /**************************************/
   /*               Wizard               */
   /**************************************/
   troopData['list'].push('Wizard');
   troopData['wizard'] = [];
   troopData['wizard']['type']             = "Ground";
   troopData['wizard']['preferred target'] = "None";
   troopData['wizard']['multiplier']       = 1;
   troopData['wizard']['ground attack']    = true;
   troopData['wizard']['air attack']       = true;
   troopData['wizard']['splash radius']    = 0.3;
   troopData['wizard']['housing space']    = 4;
   troopData['wizard']['training time']    = 30;
   troopData['wizard']['movement speed']   = 16;
   troopData['wizard']['attack speed']     = 1.5;
   troopData['wizard']['barracks type']    = "Normal";
   troopData['wizard']['barracks level']   = 7;
   troopData['wizard']['trainable']        = true;
   troopData['wizard']['range']            = 3;
   troopData['wizard']['death range']      = -1;
   troopData['wizard']['description'] =
      'The wizard is a terrifying presence on the battlefield. Pair him ' +
      'up with some of his fellows and cast concentrated blasts of ' +
      'destruction on anything, land or sky!';
   troopData['wizard']['dps'] =
      [  50,     70,     90,     125,     170,     185,     200,     215];
   troopData['wizard']['hitpoints'] =
      [  75,     90,    108,     130,     156,     175,     190,     210];
   troopData['wizard']['training cost'] =
      [1500,   2000,   2500,    3000,    3500,    4000,    4500,    5000];
   troopData['wizard']['laboratory level'] =
      [   0,      3,      4,       5,       6,       7,       8,       9];
   troopData['wizard']['research time'] =
      [   0,     24,     48,      72,     120,     216,     288,     336];
   troopData['wizard']['research cost'] =
      [   0, 150000, 450000, 1350000, 2500000, 5000000, 7000000, 9000000];

   /**************************************/
   /*               Healer               */
   /**************************************/
   troopData['list'].push('Healer');
   troopData['healer'] = [];
   troopData['healer']['type']             = "Air";
   troopData['healer']['preferred target'] = "None";
   troopData['healer']['multiplier']       = 1;
   troopData['healer']['ground attack']    = false;
   troopData['healer']['air attack']       = false;
   troopData['healer']['ground heal']      = true;
   troopData['healer']['air heal']         = false;
   troopData['healer']['splash radius']    = 2;
   troopData['healer']['housing space']    = 14;
   troopData['healer']['training time']    = 120;
   troopData['healer']['movement speed']   = 16;
   troopData['healer']['attack speed']     = 0.7;
   troopData['healer']['barracks type']    = "Normal";
   troopData['healer']['barracks level']   = 8;
   troopData['healer']['trainable']        = true;
   troopData['healer']['range']            = 5;
   troopData['healer']['death range']      = -1;
   troopData['healer']['description'] =
      'This majestic creature lives to protect and aid her fellow troops. ' +
      'Any army is improved with her healing support, but make sure to ' +
      'protect her from air defenses!';
   troopData['healer']['dps'] =
      [   0,      0,       0,       0,       0];
   troopData['healer']['hps'] =
      [  35,     42,      55,      71,      90];
   troopData['healer']['hitpoints'] =
      [ 500,    600,     840,    1200,    1500];
   troopData['healer']['training cost'] =
      [5000,   6000,    8000,   10000,   15000];
   troopData['healer']['laboratory level'] =
      [   0,      5,       6,       7,       9];
   troopData['healer']['research time'] =
      [   0,     72,     120,     168,     336];
   troopData['healer']['research cost'] =
      [   0, 750000, 1500000, 3000000, 9500000];

   /**************************************/
   /*               Dragon               */
   /**************************************/
   troopData['list'].push('Dragon');
   troopData['dragon'] = [];
   troopData['dragon']['type']             = "Air";
   troopData['dragon']['preferred target'] = "None";
   troopData['dragon']['multiplier']       = 1;
   troopData['dragon']['ground attack']    = true;
   troopData['dragon']['air attack']       = true;
   troopData['dragon']['splash radius']    = 0.3;
   troopData['dragon']['housing space']    = 20;
   troopData['dragon']['training time']    = 180;
   troopData['dragon']['movement speed']   = 16;
   troopData['dragon']['attack speed']     = 1.25;
   troopData['dragon']['barracks type']    = "Normal";
   troopData['dragon']['barracks level']   = 9;
   troopData['dragon']['trainable']        = true;
   troopData['dragon']['range']            = 3;
   troopData['dragon']['death range']      = -1;
   troopData['dragon']['description'] =
      'The might of the dragons are known throughout the land. The scaly ' +
      'terror of the skies feels no mercy and nothing will escape the fiery ' +
      'splashes of his breath.';
   troopData['dragon']['dps'] =
      [  140,     160,     180,     210,     240,     270];
   troopData['dragon']['hitpoints'] =
      [ 1900,    2100,    2300,    2600,    2900,    3200];
   troopData['dragon']['training cost'] =
      [25000,   29000,   33000,   37000,   42000,   46000];
   troopData['dragon']['laboratory level'] =
      [    0,       5,       6,       7,       8,       9];
   troopData['dragon']['research time'] =
      [    0,     168,     216,     240,     288,     336];
   troopData['dragon']['research cost'] =
      [    0, 2000000, 3000000, 5000000, 7000000, 9000000];

   /**************************************/
   /*              P.E.K.K.A             */
   /**************************************/
   troopData['list'].push('P.E.K.K.A');
   troopData['p.e.k.k.a'] = [];
   troopData['p.e.k.k.a']['type']             = "Ground";
   troopData['p.e.k.k.a']['preferred target'] = "None";
   troopData['p.e.k.k.a']['multiplier']       = 1;
   troopData['p.e.k.k.a']['ground attack']    = true;
   troopData['p.e.k.k.a']['air attack']       = false;
   troopData['p.e.k.k.a']['splash radius']    = -1;
   troopData['p.e.k.k.a']['housing space']    = 25;
   troopData['p.e.k.k.a']['training time']    = 180;
   troopData['p.e.k.k.a']['movement speed']   = 16;
   troopData['p.e.k.k.a']['attack speed']     = 1.8;
   troopData['p.e.k.k.a']['barracks type']    = "Normal";
   troopData['p.e.k.k.a']['barracks level']   = 10;
   troopData['p.e.k.k.a']['trainable']        = true;
   troopData['p.e.k.k.a']['range']            = 0.8;
   troopData['p.e.k.k.a']['death range']      = -1;
   troopData['p.e.k.k.a']['description'] = 
      'Is P.E.K.K.A a knight? A samurai? A robot? No one knows! ' +
      'P.E.K.K.A\'s armor absorbs even the mightiest of blows, but ' +
      'it doesn\'t handle electricity too well.';
   troopData['p.e.k.k.a']['dps'] =
      [  240,     270,     310,     360,     410,      470];
   troopData['p.e.k.k.a']['hitpoints'] =
      [ 2800,    3100,    3500,    4000,    4500,     5100];
   troopData['p.e.k.k.a']['training cost'] =
      [28000,   32000,   36000,   40000,   45000,    50000];
   troopData['p.e.k.k.a']['laboratory level'] =
      [    0,       6,       6,       8,       8,        9];
   troopData['p.e.k.k.a']['research time'] =
      [    0,     192,     216,     240,     288,      336];
   troopData['p.e.k.k.a']['research cost'] =
      [    0, 3000000, 5000000, 6000000, 7500000, 10000000];
      
   /**************************************/
   /*              Baby Dragon           */
   /**************************************/
   troopData['list'].push('Baby Dragon');
   troopData['babydragon'] = [];
   troopData['babydragon']['type']             = "Air";
   troopData['babydragon']['preferred target'] = "None";
   troopData['babydragon']['multiplier']       = 1;
   troopData['babydragon']['ground attack']    = true;
   troopData['babydragon']['air attack']       = true;
   troopData['babydragon']['splash radius']    = 0.3;
   troopData['babydragon']['housing space']    = 10;
   troopData['babydragon']['training time']    = 90;
   troopData['babydragon']['movement speed']   = 16;
   troopData['babydragon']['attack speed']     = 1;
   troopData['babydragon']['barracks type']    = "Normal";
   troopData['babydragon']['barracks level']   = 11;
   troopData['babydragon']['trainable']        = true;
   troopData['babydragon']['range']            = 3;
   troopData['babydragon']['death range']      = -1;
   troopData['babydragon']['description'] = 
      '"This Fire-Breathing Hatchling is shy around other air units, but leave it alone and it will throw a fit! ' +
      'When not around other air units, Baby Dragons become enraged and gain bonus damage and attack speed.'
   troopData['babydragon']['dps'] =
      [  75,     85,     95,     105,     115];
   troopData['babydragon']['hitpoints'] =
      [ 1200,    1300,    1400,    1500,    1600];
   troopData['babydragon']['training cost'] =
      [15000,   16000,   17000,   18000,   19000];
   troopData['babydragon']['laboratory level'] =
      [    0,       7,       8,       8,        9];
   troopData['babydragon']['research time'] =
      [    0,     192,     240,     288,      336];
   troopData['babydragon']['research cost'] =
      [    0, 5000000, 6000000, 7000000, 8000000];
      
   /**************************************/
   /*              Miner                 */
   /**************************************/
   troopData['list'].push('Miner');
   troopData['miner'] = [];
   troopData['miner']['type']             = "Ground";
   troopData['miner']['preferred target'] = "None";
   troopData['miner']['multiplier']       = 1;
   troopData['miner']['ground attack']    = true;
   troopData['miner']['air attack']       = false;
   troopData['miner']['splash radius']    = -1;
   troopData['miner']['housing space']    = 5;
   troopData['miner']['training time']    = 30;
   troopData['miner']['movement speed']   = 20;
   troopData['miner']['attack speed']     = 1.7;
   troopData['miner']['barracks type']    = "Normal";
   troopData['miner']['barracks level']   = 12;
   troopData['miner']['trainable']        = true;
   troopData['miner']['range']            = 0.5;
   troopData['miner']['death range']      = -1;
   troopData['miner']['description'] = 
      'These sneaky shovelers burrow underground, pass beneath walls and pop up right next to their targets. ' +
      'While underground, Miners cannot be damaged and will not trigger traps, but still gain bonuses from Spells.';
   troopData['miner']['dps'] =
      [  80,     88,     96,     104,     112];
   troopData['miner']['hitpoints'] =
      [ 550,    610,    670,    730,    800];
   troopData['miner']['training cost'] =
      [4200,   4800,   5200,   5600,   6000];
   troopData['miner']['laboratory level'] =
      [    0,       8,       8,       9,        9];
   troopData['miner']['research time'] =
      [    0,     192,     240,     288,      336];
   troopData['miner']['research cost'] =
      [    0, 6000000, 7000000, 8000000, 9500000];

   /**************************************/
   /*               Minion               */
   /**************************************/
   troopData['list'].push('Minion');
   troopData['minion'] = [];
   troopData['minion']['type']             = "Air";
   troopData['minion']['preferred target'] = "None";
   troopData['minion']['multiplier']       = 1;
   troopData['minion']['ground attack']    = true;
   troopData['minion']['air attack']       = true;
   troopData['minion']['splash radius']    = -1;
   troopData['minion']['housing space']    = 2;
   troopData['minion']['training time']    = 18;
   troopData['minion']['movement speed']   = 32;
   troopData['minion']['attack speed']     = 1.0;
   troopData['minion']['barracks type']    = "Dark";
   troopData['minion']['barracks level']   = 1;
   troopData['minion']['trainable']        = true;
   troopData['minion']['range']            = 2.75;
   troopData['minion']['death range']      = -1;
   troopData['minion']['description'] = 
      'This terror of the skies was born out of Dark Elixir. Undetectable ' +
      'by the Seeking Air Mine, Minions materialize with ease, but are ' +
      'fragile in our world.';
   troopData['minion']['dps'] =
      [ 35,    38,    42,    46,    50,     54,     58];
   troopData['minion']['hitpoints'] =
      [ 55,    60,    66,    72,    78,     84,     90];
   troopData['minion']['training cost'] =
      [  6,     7,     8,     9,    10,     11,     12];
   troopData['minion']['laboratory level'] =
      [  0,     5,     6,     6,     7,      8,     9];
   troopData['minion']['research time'] =
      [  0,   120,   144,   168,   240,    288,     336];
   troopData['minion']['research cost'] =
      [  0, 10000, 20000, 30000, 40000, 100000,140000];

   /**************************************/
   /*              Hog Rider             */
   /**************************************/
   troopData['list'].push('Hog Rider');
   troopData['hogrider'] = [];
   troopData['hogrider']['type']             = "Ground";
   troopData['hogrider']['preferred target'] = "Defenses";
   troopData['hogrider']['multiplier']       = 1;
   troopData['hogrider']['ground attack']    = true;
   troopData['hogrider']['air attack']       = false;
   troopData['hogrider']['splash radius']    = -1;
   troopData['hogrider']['housing space']    = 5;
   troopData['hogrider']['training time']    = 45;
   troopData['hogrider']['movement speed']   = 24;
   troopData['hogrider']['attack speed']     = 1.0;
   troopData['hogrider']['barracks type']    = "Dark";
   troopData['hogrider']['barracks level']   = 2;
   troopData['hogrider']['trainable']        = true;
   troopData['hogrider']['range']            = 0.6;
   troopData['hogrider']['death range']      = -1;
   troopData['hogrider']['description'] = 
      'Having tamed the fierce leaping hog, the Hog Rider punishes those ' +
      'who hide behind their puny walls! Fueled by Dark Elixir, these ' +
      'warriors have never known defeat!';
   troopData['hogrider']['dps'] =
      [ 60,    70,    80,    92,   105,     118,    135];
   troopData['hogrider']['hitpoints'] =
      [270,   312,   360,   415,   480,     590,    700];
   troopData['hogrider']['training cost'] =
      [ 40,    45,    52,    58,    65,     90,     115];
   troopData['hogrider']['laboratory level'] =
      [  0,     5,     6,     6,     7,     8,      9];
   troopData['hogrider']['research time'] =
      [  0,   120,  144,    192,   240,   288,   336];
   troopData['hogrider']['research cost'] =
      [  0, 20000, 30000, 40000, 50000, 100000, 150000];

   /**************************************/
   /*              Valkyrie              */
   /**************************************/
   troopData['list'].push('Valkyrie');
   troopData['valkyrie'] = [];
   troopData['valkyrie']['type']             = "Ground";
   troopData['valkyrie']['preferred target'] = "None";
   troopData['valkyrie']['multiplier']       = 1;
   troopData['valkyrie']['ground attack']    = true;
   troopData['valkyrie']['air attack']       = false;
   troopData['valkyrie']['splash radius']    = 1;
   troopData['valkyrie']['housing space']    = 8;
   troopData['valkyrie']['training time']    = 90;
   troopData['valkyrie']['movement speed']   = 24;
   troopData['valkyrie']['attack speed']     = 1.8;
   troopData['valkyrie']['barracks type']    = "Dark";
   troopData['valkyrie']['barracks level']   = 3;
   troopData['valkyrie']['trainable']        = true;
   troopData['valkyrie']['range']            = 0.5;
   troopData['valkyrie']['death range']      = -1;
   troopData['valkyrie']['description'] = 
      'A master of the two-handed axe, this glorious warrior runs ' +
      'between nearby buildings and can shred several troops or ' +
      'buildings at once with her whirlwind blow!';
   troopData['valkyrie']['dps'] =
      [ 94,    106,   119,   133,   148,    163];
   troopData['valkyrie']['hitpoints'] =
      [750,  800,  850,  900,   1100,   1200];
   troopData['valkyrie']['training cost'] =
      [ 70,   100,   130,   160,    190,    220];
   troopData['valkyrie']['laboratory level'] =
      [  0,     6,     7,     7,    8,      9];
   troopData['valkyrie']['research time'] =
      [  0,   192,  240,   288,   336,      336];
   troopData['valkyrie']['research cost'] =
      [  0, 50000, 60000, 70000,    110000,     150000];

   /**************************************/
   /*                Golem               */
   /**************************************/
   troopData['list'].push('Golem');
   troopData['golem'] = [];
   troopData['golem']['type']              = "Ground";
   troopData['golem']['preferred target']  = "Defenses";
   troopData['golem']['multiplier']        = 1;
   troopData['golem']['ground attack']     = true;
   troopData['golem']['air attack']        = false;
   troopData['golem']['splash radius']     = -1;
   troopData['golem']['housing space']     = 30;
   troopData['golem']['training time']     = 300;
   troopData['golem']['movement speed']    = 12;
   troopData['golem']['attack speed']      = 2.4;
   troopData['golem']['barracks type']     = "Dark";
   troopData['golem']['barracks level']    = 4;
   troopData['golem']['trainable']         = true;
   troopData['golem']['range']             = 1;
   troopData['golem']['death range']       = 1.2;
   troopData['golem']['subtroop']          = 'Golemite';
   troopData['golem']['subtroop cooldown'] = 'death';
   troopData['golem']['description'] = 
      'The mighty Golem loves to soak up damage! When destroyed, it ' +
      'explodes and splits in two. The resulting Golemites have one-fifth ' +
      'the Golem\'s strength and hitpoints.';
   troopData['golem']['dps'] =
      [  38,    42,    46,    50,    54,    58,     62];
   troopData['golem']['death damage'] =
      [ 350,   400,   450,   500,   530,    560,    590];
   troopData['golem']['hitpoints'] =
      [4500,  5000,  5500,  6000,  6300,    6600,   6900];
   troopData['golem']['training cost'] =
      [ 450,   525,   600,   675,   750,    825,    900];
   troopData['golem']['laboratory level'] =
      [   0,     6,     7,     7,     8,    9,  9];
   troopData['golem']['research time'] =
      [   0,   144,     192,    240,   288,   336,  336];
   troopData['golem']['research cost'] =
      [   0, 60000, 70000, 80000, 90000,    150000, 200000];
   troopData['golem']['subtroops'] =
      [   2,     2,     2,     2,     2,    2,  2];
   troopData['golem']['max subtroops'] =
      [   2,     2,     2,     2,     2,    2,  2];

   /**************************************/
   /*              Golemite              */
   /**************************************/
   troopData['list'].push('Golemite');
   troopData['golemite'] = [];
   troopData['golemite']['subtype']          = "Golem";
   troopData['golemite']['type']             = "Ground";
   troopData['golemite']['preferred target'] = "Defenses";
   troopData['golemite']['multiplier']       = 1;
   troopData['golemite']['ground attack']    = true;
   troopData['golemite']['air attack']       = false;
   troopData['golemite']['splash radius']    = -1;
   troopData['golemite']['housing space']    = 0;
   troopData['golemite']['training time']    = 0;
   troopData['golemite']['movement speed']   = 12;
   troopData['golemite']['attack speed']     = 3;
   troopData['golemite']['barracks type']    = "Dark";
   troopData['golemite']['barracks level']   = 4;
   troopData['golemite']['trainable']        = false;
   troopData['golemite']['range']            = 0.5;
   troopData['golemite']['death range']      = 1.2;
   troopData['golemite']['description'] = 
      'Golemites are smaller Golems constructed within the gargantuan creature. ' +
      'When the Golem is destroyed, the Golemites spring to life and keep fighting!';
   troopData['golemite']['dps'] =
      [  7,    8,    9,   10,   11, 12, 13];
   troopData['golemite']['death damage'] =
      [ 70,   80,   90,  100,  106, 112,    118];
   troopData['golemite']['hitpoints'] =
      [900, 1000, 1100, 1200, 1260, 1320,   1380];
   troopData['golemite']['training cost'] =
      [  0,    0,    0,    0,    0,     0,  0];
   troopData['golemite']['laboratory level'] =
      [  0,    6,    7,    7,    8,     9,  9];
   troopData['golemite']['research time'] =
      [  0,    0,    0,    0,    0,     0,  0];
   troopData['golemite']['research cost'] =
      [  0,    0,    0,    0,    0,     0,  0];

   /**************************************/
   /*                Witch               */
   /**************************************/
   troopData['list'].push('Witch');
   troopData['witch'] = [];
   troopData['witch']['type']              = "Ground";
   troopData['witch']['preferred target']  = "None";
   troopData['witch']['multiplier']        = 1;
   troopData['witch']['ground attack']     = true;
   troopData['witch']['air attack']        = true;
   troopData['witch']['splash radius']     = 0.3;
   troopData['witch']['housing space']     = 12;
   troopData['witch']['training time']     = 180;
   troopData['witch']['movement speed']    = 12;
   troopData['witch']['attack speed']      = 0.7;
   troopData['witch']['barracks type']     = "Dark";
   troopData['witch']['barracks level']    = 5;
   troopData['witch']['trainable']         = true;
   troopData['witch']['range']             = 4;
   troopData['witch']['death range']       = -1;
   troopData['witch']['subtroop']          = 'Skeleton';
   troopData['witch']['subtroop cooldown'] = 6;
   troopData['witch']['description'] = 
      'The Witch never fights alone, constantly raising dead warriors. ' +
      'Upgraded Witches raise more skeletons at a time.';
   troopData['witch']['dps'] =
      [ 50,    60,      70];
   troopData['witch']['hitpoints'] =
      [270,   300,      330];
   troopData['witch']['training cost'] =
      [250,   350,      450];
   troopData['witch']['laboratory level'] =
      [  0,     7,      9];
   troopData['witch']['research time'] =
      [  0,   240,      336];
   troopData['witch']['research cost'] =
      [  0, 75000,      160000];
   troopData['witch']['subtroops'] =
      [  3,     4,      5];
   troopData['witch']['max subtroops'] =
      [  6,     8,      10];

   /**************************************/
   /*              Skeleton              */
   /**************************************/
   troopData['list'].push('Skeleton');
   troopData['skeleton'] = [];
   troopData['skeleton']['subtype']          = "Witch";
   troopData['skeleton']['type']             = "Ground";
   troopData['skeleton']['preferred target'] = "None";
   troopData['skeleton']['multiplier']       = 1;
   troopData['skeleton']['ground attack']    = true;
   troopData['skeleton']['air attack']       = false;
   troopData['skeleton']['splash radius']    = -1;
   troopData['skeleton']['housing space']    = 0;
   troopData['skeleton']['training time']    = 0;
   troopData['skeleton']['movement speed']   = 24;
   troopData['skeleton']['attack speed']     = 1;
   troopData['skeleton']['barracks type']    = "Dark";
   troopData['skeleton']['barracks level']   = 5;
   troopData['skeleton']['trainable']        = false;
   troopData['skeleton']['range']            = 0.4;
   troopData['skeleton']['death range']      = -1;
   troopData['skeleton']['description'] =
      'This undead creature poses little threat by itself. But it never ' +
      'fights alone, since the Witch can summon an endless horde of ' +
      'Skeletons against your enemy!';
   troopData['skeleton']['dps'] =
      [ 25];
   troopData['skeleton']['hitpoints'] =
      [ 30];
   troopData['skeleton']['training cost'] =
      [  0];
   troopData['skeleton']['laboratory level'] =
      [  0];
   troopData['skeleton']['research time'] =
      [  0];
   troopData['skeleton']['research cost'] =
      [  0];

   /**************************************/
   /*             Lava Hound             */
   /**************************************/
   troopData['list'].push('Lava Hound');
   troopData['lavahound'] = [];
   troopData['lavahound']['type']              = "Air";
   troopData['lavahound']['preferred target']  = "Air Defense";
   troopData['lavahound']['multiplier']        = 1;
   troopData['lavahound']['ground attack']     = true;
   troopData['lavahound']['air attack']        = false;
   troopData['lavahound']['splash radius']     = -1;
   troopData['lavahound']['housing space']     = 30;
   troopData['lavahound']['training time']     = 300;
   troopData['lavahound']['movement speed']    = 20;
   troopData['lavahound']['attack speed']      = 2;
   troopData['lavahound']['barracks type']     = "Dark";
   troopData['lavahound']['barracks level']    = 6;
   troopData['lavahound']['trainable']         = true;
   troopData['lavahound']['range']             = 1;
   troopData['lavahound']['death range']       = 1.2;
   troopData['lavahound']['subtroop']          = 'Lava Pup';
   troopData['lavahound']['subtroop cooldown'] = 'death';
   troopData['lavahound']['description'] = 
      'These fiery beasts can\'t resist chasing after Air Defenses, providing excellent ' +
      'protection for other troops. Once destroyed, they erupt into many smaller, ' +
      'weaker menaces.';
   troopData['lavahound']['dps'] =
      [  10,    12,    14,  16];
   troopData['lavahound']['death damage'] =
      [ 100,   150,   200,  250];
   troopData['lavahound']['hitpoints'] =
      [5700,  6200,  6700,  7200];
   troopData['lavahound']['training cost'] =
      [ 390,   450,   510,  570];
   troopData['lavahound']['laboratory level'] =
      [   0,     7,     8,  9];
   troopData['lavahound']['research time'] =
      [   0,   240,   288,  336];
   troopData['lavahound']['research cost'] =
      [   0, 60000, 70000,  150000];
   troopData['lavahound']['subtroops'] =
      [   8,    10,    12,  14];
   troopData['lavahound']['max subtroops'] =
      [   8,    10,    12,  14];

   /**************************************/
   /*              Lava Pup              */
   /**************************************/
   troopData['list'].push('Lava Pup');
   troopData['lavapup'] = [];
   troopData['lavapup']['subtype']          = "Lava Hound";
   troopData['lavapup']['type']             = "Air";
   troopData['lavapup']['preferred target'] = "None";
   troopData['lavapup']['multiplier']       = 1;
   troopData['lavapup']['ground attack']    = true;
   troopData['lavapup']['air attack']       = true;
   troopData['lavapup']['splash radius']    = -1;
   troopData['lavapup']['housing space']    = 0;
   troopData['lavapup']['training time']    = 0;
   troopData['lavapup']['movement speed']   = 32;
   troopData['lavapup']['attack speed']     = 1;
   troopData['lavapup']['barracks type']    = "Dark";
   troopData['lavapup']['barracks level']   = 6;
   troopData['lavapup']['trainable']        = false;
   troopData['lavapup']['range']            = 2;
   troopData['lavapup']['description'] = 
      'Thrust out in big numbers after a Lava Hound dies, these tiny creatures ' +
      'keep up the fight for a little while longer.';
   troopData['lavapup']['dps'] =
      [35];
   troopData['lavapup']['hitpoints'] =
      [50];
   troopData['lavapup']['training cost'] =
      [ 0];
   troopData['lavapup']['laboratory level'] =
      [ 0];
   troopData['lavapup']['research time'] =
      [ 0];
   troopData['lavapup']['research cost'] =
      [ 0];
      
   /**************************************/
   /*              Bowler              */
   /**************************************/
   troopData['list'].push('Bowler');
   troopData['bowler'] = [];
   troopData['bowler']['type']             = "Ground";
   troopData['bowler']['preferred target'] = "None";
   troopData['bowler']['multiplier']       = 1;
   troopData['bowler']['ground attack']    = true;
   troopData['bowler']['air attack']       = false;
   troopData['bowler']['splash radius']    = 0.3;
   troopData['bowler']['housing space']    = 6;
   troopData['bowler']['training time']    = 60;
   troopData['bowler']['movement speed']   = 14;
   troopData['bowler']['attack speed']     = 1.5;
   troopData['bowler']['barracks type']    = "Dark";
   troopData['bowler']['barracks level']   = 7;
   troopData['bowler']['trainable']        = true;
   troopData['bowler']['range']            = 3;
   troopData['bowler']['death range']      = -1;
   troopData['bowler']['description'] = 
      'This big blue dude digs the simple things in life - Dark Elixir drinks and throwing rocks. ' +
      'His massive boulders bounce off their targets and hit again behind it for a double strike!'
   troopData['bowler']['dps'] =
      [65,    75,   85];
   troopData['bowler']['hitpoints'] =
      [290,  310,  350];
   troopData['bowler']['training cost'] =
      [130,   150,    170];
   troopData['bowler']['laboratory level'] =
      [  0,     8,    9];
   troopData['bowler']['research time'] =
      [  0,   240,   336];
   troopData['bowler']['research cost'] =
      [  0, 120000, 200000];
      
}

/*
 * Function to return all relevant hero info.
 *
 * Usage: heroInfo(hero type, info type, (optional) hero level)
 *
 * Information (info type) currently provided:
 * ===========================================
 * General (information is not level-dependent)
 *
 * 'type'               (Ground or Air)
 * 'preferred target'   (None, Defenses, Resources, etc.)
 * 'multiplier'         (Damage multiplier vs. preferred target)
 * 'ground attack'      (whether a troop can attack ground targets (true/false))
 * 'air attack'         (whether a troop can attack air targets (true/false))
 * 'search radius'      (search radius in tiles)
 * 'splash radius'      (tile radius of splash damage; -1 for single target)
 * 'ability'            (name of any special ability ['None' if one doesn't exist])
 * 'movement speed'     (in-game-reported movement speed)
 * 'attack speed'       (attack speed in seconds)
 * 'range'              (attack range, <= 1 is considered melee)
 * 'description'        (in-game troop description)
 * 'levels'             (returns number of troop levels defined)
 *
 * Level-specific information
 * 
 * 'dps'                (damage per second)
 * 'hitpoints'          (troop hit points)
 * 'required town hall' (level of Town Hall required to purchase the hero)
 * 'regeneration time'  (time required to fully regenerate from 0 hit points)
 * 'training time'      (training time in hours)
 * 'training cost'      (training cost in Elixir or Dark Elixir)
 * 'ability level'      (level of special ability)
 *
 * For the level-specific information:
 * If you do not provide the 'intLevel' argument you will receive the 
 * entire array of information. Providing that argument will return a
 * single number for that particular troop level.
 *
 * To return a simple list of heroes, provide a first argument of 'list'.
 */
function heroInfo(strHero, strInfo, intLevel) {
   if (!(Array.isArray(heroData)))
      populateHeroData();

   var sHero = strHero.toLowerCase();
   var sInfo = (arguments.length > 1 ? strInfo.toLowerCase() : '');

   if (sHero === 'list')
      return heroData['list'];

   // Remove any spaces
   sHero = sHero.replace(/ /g,'');

   // No intLevel provided (let 'levels' fall through)
   if (arguments.length === 2 && sInfo !== 'levels')
      return heroData[sHero][sInfo];

   switch (sInfo) {
      case 'levels':
         return (typeof heroData[sHero] !== 'undefined' ?
            heroData[sHero]['hitpoints'].length : 0);
      case 'dps':
      case 'hitpoints':
      case 'required town hall':
      case 'regeneration time':
      case 'training time':
      case 'training cost':
      case 'ability level':
         return heroData[sHero][sInfo][intLevel - 1];
      default:
         return heroData[sHero][sInfo];
   }
}

/* Function called only if troopData does not contain an array */
function populateHeroData() {
   heroData         = [];
   heroData['list'] = [];

   /**************************************/
   /*          Barbarian King            */
   /**************************************/
   heroData['list'].push('Barbarian King');
   heroData['barbarianking'] = [];
   heroData['barbarianking']['type']             = "Ground";
   heroData['barbarianking']['preferred target'] = "None";
   heroData['barbarianking']['multiplier']       = 1;
   heroData['barbarianking']['ground attack']    = true;
   heroData['barbarianking']['air attack']       = false;
   heroData['barbarianking']['search radius']    = 9;
   heroData['barbarianking']['splash radius']    = -1;
   heroData['barbarianking']['ability']          = 'Iron Fist';
   heroData['barbarianking']['movement speed']   = 16;
   heroData['barbarianking']['attack speed']     = 1.2;
   heroData['barbarianking']['range']            = 1;
   heroData['barbarianking']['description'] =
      'This fearless warrior relies on his bulging muscles and striking ' +
      'mustache to wreak havoc in enemy villages. Release a horde of ' +
      'Barbarians and enjoy the mayhem!';
   heroData['barbarianking']['dps'] = [
      120, // Level 1
      122, // Level 2
      124, // Level 3
      127, // Level 4
      129, // Level 5
      132, // Level 6
      135, // Level 7
      137, // Level 8
      140, // Level 9
      143, // Level 10
      146, // Level 11
      149, // Level 12
      152, // Level 13
      155, // Level 14
      158, // Level 15
      161, // Level 16
      164, // Level 17
      168, // Level 18
      171, // Level 19
      174, // Level 20
      178, // Level 21
      181, // Level 22
      185, // Level 23
      189, // Level 24
      193, // Level 25
      196, // Level 26
      200, // Level 27
      204, // Level 28
      208, // Level 29
      213, // Level 30
      217, // Level 31
      221, // Level 32
      226, // Level 33
      230, // Level 34
      235, // Level 35
      239, // Level 36
      244, // Level 37
      249, // Level 38
      254, // Level 39
      259, // Level 40
      275, // Level 41
      281, // Level 42
      287, // Level 43
      293, // Level 44
      299, // Level 45
   ];
   heroData['barbarianking']['hitpoints'] = [
      1700, // Level 1
      1742, // Level 2
      1786, // Level 3
      1830, // Level 4
      1876, // Level 5
      1923, // Level 6
      1971, // Level 7
      2020, // Level 8
      2071, // Level 9
      2123, // Level 10
      2176, // Level 11
      2230, // Level 12
      2286, // Level 13
      2343, // Level 14
      2402, // Level 15
      2462, // Level 16
      2523, // Level 17
      2586, // Level 18
      2651, // Level 19
      2717, // Level 20
      2785, // Level 21
      2855, // Level 22
      2926, // Level 23
      2999, // Level 24
      3074, // Level 25
      3151, // Level 26
      3230, // Level 27
      3311, // Level 28
      3394, // Level 29
      3478, // Level 30
      3565, // Level 31
      3655, // Level 32
      3746, // Level 33
      3840, // Level 34
      3936, // Level 35
      4034, // Level 36
      4135, // Level 37
      4238, // Level 38
      4344, // Level 39
      4453, // Level 40
      4564, // Level 41
      4678, // Level 42
      4795, // Level 43
      4915, // Level 44
      5038, // Level 45
   ];
   heroData['barbarianking']['required town hall'] = [
       7, // Level 1
       7, // Level 2
       7, // Level 3
       7, // Level 4
       7, // Level 5
       8, // Level 6
       8, // Level 7
       8, // Level 8
       8, // Level 9
       8, // Level 10
       9, // Level 11
       9, // Level 12
       9, // Level 13
       9, // Level 14
       9, // Level 15
       9, // Level 16
       9, // Level 17
       9, // Level 18
       9, // Level 19
       9, // Level 20
       9, // Level 21
       9, // Level 22
       9, // Level 23
       9, // Level 24
       9, // Level 25
       9, // Level 26
       9, // Level 27
       9, // Level 28
       9, // Level 29
       9, // Level 30
      10, // Level 31
      10, // Level 32
      10, // Level 33
      10, // Level 34
      10, // Level 35
      10, // Level 36
      10, // Level 37
      10, // Level 38
      10, // Level 39
      10, // Level 40
      11, // Level 41
      11, // Level 42
      11, // Level 43
      11, // Level 44
      11, // Level 45
   ];
   heroData['barbarianking']['regeneration time'] = [
       10, // Level 1
       11, // Level 2
       12, // Level 3
       13, // Level 4
       14, // Level 5
       15, // Level 6
       16, // Level 7
       17, // Level 8
       18, // Level 9
       19, // Level 10
       20, // Level 11
       21, // Level 12
       22, // Level 13
       23, // Level 14
       24, // Level 15
       25, // Level 16
       26, // Level 17
       27, // Level 18
       28, // Level 19
       29, // Level 20
       30, // Level 21
       31, // Level 22
       32, // Level 23
       33, // Level 24
       34, // Level 25
       35, // Level 26
       36, // Level 27
       37, // Level 28
       38, // Level 29
       39, // Level 30
       40, // Level 31
       41, // Level 32
       42, // Level 33
       43, // Level 34
       44, // Level 35
       45, // Level 36
       46, // Level 37
       47, // Level 38
       48, // Level 39
       49, // Level 40
       50, // Level 41
       51, // Level 42
       52, // Level 43
       53, // Level 44
       54, // Level 45
   ];
   heroData['barbarianking']['training time'] = [
          0, // Level 1
        720, // Level 2
       1440, // Level 3
       2160, // Level 4
       2880, // Level 5
       3600, // Level 6
       4320, // Level 7
       5040, // Level 8
       5760, // Level 9
       6480, // Level 10
       7200, // Level 11
       7920, // Level 12
       8640, // Level 13
       9360, // Level 14
      10080, // Level 15
      10080, // Level 16
      10080, // Level 17
      10080, // Level 18
      10080, // Level 19
      10080, // Level 20
      10080, // Level 21
      10080, // Level 22
      10080, // Level 23
      10080, // Level 24
      10080, // Level 25
      10080, // Level 26
      10080, // Level 27
      10080, // Level 28
      10080, // Level 29
      10080, // Level 30
      10080, // Level 31
      10080, // Level 32
      10080, // Level 33
      10080, // Level 34
      10080, // Level 35
      10080, // Level 36
      10080, // Level 37
      10080, // Level 38
      10080, // Level 39
      10080, // Level 40
      10080, // Level 41
      10080, // Level 42
      10080, // Level 43
      10080, // Level 44
      10080, // Level 45
   ];
   heroData['barbarianking']['training cost'] = [
       10000, // Level 1
       12500, // Level 2
       15000, // Level 3
       17500, // Level 4
       20000, // Level 5
       22500, // Level 6
       25000, // Level 7
       30000, // Level 8
       35000, // Level 9
       40000, // Level 10
       45000, // Level 11
       50000, // Level 12
       55000, // Level 13
       60000, // Level 14
       65000, // Level 15
       70000, // Level 16
       75000, // Level 17
       80000, // Level 18
       85000, // Level 19
       90000, // Level 20
       95000, // Level 21
      100000, // Level 22
      105000, // Level 23
      110000, // Level 24
      115000, // Level 25
      120000, // Level 26
      125000, // Level 27
      130000, // Level 28
      135000, // Level 29
      140000, // Level 30
      144000, // Level 31
      148000, // Level 32
      152000, // Level 33
      156000, // Level 34
      160000, // Level 35
      164000, // Level 36
      168000, // Level 37
      172000, // Level 38
      176000, // Level 39
      180000, // Level 40
      185000, // Level 41
      188000, // Level 42
      191000, // Level 43
      194000, // Level 44
      197000, // Level 45
   ];
   heroData['barbarianking']['ability level'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      1, // Level 5
      1, // Level 6
      1, // Level 7
      1, // Level 8
      1, // Level 9
      2, // Level 10
      2, // Level 11
      2, // Level 12
      2, // Level 13
      2, // Level 14
      3, // Level 15
      3, // Level 16
      3, // Level 17
      3, // Level 18
      3, // Level 19
      4, // Level 20
      4, // Level 21
      4, // Level 22
      4, // Level 23
      4, // Level 24
      5, // Level 25
      5, // Level 26
      5, // Level 27
      5, // Level 28
      5, // Level 29
      6, // Level 30
      6, // Level 31
      6, // Level 32
      6, // Level 33
      6, // Level 34
      7, // Level 35
      7, // Level 36
      7, // Level 37
      7, // Level 38
      7, // Level 39
      8, // Level 40
      8, // Level 41
      8, // Level 42
      8, // Level 43
      8, // Level 44
      9, // Level 45
   ];

   /**************************************/
   /*            Archer Queen            */
   /**************************************/
   heroData['list'].push('Archer Queen');
   heroData['archerqueen'] = [];
   heroData['archerqueen']['type']             = "Ground";
   heroData['archerqueen']['preferred target'] = "None";
   heroData['archerqueen']['multiplier']       = 1;
   heroData['archerqueen']['ground attack']    = true;
   heroData['archerqueen']['air attack']       = true;
   heroData['archerqueen']['search radius']    = 10;
   heroData['archerqueen']['splash radius']    = -1;
   heroData['archerqueen']['ability']          = 'Royal Cloak';
   heroData['archerqueen']['movement speed']   = 24;
   heroData['archerqueen']['attack speed']     = 0.75;
   heroData['archerqueen']['range']            = 5;
   heroData['archerqueen']['description'] =
      'The Archer Queen is an eagle-eyed warrior, whose weapon of choice is a ' +
      'modified X-Bow that few men could dream of wielding.  She can attack enemy ' +
      'villages or guard your village.';
   heroData['archerqueen']['dps'] = [
      160, // Level 1
      164, // Level 2
      168, // Level 3
      172, // Level 4
      176, // Level 5
      181, // Level 6
      185, // Level 7
      190, // Level 8
      194, // Level 9
      199, // Level 10
      204, // Level 11
      209, // Level 12
      215, // Level 13
      220, // Level 14
      226, // Level 15
      231, // Level 16
      237, // Level 17
      243, // Level 18
      249, // Level 19
      255, // Level 20
      262, // Level 21
      268, // Level 22
      275, // Level 23
      282, // Level 24
      289, // Level 25
      296, // Level 26
      304, // Level 27
      311, // Level 28
      319, // Level 29
      327, // Level 30
      335, // Level 31
      344, // Level 32
      352, // Level 33
      361, // Level 34
      370, // Level 35
      379, // Level 36
      389, // Level 37
      398, // Level 38
      408, // Level 39
      419, // Level 40
      429, // Level 41
      440, // Level 42
      451, // Level 43
      462, // Level 44
      474, // Level 45
   ];
   heroData['archerqueen']['hitpoints'] = [
       725, // Level 1
       740, // Level 2
       755, // Level 3
       771, // Level 4
       787, // Level 5
       804, // Level 6
       821, // Level 7
       838, // Level 8
       856, // Level 9
       874, // Level 10
       892, // Level 11
       911, // Level 12
       930, // Level 13
       949, // Level 14
       969, // Level 15
       990, // Level 16
      1010, // Level 17
      1032, // Level 18
      1053, // Level 19
      1076, // Level 20
      1098, // Level 21
      1121, // Level 22
      1145, // Level 23
      1169, // Level 24
      1193, // Level 25
      1218, // Level 26
      1244, // Level 27
      1270, // Level 28
      1297, // Level 29
      1324, // Level 30
      1352, // Level 31
      1380, // Level 32
      1409, // Level 33
      1439, // Level 34
      1469, // Level 35
      1500, // Level 36
      1532, // Level 37
      1564, // Level 38
      1597, // Level 39
      1630, // Level 40
      1664, // Level 41
      1699, // Level 42
      1735, // Level 43
      1771, // Level 44
      1809, // Level 45
   ];
   heroData['archerqueen']['required town hall'] = [
       9, // Level 1
       9, // Level 2
       9, // Level 3
       9, // Level 4
       9, // Level 5
       9, // Level 6
       9, // Level 7
       9, // Level 8
       9, // Level 9
       9, // Level 10
       9, // Level 11
       9, // Level 12
       9, // Level 13
       9, // Level 14
       9, // Level 15
       9, // Level 16
       9, // Level 17
       9, // Level 18
       9, // Level 19
       9, // Level 20
       9, // Level 21
       9, // Level 22
       9, // Level 23
       9, // Level 24
       9, // Level 25
       9, // Level 26
       9, // Level 27
       9, // Level 28
       9, // Level 29
       9, // Level 30
      10, // Level 31
      10, // Level 32
      10, // Level 33
      10, // Level 34
      10, // Level 35
      10, // Level 36
      10, // Level 37
      10, // Level 38
      10, // Level 39
      10, // Level 40
      11, // Level 41
      11, // Level 42
      11, // Level 43
      11, // Level 44
      11, // Level 45
   ];
   heroData['archerqueen']['regeneration time'] = [
       10, // Level 1
       11, // Level 2
       12, // Level 3
       13, // Level 4
       14, // Level 5
       15, // Level 6
       16, // Level 7
       17, // Level 8
       18, // Level 9
       19, // Level 10
       20, // Level 11
       21, // Level 12
       22, // Level 13
       23, // Level 14
       24, // Level 15
       25, // Level 16
       26, // Level 17
       27, // Level 18
       28, // Level 19
       29, // Level 20
       30, // Level 21
       31, // Level 22
       32, // Level 23
       33, // Level 24
       34, // Level 25
       35, // Level 26
       36, // Level 27
       37, // Level 28
       38, // Level 29
       39, // Level 30
       40, // Level 31
       41, // Level 32
       42, // Level 33
       43, // Level 34
       44, // Level 35
       45, // Level 36
       46, // Level 37
       47, // Level 38
       48, // Level 39
       49, // Level 40
       50, // Level 41
       51, // Level 42
       52, // Level 43
       53, // Level 44
       54, // Level 45
   ];
   heroData['archerqueen']['training time'] = [
          0, // Level 1
        720, // Level 2
       1440, // Level 3
       2160, // Level 4
       2880, // Level 5
       3600, // Level 6
       4320, // Level 7
       5040, // Level 8
       5760, // Level 9
       6480, // Level 10
       7200, // Level 11
       7920, // Level 12
       8640, // Level 13
       9360, // Level 14
      10080, // Level 15
      10080, // Level 16
      10080, // Level 17
      10080, // Level 18
      10080, // Level 19
      10080, // Level 20
      10080, // Level 21
      10080, // Level 22
      10080, // Level 23
      10080, // Level 24
      10080, // Level 25
      10080, // Level 26
      10080, // Level 27
      10080, // Level 28
      10080, // Level 29
      10080, // Level 30
      10080, // Level 31
      10080, // Level 32
      10080, // Level 33
      10080, // Level 34
      10080, // Level 35
      10080, // Level 36
      10080, // Level 37
      10080, // Level 38
      10080, // Level 39
      10080, // Level 40
      10080, // Level 41
      10080, // Level 42
      10080, // Level 43
      10080, // Level 44
      10080, // Level 45
   ];
   heroData['archerqueen']['training cost'] = [
       40000, // Level 1
       22500, // Level 2
       25000, // Level 3
       27500, // Level 4
       30000, // Level 5
       32500, // Level 6
       35000, // Level 7
       40000, // Level 8
       45000, // Level 9
       50000, // Level 10
       55000, // Level 11
       60000, // Level 12
       65000, // Level 13
       70000, // Level 14
       75000, // Level 15
       80000, // Level 16
       85000, // Level 17
       90000, // Level 18
       95000, // Level 19
      100000, // Level 20
      105000, // Level 21
      110000, // Level 22
      115000, // Level 23
      120000, // Level 24
      125000, // Level 25
      129000, // Level 26
      133000, // Level 27
      137000, // Level 28
      141000, // Level 29
      145000, // Level 30
      149000, // Level 31
      153000, // Level 32
      157000, // Level 33
      161000, // Level 34
      165000, // Level 35
      169000, // Level 36
      173000, // Level 37
      177000, // Level 38
      181000, // Level 39
      185000, // Level 40
      190000, // Level 41
      192000, // Level 42
      194000, // Level 43
      196000, // Level 44
      198000, // Level 45
   ];
   heroData['archerqueen']['ability level'] = [
      0, // Level 1
      0, // Level 2
      0, // Level 3
      0, // Level 4
      1, // Level 5
      1, // Level 6
      1, // Level 7
      1, // Level 8
      1, // Level 9
      2, // Level 10
      2, // Level 11
      2, // Level 12
      2, // Level 13
      2, // Level 14
      3, // Level 15
      3, // Level 16
      3, // Level 17
      3, // Level 18
      3, // Level 19
      4, // Level 20
      4, // Level 21
      4, // Level 22
      4, // Level 23
      4, // Level 24
      5, // Level 25
      5, // Level 26
      5, // Level 27
      5, // Level 28
      5, // Level 29
      6, // Level 30
      6, // Level 31
      6, // Level 32
      6, // Level 33
      6, // Level 34
      7, // Level 35
      7, // Level 36
      7, // Level 37
      7, // Level 38
      7, // Level 39
      8, // Level 40
      8, // Level 41
      8, // Level 42
      8, // Level 43
      8, // Level 44
      9, // Level 45
   ];
}

/*
 * Function to return all relevant spell info.
 *
 * Usage: spellInfo(spell type, info type, (optional) spell level)
 *
 * Information (info type) currently provided:
 * ===========================================
 * General (information is not level-dependent)
 *
 * 'available'         (true if available in game, false if removed)
 * 'creation time'     (time to create spell in Spell Factory)
 * 'spell factory'     (Spell Factory level required to unlock)
 * 'factory type'      (Normal or Dark)
 * 'housing space'     (amount of housing space used by spell)
 * 'effect type'       (type of damage, healing or other effect)
 *
 * Level-specific information
 * 
 * 'creation cost'     (cost to create spell in Spell Factory)
 * 'research cost'     (cost to upgrade spell in Laboratory)
 * 'research time'     (time to upgrade spell in Laboratory)
 * 'laboratory level'  (Lab required to upgrade spell to that level)
 *
 * In addition, a 'data' item is defined that lists any
 * spell-specific information. This list of identifiers can be
 * used to query for any of this information, some general and
 * some level-dependent.
 *
 * To return a simple list of spells, provide a first argument of 'list'.
 * You can filter the list with the following second arguments:
 *   'normal'          for elixir-based spell factory spells
 *   'dark'            for dark spell factory spells
 *   'available'       for all currently available spells (i.e. no Santa's Surprise)
 *   'unavailable'     for any spells that have been removed from the game
 * Also defined are:
 *   'normal available'
 *   'dark available'
 *   'normal unavailable'
 *   'dark unavailable'
 */
function spellInfo(strSpell, strInfo, intLevel) {
   if (!(Array.isArray(spellData)))
      populateSpellData();

   var sSpell = strSpell.toLowerCase();
   var sInfo  = (arguments.length > 1 ? strInfo.toLowerCase() : '');

   if (sSpell === 'list') {
      var criteria = [];
      var value    = [];

      switch (sInfo) {
         case 'normal':
            criteria = ['factory type'];
            value    = ['Normal'      ];
            break;
         case 'dark':
            criteria = ['factory type'];
            value    = ['Dark'        ];
            break;
         case 'available':
            criteria = ['available'];
            value    = [true       ];
            break;
         case 'unavailable':
            criteria = ['available'];
            value    = [false      ];
            break;
         case 'normal available':
            criteria = ['factory type', 'available'];
            value    = ['Normal',       true       ];
            break;
         case 'dark available':
            criteria = ['factory type', 'available'];
            value    = ['Dark',         true       ];
            break;
         case 'normal unavailable':
            criteria = ['factory type', 'available'];
            value    = ['Normal',       false      ];
            break;
         case 'dark unavailable':
            criteria = ['factory type', 'available'];
            value    = ['Dark',         false      ];
            break;
      }

      var retData = [];
      var sData   = spellData['list'];

      for (var i = 0; i < sData.length; i ++) {
         var include = true;

         for (var j = 0; j < criteria.length; j ++) {
            // Be careful here, we're calling ourselves -- don't pass 'list' as an argument!
            if (spellInfo(sData[i], criteria[j]) !== value[j]) {
               include = false;
               break;
            }
         }

         if (include)
            retData.push(sData[i]);
      }

      return retData;
   }

   // Allow the use of 'xxx spell' rather than 'xxx' if so desired
   if (sSpell.substr(-6) === ' spell')
      sSpell = sSpell.substr(0, sSpell.length - 6);
   else if (sSpell.substr(-5) === 'spell')
      sSpell = sSpell.substr(0, sSpell.length - 5);

   // Remove any spaces and quotation marks
   sSpell = sSpell.replace(/["' ]/g,'');

   if (sInfo == 'levels')
      return (typeof spellData[sSpell] !== 'undefined' ?
         spellData[sSpell]['creation cost'].length : 0);

   if (arguments.length > 2 && Array.isArray(spellData[sSpell][sInfo]))
      return spellData[sSpell][sInfo][intLevel - 1];
   else
      return spellData[sSpell][sInfo];
}

/* Function called only if spellData does not contain an array */
function populateSpellData() {
   spellData         = [];
   spellData['list'] = [];
   var i             = 0;

   /**************************************/
   /*           Lightning Spell          */
   /**************************************/
   spellData['list'].push('Lightning');
   spellData['lightning'] = [];
   spellData['lightning']['available']     = true;
   spellData['lightning']['creation time'] = 6;
   spellData['lightning']['spell factory'] = 1;
   spellData['lightning']['factory type']  = "Normal";
   spellData['lightning']['housing space'] = 2;
   spellData['lightning']['effect type']   = "Area Splash";
   spellData['lightning']['creation cost'] =
      [15000,  16500,  18000,   20000,   22000,   24000,   26000];
   spellData['lightning']['research cost'] =
      [    0, 200000, 500000, 1000000, 2000000, 6000000, 8000000];
   spellData['lightning']['research time'] =
      [    0,     24,     48,      72,      96,     240,     336];
   spellData['lightning']['laboratory level'] =
      [    0,      1,      2,       3,       6,       7,       8];
   // Spell-specific information
   spellData['lightning']['data'] = [
      'targets',
      'radius',
      'random radius',
      'strikes',
      'strike time',
      'total damage',
      'strike damage'
   ];
   spellData['lightning']['targets']       = "Any";
   spellData['lightning']['radius']        = 2;
   spellData['lightning']['random radius'] = 3.5;
   spellData['lightning']['strikes']       = 6;
   spellData['lightning']['strike time']   = 0.4;
   spellData['lightning']['total damage'] =
      [  300,    330,    360,     390,     450,     510,     570];
   spellData['lightning']['strike damage'] = [];
   for (i = 0; i < spellData['lightning']['total damage'].length; i ++) {
      var dam = spellData['lightning']['total damage'][i] /
         spellData['lightning']['strikes'];
      spellData['lightning']['strike damage'].push(dam);
   }

   /**************************************/
   /*            Healing Spell           */
   /**************************************/
   spellData['list'].push('Healing');
   spellData['healing'] = [];
   spellData['healing']['available']     = true;
   spellData['healing']['creation time'] = 6;
   spellData['healing']['spell factory'] = 2;
   spellData['healing']['factory type']  = "Normal";
   spellData['healing']['housing space'] = 2;
   spellData['healing']['effect type']   = "Area Splash";
   spellData['healing']['creation cost'] =
      [15000,  16500,  18000,   19000,   21000,   23000,    25000];
   spellData['healing']['research cost'] =
      [    0, 300000, 600000, 1200000, 2000000, 4000000,    6000000];
   spellData['healing']['research time'] =
      [    0,     24,     48,      72,     120,     168,    240];
   spellData['healing']['laboratory level'] =
      [    0,      2,      4,       5,       6,       7,    8];
   // Spell-specific information
   spellData['healing']['data'] = [
      'targets',
      'radius',
      'pulses',
      'pulse time',
      'total healing',
      'pulse healing'
   ];
   spellData['healing']['targets']       = "Ground & Air";
   spellData['healing']['radius']        = 5;
   spellData['healing']['pulses']        = 40;
   spellData['healing']['pulse time']    = 0.3;
   spellData['healing']['total healing'] =
      [  600,    800,   1000,    1200,    1400,    1600,    1800];
   spellData['healing']['pulse healing'] = [];
   for (i = 0; i < spellData['healing']['total healing'].length; i ++) {
      var heal = spellData['healing']['total healing'][i] /
         spellData['healing']['pulses'];
      spellData['healing']['pulse healing'].push(heal);
   }

   /**************************************/
   /*             Rage Spell             */
   /**************************************/
   spellData['list'].push('Rage');
   spellData['rage'] = [];
   spellData['rage']['available']     = true;
   spellData['rage']['creation time'] = 6;
   spellData['rage']['spell factory'] = 3;
   spellData['rage']['factory type']  = "Normal";
   spellData['rage']['housing space'] = 2;
   spellData['rage']['effect type']   = "Area Splash";
   spellData['rage']['creation cost'] =
      [23000,  25000,  27000,   30000,   33000];
   spellData['rage']['research cost'] =
      [    0, 450000, 900000, 1800000, 3000000];
   spellData['rage']['research time'] =
      [    0,     48,      72,    120,     168];
   spellData['rage']['laboratory level'] =
      [    0,      3,       4,      5,       6];
   // Spell-specific information
   spellData['rage']['data'] = [
      'targets',
      'radius',
      'pulses',
      'pulse time',
      'boost time',
      'damage boost',
      'speed boost'
   ];
   spellData['rage']['targets']       = "Ground & Air";
   spellData['rage']['radius']        = 5;
   spellData['rage']['pulses']        = 60;
   spellData['rage']['pulse time']    = 0.3;
   spellData['rage']['boost time']    = 1;
   spellData['rage']['damage boost'] =
      [  1.3,    1.4,    1.5,     1.6,     1.7];
   spellData['rage']['speed boost'] =
      [   20,     22,     24,      26,      28];

   /**************************************/
   /*             Jump Spell             */
   /**************************************/
   spellData['list'].push('Jump');
   spellData['jump'] = [];
   spellData['jump']['available']     = true;
   spellData['jump']['creation time'] = 6;
   spellData['jump']['spell factory'] = 4;
   spellData['jump']['factory type']  = "Normal";
   spellData['jump']['housing space'] = 2;
   spellData['jump']['effect type']   = "Area Splash";
   spellData['jump']['creation cost'] =
      [23000,   27000,   31000];
   spellData['jump']['research cost'] =
      [    0, 3000000, 6000000];
   spellData['jump']['research time'] =
      [    0,     120,     168];
   spellData['jump']['laboratory level'] =
      [    0,       6,       8];
   // Spell-specific information
   spellData['jump']['data'] = [
      'targets',
      'radius',
      'boost time',
      'duration'
   ];
   spellData['jump']['targets']       = "Ground";
   spellData['jump']['radius']        = 3.5;
   spellData['jump']['boost time']    = 1;
   spellData['jump']['duration'] = 
      [   20,      40,      60];

   /**************************************/
   /*            Freeze Spell            */
   /**************************************/
   spellData['list'].push('Freeze');
   spellData['freeze'] = [];
   spellData['freeze']['available']     = true;
   spellData['freeze']['creation time'] = 6;
   spellData['freeze']['spell factory'] = 4;
   spellData['freeze']['factory type']  = "Normal";
   spellData['freeze']['housing space'] = 2;
   spellData['freeze']['effect type']   = "Area Splash";
   spellData['freeze']['creation cost'] =
      [23000,   26000,   29000,   31000,   33000,   35000];
   spellData['freeze']['research cost'] =
      [    0, 3000000,  4000000, 5000000, 7000000, 9500000];
   spellData['freeze']['research time'] =
      [    0,     120,     168,     240,     288,   336];
   spellData['freeze']['laboratory level'] =
      [    0,       8,       8,       8,       8,   9];
   // Spell-specific information
   spellData['freeze']['data'] = [
      'targets',
      'radius',
      'duration'
   ];
   spellData['freeze']['targets']       = "Ground & Air";
   spellData['freeze']['radius']        = 3.5;
   spellData['freeze']['duration'] =
      [    5,       5.75,       6.5,       7.25,       8,   9];

   /**************************************/
   /*            Clone Spell            */
   /**************************************/
   spellData['list'].push('Clone');
   spellData['clone'] = [];
   spellData['clone']['available']     = true;
   spellData['clone']['creation time'] = 12;
   spellData['clone']['spell factory'] = 5;
   spellData['clone']['factory type']  = "Normal";
   spellData['clone']['housing space'] = 4;
   spellData['clone']['effect type']   = "Area Splash";
   spellData['clone']['creation cost'] =
      [38000,   39000,   41000,   43000,   45000];
   spellData['clone']['research cost'] =
      [    0, 4000000, 6000000, 8000000, 10000000];
   spellData['clone']['research time'] =
      [    0,     144,     192,     240,   336];
   spellData['clone']['laboratory level'] =
      [    0,       8,       8,       9,   9];
   // Spell-specific information
   spellData['clone']['data'] = [
      'targets',
      'radius',
      'capacity'
   ];
   spellData['clone']['targets']       = "Ground & Air";
   spellData['clone']['radius']        = 3.5;
   spellData['clone']['capacity'] =
      [    25,       28,       32,       36,       40];


   /**************************************/
   /*          Santa's Surprise          */
   /**************************************/
   spellData['list'].push("Santa's Surprise");
   spellData['santassurprise'] = [];
   spellData['santassurprise']['available']     = false;
   spellData['santassurprise']['creation time'] = 6;
   spellData['santassurprise']['spell factory'] = 1;
   spellData['santassurprise']['factory type']  = "Normal";
   spellData['santassurprise']['housing space'] = 2;
   spellData['santassurprise']['effect type']   = "Area Splash";
   spellData['santassurprise']['creation cost'] =
      [25000];
   spellData['santassurprise']['research cost'] =
      [    0];
   spellData['santassurprise']['research time'] =
      [    0];
   spellData['santassurprise']['laboratory level'] =
      [    0];
   // Spell-specific information
   spellData['santassurprise']['data'] = [
      'targets',
      'radius',
      'random radius',
      'strikes',
      'strike time',
      'total damage',
      'strike damage'
   ];
   spellData['santassurprise']['targets']       = "Any";
   spellData['santassurprise']['radius']        = 1;
   spellData['santassurprise']['random radius'] = 4;
   spellData['santassurprise']['strikes']       = 5;
   spellData['santassurprise']['strike time']   = 0.1;
   spellData['santassurprise']['total damage'] =
      [ 900];
   spellData['santassurprise']['strike damage'] = [];
   for (i = 0; i < spellData['santassurprise']['total damage'].length; i ++) {
      var dam = spellData['santassurprise']['total damage'][i] /
         spellData['santassurprise']['strikes'];
      spellData['santassurprise']['strike damage'].push(dam);
   }

   /**************************************/
   /*            Poison Spell            */
   /**************************************/
   spellData['list'].push('Poison');
   spellData['poison'] = [];
   spellData['poison']['available']     = true;
   spellData['poison']['creation time'] = 3;
   spellData['poison']['spell factory'] = 1;
   spellData['poison']['factory type']  = "Dark";
   spellData['poison']['housing space'] = 1;
   spellData['poison']['effect type']   = "Area Splash";
   spellData['poison']['creation cost'] =
      [  95,   110,   125,   140,   155];
   spellData['poison']['research cost'] =
      [   0, 25000, 50000, 75000,   150000];
   spellData['poison']['research time'] =
      [   0,    96,   144,   240,   288];
   spellData['poison']['laboratory level'] =
      [   0,     6,     7,     8,   9];
   // Spell-specific information
   spellData['poison']['data'] = [
      'targets',
      'radius',
      'max dps',
      'speed decrease',
      'attack rate decrease'
   ];
   spellData['poison']['targets']       = "Ground & Air";
   spellData['poison']['radius']        = 4;
   spellData['poison']['max dps'] =
      [  90,   115,   145,   180,   220];
   spellData['poison']['speed decrease'] =
      [0.26,   0.3,  0.34,  0.38,   0.4];
   spellData['poison']['attack rate decrease'] =
      [0.35,   0.4,  0.45,   0.5,   0.55];

   /**************************************/
   /*          Earthquake Spell          */
   /**************************************/
   spellData['list'].push('Earthquake');
   spellData['earthquake'] = [];
   spellData['earthquake']['available']     = true;
   spellData['earthquake']['creation time'] = 3;
   spellData['earthquake']['spell factory'] = 2;
   spellData['earthquake']['factory type']  = "Dark";
   spellData['earthquake']['housing space'] = 1;
   spellData['earthquake']['effect type']   = "Area Splash";
   spellData['earthquake']['creation cost'] =
      [ 125,   140,   160,   180];
   spellData['earthquake']['research cost'] =
      [   0, 30000, 60000, 90000];
   spellData['earthquake']['research time'] =
      [   0,   144,   192,   288];
   spellData['earthquake']['laboratory level'] =
      [   0,     6,     7,     8];
   // Spell-specific information
   spellData['earthquake']['data'] = [
      'targets',
      'preferred target',
      'radius',
      'damage'
   ];
   spellData['earthquake']['targets']          = "Buildings & Walls";
   spellData['earthquake']['preferred target'] = "Walls";
   spellData['earthquake']['radius']           = 4;
   spellData['earthquake']['damage'] =
      [ 0.14,  0.17,  0.21,  0.25];

   /**************************************/
   /*            Haste Spell             */
   /**************************************/
   spellData['list'].push('Haste');
   spellData['haste'] = [];
   spellData['haste']['available']     = true;
   spellData['haste']['creation time'] = 3;
   spellData['haste']['spell factory'] = 3;
   spellData['haste']['factory type']  = "Dark";
   spellData['haste']['housing space'] = 1;
   spellData['haste']['effect type']   = "Area Splash";
   spellData['haste']['creation cost'] =
      [80,    85,    90,     95];
   spellData['haste']['research cost'] =
      [ 0, 40000, 80000, 100000];
   spellData['haste']['research time'] =
      [ 0,   192,   240,    336];
   spellData['haste']['laboratory level'] =
      [ 0,     7,     8,      8];
   // Spell-specific information
   spellData['haste']['data'] = [
      'targets',
      'radius',
      'speed increase',
      'duration'
   ];
   spellData['haste']['targets']        = "Ground & Air";
   spellData['haste']['radius']         = 4;
   spellData['haste']['speed increase'] =
      [28,    34,    40,     46];
   spellData['haste']['duration'] =
      [10,    15,    20,     25];
      
      
   /**************************************/
   /*            Skeleton Spell          */
   /**************************************/
   spellData['list'].push('Skeleton');
   spellData['skeleton'] = [];
   spellData['skeleton']['available']     = true;
   spellData['skeleton']['creation time'] = 3;
   spellData['skeleton']['spell factory'] = 4;
   spellData['skeleton']['factory type']  = "Dark";
   spellData['skeleton']['housing space'] = 1;
   spellData['skeleton']['effect type']   = "Area Splash";
   spellData['skeleton']['creation cost'] =
      [110,    120,    130,     140];
   spellData['skeleton']['research cost'] =
      [ 0, 50000, 75000, 100000];
   spellData['skeleton']['research time'] =
      [ 0,   192,   240,    288];
   spellData['skeleton']['laboratory level'] =
      [ 0,     8,     8,      9];
   // Spell-specific information
   spellData['skeleton']['data'] = [
      'targets',
      'radius',
      'number'
   ];
   spellData['skeleton']['targets']        = "Ground";
   spellData['skeleton']['radius']         = 3.5;
   spellData['skeleton']['number'] =
      [15,    18,    22,     26];
}

/*
 * Function to return all relevant hero ability info.
 *
 * Usage: abilityInfo(ability type, info type, (optional) ability level)
 *
 * Information (info type) currently provided:
 * ===========================================
 * General (information is not level-dependent)
 *
 * 'summoned unit'    (troop type summoned, zero-length string if none)
 * 'affected unit'    (troop type that ability affects, if any) 
 * 'description'      (in-game ability description)
 * 'levels'           (returns number of ability levels defined)
 *
 * Level-specific information
 * 
 * 'damage increase'  (damage increase when ability is used)
 * 'speed increase'   (speed increase when ability is used)
 * 'health recovery'  (amount of health recovered when ability is used)
 * 'ability time'     (amount of time ability lasts for)
 * 'summoned units'   (number of units summoned by the ability)
 *
 * For the level-specific information:
 * If you do not provide the 'intLevel' argument you will receive the 
 * entire array of information. Providing that argument will return a
 * single number for that particular ability level.
 *
 * To return a simple list of abilities, provide a first argument of 'list'.
 */
function abilityInfo(strAbility, strInfo, intLevel) {
   if (!(Array.isArray(abilityData)))
      populateAbilityData();

   var sAbility = strAbility.toLowerCase();
   var sInfo    = (arguments.length > 1 ? strInfo.toLowerCase() : '');

   if (sAbility == 'list')
      return abilityData['list'];

   // Allow the use of 'xxx ability' rather than 'xxx' if so desired
   if (sAbility.substr(-6) == ' ability')
      sAbility = sAbility.substr(0, sAbility.length - 8);

   // Remove any spaces
   sAbility = sAbility.replace(/ /g,'');

   if (sInfo == 'levels')
      return (typeof abilityData[sAbility] !== 'undefined' ?
         abilityData[sAbility]['ability time'].length : 0);

   if (arguments.length > 2 && Array.isArray(abilityData[sAbility][sInfo]))
      return abilityData[sAbility][sInfo][intLevel - 1];
   else
      return abilityData[sAbility][sInfo];
}

/* Function called only if abilityData does not contain an array */
function populateAbilityData() {
   abilityData         = [];
   abilityData['list'] = [];
   var i               = 0;

   abilityData['list'].push('Iron Fist');
   abilityData['ironfist'] = [];
   abilityData['ironfist']['summoned unit'] = 'Barbarian';
   abilityData['ironfist']['affected unit'] = 'Barbarian';
   abilityData['ironfist']['description'] =
      'The king bursts into rage, recovering a large amount of health ' +
      'and temporarily boosting speed and attack power for himself and ' +
      'all barbarians near him. A group of barbarians also appear to ' +
      'join the brawl!';
   abilityData['ironfist']['damage increase'] = [
       56, // Level 1
      101, // Level 2
      147, // Level 3
      195, // Level 4
      245, // Level 5
      298, // Level 6
      354, // Level 7
      414, // Level 8
      478, // Level 9
   ];
   abilityData['ironfist']['speed increase'] = [
      18, // Level 1
      19, // Level 2
      20, // Level 3
      21, // Level 4
      22, // Level 5
      23, // Level 6
      24, // Level 7
      25, // Level 8
      26, // Level 9
   ];
   abilityData['ironfist']['health recovery'] = [
       500, // Level 1
       620, // Level 2
       752, // Level 3
       899, // Level 4
      1063, // Level 5
      1247, // Level 6
      1455, // Level 7
      1692, // Level 8
      1963, // Level 9
   ];
   abilityData['ironfist']['ability time'] = [
      10, // Level 1
      10, // Level 2
      10, // Level 3
      10, // Level 4
      10, // Level 5
      10, // Level 6
      10, // Level 7
      10, // Level 8
      10, // Level 9
   ];
   abilityData['ironfist']['summoned units'] = [
       6, // Level 1
       8, // Level 2
      10, // Level 3
      12, // Level 4
      14, // Level 5
      16, // Level 6
      18, // Level 7
      20, // Level 8
      22, // Level 9
   ];

   abilityData['list'].push('Royal Cloak');
   abilityData['royalcloak'] = [];
   abilityData['royalcloak']['summoned unit'] = 'Archer';
   abilityData['royalcloak']['affected unit'] = '';
   abilityData['royalcloak']['description'] =
      'The queen vanishes from sight to recover some health and unleash ' +
      'devastating volleys of high-damage ammunition. Defenses will lose ' +
      'her as their target, and a group of archers will appear to distract ' +
      'them!';
   abilityData['royalcloak']['damage increase'] = [
      300, // Level 1
      355, // Level 2
      416, // Level 3
      483, // Level 4
      557, // Level 5
      638, // Level 6
      725, // Level 7
      819, // Level 8
      920, // Level 9
   ];
   abilityData['royalcloak']['speed increase'] = [
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
   abilityData['royalcloak']['health recovery'] = [
      150, // Level 1
      175, // Level 2
      200, // Level 3
      225, // Level 4
      250, // Level 5
      275, // Level 6
      300, // Level 7
      325, // Level 8
      350, // Level 9
   ];
   abilityData['royalcloak']['ability time'] = [
      3.6, // Level 1
      3.8, // Level 2
      4.0, // Level 3
      4.2, // Level 4
      4.4, // Level 5
      4.6, // Level 6
      4.8, // Level 7
      5.0, // Level 8
      5.0, // Level 9
   ];
   abilityData['royalcloak']['summoned units'] = [
       5, // Level 1
       6, // Level 2
       7, // Level 3
       8, // Level 4
       9, // Level 5
      10, // Level 6
      11, // Level 7
      12, // Level 8
      13, // Level 9
   ];
}