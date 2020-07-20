/* 此處的JavaScript將載入於所有用戶每一個頁面。 */

// on load    

$(function(){                                                                  
    layoutButton();                                                            
}); 

 //頁面寬度切換
function layoutButton(){
	if ($(".page-洛聖加大典_Wikia").length===0 && $("#fullForce").length === 0){
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


/*路網圖*/
$("#NRmMap").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/mMap(Universal).png></img>');
$("#NRvMap").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/vMap(Universal).png></img>');
/*單綫路線圖*/
$("#01WRL_line").replaceWith('<img src="http://projectnazca.nhz.hk/files/nr/01WestRing(Universal).png"></img>');
$("#01WRL_ring").replaceWith('<img src="http://projectnazca.nhz.hk/files/nr/01WestRing(Universal)ring.png"></img>');
$("#02ERL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/02EastRing(Universal).png></img>');
$("#03URL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/03Urban(Universal).png></img>');
$("#04NEL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/04NewEdward(Universal).png></img>');
$("#05STL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/05Stadium(Universal).png></img>');
$("#06ARL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/06Arcgo(Universal).png></img>');
$("#07LUL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/07Luxter(Universal).png></img>');
$("#07aLULA").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/07ASava(Universal).png></img>');
$("#08FLL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/08Flask(Universal).png></img>');
$("#09KIL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/09Kinight(Universal).png></img>');
$("#10DAL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/10Daring(Universal).png></img>');

$("#11RAL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/11Ranger(Universal).png></img>');
$("#12MAL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/12Martyr(Universal).png></img>');
$("#13ORL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/13Origin(Universal).png></img>');
$("#14MIL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/14Minecraft(Universal).png></img>');
$("#15INL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/15Ingress(Universal).png></img>');
$("#16GLL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/16Glacier(Universal).png></img>');
$("#17OBL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/17OasisBay(Universal).png></img>');
$("#18OUL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/18Outgress(Universal).png></img>');

$("#aAL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/Alpha(Universal).png></img>');
$("#bBL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/Bravo(Universal).png></img>');
$("#cCL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/Charlie(Universal).png></img>');
$("#dDL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/Delta(Universal).png></img>');
$("#eEL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/Echo(Universal).png></img>');

$("#fFL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/Fox(Universal).png></img>');
$("#gGL").replaceWith('<img src=http://projectnazca.nhz.hk/files/nr/Golf(Universal).png></img>');

//納鐵專頁
$("#NRFB_S2E6_JAB").replaceWith('<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fnazcarailway%2Fposts%2F1033203033466085&width=500" width="500" height="526" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>');

/*DiscordIntegrator*/
importArticles({
    type: "script",
    articles: [
        // ...
        'u:dev:MediaWiki:DiscordIntegrator/code.js'
        // ...
    ]
});

//Dynmap
$("#Dynmap").replaceWith('<iframe src="http://projectnazca.nhz.hk:8123/?worldname=CityWorld&mapname=flat&zoom=0&x=0&y=64&z=-0" width=100% height=1000 allowtransparency="true" frameborder="0"></iframe>');

PurgeButtonText = '清除快取';

/* 以下是範例，請勿修改 */
$("#外嵌網頁代號").replaceWith('<iframe src="網址" width="寬" height="高" scrolling="auto" frameborder="0" allowTransparency="true"></iframe>');
/* 以下是範例，請勿修改 */
$("#外嵌圖片代號").replaceWith('<img src="網址"></img>');
/* 以上是範例，請勿修改 */
/* FB貼文嵌入請直接複製「嵌入貼文」功能所給予的代碼 */