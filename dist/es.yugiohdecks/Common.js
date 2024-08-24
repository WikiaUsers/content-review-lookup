/* 

    CORRECCION DE ERROR AL CREAR PAGINA NUEVA CON PRELOAD

Corrige error al crear página nueva con preload. Para ello se asigna el atributo "section=1"
al botón Crear. Cuando el usuario hace clic, el formulario se enviará con este atributo adicional, evitando que se sobrescrita el atributo "edit" por "veedit". */

/* Busca el objeto con el id "newdeck" y luego busca el primer formulario */
var f = document.getElementById('newdeck');

if(f !== null) {
    f = f.getElementsByTagName('form');
    
    /* Si hay resultados, procede a añadir un nuevo atributo*/
    if(f.length > 0) {
      /* Reasigna la primera variable */
      f = f[0];
      /* Crea un nuevo control input*/
      var d = document.createElement('input');
      d.setAttribute('name', 'section');
      d.setAttribute('value', 1);
      d.setAttribute('type', 'hidden');
      /* Añade el nuevo control al formulario existente*/
      f.appendChild(d);
    }
}

/*

    BOTON DE DESCARGA DE RECETAS EN FORMATO .ydk

Crea un botón para permitir a los usuarios descargar las recetas de decks
en formato .ydk, compatibles con el juego YGOPRO. Se crea un archivo mediante
Javascript, que luego es descargado en el equipo del usuario. Se descarga tal
como si se tratase de un archivo alojado en el servidor, pero sin pedirselo
al servidor, ya que se crea en el momento.

*/

function buttonYDK() {
	var pageTitle = mw.config.get('wgPageName');
    var d = document.getElementById("download-ydk");
    var p = document.getElementById("data-ydk");
    if(d !== null && p !== null) {
        var a = document.createElement('a');
        a.setAttribute('id', 'download-ydk-button');
        a.setAttribute('class', 'wikia-button');
        a.setAttribute('download', normalizeTitle(pageTitle) + '.ydk');
        a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(p.innerHTML.replace(/\r?\n|\n/g, "\r\n")));
        a.innerText = "Descargar el deck";
        d.appendChild(a);
    }
}

/* 

    NORMALIZAR NOMBRES (necesario para el botón YDK)
     
Retira las tildes de los nombres, así como otros caracteres conflictivos

*/
function normalizeTitle(title) {
    letters = [
        ['Á', 'A'],
        ['á', 'a'],
        ['É', 'E'],
        ['é', 'e'],
        ['Í', 'I'],
        ['í', 'i'],
        ['Ó', 'O'],
        ['ó', 'o'],
        ['Ú', 'U'],
        ['ú', 'u'],
        ['Ä', 'A'],
        ['ä', 'a'],
        ['Ë', 'E'],
        ['ë', 'e'],
        ['Ï', 'I'],
        ['ï', 'i'],
        ['Ö', 'O'],
        ['ö', 'o'],
        ['Ü', 'U'],
        ['&', 'y'],
        ['/', '']
    ];
    
    for(i=0; i<letters.length; i++) {
        r_in = new RegExp('[' + letters[i][0] + ']', 'g');
        r_out = letters[i][0];
        title = title.replace(r_in, r_out);
    }
    return title;
}

buttonYDK();


/* Programa un botón para mostrar u ocultar información no relevante */
function setToggleButtons() {
    
    /* Variables comunes */
    var x, i;
    
    /* Hide content button */
    x = document.getElementsByClassName("hide_content");
    for (i = 0; i < x.length; i++) {
        
        var x_id = x[i].getAttribute('id');
        // Configura función del botón
        x[i].setAttribute("onclick", "onClickToggleButton('" + x_id + "')");
        
        // Oculta el contenedor objetivo
        var o = document.getElementById(x_id + "_content");
        o.style.display = "none"; // oculta contenido
    }
    
    /* Show content button */
    x = document.getElementsByClassName("show_content");
    for (i = 0; i < x.length; i++) {
        
        var x_id = x[i].getAttribute('id');
        // Configura función del botón
        x[i].setAttribute("onclick", "onClickToggleButton('" + x_id + "')");
        
        // Oculta el contenedor objetivo
        var o = document.getElementById(x_id + "_content");
        o.style.display = "inherit"; // muestra contenido
    } 
}

/* Activa la función de mostrar/ocultar contenido */
function onClickToggleButton(id) {
    var o = document.getElementById(id + "_content");
    if(o.style.display == "none")
    {
        o.style.display = "inherit";
    }
    else
    {
        o.style.display = "none";
    }
}

/* Ejecuta la función */
setToggleButtons()