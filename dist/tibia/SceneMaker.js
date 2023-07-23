//this code is used in [[Template:Scene/Maker]]
$(function(){
grid_size = 15;
//what number the brush represents in the grid
brush_on_grid = {
effect : [1,"Poof_Effect"],
caster : [2,"Mage_Outfit_Male_White"],
target : [3,"Target_Dummy_(Object)"],
sprite_1 : [4,"The Cobra Amulet Carpet"],
sprite_2 : [5,"The Idol of Tukh Carpet"],
sprite_3 : [6,"The Supreme Cube Carpet"]
};
//arrays for storing selected cells to decide the area size
field_rows = []; 
field_cols = [];
//selected brush with starting default 
brush = "effect";
//default scene grid size
max_col = 5;
max_row = 5;
array_grid = "";
array_col = "";

var default_scene_template = 
"{{Scene"+
"\n|effect="+brush_on_grid.effect[1]+ 
"\n|effect_2="+
"\n|background=canvas"+
"\n|caster="+brush_on_grid.caster[1]+ 
"\n|casting_effect="+
"\n|look_direction="+
"\n|caster_name ="+ 
"\n|effect_on_caster="+
"\n|effect_under_caster="+
"\n|target="+brush_on_grid.target[1]+ 
"\n|effect_on_target="+
"\n|effect_under_target="+
"\n|damage_effect="+
"\n|rotate90="+
"\n|sprite_1="+brush_on_grid.sprite_1[1]+ 
"\n|sprite_2="+brush_on_grid.sprite_2[1]+ 
"\n|sprite_3="+brush_on_grid.sprite_3[1]+ 
"\n|edge_size=32"+
"\n|input_array="+array_grid+
"\n|input_col="+array_col+
"}}";

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
		for (var col=1;col< grid_size+1; col++) {
			new_cell = document.createElement("td");
			new_row.appendChild(new_cell);
			new_cell.id = col+"-"+row;
		}
	}
	output_table_container.appendChild(output_table);
}

function generate_scene_data(){
	textarea_result = document.getElementById("scene_data");
	scene_template_text = document.getElementById("scene_template_input");
	scene_name = document.getElementById("scene_name").value.trim().replace(/\s+/g," ").replaceAll(" ","_"); //formatting name
	scene_data = "['"+scene_name+"'] = {{\n";
	current_row = 1;
	current_col = 1;
	array_grid = "";
	array_col = "";
	for (var o=0;o < max_col*max_row; o++) {
		clicked_id = current_col+"-"+current_row;
		if (document.getElementById(clicked_id).className.indexOf("has_") == 0){
				field = brush_on_grid[document.getElementById(clicked_id).className.replace("has_","")][0]+",";
		} else {
				field = "0,";
		}
		if (current_col < max_col) {
			current_col++;
			scene_data +=field;
		} else {
			current_col=1;
			current_row++;
			scene_data += field + "\n";
		}
		array_grid += field;
	}	
	array_col = max_col;
	array_grid = array_grid.substring(0, array_grid.length-1);
	scene_data += "},\n"+max_col+"},";
	scene_data = scene_data.replace(",\n}","}");
	textarea_result.value = scene_data;
	new_scene_template = scene_template_text.value.substring(0,scene_template_text.value.indexOf("input"))+'input_array='+array_grid+'\n|input_col='+array_col+'\n}}';
	scene_template_text.value = new_scene_template;

}


function draw_field(element){

selected_row = Number(element.id.split("-")[1]);
selected_col = Number(element.id.split("-")[0]);

	if (element.innerHTML  =="") {
			element.className  = "has_"+brush;
			effect = document.createElement("div");
			img = document.createElement("img");
			img.src = "https://tibia.fandom.com/index.php?title=Special:FilePath&file="+ brush_on_grid[brush][1]+".gif";
			effect.appendChild(img);
			element.appendChild(effect);
			field_rows.push(selected_row);
			field_cols.push(selected_col);
	} else {
		element.innerHTML ="";
		element.className ="";
		//removing selected column and row from selected lists
		field_rows.splice(field_rows.indexOf(selected_row), 1);
		field_cols.splice(field_cols.indexOf(selected_col), 1);
		max_row = 0;
		max_col = 0;
	}
	if (field_rows.length == 0) { //setting default grid size if no nothing is placed on the grid
		max_col = 5;
		max_row = 5;
	} else { //finding and defining the edge column and row of the drawn area
		max_row = Math.max.apply(null, field_rows);
		max_col = Math.max.apply(null, field_cols);
	}
}

