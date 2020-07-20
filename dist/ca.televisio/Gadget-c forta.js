$(function() {
    var categorymatch = $.inArray('Articles amb contingut forta', wgCategories) > -1;
    if (categorymatch) {
        $('.mw-content-ltr').hide();
        var texto = $('.contingut_forta .contingut').text();
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