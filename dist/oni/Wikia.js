/* Pop-up images remover */

function imagelinks() {
    var a = document.getElementsByTagName("a");
    for ( var t = 0; t < a.length; ++t ) {
        var a2 = a[t];
        var img = a2.getElementsByTagName("img");
        if ( img[0] != null ) {
            if ( a2.href.indexOf("images.wikia.com") != -1 ) {
                var link = wgServer + '/wiki/File:' + a2.href.substring(a2.href.lastIndexOf('/') + 1);
                a2.setAttribute('href',link);
                a2.onclick = (function (link_a) { return function(){window.location=link_a; return false};})(link);
            }
        }
    }
}

addOnloadHook(imagelinks);