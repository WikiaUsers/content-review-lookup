/* Tập hợp các code JS tiềm năng */
/* All Hail Monobook */
if (wgAction == 'submit' || wgAction == 'edit')  {
url = window.location.href;
if(url.indexOf("?useskin=monobook") < 0 && url.indexOf("&useskin=monobook") < 0) {
     var seperator = (window.location.href.indexOf("?") < 0)?"?":"&";
     window.location.href = window.location.href + seperator + "useskin=monobook";
}

if ( config.wgAction === 'view' ) {
url = window.location.href;
if(url.indexOf("?&useskin=venus") < 0 && url.indexOf("&useskin=venus") < 0) {
     var seperator = (window.location.href.indexOf("?") < 0)?"?":"&";
     window.location.href = window.location.href + seperator + "&useskin=venus";
}