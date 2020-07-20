/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
function onloadhookcustom() {
	if( skin == 'oasis' ) {
                 var replace = document.getElementById("chat");
                    if (null != replace) {
                      replace.innerHTML='<iframe src="http://webchat.freenode.net?channels=wikia-wakfu-es" width="670" height="550"></iframe>';
                    if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
                    else window.onbeforeunload = confirmexitjrchat;

                 }
        } else {
                 var replace = document.getElementById("chat");
                    if (null != replace) {
                      replace.innerHTML='<iframe src="http://webchat.freenode.net?channels=wikia-wakfu-es" width="700" height="550"></iframe>';
                    if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
                    else window.onbeforeunload = confirmexitjrchat;

                    }
        }
  //alert(document.getElementById("chat").innerHTML);
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);

//Configuraciones para pagePreview
window.pPreview = {
    noimage: 'https://vignette.wikia.nocookie.net/wakfu/images/b/b2/No_encontrado.png/revision/latest?cb=20171010001110&path-prefix=es',
};