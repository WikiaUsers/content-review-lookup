function SwitchModules() {
	$('#EditPage .module_spellcheck > .module_content').hide();
	$('#EditPage .module_spellcheck > h3').replaceWith('<h3 onclick="SwitchRail();" id="switchrail"><span>Spell Check</span><ul class="chevron expand"></ul></h3>');
}
 
addOnloadHook(SwitchModules);
 
function SwitchRail() {
	$('#EditPage .module_spellcheck > .module_content').show();
	$('h3#switchrail').replaceWith('<h3 onclick="SwitchInfo();" id="switchinfo"><span>Spell Check</span><ul class="chevron collapse"></ul></h3>');
}

function SwitchInfo() {
	$('#EditPage .module_spellcheck > .module_content').hide();
	$('h3#switchinfo').replaceWith('<h3 onclick="SwitchRail();" id="switchrail"><span>Spell Check</span><ul class="chevron expand"></ul></h3>');
}