$("div.title:last").after('<div class="create_daily"><div class="msg"></div><div class="problem_info">每日圖片：<input type="file" class="image" /><hr /><input type="text" class="problem" placeholder="題目內容" style="width: 100%;" /><hr /><input type="text" class="answer" placeholder="答案" style="width: 100%;" /><hr /><input type="button" class="addQuest" value="新增題目"></div></div>');
function getDailyPageTitleById(problem_id) {
	return "模板:題庫/每日/" + (Math.floor((problem_id - 1) / 500) + 1).toString();
}

upload_status = {
	image: false,
	problem: false
};

function check_complete() {
	if (upload_status.image == true && upload_status.problem == true) {
		$(".create_daily .msg").html("題目新增完成").delay(1000).hide(1000);
		$(".create_daily .problem_info").delay(1000).show(1000);
		$(".create_daily .problem").val("");
		$(".create_daily .answer").val("");
		$(".create_daily .image").val("");
	}
}

function createDailyQuest() {
	var file = $(".create_daily .image")[0].files[0];
	if (!file) {
		$(".create_daily .msg").hide().html("請上傳圖片").show(1000);
	}
	var file_name = file.name;

	var problem = $.trim($(".create_daily .problem").val());
	var answer = $.trim($(".create_daily .answer").val());

	if (problem == "" || answer == "" || file_name == "") {
		$(".create_daily .msg").hide().html("題目或答案不得為空白").show(1000);
		return;
	}

	// Disable all forms
	$(".create_daily .problem_info").hide(1000);
	$(".create_daily .msg").hide(1000).html("新增題目中...").show(1000);

	// 取得目前題號
	$.ajax({
		url: "https://nekowiz.fandom.com/zh/api.php?action=query&titles=%E6%A8%A1%E6%9D%BF:%E9%A1%8C%E5%BA%AB/%E6%AF%8F%E6%97%A5&prop=info|revisions&inprop=&intoken=edit&rvprop=timestamp|content&format=json",
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
		var image_name = "每日問答-" + new_problem_id.toString() + file_name.substr(file_name.lastIndexOf("."));
		// Create new problem page
		var new_content = "\n" + new_problem_id.toString() + "|" + problem + "|" + answer + "|" + image_name;
		var title = getDailyPageTitleById(new_problem_id);

		// 更新最大題號
		// Update Max Problem ID
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'edit',
				title: "模板:題庫/每日",
				summary: problem,
				text: new_problem_id.toString(),
				token: mw.user.tokens.get('csrfToken'),
				starttimestamp: starttimestamp
			},
			dataType: 'json',
			type: 'POST',
			cache: false,
			success: function (data) {
				if (data && data.edit && data.edit.result == 'Success') {
					// 更新題號成功
					// 上傳圖片

					var formdata = new FormData();
					formdata.append("action", "upload");
					formdata.append("filename", image_name);
					formdata.append("token", mw.user.tokens.get('csrfToken'));
					formdata.append("file", file);
					formdata.append("ignorewarnings", "1");

					$.ajax({
						url: mw.util.wikiScript('api'), //url to api.php 
						contentType: false,
						processData: false,
						type: 'POST',
						data: formdata,
						success: function (data) {
							//do what you like, console logs are just for demonstration :-)
							upload_status.image = true;
							check_complete();
						},
						error: function (xhr, status, error) {
							errorHandler();
						}
					});

					// 新增題目
					$.ajax({
						url: mw.util.wikiScript('api'),
						data: {
							format: 'json',
							action: 'edit',
							title: title,
							summary: problem,
							appendtext: new_content,
							token: mw.user.tokens.get('csrfToken')
						},
						dataType: 'json',
						type: 'POST',
						cache: false,
						success: function (data) {
							if (data && data.edit && data.edit.result == 'Success') {
								// 成功新增題目
								upload_status.problem = true;
								check_complete();
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
	if (mw.config.values.wgUserName === null) {
		alert('請先登入Wikia');
		$(".create_daily .addQuest").on("click", function () {
			alert('請先登入Wikia');
		});
		return false;
	}
	$(".create_daily .addQuest").on("click", function () {
		createDailyQuest();
	});
});