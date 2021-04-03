/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
/* Plegable */
importScriptPage('ShowHide/code.js', 'dev');
var ShowHideConfig = { 
    autoCollapse: 3
    es: {
	show: "mÃ�Â¡s",
	hide: "menos",
	showAll: "expandir todo",
	hideAll: "ocultar todo"
    }
};

/* Logo Aleatorio */
function RandomLogo() {
	var logoArray = new Array();
	logoArray[0] = 'http://images3.wikia.nocookie.net/__cb20100710003712/logocreation/es/images/b/bc/Wiki.png';
	logoArray[1] = 'http://';
        logoArray[2] = 'http://';
        logoArray[3] = 'http://';
	
	var chosenLogo = Math.round(Math.random() * (logoArray.length - 1));
	document.getElementById('wiki_logo').innerHTML = '<a accesskey="z" title="Portada [alt-shift-z]" href="/wiki/Creador_de_Logos_Wiki" style="background-image: url(' + logoArray[chosenLogo] + ');"/>';
}
addOnloadHook(RandomLogo);