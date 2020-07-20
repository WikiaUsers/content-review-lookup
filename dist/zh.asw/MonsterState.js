function monsterStateLvCalc(obj) {
var level_max= parseInt($("#monster_data_for_state_calc").data("lvmax"));
var selected_level;
if (obj == undefined) {
selected_level=1;
for (var i=2; i<=level_max;i++) {
$("#monster_level").append($('<option></option>').val(i).text(i));
}
}else{
selected_level = $(obj).val();
}
var hp_min = parseInt($("#monster_data_for_state_calc").data("hpmin"));
var atk_min = parseInt($("#monster_data_for_state_calc").data("atkmin"));
var rec_min = parseInt($("#monster_data_for_state_calc").data("recmin"));
var hp_max = parseInt($("#monster_data_for_state_calc").data("hpmax"));
var atk_max = parseInt($("#monster_data_for_state_calc").data("atkmax"));
var rec_max = parseInt($("#monster_data_for_state_calc").data("recmax"));
var hp_scale = parseFloat($("#monster_data_for_state_calc").data("hpscale"));
var atk_scale = parseFloat($("#monster_data_for_state_calc").data("atkscale"));
var rec_scale = parseFloat($("#monster_data_for_state_calc").data("recscale"));
var worth = $("#monster_data_for_state_calc").data("worth");
var exp = $("#monster_data_for_state_calc").data("exp");
var current_hp;
var current_atk;
var current_rec;
var current_worth;
var current_exp;
if (level_max == 1) {
current_hp = hp_max;
current_atk = atk_max;
current_rec = rec_max;
current_worth = worth;
current_exp = exp;
}else{
current_hp = Math.round(hp_min+(hp_max-hp_min)*Math.pow((selected_level-1)/(level_max-1),hp_scale));
current_atk = Math.round(atk_min+(atk_max-atk_min)*Math.pow((selected_level-1)/(level_max-1),atk_scale));
current_rec = Math.round(rec_min+(rec_max-rec_min)*Math.pow((selected_level-1)/(level_max-1),rec_scale));
if (worth!="-") current_worth=Math.round(parseFloat(worth)*selected_level);
if (exp!="-") current_exp=Math.round(parseFloat(exp)*selected_level);
}
var current_weighted = Math.round((current_hp/10+current_atk/5+current_rec/3)*100)/100;
$("#monster_hp_td").text(current_hp);
$("#monster_atk_td").text(current_atk);
$("#monster_rec_td").text(current_rec);
$("#monster_worth_td").text(current_worth);
$("#monster_exp_td").text(current_exp);
$("#monster_weighted_td").text(current_weighted);
$(".selected_level").text(selected_level);
}

$("th.MonsterState").html('Lv <select id="monster_level" onchange="monsterStateLvCalc(this)"><option>1</option></select>');
if (typeof monsterStateLvCalc=="function") monsterStateLvCalc();