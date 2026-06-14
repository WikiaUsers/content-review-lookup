
function make_table () {
	var production_table = document.createElement('table');
	production_table.style = "text-align:left";
	
	function make_table_row ( left_column_text, right_column_id ) {
		var tr_element = document.createElement('tr');
		var th_element = document.createElement('th');
		th_element.innerHTML = left_column_text;
		tr_element.appendChild(th_element);
		var td_element = document.createElement('td');
		td_element.id = right_column_id;
		tr_element.appendChild(td_element);
		production_table.appendChild(tr_element);
	}
	
	make_table_row ( "Production time without boosts", "production_input" );
	make_table_row ( "Final time", "final_time" );
	make_table_row ( "Total boosted percent", "total_boosted_percent" );
	make_table_row ( "Booster time before production", "booster_before" );
	make_table_row ( "Booster time after production", "booster_after" );
	make_table_row ( "Current time", "current_time" );
	make_table_row ( "Production ends at", "production_end" );
  
	document.getElementById("production_table").appendChild(production_table);
}

function make_production_input () {
	var production_input = document.createElement('input');
	production_input.id = "production_time";
	production_input.type = "text";
	production_input.addEventListener("change", calculate_time_2);
	document.getElementById("production_input").appendChild(production_input); 
}

function make_percent_boost_input () {
	var boost_input = document.createElement('input');
	boost_input.id = "boost_input";
	boost_input.type = "text";
	boost_input.addEventListener("change", calculate_time_2);
	document.getElementById("total_boosted_percent").appendChild(boost_input); 
}

function make_final_time_input () {
	var final_time_input = document.createElement('input');
	final_time_input.id = "final_time_input";
	final_time_input.type = "text";
	final_time_input.addEventListener("change", calculate_time_2);
	document.getElementById("final_time").appendChild(final_time_input); 
}

function make_booster_time_before_input () {
	var booster_input = document.createElement('input');
	booster_input.id = "booster_time_before_input";
	booster_input.type = "text";
	booster_input.addEventListener("change", calculate_time_2);
	document.getElementById("booster_before").appendChild(booster_input); 
}

function make_booster_time_after_input () {
	var booster_input = document.createElement('input');
	booster_input.id = "booster_time_after_input";
	booster_input.type = "text";
	booster_input.addEventListener("change", calculate_time_2);
	document.getElementById("booster_after").appendChild(booster_input); 
}

function building_drop_down_list () {
	var buildings = document.getElementById("sorted_buildings").innerHTML.split(',');
	var production = document.getElementById("production").innerHTML.split(',');
	var building_select = document.createElement('select');
	building_select.id = "building_select";
	building_select.addEventListener("change", production_drop_down_list);
	building_select.addEventListener("change", craftables_drop_down_list);
	building_select.addEventListener("change", boosts_drop_down_list);
	building_select.addEventListener("change", item_boosts_drop_down_list);
    building_select.addEventListener("change", calculate_time);
	for (var b = 1; b < buildings.length; b+=2) {
		//Only includes buildings that have a production.
		if (production.includes(buildings[b-1])) {
        	var opt = document.createElement('option');
        	opt.value = buildings[b-1];
        	opt.innerHTML = buildings[b];
        	building_select.appendChild(opt);
		}
    }
    document.getElementById("building_selects").appendChild(building_select); 
}

function production_drop_down_list () {
    var remove_old_production_drop_down_list = document.getElementById('production_select');
    if (typeof(remove_old_production_drop_down_list) != 'undefined' && remove_old_production_drop_down_list != null) {
    	remove_old_production_drop_down_list.remove();
	}
	var building = document.getElementById("building_select").value;
	var production = document.getElementById("production").innerHTML.split(',');
	var production_select = document.createElement('select');
	production_select.id = "production_select";
	production_select.addEventListener("change", craftables_drop_down_list);
    production_select.addEventListener("change", calculate_time);
	var same_product = "";
	for (var p = 0; p < production.length; p+=5) {
		if (production[p] == building && same_product != production[p+1]) {
        	var opt = document.createElement('option');
        	opt.value = production[p+1];
        	opt.innerHTML = production[p+1];
			production_select.appendChild(opt);
			same_product =  production[p+1];
		}
    }
    document.getElementById("production_selects").appendChild(production_select); 
}

