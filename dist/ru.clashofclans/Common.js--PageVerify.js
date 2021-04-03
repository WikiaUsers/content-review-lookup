/* Any JavaScript here will be loaded for all users on every page load. */


function timeStamp_PageVerify_js() {
   return "2015.10.13 12:58 (UTC-7)";
}

$(function() {
   function markError(value, check, cell, description) {
      if (value !== check.toString()) {
         console.log('Inconsistency - ' + description);
         $(cell).css({'background': 'rgb(255,128,128)'}).append('<br/>[DB: ' + check + ']');
         return 1;
      }
      else if (window.enablePageVerify === 'full') {
         var color = new RGBColor($(cell).css('background-color'));

         if (color.ok)
            $(cell).css({'background-color': 'rgb(' + color.r + ', 255, ' + color.b + ')'});
         else
            $(cell).css({'background-color': 'rgb(240, 255, 240)'});
      }

      return 0;
   }

   function calculateDuration(num, unit, longFormat) {
      switch (unit) {
         case 'day':
            num *= 24;
         case 'hr':
            num *= 60;
         case 'min':
            num *= 60;
      }

      return formatDurationInSeconds(num, longFormat);
   }

   // If string passed is HTML, return innerHTML, else return the string
   function innerHTMLorString(str) {
      var div = document.createElement('div');
      div.innerHTML = str;
      var elem = div.childNodes[0];

      if (typeof elem !== 'undefined' && typeof elem.tagName !== 'undefined')
         return elem.innerHTML;
      else
         return str;
   }

   // If string passed is a link (<a>), return title, else return the string
   function linkTitleorString(str) {
      var div = document.createElement('div');
      div.innerHTML = str;
      var elem = $(div).find('> a')[0];

      if (typeof elem !== 'undefined' && typeof elem.tagName !== 'undefined')
         return elem.title;
      else
         return str;
   }
   
   // If string passed contains links (<a>), replace them with the innerHTML
   function linkInnerHTMLorString(str) {
      var div = document.createElement('div');
      div.innerHTML = str;

      $(div).find('> a').each(function() {
         div.innerHTML = div.innerHTML.replace($('<div>').append($(this).clone()).html(),
            $(this).text());
      });
      
      return div.innerHTML;
   }
   
   // Function to (completely) remove links from HTML string
   function removeLinks(str) {
      var div = document.createElement('div');
      div.innerHTML = str;
      $(div).find('a').remove();
      return $(div).html().trim();
   }

   if (typeof(window.enablePageVerify) === 'undefined' || !window.enablePageVerify)
      return;
 
   var page           = wgTitle.replace(/["' ]/g,'').toLowerCase().split('/').pop(),
       namespace      = wgCanonicalNamespace,
       troopTables    = $('.troop-statistics-table').length,
       heroTables     = $('.hero-statistics-table').length,
       abilTables     = $('.ability-statistics-table').length,
       buildingTables = $('.building-statistics-table').length,
       hutTables      = $('.builders-hut-statistics-table').length,
       spellTables    = $('.spell-statistics-table').length,
       numTables      = troopTables + heroTables + abilTables + buildingTables + hutTables + spellTables;

   if (namespace !== '' || numTables < 1)
      return;

   var errors = 0;

   if (troopTables > 0)
      errors += verifyTroopTables();

   if (heroTables > 0)
      errors += verifyHeroTables();

   if (abilTables > 0)
      errors += verifyAbilityTables();

   if (buildingTables > 0)
      errors += verifyBuildingTables();

   if (hutTables > 0)
      errors += verifyBuildersHutTables();

   if (spellTables > 0)
      errors += verifySpellTables();

   var checkbox = '';

   if (errors > 0)
      checkbox = '\
         <span style="font-size: 24px; font-weight: bold; color: red;">DB\
         <img src="https://images.wikia.nocookie.net/__cb20140618020419/clashofclans/images/thumb/4/4b/Xmark.svg/20px-Xmark.svg.png"\
         alt="Xmark" class="" data-image-key="Xmark.svg" data-image-name="Xmark.svg" height="23" width="20"></span>';
   else
      checkbox = '\
         <span style="font-size: 24px; font-weight: bold; color: green;">DB\
         <img src="https://images.wikia.nocookie.net/__cb20140618020304/clashofclans/images/thumb/3/30/Yescheck.svg/20px-Yescheck.svg.png"\
         alt="Yescheck" class="" data-image-key="Yescheck.svg" data-image-name="Yescheck.svg" height="20" width="20"></span>';

   $('.wikia-button.comments.secondary').after(checkbox);

   function verifyTroopTables() {
      var errs = 0;
      var lvl;

      for (var tIdx = 1; tIdx <= troopTables; tIdx ++) {
         var table   = $('#' + page.replace(/\./g, '') + '-table-' + tIdx),
             columns = table.find('th');
             rows    = table.find('tr:not(:first)');

         $.each(rows, function(rIdx, row) {
            lvl = rIdx + 1;

            $.each(columns, function(cIdx, col) {
               var data = $(col).attr('data-type');

               if (data === undefined)
                  return true;

               var value = $(row).find('td:eq(' + cIdx + ')').html().trim();
               var check;

               switch (data) {
                  case 'level':
                     check = lvl;
                     break;
                  case 'attack type':
                     var splash  = troopInfo(page, 'splash radius');
                     var ground  = troopInfo(page, 'ground attack');
                     var air     = troopInfo(page, 'air attack');
                     var hground = troopInfo(page, 'ground heal');
                     var hair    = troopInfo(page, 'air heal');

                     if ((hground || hair) && splash > 0)
                        check = 'Heal Splash ' + splash + '&nbsp;Tile Radius';
                     else if (splash >= 0)
                        check = 'Area Splash ' + splash + '&nbsp;Tile Radius';
                     else if (troopInfo(page, 'range') <= 1)
                        check = 'Melee';
                     else
                        check = 'Ranged';

                     if ((ground && air) || (hground && hair))
                        check += ' (Ground&nbsp;&amp;&nbsp;Air)';
                     else if (air || hair)
                        check += ' (Air&nbsp;Only)';
                     else if (ground || hground)
                        check += ' (Ground&nbsp;Only)';
                     else
                        check += ' (None)';

                     // Replace non-breaking spaces with regular spaces for check purposes
                     check = check.replace(/&nbsp;/g, ' ');
                     value = value.replace(/&nbsp;/g, ' ');
                     break;
                  default:
                     check = troopInfo(page, data, lvl);

                     if (check === undefined)
                        check = 'UNDEFINED';

                     switch (data) {
                        case 'subtroops':
                           var max = troopInfo(page, 'max subtroops', lvl);
                           
                           if (max > check)
                              check += ' (Limit ' + max + ')';
                              
                           break;
                        case 'subtroop cooldown':
                           if (!isNaN(check))
                              check += 's';

                           break;
                        case 'attack speed':
                           check += 's';
                           break;
                        case 'training time':
                           check = calculateDuration(check, 'sec');
                           break;
                        case 'research time':
                           if (check === 0)
                              check = 'N/A';
                           else
                              check = calculateDuration(check, 'hr', true);
                           break;
                        case 'research cost':
                           if (check === 0)
                              check = 'N/A';
                           else if (!isNaN(check))
                              check = check.format('#,##0[.]##');
                           break;
                        case 'laboratory level':
                           if (check === 0)
                              check = 'N/A';
                           break;
                        case 'death range':
                        case 'range':
                           check += ' tile' + (check === 1 ? '' : 's');
                           break;
                        case 'dps-preferred':
                           check = troopInfo(page, 'dps', lvl) * troopInfo(page, 'multiplier');

                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');

                           break;
                        case 'dpa':
                           check = troopInfo(page, 'dps', lvl) * troopInfo(page, 'attack speed', lvl);

                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');

                           break;
                        case 'hpa':
                           check = troopInfo(page, 'hps', lvl) * troopInfo(page, 'attack speed', lvl);

                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');

                           break;
                        case 'preferred target':
                           var damvalue = '',
                               damcheck = '',
                               tmpvalue = value,
                               tmpcheck = check,
                               mult     = troopInfo(page, 'multiplier');

                           // Check for damage string
                           if (tmpvalue.substr(-1) === ')' && tmpvalue.indexOf('(') > -1) {
                              damvalue = tmpvalue.substring(tmpvalue.lastIndexOf('(') + 1, tmpvalue.length - 1);
                              tmpvalue = tmpvalue.substring(0, tmpvalue.lastIndexOf('(')).replace(/&nbsp;/g, ' ').trim();
                           }

                           if (mult > 1)
                              damcheck = ' (Damage x' + mult + ')';

                           // Replace any link with the innerHTML
                           value = innerHTMLorString(tmpvalue) + (damvalue.length > 0 ? ' (' + damvalue + ')' : '');
                           value = value.replace(/&nbsp;/g, ' ');

                           check = tmpcheck + damcheck;
                           break;
                        default:
                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');
                     }
               }

               errs += markError(value, check,
                  $(row).find('td:eq(' + cIdx + ')'),
                  'row ' + lvl + ': ' + data + ' = "' + value + '", check = "' + check + '"');
            });
         });
      }

      if (lvl !== troopInfo(page, "levels")) {
         console.log('Inconsistency - ' + lvl + ' levels listed, database shows ' + troopInfo(page, "levels"));
         errs ++;
      }

      return errs;
   }

   function verifyHeroTables() {
      var errs = 0;
      var lvl;

      for (var hIdx = 1; hIdx <= heroTables; hIdx ++) {
         var table   = $('#' + page + '-table-' + hIdx),
             columns = table.find('th');
             rows    = table.find('tr:not(:first)');

         $.each(rows, function(rIdx, row) {
            lvl = rIdx + 1;

            $.each(columns, function(cIdx, col) {
               var data = $(col).attr('data-type');

               if (data === undefined)
                  return true;

               var value = $(row).find('td:eq(' + cIdx + ')').html().trim();
               var check;

               switch (data) {
                  case 'level':
                     check = lvl;
                     break;
                  case 'attack type':
                     var splash = heroInfo(page, 'splash radius');

                     if (splash >= 0)
                        check = 'Area Splash ' + splash + '&nbsp;Tile Radius';
                     else if (heroInfo(page, 'range') <= 1)
                        check = 'Melee';
                     else
                        check = 'Ranged';

                     var ground = heroInfo(page, 'ground attack');
                     var air    = heroInfo(page, 'air attack');

                     if (ground && air)
                        check += ' (Ground&nbsp;&amp;&nbsp;Air)';
                     else if (air)
                        check += ' (Air&nbsp;Only)';
                     else
                        check += ' (Ground&nbsp;Only)';

                     break;
                  default:
                     check = heroInfo(page, data, lvl);

                     if (check === undefined)
                        check = 'UNDEFINED';

                     switch (data) {
                        case 'attack speed':
                           check += 's';
                           break;
                        case 'training time':
                           if (check === 0)
                              check = 'N/A';
                           else
                              check = calculateDuration(check, 'min');

                           break;
                        case 'regeneration time':
                           if (check === 0)
                              check = 'N/A';
                           else
                              check = calculateDuration(check, 'min');
                           break;
                        case 'research time':
                           if (check === 0)
                              check = 'N/A';
                           else
                              check = calculateDuration(check, 'hr', true);
                           break;
                        case 'research cost':
                           if (check === 0)
                              check = 'N/A';
                           else if (!isNaN(check))
                              check = check.format('#,##0[.]##');
                           break;
                        case 'ability level':
                        case 'laboratory level':
                           if (check === 0)
                              check = 'N/A';
                           break;
                        case 'search radius':
                        case 'range':
                           check += ' tile' + (check === 1 ? '' : 's');
                           break;
                        case 'dpa':
                           check = heroInfo(page, 'dps', lvl) * heroInfo(page, 'attack speed', lvl);

                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');

                           break;
                        case 'dps in ability':
                           var abil    = heroInfo(page, 'ability'),
                               abilLvl = heroInfo(page, 'ability level', lvl),
                               dps     = heroInfo(page, 'dps', lvl),
                               incr    = (abilLvl > 0 ? abilityInfo(abil, 'damage increase', abilLvl) : 0);

                           check = (incr > 0 ? dps + incr : 'N/A');

                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');

                           break;
                        default:
                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');
                     }
               }

               errs += markError(value, check,
                  $(row).find('td:eq(' + cIdx + ')'),
                  'row ' + lvl + ': ' + data + ' = "' + value + '", check = "' + check + '"');
            });
         });
      }

      if (lvl !== heroInfo(page, "levels")) {
         console.log('Inconsistency - ' + lvl + ' levels listed, database shows ' + heroInfo(page, "levels"));
         errs ++;
      }

      return errs;
   }

   function verifyAbilityTables() {
      var abil = heroInfo(page, 'ability');
      var errs = 0;
      var lvl;

      for (var aIdx = 1; aIdx <= abilTables; aIdx ++) {
         var table   = $('#' + page + '-table-' + (heroTables + aIdx)),
             columns = table.find('th');
             rows    = table.find('tr:not(:first)');

         $.each(rows, function(rIdx, row) {
            lvl = rIdx + 1;

            $.each(columns, function(cIdx, col) {
               var data = $(col).attr('data-type');

               if (data === undefined)
                  return true;

               var value = $(row).find('td:eq(' + cIdx + ')').html().trim();
               var check;

               switch (data) {
                  case 'level':
                     check = lvl;
                     break;
                  default:
                     check = abilityInfo(abil, data, lvl);

                     if (check === undefined)
                        check = 'UNDEFINED';

                     switch (data) {
                        case 'ability time':
                           if (!isNaN(check) && check < 10)
                              check = check.format('0[.]0');

                           check += 's';
                           break;
                        default:
                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');
                     }
               }

               errs += markError(value, check,
                  $(row).find('td:eq(' + cIdx + ')'),
                  'row ' + lvl + ': ' + data + ' = "' + value + '", check = "' + check + '"');
            });
         });
      }

      if (lvl !== abilityInfo(abil, "levels")) {
         console.log('Inconsistency - ' + lvl + ' levels listed, database shows ' + abilityInfo(page, "levels"));
         errs ++;
      }

      return errs;
   }

   function verifyBuildingTables() {
      var errs = 0;
      var lvl, max;

      // Verify number available
      var na = $('#number-available-table');

      if (na.length > 0) {
         var row  = na.find('#number-available-data-row'),
             vals = row.find('td');

         $.each(vals, function(tIdx) {
            var thLevel = tIdx + 1,
                data    = $(this).html().trim(),
                check   = buildingInfo(page, 'number available', thLevel);

            errs += markError(data, check,
               $(this),
               'number available TH' + thLevel + ': source = "' + data + '", check = "' + check + '"');
         });
      }

      // Verify building size
      var bs = $('#building-size-table');

      if (bs.length > 0) {
         var val = bs.find('#building-size-value'),
             data = $(val).html().trim(),
             check = buildingInfo(page, 'size');

         errs += markError(data, check,
            $(val),
            'building size: source = "' + data + '", check = "' + check + '"');
      }

      // Verify laboratory upgrade tables
      var lu = $('#laboratory-upgrade-chart-elixir');
      
      if (lu.length > 0)
         errs += verifyLaboratoryTable(lu, 'normal');

      lu = $('#laboratory-upgrade-chart-darkelixir');
      
      if (lu.length > 0)
         errs += verifyLaboratoryTable(lu, 'dark');

      // Verify town hall tables
      var th = $('#townhall-max-buildings-table1');

      if (th.length > 0)
         errs += verifyTownHallTable(th, 'number');
         
      th = $('#townhall-max-buildings-table2');

      if (th.length > 0)
         errs += verifyTownHallTable(th, 'number');
         
      th = $('#townhall-max-level-table1');

      if (th.length > 0)
         errs += verifyTownHallTable(th, 'level');
         
      th = $('#townhall-max-level-table2');

      if (th.length > 0)
         errs += verifyTownHallTable(th, 'level');
         
      // Verify remaining tables
      for (var bIdx = 1; bIdx <= buildingTables; bIdx ++) {
         var table   = $('#' + page + '-table-' + bIdx),
             columns = table.find('th').clone();
             rows    = table.find('tr:not(:first)');

         // If we've got a complex table header, re-order it to make it simple
         var maxSpan = 1;

         // Calculate max span
         $.each(columns, function(cIdx, col) {
            if ($(this)[0].rowSpan > maxSpan)
               maxSpan = $(this)[0].rowSpan;
         });

         // If we've got maxSpan > 1, remove (maxSpan - 1) rows from the top
         if (maxSpan > 1) {
            for (var i = 1; i < maxSpan; i ++)
               rows = rows.filter('tr:not(:first)');

            var maincols = columns.clone().filter(function(idx) {
               return $(this)[0].rowSpan > 1 || $(this)[0].colSpan > 1;
            });

            var subcols = columns.clone().filter(function(idx) {
               return $(this)[0].rowSpan === 1 && $(this)[0].colSpan === 1;
            });

            // Create new 'column list' in the appropriate order
            var tr = document.createElement('tr');
            var idx = 0;

            $.each(maincols, function(cIdx, col) {
               if (col.colSpan > 1) {
                  for (i = 1; i <= col.colSpan; i ++) {
                     var th = document.createElement('th');
                     $(th).attr('data-type', $(subcols[idx]).attr('data-type'));
                     tr.appendChild(th);
                     idx ++;
                  }
               }
               else {
                  var th = document.createElement('th');
                  $(th).attr('data-type', $(col).attr('data-type'));
                  tr.appendChild(th);
               }
            });

            columns = $(tr).find('th');
         }

         $.each(rows, function(rIdx, row) {
            var mode;

            // If we're in the second table, multiple rows are for each mode, not level
            if (bIdx === 2 && Array.isArray(buildingInfo(page, 'modes'))) {
               mode = rIdx;
               lvl  = 1;
            }
            else
               lvl = rIdx + 1;

            if (typeof max === 'undefined' || lvl > max)
               max = lvl;

            $.each(columns, function(cIdx, col) {
               var data = $(col).attr('data-type');

               if (data === undefined)
                  return true;

               var value = $(row).find('td:eq(' + cIdx + ')').html().trim();
               var check, tmode, secs;

               // If we've run into a 'modeX-' format, grab the mode information and save the rest
               if (data.substring(0, 4) === 'mode') {
                  var tmp = data.substring(4, data.indexOf('-'));

                  if (!isNaN(tmp)) {
                     tmode = Number(tmp);
                     data = data.substring(data.indexOf('-') + 1);

                     if (data.substring(0, 3) === 'dps') {
                        tmp = data.substring(4, data.indexOf('-') + 2)

                        if (!isNaN(tmp)) {
                           secs = Number(tmp);
                           data = 'dps';
                        }
                     }
                  }
               }

               switch (data) {
                  case 'level':
                     check = lvl;
                     break;
                  case 'target type':
                     var ground = buildingInfo(page, 'ground attack');
                     var air    = buildingInfo(page, 'air attack');

                     if (typeof mode !== 'undefined') {
                        if (Array.isArray(ground))
                           ground = ground[mode];

                        if (Array.isArray(air))
                           air = air[mode];
                     }

                     if (ground && air)
                        check = 'Ground&nbsp;&amp;&nbsp;Air';
                     else if (air)
                        check = 'Air';
                     else
                        check = 'Ground';

                     // Replace non-breaking spaces with regular spaces for check purposes
                     check = check.replace(/&nbsp;/g, ' ');
                     value = value.replace(/&nbsp;/g, ' ');
                     break;
                  case 'damage type':
                     var splash  = buildingInfo(page, 'splash radius', lvl);
                     var targets = buildingInfo(page, 'number of targets');

                     if (typeof mode !== 'undefined') {
                        if (Array.isArray(splash))
                           splash = splash[mode];

                        if (Array.isArray(targets))
                           targets = targets[mode];
                     }

                     if (splash >= 0 && buildingInfo(page, 'type') === 'Trap')
                        check = 'Area Splash';
                     else if (targets === 0)
                        check = 'None (Knockback Only)';
                     else if (splash >= 0)
                        check = 'Splash - ' + splash + '&nbsp;tile' + (splash === 1 ? '' : 's');
                     else if (targets > 1)
                        check = 'Multiple Targets';
                     else
                        check = 'Single Target';

                     // Replace non-breaking spaces with regular spaces for check purposes
                     check = check.replace(/&nbsp;/g, ' ');
                     value = value.replace(/&nbsp;/g, ' ');
                     break;
                  case 'upgrade cost gold':
                  case 'upgrade cost elixir':
                     var resource = 0; // Default to gold

                     if (data.substr(-6) === 'elixir')
                        resource = 1;

                     check = buildingInfo(page, 'upgrade cost', lvl)[resource];

                     if (check === 0)
                        check = 'N/A';
                     else if (!isNaN(check))
                        check = check.format('#,##0[.]##');

                     break;
                  case 'cumulative cost gold':
                  case 'cumulative cost elixir':
                     var resource   = 0, // Default to gold
                         cumulative = 0;

                     if (data.substr(-6) === 'elixir')
                        resource = 1;

                     for (var i = 1; i <= lvl; i ++)
                        cumulative += buildingInfo(page, 'upgrade cost', i)[resource];

                     check = cumulative;

                     if (check === 0)
                        check = 'N/A';
                     else if (!isNaN(check))
                        check = check.format('#,##0[.]##');

                     break;
                  case 'capacity gold':
                  case 'capacity elixir':
                  case 'capacity dark elixir':
                     var resource   = 0; // Default to gold

                     if (data.substr(-11) === 'dark elixir')
                        resource = 2;
                     else if (data.substr(-6) === 'elixir')
                        resource = 1;

                     check = buildingInfo(page, 'capacity', lvl)[resource];

                     if (check === 0)
                        check = 'N/A';
                     else if (!isNaN(check))
                        check = check.format('#,##0[.]##');

                     break;
                  case 'time to fill':
                     var cap  = buildingInfo(page, 'capacity', lvl),
                         prod = buildingInfo(page, 'production', lvl);
                     
                     if (Array.isArray(cap))
                        cap = cap.reduce(function(a, b) { return a + b; });

                     if (Array.isArray(prod))
                        prod = prod.reduce(function(a, b) { return a + b; });

                     if (prod < 0)
                        check = 'N/A';
                     else
                        check = calculateDuration(cap / prod, 'hr');

                     break;
                  case 'catch-up point':
                     var upgradetime = buildingInfo(page, 'upgrade time', lvl),
                         oldprod     = buildingInfo(page, 'production', lvl - 1),
                         newprod     = buildingInfo(page, 'production', lvl);

                     if (typeof oldprod === 'undefined')
                        check = 'N/A';
                     else {
                        if (Array.isArray(oldprod))
                           oldprod = oldprod.reduce(function(a, b) { return a + b; });

                        if (Array.isArray(newprod))
                           newprod = newprod.reduce(function(a, b) { return a + b; });

                        if (oldprod === newprod)
                           check = 'N/A';
                        else
                           check = calculateDuration((oldprod * upgradetime) / (newprod - oldprod) / 3600, 'hr');
                     }
                     break;
                  case 'unlocked unit':
                     var troopList = [],
                         unlock    = [];
                     
                     if (page === 'barbariankingaltar')
                        check = 'Barbarian King';
                     else if (page === 'archerqueenaltar')
                        check = 'Archer Queen';
                     else if (page === 'darkbarracks')
                        troopList = troopInfo('list', 'dark trainable');
                     else
                        troopList = troopInfo('list', 'normal trainable');

                     if (troopList.length > 0) {
                        for (var i = 0; i < troopList.length; i ++)
                           unlock[troopInfo(troopList[i], 'barracks level')] = troopList[i];

                        check = unlock[lvl];
                     }
                     
                     if (typeof check === 'undefined')
                        check = 'N/A';
                        
                     // Replace any link with the innerHTML
                     value = innerHTMLorString(value).replace(/&nbsp;/g, ' ');
                     break;
                  case 'unlocked spell':
                     var spellList = [],
                         unlock    = [];
                     
                     if (page === 'spellfactory')
                        spellList = spellInfo('list', 'normal available');
                     else if (page === 'darkspellfactory')
                        spellList = spellInfo('list', 'dark available');
                        
                     for (var i = 0; i < spellList.length; i ++) {
                        if (typeof unlock[spellInfo(spellList[i], 'spell factory')] === 'undefined')
                           unlock[spellInfo(spellList[i], 'spell factory')] = [];
                        
                        unlock[spellInfo(spellList[i], 'spell factory')].push(spellList[i] + ' Spell');
                     }

                     check = unlock[lvl].join(', ');
                     
                     if (typeof check === 'undefined')
                        check = 'N/A';
                        
                     // Replace any link with the innerHTML
                     value = innerHTMLorString(value).replace(/&nbsp;/g, ' ');
                     break;
                  case 'max buildings':
                     var bldgs = buildingInfo('list'),
                         check = 0;
                     
                     for (var i = 0; i < bldgs.length; i ++) {
                        if (bldgs[i] === 'Walls' || buildingInfo(bldgs[i], 'hitpoints', 1) < 1)
                           continue;

                        check += buildingInfo('number available', bldgs[i], lvl);
                     }

                     break;
                  default:
                     check = buildingInfo(page, data, lvl);

                     // Check both types of modes
                     if (typeof mode !== 'undefined') {
                        if (Array.isArray(check))
                           check = check[mode];
                     }

                     if (typeof tmode !== 'undefined') {
                        if (Array.isArray(check))
                           check = check[tmode];
                     }

                     if (check === undefined)
                        check = 'UNDEFINED';

                     switch (data) {
                        case 'dps':
                           if (typeof secs !== 'undefined') {
                              var tmp1 = check.split('|'),
                                  tmp2 = [];

                              for (var i = 0; i < tmp1.length; i ++) {
                                  var tmp3 = tmp1[i].split(':');
                                  tmp2[tmp3[0]] = Number(tmp3[1]);
                              }

                              check = tmp2[secs];
                           }

                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');

                           break;
                        case 'range':
                           var minimum = buildingInfo(page, 'minimum range')
                           var trigger = buildingInfo(page, 'trigger range');

                           if (minimum > 0)
                              check = minimum + '-' + check;
                              
                           if (trigger > 0)
                              check = trigger + ' then ' + check;

                           break;
                        case 'splash radius':
                        case 'trigger range':
                           check += ' tile' + (check === 1 ? '' : 's');
                           break;
                        case 'push strength':
                           var tiles = ' tile' + (check === 1 ? '' : 's');

                           if (!isNaN(check) && check < 10)
                              check = check.format('0[.]0');

                           check += tiles;
                           break;
                        case 'attack speed':
                           if (check === 0)
                              check = 'Constant';
                           else
                              check += 's';

                           break;
                        case 'upgrade time':
                           if (check === 0)
                              check = 'N/A';
                           else if (buildingInfo(page, 'type') === 'Resource')
                              check = calculateDuration(check, 'sec');
                           else
                              check = calculateDuration(check, 'sec', true);
                           break;
                        case 'rearm cost':
                        case 'upgrade cost':
                        case 'capacity':
                        case 'production':
                           var currency = 'gold';

                           if (Array.isArray(check)) {
                              if (check[0] > 0 && check[1] > 0 && check[2] > 0)
                                 currency = 'gold, elixir & dark elixir';
                              else if (check[0] > 0 && check[1] > 0)
                                 currency = 'gold & elixir';
                              else if (check[0] > 0 && check[2] > 0)
                                 currency = 'gold & dark elixir';
                              else if (check[1] > 0 && check[2] > 0)
                                 currency = 'elixir & dark elixir';
                              else if (check[1] > 0)
                                 currency = 'elixir';
                              else if (check[2] > 0)
                                 currency = 'dark elixir';

                              // Just get an overall sum for now
                              check = check.reduce(function(a, b) { return a + b; });
                           }

                           // For the altars, use the level 1 hero cost for verification purposes
                           if (page === 'barbariankingaltar')
                              check = heroInfo('barbarian king', 'training cost', 1);
                           else if (page === 'archerqueenaltar')
                              check = heroInfo('archer queen', 'training cost', 1);
                              
                           if (check === 0)
                              check = 'N/A';
                           else if (!isNaN(check))
                              check = check.format('#,##0[.]##');

                           if (data === 'production')
                              check += '/hr';

                           break;
                        case 'dpa':
                           check = buildingInfo(page, 'dps', lvl) * buildingInfo(page, 'attack speed', lvl);

                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');

                           break;
                        case 'experience gained':
                           check = experienceGained(buildingInfo(page, 'upgrade time', lvl));

                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');

                           break;
                        case 'preferred target':
                           var damvalue = '',
                               damcheck = '',
                               tmpvalue = value,
                               tmpcheck = check,
                               mult     = buildingInfo(page, 'multiplier');

                           // Check for damage string
                           if (tmpvalue.substr(-1) === ')' && tmpvalue.indexOf('(') > -1) {
                              damvalue = tmpvalue.substring(tmpvalue.lastIndexOf('(') + 1, tmpvalue.length - 1);
                              tmpvalue = tmpvalue.substring(0, tmpvalue.lastIndexOf('(')).replace(/&nbsp;/g, ' ').trim();
                           }

                           if (mult > 1)
                              damcheck = ' (Damage x' + mult + ')';

                           // Replace any link with the innerHTML
                           value = innerHTMLorString(tmpvalue) + (damvalue.length > 0 ? ' (' + damvalue + ')' : '');
                           value = value.replace(/&nbsp;/g, ' ');

                           check = tmpcheck + damcheck;
                           break;
                        case 'boost cost':
                           if (check < 0)
                              check = 'N/A';

                           break;
                        default:
                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');
                     }
               }

               errs += markError(value, check,
                  $(row).find('td:eq(' + cIdx + ')'),
                  'row ' + lvl + ': ' + data + ' = "' + value + '", check = "' + check + '"');
            });
         });
      }

      if (max !== buildingInfo(page, "levels")) {
         console.log('Inconsistency - ' + max + ' levels listed, database shows ' + buildingInfo(page, "levels"));
         errs ++;
      }

      return errs;
   }

   function verifyLaboratoryTable(table, resource) {
      var errs = 0,
          lvl,
          rowheaders = table.find('th.rowheader'),
          colheaders = table.find('th.colheader');

      $.each(rowheaders, function(rIdx, row) {
         var unit    = innerHTMLorString($(row).html().trim()),
             rowspan = $(row).attr("rowspan");

         if (!isNaN(rowspan))
            rowspan = Number(rowspan);
         else
            rowspan = 1;

         var rows = $(row).parent(),
             next = $(row).parent();

         for (var i = 1; i < rowspan; i ++) {
            next = next.next();
            rows = rows.add(next);
         }

         var tmp       = $(rows).find('th:not(.rowheader)'),
             datatypes = [];

         for (var i = 0; i < tmp.length; i ++)
            datatypes[i] = $(tmp[i]).attr('data-type');

         $.each(colheaders, function(cIdx, col) {
            var tmp = $(col).html().trim();
            
            if (tmp.substr(0, 6) === 'Level ')
               lvl = Number(tmp.substr(6).trim());
            else
               return true;

            $.each(rows, function(idx, r) {
               var value = $(r).find('td:eq(' + cIdx + ')').html().trim();
               var check = [];
               var labLevels,
                   info;
                  
               if (unit.substr(-6) === ' Spell')
                  labLevels = spellInfo(unit, 'laboratory level');
               else
                  labLevels = troopInfo(unit, 'laboratory level');

               for (var i = 0; i < labLevels.length; i ++) {
                  if (labLevels[i] === lvl) {
                     switch (datatypes[idx]) {
                        case 'level':
                           check.push(i + 1);
                           break;
                        case 'cost':
                           if (unit.substr(-6) === ' Spell')
                              info = spellInfo(unit, 'research cost', i + 1);
                           else
                              info = troopInfo(unit, 'research cost', i + 1);

                           if (info === 0)
                              info = 'N/A';
                           else if (!isNaN(info))
                              info = info.format('#,##0[.]##');

                           check.push(info);
                           break;
                        case 'time':
                           if (unit.substr(-6) === ' Spell')
                              info = spellInfo(unit, 'research time', i + 1);
                           else
                              info = troopInfo(unit, 'research time', i + 1);

                           if (info === 0)
                              info = 'N/A';
                           else if (!isNaN(info))
                              info = calculateDuration(info, 'hr', true);

                           check.push(info);
                           break;
                     }
                  }
               }

               if (check.length === 0)
                  check = '-';
               else
                  check = check.join(' / ');

               errs += markError(value, check,
                  $(r).find('td:eq(' + cIdx + ')'),
                  unit + ' level ' + lvl + ': ' + datatypes[idx] + ' = "' + value + '", check = "' + check + '"');
            });
         });
      });

      if (lvl !== buildingInfo(page, "levels")) {
         console.log('Inconsistency - ' + lvl + ' levels listed, database shows ' + buildingInfo(page, "levels"));
         errs ++;
      }

      return errs;
   }
   
   function verifyTownHallTable(table, tbltype) {
      var errs = 0,
          lvl,
          rowheaders = table.find('th.rowheader'),
          colheaders = table.find('th.colheader'),
          cols = [],
          bList = buildingInfo('list');

      $.each(colheaders, function(cIdx, col) {
         var hdr = $(col).html().trim();

         if (hdr !== 'TH Level') {
            var tmp = linkTitleorString(hdr);

            if (bList.indexOf(tmp) < 0)
               cols.push('UNDEFINED');
            else
               cols.push(tmp);
         }
      });
      
      $.each(rowheaders, function(rIdx, row) {
         lvl = Number($(row).html().trim());

         for (var cIdx = 0; cIdx < cols.length; cIdx ++) {
            var value = $(row).parent().find('td:eq(' + cIdx + ')').html().trim();
            var check = 'UNDEFINED';
            
            if (cols[cIdx] !== 'UNDEFINED') {
               if (tbltype === 'level') {
                  var req = buildingInfo(cols[cIdx], 'required town hall');
                  var max = -1;
                  
                  while ((max + 1) < req.length && req[max + 1] <= lvl)
                     max ++;

                  check = (max + 1);
               }
               else
                  check = buildingInfo('number available', cols[cIdx], lvl);
            }

            if (check === 0)
               check = '-';

            errs += markError(value, check,
               $(row).parent().find('td:eq(' + cIdx + ')'),
               cols[cIdx] + ' max ' + tbltype + ' (TH' + lvl + ') = "' + value + '", check = "' + check + '"');
         }      
      });      

      if (lvl !== buildingInfo(page, "levels")) {
         console.log('Inconsistency - ' + lvl + ' levels listed, database shows ' + buildingInfo(page, "levels"));
         errs ++;
      }

      return errs;
   }

   function verifyBuildersHutTables() {
      var errs = 0;

      for (var hIdx = 1; hIdx <= hutTables; hIdx ++) {
         var table   = $('#' + page + '-table-' + hIdx),
             rows    = table.find('tr:not(:first)');

         $.each(rows, function(rIdx, row) {
            var data = $(row).find('th').attr('data-type');

            if (data === undefined)
               return true;

            var value   = $(row).find('td').html().trim(),
                tmpdata = data,
                check,
                hutNumber;

            if (data.substr(0, data.length - 2) === 'upgrade cost') {
               hutNumber = Number(data.substring(data.indexOf('-') + 1));
               data      = 'upgrade cost';
            }
            
            check = buildingInfo(page, data, 1);

            if (check === undefined)
               check = 'UNDEFINED';

            if (hutNumber !== undefined) {
               check = Number(check.split('|')[hutNumber - 1]);
               value = removeLinks(value);
            }
            
            switch (data) {
               case 'upgrade time':
                  if (check === 0)
                     check = 'N/A';
                  else
                     check = calculateDuration(check, 'sec', true);

                  break;
               default:
                  if (check === 0)
                     check = 'N/A';
                  else if (!isNaN(check))
                     check = check.format('#,##0[.]##');
            }
            
            errs += markError(value, check,
               $(row).find('td'),
               tmpdata + ' = "' + value + '", check = "' + check + '"');
         });
      }

      return errs;
   }

   function verifySpellTables() {
      var errs = 0;
      var lvl;

      for (var sIdx = 1; sIdx <= spellTables; sIdx ++) {
         var table   = $('#' + page + '-table-' + sIdx),
             columns = table.find('th');
             rows    = table.find('tr:not(:first)');

         $.each(rows, function(rIdx, row) {
            lvl = rIdx + 1;

            $.each(columns, function(cIdx, col) {
               var data = $(col).attr('data-type');

               if (data === undefined)
                  return true;

               var value = $(row).find('td:eq(' + cIdx + ')').html().trim();
               var check;

               switch (data) {
                  case 'level':
                     check = lvl;
                     break;
                  default:
                     check = spellInfo(page, data, lvl);

                     if (check === undefined)
                        check = 'UNDEFINED';

                     switch (data) {
                        case 'boost time':
                        case 'pulse time':
                        case 'strike time':
                           check += 's';
                           break;
                        case 'targets':
                           value = linkInnerHTMLorString(value);
                           // Wikia replaces literal ampersands with '&amp;'
                           check = check.replace(/ & /g, ' &amp; ');
                           break;
                        case 'duration':
                           check += ' seconds';
                           break;
                        case 'creation time':
                           check = calculateDuration(check, 'min', true);
                           break;
                        case 'research time':
                           if (check === 0)
                              check = 'N/A';
                           else
                              check = calculateDuration(check, 'hr', true);
                           break;
                        case 'damage boost':
                           if (!isNaN(check))
                              check = (check * 100) + '%';
                           break;
                        case 'research cost':
                           if (check === 0)
                              check = 'N/A';
                           else if (!isNaN(check))
                              check = check.format('#,##0[.]##');
                           break;
                        case 'laboratory level':
                           if (check === 0)
                              check = 'N/A';
                           break;
                        case 'radius':
                        case 'random radius':
                           check += ' tile' + (check === 1 ? '' : 's');
                           break;
                        case 'damage':
                        case 'speed decrease':
                        case 'attack rate decrease':
                           if (!isNaN(check))
                              check = (check * 100).format('#,##0[.]##') + "%";
                           break;
                        default:
                           if (!isNaN(check))
                              check = check.format('#,##0[.]##');
                     }
               }

               errs += markError(value, check,
                  $(row).find('td:eq(' + cIdx + ')'),
                  'row ' + lvl + ': ' + data + ' = "' + value + '", check = "' + check + '"');
            });
         });
      }

      if (lvl !== spellInfo(page, "levels")) {
         console.log('Inconsistency - ' + lvl + ' levels listed, database shows ' + spellInfo(page, "levels"));
         errs ++;
      }

      return errs;
   }
});