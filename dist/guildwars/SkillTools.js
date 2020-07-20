/* Skill Template Tools version 0.5alpha, an extension module of [[MediaWiki:TemplateTools.js]].
 * Depends on [[MediaWiki:SkillToolsOptions.js]] and [[MediaWiki:SkillToolsChanges.js]].
 * Licensed under BY-NC-SA 2.0 only.
 * An alternate GDFL licensed version is available elsewhere.
 * <pre> */

insertScript('MediaWiki:SkillToolsOptions.js');
insertScript('MediaWiki:SkillToolsChanges.js');

/* </pre>
== openSkillToolBox() ==
<pre> */

function openSkillToolBox(){
	var toolBox = document.getElementById('skill_tool_box');
	if (!toolBox) {
		createSkillToolBox();
	} else {
		toolBox.style.display='block';
	}
	document.getElementById('templateToolsDiv').style.display='none';
}

/* </pre>
== createSkillToolBox() ==
<pre> */

function createSkillToolBox(){
	var toolsDiv = createElement('div', [] , {'id':'skill_tools',
                                                   'style':'border:1px solid black; clear:both;'});
	toolsDiv.innerHTML = '<form id="skill_tool_box" name="skill_tool_box" action="javascript:return false;" onSubmit="return false;">\n'
		+ '<b>Skill Template Tools version 0.5alpha </b><a href="http://gw.gamewikis.org/wiki?title=MediaWiki_talk:SkillTools.js"> report a bug</a><br><hr>\n'
		+ '<a href="javascript:openTemplateToolBox(\'skill_tool_box\')">Return to main menu</a><br>\n'
		+ '<table width=100% style="background:transparent;">'
		+ '<tr><td width=50%>Name= <input type="text" name="SkillNameEn" size="32" MaxLen="32"></td>\n'
 		+ '<td width=25% style="border:1px dotted gray;"><input id="questability" type="checkbox" name="questability" onChange="questChange()"/>'
		+ '<label name="questLabel" id="questLabel" style="color:gray;" for="questability">Questable?</label>\n'
		+ '<img id="questMarker" src="http://gw.gamewikis.org/images/c/c0/Quest.png" style="display:none"></td>\n '
		+ '<td width=25%>Number of <span style="color:green;">effects</span>: <select name="effectCountSel" onChange="effectCountChange()">\n'
		+ '	<option value=0>0</option>\n'
		+ '	<option selected value=1>1</option>\n'
		+ '	<option value=2>2</option>\n'
		+ '	<option value=3>3</option>\n'
		+ '	<option value=4>4</option>\n'
		+ '</select></td></tr></table>\n'
		+ '<table width=100% style="background:transparent;">'
		+ '<tr style="white-space:nowrap;"><td width=25%>Campaign= <select name="CampaignSel" >\n'
		+ '	<option id="campSel0">Core</option>\n'
		+ '	<option id="campSel1">Prophecies</option>\n'
		+ '	<option id="campSel2">Factions</option>\n'
		+ '	<option id="campSel3">Nightfall</option>\n'
		+ '	<option id="campSelOther">Other</option>\n'
		+ '</select></td>\n' 
		+ '<td width=25%>Profession= <select name="ProfessionSel" onChange="profChange()">\n'
		+ '	<option id="profSelNone" value="">None</option>\n'
		+ '	<option id="profSelW">Warrior</option>\n'
		+ '	<option id="profSelR">Ranger</option>\n'
		+ '	<option id="profSelMo">Monk</option>\n'
		+ '	<option id="profSelN">Necromancer</option>\n'
		+ '	<option id="profSelMe">Mesmer</option>\n'
		+ '	<option id="profSelE">Elementalist</option>\n'
		+ '	<option id="profSelA">Assassin</option>\n'
		+ '	<option id="profSelRt">Ritualist</option>\n'
		+ '	<option id="profSelP">Paragon</option>\n'
		+ '	<option id="profSelD">Dervish</option>\n'
		+ '	<option id="profSelOther">Other</option>\n'
		+ '</select></td>\n'
		+ '<td width=25%>Attribute= <select width="8" name="AttributeSel">\n'
		+ profAttribs[0] + profAttribs[profAttribs.length-1] 
 		+ '</select></td>\n' 
		+ '<td width=25%>Skill type='
 		+ '<span style="border:1px dotted gray;"><input id="eliteness" type="checkbox" name="eliteness" onChange="eliteChange()"/>'
		+ '<label name="eliteLabel" id="eliteLabel" style="color:gray;" for="eliteness">Elite?</label></span>\n '
		+ '<select name="SkillTypeSel">\n'
		+ skillTypes[0]
 		+ '</select></td></tr>\n'
		+ '<tr style="white-space:nowrap;"><td >Casting Cost=<select name="costSel" onChange="costChange()" >\n'
		+ '	<option value="">None</option>\n'
		+ '	<option value="energy">Energy</option>\n'
		+ '	<option value="adrenaline">Adrenaline</option>\n'
		+ '</select>\n'
		+ '<input type="text" style="display:none;" name="costNum" size="2"><img name="costIcon" style="display:none;" src="http://gw.gamewikis.org/images/6/6e/Activation.png"></td>\n'
		+ '<td>Activation Time=<select name="castTime">\n'
		+ '	<option value="">0</option>\n'
		+ '	<option value="¼">¼</option>\n'
		+ '	<option value="½">½</option>\n'
		+ '	<option value="¾">¾</option>\n'
		+ '	<option value="1">1</option>\n'
		+ '	<option value="2">2</option>\n'
		+ '	<option value="3">3</option>\n'
		+ '	<option value="4">4</option>\n'
		+ '	<option value="5">5</option>\n'
		+ '	<option value="6">6</option>\n'
		+ '	<option value="7">7</option>\n'
		+ '	<option value="8">8</option>\n'
		+ '</select><img src="http://gw.gamewikis.org/images/6/6e/Activation.png"></td>\n'
		+ '<td>Recharge Time=<input type="text" name="rechargeNum" size="2"><img src="http://gw.gamewikis.org/images/6/61/Recharge.png"></td>\n'
		+ '<td>Other:<select name="miscSel" onChange="miscChange()"> \n'
		+ '	<option value="">None</option>\n'
		+ '	<option value="upkeep">Upkeep</option>\n'
		+ '	<option value="sacrifice">Sacrifice</option>\n'
		+ '	<option value="exhaustion">Exhaustion</option>\n'
		+ '	</select>'
		+ '	<input type="text" name="miscNum" style="display:none;" size="2">\n'
		+ '	<img name="miscIcon" style="display:none" src="http://gw.gamewikis.org/images/6/6e/Activation.png"></td></tr></table>\n'
		+ '<span valign=top>Desc=</span><textarea name="descText" id="descText" rows="4" style="width: 600px"></textarea>'
		+ '<table width=100% style="background:transparent;">'
		+ '<tr width=100% id="effect_0" style="display:none;"><td colspan=3>This skill\'s effect does not progress with any attribute increase.</td></tr>'
		+ '<tr width=100% id="effect_1" style="white-space:nowrap; ">'
		+ '	<td width=34%>Effect 1: <input type="text" id="effect1_partial" name="effect1_partial" value="" style="display:none;" size=8>'
		+ '	<select id="effect1Sel" name="effect1Sel" onChange="effectChange(1)">\n'
		+ 	effectTypes
		+ '	</select><input type="text" id="effect1_other" name="effect1_other" size=16>'
		+ '</td>'
		+ '<td width=33%>stats at 0 attribute rank=<input type="text" name="effect1_0" size="3"></td>'
		+ '<td width=33%>stats at 15 attribute rank=<input type="text" name="effect1_15" size="3"></td>'
		+ '</tr>'
		+ '<tr width=100% id="effect_2" style="white-space:nowrap; display:none;">'
		+ '	<td width=34%>Effect 2: <input type="text" id="effect2_partial" name="effect2_partial" value="" style="display:none;" size=8>'
		+ '	<select id="effect2Sel" name="effect2Sel" onChange="effectChange(2)">\n'
		+ 	effectTypes
		+ '	</select><input type="text" id="effect2_other" name="effect2_other" size=16>'
		+ '</td>'
		+ '<td width=33%>stats at 0 attribute rank=<input type="text" name="effect2_0" size="3"></td>'
		+ '<td width=33%>stats at 15 attribute rank=<input type="text" name="effect2_15" size="3"></td>'
		+ '</tr>'
		+ '<tr width=100% id="effect_3" style="white-space:nowrap; display:none;">'
		+ '	<td width=34%>Effect 3: <input type="text" id="effect3_partial" name="effect3_partial" value="" style="display:none;" size=8>'
		+ '	<select id="effect3Sel" name="effect3Sel" onChange="effectChange(3)">\n'
		+ 	effectTypes
		+ '	</select><input type="text" id="effect3_other" name="effect3_other" size=16>'
		+ '</td>'
		+ '<td width=33%>stats at 0 attribute rank=<input type="text" name="effect3_0" size="3"></td>'
		+ '<td width=33%>stats at 15 attribute rank=<input type="text" name="effect3_15" size="3"></td>'
		+ '</tr>'
		+ '<tr width=100% id="effect_4" style="white-space:nowrap; display:none;">'
		+ '	<td width=34%>Effect 4: <input type="text" id="effect4_partial" name="effect4_partial" value="" style="display:none;" size=8>'
		+ '	<select id="effect4Sel" name="effect4Sel" onChange="effectChange(4)">\n'
		+ 	effectTypes
		+ '	</select><input type="text" id="effect4_other" name="effect4_other" size=16>'
		+ '</td>'
		+ '<td width=33%>stats at 0 attribute rank=<input type="text" name="effect4_0" size="3"></td>'
		+ '<td width=33%>stats at 15 attribute rank=<input type="text" name="effect4_15" size="3"></td>'
		+ '</tr>'
		+ '</table>\n'
		+ '<div><span valign=top>Unparsed:</span><textarea name="unparsedText" id="unparsedText" rows="4" style="width: 600px"></textarea></div>'
		+ '<input id="skillTemplateInsert" name="skillTemplateInsert" type="submit" value="Inject (Form -> Template)" onClick="fillOutSkillTemplate()"/>\n'
		+ '<input id="skillTemplateExtract" name="skillTemplateExtract" type="submit" value="Load (Template -> Form)" onClick="extractSkillTemplate()"/>\n'
		+ '</form>\n';
	var editBuffer = document.getElementById("editform");
	editBuffer.parentNode.insertBefore(toolsDiv, editBuffer);
	extractSkillTemplate();
}

