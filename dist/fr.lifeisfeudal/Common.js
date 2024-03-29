/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */
/* Any JavaScript here will be loaded for all users on every page load. */
var collapsing = document.querySelectorAll(".section-collapse");
if (collapsing.length>0) {
    for (var i = 0; i < collapsing.length ; i++) {
        collapsing.item(i).addEventListener('click',collapseHandler,false);
    }
}

function collapseHandler() {
   var c = this.parentNode.parentNode.nextSibling;
   while (c) {
      if (c.classList) {
        if (c.classList.contains("section-collapse") || c.classList.contains("stop-section-collapse"))
           break;
        c.classList.toggle('section-collapsed');
      }
      c = c.nextSibling;
   }
   this.classList.toggle('collapsed-icon');
}