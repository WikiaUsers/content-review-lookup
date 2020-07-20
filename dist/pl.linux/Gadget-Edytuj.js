// Autor: Copyright 2006, Marc Mongenet
// Licencja: http://www.gnu.org/licenses/gpl.html

addOnloadHook(function() {
 try {
	if (!(typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false)) return;
	var spans = document.getElementsByTagName("span");
	for (var s = 0; s < spans.length; ++s) {
		var span = spans[s];
		if (span.className == "editsection") {
			span.style.cssText = 'float: none; font-size: x-small; font-weight: normal; vertical-align: top;';
			span.parentNode.appendChild(document.createTextNode(" "));
			span.parentNode.appendChild(span);
		}
	}
 } catch (e) { /* błąd */ }
});