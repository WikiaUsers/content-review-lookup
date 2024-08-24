// Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. 

// Sustituye {{USERNAME}} por el nombre del usuario que navega por la página.
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

}(window, jQuery, mediaWiki));