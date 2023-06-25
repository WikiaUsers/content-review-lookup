// this code is used in [[Transcripts/MapConvert]]
$(function(){
//list of base floor urls for [[Template:Map Image]] image creation
var floors = ["https://static.wikia.nocookie.net/tibia/images/1/1c/Minimap_Floor_0.png",
"https://static.wikia.nocookie.net/tibia/images/d/df/Minimap_Floor_1.png",
"https://static.wikia.nocookie.net/tibia/images/2/2a/Minimap_Floor_2.png",
"https://static.wikia.nocookie.net/tibia/images/8/87/Minimap_Floor_3.png",
"https://static.wikia.nocookie.net/tibia/images/f/f7/Minimap_Floor_4.png",
"https://static.wikia.nocookie.net/tibia/images/6/61/Minimap_Floor_5.png",
"https://static.wikia.nocookie.net/tibia/images/b/be/Minimap_Floor_6.png",
"https://static.wikia.nocookie.net/tibia/images/6/64/Minimap_Floor_7.png",
"https://static.wikia.nocookie.net/tibia/images/f/fc/Minimap_Floor_8.png",
"https://static.wikia.nocookie.net/tibia/images/e/e6/Minimap_Floor_9.png",
"https://static.wikia.nocookie.net/tibia/images/a/a3/Minimap_Floor_10.png",
"https://static.wikia.nocookie.net/tibia/images/e/e4/Minimap_Floor_11.png",
"https://static.wikia.nocookie.net/tibia/images/4/44/Minimap_Floor_12.png",
"https://static.wikia.nocookie.net/tibia/images/c/cf/Minimap_Floor_13.png",
"https://static.wikia.nocookie.net/tibia/images/9/90/Minimap_Floor_14.png",
"https://static.wikia.nocookie.net/tibia/images/f/ff/Minimap_Floor_15.png"];

function CopyText()
{
	document.getElementById("text_output").select();
	document.getElementById("text_output").setSelectionRange(0, -1);
	document.execCommand("copy");
}


function client_to_wiki(xy,mod) {
	//converting either an x or y coordinate from the client to tibiaWiki's mapper format,+1y is compensated via mod in the conversion
	return Math.floor(xy / 256) + "." +(xy % 256 +Number(mod));
}

function wiki_to_client(xy) {
	//converting either an x or y coordinate from the tibiaWiki's mapper format to the client's
	nums = xy.split(".");
	result = Number(nums[0]) * 256 +  Number(nums[1]);
	return result;
}


function map_result(x,y,z,zoom){ //producing the links after conversion for a given client coordinate and a minimap image
	maper_link = "https://tibia.fandom.com/wiki/Mapper?coords="+client_to_wiki(x, 0)+"-"+client_to_wiki(y,1)+"-"+z+"-"+zoom+"-1-1";
	document.getElementById("mapper_link").href = maper_link;
	document.getElementById("tibiamaps_link").href = "https://tibiamaps.io/map#"+x+","+y+","+z+":"+zoom;
	minimap_img_src = floors[Number(z)]+"/revision/latest/window-crop/width/"+20+"/x-offset/"+(x-31744-10)+"/y-offset/"+(y-30976-10)+"/window-width/20/window-height/20?cb=20201119145816&path-prefix=en&format=original";
	infobox_pos = "|posx = "+client_to_wiki(x,0)+"\n|posy = "+client_to_wiki(y,1)+"\n|posz = "+z;
	document.getElementById("text_output").innerHTML = infobox_pos;
	document.querySelectorAll("div[class='map_image'] > img")[0].src = minimap_img_src;
	document.querySelectorAll("div[class='minimap_clic'] > a")[0].href = maper_link;
}


function ProcessText() {//converting a given url or input to the appropriate opposite type
	text_input = document.getElementById("text_input").value.trim();
	text_output = document.getElementById("text_output").innerHTML;
	
	if (document.getElementById("input").checked == true) { //getting the coordinates from the html input
		x = document.getElementById("x_coor").value;
		y = document.getElementById("y_coor").value;
		z = document.getElementById("z_coor").value;
		zoom = document.getElementById("c_zoom").value;
		map_result(x,y,z,zoom);
	}
	if (document.getElementById("url").checked == true) { //url radio selected
		if (text_input.indexOf("tibiamaps") > 0 && text_input.split("#")[1].split(",").length == 3) { //checks if url contains 'tibiamaps' and is similar to what the code expects
			tibiamaps_url =  text_input.split("#");
			process = tibiamaps_url[1].split(",");
			x = process[0];
			y = process[1];
			z = process[2].split(":")[0];
			zoom = process[2].split(":")[1];
			map_result(x,y,z,zoom);
		} else if (text_input.indexOf("wiki/Mapper?coords") > 0 && text_input.split("=")[1].split("-").length == 6) { //check if url contains mapper and is similar to what the code expects
			mapper_c = text_input.split("=")[1].split("-");
			x = wiki_to_client(mapper_c[0]);
			y = wiki_to_client(mapper_c[1])-1;
			z =	mapper_c[2];
			zoom = mapper_c[3];
			map_result(x,y,z,zoom);
		} else {
			document.getElementById("text_output").innerHTML = "please paste a valid URL.";	
		}

	}
}
function insert_html(){
mapper_converter = '<h3>Map coordinates converter</h3>'+
'<ul><li>paste a valid <a href="https://tibia.fandom.com/wiki/TibiaMaps">TibiaMaps</a> or a <a href="https://tibia.fandom.com/wiki/Mapper">Mapper</a> to convert between the formats</li>'+
'<li>or use the input fields</li></ul>'+
'<textarea id="text_input" class="textarea" col="30" rows="8" style="width:500px;height:70px;"></textarea><br>'+
'<table>'+
'<tr><td><label for="url">URL</label></td><td><input type="radio" id="url"   name="input_type" value="0" checked></td></tr>'+
'<tr><td><label for="input">Input</label></td><td><input type="radio" id="input" name="input_type" value="0" ></td>'+
'</tr><tr><td><label for="x_coor"><div>x</div></label></td><td><input type="number" min="31744" max="34303" step="1" value="32368" id="x_coor" ></td></tr>'+
'<tr><td><label for="y_coor"><div>y</div></label></td><td><input type="number" min="30976" max="33023" step="1" value="32198" id="y_coor" ></td>'+
'</tr><tr><td><label for="z_coor"><div>z</div></label></td><td><input type="number" min="0" max="15" step="1" value="7" id="z_coor"></td>'+
'</tr><tr><td><label for="c_zoom"><div>zoom</div></label></td><td><input type="number" min="0" max="8" step="1" value="1" id="c_zoom"></td></tr>'+
'</table>'+
'<button id="convert">Convert</button><br>'+
'<h3>Result</h3>'+
'<textarea id="text_output" class="textarea" col="30" rows="8" style="width:500px;height:70px;"></textarea><br>'+
'<button id="copy">Copy result</button>'+
'<table>'+
'<tr><td><a href="https://tibia.fandom.com/wiki/Mapper">Mapper</a> Link</td><td><a id="mapper_link" href="https://tibia.fandom.com/wiki/Mapper?coords=126.112-125.239-7-2-1-1" alt="map link">Open Mapper</a></td></tr>'+
'<tr><td><a href="https://tibia.fandom.com/wiki/TibiaMaps">TibiaMaps</a> Link</td><td><a id="tibiamaps_link"<a id="mapper_link" href="https://tibiamaps.io/map#32368,32198,7:1" alt="map link">Open tibiamaps.io</a></td></tr>'+
'</table>';
}
insert_html();
document.getElementById("map_coo_converter").insertAdjacentHTML( 'afterbegin', mapper_converter);
document.getElementById("convert").onclick = function() {ProcessText();};
document.getElementById("copy").onclick = function() {CopyText();};
});