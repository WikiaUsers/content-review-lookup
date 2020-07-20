/* To be used with [[MediaWiki:SkillTools.js]].  Version 0.5alpha, licensed under BY-NC-SA 2.0 only.  An alternate GDFL licensed version is available elsewhere.  */

/* 
== effectCountChange() ==
<pre>*/

function effectCountChange(){
	var effectCount = document.getElementById('skill_tool_box').effectCountSel.selectedIndex;

	switch (effectCount){
		case 4:
			document.getElementById('effect_4').style.display = 'table-row';
		case 3:
			document.getElementById('effect_3').style.display = 'table-row';
		case 2:
			document.getElementById('effect_2').style.display = 'table-row';
		case 1:
			document.getElementById('effect_1').style.display = 'table-row';
			document.getElementById('effect_0').style.display = 'none';
		default:
	}
	switch (effectCount){
		case 0:
			document.getElementById('effect_0').style.display = 'table-row';
			document.getElementById('effect_1').style.display = 'none';
		case 1:
			document.getElementById('effect_2').style.display = 'none';
		case 2:
			document.getElementById('effect_3').style.display = 'none';
		case 3:
			document.getElementById('effect_4').style.display = 'none';
		default:
	}
}

/* </pre>
== profChange() ==
<pre>*/

function profChange() {
	var toolBox = document.getElementById('skill_tool_box');
	var profIndex = toolBox.ProfessionSel.selectedIndex;
	toolBox.AttributeSel.innerHTML = profAttribs[0] + profAttribs[profIndex];
	toolBox.SkillTypeSel.innerHTML = skillTypes[profIndex];
}
/* </pre>
==  eliteChange() ==
<pre>*/
function eliteChange(){
	var toolBox = document.getElementById('skill_tool_box');
	if (toolBox.eliteness.checked) {
		toolBox.style.background = 'gold';
		document.getElementById('eliteLabel').style.color = 'black'
	} else {
		toolBox.style.background = 'transparent';
		document.getElementById('eliteLabel').style.color = 'gray'
	}
}
/* </pre>
==  questChange() ==
<pre>*/
function questChange(){
	var toolBox = document.getElementById('skill_tool_box');
	if (toolBox.questability.checked) {
		document.getElementById('questMarker').style.display = 'inline'
		document.getElementById('questLabel').style.color = 'black'
	} else {
		document.getElementById('questMarker').style.display = 'none'
		document.getElementById('questLabel').style.color = 'gray'
	}
}
/* </pre>

== costChange() ==
<pre>*/
function costChange(){
	var toolBox = document.getElementById('skill_tool_box');
	switch (toolBox.costSel.selectedIndex){
		case 0:
			toolBox.costIcon.style.display = "none";
			toolBox.costNum.style.display = "none";
			break;
		case 1:
			toolBox.costIcon.style.display = "inline";
			toolBox.costIcon.src = "http://gw.gamewikis.org/images/a/a9/Energy.png";
			toolBox.costNum.style.display = "inline";
			toolBox.costNum.size = 2;
			break;
		case 2:
			toolBox.costIcon.style.display = "inline";
			toolBox.costIcon.src = "http://gw.gamewikis.org/images/e/e3/Adrenaline.png";
			toolBox.costNum.style.display = "inline";
			toolBox.costNum.size = 8;
			break;
	}
}
/* </pre>
== miscChange() ==
<pre>*/
function miscChange(){
	var toolBox = document.getElementById('skill_tool_box');
	switch (toolBox.miscSel.selectedIndex){
		case 0:
			toolBox.miscIcon.style.display = "none";
			toolBox.miscNum.style.display = "none";
			toolBox.miscNum.value = "";
			break;
		case 1:
			toolBox.miscIcon.style.display = "inline";
			toolBox.miscIcon.src = "http://gw.gamewikis.org/images/4/4a/Upkeep.png";
			toolBox.miscNum.style.display = "inline";
			toolBox.miscNum.value = "-1";
			break;
		case 2:
			toolBox.miscIcon.style.display = "inline";
			toolBox.miscIcon.src = "http://gw.gamewikis.org/images/1/18/Sacrifice.png";
			toolBox.miscNum.style.display = "inline";
			break;
		case 3:
			toolBox.miscIcon.style.display = "inline";
			toolBox.miscIcon.src = "http://gw.gamewikis.org/images/8/88/Exhaustion.png";
			toolBox.miscNum.style.display = "none";
			toolBox.miscNum.value = "";
			break;
	}
}
/* </pre>
== effectChange(row) ==
<pre>*/
function effectChange(row){
	var toolBox = document.getElementById('skill_tool_box');
	var prefix = 'effect'+row;
	var partial = document.getElementById(prefix+'_partial');
	var other = document.getElementById(prefix+'_other');
	switch (document.getElementById(prefix + 'Sel').value){
		case 'Gain':
		case 'Loss':
		case 'More(%)':
		case 'Less(%)':
			partial.style.display = 'inline';
			partial.value = other.value;
			other.style.display = 'none';
			other.value = '';
			break;
		case '':
			other.style.display = 'inline';
			other.value = partial.value;
			partial.style.display = 'none';
			partial.value = '';
			break;
		default:
			other.style.display = 'none';
			other.value = '';
			partial.style.display = 'none';
			partial.value = '';
	}
}
/* </pre> */