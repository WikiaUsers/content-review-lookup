/* <pre> */
/* Create a section on the WikiaRail to display stuff. */
if ( wgNamespaceNumber != undefined && !window.twModule ) {
        addOnloadHook( addModule1 );
}
 
var twModule = true;
 
function addModule1 () {
    $('<section class="Module1 module"><h1 style="margin-top:0px; margin-bottom:10px;">I ♥ Rias Gremory</h1><div><p><img src="http://media.animevice.com/uploads/1/10200/495119-rias_gremory.png"></p></div></section>').insertBefore('.WikiaActivityModule');
}
/* </pre> */