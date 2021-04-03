var monstersUns= {}
var monsters ={}

var element = {
  'All':[0],
  'Fire':[1],
  'Nature':[2],
  'Earth':[3],
  'Thunder':[4],
  'Water':[5],
  'Dark':[6],
  'Magic':[7],
  'Light':[8],
  'Metal':[9]};
var books ={
  'All':[0],
  'Dragon':[1],
  'Spirits':[2],
  'Winged':[3],
  'Sea':[4],
  'Underworld':[5],
  'Mechanical':[6],
  'Female':[7],
  'Undead':[8],
  'Winter':[9],
  'Good Legions':[10],
  'Evil Legions':[11],
  'Superheroes':[12],
  'Families':[13],
  'Team Wars':[14],
  'Exclusive':[15],
  'Adventurers':[16],
  'Villains':[17],
  'Elite':[18],
  'Race':[19],
  'Quest':[20],
  'Cosmic Era':[21]
  };
  
var rarity = {
	'All':[0],
  'Common':[1],
  'Uncommon':[2],
  'Rare':[3],
  'Epic':[4],
  'Legendary':[5],
  'Mythic':[6]
};

var rarity_speed = {
  'Common':[1],
  'Uncommon':[1.1],
  'Rare':[1.2],
  'Epic':[1.3],
  'Legendary':[1.4],
  'Mythic':[1.6,1.65,1.7,1.75,1.8,1.9]
};

var rarity_damage = {
  'Common':[1],
  'Uncommon':[1.1],
  'Rare':[1.2],
  'Epic':[1.3],
  'Legendary':[1.4],
  'Mythic':[1.6,1.8,2,2.1,2.3,2.6]
};

var ownspeedrune = {
        'None':[0],
        'Speed I':[0.04],
        'Speed II':[0.08],
        'Speed III':[0.12],
        'Speed IV':[0.16],
        'Speed V':[0.20],
        'Speed VI':[0.24],
        'Speed VII':[0.28],
        'Speed VIII':[0.31],
        'Speed IX':[0.34],
        'Speed X':[0.35],
        'Team Speed I':[0.03],
        'Team Speed II':[0.04],
        'Team Speed III':[0.05],
        'Team Speed IV':[0.06],
        'Team Speed V':[0.07],
        'Team Speed VI':[0.08],
        'Team Speed VII':[0.09],
        'Team Speed VIII':[0.10],
        'Team Speed IX':[0.11],
        'Team Speed X':[0.12]
        };
var allyspeedrune = {
				'None':[0],
        'Team Speed I':[0.03],
        'Team Speed II':[0.04],
        'Team Speed III':[0.05],
        'Team Speed IV':[0.06],
        'Team Speed V':[0.07],
        'Team Speed VI':[0.08],
        'Team Speed VII':[0.09],
        'Team Speed VIII':[0.10],
        'Team Speed IX':[0.11],
        'Team Speed X':[0.12]
};
var ownstrrune = {
        'None':[0],
        'Strength I':[0.06],
        'Strength II':[0.12],
        'Strength III':[0.24],
        'Strength IV':[0.36],
        'Strength V':[0.48],
        'Strength VI':[0.66],
        'Strength VII':[0.78],
        'Strength VIII':[0.88],
        'Strength IX':[0.96],
        'Strength X':[1.02],
        'Team Strength I':[0.04],
        'Team Strength II':[0.07],
        'Team Strength III':[0.10],
        'Team Strength IV':[0.13],
        'Team Strength V':[0.16],
        'Team Strength VI':[0.19],
        'Team Strength VII':[0.22],
        'Team Strength VIII':[0.25],
        'Team Strength IX':[0.27],
        'Team Strength X':[0.28]
        };
var allystrrune = {
        'None':[0],
        'Team Strength I':[0.04],
        'Team Strength II':[0.07],
        'Team Strength III':[0.10],
        'Team Strength IV':[0.13],
        'Team Strength V':[0.16],
        'Team Strength VI':[0.19],
        'Team Strength VII':[0.22],
        'Team Strength VIII':[0.25],
        'Team Strength IX':[0.27],
        'Team Strength X':[0.28]
        };
