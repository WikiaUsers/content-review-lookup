/* 此处的JavaScript将加载于所有用户每一个页面。 */

// 將角色頁投票至於右側
;(function () {
  $("#WikiaRail").append($(".wcp-char-poll-area"));
}());

window.railWAM = {
    logPage:"Project:WAM Log"
};

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

	if ((wgPageName != 'Special:Upload')&&(wgPageName != 'Special:上传文件')) {
		return;
	}

	$('#wpUploadDescription').text("{{文件資訊/中文\r\n|注意=\r\n|描述=\r\n|來源=\r\n|作者=\r\n|文件規格=\r\n|授權協議=\r\n}}");

});