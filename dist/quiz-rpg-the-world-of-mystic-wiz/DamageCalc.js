$("document").ready(function(){
	if ($("#SkillDmgCalc").length == 1){
		$("#SkillDmgCalc").append(BuildDamageCalcFormHTML());
	}
});

// The Form
function BuildDamageCalcFormHTML()
{
    return	'<form id="SkillDmgForm" onreset="$(\'#SkillDmgCalcResult\').html(\'\');">'+
			'<table class="SkillDmgInput">'+
				'<tr>'+
					'<th colspan="2" style="text-align:center; font-variant:uppercase; font-size:1.1em; border-bottom:1px solid black;">INPUT PARAMETERS</th>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="skillModeAS">Skill Mode: </label>'+
					'</th>'+
					'<td>'+
						'<input type="radio" name="skillMode" id="skillModeAS" value="1" checked /><label for="skillModeAS">Answer</label>'+
						'<input type="radio" name="skillMode" id="skillModeSS" value="2" /><label for="skillModeSS">Special</label>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="spiritElementFire">Spirit\'s Element: </label>'+
					'</th>'+
					'<td>'+
						'<input type="radio" name="spiritElement" id="spiritElementFire" value="1" checked /><label for="spiritElementFire"><img src="https://vignette.wikia.nocookie.net/quiz-rpg-the-world-of-mystic-wiz/images/3/30/Fire.png/revision/latest?cb=20141122091910" width="15px" /></label>'+
						'<input type="radio" name="spiritElement" id="spiritElementWater" value="2" /><label for="spiritElementWater"><img src="https://vignette.wikia.nocookie.net/quiz-rpg-the-world-of-mystic-wiz/images/9/9d/Water.png/revision/latest?cb=20140917001010" width="15px" /></label>'+
						'<input type="radio" name="spiritElement" id="spiritElementThunder" value="3" /><label for="spiritElementThunder"><img src="https://vignette.wikia.nocookie.net/quiz-rpg-the-world-of-mystic-wiz/images/3/3d/Thunder.png/revision/latest?cb=20140917001003" width="15px" /></label>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="spiritBaseATK">Spirit\'s Base ATK: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="9900" step="1" value="1000" name="spiritBaseATK" id="spiritBaseATK" size="20" />'+
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
				'<tr>'+
					'<th>'+
						'<label for="spiritSkillMultiplier">Spirit Skill Multiplier: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="100.00" step="0.01" value="1" name="spiritSkillMultiplier" id="spiritSkillMultiplier" /> x'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="numSplitATK">Split Into: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="1" max="10" step="1" value="1" name="numSplitATK" id="numSplitATK" /> attack(s)'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="teamASATKBoost">Team AS ATK Boost: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="9900" step="5" value="0" name="teamASATKBoost" id="teamASATKBoost" /> %'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="teamSSATKBoost">Team SS ATK Boost: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="1000" step="5" value="0" name="teamSSATKBoost" id="teamSSATKBoost" /> %'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="comboDisplayMin">Display Combo From: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="99" step="1" value="0" name="comboDisplayMin" id="comboDisplayMin" />'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>'+
						'<label for="comboDisplayMax">Display Combo To: </label>'+
					'</th>'+
					'<td>'+
						'<input type="number" min="0" max="99" step="1" value="10" name="comboDisplayMax" id="comboDisplayMax" />'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<th>&nbsp;</th>'+
					'<td>'+
						'<input type="button" value="CALCULATE" id="submitSkillDmg" onClick="runSkillDamageCalc($(this).closest(\'form\'), $(\'#SkillDmgCalcResult\'));" /> <input type="reset" value="Reset & Clear" />'+
					'</td>'+
				'</tr>'+
			'</table>'+
		'</form>';
}

