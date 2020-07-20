var elementModifierArray;

$("document").ready(function(){
	if ($("#SkillMultCalc").length == 1){
		$("#SkillMultCalc").append(BuildSkillFormHTML());
		ResetSkillMultForm();
		
		//submit form for calculations
		$("#smc_submit").click(function(){
			runSkillMultiplierCalc($("#SkillMultForm").closest("form"));
		});
	}
});

function BuildSkillFormHTML()
{
	return	'<form id="SkillMultForm" onreset="ResetSkillMultForm();">'+
			'<table class="DmgInput">'+
				'<tr>'+
					'<th class="DmgInputTitle" colspan="2" style="text-align:center; font-variant:uppercase; font-size:1.1em; border-bottom:1px solid black;">Skill Multiplier Calculator</th>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="skillModeAS">Skill Mode: </label>'+
					'</th>'+
					'<td>'+
						'<input type="radio" name="skillMode" id="skillModeAS" value="AS" checked /><label for="skillModeAS">Answer</label>'+
						'<input type="radio" name="skillMode" id="skillModeSS" value="SS" /><label for="skillModeSS">Special</label>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="spiritElementFire">Spirit\'s Element: </label>'+
					'</th>'+
					'<td>'+
						'<input type="radio" name="spiritElement" id="spiritElementFire" value="F" checked /><label for="spiritElementFire">Fire</label>'+
						'<input type="radio" name="spiritElement" id="spiritElementWater" value="W" /><label for="spiritElementWater">Water</label>'+
						'<input type="radio" name="spiritElement" id="spiritElementThunder" value="T" /><label for="spiritElementThunder">Thunder</label>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="spiritBaseATK">Spirit\'s Base ATK: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="9900" step="1" value="1022" name="spiritBaseATK" id="spiritBaseATK" size="20" />'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="teamHipoATK">Team Hipo ATK Up: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="9900" step="100" value="0" name="teamHipoATK" id="teamHipoATK" />'+
					'</td>'+
				'</tr>'+
				'<tr style="display:none;">'+
					'<th>'+
						'<label for="numSplitATK">Attacks Split Into: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="1" max="10" step="1" value="1" name="numSplitATK" id="numSplitATK" /> attack(s)'+
					'</td>'+
				'</tr>'+
				'<tr style="display:none;">'+
					'<th>'+
						'<label for="teamASATKBoost">Team AS ATK Boost: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="9900" step="5" value="0" name="teamASATKBoost" id="teamASATKBoost" /> %'+
					'</td>'+
				'</tr>'+
				'<tr style="display:none;">'+
					'<th>'+
						'<label for="teamSSATKBoost">Team SS ATK Boost: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="1000" step="5" value="0" name="teamSSATKBoost" id="teamSSATKBoost" /> %'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="skillMultiplierPrecision">Skill Multiplier Precision: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="1" max="100" step="1" value="10" name="skillMultiplierPrecision" id="skillMultiplierPrecision" /> %'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="damageData">Damage Data: </label>'+
					'</th>'+
					'<td>'+
						'<textarea name="damageData" maxlength="500" id="damageData">1,T,969\n'+
						'2,T,1031\n'+
						'3,T,1042\n'+
						'4,T,1111\n'+
						'5,T,967\n'+
						'6,T,1131\n'+
						'1,T,908\n'+
						'4,T,943\n'+
						'1,T,1061\n'+
						'2,T,1084\n'+
						'3,T,992\n'+
						'4,T,1011\n'+
						'3,T,950\n'+
						'4,T,1086\n'+
						'5,T,1087\n'+
						'7,T,1108</textarea>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>&nbsp;</th>'+
					'<td>'+
						'<input type="button" id="smc_submit" value="CALCULATE" /> <input type="reset" id="smc_reset" value="Reset & Clear" />'+
					'</td>'+
				'</tr>'+
			'</table>'+
		'</form>';
}

