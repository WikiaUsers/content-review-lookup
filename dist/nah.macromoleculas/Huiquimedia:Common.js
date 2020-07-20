/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Auto-refrescar WikiActividad */
 
var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxIndicator = 'https://vignette.wikia.nocookie.net/gup/images/0/06/Gup.gif';
var ajaxRefresh = 10000;
importScriptPage('AjaxRC/code.js', 'dev');

/**
//Fondo cambiante al recargar o cambiar de pagina (By User:BranDaniMB con permisos del usuario para aplicarlo aquí)
    var wallpaper = ["http://imgur.com/a/FppeH","http://imgur.com/a/cK6j9","http://imgur.com/a/ZqMKY","http://imgur.com/a/5XyU4","http://imgur.com/a/xHhHq","http://imgur.com/a/TjijL"];
    var min = 0;
    var max = 10;
    var number = Math.floor(Math.random() * (max - min)) + min;
    var background = wallpaper[number];
        $(".mediawiki").css("background-image", "url('"+ background +"')");
        $(".mediawiki").css("background-color", "#000");
        $(".mediawiki").css("background-size", "100%");
        $(".mediawiki").css("background-attachment", "fixed");
        $(".mediawiki").css("background-repeat", "no-repeat");
**/