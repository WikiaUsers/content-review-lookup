/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

// ============================================================ \\
// Contador de visitas                                          \\
// Idea: Benfutbol10 [Giovi] ((CC-BY-SA))                       \\
// ============================================================ \\
 
$(function() {
	if(skin == "oasis") {
		var $sidebar = $('.WikiaPagesOnWikiModule:first');
		var comboString = "<div style='margin-top:5px; align:center'><table style='width:100%'><td style='font-size:100%'>VISITANTES<br />DESDE JULIO DE 2011 </td><td style='text-align:right'><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=907298&counter=37' alt='Contador' border=0 /></a></td></tr></table></div>";
 
		$sidebar.html($sidebar.html() + comboString);
	} else if(skin == "monobook") {
		var $sidebar = $('#p-wikicities-nav');
		var comboString = "<div style='margin:5px'></div><h5>Contador</h5><div class='pBody'><div style='margin-top:2px; margin-bottom:5px'><table style='width:100%; text-align:center'><tr><td style='font-size:100%; background:transparent'>VISITANTES<br />DESDE JULIO DE 2011</td></tr><tr><td><a target='_top'><img src='http://contador-de-visitas.com/hit.php?id=907298&counter=37' alt='Contador' border=0 /></a></td></tr></table></div></div>";
		$sidebar.html($sidebar.html() + comboString);
	}
});

/* BOTONES EXTRAS */
/******************/
 if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images3.wikia.nocookie.net/__cb20110703182031/fantasy/es/images/4/49/Bot%C3%B3n_Activa.png",
     "speedTip": "Página Activa",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Activa"};
    }
if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images4.wikia.nocookie.net/__cb20110703182145/fantasy/es/images/8/8a/Bot%C3%B3n_Inactiva.png",
     "speedTip": "Página Inactiva",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Inactiva"};
    }
if (typeof(mwCustomEditButtons) != 'undefined') {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images3.wikia.nocookie.net/fantasy/es/images/f/fe/Bot%C3%B3n_Cancelada.png",
     "speedTip": "Página Cancelada",
     "tagOpen": "\{\{",
     "tagClose": "\}\}",
     "sampleText": "Cancelada"};