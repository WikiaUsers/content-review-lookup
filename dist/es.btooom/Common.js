/* == Enlaces "editar" al lado del texto ==
Para desactivar, pon window.oldEditsectionLinks=1; en tu monobook.js
*/
function moveEditSection(){
	if (window.oldEditsectionLinks) return;
	$('span.editsection').each(function() {
		var $span = $(this), h = $span.closest('h1,h2,h3,h4,h5,h6');
		if (h.length) {
			$span.addClass('editsection-nf').appendTo(h);
		}
	});
}
 
(typeof(window.safeOnLoadHook)=='function'?safeOnLoadHook:$)(moveEditSection);