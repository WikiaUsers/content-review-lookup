var value_points_I = {
  '0%':[0],
      '10%':[10],
      '20%':[20],
      '30%':[30],
      '40%':[40],
      '50%':[50]
      };
  
var value_points_II = {
  '0%':[0],
      '10%':[10],
      '20%':[20],
      '30%':[30],
      '40%':[40],
      '50%':[50],
  '60%':[60],
  '70%':[70],
  '80%':[80],
  '90%':[90],
  '100%':[100]
      };

var value_points_III = {
  '0%':[0],
      '15%':[15],
      '30%':[30],
      '45%':[45],
      '60%':[60],
      '75%':[75],
  '90%':[90],
  '105%':[105],
  '120%':[120],
  '135%':[135],
  '150%':[150]
      };	

var incentive_ = {
  '0%':[0],
      '15%':[15],
      '30%':[30],
      '45%':[45],
      '60%':[60],
      '75%':[75],
  '90%':[90],
  '105%':[105],
  '120%':[120],
  '135%':[135],
  '150%':[150]
      };	

var booster_card = {
  '0%':[0],
  '50%':[50],
  '100%':[100],
  '200%':[200]
  };

var points_per_training_lvl = {
'1':[20],
'2':[80],
'3':[150],
'4':[250],
'5':[300],
'6':[500],
'7':[750],
'8':[1200],
'9':[1800],
'10':[5000]
};

var points_per_wounded_lvl = {
'1':[0],
'2':[0],
'3':[0],
'4':[1],
'5':[2],
'6':[3],
'7':[4],
'8':[5],
'9':[6],
'10':[18]
};


var points_per_grievous_lvl = {
'1':[3],
'2':[6],
'3':[9],
'4':[12],
'5':[18],
'6':[27],
'7':[36],
'8':[45],
'9':[60],
'10':[180]
};

var points_per_kill_lvl = {
'1':[6],
'2':[12],
'3':[18],
'4':[24],
'5':[36],
'6':[54],
'7':[72],
'8':[90],
'9':[120],
'10':[360]
};

var points_per_kia_lvl = {
'1':[6],
'2':[12],
'3':[18],
'4':[24],
'5':[36],
'6':[54],
'7':[72],
'8':[90],
'9':[120],
'10':[360]
};

var troops_lvl = {
'1':[1],
'2':[2],
'3':[3],
'4':[4],
'5':[5],
'6':[6],
'7':[7],
'8':[8],
'9':[9],
'10':[10]
};

var chests = [
	20000,
	100000,
	320000,
	600000,
	1000000,
	2000000,
	2400000,
	3000000,
	4000000
	];

