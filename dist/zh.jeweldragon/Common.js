/* 此处的JavaScript将加载于所有用户每一个页面。 */
$(function(){
	//Change Background style
	changeBackgroundStyle()
	//Move module to right column
	moveModule();
	//Page specific function
	if (typeof monsterStateLvCalc=="function") monsterStateLvCalc();
});

function changeBackgroundStyle(){
	document.getElementById("WikiaPageBackground").className = "WikiaPageBackground2";
}

function moveModule(){
	if($(".page-禦龍戰記_維基").length==0){
		$("#WikiaRail").append($(".move"));
		$(".move").show();
		$(".move:hidden").remove();
	}else{
		$(".move").show();
	}
}