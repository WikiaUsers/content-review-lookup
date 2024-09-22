/*
	Author of this calculator is Ashi.
	
	This code calculates the stat growth of a familiar.
	The user has to input the yellow stats in the sliders.
*/

/*
<html>
<head/>
<body>
<h1>Katana Nomogramma Pet Calculator</h1>
<p>Health</p>
<input id="pc_rangeHealth" type=range min=1 max=25 default=13
    oninput="on_change_hp()"
    onchange="on_change_hp()"
>
</br>
<p>Damage</p>
<input id="pc_rangeDamage" type=range min=1 max=9 default=5
    oninput="pc_onChangeDamage()"
    onchange="pc_onChangeDamage()"
    >
</br>
<p>Defence</p>
<input id="pc_rangeDefence" type=range min=1 max=9 default=5
    oninput="pc_onChangeDefence()"
    onchange="pc_onChangeDefence()"
>
</br>
<p>Speed</p> 
<input id="pc_rangeSpeed" type=range min=1 max=3 default=1
    oninput="pc_onChangeSpeed()"
    onchange="pc_onChangeSpeed()"
>
</br>
</br>
<table border=1>
    <colgroup>
        <col span="1" width="100px">
        <col span="11" id="pc_tableHide1" width="20px">
        <col span="1" id="pc_tableLevel12" width="20px">
        <col span="2" id="pc_tableHide2" width="20px">
        <col span="1" id="pc_tableLevel15" width="20px">
        <col span="2" id="pc_tableHide3" width="20px">
        <col span="1" id="pc_tableLevel18" width="20px">        
        <col span="2" id="pc_tableHide4" width="20px">
        <col span="1" id="pc_tableLevel21" width="20px">        
    </colgroup>
    <tr height="25px">
        <td id="pc_VisButton" onclick="pc_tableVisClick();" >Hide</td>
        <td>1</td>
        <td>2</td>
        <td>21</td>     
    </tr>
    <tr id="pc_tableHealthPrevRow" height="25px">
        <td id="pc_tableHealthPrevVal">Health prev</td>
        <td>1</td>
        <td>2</td>
        <td>21</td>     
    </tr>
    <tr id="pc_tableHealthRow" height="25px">
        <td id="pc_tableHealthVal">Health</td>
        <td>1</td>
        <td>2</td>
        <td>21</td>     
    </tr>   
    <tr id="pc_tableHealthNextRow" height="25px">
        <td id="pc_tableHealthNextVal">Health next</td>
        <td>1</td>
        <td>2</td>
        <td>20</td>
        <td>21</td>     
    </tr>   
    <tr id="pc_tableDamageRow" height="25px">
        <td id="pc_tableDamageVal">Damage</td>
        <td>1</td>
        <td>2</td>
        <td>20</td>
        <td>21</td>     
    </tr>
    <tr id="pc_tableDefenceRow" height="25px">
        <td id="pc_tableDefenceVal">Defence</td>
        <td>1</td>
        <td>2</td>
        <td>21</td>     
    </tr>
    <tr id="pc_tableSpeedRow" height="25px">
        <td id="pc_tableSpeedVal">Speed</td>
        <td>1</td>
        <td>2</td>
        <td>20</td>
        <td>21</td>     
    </tr>   
</table>
 
<script>
    pc_onChangeSpeed();
    pc_onChangeDefence();
    pc_onChangeDamage();
    on_change_hp();
 
    function on_change_hp(){
        let x = parseInt(document.getElementById("pc_rangeHealth").value);
        pc_tableRowPrintHealth(x);
        document.getElementById("pc_tableHealthPrevVal").textContent = printHealth(x-1);
        document.getElementById("pc_tableHealthVal").textContent = printHealth(x);
        document.getElementById("pc_tableHealthNextVal").textContent = printHealth(x+1);
    }
 
    function pc_onChangeSpeed(){
        let x = parseInt(document.getElementById("pc_rangeSpeed").value);
        pc_tableRowPrintSpeed(x);
        document.getElementById("pc_tableSpeedVal").textContent = printSpeed(x);
    }
 
    function pc_onChangeDefence(){
        let x = parseInt(document.getElementById("pc_rangeDefence").value);
        pc_tableRowPrintDefence(x);
        document.getElementById("pc_tableDefenceVal").textContent = printDefence(x);
    }
 
    function pc_onChangeDamage(){
        let x = parseInt(document.getElementById("pc_rangeDamage").value);
        pc_tableRowPrintDamage(x);
        document.getElementById("pc_tableDamageVal").textContent = printDamage(x);
    }
    
    function pc_tableRowPrintDamage(x){
        let row = document.getElementById("pc_tableDamageRow");
        for (let i = 1; i<=21; i++){
            row.cells[i].textContent = calcDamage(x,i);
        }
    }
    function pc_tableRowPrintDefence(x){
        let row = document.getElementById("pc_tableDefenceRow");
        for (let i = 1; i<=21; i++){
            row.cells[i].textContent = calcDefence(x,i);
        }
    }
    function pc_tableRowPrintSpeed(x){ // X is slider value. "i" is familiar level.
        let row = document.getElementById("pc_tableSpeedRow");
        for (let i = 1; i<=21; i++){
            row.cells[i].textContent = calcSpeed(x,i);
        }
    }
    function pc_tableRowPrintHealth(x){
        let row0 = document.getElementById("pc_tableHealthPrevRow");
        let row1 = document.getElementById("pc_tableHealthRow");
        let row2 = document.getElementById("pc_tableHealthNextRow");
        for (let i = 1; i<=21; i++){
            if (x>1) {row0.cells[i].textContent = calcHealth(x-1,i);}
            else {row0.cells[i].textContent = "♥"}
            row1.cells[i].textContent = calcHealth(x,i);
            if (x<25) {row2.cells[i].textContent = calcHealth(x+1,i);}
            else {row2.cells[i].textContent = "♥"}
        }
    }    
 
    function pc_tableHideCols(){
        document.getElementById("pc_tableHide1").style.visibility='collapse';
        document.getElementById("pc_tableHide2").style.visibility='collapse';
        document.getElementById("pc_tableHide3").style.visibility='collapse';
        document.getElementById("pc_tableHide4").style.visibility='collapse';
        document.getElementById("pc_VisButton").textContent = "Show";
    }
    function pc_tableShowCols(){
        document.getElementById("pc_tableHide1").style.visibility='visible';
        document.getElementById("pc_tableHide2").style.visibility='visible';
        document.getElementById("pc_tableHide3").style.visibility='visible';
        document.getElementById("pc_tableHide4").style.visibility='visible';
        document.getElementById("pc_VisButton").textContent = "Hide";
    }
    function pc_tableVisClick(){
        if (document.getElementById("pc_tableHide1").style.visibility=='collapse') {
            pc_tableShowCols();
        }
        else {
            pc_tableHideCols();
        }
    }

</script>
</body>
</html>*/

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
	//slider_input.value = "3";
	//slider_input.oninput = "on_change_hp()";
	//slider_input.onchange = "on_change_hp()";
	paragraph.appendChild(slider_input);
	return paragraph;
}