function ResetSkillMultForm()
{
	$('#SkillMultCalcResult').html('<b>RESULT</b><div id="MultCalcRes" style="margin-bottom:10px;">(The calculator hasn\'t been run yet)</div><div id="MultCalcResDetails" style="margin-bottom:10px;"></div><div id="MultCalcResDetailsRundown" style="overflow-x:auto;"></div>');
}

/*	getElementModifierArray() Documentation:
	Array construct:
	   |      Target
	ATK| F   W   T   L   D
	---+--------------------
	 F |1.0 0.5 1.5 1.0 1.0
	 W |1.5 1.0 0.5 1.0 1.0
	 T |0.5 1.5 1.0 1.0 1.0
	 L |1.0 1.0 1.0 1.0 1.5
	 D |1.0 1.0 1.0 1.5 1.0
	
	Element Shorthands
	F = Fire | W = Water | T = Thunder | L = Light | D = Dark
	
	Element Affinity
	--> = Strong against
	
	F --> W --> T --> F (repeat)
	L --> D --> L       (repeat)
	
	Element Modifiers
	Strong : 1.5x
	Neutral: 1.0x
	Weak   : 0.5x
	
	Sample Codes:
	- array['F']['W'] means the elemental modifier of a Fire attack against a Water target (0.5x)
	- array['T']['T'] means the elemental modifier of a Thunder attack against a Thunder target (1.0x)
	- array['L']['D'] means the elemental modifier of a Light attack against a Dark target (1.5x)
*/
function getElementModifierArray()
{
	//return [ [1.0,0.5,1.5], [1.5, 1.0, 0.5] [0.5, 1.5, 1.0] ];
	var tmpArray = [];
	tmpArray['F'] = [];
	tmpArray['F']['F'] = 1.0;
	tmpArray['F']['W'] = 0.5;
	tmpArray['F']['T'] = 1.5;
	tmpArray['F']['L'] = 1.0;
	tmpArray['F']['D'] = 1.0;
	tmpArray['W'] = [];
	tmpArray['W']['F'] = 1.5;
	tmpArray['W']['W'] = 1.0;
	tmpArray['W']['T'] = 0.5;
	tmpArray['W']['L'] = 1.0;
	tmpArray['W']['D'] = 1.0;
	tmpArray['T'] = [];
	tmpArray['T']['F'] = 0.5;
	tmpArray['T']['W'] = 1.5;
	tmpArray['T']['T'] = 1.0;
	tmpArray['T']['L'] = 1.0;
	tmpArray['T']['D'] = 1.0;
	tmpArray['L'] = [];
	tmpArray['L']['F'] = 1.0;
	tmpArray['L']['W'] = 1.0;
	tmpArray['L']['T'] = 1.0;
	tmpArray['L']['L'] = 1.0;
	tmpArray['L']['D'] = 1.5;
	tmpArray['D'] = [];
	tmpArray['D']['F'] = 1.0;
	tmpArray['D']['W'] = 1.0;
	tmpArray['D']['T'] = 1.0;
	tmpArray['D']['L'] = 1.5;
	tmpArray['D']['D'] = 1.0;
	return tmpArray;
}

