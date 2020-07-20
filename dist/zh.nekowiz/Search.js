$("div.title:last").after('<div class="questFinder"><div class="msg"><div class="msg1"></div><div class="msg2"></div><div class="msg3"></div></div><div class="search" style="display: none;"><input type="text" class="question" placeholder="部分題目" /><div class="toolbar"><label for="qTypeSelect"><input type="radio" id="qTypeSelect" name="type" value="select" checked />四選ㄧ</label><label for="qTypeSort"><input type="radio" id="qTypeSort" name="type" value="sort" />排序</label><label for="qTypeDaily"><input type="radio" id="qTypeDaily" name="type" value="daily" />每日</label>搜尋最小字數: <input type="number" class="search_min_word" value="1" min="1" max="20" /></div></div><div class="result" style="display: none;"></div><div class="edit" style="display: none;"></div></div>');
$("head").append('<style>div.questFinder input[type="text"]{width: 100%;font-size: 14pt;font-family: 微軟正黑體;}div.questFinder .search{background-color: rgba(255,0,0,0.3);border-radius: 3px;padding: 10px;margin: 10px 0px;font-size: 14pt;}div.questFinder .search .toolbar{padding: 10px;}div.questFinder .question{width: 95% !important;border-radius: 3px;padding: 5px;font-size: 14pt;font-family: 微軟正黑體;}div.questFinder .search label{cursor: pointer;}</style>');

importScript('MediaWiki:Taffy-min.js');

loading_status = {
	normal: false,
	sort: false,
	daily: false
}

q_data = {
	normal: [],
	sort: [],
	daily: []
};

taffy_dbs = {
};

function errorHandler() {
	$(".questFinder .msg").html("新增時發生錯誤，請重新嘗試").delay(1000).hide(1000);
	$(".questFinder .edit").delay(1000).show(1000);
}

function editQuestionSelect(q_id) {
	if (mw.user.anonymous()) {
		alert('請先登入Wikia');
		return false;
	}
	// 將搜尋 & 結果隱藏
	$(".questFinder .result").hide(1000).html("");
	$(".questFinder .search").hide(1000);

	var edit_finish_fun = function () {
		$(".questFinder .edit").hide(1000).html("");
		$(".questFinder .result").show(1000);
		$(".questFinder .search").show(1000);
	};

	// 根據 id 取得題目內容
	var title = "模板:題庫/四選一/" + (Math.floor((q_id - 1) / 500) + 1).toString()
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/wiki/" + title + "?action=raw",
		cache: false
	}).done(function (data) {
		var data_arr = $.trim(data).split("\n");
		for (var question_index in data_arr) {
			var question = data_arr[question_index];
			var question_arr = $.trim(question).split("|");
			var question_id = parseInt(question_arr[0]);
			if (question_id != q_id) {
				continue;
			} else {
				var question_gen = question_arr[1];
				var question_text = question_arr[2];
				var question_answer = question_arr[3];
				var question_color = question_arr[4];

				// 產生編輯表單
				var result_html = "題目類型：<select class='gen'><option>生活常識</option><option>動漫與遊戲</option><option>文科</option><option>理科</option><option>演藝</option><option>體育</option><option>&lt;待填&gt;</option></select><hr />題目難度：<select class='color'><option>1色</option><option>2色</option><option>3色</option><option>&lt;待填&gt;</option></select><hr /><input type='text' class='problem' placeholder='題目內容' /><hr /><input type='text' class='answer' placeholder='答案' /><hr /><button class='cancel_edit'>取消修改</button>&nbsp;<button class='confirm_edit'>確認修改</button>";
				$(".questFinder .edit").html(result_html).show(1000);
				$(".questFinder .gen").val(question_gen);
				$(".questFinder .color").val(question_color);
				$(".questFinder .problem").val(question_text);
				$(".questFinder .answer").val(question_answer);

				$(".questFinder .cancel_edit").on('click', function () {
					edit_finish_fun();
				});
				$(".questFinder .confirm_edit").on('click', function () {
					// 隱藏編輯表單
					$(".questFinder .edit").hide(1000);
					$(".questFinder .msg").html("修改題目中...").show(1000);

					// 產生新題目的該行
					var new_question_line = q_id.toString() + "|" + $(".questFinder .gen").val() + "|" + $(".questFinder .problem").val() + "|" + $(".questFinder .answer").val() + "|" + $(".questFinder .color").val() + "\n";

					// 重新取得該頁面所有內容
					$.ajax({
						url: "https://nekowiz.fandom.com/zh/api.php?action=query&titles=" + title + "&prop=info|revisions&inprop=&intoken=edit&rvprop=timestamp|content&format=json",
						cache: false
					}).done(function (data) {
						var pages = data.query.pages;
						var page;
						for (var index in pages) {
							page = pages[index];
						}
						var starttimestamp = page.starttimestamp;
						var content = page.revisions[0]["*"];

						var new_content = "";
						var data_arr = $.trim(content).split("\n");
						for (var question_index in data_arr) {
							var question = data_arr[question_index];
							var question_arr = $.trim(question).split("|");
							var question_id = parseInt(question_arr[0]);
							if (question_id != q_id) {
								new_content += (question + "\n");
							} else {
								new_content += new_question_line;
							}
						}
						// 將 new_content 寫回題庫
						$.ajax({
							url: mw.util.wikiScript('api'),
							data: {
								format: 'json',
								action: 'edit',
								title: title,
								summary: $(".questFinder .problem").val(),
								text: new_content,
								token: mw.user.tokens.get('editToken'),
								starttimestamp: starttimestamp
							},
							dataType: 'json',
							type: 'POST',
							cache: false,
							success: function (data) {
								if (data && data.edit && data.edit.result == 'Success') {
									// 成功新增題目
									$(".questFinder .msg").html("題目新增完成").delay(1000).hide(1000);
									edit_finish_fun();
								} else if (data && data.error) {
									errorHandler();
									// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
								} else {
									errorHandler();
									// alert( 'Error: Unknown result from API.' );
								}
							},
							error: function (xhr) {
								errorHandler();
								// alert( 'Error: Request failed.' );
							}
						});
					})
				});
			}
		}
	}).error(function () {
		edit_finish_fun();
	});
}

