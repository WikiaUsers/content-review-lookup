
$('<span id="center-box" style="width:400px; height:500px; display: none; float: left;"><div id="box-header" style="position:absolute; top:0px; border-radius: 10px;"><img src="http://d1mcde1f7zaaai.cloudfront.net/inapp/img-2/top.png" width="400px"></div><div id="text-title" style="position:absolute; top: 38px; left:calc(100% - 325px);"><img src="http://i.imgur.com/uahgdJa.png"><div id="text-title-text" style="position:absolute; top:14px; font-size:22px; left:calc(100px - 23px);">卡牌資訊</div></div><div id="info_message" style="position:absolute; width:calc(100% - 81px); height: calc(100% - 123px); overflow-y: auto; margin:90px 0 33px 0; padding-left: 10%; padding-right: 10%; text-align:left; font-size:14px;"></div><div id="box-footer" style="position:absolute; bottom:0px; border-radius: 10px;"><img src="http://d1mcde1f7zaaai.cloudfront.net/inapp/img-2/down.png" width="400px"></div><div id="box-close" style="position:absolute; bottom:5px; border-radius: 10px; left:50%; margin-left:-40px;"><input type="button" id="closewindows" value="關閉視窗" style="font-size:18px;" /></div></span>').appendTo('#pet_card_info');
$('<select id="skill_level" onchange="skillLvCalc(this)"><option value="1">Lv. 1</option></select>').appendTo('#Skill_Level_Calc');
$('<select id="skill2_level" onchange="skill2LvCalc(this)"><option value="1">Lv. 1</option></select>').appendTo('#Skill2_Level_Calc');
$('<input type="image" id="AllMaxBouns_light" src="http://i.imgur.com/zL5vYe7.png" height="42" width="42" style="display:none"><input type="image" id="AllMaxBouns_none" src="http://i.imgur.com/LX0vDFU.png" height="42" width="42">').appendTo('#All_Max_Bouns');
$('#center-box').hide();
var monsterid = $('#card_info').data('id');
$.get('http://zh.wingwing007.wikia.com/api.php',{
	format:'json',
	action: 'expandtemplates',
	text:'{{TeamSkill|' + monsterid + '}}'
}, function (data) {
	var messageinfotmp1 = data.expandtemplates['*'].replace(/<color=yellow>/ig,'<span style="color:yellow;">');
	var messageinfo = messageinfotmp1.replace(/<\/color>/ig,'</span>');
	$('#info_message').html(messageinfo);
});

$.get('http://zh.tos.wikia.com/api.php?format=json&action=expandtemplates&text={{'+monsterid+'|fullstatsMax}}',function(data){
    var arrstats = data.expandtemplates['*'].split(',');
    if(parseInt(arrstats[3],10)>=0&&parseInt(arrstats[4],10)>=0&&parseInt(arrstats[5],10)>=0){
    var hpMax = parseInt(arrstats[0],10);
    var atkMax = parseInt(arrstats[1],10);
    var recMax = parseInt(arrstats[2],10);
    var Maxfull = hpMax+atkMax+recMax;

    var hpbouns = parseInt(arrstats[3],10);
    var atkbouns = parseInt(arrstats[4],10);
    var recbouns = parseInt(arrstats[5],10);
    var bounsfull = hpbouns+atkbouns+recbouns;
    $("table#monster-data.wikitable tbody tr:nth-child(6)").each(function(){
        for (var i=0;i<4;i++) $(this).find("td:eq("+i+")").attr("id","stats_"+i);
    });
    $("#AllMaxBouns_none").click(function(){
        var total = 0,statslist = 0;
        for (var i=0;i<3;i++) {
            statslist = parseInt(arrstats[i],10)+parseInt(arrstats[i+3],10);
            $("table#monster-data.wikitable td#stats_"+i).html("<span style=color:yellow>"+statslist+"</span><br>+"+arrstats[i+3]);
            total = total+statslist;
        }
        $("table#monster-data.wikitable td#stats_3").html(total+'<br>+'+bounsfull);
        $(this).hide();
        $("#AllMaxBouns_light").show();
    });
    $("#AllMaxBouns_light").click(function(){
        $(this).hide();
        $("#AllMaxBouns_none").show();
        for (var i=0;i<3;i++) $("table#monster-data.wikitable td#stats_"+i).text(arrstats[i]);
        $("table#monster-data.wikitable td#stats_3").text(Maxfull);
    });
}
else $('#All_Max_Bouns').hide();
});

