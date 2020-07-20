/* Przycisk na górę strony - Skopiowane z TES Wiki */
 
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Na górę strony</a></li>')
};
addOnloadHook(ToTop);