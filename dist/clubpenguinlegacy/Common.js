/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
	var years_div = document.querySelectorAll("div.tabber-years");
	for (var i=0; i < years_div.length; i++) {
	    if (years_div[i]) {
	        var CURRENT_YEAR = 2024;
			var tabber = years_div[i].querySelector("div.tabber.wds-tabber"); //tabber
			var tabs = tabber.querySelectorAll("div.wds-tabs__wrapper ul.wds-tabs li"); //tabs
	
	        var default_idx;
	        var desired_idx;
	
	        tabs.forEach(function(tab, idx) {
	            if ((tab.classList).length == 2 && tab.classList[1] == "wds-is-current") {
	                default_idx = idx;
	                console.log("Default data hash: ", tab.dataset.hash);
	            }
	            
	            if (tab.dataset.hash === CURRENT_YEAR.toString()) {
	            	desired_idx = idx;
					console.log("Desired data hash: ", tab.dataset.hash);
	            }
	        });
	
	        tabs[default_idx].classList.remove('wds-is-current');
	        tabs[desired_idx].classList.add('wds-is-current');
	
	        if (default_idx != desired_idx) {
	            var tabber_divs = tabber.querySelectorAll(":scope > div") // Only direct children
	            var default_table = tabber_divs[default_idx+1].innerHTML;
	            var desired_table = tabber_divs[desired_idx+1].innerHTML;
	
	            tabber_divs[default_idx+1].classList.remove('wds-is-current')
	        	tabber_divs[desired_idx+1].classList.add('wds-is-current')
	        }
	    }
	}
	
	
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