function create_table( show_hide ) {
	// Variable that shows/hides the not max levels.
	var max_levels = [ 12, 15, 18, 21 ];
	var table_columns = max_levels.length;
	if ( show_hide == "Hide" ) {
		table_columns = 21;
	}
	//if (!show_hide) { show_hide = "Show"; }
	
	var tables = document.createElement("table");
	tables.setAttribute( "class", "fandom-table" );
	
	for (var i = 0; i < 5; i++) {
    	var tr = document.createElement("tr");
		tables.appendChild(tr);
		for (var j = 0; j <= table_columns; j++) {
			if (i===0 && j===0) {
			    var td_button = document.createElement("td");
				var show_hide_button = document.createElement('button');
				show_hide_button.type = "button";
				show_hide_button.textContent = show_hide;
				//show_hide_button.addEventListener("click", pc_tableVisClick);
				//show_hide_button.id("pc_VisButton");
				td_button.appendChild(show_hide_button);
				tables.appendChild(td_button);
			} else if (i===0) {
			    var th = document.createElement("th");
			    if ( show_hide == "Hide" ) {
					th.innerHTML = j;
				} else {
					th.innerHTML = max_levels[j-1];
				}
				tables.appendChild(th);
			// Health.
			} else if (j===0 && i===1) {
			    var td_hp = document.createElement("td");
			    var hp_value = "";
			    //if (document.getElementById("range_Hea").value !== null) {
			    	//hp_value = document.getElementById("range_Hea").value;
			    //}
				td_hp.appendChild( print_health( stat_range[i-1][3] ));
				//td_hp.appendChild( print_health( hp_value ));
				//td_hp.innerHTML = hp_value;
				tables.appendChild(td_hp);
			// Damage.
			} else if (j===0 && i===2) {
			    var td_dmg = document.createElement("td");
				td_dmg.appendChild( print_damage( stat_range[i-1][3] ));
				tables.appendChild(td_dmg);
			// Defense.
			} else if (j===0 && i===3) {
			    var td_def = document.createElement("td");
				td_def.appendChild( print_defense( stat_range[i-1][3] ));
				tables.appendChild(td_def);
			// Speed (AP).
			} else if (j===0 && i===4) {
			    var td_ap = document.createElement("td");
				td_ap.appendChild( print_speed( stat_range[i-1][3] ));
				tables.appendChild(td_ap);
			} else {
    			var td = document.createElement("td");
				// "x" is slider value. "y" is familiar level.
				// stat_calc( i, x, y)
			    if ( show_hide == "Hide" ) {
					td.innerHTML = stat_calc( i, Number(stat_range[i-1][3]), Number(i) );
				} else {
					td.innerHTML = stat_calc( i, Number(stat_range[i-1][3]), Number(max_levels[j-1]) );
				}
				tables.appendChild(td);
			}
		}
	}
	return tables;
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
	
	var tables = create_table( "Show" );
	
	document.getElementById("familiar_stat_calculator").appendChild(sliders);
	document.getElementById("familiar_stat_calculator").appendChild(tables);
}

