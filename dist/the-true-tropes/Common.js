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