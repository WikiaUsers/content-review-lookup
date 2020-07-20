var buildingData;

function buildingInfo(strBuilding, strInfo, intLevel) {
   if (!(Array.isArray(buildingData)))
      populateBuildingData();
 
   var sBuilding = strBuilding.toLowerCase();
   var sInfo     = (arguments.length > 1 ? strInfo.toLowerCase() : '');
 
   if (sBuilding == 'list')
      return buildingData['list'];
 
   if (sInfo == 'levels')
      return buildingData[sBuilding]['hitpoints'].length;
 
   if (arguments.length > 2 && Array.isArray(buildingData[sBuilding][sInfo]))
      return buildingData[sBuilding][sInfo][intLevel - 1];
   else
      return buildingData[sBuilding][sInfo];
}

// Should only be called by buildingInfo().
function populateBuildingData() {
   buildingData         = [];
   buildingData['list'] = []; 
   buildingData['list'].push('Cannon');
   buildingData['cannon'] = [];
   buildingData['cannon']['type']               = "Defense";
   buildingData['cannon']['preferred target']	= "None";
   buildingData['cannon']['multiplier']       	= 1;
   buildingData['cannon']['ground attack']   	= true;
   buildingData['cannon']['air attack']      	= false;
   buildingData['cannon']['splash radius']   	= -1;
   buildingData['cannon']['size']    		= 3;
   buildingData['cannon']['attack speed']    	= 0.8;
   buildingData['cannon']['range']           	= 9;
   buildingData['cannon']['description'] =
      'Cannons are great for point defense. Upgrade cannons to increase their firepower, but beware that your defensive turrets cannot shoot while being upgraded!';
   buildingData['cannon']['dps'] =
      [9,     11,     15,     19,      25,      31,      40,      48,      56,      65,      75,       86];
   buildingData['cannon']['hitpoints'] =
      [400,   450,    500,    550,     590,     610,     630,     660,     690,     750,     900,      1080];
   buildingData['cannon']['cost'] =
      [250,   1000,   4000,   16000,   50000,   100000,  200000,  400000,  800000,  1600000, 3200000,  6400000];
   buildingData['cannon']['building time'] =
      [0.01,  0.04,   0.45,   2,       6,    	12,	 	 24,	  48,	   72,	   96,		 120,	   144];   
   buildingData['cannon']['town hall level required'] =
      [1,     1,      2,      3,       4,       5,		 6,	 	  7,	   8,	    8,		 9,		   10];
   buildingData['cannon']['number available'] =
      [2,     2,      2,      2,       3,       3,	 	 5,	  	  5,	   5,	    6];
   buildingData['list'].push('Archer Tower');
   buildingData['archer tower'] = [];
   buildingData['archer tower']['type']                 = "Defense";
   buildingData['archer tower']['preferred target']	= "None";
   buildingData['archer tower']['multiplier']       	= 1;
   buildingData['archer tower']['ground attack']   	= true;
   buildingData['archer tower']['air attack']      	= true;
   buildingData['archer tower']['splash radius']   	= -1;
   buildingData['archer tower']['size']    		= 3;
   buildingData['archer tower']['attack speed']    	= 1;
   buildingData['archer tower']['range']           	= 10;
   buildingData['archer tower']['description'] =
      'Archer Towers have longer range than cannons, and unlike cannons they can attack flying enemies.';
   buildingData['archer tower']['dps'] =
      [11,     15,     19,     25,      30,      35,      42,      48,		56,      65,      75,      86];
   buildingData['archer tower']['hitpoints'] =
      [400,   450,    500,    550,     590,     610,     630,     660,     690,     720,     750,      790];
   buildingData['archer tower']['cost'] =
      [1000,   2000,   5000,   20000,   80000,   180000,  360000,  720000,  1500000,  2500000, 5000000,  7500000];
   buildingData['archer tower']['building time'] =
      [0.15,  0.30,   0.45,   4,       12,    	24,	 	 48,	   72,	   96,		 120,	   144,	   168];   
   buildingData['archer tower']['town hall level required'] =
      [2,     2,      3,      4,       5,       5,		 6,	 	  7,	   8,	    8,		 9,		   10];
   buildingData['archer tower']['number available'] =
      [0,     1,      1,      2,       3,       3,	 	 4,	  	  5,	   6,	    7];
   buildingData['list'].push('Mortar');
   buildingData['mortar'] = [];
   buildingData['mortar']['type']               = "Defense";
   buildingData['mortar']['preferred target']	= "None";
   buildingData['mortar']['multiplier']       	= 1;
   buildingData['mortar']['ground attack']   	= true;
   buildingData['mortar']['air attack']      	= false;
   buildingData['mortar']['splash radius']   	= 1.5;
   buildingData['mortar']['size']    		= 3;
   buildingData['mortar']['attack speed']    	= 5;
   buildingData['mortar']['range']           	= 11;
   buildingData['mortar']['description'] =
      'The Mortar can mow down hordes of enemies by the splash damage from its shell. Don't let enemies get too close to it!';
   buildingData['mortar']['dps'] =
      [4,     5,     6,     7,      8,      9,      11,      13];
   buildingData['mortar']['hitpoints'] =
      [400,   450,    500,    550,     590,     610,     640,     670];
   buildingData['mortar']['cost'] =
      [8000,   32000,   120000,   400000,   800000,   1600000,  3200000,  6400000];
   buildingData['mortar']['building time'] =
      [8,  		12,  	 24,   		48,       120,    	168,	 	 240];   
   buildingData['mortar']['town hall level required'] =
      [3,     4,      5,      6,       7,       8,		 9,	 	  10];
   buildingData['mortar']['number available'] =
      [0,     0,      1,      1,       1,       2,	 	 3,	  	  3,	   3,	    3];
   buildingData['list'].push('Air Defense');
   buildingData['air defense'] = [];
   buildingData['air defense']['type']                  = "Defense";
   buildingData['air defense']['preferred target']	= "None";
   buildingData['air defense']['multiplier']       	= 1;
   buildingData['air defense']['ground attack']   	= true;
   buildingData['air defense']['air attack']      	= false;
   buildingData['air defense']['splash radius']   	= -1;
   buildingData['air defense']['size']    		= 3;
   buildingData['air defense']['attack speed']    	= 0.8;
   buildingData['air defense']['range']           	= 9;
   buildingData['air defense']['description'] =
      'air defenses are great for point defense. Upgrade air defenses to increase their firepower, but beware that your defensive turrets cannot shoot while being upgraded!';
   buildingData['air defense']['dps'] =
      [9,     11,     15,     19,      25,      31,      40,      48,      56,      65,      75,       86];
   buildingData['air defense']['hitpoints'] =
      [400,   450,    500,    550,     590,     610,     630,     660,     690,     750,     900,      1080];
   buildingData['air defense']['cost'] =
      [250,   1000,   4000,   16000,   50000,   100000,  200000,  400000,  800000,  1600000, 3200000,  6400000];
   buildingData['air defense']['building time'] =
      [0.01,  0.04,   0.45,   2,       6,    	12,	 	 24,	  48,	   72,	   96,		 120,	   144];   
   buildingData['air defense']['town hall level required'] =
      [1,     1,      2,      3,       4,       5,		 6,	 	  7,	   8,	    8,		 9,		   10];
   buildingData['air defense']['number available'] =
      [2,     2,      2,      2,       3,       3,	 	 5,	  	  5,	   5,	    6];
   buildingData['list'].push('Wizard Tower');
   buildingData['wizard tower'] = [];
   buildingData['wizard tower']['type']                 = "Defense";
   buildingData['wizard tower']['preferred target']	= "None";
   buildingData['wizard tower']['multiplier']       	= 1;
   buildingData['wizard tower']['ground attack']   	= true;
   buildingData['wizard tower']['air attack']      	= false;
   buildingData['wizard tower']['splash radius']   	= -1;
   buildingData['wizard tower']['size']    		= 3;
   buildingData['wizard tower']['attack speed']    	= 0.8;
   buildingData['wizard tower']['range']           	= 9;
   buildingData['wizard tower']['description'] =
      'wizard towers are great for point defense. Upgrade wizard towers to increase their firepower, but beware that your defensive turrets cannot shoot while being upgraded!';
   buildingData['wizard tower']['dps'] =
      [9,     11,     15,     19,      25,      31,      40,      48,      56,      65,      75,       86];
   buildingData['wizard tower']['hitpoints'] =
      [400,   450,    500,    550,     590,     610,     630,     660,     690,     750,     900,      1080];
   buildingData['wizard tower']['cost'] =
      [250,   1000,   4000,   16000,   50000,   100000,  200000,  400000,  800000,  1600000, 3200000,  6400000];
   buildingData['wizard tower']['building time'] =
      [0.01,  0.04,   0.45,   2,       6,    	12,	 	 24,	  48,	   72,	   96,		 120,	   144];   
   buildingData['wizard tower']['town hall level required'] =
      [1,     1,      2,      3,       4,       5,		 6,	 	  7,	   8,	    8,		 9,		   10];
   buildingData['wizard tower']['number available'] =
      [2,     2,      2,      2,       3,       3,	 	 5,	  	  5,	   5,	    6];
   buildingData['list'].push('Hidden Tesla');
   buildingData['hidden tesla'] = [];
   buildingData['hidden tesla']['type']                 = "Defense";
   buildingData['hidden tesla']['preferred target']	= "None";
   buildingData['hidden tesla']['multiplier']       	= 1;
   buildingData['hidden tesla']['ground attack']   	= true;
   buildingData['hidden tesla']['air attack']      	= false;
   buildingData['hidden tesla']['splash radius']   	= -1;
   buildingData['hidden tesla']['size']    		= 3;
   buildingData['hidden tesla']['attack speed']    	= 0.8;
   buildingData['hidden tesla']['range']           	= 9;
   buildingData['hidden tesla']['description'] =
      'hidden teslas are great for point defense. Upgrade hidden teslas to increase their firepower, but beware that your defensive turrets cannot shoot while being upgraded!';
   buildingData['hidden tesla']['dps'] =
      [9,     11,     15,     19,      25,      31,      40,      48,      56,      65,      75,       86];
   buildingData['hidden tesla']['hitpoints'] =
      [400,   450,    500,    550,     590,     610,     630,     660,     690,     750,     900,      1080];
   buildingData['hidden tesla']['cost'] =
      [250,   1000,   4000,   16000,   50000,   100000,  200000,  400000,  800000,  1600000, 3200000,  6400000];
   buildingData['hidden tesla']['building time'] =
      [0.01,  0.04,   0.45,   2,       6,    	12,	 	 24,	  48,	   72,	   96,		 120,	   144];   
   buildingData['hidden tesla']['town hall level required'] =
      [1,     1,      2,      3,       4,       5,		 6,	 	  7,	   8,	    8,		 9,		   10];
   buildingData['hidden tesla']['number available'] =
      [2,     2,      2,      2,       3,       3,	 	 5,	  	  5,	   5,	    6];
   buildingData['list'].push('X-Bow');
   buildingData['x-bow'] = [];
   buildingData['x-bow']['type']                = "Defense";
   buildingData['x-bow']['preferred target']	= "None";
   buildingData['x-bow']['multiplier']       	= 1;
   buildingData['x-bow']['ground attack']   	= true;
   buildingData['x-bow']['air attack']      	= false;
   buildingData['x-bow']['splash radius']   	= -1;
   buildingData['x-bow']['size']    		= 3;
   buildingData['x-bow']['attack speed']    	= 0.8;
   buildingData['x-bow']['range']           	= 9;
   buildingData['x-bow']['description'] =
      'x-bows are great for point defense. Upgrade x-bows to increase their firepower, but beware that your defensive turrets cannot shoot while being upgraded!';
   buildingData['x-bow']['dps'] =
      [9,     11,     15,     19,      25,      31,      40,      48,      56,      65,      75,       86];
   buildingData['x-bow']['hitpoints'] =
      [400,   450,    500,    550,     590,     610,     630,     660,     690,     750,     900,      1080];
   buildingData['x-bow']['cost'] =
      [250,   1000,   4000,   16000,   50000,   100000,  200000,  400000,  800000,  1600000, 3200000,  6400000];
   buildingData['x-bow']['building time'] =
      [0.01,  0.04,   0.45,   2,       6,    	12,	 	 24,	  48,	   72,	   96,		 120,	   144];   
   buildingData['x-bow']['town hall level required'] =
      [1,     1,      2,      3,       4,       5,		 6,	 	  7,	   8,	    8,		 9,		   10];
   buildingData['x-bow']['number available'] =
      [2,     2,      2,      2,       3,       3,	 	 5,	  	  5,	   5,	    6];
   buildingData['list'].push('Inferno Tower');
   buildingData['inferno tower'] = [];
   buildingData['inferno tower']['type']                = "Defense";
   buildingData['inferno tower']['preferred target']	= "None";
   buildingData['inferno tower']['multiplier']       	= 1;
   buildingData['inferno tower']['ground attack']   	= true;
   buildingData['inferno tower']['air attack']      	= false;
   buildingData['inferno tower']['splash radius']   	= -1;
   buildingData['inferno tower']['size']    		= 3;
   buildingData['inferno tower']['attack speed']    	= 0.8;
   buildingData['inferno tower']['range']           	= 9;
   buildingData['inferno tower']['description'] =
      'inferno towers are great for point defense. Upgrade inferno towers to increase their firepower, but beware that your defensive turrets cannot shoot while being upgraded!';
   buildingData['inferno tower']['dps'] =
      [9,     11,     15,     19,      25,      31,      40,      48,      56,      65,      75,       86];
   buildingData['inferno tower']['hitpoints'] =
      [400,   450,    500,    550,     590,     610,     630,     660,     690,     750,     900,      1080];
   buildingData['inferno tower']['cost'] =
      [250,   1000,   4000,   16000,   50000,   100000,  200000,  400000,  800000,  1600000, 3200000,  6400000];
   buildingData['inferno tower']['building time'] =
      [0.01,  0.04,   0.45,   2,       6,    	12,	 	 24,	  48,	   72,	   96,		 120,	   144];   
   buildingData['inferno tower']['town hall level required'] =
      [1,     1,      2,      3,       4,       5,		 6,	 	  7,	   8,	    8,		 9,		   10];
   buildingData['inferno tower']['number available'] =
      [2,     2,      2,      2,       3,       3,	 	 5,	  	  5,	   5,	    6];