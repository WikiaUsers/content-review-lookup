$('頁面名稱：<input type="text" id="page_name" disabled="disabled" /><table style="width: 100%" id="report_content"><tr><td>錯誤內容</td><td>正確內容</td></tr><tr><td><textarea></textarea></td><td><textarea></textarea></td></tr><tr><td></td><td style="text-align: right"><input type="submit" value="送出" /></td></tr></table>').appendTo('#mw-content-text');

function submit(input, text) {
	$(input).attr('disabled', true);
	$.post("http://zh.mhxr.wikia.com/api.php", {
		action: 'edit', 
		appendtext: text,
		title: 'Wiki站務區',
		token: mw.user.tokens.get('editToken'),
		format: 'json'
	}).done(function() {
		location.href = 'http://zh.mhxr.wikia.com/wiki/Project:Wiki站務區';
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
var page = readPageName();
$('input#page_name').val(page);
if(!page) {
	table.find('input[type=submit]').attr('disabled', true);
}

table.find('input[type=submit]').click(function(e) {
	e.preventDefault();
	var textareas = table.find('textarea');
	var text = '\n{{' + 'subst:Project:Wiki站務區/模板/頁面資料|1=' + page + '|2=' + textareas.eq(0).val() + '|3=' + textareas.eq(1).val() + '}}';
	submit(this, text);
});

$('textarea').css('width', 'calc( 100% - 10px )').css('height', '100px').css('resize', 'none');