/*
var all_bej3_backdrops = [
	[ "b/be/Bridge_shroom_castles",  "20221027080843" ],
	[ "0/08/Canyon_wall",            "20221027080848" ],
	[ "a/a9/Cloudfloat",             "20221027080852" ],
	[ "5/51/Crystal_mountain_peak",  "20221027080856" ],
	[ "b/b3/Dark_cave_thing",        "20221027080901" ],
	[ "d/d1/Desert_pyramids_sunset", "20221027080905" ],
	[ "0/05/Fairy_cave_village",     "20221027080909" ],
	[ "b/b5/Floating_rock_city",     "20221027080914" ],
	[ "1/1c/Flying_sail_boat",       "20221027080918" ],
	[ "b/bc/Horse_forest_tree",      "20221027080923" ],
	[ "9/9e/Jungle_ruins_path",      "20221027080928" ],
	[ "1/1c/Lantern_plants_world",   "20221027080934" ],
	[ "c/c5/Lion_tower_cascade",     "20221027080939" ],
    [ "c/ce/Overworld",              "20221027080948" ],
	[ "5/58/Pointy_ice_path",        "20221027080952" ],
	[ "c/c2/Pointy_ice_path_purple", "20221027080956" ],
	[ "3/33/Rock_city_lake",         "20221027081005" ],
	[ "9/97/Snowy_cliffs_castle",    "20221027081009" ],
	[ "2/2f/Treehouse_waterfall",    "20221027081014" ],
	[ "a/a8/Tube_forest_night",      "20221027081019" ],
	[ "6/6d/Water_bubble_city",      "20221027081023" ],
	[ "a/a0/Water_fall_cliff",       "20221027081028" ]
];
*/

var light_backdrop = function() {
    var light_backdrops = [
        [ "b/be/Bridge_shroom_castles",  "20221027080843" ],
        [ "0/08/Canyon_wall",            "20221027080848" ],
        [ "5/51/Crystal_mountain_peak",  "20221027080856" ],
        [ "b/b3/Dark_cave_thing",        "20221027080901" ],
        [ "d/d1/Desert_pyramids_sunset", "20221027080905" ],
        [ "b/b5/Floating_rock_city",     "20221027080914" ],
        [ "1/1c/Flying_sail_boat",       "20221027080918" ],
        [ "9/9e/Jungle_ruins_path",      "20221027080928" ],
        [ "1/1c/Lantern_plants_world",   "20221027080934" ],
        [ "c/c5/Lion_tower_cascade",     "20221027080939" ],
        [ "c/ce/Overworld",              "20221027080948" ],
        [ "5/58/Pointy_ice_path",        "20221027080952" ],
        [ "3/33/Rock_city_lake",         "20221027081005" ],
        [ "9/97/Snowy_cliffs_castle",    "20221027081009" ],
        [ "a/a8/Tube_forest_night",      "20221027081019" ],
        [ "6/6d/Water_bubble_city",      "20221027081023" ],
        [ "a/a0/Water_fall_cliff",       "20221027081028" ]
    ];
	var i = Math.floor(Math.random() * light_backdrops.length);
	return "https://static.wikia.nocookie.net/bejeweled/images/" + light_backdrops[i][0] +
           ".png/revision/latest?path-prefix=zh&cb=" + light_backdrops[i][1];
}();

var dark_backdrop = function() {
    var dark_backdrops = [
        [ "a/a9/Cloudfloat",             "20221027080852" ],
        [ "0/05/Fairy_cave_village",     "20221027080909" ],
        [ "b/b5/Floating_rock_city",     "20221027080914" ],
        [ "b/bc/Horse_forest_tree",      "20221027080923" ],
        [ "1/1c/Lantern_plants_world",   "20221027080934" ],
        [ "c/c2/Pointy_ice_path_purple", "20221027080956" ],
        [ "9/97/Snowy_cliffs_castle",    "20221027081009" ],
        [ "a/a8/Tube_forest_night",      "20221027081019" ],
        [ "6/6d/Water_bubble_city",      "20221027081023" ]
    ];
	var i = Math.floor(Math.random() * dark_backdrops.length);
	return "https://static.wikia.nocookie.net/bejeweled/images/" + dark_backdrops[i][0] +
           ".png/revision/latest?path-prefix=zh&cb=" + dark_backdrops[i][1];
}();

$(".main-container").prepend("<div class='random-backdrop' style='opacity:0'></div>");
$(".theme-fandomdesktop-light .random-backdrop").css("background-image", "url('" + light_backdrop + "')");
$(".theme-fandomdesktop-dark .random-backdrop").css("background-image", "url('" + dark_backdrop + "')");
$(".random-backdrop").css({
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

$(document).ready(function() {
    window.setInterval(function() {
        if (document.getElementsByClassName("fandom-sticky-header")[0].classList.contains("is-visible")) {
            $(".random-backdrop").css("opacity", "1");
        }
        else {
            $(".random-backdrop").css("opacity", "0");
        }
    }, 100);
});