/*Get Info Calc*/
$(function() {

do_recruit1 = function(){

    var x;
    var value_I='',value_II='',value_III='',card='',incentive_t='',incentive_k='',ppl_='';
    for (x in value_points_I){
        if (value_points_I.hasOwnProperty(x)){
            value_I += '<option value="' + x + '">' + x + '</option>';	  
        }
    }    
    for (x in value_points_II){
        if (value_points_II.hasOwnProperty(x)){
            value_II += '<option value="' + x + '">' + x + '</option>';	
        }
    }    
    for (x in value_points_III){
        if (value_points_III.hasOwnProperty(x)){
            value_III += '<option value="' + x + '">' + x + '</option>';	
        }
    }    
    for (x in booster_card){
        if (booster_card.hasOwnProperty(x)){
            card += '<option value="' + x + '">' + x + '</option>';	
        }
    }    
    for (x in incentive_){
        if (incentive_.hasOwnProperty(x)){
            incentive_t += '<option value="' + x + '">' + x + '</option>';	
            incentive_k += '<option value="' + x + '">' + x + '</option>';	
        }
    }
    for (x in troops_lvl) {
        ppl_ += '<option value="' + x + '">' + x + '</option>';	
    }

    $('#calculator_elimination').html(
      //t1
        '<table>' + 
        '<tr>' +
        '<td style="width:30%">Value Points I:</td>' +
        '<td style="width:20%"><select id="value_points_I">' + value_I + '</select></td>' +
        '</tr><tr>' +
        '<td>Value Points II:</td>' +
        '<td><select id="value_points_II">' + value_II + '</select></td>' +
        '</tr><tr>' + 
        '<td>Value Points III:</td>' +
        '<td><select id="value_points_III">' + value_III + '</select></td>' +
        '</tr><tr>' + 
        '<td>Booster Card:</td>' +
        '<td><select id="booster_card">' + card + '</select></td>' +
        '</tr><tr>' + 
        '<td style="width:30%">Incentive: Training:</td><td style="width:20%"><select id="incentive_training" value="166">' + incentive_t + '</select></td>' +
        '</tr><tr>' + 
        '<td style="width:30%">Incentive: Killing:</td><td style="width:20%"><select id="incentive_killing">' + incentive_k + '</select></td>' +
        '</tr><tr>' + 
        '<td>Own troops lvl:</td>' +
        '<td><select id="own_troops_lvl">' + ppl_ + '</select></td>' +
        '</tr><tr>' + 
        '<td>Enemy Troops lvl:</td>' +
        '<td><select id="enemy_troops_lvl">' + ppl_ + '</select></td>' +
        '</tr><tr>' + 
        '<td style="width:30%"># Soldiers Trained:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="soldiers_trained" value="0" /></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td style="width:30%"># Enemy Lightly Wounded:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="enemy_wounded" value="0" /></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td style="width:30%"># Enemy Grievous Wounded:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="enemy_grievous" value="0" /></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td style="width:30%"># Enemy Troops KIA:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="enemy_kia" value="0" /></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td style="width:30%"># Own Troops KIA:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="own_kia" value="0" /></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td style="width:30%">Initial Points:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="initial_points" value="0" /></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td style="width:30%">Attacking Alliance Duel Opponent? :</td><td style="width:20%"><input type="checkbox" id="fighting_opponent"></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td>Total Training Modifier: </td><td><span id="total_modifier_t"></span></td>'+
        '</tr>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td>Total Killing Modifier: </td><td><span id="total_modifier_k"></span></td>'+
        '</tr>' +
        '<td>Total Points: </td><td><span id="total_points"></span></td>'+
        '</tr>' +
        '</table>'+
        
    //t2
        '<table class="wikitable">' + 
        '<tr>' +
        '<th style="width:40%">Chest Points: </th>'+
        '<th style="width:30%">Soldiers to grievously Wound: </th>'+
        '<th style="width:30%">Soldiers to Train: </th>'+

        '</tr>' +
        '<td>'+chests[0]+'<td><span id="calc_c1z"></span></td><td><span id="calc_c1t"></span></td>'+
        '</tr>' +
        '<td>'+chests[1]+'<td><span id="calc_c2z"></span></td><td><span id="calc_c2t"></span></td>'+
        '</tr>' +
        '<td>'+chests[2]+'<td><span id="calc_c3z"></span></td><td><span id="calc_c3t"></span></td>'+
        '</tr>' +
        '<td>'+chests[3]+'<td><span id="calc_c4z"></span></td><td><span id="calc_c4t"></span></td>'+
        '</tr>' +
        '<td>'+chests[4]+'<td><span id="calc_c5z"></span></td><td><span id="calc_c5t"></span></td>'+
        '</tr>' +
        '<td>'+chests[5]+'<td><span id="calc_c6z"></span></td><td><span id="calc_c6t"></span></td>'+
        '</tr>' +
        '<td>'+chests[6]+'<td><span id="calc_c7z"></span></td><td><span id="calc_c7t"></span></td>'+
        '</tr>' +
        '<td>'+chests[7]+'<td><span id="calc_c8z"></span></td><td><span id="calc_c8t"></span></td>'+
        '</tr>' +
        '<td>'+chests[8]+'<td><span id="calc_c9z"></span></td><td><span id="calc_c9t"></span></td>'+
        '</table>'
    ); 

    update_recruit = function() { 

        var vp1 = value_points_I[$('#value_points_I').val()][0];              
        var vp2 = value_points_II[$('#value_points_II').val()][0];              
        var vp3 = value_points_III[$('#value_points_III').val()][0];   

        var boost = booster_card[$('#booster_card').val()][0];              
        var it = incentive_[$('#incentive_training').val()][0];   
        var ik = incentive_[$('#incentive_killing').val()][0];
   
        var ppt = points_per_training_lvl[$('#own_troops_lvl').val()][0];   
        var ppk = points_per_kill_lvl[$('#enemy_troops_lvl').val()][0];  
        var ppw = points_per_wounded_lvl[$('#enemy_troops_lvl').val()][0];  
        var ppg = points_per_grievous_lvl[$('#enemy_troops_lvl').val()][0]; 
        var ppkia = points_per_kia_lvl[$('#own_troops_lvl').val()][0]; 
 
        var ip = parseInt($('#initial_points').val());  
        var killing = parseInt($('#enemy_kia').val());
        var wounded = parseInt($('#enemy_wounded').val());
        var grievous = parseInt($('#enemy_grievous').val());
        var kia = parseInt($('#own_kia').val());
        var training = parseInt($('#soldiers_trained').val());

        var opponent = 1;
        if ($('#fighting_opponent').is(":checked")){
            opponent = 5;
        };

        var total_modifier_k = (100+vp1+vp2+vp3+boost+ik)/100;
        var total_modifier_t = (100+vp1+vp2+vp3+boost+it)/100;
        var total_modifier_kia = (100+vp1+vp2+vp3+boost)/100;


        var tp = ip+ total_modifier_k*opponent*(ppk*killing+ppw*wounded+ppg*grievous)+ppkia*kia*total_modifier_kia+training*total_modifier_t*ppt;

        var chests_z= chests.map(x => Math.ceil(Math.max(x-tp,0)/(ppg*total_modifier_k*opponent)));
        var chests_t= chests.map(x => Math.ceil(Math.max(x-tp,0)/(ppt*total_modifier_t)));
        
        $('#total_modifier_k').html(Math.floor(total_modifier_k*100)+'%');
        $('#total_modifier_t').html(Math.floor(total_modifier_t*100)+'%');
        $('#total_points').html(tp);

        $('#calc_c1t').html(chests_t[0]);
        $('#calc_c2t').html(chests_t[1]);
        $('#calc_c3t').html(chests_t[2]);
        $('#calc_c4t').html(chests_t[3]);
        $('#calc_c5t').html(chests_t[4]);
        $('#calc_c6t').html(chests_t[5]);
        $('#calc_c7t').html(chests_t[6]);
        $('#calc_c8t').html(chests_t[7]);
        $('#calc_c9t').html(chests_t[8]);

        $('#calc_c1z').html(chests_z[0]);
        $('#calc_c2z').html(chests_z[1]);
        $('#calc_c3z').html(chests_z[2]);
        $('#calc_c4z').html(chests_z[3]);
        $('#calc_c5z').html(chests_z[4]);
        $('#calc_c6z').html(chests_z[5]);
        $('#calc_c7z').html(chests_z[6]);
        $('#calc_c8z').html(chests_z[7]);
        $('#calc_c9z').html(chests_z[8]);

  };
 
    $('#initial_points,#soldiers_trained,#zombies_slain,#enemy_wounded,#enemy_kia,#enemy_grievous,#own_kia').keyup(update_recruit);
      $('#value_points_I,#value_points_II,#value_points_III,#booster_card,#incentive_training,#incentive_killing,#own_troops_lvl,#enemy_troops_lvl,#fighting_opponent').change(update_recruit);

    $('#value_points_I').children().get(-1).selected = true;
    $('#value_points_II').children().get(-1).selected = true;
    $('#value_points_III').children().get(-1).selected = true;
    $('#booster_card').children().get(-2).selected = true;
    $('#incentive_training').children().get(-1).selected = true;
    $('#incentive_killing').children().get(-1).selected = true;
    $('#own_troops_lvl').children().get(-2).selected = true;
    $('#enemy_troops_lvl').children().get(-2).selected = true;

    update_recruit();

};
do_recruit1();
}());