var runeguard = {
        'None':[0],
        '1 Star (5%)':[0.05],
        '2 Star (7%)':[0.07],
        '3 Star (10%)':[0.1]
};

/*Get Info Calc*/
(function() {
	function get_info(){
  	get_monster_data(function(results){
    	sort_monster_data(function(results2){
      	    do_speed1();
      	    do_speed2();
      	    do_damage();
        });	
    });
  }
  function get_monster_data(callback){
  	$.getJSON('/api.php?action=parse&page=Calculators/monsterdata&format=json', function(data) {
      var fullString = data["parse"]["text"]["*"];
      fullString = fullString.replace('<div class="mw-parser-output"><p>','');
      fullString = fullString.split("</p>")[0];
      var fullArr = fullString.split("<br />");
      for (var monNum in fullArr){
        var monster = fullArr[monNum].split("|");
        monstersUns = Object.assign(monstersUns,{[monster[0]]: [monster[1],monster[2],monster[3],monster[4],monster[5],monster[6]]});
      }
  		callback();
  	});
  }
  
  function sort_monster_data(callback){
			Object.keys(monstersUns).sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase())).forEach(function(key) {
 				monsters[key] = monstersUns[key];
			}); 
      callback();
  }
  
  get_info();

    do_speed1 = function(){
        var x,y,z,a,b,d;
    var ownrune='',allyrune='',guardo='',eleo='',booko='',ranko='',mono='';
    var filterelement='All',filterbook='All';
        for (x in ownspeedrune){
            if (ownspeedrune.hasOwnProperty(x)){
                ownrune += '<option value="' + x + '">' + x + '</option>';	
            }
        }    
        for (y in allyspeedrune){
            if (allyspeedrune.hasOwnProperty(y)){
                allyrune += '<option value="' + y + '">' + y + '</option>';	
            }
        }
        for (z in runeguard){
            if (runeguard.hasOwnProperty(z)){
                guardo += '<option value="' + z + '">' + z + '</option>';	
            }
        }
        for (a in element){
            if (element.hasOwnProperty(a)){
                eleo += '<option value="' + a + '">' + a + '</option>';	
            }
        }
        for (b in books){
            if (books.hasOwnProperty(b)){
                booko += '<option value="' + b + '">' + b + '</option>';	
            }
        }
 
        for (d in monsters){
            if (monsters.hasOwnProperty(d)){
                mono += '<option value="' + d.replace(new RegExp('"', "g"), '&quot;') + '">' + d.replace(new RegExp("_", "g"), ' ') + '</option>';
            }
        }
 
        $('#calculator_speed').html(
            '<table class="calculator-table">' + 
            '<tr>' +
            '<td style="width:20%">Element:</td>' +
            '<td style="width:40%"><select id="element_spd">' + eleo + '</select></td>' +
            '<td style="width:15%">Own Rune 1: </td><td style="width:25%"><select id="speed_rune1">' + ownrune + '</select></td>' +
            '</tr><tr>' +
            '<td>Book:</td>' + 
            '<td><select id="book_spd">' + booko + '</select></td>' + 
            '<td>Own Rune 2: </td><td><select id="speed_rune2">' + ownrune + '</select></td>' +
            '</tr><tr>' + 
            '<td>Monster:</td>' + 
            '<td><select id="monster_spd">' + mono + '</select></td>' + 
            '<td>Own Rune 3: </td><td><select id="speed_rune3">' + ownrune + '</select></td>' + 
            '</tr><tr><td> </td></tr><tr>' + 
            '<td>Level:</td>' + 
            '<td><input type="number" size="8" maxlength="3" max="150" id="rank_spd" value="100" /></td>' + 
            '<td>Ally 1 Rune 1: </td><td><select id="speed_rune4">' + allyrune + '</select></td>' + 
            '</tr><tr>' +  
            '<td>Speed: </td>' + 
            '<td><input type="text" size="8" maxlength="5" id="calc_speed" value="4840" /></td>' + 
            '<td>Ally 1 Rune 2: </td><td><select id="speed_rune5">' + allyrune + '</select></td>' +
            '</tr><tr>' +
            '<td>Rune Guardian: </td>' + 
            '<td><select id="runeguard_spd">' + guardo + '</select></td>' + 
            '<td>Ally 1 Rune 3: </td><td><select id="speed_rune6">' + allyrune + '</select></td>' +
            '</tr><tr><td></td></tr><tr>' +
            '<td>Base Speed: </td><td><span id="calc_speedbase"></span></td><td>Ally 2 Rune 1: </td><td><select id="speed_rune7">' + allyrune + '</select></td>' +
            '</tr><tr>' +
            '<td>Rune Bonus: </td><td><span id="calc_speedrune"></span></td><td>Ally 2 Rune 2: </td><td><select id="speed_rune8">' + allyrune + '</select></td>' +
            '</tr><tr>' +
            '<td><font size="5"><b>Total Speed: </b></font></td><td><font size="5"><b><span id="calc_speedfinal"></span></b></font></td><td>Ally 2 Rune 3: </td><td><select id="speed_rune9">' + allyrune + '</select></td>' +
            '</tr>' +
            '</table>'
        ); 
 
        update_speed = function() {
            var speed = parseInt($('#calc_speed').val());            
            var rune1 = ownspeedrune[$('#speed_rune1').val()][0];               
            var rune2 = ownspeedrune[$('#speed_rune2').val()][0];   
            var rune3 = ownspeedrune[$('#speed_rune3').val()][0];   
            var rune4 = ownspeedrune[$('#speed_rune4').val()][0];              
            var rune5 = ownspeedrune[$('#speed_rune5').val()][0];              
            var rune6 = ownspeedrune[$('#speed_rune6').val()][0];              
            var rune7 = ownspeedrune[$('#speed_rune7').val()][0];              
            var rune8 = ownspeedrune[$('#speed_rune8').val()][0];              
            var rune9 = ownspeedrune[$('#speed_rune9').val()][0];
            var guardval = 1 + runeguard[$('#runeguard_spd').val()][0]; 
            var rune_speed = 1 + ((rune1 + rune2 + rune3 + rune4 + rune5 + rune6 + rune7 + rune8 + rune9)*guardval);
            var total_speed = Math.ceil(speed * rune_speed);
            $('#calc_speedbase').html(
                speed
            );
            $('#calc_speedrune').html(
                rune_speed.toFixed(2)
            );
            $('#calc_speedfinal').html(
                total_speed
            );
        };
 
        update_spd_filter = function(){
            var iter;
            var filler = '';
            filterelement = $('#element_spd').val();
            filterbook=$('#book_spd').val();
            for (iter in monsters){ 
                if (filterelement == "All" && filterbook == "All"){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (filterbook == "All" && monsters[iter][0].includes(filterelement)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (filterelement == "All" && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (monsters[iter][0].includes(filterelement) && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
          }
 
            $(filler).html(filler);
            $('#monster_spd option').remove();
            $('#monster_spd').append(filler);
            push_spd_value();
        };
 
        push_spd_value = function(){
            var monster_speed = monsters[$('#monster_spd').val()][5];
            var monster_rar = monsters[$('#monster_spd').val()][1];
            var rar_mult = 0;
            if (monster_rar == "Mythic"){
                if (parseInt($('#rank_spd').val()) < 100){
                    rar_mult = rarity_speed['Mythic'][0];
                }
                else if (parseInt($('#rank_spd').val()) > 150){
                    rar_mult = rarity_speed['Mythic'][5];
                }
                else {
                    rar_mult = rarity_speed['Mythic'][Math.floor(parseInt($('#rank_spd').val()) /10) - 10];
                }
            }
            else {
                rar_mult = rarity_speed[monster_rar];
            }
            var mult_spd = Math.round(monster_speed * rar_mult); 
            var spd_adjust = Math.floor(mult_spd + (mult_spd * (0.1 * parseInt($('#rank_spd').val()))));
            $('#calc_speed').val(spd_adjust);
            update_speed();
        }
 
        $('#calc_speed').keyup(update_speed);
        $('#speed_rune1,#speed_rune2,#speed_rune3,#speed_rune4,#speed_rune5,#speed_rune6,#speed_rune7,#speed_rune8,#speed_rune9,#runeguard_spd').change(update_speed);
        $('#element_spd,#book_spd').change(update_spd_filter);
           $('#monster_spd,#rank_spd').change(push_spd_value);
        update_speed();
    }
    
    do_speed2 = function(){
        var x,y,z,a,b,d
  var ownrune='',allyrune='',guardo='',eleo='',booko='',ranko='',mono=''
        var filterelement='All',filterbook='All';
 
        for (x in ownspeedrune){
            if (ownspeedrune.hasOwnProperty(x)){
                ownrune += '<option value="' + x + '">' + x + '</option>';	
            }
        }    
        for (y in allyspeedrune){
            if (allyspeedrune.hasOwnProperty(y)){
                allyrune += '<option value="' + y + '">' + y + '</option>';	
            }
        }
        for (z in runeguard){
            if (runeguard.hasOwnProperty(z)){
                guardo += '<option value="' + z + '">' + z + '</option>';	
            }
        }
        for (a in element){
            if (element.hasOwnProperty(a)){
                eleo += '<option value="' + a + '">' + a + '</option>';	
            }
        }
        for (b in books){
            if (books.hasOwnProperty(b)){
                booko += '<option value="' + b + '">' + b + '</option>';	
            }
        }
 
        for (d in monsters){
            if (monsters.hasOwnProperty(d)){
                mono += '<option value="' + d.replace(new RegExp('"', "g"), '&quot;') + '">' + d.replace(new RegExp("_", "g"), ' ') + '</option>';
            }
        }
 
        $('#calculator_speed2').html(
            '<table class="calculator-table">' + 
            '<tr>' +
            '<td style="width:20%">Element:</td>' +
            '<td style="width:40%"><select id="element_spd2">' + eleo + '</select></td>' +
            '<td style="width:15%">Own Rune 1: </td><td style="width:25%"><select id="speed_rune12">' + ownrune + '</select></td>' +
            '</tr><tr>' +
            '<td>Book:</td>' + 
            '<td><select id="book_spd2">' + booko + '</select></td>' + 
            '<td>Own Rune 2: </td><td><select id="speed_rune22">' + ownrune + '</select></td>' +
            '</tr><tr>' + 
            '<td>Monster:</td>' + 
            '<td><select id="monster_spd2">' + mono + '</select></td>' + 
            '<td>Own Rune 3: </td><td><select id="speed_rune32">' + ownrune + '</select></td>' + 
            '</tr><tr><td> </td></tr><tr>' + 
            '<td>Level:</td>' + 
            '<td><input type="number" size="8" maxlength="3" max="150" id="rank_spd2" value="100" /></td>' + 
            '<td>Ally 1 Rune 1: </td><td><select id="speed_rune42">' + allyrune + '</select></td>' + 
            '</tr><tr>' +  
            '<td>Speed: </td>' + 
            '<td><input type="text" size="8" maxlength="5" id="calc_speed2" value="4840" /></td>' + 
            '<td>Ally 1 Rune 2: </td><td><select id="speed_rune52">' + allyrune + '</select></td>' +
            '</tr><tr>' +
            '<td>Rune Guardian: </td>' + 
            '<td><select id="runeguard_spd2">' + guardo + '</select></td>' + 
            '<td>Ally 1 Rune 3: </td><td><select id="speed_rune62">' + allyrune + '</select></td>' +
            '</tr><tr><td></td></tr><tr>' +
            '<td>Base Speed: </td><td><span id="calc_speedbase2"></span></td><td>Ally 2 Rune 1: </td><td><select id="speed_rune72">' + allyrune + '</select></td>' +
            '</tr><tr>' +
            '<td>Rune Bonus: </td><td><span id="calc_speedrune2"></span></td><td>Ally 2 Rune 2: </td><td><select id="speed_rune82">' + allyrune + '</select></td>' +
            '</tr><tr>' +
            '<td><font size="5"><b>Total Speed: </b></font></td><td><font size="5"><b><span id="calc_speedfinal2"></span></b></font></td><td>Ally 2 Rune 3: </td><td><select id="speed_rune92">' + allyrune + '</select></td>' +
            '</tr>' +
            '</table>'
        ); 
 
        update_speed2 = function() {
            var speed = parseInt($('#calc_speed2').val());            
            var rune1 = ownspeedrune[$('#speed_rune12').val()][0];               
            var rune2 = ownspeedrune[$('#speed_rune22').val()][0];   
            var rune3 = ownspeedrune[$('#speed_rune32').val()][0];   
            var rune4 = ownspeedrune[$('#speed_rune42').val()][0];              
            var rune5 = ownspeedrune[$('#speed_rune52').val()][0];              
            var rune6 = ownspeedrune[$('#speed_rune62').val()][0];              
            var rune7 = ownspeedrune[$('#speed_rune72').val()][0];              
            var rune8 = ownspeedrune[$('#speed_rune82').val()][0];              
            var rune9 = ownspeedrune[$('#speed_rune92').val()][0];
            var guardval = 1 + runeguard[$('#runeguard_spd2').val()][0]; 
            var rune_speed = 1 + ((rune1 + rune2 + rune3 + rune4 + rune5 + rune6 + rune7 + rune8 + rune9)*guardval);
            var total_speed = Math.floor(speed * rune_speed);
            $('#calc_speedbase2').html(
                speed
            );
            $('#calc_speedrune2').html(
                rune_speed.toFixed(2)
            );
            $('#calc_speedfinal2').html(
                total_speed
            );
        };
 
        update_spd_filter2 = function(){
            var iter;
            var filler = '';
            filterelement = $('#element_spd2').val();
            filterbook=$('#book_spd2').val();
            for (iter in monsters){ 
                if (filterelement == "All" && filterbook == "All"){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (filterbook == "All" && monsters[iter][0].includes(filterelement)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (filterelement == "All" && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (monsters[iter][0].includes(filterelement) && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
          }
 
            $(filler).html(filler);
            $('#monster_spd2 option').remove();
            $('#monster_spd2').append(filler);
            push_spd_value2();
        };
 
        push_spd_value2 = function(){
            var monster_speed = monsters[$('#monster_spd2').val()][5];
            var monster_rar = monsters[$('#monster_spd2').val()][1];
            var rar_mult = 0;
            if (monster_rar == "Mythic"){
                if (parseInt($('#rank_spd2').val()) < 100){
                    rar_mult = rarity_speed['Mythic'][0];
                }
                else if (parseInt($('#rank_spd2').val()) > 150){
                    rar_mult = rarity_speed['Mythic'][5];
                }
                else {
                    rar_mult = rarity_speed['Mythic'][Math.floor(parseInt($('#rank_spd2').val()) /10) - 10];
                }
            }
            else {
                rar_mult = rarity_speed[monster_rar];
            }
            var mult_spd = Math.round(monster_speed * rar_mult); 
            var spd_adjust = Math.floor(mult_spd + (mult_spd * (0.1 * parseInt($('#rank_spd2').val()))));
            
            $('#calc_speed2').val(spd_adjust);
            update_speed2();
        }
 
        $('#calc_speed2').keyup(update_speed2);
        $('#speed_rune12,#speed_rune22,#speed_rune32,#speed_rune42,#speed_rune52,#speed_rune62,#speed_rune72,#speed_rune82,#speed_rune92,#runeguard_spd2').change(update_speed2);
        $('#element_spd2,#book_spd2').change(update_spd_filter2);
           $('#monster_spd2,#rank_spd2').change(push_spd_value2);
        update_speed2();
    }
    
    
	do_damage = function(){
	    var x,tmp='',y, tmp2='',z,tmp3='',a,b,d,tmpa='',tmpb='',tmpc='',tmpd='',otherboost = 1;
 
		var filterelement='All',filterbook='All';
 
        for (x in ownstrrune){
            if (ownstrrune.hasOwnProperty(x)){
                tmp += '<option value="' + x + '">' + x + '</option>';	
            }
        }    
        for (y in allystrrune){
            if (allystrrune.hasOwnProperty(y)){
                tmp2 += '<option value="' + y + '">' + y + '</option>';	
            }
        }
        for (z in runeguard){
            if (runeguard.hasOwnProperty(z)){
                tmp3 += '<option value="' + z + '">' + z + '</option>';	
            }
        }
        for (a in element){
            if (element.hasOwnProperty(a)){
                tmpa += '<option value="' + a + '">' + a + '</option>';	
            }
        }
        for (b in books){
            if (books.hasOwnProperty(b)){
                tmpb += '<option value="' + b + '">' + b + '</option>';	
            }
        }
        
        for (d in monsters){
            if (monsters.hasOwnProperty(d)){
                tmpd += '<option value="' + d.replace(new RegExp('"', "g"), '&quot;') + '">' + d.replace(new RegExp("_", "g"), ' ') + '</option>';
            }
        }
 
        $('#calculator_damage').html(
            '<table class="calculator-dam-table">' + 
            '<tr>' +
            '<td style="width:20%">Element:</td>' +
            '<td style="width:40%"><select id="element_dam">' + tmpa + '</select></td>' +
            '<td style="width:15%">Own Rune 1: </td><td style="width:25%"><select id="dam_rune1">' + tmp + '</select></td>' +
            '</tr><tr>' +
            '<td>Book:</td>' + 
            '<td><select id="book_dam">' + tmpb + '</select></td>' + 
            '<td>Own Rune 2: </td><td><select id="dam_rune2">' + tmp + '</select></td>' +
            '</tr><tr>' + 
            '<td>Monster:</td>' + 
            '<td><select id="monster_dam">' + tmpd + '</select></td>' + 
            '<td>Own Rune 3: </td><td><select id="dam_rune3">' + tmp + '</select></td>' +
            '</tr><tr><td> </td></tr><tr>' + 
            '<td>Level:</td>' + 
            '<td><input type="number" size="8" maxlength="3" max="150" id="rank_dam" value="100" /></td>' + 
            '<td>Ally 1 Rune 1: </td><td><select id="dam_rune4">' + tmp2 + '</select></td>' + 
            '</tr><tr>' +  
            '<td>Monster Power: </td>' + 
            '<td><input type="text" size="8" maxlength="5" id="calc_power" value="5280" /></td>' + 
            '<td>Ally 1 Rune 2: </td><td><select id="dam_rune5">' + tmp2 + '</select></td>' +
            '</tr><tr>' +
            '<td>Move Power: </td>' + 
            '<td><input type="text" size="8" maxlength="3" id="move_power" value="40" /></td>' + 
            '<td>Ally 1 Rune 3: </td><td><select id="dam_rune6">' + tmp2 + '</select></td>' +
            
            '</tr><tr><td></td></tr><tr>' +
            '<td>Opponent Level: </td><td><input type="text" size="8" maxlength="3" id="opp_level" value="100" /></td><td>Ally 2 Rune 1: </td><td><select id="dam_rune7">' + tmp2 + '</select></td>' +
            '</tr><tr>' +
            '<td>Rune Guardian: </td><td><select id="runeguard_dam">' + tmp3 + '</select></td><td>Ally 2 Rune 2: </td><td><select id="dam_rune8">' + tmp2 + '</select></td>' +
            '</tr><tr>'+
            '<td>Relic Boost: </td><td><input type="text" size="8" maxlength="5" id="relic_boost" value="0" /></td><td>Ally 2 Rune 3: </td><td><select id="dam_rune9">' + tmp2 + '</select></td>' +
            
            '</tr></table>'+
            '<table class= "dam-boost-table"><tr>' +        
            '<td style="width:30%">Elemental Advantage: </td><td style="width:5%"><input type="checkbox" id="ele_adv"></td>'+
            '<td style="width:30%">Daze: </td><td style="width:5%"><input type="checkbox" id="daze_dam"></td>' +      
            '<td style="width:25%">Book/Element Hater 1: </td><td td style="width:5%"><input type="checkbox" id="dam_hater1"></td>'+
            '</tr><tr>' + 
            '<td>Elemental Disadvantage: </td><td><input type="checkbox" id="ele_dis"></td>'+
            '<td>Bleed: </td><td><input type="checkbox" id="bleed_dam"></td>'+
            '<td style="width:25%">Book/Element Hater 2: </td><td td style="width:5%"><input type="checkbox" id="dam_hater2"></td>'+
            '</tr><tr>' + 
            '<td>Damage Boost: </td><td><input type="checkbox" id="dam_boost"></td>'+
            '<td>Poison: </td><td><input type="checkbox" id="pois_dam"></td>'+
            '<td style="width:25%">Book/Element Hater 3: </td><td td style="width:5%"><input type="checkbox" id="dam_hater3"></td>'+
            '</tr><tr>' + 
            '<td>Double Damage: </td><td><input type="checkbox" id="double_dam"></td>'+
            '<td>Damage Reduction: </td><td><input type="checkbox" id="dam_red"></tr>' +
            '</tr><tr>' + 
            '<td>Triple Damage: </td><td><input type="checkbox" id="triple_dam"></td>'+
            '<td>Major Damage Reduction: </td><td><input type="checkbox" id="majdam_red"></tr>' +
            '</tr><tr>' + 
             "<td>Elemental Weakness (1.8x): </td><td><input type='checkbox' id='ele_weakstr'></td>"+
             '<td>Back in Time: </td><td><input type="checkbox" id="back_time"></tr>' +
            '</tr><tr>' + 
             "<td>Elemental Weakness (1.5x): </td><td><input type='checkbox' id='ele_weakweak'></td>"+
              '<td>Cursed Totem: </td><td><input type="checkbox" id="curse_tot">' +
             '</tr>' +
            '</table>' +
            '<br /><table style="width:400px;text-align:center"><tr><td style="width:50%">Attack Power: </td><td width:50%><span id="out_attack"></span></td></tr>'+
            '<tr><td>Multiplier: </td><td><span id="out_multi"></span>x</td></tr>' +
            '<tr><td><b><font size="5">Final Damage: </font></b></td><td><b><font size="5"><span id="out_finaldam"></span></font></b></td></tr></table><br/>'
        ); 
 
        update_damage = function() {
            var monpower = parseInt($('#calc_power').val());  
            var movepower = parseInt($('#move_power').val());               
            var ownlevel = parseInt($('#rank_dam').val()); 
            var opplevel = parseInt($('#opp_level').val()); 
            var relicboost = parseInt($('#relic_boost').val());
            var rune1 = ownstrrune[$('#dam_rune1').val()][0];               
            var rune2 = ownstrrune[$('#dam_rune2').val()][0];   
            var rune3 = ownstrrune[$('#dam_rune3').val()][0];   
            var rune4 = ownstrrune[$('#dam_rune4').val()][0];              
            var rune5 = ownstrrune[$('#dam_rune5').val()][0];              
            var rune6 = ownstrrune[$('#dam_rune6').val()][0];              
            var rune7 = ownstrrune[$('#dam_rune7').val()][0];              
            var rune8 = ownstrrune[$('#dam_rune8').val()][0];              
            var rune9 = ownstrrune[$('#dam_rune9').val()][0];
            var guardval = 1 + runeguard[$('#runeguard_dam').val()][0]; 
            var rune_power = 1 + ((rune1 + rune2 + rune3 + rune4 + rune5 + rune6 + rune7 + rune8 + rune9)*guardval);
            var att_power = Math.floor((monpower * rune_power) + relicboost);
            var attmove_power = Math.floor(att_power * (movepower/50))
            var scale_power = Math.floor(attmove_power * ((Math.ceil((ownlevel+1)/5)*5)/50))
            var leveldiff = ownlevel - opplevel
            if (leveldiff < 0){leveldiff = 0;}
            var scaleopp_power = Math.floor(scale_power* ((leveldiff/50)+1))
            var final_damage = Math.floor(scaleopp_power * otherboost);
            $('#out_attack').html(scaleopp_power.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $('#out_multi').html(otherboost.toFixed(2));
            $('#out_finaldam').html(final_damage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        };
        update_dam_filter = function(){
            var iter;
            var filler = '';
            filterelement = $('#element_dam').val();
            filterbook=$('#book_dam').val();
            for (iter in monsters){ 
                if (filterelement == "All" && filterbook == "All"){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (filterbook == "All" && monsters[iter][0].includes(filterelement)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (filterelement == "All" && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
                else if (monsters[iter][0].includes(filterelement) && monsters[iter][2].includes(filterbook)){
                    filler += '<option class="' + iter + '" value="' + iter + '">' + iter.replace(new RegExp("_", "g"), ' ') + '</option>';
                }
          }
          
            $(filler).html(filler);
            $('#monster_dam option').remove();
            $('#monster_dam').append(filler);
            push_dam_value();
        };
        
        push_dam_value = function(){
            
            var monster_dam = monsters[$('#monster_dam').val()][4];
            var monster_rar = monsters[$('#monster_spd2').val()][1];
            var rar_mult = 0;
            if (monster_rar == "Mythic"){
                if (parseInt($('#rank_dam').val()) < 100){
                    rar_mult = rarity_damage['Mythic'][0];
                }
                else if (parseInt($('#rank_dam').val()) > 150){
                    rar_mult = rarity_damage['Mythic'][5];
                }
                else {
                    rar_mult = rarity_damage['Mythic'][Math.floor(parseInt($('#rank_dam').val()) /10) - 10];
                }
            }
            else {
                rar_mult = rarity_damage[monster_rar];
            }
            var mult_dam = Math.round(monster_dam * rar_mult); 
            var dam_adjust = Math.floor(mult_dam + (mult_dam * (0.1 * parseInt($('#rank_dam').val()))));
            
            $('#calc_power').val(dam_adjust);
            update_damage();
        }
        
        total_other_boost = function(){
        		otherboost = 1;
            if ($('#ele_adv').is(":checked")){otherboost = otherboost * 1.5;}
            if ($('#ele_dis').is(":checked")){otherboost = otherboost * 0.5;}
            if ($('#ele_weakstr').is(":checked")){otherboost = otherboost * 1.8;}
            if ($('#ele_weakweak').is(":checked")){otherboost = otherboost * 1.5;}
        		if ($('#dam_boost').is(":checked")){otherboost = otherboost * 1.5;}
            if ($('#double_dam').is(":checked")){otherboost = otherboost * 2;}        
            if ($('#triple_dam').is(":checked")){otherboost = otherboost * 3;}
            if ($('#bleed_dam').is(":checked")){otherboost = otherboost * 0.8;}
            if ($('#pois_dam').is(":checked")){otherboost = otherboost * 0.8;}
            if ($('#daze_dam').is(":checked")){otherboost = otherboost * 0.75;}
            if ($('#dam_red').is(":checked")){otherboost = otherboost * 0.75;}
            if ($('#majdam_red').is(":checked")){otherboost = otherboost * 0.5;}
            if ($('#back_time').is(":checked")){otherboost = otherboost * 0.6;}
            if ($('#curse_tot').is(":checked")){otherboost = otherboost * 0.75;}
            if ($('#dam_hater1').is(":checked")){otherboost = otherboost * 3;}
            if ($('#dam_hater2').is(":checked")){otherboost = otherboost * 3;}
            if ($('#dam_hater3').is(":checked")){otherboost = otherboost * 3;}
           
        	update_damage();
        }
        
 
        $('#calc_power,#move_power,#opp_level,#relic_boost,#other_boost').keyup(update_damage);
        $('#dam_rune1,#dam_rune2,#dam_rune3,#dam_rune4,#dam_rune5,#dam_rune6,#dam_rune7,#dam_rune8,#dam_rune9,#runeguard_dam').change(update_damage);
        
        $('#element_dam,#book_dam').change(update_dam_filter);
        $('#monster_dam,#rank_dam').change(push_dam_value);
        $('#ele_adv,#ele_dis,#ele_weakweak,#ele_weakstr,#dam_boost,#double_dam,#triple_dam,#bleed_dam,#pois_dam,#daze_dam,#dam_red,#majdam_red,#back_time,#curse_tot,#dam_hater1,#dam_hater2,#dam_hater3').change(total_other_boost);
        update_damage();
	}
}());