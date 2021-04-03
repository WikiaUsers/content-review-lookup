/* Any JavaScript here will be loaded for all users on every page load. */

// Fix do zakładek na profilach użytkowników
if (mw.config.get('wgNamespaceNumber') === 202) {
    document.getElementById('ca-userprofile').classList.add('selected');
    document.getElementById('ca-user').classList.remove('selected');
}

function fixWidthEvent(event) {
    var mainright = document.getElementById('mp-right');
    var mpmain = document.getElementById('mp-main');
    if (mainright && mpmain) {
       if (document.body.clientWidth<1340) {
          mpmain.setAttribute('style','margin-right:0px');
          mainright.setAttribute('style','float:none;margin-left:0px;width:auto;padding:0.5em;clear:both;');
       } else if (document.body.clientWidth>=1340) {
          mpmain.removeAttribute('style');
          mainright.removeAttribute('style');
       }
   }
}

function fixWidths() {
    if (document.getElementById('mp-main')) {
        fixWidthEvent()
        window.addEventListener('resize',fixWidthEvent);
    }
}

fixWidths();

/* alternating icons code */
var rs = document.querySelectorAll(".randomlyselect");
if (rs.length>0) {
  selectOne(rs);
}

function selectOne(rs) {
  var i = Math.floor(Math.random()*rs.length);
  rs.item(i).style.display="inline-block";
}


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