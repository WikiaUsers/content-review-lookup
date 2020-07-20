keys = [
	['prop', '屬性'],
	['breed', '種族'],
	['rank', 'Rank'],
	['name', '卡片名稱'],
	['max_hp', '最高血量'],
	['max_atk', '最高攻擊力'],
	['cost', 'Cost'],
	['card_filename', '卡片大圖名稱'],
	['small_filename', '卡片小圖名稱'],
	['evo_now', '目前進化級數'],
	['evo_max', '最高進化級數'],
	['max_level', '最高等級'],
	['as', '答題技能'],
	['ss', '特殊技能'],
	['ss_cd', '特殊技能冷卻回合數'],
	['evo_1', '進化卡片1 ID'],
	['evo_2', '進化卡片2 ID'],
	['evo_3', '進化卡片3 ID'],
	['evo_4', '進化卡片4 ID'],
	['evo_5', '進化卡片5 ID'],
	['evo_6', '進化卡片6 ID'],
	['evo_7', '進化卡片7 ID'],
	['evo_8', '進化卡片8 ID'],
	['evo_price', '進化所需金幣'],
	['sell_price', '販賣獲得金幣'],
	['evo_from', '進化自卡片 ID'],
	['evo_to', '進化為卡片 ID'],
	['evo_chain_before_note', ''],
	['evo_chain_after_note', ''],
	['evo_chain_branch', ''],
	['get_source', '取得來源'],
	['comment', '備註', 'textarea']
];

function get_page_title_by_id(card_id) {
	return "Template:" + card_id.toString();
}

function errorHandler() {
	$("#msg").html("卡片修改/新增發生錯誤，請再試一次").delay(5000).hide(1000);
	$("#search").delay(5000).show(1000);
	$("#data").html("");
	$('html, body').animate({
		scrollTop: 0
	}, 1000);
}

function getCardDataDone(data) {
	// 卡片編號
	var card_id = parseInt($("#card_id").val());
	
	// 根據編號取得 page title
	var title = get_page_title_by_id(card_id);
	
	var card_data_split = data.split("\n");
	var card_data = {};
	card_data["id"] = card_id.toString();
	var status = 0;
	for (var line_index in card_data_split) {
		if (line_index == "") { continue; }
		var line = card_data_split[line_index];
		if (line[0] == "|") {
			var before = line.substr(1, line.search("=") - 1);
			var after = line.substr(line.search("=") + 1);
			if (before != "") {
				card_data[before] = after;
			}
		}
	}
	
	// 產生編輯表單
	var table_elem = $("<table class='article-table'><tr><th>卡片 ID</th><td>" + card_data["id"] + "</td></tr></table>");
	for (var key_index in keys) {
		var key = keys[key_index];
		if (key[1] == "") {
			table_elem.append("<tr><th>" + key[1] + "</th><td><input type='hidden' id='" + key[0] + "' value='" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "' /></td></tr>");
		} else {
			if(key[2] && key[2] == "textarea"){
				table_elem.append("<tr><th>" + key[1] + "</th><td><textarea id='" + key[0] + "'>" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "</textarea></td></tr>");
			}else{
				table_elem.append("<tr><th>" + key[1] + "</th><td><input type='text' id='" + key[0] + "' value='" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "' /></td></tr>");
			}
		}
	}
	$("#msg").html("讀取完成").hide(1000);
	$("#data").html(table_elem).show(1000);
	$("#data").append("<button id='cancel_btn'>取消編輯</button>&nbsp;<button id='confirm_btn'>確認編輯</button>");
	$("#cancel_btn").on("click", function() {
		$("#data").hide(1000).html("");
		$("#search").show(1000);
	});
	$("#confirm_btn").on("click", function() {
		$("#msg").html("修改卡片資料中...").show(1000);
		$("#data").hide(1000);
	
		// 產生該張卡片的資料表單
		var card_text = "{{" + card_id.toString() + "|json\n";
		for (var key_index in keys) {
			var key = keys[key_index];
			card_text += "|" + key[0] + "=" + $("#" + key[0]).val() + "\n";
		}
		card_text += "}}\n";
		
		// 修改頁面
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'edit',
				title: 'Template:' + card_id.toString(),
				text: card_text,
				token: mw.user.tokens.get('editToken')
			},
			dataType: 'json',
			type: 'POST',
			cache: false,
			success: function( data ) {
				if ( data && data.edit && data.edit.result == 'Success' ) {
					// 成功新增題目
					$("#msg").html("卡片修改/新增完成").delay(1000).hide(1000);
					$("#search").delay(1000).show(1000);
					$("#data").html("");
					$('html, body').animate({
						scrollTop: 0
					}, 1000);
				} else if ( data && data.error ) {
					errorHandler();
					// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
				} else {
					errorHandler();
					// alert( 'Error: Unknown result from API.' );
				}
			},
			error:	function( xhr ) {
				errorHandler();
				// alert( 'Error: Request failed.' );
			}
		});
	});
}

function getCardData() {
	// 隱藏搜尋欄
	$("#search").hide(1000);
	$("#msg").html("讀取卡片資料中...").show(1000);

	// 卡片編號
	var card_id = parseInt($("#card_id").val());
	
	// 根據編號取得 page title
	var title = get_page_title_by_id(card_id);
	
	// 取得該頁面資料
	$.ajax({
		url: "http://zh.btoky.wikia.com/wiki/" + title + "?action=raw",
		cache: false,
		statusCode: {
			404: function () {
				getCardDataDone("");
			}
		}
	}).done(function (data) {
		getCardDataDone(data);
	});
}

$(document).ready(function () {
	$("#get_card").on('click', function() {
		getCardData();
	});
});