function editQuestionSort(q_id) {
	if (mw.user.anonymous()) {
		alert('請先登入Wikia');
		return false;
	}
	// 將搜尋 & 結果隱藏
	$(".questFinder .result").hide(1000).html("");
	$(".questFinder .search").hide(1000);

	var edit_finish_fun = function () {
		$(".questFinder .edit").hide(1000).html("");
		$(".questFinder .result").show(1000);
		$(".questFinder .search").show(1000);
	};

	// 根據 id 取得題目內容
	var title = "模板:題庫/排序/" + (Math.floor((q_id - 1) / 500) + 1).toString()
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/wiki/" + title + "?action=raw",
		cache: false
	}).done(function (data) {
		var data_arr = $.trim(data).split("\n");
		for (var question_index in data_arr) {
			var question = data_arr[question_index];
			var question_arr = $.trim(question).split("|");
			var question_id = parseInt(question_arr[0]);
			if (question_id != q_id) {
				continue;
			} else {
				var question_text = question_arr[1];
				var question_answer1 = question_arr[2];
				var question_answer2 = question_arr[3];
				var question_answer3 = question_arr[4];
				var question_answer4 = question_arr[5];

				// 產生編輯表單
				var result_html = "<input type='text' class='problem' placeholder='題目內容' /><hr /><input type='text' class='answer1' placeholder='順位1' /><hr /><input type='text' class='answer2' placeholder='順位2' /><hr /><input type='text' class='answer3' placeholder='順位3' /><hr /><input type='text' class='answer4' placeholder='順位4' /><hr /><button class='cancel_edit'>取消修改</button>&nbsp;<button class='confirm_edit'>確認修改</button>";
				$(".questFinder .edit").html(result_html).show(1000);
				$(".questFinder .problem").val(question_text);
				$(".questFinder .answer1").val(question_answer1);
				$(".questFinder .answer2").val(question_answer2);
				$(".questFinder .answer3").val(question_answer3);
				$(".questFinder .answer4").val(question_answer4);

				$(".questFinder .cancel_edit").on('click', function () {
					edit_finish_fun();
				});
				$(".questFinder .confirm_edit").on('click', function () {
					// 隱藏編輯表單
					$(".questFinder .edit").hide(1000);
					$(".questFinder .msg").html("修改題目中...").show(1000);

					// 產生新題目的該行
					var new_question_line = q_id.toString() + "|" + $(".questFinder .problem").val() + "|" + $(".questFinder .answer1").val() + "|" + $(".questFinder .answer2").val() + "|" + $(".questFinder .answer3").val() + "|" + $(".questFinder .answer4").val() + "\n";

					// 重新取得該頁面所有內容
					$.ajax({
						url: "https://nekowiz.fandom.com/zh/api.php?action=query&titles=" + title + "&prop=info|revisions&inprop=&intoken=edit&rvprop=timestamp|content&format=json",
						cache: false
					}).done(function (data) {
						var pages = data.query.pages;
						var page;
						for (var index in pages) {
							page = pages[index];
						}
						var starttimestamp = page.starttimestamp;
						var content = page.revisions[0]["*"];

						var new_content = "";
						var data_arr = $.trim(content).split("\n");
						for (var question_index in data_arr) {
							var question = data_arr[question_index];
							var question_arr = $.trim(question).split("|");
							var question_id = parseInt(question_arr[0]);
							if (question_id != q_id) {
								new_content += (question + "\n");
							} else {
								new_content += new_question_line;
							}
						}
						// 將 new_content 寫回題庫
						$.ajax({
							url: mw.util.wikiScript('api'),
							data: {
								format: 'json',
								action: 'edit',
								title: title,
								summary: $(".questFinder .problem").val(),
								text: new_content,
								token: mw.user.tokens.get('editToken'),
								starttimestamp: starttimestamp
							},
							dataType: 'json',
							type: 'POST',
							cache: false,
							success: function (data) {
								if (data && data.edit && data.edit.result == 'Success') {
									// 成功新增題目
									$(".questFinder .msg").html("題目新增完成").delay(1000).hide(1000);
									edit_finish_fun();
								} else if (data && data.error) {
									errorHandler();
									// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
								} else {
									errorHandler();
									// alert( 'Error: Unknown result from API.' );
								}
							},
							error: function (xhr) {
								errorHandler();
								// alert( 'Error: Request failed.' );
							}
						});
					})
				});
			}
		}
	}).error(function () {
		edit_finish_fun();
	});
}

