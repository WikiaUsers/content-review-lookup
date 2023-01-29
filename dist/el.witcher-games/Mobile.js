/* Any JavaScript here will be loaded for users using the mobile site */


/* Collapsible infobox sections */

var collapsing = document.querySelectorAll(".section-collapse");
if (collapsing.length>0) {
    for (var i = 0; i < collapsing.length ; i++) {
        collapsing.item(i).addEventListener('click',collapseHandler,false);
        var c = collapsing.item(i).parentNode.parentNode.nextSibling;
        while (c) {
            if (c.classList) {
                if (c.classList.contains("section-collapse") || c.classList.contains("stop-section-collapse"))
                    break;
                c.classList.add('section-collapsed');
            }
            c = c.nextSibling;
        }
    }
}

function collapseHandler() {
   if (this.parentNode == null) return;
    var c = this.parentNode.parentNode.nextSibling;
    var hasflag = false;
    var flag;
    while (c) {
        if (c.classList) {
            if (c.classList.contains("section-collapse") || c.classList.contains("stop-section-collapse"))
                break;
            if (!hasflag) {
                hasflag = true;
                flag = c.classList.contains('section-collapsed');
            }
            if (flag)
                c.classList.remove('section-collapsed');
            else
                c.classList.add('section-collapsed');
        }
        c = c.nextSibling;
    }
    this.classList.toggle('collapsed-icon');
}

$(collapseHandler);