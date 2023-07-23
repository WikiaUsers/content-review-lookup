importArticles ({
tipo: "script",
artículos: [
"W: dev: AjaxRC / code.js", / * Fix Search * /
]
});

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Actualizar automáticamente la página';
ajaxPages =

/ * Cualquier JavaScript aquí se cargará para todos los usuarios en cada carga de página. * /
/ / Experimental javascript temporizador de cuenta regresiva (Splarka)
/ / Versión 0.0.3
/ / ************************************************ **
/ /
/ / Ejemplo de uso:
/ / <span Class="countdown" style="display:none;">
/ / Sólo <span class="countdowndate"> 01 de enero 2007 00:00:00 PST </ span> hasta Año Nuevo.
/ / </ Span>
/ / <span Class="nocountdown"> Javascript desactivado. </ Span>

función updatetimer (i) {
  var ahora = new Date ();
  var a continuación, temporizadores = [i] eventdate.;
  var diff = count = Math.floor ((then.getTime ()-now.getTime ()) / 1000);

  / / Atrapar cadenas malos fecha
  si (isNaN (dif)) {
    temporizadores [i] firstChild.nodeValue = '**' + temporizadores [i] eventdate + '**'..;
    volver;
  }

  / / Determinar más / menos
  if (diff <0) {
    diff =-diff;
    var tpm = '';
  } Else {
    var tpm = '';
  }

  / / Calcuate el diff
  var izquierda = (% dif 60) + 'segundos';
    diff = Math.floor (diff/60);
  if (dif> 0) = izquierda (% dif 60) + 'minutos' + izquierda;
    diff = Math.floor (diff/60);
  if (dif> 0) = izquierda (% dif 24) + "horas" + izquierda;
    diff = Math.floor (diff/24);
  if (dif> 0) a la izquierda = diff + 'días' + Izquierda
  temporizadores [i] = tpm firstChild.nodeValue + izquierda.;

  / / A setInterval () es más eficiente, pero llamar a setTimeout ()
  / / Hace que los errores de romper la secuencia de comandos en lugar de infinita recurse
  tiempos de espera [i] = setTimeout ('updatetimer (' + i + ')', 1000);
}

checktimers function () {
  'Nocountdown' / / hide y show 'cuenta atrás'
  var = nocountdowns getElementsByClassName (documento, 'span', 'nocountdown');
  for (var i en nocountdowns) nocountdowns [i]. style.display = 'none'
  var = getElementsByClassName cuenta atrás (documento, 'span', 'cuenta atrás');
  for (var i en cuentas atrás) cuenta atrás [i]. style.display = 'inline'

  / / Configurar temporizadores objetos globales y los tiempos de espera.
  getElementsByClassName temporizadores = (documento, 'span', 'countdowndate'); / / global
  tiempos de espera = new Array (); titular / / genérico para los tiempos de espera, global
  if (timers.length == 0) return;
  for (var i temporizadores) {
    temporizadores [i] eventdate = new Date (temporizadores [i] firstChild.nodeValue.).;
    updatetimer (i) / / ponerlo en marcha
  }
}
addOnloadHook (checktimers);

/ / ************************************************ **
/ / - Final - Temporizador de cuenta atrás Experimental javascript
/ / ************************************************ **

Función $ (() {
    if (typeof (disableUsernameReplace) = 'undefined' && disableUsernameReplace | | wgUserName == null!) return;
    $ ("Span.insertusername") text (wgUserName).;
});

importScriptPage ('MostrarOcultar / code.js', 'dev');
importScriptPage ('EditIntroButton / code.js', 'dev');


  / **
        Activa o desactiva la visualización de los elementos en una página
        Autor / contacto: Austin Che http://openwetware.org/wiki/User:Austin_J._Che
        Ver http://openwetware.org/wiki/OpenWetWare:Toggle de ejemplos y documentación
     * /
 
/ / Array de ids toggler indexada a la matriz de asociados operaciones de alternancia
/ / Cada operación es un arreglo con dos elementos, el primero es el tipo, el segundo nombre de una clase o conjunto de elementos
/ / Tipo de operación son cadenas como "_reset" o "" para cambiar entre la operación por defecto
Toggler var = new Array ();
allClasses var = new Object (); mapa / / asociativa de nombres de clase a los elementos de página
 
