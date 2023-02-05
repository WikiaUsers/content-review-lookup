function timeStamp_CumulativeCosts_js() {
   return "2014.07.07 12:18 (UTC-7)";
}

function populateCumulativeCosts() {
   if (wgPageName !== 'Gesamtkosten')
      return;

   var gold1      = createCumulativeCostsTable('buildings',  'gold');
   var gold2      = createCumulativeCostsTable('walls',      'gold');
   var elixir     = createCumulativeCostsTable('all',        'elixir');
   var darkelixir = createCumulativeCostsTable('all',        'dark elixir');
   var research   = createCumulativeCostsTable('laboratory', 'research');
   var time1      = createCumulativeCostsTable('buildings',  'time');
   var time2      = createCumulativeCostsTable('heroes',     'time');
   var gems       = createBuilderHutTable();

   // Cost totals table
   var tbl = document.getElementById('cumulative-costs-totals-cost');

   if (!tbl)
      return;

   tbl.className = 'article-table article-table-selected';
   $(tbl).css({
      'width':       '500px',
      'text-align':  'center',
      'white-space': 'nowrap',
   });

   tbl.innerHTML = '';

   // Header row
   var headers  = ['Gold', 'Elixir', 'Dark Elixir', 'Time', 'Gems', 'Cost'];
   var thLevels = buildingInfo('town hall', 'levels');

   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   tr.appendChild(th);

   for (var col = 0; col < headers.length; col ++) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.innerHTML = headers[col];
      tr.appendChild(th);
      $(th).css({'text-align': 'center'});
   }

   // Gems row
   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   th.innerHTML = 'Gems';
   tr.appendChild(th);

   for (var col = 0; col < headers.length; col ++) {
      var td = document.createElement('td');
      tr.appendChild(td);

      if (headers[col] === 'Gems')
         td.innerHTML = gems.format('#,##0');
      else if (headers[col] === 'Cost')
         td.innerHTML = doCalcGemToCash(gems).format('$#,##0.00');
      else
         td.innerHTML = '-';
   }

   // Data rows
   for (var lvl = 1; lvl <= thLevels; lvl ++) {
      var tr = document.createElement('tr');
      tbl.appendChild(tr);

      var th = document.createElement('th');
      th.scope = 'row';
      th.innerHTML = 'TH' + lvl;
      tr.appendChild(th);

      for (var col = 0; col < headers.length; col ++) {
         var td = document.createElement('td');
         tr.appendChild(td);

         var value = 0;

         switch (headers[col]) {
            case 'Gold':
               value = gold1[0][lvl] + gold2[0][lvl];
               td.innerHTML = (value ? value.format('#,##0') : '-');
               break;
            case 'Elixir':
               value = elixir[0][lvl];
               td.innerHTML = (value ? value.format('#,##0') : '-');
               break;
            case 'Dark Elixir':
               value = darkelixir[0][lvl];
               td.innerHTML = (value ? value.format('#,##0') : '-');
               break;
            case 'Time':
               value = research[0][lvl] + time1[0][lvl] + time2[0][lvl];
               td.innerHTML = (value ? formatDurationInSeconds(value) : '-');
               break;
            case 'Gems':
               value = doCalcResourceToGems(gold1[0][lvl] + gold2[0][lvl]) +
                  elixir[1][lvl] + darkelixir[1][lvl] + research[1][lvl] +
                  time1[1][lvl] + time2[1][lvl];
               td.innerHTML = (value ? value.format('#,##0') : '-');
               break;
            case 'Cost':
               value = doCalcResourceToGems(gold1[0][lvl] + gold2[0][lvl]) +
                  elixir[1][lvl] + darkelixir[1][lvl] + research[1][lvl] +
                  time1[1][lvl] + time2[1][lvl];
               td.innerHTML = (value ? doCalcGemToCash(value).format('$#,##0.00') : '-');
               break;
         }
      }
   }

   // Summary row
   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   th.innerHTML = 'Totals';
   tr.appendChild(th);
   $(th).css({
      'background-color': '#eee',
   });

   for (var col = 0; col < headers.length; col ++) {
      var td = document.createElement('td');
      tr.appendChild(td);
      $(td).css({
         'font-weight':      'bold',
         'background-color': '#eee',
      });
 
      var value = 0;

      switch (headers[col]) {
         case 'Gold':
            value = 
               gold1[0].reduce(function(a, b) { return a + b; }) +
               gold2[0].reduce(function(a, b) { return a + b; });
            td.innerHTML = (value ? value.format('#,##0') : '-');
            break;
         case 'Elixir':
            value = elixir[0].reduce(function(a, b) { return a + b; });
            td.innerHTML = (value ? value.format('#,##0') : '-');
            break;
         case 'Dark Elixir':
            value = darkelixir[0].reduce(function(a, b) { return a + b; });
            td.innerHTML = (value ? value.format('#,##0') : '-');
            break;
         case 'Time':
            value =
               research[0].reduce(function(a, b) { return a + b; }) +
               time1[0].reduce(function(a, b) { return a + b; }) +
               time2[0].reduce(function(a, b) { return a + b; });
            td.innerHTML = (value ? formatDurationInSeconds(value) : '-');
            break;
         case 'Gems':
            value = doCalcResourceToGems(gold1[0].reduce(function(a, b) { return a + b; }) +
               gold2[0].reduce(function(a, b) { return a + b; })) +
               elixir[1].reduce(function(a, b) { return a + b; }) +
               darkelixir[1].reduce(function(a, b) { return a + b; }) +
               research[1].reduce(function(a, b) { return a + b; }) +
               time1[1].reduce(function(a, b) { return a + b; }) +
               time2[1].reduce(function(a, b) { return a + b; });
            td.innerHTML = (value ? value.format('#,##0') : '-');
            break;
         case 'Cost':
            value = doCalcResourceToGems(gold1[0].reduce(function(a, b) { return a + b; }) +
               gold2[0].reduce(function(a, b) { return a + b; })) +
               elixir[1].reduce(function(a, b) { return a + b; }) +
               darkelixir[1].reduce(function(a, b) { return a + b; }) +
               research[1].reduce(function(a, b) { return a + b; }) +
               time1[1].reduce(function(a, b) { return a + b; }) +
               time2[1].reduce(function(a, b) { return a + b; });
            td.innerHTML = (value ? doCalcGemToCash(value).format('$#,##0.00') : '-');
            break;
      }
   }

   // Time totals table
   var tbl = document.getElementById('cumulative-costs-totals-time');

   if (!tbl)
      return;

   tbl.className = 'article-table article-table-selected';
   $(tbl).css({
      'width':       '500px',
      'text-align':  'center',
      'white-space': 'nowrap',
   });

   tbl.innerHTML = '';

   // Header row
   var builders = buildingInfo('builder\'s hut', 'upgrade cost', 1).split('|').length;

   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   tr.appendChild(th);

   // Start at 2, and include one more builder's hut than currently exists
   for (var col = 2; col <= builders + 1; col ++) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.innerHTML = col + ' Huts' + (col === builders + 1 ? '*' : '');
      tr.appendChild(th);
      $(th).css({'text-align': 'center'});
   }

   // Data rows
   var maxlab = buildingInfo('laboratory', 'levels');

   for (var lvl = 1; lvl <= thLevels; lvl ++) {
      var tr = document.createElement('tr');
      tbl.appendChild(tr);

      var th = document.createElement('th');
      th.scope = 'row';
      th.innerHTML = 'TH' + lvl;
      tr.appendChild(th);

      // Include lab upgrade time, because research can't start until it completes
      var labtime = 0;

      for (var i = maxlab; i >= 1; i --) {
         if (buildingInfo('laboratory', 'required town hall', i) <= lvl) {
            labtime = buildingInfo('laboratory', 'upgrade time', i) * 60;
            break;
         }
      }

      for (var col = 2; col <= builders + 1; col ++) {
         var td = document.createElement('td');
         tr.appendChild(td);

         var rsrch      = research[0][lvl] + labtime;
         var bldr       = (time1[0][lvl] + time2[0][lvl]) / col;
         var max        = (rsrch > bldr ? rsrch : bldr);
         var constraint = (rsrch > bldr ? 'research' : 'builder');

         td.innerHTML = formatDurationInSeconds(max);

         if (constraint === 'research')
            $(td).css({
               'font-style': 'italic',
               'color':      'red',
            });
      }
   }

   // Summary row
   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   th.innerHTML = 'Totals';
   tr.appendChild(th);
   $(th).css({
      'background-color': '#eee',
   });

   for (var col = 2; col <= builders + 1; col ++) {
      var td = document.createElement('td');
      tr.appendChild(td);
      $(td).css({
         'font-weight':      'bold',
         'background-color': '#eee',
      });

      var rsrch      = research[0].reduce(function(a, b) { return a + b; }) +
         buildingInfo('laboratory', 'upgrade time').reduce(function(a, b) { return a + b; }) * 60;
      var bldr       = (time1[0].reduce(function(a, b) { return a + b; }) +
         time2[0].reduce(function(a, b) { return a + b; })) / col;
      var max        = (rsrch > bldr ? rsrch : bldr);
      var constraint = (rsrch > bldr ? 'research' : 'builder');

      td.innerHTML = formatDurationInSeconds(max);

      if (constraint === 'research')
         $(td).css({
            'font-style': 'italic',
            'color':      'red',
         });
   }

   var note = document.createElement('p');
   note.innerHTML = '* A ' + (builders + 1) + 'th builder hut is not currently ' +
      'available in game. However, the idea of a ' + (builders + 1) + 'th hut is ' +
      'often brought up.';
   tbl.parentNode.insertBefore(note, tbl.nextSibling);

   // Update max gold/elixir and dark elixir fields
   var maxstorage = buildingInfo('gold storage', 'levels');
   var maxgold    = buildingInfo('gold storage', 'capacity', maxstorage)[0] *
      buildingInfo('gold storage', 'number available', thLevels) +
      buildingInfo('town hall', 'capacity', thLevels)[0];
   var gemcost    = doCalcResourceToGems(maxgold);

   var span = document.getElementById('max-gold-amount');

   if (span)
      span.innerHTML = maxgold.format('#,##0');

   var span = document.getElementById('max-gold-gem-cost');

   if (span)
      span.innerHTML = gemcost.format('#,##0');

   var maxstorage = buildingInfo('dark elixir storage', 'levels');
   var maxde      = buildingInfo('dark elixir storage', 'capacity', maxstorage)[2] *
      buildingInfo('dark elixir storage', 'number available', thLevels) +
      buildingInfo('town hall', 'capacity', thLevels)[2];
   var gemcost    = doCalcDarkElixirToGems(maxde);

   var span = document.getElementById('max-dark-elixir-amount');

   if (span)
      span.innerHTML = maxde.format('#,##0');

   var span = document.getElementById('max-dark-elixir-gem-cost');

   if (span)
      span.innerHTML = gemcost.format('#,##0');

   $(window).trigger('resize');
}

