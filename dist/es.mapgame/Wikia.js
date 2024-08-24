// Etiqueta para usuarios inactivos por mas de 3 meses
InactiveUsers = { text: 'Inactivo' };
importScriptPage('InactiveUsers/code.js', 'dev');
// Para entrar al chat
$(function () {
		var a = document.getElementsByTagName('a');
		for(var i = 0; i < a.length; i++) {
			if(a[i].href && a[i].href.indexOf('/wiki/Special:Chat') != -1) {
				a[i].onclick = function(event) {event.preventDefault(); OpenChatWindow();}
			}
		}
		if(document.body.className.indexOf('skin-oasis') != -1) {window.chatcheck = setInterval('ChatCheck()', 200);}
	});
 
	function ChatCheck() {
		if($('.chat-join button').length != 0) {
			$('.chat-join button').replaceWith('<a class="wikia-button" onclick="OpenChatWindow()">' + $('.chat-join button').html() + '</a>');
			clearInterval(window.chatcheck);
		}
	}
 
	function OpenChatWindow() {
		window.chatwindow = window.open('/wiki/Special:Chat?useskin=wikia', 'chat');
 
	}
// Desactivar votaciones cuando el hilo est� cerrado
$(function() {
    if ($(".deleteorremove-infobox").is('*')) {
        $('input[name="wpVote"]').attr('disabled','disabled')
                                 .attr('value','Votaci�n finalizada');
    }
});

/* Men� de usuarios */
function subeEnlacesUtiles(){
  $('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');
}
addOnloadHook(subeEnlacesUtiles);
// No comentarios en entradas de blog antiguas
   // 30 d�as
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog no ha tenido actividad desde hace m�s de 30 d�as, por lo cual no puedes dejar comentarios ya que ser�a in�til.",
    nonexpiryCategory: "Blogs permanentes"
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});
// Actualizar p�gina
PurgeButtonText = 'Actualizar p�gina';
importScriptPage('PurgeButton/code.js', 'dev');
// Referencias pop-ups
importScriptPage('ReferencePopups/code.js', 'dev');
// IP de an�nimos
importScriptPage('RevealAnonIP/usercode.js', 'dev');
// Inspecci�n de hilos
importScriptPage('Thread Inspection/code.js', 'dev');
// Slider de tiempo
importScriptPage('TimedSlider/code.js', 'dev');
// Mejores editores
   // <div class="topeditors" data-te-namespace="" data-te-type="edit|new" data-te-show="" data-te-user="" data-te-limit="25" data-te-offset="7">generando lista...</div>
      // data-te-namespace: espacio de nombres, separar con barras "|"
      // data-te-type: tipo de ediciones a considerar, separar con barras "|"
         // Se pueden usar "edit" para ediciones, "new" para creaci�n de art�culos y "log" para registros
      // data-te-show: tipo de ediciones a ocultar, separar con barras "|"
         // Se pueden usar "minor" para ocultar ediciones menores, "bot" para ocultar ediciones de bot, "anon" para ocultar ediciones de an�nimos, "redirect" para ocultar redirecciones y "patrolled" para ocultar patrullajes
         // Agregar un signo de interrogaci�n "!" para ocultar opuestos, ejemplo: !minor
      // data-te-user: usuario espec�fico. No poner el prefijo de usuario:
      // data-te-limit: usuarios a mostrar
      // data-te-offser: d�as a tomar en cuenta
importScriptPage('TopEditors/code.js', 'dev');

// Etiqueta para consules
User:Xalisco = { text: 'Cons�l' };
User:Christian_Emperator = { text: 'Cons�l' };