/*
	Original author: Ashi.
	Addapted for wiki use: The Crossblade.
	
	Creates 4 interactable range inputs (health, damage, defense and speed)
	and a table which shows the stat growth of a familiar/pet. By changning
	slider values the icons for stats and the stats itself get updated (the
	old table gets deleted and a new one is created).
	The table consists of a button (first column, first row) that either 
	shows all familiar level stats or hides most of stats, except for max 
	levels (12,15, 18, 21); icons for stats (first column); and levels of
	familiars (first row).
	
	The look of the table is managed with CSS.
*/

function create_slider ( stat_type, min_stat, max_stat, default_stat ) {
	var paragraph = document.createElement("p");
	paragraph.innerHTML = stat_type;
	paragraph.appendChild(document.createElement("br"));
	var slider_input = document.createElement("input");
	slider_input.id = "range_" + stat_type.slice(0,3);
	slider_input.type = "range";
	slider_input.min = min_stat;
	slider_input.max = max_stat;
	slider_input.value = default_stat;
	slider_input.addEventListener( "click", function(){ show_hide_table("Sliders"); } );
	slider_input.addEventListener( "input", function(){ show_hide_table("Sliders"); } );
	paragraph.appendChild(slider_input);
	return paragraph;
}

// Shows/hides parts of the table (deletes the table and makes a new one).
function show_hide_table( show_hide ) {
	if (show_hide == "Show") {
		show_hide = "Hide";
	} else if (show_hide == "Hide") {
		show_hide = "Show";
	}
	var tables = create_table( show_hide );
	document.getElementById("familiar_stat_table").innerHTML = "";
	document.getElementById("familiar_stat_table").appendChild(tables);
	return;
}

function create_table( show_hide ) {
	// Variable that shows/hides the not max levels.
	var max_levels = [ 12, 15, 18, 21 ];
	var table_columns = max_levels.length;
	if (show_hide != "Hide" && show_hide != "Show") {
		show_hide = document.getElementById("show_hide_button_id").textContent;
	}
	if ( show_hide == "Hide" ) {
		table_columns = 21;
	}
	
	var slider_values = [];
	var tables = document.createElement("table");
	var tbody = document.createElement("tbody");
	tables.id = "familiar_stat_table_id";
	//This doesn't work as intended.
	tables.setAttribute( "class", "fandom-table" );
	
	for (var i = 0; i < 5; i++) {
    	var tr = document.createElement("tr");
		for (var j = 0; j <= table_columns; j++) {
			// Button.
			if (i===0 && j===0) {
			    var th_button = document.createElement("th");
				var show_hide_button = document.createElement('button');
				show_hide_button.type = "button";
				show_hide_button.textContent = show_hide;
				show_hide_button.id = "show_hide_button_id";
				show_hide_button.addEventListener( "click", function(){ show_hide_table(show_hide); } );
				th_button.appendChild(show_hide_button);
				tr.appendChild(th_button);
			// First row shows familiar levels.
			} else if (i===0) {
			    var th = document.createElement("th");
			    if ( show_hide == "Hide" ) {
					th.innerHTML = j;
				} else {
					th.innerHTML = max_levels[j-1];
				}
				tr.appendChild(th);
			// Health.
			} else if (j===0 && i===1) {
			    var td_hp = document.createElement("td");
			    slider_values[1] = document.getElementById("range_Hea").value;
				td_hp.appendChild( print_health( slider_values[1] ));
				tr.appendChild(td_hp);
			// Damage.
			} else if (j===0 && i===2) {
			    var td_dmg = document.createElement("td");
			    slider_values[2] = document.getElementById("range_Dam").value;
				td_dmg.appendChild( print_damage( slider_values[2] ));
				tr.appendChild(td_dmg);
			// Defense.
			} else if (j===0 && i===3) {
			    var td_def = document.createElement("td");
			    slider_values[3] = document.getElementById("range_Def").value;
				td_def.appendChild( print_defense( slider_values[3] ));
				tr.appendChild(td_def);
			// Speed (AP).
			} else if (j===0 && i===4) {
			    var td_ap = document.createElement("td");
			    slider_values[4] = document.getElementById("range_Act").value;
				td_ap.appendChild( print_speed( slider_values[4] ));
				tr.appendChild(td_ap);
			// Calculates familiar stats.
			} else {
    			var td = document.createElement("td");
				// "i" is the number of the stat. x" is slider value. "y" is familiar level.
				// stat_calc( i, x, y)
			    if ( show_hide == "Hide" ) {
					td.innerHTML = stat_calc( i, Number(slider_values[i]), Number(j) );
				} else {
					td.innerHTML = stat_calc( i, Number(slider_values[i]), Number(max_levels[j-1]) );
				}
				tr.appendChild(td);
			}
		}
		tbody.appendChild(tr);
	}
	tables.appendChild(tbody);
	return tables;
}

function create_img( img_link ){
	var img = document.createElement("img");
	img.src = "https://static.wikia.nocookie.net/nonograms-katana/images/" + img_link;
	img.width = "30";
	img.height = "30";
	return img;
}

