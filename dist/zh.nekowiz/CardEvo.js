function input_card_name_keyup_fun() {
	$("#card_search_result").html("");
	var card_name = $("#input_card_name").val();
	if (card_name === "") {
		return;
	}
	$("#card_serach_result").html("搜尋中...");
	var search_result_html = "<table>";
	var db_result = card_db({name: {like: card_name}});
	db_result.each(function (record,recordnumber) {
		search_result_html += "<tr><td><span class='search_result_small_img' data-card_id='" + record["id"] + "' data-small_filename='" + record["small_filename"] + "'></span></td><td>" + record["name"] + "</td></tr>";
	});
	search_result_html += "</table>";
	$("#card_search_result").html(search_result_html);
	$(".search_result_small_img").each(function() {
		var small_url = "https://nekowiz.fandom.com/zh/api.php?action=query&prop=imageinfo&titles=File:" + $(this).data("small_filename") + "&iiprop=url&format=json";
		var this_element = $(this);
		var card_id = this_element.data("card_id");
		this_element.append("<a href='javascript:add_card(" + card_id + ");'></a>");
		this_element.find("a").append(get_img_by_card_id(card_id));
	});
}

function get_img_by_card_id(card_id) {
	var card_data;
	if (card_id === "") {
		card_data = {small_filename: "0000.png"};
	} else {
		card_data = card_db({id: card_id.toString()}).first();
	}
	var img_elem = $("<img height='60px' width='60px' title='" + card_id.toString() + "' />");
	if (card_data) {
		var small_url = "https://nekowiz.fandom.com/zh/api.php?action=query&prop=imageinfo&titles=File:" + card_data["small_filename"] + "&iiprop=url&format=json";
		$.getJSON(small_url, function(data) {
			for (var first in data.query.pages) {break;}
			if (data.query.pages[first].imageinfo === undefined) {
				return;
			}
			var url = data.query.pages[first].imageinfo[0].url;
			img_elem.attr("src", url);
		});
	}
	return img_elem;
}

function remove_card(elem) {
	var first_tr_parent = $(elem).parents("tr:first");
	var card_id = first_tr_parent.data("card_id");
	$("#evo_list").find("tr[data-card_id=" + card_id.toString() + "]").remove();
	var card_data = card_db({id: card_id.toString()}).first();
	if (card_data) {
		for (var i = 1; i <= 8; ++i) {
			var index_name = "evo_" + i.toString();
			var evo_id = card_data[index_name];
			if (evo_id === "") {
				continue;
			}
			evo_count[evo_id] -= 1;
		}
	}
	update_evo_total();
}

function add_card(card_id) {
	$("#evo_list").append("<tr data-card_id='" + card_id.toString() +"'></tr>");
	var last_tr = $("#evo_list").find("tr:last");
	// small_picture
	last_tr.append("<td rowspan='2'><a href='javascript:return false;' onclick='remove_card(this);'></a></td>");
	last_tr.find("td:last a").append(get_img_by_card_id(card_id));
	var card_data = card_db({id: card_id.toString()}).first();
	if (card_data) {
		last_tr.append("<td rowspan='2'>" + card_data["name"] + "</td>");
		// evo_1~8
		for (var i = 1; i <= 8; ++i) {
			var index_name = "evo_" + i.toString();
			last_tr.append("<td></td>");
			var evo_id = card_data[index_name];
			last_tr.find("td:last").append(get_img_by_card_id(evo_id));
			if (i == 4) {
				// evo_to td
				last_tr.append("<td rowspan='2'></td>");
				if (card_data['evo_to'] !== "") {
					last_tr.find("td:last").append("<a href='javascript:return false;' onclick='add_card(" + card_data['evo_to'] + ");'></a>");
					last_tr.find("td:last a").append(get_img_by_card_id(card_data['evo_to']));
				}
				
				$("#evo_list").append("<tr data-card_id='" + card_id.toString() +"'></tr>");
				last_tr = $("#evo_list").find("tr:last");
			}
			if (evo_id === "") {
				continue;
			}
			if (evo_id in evo_count === false) {
				evo_count[evo_id] = 1;
			} else {
				evo_count[evo_id] += 1;
			}
		}
		update_evo_total();
		$("#card_search_result").html("");
		
		if ($("#select_with_evo").prop("checked") === true && card_data['evo_to'] !== "") {
			add_card(card_data['evo_to']);
		}
	} else {
		last_tr.append("<td rowspan='2'><td></td><td></td><td></td><td></td>");
		// evo_to td
		last_tr.append("<td rowspan='2'></td>");
		if (card_data['evo_to'] !== "") {
			last_tr.find("td:last").append(get_img_by_card_id(card_data['evo_to']));
		}
		$("#evo_list").append("<tr data-card_id='" + card_id.toString() +"'></tr>");
		last_tr = $("#evo_list").find("tr:last");
		last_tr.append("<td></td><td></td><td></td><td></td>");
	}
}

function update_evo_total() {
	$("#evo_total").html("");
	$("#evo_total").append("<tr><th></th><th>屬性</th><th>Rank</th><th>需求總數</th><th>倉庫總數</th></tr>");
	for (var card_id in evo_count) {
		var total_number = evo_count[card_id];
		if (total_number === 0) {
			continue;
		}
		var card_info = card_db({id: card_id.toString()}).first();
		$("#evo_total").append("<tr></tr>");
		var last_tr = $("#evo_total").find("tr:last");
		last_tr.append("<td></td>");
		last_tr.find("td:last").append(get_img_by_card_id(card_id));
		// last_tr.append("<td>" + card_info['name'] + "</td>");
		last_tr.append("<td>" + card_info['prop'] + "</td>");
		last_tr.append("<td>" + card_info['rank'] + "</td>");
		last_tr.append("<td>" + total_number + "</td>");
		var have_number = (card_id in have_list ? have_list[card_id] : "0");
		last_tr.append("<td><input type='number' name='have_number' value='" + have_number + "' min='0' data-card_id='" + card_id.toString() + "' /></td>");
	}
}

function save_to_browser() {
	var card_list = {};
	$("#evo_list tr[data-card_id]").each(function () {
		card_list[$(this).data("card_id")] = 1;
	});
	localStorage.setItem("card_list", JSON.stringify(card_list));

	have_list = {};
	$("input[name='have_number']").each(function () {
		have_list[$(this).data("card_id")] = $(this).val();
	});
	localStorage.setItem("have_list", JSON.stringify(have_list));
}

function load_from_browser() {
	$("#evo_list tr[data-card_id]").remove();
	evo_count = {};
	have_list = JSON.parse(localStorage.getItem("have_list"));
	if (have_list === null)
		have_list = {};
	var card_list = JSON.parse(localStorage.getItem("card_list"));
	for (var card_id in card_list) {
		add_card(card_id);
	}
}

$(window).load(function() {

	$("#input_card_name").on({
		keyup: input_card_name_keyup_fun
	});
	$("#save_to_browser").on({
		click: save_to_browser
	});
	$("#load_from_browser").on({
		click: load_from_browser
	});
	// load_card_from_wiki($("#loading_msg"), $("#card_evo_info"));
	load_card_from_json($("#loading_msg"), $("#card_evo_info"));
	evo_count = {};
	have_list = {};
});