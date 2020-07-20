var level=null, selected1=null, selected2=null, selected3=null, selected4=null, selected5=null;
 
$( '.statCalculator' ).each( function(){
	var html = 'Level: <input type="text" name="Level" id="input" value="1"></input> \
		Type: <select id="options"> \
		<option value="Weapon">Weapon</option> \
		<option value="Armor">Armor</option> \
		</select> \
		<button type="button" onclick="attackOrArmor()" id="firstButton">Submit</button>';
 
	$('.statCalculator').empty().html(html);
} )
 
function attackOrArmor()
{
	if(isNaN(document.getElementById("input").value))
	{ alert("Please enter a numerical value in the input field"); }
	else
	{
		$('#options').attr('disabled','disabled');
 
		level = parseInt(document.getElementById("input").value);
		selected1 = document.getElementById("options")[document.getElementById("options").selectedIndex].value;
		$('#firstButton').hide();
		if(selected1 == "Weapon")
		{
			var html = '<br/>Class: <select id="options2"> \
			<option value="Melee">Melee</option> \
			<option value="Ranged">Ranged</option> \
			<option value="Magic">Magic</option> \
			</select> \
			<button type="button" onclick="whichClass()" id="secondButton">Submit</button>',
			$class = $('<p>').html(html);
 
			$('.statCalculator').append($class);
		}
		else if(selected1 == "Armor")
		{
			var html = '<br/>Type: <select id="options2"> \
			<option value="Power">Power</option> \
			<option value="Tank">Tank</option> \
			<option value="Hybrid">Hybrid</option> \
			</select> \
			Slot: <select id="options3"> \
			<option value="Head">Head</option> \
			<option value="Body">Body</option> \
			<option value="Legs">Legs</option> \
			<option value="Shield">Shield</option> \
			<option value="Gloves">Gloves</option> \
			<option value="Boots">Boots</option> \
			<option value="Cape">Cape</option> \
			</select> \
			<button type="button" onclick="whichSlot()" id="secondButton">Submit</button>',
			$slot = $('<p>').html(html);
 
			$('.statCalculator').append($slot);
		}
	}
}
 
function whichClass()
{	
	$('#options2').attr('disabled','disabled');
 
	selected2 = document.getElementById("options2")[document.getElementById("options2").selectedIndex].value;
	$('#secondButton').hide();
	if(selected2 == "Melee")
	{
		var html = '<br/><select id="options3"> \
		<option value="Main-hand">Main-hand</option> \
		<option value="Off-hand">Off-hand</option> \
		<option value="Two-handed">Two-handed</option> \
		</select> \
		<button type="button" onclick="whichHand()" id="thirdButton">Submit</button>',
		$hands = $('<p>').html(html);
 
		$('.statCalculator').append($hands);
	}
	else if(selected2 == "Ranged")
	{
		var html = '<br/><select id="options3"> \
		<option value="Ammunition">Ammunition</option> \
		<option value="Thrown">Thrown</option> \
		<option value="Shortbow">Shortbow</option> \
		<option value="Shieldbow">Shieldbow</option> \
		<option value="One-handed crossbow">One-handed crossbow</option> \
		<option value="Two-handed crossbow">Two-handed crossbow</option> \
		</select> \
		<button type="button" onclick="whichHand()" id="thirdButton">Submit</button>',
		$hands = $('<p>').html(html);
 
		$('.statCalculator').append($hands);
	}
	else //selected2 == "Magic"
	{ 
		printResults();
	}
}
 
function whichHand()
{
	selected3 = document.getElementById("options3")[document.getElementById("options3").selectedIndex].value;
	$('#thirdButton').hide();
	if((selected3 == "Main-hand") || (selected3 == "Off-hand") || (selected3 == "Two-handed"))
	{
		var html = '<br/>Speed: <select id="options4"> \
		<option value="Fastest">Fastest</option> \
		<option value="Fast">Fast</option> \
		<option value="Average">Average</option> \
		</select> \
		<button type="button" onclick="printResults()" id="fourthButton">Submit</button><br/>',
		$speed = $('<p>').html(html);
 
		$('.statCalculator').append($speed);
	}
	else if(selected3 == "Thrown")
	{
		$('#options3').attr('disabled','disabled');
		var html = '<br/><select id="options4"> \
		<option value="Main-hand">Main-hand</option> \
		<option value="Off-hand">Off-hand</option> \
		</select> \
		<button type="button" onclick="whichHandThrown()" id="fourthButton">Submit</button>',
		$thrownHand = $('<p>').html(html);
		
		$('.statCalculator').append($thrownHand);
	}
	else
	{
		printResults();
	}
}
 
