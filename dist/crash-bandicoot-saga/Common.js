/* Any JavaScript here will be loaded for all users on every page load. */
// Función para cargar la fuente CCZoinks
function loadCCZoinksFont() {
    var font = new FontFace('CCZoinks', 'url(https://static.wikia.nocookie.net/crash-bandicoot-saga/images/a/a2/CCZoinks.ttf)');
    font.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        document.body.style.fontFamily = 'CCZoinks, sans-serif';
    });
}

// Llamar a la función para cargar la fuente cuando el contenido esté cargado
document.addEventListener('DOMContentLoaded', loadCCZoinksFont);