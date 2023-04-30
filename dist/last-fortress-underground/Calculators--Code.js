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

var incentive_recruitment = {
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

var one_more_reward_I = {
		'True':[1],
		'False':[0]
		};
		
var one_more_reward_II = {
		'True':[1],
		'False':[0]
		};
		
var one_more_reward_III = {
		'True':[1],
		'False':[0]
		};
		
var booster_card = {
		'0%':[0],
		'50%':[50],
		'100%':[100],
		'200%':[200]
		};

var points_per_recruit = {
		'4000':[4000],
		'6800':[6800]
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
	    var x,y,z,a,b,d;
	    var value_I='',value_II='',value_III='',reward_I='',reward_II='',reward_III='',card='',incentive='',ppr_='';
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
	    /*for (x in one_more_reward_I){
            if (one_more_reward_I.hasOwnProperty(x)){
                reward_I += '<option value="' + x + '">' + x + '</option>';	
            }
        }   
        for (x in one_more_reward_II){
            if (one_more_reward_II.hasOwnProperty(x)){
                reward_II += '<option value="' + x + '">' + x + '</option>';	
            }
        }    
        for (x in one_more_reward_III){
            if (one_more_reward_III.hasOwnProperty(x)){
                reward_III += '<option value="' + x + '">' + x + '</option>';	
            }
        }   */
	    for (x in booster_card){
	        if (booster_card.hasOwnProperty(x)){
	            card += '<option value="' + x + '">' + x + '</option>';	
	        }
	    }    
	    for (x in incentive_recruitment){
	        if (incentive_recruitment.hasOwnProperty(x)){
	            incentive += '<option value="' + x + '">' + x + '</option>';	
	        }
	    }
   	    for (x in points_per_recruit){
	        if (points_per_recruit.hasOwnProperty(x)){
	            ppr_ += '<option value="' + x + '">' + x + '</option>';	
	        }
	    }    
		$('points_per_recruit').last().val();
		
	    $('#calculator_recruitment').html(
	    	//t1
	        '<table>' + 
	        '<tr>' +
	        '<td style="width:30%">Value Points I:</td>' +
	        '<td style="width:20%"><select id="value_points_I">' + value_I + '</select></td>' +
	        /*'<td style="width:30%">One More Reward I:</td>' +
			'<td style="width:20%"><select id="one_more_reward_I">' + reward_I + '</select></td>' +*/
	        '</tr><tr>' +
	        '<td>Value Points II:</td>' +
	        '<td><select id="value_points_II">' + value_II + '</select></td>' +
	        /*'<td>One More Reward II:</td><td style="width:20%"><select id="one_more_reward_II">' + reward_II + '</select></td>' +*/
	        '</tr><tr>' + 
	        '<td>Value Points III:</td>' +
	        '<td><select id="value_points_III">' + value_III + '</select></td>' +
	        /*'<td>One More Reward III:</td><td style="width:20%"><select id="one_more_reward_III">' + reward_III + '</select></td>' +*/
	        '</tr><tr>' + 
	        '<td>Booster Card:</td>' +
	        '<td><select id="booster_card">' + card + '</select></td>' +
	        '</tr><tr>' + 
	        '<td style="width:30%">Incentive: Recruitment:</td><td style="width:20%"><select id="incentive_recruitment">' + incentive + '</select></td>' +
	        '</tr><tr>' + 
	        '<td>Points per Recruit:</td>' +
	        '<td><select id="points_per_recruit">' + ppr_ + '</select></td>' +
	        '</tr><tr>' + 
	        '<td style="width:30%">Initial Points:</td><td style="width:20%"><input type="text" size="8" maxlength="8" id="initial_points" value="0" /></td>' +
	        '</tr><tr><td></td></tr><tr>'+
	        '<td>Total Modifier: </td><td><span id="calc_modifier"></span></td>'+
	        '</tr>' +
	        '</table>'+
	        
			//t2
	        '<table class="wikitable">' + 
	        '<tr>' +
	        '<th style="width:40%">Chest Points: </th>'+
	        '<th style="width:30%">Total Recruits: </th>'+
	        '<th style="width:30%">Blue Tokens: </th>'+
	        '</tr>' +
	        '<td>'+chests[0]+'<td><span id="calc_c1r"></span></td><td><span id="calc_c1t"></span></td>'+
	        '</tr>' +
	        '<td>'+chests[1]+'<td><span id="calc_c2r"></span></td><td><span id="calc_c2t"></span></td>'+
	        '</tr>' +
	        '<td>'+chests[2]+'<td><span id="calc_c3r"></span></td><td><span id="calc_c3t"></span></td>'+
	        '</tr>' +
	        '<td>'+chests[3]+'<td><span id="calc_c4r"></span></td><td><span id="calc_c4t"></span></td>'+
	        '</tr>' +
	        '<td>'+chests[4]+'<td><span id="calc_c5r"></span></td><td><span id="calc_c5t"></span></td>'+
	        '</tr>' +
	        '<td>'+chests[5]+'<td><span id="calc_c6r"></span></td><td><span id="calc_c6t"></span></td>'+
	        '</tr>' +
	        '<td>'+chests[6]+'<td><span id="calc_c7r"></span></td><td><span id="calc_c7t"></span></td>'+
	        '</tr>' +
	        '<td>'+chests[7]+'<td><span id="calc_c8r"></span></td><td><span id="calc_c8t"></span></td>'+
	        '</tr>' +
	        '<td>'+chests[8]+'<td><span id="calc_c9r"></span></td><td><span id="calc_c9t"></span></td>'+
	        '</table>'
	    ); 
	
	    update_recruit = function() {
	        var recruit = parseInt($('#calc_recruit').val());            
	        var vp1 = value_points_I[$('#value_points_I').val()][0];              
	        var vp2 = value_points_II[$('#value_points_II').val()][0];              
	        var vp3 = value_points_III[$('#value_points_III').val()][0];   
	        /*var omr1 = one_more_reward_I[$('#one_more_reward_I').val()][0];              
	        var omr2 = one_more_reward_II[$('#one_more_reward_II').val()][0];              
	        var omr3 = one_more_reward_III[$('#one_more_reward_III').val()][0];*/ 
	        var boost = booster_card[$('#booster_card').val()][0];              
	        var incentive = incentive_recruitment[$('#incentive_recruitment').val()][0];   
	        var ppr = points_per_recruit[$('#points_per_recruit').val()][0];   
	        var ip = parseInt($('#initial_points').val());  
	        var total_modifier = 100+vp1+vp2+vp3+boost+incentive;

			var c1r = Math.ceil(Math.max(chests[0]-ip,0)/(ppr*total_modifier/100));
	        var c1t = (c1r%10)*100+Math.floor(c1r/10)*900;
			var c2r = Math.ceil(Math.max(chests[1]-ip,0)/(ppr*total_modifier/100));
	        var c2t = (c2r%10)*100+Math.floor(c2r/10)*900;
			var c3r = Math.ceil(Math.max(chests[2]-ip,0)/(ppr*total_modifier/100));
	        var c3t = (c3r%10)*100+Math.floor(c3r/10)*900;
			var c4r = Math.ceil(Math.max(chests[3]-ip,0)/(ppr*total_modifier/100));
	        var c4t = (c4r%10)*100+Math.floor(c4r/10)*900;
			var c5r = Math.ceil(Math.max(chests[4]-ip,0)/(ppr*total_modifier/100));
	        var c5t = (c5r%10)*100+Math.floor(c5r/10)*900;
			var c6r = Math.ceil(Math.max(chests[5]-ip,0)/(ppr*total_modifier/100));
	        var c6t = (c6r%10)*100+Math.floor(c6r/10)*900;
			var c7r = Math.ceil(Math.max(chests[6]-ip,0)/(ppr*total_modifier/100));
	        var c7t = (c7r%10)*100+Math.floor(c7r/10)*900;
			var c8r = Math.ceil(Math.max(chests[7]-ip,0)/(ppr*total_modifier/100));
	        var c8t = (c8r%10)*100+Math.floor(c8r/10)*900;
	        var c9r = Math.ceil(Math.max(chests[8]-ip,0)/(ppr*total_modifier/100));
	        var c9t = (c9r%10)*100+Math.floor(c9r/10)*900;

	        /*
	        if(!omr1){
	        	//placeholder for adding rewards to calculator
	        };*/
	        
	        $('#calc_modifier').html(total_modifier);
	        $('#calc_c1r').html(c1r);
	        $('#calc_c1t').html(c1t);
	        $('#calc_c2r').html(c2r);
	        $('#calc_c2t').html(c2t);
	        $('#calc_c3r').html(c3r);
	        $('#calc_c3t').html(c3t);
	        $('#calc_c4r').html(c4r);
	        $('#calc_c4t').html(c4t);
	        $('#calc_c5r').html(c5r);
	        $('#calc_c5t').html(c5t);
	        $('#calc_c6r').html(c6r);
	        $('#calc_c6t').html(c6t);
	        $('#calc_c7r').html(c7r);
	        $('#calc_c7t').html(c7t);
	        $('#calc_c8r').html(c8r);
	        $('#calc_c8t').html(c8t);
	        $('#calc_c9r').html(c9r);
	        $('#calc_c9t').html(c9t);
		};
	 
	    $('#initial_points').keyup(update_recruit);
	    $('#value_points_I,#value_points_II,#value_points_III,#booster_card,#incentive_recruitment,#points_per_recruit').change(update_recruit);
	    update_recruit();
	
	};
	do_recruit1();
}());