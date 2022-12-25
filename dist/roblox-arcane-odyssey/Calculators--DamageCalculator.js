//Calculator found on Damage Calculation page to perform a lengthy equation much quicker for better user experience
// Equation
$(function() {
	
	function calculateDamage(level,gear,magic,charge,spell,interaction,length1,length2) {
		return (level + 19 + gear) * (magic * charge* spell * interaction * length1 * length2);
	}
	function updateCalculator() {
		let level = parseInt($('#input_level').val());
		let gear = parseInt($('#input_gear').val());
		let magic = parseFloat($('#input_magic').val());
		let charge = parseFloat($('#input_charge').val());
		let spell = parseFloat($('#input_spell').val());
		let interaction = parseFloat($('#input_interaction').val());
		let length1 = parseFloat($('#input_length1').val());
		let length2 = parseFloat($('#input_length2').val());
		 if($('#magic').val() =="Acid"){
      magic=0.875;
    } 
    
    else if($('#magic').val() =='Ash'){
      magic=0.85;
    }
    if($('#magic').val() =="Crystal"){
      magic=0.95;
    } 
    
    else if($('#magic').val() =='Earth'){
      magic=1;
    }
    if($('#magic').val() =="Explosion"){
      magic=0.925;
    } 
    
    else if($('#magic').val() =='Fire'){
      magic=0.825;
    }
    if($('#magic').val() =="Glass"){
      magic=0.875;
    } 
    
    else if($('#magic').val() =='Ice'){
      magic=0.925;
    }
    if($('#magic').val() =="Light"){
      magic=0.825;
    } 
    
    else if($('#magic').val() =='Lightning'){
      magic=0.85;
    }
    if($('#magic').val() =="Magma"){
      magic=0.925;
    } 
    
    else if($('#magic').val() =='Metal'){
      magic=1.1;
    }
    if($('#magic').val() =="Plasma"){
      magic=0.775;
    } 
    
    else if($('#magic').val() =='Poison'){
      magic=0.75;
    }
    if($('#magic').val() =="Sand"){
      magic=0.875;
    } 
    
    else if($('#magic').val() =='Shadow'){
      magic=0.975;
    }
    if($('#magic').val() =="Snow"){
      magic=0.925;
    } 
    
    else if($('#magic').val() =='Water'){
      magic=0.95;
    }
    if($('#magic').val() =="Wind"){
      magic=0.925;
    } 
    
    else if($('#magic').val() =='Wood'){
      magic=0.95;
    }
		let damage = calculateDamage(level,gear,magic,charge,spell,interaction,length1,length2);
		$('#input_damage').val(damage.toFixed(0));
	}
	
	// Generate Calculator
	(function () {
		$('#damage_calculator').html(
			'<div class="calculator-row"><div class="calculator-col">' +
			'<label for="magic" style=" margin-left:30px;">Choose The Magic:</label><br><select class="classic" id="magic" style=" margin-left:30px;"><option>Please Select an Option</option><option value="Acid">Acid</option><option value="Ash">Ash</option><option value="Crystal"> Crystal</option><option value="Earth">Earth</option><option value="Explosion">Explosion</option><option value="Fire">Fire</option><option value="Glass">Glass</option><option value="Ice">Ice</option><option value="Light"> Light</option><option value="Lightning">Lightning</option><option value="Magma">Magma</option><option value="Metal">Metal</option><option value="Plasma"> Plasma</option><option value="Poison">Poison</option><option value="Sand">Sand</option><option value="Shadow">Shadow</option><option value="Snow">Snow</option><option value="Water">Water</option><option value="Wind">Wind</option><option value="Wood">Wood</option></select></div></div>' +
			'<div class="calculator-row"><div class="calculator-col">' +
			'<div class="calculator-element"><label>level:</label><input id="input_level" type="number" step="any" value="0" min="1" max="120" oninput="validity.valid||(value=\'\');"></div></div>' +
			'<div class="calculator-col">' +
			'<div class="calculator-element"><label>Power:</label><input id="input_gear" type="number" step="any" value="0" min="0" max="200" oninput="validity.valid||(value=\'\');"></div></div></div>' +
			'<div class="calculator-row"><div class="calculator-col">' +
			'<div class="calculator-element"><label>Charge:</label><input id="input_charge" type="number" step="any" value="0" min="1" max="1.333" oninput="validity.valid||(value=\'\');"></div></div>' +
			'<div class="calculator-col">' +
			'<div class="calculator-element"><label>Spell:</label><input id="input_spell" type="number" step="any" value="0" min="1" max="6.897" oninput="validity.valid||(value=\'\');"></div></div>' +
			'<div class="calculator-col">' +
			'<div class="calculator-element"><label>Interaction:</label><input id="input_interaction" type="number" step="any" value="1" min="1" max="1.8" onsubmit="validity.valid||(value=\'\');"></div></div></div>' +
			'<div class="calculator-row"><div class="calculator-col">' +
			'<div class="calculator-element"><label>Length1:</label><input id="input_length1" type="number" step="any" value="0" min="1" max="1.5" onsubmit="validity.valid||(value=\'\');"></div></div>' +
			'<div class="calculator-col">' +
			'<div class="calculator-element"><label>Length2:</label><input id="input_length2" type="number" step="any" value="0" min="1" max="1.5" onsubmit="validity.valid||(value=\'\');"></div></div></div>' +
			'<div class="calculator-row"><div class="calculator-col">' +
			'<div class="calculator-element"><label>Damage:</label><input id="input_damage" type="number" disabled></div></div></div>'
		);
				// Input Listeners
		$('#input_level').on('input', function() {
			updateCalculator();
		});
		$('#input_gear').on('input', function() {
			updateCalculator();
		});
		$('#input_magic').on('submit', function() {
			updateCalculator();
		});
		$('#input_charge').on('input', function() {
			updateCalculator();
		});
		$('#input_spell').on('input', function() {
			updateCalculator();
		});
		$('#input_interaction').on('input', function() {
			updateCalculator();
		});
		$('#input_length1').on('input', function() {
			updateCalculator();
		});
		$('#input_length2').on('input', function() {
			updateCalculator();
		});
	})();
});