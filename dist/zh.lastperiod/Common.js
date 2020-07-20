/* 此处的JavaScript将加载于所有用户每一个页面。 */

/* 此处的JavaScript将加载于所有用户每一个页面。 */
//Onload functions
var cond="";
$(function(){
	$.cachedScript = function(url, options) {
        options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
	});
        return jQuery.ajax(options);
	};
	// L.test
	SP();
	//Page specific function
	if (typeof pageFn=="function") pageFn();
	if (typeof monsterStateLvCalc=="function") monsterStateLvCalc();
	if (typeof monsterCompareChartInit=="function") monsterCompareChartInit();
});
function SP() {
	if ($(".MonsterState").length===1) {
    importArticles({
		type: "script",
		articles: ["MediaWiki:MonsterState.js"]
	});
	}
}

//Art's
var cond="";
$(function(){
	$.cachedScript = function(url, options) {
        options = $.extend(options || {}, {
        dataType: "script",
        cache: true,
        url: url
	});
        return jQuery.ajax(options);
	};
	// L.test
	SP2();
	//Page specific function
	if (typeof pageFn=="function") pageFn();
	if (typeof artStateLvCalc=="function") artStateLvCalc();
	if (typeof artCompareChartInit=="function") artCompareChartInit();
});
function SP2() {
	if ($(".ArtState").length===1) {
    importArticles({
		type: "script",
		articles: ["MediaWiki:ArtState.js"]
	});
	}
}