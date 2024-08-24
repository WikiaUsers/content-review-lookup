function timeStamp_UnitComparator_js() {
   return "2014.08.18 01:07 (UTC-7)";
}

function loadComparator() {
   createTroopComparator();
   createHeroComparator();
   createBuildingComparator();
   createHTKComparator();

   // Allow the main tabs to change the documentation tabs
   var changeTab = function(tab) {
      $('#unit-comparator-documentation .tabberlive')[0].tabber.tabShow(tab);
   };

   $('#unit-comparator .tabberlive li').each(function(index) {
      $(this).get(0).addEventListener('click', function() { changeTab(index); }, false);
   });
}

addOnloadHook(loadComparator);

function imgResourceElem(resourceType) {
   var src;

   switch (resourceType) {
      case 'elixir':
         src = 'https://images.wikia.nocookie.net/__cb20121017030342/clashofclans/images/thumb/4/43/Elixir.png/18px-Elixir.png';
         break;
      case 'dark elixir':
         src = 'https://images.wikia.nocookie.net/__cb20130111202133/clashofclans/images/thumb/3/3b/Dark_elixir.png/18px-Dark_elixir.png';
         break;
      case 'gems':
         src = 'https://images.wikia.nocookie.net/__cb20121017031707/clashofclans/images/thumb/a/aa/Gem.png/17px-Gem.png';
         break;
      default:
         src = 'https://images.wikia.nocookie.net/__cb20121017030644/clashofclans/images/thumb/1/10/Gold.png/20px-Gold.png';
   }

   var img = document.createElement('img');
   img.src = src;
   return img;
}

function createTroopComparator() {
   var div = document.getElementById('troop-comparator-table');

   if (div === null)
      return;

   // Create settings container element
   var tbl = document.createElement('div');
   tbl.id = 'troop-comparator-settings';
   div.appendChild(tbl);

   // Create axis 1 text element
   var txt1 = document.createElement('text');
   txt1.innerHTML = 'Rows:';
   tbl.appendChild(txt1);
   $(txt1).css({'float': 'left'});

   // Create main axis 1 selector
   var elem1 = document.createElement('select');
   elem1.id = 'troop-select-1';
   elem1.setAttribute('onChange', 'updateTroopComparator();');

   var opts = [
      'Individual Troop',
      'Troop Level',
      'Troops by TH Level',
      'Regular Troops',
      'Dark Troops',
      'Trainable Troops',
      'Air Troops',
      'Ground Troops',
      'Anti-Air Troops',
      'Anti-Ground Troops',
      'All Troops',
   ];

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem1.add(opt, null);
   }

   tbl.appendChild(elem1);
   $(elem1).css({'float': 'left'});

   // Create main axis 2 selector (numerator)
   var elem2N = document.createElement('select');
   elem2N.id = 'troop-select-2-num';
   elem2N.setAttribute('onChange', 'updateTroopComparator();');

   var opts = [
      'HP',
      'DPS',
      'DPA',
      'Training Cost',
      'Training Time',
      'Research Cost',
      'Research Time',
      'Housing Space',
   ];

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem2N.add(opt, null);
   }

   // Create main axis 2 selector (denominator)
   var elem2D = document.createElement('select');
   elem2D.id = 'troop-select-2-denom';
   elem2D.setAttribute('onChange', 'updateTroopComparator();');

   opts.unshift('<none>');

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem2D.add(opt, null);
   }

   tbl.appendChild(elem2D);
   $(elem2D).css({'float': 'right'});

   // Create axis 2 secondary text element
   var txt2B = document.createElement('text');
   txt2B.innerHTML = '&nbsp;&nbsp;Divided by:';
   tbl.appendChild(txt2B);
   $(txt2B).css({'float': 'right'});

   tbl.appendChild(elem2N);
   $(elem2N).css({'float': 'right'});

   // Create axis 2 primary text element
   var txt2A = document.createElement('text');
   txt2A.innerHTML = 'Column:';
   tbl.appendChild(txt2A);
   $(txt2A).css({'float': 'right'});

   // Secondary elements -- individual troops
   var elem1T = document.createElement('select');
   elem1T.id = 'troop-select-1-trooplist';
   elem1T.className = 'troop-select-1-secondary';
   elem1T.setAttribute('onChange', 'updateTroopComparator();');

   var opts = troopInfo('list');

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem1T.add(opt, null);
   }

   tbl.appendChild(elem1T);
   $(elem1T).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- troop levels
   var elem1L = document.createElement('select');
   elem1L.id = 'troop-select-1-trooplevel';
   elem1L.className = 'troop-select-1-secondary';
   elem1L.setAttribute('onChange', 'updateTroopComparator();');

   var tList = troopInfo('list');
   var max = 0;

   for (var i = 0; i < tList.length; i ++) {
      var tmp = troopInfo(tList[i], 'levels');

      if (tmp > max)
         max = tmp;
   }

   for (var i = 0; i < max; i ++) {
      var opt = document.createElement('option');
      opt.text = (i + 1);
      elem1L.add(opt, null);
   }

   tbl.appendChild(elem1L);
   $(elem1L).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- Town Hall level
   var elem1Th = document.createElement('select');
   elem1Th.id = 'troop-select-1-townhalllevel';
   elem1Th.className = 'troop-select-1-secondary';
   elem1Th.setAttribute('onChange', 'updateTroopComparator();');

   var tList = troopInfo('list');
   var max = 0;

   for (var i = 0; i < tList.length; i ++) {
      var tmp = buildingInfo('laboratory', 'required town hall', 
         troopInfo(tList[i], 'laboratory level', [troopInfo(tList[i], 'levels')]));

      if (tmp > max)
         max = tmp;
   }

   for (var i = 0; i < max; i ++) {
      var opt = document.createElement('option');
      opt.text = (i + 1);
      elem1Th.add(opt, null);
   }

   tbl.appendChild(elem1Th);
   $(elem1Th).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- troop levels in columns or rows
   var elem1RC = document.createElement('select');
   elem1RC.id = 'troop-select-1-levelsrowcolumn';
   elem1RC.className = 'troop-select-1-secondary';
   elem1RC.setAttribute('onChange', 'updateTroopComparator();');

   var opt = document.createElement('option');
   opt.text = 'Levels in Rows';
   elem1RC.add(opt, null);
   var opt = document.createElement('option');
   opt.text = 'Levels in Columns';
   elem1RC.add(opt, null);

   tbl.appendChild(elem1RC);
   $(elem1RC).css({'float': 'left', 'display': 'none'});

   // Create results table
   var tbl = document.createElement('div');
   tbl.id = 'troop-comparator-results';
   $(tbl).css({'clear': 'both'});
   div.appendChild(tbl);

   var results = document.getElementById('troop-comparator-results-table');
   results.className = 'wikitable sortable';
   $(results).css({'text-align': 'center', 'white-space': 'nowrap'});

   var br = document.createElement('br');
   tbl.appendChild(br);
   tbl.appendChild(results);
   updateTroopComparator();
}

function createHeroComparator() {
   var div = document.getElementById('hero-comparator-table');

   if (div === null)
      return;

   // Create settings container element
   var tbl = document.createElement('div');
   tbl.id = 'hero-comparator-settings';
   div.appendChild(tbl);

   // Create axis 1 text element
   var txt1 = document.createElement('text');
   txt1.innerHTML = 'Rows:';
   tbl.appendChild(txt1);
   $(txt1).css({'float': 'left'});

   // Create main axis 1 selector
   var elem1 = document.createElement('select');
   elem1.id = 'hero-select-1';
   elem1.setAttribute('onChange', 'updateHeroComparator();');

   var opts = [
      'Individual Hero',
      'Hero Level',
      'Heroes by TH Level',
      'All Heroes',
   ];

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem1.add(opt, null);
   }

   tbl.appendChild(elem1);
   $(elem1).css({'float': 'left'});

   // Create main axis 2 selector (numerator)
   var elem2N = document.createElement('select');
   elem2N.id = 'hero-select-2-num';
   elem2N.setAttribute('onChange', 'updateHeroComparator();');

   var opts = [
      'HP',
      'DPS',
      'DPA',
      'Regen Time',
      'Upgrade Cost',
      'Upgrade Time',
   ];

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem2N.add(opt, null);
   }

   // Create main axis 2 selector (denominator)
   var elem2D = document.createElement('select');
   elem2D.id = 'hero-select-2-denom';
   elem2D.setAttribute('onChange', 'updateHeroComparator();');

   opts.unshift('<none>');

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem2D.add(opt, null);
   }

   tbl.appendChild(elem2D);
   $(elem2D).css({'float': 'right'});

   // Create axis 2 secondary text element
   var txt2B = document.createElement('text');
   txt2B.innerHTML = '&nbsp;&nbsp;Divided by:';
   tbl.appendChild(txt2B);
   $(txt2B).css({'float': 'right'});

   tbl.appendChild(elem2N);
   $(elem2N).css({'float': 'right'});

   // Create axis 2 primary text element
   var txt2A = document.createElement('text');
   txt2A.innerHTML = 'Column:';
   tbl.appendChild(txt2A);
   $(txt2A).css({'float': 'right'});

   // Secondary elements -- individual heroes
   var elem1T = document.createElement('select');
   elem1T.id = 'hero-select-1-herolist';
   elem1T.className = 'hero-select-1-secondary';
   elem1T.setAttribute('onChange', 'updateHeroComparator();');

   var opts = heroInfo('list');

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem1T.add(opt, null);
   }

   tbl.appendChild(elem1T);
   $(elem1T).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- hero levels
   var elem1L = document.createElement('select');
   elem1L.id = 'hero-select-1-herolevel';
   elem1L.className = 'hero-select-1-secondary';
   elem1L.setAttribute('onChange', 'updateHeroComparator();');

   var hList = heroInfo('list');
   var max = 0;

   for (var i = 0; i < hList.length; i ++) {
      var tmp = heroInfo(hList[i], 'levels');

      if (tmp > max)
         max = tmp;
   }

   for (var i = 0; i < max; i ++) {
      var opt = document.createElement('option');
      opt.text = (i + 1);
      elem1L.add(opt, null);
   }

   tbl.appendChild(elem1L);
   $(elem1L).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- Town Hall level
   var elem1Th = document.createElement('select');
   elem1Th.id = 'hero-select-1-townhalllevel';
   elem1Th.className = 'hero-select-1-secondary';
   elem1Th.setAttribute('onChange', 'updateHeroComparator();');

   var hList    = heroInfo('list');
   var thLevels = buildingInfo('town hall', 'levels');
   var min      = thLevels + 1;

   for (var i = 0; i < hList.length; i ++) {
      var tmp = heroInfo(hList[i], 'required town hall', 1);

      if (typeof tmp !== 'undefined' && tmp < min)
         min = tmp;
   }

   for (var i = min; i <= thLevels; i ++) {
      var opt = document.createElement('option');
      opt.text = i;
      elem1Th.add(opt, null);
   }

   tbl.appendChild(elem1Th);
   $(elem1Th).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- Heroes in One or Multiple Columns
   var elem1MC = document.createElement('select');
   elem1MC.id = 'hero-select-1-heromulticolumn';
   elem1MC.className = 'hero-select-1-secondary';
   elem1MC.setAttribute('onChange', 'updateHeroComparator();');

   var opt = document.createElement('option');
   opt.text = 'Single Column';
   elem1MC.add(opt, null);
   var opt = document.createElement('option');
   opt.text = 'Multi Column';
   elem1MC.add(opt, null);

   tbl.appendChild(elem1MC);
   $(elem1MC).css({'float': 'left', 'display': 'none'});

   // Create results table
   var tbl = document.createElement('div');
   tbl.id = 'hero-comparator-results';
   $(tbl).css({'clear': 'both'});
   div.appendChild(tbl);

   var results = document.getElementById('hero-comparator-results-table');
   results.className = 'wikitable sortable';
   $(results).css({'text-align': 'center', 'white-space': 'nowrap'});

   var br = document.createElement('br');
   tbl.appendChild(br);
   tbl.appendChild(results);
   updateHeroComparator();
}

