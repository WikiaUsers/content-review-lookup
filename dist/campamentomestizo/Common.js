/*  http://dev.wikia.com/wiki/Countdown by [[User:Splarka]] [[User:Eladkse]] */
importScriptPage('Countdown/code.js', 'dev');

/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

function initVisibility() {
	var storage = globalStorage[window.location.hostname];
 
	var page = window.pageName.replace(/\W/g,'_');
	var show = storage.getItem('infoboxshow-' + page);
 
	if( show == 'false' ) {
		infoboxToggle();
	}
 
	var hidables = getElementsByClass('hidable');
 
	for(var i = 0; i < hidables.length; i++) {
		show = storage.getItem('hidableshow-' + i  + '_' + page);
 
		if( show == 'false' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display != 'none' )
			{
				button[0].onclick('bypass');
			}
		} else if( show == 'true' ) {
			var content = getElementsByClass('hidable-content', hidables[i]);
			var button = getElementsByClass('hidable-button', hidables[i]);
 
			if( content != null && content.length > 0 &&
				button != null && button.length > 0 && content[0].style.display == 'none' )
			{
				button[0].onclick('bypass');
			}
		}
	}
}

/* Añadir botones extra de edición */
if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135211/es.starwars/images/2/29/Button_user.png",
     "speedTip": "Plantilla Personaje",
     "tagOpen": "{{Personaje\n|hide1         = \n|título1       = \n|título2       = \n|título3       = \n|hide2         = \n|imagen        = \n|nombre        =",
     "tagClose": " \n|nacimiento    = \n|fallecimiento = \n|alias         = \n|género        = \n|especie       = \n|familia       = \n|estatus       = \n|pelo          = \n|ojos          = \n|piel          = \n|estatura      = \n|hide3         = \n|armas         = \n|afiliación     = \n|hogar         = \n|griega/romana = \n|hide4         = \n|apariciones   = \n|actor         = \n}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120218201007/es.starwars/images/3/30/Boton_lugar.png",
     "speedTip": "Plantilla Lugar",
     "tagOpen": "{{Lugar\n|nombre     = ",
     "tagClose": "\n|imagen     = \n|imagewidth = \n|caption    = \n|hide1      = \n|Ubicación  = \n|Tipo       = \n|Residentes = \n|Afiliación  = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Plantilla Especie",
     "tagOpen": "{{Especie\n|nombre                = ",
     "tagClose": "\n|imagen                = \n|imagenwidth           = \n|caption               = \n|hide1                 = \n|Alias                 = \n|Piel                  = \n|Ojos                  = \n|Pelo                  = \n|Plumas                = \n|Color                 = \n|Nativo                = \n|Altura                = \n|Afiliación             = \n|Miembros Destacados   = \n|Familia               = \n|Estado                = \n}}",
     "sampleText": ""};

 }