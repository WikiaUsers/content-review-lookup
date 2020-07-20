// 09:17, March 30, 2012 (UTC)
//<source lang="JavaScript">
 
// Creamos una sección en el WikiaRail para hacer aparecer nuestro aviso.
 
if ( wgNamespaceNumber != undefined && !window.spCopy ) {
        addOnloadHook( addSPCopy );
}
 
var spCopy = true;
 
function addSPCopy () {
    $('<section class="CopyrightNotice module"><h1 style="margin-top:0px; margin-bottom:10px;">Mejorando Wiki Mitología</h1><div><p style="text-align:justify;">En estos momentos el wiki se está mejorando, si se te ocurren sugerencias sobre que agregar o quitar, no dudes en <a href="http://es.mitologia.wikia.com/wiki/User_blog:Pintor_Smeargle/Remodelación">darlas a saber</a>, ¡toda la ayuda es bienvenida!</p></div></section>').insertAfter('.ChatModule');
}
 
// </source>