function runSkillMultiplierCalc(form)
{
	try
	{
		console.clear(); // Dev only
		
		var formData = form.serializeArray().reduce(accumulateCustom, {});
		var damageDataArray = parseDamageData(formData["damageData"]);
		elementModifierArray = getElementModifierArray();
		
		// Validate Inputs here
		
		var minDev = 0.9;; //Minimum Deviation
		var maxDev = 1.1;; //Maximum Deviation
		var tAtk = parseInt(formData["spiritBaseATK"], 10) + parseInt(formData["teamHipoATK"], 10); // Total ATK
		var ctb = ((parseInt(formData["teamASATKBoost"], 10) + parseInt(formData["teamSSATKBoost"], 10)) / 100).toFixed(2); // Cumulative Team Boost (AS + SS)
		var spiritEle = formData["spiritElement"]; //Spirit Element
		var skillMode = formData["skillMode"];
		var smPrecision = parseInt(formData["skillMultiplierPrecision"], 10) / 100;
		
		// Arrays, passed as a reference
		var damageDataResultArray = [];
		var minMaxSkillMultiplierArray = []; // To be used in the rundown visualisation. Stored the minimum and maximum possible skill multiplier from ALL checked damage data. [0] = min; [1] = max.
		
		var smResultArray = calculateSkillMultiplier(skillMode, tAtk, ctb, spiritEle, minDev, maxDev, damageDataArray, smPrecision, damageDataResultArray, minMaxSkillMultiplierArray);
		
		var htmlResultDetails = generateDamageDataResultArrayHTML(damageDataArray, damageDataResultArray);
		var htmlResult = "";
		
		var htmlRundown = generateRundownVisualisationHTML(damageDataResultArray, minMaxSkillMultiplierArray, smResultArray, smPrecision)
		
		if (smResultArray.length == 0)
		{
			htmlResult = "No multipliers are found. Check your damage data again and see if any is wrong";
		}
		else if (smResultArray.length == 1)
		{
			htmlResult = "The skill multiplier is <b>" + smResultArray[0].toString() + '</b>';
		}
		else
		{
			htmlResult = "The skill multiplier ranges from <b>" + smResultArray[0].toString() + " to " + smResultArray[smResultArray.length-1].toString() + "</b>.<br /><br />The calculator needs more data to find the exact skill multiplier, or has higher skill multiplier precision.";
		}
		
		$('#MultCalcRes').html(htmlResult);
		$('#MultCalcResDetails').html(htmlResultDetails);
		$('#MultCalcResDetailsRundown').html(htmlRundown);
	}
	catch(e)
	{
		alert(e);
	}
}

//Source: StackOverflow - link coming soon
function arrayIntersection(array1, array2)
{
	return array1.filter(function(n)
	{
		return array2.indexOf(n) != -1;
	})
}

// Transforms Form inputs into an array based on "name" property
function accumulateCustom(prev, cur, index, array)
{
	if (cur.value != "")
	{
		prev[cur.name] = cur.value;
	}
	return prev;
}

function parseDamageData(damageDataString)
{
	var damageDataAllArray = damageDataString.split("\n");
	var damageDataFinalArray = createArray(damageDataAllArray.length, 3);
	var tmpDamageDataOne;
	
	for (var i = 0; i < damageDataAllArray.length; i++)
	{
		tmpDamageDataOne = damageDataAllArray[i].split(',');
		//Validate each line here
		damageDataFinalArray[i][0] = parseInt(tmpDamageDataOne[0], 10);
		damageDataFinalArray[i][1] = tmpDamageDataOne[1];
		damageDataFinalArray[i][2] = parseInt(tmpDamageDataOne[2], 10);
	}
	
	return damageDataFinalArray;
}

//Source: http://stackoverflow.com/a/966938
function createArray(length)
{
	var arr = new Array(length || 0), i = length;
	
	if (arguments.length > 1)
	{
		var args = Array.prototype.slice.call(arguments, 1);
		while (i--) arr[length - 1 - i] = createArray.apply(this, args);
	}
	
	return arr;
}