function createBuildingComparator() {
   var div = document.getElementById('building-comparator-table');

   if (div === null)
      return;

   // Create settings container element
   var tbl = document.createElement('div');
   tbl.id = 'building-comparator-settings';
   div.appendChild(tbl);

   // Create axis 1 text element
   var txt1 = document.createElement('text');
   txt1.innerHTML = 'Rows:';
   tbl.appendChild(txt1);
   $(txt1).css({'float': 'left'});

   // Create main axis 1 selector
   var elem1 = document.createElement('select');
   elem1.id = 'building-select-1';
   elem1.setAttribute('onChange', 'updateBuildingComparator();');

   var opts = [
      'Individual Building',
      'Building Level',
      'Buildings by TH Level',
      'Defensive Buildings',
      'Army Buildings',
      'Resource Buildings',
      'Other Buildings',
      'All Buildings',
      'Walls',
      'Traps',
      'Ground Defenses',
      'Air Defenses',
   ];

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem1.add(opt, null);
   }

   tbl.appendChild(elem1);
   $(elem1).css({'float': 'left'});

   // Create main axis 2 selector (numerator)
   var elem2N = document.createElement('select');
   elem2N.id = 'building-select-2-num';
   elem2N.setAttribute('onChange', 'updateBuildingComparator();');

   var opts = [
      'HP',
      'DPS',
      'DPA',
      'Build Cost',
      'Build Time',
      '# of Rounds',
      'Re-arm Cost',
      'Capacity',
      'Production',
      'Housing Space',
      'Queue Length',
   ];

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem2N.add(opt, null);
   }

   // Create main axis 2 selector (denominator)
   var elem2D = document.createElement('select');
   elem2D.id = 'building-select-2-denom';
   elem2D.setAttribute('onChange', 'updateBuildingComparator();');

   opts.unshift('<none>');

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem2D.add(opt, null);
   }

   tbl.appendChild(elem2D);
   $(elem2D).css({'float': 'right'});

   // Create axis 2 secondary text element
   var txt2B = document.createElement('text');
   txt2B.innerHTML = '&nbsp;&nbsp;Divided by:';
   tbl.appendChild(txt2B);
   $(txt2B).css({'float': 'right'});

   tbl.appendChild(elem2N);
   $(elem2N).css({'float': 'right'});

   // Create axis 2 primary text element
   var txt2A = document.createElement('text');
   txt2A.innerHTML = 'Column:';
   tbl.appendChild(txt2A);
   $(txt2A).css({'float': 'right'});

   // Secondary elements -- individual buildings
   var elem1B = document.createElement('select');
   elem1B.id = 'building-select-1-buildinglist';
   elem1B.className = 'building-select-1-secondary';
   elem1B.setAttribute('onChange', 'updateBuildingComparator();');

   var opts = buildingInfo('list');

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem1B.add(opt, null);
   }

   tbl.appendChild(elem1B);
   $(elem1B).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- building levels
   var elem1L = document.createElement('select');
   elem1L.id = 'building-select-1-buildinglevel';
   elem1L.className = 'building-select-1-secondary';
   elem1L.setAttribute('onChange', 'updateBuildingComparator();');

   var bList = buildingInfo('list');
   var max = 0;

   for (var i = 0; i < bList.length; i ++) {
      var tmp = buildingInfo(bList[i], 'levels');

      if (tmp > max)
         max = tmp;
   }

   for (var i = 0; i < max; i ++) {
      var opt = document.createElement('option');
      opt.text = (i + 1);
      elem1L.add(opt, null);
   }

   tbl.appendChild(elem1L);
   $(elem1L).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- Town Hall level
   var elem1Th = document.createElement('select');
   elem1Th.id = 'building-select-1-townhalllevel';
   elem1Th.className = 'building-select-1-secondary';
   elem1Th.setAttribute('onChange', 'updateBuildingComparator();');

   var bList = buildingInfo('list');
   var max = 0;

   for (var i = 0; i < bList.length; i ++) {
      var tmp = buildingInfo(bList[i], 'required town hall', [buildingInfo(bList[i], 'levels')]);

      if (tmp > max)
         max = tmp;
   }

   for (var i = 0; i < max; i ++) {
      var opt = document.createElement('option');
      opt.text = (i + 1);
      elem1Th.add(opt, null);
   }

   tbl.appendChild(elem1Th);
   $(elem1Th).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- building levels in columns or rows
   var elem1RC = document.createElement('select');
   elem1RC.id = 'building-select-1-levelsrowcolumn';
   elem1RC.className = 'building-select-1-secondary';
   elem1RC.setAttribute('onChange', 'updateBuildingComparator();');

   var opt = document.createElement('option');
   opt.text = 'Levels in Rows';
   elem1RC.add(opt, null);
   var opt = document.createElement('option');
   opt.text = 'Levels in Columns';
   elem1RC.add(opt, null);

   tbl.appendChild(elem1RC);
   $(elem1RC).css({'float': 'left', 'display': 'none'});

   // Create results table
   var tbl = document.createElement('div');
   tbl.id = 'building-comparator-results';
   $(tbl).css({'clear': 'both'});
   div.appendChild(tbl);

   var results = document.getElementById('building-comparator-results-table');
   results.className = 'wikitable sortable';
   $(results).css({'text-align': 'center', 'white-space': 'nowrap'});

   var br = document.createElement('br');
   tbl.appendChild(br);
   tbl.appendChild(results);
   updateBuildingComparator();
}

function createHTKComparator() {
   var div = document.getElementById('htk-comparator-table');

   if (div === null)
      return;

   // Create settings container element
   var tbl = document.createElement('div');
   tbl.id = 'htk-comparator-settings';
   div.appendChild(tbl);

   // Create axis 1 text element
   var txt1 = document.createElement('text');
   txt1.innerHTML = 'Rows:';
   tbl.appendChild(txt1);
   $(txt1).css({'float': 'left', 'width': '70px'});

   // Create main axis 1 selector
   var elem1 = document.createElement('select');
   elem1.id = 'htk-select-1';
   elem1.setAttribute('onChange', 'updateHTKComparator();');

   var opts = [
      'Individual Building',
      'Building Level',
      'Buildings by TH Level',
      'Defensive Buildings',
      'Army Buildings',
      'Resource Buildings',
      'Other Buildings',
      'All Buildings',
      'Walls',
      'Ground Defenses',
      'Air Defenses',
   ];

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem1.add(opt, null);
   }

   tbl.appendChild(elem1);
   $(elem1).css({'float': 'left', 'width': '180px'});

   // Secondary elements -- individual buildings
   var elem1B = document.createElement('select');
   elem1B.id = 'htk-select-1-buildinglist';
   elem1B.className = 'htk-select-1-secondary';
   elem1B.setAttribute('onChange', 'updateHTKComparator();');

   var opts = buildingInfo('list');

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem1B.add(opt, null);
   }

   tbl.appendChild(elem1B);
   $(elem1B).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- building levels
   var elem1L = document.createElement('select');
   elem1L.id = 'htk-select-1-buildinglevel';
   elem1L.className = 'htk-select-1-secondary';
   elem1L.setAttribute('onChange', 'updateHTKComparator();');

   var bList = buildingInfo('list');
   var max = 0;

   for (var i = 0; i < bList.length; i ++) {
      var tmp = buildingInfo(bList[i], 'levels');

      if (tmp > max)
         max = tmp;
   }

   for (var i = 0; i < max; i ++) {
      var opt = document.createElement('option');
      opt.text = (i + 1);
      elem1L.add(opt, null);
   }

   tbl.appendChild(elem1L);
   $(elem1L).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- Town Hall level
   var elem1Th = document.createElement('select');
   elem1Th.id = 'htk-select-1-townhalllevel';
   elem1Th.className = 'htk-select-1-secondary';
   elem1Th.setAttribute('onChange', 'updateHTKComparator();');

   var bList = buildingInfo('list');
   var max = 0;

   for (var i = 0; i < bList.length; i ++) {
      var tmp = buildingInfo(bList[i], 'required town hall', [buildingInfo(bList[i], 'levels')]);

      if (tmp > max)
         max = tmp;
   }

   for (var i = 0; i < max; i ++) {
      var opt = document.createElement('option');
      opt.text = (i + 1);
      elem1Th.add(opt, null);
   }

   tbl.appendChild(elem1Th);
   $(elem1Th).css({'float': 'left', 'display': 'none'});

   // Mode selector - offense or defense HTK
   var elemOD = document.createElement('select');
   elemOD.id = 'htk-select-offensedefense';
   elemOD.setAttribute('onChange', 'updateHTKComparator();');

   var opt = document.createElement('option');
   opt.text = 'Offense HTK';
   elemOD.add(opt, null);
   var opt = document.createElement('option');
   opt.text = 'Defense HTK';
   elemOD.add(opt, null);

   tbl.appendChild(elemOD);
   $(elemOD).css({'float': 'right', 'width': '110px'});

   // Create mode text element
   var txtm = document.createElement('text');
   txtm.innerHTML = 'Mode:&nbsp;';
   tbl.appendChild(txtm);
   $(txtm).css({'float': 'right'});

   // Create axis 2 text element
   var txt2 = document.createElement('text');
   txt2.innerHTML = 'Columns:';
   tbl.appendChild(txt2);
   $(txt2).css({'float': 'left', 'width': '70px', 'clear': 'both'});

   // Create main axis 2 selector
   var elem2 = document.createElement('select');
   elem2.id = 'htk-select-2';
   elem2.setAttribute('onChange', 'updateHTKComparator();');

   var opts = [
      'Individual Troop',
      'Troop Level',
      'Troops by TH Level',
      'Regular Troops',
      'Dark Troops',
      'Trainable Troops',
      'All Troops',
      'Heroes',
   ];

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem2.add(opt, null);
   }

   tbl.appendChild(elem2);
   $(elem2).css({'float': 'left', 'width': '180px'});

   // Secondary elements -- individual troops
   var elem2T = document.createElement('select');
   elem2T.id = 'htk-select-2-trooplist';
   elem2T.className = 'htk-select-2-secondary';
   elem2T.setAttribute('onChange', 'updateHTKComparator();');

   // Individual troops
   var opts = troopInfo('list');

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem2T.add(opt, null);
   }

   // Individual heroes
   var opts = heroInfo('list');

   for (var i = 0; i < opts.length; i ++) {
      var opt = document.createElement('option');
      opt.text = opts[i];
      elem2T.add(opt, null);
   }

   tbl.appendChild(elem2T);
   $(elem2T).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- troop levels
   var elem2L = document.createElement('select');
   elem2L.id = 'htk-select-2-trooplevel';
   elem2L.className = 'htk-select-2-secondary';
   elem2L.setAttribute('onChange', 'updateHTKComparator();');

   var tList = troopInfo('list');
   var hList = heroInfo('list');
   var max = 0;

   // Maximum troop level
   for (var i = 0; i < tList.length; i ++) {
      var tmp = troopInfo(tList[i], 'levels');

      if (tmp > max)
         max = tmp;
   }

   // Maximum hero level
   for (var i = 0; i < hList.length; i ++) {
      var tmp = heroInfo(hList[i], 'levels');

      if (tmp > max)
         max = tmp;
   }

   for (var i = 0; i < max; i ++) {
      var opt = document.createElement('option');
      opt.text = (i + 1);
      elem2L.add(opt, null);
   }

   tbl.appendChild(elem2L);
   $(elem2L).css({'float': 'left', 'display': 'none'});

   // Secondary elements -- Town Hall level
   var elem2Th = document.createElement('select');
   elem2Th.id = 'htk-select-2-townhalllevel';
   elem2Th.className = 'htk-select-2-secondary';
   elem2Th.setAttribute('onChange', 'updateHTKComparator();');

   var tList = troopInfo('list');
   var hList = heroInfo('list');
   var max = 0;

   // Troop town hall levels
   for (var i = 0; i < tList.length; i ++) {
      var tmp = buildingInfo('laboratory', 'required town hall', 
         troopInfo(tList[i], 'laboratory level', troopInfo(tList[i], 'levels')));

      if (tmp > max)
         max = tmp;
   }

   // Hero town hall levels
   for (var i = 0; i < hList.length; i ++) {
      var tmp = heroInfo(hList[i], 'required town hall', heroInfo(hList[i], 'levels'));

      if (tmp > max)
         max = tmp;
   }

   for (var i = 0; i < max; i ++) {
      var opt = document.createElement('option');
      opt.text = (i + 1);
      elem2Th.add(opt, null);
   }

   tbl.appendChild(elem2Th);
   $(elem2Th).css({'float': 'left', 'display': 'none'});

   // Mode selector - rage spell level
   var elemRS = document.createElement('select');
   elemRS.id = 'htk-select-ragespell';
   elemRS.className = 'htk-select-ragespell-elem';
   elemRS.setAttribute('onChange', 'updateHTKComparator();');

   var rageLvl = spellInfo('rage', 'levels');

   for (var i = 0; i <= rageLvl; i ++) {
      var opt = document.createElement('option');
      opt.text = (i ? 'Level ' + i : '<none>');
      elemRS.add(opt, null);
   }

   tbl.appendChild(elemRS);
   $(elemRS).css({'float': 'right', 'width': '110px' });

   // Create rage spell text element
   var txtm = document.createElement('text');
   txtm.className = 'htk-select-ragespell-elem';
   txtm.innerHTML = 'Rage Spell Level:&nbsp;';
   tbl.appendChild(txtm);
   $(txtm).css({'float': 'right'});

   // Create results table
   var tbl = document.createElement('div');
   tbl.id = 'htk-comparator-results';
   $(tbl).css({'clear': 'both'});
   div.appendChild(tbl);

   var results = document.getElementById('htk-comparator-results-table');
   results.className = 'wikitable sortable';
   $(results).css({'text-align': 'center', 'white-space': 'nowrap'});

   var br = document.createElement('br');
   tbl.appendChild(br);
   tbl.appendChild(results);
   updateHTKComparator();
}

