/* Any JavaScript here will be loaded for all users on every page load. */
function lol_search_champion(searchbox) {
	searchbox = $(searchbox)
	var rx = new RegExp('^.*?(' + searchbox.val().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ').*?$','i');
	$.each(lol_search_list, function(i, elem) {
		var flag = rx.test(lol_search_list[i][0]);
		if (flag) {
			lol_search_list[i][1].stop(true);
			lol_search_list[i][1].fadeTo(500, 1);
		} else {
			lol_search_list[i][1].stop(true);
			lol_search_list[i][1].fadeTo(500, 0.2);
		}
	});
}
function lol_clear_search_champion(searchbox) {
	searchbox = $('#mainpage_champ_search_box');
	searchbox.val('');
	searchbox[0].blur();
	$.each(lol_search_list, function(i, elem) {
		lol_search_list[i][1].stop(true);
		lol_search_list[i][1].fadeTo(500, 1);
	});
}

function lol_init_mainpage_search() {
	var search_div = $('#mainpage_champ_search')
	var the_list = $('#roster .character_icon A')
	if(!search_div.length || !the_list.length) return
	
	window.lol_search_list = []
	the_list.each(function(x) {
		var champ = the_list[x]
		window.lol_search_list.push([champ.title, $(champ)])
	});
	
	var searchbox = $('<input id="mainpage_champ_search_box" type="text">')
	search_div.append(searchbox)
	searchbox.keyup(function(e) { lol_search_champion(this) })
	searchbox.blur(function(e) { window.searchTimeoutRes = window.setTimeout(lol_clear_search_champion, 2000) })
	searchbox.focus(function(e) { if(window.searchTO) window.clearTimeout(window.searchTimeoutRes); })
}
addOnloadHook(lol_init_mainpage_search);