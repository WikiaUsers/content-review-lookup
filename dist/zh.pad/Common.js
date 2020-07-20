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
		articles: ["MediaWiki:CountDown.js", "MediaWiki:Jquery.isotope.min.js", "MediaWiki:MonsterIconTitle.js"]
	}, {
		type: "style",
		articles: ["MediaWiki:CountDown.css", "MediaWiki:Isotope.css"]
	});
	effectiveDate();
	moveModule();
	showEnglishLink();
	rotateStats();
	setTimeout(gacha, 1000);
	
    if (skin == "wikiamobile") {
        if (document.URL.indexOf("redirect=no") == -1) {
            document.write("正在重定向至手機版主頁⋯⋯"); 
            window.location = "http://zh.pad.wikia.com/wiki/Homepage/Mobile";
        }
    }
	//tabview body loaded
    $("[id^=flytabs_] li").on('click', function(){
        var tab_id = $(this).data('tab');
        var tab_body = $(".tabBody[data-tab-body="+tab_id+"]");
        if (tab_body.data('loaded')!==true){
            tab_body.one('ajaxSuccess', function(){
                // something we want to trigger after tab body is ready.
                showNotes();
                textTip();
                if (monsterIconTitle) { monsterIconTitle.reload(); }
            });
        }
    });
    // dirty way to make sure JS is run for 1st Tab.
    setTimeout("showNotes();textTip();if (monsterIconTitle) { monsterIconTitle.reload(); }", 1000);
    setTimeout("showNotes();textTip();if (monsterIconTitle) { monsterIconTitle.reload(); }", 5000);
    setTimeout("showNotes();textTip();if (monsterIconTitle) { monsterIconTitle.reload(); }", 10000); 
	$("ul.tabbernav a").mouseenter(function(){$(this).click()});
	//Force loading all images
	$("img.lzy").each(function(){$(this).attr("src", $(this).attr("data-src")).removeClass("lzy").removeClass("lzyPlcHld")});
        // warning message before comment section
        $("#WikiaArticleComments").before("<div class='a-fire monsterRow' style='font-weight:bold;font-size:18px'><table style='width:100%;margin:0 auto'><tr><td rowspan='2' style='width:25px'><img style='vertical-align: top;' src='https://images.wikia.nocookie.net/__cb20130627181355/pad/zh/images/0/04/Caution.png'></td><td>請勿在評論(comment)發放徵友信息，防礙頁面正常討論。</td></tr><tr><td>如需徵求隊友，請使用<a href='http://zh.pad.wikia.com/wiki/%E9%9A%8A%E9%95%B7%E7%99%BB%E9%8C%84%E5%99%A8'>隊長登錄器</a>和<a href='http://zh.pad.wikia.com/wiki/%E9%9A%8A%E9%95%B7%E6%90%9C%E5%B0%8B%E5%99%A8'>隊長搜尋器</a>。</td></tr></table></div>");
	// L.test
	SP();
	showNotes();
	textTip();
	//Page specific function
	if (typeof pageFn=="function") pageFn();
	if (typeof monsterStateLvCalc=="function") monsterStateLvCalc();
	if (typeof monsterCompareChartInit=="function") monsterCompareChartInit();
});
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
	if ($("div").hasClass("calculator")===true) {
	importArticles({
		type: "script",
		articles: ["MediaWiki:Calculator.js"]
	});
	}
	if ($("body").hasClass("page-Puzzle_Dragons_中文WIKI")===true) {
	importArticles({
		type: "script",
		articles: ["MediaWiki:WikiMain.js"]
	});
	}
	if ($(".MonsterState").length===1) {
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
    if ($(".FriendFinderInput").length===1) {
    var js = document.createElement("script");
    js.src = 'https://www.parsecdn.com/js/parse-1.2.16.min.js';
    document.getElementsByTagName("head")[0].appendChild(js);
    importArticles({
		type: "script",
		articles: ["MediaWiki:FriendFinder.js"]
	});
	}
	if ($("div").hasClass("FriendFinderSearch")===true) {
    importArticles({
		type: "script",
		articles: ["MediaWiki:FriendFinderSearch.js"]
	});
    }
    //Tabview存在時執行
    if ($("div[id^='flytabs']").length>=1) {
        
    }
    //測試用
    if ($("div").hasClass("JS_Test")===true) {
    importArticles({
		type: "script",
		articles: ["MediaWiki:JS_Test.js"]
	});
    }
}
function moveModule(){
	if($(".page-Puzzle_Dragons_维基").length==0){
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
            var text_title = $(this).attr("title");
            var s = "";
            var t = text_title.split("||");
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
    if ($(".texttip[data-original-title]").length>=1) {
        $(".texttip[data-original-title]").attr("title",function() {
            var dot=$(this).attr("data-original-title");
            $(this).removeAttr("data-original-title");
            return dot;
        });
    }
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
if (typeof target.onselectstart!="undefined") target.onselectstart=function(){return false}; else if (typeof target.style.MozUserSelect!="undefined") target.style.MozUserSelect="none"; else target.onmousedown=function(){return false};
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
                $(".WikiaArticleInterlang>ul>li").css('float','left');
		$("#WikiaPageHeader [data-id=comment]").after($(".WikiaArticleInterlang>ul").addClass("wikia-menu-button").css("overflow","hidden").css("display","inline-block"));
		$(".WikiaArticleInterlang").remove();
	}
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
		var startOffset=0, endOffset=0;
		if (s && e){
			//over-the-year fix
			switch (now.getMonth()) {
				case 0:
					if (parseInt(s[1])==12) startOffset=-1;
					if (parseInt(e[1])==12) endOffset=-1;
					break;
				case 11:
					if (parseInt(s[1])==1) startOffset=1;
					if (parseInt(e[1])==1) endOffset=1;
					break;
			}
			var startDate=new Date((now.getFullYear()+startOffset)+"-"+d2(s[1])+"-"+d2(s[2])+"T"+d2(s[3])+":00:00+08:00");
			var endDate=new Date((now.getFullYear()+endOffset)+"-"+d2(e[1])+"-"+d2(e[2])+"T"+d2(e[3])+":00:00+08:00");
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
	$(".showNotes").append($("<a class='noteOpen'>顯示</a>"));
	$(".noteOpen").click(function(){
		if ($(this).text()=="顯示"){
			$(this).parent().parent().next().fadeIn();
			$(this).text("隱藏");
		}else{
			$(this).parent().parent().next().fadeOut();
			$(this).text("顯示");
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
// Leonardo: 
// getMonsterIconUrlUsingWikiaAPI usage:
// params:
//   monster_id_string: "001"
//   callback: function. For example: function(monster_id_string, url) { ... }
// after ajax call for wikia api is finish, callback function will be fired, provide monster_id_string and monter icon URL address.
function getMonsterIconUrlUsingWikiaAPI(monster_id_string, callback){
    $.ajax({url: mw.util.wikiScript('api'),
		data: {action: 'query', prop: 'imageinfo', iiprop: 'url', format: 'json', titles: 'File:'+monster_id_string+'i.png'}
	}).done(function(data){
        if (typeof callback === "function") {
            try{
                callback(monster_id_string, data.query.pages[Object.keys(data.query.pages)[0]].imageinfo[0].url);
            } catch(err){
                callback(monster_id_string, null);
            }
        }
	});
}

// BEGIN: template parers, for ajaxWikiaAPI()
function monsterTemplateParser(text){
    if (text == null) return null;
    var pattern = new RegExp("^\{\{Monster\/\{\{\{1\\|default\}\}\}\\|(.+)\}\}$");
    var result = pattern.exec(text.split("\n").join(""));
    if (result == null) return null;
    var items = result[1].split("|");
    var obj = {};
    var key_value_pattern = new RegExp("^([^=]+)=(.*)$");
    for (var i=0; i< items.length; i++) {
        var key_value = key_value_pattern.exec(items[i]);
        obj[key_value[1]] = key_value[2];
    }
    return obj;
}
function skillTemplateParser(text){
    if (text == null) return null;
    var pattern = new RegExp("^\{\{Skill\/\{\{\{1\\|default\}\}\}\\|(.+)\}\}$");
    var result = pattern.exec(text.split("\n").join(""));
    if (result == null) return null;
    var items = result[1].split("|");
    var obj = {};
    var key_value_pattern = new RegExp("^([^=]+)=(.*)$");
    for (var i=0; i< items.length; i++) {
        var key_value = key_value_pattern.exec(items[i]);
        obj[key_value[1]] = key_value[2];
    }
    return obj;
}
// END: template parers, for ajaxWikiaAPI()