// LinkPreview //
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
	window.pPreview.tlen = 200;
	window.pPreview.csize = 100;
	window.pPreview.apid = false;
	window.pPreview.RegExp.noinclude = ['.work', '.trope', '.quote', '.Useful_Notes'];
	window.pPreview.delay = 200;

//Customization for imported scripts
//PreloadFileDescription, source: https://dev.fandom.com/wiki/PreloadFileDescription

PFD_license = 'Fairuse';

PFD_requireLicense = true;

PFD_discourageEditorFileUpload = true;


/* Any JavaScript here will be loaded for all users on every page load. */


/* Section Hide folder functionality */

function toggleSection(toggleObj, id, showtext, hidetext) {
  var e = document.getElementById('sectionblock'+id);
  if(toggleObj.innerHTML == showtext) {
    toggleObj.innerHTML = hidetext;
    e.style.display = 'block';
  }
  else {
    toggleObj.innerHTML = showtext;
    e.style.display = 'none';
  }

}

function toggleAllSections(toggleObj, showtext, hidetext, showall, hideall) {
  if (toggleObj.innerHTML == hideall) {
    $( ".hidelink" ).each( function (i, val) {
      if (val.innerHTML == hidetext) {
        val.onclick();
      }
    });
    toggleObj.innerHTML = showall;
  }
  else {
    $( ".hidelink" ).each( function (i, val) {
      if (val.innerHTML == showtext) {
        val.onclick();
      }
    });
    toggleObj.innerHTML = hideall;
  }
}

/* Load styles on certain marked pages */
$(function () {
    var el = document.querySelector("#mw-content-text div[id^='declare-']");
    if (!el) return;
    importArticle({
        type: "style",
        article: "MediaWiki:" + el.id.substring(8) + "Wiki.css",
    });
});