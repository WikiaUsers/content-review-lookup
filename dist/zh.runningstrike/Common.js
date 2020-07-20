/* 此处的JavaScript将加载于所有用户每一个页面。 */
function numtochi(s){
	var result = '';
	var carray = ["零","一","二","三","四","五","六","七","八","九"];
	if (s < 10){
		return carray[s];
	} else if (s == 10){
		return "十";
	} else if (s < 20){
		return "十" + carray[s-10];
	} else if (s < 100){
		if (s%10 == 0){
			return carray[Math.round(s/10)] + "十";
		} else {
			return carray[Math.floor(s/10)] + "十" + carray[s%10];
		};
	};
};
function numday(s){
	if (s == 2 && (new Date()).getYear()%4 === 0){
		return 29;
	} else {
		return [0,31,28,31,30,31,30,31,31,30,31,30,31][s];
	}
};
$(window).load(function() {
	if(document.getElementsByClassName("page-header__page-subtitle").length === 0){
		document.getElementsByClassName("page-header__main")[0].innerHTML += '<div class="page-header__page-subtitle"></div>';
	}
	var urls= "http://" + window.location.href.substring(10);
	urls = urls.replace("Runningstrike_%E7%BB%B4%E5%9F%BA","Running_strike_english_Wikia");
    urls = urls.replace("%E9%81%8A%E6%88%B2%E8%B3%87%E8%A8%8A","Game_Info");
	urls = urls.replace("%E9%81%8A%E6%88%B2%E7%95%8C%E9%9D%A2","Game_Interface");
	urls = urls.replace("%E9%81%8A%E6%88%B2%E5%9C%96%E7%89%87","Game_Image");
	urls = urls.replace("%E5%9C%B0%E5%9C%96%E8%B3%87%E6%96%99","Map_Information");
	urls = urls.replace("%E8%A7%92%E8%89%B2%E8%B3%87%E6%96%99","Character_Information");
	urls = urls.replace("%E5%BE%B7%E5%A3%AB%E8%92%99_Desmond","Desmond(德士蒙) ");
	urls = urls.replace("%E8%8E%89%E7%B5%B2_Liz","Liz(莉絲) ");
	urls = urls.replace("%E5%8D%A1%E5%B8%83_Kapu","Kapu(卡布) ");
	urls = urls.replace("%E5%B8%95%E9%AB%98_Pago","Pago(帕高) ");
	urls = urls.replace("S%E7%B4%9A","S_Rank");
	urls = urls.replace("A%E7%B4%9A","A_Rank");
	urls = urls.replace("B%E7%B4%9A","B_Rank");
	urls = urls.replace("C%E7%B4%9A","C_Rank");
	urls = urls.replace("%E6%88%90%E5%B0%B1","Achievements");
	urls = urls.replace("%E9%81%93%E5%85%B7%E7%B0%A1%E4%BB%8B","Items_Description");
	urls = urls.replace("%E8%BF%BD%E5%B0%BE%E5%9E%8B","Chase-Type");
	urls = urls.replace("%E7%B5%82%E6%A5%B5%E5%B0%8E%E5%BD%88","Ulti-Missile");
	urls = urls.replace("%E8%BF%BD%E8%B9%A4%E5%B0%8E%E5%BD%88","Tracking_Rocket");
	urls = urls.replace("%E5%89%8D%E6%94%BB%E5%8F%8A%E7%A2%B0%E6%92%9E%E5%88%A4%E6%96%B7%E5%9E%8B","Front_attack");
	urls = urls.replace("%E9%AD%94%E6%B3%95%E7%AE%AD","Magic_Arrows");
	urls = urls.replace("%E6%88%B0%E6%96%A7","Battle_Axe");
	urls = urls.replace("%E7%93%A6%E6%96%AF%E5%99%B4%E7%81%AB%E6%A7%8D","LPG_Torch");
	urls = urls.replace("%E5%BE%8C%E6%96%B9%E6%8A%95%E6%93%B2","Back_throw");
	urls = urls.replace("%E7%82%B8%E5%BD%88","Bomb");
	urls = urls.replace("%E5%9A%87%E4%B8%80%E8%B7%B3%E9%A3%9F%E4%BA%BA%E8%8A%B1","Man_Eating_Flower");
	urls = urls.replace("%E5%9C%B0%E5%9C%96%E7%82%AE","Global-Type");
	urls = urls.replace("%E9%96%83%E9%9B%BB","Lightning");
	urls = urls.replace("%E5%99%B4%E5%A2%A8%E5%85%AB%E7%88%AA%E9%AD%9A","Ink_Expulsing_Octopus");
	urls = urls.replace("%E5%99%B4%E5%A2%A8%E5%85%AB%E7%88%AA%E9%AD%9A","Defensive-Type");
	urls = urls.replace("%E5%8A%A0%E9%80%9F%E9%9E%8B","Boots_of_Accleration");
	urls = urls.replace("%E6%B0%B4%E6%AF%8D%E8%AD%B7%E7%9B%BE","Jellyfish_Shield");
	urls = urls.replace("%E9%81%8A%E6%88%B2%E6%8A%80%E5%B7%A7","Game_Skills");
	urls = urls.replace("%E9%81%93%E5%85%B7%E4%BD%BF%E7%94%A8","Using_Items");
	urls = urls.replace("%E4%BA%8B%E5%89%8D%E6%BA%96%E5%82%99","Preparations");
	urls = urls.replace("%E8%A7%92%E8%89%B2%E4%BD%BF%E7%94%A8","Using_Characters");
	urls = urls.replace("%E8%A7%92%E8%89%B2%E4%BD%BF%E7%94%A8","Psychological_Operation_and_Cooperation ");
	urls = urls.replace("%E5%B0%8D%E4%BB%98%E5%BE%B7%E5%A3%AB%E8%92%99","Dealing_with_Desmond");
	urls = urls.replace("%E5%B0%8D%E4%BB%98%E5%B8%95%E9%AB%98","Dealing_with_Pago");
	urls = urls.replace("%E4%B8%8D%E7%A2%BA%E5%AE%9A","Unconfirmed");
	urls = urls.replace("%E6%8F%90%E5%87%BA%E5%BB%BA%E8%AD%B0","Suggestion");
	urls = urls.replace("%E6%95%85%E4%BA%8B%E9%9B%86","Stories");
	urls = urls.replace("%E7%B4%B0%E8%AA%AA%E9%AD%94%E6%96%B9","細說魔方");
	urls = urls.replace("%E7%B2%BE%E9%9D%88%E8%A9%B1","Fairy_Tale");
	urls = urls.replace("%E8%A7%92%E8%89%B2%E8%81%9A%E7%84%A6","Character_Spotlight");
	urls = urls.replace("%E7%AB%99%E5%8B%99","Admin");
	urls = urls.replace("%E7%AE%A1%E7%90%86%E5%93%A1%E5%9C%98%E9%9A%8A","Admin_Team");
	urls = urls.replace("%E5%A0%B1%E9%8C%AF%E5%8D%80","Error_Report");
	urls = urls.replace("%E5%85%B6%E4%BB%96","Others");
	urls = urls.replace("%E6%9C%ACWiki%E6%A8%A1%E6%9D%BF%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95","How_to_use_Wiki_Templates");
	urls = urls.replace("%E6%A8%A1%E6%9D%BF","Template");
	urls = urls.replace("%E6%8F%92%E5%85%A5%E7%89%A9%E4%BB%B6%E7%AD%89%E7%B4%9A","Insert_Items_with_level");
	urls = urls.replace("%E8%83%8C%E6%99%AF%E9%9F%B3%E6%A8%82","BGM");
	urls = urls.replace("%E6%A8%A1%E6%93%AC%E6%8A%BD%E8%9B%8B%E6%A9%9F","Simulated_egg_machine");
	urls = urls.replace("%E9%81%93%E5%85%B7","Items");
	urls = urls.replace("%E7%B2%BE%E9%9D%88","Fairies");
	urls = urls.replace("%E5%AE%A3%E5%82%B3%E7%89%88","Advertisement_Board");
    $('.page-header__page-subtitle').append('  |  <a href="' + urls + '" rel="nofollow">English</a>');
	var newModule2 = '<div style="height: 1000px; overflow: scroll"><section class="module AdModule"></section></div>';
    $('.WikiaRail').append(newModule2);
    $.getJSON('/api.php?action=parse&text={{宣傳版F}}&format=json', function(n) {
        var addContent = n.parse.text['*'];
        $('.AdModule').append(addContent);
    });
    $.getJSON('/api.php?action=parse&text={{宣傳版L}}&format=json', function(n) {
        var addContent = n.parse.text['*'];
        $('.AdModule').append(addContent);
    });
    $.getJSON('/api.php?action=parse&text={{宣傳版}}&format=json', function(n) {
        var addContent = n.parse.text['*'];
        $('.AdModule').append(addContent);
    });
    $('.chat-join').children("button").remove();
    var addContent2 ="<button type='button' onclick='ChatEntryPoint.onClickChatButton(&apos;http://zh.runningstrike.wikia.com/wiki/Special:Chat&apos;)' data-msg-id='chat-start-a-chat'>中文</button>";
    var addContent3 ="<button type='button' onclick='ChatEntryPoint.onClickChatButton(&apos;http://runningstrike.wikia.com/wiki/Special:Chat&apos;)' data-msg-id='chat-start-a-chat'>英文</button>";
    $('.chat-join').append(addContent2);
    $('.chat-join').append(addContent3);
    $('#WikiaFooter').children("section").remove();
    $('#WikiaFooter').append("<section><div class=header-container><h1>Related Wiki</h1>     <a id=WikiaRandomWiki3 href=http://runningstrike.wikia.com/ class=wikia-button>Random Wiki</a>     <a id=WikiaRandomWiki2 href=http://zh.runningstrike.wikia.com/ class=wikia-button>Random Wiki</a>     <a id=WikiaRandomWiki href=http://community.wikia.com/wiki/Special:RandomWiki/1212527 class=wikia-button>Random Wiki</a>          </div></section>");
    document.getElementById("WikiaRandomWiki2").innerHTML = "Running Strike 中文維基主頁";
    document.getElementById("WikiaRandomWiki3").innerHTML = "Running Strike 英文維基主頁";
    /*$('.WikiaRail').appendChild(document.getElementsByClassName('ajax-poll')[0]);
    $('.WikiaRail').insertBefore(document.getElementsByClassName('ajax-poll')[0], document.getElementById("WikiaRail").childNodes[0]);
    $('.ajax-poll')[0].style.backgroundColor = "#ffffdd";
    $("#pollAnswer2").style.backgroundColor = "#ff8888";
    $("#pollAnswer3").style.backgroundColor = "#ffff88";
    $("#pollAnswer4").style.backgroundColor = "#88ff88";
    $("#pollAnswer5").style.backgroundColor = "#88ffff";
    $("#pollAnswer6").style.backgroundColor = "#8888ff";
    $("#pollAnswer7").style.backgroundColor = "#ff88ff";
    $("#pollAnswer2").style.color = "#88ffff";
    $("#pollAnswer3").style.color = "#8888ff";
    $("#pollAnswer4").style.color = "#ff88ff";
    $("#pollAnswer5").style.color = "#ff8888";
    $("#pollAnswer6").style.color = "#ffff88";
    $("#pollAnswer7").style.color = "#88ff88";*/
	switch(window.location.href.substring(39)) {
		case "%E6%A8%A1%E6%93%AC%E6%8A%BD%E8%9B%8B%E6%A9%9F":
			$('.NormalEgg').append('<script type="text/javascript">function drawegg(){egglist = new Array(17);egglist[0] = "曼波魚";egglist[1] = "蒸汽小子";egglist[2] = "章魚燒";egglist[3] = "催命死神";egglist[4] = "弓之精靈";egglist[5] = "抹布幽靈";egglist[6] = "小卒魂";egglist[7] = "豬仔錢罌";egglist[8] = "食人花種子";egglist[9] = "球型兵器";egglist[10] = "飛彈隊長";egglist[11] = "大鐵鎚";egglist[12] = "羽毛精靈";egglist[13] = "神秘魔方";egglist[14] = "火球怪";egglist[15] = "機械鐵匠";egglist[16] = "渡渡鳥";grads = new Array(17);grads[0] = "C";grads[1] = "C";grads[2] = "C";grads[3] = "C";grads[4] = "C";grads[5] = "C";grads[6] = "B";grads[7] = "B";grads[8] = "B";grads[9] = "B";grads[10] = "B";grads[11] = "B";grads[12] = "A";grads[13] = "A";grads[14] = "A";grads[15] = "A";grads[16] = "A";uses = new Array(17);uses[0] = "重生時間縮減並以最大速度起跑";uses[1] = "提升炸彈威力及出現機率";uses[2] = "增加八爪魚出現機率及延長墨汁持續時間";uses[3] = "提升戰斧威力及出現機率";uses[4] = "提升魔法箭威力及出現機率";uses[5] = "提升加速度1級";uses[6] = "從負面狀態中恢復後，產生一個短暫的護盾";uses[7] = "增加比賽結算時獲得的金幣";uses[8] = "提升食人花威力及出現機率";uses[9] = "提升追蹤導彈威力及出現機率";uses[10] = "提升終極導彈威力及出現機率";uses[11] = "提升力量1級";uses[12] = "從金幣中獲取額外技能值";uses[13] = "提升水母護盾持續時間及出現機率";uses[14] = "提升噴火槍持續時間及出現機率";uses[15] = "提升韌性1級";uses[16] = "提升速度1級";descr = new Array(17);descr[0] = "海難的生還者 為了報答他們的恩人， 再次墮入深海與曼波魚重遇";descr[1] = "爆炸！爆炸！ 蒸汽小子如是說";descr[2] = "我要復仇！ 章魚燒召喚衪的同伴";descr[3] = "死神加持後的斧頭， 擁有致命的效果";descr[4] = "更準，更快";descr[5] = "猛鬼在後追趕， 你不得不加快腳步";descr[6] = "死過的小卒不能再死一次";descr[7] = "衪飢腸轆轆， 只求金銀果腹";descr[8] = "食人花雖然枯萎得快， 他散播的種子卻多得可怕";descr[9] = "無後座力飛彈發射器， 款色老舊，勝在成本低廉";descr[10] = "衪不願跑到最前， 超越所有箭靶";descr[11] = "砸向對手， 或砸傷自己";descr[12] = "在天秤一端添一片羽毛， 祈求幸運青睞於你";descr[13] = "魔方即神明， 水母信眾用身軀捍衛牠們的信仰";descr[14] = "煽風點火， 火球怪的強項";	descr[15] = "機械鐵匠走得搖搖擺擺， 以身上那套笨重盔甲為榮";descr[16] = "衝鋒陷陣或是自墮陷阱， 渡渡鳥毫不在乎";index = Math.floor(Math.random() * egglist.length); document.getElementById("grad").innerHTML = grads[index];var quantity = Math.floor(Math.random() * 5) + 8;document.getElementById("resu").innerHTML = egglist[index] + "×" + (quantity) + "*" + 2 + "=" + quantity * 2 + "(特別優惠期)";document.getElementById("use").innerHTML = uses[index];document.getElementById("desc").innerHTML = descr[index];return egglist[index];}</script><button type="button" id="Drs" onclick="drawegg()">抽蛋</button><br>精靈蛋<br>隨機獲得一組C級至A級精靈<br>剩餘數量：∞<br><div id="grad">Nothing</div><div id="resu">Nothing</div><br>使用效果<br><div id="use">Nothing</div><br>精靈介紹<br><div id="desc">Nothing</div><br>');
			$('.SpecialEgg').append('<script type="text/javascript">function drawspegg(){spegglist = new Array(16);spegglist[0] = "魔術帽";spegglist[1] = "飛翔娃娃";spegglist[2] = "烏雲眾";spegglist[3] = "黑色魔獸";spegglist[4] = "白色魔獸";spegglist[5] = "小卒魂";spegglist[6] = "豬仔錢罌";spegglist[7] = "食人花種子";spegglist[8] = "球型兵器";spegglist[9] = "飛彈隊長";spegglist[10] = "大鐵鎚";spegglist[11] = "羽毛精靈";spegglist[12] = "神秘魔方";spegglist[13] = "火球怪";spegglist[14] = "機械鐵匠";spegglist[15] = "渡渡鳥";spgrads = new Array(16);spgrads[0] = "S";spgrads[1] = "S";spgrads[2] = "S";spgrads[3] = "S";spgrads[4] = "S";spgrads[5] = "B";spgrads[6] = "B";spgrads[7] = "B";spgrads[8] = "B";spgrads[9] = "B";spgrads[10] = "B";spgrads[11] = "A";spgrads[12] = "A";spgrads[13] = "A";spgrads[14] = "A";spgrads[15] = "A";spuses = new Array(16);spuses[0] = "每隔一段時間，獲得道具";spuses[1] = "提升加速鞋持續時間及出現機率";spuses[2] = "提升閃電威力及出現機率";spuses[3] = "提升力量，韌性2級";spuses[4] = "提升速度，加速度2級";spuses[5] = "從負面狀態中恢復後，產生一個短暫的護盾";spuses[6] = "增加比賽結算時獲得的金幣";spuses[7] = "提升食人花威力及出現機率";spuses[8] = "提升追蹤導彈威力及出現機率";spuses[9] = "提升終極導彈威力及出現機率";spuses[10] = "提升力量1級";spuses[11] = "從金幣中獲取額外技能值";spuses[12] = "提升水母護盾持續時間及出現機率";spuses[13] = "提升噴火槍持續時間及出現機率";spuses[14] = "提升韌性1級";spuses[15] = "提升速度1級";spdescr = new Array(16);spdescr[0] = "魔術帽內藏有許多寶物， 但不保證一定管用";spdescr[1] = "為了飛翔！";spdescr[2] = "衪們喜歡熱鬧， 在天空上開辦搖滾派對， 對底下的人造成災難";spdescr[3] = "不再白色的年糕";spdescr[4] = "白色的年糕";spdescr[5] = "死過的小卒不能再死一次";spdescr[6] = "衪飢腸轆轆， 只求金銀果腹";spdescr[7] = "食人花雖然枯萎得快， 他散播的種子卻多得可怕";spdescr[8] = "無後座力飛彈發射器， 款色老舊，勝在成本低廉";spdescr[9] = "衪不願跑到最前， 超越所有箭靶";spdescr[10] = "砸向對手， 或砸傷自己";spdescr[11] = "在天秤一端添一片羽毛， 祈求幸運青睞於你";spdescr[12] = "魔方即神明， 水母信眾用身軀捍衛牠們的信仰";spdescr[13] = "煽風點火， 火球怪的強項";spdescr[14] = "機械鐵匠走得搖搖擺擺， 以身上那套笨重盔甲為榮";spdescr[15] = "衝鋒陷陣或是自墮陷阱， 渡渡鳥毫不在乎";index = Math.floor(Math.random() * spegglist.length); document.getElementById("spgrad").innerHTML = spgrads[index]; var quantity = Math.floor(Math.random() * 5) + 8;document.getElementById("spresu").innerHTML = spegglist[index] + "×" + (quantity) + "*" + 3 + "=" + quantity * 3 + "(特別優惠期)";document.getElementById("spuse").innerHTML = spuses[index];document.getElementById("spdesc").innerHTML = spdescr[index];return spegglist[index];}</script><button type="button" id="Drs" onclick="drawspegg()">抽蛋</button><br>優質精靈蛋<br>隨機獲得一組B級至S級精靈<br>剩餘數量：∞<br><div id="spgrad">Nothing</div><div id="spresu">Nothing</div><br>使用效果<br><div id="spuse">Nothing</div><br>精靈介紹<br><div id="spdesc">Nothing</div><br>');
		case "%E8%83%8C%E6%99%AF%E9%9F%B3%E6%A8%82":
			$('.IFrameBGM01').append('<iframe width="400" height="240" src="https://www.youtube.com/embed/IHnm0tz2Kck" frameborder="0" allowfullscreen></iframe>');
			$('.RSBGM01').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/sYeo9BRzyAg" frameborder="0" allowfullscreen></iframe>');
			$('.RSBGM02').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/-fA43oLJVhM" frameborder="0" allowfullscreen></iframe>');
			$('.RSBGM03').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/rfg1SsE40A4" frameborder="0" allowfullscreen></iframe>');
			$('.RSBGM04').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/G2dR9UeSEYw" frameborder="0" allowfullscreen></iframe>');
			$('.RSBGM05').append('<iframe width="560" height="315" src="https://www.youtube.com/embed/ikAekcSanvE" frameborder="0" allowfullscreen></iframe>');
		case "Runningstrike_%E7%BB%B4%E5%9F%BA":
			var d = new Date();
			var season = d.getYear()*12 + d.getMonth() - 1383;
			$('#numchi1').html(numtochi(season));
			$('#numchi2').html(numtochi(season + 1));
			$('.curyear').html(d.getYear() + 1900);
			$('.nextyear').html(d.getYear() + 1900 + (d.getMonth()==11?1:0));
			$('.curmonth').html(d.getMonth() + 1);
			$('.nextmonth').html(((d.getMonth()+1)%12) + 1);
			$('#curday').html(numday(d.getMonth() + 1));
			$('#nextday').html(numday(((d.getMonth()+1)%12) + 1));
	}
	var list = document.getElementsByTagName("*");
	for (var i = 0; i < list.length; i++){
		if(list[i].hasAttribute("style") && list[i].getAttribute("style").substring(0,8) == "(script)") {
			var original = list[i].getAttribute("style");
			var content = JSON.parse(list[i].getAttribute("style").substring(8).replace(/~/g,"'"));
			for (var j in content){
				list[i].setAttribute(j, content[j]);
			}
			if (list[i].getAttribute("style") == original){
                		list[i].setAttribute("style", "");
			}
		}
	}
});