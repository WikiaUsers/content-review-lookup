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
/* PreloadFileDescription 設定 */
window.PFD_templates = [
    {
        label: '預設模板',
        desc: '{{文件資訊\n|注意 = \n|描述 = \n|來源 = \n|作者 = \n|文件規格 = \n|授權協議 = \n}}'
    }
];

/**
 * 終極時空維基 - 強制台灣時間懸浮窗 (不依賴頁面結構)
 */
(function() {
    function createFloatingClock() {
        // 1. 建立顯示容器
        var clockDiv = document.createElement('div');
        clockDiv.id = 'manual-tw-clock';
        
        // 2. 設定樣式：固定在右上角、黑色半透明背景、白色字
        clockDiv.style.position = 'fixed';
        clockDiv.style.top = '10px';
        clockDiv.style.right = '60px'; // 避開 Fandom 原有的按鈕
        clockDiv.style.zIndex = '9999';
        clockDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        clockDiv.style.color = '#fff';
        clockDiv.style.padding = '5px 10px';
        clockDiv.style.borderRadius = '5px';
        clockDiv.style.fontSize = '13px';
        clockDiv.style.fontFamily = 'monospace';
        clockDiv.style.pointerEvents = 'none'; // 滑鼠穿透，不影響點擊

        document.body.appendChild(clockDiv);

        // 3. 定時更新
        setInterval(function() {
            var now = new Date();
            // 計算台灣時間 (UTC+8)
            var tw = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (8 * 3600000));
            
            var y = tw.getFullYear();
            var m = (tw.getMonth() + 1).toString().padStart(2, '0');
            var d = tw.getDate().toString().padStart(2, '0');
            var hh = tw.getHours().toString().padStart(2, '0');
            var mm = tw.getMinutes().toString().padStart(2, '0');
            var ss = tw.getSeconds().toString().padStart(2, '0');

            clockDiv.textContent = y + '年' + m + '月' + d + '日 ' + hh + ':' + mm + ':' + ss + ' (CST)';
        }, 1000);
    }

    // 只要 body 出現就執行
    if (document.body) {
        createFloatingClock();
    } else {
        window.addEventListener('DOMContentLoaded', createFloatingClock);
    }
})();