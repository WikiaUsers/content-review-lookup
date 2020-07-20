/* <pre> */
/* Create a section on the WikiaRail to display the copyright notice. */
if ( wgNamespaceNumber != undefined && !window.rswCopy ) {
        addOnloadHook( addRSWCopy );
}
 
var rswCopy = true;
 
function addRSWCopy () {
    $('<section class="CopyrightNotice module"><center><img src="http://pkhack.altervista.org/_altervista_ht/Disney_league_logo_s.png"/></center><div><center><b><p><img src="http://pkhack.altervista.org/_altervista_ht/mickey_mouse_head_supersmall.png"/> <a href="http://disneymania.forumcommunity.net/" target="_blank">Disney Mania</a><br /><img src="http://pkhack.altervista.org/_altervista_ht/mickey_mouse_head_supersmall.png"/> <a href="http://pkfanzone.forumcommunity.net/" target="_blank">Pk Fan Zone</a><br><img src="http://pkhack.altervista.org/_altervista_ht/mickey_mouse_head_supersmall.png"/> <a href="http://pkhack.altervista.org/" target="_blank">Pk hack</a><br><img src="http://pkhack.altervista.org/_altervista_ht/mickey_mouse_head_supersmall.png"/> <a href="http://topoinfo.altervista.org/" target="_blank">Topoinfo</a><br><img src="http://pkhack.altervista.org/_altervista_ht/mickey_mouse_head_supersmall.png"/> <a href="http://xmickeyfanzone.forumcommunity.net/" target="_blank">X Mickey fan zone</a></p></b></center></div></section>').insertBefore('.LatestPhotosModule');
}
/* </pre> */