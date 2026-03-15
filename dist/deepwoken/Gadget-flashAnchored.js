window.onhashchange = function() {
	try{
	var hash = $.escapeSelector(decodeURI(window.location.hash.substring(1)).replaceAll(' ', '_'));
	flash($('#'+hash));
	}catch(e){}
}

if (window.location.hash.length > 0) {
	window.onhashchange();
} 


function findFlashable($element) {
	var flashable = [ 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'li', 'div' ];

	if ($.inArray($element.prop('tagName'), flashable) < 0) { 
		var $newElement;

		$.each(flashable, function(_, val) {
			$newElement = $element.closest(val);

			if ($newElement.length > 0) {
				return false;
			}
		});

		return $newElement;
	}

	return $element;
}

function flash($element) {
	// Check if the element is suitable for flashing, otherwise find a suitable parent 
	$element = findFlashable($element);

	// Reset any existing flashed elements
	$('.flash-anchored').removeClass("flash-anchored");

	$element.addClass("flash-anchored");
}