function whichHandThrown()
{
	selected4 = document.getElementById("options4")[document.getElementById("options4").selectedIndex].value;
	$('#fourthButton').hide();
	var html = '<br/>Speed: <select id="options5"> \
	<option value="Fastest">Fastest</option> \
	<option value="Fast">Fast</option> \
	<option value="Average">Average</option> \
	</select> \
	<button type="button" onclick="printResults()" id="fifthButton">Submit</button><br/>',
	$speed = $('<p>').html(html);

	$('.statCalculator').append($speed);
}
 
function whichSlot()
{
	selected2 = document.getElementById("options2")[document.getElementById("options2").selectedIndex].value;
	selected3 = document.getElementById("options3")[document.getElementById("options3").selectedIndex].value;
	$('#secondButton').hide();
	printResults();
}
 
function printResults()
{
	if(selected2 == 'Melee')
		selected4 = document.getElementById("options4")[document.getElementById("options4").selectedIndex].value;
	else if(selected3 == 'Thrown')
		selected5 = document.getElementById("options5")[document.getElementById("options5").selectedIndex].value;
 
	$('#fourthButton').hide();
	$('#fifthButton').hide();
	var html=null;
 
	if(selected1 == 'Weapon')
	{
		html = '<div id="removingTag"><table class="wikitable"> \
			<tr> \
				<th>Accuracy</th> \
				<td>'+accuracyValue()+'</td> \
			</tr> \
			<tr> \
				<th>Damage</th> \
				<td>'+damageValue()+'</td> \
			</tr> \
		</table><br/> \
		<button type="button" onclick="reset()">Reset</button> \
		<button type="button" onclick="reCalculate()">Re-calculate</button></div>';
	}
	else
	{
		html = '<div id="removingTag"><table class="wikitable"> \
			<tr> \
				<th>Armor bonus</th> \
				<td>'+armorValue()+'</td> \
			</tr> \
			<tr> \
				<th>damage bonus</th> \
				<td>'+damageValue2()+'</td> \
			</tr> \
		</table><br/> \
		<button type="button" onclick="reset()">Reset</button> \
		<button type="button" onclick="reCalculate()">Re-calculate</button></div>';
	}
 
	var $table = $('<p>').html(html);
	$('.statCalculator').append($table);
}
 
function reCalculate()
{
	if(isNaN(document.getElementById("input").value))
	{ alert("Please enter a numerical value in the input field"); }
	else
	{
		level = parseInt(document.getElementById("input").value);
		selected2 = document.getElementById("options2")[document.getElementById("options2").selectedIndex].value;
		selected3 = document.getElementById("options3")[document.getElementById("options3").selectedIndex].value;
                if(selected1 == "Weapon")
		     selected4 = document.getElementById("options4")[document.getElementById("options4").selectedIndex].value;
		$('#removingTag').remove();
		printResults();
	}
}
 
function reset()
{
	var html = 'Level: <input type="text" name="Level" id="input" value="1"></input> \
		Type: <select id="options"> \
		<option value="Weapon">Weapon</option> \
		<option value="Armor">Armor</option> \
		</select> \
		<button type="button" onclick="attackOrArmor()" id="firstButton">Submit</button>';
 
	$('.statCalculator').empty().html(html);
}
 
function accuracyValue()
{
	if(selected3 == 'Ammunition')
		return 0;
	else
		return Math.round((((level*level*level)/1250)+(4*level)+40)*2.5);
}
 
