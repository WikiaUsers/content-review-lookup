/* Enlaces en el menú de usuario */
function subeEnlacesUtiles(){$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Especial:Contribuciones/'+ encodeURIComponent(wgUserName) +'">Contribuciones</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario_Blog:'+ encodeURIComponent(wgUserName) +'" title="Mis entradas de blog">Entradas de Blog</a></li>');$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Usuario:'+ encodeURIComponent(wgUserName) +'/wikia.css" title="Tu apariencia personal">Mi apariencia</a></li>');$('.WikiaHeader nav ul li:first-child');}addOnloadHook(subeEnlacesUtiles);