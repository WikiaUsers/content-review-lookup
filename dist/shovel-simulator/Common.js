/* Any JavaScript here will be loaded for all users on every page load. */

/***
 * Shoveldex - will move to importJS file group once done
 ***/

// Pets Data to show. -nid to find a way to store these data... josn file?
petData = [
	// Gen 1 Common Pets
	{ name:"Bulldozer", 		gen:"Gen 1", rarity:"Common", ability:"Dig Faster" },
	{ name:"Excavator", 		gen:"Gen 1", rarity:"Common", ability:"Triple Strike" },
	{ name:"Dump Truck",		gen:"Gen 1", rarity:"Common", ability:"Fetch Items" },
	{ name:"Basic Tank",		gen:"Gen 1", rarity:"Common", ability:"Dig Faster" },
	{ name:"Ambulance", 		gen:"Gen 1", rarity:"Common", ability:"First Aid" },
	{ name:"Cement Truck",		gen:"Gen 1", rarity:"Common", ability:"Dig Faster" },
	{ name:"Forklift",			gen:"Gen 1", rarity:"Common", ability:"Shovel Boost" },
	{ name:"Watermelon Truck",	gen:"Gen 1", rarity:"Common", ability:"Backpack Boost" },
	// Gen 1 Rare Pets
	{ name:"Tractor",			gen:"Gen 1", rarity:"Rare", ability:"Sprint" },
	{ name:"Police Car",		gen:"Gen 1", rarity:"Rare", ability:"Sprint" },
	{ name:"Helicopter",		gen:"Gen 1", rarity:"Rare", ability:"Dig Faster" },
	{ name:"School Bus",		gen:"Gen 1", rarity:"Rare", ability:"Fetch Items" },
	{ name:"Cargo Plane",		gen:"Gen 1", rarity:"Rare", ability:"Sprint" },
	{ name:"Jeep",				gen:"Gen 1", rarity:"Rare", ability:"Sprint" },
	{ name:"Firetruck", 		gen:"Gen 1", rarity:"Rare", ability:"Water Can" },
	// Gen 1 Epic Pets
	{ name:"Tug Boat",			gen:"Gen 1", rarity:"Epic", ability:"Dig Faster" },
	{ name:"Air Bus 888",		gen:"Gen 1", rarity:"Epic", ability:"Sprint" },
	{ name:"Moon Buggy",		gen:"Gen 1", rarity:"Epic", ability:"Moon Jump" },
	{ name:"Steamroller",		gen:"Gen 1", rarity:"Epic", ability:"Sprint" },
	{ name:"Spacetrek(tm)", 	gen:"Gen 1", rarity:"Epic", ability:"Warp" },
	{ name:"Spacewar(tm)",		gen:"Gen 1", rarity:"Epic", ability:"Dig Faster" },
	{ name:"Harvester", 		gen:"Gen 1", rarity:"Epic", ability:"Dig Faster" },
	// Gen 1 Legend Pets
	{ name:"UFO",				gen:"Gen 1", rarity:"Legendary", ability:"Shockwave" },
	{ name:"Lunar Lander",		gen:"Gen 1", rarity:"Legendary", ability:"Moon Jump" },
	{ name:"MegaTank",			gen:"Gen 1", rarity:"Legendary", ability:"Quad Strike" },
	{ name:"Biplane",			gen:"Gen 1", rarity:"Legendary", ability:"Item Tornado" },
	{ name:"Red Baron", 		gen:"Gen 1", rarity:"Legendary", ability:"Item Tornado" },
	{ name:"Shuttle",			gen:"Gen 1", rarity:"Legendary", ability:"shockwave" },
	// Gen 1 Exotic Pets
	{ name:"The Radish",		gen:"Gen 1", rarity:"Exotic", ability:"The Radish" },
	{ name:"Ice Cream Van", 	gen:"Gen 1", rarity:"Exotic", ability:"Ice Cream" },
	
	// Gen 2 Common Pets
	{ name:"Chicken", 			gen:"Gen 2", rarity:"Common", ability:"Chicken Power" },
	{ name:"Farm Cat", 			gen:"Gen 2", rarity:"Common", ability:"Fetch Items" },
	{ name:"Parrot", 			gen:"Gen 2", rarity:"Common", ability:"Super Jump" },
	
	// Gen 2 Wild Pets
	{ name:"Duck", 				gen:"Gen 2", rarity:"Wild", ability:"Duck Power" },
	{ name:"Cow", 				gen:"Gen 2", rarity:"Wild", ability:"Super Dig Fast" },
	{ name:"Froggle", 			gen:"Gen 2", rarity:"Wild", ability:"Frog Stomp" },
	
	// Limited Pets
	{ name:"BAttleship", 		gen:"Gen 1", rarity:"Limited", ability:"Naval Superiority" },
	{ name:"Hot Air Balloon",	gen:"Gen 1", rarity:"Limited", ability:"Warp" },
	{ name:"SnowGlobe 2021", 	gen:"Holiday", rarity:"Limited", ability:"Snow Power 2021" },
	{ name:"Unicorn", 			gen:"Gen 2", rarity:"Limited", ability:"Rainbow Laser" },
	{ name:"Donut Balloon", 	gen:"Gen 2", rarity:"Limited", ability:"Warp" },
];

