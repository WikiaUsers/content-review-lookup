// Make the tech tree horizontally draggable
(function (window, $, mw) {
  if (window.draggableTechTreeLoaded) {
    return;
  }
  window.draggableTechTreeLoaded = true;

  mw.hook("wikipage.content").add(function ($content) {
    var techtree = $(".techtree");
    techtree.mousedown(mouseDownHandler);

    var pos = { left: 0, x: 0 };
    function mouseDownHandler(e) {
      pos = {
        left: techtree.scrollLeft(), // The current scroll
        x: e.clientX, // Get the current mouse position
      };
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      techtree.css("cursor", "grabbing"); // Change the cursor
      techtree.css("userSelect", "none"); // prevent user from selecting the text
    }
    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mousemove', mouseMoveHandler);
      
      techtree.css("cursor", "grab");
      techtree.css("userSelect", "auto");
    }
    function mouseMoveHandler(e) {
      const dx = e.clientX - pos.x;
      techtree.scrollLeft(pos.left - dx);
    }
  });
})(this, jQuery, mediaWiki);