function editQuestionDaily(q_id) {
	if (mw.user.anonymous()) {
		alert('請先登入Wikia');
		return false;
	}
	// 將搜尋 & 結果隱藏
	$(".questFinder .result").hide(1000).html("");
	$(".questFinder .search").hide(1000);

	var edit_finish_fun = function () {
		$(".questFinder .edit").hide(1000).html("");
		$(".questFinder .result").show(1000);
		$(".questFinder .search").show(1000);
	};

	// 根據 id 取得題目內容
	var title = "模板:題庫/每日/" + (Math.floor((q_id - 1) / 500) + 1).toString()
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/wiki/" + title + "?action=raw",
		cache: false
	}).done(function (data) {
		var data_arr = $.trim(data).split("\n");
		for (var question_index in data_arr) {
			var question = data_arr[question_index];
			var question_arr = $.trim(question).split("|");
			var question_id = parseInt(question_arr[0]);
			if (question_id != q_id) {
				continue;
			} else {
				var question_text = question_arr[1];
				var question_answer = question_arr[2];
				var question_filename = question_arr[3];

				// 產生編輯表單
				var result_html = "<input type='text' class='problem' placeholder='題目內容' /><hr /><input type='text' class='answer' placeholder='答案' /><hr /><button class='cancel_edit'>取消修改</button>&nbsp;<button class='confirm_edit'>確認修改</button>";
				$(".questFinder .edit").html(result_html).show(1000);
				$(".questFinder .problem").val(question_text);
				$(".questFinder .answer").val(question_answer);
				// 取得圖片 img
				var img_elem = $("<img height='398px' width='239px' title='" + question_filename + "' />");
				var img_url = "https://nekowiz.fandom.com/zh/api.php?action=query&prop=imageinfo&titles=File:" + question_filename + "&iiprop=url&format=json";
				$.getJSON(img_url, function (data) {
					for (var first in data.query.pages) {
						break;
					}
					if (data.query.pages[first].imageinfo == undefined) {
						return;
					}
					var url = data.query.pages[first].imageinfo[0].url;
					img_elem.attr("src", url);
				});
				$(".questFinder .edit").prepend("<hr />");
				$(".questFinder .edit").prepend(img_elem);

				$(".questFinder .cancel_edit").on('click', function () {
					edit_finish_fun();
				});
				$(".questFinder .confirm_edit").on('click', function () {
					// 隱藏編輯表單
					$(".questFinder .edit").hide(1000);
					$(".questFinder .msg").html("修改題目中...").show(1000);

					// 產生新題目的該行
					var new_question_line = q_id.toString() + "|" + $(".questFinder .problem").val() + "|" + $(".questFinder .answer").val() + "|" + question_filename + "\n";

					// 重新取得該頁面所有內容
					$.ajax({
						url: "https://nekowiz.fandom.com/zh/api.php?action=query&titles=" + title + "&prop=info|revisions&inprop=&intoken=edit&rvprop=timestamp|content&format=json",
						cache: false
					}).done(function (data) {
						var pages = data.query.pages;
						var page;
						for (var index in pages) {
							page = pages[index];
						}
						var starttimestamp = page.starttimestamp;
						var content = page.revisions[0]["*"];

						var new_content = "";
						var data_arr = $.trim(content).split("\n");
						for (var question_index in data_arr) {
							var question = data_arr[question_index];
							var question_arr = $.trim(question).split("|");
							var question_id = parseInt(question_arr[0]);
							if (question_id != q_id) {
								new_content += (question + "\n");
							} else {
								new_content += new_question_line;
							}
						}
						// 將 new_content 寫回題庫
						$.ajax({
							url: mw.util.wikiScript('api'),
							data: {
								format: 'json',
								action: 'edit',
								title: title,
								summary: $(".questFinder .problem").val(),
								text: new_content,
								token: mw.user.tokens.get('editToken'),
								starttimestamp: starttimestamp
							},
							dataType: 'json',
							type: 'POST',
							cache: false,
							success: function (data) {
								if (data && data.edit && data.edit.result == 'Success') {
									// 成功新增題目
									$(".questFinder .msg").html("題目新增完成").delay(1000).hide(1000);
									edit_finish_fun();
								} else if (data && data.error) {
									errorHandler();
									// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
								} else {
									errorHandler();
									// alert( 'Error: Unknown result from API.' );
								}
							},
							error: function (xhr) {
								errorHandler();
								// alert( 'Error: Request failed.' );
							}
						});
					})
				});
			}
		}
	}).error(function () {
		edit_finish_fun();
	});
}

