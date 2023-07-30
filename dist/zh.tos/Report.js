
$('<input type="text" id="page_name" disabled="disabled" /><table style="width: 100%" id="report_content"><tr><td>錯誤內容</td><td>正確內容</td></tr><tr><td><textarea></textarea></td><td><textarea></textarea></td></tr><tr><td></td><td style="text-align: right"><input type="button" value="預覽" id="preview" /><input type="submit" value="送出" /></td></tr></table><div id="preview_area"></div>').appendTo('#report_question');

function submit(input, text) {
	$(input).attr('disabled', true);
	$.post("https://tos.fandom.com/zh/api.php", {
		action: 'edit', 
		appendtext: text,
		title: 'Project:管理員告示板',
		token: mw.user.tokens.get('editToken'),
		format: 'json'
	}).done(function() {
		location.href = 'https://tos.fandom.com/zh/wiki/Project:管理員告示板';
	}).fail(function() {
		alert('送出失敗');
	});
}

function readPageName() {
	var search = location.search.substr(1).split('&');
	var obj = {};
	for (var i in search) {
		var pair = search[i].split(/=/);
		obj[pair[0]] = pair[1];
	}
	return decodeURIComponent(obj.page).replace(/_/g, ' ');
}
var table = $('table#report_content');
var textareas = table.find('textarea');
var page = readPageName();
$('input#page_name').val(page);
if(!page) {
	table.find('input[type=submit]').attr('disabled', true);
}
$('#preview').click(function() {
	$('#preview_area').children().remove();
	var text = '{{' + 'Project:管理員告示板/模板/頁面資料|1=' + page + '|2=' + textareas.eq(0).val() + '|3=' + textareas.eq(1).val() + '}}';
	if(textareas.eq(0).val() == '' || textareas.eq(1).val() == '') {
		$('<span style="color:red;">請先完成填寫回報內容。</span>').appendTo('#preview_area');
	} else {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: text
	}, function (data) {
		$('#preview_area').children().remove();
		$(data.parse.text['*']).appendTo('#preview_area');
		});
	}
});
table.find('input[type=submit]').click(function(e) {
	e.preventDefault();
	//var textareas = table.find('textarea');
	var text = '\n{{' + 'subst:Project:管理員告示板/模板/頁面資料|1=' + page + '|2=' + textareas.eq(0).val() + '|3=' + textareas.eq(1).val() + '}}';
	submit(this, text);
});

$('textarea').css('width', 'calc( 100% - 10px )').css('height', '100px').css('resize', 'none');