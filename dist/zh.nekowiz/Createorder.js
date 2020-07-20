$("div.title:last").after('<div class="create_order"><div class="msg"></div><div class="problem_info"><input type="text" class="problem" placeholder="題目內容" style="width: 100%;" /><hr /><input type="text" class="answer1" placeholder="順位1" style="width: 100%;" /><hr /><input type="text" class="answer2" placeholder="順位2" style="width: 100%;" /><hr /><input type="text" class="answer3" placeholder="順位3" style="width: 100%;" /><hr /><input type="text" class="answer4" placeholder="順位4" style="width: 100%;" /><hr /><input class="addQuest" type="button" value="新增題目"></div></div>');
function getOrderPageTitleById(problem_id) {
	return "模板:題庫/排序/" + (Math.floor((problem_id - 1) / 500) + 1).toString();
}

function createOrderQuest() {
	// Get information
	var problem = $.trim($(".create_order .problem").val());
	var answer1 = $.trim($(".create_order .answer1").val());
	var answer2 = $.trim($(".create_order .answer2").val());
	var answer3 = $.trim($(".create_order .answer3").val());
	var answer4 = $.trim($(".create_order .answer4").val());

	// Check if problem & answer is empty
	if (problem == "" || answer1 == "" || answer2 == "" || answer3 == "" || answer4 == "") {
		$(".create_order .msg").hide().html("題目或答案不得為空白").show(1000);
		return;
	}

	// Disable all forms
	$(".create_order .problem_info").hide(1000);
	$(".create_order .msg").hide(1000).html("新增題目中...").show(1000);
	// Get Max Problem ID
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/api.php?action=query&titles=%E6%A8%A1%E6%9D%BF:%E9%A1%8C%E5%BA%AB/%E6%8E%92%E5%BA%8F&prop=info|revisions&inprop=&intoken=edit&rvprop=timestamp|content&format=json",
		cache: false
	}).done(function (data) {
		var pages = data.query.pages;
		var page;
		for (var index in pages) {
			page = pages[index];
		}
		var starttimestamp = page.starttimestamp;
		var content = page.revisions[0]["*"];

		var new_problem_id = parseInt(content) + 1;
		// Create new problem page
		var new_content = "\n" + new_problem_id.toString() + "|" + problem + "|" + answer1 + "|" + answer2 + "|" + answer3 + "|" + answer4;
		var title = getOrderPageTitleById(new_problem_id);

		// 更新最大題號
		// Update Max Problem ID
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'edit',
				title: "模板:題庫/排序",
				summary: problem,
				text: new_problem_id.toString(),
				token: mw.user.tokens.get('editToken'),
				starttimestamp: starttimestamp
			},
			dataType: 'json',
			type: 'POST',
			cache: false,
			success: function (data) {
				if (data && data.edit && data.edit.result == 'Success') {
					// 更新題號成功，新增題目
					$.ajax({
						url: mw.util.wikiScript('api'),
						data: {
							format: 'json',
							action: 'edit',
							title: title,
							summary: problem,
							appendtext: new_content,
							token: mw.user.tokens.get('editToken')
						},
						dataType: 'json',
						type: 'POST',
						cache: false,
						success: function (data) {
							if (data && data.edit && data.edit.result == 'Success') {
								// 成功新增題目
								$(".create_order .msg").html("題目新增完成").delay(1000).hide(1000);
								$(".create_order .problem_info").delay(1000).show(1000);
								$(".create_order .problem").val("");
								$(".create_order .answer1").val("");
								$(".create_order .answer2").val("");
								$(".create_order .answer3").val("");
								$(".create_order .answer4").val("");
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
	});
}

$(document).ready(function () {
	if (mw.user.anonymous()) {
		alert('請先登入Wikia');
		$(".create_order .addQuest").on("click", function () {
			alert('請先登入Wikia');
		});
		return false;
	}
	$(".create_order .addQuest").on("click", function () {
		createOrderQuest();
	});
});