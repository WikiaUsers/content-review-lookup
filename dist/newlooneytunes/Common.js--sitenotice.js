/* <pre> */
/* Create a section on the WikiaRail to display the copyright notice. */
if ( wgNamespaceNumber != undefined && !window.rswCopy ) {
        addOnloadHook( addRSWCopy );
}
 
var rswCopy = true;
 
function addRSWCopy () {
    $('<section class="CopyrightNotice module"><h1 style="margin-top:0px; margin-bottom:10px;">Hi</h1>Thanks for visiting.</section>').insertBefore('.LatestPhotosModule');
}
/* </pre> */