$('#q-mark').click(function() {
	$('#center-box').show();
});
$('#closewindows').click(function() {
	$('#center-box').hide();
});
if (typeof skillLvCalc=="function") skillLvCalc();
if (typeof skill2LvCalc=="function") skill2LvCalc();
function skillLvCalc(obj) {
	var skill_turn_min = parseInt($("#skill_lv_calc").data("slvmin"), 10);
	var skill_turn_max = parseInt($("#skill_lv_calc").data("slvmax"), 10);
	var skill_level_max = (skill_turn_min - skill_turn_max) + 1;
	var selected_level;
	if (obj === undefined) {
		selected_level=1;
		for (var i=2; i<skill_level_max+1; i++) {
			var blank=(i < 10)?"Lv. ":"Lv.";
			$("#skill_level").append($('<option></option>').val(i).text(blank + i));
		}
	} else {
	selected_level = $(obj).val();
	}
	var skilllv_cd = (selected_level == 1)?"\u521d\u59cbCD":skilllv_cd=(selected_level == skill_level_max)?"\u6700\u5c0fCD":"\u6280\u80fdCD";
	$("#skill_lv_cd_td").text(skilllv_cd);
	var current_skilllv;
	if (skill_level_max == 1) {
		current_skilllv = skill_turn_min;
	} else {
		current_skilllv = (skill_turn_min - selected_level) + 1;
	}
	$("#skill_lv_td").text(current_skilllv);
}
function skill2LvCalc(obj) {
	var skill2_turn_min = parseInt($("#skill2_lv_calc").data("slv2min"));
	var skill2_turn_max = parseInt($("#skill2_lv_calc").data("slv2max"));
	var skill2_level_max= (skill2_turn_min - skill2_turn_max) + 1;
	var selected_level2;
	if (obj === undefined) {
		selected_level2=1;
		for (var i=2; i<skill2_level_max+1; i++) {
			var blank2=(i < 10)?"Lv. ":"Lv.";
			$("#skill2_level").append($('<option></option>').val(i).text(blank2 + i));
		}
	} else {
	selected_level2 = $(obj).val();
	}
	var skill2lv_cd = (selected_level2 == 1)?"\u521d\u59cbCD":skill2lv_cd=(selected_level2 == skill2_level_max)?"\u6700\u5c0fCD":"\u6280\u80fdCD";
	$("#skill2_lv_cd_td").text(skill2lv_cd);
	var current_skilllv2;
	if (skill2_level_max == 1) {
		current_skilllv2 = skill2_turn_min;
	} else {
		current_skilllv2 = (skill2_turn_min - selected_level2) + 1;
	}
	$("#skill2_lv_td").text(current_skilllv2);
}

$('#center-box').css('background', '#000').css('max-width', '500px').css('max-height', '600px').css('background-size', 'cover').css('width', '100%').css('height', '100%').css('position', 'absolute').css('border-radius', '10px').css('z-index', '10').css('width', '400px').css('height', '500px').css('display', 'none').css('width', '400px').css('height', '500px').css('float', 'left');
$('#box-header').css('position', 'absolute').css('top', '0px').css('border-radius', '10px').css('width', '400px');
$('#text-title').css('position', 'absolute').css('top', '38px').css('left', 'calc(100% - 325px)');
$('#text-title-text').css('position', 'absolute').css('top', '14px').css('color', '#fff').css('font-size', '22px').css('left', 'calc(100px - 23px)').css('z-index', '11');
$('#info_message').css('position', 'absolute').css('width', 'calc(100% - 81px)').css('height', 'calc(100% - 123px)').css('overflow-y', 'auto').css('margin', '90px 0 33px 0').css('padding-left', '10%').css('padding-right', '10%').css('text-align', 'left').css('color', '#fff').css('font-size', '14px').css('z-index', '11');
$('#box-footer').css('position', 'absolute').css('bottom', '0px').css('border-radius', '10px').css('width', '400px');
$('#box-close').css('position', 'absolute').css('bottom', '5px').css('border-radius', '10px').css('left', '50%').css('margin-left', '-40px');
$('select').css('width', '45px').css('font-size', '9.5pt').css('padding', '1px 0px 1px 5px').css('margin', '0').css('-webkit-border-radius', '4px').css('-moz-border-radius', '4px').css('border-radius', '4px').css('-webkit-box-shadow', '0 3px 0 #ccc, 0 -1px #fff inset').css('-moz-box-shadow', '0 3px 0 #ccc, 0 -1px #fff inset').css('box-shadow', 'inset 1px 1px 2px #ddd8dc').css('background', '#f8f8f8').css('font-weight', 'bold').css('font-family', '"lucida grande",Tahoma,Verdana,Arial,sans-serif').css('border', 'none').css('outline', 'none').css('display', ' inline-block').css('-webkit-appearance', 'none').css('-moz-appearance', 'none').css('appearance', 'none').css('cursor', 'pointer').css('white-space', 'nowrap');