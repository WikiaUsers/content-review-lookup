// ============================================================
// wikiSiteMeter
// 
// Function: Adds a counter from http://www.sitemeter.com/
// ============================================================
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:70%'>CONTADOR DE VISITAS<br />DESDE JULIO DE 2011</td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=806792&counter=29' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:70%; background:transparent'>P�GINAS VISTAS<br />DESDE MARZO DE 2011</td></tr><tr><td><a target='_top'><img src='http://aux01.contadorgratis.com/hitv4.php?digit=7seg&page=f4881e985f9e591fa82b21a821e05511' alt='Contador' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});


/* switch.js */
importScript('MediaWiki:Common.js/switch.js');