function damageValue()
{
	if(selected2 == 'Melee')
	{
		if(selected3 == 'Main-hand')
		{
			if(selected4 == 'Fastest')
				return(Math.floor(level*9.6));
			else if(selected4 == 'Fast')
				return(Math.floor(level*12.25));
			else
				return(Math.floor(level*14.9));
		}
		else if(selected3 == 'Off-hand')
		{
			if(selected4 == 'Fastest')
				return(Math.floor(level*4.8));
			else if(selected4 == 'Fast')
				return(Math.floor(level*6.125));
			else
				return(Math.floor(level*7.45));
		}
		else //two-handed weapon
		{
			if(selected4 == 'Fastest')
				return(Math.floor(level*14.4));
			else if(selected4 == 'Fast')
				return(Math.floor(level*18.375));
			else
				return(Math.floor(level*22.35));
		}
	}
	else if(selected2 == 'Ranged')
	{
		if(selected3 == 'Ammunition')
			return(Math.floor(level*9.6));
		else if(selected3 == 'Shortbow')
			return(Math.floor(level*8.775));
		else if(selected3 == 'Shieldbow')
			return(Math.floor(level*5.3));
		else if(selected3 == 'Thrown')
		{
			if(selected4 == 'Main-hand')
			{
				if(selected5 == 'Fastest')
					return(Math.floor(level*9.6));
				else if(selected5 == 'Fast')
					return(Math.floor(level*12.25));
				else
					return(Math.floor(level*14.9));
			}
			else //selected4 == Off-hand
			{
				if(selected5 == 'Fastest')
					return(Math.floor(level*4.8));
				else if(selected5 == 'Fast')
					return(Math.floor(level*6.125));
				else
					return(Math.floor(level*7.45));
			}
		}
		else if(selected3 == 'Two-handed crossbow')
			return(Math.floor(level*12.75));
		else
			return 0;
	}
	else
	{
		return 0;
	}
}
 
function armorValue()
{
	if(selected2 == 'Tank')
	{
		var base = (((level*level*level)/1250)+(4*level)+40);
		switch(selected3)
		{
			case 'Head':return Math.floor(base*0.5);
			case 'Body':return Math.floor(base*0.575);
			case 'Legs':return Math.floor(base*0.55);
			case 'Shield':return Math.floor(base*0.5);
			case 'Gloves':return Math.floor(base*0.125);
			case 'Boots':return Math.floor(base*0.125);
			case 'Cape':return Math.floor(base*0.075);
			default: return 0;
		}
	}
	else if(selected2 == 'Power')
	{
		var base = ((((level-5)*(level-5)*(level-5))/1250)+(4*(level-5))+40);
		switch(selected3)
		{
			case 'Head':return Math.floor(base*0.5);
			case 'Body':return Math.floor(base*0.575);
			case 'Legs':return Math.floor(base*0.55);
			case 'Shield':return Math.floor(base*0.5);
			case 'Gloves':return Math.floor(base*0.125);
			case 'Boots':return Math.floor(base*0.125);
			case 'Cape':return Math.floor(base*0.075);
			default: return 0;
		}
	}
	else //Hybrid armor
	{
		var base = ((((level-15)*(level-15)*(level-15))/1250)+(4*(level-15))+40);
		switch(selected3)
		{
			case 'Head':return Math.floor(base*0.5);
			case 'Body':return Math.floor(base*0.575);
			case 'Legs':return Math.floor(base*0.55);
			case 'Shield':return Math.floor(base*0.5);
			case 'Gloves':return Math.floor(base*0.125);
			case 'Boots':return Math.floor(base*0.125);
			case 'Cape':return Math.floor(base*0.075);
			default: return 0;
		}
	}
}
 
function damageValue2()
{
	if(selected2 == 'Power')
	{
		switch(selected3)
		{
			case 'Head':return Math.floor(level*9.6*0.02);
			case 'Body':return Math.floor(level*9.6*0.035);
			case 'Legs':return Math.floor(level*9.6*0.025);
			case 'Gloves':return Math.floor(level*9.6*0.01);
			case 'Boots':return Math.floor(level*9.6*0.01);
			default :return 0;
		}
	}
	else
		return 0;
}