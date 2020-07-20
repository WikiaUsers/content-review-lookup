/* 此处的JavaScript将加载于所有用户每一个页面。 */

/* 清除缓存按钮。不一定在Monobook上能用。 */
PurgeButtonText = '清除缓存';
importScriptPage('PurgeButton/code.js', 'dev');

/* Countdown. */
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
/* er. the help is here:http://dev.wikia.com/wiki/Countdown */

//COPYRIGHT (C) JIXUN (Jixun.org)
/* loggedIn 是否登陆, opMode 操作模式, 比如 View。 */
var loggedIn = mw.config.get ('wgUserName') !== null,
    opMode = mw.config.get('wgAction'),
    viewMode = (opMode === 'view'),
    newNav = function (sTitle, sHref, sTarget, sAccesskey) {
	// 寻找元素；不用两个 var 定义变量可以压缩更小。
	var ns = $('div#p-namespaces ul'),
	    but = ns.find('li:first').clone ();
 
	// 进行新按钮设定
	but.removeClass ().find('a').text (sTitle).attr({
		'title': sTitle + (sAccesskey?' [alt-shift-'+sAccesskey+']':''),
		'href': (typeof(sHref)=='string'?sHref:'javascript:void(0);'),
		'target': (sTarget||'_self'),
		'accesskey': (sAccesskey||'')
	}).click ((typeof(sHref) == 'function')?sHref:function(){});
 
	// 插入新按钮进去:
	ns.append (but);
},  getP = function () {
	var pC = ({
		'sysop':'管理员',
		'bureaucrat':'行政员',
		'patroller':'巡查员',
		'user': '普通用户',
	}),
	ret = [];
	for (var i=0; i<wgUserGroups.length; i++) {
		var p = (pC[wgUserGroups[i]]|| '');
		if (p.length > 0) { ret.push (p); }
	}
	return (ret.join('、')||'无');
};
// 仅限首页显示登陆信息
if (wgArticleId === 1) {
	var hL = $('<div />').slideUp().css ({
		'float': 'left',
		'padding-left': '10px',
		'padding-top': '3px',
		'color': 'white'
	}).text ('您尚未登陆，因此部分功能不可用。');
 
	if (loggedIn) { hL.text ('您已登陆为用户: '+wgUserName+'，您的权限为: '+getP()); }
	$('#headwrap').append (hL);
	hL.delay(100).slideDown('slow').delay(7000).slideUp('slow');
}
/* 阅读模式 :: 开始 */
window.readMode = false;
var normalMode = [
	$('div#content').css ('margin-left'), 
	$('div#content').css ('border-radius'),
	$('div#mw-head').css ('padding'),
	$('div#mw-head-base').css ('margin-top'),
	$('div#mw-head-base').css ('background-image'),
];
newNav ('阅读模式', function () {
	var rM = window.readMode = !window.readMode;
	if (rM) {
		// 阅读模式
		$('#mw-panel,div#headwrap,div#footer').hide();
		$('div#content').css ({'margin-left':'0', 'border-radius':'0'});
		$('div#mw-head').css ('padding', '0');
		$('div#mw-head-base').css ({'margin-top':'-21.55em', 'background-image':'none'});
	} else {
		$('#mw-panel,div#headwrap,div#footer').show();
		$('div#content').css ({'margin-left':normalMode[0], 'border-radius':normalMode[1]});
		$('div#mw-head').css ('padding', normalMode[2]);
		$('div#mw-head-base').css ({'margin-top':normalMode[3], 'background-image':normalMode[4]});
	}
});
/* 阅读模式 :: 结束 */
/* staffOnly 特效 */
if (viewMode && loggedIn) { $('.staffOnly').show (); }