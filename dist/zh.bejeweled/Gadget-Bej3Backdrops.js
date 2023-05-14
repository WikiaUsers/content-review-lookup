$(document).ready(function(){
	if (window.gadget_Bej3Backdrops) return;
	window.gadget_Bej3Backdrops = true;
	
	var backdrops;
	if (mw.config.get("isDarkTheme")) backdrops = [
		"Cloudfloat",
        "Fairy_cave_village",
        "Floating_rock_city",
        "Horse_forest_tree",
        "Lantern_plants_world",
        "Pointy_ice_path_purple",
        "Snowy_cliffs_castle",
        "Tube_forest_night",
        "Water_bubble_city"
	];
	else backdrops = [
		"Bridge_shroom_castles",
        "Canyon_wall",
        "Crystal_mountain_peak",
        "Dark_cave_thing",
        "Desert_pyramids_sunset",
        "Floating_rock_city",
        "Flying_sail_boat",
        "Jungle_ruins_path",
        "Lantern_plants_world",
        "Lion_tower_cascade",
        "Overworld",
        "Pointy_ice_path",
        "Rock_city_lake",
        "Snowy_cliffs_castle",
        "Tube_forest_night",
        "Water_bubble_city",
        "Water_fall_cliff"
	];
	var backdrop = backdrops[Math.floor(Math.random() * backdrops.length)];
	backdrop = "https://bejeweled.fandom.com/zh/wiki/Special:Redirect/file/" + backdrop + ".png";
	
	$(".main-container").prepend('<div class="random-backdrop" style="opacity:0"></div>');
	$(".random-backdrop").css({
		"background-image": 'url("' + backdrop + '")',
	    "background-size": "cover",
	    "background-repeat": "no-repeat",
	    "background-attachment": "fixed",
	    "background-position": "center center",
	    "z-index": "-1",
	    "height": "100%",
	    "width": "100%",
	    "position": "fixed",
	    "transition": "opacity 0.25s linear"
	});
	
	window.setInterval(function() {
		$(".random-backdrop").css("opacity", $(".fandom-sticky-header").hasClass("is-visible") ? "1" : "0");
    }, 100);
});