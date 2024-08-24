/* Usuario con Cargo */
 
(function () {
        "use strict";
        var userRightsList = {
            "Hardwellfan2": ["Reversor"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());
 
(function () {
        "use strict";
        var userRightsList = {
            "Tono555": ["Burócrata"]
        };
 
        if ($('.masthead-info hgroup').length) {
            var name = $('.masthead-info h1[itemprop="name"]').text();
            if (userRightsList[name] !== undefined) {
                var i;
                for (i = 0; i < userRightsList[name].length; i++) {
                    $('.masthead-info hgroup').append('<span class="tag">' + userRightsList[name][i] + '</span>');
                }
            }
        }
    }());

/* Notificación */

var WikiaNotificationMessage = "Las solicitudes de Administrador, Moderador y Reversor están abiertas, ve y <a href='/wiki/Project:Administradores'>solicita</a> el rango que quieras :)";
importScriptPage('WikiaNotification/code.js', 'dev');
$(function() {

});