function updateTroopComparator() {
   $('.troop-select-1-secondary').css({'display': 'none'});
   var results = document.getElementById('troop-comparator-results-table');
   var a1 = document.getElementById('troop-select-1');

   results.innerHTML = '';

   var inColumns = false;
   var troopname = [];
   var trooplvl  = [];
   var colhead   = [];
   var rowhead   = [];
   var overhead  = '';
   var numunit;
   var denomunit;

   colhead.push($('#troop-select-2-num').val());

   if ($('#troop-select-2-denom').val() !== '<none>') {
      colhead.push($('#troop-select-2-denom').val());
      colhead.push($('#troop-select-2-num').val() + '«&nbsp;/&nbsp;' + $('#troop-select-2-denom').val() + '»&nbsp;');
   }

   switch (a1.value) {
      case 'Individual Troop':
         $('#troop-select-1-trooplist').css({'display': 'block'});

         for (var i = 1; i <= troopInfo($('#troop-select-1-trooplist').val(), 'levels'); i ++) {
            troopname.push([$('#troop-select-1-trooplist').val()]);
            trooplvl.push([i]);
            rowhead.push(['<span style="display: none;">' + i.format('0000') + '</span>Level ' + i]);

            if ($('#troop-select-2-denom').val() !== '<none>') {
               troopname[troopname.length - 1].push($('#troop-select-1-trooplist').val());
               troopname[troopname.length - 1].push($('#troop-select-1-trooplist').val());
               trooplvl[trooplvl.length - 1].push(i);
               trooplvl[trooplvl.length - 1].push(i);
            }
         }

         break;
      case 'Troop Level':
         $('#troop-select-1-trooplevel').css({'display': 'block'});

         var tList = troopInfo('list');

         for (var i = 0; i < tList.length; i ++) {
            if (typeof troopInfo(tList[i], 'hitpoints', $('#troop-select-1-trooplevel').val()) !== 'undefined') {
               troopname.push([tList[i]]);
               trooplvl.push([$('#troop-select-1-trooplevel').val()]);
               rowhead.push([tList[i]]);

               if ($('#troop-select-2-denom').val() !== '<none>') {
                  troopname[troopname.length - 1].push(tList[i]);
                  troopname[troopname.length - 1].push(tList[i]);
                  trooplvl[trooplvl.length - 1].push($('#troop-select-1-trooplevel').val());
                  trooplvl[trooplvl.length - 1].push($('#troop-select-1-trooplevel').val());
               }
            }
         }

         break;
      case 'Troops by TH Level':
         $('#troop-select-1-townhalllevel').css({'display': 'block'});

         var tList = troopInfo('list');

         // Required Town Hall level for each troop type/level
         var normal  = troopInfo('list', 'normal trainable');
         var dark    = troopInfo('list', 'dark trainable');
         var lab     = buildingInfo('laboratory', 'required town hall');
         var thLevel = $('#troop-select-1-townhalllevel').val();

         for (var i = 0; i < normal.length; i ++)
            normal[i] = buildingInfo('barracks', 'required town hall', troopInfo(normal[i], 'barracks level'));

         for (var i = 0; i < dark.length; i ++)
            dark[i] = buildingInfo('dark barracks', 'required town hall', troopInfo(dark[i], 'barracks level'));

         for (var i = 0; i < tList.length; i ++) {
            var include = false;
            var lvl     = 0;

            for (j = troopInfo(tList[i], 'levels'); j >= 1; j --) {
               if (typeof troopInfo(tList[i], 'barracks level', j) !== 'undefined') {
                  var barracks    = (troopInfo(tList[i], 'barracks type') === 'Dark' ? dark : normal);
                  var reqBarracks = troopInfo(tList[i], 'barracks level');
                  var reqLab      = troopInfo(tList[i], 'laboratory level', j);

                  if (thLevel >= barracks[reqBarracks - 1] && (!reqLab || thLevel >= lab[reqLab - 1])) {
                     include = true;
                     lvl     = j;
                     break;
                  }
               }
            }

            if (include) {
               troopname.push([tList[i]]);
               trooplvl.push([lvl]);
               rowhead.push([tList[i], '<span style="display: none;">' +
                  lvl.format('0000') + '</span>Level ' + lvl]);

               if ($('#troop-select-2-denom').val() !== '<none>') {
                  troopname[troopname.length - 1].push(tList[i]);
                  troopname[troopname.length - 1].push(tList[i]);
                  trooplvl[trooplvl.length - 1].push(lvl);
                  trooplvl[trooplvl.length - 1].push(lvl);
               }
            }
         }

         break;
      default:
         $('#troop-select-1-levelsrowcolumn').css({'display': 'block'});

         var tList = [];
         var max   = 0;
         inColumns = ($('#troop-select-1-levelsrowcolumn').val() === 'Levels in Columns');

         switch (a1.value) {
            case 'Regular Troops':
               tList = troopInfo('list', 'normal');
               break;
            case 'Dark Troops':
               tList = troopInfo('list', 'dark');
               break;
            case 'Trainable Troops':
               tList = troopInfo('list', 'trainable');
               break;
            case 'Air Troops':
               var tmp = troopInfo('list');
               tList   = [];

               for (var i = 0; i < tmp.length; i ++) {
                  if (troopInfo(tmp[i], 'type') === 'Air')
                     tList.push(tmp[i]);
               }

               break;
            case 'Ground Troops':
               var tmp = troopInfo('list');
               tList   = [];

               for (var i = 0; i < tmp.length; i ++) {
                  if (troopInfo(tmp[i], 'type') === 'Ground')
                     tList.push(tmp[i]);
               }

               break;
            case 'Anti-Air Troops':
               var tmp = troopInfo('list');
               tList   = [];

               for (var i = 0; i < tmp.length; i ++) {
                  if (troopInfo(tmp[i], 'air attack'))
                     tList.push(tmp[i]);
               }

               break;
            case 'Anti-Ground Troops':
               var tmp = troopInfo('list');
               tList   = [];

               for (var i = 0; i < tmp.length; i ++) {
                  if (troopInfo(tmp[i], 'ground attack'))
                     tList.push(tmp[i]);
               }

               break;
            default:
               tList = troopInfo('list');
         }

         for (var i = 0; i < tList.length; i ++) {
            var lvl = troopInfo(tList[i], 'levels');

            if (lvl > max)
               max = lvl;

            if (typeof lvl !== 'undefined') {
               for (var j = 1; j <= lvl; j ++) {
                  if (inColumns) {
                     if (j === 1) {
                        troopname.push([tList[i]]);
                        trooplvl.push([j]);
                        rowhead.push([tList[i]]);
                     }
                     else {
                        troopname[troopname.length - 1].push(tList[i]);
                        trooplvl[trooplvl.length - 1].push(j);
                     }
                  }
                  else {
                     troopname.push([tList[i]]);
                     trooplvl.push([j]);
                     rowhead.push([tList[i], '<span style="display: none;">' +
                        j.format('0000') + '</span>Level ' + j]);

                     if ($('#troop-select-2-denom').val() !== '<none>') {
                        troopname[troopname.length - 1].push(tList[i]);
                        troopname[troopname.length - 1].push(tList[i]);
                        trooplvl[trooplvl.length - 1].push(j);
                        trooplvl[trooplvl.length - 1].push(j);
                     }
                  }
               }
            }
         }

         if (inColumns) {
            overhead = colhead[colhead.length - 1];
            colhead = [];

            for (var i = 1; i <= max; i ++)
               colhead.push('Level ' + i);
         }
   }

   var thead = document.createElement('thead');
   results.appendChild(thead);
   var tr = document.createElement('tr');
   thead.appendChild(tr);

   for (var col = 0; col < rowhead[0].length; col ++) {
      var th = document.createElement('th');
      $(th).css({'border': '0', 'background': '#ddf'});
      tr.appendChild(th);
   }

   var lastcolheader;

   if (inColumns) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.colSpan = '' + colhead.length;
      th.innerHTML = overhead;
      tr.appendChild(th);
      lastcolheader = th;
      tr = document.createElement('tr');
      thead.appendChild(tr);

      for (var col = 0; col < rowhead[0].length; col ++) {
         var th = document.createElement('th');
         $(th).css({'border': '0', 'background': '#ddf'});
         tr.appendChild(th);
      }
   }

   for (var col = 0; col < colhead.length; col ++) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.innerHTML = colhead[col] + '&nbsp;';
      tr.appendChild(th);

      if (!inColumns)
         lastcolheader = th;
   }

   var tbody = document.createElement('tbody');
   results.appendChild(tbody);

   for (var row = 0; row < rowhead.length; row ++) {
      var tr = document.createElement('tr');
      tbody.appendChild(tr);

      for (var col = 0; col < rowhead[row].length; col ++) {
         var th = document.createElement('th');
         th.scope = 'row';
         th.innerHTML = rowhead[row][col];
         $(th).css({'background': cellColor(troopname[row][0], true)});
         tr.appendChild(th);
      }

      var numcols = (inColumns ? colhead.length : 1);

      for (var col = 0; col < numcols; col ++) {
         var num   = 0;
         var denom = 1;
         var numimg;
         var denomimg;

         if (troopname[row].length > col) {
            numunit   = null;
            denomunit = null;

            switch ($('#troop-select-2-num').val()) {
               case 'HP':
                  num = troopInfo(troopname[row][col], 'hitpoints', trooplvl[row][col]);
                  break;
               case 'DPS':
                  num = troopInfo(troopname[row][col], 'dps', trooplvl[row][col]);
                  break;
               case 'DPA':
                  num = troopInfo(troopname[row][col], 'dps', trooplvl[row][col]) *
                     troopInfo(troopname[row][col], 'attack speed');
                  break;
               case 'Training Cost':
                  num = troopInfo(troopname[row][col], 'training cost', trooplvl[row][col]);
                  numimg = imgResourceElem(troopInfo(troopname[row][col], 'barracks type') === 'Dark' ?
                     'dark elixir' : 'elixir');
                  break;
               case 'Training Time':
                  num = troopInfo(troopname[row][col], 'training time');
                  numunit = 'sec';
                  break;
               case 'Research Cost':
                  num = troopInfo(troopname[row][col], 'research cost', trooplvl[row][col]);
                  numimg = imgResourceElem(troopInfo(troopname[row][col], 'barracks type') === 'Dark' ?
                     'dark elixir' : 'elixir');
                  break;
               case 'Research Time':
                  num = troopInfo(troopname[row][col], 'research time', trooplvl[row][col]);
                  numunit = 'hr';
                  break;
               case 'Housing Space':
                  num = troopInfo(troopname[row][col], 'housing space');
            }

            if ($('#troop-select-2-denom').val() !== '<none>') {
               switch ($('#troop-select-2-denom').val()) {
                  case 'HP':
                     denom = troopInfo(troopname[row][col], 'hitpoints', trooplvl[row][col]);
                     break;
                  case 'DPS':
                     denom = troopInfo(troopname[row][col], 'dps', trooplvl[row][col]);
                     break;
                  case 'DPA':
                     denom = troopInfo(troopname[row][col], 'dps', trooplvl[row][col]) *
                        troopInfo(troopname[row][col], 'attack speed');
                     break;
                  case 'Training Cost':
                     denom = troopInfo(troopname[row][col], 'training cost', trooplvl[row][col]);
                     denomimg = imgResourceElem(troopInfo(troopname[row][col], 'barracks type') === 'Dark' ?
                        'dark elixir' : 'elixir');
                     break;
                  case 'Training Time':
                     denom = troopInfo(troopname[row][col], 'training time');
                     denomunit = 'sec';
                     break;
                  case 'Research Cost':
                     denom = troopInfo(troopname[row][col], 'research cost', trooplvl[row][col]);
                     denomimg = imgResourceElem(troopInfo(troopname[row][col], 'barracks type') === 'Dark' ?
                        'dark elixir' : 'elixir');
                     break;
                  case 'Research Time':
                     denom = troopInfo(troopname[row][col], 'research time', trooplvl[row][col]);
                     denomunit = 'hr';
                     break;
                  case 'Housing Space':
                     denom = troopInfo(troopname[row][col], 'housing space');
               }
            }
         }

         if (!inColumns && colhead.length > 1) {
            var td = document.createElement('td');

            if (numunit)
               td.innerHTML = formatTime(num, numunit);
            else
               td.innerHTML = num.format('#,##0[.]###');

            if (num && numimg) td.appendChild(numimg);
            $(td).css({'background': cellColor(troopname[row][0], false)});
            tr.appendChild(td);

            var td = document.createElement('td');

            if (denomunit)
               td.innerHTML = formatTime(denom, denomunit);
            else
               td.innerHTML = denom.format('#,##0[.]###');

            if (denom && denomimg) td.appendChild(denomimg);
            $(td).css({'background': cellColor(troopname[row][0], false)});
            tr.appendChild(td);
         }

         var td = document.createElement('td');

         if (!denom || troopname[row].length <= col)
            td.innerHTML = '-';
         else if (numunit && $('#troop-select-2-denom').val() === '<none>')
            td.innerHTML = formatTime(num, numunit);
         else
            td.innerHTML = (num / denom).format('#,##0[.]###');

         if ((inColumns || colhead.length === 1) && numimg && num && td.innerHTML !== '-')
            td.appendChild(numimg);

         $(td).css({'background': cellColor(troopname[row][0], false)});
         tr.appendChild(td);
      }
   }

   // Add units where necessary
   var replacestr = (numunit ? '&nbsp;(' + numunit + ')' : '');
   lastcolheader.innerHTML = lastcolheader.innerHTML.replace('«', replacestr);

   var replacestr = (denomunit ? '&nbsp;(' + denomunit + ')' : '');
   lastcolheader.innerHTML = lastcolheader.innerHTML.replace('»', replacestr);

   $('#troop-comparator-results-table tr td, #troop-comparator-results-table tr th').css({'padding' : '0px 20px'});
   mw.loader.using('jquery.tablesorter', function() { $(results).tablesorter(); });
   $(window).trigger('resize');

   function cellColor(troopName, isHeader) {
      switch (troopInfo(troopName, 'barracks type')) {
         case 'Dark':
            return (isHeader ? '#7c7c7c' : '#c4c4c4');
         default:
            return (isHeader ? '#e444cc' : '#e5b0dd');
      }
   }

   function formatTime(num, unit) {
      switch (unit) {
         case 'day':
            num *= 24;
         case 'hr':
            num *= 60;
         case 'min':
            num *= 60;
      }

      return '<span style="display: none;">' + num.format('000000000000') + '</span>' +
         formatDurationInSeconds(num);
   }
}

