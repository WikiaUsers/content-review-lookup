/* Formulaic logic:
   
   xNum = numeric position of East/West parameter.
   yNum = numeric position of North/South parameter
   xMax, xMin, yMax and yMin are the minimum and maximum locations on a given map respectively.
   Range = (Max - Min) for the total available range of values on a map.
   xOffset = ((xNum - xMin) / Range) -- the Top-down offset percentage used to map the point.
   yOffset = ((yNum - yMin) / Range) -- the Left-right offset percentage used to map the point.

   HOWTO add/change coordinates:
   Go ingame, switch to full screen, open the map (Map has to be full discovered).
   Move the mouse the the SE and the NW corner.
   Write down coordinates for both SE and NW corners.
   Add those values to xMax, xMin, yMax, yMin for the appropriate area.
*/
// global variables needed to set positions...
xPos = "";
yPos = "";
mapsize = "300";
var linkCache = new Object();
var coords_hidden = new Boolean();

function getImageAndDisplay(zone) {
	var specialImageTitle = zone;
	var xNum = xPos;
	var xMin = 0;
	var xMax = 0;
	var yNum = yPos;
	var yMin = 0;
	var yMax = 0;
	switch (specialImageTitle) {
		//Alderaan
		case "Alsakan Lowlands":
			xMin = -501;
			xMax = 1524;
			yMin = 787;
			yMax = 2811;
			break;
		case "The Apalis Coast":
			xMin = -1850;
			xMax = -280;
			yMin = 660;
			yMax = 2228;
			break;
		case "The Glarus Valley":
			xMin = -2651;
			xMax = 747;
			yMin = -1969;
			yMax = 1462;
			break;
		case "The Juran Mountains":
			xMin = 92;
			xMax = 3000;
			yMin = -1312;
			yMax = 1592;
			break;
		//Balmorra Republic
		case "Bugtown":
			xMin = -237;
			xMax = 763;
			yMin = -725;
			yMax = 380;
			break;
		case "Gorinth Canyon (Republic)":
			xMin = -1091;
			xMax = 806;
			yMin = 825;
			yMax = 2721;
			break;
		case "Markaran Plains (Republic)":
			xMin = -1952;
			xMax = -465;
			yMin = 566;
			yMax = 2053;
			break;
		case "Sundari Flatlands (Republic)":
			xMin = 370;
			xMax = 1992;
			yMin = 479;
			yMax = 2100;
			break;
		//Belsavis
		case "Ancient Prison Caverns":
			xMin = -2835;
			xMax = -1537;
			yMin = -1976;
			yMax = -678;
			break;
		case "High Security Section":
			xMin = -2672;
			xMax = 978;
			yMin = -714;
			yMax = 2933;
			break;
		case "Maximum Security Section":
			xMin = -2713;
			xMax = -1293;
			yMin = -573;
			yMax = 845;
			break;
		case "Minimum Security Section":
			xMin = 35;
			xMax = 1908;
			yMin = -29;
			yMax = 1842;
			break;
		case "The Scar":
			xMin = -2265;
			xMax = -718;
			yMin = -2343;
			yMax = -795;
			break;
		case "The Tomb":
			xMin = -1793;
			xMax = 875;
			yMin = -3781;
			yMax = -1112;
			break;
		//Corellia
		case "Axial Park":
			xMin = -265;
			xMax = 1764;
			yMin = -3503;
			yMax = -1475;
			break;
		case "Blastfield Shipyards":
			xMin = -464;
			xMax = 1528;
			yMin = 507;
			yMax = 2498;
			break;
		case "Government District":
			xMin = 1731;
			xMax = 4674;
			yMin = -3710;
			yMax = -770;
			break;
		case "Labor Valley":
			xMin = -4066;
			xMax = -1718;
			yMin = -3330;
			yMax = -985;
			break;
		//Coruscant
		case "Black Sun Territory":
			xMin = -4129;
			xMax = -3006;
			yMin = -581;
			yMax = 541;
			break;
		case "Justicar Territory":
			xMin = 520;
			xMax = 1617;
			yMin = 3844;
			yMax = 4939;
			break;
		case "Old Galactic Market":
			xMin = 2132;
			xMax = 2720;
			yMin = 857;
			yMax = 1444;
			break;
		case "Senate Plaza":
			xMin = -1430;
			xMax = -878;
			yMin = -4616;
			yMax = -4064;
			break;
		//Darvannis
		case "Sandstorm Dunes":
			xMin = 32;
			xMax = 1082;
			yMin = -311;
			yMax = 739;
			break;
		case "The Scar (Darvannis)":
			xMin = -1203;
			xMax = -721;
			yMin = -27;
			yMax = 454;
			break;
		//Dromund Kaas
		case "Dromund Kaas":
			xMin = -2082;
			xMax = 1226;
			yMin = -1016;
			yMax = 2289;
			break;
		case "Dark Temple Approach":
			xMin = -2039;
			xMax = -595;
			yMin = -300;
			yMax = 1141;
			break;
		case "Kaas City":
			xMin = -593;
			xMax = 118;
			yMin = -279;
			yMax = 431;
			break;
		case "The Unfinished Colossus":
			xMin = -91;
			xMax = 874;
			yMin = 598;
			yMax = 1563;
			break;
		//Hoth
		case "Clabburn Tundra":
			xMin = -4248;
			xMax = -1801;
			yMin = -1222;
			yMax = 1222;
			break;
		case "Glacial Fissure":
			xMin = -1125;
			xMax = 1479;
			yMin = -1297;
			yMax = 1304;
			break;
		case "Highmount Ridge":
			xMin = -2857;
			xMax = 280;
			yMin = -1295;
			yMax = 1838;
			break;
		case "Icefall Plains":
			xMin = -4247;
			xMax = -1254;
			yMin = 16;
			yMax = 3006;
			break;
		case "The Starship Graveyard":
			xMin = 802;
			xMax = 3085;
			yMin = -960;
			yMax = 1319;
			break;
		case "Whiterock Wastes":
			xMin = -3697;
			xMax = -1919;
			yMin = -1837;
			yMax = -60;
			break;
		//Hutta
		case "Hutta":
			xMin = -682;
			xMax = 965;
			yMin = -413;
			yMax = 1232;
			break;
		//Korriban
		case "Korriban":
			xMin = -336;
			xMax = 702;
			yMin = -495;
			yMax = 542;
			break;
		case "Sith Academy":
			xMin = -468;
			xMax = -248;
			yMin = -110;
			yMax = 110;
			break;
		case "Sith Academy 2":
			xMin = -490;
			xMax = -287;
			yMin = -88;
			yMax = 114;
			break;
		case "Sith Academy 3":
			xMin = -588;
			xMax = -386;
			yMin = -109;
			yMax = 92;
			break;
		//Makeb
		case "Abandoned Mining Mesa":
			xMin = -2640;
			xMax = -2117;
			yMin = 1334;
			yMax = 1856;
			break;
		case "Avesta Plantation":
			xMin = 2314;
			xMax = 2804;
			yMin = 1023;
			yMax = 1513;
			break;
		case "Cartel Mining Mesa":
			xMin = -1341;
			xMax = 138;
			yMin = 1835;
			yMax = 3315;
			break;
		case "The Fingers":
			xMin = 2736;
			xMax = 3411;
			yMin = 1189;
			yMax = 1864;
			break;
		case "Gravity Hook Seven":
			xMin = -3793;
			xMax = -2904;
			yMin = -469;
			yMax = 418;
			break;
		case "Makeb Imperial Orbital Station":
			xMin = -3372;
			xMax = -3170;
			yMin = -204;
			yMax = -2;
			break;
		case "Makeb Republic Orbital Station":
			xMin = 2481;
			xMax = 2684;
			yMin = 762;
			yMax = 966;
			break;
		case "Solida Hesk's Estate":
			xMin = -3313;
			xMax = -2642;
			yMin = -2902;
			yMax = -2231;
			break;
		case "Telemur Mesa":
			xMin = -1808;
			xMax = -748;
			yMin = -2190;
			yMax = -1130;
			break;
		case "Volcanic Mesa":
			xMin = -2863;
			xMax = -2015;
			yMin = 2202;
			yMax = 3050;
			break;
		case "Westwater Settlements":
			xMin = -4237;
			xMax = -3431;
			yMin = -2177;
			yMax = -1371;
			break;
		//Nar Shaddaa
		case "Lower Industrial Sector":
			xMin = -2591;
			xMax = -1923;
			yMin = 2727;
			yMax = 3395;
			break;
		case "Lower Promenade":
			xMin = -1179;
			xMax = -639;
			yMin = -1128;
			yMax = -589;
			break;
		case "Nikto Sector":
			xMin = -3866;
			xMax = -3244;
			yMin = -3496;
			yMax = -2875;
			break;
		case "Red Light Sector":
			xMin = 2998;
			xMax = 3733;
			yMin = -3763;
			yMax = -3028;
			break;
		case "Shadow Town":
			xMin = 2152;
			xMax = 2805;
			yMin = 2578;
			yMax = 3231;
			break;
		case "The Works":
			xMin = 646;
			xMax = 1364;
			yMin = 4233;
			yMax = 4951;
			break;
		//Ord Mantell
		case "Fort Garnik":
			xMin = -14;
			xMax = 344;
			yMin = -168;
			yMax = 188;
			break;
		case "Mannett Point":
			xMin = 378;
			xMax = 1075;
			yMin = -28;
			yMax = 667;
			break;
		case "Savrip Island":
			xMin = -835;
			xMax = -506;
			yMin = -729;
			yMax = -400;
			break;
		case "Talloran Village":
			xMin = 389;
			xMax = 544;
			yMin = -233;
			yMax = -78;
			break;
		//Oricon
		case "Oricon":
			xMin = -952;
			xMax = 533;
			yMin = -762;
			yMax = 723;
			break;
		//Quesh
		case "Quesh":
			xMin = -1625;
			xMax = 2021;
			yMin = -1243;
			yMax = 2403;
			break;
		case "Yuna Crosscut":
			xMin = -25;
			xMax = 468;
			yMin = 413;
			yMax = 907;
			break;
		//Rishi
		case "Sky Ridge Island":
			xMin = -1251;
			xMax = 824;
			yMin = -3381;
			yMax = -1305;
			break;
		//Taris (Empire)
		case "The Brell Sediment (Empire)":
			xMin = 0;
			xMax = 0;
			yMin = 0;
			yMax = 0;
			break;
		case "Republic Resettlement Zone (Empire)":
			xMin = 0;
			xMax = 0;
			yMin = 0;
			yMax = 0;
			break;
		case "The Sinking City (Empire)":
			xMin = 0;
			xMax = 0;
			yMin = 0;
			yMax = 0;
			break;
		case "Tularan Marsh":
			xMin = 0;
			xMax = 0;
			yMin = 0;
			yMax = 0;
			break;
		//Taris (Republic)
		case "The Brell Sediment (Republic)":
			xMin = -915;
			xMax = 383;
			yMin = 206;
			yMax = 1505;
			break;
		case "Republic Resettlement Zone (Republic)":
			xMin = -2209;
			xMax = -745;
			yMin = -479;
			yMax = 985;
			break;
		case "The Sinking City (Republic)":
			xMin = -944;
			xMax = 560;
			yMin = -1102;
			yMax = 402;
			break;
		case "The Tularan Marsh":
			xMin = 6;
			xMax = 1623;
			yMin = -380;
			yMax = 1236;
			break;
		//Tatooine
		case "Anchorhead":
			xMin = 1296;
			xMax = 2523;
			yMin = -4261;
			yMax = -3036;
			break;
		case "Jundland":
			xMin = -1031;
			xMax = 2942;
			yMin = -3046;
			yMax = 923;
			break;
		case "The Dune Sea":
			xMin = -2814;
			xMax = -182;
			yMin = -2283;
			yMax = 345;
			break;
		//Tython
		case "Tython":
			xMin = -1590;
			xMax = 1088;
			yMin = -1518;
			yMax = 1161;
			break;
		//Voss
		case "The Gormak Lands":
			xMin = -935;
			xMax = 1208;
			yMin = 612;
			yMax = 2754;
			break;
		case "The Nightmare Lands":
			xMin = -74;
			xMax = 2698;
			yMin = -1269;
			yMax = 1500;
			break;
		case "The Old Paths":
			xMin = -2840;
			xMax = -273;
			yMin = -1900;
			yMax = 663;
			break;
		case "The Pelath-Ri Marches":
			xMin = -1595;
			xMax = 1360;
			yMin = -3334;
			yMax = -381;
			break;
		case "Voss-Ka":
			xMin = -482;
			xMax = 675;
			yMin = -724;
			yMax = 433;
			break;
	}
	xPos = getOffset(xMin, xMax, xNum);
	yPos = getOffset(yMin, yMax, yNum);

	//if our link hasn't been fetched yet, fetch it
	if(linkCache[specialImageTitle] == null) {
		$.getJSON(
			"/api.php?action=query&format=json",
			{titles: "File:"+specialImageTitle+" map.jpg|File:"+specialImageTitle+" map.png", 
				prop: "imageinfo", 
				iiprop: "url",
				iiurlwidth: mapsize
			},
			function(data) { 
				imageFound = false;
				for( var page in data.query.pages ) {
				//== null means comparing for "undefined" or "null"
					if(data.query.pages[page].missing == null) {
						if(!coords_hidden)
							linkCache[specialImageTitle] = data.query.pages[page].imageinfo[0].thumburl;
						showCoordsTip(linkCache[specialImageTitle]);
						imageFound = true;
					}
					if(imageFound)
						break;
				}
				if(!imageFound)
					alert("Error, image "+"File:"+specialImageTitle+"_map.jpg"+" or File:"+specialImageTitle+"_map.png were not found!");
			}
		);
	} else {
		return showCoordsTip(linkCache[specialImageTitle]);
	}

}

