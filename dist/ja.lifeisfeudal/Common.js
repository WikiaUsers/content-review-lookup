/* ここにあるすべてのJavaScriptは、すべてのページ読み込みですべての利用者に対して読み込まれます */
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

/***********************************************
/* Fix the alignment of the content background *
/***********************************************/

function fixContent () {
    var content = $('div#content');
    var baseWidth = 1612;
    var baseInset = 60;
    
    var ratio = $(content).width() / baseWidth;
    var result = Math.floor(baseInset * ratio);
    
    $(content).css('border-width',result + 'px 0');
    $(content).css('background-position','left -' + result + 'px, left calc(100% + ' + result + 'px), left top');
    $(content).css('padding','1em ' + result + 'px');
};

fixContent();

$( window ).on('resize',fixContent);