/* </pre>

== extractSkillTemplate() ==
<pre> */
/* The following function assumes the entire list of parameters for 
 * {{Skill box {{{1|}}} resides in its own article.  If it is within 
 * some other article, such is the case with most other types of info 
 * box templates (beastinfo, weapons, locations etc), then additional
 * extraction is needed.  See 
 *      http://guildwars.wikia.com/wiki/MediaWiki:SkillTools.js 
 * for an example. */
function extractSkillTemplate(){
	var input = document.editform.wpTextbox1.value;

	if(input.search(/\{\{Skill box \{\{\{1\|\}\}\}/i)!= -1) {
		openSkillToolBox();
		parseSkillTemplate(input);
		return true;
	}
	return false;	
}
/* </pre>

== fillOutSkillTemplate() ==
<pre> */
function fillOutSkillTemplate(){
	var toolBox = document.getElementById('skill_tool_box');
	var output = '{{Skill box {{{1|}}}|\n'
			+ 'name=' + toolBox.SkillNameEn.value + '|\n'
			+ 'campaign=' + toolBox.CampaignSel.value + '|\n'
			+ 'profession=' + toolBox.ProfessionSel.value + '|\n'
			+ 'attribute=' + toolBox.AttributeSel.value + '|\n'
			+ 'type=' + toolBox.SkillTypeSel.value + '|\n';
	if (toolBox.eliteness.checked){
		output = output + 'elite=yes|\n';
	} 
	if (toolBox.costSel.value){
		output = output + toolBox.costSel.value + '=' + toolBox.costNum.value + '|\n';
	}
	if (toolBox.castTime.value){
		output = output	+ 'activation=' + toolBox.castTime.value + '|\n'
	}
	if (toolBox.rechargeNum.value && toolBox.rechargeNum.value != 0){
		output = output	+ 'recharge=' + toolBox.rechargeNum.value + '|\n'
	}
	switch (toolBox.miscSel.value){
		case 'exhaustion':
			 toolBox.miscNum.value = 'yes';
		case 'upkeep':
		case 'sacrifice':
			output = output + toolBox.miscSel.value + '=' + toolBox.miscNum.value + '|\n';
		default:
	}
	output = output + 'description=' + toolBox.descText.value + '|\n'

	switch (toolBox.effectCountSel.value){
		case '4':
			output = output + 'progression_3_effect=' + toolBox.effect4_partial.value + toolBox.effect4Sel.value + toolBox.effect4_other.value 
					+ '|progression_3_0=' + toolBox.effect4_0.value + '|progression_3_15=' + toolBox.effect4_15.value + '|\n';
		case '3':
			output = output + 'progression_2_effect=' + toolBox.effect3_partial.value + toolBox.effect3Sel.value + toolBox.effect3_other.value 
					+ '|progression_2_0=' + toolBox.effect3_0.value + '|progression_2_15=' + toolBox.effect3_15.value + '|\n';
		case '2':
			output = output + 'progression_1_effect=' + toolBox.effect2_partial.value + toolBox.effect2Sel.value + toolBox.effect2_other.value 
					+ '|progression_1_0=' + toolBox.effect2_0.value + '|progression_1_15=' + toolBox.effect2_15.value + '|\n';
		case '1':
			output = output + 'progression_0_effect=' + toolBox.effect1_partial.value + toolBox.effect1Sel.value + toolBox.effect1_other.value 
					+ '|progression_0_0=' + toolBox.effect1_0.value + '|progression_0_15=' + toolBox.effect1_15.value + '|\n';
		default:
			output = output + toolBox.unparsedText.value + '}}\n';
	}
	document.editform.wpTextbox1.value = output;
}
/* </pre>

==  parseSkillTemplate(input) ==
<pre> */
function parseSkillTemplate(input){
	var toolBox = document.getElementById('skill_tool_box');

	var trimmed = input.replace(/\{\{Skill box/i,'').replace(/\{\{\{1\|\}\}\}/,'');
	trimmed = trimmed.replace(/\t/g,'').replace(/\n/g,'|').replace(/  /g,' ');
	trimmed = trimmed.replace(/ \|/g,'|').replace(/\| /g,'|').replace(/\|\|/g,'|');
	var assignments = trimmed.split('|');

	/* Merges piped links and templates that got split, by pre-pending the front to the back. */
	for (var i=0; i < assignments.length-1; i++){
		var myAssign = 	assignments[i];
		if ((myAssign.lastIndexOf('[[') > myAssign.lastIndexOf(']]')) 
		  ||(myAssign.lastIndexOf('{{') > myAssign.lastIndexOf('}}'))){
			assignments[i+1] = myAssign + '|' + assignments[i+1];
			assignments[i] = ''
		}
	}

	toolBox.SkillNameEn.value = extractParameter('name', assignments);
	toolBox.CampaignSel.value = extractParameter('campaign', assignments);
	toolBox.ProfessionSel.value = extractParameter('profession', assignments);
	profChange();
	toolBox.AttributeSel.value = extractParameter('attribute', assignments);
	toolBox.SkillTypeSel.value = extractParameter('type', assignments);
	if (extractParameter('elite', assignments) == 'yes'){	
		toolBox.eliteness.checked = true;
		eliteChange();
	}
	if (extractParameter('quest', assignments) == 'yes'){	
		toolBox.questability.checked = true;
		questChange();
	}

	var val1 = extractParameter('energy', assignments);
	if (val1){
		toolBox.costSel.value = 'energy';
		costChange()
		toolBox.costNum.value = val1;
	} else {
		val1 = extractParameter('adrenaline', assignments);
		if (val1){
			toolBox.costSel.value = 'adrenaline';
			costChange()
			toolBox.costNum.value = val1;
		} else {
			toolBox.costSel.value = '';
		}
	}

	var val2 =  extractParameter('activation', assignments);
	switch (val2){
		case '{{1/4}}':
			val2 = '¼';
			break;
		case '{{1/2}}':
			val2 = '½';
			break;
		case '{{3/4}}':
			val2 = '¾';
			break;
		default:
	}
	toolBox.castTime.value = val2;

	toolBox.rechargeNum.value = extractParameter('recharge', assignments);

	var val0 = extractParameter('upkeep', assignments);
	if (val0){
		toolBox.miscSel.value = 'upkeep';
		miscChange()
		toolBox.miscNum.value = val0;
	} else {
		val0 = extractParameter('sacrifice', assignments);
		if (val0){
			toolBox.miscSel.value = 'sacrifice';
			miscChange()
			toolBox.miscNum.value = val0;
		} else {
			val0 = extractParameter('exhaustion', assignments);
			if (val0 == 'yes' ){
				toolBox.miscSel.value = 'exhaustion';
				miscChange()
				toolBox.miscNum.value = val0;
			} else {
				toolBox.miscSel.value = '';
			}
		}
	}	

	toolBox.descText.innerHTML = extractParameter('description', assignments);

	var eff4 = extractParameter('progression_3_effect', assignments);
	var eff3 = extractParameter('progression_2_effect', assignments);
	var eff2 = extractParameter('progression_1_effect', assignments);
	var eff1 = extractParameter('progression_0_effect', assignments);
	var effCount = 0;
	if (eff4){
		effCount = 4;
	} else if (eff3){
		effCount = 3;
	} else if (eff2){
		effCount = 2;
	} else if (eff1){
		effCount = 1;
	} 
	toolBox.effectCountSel.value = effCount;
	effectCountChange()
	switch (effCount){
		case 4:
			toolBox.effect4_other.value = eff4;
			toolBox.effect4_0.value = extractParameter('progression_3_0', assignments);
			toolBox.effect4_15.value = extractParameter('progression_3_15', assignments);
		case 3:
			toolBox.effect3_other.value = eff3;
			toolBox.effect3_0.value = extractParameter('progression_2_0', assignments);
			toolBox.effect3_15.value = extractParameter('progression_2_15', assignments);
		case 2:
			toolBox.effect2_other.value = eff2;
			toolBox.effect2_0.value = extractParameter('progression_1_0', assignments);
			toolBox.effect2_15.value = extractParameter('progression_1_15', assignments);
		case 1:
			toolBox.effect1_other.value = eff1;
			toolBox.effect1_0.value = extractParameter('progression_0_0', assignments);
			toolBox.effect1_15.value = extractParameter('progression_0_15', assignments);
		default:
	}
	var unparsed = '';
	for (var j=0; j < assignments.length; j++){
		var assignTrimmed = trimString(assignments[j]);
		if (assignments[j].indexOf('=') != -1){
			unparsed = unparsed + '\t' + assignments[j] + '|\n';
		}
	}
	toolBox.unparsedText.value = unparsed;
}

/* </pre> */