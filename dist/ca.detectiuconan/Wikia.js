/* Etiqueta amb el flag */
    (function () {
        "use strict";
        var userRightsList = {
            "MarcmpujolBot": ["Bot"]
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
 
/* Etiqueta per inactius */
InactiveUsers = { text: 'Inactiu' };
importScriptPage('InactiveUsers/code.js', 'dev');

// **************************************************
//                    Not�cies
// **************************************************
/* Afegeix en les not�cies un header especial - prova */
$('body.ns-116 .WikiHeader .wordmark.graphic ').bind('click.cap�alera', function(){ window.location.href = 'http://ca.detectiuconan.wikia.com/wiki/Noticia:�ndex'; return false; });
 
$(function(){
  if ( window.wgAction == 'edit' ) {
    $(".WikiaMainContent").css("width", "1030px").css("padding", "0px");
  }
});