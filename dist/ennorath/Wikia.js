/* Any JavaScript here will be loaded for all users on every page load. */

/* Import 
 
importArticles({
    type: "script",
    articles: [
        'u:onepiece:MediaWiki:Common.js/elementClass.js',
        'u:dev:Toggler.js',
        'u:dev:ReferencePopups/custom.js',
        'u:joeplayground:MediaWiki:Tooltip.js'
    ]
});
 
 
/* Allow direct link to Tabber //
 
tabberOptions = {
  onLoad: function() {
    if (window.location.hash) {
      var hash = (window.location.hash).replace('#', '').replace(/_/g, ' ');
      var currentTabber = this;
      $(".tabbernav li a", this.div).each(function(i) { 
        if ($(this).attr("title") === hash ) currentTabber.tabShow(i);
      });
      /*delete currentTabber;//
    }
  }
};

/*
//Make the DIV element draggable:
dragElement(document.getElementById(("mydiv")));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    //* if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    //* otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    //* stop moving when mouse button is released:*
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/