//
function calculateSkillMultiplier(skillMode, tAtk, ctb, spiritEle, minDev, maxDev, damageDataArray, smPrecision, damageDataResultArray, minMaxSkillMultiplierArray)
{
	var i = 0;
	var minExactSM = 0.0;
	var maxExactSM = 0.0;
	var intersectedSMArray;
	var tmpSMRangeArray;
	var doneLooping = 0;
	
	while (i < damageDataArray.length && doneLooping == 0)
	{
		minExactSM = calculateExactSkillMultiplier(skillMode, tAtk, ctb, spiritEle, damageDataArray[i][1], damageDataArray[i][0], damageDataArray[i][2], maxDev, elementModifierArray); // Use maxDev, NOT minDev
		maxExactSM = calculateExactSkillMultiplier(skillMode, tAtk, ctb, spiritEle, damageDataArray[i][1], damageDataArray[i][0], damageDataArray[i][2], minDev, elementModifierArray); // Use minDev, NOT maxDev
		
		tmpSMRangeArray = constructSMRange(minExactSM, maxExactSM, smPrecision);
		
		if (intersectedSMArray === undefined || intersectedSMArray === null)
		{
			intersectedSMArray = tmpSMRangeArray;
			minMaxSkillMultiplierArray[0] = tmpSMRangeArray[0];
			minMaxSkillMultiplierArray[1] = tmpSMRangeArray[tmpSMRangeArray.length-1];
		}
		else
		{
			intersectedSMArray = arrayIntersection(intersectedSMArray, tmpSMRangeArray);
			if (minMaxSkillMultiplierArray[0] > tmpSMRangeArray[0])
				minMaxSkillMultiplierArray[0] = tmpSMRangeArray[0];
			
			if (minMaxSkillMultiplierArray[1] < tmpSMRangeArray[tmpSMRangeArray.length-1])
				minMaxSkillMultiplierArray[1] = tmpSMRangeArray[tmpSMRangeArray.length-1];
		}
		
		damageDataResultArray[i] = [];
		damageDataResultArray[i]["minSM"] = tmpSMRangeArray[0];
		damageDataResultArray[i]["maxSM"] = tmpSMRangeArray[tmpSMRangeArray.length-1];
		damageDataResultArray[i]["precisiveSMRangeArray"] = tmpSMRangeArray;
		damageDataResultArray[i]["intersectedSMArray"] = intersectedSMArray;
		
		//console.log("Data " + (i+1).toString());
		//console.log(tmpSMRangeArray);
		//console.log(intersectedSMArray);
		//console.log("--------------------------");
		
		if (intersectedSMArray.length < 2)
			doneLooping = 1;
		
		i++;
	}
	
	//console.log(damageDataResultArray);
	
	return intersectedSMArray;
}

function calculateExactSkillMultiplier(skillMode, tAtk, ctb, spiritEle, enemyEle, combo, damage, dev, elementModifierArrayLocal)
{
	var dmgDivider = 2;
	if (skillMode == "SS")
		dmgDivider = 1;
	
	var eleMod = elementModifierArrayLocal[spiritEle][enemyEle];
	
	//return (damage / (tAtk / dmgDivider * eleMod * (1 + combo * 0.01) * dev)) - ctb - 1.0;
	return (damage / (tAtk / dmgDivider * eleMod * (1 + combo * 0.01) * dev)) - ctb;
}

function constructSMRange(minExactSM, maxExactSM, smPrecision)
{
	var minSM = Math.floor(minExactSM / smPrecision) * smPrecision * 100 / 100;
	if (minExactSM % smPrecision != 0)
		minSM = minSM + smPrecision;
	
	var maxSM = Math.floor(maxExactSM / smPrecision) * smPrecision * 100 / 100;
	//if (maxExactSM % smPrecision != 0) // No need for this as the Max SM is automatically rounded down by above statement
	//	maxSM = maxSM - smPrecision;
	
	if (minSM == maxSM)
	{
		return [minSM.toFixed(2)];
	}
	else
	{
		var smArray = [];
		var tmpSM = minSM + smPrecision;
		
		smArray.push(minSM.toFixed(2));
		
		while (tmpSM < maxSM)
		{
			smArray.push(tmpSM.toFixed(2));
			tmpSM = tmpSM + smPrecision;
		}
		
		smArray.push(maxSM.toFixed(2));
		
		return smArray;
	}
}

