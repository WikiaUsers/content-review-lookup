// ============================================================
// Hide AzBot Uploads
//
// Function: Hides new version uploads by AzBot in Especial:Registro
// ============================================================

function hideBotUploads() {
    if (wgCanonicalSpecialPageName && wgCanonicalSpecialPageName == 'Registro') {
        var Lists = document.getElementsByTagName('li');
        for (var i=0; i < Lists.length; i++) {
            if (Lists[i].className.split(" ").indexOf("mw-logline-upload") > -1) {
                var listLink = Lists[i].childNodes[1].href;
                if(listLink == null || listLink == undefined) return;

                /* Only hide if it is an upload by AzBot */
                if (listLink.indexOf('User:AzBot') > -1 || listLink.indexOf('User:PNGOptimisationBot') > -1) {
                       Lists[i].style.display = "none";
                   
               }
            }
        }
    }
}
addOnloadHook(hideBotUploads);