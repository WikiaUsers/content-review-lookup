/* Añadir botones extra de edición */
if (mwCustomEditButtons) {
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/3/37/Button_tl_template.png",
     "speedTip": "Enlace a plantilla",
     "tagOpen": "\{\{Tl|",
     "tagClose": "\}\}",
     "sampleText": "Plantilla"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/4/44/Button_comillas_latinas.png",
     "speedTip": "Cita",
     "tagOpen": "\{\{Cita|",
     "tagClose": "\}\}",
     "sampleText": "texto de la cita|autor(es)|fuente"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002753/es.starwars/images/c/c8/Button_comment_round.png",
     "speedTip": "Diálogos",
     "tagOpen": "\{\{Diálogos|",
     "tagClose": "\}\}",
     "sampleText": "interlocutor1|Diálogo1|interlocutor2|Diálogo2|..(más interlocutores y diálogos)..|atr=|audio=|url=|fte="};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/c/c8/Button_redirect.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Inserta texto"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Organización",
     "tagOpen": "{{Organización\n|fondoimagen     = \n|BG1             = \n|BG2             = \n|imagen          = \n|nombre          =",
     "tagClose": "\n|hidei           = \n|tipo            = \n|fundador        = \n|lider           = \n|miembros        = \n|cuartel general = \n|emplazamientos  = \n|hideh           = \n|formada         = \n|fragmentada     = \n|reorganizada    = \n|disuelta        = \n|restaurada      = \n|hideot          = \n|era             = \n|afiliacion      = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Especie",
     "tagOpen": "{{Especie\n|fondoimagen = \n|imagen      = \n|nombre      =",
     "tagClose": "\n|planeta     = \n|idioma      = \n|altura      = \n|longitud    = \n|envergadura = \n|piel        = \n|pelo        = \n|plumas      = \n|ojos        = \n|distinciones= \n|vida        = \n|razas       = \n|miembros    = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Criatura",
     "tagOpen": "{{Criatura\n|fondoimagen = \n|imagen      = \n|nombre      =",
     "tagClose": "\n|designacion = \n|clase       = \n|planeta     = \n|medio       = \n|dieta       = \n|longitud    = \n|envergadura = \n|altura      = \n|piel        = \n|color       = \n|cabello     = \n|plumas      = \n|ojos        = \n|distinciones= \n|enemigo     = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120218201007/es.starwars/images/3/30/Boton_lugar.png",
     "speedTip": "Plantilla Lugar",
     "tagOpen": "{{Eras|}}\n{{Lugar\n|imageBG=\n|imagen=\n|nombre=",
     "tagClose": "\n|hidei=\n|creado=\n|destruido=\n|localizacion=\n|poi= <!-- Puntos de interés -->\n|hideu=\n|afiliacion=\n|era=\n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120218201007/es.starwars/images/d/d9/Boton_estructura.png",
     "speedTip": "Plantilla Estructura",
     "tagOpen": "{{Estructura\n|imagen        = \n|nombre        =",
     "tagClose": "\n|hidei         =\n|construido    = \n|destruido     = \n|reconstrución = \n|localizacion  = \n|ciudad        = \n|constructora  = \n|arquitecto    = \n|propietario   = \n|capacidad     = \n|guarnicion    = \n|hidep         =\n|altura        = \n|anchura       = \n|hideu         =\n|rol           = \n|funcion       = \n|era           = \n|afiliacion    = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214148/es.starwars/images/1/13/Botón_ciudad.png",
     "speedTip": "Plantilla Ciudad",
     "tagOpen": "{{Ciudad\n|fondoimagen  =\n|imagen       =\n|nombre       =",
     "tagClose": "\n|construido   =\n|destruido    =\n|reconstruido =\n|constructor  =\n|planeta      =\n|continente   =\n|localizacion =\n|clima        =\n|interes      =\n|poblacion    =\n|era          =\n|afiliacion   =\n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/7/73/Botón_planeta.png",
     "speedTip": "Plantilla Planeta",
     "tagOpen": "{{Planeta\n|image         = \n|fondoimagen   = \n|name          =",
     "tagClose": " \n|hidea         = \n|region        = \n|sector        = \n|sistema       = \n|soles         = \n|orbita        = \n|lunas         = \n|coord         = \n|xyz           = \n|rutas         =\n|distancia     = \n|dia           = \n|año           = \n|hidep         = \n|clase         = \n|diametro      = \n|atmosfera     = \n|clima         = \n|gravedad      = \n|terreno       = \n|agua          = \n|interes       = \n|fauna         = \n|flora         = \n|hides         = \n|especies      = \n|otrasespecies = \n|idioma        = \n|gobierno      =\n|poblacion     = \n|gentilicio    = \n|ciudades      = \n|imports       = \n|exports       = \n|afiliacion    = \n}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/7/74/Botón_luna.png",
     "speedTip": "Plantilla Luna",
     "tagOpen": "{{Luna\n|imageBG       =\n|image         = \n|name          =",
     "tagClose": " \n|region        = \n|sector        = \n|sistema       = \n|planeta       = \n|coord         = \n|dia           = \n|año           = \n|clase         = \n|diametro      = \n|atmosfera     = \n|clima         = \n|gravedad      = \n|terreno       = \n|agua          = \n|interes       = \n|especies      = \n|otrasespecies =\n|fauna         = \n|flora         = \n|idioma        =\n|gobierno      = \n|ciudades      = \n|poblacion     = \n|afiliacion    = \n}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214149/es.starwars/images/f/f9/Botón_estrella.png",
     "speedTip": "Plantilla Estrella",
     "tagOpen": "{{Estrella\n|fondoimagen =\n|imagen      =\n|nombre      =",
     "tagClose": "\n|hidea       =\n|region      =\n|sector      =\n|sistema     =\n|posicion    =\n|coord       =\n|xyz         =\n|distancia   =\n|orbitas     =\n|estaciones  =\n|asteroides  =\n|otros       =\n|hidep       =\n|clase       =\n|diametro    =\n|hides       =\n|afiliacion  =\n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/4/4c/Button_interprojet.png",
     "speedTip": "Plantilla Sistema",
     "tagOpen": "{{Sistema\n|imagen        = \n|nombre        =",
     "tagClose": " \n|hidea         =\n|región        = \n|sector        = \n|coordenadas   =\n|xyz           =\n|estrellas     = \n|órbitas       = \n|estaciones    = \n|asteroides    = \n|cometas       = \n|nebulosas     = \n|otrosobjetos  = \n|rutas         = \n|cuadrantes    = \n|hides         =\n|especies      = \n|otrasespecies = \n|idioma        = \n|población     = \n|importaciones = \n|exportaciones = \n|afiliación    = \n}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/6/63/Botón_sector.png",
     "speedTip": "Plantilla Sector",
     "tagOpen": "{{Sector\n|imagenBG      = \n|imagen        = \n|nombre        =",
     "tagClose": "\n|región        = \n|sistemas      = \n|otrosplanetas = \n|estaciones    = \n|asteroides    = \n|cometas       = \n|nebulosas     = \n|otrosobjetos  = \n|rutas         = \n|cuadrantes    = \n|especies      = \n|capital       = \n|afiliación    = \n|batallas1     = \n|batallas2     = \n|batallas3     = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120218201006/es.starwars/images/4/4e/Boton_estacion.png",
     "speedTip": "Plantilla Estación espacial",
     "tagOpen": "{{Estación espacial\n|imagen           = \n|nombre           =",
     "tagClose": "\n|fabricante       = \n|diseñador        = \n|linea            = \n|modelo           = \n|clase            = \n|coste            = \n|modificado       = \n|sistemasmod      = \n|largo            = \n|envergadura      = \n|altura           = \n|masa             = \n|aceleracion      = \n|mglt             = \n|velatmos         = \n|maniobrabilidad  =\n|motor            = \n|hipermotor       = \n|alcance          = \n|sishiperimpulsor = \n|potenciasalida   = \n|energia          = \n|escudo           = \n|casco            = \n|sensor           = \n|blanco           = \n|navegacion       = \n|avionica         = \n|com              = \n|contramedidas    = \n|armamento        = \n|complementos     = \n|muelle           = \n|escape           = \n|tripulación      = \n|esqueleto        = \n|pasajeros        = \n|capacidad        = \n|sistemacarga     =\n|consumibles      =\n|vida             =\n|comunicaciones   =\n|otros            = \n|región           = \n|sistema          = \n|planeta          = \n|orbita           = \n|disponibilidad   = \n|rol              = \n|era              = \n|afiliacion       = \n|construida       = \n|primeravista     = \n|destruida        = \n|retirada         = \n|ultimavista      = \n|batallas         = \n|dueño            = \n|tripulantes      = \n|capitan          = \n|registro         = \n|alias            = \n|población        = \n|interes          = \n|servicios        = \n|sectores         = \n|modulos          = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214149/es.starwars/images/5/59/Botón_nave.png",
     "speedTip": "Plantilla Nave",
     "tagOpen": "{{Nave\n|fondoimagen      =\n|imagen           = \n|nombre           =",
     "tagClose": "\n|fabricante       = \n|diseñador        = \n|linea            = \n|modelo           = \n|clase            = \n|coste            = \n|modificado       = \n|sistemasmod      = \n|largo            = \n|envergadura      = \n|altura           = \n|masa             =\n|aceleracion      =\n|mglt             = \n|velatmos         = \n|maniobravilidad  = \n|motor            = \n|hipermotor       =\n|alcance          =\n|sishiperimpulsor =\n|potenciasalida   =\n|energia          =\n|escudo           =\n|defensas         =\n|casco            =\n|sensor           =\n|blanco           =\n|navegacion       =\n|avionica         =\n|comp             =\n|contramedidas    =\n|armamento        =\n|complementos     =\n|muelle           =\n|escape           =\n|tripulación      =\n|tripulacionmin   =\n|pasajeros        =\n|carga            =\n|sistemacarga     =\n|abastecimiento   =\n|soportevital     =\n|sistemacarga     =\n|otros            =\n|funciones        =\n|roles            =\n|primer uso       =\n|era              =\n|afiliacion       =\n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214149/es.starwars/images/a/ac/Botón_droide.png",
     "speedTip": "Plantilla Droide",
     "tagOpen": "{{Droide\n|fondoimagen =\n|imagen      =\n|hidep       =\n|nombre      =",
     "tagClose": "\n|planeta     =\n|nacimiento  =\n|muerte      =\n|creador     =\n|manufactura =\n|linea       =\n|modelo      =\n|tipo        =\n|hidet       =\n|anchura     =\n|longitud    =\n|altura      =\n|genero      =\n|sensores    =\n|coraza      =\n|armamento   =\n|equipo      =\n|hidec       =\n|era         =\n|afiliacion  =\n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/c/c2/Botón_arma.png",
     "speedTip": "Plantilla Arma",
     "tagOpen": "{{Arma\n|imagenBG    = \n|imagen      = \n|nombre      =",
     "tagClose": "\n|hidep       = \n|manufactura = \n|modelo      = \n|tipo        = \n|cultura     = \n|creadores   = \n|creado      = \n|destruido   = \n|descubierto = \n|poseedores  = \n|lugares     = \n|precio      = \n|valor       = \n|hidet       = \n|estructura  = \n|tamaño      = \n|largo       = \n|ancho       = \n|alto        = \n|peso        = \n|proteccion  = \n|capacidad   = \n|alcance     = \n|incripcion  = \n|marcas      = \n|hideu       = \n|uso         = \n|herencia    = \n|era         = \n|afiliacion  = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120211214150/es.starwars/images/0/05/Botón_novela.png",
     "speedTip": "Plantilla Novela",
     "tagOpen": "{{Novela\n|fondoimagen= \n|imagen     = \n|nombre     =",
     "tagClose": " \n|hidea      = \n|original   = \n|autor      = \n|portada    = \n|hideñ      = \n|traductor  = \n|editSP     = \n|añoSp      = \n|formatoSp  = \n|isbnSp     = \n|pagSp      = \n|hidew      = \n|pais       = \n|editUSA    = \n|añoUSA     = \n|formatoUSA = \n|pagUSA     = \n|isbnUSA    = \n|hidec      = \n|canon      = \n|era        = \n|timeline   = \n|serie      = \n|sigue a    = \n|seguido de = \n}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135210/es.starwars/images/a/ae/Button_IFilm.png",
     "speedTip": "Plantilla Película",
     "tagOpen": "{{Película\n|nombre        =",
     "tagClose": " \n|imagen        = \n|original      = \n|dirección     = \n|producción    = \n|guión         = \n|música        = \n|reparto       = \n|distribuidora =\n|país          = \n|idioma        = \n|traducción    = \n|estreno       = \n|duración      = \n|presupuesto   = \n|canon         = \n|timeline      =\n|era           = \n|sigue a       = \n|seguido de    = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20120218201007/es.starwars/images/e/ef/Boton_musica.png",
     "speedTip": "Plantilla Música",
     "tagOpen": "{{Música\n|imagen       =\n|nombre       =",
     "tagClose": "\n|hideg        =\n|compositor   =\n|escritor     =\n|grabación    =\n|lanzamiento  =\n|representa   =\n|interpretado =\n|género       =\n|hidem        =\n|duración     =\n|clave        =\n|tempo        =\n|textura      =\n|marcatiempo  =\n|ritmo        =\n|hideu        =\n|películas    =\n|UE           =\n|hides        =\n|media        =\n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20070324060242/central/images/7/74/Button_comment.png",
     "speedTip": "Plantilla Cómics",
     "tagOpen": "{{Eras|real}}\n{{Cómics\n|imagenBG   = \n|imagen     = \n|nombre     =",
     "tagClose": "\n|original   = \n|guion      = \n|lapiz      = \n|tinta      = \n|rot        = \n|color      = \n|portada    = \n|editor     = \n|hides      = <!---sí solo si no ha sido publicado en español--->\n|editSp     = \n|recopSp    = <!---Para mostrar en qué volumen TPB se publicó en español--->\n|traductor  = \n|añoSp      = \n|formatoSp  = \n|paginasSp  = \n|isbnSp     = \n|hidep      = <!---sí solo si no hay info de la publicación original--->\n|edit       = \n|año        = \n|formato    = \n|paginas    = \n|isbn       = \n|hideg      = <!---sí solo si no hay info de info general--->\n|era        = \n|timeline   = \n|serie      = \n|recop      = \n|numero     = \n|sigue a    = \n|seguido de = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20070324060242/central/images/7/74/Button_comment.png",
     "speedTip": "Plantilla Serie de cómics",
     "tagOpen": "{{Eras|real}}\n{{Serie de cómics\n|imagenBG      = \n|imagen        = \n|titulo        =",
     "tagClose": "\n|hidea         = <!---sí si no hay info de atribuciones--->\n|original      = \n|guion         = \n|lapiz         = \n|tinta         = \n|rotulacion    = \n|color         = \n|portada       = \n|editor        = \n|hides         = <!---sí si no ha sido publicado en español--->\n|editSp        = \n|periodicidadSp= \n|estadoSp      = \n|numerosSp     = \n|hidep         = <!---sí si no hay info de la edición original--->\n|edit          = \n|periodicidad  =\n|estado        =\n|numeros       =\n|hideg         = <!---sí si no hay info general--->\n|era           =\n|timeline      = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135211/es.starwars/images/2/29/Button_user.png",
     "speedTip": "Plantilla Persona real",
     "tagOpen": "{{Persona\n|image       =\n|nombre      =",
     "tagClose": "\n|nace        =\n|muere       =\n|nacionalidad=\n|residencia  =\n|ocupacion   =\n|compañías   =\n|SW          =\n|otras       =\n|sitio web   =\n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje",
     "tagOpen": "{{Personaje\n|BG1        = \n|BG2        = \n|imageBG    = \n|image      = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Jedi",
     "tagOpen": "{{Personaje Jedi\n|imageBG    = \n|image      = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Imperial",
     "tagOpen": "{{Personaje Imperial\n|imageBG    = \n|image      = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Mandaloriano",
     "tagOpen": "{{Personaje Mandaloriano\n|imageBG    = \n|image      = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Nueva República",
     "tagOpen": "{{Personaje NR\n|imageBG    = \n|image      = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Rebelde",
     "tagOpen": "{{Personaje Reb\n|imageBG    = \n|image      = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje República",
     "tagOpen": "{{Personaje Rep\n|imageBG    = \n|image      = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje JediOscuro",
     "tagOpen": "{{Personaje JediOscuro\n|fondoimagen= \n|imagen     = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Sith",
     "tagOpen": "{{Personaje Sith\n|fondoimagen= \n|imagen     = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Caballero Imperial",
     "tagOpen": "{{Personaje Caballero Imperial\n|fondoimagen= \n|imagen     = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Cazarrecompensas",
     "tagOpen": "{{Personaje Cazarrecompensas\n|fondoimagen= \n|imagen     = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Corporación",
     "tagOpen": "{{Personaje Corporación\n|fondoimagen= \n|imagen     = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje Criminal",
     "tagOpen": "{{Personaje Criminal\n|imagen BG  = \n|imagen     = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje CSI",
     "tagOpen": "{{Personaje CSI\n|fondoimagen= \n|imagen     = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Personaje FGAL",
     "tagOpen": "{{Personaje FGAL\n|fondoimagen= \n|imagen     = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|ciber      = \n|hidec      = \n|era        = \n|afiliacion = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002752/es.starwars/images/f/fd/Button_blockquote.png",
     "speedTip": "Plantilla Yuuzhan Vong",
     "tagOpen": "{{Personaje Vong\n|imageBG    = \n|image      = \n|nombre     =",
     "tagClose": " \n|hideb      = \n|planeta    = \n|nace       = \n|muere      = \n|hidep      = \n|especie    = \n|genero     = \n|altura     = \n|pelo       = \n|ojos       = \n|piel       = \n|implantes  = \n|hidec      = \n|era        = \n|afiliacion = \n|dominio    = \n|maestros   = \n|aprendices = \n}}",
     "sampleText": ""};

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/f/f1/Button_info-1.png",
     "speedTip": "Plantilla Información",
     "tagOpen": "{{Información\n|atencion=\n|descripcion=",
     "tagClose": "\n|fuente=\n|autor=\n|retoques=\n|licencia=\n|otras versiones=\n}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135209/es.starwars/images/6/62/Button_desambig.png",
     "speedTip": "Plantilla Desambiguación",
     "tagOpen": "{{Desambig",
     "tagClose": "}}",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135210/es.starwars/images/4/4f/Button_era.png",
     "speedTip": "Plantilla Eras",
     "tagOpen": "{{Eras|",
     "tagClose": "}}",
     "sampleText": "inserta era"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135211/es.starwars/images/2/29/Button_user.png",
     "speedTip": "Plantilla Usuario",
     "tagOpen": "{{Usuario\n| BG1 = <!--color de fondo de imagen y nombre -->\n| BG2 = <!--color de los encabezados secundarios -->\n| c3 = <!--color de la información de usuario -->\n| TXT1 = \n| TXT2 = \n| TXTG1 = <!--color del texto del nombre -->\n| image = \n| nombre = \n| planeta = \n| reside = \n| nace = \n| muere = \n| especie = \n| genero = \n| altura = \n| pelo = \n| ojos = \n| ocupacion = \n| aficiones = \n| contribuciones = \n| era = \n| afiliacion = \n| etiquetas = <!-- Etiquetas de usuario -->\n}}",
     "tagClose": "",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/4/43/Enlace_a_usuario.png",
     "speedTip": "Enlace a usuario",
     "tagOpen": "[[Usuario:",
     "tagClose": "|]]",
     "sampleText": "Nombre"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/6/64/Botón_categor%C3%ADa.png",
     "speedTip": "Categoría",
     "tagOpen": "[[Categoría:",
     "tagClose": "|{" + "{PAGENAME}}]]",
     "sampleText": "Nombre categoría"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312135208/es.starwars/images/3/38/Botón_intercategor%C3%ADa.png",
     "speedTip": "en:Category",
     "tagOpen": "[[en:Category:",
     "tagClose": "]]",
     "sampleText": "Name"};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/6/63/Button_l_en.png",
     "speedTip": "Interwiki",
     "tagOpen": "{{Interlang\n|en=",
     "tagClose": "\n}}",
     "sampleText": ""};
 
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/__cb20110312002754/es.starwars/images/9/96/Button_interwiki.png",
     "speedTip": "Wikificar artículo",
     "tagOpen": "\{\{Wikificar\}\}",
     "tagClose": "",
     "sampleText": ""};
 
 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/es.starwars/images/8/8c/Button_RedX.png",
     "speedTip": "Proponer el artículo para ser borrado",
     "tagOpen": "\{\{Borrar|",
     "tagClose": "\}\}",
     "sampleText": "Motivo"};
 
  mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile" : "https://images.wikia.nocookie.net/__cb20110910164523/central/images/3/31/HighlightButton.png",
     "speedTip"  : "Texto en verde",
     "tagOpen"   : "<span style='color:green'>",
     "tagClose"  : "</span>",
     "sampleText": ""};

 }