// validate the position is valid with respect to min and max "valid" positional values.
// if so, return its percent based relative position.  If not, return 0.
function getOffset(minPos, maxPos, actualPos) {
	offset = 0;
	rangeValue = maxPos - minPos;
	if (actualPos > maxPos) {
		offsetPos = -1;
	}
	else {
		if (actualPos < minPos) {
			offsetPos = -1;
		}
		else {
			offsetPos = ((actualPos - minPos) / rangeValue) * 100;
		}
	}
	return offsetPos;
}


// the core display tooltip function.
function tryCoordsTip(i) {
	if (tooltipsOn) {
		coords_hidden = false;
		var Span = $('#'+i);
		var zoneInfo = Span.attr("class").replace("coordslink ", "");
		var zone = "Universe";
		if (zoneInfo) {
			rawMapInfo = zoneInfo.split("--");
			zone = rawMapInfo[0];
			xPos = rawMapInfo[1];
			yPos = rawMapInfo[2];
		}
		zoneImage = getImageAndDisplay(zone);
	}
}

function showCoordsTip(zoneImage) {
		var tip = document.getElementById('coordstfb');
		tooltip = ttHTMLStart + '<div class="ZoneMap" style="position:relative;width:'+mapsize+'px;">';
		tooltip = tooltip + '<img width="'+mapsize+'px" src="' + zoneImage + '" alt="">';
		if (yPos >= 0 && xPos >= 0) {
			tooltip = tooltip + '<img style="position:absolute; height:8px; width:8px; left:'+xPos+'%; top:'+yPos+'%; margin:-4px" src="/media/e/e5/Coord_mark.gif">';
		}
		tooltip = tooltip + '</div></div>';
		tip.innerHTML = tooltip;
		tip.style.position = "absolute";
		tip.style.visibility = "hidden";
		tip.style.display = "block";
		tip.style.zIndex = "999";
		moveCoordsTip();
		tip.style.visibility = "visible";
}