toggler función (id)
{
    var = toBeToggled Toggler [id];
    if (! toBeToggled)
        volver;
 
    / / Si algún elemento está en la lista más de una vez, se pueden activar varias veces
    for (var i = 0; i <toBeToggled.length, i + +)
    {
        / / Obtiene el conjunto de elementos para operar en
        var cambia toBeToggled = [i] [1];
        if (typeof (alterna) == "string")
        {
            if (toggles.charAt (0) == '-')
            {
                / / Tratar como un identificador de elemento, no como clase
                alterna = document.getElementById (toggles.substring (1));
                if (conmuta)
                    alterna = new Array (alterna);
            }
            más
                alterna = allClasses [alterna];
        }
        if (alterna | |! toggles.length)
            continuar;
 
        var op = toBeToggled [i] [0], / / ​​lo que la operación será
 
        switch (op)
        {
            caso "_reset":
                for (var j en alterna)
                    alterna [j] = style.display alterna [j] _toggle_original_display..;
                break;
            caso "_show":
                for (var j en alterna)
                    alterna [j] ='' style.display.;
                break;
            caso "_hide":
                for (var j en alterna)
                    alterna [j] = style.display 'none'.;
                break;
            caso "":
            por defecto:
                / / Toggle
                for (var j en alterna)
                    alterna [j] style.display = ((alterna [j] == style.display 'none')'':.? 'none').;
                break;
        }
    }
}
 
función createTogglerLink (toggler, id)
{
    var toggle = document.createElement ("a");
    toggle.className = 'toggler-link';
    toggle.setAttribute ('id', 'toggler' id +);
    toggle.setAttribute ('href', 'javascript: toggler ("" + id + "");');
    var = toggler.firstChild niño;
    toggler.removeChild (niño);
    toggle.appendChild (niño);
    toggler.insertBefore (conmutación, toggler.firstChild);
}
 
toggleInit function ()
{
    togglerElems var = new Array ();
    var toggleGroup = new Array ();
 
    / / Inicializar / borrar la información antigua
    Toggler = new Array ();
    allClasses = new Object ();
    allClasses.watch = undefined;
    allClasses.unwatch = undefined;
 
 
    / / Hacer la lista de todas las clases de documentos
    elems var = document.getElementsByTagName ("*");
    var = numelems elems.length;
    for (var i = 0; i <elems.length, i + +)
    {
        var elem = elems [i];
        if (! elem.className)
            continuar;
 
        elem._toggle_original_display = elem.style.display;
        var togglerID = -1;
        elemClasses var = elem.className.split (''); / / obtener la lista de clases
        for (var j = 0; j <elemClasses.length, j + +)
        {
            var elemClass elemClasses = [j];
            if (! allClasses [elemClass])
                allClasses [elemClass] = new Array ();
            allClasses [elemClass] push (elem).;
 
            / / Todas las clases especiales comienzan con _TOGGLE
            si (elemClass.substring (0, 7)! = "_TOGGLE")
                continuar;
 
            if (elemClass == "_togglegroup")
                toggleGroup = new Array ();
            else if (elemClass == "_TOGGLE")
                toggleGroup.push (elem);
            else if (elemClass.substring (0, 12) == "_toggle_init")
            {
                / / Establece el valor inicial de la pantalla (ignorar el valor original CSS juego)
                / / Entiende _toggle_initshow y _toggle_inithide
                var DISP = elemClass.substring (12);
                if (DISP == "show")
                    elem.style.display ='';
                else if (DISP == "hide")
                    elem.style.display = 'none';
                elem._toggle_original_display = disp;
            }
            else if (elemClass.substring (0, 8) == "_toggler")
            {
                if (togglerID == -1)
                {
                    togglerID = togglers.length;
                    Toggler [togglerID] = new Array ();
                    togglerElems [togglerID] = elem;
                }
 
                / / Todas las clases son de forma _toggler_op-CLASS
                / / Averiguar qué clase estamos activando
                / / Si no se especifica ninguno, entonces se utiliza el grupo de conmutación actual
                var toBeToggled;
                var = elemClass.indexOf guión ('-');
                if (guión! = -1)
                    toBeToggled = elemClass.substring (guión +1);
                más
                {
                    toBeToggled = toggleGroup;
                    guión = elemClass.length;
                }
 
                op var = elemClass.substring (8, guión);
                Toggler [togglerID] push (new Array (op, toBeToggled)).;
            }
        }
    }
 
    / / Añadir enlaces javascript para todos los elementos toggler
    for (var i = 0; i <togglerElems.length, i + +)
        createTogglerLink (togglerElems [i], i);
}
 
 
owwsitesearch función (f) {
    'site: http://openwetware.org/wiki/' f.q.value = +
        f.base.value + '+ +' + f.qfront.value
}
 
 
addOnloadHook (toggleInit);

