/* 此处的JavaScript将加载于所有用户每一个页面。 */
//Onload functions
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
        $("#WikiaArticleComments").before("<div class='a-fire monsterRow' style='font-weight:bold;font-size:18px'><table style='width:100%;margin:0 auto'><tr><td rowspan='2' style='width:25px'><img style='vertical-align: top;' src='https://images.wikia.nocookie.net/__cb20141025031258/san-puzzle/zh/images/d/dd/Tishi_icon.png'></td><td>欢迎来到三国志PUZZLE大战中文维基，请遵守相关规则。</td></tr></table></div>");
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


    createLeftMeun();
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

function createLeftMeun() {
	var div = document.createElement("div");
	$(div).attr("class", "leftMenu");
	$("#mw-content-text").prepend(div);
 
	var handBookDiv = document.createElement("div");
	$(handBookDiv).attr("class", "handbook");
	$(handBookDiv).appendTo(div);
  
	var questDiv = document.createElement("div");
	$(questDiv).attr("class", "jinshizi");
	$(questDiv).appendTo(div);
	
		var questDiv = document.createElement("div");
    $(questDiv).attr("class", "zhuangbeipin");
	$(questDiv).appendTo(div);
	
getMenuImage("图鉴查询.png", "图鉴查询", "handbook");
getMenuImage("金狮子武将.png", "金狮子武将", "jinshizi");
getMenuImage("Giftbox.png", "装备品", "zhuangbeipin");
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
 
function moveCardPoll(){
    $("#WikiaRail").prepend($("#card_poll"));
}
 
function cardBoxSenzaiDetail_Init() {
    var msDuration = 500;
 
    $(".cardBoxSenzaiDetail").append(
        $("<a>").prop({
            "href": "javascript: void(0);",
            "id": "cardBoxSenzaiDetailBtnOK"
        }).click(function() {
            var theWidth  = $(".cardBoxSenzaiDetail").css("width");
            var theHeight = $(".cardBoxSenzaiDetail").css("height");
 
            $(".cardBoxSenzaiDetail").animate({
                width: 0,
                height: 0,
                opacity: 0
            },
                msDuration,
                function() {
                    $(".cardBoxSenzaiDetail").css({
                        width: theWidth,
                        height: theHeight,
                        display: "none"
                    });
            });
        })
    );
 
    $(".cardBoxSenzaiData").click(function() {
        var theHeight = $(".cardBoxSenzaiDetail").css("height");
 
        $(".cardBoxSenzaiDetail").css({
            height: 0,
            opacity: 0
        }).show();
        $(".cardBoxSenzaiDetail").animate({
            height: theHeight,
            opacity: 1
        },
            msDuration
        );
    });
}
 
function isExisted(jQuerySelector) {
    return 0 !== $(jQuerySelector).length;
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
function disableSelection(target){
if (typeof target.onselectstart!="undefined") target.onselectstart=function(){return false}; else if (typeof target.style.MozUserSelect!="undefined") target.style.MozUserSelect="none"; else target.onmousedown=function(){return false}
target.style.cursor = "default";
}
function effectiveDate(){
	$("*[data-starts]").each(function(){
		if (new Date() >= new Date($(this).data("starts"))) $(this).show();
	});
	$("*[data-expires]").each(function(){
		if (new Date() > new Date($(this).data("expires"))) $(this).remove();
	});
}

function SP() {
    if (document.getElementById("Now")!==null) {
    importArticles({
		type: "script",
		articles: ["MediaWiki:CurrentTime.js"]
	});
	}
	if (document.getElementById("eventTimeLeft")!==null) {
		eventTimeLeft();
	}
	if ($("body").hasClass("page-Puzzle_Dragons_中文WIKI")===true) {
	importArticles({
		type: "script",
		articles: ["MediaWiki:WikiMain.js"]
	});
	}
	if ($("th").hasClass("MonsterState")===true) {
    importArticles({
		type: "script",
		articles: ["MediaWiki:MonsterState.js"]
	});
	}
	if (document.getElementById("PetSearch")!==null) {
    importArticles({
		type: "script",
		articles: ["MediaWiki:PetSearch.js"]
	});
	}
	if (document.getElementById("PetAdvSearch")!==null) {
    importArticles({
		type: "script",
		articles: ["MediaWiki:PetAdvSearch.js"]
	});
    }
}

function eventTimeLeft(){
	$("#currentEvents .eStart").each(function(){
		var start=$(this).text();
		var end=$(this).next(".eEnd").text();
		var rows=$(this).attr("rowspan");
		var s=start.match(/(\d+)月(\d+)日(\d+)[時|时]/);
		var e=end.match(/(\d+)月(\d+)日(\d+)[時|时]/);
		var now=new Date();
		var startOffset=0, endOffset=0;
		if (s && e){
			//over-the-year fix, december
			if (now.getMonth()==11) {
				if (parseInt(s[1])==1) startOffset=1;
				if (parseInt(e[1])==1) endOffset=1;
			}
			//over-the-year fix, january
			if (now.getMonth()==0) {
				if (parseInt(s[1])==12) startOffset=-1;
				if (parseInt(e[1])==12) endOffset=-1;
			}
			var startDate=new Date((now.getFullYear()+startOffset)+"-"+d2(s[1])+"-"+d2(s[2])+"T"+d2(s[3])+":00:00+08:00");
			var endDate=new Date((now.getFullYear()+endOffset)+"-"+d2(e[1])+"-"+d2(e[2])+"T"+d2(e[3])+":00:00+08:00");
			var timeLeft=(startDate.getTime()-now.getTime())/1000;
			if (timeLeft>0){
				if (timeLeft<3600) timeLeft=Math.ceil(timeLeft/60)+"分钟 <font color=#32B>后开始</font>";
				else if (timeLeft<86400) timeLeft=Math.floor(timeLeft/3600)+"小时"+Math.ceil(timeLeft%3600/60)+"分钟 <font color=#32B>后开始</font>";
				else timeLeft=Math.floor(timeLeft/86400)+"天"+Math.floor(timeLeft%86400/3600)+"小时 <font color=#32B>后开始</font>";
			}else{
				timeLeft=(endDate.getTime()-now.getTime())/1000;
				if (timeLeft>0){
					if (timeLeft<3600) timeLeft="<font color=#F00>剩余</font> "+Math.ceil(timeLeft/60)+"分钟";
					else if (timeLeft<86400) timeLeft="<font color=#F73>剩余</font> "+Math.floor(timeLeft/3600)+"小时"+Math.ceil(timeLeft%3600/60)+"分钟";
					else timeLeft="<font color=#C73>剩余</font> "+Math.floor(timeLeft/86400)+"天"+Math.floor(timeLeft%86400/3600)+"小时";
				}else{
					timeLeft="<font color=red>已过时</font>";
				}
			}
			$(this).before("<td colspan=2 align=center style='display:none' class='eLeft' "+(rows!=""?"rowspan="+rows:"")+">"+timeLeft+"</td>");
		}else{
			$(this).next(".eEnd").removeClass("eEnd");
			$(this).removeClass("eStart");
		}
	});
	startEventShow();
}