// Called by the button; The entry point of damage calculation and table generation. The final catch(e) is here as well.
function runSkillDamageCalc(form, result)
{
        try
        {
                var formData = form.serializeArray().reduce(accumulateDamageCalc, {});
                console.log(formData);
                validateInput(formData);
               
                var elementNames = prepareElementNames(formData["spiritElement"]);
                var damageMultipliers=[0.9, 1.0, 1.1]; //Deviation of 10%
                var elementMultipliers=[0.5, 1.0, 1.5]; //Weak - Same - Strong
               
                // Variables check
                if (elementNames.length != elementMultipliers.length)
                        throw "Derp. Element Names array length must be the same as Element Multiplier array length. It's the <b>developer's fault</b>, not yours."
               
                htmlTable = generateTable(formData, damageMultipliers, elementNames, elementMultipliers);
                result.html(htmlTable); // Display the table
    }
    catch (e) // Final catch
        {
        if (typeof(e) == "string")
                {
            result.html("<span class=\"SkillDmgResultError\">Error: " + e + "</span>"); // Can be an "error" CSS class instead
        }
    }
}
 
// For the top table headers
function prepareElementNames(spiritElement)
{
        var elementNames=[];
       
        //Array elements order: Weak - Same - Strong
        switch (spiritElement)
        {
                case 1: elementNames=["Water", "Fire", "Thunder"]; break; // Fire
                case 2: elementNames=["Thunder", "Water", "Fire"]; break; // Water
                case 3: elementNames=["Fire", "Thunder", "Water"]; break; // Thunder
                default: elementNames=["?", "?", "?"]; break; // ?
        }
       
        //elementNames[0] += " (Weak)";
        //elementNames[1] += " (Same)";
        //elementNames[2] += " (Strong)";
       
        return elementNames;
}
 
// To get element icon images from wiki
function getElementIconFromWiki(elementName)
{
        var imgCode = "";
        switch (elementName)
        {
                case "Fire": imgCode = "<img src=\"https://vignette.wikia.nocookie.net/quiz-rpg-the-world-of-mystic-wiz/images/3/30/Fire.png/revision/latest?cb=20141122091910\" width=\"15px\" />"; break;
                case "Water": imgCode = "<img src=\"https://vignette.wikia.nocookie.net/quiz-rpg-the-world-of-mystic-wiz/images/9/9d/Water.png/revision/latest?cb=20140917001010\" width=\"15px\" />"; break;
                case "Thunder": imgCode = "<img src=\"https://vignette.wikia.nocookie.net/quiz-rpg-the-world-of-mystic-wiz/images/3/3d/Thunder.png/revision/latest?cb=20140917001003\" width=\"15px\" />"; break;
        }
       
        return imgCode;
}
 
// Transforms Form inputs into an array based on "name" property
function accumulateDamageCalc(prev, cur, index, array)
{
        if (cur.value !== "")
        {
                prev[cur.name] = parseFloat(cur.value); // ALL inputs are floats/integers
        }
        return prev;
}
 
