/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importArticles({
    type: "script",
    articles: [
        "u:dev:MediaWiki:Medals/code.js"
    ]
});

// Nombreusuario
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);

// Etiqueta Inactivo
window.InactiveUsers = { text: 'Retirado' };

// AutoRefreshing RecentChanges and WikiActivity
 
window.AjaxRCRefreshText = 'Act. automát.';
window.AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
window.ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Comunidad"];

/* Añadir botones extra de edición */
if (mwCustomEditButtons) {

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/3/39/Boton_Futbolista.png",
     "speedTip": "Infobox Futbolista",
     "tagOpen": "{{Infobox Futbolista\n|Nombre = \n|imagen        = \n|comentario_imagen        =",
    
     "tagClose": "\n|nombrecompleto    = \n|ID = \n|apodo     = \n|fecha nacimiento = \n|edad = \n|lugar nacimiento  = \n|país        = \n|nacionalidad  = \n|nac_deportiva    = \n|altura   = \n|peso     = \n|fecha fallecimiento    = \n|lugar fallecimiento        = \n|familia = \n|inicio_0       = \n|equipo_debut_0           = \n|club_0       = \n|número_0           = \n|liga_0    = \n|inicio    = \n|equipo_debut    = \n|retiro    = \n|equipo_retiro    = \n|posición    = \n|cantera    = \n|club    = \n|club2    = \n|club3    = \n|número    = \n|liga    = \n|liga2    = \n|goles_clubes = \n|selección   = \n|selección_inf    = \n|veces internacional   = \n|goles internacional    = \n|mundiales    = \n|clubes    = \n|facebook    = \n|twitter    = \n|otrared    = \n|titulos = \n|demovideo    = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/4/4d/Boton_DT.png",
     "speedTip": "Infobox DT",
     "tagOpen": "{{Infobox Director Técnico\n|Nombre = \n|imagen        = \n|comentario_imagen = ",
     "tagClose": "\n|nombre completo    = \n|ID = \n|apodo     = \n|fechadenacimiento = \n|ciudaddenacimiento  = \n|paisdenacimiento        = \n|fechadefallecimiento  = \n|lugardefallecimiento    = \n|familia = \n|clubactual   = \n|añodebut     = \n|clubdebut    = \n|añoretiro        = \n|clubretiro       = \n|equiposdirigidos           = \n|titulosganados       = \n|selecciones           = \n|titulosganadosselec    = \n|mundiales    = \n|facebook = \n|twitter = \n|otrared = \n|antecesor    = \n|sucesor    = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/3/3b/Boton_Equipo.png",
     "speedTip": "Infobox Equipo Fut",
     "tagOpen": "{{Infobox Equipo de Fútbol\n|Nombre = \n|imagen        = \n|comentario_imagen = ",
     "tagClose": "\n|nombrecompleto    = \n|NUI = \n|nombreanterior    = \n|nombrefmf    = \n|apodo     = \n|equipos    = \n|fundacion = \n|refundacion = \n|desaparicion        = \n|propietario  = \n|presidente    = \n|dir-deportivo = \n|entrenador  = \n|estadio     = \n|ubicacion    = \n|capacidad        = \n|filial       = \n|liga           = \n|liga2       = \n|liga-f = \n|posición           = \n|copa    = \n|posición2    = \n|continental    = \n|posición3    = \n|internacional    = \n|posición4    = \n|sitioweb    = \n|canaltv    = \n|titulos_equipo    = \n|uniformes    = \n|facebook    = \n|twitter    = \n|otrared    = \n|facebook-h = \n|twitter-h = \n|NUI anterior/es = \n|himno = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/f/fd/Boton_Estadio.png",
     "speedTip": "Infobox Estadio",
     "tagOpen": "{{Infobox Estadio\n|Nombre = \n|imagen        = \n|comentario_imagen = ",
     "tagClose": "\n|nombre completo    = \n|nombre anterior    = \n|apodo     = \n|localización = \n|propietario = \n|superficie        = \n|dimensiones  = \n|capacidad    = \n|costo   = \n|inicio     = \n|término    = \n|apertura        = \n|remodelación       = \n|ampliación           = \n|reconstrucción       = \n|cierre           = \n|demolición    = \n|arquitecto    = \n|equipo local    = \n|anteriores equipos    = \n|acontecimientos    = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/b/b2/Boton_TV.png",
     "speedTip": "Infobox Canal TV",
     "tagOpen": "{{Infobox Canal de Televisión\n|nombre = \n|logo        = \n|logo_pie = ",
     "tagClose": "\n|nombre público   = \n|eslogan          = \n|tipo de canal    = \n|programación     = \n|propietario      = \n|operado por      = \n|país             = \n|fundación        = \n |fundador         = \n|inicio de transmisiones = \n|cese de transmisiones = \n|indicativo de señal = \n|indicativos de señales anteriores = \n|significado del indicativo de señal = \n|personas clave   = \n|locutor = \n|formato de imagen = \n |área de transmisión = \n|ubicación        = \n|nombres anteriores = \n|nombre de canales reemplazados = \n |reemplazado por = \n|canales hermanos = \n|nombres tipo de señal  = \n|pagoficial = \n|disponibilidad = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/0/04/Boton_Periodista.png",
     "speedTip": "Infobox Periodista",
     "tagOpen": "{{Infobox Periodista\n|nombre = \n|imagen        = \n|comentario_imagen = ",
     "tagClose": "\n|apodo     = \n|nombre de nacimiento  = \n|fecha de nacimiento   = \n|lugar de nacimiento   = \n|residencia            = \n|fecha de defunción    = \n|lugar de defunción    = \n|tiempo                = \n|cónyuge               = \n|pareja                = \n|hijos                 = \n|alma mater            = \n|programas             = \n|medio de comunicación = \n|diarios = \n|obras                 = \n|sitio web             = \n|twitter               = \n|facebook              = \n|otrasredes            = \n|premios               = \n|demo                  = \n}}",
     "sampleText": ""};

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/4/41/Boton_Arbitro.png",
     "speedTip": "Infobox Árbitro",
     "tagOpen": "{{Infobox Árbitro\n|nombre = \n|imagen        = \n|comentario_imagen = ",
     "tagClose": "\n|nombre completo          = \n| apodo                    = \n| fecha de nacimiento      = \n| lugar de nacimiento      = \n| fecha de fallecimiento   = \n| lugar de fallecimiento   = \n| nacionalidad             = \n| residencia               = \n| función                  = \n| categoría                = \n|comité                   = \n| año de debut             = \n | año de retiro            = \n| partidos                 = \n| partidos internacionales = \n| otra ocupación           = \n}}",
     "sampleText": ""};
     

mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb7/liga-mx/es/images/5/5c/Boton_Trofeo.jpg",
     "speedTip": "Infobox Torneo",
     "tagOpen": "{{Infobox Torneo\n|Nombre = \n|imagen = \n|ID = \n|comentario_imagen = \n|liga = \n|país = \n|fechainicio = \n|fechacierre = \n|edición = \n|campeón = \n|subcampeón = \n|participantes = \n|campeóngoleo = \n|superlider = \n|ofensiva = \n|defensiva = \n|fairplay = \n|ascendio = \n|descendio = \n|anterior = \n|siguiente = \n}}",
     "sampleText": ""};
     
}

if (typeof(mwCustomEditButtons) != 'undefined') { 
mwCustomEditButtons[mwCustomEditButtons.length] = { 
"imageFile" : "https://vignette.wikia.nocookie.net/wmx7/images/e/ec/BotonMT.jpg/revision/latest?cb=20161022192432&path-prefix=es", 
"speedTip" : "Multiplataforma (Solo en Articulos Multiplaforma)", 
"tagOpen" : "== Imágenes ==", 
"tagClose" : "[[Categoría:Multiplataforma]]", 
"sampleText": "\n<gallery>\n</gallery>\n== Vídeos ==\n<gallery>\n</gallery>\n" 
}; 
}

mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/wmx7/images/4/49/Bot%C3%B3nClubes.png/revision/latest?cb=20191015042736&path-prefix=es",
        "speedTip": "Tabla de Clubes",
        "tagOpen": '{|class="ligamx"\n',
        "tagClose": "\n|}",
        "sampleText": "!Equipo\n!País\n!Año\n|-\n|\n|{{MEX}}\n|\n|-\n|\n|{{MEX}}\n|"
    };
    
mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/wmx7/images/3/34/Bot%C3%B3nPalmar%C3%A9s.png/revision/latest?cb=20191015042856&path-prefix=es",
        "speedTip": "Palmarés",
        "tagOpen": '{|class="palmares"\n',
        "tagClose": "\n|}",
        "sampleText": "!Título\n!Equipo\n!País\n!Año\n|-\n|\n|\n|{{MEX}}\n|\n|-\n|\n|\n|{{MEX}}\n|"
    };

if (mwCustomEditButtons) {
 
    mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images4.wikia.nocookie.net/__cb7/liga-mx/es/images/8/84/Boton_CT.png",
     "speedTip": "Infobox Cuerpo Técnico",
     "tagOpen": "{{Infobox Cuerpo Técnico\n|Nombre = \n|imagen        = \n|comentario_imagen        =",
 
     "tagClose": "\n|nombre completo    = \n|ID = \n|apodo     = \n|fecha de nacimiento = \n|edad = \n|lugar de nacimiento = \n|país        = \n|nacionalidad  = \n|fecha de fallecimiento    = \n|lugar de fallecimiento        = \n|familia = \n|clubactual  = \n|puesto = \n|añodebut = \n|clubdebut = \n|añoretiro = \n|clubretiro = \n|selecciones = \n|inicio    = \n|equipo_debut    = \n|retiro    = \n|equipo_retiro    = \n|posición    = \n|cantera    = \n|selección   = \n|facebook    = \n|twitter    = \n|otrared    = \n}}",
     "sampleText": ""};
 
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images4.wikia.nocookie.net/__cb7/liga-mx/es/images/e/ec/Boton_Directivo.png",
     "speedTip": "Infobox Directivo",
     "tagOpen": "{{Infobox Directivo\n|Nombre = \n|imagen        = \n|comentario_imagen        =",
 
     "tagClose": "\n|nombre completo    = \n|ID = \n|apodo     = \n|fecha de nacimiento = \n|ciudad de nacimiento  = \n|país        = \n|nacionalidad  = \n|nac_deportiva    = \n|altura   = \n|peso     = \n|fecha de fallecimiento    = \n|lugar de fallecimiento        = \n|clubactual = \n|cargo = \n|tiempo = \n|otrocargo = \n|palmarés = \n|otrostrabajos = \n|selección = \n|facebook = \n|twitter = \n|otrared = \n|antecesor = \n|sucesor    = \n}}",
     "sampleText": ""};
 
}

/* WDS Notification */
 
if (!$.storage.get('noti')) {
    new BannerNotification('<a href="https://futbol-mexicano.fandom.com/es/wiki/Usuario_Blog:Elite_T7/La_wiki_cumple_5_a%C3%B1os_de_existencia_y_llega_a_sus_3,000_art%C3%ADculos.">En este año 2020, la wiki cumple 5 años de existencia y recién llegamos a los 3,000 artículos.</a>', 'warn').onClose(function () {
        $.storage.set('noti', true);
    }).show();
}

if (!$.storage.get('noti2')) {
    new BannerNotification('Querido lector, ahora ya contamos con información sobre el sector amateur y Liga de Balompié Mexicano, si tiene información util que sea importante para el sitio, puede ayudarnos editandolo, si no sabes como editar te recomendamos leer la <a href="https://futbol-mexicano.fandom.com/es/wiki/Fútbol_Mexicano_Wiki:Guía_de_Edición">guía de edición.</a>', 'warn').onClose(function () {
        $.storage.set('noti2', true);
    }).show();
}