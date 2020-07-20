/* 此处的JavaScript将加载于所有用户每一个页面。 */
//Onload functions
$(function(){
	showDaily();
        showDailyFairy();
	cardList_buildForm();
	buildCardList();
	formatChar();
	quickList_buildForm();
	quickList();
        cardPic();
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
		$("[id^='daily-']").hide();
		$("#daily-"+day).show();
	}
}

function showDailyFairy(){
        if ($("#dailyfairy")[0]){
                var d = new Date();
                var day=d.getUTCDay();
                var h = d.getUTCHours()+9;
                if(h>23){
                       h-=23;
                       day++;
                       if(day==7) day=0;
                }
                $("[id^='dailyfairy-']").hide();
                $("#dailyfairy-"+day).show();
        }
}
 
function cardList_buildForm(){
	$("#cardList-select").append($('<select id="cardList-select-t"> <optgroup label="性别">  <option value="g-f">萌妹</option> <option value="g-m">基佬</option> <option value="g-r">萝卜</option> <option value="g-b">淫兽</option> </optgroup><optgroup label="阵营"> <option value="t-a">龙皇院</option> <option value="t-t">天机院</option> <option value="t-m">神御院</option> <option value="t-f">感染者</option>  </optgroup> <optgroup label="稀有度"> <option value="r-1">★</option> <option value="r-2">★★</option> <option value="r-3">★★★</option> <option value="r-4">★★★★</option> <option value="r-5">★★★★★</option> <option value="r-6">★★★★★★</option> <option value="r-7">★★★★★★★</option> </optgroup> <optgroup label="COST"> <option value="c-1">1-5 BC</option> <option value="c-2">6-10 BC</option> <option value="c-3">11-15 BC</option> <option value="c-4">16-20 BC</option> <option value="c-5">21-25 BC</option><option value="c-6">26BC或以上</option> </optgroup>  <optgroup label="型系" id="types"> </optgroup> </select>'));
}
 
function quickList_buildForm(){
	$("#c-kw").append($('<input type="text" id="kw" size="30">'));
	$("#c-type").append($('<select id="type"> <option value="">全部</option> <option value="龙皇院">龙皇院</option> <option value="天机院">天机院</option> <option value="神御院">神御院</option> <option value="感染者">感染者</option> </select>'));
	$("#c-rareL").append($('<select id="rare"> <option value="">全部</option> <option value="1">★</option> <option value="2">★★</option> <option value="3">★★★</option> <option value="4">★★★★</option></select>'));
	$("#c-rareH").append($('<select id="rare"> <option value="">全部</option> <option value="5">★★★★★</option> <option value="6">★★★★★★</option> <option value="7">★★★★★★★</option></select>'));
	$("#search-button").prepend($('<button id="search-b">搜索</button>'));
}
 
function quickList(){
	if ($("#search-b").length>0){
		$("#search-b").click(function(){
			$(".c-item").hide();
			var kw=$("#kw").val();
			var t=$("#type").val();
			var r=$("#rare").val();
			var i=0;
			var d=50;
			$(".c-item").each(function(){
				if ((kw=="" || $(this).children("td:nth-child(2)").text().indexOf(kw)>=0) && (t=="" || $(this).children("td:nth-child(3)").text().indexOf(t)>=0) && (r=="" || $(this).children("td:nth-child(4)").text().indexOf(r)>=0)){
					$(this).delay(i*d).show("slow");
					i++;
				}
			});
			$("#search-r").text("共 "+i+" 个项目符合搜索条件。");
		});
		$("tr:hidden").remove();
	}
}

function formatChar(){
	if ($("#char-story")[0]){
		$("#char-story").html($("#char-story").html().replace(/;/g,"<br>"));
		$("#char-getMethod").html($("#char-getMethod").html().replace(/,/g,"；"));
	}
}

function cardPic(){
        if($("#rare1")){
                $("#rare1").children(".listItem").hide();
                $("#rare1").children(".r-1").show();
        }
        if($("#rare2")){
                $("#rare2").children(".listItem").hide();
                $("#rare2").children(".r-2").show();
        }
        if($("#rare3")){
                $("#rare3").children(".listItem").hide();
                $("#rare3").children(".r-3").show();
        }
        if($("#rare4")){
                $("#rare4").children(".listItem").hide();
                $("#rare4").children(".r-4").show();
        }
        if($("#rare5")){
                $("#rare5").children(".listItem").hide();
                $("#rare5").children(".r-5").show();
        }
        if($("#rare6")){
                $("#rare6").children(".listItem").hide();
                $("#rare6").children(".r-6").show();
        }
        if($("#rare7")){
                $("#rare7").children(".listItem").hide();
                $("#rare7").children(".r-7").show();
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
			var ts = t.split("型");
			if (ts.length>1){
				$(this).parent().addClass("s-"+ts[0]+"型");
				if (jQuery.inArray(ts[0],list)==-1){
					list.push(ts[0]);
				}
			}else{
				$(this).parent().addClass("s-无所");
			}
		});
                list.sort();
		for(i=0;i<list.length;i++){
			g.append($("<option value='s-"+list[i]+"型'>"+list[i]+"型</option>"));
		}
		g.append("<option value='s-无所'>无所属</option>");
                var oldVal=$("#cardList-select-t").val();
		$(".listItem").hide();
		$("."+oldVal).show();
		$("#cardList-result").text("共显示 "+ $("."+oldVal).size() + " 个角色");
		$("#cardList").hide();
		$("#cardList").slideDown("slow");
		$("#cardList-select-t").change(function(){
			$("#cardList").slideUp("fast", function(){
				oldVal=$("#cardList-select-t").val();
				$(".listItem").hide();
				$("."+oldVal).show();
				$("#cardList-result").text("共显示 "+ $("."+oldVal).size() + " 个角色");
				$("#cardList").hide();
				$("#cardList").slideDown("slow");
			});
		});
	}
}