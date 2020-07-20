function include(s) {
  document.write("<script type=\"text/javascript\" src=\"http://ja.wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("User:Tommy6/js/hatenawithcounter.js");
include("User:Tommy6/js/livedoorclipwithcounter.js");
include("User:Tommy6/js/yahoobookmarkwithcounter.js");
include("User:Tommy6/js/buzzurlwithcounter.js");



var testVer = "28";
// 検索対象クラス名配列
var showClassList = new Array();

$(function(){
	/*
	 * ページTOPへ
	 */
	$("#pagetop").click(function(){
		$("html,body").animate({scrollTop:0},'slow');
		return false;
	});
 
	/********** ページ一覧リンク関連 **********/
	// 表示トリガー
	var showTriggerId = "show_link";
	// 非表示トリガー
	var initTriggerId = "close_link";
	// 表示ボタン領域
	var showTriggerAreaId = "button_show_link";
	// 非表示ボタン領域
	var closeTriggerAreaId = "button_close_link";
	// リンク表示ターゲット
	var showTargetId = "div_show_link";
	// 表示枠
	var showTableId = "table_show_link";
 
	/*
	 * ページ一覧を取得し、リンク作成
	 */
	$("#" + showTriggerId).click(function(){
		// リンクテキスト作成
		showAllPageLink(showTargetId);
 
		// トリガーボタンの表示切替
		toggleTarget(showTriggerAreaId, "close");
		toggleTarget(closeTriggerAreaId, "open");
 
		// 一覧を表示
		toggleTarget(showTableId, "open");
 
		return false;
	});
 
	/*
	 * ページ一覧を閉じる
	 */
	$("#" + initTriggerId).click(function(){
		// リンクテキスト初期化
		initAllPageLink(showTargetId);
 
		// トリガーボタンの表示切替
		toggleTarget(showTriggerAreaId, "open");
		toggleTarget(closeTriggerAreaId, "close");
 
		// 一覧を非表示
		toggleTarget(showTableId, "close");
		return false;
	});



	/********** モンスター検索関連 **********/
	/*
	 * 条件指定を追加、検索再実行
	 */
	$(".searchButton").click(function(e){

		var mode = 1;
		for(var key in showClassList){
			// 現在検索対象として設定している
			if(key == e.target.id){
				mode = 0;
				// 検索対象からはずす
				delete showClassList[key];
				break;
			}
		}

		// On
		if(mode == 1){
			// 検索対象に追加
			showClassList[e.target.id] = 1;
		}

		// ボタンの表示切替
		changeButtonStatus(e.target.id, mode);

		// 検索実行
		searchMonster(showClassList);
		return false;
	});
 
	/*
	 * testバージョン管理
	 */
	$(".t_version").click(function(){
		alert(testVer);
		return false;
	});
});
 
/*
 * 対象要素の表示/非表示を切り替え
 */
function toggleTarget(targetId, action)
{
	var targetElement = document.getElementById(targetId);
	if(targetElement == null){
		alert("error:TargetTable is Null");
		return false;
	}
 
	if(action == "open"){
		targetElement.style.display = "block";
	}else if(action == "close"){
		targetElement.style.display = "none";
	}
}
 
/*
 * ページ一覧を初期化
 */
function initAllPageLink(targetId)
{
	var targetElement = document.getElementById(targetId);
	if(targetElement == null){
		alert("error:Target is Null");
		return false;
	}
	targetElement.innerHTML = "";
	return false;
}
 
/*
 * ページ一覧を取得し、リンク作成
 */
function showAllPageLink(targetId)
{
	// ページ一覧の表示領域を初期化
	var targetElement = document.getElementById(targetId);
	if(targetElement == null){
		alert("error:Target is Null");
		return false;
	}
	targetElement.innerHTML = "";
 
	// Ajax
	var url = "http://ja.healthygamelife.wikia.com/api/v1/Articles/List";
	var params = new Object();
	params["expand"] = 1;
 
	getAjaxResponse(url, params)
	.then(function(response){
		// itemsからリンクを作成
		if(array_key_exists("items", response)){
			for(var key in response["items"]){
				//alert(key + ":" + response["items"][key]);
 
				var linkUrl = "" + response["items"][key]["url"];
				var linkTitle = "" + response["items"][key]["title"];
				var linkText = getLinkText(linkTitle, linkUrl);
				targetElement.innerHTML += linkText + "<br />";
			}	
		}
	},
	function(errorText){
		alert(errorText);
	});
 
	return false;
}
 
/*
 * リンクテキストを取得
 */
function getLinkText(linkTitle, linkUrl)
{
	var linkText = "<a href='"+ linkUrl +"'>";
	linkText += linkTitle;
	linkText += "</a>";
 
	return linkText;
}
 
/****************************** Ajax ******************************/
/*
 * Ajaxのレスポンス(JSON)を取得
 */
function getAjaxResponse(url, data){
 
	var defer = $.Deferred();
 
	$.ajax({
		type: "GET",
		url: url,
		//async:false,
		data: data,
		dataType: "json",
		timeout: 10000
	}).then(function(response){
		defer.resolve(response);
	},
	function()
	{
		defer.reject("error!");
	});
 
	return defer.promise();
}

/****************************** Utility ******************************/
/*
 * array_key_exists
 */
function array_key_exists ( key, search ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
    // *     example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'});
    // *     returns 1: true
 
    // input sanitation
    if( !search || (search.constructor !== Array && search.constructor !== Object) ){
        return false;
    }
 
    return key in search;
}


/****************************** MonsterSearch ******************************/
/*
 * ボタンのOn/Off切り替え
 */
function changeButtonStatus(buttonId, mode)
{
	var condElement = document.getElementById(buttonId);

	// On
	if(mode == 1){
		condElement.style.background = "#FF69B4";
	}
	// Off
	else{
		condElement.style.background = "#A9A9A9";
	}

}

/*
 * 検索処理
 */
function searchMonster(showClassList)
{
	var targetIds = new Array();

	// 一度すべてを非表示
	$('.monster_icon').each(function() {
		targetIds[(this).id] = 1;
		var element = document.getElementById((this).id);
		element.style.display = "none";
	});

	// 表示対象を絞り込む
	selectShowTarget(targetIds, showClassList);
}

/*
 * 絞り込み
 */
function selectShowTarget(targetIds, classList)
{
	for(var targetId in targetIds){

		var targetElement = document.getElementById(targetId);
		var targetClass = targetElement.className;
		var targetClassList = targetClass.split(" ");

		// AND検索
		/*
		var isShow = 1;
		for(var cName in classList){
			var haveClass = 0;

			for(var key in targetClassList){
				if(targetClassList[key] == cName){
					haveClass = 1;
					break;
				}
			}

			if(haveClass == 0){
				isShow = 0;
				break;
			}
		}
		*/

		// OR検索
		var isShow = 0;
		for(var cName in classList){
			var haveClass = 0;

			for(var key in targetClassList){
				if(targetClassList[key] == cName){
					haveClass = 1;
					break;
				}
			}

			if(haveClass == 1){
				isShow = 1;
				break;
			}
		}

		targetIds[targetId] = isShow;
	}

	// 表示
	for(var targetId in targetIds){
		if(targetIds[targetId] == 1){
			var element = document.getElementById(targetId);
			element.style.display = "block";
		}
	}
}