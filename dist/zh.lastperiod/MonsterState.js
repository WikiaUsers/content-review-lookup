function monsterStateLvCalc(obj) {
 var level_max= parseInt($("#monster_data_for_state_calc").data("lvmax"));
 var selected_level;
 if (obj === undefined) {
 selected_level=1;
 for (var i=2; i<=level_max;i++) {
 $("#monster_level").append($('<option></option>').val(i).text(i));
 }
 }else{
 selected_level = $(obj).val();
 }
var hp1 = $("#monster_data_for_state_calc").data("hpmin").replace(",", "");
var hp2 = $("#monster_data_for_state_calc").data("hpmax").replace(",", "");
var atk1 = $("#monster_data_for_state_calc").data("atkmin").replace(",", "");
var atk2 = $("#monster_data_for_state_calc").data("atkmax").replace(",", "");
var rare = parseInt($("#monster_data_for_state_calc").data("rare"));
var hp_min = parseInt(hp1);
var atk_min = parseInt(atk1);
var hp_max = parseInt(hp2);
var atk_max = parseInt(atk2);
var current_hp;
var current_atk;

if (level_max == 1) {
current_hp = hp_max;
current_atk = atk_max;
}else{
current_hp = Math.round(hp_min*(4/((2+rare)*10))*selected_level+hp_max);
current_atk = Math.round(atk_min*(4/((2+rare)*10))*selected_level+atk_max);
}
$("#monster_hp_td").text(current_hp);
$("#monster_atk_td").text(current_atk);
$(".selected_level").text(selected_level);
}

$("th.MonsterState").html('<select id="monster_level" onchange="monsterStateLvCalc(this)"><option>1</option></select><br>');
if (typeof monsterStateLvCalc=="function") monsterStateLvCalc();