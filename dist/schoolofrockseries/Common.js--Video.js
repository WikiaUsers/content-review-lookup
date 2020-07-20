/* Any JavaScript here will be loaded for all users on every page load. */

function timeStamp_AttackStrategies_js() {
   return "2014.07.20 00:47 (UTC-7)";
}
 
window.onload = function() {
   attackStrategyReset();
};
 
function attackStrategyFilter() {
   var minTH       = document.getElementById("min-town-hall").value;
   var maxTH       = document.getElementById("max-town-hall").value;
   var minTrophies = document.getElementById("min-trophies").value;
   var maxTrophies = document.getElementById("max-trophies").value;
   var troopFilter = $('#troop-filter-text').html();
   var filterType  = $('#troop-filter-type-text').html();
   var troops;
 
   if (minTH === '')
      minTH = 0;
   else
      minTH = Number(minTH);
 
   if (maxTH === '')
      maxTH = 99;
   else
      maxTH = Number(maxTH);
 
   if (minTrophies === '')
      minTrophies = 0;
   else
      minTrophies = Number(minTrophies);
 
   if (maxTrophies === '')
      maxTrophies = 999999;
   else
      maxTrophies = Number(maxTrophies);
 
   if (minTH < 0)
      minTH = 0;
 
   if (maxTH < minTH)
      maxTH = minTH;
 
   if (minTrophies < 0)
      minTrophies = 0;
 
   if (maxTrophies < minTrophies)
      maxTrophies = minTrophies;
 
   if (troopFilter.toLowerCase() === 'all')
      troops = true;
   else if (troopFilter.toLowerCase() === 'none')
      troops = false;
   else {
      troops = troopFilter.split(', ');
   }
 
   var tbl       = document.getElementById('attack-strategies-results');
   var tr        = tbl.getElementsByTagName('tr');
   var troopList = troopInfo('list', 'trainable');
 
   for (var i = 1; i < tr.length; i ++) {
      var td              = tr[i].getElementsByClassName('attack-strategy-hidden-field');
      var currMinTH       = Number(td[0].innerHTML);
      var currMaxTH       = Number(td[1].innerHTML);
      var currMinTrophies = Number(td[2].innerHTML);
      var currMaxTrophies = Number(td[3].innerHTML);
 
      if (currMinTH > maxTH ||
          currMaxTH < minTH ||
          currMinTrophies > maxTrophies ||
          currMaxTrophies < minTrophies)
         $(tr[i]).css({'display': 'none'});
      else if (troops === true && filterType === 'Includes')
         $(tr[i]).css({'display': ''});
      else if (troops === false && filterType === 'Excludes')
         $(tr[i]).css({'display': ''});
      else if (troops === true && filterType === 'Only')
         $(tr[i]).css({'display': ''});
      else if (troops === false && filterType === 'Includes')
         $(tr[i]).css({'display': 'none'});
      else if (troops === true && filterType === 'Excludes')
         $(tr[i]).css({'display': 'none'});
      else if (troops === false && filterType === 'Only')
         $(tr[i]).css({'display': 'none'});
      else if (filterType === 'Includes') {
         var include = false;
 
         for (var j = 0; j < troops.length; j ++) {
            var idx = tableIndex(troops[j]);
 
            if (idx >= 0 && td[idx].innerHTML === 'Yes') {
               include = true;
               break;
            }
         }
 
         $(tr[i]).css({'display': (include ? '' : 'none')});
      }
      else if (filterType === 'Excludes') {
         var include = true;
 
         for (var j = 0; j < troops.length; j ++) {
            var idx = tableIndex(troops[j]);
 
            if (idx >= 0 && td[idx].innerHTML === 'Yes') {
               include = false;
               break;
            }
         }
 
         $(tr[i]).css({'display': (include ? '' : 'none')});
      }
      else if (filterType === 'Only') {
         var include = false;
 
         for (var j = 0; j < troops.length; j ++) {
            var idx = tableIndex(troops[j]);
 
            if (idx >= 0 && td[idx].innerHTML === 'Yes') {
               include = true;
               break;
            }
         }
 
         if (include) {
            for (var j = 0; j < troopList.length; j ++) {
               var idx = tableIndex(troopList[j]);
 
               if (!hasTroop(troopList[j]) && idx >= 0 && td[idx].innerHTML === 'Yes') {
                  include = false;
                  break;
               }
            }
         }
 
         $(tr[i]).css({'display': (include ? '' : 'none')});
      }
      else {
         $(tr[i]).css({'display': ''});
      }
   }
 
   function hasTroop(trooptype) {
      if (troops === true || troops === false)
         return troops;
 
      return troops.indexOf(trooptype) >= 0;
   }
 
   function tableIndex(trooptype) {
      var idx = $('#troop-filter-selector option[value="' + trooptype + '"]').index();
      return (idx >= 0 ? idx + 4 : idx);
   }
}
 
function attackStrategyReset() {
   document.getElementById("min-town-hall").value = 1;
   document.getElementById("max-town-hall").value = '';
   document.getElementById("min-trophies").value = 0;
   document.getElementById("max-trophies").value = '';
   document.getElementById("troop-filter-text").innerHTML = 'All';
   document.getElementById("troop-filter-type-text").innerHTML = 'Includes';
   document.getElementById("troop-filter-type-text").title =
      'Will show all attack strategies that include at least one of the selected troop types.';
   attackStrategyFilter();
}
 
function troopFilterInitiate() {
   doTroopSelect($('#troop-filter-text').html());
   $('#troop-filter-type').val($('#troop-filter-type-text').html());
   $('#troop-background').addClass('window-visible');
}
 
function troopFilterCancel() {
   $('#troop-background').removeClass('window-visible');
}
 
function troopFilterExecute() {
   var select    = $('#troop-filter-selector');
   var all       = true;
   var none      = true;
   var selection = [];
 
   $('option', select).each(function(idx) {
      if ($(this).prop('selected')) {
         selection.push($(this).val());
         none = false;
      }
      else
         all = false;
   });
 
   if (none)
      $('#troop-filter-text').html('None');
   else if (all)
      $('#troop-filter-text').html('All');
   else
      $('#troop-filter-text').html(selection.join(', '));
 
   $('#troop-filter-type-text').html($('#troop-filter-type').val());
 
   switch ($('#troop-filter-type').val()) {
      case 'Includes':
         $('#troop-filter-type-text').prop('title',
            'Will show all attack strategies that include at least one of the selected troop types.');
         break;
      case 'Excludes':
         $('#troop-filter-type-text').prop('title',
            'Will show all attack strategies that do not include any of the selected troop types.');
         break;
      case 'Only':
         $('#troop-filter-type-text').prop('title',
            'Will show all attack strategies that include only the selected troop types.');
         break;
   }
 
   troopFilterCancel();
}
 
function troopSelectNone() {
   doTroopSelect('none');
}
 
function troopSelectAll() {
   doTroopSelect('all');
}
 
function doTroopSelect(selection) {
   var select = $('#troop-filter-selector');
 
   if (selection.toLowerCase() === 'all')
      $('option', select).prop('selected', true);
   else if (selection.toLowerCase() === 'none')
      $('option', select).prop('selected', false);
   else {
      var selects = selection.split(', ');
 
      $('option', select).each(function(idx) {
         $(this).prop('selected', selects.indexOf($(this).val()) >= 0);
      });
   }
}