function updateHeroComparator() {
   $('.hero-select-1-secondary').css({'display': 'none'});
   var results = document.getElementById('hero-comparator-results-table');
   var a1 = document.getElementById('hero-select-1');

   results.innerHTML = '';

   var heroname   = [];
   var herolvl    = [];
   var colhead    = [];
   var rowhead    = [];
   var cumnum     = false;
   var numcol     = -1;
   var cumdenom   = false;
   var denomcol   = -1;
   var inColumns  = false;
   var herocol    = [];
   var overhead  = '';
   var numunit;
   var denomunit;

   colhead.push($('#hero-select-2-num').val());

   if ($('#hero-select-2-denom').val() !== '<none>') {
      colhead.push($('#hero-select-2-denom').val());
      colhead.push($('#hero-select-2-num').val() + '«&nbsp;/&nbsp;' + $('#hero-select-2-denom').val() + '»&nbsp;');
   }

   switch (a1.value) {
      case 'Individual Hero':
         $('#hero-select-1-herolist').css({'display': 'block'});

         for (var i = 1; i <= heroInfo($('#hero-select-1-herolist').val(), 'levels'); i ++) {
            heroname.push([$('#hero-select-1-herolist').val()]);
            herolvl.push([i]);
            rowhead.push(['<span style="display: none;">' + i.format('0000') + '</span>Level ' + i]);

            if ($('#hero-select-2-denom').val() !== '<none>') {
               heroname[heroname.length - 1].push($('#hero-select-1-herolist').val());
               heroname[heroname.length - 1].push($('#hero-select-1-herolist').val());
               herolvl[herolvl.length - 1].push(i);
               herolvl[herolvl.length - 1].push(i);
            }
         }

         break;
      case 'Hero Level':
         $('#hero-select-1-herolevel').css({'display': 'block'});

         var hList = heroInfo('list');

         for (var i = 0; i < hList.length; i ++) {
            if (typeof heroInfo(hList[i], 'hitpoints', $('#hero-select-1-herolevel').val()) !== 'undefined') {
               heroname.push([hList[i]]);
               herolvl.push([$('#hero-select-1-herolevel').val()]);
               rowhead.push([hList[i]]);

               if ($('#hero-select-2-denom').val() !== '<none>') {
                  heroname[heroname.length - 1].push(hList[i]);
                  heroname[heroname.length - 1].push(hList[i]);
                  herolvl[herolvl.length - 1].push($('#hero-select-1-herolevel').val());
                  herolvl[herolvl.length - 1].push($('#hero-select-1-herolevel').val());
               }
            }
         }

         break;
      case 'Heroes by TH Level':
         $('#hero-select-1-townhalllevel').css({'display': 'block'});

         var hList   = heroInfo('list');
         var thLevel = $('#hero-select-1-townhalllevel').val();

         for (var i = 0; i < hList.length; i ++) {
            var include = false;
            var lvl     = 0;

            for (j = heroInfo(hList[i], 'levels'); j >= 1; j --) {
               if (typeof heroInfo(hList[i], 'required town hall', j) !== 'undefined') {
                  if (thLevel >= heroInfo(hList[i], 'required town hall', j)) {
                     include = true;
                     lvl     = j;
                     break;
                  }
               }
            }

            if (include) {
               heroname.push([hList[i]]);
               herolvl.push([lvl]);
               rowhead.push([hList[i], '<span style="display: none;">' +
                  lvl.format('0000') + '</span>Level ' + lvl]);

               if ($('#hero-select-2-denom').val() !== '<none>') {
                  heroname[heroname.length - 1].push(hList[i]);
                  heroname[heroname.length - 1].push(hList[i]);
                  herolvl[herolvl.length - 1].push(lvl);
                  herolvl[herolvl.length - 1].push(lvl);
               }
            }
         }

         break;
      default:
         $('#hero-select-1-heromulticolumn').css({'display': 'block'});

         inColumns = ($('#hero-select-1-heromulticolumn').val() === 'Multi Column');
         var hList = heroInfo('list');

         if (inColumns) {
            var lineItemName    = new Array(hList.length);
            var lineItemLvl     = new Array(hList.length);
            var maxlvl          = 0;

            for (var i = 0; i < hList.length; i ++) {
               var lvl = heroInfo(hList[i], 'levels');

               if (lvl > maxlvl)
                  maxlvl = lvl;
            }

            for (j = 1; j <= maxlvl; j ++) {
               for (var i = 0; i < hList.length; i ++) {
                  if (typeof heroInfo(hList[i], 'hitpoints', j) !== 'undefined') {
                     lineItemName[i] = hList[i];
                     lineItemLvl[i]  = j;
                  }
               }

               heroname.push(lineItemName.slice(0));
               herolvl.push(lineItemLvl.slice(0));
               rowhead.push(['<span style="display: none;">' + j.format('0000') + '</span>Level ' + j]);
            }
         }
         else {
            for (var i = 0; i < hList.length; i ++) {
               var lvl = heroInfo(hList[i], 'levels');

               if (typeof lvl !== 'undefined') {
                  for (var j = 1; j <= lvl; j ++) {
                     heroname.push([hList[i]]);
                     herolvl.push([j]);
                     rowhead.push([hList[i], '<span style="display: none;">' +
                        j.format('0000') + '</span>Level ' + j]);

                     if ($('#troop-select-2-denom').val() !== '<none>') {
                        heroname[heroname.length - 1].push(hList[i]);
                        heroname[heroname.length - 1].push(hList[i]);
                        herolvl[herolvl.length - 1].push(j);
                        herolvl[herolvl.length - 1].push(j);
                     }
                  }
               }
            }
         }

         if (inColumns) {
            overhead = colhead[colhead.length - 1];
            colhead  = [];

            for (var i = 0; i < hList.length; i ++)
               colhead.push(hList[i]);
         }
   }

   var thead = document.createElement('thead');
   results.appendChild(thead);
   var tr = document.createElement('tr');
   tr.vAlign = 'bottom';
   thead.appendChild(tr);

   for (var col = 0; col < rowhead[0].length; col ++) {
      var th = document.createElement('th');
      $(th).css({'border': '0', 'background': '#ddf'});
      tr.appendChild(th);
   }

   var lastcolheader;

   if (inColumns) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.colSpan = '' + colhead.length;
      th.innerHTML = overhead;
      tr.appendChild(th);
      lastcolheader = th;
      tr = document.createElement('tr');
      thead.appendChild(tr);

      for (var col = 0; col < rowhead[0].length; col ++) {
         var th = document.createElement('th');
         $(th).css({'border': '0', 'background': '#ddf'});
         tr.appendChild(th);
      }
   }

   for (var col = 0; col < colhead.length; col ++) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.innerHTML = colhead[col] + '&nbsp;';
      tr.appendChild(th);

      if (!inColumns)
         lastcolheader = th;
   }

   var tbody = document.createElement('tbody');
   results.appendChild(tbody);

   for (var row = 0; row < rowhead.length; row ++) {
      var tr = document.createElement('tr');
      tbody.appendChild(tr);

      for (var col = 0; col < rowhead[row].length; col ++) {
         var th = document.createElement('th');
         th.scope = 'row';
         th.innerHTML = rowhead[row][col];
         tr.appendChild(th);
      }

      var num   = 0;
      var denom = 1;
      var numimg;
      var denomimg;

      numunit   = null;
      denomunit = null;

      var col   = 0;

      var numcols = (inColumns ? colhead.length : 1);

      for (var col = 0; col < numcols; col ++) {
         if (heroname[row].length > col) {
            switch ($('#hero-select-2-num').val()) {
               case 'HP':
                  num = heroInfo(heroname[row][col], 'hitpoints', herolvl[row][col]);
                  break;
               case 'DPS':
                  num = heroInfo(heroname[row][col], 'dps', herolvl[row][col]);
                  break;
               case 'DPA':
                  num = heroInfo(heroname[row][col], 'dps', herolvl[row][col]) *
                     heroInfo(heroname[row][col], 'attack speed');
                  break;
               case 'Regen Time':
                  num = heroInfo(heroname[row][col], 'regeneration time', herolvl[row][col]);
                  numunit = 'min';
                  break;
               case 'Upgrade Cost':
                  num = heroInfo(heroname[row][col], 'training cost', herolvl[row][col]);
                  numimg = imgResourceElem('dark elixir');

                  if (a1.value === 'Individual Hero') {
                     if (!cumnum)
                        cumnum = [num];
                     else
                        cumnum.push(cumnum[cumnum.length - 1] + num);
                  }

                  break;
               case 'Upgrade Time':
                  num = heroInfo(heroname[row][col], 'training time', herolvl[row][col]);
                  numunit = 'min';

                  if (a1.value === 'Individual Hero') {
                     if (!cumnum)
                        cumnum = [num];
                     else
                        cumnum.push(cumnum[cumnum.length - 1] + num);
                  }

                  break;
            }

            if ($('#hero-select-2-denom').val() !== '<none>') {
               switch ($('#hero-select-2-denom').val()) {
                  case 'HP':
                     denom = heroInfo(heroname[row][col], 'hitpoints', herolvl[row][col]);
                     break;
                  case 'DPS':
                     denom = heroInfo(heroname[row][col], 'dps', herolvl[row][col]);
                     break;
                  case 'DPA':
                     denom = heroInfo(heroname[row][col], 'dps', herolvl[row][col]) *
                        heroInfo(heroname[row][col], 'attack speed');
                     break;
                  case 'Regen Time':
                     denom = heroInfo(heroname[row][col], 'regeneration time', herolvl[row][col]);
                     denomunit = 'min';
                     break;
                  case 'Upgrade Cost':
                     denom = heroInfo(heroname[row][col], 'training cost', herolvl[row][col]);
                     denomimg = imgResourceElem('dark elixir');

                     if (a1.value === 'Individual Hero') {
                        if (!cumdenom)
                           cumdenom = [denom];
                        else
                           cumdenom.push(cumdenom[cumdenom.length - 1] + denom);
                     }

                     break;
                  case 'Upgrade Time':
                     denom = heroInfo(heroname[row][col], 'training time', herolvl[row][col]);
                     denomunit = 'min';

                     if (a1.value === 'Individual Hero') {
                        if (!cumdenom)
                           cumdenom = [denom];
                        else
                           cumdenom.push(cumdenom[cumdenom.length - 1] + denom);
                     }

                     break;
               }
            }
         }

         if (!inColumns && colhead.length > 1) {
            var td = document.createElement('td');

            if (numunit)
               td.innerHTML = formatTime(num, numunit);
            else
               td.innerHTML = num.format('#,##0[.]###');

            if (num && numimg) td.appendChild(numimg);
            tr.appendChild(td);

            if (cumnum) {
               numcol = tr.childNodes.length - 1;
               var td = document.createElement('td');

               if (numunit)
                  td.innerHTML = formatTime(cumnum[row], numunit);
               else
                  td.innerHTML = cumnum[row].format('#,##0[.]###');

               if (cumnum[row] && numimg) td.appendChild(numimg.cloneNode(true));
               tr.appendChild(td);
            }

            var td = document.createElement('td');

            if (denomunit)
               td.innerHTML = formatTime(denom, denomunit);
            else
               td.innerHTML = denom.format('#,##0[.]###');

            if (denom && denomimg) td.appendChild(denomimg);
            tr.appendChild(td);

            if (cumdenom) {
               denomcol = tr.childNodes.length - (numcol >= 0 ? 2 : 1);
               var td = document.createElement('td');

               if (denomunit)
                  td.innerHTML = formatTime(cumdenom[row], denomunit);
               else
                  td.innerHTML = cumdenom[row].format('#,##0[.]###');

               if (cumdenom[row] && denomimg) td.appendChild(denomimg.cloneNode(true));
               tr.appendChild(td);
            }
         }

         var td = document.createElement('td');

         if (!denom || heroname[row].length <= col)
            td.innerHTML = '-';
         else if (numunit && $('#hero-select-2-denom').val() === '<none>')
            td.innerHTML = formatTime(num, numunit);
         else
            td.innerHTML = (num / denom).format('#,##0[.]###');

         if (numimg && $('#hero-select-2-denom').val() === '<none>' &&
            num && td.innerHTML !== '-') td.appendChild(numimg);
         tr.appendChild(td);

         if (cumnum && $('#hero-select-2-denom').val() === '<none>') {
            numcol = tr.childNodes.length - 1;
            var td = document.createElement('td');

            if (numunit)
               td.innerHTML = formatTime(cumnum[row], numunit);
            else
               td.innerHTML = cumnum[row].format('#,##0[.]###');

            if (cumnum[row] && numimg) td.appendChild(numimg.cloneNode(true));
            tr.appendChild(td);
         }
      }
   }

   // Add units where necessary
   var replacestr = (numunit ? '&nbsp;(' + numunit + ')' : '');
   lastcolheader.innerHTML = lastcolheader.innerHTML.replace('«', replacestr);

   var replacestr = (denomunit ? '&nbsp;(' + denomunit + ')' : '');
   lastcolheader.innerHTML = lastcolheader.innerHTML.replace('»', replacestr);

   // Fix headers
   if (cumdenom) {
      var denomth = thead.getElementsByTagName('th')[denomcol];
      var th = document.createElement('th');
      th.scope = 'col';
      th.innerHTML = 'Cumulative<br/>' + denomth.innerHTML;
      thead.childNodes[0].insertBefore(th, denomth.nextSibling);
   }

   if (cumnum) {
      var numth = thead.getElementsByTagName('th')[numcol];
      var th = document.createElement('th');
      th.scope = 'col';
      th.innerHTML = 'Cumulative<br/>' + numth.innerHTML;
      thead.childNodes[0].insertBefore(th, numth.nextSibling);
   }

   $('#hero-comparator-results-table tr td, #hero-comparator-results-table tr th').css({'padding' : '0px 20px'});
   mw.loader.using('jquery.tablesorter', function() { $(results).tablesorter(); });
   $(window).trigger('resize');

   function formatTime(num, unit) {
      switch (unit) {
         case 'day':
            num *= 24;
         case 'hr':
            num *= 60;
         case 'min':
            num *= 60;
      }

      return '<span style="display: none;">' + num.format('000000000000') + '</span>' +
         formatDurationInSeconds(num);
   }
}

