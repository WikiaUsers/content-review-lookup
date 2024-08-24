/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. */
/* Esto servir� para que las solicitudes de adopci�n molen m�s */
importScript("MediaWiki:Adopciones.js");
importScript("MediaWiki:Mentores.js");
importScript("MediaWiki:Dise�os.js");
importScript("MediaWiki:BotsRe.js");
importScript("MediaWiki:Parallax.js");

/* A�adir botones al editar art�culo en modo normal
 */
 if (typeof(mwCustomEditButtons) != 'undefined') {
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile" : "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip"  : "Proponer el art�culo para ser borrado",
     "tagOpen"   : "\{\{borrar|",
     "tagClose"  : "\}\}",
     "sampleText": "Motivo"};
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile" : "http://upload.wikimedia.org/wikipedia/commons/e/ec/Button_aviso.png?1",
     "speedTip"  : "Aviso de art�culo/archivo/blog inadecuado",
     "tagOpen"   : '{{Wikiacentral\n',
     "tagClose"  : "\n}}",
     "sampleText": "|Nombre del art�culo/archivo/blog que ser� borrado"};
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile" : "https://images.wikia.nocookie.net/es/images/8/8c/Bot%C3%B3n_wiki.png?1",
     "speedTip"  : "Insertar Plantilla Wiki",
     "tagOpen"   : "\{\{Wiki\r| wiki = ",
     "tagClose"  : "\r| logo = \r| descripci�n = \r| fundado = \r| fundador = \r| nombre_solicitado = \r| estado = \r\}\}",
     "sampleText": ""};
 }

/* Importaci�n del Chat a todas las pieles */
importScriptPage('MediaWiki:Chat.js', 'es.nickiminaj');

// Etiqueta Inactivo
InactiveUsers = { text: 'Flojeando' };
importScriptPage('InactiveUsers/code.js', 'dev');
// Refrescar autom�ticamente la WikiActividad y Cambios recientes
AjaxRCRefreshText = 'Act. autom�t.';
AjaxRCRefreshHoverText = 'Refrescar esta p�gina autom�ticamente';
ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
importScriptPage('AjaxRC/code.js', 'dev');

// Script para mostrar con etiquetas a los mejores editores
importArticles({
    type: 'script',
    articles: [
        'w:dev:TopEditors/code.js'
    ]
});
// Borrado r�pido
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': '...',
  'accesskey': '1',
  'label': 'Otra raz�n'};
fdButtons[fdButtons.length] = {
  'summary': 'El contenido de este art�culo no se relacionaba al tema de la comunidad',
  'accesskey': '1',
  'label': 'Sin relaci�n'};
fdButtons[fdButtons.length] = {
  'summary': 'El art�culo era considerado spam',
  'accesskey': '2',
  'label': 'Spam'};
fdButtons[fdButtons.length] = {
  'summary': 'Su creaci�n fue un acto vand�lico',
  'accesskey': '3',
  'label': 'Vandalismo'};
fdButtons[fdButtons.length] = {
  'summary': 'El contenido no era preciso, y pod�a tratarse de simples especulaciones',
  'accesskey': '4',
  'label': 'Mentiras'};
fdButtons[fdButtons.length] = {
  'summary': 'El contenido era fanon. Para publicar fan-fics v�ase [[w:c:es.stargatefanart|la comunidad fanon]]',
  'accesskey': '5',
  'label': 'Fanon'};
fdButtons[fdButtons.length] = {
  'summary': 'El art�culo era excesivamente corto. Puedes crear este art�culo siempre y cuando tenga la informaci�n suficiente.',
  'accesskey': '6',
  'label': 'Infra-esbozo'};
fdButtons[fdButtons.length] = {
  'summary': 'El contenido de este art�culo es repetido.',
  'accesskey': '1',
  'label': 'Art�culo repetido'};