function load4select() {
	// 取得目前最大題號
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/wiki/模板:題庫/四選一?action=raw",
		cache: false
	}).done(function (data) {
		var max_problem_id = parseInt(data);
		// 根據最大題號得到最大題目頁面
		var max_problem_page = (Math.floor((max_problem_id - 1) / 500) + 1);
		// 獲取每個頁面的題目
		var loaded_pages = 0;
		for (var current_problem_page = 1; current_problem_page <= max_problem_page; current_problem_page += 1) {
			// 取得每個題目頁面的 title
			var title = "模板:題庫/四選一/" + current_problem_page.toString();
			// 取得題目
			$.ajax({
				url: "https://nekowiz.fandom.com/zh/wiki/" + title + "?action=raw",
				cache: false
			}).done(function (data) {
				// parse 題目
				var data_arr = $.trim(data).split("\n");
				for (var question_index in data_arr) {
					var question = data_arr[question_index];
					var question_arr = $.trim(question).split("|");
					tmp = {}
					tmp["id"] = question_arr[0];
					tmp["gen"] = question_arr[1];
					tmp["question"] = question_arr[2];
					tmp["answer"] = question_arr[3];
					tmp["color"] = question_arr[4];
					q_data.normal.push(tmp);
				}
				loaded_pages += 1;
				$(".questFinder .msg1").html("四選一題目讀取中...<br />讀取進度 " + Math.round(loaded_pages / max_problem_page * 100).toString() + "%");
				if (loaded_pages == max_problem_page) {
					taffy_dbs["normal"] = TAFFY(q_data.normal);
					loading_status.normal = true;
					check_search_show();
				}
			});
		}
	});
}

