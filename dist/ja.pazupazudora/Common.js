/* ここにあるすべてのJavaScriptは、すべてのページ読み込みですべての利用者に対して読み込まれます */
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
	// jQuery UI
	$.cachedScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js").done(function(script, textStatus) {
	  // something u call after jquery UI ready
	  textTip();
	});
	importArticles({
		type: "script",
		articles: ["l:MediaWiki:CountDown.js", "l:MediaWiki:Jquery.isotope.min.js"]
	}, {
		type: "style",
		articles: ["l:MediaWiki:CountDown.css", "l:MediaWiki:Isotope.css"]
	});
	effectiveDate();
	moveModule();
	layoutButton();
	showNotes();
	rotateStats();
	setTimeout(gacha, 1000);
	$("ul.tabbernav a").mouseenter(function(){$(this).click()});
	//Force loading all images
	$("img.lzy").each(function(){$(this).attr("src", $(this).attr("data-src")).removeClass("lzy").removeClass("lzyPlcHld")});
	//Page specific function
	if (typeof pageFn=="function") pageFn();
	if (typeof monsterStateLvCalc=="function") monsterStateLvCalc();
	if (typeof monsterCompareChartInit=="function") monsterCompareChartInit();
});
function moveModule(){
	if($(".page-Puzzle_Dragons_维基").length==0){
		$("#WikiaRail").append($(".move"));
		$(".move").show();
		$(".move:hidden").remove();
	}else{
		$(".move").show();
	}
}
function layoutButton(){
	if ($(".page-Puzzle_Dragons_维基").length==0 && $("#fullForce").length == 0){
		$(".tally:first-child").append($("<button class='wikia-menu-button' id='switchLayoutButton'>ワイドページに切替</button>"));
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
function switchLayout(){
	if ($.cookie("layout")=="wide" || $("#fullForce").length > 0){
		$("#switchLayoutButton").html("非ワイドページに切替");
		$("#WikiaPage").css("width","auto").css("margin-left","25px").css("margin-right","25px");
		$("#WikiaMainContent").css("width","100%");
		$("#WikiaArticle").css("margin-right","20px");
		$("#WikiaRail").hide();
		$("#mw-content-text").prepend($("<div style='float:right;width:350px;margin-right:10px' id='rightPanel'></div>"));
		$("#rightPanel").prepend($(".move").clone());
	}else{
		$("#switchLayoutButton").html("ワイドページに切替");
		$("#WikiaPage").css("width","").css("margin-left","").css("margin-right","");
		$("#WikiaMainContent").css("width","");
		$("#rightPanel").remove();
		$("#WikiaArticle").css("margin-right","");
		$("#WikiaRail").show();
	}
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
            s = s.replace("　 ","<br>").replace("（","<br>").replace("）","").replace(" スキル：","<br />スキル：");
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

var eTimeout;
function eventTimeLeft(){
	$("#currentEvents .eStart").each(function(){
		var start=$(this).text();
		var end=$(this).next(".eEnd").text();
		var rows=$(this).attr("rowspan");
		var s=start.match(/(\d+)月(\d+)日(\d+)[時|时]/);
		var e=end.match(/(\d+)月(\d+)日(\d+)[時|时]/);
		var now=new Date();
		if (s && e){
			if (now.getMonth()==11 && parseInt(s[1])==1){
				var startDate=new Date((now.getFullYear()+1)+"-"+d2(s[1])+"-"+d2(s[2])+"T"+d2(s[3])+":00:00+08:00");
			}else{
				var startDate=new Date(now.getFullYear()+"-"+d2(s[1])+"-"+d2(s[2])+"T"+d2(s[3])+":00:00+08:00");
			}
			if (now.getMonth()==11 && parseInt(e[1])==1){
				var endDate=new Date((now.getFullYear()+1)+"-"+d2(e[1])+"-"+d2(e[2])+"T"+d2(e[3])+":00:00+08:00");
			}else{
				var endDate=new Date(now.getFullYear()+"-"+d2(e[1])+"-"+d2(e[2])+"T"+d2(e[3])+":00:00+08:00");
			}
			var timeLeft=(startDate.getTime()-now.getTime())/1000;
			if (timeLeft>0){
				if (timeLeft<3600) timeLeft=Math.ceil(timeLeft/60)+"分鐘 <font color=#32B>後開始</font>";
				else if (timeLeft<86400) timeLeft=Math.floor(timeLeft/3600)+"小時"+Math.ceil(timeLeft%3600/60)+"分鐘 <font color=#32B>後開始</font>";
				else timeLeft=Math.floor(timeLeft/86400)+"天"+Math.floor(timeLeft%86400/3600)+"小時 <font color=#32B>後開始</font>";
			}else{
				timeLeft=(endDate.getTime()-now.getTime())/1000;
				if (timeLeft>0){
					if (timeLeft<3600) timeLeft="<font color=#F00>尚餘</font> "+Math.ceil(timeLeft/60)+"分鐘";
					else if (timeLeft<86400) timeLeft="<font color=#F73>尚餘</font> "+Math.floor(timeLeft/3600)+"小時"+Math.ceil(timeLeft%3600/60)+"分鐘";
					else timeLeft="<font color=#C73>尚餘</font> "+Math.floor(timeLeft/86400)+"天"+Math.floor(timeLeft%86400/3600)+"小時";
				}else{
					timeLeft="<font color=red>已過期</font>";
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
	$(".showNotes").append($("<a class='noteOpen'>表示</a>"));
	$(".noteOpen").click(function(){
		if ($(this).text()=="表示"){
			$(this).parent().parent().next().fadeIn();
			$(this).text("隠す");
		}else{
			$(this).parent().parent().next().fadeOut();
			$(this).text("表示");
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
// ajax: wiki_page_name, callback function; return null if not found
function ajaxWikiaAPI(page_title, callback){
	$.ajax({url: mw.util.wikiScript('api'),
		data: {action: 'query', prop: 'revisions', rvprop: 'content', format: 'json', titles: page_title},
	}).done(function(data){
		if (typeof callback === "function") {
			var keys = [];
			for(var k in data.query.pages) keys.push(k);
			if (data.query.pages[keys[0]].revisions == null) {
				callback(null);
			} else {
				callback(data.query.pages[keys[0]].revisions[0]['*']);
			}
		}
	});
}