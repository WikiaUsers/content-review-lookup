/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
// ============================================================
// ============================================================
/*---------------------------MENÚ EDICIÓN PERSONALIDAZDO-------------------------------------

Extraído de http://es.starwars.wikia.com/wiki/MediaWiki:Common.js

--------------------------------------------------------------------------------*/
/* Añadir botones extra de edición--*/
if (mwCustomEditButtons) {
/* 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/3/36/Icono_Tramas.png",
     "speedTip": "Plantilla Tramas",
     "tagOpen": "{{Trama\n|url            =\n|foro           = \n|nombre         =\n|tierra         =\n|autores        ={{a|}} \n|diai           =\n|mesi           =\n|añoi           =\n|diaf           =\n|mesf           =\n|añof           =\n\n|grupos         =\n\n|pjp            =\n|pjs            =\n|villanos       =\n|otros          =\n|dispositivos   =\n|localizaciones =\n\n|resumen        = \n|trama           = ",
     "tagClose": "\n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/e/e4/Icono_Tramas_Autores.png",
     "speedTip": "Autores en Trama",
     "tagOpen": "{{a|",
     "tagClose": "}}",
     "sampleText": "Autor"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/e/ea/Icono_Tramas_Grupos.png",
     "speedTip": "Grupos en Trama",
     "tagOpen": "{{Gt|",
     "tagClose": "|Trama Anterior|Trama Siguiente}}",
     "sampleText": "Grupo"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/8/8e/Icono_Tramas_Pj.png",
     "speedTip": "Personajes en Trama",
     "tagOpen": "{{t|",
     "tagClose": "|Alias|Tierra}}",
     "sampleText": "Personaje"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/7/7b/Icono_Personaje.png",
     "speedTip": "Plantilla Personajes",
     "tagOpen": "{{Personaje\n|imagen         =\n|nreal          =\n|orden          =\n|alias          =\n|oalias         =\n|parientes      =\n|grupo          =\n\n|estado marital =\n|estado         =\n\n|genero         =\n|especie        =\n|peso           =\n|altura         =\n|ojos           =\n|pelo           =\n|piel           =\n|etnia          =\n|rasgos         =\n\n|ciudad         =\n|pais           =\n|autor          =\n|edad           =\n\n|primera        =\n|ultima         =\n\n|historia       =\n|powergrid      =\n\n|poderes        =\n|habilidades    =\n|equipo         =\n|limitacion     =\n\n|psicologiaext  =\n|psicologiaint  =\n|psicologiagen  =",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/f/f7/Icono_Personaje_Grupo.png",
     "speedTip": "Grupos en Personaje",
     "tagOpen": "{{g|",
     "tagClose": "|tierra=}}",
     "sampleText": "Nombre del Grupo"};
----*/
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/2/29/Icono_Personaje_Powergrid.png",
     "speedTip": "Powergrid en Personaje",
     "tagOpen": "{{Powergrid\n| Caso            = \n| Inteligencia    = \n| Fuerza          = \n| Velocidad       = \n| Resistencia     = \n| Proyeccion      = \n| Lucha           = \n| Explicacion     =",
     "tagClose": "\n}}",
     "sampleText": ""};