function createCumulativeCostsTable(tableType, resourceType) {
   var tbl = document.getElementById('cumulative-costs-' +
      resourceType.replace(/ /g, '-') + '-' + tableType);

   if (!tbl)
      return;

   tbl.innerHTML = '';

   var bList = [];
   var tList = [];
   var hList = [];
   var sList = [];

   var resource  = 0;
   var timeIncrs = [];

   // Set up the lists of what we'll create the table for
   if (tableType === 'buildings') {
     bList = buildingInfo('list');

     // Remove walls, they are in a separate table
     wIdx = bList.indexOf('Walls');

     if (wIdx >= 0)
        bList.splice(wIdx, 1);
   }
   else if (tableType === 'walls')
      bList = ['Walls'];
   else if (tableType === 'all') {
      bList = buildingInfo('list');

      if (resourceType === 'elixir') {
         tList = troopInfo('list', 'normal trainable');
         sList = spellInfo('list');
      }
      else {
         tList = troopInfo('list', 'dark trainable');
         hList = heroInfo('list');
      }
   }
   else if (tableType === 'laboratory') {
      tList = troopInfo('list', 'trainable');
      sList = spellInfo('list');
   }
   else if (tableType === 'heroes')
      hList = heroInfo('list');
   else
      return;

   // Get the appropriate resource type for buildings (defaults to gold)
   if (resourceType === 'elixir')
      resource = 1;
   else if (resourceType === 'dark elixir')
      resource = 2;
   else if (resourceType === 'research' || resourceType === 'time')
      resource = 'time';
      
   tbl.className = 'article-table article-table-selected';
   $(tbl).css({
      'width':       '500px',
      'text-align':  'center',
      'white-space': 'nowrap',
   });

   var tr = document.createElement('tr');
   tbl.appendChild(tr);
   var th = document.createElement('th');
   tr.appendChild(th);

   var thLevels = buildingInfo('town hall', 'levels');
   var thTotals = [];

   // Headers
   for (var i = 1; i <= thLevels; i ++) {
      var th = document.createElement('th');
      th.scope = 'col';
      th.innerHTML = i;
      $(th).css({'text-align': 'center'});
      tr.appendChild(th);
   }

   var th = document.createElement('th');
   th.scope = 'col';
   th.innerHTML = 'Total Per';
   $(th).css({'text-align': 'center'});
   tr.appendChild(th);

   var th = document.createElement('th');
   th.scope = 'col';
   th.innerHTML = 'Total';
   $(th).css({'text-align': 'center'});
   tr.appendChild(th);

   // Buildings
   for (var i = 0; i < bList.length; i ++) {
      // Ignore the Builder's Hut
      if (bList[i] === 'Builder\'s Hut')
         continue;

      var tr = document.createElement('tr');
      var th = document.createElement('th');
      th.scope='row';
      th.innerHTML = '<a href="/wiki/' + bList[i].replace(/ /g, '_') +
         '" title="' + bList[i] + '">' + bList[i] + '</a>';
      tr.appendChild(th);

      var cumulative = 0;
      var tmpTimeRow = [];

      for (var lvl = 1; lvl <= thLevels; lvl ++) {
         var num     = buildingInfo(bList[i], 'number available', lvl);
         var curr    = 0;
         var tmpTime = [];

         for (var j = 1; j <= buildingInfo(bList[i], 'levels'); j ++) {
            if (buildingInfo(bList[i], 'required town hall', j) <= lvl) {
               if (resource === 'time') {
                  var upgradeTime = buildingInfo(bList[i], 'upgrade time', j);

                  for (var k = 0; k < num; k ++) 
                     tmpTime.push(upgradeTime * 60);

                  curr += num * upgradeTime;
               }
               else
                  curr += num * buildingInfo(bList[i], 'upgrade cost', j)[resource];
            }
            else
               break;
         }

         var td = document.createElement('td');

         if (resource === 'time') {
            tmpTimeRow[lvl] = tmpTime;
            td.innerHTML = formatDurationInSeconds((curr - cumulative) * 60);
         }
         else
            td.innerHTML = (curr - cumulative).format('#,##0');

         tr.appendChild(td);

         if (typeof thTotals[lvl] === 'undefined')
            thTotals[lvl] = 0;

         if (resource === 'time')
            thTotals[lvl] += (curr - cumulative) * 60;
         else
            thTotals[lvl] += (curr - cumulative);

         cumulative     = curr;
      }

      if (resource === 'time') {
         // Shrink the tmpTimeRow array
         for (var lvl = thLevels; lvl >= 1; lvl --) {
            for (j = 0; typeof tmpTimeRow[lvl - 1] !== 'undefined' && j < tmpTimeRow[lvl - 1].length; j ++) {
               var idx = tmpTimeRow[lvl].indexOf(tmpTimeRow[lvl - 1][j]);

               if (idx > -1)
                  tmpTimeRow[lvl].splice(idx, 1);
            }
         }

         timeIncrs.push(tmpTimeRow);
      }

      if (cumulative) {
         var indiv = 0;

         for (var j = 1; j <= buildingInfo(bList[i], 'levels'); j ++) {
            if (resource === 'time')
               indiv += buildingInfo(bList[i], 'upgrade time', j);
            else
               indiv += buildingInfo(bList[i], 'upgrade cost', j)[resource];
         }

         var td = document.createElement('td');

         if (resource === 'time')
            td.innerHTML = formatDurationInSeconds(indiv * 60);
         else
            td.innerHTML = indiv.format('#,##0');

         tr.appendChild(td);

         var td = document.createElement('td');

         if (resource === 'time')
            td.innerHTML = formatDurationInSeconds(cumulative * 6);
         else
            td.innerHTML = cumulative.format('#,##0');

         tr.appendChild(td);
         tbl.appendChild(tr);
      }
   }

   // Troops
   for (var i = 0; i < tList.length; i ++) {
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      th.scope='row';
      th.innerHTML = '<a href="/wiki/' + tList[i].replace(/ /g, '_') +
         '" title="' + tList[i] + '">' + tList[i] + '</a>';
      tr.appendChild(th);

      var cumulative = 0;
      var maxTroopLevel = troopInfo(tList[i], 'levels');
      var tmpTimeRow = [];

      for (var lvl = 1; lvl <= thLevels; lvl ++) {
         var curr    = 0;
         var tmpTime = [];

         for (j = maxTroopLevel; j >= 1; j --) {
            var lab   = troopInfo(tList[i], 'laboratory level', j);
            var reqTH = buildingInfo('laboratory', 'required town hall', lab);

            if (reqTH <= lvl) {
               if (resource === 'time') {
                  var researchTime = troopInfo(tList[i], 'research time', j);
                  tmpTime.push(researchTime * 60 * 60);
                  curr += researchTime;
               }
               else
                  curr += troopInfo(tList[i], 'research cost', j);
            }
         }

         var td = document.createElement('td');

         if (resource === 'time') {
            tmpTimeRow[lvl] = tmpTime;
            td.innerHTML = formatDurationInSeconds((curr - cumulative) * 60 * 60);
         }
         else
            td.innerHTML = (curr - cumulative).format('#,##0');

         tr.appendChild(td);

         if (typeof thTotals[lvl] === 'undefined')
            thTotals[lvl]  = 0;

         if (resource === 'time')
            thTotals[lvl] += (curr - cumulative) * 60 * 60;
         else
            thTotals[lvl] += (curr - cumulative);

         cumulative = curr;
      }

      if (resource === 'time') {
         // Shrink the tmpTimeRow array
         for (var lvl = thLevels; lvl >= 1; lvl --) {
            if (typeof tmpTimeRow[lvl - 1] !== 'undefined' && tmpTimeRow[lvl - 1].length)
               tmpTimeRow[lvl] = tmpTimeRow[lvl].slice(0, -tmpTimeRow[lvl - 1].length);
         }

         timeIncrs.push(tmpTimeRow);
      }

      if (cumulative) {
         var indiv = 0;

         for (var j = 1; j <= troopInfo(tList[i], 'levels'); j ++) {
            if (resource === 'time')
               indiv += troopInfo(tList[i], 'research time', j);
            else
               indiv += troopInfo(tList[i], 'research cost', j);
         }

         var td = document.createElement('td');

         if (resource === 'time')
            td.innerHTML = formatDurationInSeconds(indiv * 60 * 60);
         else
            td.innerHTML = indiv.format('#,##0');

         tr.appendChild(td);

         var td = document.createElement('td');

         if (resource === 'time')
            td.innerHTML = formatDurationInSeconds(cumulative * 60 * 60);
         else
            td.innerHTML = cumulative.format('#,##0');

         tr.appendChild(td);
         tbl.appendChild(tr);
      }
   }

   // Heroes
   for (var i = 0; i < hList.length; i ++) {
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      th.scope='row';
      th.innerHTML = '<a href="/wiki/' + hList[i].replace(/ /g, '_') +
         '" title="' + hList[i] + '">' + hList[i] + '</a>';
      tr.appendChild(th);

      var cumulative = 0;
      var tmpTimeRow = [];

      for (var lvl = 1; lvl <= thLevels; lvl ++) {
         var curr    = 0;
         var tmpTime = [];

         for (var j = 1; j <= heroInfo(hList[i], 'levels'); j ++) {
            if (heroInfo(hList[i], 'required town hall', j) <= lvl) {
               if (resource === 'time') {
                  var trainingTime = heroInfo(hList[i], 'training time', j);
                  tmpTime.push(trainingTime * 60);
                  curr += trainingTime;
               }
               else
                  curr += num * heroInfo(hList[i], 'training cost', j);
            }
            else
               break;
         }

         var td = document.createElement('td');

         if (resource === 'time') {
            tmpTimeRow[lvl] = tmpTime;
            td.innerHTML = formatDurationInSeconds((curr - cumulative) * 60);
         }
         else
            td.innerHTML = (curr - cumulative).format('#,##0');

         tr.appendChild(td);

         if (typeof thTotals[lvl] === 'undefined')
            thTotals[lvl] = 0;

         if (resource === 'time')
            thTotals[lvl] += (curr - cumulative) * 60;
         else
            thTotals[lvl] += (curr - cumulative);

         cumulative     = curr;
      }

      if (resource === 'time') {
         // Shrink the tmpTimeRow array
         for (var lvl = thLevels; lvl >= 1; lvl --) {
            if (typeof tmpTimeRow[lvl - 1] !== 'undefined' && tmpTimeRow[lvl - 1].length)
               tmpTimeRow[lvl].splice(0, tmpTimeRow[lvl - 1].length);
         }

         timeIncrs.push(tmpTimeRow);
      }

      if (cumulative) {
         var indiv = 0;

         for (var j = 1; j <= heroInfo(hList[i], 'levels'); j ++) {
            if (resource === 'time')
               indiv += heroInfo(hList[i], 'training time', j);
            else
               indiv += heroInfo(hList[i], 'training cost', j);
         }

         var td = document.createElement('td');

         if (resource === 'time')
            td.innerHTML = formatDurationInSeconds(indiv * 60);
         else
            td.innerHTML = indiv.format('#,##0');

         tr.appendChild(td);

         var td = document.createElement('td');

         if (resource === 'time')
            td.innerHTML = formatDurationInSeconds(cumulative * 60);
         else
            td.innerHTML = cumulative.format('#,##0');

         tr.appendChild(td);
         tbl.appendChild(tr);
      }
   }

   // Spells
   for (var i = 0; i < sList.length; i ++) {
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      th.scope='row';
      th.innerHTML = '<a href="/wiki/' + (sList[i] + ' Spell').replace(/ /g, '_') +
         '" title="' + (sList[i] + ' Spell') + '">' + (sList[i] + ' Spell') + '</a>';
      tr.appendChild(th);

      var cumulative = 0;
      var maxSpellLevel = spellInfo(sList[i], 'levels');
      var tmpTimeRow = [];

      for (var lvl = 1; lvl <= thLevels; lvl ++) {
         var curr    = 0;
         var tmpTime = [];

         for (j = maxSpellLevel; j >= 1; j --) {
            var lab    = spellInfo(sList[i], 'laboratory level', j);
            var fact   = spellInfo(sList[i], 'spell factory', j);
            var labTH  = buildingInfo('laboratory', 'required town hall', lab);
            var factTH = buildingInfo('spell factory', 'required town hall', fact);

            if (labTH <= lvl && factTH <= lvl)
               if (resource === 'time') {
                  var researchTime = spellInfo(sList[i], 'research time', j);
                  tmpTime.push(researchTime * 60 * 60);
                  curr += researchTime;
               }
               else
                  curr += spellInfo(sList[i], 'research cost', j);
         }

         var td = document.createElement('td');

         if (resource === 'time') {
            tmpTimeRow[lvl] = tmpTime;
            td.innerHTML = formatDurationInSeconds((curr - cumulative) * 60 * 60);
         }
         else
            td.innerHTML = (curr - cumulative).format('#,##0');

         tr.appendChild(td);

         if (typeof thTotals[lvl] === 'undefined')
            thTotals[lvl] = 0;

         if (resource === 'time')
            thTotals[lvl] += (curr - cumulative) * 60 * 60;
         else
            thTotals[lvl] += (curr - cumulative);

         cumulative     = curr;
      }

      if (resource === 'time') {
         // Shrink the tmpTimeRow array
         for (var lvl = thLevels; lvl >= 1; lvl --) {
            if (typeof tmpTimeRow[lvl - 1] !== 'undefined' && tmpTimeRow[lvl - 1].length)
               tmpTimeRow[lvl] = tmpTimeRow[lvl].slice(0, -tmpTimeRow[lvl - 1].length);
         }

         timeIncrs.push(tmpTimeRow);
      }

      if (cumulative) {
         var indiv = 0;

         for (var j = 1; j <= spellInfo(sList[i], 'levels'); j ++) {
            if (resource === 'time')
               indiv += spellInfo(sList[i], 'research time', j);
            else
               indiv += spellInfo(sList[i], 'research cost', j);
         }

         var td = document.createElement('td');
         if (resource === 'time')
            td.innerHTML = formatDurationInSeconds(indiv * 60 * 60);
         else
            td.innerHTML = indiv.format('#,##0');

         tr.appendChild(td);

         var td = document.createElement('td');

         if (resource === 'time')
            td.innerHTML = formatDurationInSeconds(cumulative * 60 * 60);
         else
            td.innerHTML = cumulative.format('#,##0');

         tr.appendChild(td);
         tbl.appendChild(tr);
      }
   }

   // Summary row
   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   th.innerHTML = 'Total<br/><a href="/wiki/Gems" title="Gems">Gems</a><br/>Cost';
   tr.appendChild(th);

   var gemlist = [];

   for (var lvl = 1; lvl <= thLevels; lvl ++) {
      var total    = 0;
      gemlist[lvl] = 0;

      if (resource === 'time') {
         total = formatDurationInSeconds(thTotals[lvl]);

         for (var i = 0; i < timeIncrs.length; i ++) {
            for (var j = 0; j < timeIncrs[i][lvl].length; j ++)
               gemlist[lvl] += doCalcTimeToGems(timeIncrs[i][lvl][j]);
         }
      }
      else if (resourceType === 'dark elixir') {
         total        = thTotals[lvl].format('#,##0');
         gemlist[lvl] = doCalcDarkElixirToGems(thTotals[lvl]);
      }
      else {
         total        = thTotals[lvl].format('#,##0');
         gemlist[lvl] = doCalcResourceToGems(thTotals[lvl]);
      }

      var td = document.createElement('td');
      td.innerHTML = total + '<br/>' +
         (gemlist[lvl] ? gemlist[lvl].format('#,##0') : '-') + '<br/>' +
         (gemlist[lvl] ? doCalcGemToCash(gemlist[lvl]).format('$#,##0.00') : '-');
      tr.appendChild(td);
   }

   var td = document.createElement('td');
   tr.appendChild(td);

   var td       = document.createElement('td');
   var total    = thTotals.reduce(function(a, b) { return a + b; });
   var totalgem = 0;

   if (resource === 'time') {
      totalgem = gemlist.reduce(function(a, b) { return a + b; });
      total    = formatDurationInSeconds(total);
   }
   else {
      if (resourceType === 'dark elixir')
         totalgem = doCalcDarkElixirToGems(total);
      else
         totalgem = doCalcResourceToGems(total);

      total = total.format('#,##0');
   }

   td.innerHTML = total + '<br/>' +
      totalgem.format('#,##0') + '<br/>' +
      doCalcGemToCash(totalgem).format('$#,##0.00');
   tr.appendChild(td);

   // Delete any 0-total columns
   for (var lvl = thLevels; lvl >= 1; lvl --) {
      if (thTotals[lvl])
         continue;

      for (var i = 0; i < tbl.childElementCount; i ++)
         tbl.childNodes[i].removeChild(tbl.childNodes[i].childNodes[lvl]);
   }

   // Delete the 'Total Per' column if they all match the 'Total' column
   var nomatch   = false;
   var iTotalPer = tbl.childNodes[0].childElementCount - 2;
   var iTotal    = iTotalPer + 1;

   for (var i = 1; i < tbl.childElementCount - 1; i ++) {
      if (tbl.childNodes[i].childNodes[iTotalPer].innerHTML !== tbl.childNodes[i].childNodes[iTotal].innerHTML) {
         nomatch = true;
         break;
      }
   }

   if (!nomatch) {
      for (var i = 0; i < tbl.childElementCount; i ++)
         tbl.childNodes[i].removeChild(tbl.childNodes[i].childNodes[iTotalPer]);
   }

   // Simplify table if it's only one header row, one data row and one summary row
   if (tbl.childElementCount === 3) {
      // Move the 'total per' from data row to summary row
      var totalPer = tbl.childNodes[1].childNodes[tbl.childNodes[1].childElementCount - 2].innerHTML;
      totalPer     = Number(totalPer.split(',').join(''));
      totalPerGems = doCalcResourceToGems(totalPer);

      tbl.childNodes[2].childNodes[tbl.childNodes[2].childElementCount - 2].innerHTML = 
         totalPer.format('#,##0') + '<br/>' +
         totalPerGems.format('#,##0') + '<br/>' +
         doCalcGemToCash(totalPerGems).format('$#,##0.00');

      // Save row title
      var rowTitle = tbl.childNodes[1].childNodes[0].innerHTML;

      // Remove data row
      tbl.removeChild(tbl.childNodes[1]);

      //Insert column at the beginning
      for (var i = 0; i < tbl.childElementCount; i ++) {
         var th = document.createElement('th');
         th.scope = 'row';
         tbl.childNodes[i].insertBefore(th, tbl.childNodes[i].firstChild);

         if (i > 0)
            th.innerHTML = rowTitle;
      }
   }

   return [thTotals, gemlist];
}

