/** Contador de Visitas **/
/* Agrega un contador en monobook y en oasis de visitas. */

$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:70%'>PÁGINAS VISTAS<br />DESDE MARZO DE 2011</td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=764066&counter=37' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:70%; background:transparent'>PÁGINAS VISTAS<br />DESDE MARZO DE 2011</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=764066&counter=24' alt='Contador' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});