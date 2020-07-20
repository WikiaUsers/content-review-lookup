// Create a section on the WikiaRail to display the copyright notice.

if ( wgNamespaceNumber != undefined && !window.zacCopy ) {
        addOnloadHook( addZACCopy );
}
 
var zacCopy = true;
 
function addZACCopy () {
    $('<section class="CopyrightNotice module"><h1 style="margin-top:0px; margin-bottom:10px;">Welcome to ZaC Wiki!</h1><div><p style="text-align:justify;">This is an unofficial wiki-resource dedicated to anything related to Zombies and Cheerleaders. It is also a community site where you can discuss the show.</p></div></section>').insertBefore('.LatestPhotosModule');
}