function updateBuildingComparator() {
   $('.building-select-1-secondary').css({'display': 'none'});
   var results = document.getElementById('building-comparator-results-table');
   var a1 = document.getElementById('building-select-1');

   results.innerHTML = '';

   var inColumns    = false;
   var buildingname = [];
   var buildinglvl  = [];
   var bModes       = [];
   var breakout     = [];
   var colhead      = [];
   var rowhead      = [];
   var overhead     = '';
   var numunit;
   var denomunit;

   colhead.push($('#building-select-2-num').val());

   if ($('#building-select-2-denom').val() !== '<none>') {
      colhead.push($('#building-select-2-denom').val());
      colhead.push($('#building-select-2-num').val() + '«&nbsp;/&nbsp;' +
         $('#building-select-2-denom').val() + '»&nbsp;');
   }

   switch (a1.value) {
      case 'Individual Building':
         $('#building-select-1-buildinglist').css({'display': 'block'});

         for (var i = 1; i <= buildingInfo($('#building-select-1-buildinglist').val(), 'levels'); i ++) {
            buildingname.push([$('#building-select-1-buildinglist').val()]);
            buildinglvl.push([i]);
            rowhead.push(['<span style="display: none;">' + i.format('0000') + '</span>Level ' + i]);

            if ($('#building-select-2-denom').val() !== '<none>') {
               buildingname[buildingname.length - 1].push($('#building-select-1-buildinglist').val());
               buildingname[buildingname.length - 1].push($('#building-select-1-buildinglist').val());
               buildinglvl[buildinglvl.length - 1].push(i);
               buildinglvl[buildinglvl.length - 1].push(i);
            }
         }

         break;
      case 'Building Level':
         $('#building-select-1-buildinglevel').css({'display': 'block'});

         var bList = buildingInfo('list');

         for (var i = 0; i < bList.length; i ++) {
            if (typeof buildingInfo(bList[i], 'hitpoints', $('#building-select-1-buildinglevel').val()) !== 'undefined') {
               buildingname.push([bList[i]]);
               buildinglvl.push([$('#building-select-1-buildinglevel').val()]);
               rowhead.push([bList[i]]);

               if ($('#building-select-2-denom').val() !== '<none>') {
                  buildingname[buildingname.length - 1].push(bList[i]);
                  buildingname[buildingname.length - 1].push(bList[i]);
                  buildinglvl[buildinglvl.length - 1].push($('#building-select-1-buildinglevel').val());
                  buildinglvl[buildinglvl.length - 1].push($('#building-select-1-buildinglevel').val());
               }
            }
         }

         break;
      case 'Buildings by TH Level':
         $('#building-select-1-townhalllevel').css({'display': 'block'});

         var bList   = buildingInfo('list');
         var thLevel = Number($('#building-select-1-townhalllevel').val());

         for (var i = 0; i < bList.length; i ++) {
            var include = false;
            var lvl     = 0;

            if (bList[i] === 'Town Hall') {
               include = true;
               lvl     = thLevel;
            }
            else {
               for (j = buildingInfo(bList[i], 'levels'); j >= 1; j --) {
                  if (typeof buildingInfo(bList[i], 'required town hall', j) !== 'undefined' &&
                     thLevel >= buildingInfo(bList[i], 'required town hall', j)) {
                     include = true;
                     lvl     = j;
                     break;
                  }
               }
            }

            if (include) {
               buildingname.push([bList[i]]);
               buildinglvl.push([lvl]);
               rowhead.push([bList[i], '<span style="display: none;">' +
                  lvl.format('0000') + '</span>Level ' + lvl]);

               if ($('#building-select-2-denom').val() !== '<none>') {
                  buildingname[buildingname.length - 1].push(bList[i]);
                  buildingname[buildingname.length - 1].push(bList[i]);
                  buildinglvl[buildinglvl.length - 1].push(lvl);
                  buildinglvl[buildinglvl.length - 1].push(lvl);
               }
            }
         }

         break;
      default:
         $('#building-select-1-levelsrowcolumn').css({'display': 'block'});

         var bList  = [];
         var max    = 0;
         inColumns  = ($('#building-select-1-levelsrowcolumn').val() === 'Levels in Columns');

         switch (a1.value) {
            case 'Defensive Buildings':
               bList = buildingInfo('list', 'defense');
               break;
            case 'Army Buildings':
               bList = buildingInfo('list', 'army');
               break;
            case 'Resource Buildings':
               bList = buildingInfo('list', 'resource');
               break;
            case 'Other Buildings':
               bList = buildingInfo('list', 'other');
               break;
            case 'Walls':
               bList = ['Walls'];
               break;
            case 'Traps':
               bList = buildingInfo('list', 'trap');
               break;
            case 'Ground Defenses':
               var tmp = buildingInfo('list', 'defense');
               bList   = [];

               for (var i = 0; i < tmp.length; i ++ ) {
                  var test = buildingInfo(tmp[i], 'ground attack');

                  if (Array.isArray(test)) {
                     bModes[bList.length] = [];
                     var added = false;

                     for (var j = 0; j < test.length; j ++) {
                        if (test[j]) {
                           if (!added) {
                              bList.push(tmp[i]);
                              added = true;
                           }

                           bModes[bList.length - 1].push(j);
                        }
                     }

                     if (added && test.length !== bModes[bList.length - 1].length)
                        breakout[bList.length - 1] = true;
                  }
                  else if (test)
                     bList.push(tmp[i]);
               }

               break;
            case 'Air Defenses':
               var tmp = buildingInfo('list', 'defense');
               bList   = [];

               for (var i = 0; i < tmp.length; i ++ ) {
                  var test = buildingInfo(tmp[i], 'air attack');

                  if (Array.isArray(test)) {
                     bModes[bList.length] = [];
                     var added = false;

                     for (var j = 0; j < test.length; j ++) {
                        if (test[j]) {
                           if (!added) {
                              bList.push(tmp[i]);
                              added = true;
                           }

                           bModes[bList.length - 1].push(j);
                        }
                     }

                     if (added && test.length !== bModes[bList.length - 1].length)
                        breakout[bList.length - 1] = true;
                  }
                  else if (test)
                     bList.push(tmp[i]);
               }

               break;
            default:
               bList = buildingInfo('list');
         }

         var tmpModes = bModes;
         var tmpBreak = breakout;
         bModes       = [];
         breakout     = [];

         for (var i = 0; i < bList.length; i ++) {
            var lvl = buildingInfo(bList[i], 'levels');

            if (lvl > max)
               max = lvl;

            if (typeof lvl !== 'undefined') {
               for (var j = 1; j <= lvl; j ++) {
                  if (inColumns) {
                     if (j === 1) {
                        buildingname.push([bList[i]]);
                        buildinglvl.push([j]);
                        rowhead.push([bList[i]]);
                        bModes.push([tmpModes[i]]);
                        breakout.push([tmpBreak[i]]);
                     }
                     else {
                        buildingname[buildingname.length - 1].push(bList[i]);
                        buildinglvl[buildinglvl.length - 1].push(j);
                        bModes[bModes.length - 1].push(tmpModes[i]);
                        breakout[breakout.length - 1].push(tmpBreak[i]);
                     }
                  }
                  else {
                     buildingname.push([bList[i]]);
                     buildinglvl.push([j]);
                     rowhead.push([bList[i], '<span style="display: none;">' +
                        j.format('0000') + '</span>Level ' + j]);
                     bModes.push([tmpModes[i]]);
                     breakout.push([tmpBreak[i]]);

                     if ($('#building-select-2-denom').val() !== '<none>') {
                        buildingname[buildingname.length - 1].push(bList[i]);
                        buildingname[buildingname.length - 1].push(bList[i]);
                        buildinglvl[buildinglvl.length - 1].push(j);
                        buildinglvl[buildinglvl.length - 1].push(j);
                        bModes[bModes.length - 1].push(tmpModes[i]);
                        bModes[bModes.length - 1].push(tmpModes[i]);
                        breakout[breakout.length - 1].push(tmpBreak[i]);
                        breakout[breakout.length - 1].push(tmpBreak[i]);
                     }
                  }
               }
            }
         }

         if (inColumns) {
            overhead = colhead[colhead.length - 1];
            colhead = [];

            for (var i = 1; i <= max; i ++)
               colhead.push('Level ' + i);
         }
   }

   var thead = document.createElement('thead');
   results.appendChild(thead);
   var tr = document.createElement('tr');
   thead.appendChild(tr);

   for (var col = 0; col < rowhead[0].length; col ++) {
      var th = document.createElement('th');
      $(th).css({'border': '0', 'background': '#ddf'});
      tr.appendChild(th);
   }

   var lastcolheader;

   if (inColumns) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.colSpan = '' + colhead.length;
      th.innerHTML = overhead;
      tr.appendChild(th);
      lastcolheader = th;
      tr = document.createElement('tr');
      thead.appendChild(tr);

      for (var col = 0; col < rowhead[0].length; col ++) {
         var th = document.createElement('th');
         $(th).css({'border': '0', 'background': '#ddf'});
         tr.appendChild(th);
      }
   }

   for (var col = 0; col < colhead.length; col ++) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.innerHTML = colhead[col] + '&nbsp;';
      tr.appendChild(th);

      if (!inColumns)
         lastcolheader = th;
   }

   var tbody = document.createElement('tbody');
   results.appendChild(tbody);

   for (var row = 0; row < rowhead.length; row ++) {
      var sort      = [[]];
      var vals      = [[]];
      var brokenout = false;

      for (var col = 0; col < rowhead[row].length; col ++) {
           sort[0].push(0);
           vals[0].push(rowhead[row][col]);
      }

      var numcols = (inColumns ? colhead.length : 1);

      for (var col = 0; col < numcols; col ++) {
         var num      = 0;
         var denom    = 1;
         var numimg   = false;
         var denomimg = false;

         if (buildingname[row].length > col) {
            switch ($('#building-select-2-num').val()) {
               case 'HP':
                  num = buildingInfo(buildingname[row][col], 'hitpoints', buildinglvl[row][col]);
                  break;
               case 'DPS':
                  num = buildingInfo(buildingname[row][col], 'dps', buildinglvl[row][col]);
                  break;
               case 'DPA':
                  var tmp1 = buildingInfo(buildingname[row][col], 'dps', buildinglvl[row][col]);
                  var tmp2 = buildingInfo(buildingname[row][col], 'attack speed');

                  if (!Array.isArray(tmp1) && !Array.isArray(tmp2))
                     num = parseMultiNum(tmp1, 0) * parseMultiNum(tmp2, 0);
                  else if (Array.isArray(tmp1) && !Array.isArray(tmp2)) {
                     num = [];

                     for (var i = 0; i < tmp1.length; i ++)
                        num.push(parseMultiNum(tmp1[i], 0) * parseMultiNum(tmp2, 0));
                  }
                  else if (Array.isArray(tmp2) && !Array.isArray(tmp1)) {
                     num = [];

                     for (var i = 0; i < tmp2.length; i ++)
                        num.push(parseMultiNum(tmp1, 0) * parseMultiNum(tmp2[i], 0));
                  }
                  else {
                     num = [];

                     for (var i = 0; i < tmp2.length; i ++)
                        num.push(parseMultiNum(tmp1[i], 0) * parseMultiNum(tmp2[i], 0));
                  }

                  break;
               case 'Build Cost':
                  num = buildingInfo(buildingname[row][col], 'upgrade cost', buildinglvl[row][col]);
                  numimg = true;
                  break;
               case 'Build Time':
                  num = buildingInfo(buildingname[row][col], 'upgrade time', buildinglvl[row][col]);
                  numunit = 'min';
                  break;
               case '# of Rounds':
                  num = buildingInfo(buildingname[row][col], 'number of rounds');
                  break;
               case 'Re-arm Cost':
                  num = buildingInfo(buildingname[row][col], 'rearm cost', buildinglvl[row][col]);
                  numimg = true;
                  break;
               case 'Capacity':
                  num = buildingInfo(buildingname[row][col], 'capacity', buildinglvl[row][col]);
                  numimg = true;
                  break;
               case 'Production':
                  num = buildingInfo(buildingname[row][col], 'production', buildinglvl[row][col]);
                  numimg = true;
                  numunit = 'hr';
                  break;
               case 'Housing Space':
                  num = buildingInfo(buildingname[row][col], 'housing space', buildinglvl[row][col]);
                  break;
               case 'Queue Length':
                  num = buildingInfo(buildingname[row][col], 'training queue', buildinglvl[row][col]);
            }

            if ($('#building-select-2-denom').val() !== '<none>') {
               switch ($('#building-select-2-denom').val()) {
                  case 'HP':
                     denom = buildingInfo(buildingname[row][col], 'hitpoints', buildinglvl[row][col]);
                     break;
                  case 'DPS':
                     denom = buildingInfo(buildingname[row][col], 'dps', buildinglvl[row][col]);
                     break;
                  case 'DPA':
                     var tmp1 = buildingInfo(buildingname[row][col], 'dps', buildinglvl[row][col]);
                     var tmp2 = buildingInfo(buildingname[row][col], 'attack speed');

                     if (!Array.isArray(tmp1) && !Array.isArray(tmp2))
                        denom = parseMultiNum(tmp1, 0) * parseMultiNum(tmp2, 0);
                     else if (Array.isArray(tmp1) && !Array.isArray(tmp2)) {
                        denom = [];

                        for (var i = 0; i < tmp1.length; i ++)
                           denom.push(parseMultiNum(tmp1[i], 0) * parseMultiNum(tmp2, 0));
                     }
                     else if (Array.isArray(tmp2) && !Array.isArray(tmp1)) {
                        denom = [];

                        for (var i = 0; i < tmp2.length; i ++)
                           denom.push(parseMultiNum(tmp1, 0) * parseMultiNum(tmp2[i], 0));
                     }
                     else {
                        denom = [];

                        for (var i = 0; i < tmp2.length; i ++)
                           denom.push(parseMultiNum(tmp1[i], 0) * parseMultiNum(tmp2[i], 0));
                     }

                     break;
                  case 'Build Cost':
                     denom = buildingInfo(buildingname[row][col], 'upgrade cost', buildinglvl[row][col]);
                     denomimg = true;
                     break;
                  case 'Build Time':
                     denom = buildingInfo(buildingname[row][col], 'upgrade time', buildinglvl[row][col]);
                     denomunit = 'min';
                     break;
                  case '# of Rounds':
                     denom = buildingInfo(buildingname[row][col], 'number of rounds');
                     break;
                  case 'Re-arm Cost':
                     denom = buildingInfo(buildingname[row][col], 'rearm cost', buildinglvl[row][col]);
                     denomimg = true;
                     break;
                  case 'Capacity':
                     denom = buildingInfo(buildingname[row][col], 'capacity', buildinglvl[row][col]);
                     denomimg = true;
                     break;
                  case 'Production':
                     denom = buildingInfo(buildingname[row][col], 'production', buildinglvl[row][col]);
                     denomimg = true;
                     denomunit = 'hr';
                     break;
                  case 'Housing Space':
                     denom = buildingInfo(buildingname[row][col], 'housing space', buildinglvl[row][col]);
                     break;
                  case 'Queue Length':
                     denom = buildingInfo(buildingname[row][col], 'training queue', buildinglvl[row][col]);
                     break;
               }
            }
         }

         // If we've first encountered a value that differs on mode
         // (i.e. an arrayed value that isn't a resource), copy everything
         // we've calculated to this point as many times as there are (valid) modes
         // Also, do it pre-emptively if we have filtered some modes out
         if (!brokenout && ((typeof breakout[row] !== 'undefined' && 
            typeof breakout[row][col] !== 'undefined') ||
            (!numimg && Array.isArray(num)) || (!denomimg && Array.isArray(denom)))) {
            brokenout = true;
            var modes = [];

            if (typeof bModes[row] === 'undefined')
               bModes[row] = [];

            if (typeof bModes[row][col] !== 'undefined') {
               for (var i = 0; i < bModes[row][col].length; i ++)
                  modes.push(buildingInfo(buildingname[row][col], 'modes',
                     buildinglvl[row][col], bModes[row][col][i]));
            }
            else {
               modes            = buildingInfo(buildingname[row][col], 'modes');
               bModes[row][col] = [];

               for (var i = 0; i < modes.length; i ++)
                  bModes[row][col].push(i);
            }

            for (var i = 1; i < modes.length; i ++) {
               sort.push([]);
               vals.push([]);

               for (var j = 0; j < vals[0].length; j ++) {
                  sort[sort.length - 1].push(sort[0][j]);
                  vals[vals.length - 1].push(vals[0][j]);
               }
            }

            // Now add the mode information to the first column header
            for (var i = 0; i < modes.length; i ++)
               vals[i][0] = vals[i][0] + ' (' + modes[i] + ')';
         }

         if (!inColumns && colhead.length > 1) {
            for (var i = 0; i < vals.length; i ++) {
               // If we know it's a resource type, add it as such
               if (numimg) {
                  sort[i].push(resourceVal(num, true));
                  vals[i].push(formatResource(num, numunit));
               }
               // If it's otherwise an array, parse the proper mode
               else if (Array.isArray(num)) {
                  var tmp;

                  if (typeof bModes[row][col] !== 'undefined')
                     tmp = parseMultiNum(num[bModes[row][col][i]], 0);
                  else
                     tmp = parseMultiNum(num[i], 0);

                  if (!tmp) {
                     sort[i].push(0);
                     vals[i].push('-');
                  }
                  else {
                     sort[i].push(tmp);
                     vals[i].push(tmp.format('#,##0[.]###'));
                  }
               }
               else {
                  var tmp = parseMultiNum(num, 0);

                  if (!tmp) {
                     sort[i].push(0);
                     vals[i].push('-');
                  }
                  else if (numunit) {
                     sort[i].push(tmp);
                     vals[i].push(formatTime(tmp, numunit));
                  }
                  else {
                     sort[i].push(tmp);
                     vals[i].push(tmp.format('#,##0[.]###'));
                  }
               }
            }

            for (var i = 0; i < vals.length; i ++) {
               // If we know it's a resource type, add it as such
               if (denomimg) {
                  sort[i].push(resourceVal(denom, true));
                  vals[i].push(formatResource(denom, denomunit));
               }
               // If it's otherwise an array, parse the proper mode
               else if (Array.isArray(denom)) {
                  var tmp;

                  if (typeof bModes[row][col] !== 'undefined')
                     tmp = parseMultiNum(denom[bModes[row][col][i]], 0);
                  else
                     tmp = parseMultiNum(denom[i], 0);

                  if (!tmp) {
                     sort[i].push(0);
                     vals[i].push('-');
                  }
                  else {
                     sort[i].push(tmp);
                     vals[i].push(tmp.format('#,##0[.]###'));
                  }
               }
               else {
                  var tmp = parseMultiNum(denom, 0);

                  if (!tmp) {
                     sort[i].push(0);
                     vals[i].push('-');
                  }
                  else if (denomunit) {
                     sort[i].push(tmp);
                     vals[i].push(formatTime(tmp, denomunit));
                  }
                  else {
                     sort[i].push(tmp);
                     vals[i].push(tmp.format('#,##0[.]###'));
                  }
               }
            }
         }

         for (var i = 0; i < vals.length; i ++) {
            if (numimg || denomimg) {
               var tmp1;
               var tmp2;

               if (numimg)
                  tmp1 = resourceVal(num, numunit);
               else if (Array.isArray(num) &&
                  typeof bModes[row][col] !== 'undefined')
                  tmp1 = parseMultiNum(num[bModes[row][col][i]]);
               else if (Array.isArray(num))
                  tmp1 = parseMultiNum(num[i]);
               else
                  tmp1 = parseMultiNum(num);

               if ($('#building-select-2-denom').val() === '<none>')
                  tmp2 = 1;
               else if (denomimg)
                  tmp2 = resourceVal(denom, denomunit);
               else if (Array.isArray(denom) &&
                  typeof bModes[row][col] !== 'undefined')
                  tmp2 = parseMultiNum(denom[bModes[row][col][i]]);
               else if (Array.isArray(denom))
                  tmp2 = parseMultiNum(denom[i]);
               else
                  tmp2 = parseMultiNum(denom);

               if ($('#building-select-2-denom').val() === '<none>' && numimg) {
                  sort[i].push(resourceVal(num, true));
                  vals[i].push(formatResource(num, numunit));
               }
               else if (tmp1 === '-' || tmp2 === '-' || !tmp1 || !tmp2 ||
                  Number.isNaN(tmp1 / tmp2)) {
                  sort[i].push(0);
                  vals[i].push('-');
               }
               else {
                  sort[i].push(tmp1 / tmp2);
                  vals[i].push(sort[i][sort[i].length - 1].format('#,##0[.]###'));
               }
            }
            else if (!denom || (Array.isArray(denom) && !denom[i]) ||
               buildingname[row].length <= col) {
               sort[i].push(0);
               vals[i].push('-');
            }
            else {
               var snum, sdenom;

               if (Array.isArray(num) &&
                  typeof bModes[row][col] !== 'undefined')
                  snum = num[bModes[row][col][i]];
               else if (Array.isArray(num))
                  snum = num[i];
               else
                  snum = num;

               if (Array.isArray(denom) &&
                  typeof bModes[row][col] !== 'undefined')
                  sdenom = denom[bModes[row][col][i]];
               else if (Array.isArray(denom))
                  sdenom = denom[i];
               else
                  sdenom = denom;

               if (Array.isArray(snum) || Array.isArray(sdenom) ||
                  !parseMultiNum(snum, 0) || !parseMultiNum(sdenom, 0)) {
                  sort[i].push(0);
                  vals[i].push('-');
               }
               else if ($('#building-select-2-denom').val() === '<none>' && numunit) {
                  sort[i].push(parseMultiNum(snum, 0));
                  vals[i].push(formatTime(parseMultiNum(snum, 0), numunit));
               }
               else {
                  sort[i].push(parseMultiNum(snum, 0) / parseMultiNum(sdenom, 0));
                  vals[i].push(sort[i][sort[i].length - 1].format('#,##0[.]###'));
               }
            }
         }
      }

      // Now create any rows that we've calculated
      for (var i = 0; i < vals.length; i ++) {
         var tr = document.createElement('tr');
         tbody.appendChild(tr);

         for (var j = 0; j < vals[i].length; j ++) {
            if (j < rowhead[row].length) {
               var th = document.createElement('th');
               th.scope = 'row';
               th.innerHTML = vals[i][j];
               tr.appendChild(th);
            }
            else {
               var td   = document.createElement('td');
               var span = document.createElement('span');
               span.innerHTML = sort[i][j].format('000000000000000.00000');
               $(span).css({'display': 'none'});
               td.innerHTML = span.outerHTML + vals[i][j];
               tr.appendChild(td);
            }
         }
      }
   }

   // Add units where necessary
   var replacestr = (numunit ? '&nbsp;(' + (numimg ? '/' : '') + numunit + ')' : '');
   lastcolheader.innerHTML = lastcolheader.innerHTML.replace('«', replacestr);

   var replacestr = (denomunit ? '&nbsp;(' + (denomimg ? '/' : '') + denomunit + ')' : '');
   lastcolheader.innerHTML = lastcolheader.innerHTML.replace('»', replacestr);

   $('#building-comparator-results-table tr td, #building-comparator-results-table tr th').css({'padding' : '0px 20px'});
   mw.loader.using('jquery.tablesorter', function() { $(results).tablesorter(); });
   $(window).trigger('resize');

   function resourceVal(num, max) {
      if (!Array.isArray(num))
         return num;

      if (arguments.length < 2)
         max = false;

      var vals = [];

      for (var i = 0; i < num.length; i ++) {
         if (num[i] > 0)
            vals.push(num[i]);
      }

      if (vals.length > 1) {
         if (!max)
            return 0;

         max = vals[0];

         for (var i = 1; i < vals.length; i ++) {
            if (vals[i] > max)
               max = vals[i];
         }

         return max;
      }
      else if (vals.length)
         return vals[0];
      else
         return 0;
   }

   function formatResource(num, unit) {
      // Add gems as a fourth resource type
      if (!Array.isArray(num))
         num = [0, 0, 0, num];
      else {
         num = $.extend(true, [], num);
         num.push(0);
      }

      var resource = ['gold', 'elixir', 'dark elixir', 'gems'];
      var result   = [];

      for (var i = 0; i < num.length; i ++) {
         if (typeof num[i] === 'number' && num[i])
            result.push(num[i].format('#,##0[.]###') + imgResourceElem(resource[i]).outerHTML);
         else if (typeof num[i] === 'string') {
            var tmp = num[i].split('|');

            for (var j = 0; j < tmp.length; j ++)
               tmp[j] =  Number(tmp[j]).format('#,##0[.]###') + imgResourceElem(resource[i]).outerHTML;

            result.push(tmp.join('&nbsp;/&nbsp;'));
         }
      }

      if (!result.length)
         return '-';

      return result.join(result, ',&nbsp;') + (unit ? '/' + unit : '');
   }

   function parseMultiNum(num, idx) {
      if (arguments.length < 2 || typeof idx !== 'number' || idx < 0)
         idx = 0;

      if (typeof num === 'number')
         return num;

      num = num.split('|');
      num = num[(idx >= num.length ? num.length - 1 : idx)];
      num = num.split(':');
      return Number(num[num.length - 1]);
   }

   function formatTime(num, unit) {
      switch (unit) {
         case 'day':
            num *= 24;
         case 'hr':
            num *= 60;
         case 'min':
            num *= 60;
      }

      return '<span style="display: none;">' + num.format('000000000000') + '</span>' +
         formatDurationInSeconds(num);
   }
}

