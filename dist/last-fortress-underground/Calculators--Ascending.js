var hero_base_rarity={
'Uncommon (Green)':[0],
'Rare (Blue)':[1],
'Elite/Advanced Elite (Purple)':[2],
'First-Gen (Orange)':[3]
};

var ascend_qualities={
'Uncommon (Green)':[0],
'Rare (Blue)':[1],
'Elite (Purple)':[2],
'Epic (Orange)':[3],
'Master (Red)':[4],
'Legendary (Gold color)':[5],
'Legendary 1-Star':[6],
'Legendary 2-Star':[7],
'Legendary 3-Star':[8],
'Myth (Rainbow color)':[9],
'Myth 1-Star':[10],
'Myth 2-Star':[11],
'Myth 3-Star':[12]
};
                      
var ascend_type = {
		'Solari Hero':[0],
		'Combat Hero':[1],
		'Wreakers/Lawbringers':[2],
		'Spacetime Travelers':[3]
		};
		
var solari_recipe=[
[0,0,0],
[2,0,1],
[2,1,1],
[1,2,1],
[1,3,1],
[1,4,1],
[1,5,0],
[1,5,0],
[1,5,0],
[1,5,0],
[1,5,0],
[1,5,0],
[1,5,0]
];

var combat_recipe=[
[0,0,0],
[2,0,1],
[2,1,0],
[1,2,1],
[2,3,0],
[1,3,1],
[2,5,0],
[1,3,1],
[1,3,1],
[2,3,1],
[2,5,0],
[2,3,1],
[2,3,1]
];

var first_gen_recipe=[
[0,0,0],
[0,0,0],
[0,0,0],
[0,0,0],
[1,3,1],
[1,3,1],
[2,3,1],
[2,3,1],
[2,3,1],
[2,3,1],
[2,3,1],
[2,3,1],
[2,3,1]
];

var spacetime_travelers_recipe=[
[0,0,0],
[0,0,0],
[0,0,0],
[1,2,1],
[2,2,0],
[2,2,1],
[2,2,0],
[2,2,1],
[2,2,1],
[2,2,1],
[4,2,0],
[2,2,1],
[2,2,1]
];

