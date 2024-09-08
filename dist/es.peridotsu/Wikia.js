// Actualizar página
PurgeButtonText = 'Refrescar';
importScriptPage('PurgeButton/code.js', 'dev');

// Boton para ver la página en Monobook (w:c:es.clubpenguin)
 
$(function() {
    $('.wikinav2 .WikiaPageHeader > .comments').before('&nbsp; <a class="wikia-menu-button primary" href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook">Usar Monobook</a>');
 });
$(function() {
    $('.wikinav2 .WikiaPageHeader > .comments').before('&nbsp; &nbsp;<a class="wikia-menu-button primary" href="/wiki/'+ encodeURIComponent(wgPageName) +'?useskin=monobook&action=edit">Editar en Monobook</a>');
 });