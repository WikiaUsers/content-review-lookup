/* 此处的JavaScript将加载于所有用户每一个页面。 */

$(function(){
	showDaily();
	cardList_buildForm();
	buildCardList();
	formatChar();
	quickList_buildForm();
	quickList();
});
 
function showDaily(){
	if ($("#daily")[0]){
		var d=new Date();
		var day=d.getUTCDay();
		var h=d.getUTCHours()+9;
		if (h>23){
			h-=24;
			day++;
			if (day==7) day=0;
		}
		if (day>=0 && day<=6){
			$("[id^='daily-']").hide();
			$("#daily-"+day).show();
		}else{
			$("#daily").hide().after("<div>周末沒有限定秘境。</div>");
		}
	}
}
 
function cardList_buildForm(){
	$("#cardList-select").append($('<select id="cardList-select-t"> <optgroup label="陣營"> <option value="t-a">劍術之城</option> <option value="t-t">蜀国</option> <option value="t-m">吴国</option> <option value="t-f">妖精</option>  </optgroup> <optgroup label="稀有度"> <option value="r-1">★</option> <option value="r-2">★★</option> <option value="r-3">★★★</option> <option value="r-4">★★★★</option> <option value="r-5">★★★★★</option> <option value="r-6">★★★★★★</option> <option value="r-7">★★★★★★★</option> </optgroup> <optgroup label="COST"> <option value="c-1">1-5 BC</option> <option value="c-2">6-10 BC</option> <option value="c-3">11-15 BC</option> <option value="c-4">16-20 BC</option> <option value="c-5">21 BC或以上</option> </optgroup> <optgroup label="力量屬性"> <option value="f-a">劍術</option> <option value="f-t">技巧</option> <option value="f-m">魔法</option> </optgroup> <optgroup label="型系" id="types"> </optgroup> </select>'));
}
 
function quickList_buildForm(){
	$("#c-kw").append($('<input type="text" id="kw" size="30">'));
	$("#c-type").append($('<select id="type"> <option value="">全部</option> <option value="劍術之城">劍術之城</option> <option value="蜀国">蜀国</option> <option value="魔法之派">魔法之派</option> <option value="妖精">妖精</option> </select>'));
	$("#c-force").append($('<select id="force"> <option value="">全部</option> <option value="劍術">劍術</option> <option value="技巧">技巧</option> <option value="魔法">魔法</option> </select>'));
	$("#c-rareVL").append($('<select id="rare"> <option value="">全部</option> <option value="1">★</option> <option value="2">★★</option> <option value="3">★★★</option></select>'));
	$("#c-rareL").append($('<select id="rare"> <option value="">全部</option> <option value="4">★★★★</option></select>'));
	$("#c-rareM").append($('<select id="rare"> <option value="">全部</option> <option value="5">★★★★★</option> </select>'));
	$("#c-rareH").append($('<select id="rare"> <option value="">全部</option> <option value="6">★★★★★★</option> </select>'));
	$("#c-rareVH").append($('<select id="rare"> <option value="">全部</option> <option value="7">★★★★★★★</option> </select>'));
	$("#search-button").prepend($('<button id="search-b">搜尋</button>'));
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
}
 
function buildCardList(){
	if ($("#cardList")[0]){
		var g=$("#types");
		var list=[];
		var titles=[];
		var count=[];
		$(".thumbHead, .thumbHead2").each(function(){
			var t=$(this).attr("title");
			t=t.split("型");
			if (t.length>1){
				$(this).parent().addClass("s-"+t[0]+"型");
				if (jQuery.inArray(t[0],list)==-1){
					list.push(t[0]);
				}
			}else{
				$(this).parent().addClass("s-無所屬");
			}
		});
		list.sort();
		for(i=0;i<list.length;i++){
			g.append($("<option value='s-"+list[i]+"型'>"+list[i]+"型</option>"));
		}
		g.append("<option value='s-無所屬'>無所屬</option>");
		var oldVal=$("#cardList-select-t").val();
		$(".listItem").hide();
		$("."+oldVal).show();
		$("#cardList-result").text("共顯示 "+ $("."+oldVal).size() + " 個角色");
		$("#cardList").hide();
		$("#cardList").slideDown("slow");
		$("#cardList-select-t").change(function(){
			$("#cardList").slideUp("fast", function(){
				oldVal=$("#cardList-select-t").val();
				$(".listItem").hide();
				$("."+oldVal).show();
				$("#cardList-result").text("共顯示 "+ $("."+oldVal).size() + " 個角色");
				$("#cardList").hide();
				$("#cardList").slideDown("slow");
			});
		});
	}
}
 
function formatChar(){
	if ($("#char-story")[0]){
		$("#char-story").html($("#char-story").html().replace(/;/g,"<br>"));
		$("#char-getMethod").html($("#char-getMethod").html().replace(/,/g,"；"));
	}
}
importArticles({
    type: "script",
    articles: [
        'u:dev:Countdown/code.js',
        'u:dev:Tooltips/code.js'
    ]
});

importScriptPage('ExternalImageLoader/code.js', 'dev');