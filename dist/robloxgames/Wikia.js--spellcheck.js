function addspCheck () {
    $('<div class="module module_spellcheck" data-id="spellcheck"><h3 onclick="SwitchRail();"><span>Spell Check</span><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron collapse"/></h3><div class="module_content" style="display: block; "><p style="text-align:justify;"><object data=http://www.jspell.com/public-spell-checker-embed2.html width="325" height="205"> <embed src=http://www.jspell.com/public-spell-checker-embed2.html width="325" height="205"> </embed> Error: Embedded data could not be displayed. </object></p></div></div>').insertAfter('.module_templates');
}
addOnloadHook(addspCheck);

function SwitchModules() {
	$('#EditPage .module_spellcheck > .module_content').hide();
	$('#EditPage .module_spellcheck > h3').replaceWith('<h3 onclick="SwitchRail();" id="switchrail"><span>Spell Check</span><ul class="chevron expand"></ul></h3>');
}
 
addOnloadHook(SwitchModules);
 
function SwitchRail() {
	$('#EditPage .module_spellcheck > .module_content').slideDown("slow");
	$('h3#switchrail').replaceWith('<h3 onclick="SwitchInfo();" id="switchinfo"><span>Spell Check</span><ul class="chevron collapse"></ul></h3>');
}

function SwitchInfo() {
	$('#EditPage .module_spellcheck > .module_content').slideUp("slow");
	$('h3#switchinfo').replaceWith('<h3 onclick="SwitchRail();" id="switchrail"><span>Spell Check</span><ul class="chevron expand"></ul></h3>');
}