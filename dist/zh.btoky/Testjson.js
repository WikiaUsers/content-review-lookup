$('<textarea id="attack_method" style="resize:none;width:100%;height:200px;"></textarea><input type="button" value="轉換" id="preview" />').appendTo('#test_json');
$('<select id="skill_select_1"><option value="1">Lv. 1</option></select>').appendTo('#Skill_Level_Calc');
$('<select id="skill_select_2"><option value="1">Lv. 1</option></select>').appendTo('#Skill2_Level_Calc');
/*
$('頁面名稱：<input type="text" id="page_name" disabled="disabled" /><table style="width: 100%" id="report_content"><tr><td>錯誤內容</td><td>正確內容</td></tr><tr><td><textarea></textarea></td><td><textarea></textarea></td></tr><tr><td></td><td style="text-align: right"><input type="submit" value="送出" /></td></tr></table>').appendTo('#mw-content-text');
*/

$("select").each(function(){
	$(this).children("option").each(function(){
  	var a=parseInt($(this).parent("select").attr("id")[13]),b=parseInt($("#skill_lv_cd_td_"+a).data("slvmin"), 10),d=parseInt($("#skill_lv_cd_td_"+a).data("slvmax"), 10),c=b-(d-1),selected,slv = new Array(),length=c+1;
  	slv[1] = 1;
  	for(var i=2;i<length;i++){
  		var e=(i<10)?"Lv. ":"Lv.";
		$("#skill_select_"+a).append($('<option></option>').val(i).text(e+i));
		slv[i] = i;
	}
	$("#skill_cd_td_"+a).text(b);
	$("#skill_select_"+a).change(function (){
		var seat = $("#skill_select_"+a),sed=seat.val(),cdstr;
  	cdstr=(sed==1)?"\u521d\u59cbCD:":(sed>1 && sed<c)?"\u6280\u80fdCD:":"\u6700\u5c0fCD:";
  	$("#skill_lv_cd_td_"+a).text(cdstr);
		selected = parseInt(slv[seat.val()],10);
		$("#skill_cd_td_"+a).text(c-selected+1);
	});
  });
});

$('#preview').click(function() {
    $('#skill_list').children().remove();
    var data = JSON.parse($('#attack_method').val());
var enemies = data.waves;
var enemy = JSON.stringify($(enemies));
var floor = eval("(" + enemy + ")");
var tmp2 = "";
for(var n = 0; n < floor.length; n++) { 
	for(var m = 0; m < floor[n].enemies.length; m++) { 
  if(JSON.stringify(floor[n].enemies[m].personalDialogData) != "[]") 
  tmp2 +="&lt;br&gt;'''【第"+(n+1)+"關】'''&lt;br&gt;{{"+JSON.stringify(floor[n].enemies[m].monsterId)+"|50}}：「"+JSON.stringify(floor[n].enemies[m].personalDialogData).replace(/.*\|(.*)".*/,"$1")+"」&lt;br&gt;";
	}
  }
var obj = $.parseJSON("{"+$('#attack_method').val().match(/"[^"]*Script": "[^"]*"/g)+"}");
var script = [];
$.each(obj, function(i, val) {
    switch (true) {
        case (val &&  i === 'enterScript'):
            script[0] = "&lt;br&gt;'''【故事前端】'''&lt;br&gt;"+inputstory(obj.enterScript);
            break;
        case (val &&  i === 'startScript'):
            script[1] = "&lt;br&gt;'''【戰前對白】'''&lt;br&gt;"+inputstory(obj.startScript)+tmp2;
            break;
        case (val &&  i === 'bossScript'):
            script[2] = "&lt;br&gt;'''【敵人對白】'''&lt;br&gt;"+inputstory(obj.bossScript);
            break;
        case (val &&  i === 'endScript'):
            script[3] = "&lt;br&gt;'''【戰後對白】'''&lt;br&gt;"+inputstory(obj.endScript);
            break;
        case (val &&  i === 'clearScript'):
            script[4] = "&lt;br&gt;'''【故事後端】'''&lt;br&gt;"+inputstory(obj.clearScript);
            break;
    }
});
var test_str = "";
for (var k=0; k<script.length; k++) {
    if(script[k]) test_str += script[k];
}

var success = test_str.replace(/^\&lt\;br\&gt\;(.*)\&lt\;br\&gt\;$/g,"$1").replace(/\&lt\;br\&gt\;(\<br\>\:)/g,"$1");
$("#skill_list").html(success);
});

function inputstory(x) {
    var a = [];
    var tmp = "";
    var an;
    var storylist = x.replace(/(\n)/g,"★").replace(/(-1006)\^/g,"$1☆").split("★");
    for(var i = 0; i < storylist.length; i++) {
        a[i] = (storylist[i].replace(/~\d$/g,"").split("~").length >2)?storylist[i].replace(/#R/ig,"").replace(/~\d$/g,"").replace(/(.*)~(.*)~(.*)/ig,'$1,$2,$3'):storylist[i].replace(/#R/ig,"").replace(/~\d$/g,"").replace(/(.*)~(.*)/ig,'$1,$2');
    }
    for (var j=0; j <a.length; j++ ) {
        var b = a[j].split(',');
        if(b.length > 2 ) {
            if (b[0] == "-1002") {
            tmp += "{{"+b[0]+"|50}}"+b[1]+"：「"+b[2]+"」&lt;br&gt;";
            } else if (b[0] == "-1003") {
            tmp += "{{000|50}}"+b[1]+"：「"+b[2]+"」&lt;br&gt;";
            } else if(/^-1006☆/i.test(b[0])) {
            an = b[0].split('☆');
            tmp += "{{";
            tmp += (an[1] == "-1007")?"虛影魔族":(an[1] == "-1006")?"''召喚師''":an[1];
            tmp += "|50}}";
            tmp += (an[1] == "-1006")?"''召喚師''":b[1];
            tmp += "：「"+b[2]+"」&lt;br&gt;";
            } else {
            tmp += "{{";
            tmp += (b[0] == "-1007")?"虛影魔族":(b[0] == "-1006")?"''召喚師''":b[0];
            tmp += "|50}}";
            tmp += (b[0] == "-1006")?"''召喚師''":b[1];
            tmp += b[1]+"：「"+b[2]+"」&lt;br&gt;";
            }
        } else if (b[0] == "-1001") {
        tmp += "&lt;br&gt;"+b[1]+"&lt;br&gt;";
        } else if (b[0] == "-1000" || b[0] == "-1008") {
        tmp += "<br>:「"+b[1]+"」<br>";
        } else if(/^-1006☆/i.test(b[0]) || b[0] == "-1006") {
            tmp += "{{召喚師|50}}''召喚師''：「"+b[1]+"」&lt;br&gt;";
            } else {
        var tmp1=(b[0]<100)?tmp1=(b[0]<10)?"00"+b[0]:"0"+b[0]:b[0];
        tmp += "{{"+tmp1+"|50}}{{"+tmp1+"|_name}}：「"+b[1]+"」&lt;br&gt;";
        }
                    }
                    return tmp;
}