function generateDamageDataResultArrayHTML(damageDataArray, damageDataResultArray)
{
	var html = "";
	html = html + "<table style=\"background-color:white;\" border=\"1\" cellspacing=\"0\" cellpadding=\"3\">";
	html = html + "<tr>";
	html = html + "<th>Data #</th>";
	html = html + "<th>Combo</th>";
	html = html + "<th>Target</th>";
	html = html + "<th>Damage</th>";
	html = html + "<th>Minimum<br />Skill Multiplier</th>";
	html = html + "<th>Maximum<br />Skill Multiplier</th>";
	html = html + "</tr>";
	
	var i = 0;
	while (i < damageDataResultArray.length)
	{
		html = html + "<tr>";
		html = html + "<td>" + (i+1).toString() + "</td>";
		html = html + "<td>" + damageDataArray[i][0].toString() + "</td>";
		html = html + "<td>" + getElementName(damageDataArray[i][1]) + "</td>";
		html = html + "<td>" + damageDataArray[i][2].toString() + "</td>";
		html = html + "<td>" + damageDataResultArray[i]["minSM"].toString() + "</td>";
		html = html + "<td>" + damageDataResultArray[i]["maxSM"].toString() + "</td>";
		html = html + "</tr>";
		i++;
	}
	
	if (i <= damageDataArray.length - 1)
	{
		html = html + "<tr>";
		if (i == damageDataArray.length - 1)
			html = html + "<td>" + (i+1).toString() + "</td>";
		else
			html = html + "<td>" + (i+1).toString() + "-" + (damageDataArray.length).toString() + "</td>";
		html = html + "<td colspan=\"5\">(No need to further calculate the data.)</td>";
		html = html + "</tr>";
	}
	
	html = html + "</table>";
	return html;
}

function generateRundownVisualisationHTML(damageDataResultArray, minMaxSkillMultiplierArray, smResultArray, smPrecision)
{
	var html = "<b>VISUALISATION</b>";
	html = html + "<table border=\"1\" cellspacing=\"0\" cellpadding=\"0\" class=\"smVisualisationTable\">";
	html = html + "<tr>";
	html = html + "<td class=\"dataIndexCell\">Data #</td>";
	
	minMaxSkillMultiplierArray[0] = parseFloat(minMaxSkillMultiplierArray[0]);
	minMaxSkillMultiplierArray[1] = parseFloat(minMaxSkillMultiplierArray[1]);
	smPrecision = parseFloat(smPrecision);
	
	var tmpSkillMultiplierHeader = minMaxSkillMultiplierArray[0]; // Min multipler
	
	while (tmpSkillMultiplierHeader <= minMaxSkillMultiplierArray[1]) // while Current multiplier <= Max multiplier
	{
		html = html + "<td>" + tmpSkillMultiplierHeader.toString() + "</td>";
		tmpSkillMultiplierHeader = parseFloat((tmpSkillMultiplierHeader + smPrecision).toFixed(2));
	}
	html = html + "</tr>";
	
	for (var i = 0; i < damageDataResultArray.length; i++)
	{
		html = html + "<tr>";
		html = html + "<td class=\"dataIndexCell\">" + (i+1).toString() + "</td>";
		tmpSkillMultiplierHeader = minMaxSkillMultiplierArray[0]; // Min multipler
		
		var tmpPrecisiveSMRangeArray = damageDataResultArray[i]["precisiveSMRangeArray"];
		while (tmpSkillMultiplierHeader <= minMaxSkillMultiplierArray[1]) // while Current multiplier <= Max multiplier
		{
			if (smResultArray.indexOf(tmpSkillMultiplierHeader.toFixed(2)) >= 0)
			{
				html = html + "<td class=\"bgGreen\">&nbsp;</td>";
			}
			else if (tmpPrecisiveSMRangeArray.indexOf(tmpSkillMultiplierHeader.toFixed(2)) >= 0)
			{
				html = html + "<td class=\"bgLightGreen\">&nbsp;</td>";
			}
			else
			{
				html = html + "<td class=\"bgLightGrey\">&nbsp;</td>";
			}
			
			tmpSkillMultiplierHeader = parseFloat((tmpSkillMultiplierHeader + smPrecision).toFixed(2));
		}
		html = html + "</tr>";
	}
	
	//console.log(damageDataResultArray);
	
	html = html + "</table>";
	return html;
}

function getElementName(elementCode)
{
	var elementName;
	switch (elementCode)
	{
		case "F": elementName = "Fire"; break;
		case "W": elementName = "Water"; break;
		case "T": elementName = "Thunder"; break;
		case "L": elementName = "Light"; break;
		case "D": elementName = "Dark"; break;
		default:  elementName = "???"; break;
	}
	return elementName;
}