importScriptPage («MediaWiki: Common.js / displayTimer.js ',' RuneScape ');

/ * Sliders usando jQuery - por Tierrie * /
/ / Wsl.loadScript ("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");

 
Función $ (() {
  var $ pestañas = $ ("# portal_slider") pestañas ({fx: {opacidad: 'toggle', duración: 100}}).;
  $ ("[^ = Clase portal_sliderlink]"). Haga clic en (function () {/ / bind evento de clic para enlazar
    $ Tabs.tabs ('select', this.className.replace ("portal_sliderlink_", ""));
    return false;
  });
  $ ('# Portal_next "). Haga clic en (function () {
    $ Tabs.tabs ('select', ($ tabs.tabs ('opción', 'seleccionado') == ($ tabs.tabs ('length')) -1) 0: $ tabs.tabs ('opción' , 'seleccionado') + 1) / / cambiar a la solapa siguiente
    return false;
  });
  $ ('# Portal_prev "). Haga clic en (function () {/ / bind evento de clic para enlazar
    $ Tabs.tabs ('select', ($ tabs.tabs ('opción', 'seleccionado') == 0) ($ tabs.tabs ("longitud") -1): $ tabs.tabs ('opción' , 'seleccionado') - 1) / / Cambiar a la pestaña anterior
    return false;
  });
});
/ * Sliders End Using jQuery - por Tierrie * /

preloadUploadDesc función () {
if (wgPageName.toLowerCase () = 'especial: upload'!) {
volver;
}
 
MedlinePlus {{justificación uso justo \ r | Descripción = \ r | Source = \ r | Porción = \ r | Aplicaciones = \ r | Resolución = \ r | reemplazabilidad = \ r}} [[Category:]] ") );
 
}
addOnloadHook (preloadUploadDesc)

importScript («MediaWiki: Common.js / mosbox.js ');

importScript («MediaWiki: Chat-headline ');

changeChatDesc función () {
try {
if ($ ('section.ChatModule'). size ()> 0 && $ ('p.chat-name'). html ()! = chatDesc) {
$ ('P.chat-name') html ('' +'' + chatDesc). SetTimeout ("changeChatDesc ()", 200);
}

} Catch (err) {
setTimeout ("changeChatDesc ()", 200);
}
};

$ (Document) ready (function () {changeChatDesc ()}).;

/ * Tiempo límite * /
var ticker;
var tickertxt;
var tickerdiv;

newsticker function () {
  if (document.getElementById) {
  si {
    ticker = document.getElementById ('ticker');
    ticker.style.display = 'block';
    tickerdiv = document.getElementById ('tickerdiv');
    tickertxt = document.getElementById ('tickertxt') offsetWidth.;
    tickerdiv.style.left = parseInt (ticker.style.width) + 10 + 'px';
    lefttime = setInterval ("newstickergo ()", 200);
  }
  }
}

newstickergo función () {
  tickerdiv.style.left = (parseInt (tickerdiv.style.left)> (-10 - tickertxt))? parseInt (tickerdiv.style.left) - 10 + "px": parseInt (ticker.style.width) + 10 + "px";
}
addOnloadHook (newsticker);