// Input validations prior to any calculations. If any is invalid, throws an error immediately.
function validateInput(formData)
{
        try
        {
                if (isNaN(formData["spiritBaseATK"]))
                        throw "Invalid <i>Spirit Base ATK</i>.";
                       
                if (formData["spiritBaseATK"] < 1)
                        throw "<i>Spirit's Base ATK</i> cannot be lower than 1.";
               
                if (formData["spiritBaseATK"] > 9900)
                        throw "<i>Spirit's Base ATK</i> cannot be higher than 9900. (It's already over 9000!)";
               
               
                if (isNaN(formData["spiritSkillMultiplier"]))
                        throw "Invalid <i>Spirit Skill Multiplier</i>.";
               
                if (formData["spiritSkillMultiplier"] < 0)
                        throw "<i>Spirit Skill Multiplier</i> cannot be lower than 0x.";
               
                if (formData["spiritSkillMultiplier"] > 100)
                        throw "<i>Spirit Skill Multiplier</i> cannot be higher than 100x.";
               
               
                if (isNaN(formData["teamHipoATK"]))
                        throw "Invalid <i>Additional Team Hipo ATK Up</i>.";
               
                if (formData["teamHipoATK"] < 0)
                        throw "<i>Team Hipo ATK Up</i> cannot be lower than 0.";
               
                if (formData["teamHipoATK"] > 9900)
                        throw "<i>Team Hipo ATK Up</i> cannot be higher than 9900. (It's already over 9000!)";
               
               
                if (isNaN(formData["teamASATKBoost"]))
                        throw "Invalid <i>Team AS ATK Boost</i>.";
               
                if (formData["teamASATKBoost"] < 0)
                        throw "<i>Team AS ATK Boost</i> cannot be lower than 0%.";
               
                if (formData["teamASATKBoost"] > 9900)
                        throw "<i>Team AS ATK Boost</i> cannot be higher than 9900%. (It's already over 9000!)";
               
               
                if (isNaN(formData["teamSSATKBoost"]))
                        throw "Invalid <i>Team SS ATK Boost</i>.";
               
                if (formData["teamSSATKBoost"] < 0)
                        throw "<i>Team SS ATK Boost</i> cannot be lower than 0%.";
               
                if (formData["teamSSATKBoost"] > 9900)
                        throw "<i>Team SS ATK Boost</i> cannot be higher than 9900%. (It's already over 9000!)";
               
               
                if (isNaN(formData["numSplitATK"]))
                        throw "Invalid <i>Split Into</i>.";
               
                if (formData["numSplitATK"] < 1)
                        throw "<i>Split Into</i> cannot be lower than 1.";
               
                if (formData["numSplitATK"] > 10)
                        throw "<i>Split Into</i> cannot be higher than 10.";
               
               
                if (isNaN(formData["comboDisplayMin"]))
                        throw "Invalid <i>Display Combo From</i>.";
               
                if (formData["comboDisplayMin"] < 0)
                        throw "<i>Display Combo From</i> cannot be lower than 0.";
               
                if (formData["comboDisplayMin"] > 99)
                        throw "<i>Display Combo From</i> cannot be higher than 99.";
               
               
                if (isNaN(formData["comboDisplayMax"]))
                        throw "Invalid <i>Display Combo To</i>.";
               
                if (formData["comboDisplayMax"] < 0)
                        throw "<i>Display Combo To</i> cannot be lower than 0.";
               
                if (formData["comboDisplayMax"] > 99)
                        throw "<i>Display Combo To</i> cannot be higher than 99.";
               
               
                if (formData["comboDisplayMin"] > formData["comboDisplayMax"])
                        throw "<i>Display Combo From</i> cannot be higher than <i>Display Combo To</i>.";
        }
        catch (e)
        {
                throw(e);
        }
}
 
