mw.hook('wikipage.content').add(function() {
  function initComparisons() {
    var x = document.getElementsByClassName("img-comp-overlay");
    for (var i = 0; i < x.length; i++) {
      compareImages(x[i]);
    }
  }

  function compareImages(img) {
    // Avoid creating multiple sliders
    if (img.previousElementSibling && img.previousElementSibling.classList.contains("img-comp-slider")) {
      return; // Skip if a slider already exists
    }

    var slider, clicked = 0, w, h;
    
    // Get the width and height of the img element
    w = img.offsetWidth;
    h = img.offsetHeight;
    
    // Check if dimensions are valid before proceeding
    if (w === 0 || h === 0) {
      return; // Skip if dimensions are 0
    }
    
    // Set the width of the overlay image to 50% initially
    img.style.width = (w / 2) + "px";
    
    // Create the slider element
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    img.parentElement.insertBefore(slider, img);
    
    // Position the slider in the middle
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    
    // Event listeners for mouse and touch
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);
    
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      // Use a variable to track the number of active listeners
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      clicked = 0;
      // Remove the event listeners after finishing
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
    }

    function slideMove(e) {
      if (clicked === 0) return false;
      var pos = getCursorPos(e);
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }

    function getCursorPos(e) {
      e = e.changedTouches ? e.changedTouches[0] : e;
      var a = img.getBoundingClientRect();
      var x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }

    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }

  // Listen for tab changes to initialize comparisons
  $('.tabber').on('click', function() {
    // Delay initialization to ensure images are loaded
    setTimeout(initComparisons, 100);
  });

  // Initialize comparisons once when the page loads
  initComparisons();
});