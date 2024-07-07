(function() {
  var images = document.querySelectorAll("img");

  images.forEach(function(img) {
  	
    var widthMatch = img.outerHTML.match(/(\d+)(px|пкс)/i);
    if (widthMatch) {
      var width = parseInt(widthMatch[1], 10);
      img.style.width = width + "px"; 
      img.classList.add("adaptive-image"); 

      if (window.innerWidth <= 600) {
        img.style.width = width + "px";
      }
    }
  });
})();