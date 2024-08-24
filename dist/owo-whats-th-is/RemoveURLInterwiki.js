if (wgAction != 'edit') { 
$('#WikiaPageHeader > .wikia-menu-button > .WikiaMenuElement > li:last-child').after(
    $('<li/>').append('<a style="cursor:pointer" id="ca-removeurlrequest" href="?action=edit&removeurl=yes">Reparar enlace</a>')
    );
}

console.log('Ready.');
if (wgAction == 'edit' && $.getUrlVar( 'removeurl' ) === 'yes') {
    var editor = 'wpTextbox1';
    var protocolo = 'http://';
    var serverpage_end = '.wikia.com';
    if (protocolo in editor && serverpage_end in editor) {
        this.delete();
    } else {
        new BannerNotification('No se ha detectado ningún URL de la red Fandom.', 'warn').show();
    }
}