function clear_table(){
	document.querySelectorAll('td[class^="has_"]').forEach( function(effect) {effect.className = "";effect.innerHTML="";});
	document.getElementById("scene_data").value = "";
	field_rows = [];
	field_cols = [];
	document.getElementById("scene_template_input").value = default_scene_template;
}

function CopyText(){
	document.getElementById("scene_data").select();
	document.getElementById("scene_data").setSelectionRange(0, -1);
	document.execCommand("copy");
}

function SetBrush(element){
	brush = element.value;
}

function expand_template(){
var api = new mw.Api();
scene_template_text = document.getElementById("scene_template_input").value;

api.post({
	action: 'expandtemplates',
	text: scene_template_text,
	prop: 'wikitext',
	format: 'json'}).done(
	function ( data ) {
		var expanded_result = data.expandtemplates.wikitext;
		document.getElementById("scene_area").innerHTML =""; 
		//these replacements are made to fix some issues with the  returned expanded text so it displays correctly
		//fix for {{filepath}} results
		expanded_result = expanded_result.replaceAll("https://static","<img src='https://static").replaceAll("prefix=en","prefix=en'>");
		//fix for 'Special:Redirect' urls
		expanded_result = expanded_result.replaceAll("https://tibia.","<img src='https://tibia.").replaceAll(".gif</div>",".gif'></div>");
		//removing automatic cateogry in expanded result
		expanded_result = expanded_result.replace("[[Category:Pages with Scenes]]","");
		//fix for missiles, shouldnt come up that often
		try {expanded_result = expanded_result.replace(/..\&frame../,expanded_result.match(/\&frame../)[0]+"'>");} catch(err){}
		document.getElementById("scene_area").insertAdjacentHTML( 'afterbegin', expanded_result);
	});
}

var tool_html = 
'<table>'+
'<tr><td><label for="scene_name">spell name :</label></td><td><input id="scene_name" type="text"></td></tr>'+
'<tr><td>brushes:</td><td><input type="radio" name="brush" id="effect" value="effect" checked><label for="effect"><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&amp;file='+brush_on_grid.effect[1]+'.gif"> Effect</label>'+
'<input type="radio" name="brush" id="caster" value="caster"><label for="caster"><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&amp;file='+brush_on_grid.caster[1]+'.gif"> Caster</label>'+
'<input type="radio" name="brush" id="target" value="target"><label for="target"><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&amp;file='+brush_on_grid.target[1]+'.gif"> Target</label>'+
'<input type="radio" name="brush" id="sprite_1" value="sprite_1"><label for="sprite_1"><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&amp;file='+brush_on_grid.sprite_1[1]+'.gif"> sprite_1</label>'+
'<input type="radio" name="brush" id="sprite_2" value="sprite_2"><label for="sprite_2"><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&amp;file='+brush_on_grid.sprite_2[1]+'.gif"> sprite_2</label>'+
'<input type="radio" name="brush" id="sprite_3" value="sprite_3"><label for="sprite_3"><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&amp;file='+brush_on_grid.sprite_3[1]+'.gif"> sprite_3</label>'+
'</td></tr>'+
'</table>'+
'<table>'+
'<tr><td><div id="output_table"></div></td><td><div id="scene_area"></div></td></tr></table>'+
'<div id="result">'+
'<table>'+
'<tr><td><textarea id="scene_data" class="textarea" col="30" rows="8" style="width:350px;height:350px;"></textarea><br>'+
'<button id="copy" >copy</button>'+
'<button id="clear_table" >clear everything</button></td>'+
'<td><textarea id="scene_template_input" class="textarea" col="30" rows="8" style="width:350px;height:350px;"></textarea><br>'+
'<button id="expand_scene">render scene</button>'+
'</td></tr></table>';

document.getElementById("scene_maker").insertAdjacentHTML( 'afterbegin', tool_html);
generate_table();
document.getElementById("scene_name").onchange = function(){generate_scene_data();};
document.getElementById("scene_template_input").value  = default_scene_template ;
document.getElementById("expand_scene").onclick = function(){expand_template();};
document.getElementById("copy").onclick = function(){CopyText();};
document.getElementById("clear_table").onclick = function(){clear_table();};
document.querySelectorAll('div[id="output_table"]>table>tr>td').forEach(function(cell) {cell.onclick = function(){draw_field(this);generate_scene_data();};});
document.getElementsByName('brush').forEach(function(brush) {brush.onclick = function(){SetBrush(this);};});
});