/*Get Info Calc*/
$(function() {
	
	do_ascend = function(){
	    var x;
	    var ascend_start='',ascend_end='',rarity='',type='';
	    for (x in ascend_qualities){
	        if (ascend_qualities.hasOwnProperty(x)){
	            ascend_start += '<option value="' + x + '">' + x + '</option>';	
	            ascend_end += '<option value="' + x + '">' + x + '</option>';	
	        }
	    }  
	    for (x in hero_base_rarity){
	        if (hero_base_rarity.hasOwnProperty(x)){
	            rarity += '<option value="' + x + '">' + x + '</option>';	
	        }
	    } 
	    for (x in ascend_type){
	        if (ascend_type.hasOwnProperty(x)){
	            type += '<option value="' + x + '">' + x + '</option>';	
	        }
	    }  

	    $('#calculator_ascending').html(
	    	//t1
	        '<table class="fandom-table">' + 
	        '<tr>' +
	        '<td>Hero Faction:</td>' +
	        '<td><select id="type">' + type + '</select></td>' +
	        '</tr><tr>' +
	        '<td>Hero Base Rarity:</td>' +
	        '<td><select id="rarity">' + rarity + '</select></td>' +
	        '</tr><tr>' +
	        '<td>Starting ascending quality:</td>' +
	        '<td><select id="ascend_start">' + ascend_start + '</select></td>' +
	        '</tr><tr>' + 
	        '<td>Desired ascending quality:</td>' +
	        '<td><select id="ascend_end">' + ascend_end + '</select></td>' +
	        '</tr><tr>' + 
	        '</table>'+
	        
			//t2
	        '<table class="fandom-table">' + 
	        '<tr>' +
	        '<th colspan="7">Amount of Hero shards you need to ascend the Hero to selected quality</th>' +
	        '<th>Equivalent Sum: </th>'+
		'</tr><tr>' +
	        '<th>Ascending Ingredients</th>'+
	        '<th>Uncommon (Green): </th>'+
	        '<th>Rare (Blue): </th>'+
	        '<th>Elite (Purple): </th>'+
	        '<th>Epic (Orange): </th>'+
	        '<th>Master (Red): </th>'+
	        '<th>Legendary (Gold): </th>'+
	        '<th><span id="equivalent"></span></th>'+
		'</tr><tr>' +
	        '<th>Other Heroes, same Faction: </th>'+
	        '<td><span id="calc_uncommon"></span></td>'+
	        '<td><span id="calc_rare"></span></td>'+
	        '<td><span id="calc_elite"></span></td>'+
	        '<td><span id="calc_epic"></span></td>'+
	        '<td><span id="calc_master"></span></td>'+
	        '<td><span id="calc_legendary"></span></td>'+
	        '<td><span id="calc_total"></span></td>'+
		'</tr><tr>' +
	        '<th>Same exact Hero: </th>'+
	        '<td><span id="calc_uncommon_s"></span></td>'+
	        '<td><span id="calc_rare_s"></span></td>'+
	        '<td><span id="calc_elite_s"></span></td>'+
	        '<td><span id="calc_epic_s"></span></td>'+
	        '<td><span id="calc_master_s"></span></td>'+
	        '<td><span id="calc_legendary_s"></span></td>'+
	        '<td><span id="calc_total_s"></span></td>'+
	        '</tr>' +
	        '</table>'
	    ); 
	
	    update_ascend = function() {
	        
	        var rarit = hero_base_rarity[$('#rarity').val()][0];   
	        var ascend_e = ascend_qualities[$('#ascend_end').val()][0];   
	        var ascend_s = ascend_qualities[$('#ascend_start').val()][0];   
	        var typ = ascend_type[$('#type').val()][0]; 
            var recipe;
            
            if(typ===2){  
	            recipe = first_gen_recipe;   
            }
            if(typ===1){  
	            recipe = combat_recipe;   
            }
            if(typ===0){  
	            recipe = solari_recipe;   
            }
            if(typ===3){  
	            recipe = spacetime_travelers_recipe;   
            }

			//now do some recursive/loop stuff to get total amount of shards
			
			var range = recipe.slice(ascend_s +1, ascend_e + 1);
			var shards=[0,0,0,0,0,0,0];
			var shards_specific=[0,0,0,0,0,0,0];
			
			for (var x = 0; x < range.length; x++){
				//[0,1,2] = N count,0-5 quality,bool specific
				if(range[x][2]===0){
					shards[range[x][1]]+=range[x][0];
				}
				if(range[x][2]===1){
					shards_specific[range[x][1]]+=range[x][0];
				}
			}
			
			var range_total = recipe;//.slice(0, ascend_e + 1);
			len=13;
			var total_shards = Array(len).fill(0);
			var total_shards_specific = Array(len).fill(0);
			var first=0;
			for (var i = 0; i < ascend_e+1; i++) {
				
				//cumulative sum of previous recipes
				if(first===1){
					if(range_total[i][2]===0){
						total_shards[i]=total_shards[i-1]+(Math.max(total_shards[range_total[i][1]]+total_shards_specific[range_total[i][1]],1))*range_total[i][0];
						total_shards_specific[i]=total_shards_specific[i-1];
					}
					if(range_total[i][2]===1){
						total_shards[i]=total_shards[i-1]+total_shards[range_total[i][1]]*range_total[i][0];
						total_shards_specific[i]=total_shards_specific[i-1]+Math.max(total_shards_specific[range_total[i][1]],1)*range_total[i][0];
					}
				}
					
				//check if we consider green, blue, purple or orange shards as base
				if(first===0){
					if(range_total[i][1]===rarit){
						first=1;
						if(range_total[i][2]===0){
							total_shards[i]=range_total[i][0];
							total_shards_specific[i]=1;
						}
						if(range_total[i][2]===1){
							total_shards[i]=0;
							total_shards_specific[i]=1+range_total[i][0];
						}
					}
				}
			}
			
			//text modifier
	        var equivalent = 'Rare Shards (Blue)';
	        if(rarit===3){
	        	equivalent='Epic Shards (Orange)';
	        }
	        if(rarit===2){
	        	equivalent='Elite Shards (Purple)';
	        }
	        if(rarit===0){
	        	equivalent='Uncommon Shards (Green)';
	        }
	        
			$('#calc_uncommon').html(shards[0]);
			$('#calc_rare').html(shards[1]);
			$('#calc_elite').html(shards[2]);
			$('#calc_epic').html(shards[3]);
			$('#calc_master').html(shards[4]);
			$('#calc_legendary').html(shards[5]);
			$('#calc_uncommon_s').html(shards_specific[0]);
			$('#calc_rare_s').html(shards_specific[1]);
			$('#calc_elite_s').html(shards_specific[2]);
			$('#calc_epic_s').html(shards_specific[3]);
			$('#calc_master_s').html(shards_specific[4]);
			$('#calc_legendary_s').html(shards_specific[5]);
			$('#calc_total').html(total_shards[ascend_e]-total_shards[ascend_s]);
			$('#calc_total_s').html(total_shards_specific[ascend_e]-total_shards_specific[ascend_s]);
			$('#equivalent').html(equivalent);
			
			//debug
			//$('#calc_uncommon').html(total_shards_specific[ascend_s]);
			//$('#calc_uncommon_s').html(total_shards_specific[ascend_e]);

        };
	
    $('#rarity,#ascend_start,#ascend_end,#type').change(update_ascend);

    $('#rarity').children().get(1).selected = true;
    $('#ascend_start').children().get(1).selected = true;
    $('#ascend_end').children().get(5).selected = true;
    $('#type').children().get(1).selected = true;
    
    update_ascend();
	};
	
	do_ascend();
}());