// Create a section on the WikiaRail to display the copyright notice.
 
if ( wgNamespaceNumber != undefined && !window.atwCopy ) {
        addOnloadHook( addATWCopy );
}
 
var atwCopy = true;
 
function addATWCopy () {
    $('<section class="CreatePage module"><h1 style="margin-top:0px; margin-bottom:10px;">Create a page</h1>
<span class="button">Test</span></section>').insertBefore('.WikiaActivityModule');
}