// Dieses Gadget sorgt dafür, dass sich der Fokus des Cursors auf der Hauptseite immer in der Suchbox befindet. Siehe auch [[bugzilla:1864]].
 
if (wgPageName == wgMainPageTitle) {
   if(skin=="vector")
      addOnloadHook(function() {
         $j(document).ready( function() {
            $j("#searchInput").focus();
         });
      });
   else
      addOnloadHook(function() {
         document.getElementById("searchInput").focus();
      });
}