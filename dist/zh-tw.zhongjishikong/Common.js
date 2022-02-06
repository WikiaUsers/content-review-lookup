/* 在上傳頁面上添加“Template:文件信息”模板 */
var firstRun = true;
 
function loadFunc() {
	if( firstRun ) {
		firstRun = false;
	} else {
		return;
	}
 
	window.pageName = wgPageName;
	window.storagePresent = (typeof(globalStorage) != 'undefined');
 
	//addHideButtons();
 
	//fillPreloads();
 
	//substUsername();
	//substUsernameTOC();
	rewriteTitle();
	addAlternatingRowColors();
 
	var body = document.getElementsByTagName('body')[0];
	var bodyClass = body.className;
 
	if( !bodyClass || (bodyClass.indexOf('page-') == -1) ) {
		var page = window.pageName.replace(/\W/g, '_');
		body.className += ' page-' + page;
	}
 
	if( typeof(onPageLoad) != "undefined" ) {
		onPageLoad();
	}
}

$(document).ready(function() {

	if ((wgPageName != 'Special:Upload')&&(wgPageName != 'Special:上传文件')&&(wgPageName != '特殊:上傳')) {
		return;
	}

	$('#wpUploadDescription').text("{{文件資訊\r\n|注意=    \r\n|描述=    \r\n|來源=    ※必填，我們需要知道這個檔案的來源處\r\n|作者=    ※必填，我們需要知道這個檔案的創作者是誰\r\n|文件規格=\    r\n|授權協議=\r\n}}");

});