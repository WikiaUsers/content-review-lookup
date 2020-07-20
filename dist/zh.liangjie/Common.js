/* 此處的JavaScript將加載於用戶的每一個介面。 */
// on load                                                                     
$(function(){                                                                  
    layoutButton();                                                            
}); 

function layoutButton(){
	if ($(".page-王國騎士團首頁").length==0 && $("#fullForce").length == 0){
		$(".tally").append($("<button class='wikia-menu-button' id='switchLayoutButton'>切換成寬頁面</button>"));
		switchLayout();
		$("#switchLayoutButton").click(function(){
			if ($.cookie("layout")=="wide"){
				$.cookie("layout", "narrow");
			}else{
				$.cookie("layout", "wide");
			}
			switchLayout();
		});
	}
	if ($("#fullForce").length > 0){
		switchLayout();
	}
	$(".move").slideDown();
}
function switchLayout(){
	if ($.cookie("layout")=="wide" || $("#fullForce").length > 0){
		$("#switchLayoutButton").html("切換成窄頁面");
		$("#WikiaPage").css("width","auto").css("margin-left","25px").css("margin-right","25px");
		$("#WikiaMainContent").css("width","100%");
		$("#WikiaArticle").css("margin-right","20px");
		$("#WikiaRail").hide();
		$("#mw-content-text").prepend($("<div style='float:right;width:350px;margin-right:10px' id='rightPanel'></div>"));
		$("#rightPanel").prepend($(".move").clone());
	}else{
		$("#switchLayoutButton").html("切換成闊頁面");
		$("#WikiaPage").css("width","").css("margin-left","").css("margin-right","");
		$("#WikiaMainContent").css("width","");
		$("#rightPanel").remove();
		$("#WikiaArticle").css("margin-right","");
		$("#WikiaRail").show();
	}
}