fdButtons[fdButtons.length] = {
  'summary': 'El contenido es irrelevante para la wiki.',
  'accesskey': '1',
  'label': 'Irrelevante'};
importArticle({type: 'script', article: 'w:c:pintorsmeargle:MediaWiki:Common.js/borradoR�pido.js'});

/* Para desplegable */
var ShowHideConfig = { linkBefore:true };
importScriptPage('ShowHide/code.js', 'dev');

// ==============================
// BackToTopButton
// ==============================
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:-2px; border:none;"><button style=" font-size: 97%; height: 17px; line-height: 16px;" type="button" value="Volver Arriba" onClick="goToTop();">Volver Arriba</button></li>').appendTo('#WikiaBarWrapper .toolbar > ul.tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication
 
// **************************************************
//  Fin - BackToTopButton
// **************************************************

/** Desactivaci�n de pesta�a de editar en foros ******************************
 * Desactiva la pesta�a de editar en los temas m�s antiguos del foro, evitando 
 * que la gente pueda reabrir temas antiguos. Las paginas pueden ser editadas 
 * igualmente desde la pesta�a historial, etc, o escribiendo la direcci�n de 
 * editar manualmente.
 * Por [[User:Spang|Spang]]
 * Soporte para Monaco [[User:Uberfuzzy|Uberfuzzy]]
 * Soporte para Oasis [[User:Uberfuzzy|Uberfuzzy]]
 * Traducci�n al espa�ol [[User:Bola|Bola]]
 */
 if(wgNamespaceNumber == 110) {
  function disableOldForumEdit() {
 	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit ) {
 		return;
 	}
 	if( !document.getElementById('old-forum-warning') ) {
 		return;
 	}
 
 	if( skin == 'oasis' ) {
 		$("#WikiaPageHeader .wikia-menu-button li a:first").html('Archivado').removeAttr('href' );
 		$('#WikiaPageHeader .wikia-button').html('Archivado').removeAttr('href');
 		return;
 	}
 
 	if( !document.getElementById('ca-edit') ) {
 		return;
 	}
 	var editLink = null;
 	if( skin == 'monaco' ) {
 		editLink = document.getElementById('ca-edit');
 	} else if( skin == 'monobook' ) {
 		editLink = document.getElementById('ca-edit').firstChild;
 	} else {
 		return;
 	}
 	editLink.removeAttribute('href', 0);
 	editLink.removeAttribute('title', 0);
 	editLink.style.color = 'gray';
 	editLink.innerHTML = 'Archivado';
 
 	$('span.editsection-upper').remove();
  }
  $( disableOldForumEdit );
 }

/* Desabilita/Bloquea los comentarios para los blogs con m�s de 30 d�as sin comentarios.
 * por: [[User:Joeyaa|Joey Ahmadi]] y traducido al espa�ol: [[User:Bola|Bola]]
 */
 
 $(function() {
  if ( wgNamespaceNumber == 500 && $( '#article-comments-ul li' ).size() > 1 ) {
   var then = $( '#article-comments-ul > .SpeechBubble:first .permalink' ).attr( 'href' );
   then = new String(then.match(/\d{8}/));
   var monthnames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
   var year = then.match(/^\d{4}/);
   var month = then.substring( 4 , 6 ); 
   month--;
   month = monthnames[month];
   var day = then.match(/\d{2}$/);
   then = new Date( month + '' + day + ', ' + year ); 
   var old = parseInt( now - then );
   old = Math.floor( old / ( 1000 * 60 * 60 * 24 ) );
   if ( old > 30 ) {
    $( '#article-comm' ).attr( 'disabled' , 'disabled' ).text( 'Esta entrada de blog no ha sido comentada en los �ltimos 30 d�as, por lo que no es necesario a�adir nuevos comentarios.' );
    $( '#article-comm-submit' ).attr( 'disabled' , 'disabled' );
    $( '.article-comm-reply' ).remove();
   }
  }
 });