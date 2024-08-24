/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

/* Auto-refrescar WikiActividad */
 
var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity","Especial:Registro"];
var ajaxIndicator = 'https://vignette.wikia.nocookie.net/gup/images/0/06/Gup.gif';
var ajaxRefresh = 10000;
importScriptPage('AjaxRC/code.js', 'dev');

/*Digital Clock*/

importScriptPage("Digital_Clock/code.js", "dev");

//Fondo cambiante al recargar o cambiar de pagina (By User:BranDaniMB con permisos del usuario para aplicarlo aquí)
    var wallpaper = ["http://i.imgur.com/hODfM6W.jpg","http://i.imgur.com/EUdYC2X.jpg","http://i.imgur.com/iP6iHVD.jpg","http://i.imgur.com/PJW2UlP.jpg","http://i.imgur.com/ebbBsbD.jpg","http://i.imgur.com/ZIfsm1U.jpg","http://i.imgur.com/SZquaEx.jpg","http://i.imgur.com/027USBk.jpg","http://i.imgur.com/00E4eoj.jpg","http://i.imgur.com/FGVQGd6.jpg", "https://i.imgur.com/TMS16cP.jpg", "https://i.imgur.com/fMzUZhE.png", "https://i.imgur.com/WoLvzwh.png"];
    var min = 0;
    var max = 10;
    var number = Math.floor(Math.random() * (max - min)) + min;
    var background = wallpaper[number];
        $(".mediawiki").css("background-image", "url('"+ background +"')");
        $(".mediawiki").css("background-color", "#000");
        $(".mediawiki").css("background-size", "100%");
        $(".mediawiki").css("background-attachment", "fixed");
        $(".mediawiki").css("background-repeat", "no-repeat");
        
 /* Desactivación de comentarios en blogs viejos */
window.LockOldBlogs = {
    expiryDays: 80,
    expiryMessage: "No se puede comentar en este blog, debido a que su último comentario fue hace <expiryDays> días"
    };