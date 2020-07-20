/* Función para cargar la plantilla información en Descripción de archivo */
$(function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'especial:subirarchivo') {
        return;
    }
 
    document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{InfoArchivo \r|descripcion= \r|fuente= \r|autor= \r|referente a= \r}}"));
 
});

$(function preloadUploadDesc() {
    if (wgPageName.toLowerCase() != 'especial:subirmúltiplesarchivos') {
        return;
    }
 
    document.getElementById('wpUploadDescription').appendChild(document.createTextNode("{{InfoArchivo \r|descripcion= \r|fuente= \r|autor= \r|referente a= \r}}"));
 
});
/* Fin cargar plantilla en Descripción de archivo */

// Actualizar automáticamente varias páginas de actividad reciente, obtenido de Dragon Ball Wiki
window.AjaxRCRefreshText = 'Actividad automatizada';
window.AjaxRCRefreshHoverText = 'Con la casilla marcada esta página se actualizará automáticamente';
window.ajaxPages = [
    "Especial:CambiosRecientes",
    "Especial:WikiActivity",
    "Especial:PáginasNuevas",
    "Especial:Seguimiento"
];