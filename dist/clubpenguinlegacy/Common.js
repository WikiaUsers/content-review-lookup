/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
  var tables = document.querySelectorAll("#jsorder");

  tables.forEach(function(table) {
    var header = document.createElement("th");
    header.textContent = "Order";

    for (var i = 0; i < table.rows.length; i++) {
      if (i === 0) {
        table.rows[i].insertBefore(header, table.rows[i].firstChild);
      } else {
        var cell = document.createElement("td");
        cell.textContent = i;
        table.rows[i].insertBefore(cell, table.rows[i].firstChild);
      }
    }
  });
  var partytables = document.querySelectorAll(".partytable");
  partytables.forEach(function(partytable) {
  	for (var i = 0; i < partytable.rows.length; i++) {
  		//console.log(i);
  		if (i === 0) {
  			// pass
  		} else {
  			test = $(partytable.rows[i].cells[0]).attr("rowspan");
  			console.log(test);
  		}
  	}
  });
});