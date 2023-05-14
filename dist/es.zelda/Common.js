/* Todo código de JavaScript será cargado para todos los usuarios que visiten el wiki. Edita esta página con cuidado. */

/** Configuración de Link Preview **/
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} }); // Es necesario incluir esto para que funcione la configuración.
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/zelda/images/3/35/No_imagen.png/revision/latest?cb=20200121200509&path-prefix=es'; // Imagen por defecto que aparece cuando el artículo en cuestión no tiene imágenes.
window.pPreview.RegExp.ilinks = [/Archivo:/]; // Evita que LinkPreview salga en la plantilla Imagen pop-up.

// END OF CODE