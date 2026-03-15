function building_drop_down_list () {
	var buildings = document.getElementById("sorted_buildings").innerHTML.split(',');
	var production = document.getElementById("production").innerHTML.split(',');
	var building_select = document.createElement('select');
	building_select.id = "building_select";
	building_select.addEventListener("change", production_drop_down_list);
	building_select.addEventListener("change", craftables_drop_down_list);
	building_select.addEventListener("change", make_checkboxes_boosts);
	building_select.addEventListener("change", make_checkboxes_for_item_boosts);
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
building_drop_down_list ();

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
	var same_product = "";
	for (var p = 0; p < production.length; p+=4) {
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
production_drop_down_list ();

function craftables_drop_down_list () {
    var remove_old_craftables_drop_down_list = document.getElementById('craftables_select');
    if (typeof(remove_old_craftables_drop_down_list) != 'undefined' && remove_old_craftables_drop_down_list != null) {
    	remove_old_craftables_drop_down_list.remove();}
    var building = document.getElementById("building_select").value;
    var production_value = document.getElementById("production_select").value;
    var production_list = document.getElementById("production").innerHTML.split(',');
    var craftables_select = document.createElement('select');
    craftables_select.id = "craftables_select";
    craftables_select.addEventListener("change", set_production_time);
	var same_craftable_amount = "";
    for (var p = 0; p < production_list.length; p+=4) {
		if (production_list[p] == building && production_list[p+1] == production_value && same_craftable_amount != production_list[p+2]) {
			for (var limit = 1; limit <= production_list[p+2]; limit++) {
        		var opt = document.createElement('option');
        		opt.value = limit + "," + production_list[p+3];
        		opt.innerHTML = limit;
				if (limit == production_list[p+2]) {opt.selected = 'true';} //Selects the last option.
				craftables_select.appendChild(opt);
			}
			same_craftable_amount = production_list[p+2];
		}
    }
    document.getElementById("craftables_selects").appendChild(craftables_select);
	set_production_time ();
}
craftables_drop_down_list ();

function set_production_time () {
	var building = document.getElementById("building_select").value;
	var production = document.getElementById("production_select").value;
	var craftable_at_once = document.getElementById("craftables_select").value.split(',');
	document.getElementById("production_time").value = craftable_at_once[0]*craftable_at_once[1];
}

function make_checkboxes_boosts () {
	var remove_old_checkboxes_boosts = document.getElementById('checkboxes_boosts_id');
    if (typeof(remove_old_checkboxes_boosts) != 'undefined' && remove_old_checkboxes_boosts != null) {
    	remove_old_checkboxes_boosts.remove();}
	var checkboxes_boosts_span = document.createElement('span');
    checkboxes_boosts_span.id = "checkboxes_boosts_id";
	var boosts = document.getElementById("boosts").innerHTML.split(',');
	var building = document.getElementById("building_select").value;
	var split_boost = "";
	var checkboxes_boosts_span_split = document.createElement('span');
	checkboxes_boosts_span_split.style = "display: inline-block;";
	for (var b = 0; b < boosts.length; b+=3) {
		if (boosts[b] == building) {
			// The last character (or 2) are levels (and are different).
			if (split_boost != boosts[b+1].substring(0,6) ) {
				checkboxes_boosts_span_split = document.createElement('span');
				checkboxes_boosts_span_split.style = "display: inline-block;";
				split_boost = boosts[b+1].substring(0,6);
			}
		
			var boost_checkbox = document.createElement('input');
			boost_checkbox.type = "checkbox";
			boost_checkbox.value = boosts[b+2];
			boost_checkbox.addEventListener("click", function () { check_lower_checkboxes(this); });
			checkboxes_boosts_span_split.appendChild(boost_checkbox);
			var boost_checkbox_label = document.createElement('label');
			boost_checkbox_label.innerHTML = boosts[b+1];
			boost_checkbox_label.appendChild(document.createElement('br'));
			checkboxes_boosts_span_split.appendChild(boost_checkbox_label);
			checkboxes_boosts_span.appendChild(checkboxes_boosts_span_split);
		}
	}
	document.getElementById("boosts_checkboxes").appendChild(checkboxes_boosts_span);
}
make_checkboxes_boosts ();

function check_lower_checkboxes (input_element) {
	var checkboxes_span = input_element.parentElement.getElementsByTagName('input');
	var box_value = Number(input_element.value);
	for (var i = 0; i < checkboxes_span.length; i++ ) {
		if (checkboxes_span[i].value <= box_value && input_element.checked == true) {
			checkboxes_span[i].checked = true;
		} else {
			checkboxes_span[i].checked = false;
		}
	}
}

function make_checkboxes_for_item_boosts () {
	var remove_old_checkboxes_item_boosts = document.getElementById('item_boosts_checkboxes_id');
    if (typeof(remove_old_checkboxes_item_boosts) != 'undefined' && remove_old_checkboxes_item_boosts != null) {
    	remove_old_checkboxes_item_boosts.remove();}
	var checkboxes_item_boosts_span = document.createElement('span');
    checkboxes_item_boosts_span.id = "item_boosts_checkboxes_id";
	var item_boosts = document.getElementById("item_boosts").innerHTML.split(',');
	// ahut,Soy sauce,20,24,bonsai,Soy sauce,20,24
	var building = document.getElementById("building_select").value;
	
	for (var i = 0; i < item_boosts.length; i+=4 ) {
		if (item_boosts[i] == building) {
			var item_boost_checkbox = document.createElement('input');
			item_boost_checkbox.type = "checkbox";
			item_boost_checkbox.value = item_boosts[i+1]+','+item_boosts[i+2]+','+item_boosts[i+3];
			item_boost_checkbox.addEventListener("click", function () { unique_check_checkboxes(this); });
			checkboxes_item_boosts_span.appendChild(item_boost_checkbox);
			var item_boost_checkbox_label = document.createElement('label');
			item_boost_checkbox_label.innerHTML = item_boosts[i+1] + ' (' + item_boosts[i+3] + 'h)';
			item_boost_checkbox_label.appendChild(document.createElement('br'));
			checkboxes_item_boosts_span.appendChild(item_boost_checkbox_label);
		}
	}
	document.getElementById('item_boosts_checkboxes').appendChild(checkboxes_item_boosts_span);
}
make_checkboxes_for_item_boosts ();

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