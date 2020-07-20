/* 此处的JavaScript将加载于所有用户每一个页面。 */
var cond="";
$(function(){
	importArticles({
		type: "style",
		articles: ["l:MediaWiki:CountDown.css", "l:MediaWiki:Isotope.css"]
	});
	moveModule();
	showNotes();
	setTimeout(gacha, 1000);
	$("ul.tabbernav a").mouseenter(function(){$(this).click()});
	//Force loading all images
	$("img.lzy").each(function(){$(this).attr("src", $(this).attr("data-src")).removeClass("lzy").removeClass("lzyPlcHld")});
        // warning message before comment section
        $("#WikiaArticleComments").before("<div class='a-fire monsterRow' style='font-weight:bold;font-size:18px'><table style='width:100%;margin:0 auto'><tr><td rowspan='2' style='width:25px'><img style='vertical-align: top;' src='https://vignette.wikia.nocookie.net/dnf/images/a/ab/Window_title_accessory45.png/revision/latest?cb=20180603081424&format=original&path-prefix=zh'></td><td>欢迎来到地下城与勇士中文维基站，评论请遵守相关规则。</td></tr></table></div>");
	//Page specific function
	if (typeof pageFn=="function") pageFn();
	if (typeof monsterStateLvCalc=="function") monsterStateLvCalc();
	if (typeof monsterCompareChartInit=="function") monsterCompareChartInit();
});
function moveModule(){
	if($(".page-san-puzzle_维基").length==0){
		$("#WikiaRail").append($(".move"));
		$(".move").show();
		$(".move:hidden").remove();
	}else{
		$(".move").show();
	}
}
function layoutButton(){
	if ($(".page-san-puzzle_维基").length==0 && $("#fullForce").length == 0){
		$(".tally:first-child").append($("<button class='wikia-menu-button' id='switchLayoutButton'>切换成宽页面</button>"));
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
	$(".move").show();
}
function textTip(){
	if ($(".noTextTip").length) return;
	$("a[title]>img:first-child").each(function(){$(this).parent().addClass("texttip")});
  $(".texttip").tooltip({
    content: function() {
          var text = $( this ).attr("title");
          var s = "";
          var t = text.split("||");
          if (t.length==2) {
            s = "<div style='font-weight: bold;'>"+t[0]+"</div>"+t[1];
          } else {
            s = t[0];
          }
          if (s.indexOf("No.")>=0) {
            s = s.replace("　 ","<br>").replace("（","<br>").replace("）","").replace(" 技能：","<br>技能：");
          }
          return s;
        },
    position: {
      my: "center top+40",
      at: "center top",
      using: function( position, feedback ) {
        $( this ).css( position );
        $( "<div>" )
          .addClass( "ui-tooltip-arrow" )
          .addClass( feedback.vertical )
          .addClass( feedback.horizontal )
          .appendTo( this );
      }
    }
  });
}
function gacha(){
	if ($("#resultList").length){
		disableSelection(document.body);
		$("#resultList").isotope({itemSelector:".filterIcon",layoutMode:"fitRows"});
		var palList=[];
		$("#gachaList .d-pal").each(function(i){
			if ($(this).hasClass("r-1")) v=15; else if ($(this).hasClass("r-2")) v=3; else if ($(this).hasClass("r-3")) v=1; else v=1;
			if ($(this).parent().attr("id")!="gachaList") v*=3;
			for (j=0; j<v; j++) palList.push(i);
		});
		var palCount=palList.length;
		$(".gachaButton#pal").click(function(){
			i=$($("#gachaList .d-pal")[palList[Math.floor(Math.random()*palCount)]]).clone();
			$("#resultList").prepend(i.hide().fadeIn("slow",function(){$(this).find(".eggCover").delay(1000).fadeOut(800)})).isotope("reloadItems").isotope({sortBy:"original-order"});
		});
 
		var rareList=[];
		$("#gachaList .d-rare").each(function(i){
			if ($(this).parent().attr("id")=="gachaList") v=1; else v=3;
			if ($(this).hasClass("r-3")) v*=12; else if ($(this).hasClass("r-4")) v*=3; else if ($(this).hasClass("r-5")) v*=1; else v=1;
			for (j=0; j<v; j++) rareList.push(i);
		});
		var rareCount=rareList.length;
		$(".gachaButton#rare").click(function(){
			i=$($("#gachaList .d-rare")[rareList[Math.floor(Math.random()*rareCount)]]).clone();
			$("#resultList").prepend(i.hide().fadeIn("slow",function(){$(this).find(".eggCover").delay(1000).fadeOut(800)})).isotope("reloadItems").isotope({sortBy:"original-order"});
		});
		$("#clearGacha").click(function(){
			$("#resultList").isotope("remove", $("#resultList>.filterIcon"));
		});
	}
}
var eTimeout;
 
function startEventShow(){
	clearTimeout(eTimeout);
	eTimeout=setTimeout(function(){
		$("#currentEvents .eStart, #currentEvents .eEnd").hide();
		$("#currentEvents .eLeft").fadeIn();
		setTimeout(function(){
			$("#currentEvents .eLeft").hide();
			$("#currentEvents .eStart, #currentEvents .eEnd").fadeIn();
			startEventShow();
		}, 5000);
	}, 5000);
}
function d2(n){
	if (parseInt(n)<10) return '0'+String(parseInt(n)); else return n;
}
function showNotes(){
	$(".showNotes").append($("<a class='noteOpen'>显示</a>"));
	$(".noteOpen").click(function(){
		if ($(this).text()=="显示"){
			$(this).parent().parent().next().fadeIn();
			$(this).text("隐藏");
		}else{
			$(this).parent().parent().next().fadeOut();
			$(this).text("显示");
		}
	});
}
function rotateStats(){
	$(".sampleIcon .slv, .sampleIcon .awoken").hide();
	$(".sampleIcon .plus").fadeIn(150);
    setTimeout(function(){
    	$(".sampleIcon .plus").hide();
        $(".sampleIcon .slv, .sampleIcon .awoken").fadeIn(150);
    },2000);
    setTimeout(rotateStats, 4000);
}
 
 
    //createLeftMeun();
    moveCardPoll();
 
function checkIp(response) {
    /*
    if (response.ip.indexOf("1.34.23.") >= 0) {
        window.close();
    }
    */
    if (response.ip.indexOf("114.25.51.") >= 0) {
        window.close();
    }
}
 

//左侧导航
function createLeftMeun() {
	var div = document.createElement("div");
	$(div).attr("class", "leftMenu");
	$("#mw-content-text").prepend(div);

	var questDiv = document.createElement("div");
	$(questDiv).attr("class", "npcs");
	$(questDiv).appendTo(div);
 
	var handBookDiv = document.createElement("div");
	$(handBookDiv).attr("class", "handbook");
	$(handBookDiv).appendTo(div);
	
getMenuImage("NPC图鉴.png", "NPC", "npcs");
getMenuImage("职业图鉴.png", "职业一览", "handbook");
}

function getMenuImage(fileName, link, node) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%5B%5Bfile%3A' + fileName + '%7Clink=' + link + '%5D%5D')
	}, function (data) {
		var content = $(data.parse.text['*']).children();
		$(content).children().attr('width', '').attr('height', '');
		$("div.leftMenu ." + node).append(content);
	}, 'json');
}