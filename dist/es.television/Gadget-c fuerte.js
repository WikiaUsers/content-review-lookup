$(function() {
    var categorymatch = $.inArray('Artículos con contenido fuerte', wgCategories) > -1;
    if (categorymatch) {
        $('.mw-content-ltr').hide();
        var texto = $('.contenido_fuerte .contenido').text();
        var alerta = confirm(texto);
        if (alerta === true) {
            $('.mw-content-ltr').show();
        }
        if (alerta === false) {
            location.href = "/wiki/Special:Random";
        }
    }
    return false;
});