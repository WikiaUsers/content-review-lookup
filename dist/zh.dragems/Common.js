/* 此处的JavaScript将加载于所有用户每一个页面。 */
//Onload functions
var cond="";
$(function(){
	$("#LatestPhotosModule").remove();
	moveModule();
	quickList_buildForm();
	quickList();
	window.scrollTo(0,36);
	layoutButton();
        //Force loading all images
	$("img.lzy").each(function(){$(this).attr("src", $(this).attr("data-src")).removeClass("lzy").removeClass("lzyPlcHld")});
});
function moveModule(){
	if($("#WikiaRecentActivity").length>0){
		$("#WikiaRecentActivity").before($(".move"));
	}
}


function quickList_buildForm(){
	$("#c-kw").append($('<input type="text" id="kw" size="30">'));
	$("#c-type").append($('<select id="type"> <option value="">Total(全部)</option> <option value="Fire">Fire</option> <option value="Water">Water</option> <option value="Nature">Nature</option> <option value="Light">Light</option> <option value="Dark">Dark</option> </select>'));
	$("#c-force").append($('<select id="force"> <option value="">Total(全部)</option> <option value="劍術">劍術</option> <option value="技巧">技巧</option> <option value="魔法">魔法</option> </select>'));
	$("#c-rareL").append($('<select id="rare"> <option value="">Total(全部)</option> <option value="1">★</option> <option value="2">★★</option> <option value="3">★★★</option> <option value="4">★★★★</option><option value="5">★★★★★</option> <option value="6">★★★★★★</option> </select>'));
	$("#c-rareH").append($('<select id="rare"> <option value="">Total(全部)</option> <option value="5">★★★★★</option> <option value="6">★★★★★★</option> </select>'));
	$("#search-button").prepend($('<button id="search-b">Search(搜尋)</button>'));
}

function quickList(){
	if ($("#search-b").length>0){
		$("#search-b").click(function(){
			$(".c-item").hide();
			var kw=$("#kw").val();
			var t=$("#type").val();
			var f=$("#force").val();
			var r=$("#rare").val();
			var i=0;
			var d=50;
			$(".c-item").each(function(){
				if ((kw=="" || $(this).children("td:nth-child(2)").text().indexOf(kw)>=0) && (t=="" || $(this).children("td:nth-child(3)").text().indexOf(t)>=0) && (f=="" || $(this).children("td:nth-child(4)").text().indexOf(f)>=0) && (r=="" || $(this).children("td:nth-child(5)").text().indexOf(r)>=0)){
					$(this).delay(i*d).show("slow");
					i++;
				}
			});
			$("#search-r").text("共 "+i+" 個項目符合搜尋條件。");
		});
		$("tr:hidden").remove();
	}
	$(".WikiaWideTablesWrapper").removeClass("WikiaWideTablesWrapper");
	$("canvas").remove();
	$(".popout").css("height", "0");
}


function layoutButton(){
	if ($(".page-Dragems_Wiki").length==0 && $("#fullForce").length == 0){
		$(".tally").append($("<button class='wikia-menu-button' id='switchLayoutButton'>Wide Screen(切換成寬頁面)</button>"));
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
}
function switchLayout(){
	if ($.cookie("layout")=="wide" || $("#fullForce").length > 0){
		$("#switchLayoutButton").html("Narrow Screen(切換成窄頁面)");
		$("#WikiaPage").css("width","auto").css("margin-left","25px").css("margin-right","25px");
		$("#WikiaMainContent").css("width","100%");
		$("#WikiaArticle").css("margin-right","20px");
		$("#WikiaRail").hide();
		$("#mw-content-text").prepend($("<div style='float:right;width:350px;margin-right:10px' id='rightPanel'></div>"));
		$("#rightPanel").prepend($(".move").clone());
	}else{
		$("#switchLayoutButton").html("Wide Screen(切換成闊頁面)");
		$("#WikiaPage").css("width","").css("margin-left","").css("margin-right","");
		$("#WikiaMainContent").css("width","");
		$("#rightPanel").remove();
		$("#WikiaArticle").css("margin-right","");
		$("#WikiaRail").show();
	}
}