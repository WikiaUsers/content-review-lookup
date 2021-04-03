/* Any JavaScript here will be loaded for users using the Hydra Dark skin */


/* Collapsible infobox sections */
var collapsing = document.querySelectorAll(".section-collapse");
if (collapsing.length > 0) {
    for (var i = 0; i < collapsing.length; i++) {
        collapsing[i].addEventListener('click', collapseHandler, false);
        for (var c = collapsing[i].parentNode.parentNode.nextSibling; c; c = c.nextSibling) {
            if (c.classList) {
                if (c.classList.contains("section-collapse") || c.classList.contains("stop-section-collapse"))
                    break;
                c.classList.add('section-collapsed');
            }
        }
    }
}

function collapseHandler() {
    if (!this.parentNode) return;

    var hasFlag = false;
    var flag;
    for (var c = this.parentNode.parentNode.nextSibling; c; c = c.nextSibling) {
        if (c.classList) {
            if (c.classList.contains("section-collapse") || c.classList.contains("stop-section-collapse"))
                break;
            if (!hasFlag) {
                hasFlag = true;
                flag = c.classList.contains('section-collapsed');
            }
            if (flag)
                c.classList.remove('section-collapsed');
            else
                c.classList.add('section-collapsed');
        }
    }
    this.classList.toggle('collapsed-icon');
}

$(collapseHandler);