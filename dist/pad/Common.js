/* Any JavaScript here will be loaded for all users on every page load. */
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
		articles: ["u:pad:MediaWiki:CountDown.js", "u:pad:MediaWiki:FilterTable.js","u:zh.pad:MediaWiki:Jquery.isotope.min.js"]
	});
	effectiveDate();
	moveModule();
	layoutButton();
	showChineseLink();
	showNotes();
	rotateStats();
	setTimeout(gacha, 1000);
	$(".sprIcon").click(function(){location=$(this).data('link')});
	//Force loading all images
	$("img.lzy").each(function(){$(this).attr("src", $(this).attr("data-src")).removeClass("lzy").removeClass("lzyPlcHld")});
	//Page specific function
	if (typeof pageFn=="function") pageFn();
	if (typeof monsterStateLvCalc=="function") monsterStateLvCalc();
        if (typeof monsterCompareChartInit=="function") monsterCompareChartInit();
});
function moveModule(){
	if($(".page-Puzzle_Dragons_Wiki").length==0){
		$("#WikiaRail").append($(".move"));
		$(".move").show();
		$(".move:hidden").remove();
	}else{
		$(".move").show();
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
            s = s.replace("　 ","<br>").replace("（","<br>").replace("）","").replace(" Skill:","<br>Skill:");
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
function showChineseLink(){
	if ($(".WikiaArticleInterlang>ul").length){
		$(".WikiaArticleInterlang a").text("中文版本");
		$("#WikiaPageHeader [data-id=comment]").after($(".WikiaArticleInterlang>ul").addClass("wikia-menu-button").css("width","60px").css("overflow","hidden").css("display","inline-block"));
		$(".WikiaArticleInterlang").remove();
	}
}
var eTimeout;
function eventTimeLeft(){
	$("#currentEvents .eStart").each(function(){
		if ($(this).parent().find(".eLeft").length) return;
		var start=$(this).text();
		var end=$(this).next(".eEnd").text();
		var rows=$(this).attr("rowspan");
		var s=start.match(/(\d+)\/(\d+) (\d+):00/);
		var e=end.match(/(\d+)\/(\d+) (\d+):00/);
		var now=new Date();
		if (s && e){
			if (now.getMonth()==11 && parseInt(s[1])==1){
				var startDate=new Date((now.getFullYear()+1)+"-"+d2(s[1])+"-"+d2(s[2])+"T"+d2(s[3])+":00:00-07:00");
			}else{
				var startDate=new Date(now.getFullYear()+"-"+d2(s[1])+"-"+d2(s[2])+"T"+d2(s[3])+":00:00-07:00");
			}
			if (now.getMonth()==11 && parseInt(e[1])==1){
				var endDate=new Date((now.getFullYear()+1)+"-"+d2(e[1])+"-"+d2(e[2])+"T"+d2(e[3])+":00:00-07:00");
			}else{
				var endDate=new Date(now.getFullYear()+"-"+d2(e[1])+"-"+d2(e[2])+"T"+d2(e[3])+":00:00-07:00");
			}
			var timeLeft=(startDate.getTime()-now.getTime())/1000;
			if (timeLeft>0){
				if (timeLeft<3600) timeLeft="<font color=#32B>STARTS</font> "+Math.ceil(timeLeft/60)+" min";
				else if (timeLeft<86400) timeLeft="<font color=#32B>STARTS</font> "+Math.floor(timeLeft/3600)+" hr "+Math.ceil(timeLeft%3600/60)+" min";
				else timeLeft="<font color=#32B>STARTS</font> "+Math.floor(timeLeft/86400)+" day "+Math.floor(timeLeft%86400/3600)+" hr";
			}else{
				timeLeft=(endDate.getTime()-now.getTime())/1000;
				if (timeLeft>0){
					if (timeLeft<3600) timeLeft=Math.ceil(timeLeft/60)+" min <font color=#F00></font> ";
					else if (timeLeft<86400) timeLeft=Math.floor(timeLeft/3600)+" hr "+Math.ceil(timeLeft%3600/60)+" min <font color=#F73>LEFT</font>";
					else timeLeft=Math.floor(timeLeft/86400)+" day "+Math.floor(timeLeft%86400/3600)+" hr <font color=#C73>LEFT</font> ";
				}else{
					timeLeft="<font color=red>EXPIRED</font>";
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
	$(".showNotes").append($("<a class='noteOpen'>Show</a>"));
	$(".noteOpen").click(function(){
		if ($(this).text()=="Show"){
			$(this).parent().parent().next().fadeIn();
			$(this).text("Hide");
		}else{
			$(this).parent().parent().next().fadeOut();
			$(this).text("Show");
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
//No need to add the google analytics code here. It's for Chinese wiki only.