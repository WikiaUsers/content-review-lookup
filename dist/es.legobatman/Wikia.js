/*<pre> MediaWiki:Wikia.js v1.4 */
/*SkinNotification: Agrega una notificaci�n para los que usen oasis. */
window.SkinNotification = {
	article: 'LEGO Batman 2: DC Super Heroes',
	key: 'NfSkin',
	init: function() {
		if (!document.cookie || document.cookie.length == 0) return;
		var pref = $.cookies.get(SkinNotification.key);
		if (pref) return;
		SkinNotification.render();
	},
	render: function() {
		var tb = $('#WikiaFooter').children('div.toolbar');
		if (!tb.exists()) return;
		var nf = $('#WikiaNotifications');
		if (!nf.exists()) {
			tb.prepend('<ul id="WikiaNotifications" class="WikiaNotifications"><li></li></ul>');
			nf = $('#WikiaNotifications');
			$(document.body).addClass('notifications');
		}
		var sn = $('<div data-type="100"><a class="sprite close-notification"></a>En junio 9 el lanzamiento del juego<a href="'+wgServer+wgArticlePath.replace('$1',SkinNotification.article.replace(/\s/g,'_'))+'" title="'+SkinNotification.article+'">Lego:DC Super H�roes</a>,no?,ju�galo ya!.</div>');
		nf.children().eq(0).append(sn);
		sn.children().eq(0).click(SkinNotification.dismiss);
	},
	dismiss: function(e) {
		$(e.target).parent().remove();
		$.cookies.set(SkinNotification.key,'1');
	}
};
 
function agregarEnlaceSkin() {
	if (!window.SkinPropagation) return;
	var url = SkinPropagation.parseURL(window.location.href);
	url.query.useskin = 'monobook';
	var surl = SkinPropagation.getURL(url);
	$('#WikiaFooter').children('div.toolbar').eq(0).children('ul.tools').eq(0).append('<li><a href="'+surl+'"><img width="15" height="15" class="monobook-icon" src="'+stylepath+'/common/blank.gif"/></a> <a href="'+surl+'" id="ca-changeskin" title="Ver con la piel Monobook">Cambiar la apariencia a Monobook</a></li>');
 
	$('#ca-changeskin').click(function(){
		alert('La apariencia cambiar� temporalmente a Monobook. Para ver el estilo por defecto deber�s quitar el "useskin=monobook" de la direcci�n de la p�gina que aparece en el navegador. Es recomendable que s�lo uses esta herramienta en los art�culos de cartas.');
	});
}
 
function _WikiaSkinLoad() {
	var ug = '';
	if (window.wgUserGroups) {
		ug = wgUserGroups.join(',').toLowerCase();
	}
	if (ug.indexOf('s'+'taf'+'f') == -1 && ug.indexOf('h'+'elp'+'er') == -1) {
		$(SkinNotification.init);
		$(agregarEnlaceSkin);
	}
}
 
_WikiaSkinLoad();
 
/***Botones del modo fuente***/
if (mwCustomEditButtons) { 
mwCustomEditButtons[mwCustomEditButtons.length] = { 
"imageFile": "http://es.maxsteel.wikia.com/wiki/Archivo:Steel.PNG", 
"speedTip": "Insertar Plantilla:Personaje", 
"tagOpen" : "\{\{Personaje\r| Nombre = ", 
"tagClose" : "\r| Sexo = \r| Especie = \r| Grupo = \r| Edad = \r| Serie = \r| Pel�culas = \r| Doblaje = \r| Primera aparicion = \r| Habilidades = \r| Posesiones = \r| enlace_Wikipedia = \r\}\}",
"sampleText": ""};


/***Botones del modo fuente originarios de Animal Grossing Enciclopedia***/
if (mwCustomEditButtons) { 
mwCustomEditButtons[mwCustomEditButtons.length] = { 
"imageFile": "http://images4.wikia.nocookie.net/__cb20090909213616/legobatman/images/6/64/Favicon.ico", 
"speedTip": "Insertar Plantilla:Personaje", 
"tagOpen" : "\{\{Personaje\r| nombre = ", 
"tagClose" : "\r| informaci�n = \r| Genero = \r| Apariciones = \r| Afiliaciones = \r| localizaci�n = \r| Nombre real = \r| }",
"sampleText": ""};