var shovelPage = 1;
$(".shoveldex-btn").click(function(){
	switch(this.id){
		case "shoveldex-back": shovelPage--; break;
		case "shoveldex-next": shovelPage++; break;
	}
	// hide all divs
	$(".shoveldex-table").hide();
	// show div based on pagenumber
	switch(shovelPage){
		case 0: case 1:
			shovelPage = 1; // change pageNo. to 1
			x = "Gen 1 Pets"; y = "gen1"
			break;
		case 2:
			x = "Gen 2 Pets"; y = "gen2"
			break;
		case 3: case 4:
			shovelPage = 3; // change pageNo. to 3
			x = "Limited Pets"
			y = "limited"
			break;
	}
	
	$("#shoveldex-"+y).fadeIn(200);
	$("#shoveldex-head").html(x);
	
});

$(".shoveldex-table-row>div").on("mousemove",function(e){

	// find pet name
	petName = $(this).children("a").attr("title")
	$("#shoveldex-pName").html(petName);
	
	// find pet Rarity
	for (var i=0; i < petData.length; i++) {
        if (petData[i].name === petName) {
            petGen = petData[i].gen;
            petRarity = petData[i].rarity;
            petAbility = petData[i].ability;
        }
    }
    
    // Change Rarity Text Color
    switch(petRarity){
    	case "Common":		pAtext = "#c0c0c0"; break;
    	case "Rare":		pAtext = "#32cd32"; break;
    	case "Epic":		pAtext = "#ff00ff"; break;
    	case "Wild":		pAtext = "#F1E031"; break;
    	case "Legendary":	pAtext = "#1e90ff"; break;
    	case "Exotic":		pAtext = "#00ffff"; break;
    	case "Limited":		pAtext = "#FFDF00"; break;
    	default: console.log("Shoveldex Rarity Error");
    }
    
    
    $("#shoveldex-pGen").html(petGen);
	$("#shoveldex-pRare").html(petRarity).css({"color":pAtext});
	$("#shoveldex-pAbility").html(petAbility);
	
	
	// find cursor x,y coord so that the hover element will show like LOL wiki hover pop-up.
	SH_posX = "calc("+e.pageX+"px - 10vw)";
	SH_posY = "calc("+e.pageY+"px - 15vh)";
	
	// transform3D = "transform3d("+SH_posX+"px,"+SH_posY+"px, 0)";
	e.preventDefault();
	$("#shoveldex-hover").show().css({
		"position":"absolute",
		"top": SH_posY,
		"left":SH_posX,
		})

});

$(".shoveldex-table-row>div").mouseout(function(e){
	$("#shoveldex-hover").hide()
});