/* 此處的JavaScript將載入於所有用戶每一個頁面。 */
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
 *  2. Extend wikia Navigation tools
 *
 */
PurgeButtonText = '更新頁面';
importArticles({
    type: 'script',
    articles: [
        'u:dev:PurgeButton/code.js',
        'u:dev:Tooltips/code.js', 
        'u:dev:ExtendedNavigation/code.js', 
    ]
});
//End Loading page

// Pages need to import script
wgPageName === '搜尋器' && importScript('MediaWiki:ItemSearch.js');