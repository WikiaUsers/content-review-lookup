/* Przycisk na górę strony - Skopiowane z TES Wiki */
 
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>')
};
addOnloadHook(ToTop);