function check_search_show() {
	if (loading_status.normal == true && loading_status.sort == true && loading_status.daily == true) {
		$(".questFinder .search").show(1000);
		$(".questFinder .result").show(1000);
		$(".questFinder .msg").hide(1000);
	}
}

function load_order() {
	// 取得目前最大題號
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/wiki/模板:題庫/排序?action=raw",
		cache: false
	}).done(function (data) {
		var max_problem_id = parseInt(data);
		// 根據最大題號得到最大題目頁面
		var max_problem_page = (Math.floor((max_problem_id - 1) / 500) + 1);
		// 獲取每個頁面的題目
		var loaded_pages = 0;
		for (var current_problem_page = 1; current_problem_page <= max_problem_page; current_problem_page += 1) {
			// 取得每個題目頁面的 title
			var title = "模板:題庫/排序/" + current_problem_page.toString();
			// 取得題目
			$.ajax({
				url: "https://nekowiz.fandom.com/zh/wiki/" + title + "?action=raw",
				cache: false
			}).done(function (data) {
				// parse 題目
				var data_arr = $.trim(data).split("\n");
				for (var question_index in data_arr) {
					var question = data_arr[question_index];
					var question_arr = $.trim(question).split("|");
					tmp = {}
					tmp["id"] = question_arr[0];
					tmp["question"] = question_arr[1];
					tmp["answer1"] = question_arr[2];
					tmp["answer2"] = question_arr[3];
					tmp["answer3"] = question_arr[4];
					tmp["answer4"] = question_arr[5];
					q_data.sort.push(tmp);
				}
				loaded_pages += 1;
				$(".questFinder .msg2").html("排序題目讀取中...<br />讀取進度 " + Math.round(loaded_pages / max_problem_page * 100).toString() + "%");
				if (loaded_pages == max_problem_page) {
					taffy_dbs["sort"] = TAFFY(q_data.sort);
					loading_status.sort = true;
					check_search_show();
				}
			});
		}
	});
}

function load_daily() {
	// 取得目前最大題號
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/wiki/模板:題庫/每日?action=raw",
		cache: false
	}).done(function (data) {
		var max_problem_id = parseInt(data);
		// 根據最大題號得到最大題目頁面
		var max_problem_page = (Math.floor((max_problem_id - 1) / 500) + 1);
		// 獲取每個頁面的題目
		var loaded_pages = 0;
		for (var current_problem_page = 1; current_problem_page <= max_problem_page; current_problem_page += 1) {
			// 取得每個題目頁面的 title
			var title = "模板:題庫/每日/" + current_problem_page.toString();
			// 取得題目
			$.ajax({
				url: "https://nekowiz.fandom.com/zh/wiki/" + title + "?action=raw",
				cache: false
			}).done(function (data) {
				// parse 題目
				var data_arr = $.trim(data).split("\n");
				for (var question_index in data_arr) {
					var question = data_arr[question_index];
					var question_arr = $.trim(question).split("|");
					tmp = {}
					tmp["id"] = question_arr[0];
					tmp["question"] = question_arr[1];
					tmp["answer"] = question_arr[2];
					tmp["image_filename"] = question_arr[3];
					q_data.daily.push(tmp);
				}
				loaded_pages += 1;
				$(".questFinder .msg3").html("每日題目讀取中...<br />讀取進度 " + Math.round(loaded_pages / max_problem_page * 100).toString() + "%");
				if (loaded_pages == max_problem_page) {
					taffy_dbs["daily"] = TAFFY(q_data.daily);
					loading_status.daily = true;
					check_search_show();
				}
			});
		}
	});
}

