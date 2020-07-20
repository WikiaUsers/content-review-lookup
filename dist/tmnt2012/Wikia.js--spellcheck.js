addOnloadHook(addspCheck);

var spCheck = true;
 
function addspCheck () {
    $('<div class="module module_spellcheck" data-id="spellcheck"><h3 onclick="SwitchRail();"><span>Spell Check</span><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron collapse"/></h3><div class="module_content" style="display: block; "><p style="text-align:justify;"><object data=http://www.jspell.com/public-spell-checker-embed2.html width="325" height="205"> <embed src=http://www.jspell.com/public-spell-checker-embed2.html width="325" height="205"> </embed> Error: Embedded data could not be displayed. </object></p></div></div>').insertAfter('#EditPage .module_templates');
}