/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready (function() {
    createCompanionStatTable();
})

function createCompanionStatTable() {
  var $statsTabber = $('#companion-stats .tabber');
  var stats = {};
  
  $statsDiv.children('div').each (function() {
      var values = $(this).text().split(',');
      var statName = String(values[0].replace(/['"]+/g, ''));
      values.shift(); // Remove the stat name from the array
     
      // for each value in values, enter it into an array based on star
      var i = 1;
      var gradeStats = [];
      $.each (values, function(v) {
          gradeStats[i] = values[v];
          i++;
      });
      
    stats[statName] = gradeStats;
  });
  
  // Create tab and tables for each level
  for (var j = 1; j <= 5; j++) {
      var $thisTab = $('#companion-stats .tabber .tabbertab:eq('+(j-1)+')');
    
      var tableHTML = '<table class="article-table stat-table">';
      
      // HP & MP
      tableHTML += '<tr>';
      tableHTML += '<td>HP</td>';
      tableHTML += '<td>'+stats["HP"][j]+'</td>';
      tableHTML += '<td>MP</td>';
      tableHTML += '<td>'+stats["MP"][j]+'</td>';
      tableHTML += '</tr>';
      
      // Attack & Defense
      tableHTML += '<tr>';
      tableHTML += '<td>Attack</td>';
      tableHTML += '<td>'+stats["Attack"][j]+'</td>';
      tableHTML += '<td>Defense</td>';
      tableHTML += '<td>'+stats["Defense"][j]+'</td>';
      tableHTML += '</tr>';
      
      // Hit & Evade
      tableHTML += '<tr>';
      tableHTML += '<td>Hit</td>';
      tableHTML += '<td>'+stats["Hit"][j]+'</td>';
      tableHTML += '<td>Evade</td>';
      tableHTML += '<td>'+stats["Evade"][j]+'</td>';
      tableHTML += '</tr>';
      
      // Critical & Magic Resistance
      tableHTML += '<tr>';
      tableHTML += '<td>Critical</td>';
      tableHTML += '<td>'+stats["Critical"][j]+'</td>';
      tableHTML += '<td>Magic Resistance</td>';
      tableHTML += '<td>'+stats["Magic Resistance"][j]+'</td>';
      tableHTML += '</tr>';
    
      tableHTML += '</table>';
      $thisTab.html(tableHTML);
  }
  
}