function search_problem() {
	// 取得題目內容
	$(".questFinder .result").html("");
	var question = $.trim($(".questFinder .question").val());
	var search_min_word = parseInt($(".questFinder .search_min_word").val());
	if (question.length < search_min_word)
		return;

	// 取得搜尋類型
	var type = $('input[type=radio]:checked').val();

	if (type == "select") {
		// 搜尋
		if (question == "") {
			$(".questFinder .result").html("");
		} else {
			var question_split = question.split(" ");
			var db_result = taffy_dbs["normal"](function () {
				for (var question_index in question_split) {
					var question_key = question_split[question_index].toLowerCase();
					if (this.question.toLowerCase().indexOf(question_key) == -1)
						return false;
				}
				return true;
			});
			var result_count = db_result.count();
			// db_result = db_result.limit(20);
			var search_result_html = "<table class='article-table'><tr><td colspan='6'>搜尋出 " + result_count.toString() + " 個結果。</td></tr><tr><th>題號</th><th>類型</th><th>難度</th><th>題目</th><th>答案</th><th></th></tr>";
			db_result.each(function (record, recordnumber) {
				search_result_html += "<tr><td>" + record["id"] + "</td><td>" + record["gen"] + "</td><td>" + record["color"] + "</td><td>" + record["question"] + "</td><td>" + record["answer"] + "</td><td><button onclick='editQuestionSelect(" + record["id"] + ")'>修改</button></td></tr>";
			});
			search_result_html += "</table>";
			$(".questFinder .result").html(search_result_html);
		}
	}
	else if (type == "sort") {
		// 搜尋
		if (question == "") {
			$(".questFinder .result").html("");
		} else {
			var question_split = question.split(" ");
			var db_result = taffy_dbs["sort"](function () {
				for (var question_index in question_split) {
					var question_key = question_split[question_index].toLowerCase();
					if (this.question.toLowerCase().indexOf(question_key) == -1)
						return false;
				}
				return true;
			});
			var search_result_html = "<table class='article-table'><tr><th>題號</th><th>題目</th><th>答案1</th><th>答案2</th><th>答案3</th><th>答案4</th><th></th></tr>";
			db_result.each(function (record, recordnumber) {
				search_result_html += "<tr><td>" + record["id"] + "</td><td>" + record["question"] + "</td><td>" + record["answer1"] + "</td><td>" + record["answer2"] + "</td><td>" + record["answer3"] + "</td><td>" + record["answer4"] + "</td><td><button onclick='editQuestionSort(" + record["id"] + ")'>修改</button></td></tr>";
			});
			search_result_html += "</table>";
			$(".questFinder .result").html(search_result_html);
		}
	}
	else if (type == "daily") {
		// 搜尋
		if (question == "") {
			$(".questFinder .result").html("");
		} else {
			var question_split = question.split(" ");
			var db_result = taffy_dbs["daily"](function () {
				for (var question_index in question_split) {
					var question_key = question_split[question_index].toLowerCase();
					if (this.question.toLowerCase().indexOf(question_key) == -1)
						return false;
				}
				return true;
			});
			var table_elem = $("<table class='article-table'><tr><th>題號</th><th>圖片</th><th>題目</th><th>答案</th><th></th></tr></table>");
			db_result.each(function (record, recordnumber) {
				// 取得圖片 img
				var img_elem = $("<img height='398px' width='239px' title='" + record["image_filename"] + "' />");
				var img_url = "https://nekowiz.fandom.com/zh/api.php?action=query&prop=imageinfo&titles=File:" + record["image_filename"] + "&iiprop=url&format=json";
				$.getJSON(img_url, function (data) {
					for (var first in data.query.pages) {
						break;
					}
					if (data.query.pages[first].imageinfo == undefined) {
						return;
					}
					var url = data.query.pages[first].imageinfo[0].url;
					img_elem.attr("src", url);
				});
				table_elem.append("<tr><td>" + record["id"] + "</td><td></td><td>" + record["question"] + "</td><td>" + record["answer"] + "</td><td><button onclick='editQuestionDaily(" + record["id"] + ")'>修改</button></td></tr>");
				var last_tr = table_elem.find("tr:last");
				last_tr.children('td').eq(1).append(img_elem);
			});
			$(".questFinder .result").html(table_elem);
		}
	}
}

$(document).ready(function () {
	$(".questFinder .question").on({
		keyup: search_problem
	});
	load4select();
	load_order();
	load_daily();
	$(".questFinder .search label, .questFinder .search input").on("click", function () {
		$(".questFinder .question").focus();
		search_problem();
	});
});