function craftables_drop_down_list () {
    var remove_old_craftables_drop_down_list = document.getElementById('craftables_select');
    if (typeof(remove_old_craftables_drop_down_list) != 'undefined' && remove_old_craftables_drop_down_list != null) {
    	remove_old_craftables_drop_down_list.remove();}
    var building = document.getElementById("building_select").value;
    var production_value = document.getElementById("production_select").value;
    var production_list = document.getElementById("production").innerHTML.split(',');
    var craftables_select = document.createElement('select');
    craftables_select.id = "craftables_select";
    craftables_select.addEventListener("change", calculate_time);
    for (var p = 0; p < production_list.length; p+=5) {
		// Checks, if it's the same building; same production item; and if it's not the same item as previous item (Wooden beam has 8 and 10 limit).
		if (production_list[p] == building && production_list[p+1] == production_value && production_list[p+1] != production_list[p+6]) {
			for (var limit = Number(production_list[p+2]); limit <= Number(production_list[p+3])*Number(production_list[p+2]); limit+=Number(production_list[p+2])) {
        		var opt = document.createElement('option');
        		opt.value = limit/Number(production_list[p+2]) + "," + production_list[p+4];
        		opt.innerHTML = limit;
				opt.selected = 'true'; //Selects the last option.
				craftables_select.appendChild(opt);
			}
		}
    }
    document.getElementById("craftables_selects").appendChild(craftables_select);
}

function calculate_time () {
	var craftable_at_once = document.getElementById("craftables_select").value.split(',');
	document.getElementById("production_time").value = seconds_to_hours(craftable_at_once[0]*craftable_at_once[1]);
	
	var total_boosted_percent = 0;
	var boosts = document.getElementById("boosts_selects").getElementsByTagName('select');
	for (var i = 0; i < boosts.length; i++) {
		total_boosted_percent += Number(boosts[i].value);
	}
	
	var item_boost_value = document.getElementById("item_boosts_drop_down_list_id").value.split(',')[1];
	total_boosted_percent += Number(item_boost_value);
	document.getElementById("boost_input").value = total_boosted_percent + '%';
	
	calculate_time_2 ();
}

function calculate_time_2 () {
	var production_time = hours_to_seconds(document.getElementById("production_time").value);
	var total_boosted_percent = document.getElementById("boost_input").value.slice(0, -1); //Removes the "%".

	document.getElementById("final_time_input").value = seconds_to_hours(production_time*(100-total_boosted_percent)/100);
	
	set_time ();
}

function set_time () {
	document.getElementById("current_time").innerHTML = new Date().toLocaleTimeString();
	setTimeout(set_time, 1000);
}

function boosts_drop_down_list () {
	var remove_old_boosts_drop_down_list = document.getElementById('boosts_select_span_id');
    if (typeof(remove_old_boosts_drop_down_list) != 'undefined' && remove_old_boosts_drop_down_list != null) {
    	remove_old_boosts_drop_down_list.remove();
	}
    var boosts_select_span = document.createElement('span');
    boosts_select_span.id = "boosts_select_span_id";
	var boosts = document.getElementById("boosts").innerHTML.split(',');
	var building = document.getElementById("building_select").value;
	var split_boost = "";
	var total_boost = 0;
	for (var b = 0; b < boosts.length; b+=3) {
		if (boosts[b] == building) {
			// The last character (or 2) are levels (and are different).
			if (split_boost != boosts[b+1].substring(0,6) ) {
				if (split_boost != "") {
					boosts_select_span.appendChild(boosts_select);
				}
				var boosts_select = document.createElement('select');
				boosts_select.style = 'margin-left: 5px;';
				boosts_select.addEventListener("change", calculate_time);
				split_boost = boosts[b+1].substring(0,6);
				
				// Makes a "No boosts" option as the first option.
				var opt = document.createElement('option');
				opt.value = 0;
				opt.innerHTML = "No boosts";
				boosts_select.appendChild(opt);
				total_boost = 0;
			}
		
			var opt = document.createElement('option');
			total_boost += Number(boosts[b+2]);
			opt.value = total_boost;
			opt.innerHTML = boosts[b+1];
			opt.selected = 'true'; //Selects the last option.
			boosts_select.appendChild(opt);
		}
	}
	// If there are no boosts available, don't show the drop down list.
	if (typeof(boosts_select) != 'undefined' && boosts_select != null) {
		boosts_select_span.appendChild(boosts_select);
		document.getElementById("boosts_selects").appendChild(boosts_select_span);
	}
}


