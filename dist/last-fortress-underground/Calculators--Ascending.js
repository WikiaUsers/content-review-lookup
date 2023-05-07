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
		'First-Gen Hero':[2]
		};
		
var solari_recipe={
'Uncommon (Green)':[0,0,0],
'Rare (Blue)':[2,0,1],
'Elite (Purple)':[2,1,1],
'Epic (Orange)':[1,2,1],
'Master (Red)':[1,3,1],
'Legendary (Gold color)':[1,4,1],
'Legendary 1-Star':[1,5,0],
'Legendary 2-Star':[1,5,0],
'Legendary 3-Star':[1,5,0],
'Myth (Rainbow color)':[1,5,0],
'Myth 1-Star':[1,5,0],
'Myth 2-Star':[1,5,0],
'Myth 3-Star':[1,5,0]
};

var combat_recipe={
'Uncommon (Green)':[0,0,0],
'Rare (Blue)':[2,0,1],
'Elite (Purple)':[2,1,0],
'Epic (Orange)':[1,2,1],
'Master (Red)':[2,3,0],
'Legendary (Gold color)':[1,3,1],
'Legendary 1-Star':[2,5,0],
'Legendary 2-Star':[1,3,1],
'Legendary 3-Star':[1,3,1],
'Myth (Rainbow color)':[2,3,1],
'Myth 1-Star':[2,5,0],
'Myth 2-Star':[2,3,1],
'Myth 3-Star':[2,3,1]
};

var first_gen_recipe={
'Epic (Orange)':[0,0,0],
'Master (Red)':[1,3,1],
'Legendary (Gold color)':[1,3,1],
'Legendary 1-Star':[2,3,1],
'Legendary 2-Star':[2,3,1],
'Legendary 3-Star':[2,3,1],
'Myth (Rainbow color)':[2,3,1],
'Myth 1-Star':[2,3,1],
'Myth 2-Star':[2,3,1],
'Myth 3-Star':[2,3,1]
};

/*Get Info Calc*/
$(function() {
	
	do_ascend = function(){
	    var x;
	    var ascend_start='',ascend_end='',rarity='',type='';
	    for (x in ascend_qualities){
	        if (ascend_qualities.hasOwnProperty(x)){
	            ascend_start += '<option value="' + x + '">' + x + '</option>';	
	            ascend_end += '<option value="' + x + '">' + x + '</option>';	
	        };
	    };    
	    for (x in hero_base_rarity){
	        if (hero_base_rarity.hasOwnProperty(x)){
	            rarity += '<option value="' + x + '">' + x + '</option>';	
	        };
	    };   
	    for (x in ascend_type){
	        if (ascend_type.hasOwnProperty(x)){
	            type += '<option value="' + x + '">' + x + '</option>';	
	        };
	    };     

	    $('#calculator_ascending').html(
	    	//t1
	        '<table>' + 
	        '<tr>' +
	        '<td>Solari/Combat/First-Gen:</td>' +
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
	        '<table>' + 
	        '<tr>' +
	        '<th>How many Hero shards you need to ascend to selected quality</td>' +
		'</tr><tr>' +
	        '<th>Uncommon (Green): </th>'+
	        '<th>Rare (Blue): </th>'+
	        '<th>Elite (Purple): </th>'+
	        '<th>Epic (Orange): </th>'+
	        '<th>Master (Red): </th>'+
	        '<th>Legendary (Gold): </th>'+
		'</tr><tr>' +
	        '<td>Uncommon (Green): </td>'+
	        '<td>Rare (Blue): </td>'+
	        '<td>Elite (Purple): </td>'+
	        '<td>Epic (Orange): </td>'+
	        '<td>Master (Red): </td>'+
	        '<td>Legendary (Gold): </td>'+
	        '</tr>' +
	        '</table>'
	    ); 
	
	    update_ascend = function() {
	        
	        var rarit = hero_base_rarity[$('#rarity').val()][0];   
	        var ascend_e = ascend_qualities[$('#ascend_end').val()][0];   
	        var ascend_s = ascend_qualities[$('#ascend_start').val()][0];   
	        var typ = ascend_type[$('#type').val()][0]; 
                var recipe = 0;
                if(typ===2){  
	            recipe = first_gen_recipe;   
                };
                if(typ===1){  
	            recipe = combat_recipe;   
                };
                if(typ===0){  
	            recipe = solari_recipe;   
                };
	     
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