/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
/* Any JavaScript here will be loaded for all users on every page load. */

/* Implements section-collapse and stop-section-collapse */
var collapsing = document.querySelectorAll(".section-collapse");
if (collapsing.length>0) {
    for (var i = 0; i < collapsing.length ; i++) {
        collapsing.item(i).addEventListener('click',collapseHandler,false);
        if (collapsing.item(i).classList.contains("collapsed"))
            collapseHandlerThis(collapsing.item(i));
    }
}

function collapseHandler() {
   collapseHandlerThis(this);
}
function collapseHandlerThis(t) {
   var c = t.parentNode.parentNode.nextSibling;
   while (c) {
      if (c.classList) {
        if (c.classList.contains("section-collapse") || c.classList.contains("stop-section-collapse"))
           break;
        c.classList.toggle('section-collapsed');
      }
      c = c.nextSibling;
   }
   t.classList.toggle('collapsed-icon');
}