// Displays the health icons in the table.
function print_health( value ){
    var images = document.createElement("span");
    var imgs_hp = [ "e/e7/Familiar_stats-HP-0.png",
				    "b/bc/Familiar_stats-HP-0%2C5%2B%2B.png",
				    "d/d3/Familiar_stats-HP-0%2C5%2B.png",
				    "2/2e/Familiar_stats-HP-0%2C5.png",
				    "7/74/Familiar_stats-HP-0%2B%2B.png",
				    "0/0f/Familiar_stats-HP-0%2B.png",
				    "b/b9/Familiar_stats-HP-1.png"];
    var hp_stat = Number(value)+5;
    
	for (var i = 1; i <= 5; i++) {
		var current_hp = i*6-hp_stat;
		if (current_hp>5) { current_hp = 0; }
		if ( hp_stat >= i*6 ) {
    		images.appendChild(create_img(imgs_hp[6]));
		} else {
    		images.appendChild(create_img(imgs_hp[current_hp]));
		}
	}
    
    return images;
}

// Displays the damage icons in the table.
function print_damage( value ){
    var images = document.createElement("span");
    var img_dmg_0 = "f/fa/Familiar_stats-DMG-0.png";
    var img_dmg_half = "0/0e/Familiar_stats-DMG-0%2C5.png";
    var img_dmg_1 = "8/89/Familiar_stats-DMG-1.png";
    var dmg_stat = 0.5+value/2;
    
	for (var i = 1; i <= 5; i++) {
		if ( dmg_stat >= i ) {
    		images.appendChild(create_img(img_dmg_1));
		} else if ( i-dmg_stat == 0.5 ) {
    		images.appendChild(create_img(img_dmg_half));
		} else {
    		images.appendChild(create_img(img_dmg_0));
		}
	}
    
    return images;
}

// Displays the defense icons in the table.
function print_defense( value ){
    var images = document.createElement("span");
    var img_def_0 = "6/65/Familiar_stats-DEF-0.png";
    var img_def_half = "4/4b/Familiar_stats-DEF-0%2C5.png";
    var img_def_1 = "3/33/Familiar_stats-DEF-1.png";
    var def_stat = 0.5+value/2;
    
	for (var i = 1; i <= 5; i++) {
		if ( def_stat >= i ) {
    		images.appendChild(create_img(img_def_1));
		} else if ( i-def_stat == 0.5 ) {
    		images.appendChild(create_img(img_def_half));
		} else {
    		images.appendChild(create_img(img_def_0));
		}
	}
    
    return images;
}

// Displays the speed/action points (AP) icons in the table.
function print_speed( value ){
    var images = document.createElement("span");
    var img_speed_0 = "d/d6/Familiar_stats-AP-0.png";
    var img_speed_1 = "2/2e/Familiar_stats-AP-1.png";
    var speed_stat = 2+Number(value);
    
	for (var i = 1; i <= 5; i++) {
		if (i <= speed_stat) {
    		images.appendChild(create_img(img_speed_1));
		} else {
    		images.appendChild(create_img(img_speed_0));
		}
	}
    
    return images;
}

function calculate_base_stat(x,y) {
    var result = 0;
    if ((x>0) && (y>0)) {
        result = Math.round(0.8+(y-1)*(x-1-Math.floor(x/5))/20) + Math.floor(x/5);
    }
    return result;
}

// Chooses the correct stat calculator (function) for the stat (HP, DMG, etc.).
function stat_calc( stat, x, y ) {
	switch ( stat ) {
		case 1:
			return calculate_health(x,y);
		case 2:
			return calculate_damage(x,y);
		case 3:
			return calculate_defense(x,y);
		case 4:
			return calculate_speed(x,y);
		default:
			return "Wrong number";
	}
}

function calculate_health(x,y) {
    var result = 0;
    if ((x>0) && (y>0)) {
        result = calculate_base_stat(x+3,y)+y+11;
    }
    return result;
}
function calculate_damage(x,y) {
    var result = 0;
    if ((x>0) && (y>0)) {
        result = calculate_base_stat(x+11,y)+2;
    }
    return result;
}
function calculate_defense(x,y) {
    var result = 0;
    if ((x>0) && (y>0)) {
        result = calculate_base_stat(x+7,y);
    }
    return result;
}
function calculate_speed(x,y) {
    var result = 0;
    if ((x>0) && (y>0)) {
        result = calculate_base_stat(x,y)+2;
    }
    return result;
}

if (mw.config.get("wgPageName") === "Dungeon:_familiars") {
	var stat_range = [
		[ "Health", "1", "25", "13" ],
		[ "Damage", "1", "9", "5" ],
		[ "Defense", "1", "9", "5" ],
		[ "Action points", "1", "3", "2" ]];
	var sliders = document.createElement("div");
	//Creates sliders.
	for (var i = 0; i < stat_range.length; i++) {
		sliders.appendChild( create_slider( stat_range[i][0], stat_range[i][1], stat_range[i][2], stat_range[i][3] ));
	}
	document.getElementById("familiar_stat_sliders").appendChild(sliders);
	
	// Creates the table.
	var tables = create_table( "Show" );
	document.getElementById("familiar_stat_table").appendChild(tables);
}