function updateHTKComparator() {
   $('.htk-select-1-secondary').css({'display': 'none'});
   $('.htk-select-2-secondary').css({'display': 'none'});

   var results             = document.getElementById('htk-comparator-results-table');
   var a1                  = document.getElementById('htk-select-1');
   var a2                  = document.getElementById('htk-select-2');
   var colhead             = [];
   var rowhead             = [];

   var buildingname        = [];
   var buildinglvl         = [];
   var buildingtype        = [];
   var buildingground      = [];
   var buildingair         = [];
   var buildingfavorite    = [];
   var buildingmultiplier  = [];
   var buildinghp          = [];
   var buildingdps         = [];
   var buildingattackspeed = [];

   var troopname           = [];
   var trooplvl            = [];
   var troopclass          = [];
   var trooptype           = [];
   var troopfavorite       = [];
   var troopmultiplier     = [];
   var troophp             = [];
   var troopdps            = [];
   var troopattackspeed    = [];

   var vals                = [];
   var offense             = ($('#htk-select-offensedefense').val() === 'Offense HTK');

   results.innerHTML = '';

   $('.htk-select-ragespell-elem').css({'display': (offense ? '' : 'none')});
   var rage     = $('#htk-select-ragespell').prop('selectedIndex');
   var ragelvls = spellInfo('rage', 'levels');
   var boost    = (offense && rage > 0 ? spellInfo('rage', 'damage boost', rage) : 1);
   // Used for shading the cells varying colors of magenta based on rage spell level
   var greenlvl = Math.round(((255 - 153) / ragelvls) * (ragelvls - rage) + 153);

   switch (a1.value) {
      case 'Individual Building':
         $('#htk-select-1-buildinglist').css({'display': 'block'});
         var building = $('#htk-select-1-buildinglist').val();
         var modes    = buildingInfo(building, 'modes');

         if (!modes || modes === 'None')
            modes = [''];
         else {
            var differs = false;

            if (offense)
               differs = 
                  Array.isArray(buildingInfo(building, 'type', 1)) ||
                  Array.isArray(buildingInfo(building, 'hitpoints', 1));
            else
               differs =
                  Array.isArray(buildingInfo(building, 'ground attack', 1)) ||
                  Array.isArray(buildingInfo(building, 'air attack', 1)) ||
                  Array.isArray(buildingInfo(building, 'preferred target', 1)) ||
                  Array.isArray(buildingInfo(building, 'multiplier', 1)) ||
                  Array.isArray(buildingInfo(building, 'dps', 1)) ||
                  Array.isArray(buildingInfo(building, 'attack speed', 1));

            if (!differs)
               modes = [''];
         }

         for (var mode = 0; mode < modes.length; mode ++) {
            for (var i = 1; i <= buildingInfo(building, 'levels'); i ++) {
               buildingname.push(building);
               buildinglvl.push(i);
               buildingtype.push(buildingInfo(building, 'type', i, mode));
               buildingground.push(buildingInfo(building, 'ground attack', i, mode));
               buildingair.push(buildingInfo(building, 'air attack', i, mode));
               buildingfavorite.push(buildingInfo(building, 'preferred target', i, mode));
               buildingmultiplier.push(buildingInfo(building, 'multiplier', i, mode));
               buildinghp.push(buildingInfo(building, 'hitpoints', i, mode));
               buildingdps.push(buildingInfo(building, 'dps', i, mode));
               buildingattackspeed.push(buildingInfo(building, 'attack speed', i, mode));
               rowhead.push([building + (modes[mode] === '' ? '' : ' (' + modes[mode] + ')')]);
               rowhead[rowhead.length - 1].push(i);
            }
         }

         break;
      case 'Building Level':
         $('#htk-select-1-buildinglevel').css({'display': 'block'});

         var bList = buildingInfo('list');

         for (var i = 0; i < bList.length; i ++) {
            var lvl   = $('#htk-select-1-buildinglevel').val();

            if (typeof buildingInfo(bList[i], 'hitpoints', lvl) === 'undefined')
               continue;

            var modes = buildingInfo(bList[i], 'modes');

            if (!modes || modes === 'None')
               modes = [''];
            else {
               var differs = false;

               if (offense)
                  differs = 
                     Array.isArray(buildingInfo(bList[i], 'type', lvl)) ||
                     Array.isArray(buildingInfo(bList[i], 'hitpoints', lvl));
               else
                  differs =
                     Array.isArray(buildingInfo(bList[i], 'ground attack', lvl)) ||
                     Array.isArray(buildingInfo(bList[i], 'air attack', lvl)) ||
                     Array.isArray(buildingInfo(bList[i], 'preferred target', lvl)) ||
                     Array.isArray(buildingInfo(bList[i], 'multiplier', lvl)) ||
                     Array.isArray(buildingInfo(bList[i], 'dps', lvl)) ||
                     Array.isArray(buildingInfo(bList[i], 'attack speed', lvl));

               if (!differs)
                  modes = [''];
            }

            for (var mode = 0; mode < modes.length; mode ++) {
               buildingname.push(bList[i]);
               buildinglvl.push(lvl);
               buildingtype.push(buildingInfo(bList[i], 'type', lvl, mode));
               buildingground.push(buildingInfo(bList[i], 'ground attack', lvl, mode));
               buildingair.push(buildingInfo(bList[i], 'air attack', lvl, mode));
               buildingfavorite.push(buildingInfo(bList[i], 'preferred target', lvl, mode));
               buildingmultiplier.push(buildingInfo(bList[i], 'multiplier', lvl, mode));
               buildinghp.push(buildingInfo(bList[i], 'hitpoints', lvl, mode));
               buildingdps.push(buildingInfo(bList[i], 'dps', lvl, mode));
               buildingattackspeed.push(buildingInfo(bList[i], 'attack speed', lvl, mode));
               rowhead.push([bList[i] + (modes[mode] === '' ? '' : ' (' + modes[mode] + ')')]);
               rowhead[rowhead.length - 1].push(lvl);
            }
         }

         break;
      case 'Buildings by TH Level':
         $('#htk-select-1-townhalllevel').css({'display': 'block'});
         var bList   = buildingInfo('list');
         var thLevel = $('#htk-select-1-townhalllevel').val();

         for (var i = 0; i < bList.length; i ++) {
            var include = false;
            var lvl     = 0;

            if (bList[i] === 'Town Hall') {
               include = true;
               lvl     = thLevel;
            }
            else {
               for (j = buildingInfo(bList[i], 'levels'); j >= 1; j --) {
                  if (typeof buildingInfo(bList[i], 'required town hall', j) !== 'undefined' &&
                     thLevel >= buildingInfo(bList[i], 'required town hall', j)) {
                     include = true;
                     lvl     = j;
                     break;
                  }
               }
            }

            if (include) {
               var modes = buildingInfo(bList[i], 'modes');

               if (!modes || modes === 'None')
                  modes = [''];
               else {
                  var differs = false;

                  if (offense)
                     differs = 
                        Array.isArray(buildingInfo(bList[i], 'type', lvl)) ||
                        Array.isArray(buildingInfo(bList[i], 'hitpoints', lvl));
                  else
                     differs =
                        Array.isArray(buildingInfo(bList[i], 'ground attack', lvl)) ||
                        Array.isArray(buildingInfo(bList[i], 'air attack', lvl)) ||
                        Array.isArray(buildingInfo(bList[i], 'preferred target', lvl)) ||
                        Array.isArray(buildingInfo(bList[i], 'multiplier', lvl)) ||
                        Array.isArray(buildingInfo(bList[i], 'dps', lvl)) ||
                        Array.isArray(buildingInfo(bList[i], 'attack speed', lvl));

                  if (!differs)
                     modes = [''];
               }

               for (var mode = 0; mode < modes.length; mode ++) {
                  buildingname.push(bList[i]);
                  buildinglvl.push(lvl);
                  buildingtype.push(buildingInfo(bList[i], 'type', lvl, mode));
                  buildingground.push(buildingInfo(bList[i], 'ground attack', lvl, mode));
                  buildingair.push(buildingInfo(bList[i], 'air attack', lvl, mode));
                  buildingfavorite.push(buildingInfo(bList[i], 'preferred target', lvl, mode));
                  buildingmultiplier.push(buildingInfo(bList[i], 'multiplier', lvl, mode));
                  buildinghp.push(buildingInfo(bList[i], 'hitpoints', lvl, mode));
                  buildingdps.push(buildingInfo(bList[i], 'dps', lvl, mode));
                  buildingattackspeed.push(buildingInfo(bList[i], 'attack speed', lvl, mode));
                  rowhead.push([bList[i] + (modes[mode] === '' ? '' : ' (' + modes[mode] + ')')]);
                  rowhead[rowhead.length - 1].push(lvl);
               }
            }
         }

         break;
      default:
         var bList    = [];
         var bModes   = [];
         var modes    = [];

         switch (a1.value) {
            case 'Defensive Buildings':
               bList = buildingInfo('list', 'defense');
               break;
            case 'Army Buildings':
               bList = buildingInfo('list', 'army');
               break;
            case 'Resource Buildings':
               bList = buildingInfo('list', 'resource');
               break;
            case 'Other Buildings':
               bList = buildingInfo('list', 'other');
               break;
            case 'Walls':
               bList = ['Walls'];
               break;
            case 'Traps':
               bList = buildingInfo('list', 'trap');
               break;
            case 'Ground Defenses':
               var tmp = buildingInfo('list', 'defense');
               bList   = [];

               for (var i = 0; i < tmp.length; i ++ ) {
                  var test = buildingInfo(tmp[i], 'ground attack');

                  if (Array.isArray(test)) {
                     bModes[bList.length] = [];
                     var added = false;

                     for (var j = 0; j < test.length; j ++) {
                        if (test[j]) {
                           if (!added) {
                              bList.push(tmp[i]);
                              added = true;
                           }

                           bModes[bList.length - 1].push(j);
                        }
                     }
                  }
                  else if (test)
                     bList.push(tmp[i]);
               }

               break;
            case 'Air Defenses':
               var tmp = buildingInfo('list', 'defense');
               bList   = [];

               for (var i = 0; i < tmp.length; i ++ ) {
                  var test = buildingInfo(tmp[i], 'air attack');

                  if (Array.isArray(test)) {
                     bModes[bList.length] = [];
                     var added = false;

                     for (var j = 0; j < test.length; j ++) {
                        if (test[j]) {
                           if (!added) {
                              bList.push(tmp[i]);
                              added = true;
                           }

                           bModes[bList.length - 1].push(j);
                        }
                     }
                  }
                  else if (test)
                     bList.push(tmp[i]);
               }

               break;
            default:
               bList = buildingInfo('list');
         }

         for (var i = 0; i < bList.length; i ++) {
            var lvl = buildingInfo(bList[i], 'levels');

            if (typeof lvl !== 'undefined') {
               if (typeof bModes[i] === 'undefined') {
                  modes = buildingInfo(bList[i], 'modes');

                  if (!Array.isArray(modes))
                     modes = [''];
               }
               else {
                  var tmpModes = buildingInfo(bList[i], 'modes');
                  modes = [];

                  for (var mode = 0; mode < bModes[i].length; mode ++)
                     modes.push(tmpModes[bModes[i][mode]]);
               }

               for (var mode = 0; mode < modes.length; mode ++) {
                  for (var j = 1; j <= lvl; j ++) {
                     buildingname.push(bList[i]);
                     buildinglvl.push(j);
                     buildingtype.push(buildingInfo(bList[i], 'type', j, mode));
                     buildingground.push(buildingInfo(bList[i], 'ground attack', j, mode));
                     buildingair.push(buildingInfo(bList[i], 'air attack', j, mode));
                     buildingfavorite.push(buildingInfo(bList[i], 'preferred target', j, mode));
                     buildingmultiplier.push(buildingInfo(bList[i], 'multiplier', j, mode));
                     buildinghp.push(buildingInfo(bList[i], 'hitpoints', j, mode));
                     buildingdps.push(buildingInfo(bList[i], 'dps', j, mode));
                     buildingattackspeed.push(buildingInfo(bList[i], 'attack speed', j, mode));
                     rowhead.push([bList[i] + (modes[mode] === '' ? '' : ' (' + modes[mode] + ')')]);
                     rowhead[rowhead.length - 1].push(j);
                  }
               }
            }
         }
   }

   switch (a2.value) {
      case 'Individual Troop':
         $('#htk-select-2-trooplist').css({'display': 'block'});
         var troop = $('#htk-select-2-trooplist').val();

         for (var i = 1; i <= troopInfo(troop, 'levels'); i ++) {
            troopname.push(troop);
            trooplvl.push(i);
            troopclass.push(troopInfo(troop, 'barracks type'));
            trooptype.push(troopInfo(troop, 'type', i));
            troopfavorite.push(troopInfo(troop, 'preferred target', i));
            troopmultiplier.push(troopInfo(troop, 'multiplier', i));
            troophp.push(troopInfo(troop, 'hitpoints', i));
            troopdps.push(troopInfo(troop, 'dps', i));
            troopattackspeed.push(troopInfo(troop, 'attack speed', i));
            colhead.push([troop]);
            colhead[colhead.length - 1].push(i);

            // Fix preferred target
            switch (troopfavorite[troopfavorite.length - 1]) {
               case 'Resources':
                  troopfavorite[troopfavorite.length - 1] = 'Resource';
                  break;
               case 'Defenses':
                  troopfavorite[troopfavorite.length - 1] = 'Defense';
                  break;
               case 'Army Buildings':
                  troopfavorite[troopfavorite.length - 1] = 'Army';
                  break;
               case 'Other Buildings':
                  troopfavorite[troopfavorite.length - 1] = 'Other';
                  break;
            }
         }

         for (var i = 1; i <= heroInfo(troop, 'levels'); i ++) {
            troopname.push(troop);
            trooplvl.push(i);
            troopclass.push('Hero');
            trooptype.push(heroInfo(troop, 'type', i));
            troopfavorite.push(heroInfo(troop, 'preferred target', i));
            troopmultiplier.push(heroInfo(troop, 'multiplier', i));
            troophp.push(heroInfo(troop, 'hitpoints', i));
            troopdps.push(heroInfo(troop, 'dps', i));
            troopattackspeed.push(heroInfo(troop, 'attack speed', i));
            colhead.push([troop]);
            colhead[colhead.length - 1].push(i);

            // Fix preferred target
            switch (troopfavorite[troopfavorite.length - 1]) {
               case 'Resources':
                  troopfavorite[troopfavorite.length - 1] = 'Resource';
                  break;
               case 'Defenses':
                  troopfavorite[troopfavorite.length - 1] = 'Defense';
                  break;
               case 'Army Buildings':
                  troopfavorite[troopfavorite.length - 1] = 'Army';
                  break;
               case 'Other Buildings':
                  troopfavorite[troopfavorite.length - 1] = 'Other';
                  break;
            }
         }

         break;
      case 'Troop Level':
         $('#htk-select-2-trooplevel').css({'display': 'block'});
         var lvl   = $('#htk-select-2-trooplevel').val();
         var tList = troopInfo('list');

         for (var i = 0; i < tList.length; i ++) {
            if (typeof troopInfo(tList[i], 'hitpoints', lvl) === 'undefined')
               continue;

            troopname.push(tList[i]);
            trooplvl.push(lvl);
            troopclass.push(troopInfo(tList[i], 'barracks type'));
            trooptype.push(troopInfo(tList[i], 'type', lvl));
            troopfavorite.push(troopInfo(tList[i], 'preferred target', lvl));
            troopmultiplier.push(troopInfo(tList[i], 'multiplier', lvl));
            troophp.push(troopInfo(tList[i], 'hitpoints', lvl));
            troopdps.push(troopInfo(tList[i], 'dps', lvl));
            troopattackspeed.push(troopInfo(tList[i], 'attack speed', lvl));
            colhead.push([tList[i]]);
            colhead[colhead.length - 1].push(lvl);

            // Fix preferred target
            switch (troopfavorite[troopfavorite.length - 1]) {
               case 'Resources':
                  troopfavorite[troopfavorite.length - 1] = 'Resource';
                  break;
               case 'Defenses':
                  troopfavorite[troopfavorite.length - 1] = 'Defense';
                  break;
               case 'Army Buildings':
                  troopfavorite[troopfavorite.length - 1] = 'Army';
                  break;
               case 'Other Buildings':
                  troopfavorite[troopfavorite.length - 1] = 'Other';
                  break;
            }
         }

         var hList = heroInfo('list');

         for (var i = 0; i < hList.length; i ++) {
            if (typeof heroInfo(hList[i], 'hitpoints', lvl) === 'undefined')
               continue;

            troopname.push(hList[i]);
            trooplvl.push(lvl);
            troopclass.push('Hero');
            trooptype.push(heroInfo(hList[i], 'type', lvl));
            troopfavorite.push(heroInfo(hList[i], 'preferred target', lvl));
            troopmultiplier.push(heroInfo(hList[i], 'multiplier', lvl));
            troophp.push(heroInfo(hList[i], 'hitpoints', lvl));
            troopdps.push(heroInfo(hList[i], 'dps', lvl));
            troopattackspeed.push(heroInfo(hList[i], 'attack speed', lvl));
            colhead.push([hList[i]]);
            colhead[colhead.length - 1].push(lvl);

            // Fix preferred target
            switch (troopfavorite[troopfavorite.length - 1]) {
               case 'Resources':
                  troopfavorite[troopfavorite.length - 1] = 'Resource';
                  break;
               case 'Defenses':
                  troopfavorite[troopfavorite.length - 1] = 'Defense';
                  break;
               case 'Army Buildings':
                  troopfavorite[troopfavorite.length - 1] = 'Army';
                  break;
               case 'Other Buildings':
                  troopfavorite[troopfavorite.length - 1] = 'Other';
                  break;
            }
         }

         break;
      case 'Troops by TH Level':
         $('#htk-select-2-townhalllevel').css({'display': 'block'});
         var tList = troopInfo('list');

         // Required Town Hall level for each troop type/level
         var normal  = troopInfo('list', 'normal trainable');
         var dark    = troopInfo('list', 'dark trainable');
         var lab     = buildingInfo('laboratory', 'required town hall');
         var thLevel = $('#htk-select-2-townhalllevel').val();

         for (var i = 0; i < normal.length; i ++)
            normal[i] = buildingInfo('barracks', 'required town hall', troopInfo(normal[i], 'barracks level'));

         for (var i = 0; i < dark.length; i ++)
            dark[i] = buildingInfo('dark barracks', 'required town hall', troopInfo(dark[i], 'barracks level'));

         for (var i = 0; i < tList.length; i ++) {
            var include = false;
            var lvl     = 0;

            for (j = troopInfo(tList[i], 'levels'); j >= 1; j --) {
               if (typeof troopInfo(tList[i], 'barracks level', j) !== 'undefined') {
                  var barracks    = (troopInfo(tList[i], 'barracks type') === 'Dark' ? dark : normal);
                  var reqBarracks = troopInfo(tList[i], 'barracks level');
                  var reqLab      = troopInfo(tList[i], 'laboratory level', j);

                  if (thLevel >= barracks[reqBarracks - 1] && (!reqLab || thLevel >= lab[reqLab - 1])) {
                     include = true;
                     lvl     = j;
                     break;
                  }
               }
            }

            if (include) {
               troopname.push(tList[i]);
               trooplvl.push(lvl);
               troopclass.push(troopInfo(tList[i], 'barracks type'));
               trooptype.push(troopInfo(tList[i], 'type', lvl));
               troopfavorite.push(troopInfo(tList[i], 'preferred target', lvl));
               troopmultiplier.push(troopInfo(tList[i], 'multiplier', lvl));
               troophp.push(troopInfo(tList[i], 'hitpoints', lvl));
               troopdps.push(troopInfo(tList[i], 'dps', lvl));
               troopattackspeed.push(troopInfo(tList[i], 'attack speed', lvl));
               colhead.push([tList[i]]);
               colhead[colhead.length - 1].push(lvl);

               // Fix preferred target
               switch (troopfavorite[troopfavorite.length - 1]) {
                  case 'Resources':
                     troopfavorite[troopfavorite.length - 1] = 'Resource';
                     break;
                  case 'Defenses':
                     troopfavorite[troopfavorite.length - 1] = 'Defense';
                     break;
                  case 'Army Buildings':
                     troopfavorite[troopfavorite.length - 1] = 'Army';
                     break;
                  case 'Other Buildings':
                     troopfavorite[troopfavorite.length - 1] = 'Other';
                     break;
               }
            }
         }

         var hList = heroInfo('list');

         for (var i = 0; i < hList.length; i ++) {
            var include = false;
            var lvl     = 0;

            for (j = heroInfo(hList[i], 'levels'); j >= 1; j --) {
               if (typeof heroInfo(hList[i], 'required town hall', j) !== 'undefined') {
                  if (thLevel >= heroInfo(hList[i], 'required town hall', j)) {
                     include = true;
                     lvl     = j;
                     break;
                  }
               }
            }

            if (include) {
               troopname.push(hList[i]);
               trooplvl.push(lvl);
               troopclass.push('Hero');
               trooptype.push(heroInfo(hList[i], 'type', lvl));
               troopfavorite.push(heroInfo(hList[i], 'preferred target', lvl));
               troopmultiplier.push(heroInfo(hList[i], 'multiplier', lvl));
               troophp.push(heroInfo(hList[i], 'hitpoints', lvl));
               troopdps.push(heroInfo(hList[i], 'dps', lvl));
               troopattackspeed.push(heroInfo(hList[i], 'attack speed', lvl));
               colhead.push([hList[i]]);
               colhead[colhead.length - 1].push(lvl);

               // Fix preferred target
               switch (troopfavorite[troopfavorite.length - 1]) {
                  case 'Resources':
                     troopfavorite[troopfavorite.length - 1] = 'Resource';
                     break;
                  case 'Defenses':
                     troopfavorite[troopfavorite.length - 1] = 'Defense';
                     break;
                  case 'Army Buildings':
                     troopfavorite[troopfavorite.length - 1] = 'Army';
                     break;
                  case 'Other Buildings':
                     troopfavorite[troopfavorite.length - 1] = 'Other';
                     break;
               }
            }
         }

         break;
      case 'Heroes':
         var hList = heroInfo('list');

         for (var i = 0; i < hList.length; i ++) {
            var lvl = heroInfo(hList[i], 'levels');

            if (typeof lvl !== 'undefined') {
               for (var j = 1; j <= lvl; j ++) {
                  troopname.push(hList[i]);
                  trooplvl.push(lvl);
                  troopclass.push('Hero');
                  trooptype.push(heroInfo(hList[i], 'type', j));
                  troopfavorite.push(heroInfo(hList[i], 'preferred target', j));
                  troopmultiplier.push(heroInfo(hList[i], 'multiplier', j));
                  troophp.push(heroInfo(hList[i], 'hitpoints', j));
                  troopdps.push(heroInfo(hList[i], 'dps', j));
                  troopattackspeed.push(heroInfo(hList[i], 'attack speed', j));
                  colhead.push([hList[i]]);
                  colhead[colhead.length - 1].push(j);

                  // Fix preferred target
                  switch (troopfavorite[troopfavorite.length - 1]) {
                     case 'Resources':
                        troopfavorite[troopfavorite.length - 1] = 'Resource';
                        break;
                     case 'Defenses':
                        troopfavorite[troopfavorite.length - 1] = 'Defense';
                        break;
                     case 'Army Buildings':
                        troopfavorite[troopfavorite.length - 1] = 'Army';
                        break;
                     case 'Other Buildings':
                        troopfavorite[troopfavorite.length - 1] = 'Other';
                        break;
                  }
               }
            }
         }

         break;
      default:
         var tList = [];

         switch (a2.value) {
            case 'Regular Troops':
               tList = troopInfo('list', 'normal');
               break;
            case 'Dark Troops':
               tList = troopInfo('list', 'dark');
               break;
            case 'Trainable Troops':
               tList = troopInfo('list', 'trainable');
               break;
            case 'Air Troops':
               var tmp = troopInfo('list');
               tList   = [];

               for (var i = 0; i < tmp.length; i ++) {
                  if (troopInfo(tmp[i], 'type') === 'Air')
                     tList.push(tmp[i]);
               }

               break;
            case 'Ground Troops':
               var tmp = troopInfo('list');
               tList   = [];

               for (var i = 0; i < tmp.length; i ++) {
                  if (troopInfo(tmp[i], 'type') === 'Ground')
                     tList.push(tmp[i]);
               }

               break;
            case 'Anti-Air Troops':
               var tmp = troopInfo('list');
               tList   = [];

               for (var i = 0; i < tmp.length; i ++) {
                  if (troopInfo(tmp[i], 'air attack'))
                     tList.push(tmp[i]);
               }

               break;
            case 'Anti-Ground Troops':
               var tmp = troopInfo('list');
               tList   = [];

               for (var i = 0; i < tmp.length; i ++) {
                  if (troopInfo(tmp[i], 'ground attack'))
                     tList.push(tmp[i]);
               }

               break;
            default:
               tList = troopInfo('list');
         }

         for (var i = 0; i < tList.length; i ++) {
            var lvl = troopInfo(tList[i], 'levels');

            if (typeof lvl !== 'undefined') {
               for (var j = 1; j <= lvl; j ++) {
                  troopname.push(tList[i]);
                  trooplvl.push(lvl);
                  troopclass.push(troopInfo(tList[i], 'barracks type'));
                  trooptype.push(troopInfo(tList[i], 'type', j));
                  troopfavorite.push(troopInfo(tList[i], 'preferred target', j));
                  troopmultiplier.push(troopInfo(tList[i], 'multiplier', j));
                  troophp.push(troopInfo(tList[i], 'hitpoints', j));
                  troopdps.push(troopInfo(tList[i], 'dps', j));
                  troopattackspeed.push(troopInfo(tList[i], 'attack speed', j));
                  colhead.push([tList[i]]);
                  colhead[colhead.length - 1].push(j);

                  // Fix preferred target
                  switch (troopfavorite[troopfavorite.length - 1]) {
                     case 'Resources':
                        troopfavorite[troopfavorite.length - 1] = 'Resource';
                        break;
                     case 'Defenses':
                        troopfavorite[troopfavorite.length - 1] = 'Defense';
                        break;
                     case 'Army Buildings':
                        troopfavorite[troopfavorite.length - 1] = 'Army';
                        break;
                     case 'Other Buildings':
                        troopfavorite[troopfavorite.length - 1] = 'Other';
                        break;
                  }
               }
            }
         }
   }

   var thead = document.createElement('thead');
   results.appendChild(thead);
   var tr1 = document.createElement('tr');
   var tr2 = document.createElement('tr');
   thead.appendChild(tr1);
   thead.appendChild(tr2);

   for (var col = 0; col < 2; col ++) {
      var th = document.createElement('th');
      $(th).css({'border': '0', 'background': '#ddf'});
      tr1.appendChild(th);

      var th = document.createElement('th');
      $(th).css({'border': '0', 'background': '#ddf'});
      tr2.appendChild(th);
   }

   var colspan, th1, th2;

   for (var col = 0; col < colhead.length; col ++) {
      if (!col || colhead[col][0] !== colhead[col - 1][0]) {
         if (col) {
            if (colspan > 1)
               th1.colSpan = colspan;
         }

         colspan = 1;

         th1 = document.createElement('th');
         th1.scope = 'col';
         th1.innerHTML = colhead[col][0];
         tr1.appendChild(th1);
      }
      else
         colspan ++;

      if (col === colhead.length - 1 && colspan > 1)
         th1.colSpan = colspan;

      th2 = document.createElement('th');
      th2.scope = 'col';
      th2.innerHTML = colhead[col][1];
      tr2.appendChild(th2);
   }

   var tbody = document.createElement('tbody');
   results.appendChild(tbody);
   var rowspan;

   for (var row = 0; row < rowhead.length; row ++) {
      var tr = document.createElement('tr');
      tbody.appendChild(tr);

      if (!row || rowhead[row][0] !== rowhead[row - 1][0]) {
         if (row) {
            if (rowspan > 1)
               th1.rowSpan = rowspan;
         }

         rowspan = 1;

         th1 = document.createElement('th');
         th1.scope = 'row';
         th1.innerHTML = rowhead[row][0];
         tr.appendChild(th1);
      }
      else
         rowspan ++;

      if (row === rowhead.length - 1 && rowspan > 1)
         th1.rowSpan = rowspan;         

      th2 = document.createElement('th');
      th2.scope = 'row';
      th2.innerHTML = rowhead[row][1];
      tr.appendChild(th2);

      for (var col = 0; col < colhead.length; col ++) {
         var td = document.createElement('td');
         tr.appendChild(td);

         var attackable = false;
         var multiplier = 1;
         var hp         = 0;
         var dps        = 0;
         var speed      = 0;
         var dpa        = 0;
         var htk        = '-';

         if (offense) {
            // Fixing rage spell effect on heroes -- only half as effective
            var tmpboost = boost;

            if (troopclass[col] === 'Hero')
               tmpboost = (boost - 1) / 2 + 1;

            attackable = (buildingtype[row] !== 'Trap');
            multiplier = (troopfavorite[col] === buildingtype[row] ||
               troopfavorite[col] === buildingname[row] ? troopmultiplier[col] : 1) * tmpboost;
            hp         = buildinghp[row];
            dps        = troopdps[col];
            speed      = troopattackspeed[col];
         }
         else {
            attackable = (trooptype[col] === 'Ground' ? buildingground[row] : buildingair[row]);
            multiplier = (buildingfavorite[row] === trooptype[col] ||
               buildingfavorite[row] === troopname[col] ? buildingmultiplier[row] : 1);
            hp         = troophp[col];
            dps        = buildingdps[row];
            speed      = buildingattackspeed[row];
         }

         if (attackable && dps && speed && multiplier)
            htk = calculateHitsToKill(hp, dps, speed, multiplier);

         td.innerHTML = htk;

         if (htk !== '-' && boost > 1)
            $(td).css({'background': 'rgb(255, ' + greenlvl + ', 255)'});
      }
   }

   $('#htk-comparator-results-table tr td, #htk-comparator-results-table tr th').css({'padding' : '0px 5px'});
   $(window).trigger('resize');

   function calculateHitsToKill(hp, dps, speed, multiplier) {
      if (typeof hp !== 'number' || dps <= 0 || multiplier <= 0)
         return '-';
      else if (hp <= 0 || speed <= 0)
         return 0;

      if (typeof dps === 'number' &&
          typeof speed === 'number' &&
          typeof multiplier === 'number')
         return Math.ceil(hp / (dps * speed * multiplier));

      var arrdps        = [];
      var arrspeed      = [];
      var arrmultiplier = [];
      var maxlen        = 0;
      var ssdps         = 0;
      var ssspeed       = 0;
      var ssmultiplier  = 0;

      if (typeof dps === 'string') {
         arrdps = dps.split('|');

         for (var i = 0; i < arrdps.length; i ++) {
            if (typeof arrdps[i] === 'string') {
               arrdps[i] = arrdps[i].split(':');

               for (var j = 0; j < arrdps[i].length; j ++)
                  arrdps[i][j] = Number(arrdps[i][j]);
            }
         }

         maxlen = arrdps.length;
         ssdps  = arrdps[arrdps.length - 1][1];
      }
      else
         ssdps = dps;

      if (typeof speed === 'string') {
         arrspeed = speed.split('|');

         for (var i = 0; i < arrspeed.length; i ++) {
            if (typeof arrspeed[i] === 'string') {
               arrspeed[i] = arrspeed[i].split(':');

               for (var j = 0; j < arrspeed[i].length; j ++)
                  arrspeed[i][j] = Number(arrspeed[i][j]);
            }
         }

         ssspeed = arrspeed[arrspeed.length - 1][1];

         if (arrspeed.length > maxlen)
            maxlen = arrspeed.length;
      }
      else
         ssspeed = speed;

      if (typeof multiplier === 'string') {
         arrmultiplier = multiplier.split('|');

         for (var i = 0; i < arrmultiplier.length; i ++) {
            if (typeof arrmultiplier[i] === 'string') {
               arrmultiplier[i] = arrmultiplier[i].split(':');

               for (var j = 0; j < arrmultiplier[i].length; j ++)
                  arrmultiplier[i][j] = Number(arrmultiplier[i][j]);
            }
         }

         ssmultiplier = arrmultiplier[arrmultiplier.length - 1][1];

         if (arrmultiplier.length > maxlen)
            maxlen = arrmultiplier.length;
      }
      else
         ssmultiplier = multiplier;

      var hits     = [];
      var interval = [];
      var damage   = [];

      for (var i = 1; i < maxlen; i ++) {
         var tmpdps, tmpspeed, tmpmultiplier, intervals;

         if (arrdps.length > 0) {
            tmpdps    = arrdps[i - 1][1];
            intervals = arrdps;
         }
         else
            tmpdps = dps;

         if (arrspeed.length > 0) {
            tmpspeed  = arrspeed[i - 1][1];
            intervals = arrspeed;
         }
         else
            tmpspeed = speed;

         if (arrmultiplier.length > 0) {
            tmpmultiplier = arrmultiplier[i - 1][1];
            intervals     = arrmultiplier;
         }
         else
            tmpmultiplier = multiplier;

         hits.push(Math.floor((intervals[i][0] - (i === 1 ? 0 : interval[i - 2])) / tmpspeed) + 1);
         interval.push((hits[hits.length - 1] - 1) * tmpspeed);
         damage.push(Math.round(tmpdps * tmpspeed * tmpmultiplier * hits[hits.length - 1] * 100) / 100);
      }

      var idx = 0;
      var dmg = hp;
      var htk = 0;

      while (idx < hits.length) {
         var tmpdps        = (arrdps.length        > 0 ? arrdps[idx][1]        : dps);
         var tmpspeed      = (arrspeed.length      > 0 ? arrspeed[idx][1]      : speed);
         var tmpmultiplier = (arrmultiplier.length > 0 ? arrmultiplier[idx][1] : multiplier);

         if (dmg < damage[idx])
            return htk + Math.ceil(dmg / (tmpdps * tmpspeed * tmpmultiplier));

         htk += hits[idx];
         dmg -= damage[idx];
         idx ++;
      }

      return htk + Math.ceil(dmg / (ssdps * ssspeed * ssmultiplier));
   }
}