function item_boosts_drop_down_list () {
	var remove_old_drop_down_list_for_item_boosts = document.getElementById('item_boosts_drop_down_list_id');
    if (typeof(remove_old_drop_down_list_for_item_boosts) != 'undefined' && remove_old_drop_down_list_for_item_boosts != null) {
    	remove_old_drop_down_list_for_item_boosts.remove();}
	var drop_down_list_item_boosts = document.createElement('select');
    drop_down_list_item_boosts.id = "item_boosts_drop_down_list_id";
	drop_down_list_item_boosts.addEventListener("change", calculate_time);
	// Makes a "No item boost" option as the first option.
	var opt = document.createElement('option');
	opt.value = "0,0,0";
	opt.innerHTML = "No item boost";
	drop_down_list_item_boosts.appendChild(opt);
	
	// ahut,Soy sauce,20,24,bonsai,Soy sauce,20,24
	var item_boosts = document.getElementById("item_boosts").innerHTML.split(',');
	var building = document.getElementById("building_select").value;
	
	for (var i = 0; i < item_boosts.length; i+=4 ) {
		if (item_boosts[i] == building) {
			var opt = document.createElement('option');
			opt.value = item_boosts[i+1]+','+item_boosts[i+2]+','+item_boosts[i+3];
			opt.innerHTML = item_boosts[i+1] + ' (' + item_boosts[i+3] + 'h)';
			drop_down_list_item_boosts.appendChild(opt);
		}
	}
	// If no item boosts are available, don't display the drop down list.
	if (opt.value != 0) {
		document.getElementById('item_boosts_drop_down_list').appendChild(drop_down_list_item_boosts);
	}
}

// Delete.
function unique_check_checkboxes (input_element) {
	var checkboxes_span = input_element.parentElement.getElementsByTagName('input');
	var box_value = input_element.value;
	for (var i = 0; i < checkboxes_span.length; i++ ) {
		if (checkboxes_span[i].value == box_value && input_element.checked == true) {
			checkboxes_span[i].checked = true;
		} else {
			checkboxes_span[i].checked = false;
		}
	}
}

function seconds_to_hours ( time_in_seconds ) {
	var final_time = "";
	if (time_in_seconds/3600 > 1) {
		var hours = Math.floor(time_in_seconds/3600);
		final_time = final_time + hours + "h ";
		time_in_seconds -= hours*3600;
	}
	if (time_in_seconds/60 > 1) {
		var minutes = Math.floor(time_in_seconds/60);
		final_time = final_time + minutes + "m ";
		time_in_seconds -= minutes*60;
	}
	if (time_in_seconds > 1) {
		final_time = final_time + time_in_seconds + "s ";
	}

	return final_time;
}

function hours_to_seconds ( time_in_hours ) {
	var final_time = 0;
	var time_array = time_in_hours.split(' ');
	for (var t = 0; t < time_array.length; t++ ) {
		if (time_array[t].search("h") != -1) {
			final_time += time_array[t].match(/\d+/)*3600;
		}
		if (time_array[t].search("m") != -1) {
			final_time += time_array[t].match(/\d+/)*60;
		}
		if (time_array[t].search("s") != -1) {
			final_time += time_array[t].match(/\d+/);
		}
	}
	return final_time;
}

building_drop_down_list ();
production_drop_down_list ();
craftables_drop_down_list ();
boosts_drop_down_list();
item_boosts_drop_down_list ();

make_table ();
 
make_production_input ();
make_percent_boost_input ();
make_final_time_input ();
make_booster_time_before_input ();
make_booster_time_after_input ();
calculate_time ();