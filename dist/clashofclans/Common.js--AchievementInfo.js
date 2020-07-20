function timeStamp_AchievementInfo_js() {
   return "2014.09.25 16:41 (UTC-7)";
}

/*
 * Function to return all relevant achievement info.
 *
 * Usage: achievementInfo(achievement name, info type, (optional) achievement level)
 *
 * Information (info type) currently provided:
 * ===========================================
 * 'description'        (Description of the achievement at each level)
 * 'experience'         (Amount of experience awarded for each level)
 * 'gems'               (Amount of gems awarded for each level)
 * 'mininum town hall'  (The absolute minimum Town Hall possible to complete)
 * 'expected town hall' (A 'reasonable' Town Hall level expected to complete)
 *
 * Note that the 'expected town hall' is intended to be a guess at when a
 * relatively industrious (but not superhuman) player might expect to
 * achieve each particular level of achievement. This measure is definitely
 * subjective in many cases, and many players may complete the achievement
 * earlier or much later (or not at all). In the case of the very hard
 * achievements, they are currently placed at Town Hall 10, although very
 * few players have achieved them even at that Town Hall level.
 */

/* Load information into global variables for performance */
var achievementData;

function achievementInfo(strAchievement, strInfo, intLevel) {
   if (!(Array.isArray(achievementData)))
      populateAchievementData();

   var sAchievement = strAchievement.toLowerCase();
   var sInfo        = (arguments.length > 1 ? strInfo.toLowerCase() : '');

   // Remove any spaces and punctuation
   sAchievement = sAchievement.replace(/[ \.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

   if (sAchievement === 'list')
      return achievementData['list'];

   // No intLevel provided (let 'levels' fall through)
   if (arguments.length === 2 && sInfo !== 'levels')
      return achievementData[sAchievement][sInfo];

   switch (sInfo) {
      case 'levels':
         return (typeof achievementData[sAchievement] !== 'undefined' ?
            achievementData[sAchievement]['description'].length : 0);
      default:
         return achievementData[sAchievement][sInfo][intLevel - 1];
   }
}

/* Function called only if achievementData does not contain an array */
function populateAchievementData() {
   achievementData         = [];
   achievementData['list'] = [];

   achievementData['list'].push('Bigger Coffers');
   achievementData['biggercoffers'] = [];
   achievementData['biggercoffers']['description'] = [
      'Upgrade a Gold Storage to level 2',  // 1 star
      'Upgrade a Gold Storage to level 5',  // 2 stars
      'Upgrade a Gold Storage to level 10', // 3 stars
   ];
   achievementData['biggercoffers']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['biggercoffers']['gems'] = [
      2,  // 1 star
      5,  // 2 stars
      10, // 3 stars
   ];
   achievementData['biggercoffers']['mininum town hall'] = [
      buildingInfo('gold storage', 'required town hall', 2),  // 1 star
      buildingInfo('gold storage', 'required town hall', 5),  // 2 stars
      buildingInfo('gold storage', 'required town hall', 8),  // 3 stars
   ];
   achievementData['biggercoffers']['expected town hall'] = [
      buildingInfo('gold storage', 'required town hall', 2),  // 1 star
      buildingInfo('gold storage', 'required town hall', 5),  // 2 stars
      buildingInfo('gold storage', 'required town hall', 8),  // 3 stars
   ];

   achievementData['list'].push('Get those Goblins!');
   achievementData['getthosegoblins'] = [];
   achievementData['getthosegoblins']['description'] = [
      'Win 10 stars on the Campaign Map',  // 1 star
      'Win 50 stars on the Campaign Map',  // 2 stars
      'Win 150 stars on the Campaign Map', // 3 stars
   ];
   achievementData['getthosegoblins']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['getthosegoblins']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['getthosegoblins']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['getthosegoblins']['expected town hall'] = [
      3, // 1 star
      4, // 2 stars
      8, // 3 stars
   ];

   achievementData['list'].push('Bigger & Better');
   achievementData['biggerbetter'] = [];
   achievementData['biggerbetter']['description'] = [
      'Upgrade Town Hall to level 3',  // 1 star
      'Upgrade Town Hall to level 5',  // 2 stars
      'Upgrade Town Hall to level 8', // 3 stars
   ];
   achievementData['biggerbetter']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['biggerbetter']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['biggerbetter']['mininum town hall'] = [
      3, // 1 star
      5, // 2 stars
      8, // 3 stars
   ];
   achievementData['biggerbetter']['expected town hall'] = [
      3, // 1 star
      5, // 2 stars
      8, // 3 stars
   ];

   achievementData['list'].push('Nice and Tidy');
   achievementData['niceandtidy'] = [];
   achievementData['niceandtidy']['description'] = [
      'Remove 5 obstacles (trees, rocks, bushes)',   // 1 star
      'Remove 50 obstacles (trees, rocks, bushes)',  // 2 stars
      'Remove 500 obstacles (trees, rocks, bushes)', // 3 stars
   ];
   achievementData['niceandtidy']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['niceandtidy']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['niceandtidy']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['niceandtidy']['expected town hall'] = [
      2, // 1 star
      3, // 2 stars
      5, // 3 stars
   ];

   achievementData['list'].push('Release the Beasts');
   achievementData['releasethebeasts'] = [];
   achievementData['releasethebeasts']['description'] = [
      'Unlock Archer in the Barracks',        // 1 star
      'Unlock Wall Breaker in the Barracks',  // 2 stars
      'Unlock Dragon in the Barracks',        // 3 stars
   ];
   achievementData['releasethebeasts']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['releasethebeasts']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['releasethebeasts']['mininum town hall'] = [
      buildingInfo('barracks', 'required town hall', troopInfo('archer',      'barracks level')), // 1 star
      buildingInfo('barracks', 'required town hall', troopInfo('wallbreaker', 'barracks level')), // 2 stars
      buildingInfo('barracks', 'required town hall', troopInfo('dragon',      'barracks level')), // 3 stars
   ];
   achievementData['releasethebeasts']['expected town hall'] = [
      buildingInfo('barracks', 'required town hall', troopInfo('archer',      'barracks level')), // 1 star
      buildingInfo('barracks', 'required town hall', troopInfo('wallbreaker', 'barracks level')), // 2 stars
      buildingInfo('barracks', 'required town hall', troopInfo('dragon',      'barracks level')), // 3 stars
   ];

   achievementData['list'].push('Gold Grab');
   achievementData['goldgrab'] = [];
   achievementData['goldgrab']['description'] = [
      'Steal 20,000 Gold',      // 1 star
      'Steal 1,000,000 Gold',   // 2 stars
      'Steal 100,000,000 Gold', // 3 stars
   ];
   achievementData['goldgrab']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['goldgrab']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['goldgrab']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['goldgrab']['expected town hall'] = [
      3, // 1 star
      5, // 2 stars
      8, // 3 stars
   ];

   achievementData['list'].push('Elixir Escapade');
   achievementData['elixirescapade'] = [];
   achievementData['elixirescapade']['description'] = [
      'Steal 20,000 Elixir',      // 1 star
      'Steal 1,000,000 Elixir',   // 2 stars
      'Steal 100,000,000 Elixir', // 3 stars
   ];
   achievementData['elixirescapade']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['elixirescapade']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['elixirescapade']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['elixirescapade']['expected town hall'] = [
      3, // 1 star
      5, // 2 stars
      8, // 3 stars
   ];

   achievementData['list'].push('Sweet Victory!');
   achievementData['sweetvictory'] = [];
   achievementData['sweetvictory']['description'] = [
      'Achieve a total of 75 trophies in Multiplayer battles',    // 1 star
      'Achieve a total of 750 trophies in Multiplayer battles',   // 2 stars
      'Achieve a total of 1,250 trophies in Multiplayer battles', // 3 stars
   ];
   achievementData['sweetvictory']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['sweetvictory']['gems'] = [
      5,   // 1 star
      10,  // 2 stars
      450, // 3 stars
   ];
   achievementData['sweetvictory']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['sweetvictory']['expected town hall'] = [
      3, // 1 star
      5, // 2 stars
      6, // 3 stars
   ];

   achievementData['list'].push('Empire Builder');
   achievementData['empirebuilder'] = [];
   achievementData['empirebuilder']['description'] = [
      'Rebuild the Clan Castle',        // 1 star
      'Upgrade Clan Castle to Level 2', // 2 stars
      'Upgrade Clan Castle to Level 4', // 3 stars
   ];
   achievementData['empirebuilder']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['empirebuilder']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['empirebuilder']['mininum town hall'] = [
      buildingInfo('clan castle', 'required town hall', 1), // 1 star
      buildingInfo('clan castle', 'required town hall', 2), // 2 stars
      buildingInfo('clan castle', 'required town hall', 4), // 3 stars
   ];
   achievementData['empirebuilder']['expected town hall'] = [
      buildingInfo('clan castle', 'required town hall', 1), // 1 star
      buildingInfo('clan castle', 'required town hall', 2), // 2 stars
      buildingInfo('clan castle', 'required town hall', 4), // 3 stars
   ];

   achievementData['list'].push('Wall Buster');
   achievementData['wallbuster'] = [];
   achievementData['wallbuster']['description'] = [
      'Destroy 10 Walls in Multiplayer battles',    // 1 star
      'Destroy 100 Walls in Multiplayer battles',   // 2 stars
      'Destroy 2,000 Walls in Multiplayer battles', // 3 stars
   ];
   achievementData['wallbuster']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['wallbuster']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['wallbuster']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['wallbuster']['expected town hall'] = [
      3, // 1 star
      5, // 2 stars
      7, // 3 stars
   ];

   achievementData['list'].push('Humiliator');
   achievementData['humiliator'] = [];
   achievementData['humiliator']['description'] = [
      'Destroy 10 Town Halls in Multiplayer battles',    // 1 star
      'Destroy 100 Town Halls in Multiplayer battles',   // 2 stars
      'Destroy 2,000 Town Halls in Multiplayer battles', // 3 stars
   ];
   achievementData['humiliator']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['humiliator']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      50, // 3 stars
   ];
   achievementData['humiliator']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['humiliator']['expected town hall'] = [
      3, // 1 star
      6, // 2 stars
      9, // 3 stars
   ];

   achievementData['list'].push('Union Buster');
   achievementData['unionbuster'] = [];
   achievementData['unionbuster']['description'] = [
      'Destroy 25 Builder\'s Huts in Multiplayer battles',    // 1 star
      'Destroy 250 Builder\'s Huts in Multiplayer battles',   // 2 stars
      'Destroy 2,500 Builder\'s Huts in Multiplayer battles', // 3 stars
   ];
   achievementData['unionbuster']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['unionbuster']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      30, // 3 stars
   ];
   achievementData['unionbuster']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['unionbuster']['expected town hall'] = [
      3, // 1 star
      6, // 2 stars
      8, // 3 stars
   ];

   achievementData['list'].push('Conqueror');
   achievementData['conqueror'] = [];
   achievementData['conqueror']['description'] = [
      'Win 25 Multiplayer battles',    // 1 star
      'Win 250 Multiplayer battles',   // 2 stars
      'Win 5,000 Multiplayer battles', // 3 stars
   ];
   achievementData['conqueror']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['conqueror']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['conqueror']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['conqueror']['expected town hall'] = [
      4,  // 1 star
      6,  // 2 stars
      10, // 3 stars
   ];

   achievementData['list'].push('Unbreakable');
   achievementData['unbreakable'] = [];
   achievementData['unbreakable']['description'] = [
      'Successfully defend against 10 attacks',    // 1 star
      'Successfully defend against 250 attacks',   // 2 stars
      'Successfully defend against 5,000 attacks', // 3 stars
   ];
   achievementData['unbreakable']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['unbreakable']['gems'] = [
      5,   // 1 star
      50,  // 2 stars
      100, // 3 stars
   ];
   achievementData['unbreakable']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['unbreakable']['expected town hall'] = [
      5,  // 1 star
      8,  // 2 stars
      10, // 3 stars
   ];

   achievementData['list'].push('Friend in Need');
   achievementData['friendinneed'] = [];
   achievementData['friendinneed']['description'] = [
      'Donate 100 Clan Castle capacity worth of reinforcements',    // 1 star
      'Donate 5,000 Clan Castle capacity worth of reinforcements',  // 2 stars
      'Donate 25,000 Clan Castle capacity worth of reinforcements', // 3 stars
   ];
   achievementData['friendinneed']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['friendinneed']['gems'] = [
      5,   // 1 star
      25,  // 2 stars
      250, // 3 stars
   ];
   achievementData['friendinneed']['mininum town hall'] = [
      buildingInfo('clan castle', 'required town hall', 1), // 1 star
      buildingInfo('clan castle', 'required town hall', 1), // 2 stars
      buildingInfo('clan castle', 'required town hall', 1), // 3 stars
   ];
   achievementData['friendinneed']['expected town hall'] = [
      4, // 1 star
      6, // 2 stars
      8, // 3 stars
   ];

   achievementData['list'].push('Mortar Mauler');
   achievementData['mortarmauler'] = [];
   achievementData['mortarmauler']['description'] = [
      'Destroy 25 Mortars in Multiplayer battles',    // 1 star
      'Destroy 500 Mortars in Multiplayer battles',   // 2 stars
      'Destroy 5,000 Mortars in Multiplayer battles', // 3 stars
   ];
   achievementData['mortarmauler']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['mortarmauler']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['mortarmauler']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['mortarmauler']['expected town hall'] = [
      4, // 1 star
      7, // 2 stars
      10, // 3 stars
   ];

   achievementData['list'].push('Heroic Heist');
   achievementData['heroicheist'] = [];
   achievementData['heroicheist']['description'] = [
      'Steal 20,000 Dark Elixir',    // 1 star
      'Steal 250,000 Dark Elixir',   // 2 stars
      'Steal 1,000,000 Dark Elixir', // 3 stars
   ];
   achievementData['heroicheist']['experience'] = [
      10,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['heroicheist']['gems'] = [
      5,  // 1 star
      10, // 2 stars
      20, // 3 stars
   ];
   achievementData['heroicheist']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['heroicheist']['expected town hall'] = [
      7, // 1 star
      8, // 2 stars
      9, // 3 stars
   ];

   achievementData['list'].push('League All-Star');
   achievementData['leagueallstar'] = [];
   achievementData['leagueallstar']['description'] = [
      'Join the Crystal League', // 1 star
      'Reach the Master League', // 2 stars
      'Become a Champion!',      // 3 stars
   ];
   achievementData['leagueallstar']['experience'] = [
      100,  // 1 star
      500,  // 2 stars
      2000, // 3 stars
   ];
   achievementData['leagueallstar']['gems'] = [
      250,  // 1 star
      1000, // 2 stars
      2000, // 3 stars
   ];
   achievementData['leagueallstar']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['leagueallstar']['expected town hall'] = [
      8, // 1 star
      9, // 2 stars
      10, // 3 stars
   ];

   achievementData['list'].push('X-Bow Exterminator');
   achievementData['xbowexterminator'] = [];
   achievementData['xbowexterminator']['description'] = [
      'Destroy 1 X-Bow in a Multiplayer battle',      // 1 star
      'Destroy 250 X-Bows in a Multiplayer battle',   // 2 stars
      'Destroy 2,500 X-Bows in a Multiplayer battle', // 3 stars
   ];
   achievementData['xbowexterminator']['experience'] = [
      50,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['xbowexterminator']['gems'] = [
      50,  // 1 star
      100, // 2 stars
      200, // 3 stars
   ];
   achievementData['xbowexterminator']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['xbowexterminator']['expected town hall'] = [
      7,  // 1 star
      9,  // 2 stars
      10, // 3 stars
   ];

   achievementData['list'].push('Firefighter');
   achievementData['firefighter'] = [];
   achievementData['firefighter']['description'] = [
      'Destroy 10 Inferno Towers in a Multiplayer battle',    // 1 star
      'Destroy 250 Inferno Towers in a Multiplayer battle',   // 2 stars
      'Destroy 5,000 Inferno Towers in a Multiplayer battle', // 3 stars
   ];
   achievementData['firefighter']['experience'] = [
      50,   // 1 star
      500,  // 2 stars
      5000, // 3 stars
   ];
   achievementData['firefighter']['gems'] = [
      100,  // 1 star
      200,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['firefighter']['mininum town hall'] = [
      1, // 1 star
      1, // 2 stars
      1, // 3 stars
   ];
   achievementData['firefighter']['expected town hall'] = [
      8,  // 1 star
      10, // 2 stars
      10, // 3 stars
   ];

   achievementData['list'].push('War Hero');
   achievementData['warhero'] = [];
   achievementData['warhero']['description'] = [
      'Score 10 stars for your clan in War Battles',    // 1 star
      'Score 150 stars for your clan in War Battles',   // 2 stars
      'Score 1,000 stars for your clan in War Battles', // 3 stars
   ];
   achievementData['warhero']['experience'] = [
      50,   // 1 star
      500,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['warhero']['gems'] = [
      50,   // 1 star
      200,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['warhero']['mininum town hall'] = [
      buildingInfo('clan castle', 'required town hall', 1), // 1 star
      buildingInfo('clan castle', 'required town hall', 1), // 2 stars
      buildingInfo('clan castle', 'required town hall', 1), // 3 stars
   ];
   achievementData['warhero']['expected town hall'] = [
      6,  // 1 star
      8,  // 2 stars
      10, // 3 stars
   ];

   achievementData['list'].push('Spoils of War');
   achievementData['spoilsofwar'] = [];
   achievementData['spoilsofwar']['description'] = [
      'Collect 800,000 Gold in Clan War bonuses',     // 1 star
      'Collect 15,000,000 Gold in Clan War bonuses',  // 2 stars
      'Collect 100,000,000 Gold in Clan War bonuses', // 3 stars
   ];
   achievementData['spoilsofwar']['experience'] = [
      100,  // 1 star
      500,  // 2 stars
      5000, // 3 stars
   ];
   achievementData['spoilsofwar']['gems'] = [
      25,   // 1 star
      100,  // 2 stars
      1000, // 3 stars
   ];
   achievementData['spoilsofwar']['mininum town hall'] = [
      buildingInfo('clan castle', 'required town hall', 1), // 1 star
      buildingInfo('clan castle', 'required town hall', 1), // 2 stars
      buildingInfo('clan castle', 'required town hall', 1), // 3 stars
   ];
   achievementData['spoilsofwar']['expected town hall'] = [
      7,  // 1 star
      9,  // 2 stars
      10, // 3 stars
   ];
}