// this function hides the tooltip.
function hideCoordsTip() {
	coords_hidden = true;
	var tip = document.getElementById('coordstfb');
	tip.innerHTML = "";
	tip.style.display = "none";
}

// This function moves the tool-tips when our mouse moves
function moveCoordsTip() {
	dbSleft = $(document).scrollLeft;
	dbStop = $(document).scrollTop;
	var tip = document.getElementById('coordstfb');
	var newTop = mousePos.y - (tip.clientHeight + 40);
	var newLeft = mousePos.x - ( tip.clientWidth / 2 );
	if( newTop < dbStop ) { 
		newTop = mousePos.y + 1;
		if ( newTop + tip.clientHeight > winSize.y ) newTop = dbStop; 
	}
	if( newLeft < dbSleft ) newLeft = dbSleft;
	if( ( mousePos.x + ( tip.clientWidth / 2 ) ) >= winSize.x - 150 ) newLeft = mousePos.x - ( 1.75 * tip.clientWidth );
	tip.style.top = newTop + "px";
	tip.style.left = newLeft + "px";
}

// activation function...
function cttMouseOver() {
	ttfdiv = document.createElement("div");
	ttfdiv.setAttribute("id", "coordstfb");
	contentstart = document.getElementById("content");
	contentstart.insertBefore(ttfdiv , contentstart.childNodes[0]);
	$('.coordslink').each(function(i) {
		$(this).attr("id", "ctt" + i);
		$(this).bind({
			mouseover: function() {
				tryCoordsTip($(this).attr("id"));
			},
			mouseout: function() {
				hideCoordsTip();
			},
			mousemove: function() {
				moveCoordsTip();
			}
		});
	});
}
cttMouseOver();