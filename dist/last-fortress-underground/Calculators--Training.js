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

var points_per_zombie_lvl = {
'4':[15],
'5':[20],
'6':[22],
'7':[26],
'8':[32],
'9':[60],
'10':[100],
'11':[125],
'12':[160],
'13':[200],
'14':[230],
'15':[260],
'16':[320],
'17':[380],
'18':[450],
'19':[480],
'20':[520],
'21':[540],
'22':[580],
'23':[640],
'24':[740],
'25':[800],
'26':[820],
'27':[840],
'28':[860],
'29':[880],
'30':[900]
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
    var value_I='',value_II='',value_III='',card='',incentive_t='',incentive_z='',ppt_='',ppz_='';
    var i=0;
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
            incentive_z += '<option value="' + x + '">' + x + '</option>';	
        }
    }
    for (x in points_per_training_lvl){
        if (points_per_training_lvl.hasOwnProperty(x)){
            ppt_ += '<option value="' + x + '">' + x + '</option>';	
        }
    }    
       for (x in points_per_zombie_lvl){
        if (points_per_zombie_lvl.hasOwnProperty(x)){
            ppz_ += '<option value="' + x + '">' + x + '</option>';	

        }
    }  
      
    $('#calculator_training').html(
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
        '<td style="width:30%">Incentive: Zombies:</td><td style="width:20%"><select id="incentive_zombies">' + incentive_z + '</select></td>' +
        '</tr><tr>' + 
        '<td>Trained Soldier lvl:</td>' +
        '<td><select id="points_per_training_lvl">' + ppt_ + '</select></td>' +
        '</tr><tr>' + 
        '<td>Killed Zombie lvl:</td>' +
        '<td><select id="points_per_zombie_lvl">' + ppz_ + '</select></td>' +
        '</tr><tr>' + 
        '<td style="width:30%"># Soldiers Trained:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="soldiers_trained" value="0" /></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td style="width:30%"># Zombies Slain:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="zombies_slain" value="0" /></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td style="width:30%">Initial Points:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="initial_points" value="0" /></td>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td>Total Training Modifier: </td><td><span id="total_modifier_t"></span></td>'+
        '</tr>' +
        '</tr><tr><td></td></tr><tr>'+
        '<td>Total Zombie Modifier: </td><td><span id="total_modifier_z"></span></td>'+
        '</tr>' +
        '<td>Total Points: </td><td><span id="total_points"></span></td>'+
        '</tr>' +
        '</table>'+
        
    //t2
        '<table class="wikitable">' + 
        '<tr>' +
        '<th style="width:40%">Chest Points: </th>'+
        '<th style="width:30%">Zombies to Kill: </th>'+
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
        var iz = incentive_[$('#incentive_zombies').val()][0];   
        var ppt = points_per_training_lvl[$('#points_per_training_lvl').val()][0];   
        var ppz = points_per_zombie_lvl[$('#points_per_zombie_lvl').val()][0];  
        var ip = parseInt($('#initial_points').val());  
        var zombies = parseInt($('#zombies_slain').val());
        var training = parseInt($('#soldiers_trained').val());

        var total_modifier_z = (100+vp1+vp2+vp3+boost+iz)/100;
        var total_modifier_t = (100+vp1+vp2+vp3+boost+it)/100;
        var tp = ip+zombies*total_modifier_z*ppz+training*total_modifier_t*ppt;

        var chests_z= chests.map(x => Math.ceil(Math.max(x-tp,0)/(ppz*total_modifier_z)));
        var chests_t= chests.map(x => Math.ceil(Math.max(x-tp,0)/(ppt*total_modifier_t)));
        
        $('#total_modifier_z').html(Math.floor(total_modifier_z*100)+'%');
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
 
    $('#initial_points,#soldiers_trained,#zombies_slain').keyup(update_recruit);
      $('#value_points_I,#value_points_II,#value_points_III,#booster_card,#incentive_training,#incentive_zombies,#points_per_zombie_lvl,#points_per_training_lvl').change(update_recruit);

    $('#value_points_I').children().get(-1).selected = true;
    $('#value_points_II').children().get(-1).selected = true;
    $('#value_points_III').children().get(-1).selected = true;
    $('#booster_card').children().get(-2).selected = true;
    $('#incentive_training').children().get(-1).selected = true;
    $('#incentive_zombies').children().get(-1).selected = true;
    $('#points_per_zombie_lvl').children().get(-1).selected = true;
    $('#points_per_training_lvl').children().get(-2).selected = true;

    update_recruit();

};
do_recruit1();
}());