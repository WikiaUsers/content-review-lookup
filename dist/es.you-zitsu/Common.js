// Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina. 

// Sustituye {{USERNAME}} por el nombre del usuario que navega por la p�gina.
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

}(window, jQuery, mediaWiki));