/*
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/8/85/Icono_Desambiguacion.png",
     "speedTip": "Plantilla Desambiguaciones",
     "tagOpen": "{{Desambiguación\n|imagen          =\n|personaje       = \n|tierra          =\n|descripción     = \n|alt             ={{d|}}\n|otros           =\n|relacionados    =",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/3/3b/Icono_Desambiguacion_Pj.png",
     "speedTip": "Personajes en Desambiguación",
     "tagOpen": "{{d|",
     "tagClose": "|Tierra|Nombre de la Tierra\n|imagen   =\n|alias    =\n|link     =\n|relacion =\n}}",
     "sampleText": "Nombre"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135211/es.starwars/images/2/29/Button_user.png",
     "speedTip": "Plantilla Usuarios",
     "tagOpen": "{{Usuario\n|imagen = \n|foro   = \n|nreal  = \n|genero = \n|pais   = \n|dia    = \n|mes    = \n|año    = \n|avatar = \n|firma  = \n|pj     = \n|otros  = \n|usuario = \n|facebook   =ID de Facebook\n|twitter    =ID de Twitter\n|youtube    =User de Youtube\n|deviantart =User de Deviantart\n|google+    =Id de Google+\n|tumblr     =User de Tumblr\n|blogger    =URL de Blogger\n|skype      =URL de Blogger",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/5/56/Icono_Grupos.png",
     "speedTip": "Plantilla Grupos",
     "tagOpen": "\{{Grupo\n|imagen    = \n|nombre    = \n|onombre   = \n|activo    = \n|alineacion= \n\n|base      = \n|lider     = \n|actual    = \n|formal    = \n|aliados   = \n|enemigos  = \n|autor     = \n\n|primera   = \n|ultima    = \n\n|creacion  = \n|historia  = \n|equipo    = \n|transporte= \n|armas     = \n",
     "tagClose": "}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Imagenes",
     "tagOpen": "{{Imagen|\n|",
     "tagClose": "\n|GRUPOS|url       =\n|dibujante = \n|colorista =\n}}",
     "sampleText": "{{i|Nombre|tierra}}"};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135209/es.starwars/images/6/62/Button_desambig.png",
     "speedTip": "Plantilla Desambiguaciones de Grupos",
     "tagOpen": "{{DesambiguaciónG\n|imagen          = \n|grupo           = \n|tierra          = \n|descripción     = \n|alt             = {{d|}}\n|otros           = \n|relacionados    = ",
     "tagClose": "}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/7/73/Botón_planeta.png",
     "speedTip": "Plantilla Tierras",
     "tagOpen": "{{{{Tierra\n|alias           = \n|imagen          = \n|autor           = nombre autor-nombre autor-...\n|dia             = \n|mes             = \n|año             = \n|primera         = \n|ultima          = \n|historia        = \n|caracteristicas = \n|linea temporal  = \n|localizaciones  = \n|personajes      = \n|notas           = \n}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120218201007/es.starwars/images/3/30/Boton_lugar.png",
     "speedTip": "Plantilla Lugar",
     "tagOpen": "{{Lugar\n|imagen = \n|size = \n|nombres = \n|localizacion = \n|autor = \n|historia = \n|descripcion = \n|afiliación = }}",
     "tagClose": "",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214148/es.starwars/images/1/13/Botón_ciudad.png",
     "speedTip": "Plantilla Ciudad",
     "tagOpen": "{{Ciudad\n|fondoimagen  =\n|imagen       =\n|nombre       =",
     "tagClose": "\n|construido   =\n|destruido    =\n|reconstruido =\n|constructor  =\n|planeta      =\n|continente   =\n|localizacion =\n|clima        =\n|interes      =\n|poblacion    =\n|era          =\n|afiliacion   =\n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/4/44/Button_comillas_latinas.png",
     "speedTip": "Referencia",
     "tagOpen": "<ref>",
     "tagClose": "</ref>",
     "sampleText": "Razón"};
--*/
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Inserta texto"};
/*
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/6/64/Botón_categor%C3%ADa.png",
     "speedTip": "Categoría",
     "tagOpen": "[[Categoría:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nombre categoría"};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
     "speedTip": "Plantilla Información",
     "tagOpen": "{{Información\n|atencion=\n|descripcion=",
     "tagClose": "\n|fuente=\n|autor=\n|retoques=\n|licencia=\n|otras versiones=\n}}",
     "sampleText": ""};
--*/ 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Proponer el artículo para ser borrado",
     "tagOpen": "{{Borrar|",
     "tagClose": "}}",
     "sampleText": "Motivo"};

    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/1/11/Marcador.png",
     "speedTip": "Añadir un marcador de Usuario",
     "tagOpen": "{{marcador|",
     "tagClose": "}}",
     "sampleText": "Usuario"}; 

    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
     "speedTip": "Posterior revisión",
     "tagOpen": "{{Esbozo",
     "tagClose": "}}"};
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/b/ba/Boton_tres_puntos.png",
     "speedTip": "3 puntos",
     "tagOpen": "…",
     "tagClose": ""}; 
     
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/neoxadventures/es/images/7/78/Boton_.png",
     "speedTip": "guion",
     "tagOpen": "—",
     "tagClose": ""};    
} 
 
document.write('<script type="text/javascript" src="' + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript"></script>');

/*************************************************************/
/****                   Comentarios de fb                 ****/
/****https://developers.facebook.com/docs/plugins/comments/***/
/*************************************************************/

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1&appId=607147322650183";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/***************************************************/
/**** Impedir el renombrado de página de usuario****/
/****            De es.pokemon.wikia.com         ***/
/***************************************************/
function disableUserpageMove() {
	var url = window.location.toString();
	var pn = mw.config.get('wgPageName', '');
	var pos = url.indexOf(pn);
	if (pos == -1) {
		url = decodeURIComponent(url);
	}
	pos = url.indexOf(pn);
	if (pos == -1) return; // fail :(
	var page = url.substr(url.indexOf(pn)+pn.length+1);
	pos = page.indexOf('?');
	if (pos != -1) {
		page = page.substr(0, pos);
	}
	pos = page.indexOf('/');
	if (pos != -1) {
		// Si hay barra es que se está trasladando una subpágina. Ok, lo permitimos
		return;
	}
	// Es página de usuario?
	var re_user = new RegExp('^(user|'+mw.config.get('wgFormattedNamespaces')['2']+'):', 'i');
	if (re_user.test(page)) {
		// Excluir admin y otros
		for (var i = 0; i < mw.config.get('wgUserGroups', []).length; i++) {
			if (mw.config.get('wgUserGroups')[i] == 'sysop' || mw.config.get('wgUserGroups')[i] == 'asistente' || mw.config.get('wgUserGroups')[i] == 'rollback') {
				return true;
			}
		}
		window.location = mw.config.get('wgArticlePath', '').replace('$1', 'Ayuda:Renombrar_mi_cuenta');
	}
}
 
if (mw.config.get('wgCanonicalSpecialPageName', '') == 'Movepage') {
	try {
		disableUserpageMove();
	} catch(e) {
		typeof(window.trataError)=='function'&&trataError(e);
	}
}


/***************************************************/
/****                FloatingToc                ****/
/****   http://dev.wikia.com/wiki/FloatingToc    ***/
/***************************************************/
/*Retirado momentaneamente hasta solucionar errores
importArticles({
    type: 'script',
    articles: [
        'u:dev:FloatingToc/code.js'
    ]
});*/