// Longest code here. Generates HTML table for diplaying the damage numbers. The damage calculation is also done here.
function generateTable(formData, damageMultipliers, elementNames, elementMultipliers)
{
        try
        {
                var htmlTable = "";
                var oneDamage = 0;
                var totalDamage = 0;
                var rowCount = 1;
               
                // Notes
                htmlTable += "<p><b>Note:</b><ul>";
                htmlTable += "<li>Maximum damage deviation is set to <b>10%</b>.</li>";
               
                if (formData["skillMode"] == 1 && formData["comboDisplayMin"] === 0) // AS
                        htmlTable += "<li>Combo 0 is technically not possible to happen for AS.</li>";
               
                if (formData["skillMode"] == 2) // SS
                        htmlTable += "<li><i>Team AS ATK Boost</i> doesn't affect the SS damage calculation.</li>";
               
                if (formData["numSplitATK"] > 1)
                        htmlTable += "<li>Numbers in brackets are the total damage.</li>";
               
                htmlTable += "</ul></p>";
               
                // Start Table
                htmlTable += "<table cellpadding=\"3\" cellspacing=\"0\">";
               
                // Element Name header
                htmlTable += "<tr>";
               
                if (formData["skillMode"] == 1)
                        htmlTable += "<th rowspan=\"2\" class=\"Mode\">Mode: AS</th>"; // Mode Header
                else
                        htmlTable += "<th rowspan=\"2\" class=\"Mode\">Mode: SS</th>"; // Mode Header
               
                htmlTable += "<th colspan=\"9\" class=\"Mode\" style=\"background-color:pink; color:black;\">Actual Damage to Enemies</th>"; // "Actual Damage to" Header
                htmlTable += "</tr>";
                htmlTable += "<tr>";
               
                for (var i = 0; i < elementNames.length; i++)
                {
                        htmlTable = htmlTable + "<th colspan=\"" + String(damageMultipliers.length) + "\" class=\"" + elementNames[i] + "\">" + getElementIconFromWiki(elementNames[i]) + " " + elementNames[i] + " (" + String(elementMultipliers[i])  + "x)" + "</th>";
                }
                htmlTable += "</tr>";
               
                // Damage (%) Header for each Element Name
                htmlTable += "<tr>";
                htmlTable += "<th style=\"border-bottom:1px solid black; border-top:none;\">Combo</th>"; // Combo Header
                for (var j = 0; j < elementNames.length; j++)
                {
                        for (var k = 0; k < damageMultipliers.length; k++)
                        {
                                htmlTable = htmlTable + "<th class=\"damageMultColumn\" style=\"border-bottom:1px solid black;\">" + String(Math.floor(damageMultipliers[k] * 100)) + "%</th>";
                        }
                }
                htmlTable += "</tr>";
               
                // Damage cells
                for (var cCombo = formData["comboDisplayMin"]; cCombo <= formData["comboDisplayMax"]; cCombo++)
                {
                        if (rowCount % 3 === 0)
                                htmlTable += "<tr class=\"rowMarker\">";
                        else
                                htmlTable += "<tr>";
                       
                        htmlTable += "<td style=\"text-align:center;\" class=\"rightBorder\">" + String(cCombo) + "</td>"; // align="center" is needed here
                       
                        for (var m = 0; m < elementNames.length; m++)
                        {
                                for (var n = 0; n < damageMultipliers.length; n++)
                                {
                                        if (m != elementNames.length - 1 && n == damageMultipliers.length - 1)
                                                htmlTable += "<td class=\"rightBorder\">";
                                        else
                                                htmlTable += "<td>";
                                       
                                        if (formData["skillMode"] == 1) // AS
                                                oneDamage = ASDamageCalculator(formData, cCombo, elementMultipliers[m], damageMultipliers[n])
                                        else // SS
                                                oneDamage = SSDamageCalculator(formData, cCombo, elementMultipliers[m], damageMultipliers[n])
                                       
                                        totalDamage = Math.floor(oneDamage * formData["numSplitATK"]);
                                       
                                        htmlTable = htmlTable + String(oneDamage);
                                        if (formData["numSplitATK"] > 1)
                                                htmlTable += "<br /><span style=\"font-size:80%;\">" + "(" + String(totalDamage) + ")</span>";
                                       
                                        htmlTable += "</td>";
                                }
                        }
                        htmlTable += "</tr>";
                        rowCount++;
                }
                htmlTable += "</table>";
               
                return htmlTable;
        }
        catch(e)
        {
                throw(e);
        }
}
 
function ASDamageCalculator(formData, combo, elementMultiplier, damageMultiplier)
{
        return Math.floor((formData["spiritBaseATK"] + formData["teamHipoATK"]) * ((formData["teamASATKBoost"] / 100.0) + (formData["teamSSATKBoost"] / 100.0) + formData["spiritSkillMultiplier"]) / 2 * elementMultiplier * (1 + combo * 0.01) * damageMultiplier / formData["numSplitATK"]);
}
 
function SSDamageCalculator(formData, combo, elementMultiplier, damageMultiplier)
{
        return Math.floor((formData["spiritBaseATK"] + formData["teamHipoATK"]) * ((formData["teamSSATKBoost"] / 100.0) + formData["spiritSkillMultiplier"]) * elementMultiplier * (1 + combo * 0.01) * damageMultiplier / formData["numSplitATK"]);
}