function createBuilderHutTable() {
   var tbl = document.getElementById('cumulative-costs-builders');

   if (!tbl)
      return;

   var gems = buildingInfo('builder\'s hut', 'upgrade cost',
      1).split('|').reduce(function(a, b) { return Number(a) + Number(b); });
   var achievements = 8687;
   var startwith    = 500;

   tbl.innerHTML = '';
   tbl.className = 'article-table article-table-selected';
   $(tbl).css({
      'width':       '500px',
      'text-align':  'center',
      'white-space': 'nowrap',
   });

   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   tr.appendChild(th);

   var th = document.createElement('th');
   th.scope = 'col';
   th.innerHTML = '<a href="/wiki/Gems" title="Gems">Gems</a>';
   $(th).css({'text-align': 'center'});
   tr.appendChild(th);

   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   th.innerHTML = '<a href="/wiki/Builder\'s_Hut" title="Builder\'s Hut">Builder\'s Hut</a>';
   tr.appendChild(th);

   var td = document.createElement('td');
   td.innerHTML = gems.format('#,##0');
   tr.appendChild(td);

   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   th.innerHTML = 'Start With';
   tr.appendChild(th);

   var td = document.createElement('td');
   td.innerHTML = '(' + startwith.format('#,##0') + ')';
   tr.appendChild(td);

   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   th.innerHTML = 'Total';
   tr.appendChild(th);

   var td = document.createElement('td');
   td.innerHTML = (gems - startwith).format('#,##0');
   tr.appendChild(td);
   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   th.innerHTML = 'Available from <a href="/wiki/Achievements" title="Achievements">Achievements</a>';
   tr.appendChild(th);

   var td = document.createElement('td');
   td.innerHTML = '(' + achievements.format('#,##0') + ')';
   tr.appendChild(td);

   var tr = document.createElement('tr');
   tbl.appendChild(tr);

   var th = document.createElement('th');
   th.scope = 'row';
   th.innerHTML = (gems - achievements - startwith > 0 ? 'Required' : 'Surplus');
   tr.appendChild(th);

   var td = document.createElement('td');

   if (gems - achievements - startwith > 0)
      td.innerHTML = (gems - achievements - startwith).format('#,##0');
   else
      td.innerHTML = '(' + (achievements + startwith - gems).format('#,##0') + ')';

   tr.appendChild(td);

   return (gems - startwith);
}

function formatDurationInSeconds(duration) {
   var retVal  = '';
   var units   = [24 * 60 * 60, 60 * 60,  60,   1];
   var abbrevs = [         'd',     'h', 'm', 's'];

   for (var i = 0; i < units.length; i ++) {
      if (duration >= units[i]) {
         var qty   = Math.floor(duration / units[i]);
         retVal   += ' ' + qty.format('#,##0') + abbrevs[i];
         duration -= qty * units[i];
      }
   }

   return (retVal === '' ? '-' : retVal.trim());
}

addOnloadHook(populateCumulativeCosts);