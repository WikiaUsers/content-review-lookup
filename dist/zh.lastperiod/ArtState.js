function artStateLvCalc(obj) {
 var level_max= parseInt($("#art_data_for_state_calc").data("lvmax"));
 var selected_level;
 if (obj === undefined) {
 selected_level=1;
 for (var i=2; i<=level_max;i++) {
 $("#art_level").append($('<option></option>').val(i).text(i));
 }
 }else{
 selected_level = $(obj).val();
 }
var hp1 = $("#art_data_for_state_calc").data("hpmin").replace(",", "");
var hp2 = $("#art_data_for_state_calc").data("hpmax").replace(",", "");
var atk1 = $("#art_data_for_state_calc").data("atkmin").replace(",", "");
var atk2 = $("#art_data_for_state_calc").data("atkmax").replace(",", "");
var rare = parseInt($("#art_data_for_state_calc").data("rare"));
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
current_hp = Math.round(hp_min*(1/((2+rare)*10))*selected_level+hp_max);
current_atk = Math.round(atk_min*(1/((2+rare)*10))*selected_level+atk_max);
}
$("#art_hp_td").text(current_hp);
$("#art_atk_td").text(current_atk);
$(".selected_level").text(selected_level);
}
 
$("th.ArtState").html('<select id="art_level" onchange="artStateLvCalc(this)"><option>1</option></select><br>');
if (typeof artStateLvCalc=="function") artStateLvCalc();