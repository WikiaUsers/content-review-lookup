/* </pre>
== templateToolsInit() ==
<pre> */

function templateToolsInit() {
	if(queryString('action')!='edit' && queryString('action')!='submit') return;

	/* hides the hard-wired links provided by [[MediaWiki:NewArticleText]] which is used (new articles only) if the user disables Javascript */
	var hardlinkdiv = document.getElementById('template_tools_hard_links');
	if(hardlinkdiv) {
		hardlinkdiv.style.display = 'none';
	}

	var editBuffer = document.getElementById("editform");

	var debugDiv = document.createElement("div");
	debugDiv.id = 'debugDiv';
	editBuffer.parentNode.insertBefore(debugDiv, editBuffer);
	debugDiv.style.background='yellow';
	debugDiv.style.clear='both';
	debugDiv.style.display = 'none';

	var templateToolsDiv = document.createElement("div");
	templateToolsDiv.id = 'templateToolsDiv';
	templateToolsDiv.style.border = '1px solid black';
	templateToolsDiv.style.clear='both';
	templateToolsDiv.innerHTML = '<B>Template Tools version 0.5alpha </b>\n';
	templateToolsDiv.innerHTML = templateToolsDiv.innerHTML + '<a href="http://gw.gamewikis.org/index.php?title=MediaWiki_talk:TemplateTools.js"> report a bug</a><br><hr>\n';
	templateToolsDiv.innerHTML = templateToolsDiv.innerHTML + '<a href="javascript:autoDetectTemplate()">Auto-detect template</a><br>';

	/* Modular section.  Add additional tools for other templates here. */
	templateToolsDiv.innerHTML = templateToolsDiv.innerHTML + '&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:openSkillToolBox()">Skill template tool</a><br>';

	editBuffer.parentNode.insertBefore(templateToolsDiv, editBuffer);

}

addOnloadHook(templateToolsInit);


/* </pre>

== openTemplateToolBox(toolsDiv) ==
<pre> */

function openTemplateToolBox(toolsDiv) {
	document.getElementById('templateToolsDiv').style.display='block';
	document.getElementById(toolsDiv).style.display='none';
}

/* </pre>
== autoDetectTemplate() ==
<pre> */
/* Modular section.  Add additional tools for other templates here. */
function autoDetectTemplate(){
	if (extractSkillTemplate()){
		return;
	}
}
/* </pre>
== oneSplit(inputString, separator) ==
<pre> */
/* similar to split, but only at first occurance, and keep the rest intact */
function oneSplit(inputString, separator){
	var idx = inputString.indexOf(separator);
	if (idx == -1){
		return ['',''];
	}
	var car = inputString.slice(0, idx);
	var cdr = inputString.slice(idx+separator.length);
	return [car,cdr];
}
/* </pre>
== trimString(aString) ==
<pre> */
// Removes whitespaces from the beginning and the end of a string, but not the middle 
// Thanks Datrio for the quick help!
function trimString(aString){
	return aString.replace(/^\s+|\s+$/g, "");
}
/* </pre>
== extractParameter(paramName, assignments) ==
<pre> */
function extractParameter(paramName, assignments){
	var result = '';
	for (var i=0; i<assignments.length; i++){
		var myAssign = 	assignments[i];

		var Cons = oneSplit(myAssign,'=')
		var Car = trimString(Cons[0]);
		var Cdr = trimString(Cons[1]);
		if ( Car == (trimString(paramName)) && (Cdr != '') ){
			result = Cdr;
			assignments[i] = '';
		} 
	}
	return result;
}
/* </pre>

== debug(message) ==
<pre> */
function debug(message){
	var debugDiv = document.getElementById('debugDiv');
	debugDiv.style.display = 'block';
	debugDiv.innerHTML = debugDiv.innerHTML + '<br>' + message;

	/* since debugging, javascript is probably buggy, so turn non-javascript version back on (for new articles only) */
	var hardlinkdiv = document.getElementById('template_tools_hard_links');
	if(hardlinkdiv) {
		hardlinkdiv.style.display = 'block';
	}
}
/* </pre>
== doubleSplit(input,break1,break2) ==
<pre> */
/* Takes a string, break it at two locations by first occurance of two different criteria */
function doubleSplit(input,break1,break2){
	var ConsCons = oneSplit(input,break1);
	var Cons = oneSplit(ConsCons[1],break2);
	return [ConsCons[0], Cons[0], Cons[1]];
}
/* </pre>
== queryString(p) ==
<pre> */
/* Taken from wookiepdia */
function queryString(p) {
    var re = RegExp('[&?]' + p + '=([^&]*)');
    var matches;

    if(matches = re.exec(document.location)) {
        try {
            return decodeURI(matches[1]);
        }
        catch(e) { }
    }

    return null;
}

/* </pre> */