keys = [
	['attr', '屬性'],
	['race', '種族'],
	['rare', 'Rank'],
	['name', '卡片名稱'],
	['statsMax', '最高攻擊力'],
	['statsMax', '最高血量'],
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
	['evo_to', '進化為卡片 ID']
];

function get_page_title_by_id(card_id) {
	var card_id_low = Math.floor((card_id - 1) / 20) * 20 + 1;
	var card_id_high = card_id_low + 19;
	return "Template:" + card_id_low.toString();
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
				$("#msg").html("此卡片的模板尚未建立，請先建立該卡片的模版並且加入最基本的 switch 語句後再編輯卡片<br /><button id='reset_btn'>確定</button>");
				$("#reset_btn").on("click", function() {
					$("#msg").hide(1000).html("");
					$("#search").show(1000);
				});
			}
		}
	}).done(function (data) {
		var card_data_split = data.split("\n");
		var card_data = {};
		card_data["id"] = card_id.toString();
		var status = 0;
		for (var line_index in card_data_split) {
			var line = card_data_split[line_index];
			if (status == 0 && line[0] == "|" && line.substr(1, line.search("=") - 1) == card_id.toString()) {
				 status = 1;
			} else if (status == 1) {
				if (line[0] == "}") {
					break;
				} else {
					var before = line.substr(line.search("\\|")+1, line.search("=") - line.search("\\|") - 1);
					var after = line.substr(line.search("=")+1);
					if (before != "") {
						card_data[before] = after;
					}
				}
			}
		}
		
		// 產生編輯表單
		var table_elem = $("<table class='article-table'><tr><th>卡片 ID</th><td>" + card_data["id"] + "</td></tr></table>");
		for (var key_index in keys) {
			var key = keys[key_index];
			table_elem.append("<tr><th>" + key[1] + "</th><td><input type='text' id='" + key[0] + "' value='" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "' /></td></tr>");
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
			var card_text = "|" + card_id.toString() + "={{ #switch: {{{data}}}\n";
			for (var key_index in keys) {
				var key = keys[key_index];
				card_text += "    |" + key[0] + "=" + $("#" + key[0]).val() + "\n";
			}
			card_text += "    |\n";
			card_text += "}}\n";
			
			// 先取得該頁面的資料
			$.ajax({
				url: "http://zh.btoky.wikia.com/api.php?action=query&titles=" + title + "&prop=info|revisions&inprop=&intoken=edit&rvprop=timestamp|content&format=json",
				cache: false
			}).done(function (data) {
				var pages = data.query.pages;
				var page;
				for (var index in pages) {
					page = pages[index];
				}
				var starttimestamp = page.starttimestamp;
				data = page.revisions[0]["*"];
			
				var result_text = "";
				var card_data_split = data.split("\n");
				var status = 0;
				for (var line_index in card_data_split) {
					var line = card_data_split[line_index];
					if (status == 0 && line[0] == "|" && line.substr(1, line.search("=") - 1) == card_id.toString()) {
						 status = 1;
					} else if (status == 1) {
						if (line[0] == "}") {
							status = 2;
							result_text += card_text;
						}
					} else if (status == 0 && line[0] == "|" && parseInt(line.substr(1, line.search("=") - 1)) > card_id) {
						result_text += card_text;
						result_text += line + "\n";
						status = 2;
					} else {
						result_text += line + "\n";
					}
				}
				
				// 若到最後都沒有更新的話，補在最後
				if (status == 0) {
					var final_pos = result_text.lastIndexOf("}}");
					result_text = result_text.substr(0, final_pos) + card_text + result_text.substr(final_pos);
				}
				
				// 將 result_text 寫回頁面
				$.ajax({
					url: mw.util.wikiScript('api'),
					data: {
						format: 'json',
						action: 'edit',
						title: title,
						text: result_text,
						token: mw.user.tokens.get('editToken'),
						starttimestamp: starttimestamp
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
		});
	});
}

$(document).ready(function () {
	$("#get_card").on('click', function() {
		getCardData();
	});
});