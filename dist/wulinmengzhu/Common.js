/* 此处的JavaScript将加载于所有用户每一个页面。 */
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
	showDaily();
	showEnglishLink();
	setTimeout(gacha, 1000);
	//Force loading all images
	$("img.lzy").each(function(){$(this).attr("src", $(this).attr("data-src")).removeClass("lzy").removeClass("lzyPlcHld")});
	//Customize search placeholder
	$("#WikiaSearch>input[name=search]").attr("placeholder","輸入寵物編號或關鍵字搜尋");
	//Correct category count
	$("a.categoriesLink").text(($("ul.categories").children().length-1)+"個分類");
	//Page specific function
	if (typeof pageFn=="function") pageFn();
	//translateDiscussion();
});
function moveModule(){
	if($("#WikiaRecentActivity").length>0){
		$("#WikiaRecentActivity").before($(".move"));
	}else{
		$(".move").show();
	}
}
function layoutButton(){
	if ($(".page-Puzzle_Dragons_维基").length==0 && $("#fullForce").length == 0){
		$(".tally:first-child").append($("<button class='wikia-menu-button' id='switchLayoutButton'>切換成寬頁面</button>"));
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
function showDaily(){
	if ($("#currentEvents").length > 0){
		var d=new Date();
		var day=d.getUTCDay();
		var h=d.getUTCHours()+9;
		if (h>23){
			h-=24;
			day++;
			if (day==7) day=0;
		}
		var content="";
		switch(day){
			case 1:break;
			case 2:content='<tr><td colspan=2 align=center>星期二</td><td><a href="/wiki/%E7%81%AB%E6%9B%9C%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="火曜ダンジョン" lang="ja"><img alt="321i.png" src="https://images.wikia.nocookie.net/__cb20120910032955/pad/zh/images/thumb/0/03/321i.png/30px-321i.png" width="30" height="30"></a> <a href="/wiki/%E7%81%AB%E6%9B%9C%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="火曜ダンジョン" lang="ja">火曜ダンジョン</a></td></tr>';break;
			case 3:content='<tr><td colspan=2 align=center>星期三</td><td><a href="/wiki/%E6%B0%B4%E6%9B%9C%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="水曜ダンジョン" lang="ja"><img alt="234i.png" src="https://images.wikia.nocookie.net/__cb20120613063826/pad/zh/images/thumb/2/2a/234i.png/30px-234i.png" width="30" height="30"></a> <a href="/wiki/%E6%B0%B4%E6%9B%9C%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="水曜ダンジョン" lang="ja">水曜ダンジョン</a></td></tr>';break;
			case 4:content='<tr><td colspan=2 align=center>星期四</td><td><a href="/wiki/%E6%9C%A8%E6%9B%9C%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="木曜ダンジョン" lang="ja"><img alt="227i.png" src="https://images.wikia.nocookie.net/__cb20120518074632/pad/zh/images/thumb/9/9b/227i.png/30px-227i.png" width="30" height="30"></a> <a href="/wiki/%E6%9C%A8%E6%9B%9C%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="木曜ダンジョン" lang="ja">木曜ダンジョン</a></td></tr>';break;
			case 5:content='<tr><td colspan=2 align=center>星期五</td><td><a href="/wiki/%E9%87%91%E6%9B%9C%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="金曜ダンジョン" lang="ja"><img alt="251i.png" src="https://images.wikia.nocookie.net/__cb20120703110104/pad/zh/images/thumb/b/b3/251i.png/30px-251i.png" width="30" height="30"></a> <a href="/wiki/%E9%87%91%E6%9B%9C%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="金曜ダンジョン" lang="ja">金曜ダンジョン</a></td></tr>';break;
			default:content='<tr><td colspan=2 align=center>星期六、日</td><td><a href="/wiki/%E5%9C%9F%E6%97%A5%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="土日ダンジョン" lang="ja"><img alt="207i.png" src="https://images.wikia.nocookie.net/__cb20120507034254/pad/zh/images/thumb/0/02/207i.png/30px-207i.png" width="30" height="30"></a> <a href="/wiki/%E5%9C%9F%E6%97%A5%E3%83%80%E3%83%B3%E3%82%B8%E3%83%A7%E3%83%B3" title="土日ダンジョン" lang="ja">土日ダンジョン</a></td></tr>';break;
		}
		$("#currentEvents>tbody>tr:first-child").after($(content));
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
function translateDiscussion(){
	if ($("#RelatedForumDiscussion").length){
		$("#RelatedForumDiscussion").addClass("module").addClass("a-dark");
		$("#RelatedForumDiscussion>h2:first-child").html($("#RelatedForumDiscussion>h2:first-child").html().replace("Discussions about ","關於")+"的話題");
		$("#RelatedForumDiscussion>h2>a:first-child").attr("data-original-title","建立關於本頁內容的新話題").text("建立新話題");
		$(".forum-see-more a:first-child").text("瀏覽更多相關話題→");
	}
	if ($(".message-container").length){
		$(".message-container>h4:first-child").text("開始新話題");
		$("#BoardList>option[value='']").text("[選擇內容板塊]");
		$("textarea.title").attr("placeholder","話題主旨");
		$("textarea.body").attr("placeholder","詳細內容");
		$("label[for=MessageTopicInput]").html("相關<span class='texttip'>標籤<span style='font-weight:normal'><b></b>與標籤名稱相同的頁面會顯示本話題討論內容，一個話題可擁有多個標籤</span></span>");
		$("#MessageTopicInput").attr("placeholder","新增相關標籤 (非必要)");
		$(".message-container button:first-child").text("發表");
	}
	if ($(".ForumActivityModule").length){
		$(".ForumActivityModule").each(function(){
			var t=$(this).find("h1:first-child").text().replace("Related Threads","相關話題").replace("Forum Activity","最新討論");
			$(this).find("h1:first-child").text(t);
			$(this).find("h1:first-child").text(t);
			$(this).html($(this).html().replace(/started a discussion/g,"開新話題").replace(/posted a reply/g,"發表回應"));
		});
	}
	if ($("div.message-topic-edit").length){
		$("ul.comments").prepend($("div.message-topic-edit")).prepend($("ul.related-topics")).prepend($("h4.related-topics-heading"));
		$("h4.related-topics-heading").html($("h4.related-topics-heading").html().replace("Topics for this thread:","本話題的<span class='texttip'>標籤<span style='font-weight:normal'><b></b>與標籤名稱相同的頁面會顯示本話題討論內容，一個話題可擁有多個標籤</span></span>:"));
	}
	$("li.threads").each(function(){$(this).text($(this).text().replace("threads","話題").replace("Messages","個訊息"))});
	$("li.posts").each(function(){$(this).text($(this).text().replace("posts","回應").replace("Kudos","個讚好"))});
	$("p.last-post").each(function(){$(this).html($(this).html().replace("Last post by","最新回應由"))});
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
function showEnglishLink(){
	if ($(".WikiaArticleInterlang>ul").length){
		$(".WikiaArticleInterlang a").text("English Version");
		$("[data-id=comment]").after($(".WikiaArticleInterlang>ul").addClass("wikia-menu-button").css("width","95px").css("overflow","hidden").css("display","inline-block"));
		$(".WikiaArticleInterlang").remove();
	}
}