// this code is used in [[Template:Scene/Maker]]
$(function(){
grid_size = 15;
function generate_table(){
	output_table_container = document.getElementById("output_table");
	output_table = document.createElement("table");
	first_row = document.createElement("tr");
	for (var h=0;h< grid_size+1; h++) {
		new_header = document.createElement("th");
		new_header.innerHTML = h;
		first_row.appendChild(new_header);
		output_table.appendChild(first_row);
	}
	for (var row=1;row< grid_size+1; row++) {
		new_header = document.createElement("th");
		new_header.innerHTML = row;
		new_row = document.createElement("tr");
		new_row.appendChild(new_header);
		output_table.appendChild(new_row);
		for (var cell=1;cell< grid_size+1; cell++) {
			new_cell = document.createElement("td");
			new_row.appendChild(new_cell);
			new_cell.id = "o"+cell+""+row;
		}
	}
	output_table_container.appendChild(output_table);
}

function generate_scene_data(){
	textarea_result = document.getElementById("scene_data");
	scene_rows = document.getElementById("scene_rows").value;
	scene_cols = document.getElementById("scene_cols").value;
	if (scene_rows > grid_size) {
		scene_rows = grid_size;
	}
	if (scene_cols > grid_size) {
		scene_cols = grid_size;
	}
	scene_name = document.getElementById("scene_name").value.trim().replace(/\s+/g," ").replaceAll(" ","_"); //formatting name
	scene_data = "['"+scene_name+"'] = {{\n";
	current_row = 1;
	current_col = 1;
	
	for (var o=0;o < scene_cols*scene_rows; o++) {
		current_id = "o"+current_col+current_row;
		if (document.getElementById(current_id).className =="has_field"){
				field = "1,";
		} else {
				field = "0,";
		}
		if (current_col < scene_cols) {
			current_col++;
			scene_data +=field;
		} else {
			current_col=1;
			current_row++;
			scene_data += field + "\n";
		}
	}	
	
	scene_data += "},\n"+scene_cols+"},";
	scene_data = scene_data.replace(",\n}","}");
	textarea_result.value = scene_data;
}


function draw_field(element){
	if (element.innerHTML  =="") {
			element.className  = "has_field";
			effect = document.createElement("div");
			img = document.createElement("img");
			img.src = "https://tibia.fandom.com/wiki/Special:Filepath?file=Poof_Effect.gif";
			effect.appendChild(img);
			element.appendChild(effect);
	} else {
		element.innerHTML ="";
		element.className ="";
	}
}

function clear_table(){
	document.querySelectorAll('td[class="has_field"]').forEach( function(effect) {effect.className = "";effect.innerHTML="";});
	document.getElementById("scene_data").value = "";
}

function CopyText(){
	document.getElementById("scene_data").select();
	document.getElementById("scene_data").setSelectionRange(0, -1);
	document.execCommand("copy");
}

var tool_html = 
'<table>'+
'<tr><td><label for="scene_name">spell name :</label></td><td><input id="scene_name" type="text"></td></tr>'+
'<tr><td><label for="scene_rows">rows :</label></td><td><input id="scene_rows" type="number" value="5" min="1" max="15"></td></tr>'+
'<tr><td><label for="scene_cols">columns :</label></td><td><input id="scene_cols" type="number" value="5" min="1" max="15"></td></tr>'+
'</table>'+
'<div id="output_table"></div>'+
'<div id="result">'+
'<textarea id="scene_data" class="textarea" col="30" rows="8" style="width:256px;height:256px;"></textarea><br>'+
'<button id="copy" >copy</button>'+
'<button id="clear_table" >clear everything</button>';

document.getElementById("scene_maker").insertAdjacentHTML( 'afterbegin', tool_html);
generate_table();
document.getElementById("clear_table").onclick = function(){clear_table();};
document.getElementById("copy").onclick = function(){CopyText();};
document.getElementById("scene_name").onchange = function(){generate_scene_data();};
document.getElementById("scene_rows").onchange = function(){generate_scene_data();};
document.getElementById("scene_cols").onchange = function(){generate_scene_data();};
document.querySelectorAll('div[id="output_table"]>table>tr>td').forEach(function(cell) {cell.onclick = function(){draw_field(this);generate_scene_data();};});
});