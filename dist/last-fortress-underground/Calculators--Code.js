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

	
var booster_card = {
		'0%':[0],
		'50%':[50],
		'100%':[100],
		'200%':[200]
		};

var points_per_recruit = {
		'Combat Hero Recruitment Points':[4000],
		'Faction Recruitment Cards':[6800]
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
	    var value_I='',value_II='',value_III='',card='',incentive='',ppr_='';
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
	        '<td style="width:30%">Incentive: Recruitment:</td><td style="width:20%"><select id="incentive_recruitment">' + incentive + '</select></td>' +
	        '</tr><tr>' + 
	        '<td>Recruitment Method:</td>' +
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
	        '<th>Chest Points: </th>'+
	        '<th>Total Recruits: </th>'+
	        '<th><span id="tokens"></span></th>'+
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
	        var boost = booster_card[$('#booster_card').val()][0];              
	        var incentive = incentive_recruitment[$('#incentive_recruitment').val()][0];   
	        var ppr = points_per_recruit[$('#points_per_recruit').val()][0];   
	        var ip = parseInt($('#initial_points').val());  
	        var total_modifier = 100+vp1+vp2+vp3+boost+incentive;

                var chests_r= chests.map(x => Math.ceil(Math.max(x-ip,0)/(ppr*total_modifier/100)));
                var chests_t= chests_r.map(x => (x%10)*100+Math.floor(x/10)*900);

	        var tokens = "Blue Tokens:"
                if(ppr >4000){
                    tokens = "Faction Recruitment Cards:"
                    chests_t= chests_r;
                };

	        $('#calc_modifier').html(total_modifier);

        $('#calc_c1t').html(chests_t[0]);
        $('#calc_c2t').html(chests_t[1]);
        $('#calc_c3t').html(chests_t[2]);
        $('#calc_c4t').html(chests_t[3]);
        $('#calc_c5t').html(chests_t[4]);
        $('#calc_c6t').html(chests_t[5]);
        $('#calc_c7t').html(chests_t[6]);
        $('#calc_c8t').html(chests_t[7]);
        $('#calc_c9t').html(chests_t[8]);

        $('#calc_c1r').html(chests_r[0]);
        $('#calc_c2r').html(chests_r[1]);
        $('#calc_c3r').html(chests_r[2]);
        $('#calc_c4r').html(chests_r[3]);
        $('#calc_c5r').html(chests_r[4]);
        $('#calc_c6r').html(chests_r[5]);
        $('#calc_c7r').html(chests_r[6]);
        $('#calc_c8r').html(chests_r[7]);
        $('#calc_c9r').html(chests_r[8]);

	        $('#tokens').html(tokens);
		};
	 
	    $('#initial_points').keyup(update_recruit);
	    $('#value_points_I,#value_points_II,#value_points_III,#booster_card,#incentive_recruitment,#points_per_recruit').change(update_recruit);

    $('#value_points_I').children().get(-1).selected = true;
    $('#value_points_II').children().get(-1).selected = true;
    $('#value_points_III').children().get(-1).selected = true;
    $('#booster_card').children().get(-2).selected = true;
    $('#incentive_recruitment').children().get(-1).selected = true;

	    update_recruit();
	
	};
	do_recruit1();
}());