function create_img( img_link ){
	var img = document.createElement("img");
	img.src = "https://static.wikia.nocookie.net/nonograms-katana/images/" + img_link;
	img.width = "30";
	img.height = "30";
	return img;
}

function print_health( value ){
    var images = document.createElement("span");
    var img_hp_0 = "e/e7/Familiar_stats-HP-0.png";
    var img_hp_1 = "0/0f/Familiar_stats-HP-0%2B.png";
    var img_hp_2 = "7/74/Familiar_stats-HP-0%2B%2B.png";
    var img_hp_3 = "2/2e/Familiar_stats-HP-0%2C5.png";
    var img_hp_4 = "d/d3/Familiar_stats-HP-0%2C5%2B.png";
    var img_hp_5 = "b/bc/Familiar_stats-HP-0%2C5%2B%2B.png";
    var img_hp_6 = "b/b9/Familiar_stats-HP-1.png";
    var hp_stat = Number(value)+5;
    
	for (var i = 1; i <= 5; i++) {
		if ( hp_stat >= i*6 ) {
    		images.appendChild(create_img(img_hp_6));
		} else if ( i*6-hp_stat == 5 ) {
    		images.appendChild(create_img(img_hp_1));
		} else if ( i*6-hp_stat == 4 ) {
    		images.appendChild(create_img(img_hp_2));
		} else if ( i*6-hp_stat == 3 ) {
    		images.appendChild(create_img(img_hp_3));
		} else if ( i*6-hp_stat == 2 ) {
    		images.appendChild(create_img(img_hp_4));
		} else if ( i*6-hp_stat == 1 ) {
    		images.appendChild(create_img(img_hp_5));
		} else {
    		images.appendChild(create_img(img_hp_0));
		}
	}
    
    return images;
}

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

function calcBase(x,y) {
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
			return calcHealth(x,y);
		case 2:
			return calcDamage(x,y);
		case 3:
			return calcDefence(x,y);
		case 4:
			return calcSpeed(x,y);
		default:
			return "Wrong number";
	}
}

function calcHealth(x,y) {
    var result = 0;
    if ((x>0) && (y>0)) {
        result = calcBase(x+3,y)+y+11;
    }
    return result;
}
function calcDamage(x,y) {
    var result = 0;
    if ((x>0) && (y>0)) {
        result = calcBase(x+11,y)+2;
    }
    return result;
}
function calcDefence(x,y) {
    var result = 0;
    if ((x>0) && (y>0)) {
        result = calcBase(x+7,y);
    }
    return result;
}
function calcSpeed(x,y) {
    var result = 0;
    if ((x>0) && (y>0)) {
        result = calcBase(x,y)+2;
    }
    return result;
}