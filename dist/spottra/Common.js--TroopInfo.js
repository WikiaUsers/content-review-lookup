function timeStamp_TroopInfo_js() {
   return "2013.11.03 19:45 (UTC-8)";
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
 * 'subtype'          ('Witch' for Skeleton, 'Golem' for Golemite, etc.)
 * 'type'             (Ground or Air)
 * 'preferred target' (None, Defenses, Resources, etc.)
 * 'multiplier'       (Damage multiplier vs. preferred target)
 * 'ground attack'    (whether a troop can attack ground targets (true/false))
 * 'air attack'       (whether a troop can attack air targets (true/false))
 * 'splash radius'    (tile radius of splash damage; -1 for single target)
 * 'housing space'    (amount of housing space used by troop)
 * 'training time'    (training time in seconds)
 * 'movement speed'   (in-game-reported movement speed)
 * 'attack speed'     (attack speed in seconds)
 * 'barracks type'    (Normal or Dark)
 * 'barracks level'   (level of Barracks that unlocks the troop)
 * 'range'            (attack range, <= 1 is considered melee)
 * 'death range'      (splash range of damage caused upon death, -1 if none)
 * 'description'      (in-game troop description)
 * 'levels'           (returns number of troop levels defined)
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
 *   'non-trainable'   for Golems and Skeletons only
 * Also defined are:
 *   'normal trainable'
 *   'dark trainable'
 *   'normal non-trainable'
 *   'dark non-trainable'
 */

/* Load information into global variables for performance */
var troopData;
var spellData;

function troopInfo(strTroop, strInfo, intLevel) {
   if (!(Array.isArray(troopData)))
      populateTroopData();

   var sTroop = strTroop.toLowerCase();
   var sInfo  = (arguments.length > 1 ? strInfo.toLowerCase() : '');

   if (sTroop == 'list') {
      return troopData['list'];
   }

   // Remove any spaces (eventually will have clever code to do it)
   if (sTroop == 'wall breaker')
      sTroop = 'wallbreaker';
   else if (sTroop == 'hog rider')
      sTroop = 'hogrider';

   // No intLevel provided
   if (arguments.length == 2)
      return troopData[sTroop][sInfo];

   switch (sInfo) {
      case 'levels':
         return troopData[sTroop]['hitpoints'].length;
      case 'dps':
      case 'hitpoints':
      case 'training cost':
      case 'laboratory level':
      case 'research time':
      case 'research cost':
         return troopData[sTroop][sInfo][intLevel - 1];
      default:
         return troopData[sTroop][sInfo];
   }
}

/* Function called only if troopData does not contain an array */
function populateTroopData() {
   troopData         = [];
   troopData['list'] = [];

   troopData['list'].push('Barbarian');
   troopData['barbarian'] = [];
   troopData['barbarian']['type']             = "Ground";
   troopData['barbarian']['preferred target'] = "None";
   troopData['barbarian']['multiplier']       = 1;
   troopData['barbarian']['ground attack']    = true;
   troopData['barbarian']['air attack']       = false;
   troopData['barbarian']['splash radius']    = -1;
   troopData['barbarian']['housing space']    = 1;
   troopData['barbarian']['training time']    = 20;
   troopData['barbarian']['movement speed']   = 16;
   troopData['barbarian']['attack speed']     = 1.0;
   troopData['barbarian']['barracks type']    = "Normal";
   troopData['barbarian']['barracks level']   = 1;
   troopData['barbarian']['range']            = 0.4;
   troopData['barbarian']['death range']      = -1;
   troopData['barbarian']['description'] =
      'This fearless warrior relies on his bulging muscles and striking ' +
      'mustache to wreak havoc in enemy villages. Release a horde of ' +
      'Barbarians and enjoy the mayhem!';
   troopData['barbarian']['dps'] =
      [ 8,    11,     14,     18,      23,      26];
   troopData['barbarian']['hitpoints'] =
      [45,    54,     65,     78,      95,     110];
   troopData['barbarian']['training cost'] =
      [25,    40,     60,     80,     100,     150];
   troopData['barbarian']['laboratory level'] =
      [ 0,     1,      3,      5,       6,       7];
   troopData['barbarian']['research time'] =
      [ 0,     6,     24,     72,     120,     240];
   troopData['barbarian']['research cost'] =
      [ 0, 50000, 150000, 500000, 1500000, 4500000];

   troopData['list'].push('Archer');
   troopData['archer'] = [];
   troopData['archer']['type']             = "Ground";
   troopData['archer']['preferred target'] = "None";
   troopData['archer']['multiplier']       = 1;
   troopData['archer']['ground attack']    = true;
   troopData['archer']['air attack']       = true;
   troopData['archer']['splash radius']    = -1;
   troopData['archer']['housing space']    = 1;
   troopData['archer']['training time']    = 25;
   troopData['archer']['movement speed']   = 24;
   troopData['archer']['attack speed']     = 1.0;
   troopData['archer']['barracks type']    = "Normal";
   troopData['archer']['barracks level']   = 2;
   troopData['archer']['range']            = 3.5;
   troopData['archer']['death range']      = -1;
   troopData['archer']['description'] =
      'These sharpshooters like to keep their distance on the battlefield ' +
      'and in life. Nothing makes them happier than single-mindedly taking ' +
      'down their target.';
   troopData['archer']['dps'] =
      [ 7,     9,     12,     16,      20,      22];
   troopData['archer']['hitpoints'] =
      [20,    23,     28,     33,      40,      44];
   troopData['archer']['training cost'] =
      [50,    80,    120,    160,     200,     300];
   troopData['archer']['laboratory level'] =
      [ 0,     1,      3,      5,       6,       7];
   troopData['archer']['research time'] =
      [ 0,    12,     48,     72,     120,     336];
   troopData['archer']['research cost'] =
      [ 0, 50000, 250000, 750000, 2250000, 7500000];

   troopData['list'].push('Goblin');
   troopData['goblin'] = [];
   troopData['goblin']['type']             = "Ground";
   troopData['goblin']['preferred target'] = "Resources";
   troopData['goblin']['multiplier']       = 2;
   troopData['goblin']['ground attack']    = true;
   troopData['goblin']['air attack']       = false;
   troopData['goblin']['splash radius']    = -1;
   troopData['goblin']['housing space']    = 1;
   troopData['goblin']['training time']    = 30;
   troopData['goblin']['movement speed']   = 32;
   troopData['goblin']['attack speed']     = 1.0;
   troopData['goblin']['barracks type']    = "Normal";
   troopData['goblin']['barracks level']   = 3;
   troopData['goblin']['range']            = 0.4;
   troopData['goblin']['death range']      = -1;
   troopData['goblin']['description'] =
      'These peaky little creatures only have eyes for one thing: LOOT! ' +
      'They are faster than a Spring Trap, and their hunger for resources ' +
      'is limitless.';
   troopData['goblin']['dps'] =
      [11,    14,     19,     24,      32];
   troopData['goblin']['hitpoints'] =
      [25,    30,     36,     43,      52];
   troopData['goblin']['training cost'] =
      [25,    40,     60,     80,     100];
   troopData['goblin']['laboratory level'] =
      [ 0,     1,      3,      5,       6];
   troopData['goblin']['research time'] =
      [ 0,    12,     48,     72,     120];
   troopData['goblin']['research cost'] =
      [ 0, 50000, 250000, 750000, 2250000];

   troopData['list'].push('Giant');
   troopData['giant'] = [];
   troopData['giant']['type']             = "Ground";
   troopData['giant']['preferred target'] = "Defenses";
   troopData['giant']['multiplier']       = 1;
   troopData['giant']['ground attack']    = true;
   troopData['giant']['air attack']       = false;
   troopData['giant']['splash radius']    = -1;
   troopData['giant']['housing space']    = 5;
   troopData['giant']['training time']    = 120;
   troopData['giant']['movement speed']   = 12;
   troopData['giant']['attack speed']     = 2.0;
   troopData['giant']['barracks type']    = "Normal";
   troopData['giant']['barracks level']   = 4;
   troopData['giant']['range']            = 1;
   troopData['giant']['death range']      = -1;
   troopData['giant']['description'] =
      'These big guys may seem calm, but show them a turret or cannon and ' +
      'you\'ll see their fury unleashed! Slow yet durable, these warriors ' +
      'are best used to soak up hits.';
   troopData['giant']['dps'] =
      [ 11,     14,     19,     24,      31,      40];
   troopData['giant']['hitpoints'] =
      [300,    360,    430,    520,     670,     880];
   troopData['giant']['training cost'] =
      [500,   1000,   1500,   2000,    2500,    3000];
   troopData['giant']['laboratory level'] =
      [  0,      2,      4,      5,       6,       7];
   troopData['giant']['research time'] =
      [  0,     24,     48,     72,     120,     240];
   troopData['giant']['research cost'] =
      [  0, 100000, 250000, 750000, 2250000, 6000000];

   troopData['list'].push('Wall Breaker');
   troopData['wallbreaker'] = [];
   troopData['wallbreaker']['type']             = "Ground";
   troopData['wallbreaker']['preferred target'] = "Walls";
   troopData['wallbreaker']['multiplier']       = 40;
   troopData['wallbreaker']['ground attack']    = true;
   troopData['wallbreaker']['air attack']       = false;
   troopData['wallbreaker']['splash radius']    = 2;
   troopData['wallbreaker']['housing space']    = 2;
   troopData['wallbreaker']['training time']    = 120;
   troopData['wallbreaker']['movement speed']   = 24;
   troopData['wallbreaker']['attack speed']     = 1.0;
   troopData['wallbreaker']['barracks type']    = "Normal";
   troopData['wallbreaker']['barracks level']   = 5;
   troopData['wallbreaker']['range']            = 1;
   troopData['wallbreaker']['death range']      = -1;
   troopData['wallbreaker']['description'] =
      'Nothing warms a Wall Breaker\'s cold and undead heart like blowing ' +
      'up walls. A squad of them will make way for your ground units, and ' +
      'they will do it with a BANG!';
   troopData['wallbreaker']['dps'] =
      [  12,     16,     24,     32,      46,      60];
   troopData['wallbreaker']['hitpoints'] =
      [  20,     24,     29,     35,      42,      54];
   troopData['wallbreaker']['training cost'] =
      [1000,   1500,   2000,   2500,    3000,    3500];
   troopData['wallbreaker']['laboratory level'] =
      [   0,      2,      4,      5,       6,       8];
   troopData['wallbreaker']['research time'] =
      [   0,     24,     48,     72,     120,     240];
   troopData['wallbreaker']['research cost'] =
      [   0, 100000, 250000, 750000, 2250000, 6750000];

   troopData['list'].push('Balloon');
   troopData['balloon'] = [];
   troopData['balloon']['type']             = "Air";
   troopData['balloon']['preferred target'] = "Defenses";
   troopData['balloon']['multiplier']       = 1;
   troopData['balloon']['ground attack']    = true;
   troopData['balloon']['air attack']       = false;
   troopData['balloon']['splash radius']    = 1.2;
   troopData['balloon']['housing space']    = 5;
   troopData['balloon']['training time']    = 480;
   troopData['balloon']['movement speed']   = 10;
   troopData['balloon']['attack speed']     = 4.0;
   troopData['balloon']['barracks type']    = "Normal";
   troopData['balloon']['barracks level']   = 6;
   troopData['balloon']['range']            = 0.5;
   troopData['balloon']['death range']      = 1.2;
   troopData['balloon']['description'] =
      'These promoted skeletons have traded in their joy of destroying ' +
      'walls for a joy of destroying defenses. Deploy them to take out ' +
      'pesky mortars and cannons!';
   troopData['balloon']['dps'] =
      [  25,     32,     48,      72,     108,     162];
   troopData['balloon']['death damage'] =
      [  25,     32,     48,      72,     108,     162];
   troopData['balloon']['hitpoints'] =
      [ 150,    180,    216,     280,     390,     545];
   troopData['balloon']['training cost'] =
      [2000,   2500,   3000,    3500,    4000,    4500];
   troopData['balloon']['laboratory level'] =
      [   0,      2,      4,       5,       6,       7];
   troopData['balloon']['research time'] =
      [   0,     24,     48,      72,     120,     240];
   troopData['balloon']['research cost'] =
      [   0, 150000, 450000, 1350000, 2500000, 6000000];

   troopData['list'].push('Wizard');
   troopData['wizard'] = [];
   troopData['wizard']['type']             = "Ground";
   troopData['wizard']['preferred target'] = "None";
   troopData['wizard']['multiplier']       = 1;
   troopData['wizard']['ground attack']    = true;
   troopData['wizard']['air attack']       = true;
   troopData['wizard']['splash radius']    = 0.3;
   troopData['wizard']['housing space']    = 4;
   troopData['wizard']['training time']    = 480;
   troopData['wizard']['movement speed']   = 16;
   troopData['wizard']['attack speed']     = 1.5;
   troopData['wizard']['barracks type']    = "Normal";
   troopData['wizard']['barracks level']   = 7;
   troopData['wizard']['range']            = 3;
   troopData['wizard']['death range']      = -1;
   troopData['wizard']['description'] =
      'The wizard is a terrifying presence on the battlefield. Pair him ' +
      'up with some of his fellows and cast concentrated blasts of ' +
      'destruction on anything, land or sky!';
   troopData['wizard']['dps'] =
      [  50,     70,     90,     125,     170,     180];
   troopData['wizard']['hitpoints'] =
      [  75,     90,    108,     130,     156,     164];
   troopData['wizard']['training cost'] =
      [1500,   2000,   2500,    3000,    3500,    4000];
   troopData['wizard']['laboratory level'] =
      [   0,      3,      4,       5,       6,       8];
   troopData['wizard']['research time'] =
      [   0,     24,     48,      72,     120,     168];
   troopData['wizard']['research cost'] =
      [   0, 150000, 450000, 1350000, 2500000, 7500000];

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
   troopData['healer']['training time']    = 900;
   troopData['healer']['movement speed']   = 16;
   troopData['healer']['attack speed']     = 0.7;
   troopData['healer']['barracks type']    = "Normal";
   troopData['healer']['barracks level']   = 8;
   troopData['healer']['range']            = 5;
   troopData['healer']['death range']      = -1;
   troopData['healer']['description'] =
      'This majestic creature lives to protect and aid her fellow troops. ' +
      'Any army is improved with her healing support, but make sure to ' +
      'protect her from air defenses!';
   troopData['healer']['dps'] =
      [   0,      0,       0,       0];
   troopData['healer']['hps'] =
      [  35,     42,      55,      71];
   troopData['healer']['hitpoints'] =
      [ 500,    600,     840,    1176];
   troopData['healer']['training cost'] =
      [5000,   6000,    8000,   10000];
   troopData['healer']['laboratory level'] =
      [   0,      5,       6,       7];
   troopData['healer']['research time'] =
      [   0,     72,     120,     168];
   troopData['healer']['research cost'] =
      [   0, 750000, 1500000, 3000000];

   troopData['list'].push('Dragon');
   troopData['dragon'] = [];
   troopData['dragon']['type']             = "Air";
   troopData['dragon']['preferred target'] = "None";
   troopData['dragon']['multiplier']       = 1;
   troopData['dragon']['ground attack']    = true;
   troopData['dragon']['air attack']       = true;
   troopData['dragon']['splash radius']    = 0.3;
   troopData['dragon']['housing space']    = 20;
   troopData['dragon']['training time']    = 1800;
   troopData['dragon']['movement speed']   = 16;
   troopData['dragon']['attack speed']     = 1.5;
   troopData['dragon']['barracks type']    = "Normal";
   troopData['dragon']['barracks level']   = 9;
   troopData['dragon']['range']            = 3;
   troopData['dragon']['death range']      = -1;
   troopData['dragon']['description'] =
      'The might of the dragons are known throughout the land. The scaly ' +
      'terror of the skies feels no mercy and nothing will escape the fiery ' +
      'splashes of his breath.';
   troopData['dragon']['dps'] =
      [  140,     160,     180,     190];
   troopData['dragon']['hitpoints'] =
      [ 1900,    2100,    2300,    2400];
   troopData['dragon']['training cost'] =
      [25000,   30000,   36000,   42000];
   troopData['dragon']['laboratory level'] =
      [    0,       5,       6,       8];
   troopData['dragon']['research time'] =
      [    0,     168,     240,     288];
   troopData['dragon']['research cost'] =
      [    0, 2000000, 3000000, 8000000];

   troopData['list'].push('P.E.K.K.A');
   troopData['p.e.k.k.a'] = [];
   troopData['p.e.k.k.a']['type']             = "Ground";
   troopData['p.e.k.k.a']['preferred target'] = "None";
   troopData['p.e.k.k.a']['multiplier']       = 1;
   troopData['p.e.k.k.a']['ground attack']    = true;
   troopData['p.e.k.k.a']['air attack']       = false;
   troopData['p.e.k.k.a']['splash radius']    = -1;
   troopData['p.e.k.k.a']['housing space']    = 25;
   troopData['p.e.k.k.a']['training time']    = 2700;
   troopData['p.e.k.k.a']['movement speed']   = 16;
   troopData['p.e.k.k.a']['attack speed']     = 2.5;
   troopData['p.e.k.k.a']['barracks type']    = "Normal";
   troopData['p.e.k.k.a']['barracks level']   = 10;
   troopData['p.e.k.k.a']['range']            = 0.8;
   troopData['p.e.k.k.a']['death range']      = -1;
   troopData['p.e.k.k.a']['description'] = 
      'Is P.E.K.K.A a knight? A samurai? A robot? No one knows! ' +
      'P.E.K.K.A\'s armor absorbs even the mightiest of blows, but ' +
      'it doesn\'t handle electricity too well.';
   troopData['p.e.k.k.a']['dps'] =
      [  240,     270,     300,     330];
   troopData['p.e.k.k.a']['hitpoints'] =
      [ 2800,    3100,    3400,    3700];
   troopData['p.e.k.k.a']['training cost'] =
      [30000,   35000,   42000,   50000];
   troopData['p.e.k.k.a']['laboratory level'] =
      [    0,       6,       6,       8];
   troopData['p.e.k.k.a']['research time'] =
      [    0,     240,     288,     336];
   troopData['p.e.k.k.a']['research cost'] =
      [    0, 3000000, 6000000, 8000000];

   troopData['list'].push('Minion');
   troopData['minion'] = [];
   troopData['minion']['type']             = "Air";
   troopData['minion']['preferred target'] = "None";
   troopData['minion']['multiplier']       = 1;
   troopData['minion']['ground attack']    = true;
   troopData['minion']['air attack']       = true;
   troopData['minion']['splash radius']    = -1;
   troopData['minion']['housing space']    = 2;
   troopData['minion']['training time']    = 45;
   troopData['minion']['movement speed']   = 32;
   troopData['minion']['attack speed']     = 1.0;
   troopData['minion']['barracks type']    = "Dark";
   troopData['minion']['barracks level']   = 1;
   troopData['minion']['range']            = 2.75;
   troopData['minion']['death range']      = -1;
   troopData['minion']['description'] = 
      'This terror of the skies was born out of Dark Elixir. Undetectable ' +
      'by the Seeking Air Mine, Minions materialize with ease, but are ' +
      'fragile in our world.';
   troopData['minion']['dps'] =
      [ 35,    38,    42,    46,    50];
   troopData['minion']['hitpoints'] =
      [ 55,    60,    66,    72,    78];
   troopData['minion']['training cost'] =
      [  6,     7,     8,     9,    10];
   troopData['minion']['laboratory level'] =
      [  0,     5,     6,     6,     7];
   troopData['minion']['research time'] =
      [  0,   120,   144,   168,   240];
   troopData['minion']['research cost'] =
      [  0, 10000, 20000, 30000, 40000];

   troopData['list'].push('Hog Rider');
   troopData['hogrider'] = [];
   troopData['hogrider']['type']             = "Ground";
   troopData['hogrider']['preferred target'] = "Defenses";
   troopData['hogrider']['multiplier']       = 1;
   troopData['hogrider']['ground attack']    = true;
   troopData['hogrider']['air attack']       = false;
   troopData['hogrider']['splash radius']    = -1;
   troopData['hogrider']['housing space']    = 5;
   troopData['hogrider']['training time']    = 120;
   troopData['hogrider']['movement speed']   = 24;
   troopData['hogrider']['attack speed']     = 1.0;
   troopData['hogrider']['barracks type']    = "Dark";
   troopData['hogrider']['barracks level']   = 2;
   troopData['hogrider']['range']            = 0.6;
   troopData['hogrider']['death range']      = -1;
   troopData['hogrider']['description'] = 
      'Having tamed the fierce leaping hog, the Hog Rider punishes those ' +
      'who hide behind their puny walls! Fueled by Dark Elixir, these ' +
      'warriors have never known defeat!';
   troopData['hogrider']['dps'] =
      [ 60,    70,    80,    92,   105];
   troopData['hogrider']['hitpoints'] =
      [285,   328,   380,   437,   500];
   troopData['hogrider']['training cost'] =
      [ 30,    35,    40,    45,    50];
   troopData['hogrider']['laboratory level'] =
      [  0,     5,     6,     6,     7];
   troopData['hogrider']['research time'] =
      [  0,   192,   240,   288,   336];
   troopData['hogrider']['research cost'] =
      [  0, 20000, 30000, 40000, 50000];

   troopData['list'].push('Valkyrie');
   troopData['valkyrie'] = [];
   troopData['valkyrie']['type']             = "Ground";
   troopData['valkyrie']['preferred target'] = "None";
   troopData['valkyrie']['multiplier']       = 1;
   troopData['valkyrie']['ground attack']    = true;
   troopData['valkyrie']['air attack']       = false;
   troopData['valkyrie']['splash radius']    = 1;
   troopData['valkyrie']['housing space']    = 8;
   troopData['valkyrie']['training time']    = 900;
   troopData['valkyrie']['movement speed']   = 24;
   troopData['valkyrie']['attack speed']     = 1.8;
   troopData['valkyrie']['barracks type']    = "Dark";
   troopData['valkyrie']['barracks level']   = 3;
   troopData['valkyrie']['range']            = 0.5;
   troopData['valkyrie']['death range']      = -1;
   troopData['valkyrie']['description'] = 
      'A master of the two-handed Axe and granted terrible power by Dark ' +
      'Elixir, this glorious warrior crushes enemy troops and buildings ' +
      'with her whirlwind blow!';
   troopData['valkyrie']['dps'] =
      [ 88,    99,   111,   124];
   troopData['valkyrie']['hitpoints'] =
      [750,   825,   910,  1000];
   troopData['valkyrie']['training cost'] =
      [ 70,   100,   130,   160];
   troopData['valkyrie']['laboratory level'] =
      [  0,     6,     7,     7];
   troopData['valkyrie']['research time'] =
      [  0,   240,   288,   336];
   troopData['valkyrie']['research cost'] =
      [  0, 50000, 60000, 70000];

   troopData['list'].push('Golem');
   troopData['golem'] = [];
   troopData['golem']['type']             = "Ground";
   troopData['golem']['preferred target'] = "Defenses";
   troopData['golem']['multiplier']       = 1;
   troopData['golem']['ground attack']    = true;
   troopData['golem']['air attack']       = false;
   troopData['golem']['splash radius']    = -1;
   troopData['golem']['housing space']    = 30;
   troopData['golem']['training time']    = 2700;
   troopData['golem']['movement speed']   = 12;
   troopData['golem']['attack speed']     = 2.4;
   troopData['golem']['barracks type']    = "Dark";
   troopData['golem']['barracks level']   = 4;
   troopData['golem']['range']            = 1;
   troopData['golem']['death range']      = 1.2;
   troopData['golem']['description'] = 
      'The mighty Golem loves to soak up damage! When destroyed, it ' +
      'explodes and splits in two. The resulting Golemites have one-fifth ' +
      'the Golem\'s strength and hitpoints.';
   troopData['golem']['dps'] =
      [  38,    42,    46,    50,    54];
   troopData['golem']['death damage'] =
      [ 350,   400,   450,   500,   550];
   troopData['golem']['hitpoints'] =
      [4500,  5000,  5500,  6000,  6300];
   troopData['golem']['training cost'] =
      [ 450,   525,   600,   675,   750];
   troopData['golem']['laboratory level'] =
      [   0,     6,     7,     7,     8];
   troopData['golem']['research time'] =
      [   0,   240,   288,   336,   336];
   troopData['golem']['research cost'] =
      [   0, 60000, 70000, 80000, 90000];

   troopData['list'].push('Witch');
   troopData['witch'] = [];
   troopData['witch']['type']             = "Ground";
   troopData['witch']['preferred target'] = "None";
   troopData['witch']['multiplier']       = 1;
   troopData['witch']['ground attack']    = true;
   troopData['witch']['air attack']       = true;
   troopData['witch']['splash radius']    = 0.3;
   troopData['witch']['housing space']    = 12;
   troopData['witch']['training time']    = 1200;
   troopData['witch']['movement speed']   = 12;
   troopData['witch']['attack speed']     = 0.7;
   troopData['witch']['barracks type']    = "Dark";
   troopData['witch']['barracks level']   = 5;
   troopData['witch']['range']            = 4;
   troopData['witch']['death range']      = -1;
   troopData['witch']['description'] = 
      'The Witch never fights alone, constantly raising dead warriors. ' +
      'Upgraded Witches raise more skeletons at a time.';
   troopData['witch']['dps'] =
      [ 25,    30];
   troopData['witch']['hitpoints'] =
      [ 75,   100];
   troopData['witch']['training cost'] =
      [250,   350];
   troopData['witch']['laboratory level'] =
      [  0,     7];
   troopData['witch']['research time'] =
      [  0,   240];
   troopData['witch']['research cost'] =
      [  0, 75000];
   troopData['witch']['skeletons'] =
      [  6,     8];

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
   troopData['skeleton']['barracks level']   = 0;
   troopData['skeleton']['range']            = 0.4;
   troopData['skeleton']['death range']      = -1;
   troopData['skeleton']['description'] =
      'This undead creature poses little threat by itself. But it never ' +
      'fights alone, since the Witch can summon an endless horde of ' +
      'Skeletons against your enemy!';
   troopData['skeleton']['dps'] =
      [ 25];
   troopData['skeleton']['hitpoints'] =
      [ 45];
   troopData['skeleton']['training cost'] =
      [  0];
   troopData['skeleton']['laboratory level'] =
      [  0];
   troopData['skeleton']['research time'] =
      [  0];
   troopData['skeleton']['research cost'] =
      [  0];
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
 * 'creation time'     (time to create spell in Spell Factory)
 * 'spell factory'     (Spell Factory level required to unlock)
 *
 * Level-specific information
 * 
 * 'creation cost'     (cost to create spell in Spell Factory)
 * 'research cost'     (cost to upgrade spell in Laboratory)
 * 'research time'     (time to upgrade spell in Laboratory)
 * 'laboratory level'  (Lab required to upgrade spell to that level)
 *
 * In addition, a 'list' item is defined that lists any
 * spell-specific information. This list of identifiers can be
 * used to query for any of this information, some general and
 * some level-dependent.
 */
function spellInfo(strSpell, strInfo, intLevel) {
   if (!(Array.isArray(spellData)))
      populateSpellData();

   var sSpell = strSpell.toLowerCase();
   var sInfo  = (arguments.length > 1 ? strInfo.toLowerCase() : '');

   if (sSpell == 'list')
      return spellData['list'];

   if (sSpell == "santa's surprise")
      sSpell = 'santas surprise';

   if (sInfo == 'levels')
      return spellData[sSpell]['creation cost'].length;

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

   spellData['list'].push('Lightning');
   spellData['lightning'] = [];
   spellData['lightning']['creation time'] = 30;
   spellData['lightning']['spell factory'] = 1;
   spellData['lightning']['creation cost'] =
      [15000,  16500,  18000,   20000,   22000,   24000];
   spellData['lightning']['research cost'] =
      [    0, 200000, 500000, 1000000, 2000000, 8000000];
   spellData['lightning']['research time'] =
      [    0,     24,     48,      72,      96,     336];
   spellData['lightning']['laboratory level'] =
      [    0,      1,      2,       3,       6,       8];
   // Spell-specific information
   spellData['lightning']['data'] = [
      'radius',
      'random radius',
      'strikes',
      'strike time',
      'total damage',
      'strike damage'
   ];
   spellData['lightning']['radius']        = 2;
   spellData['lightning']['random radius'] = 3.5;
   spellData['lightning']['strikes']       = 6;
   spellData['lightning']['strike time']   = 0.4;
   spellData['lightning']['total damage'] =
      [  300,    330,    360,     390,     420,     450];
   spellData['lightning']['strike damage'] = [];
   for (i = 0; i < spellData['lightning']['total damage'].length; i ++) {
      var dam = spellData['lightning']['total damage'][i] /
         spellData['lightning']['strikes'];
      spellData['lightning']['strike damage'].push(dam);
   }

   spellData['list'].push('Healing');
   spellData['healing'] = [];
   spellData['healing']['creation time'] = 30;
   spellData['healing']['spell factory'] = 2;
   spellData['healing']['creation cost'] =
      [15000,  16500,  18000,   20000,   22000,   24000];
   spellData['healing']['research cost'] =
      [    0, 300000, 600000, 1200000, 2400000, 4800000];
   spellData['healing']['research time'] =
      [    0,     24,     48,      72,     120,     168];
   spellData['healing']['laboratory level'] =
      [    0,      2,      4,       5,       6,       7];
   // Spell-specific information
   spellData['healing']['data'] = [
      'radius',
      'pulses',
      'pulse time',
      'total healing',
      'pulse healing'
   ];
   spellData['healing']['radius']        = 5;
   spellData['healing']['pulses']        = 40;
   spellData['healing']['pulse time']    = 0.3;
   spellData['healing']['total healing'] =
      [  600,    800,   1000,    1200,    1400,    1600];
   spellData['healing']['pulse healing'] = [];
   for (i = 0; i < spellData['healing']['total healing'].length; i ++) {
      var heal = spellData['healing']['total healing'][i] /
         spellData['healing']['pulses'];
      spellData['healing']['pulse healing'].push(heal);
   }

   spellData['list'].push('Rage');
   spellData['rage'] = [];
   spellData['rage']['creation time'] = 45;
   spellData['rage']['spell factory'] = 3;
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
      'radius',
      'pulses',
      'pulse time',
      'boost time',
      'damage boost'
   ];
   spellData['rage']['radius']        = 2;
   spellData['rage']['pulses']        = 40;
   spellData['rage']['pulse time']    = 0.3;
   spellData['rage']['boost time']    = 1;
   spellData['rage']['damage boost'] =
      [  1.3,    1.4,    1.5,     1.6,     1.8];

   spellData['list'].push('Jump');
   spellData['jump'] = [];
   spellData['jump']['data'] = [
      'radius',
      'pulses',
      'pulse time',
      'boost time'
   ];
   spellData['jump']['creation time'] = 45;
   spellData['jump']['spell factory'] = 4;
   spellData['jump']['creation cost'] =
      [23000,   29000];
   spellData['jump']['research cost'] =
      [    0, 4000000];
   spellData['jump']['research time'] =
      [    0,     120];
   spellData['jump']['laboratory level'] =
      [    0,       6];
   // Spell-specific information
   spellData['jump']['radius']        = 5;
   spellData['jump']['boost time']    = 1;
   spellData['jump']['pulse time'] =
      [  0.3,     0.3];
   spellData['jump']['pulses'] = 
      [   30,      60];

   spellData['list'].push('Freeze');
   spellData['freeze'] = [];
   spellData['freeze']['creation time'] = 45;
   spellData['freeze']['spell factory'] = 5;
   spellData['freeze']['creation cost'] =
      [26000,  29000,    31000,   33000];
   spellData['freeze']['research cost'] =
      [    0, 4000000, 6000000, 8000000];
   spellData['freeze']['research time'] =
      [    0,    120,      240,     336];
   spellData['freeze']['laboratory level'] =
      [    0,      8,        8,       8];
   // Spell-specific information
   spellData['freeze']['data'] = [
      'radius',
      'freeze time'
   ];
   spellData['freeze']['radius']        = 2;
   spellData['freeze']['freeze time'] =
      [    4,      5,        6,       7];

   spellData['list'].push("Santa's Surprise");
   spellData['santas surprise'] = [];
   spellData['santas surprise']['creation time'] = 1500;
   spellData['santas surprise']['spell factory'] = 1;
   spellData['santas surprise']['creation cost'] =
      [25000];
   spellData['santas surprise']['research cost'] =
      [    0];
   spellData['santas surprise']['research time'] =
      [    0];
   spellData['santas surprise']['laboratory level'] =
      [    0];
   // Spell-specific information
   spellData['santas surprise']['data'] = [
      'radius',
      'random radius',
      'strikes',
      'strike time',
      'total damage',
      'strike damage'
   ];
   spellData['santas surprise']['radius']        = 1;
   spellData['santas surprise']['random radius'] = 4;
   spellData['santas surprise']['strikes']       = 5;
   spellData['santas surprise']['strike time']   = 0.1;
   spellData['santas surprise']['total damage'] =
      [ 1500];
   spellData['santas surprise']['strike damage'] = [];
   for (i = 0; i < spellData['santas surprise']['total damage'].length; i ++) {
      var dam = spellData['santas surprise']['total damage'][i] /
         spellData['santas surprise']['strikes'];
      spellData['santas surprise']['strike damage'].push(dam);
   }
}