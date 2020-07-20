/* 此处的JavaScript将加载于所有用户每一个页面。 */

$(function(){
	//Move module to right column
	moveModule();
	pagestyle();
});
function moveModule(){
	if($(".page-Home").length==0){
		$("#WikiaRail").append($(".move"));
		$(".move").show();
		$(".move:hidden").remove();
	}else{
		$(".move").show();
	}
}

//Add a check for PC or mobile style check
function pagestyle(){
    var divsToHide;
    if (skin == "oasis") {
        divsToHide = document.getElementsByClassName("kcwmobile");
    }else{
        divsToHide = document.getElementsByClassName("kcwpc");
    }
    for(var i = 0; i < divsToHide.length; i++)
    {
    divsToHide[i].style.display="none";
    }
}
//End style check

/*  
 *  Loading page
 *  Load the page develop by others. Thanks all big big.
 *
 *  1. Tooltip tools
 *  2. Timer Countdown tools
 *  3. Extend wikia Navigation tools
 *  4. Sound Manager Tools
 *
 */
PurgeButtonText = '刷新緩存'; //Refresh Button
importScriptPage('PurgeButton/code.js', 'dev');//Refresh Button
importArticles({
    type: 'script',
    articles: [
        'u:dev:Tooltips/code.js',
        "w:c:dev:Countdown/code.js",
        'u:dev:ExtendedNavigation/code.js',
        "MediaWiki:SoundManager2.js",
        "u:pad.wikia.com:MediaWiki:FilterTable.js",
    ]
});
//End Loading page