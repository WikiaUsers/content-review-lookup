var mainSlider = document.getElementById("gallery-main-slider");
if (mainSlider){
	var refactored = mainSlider.innerHTML.replace("<pre>","").replace("</pre>","");
	var images = refactored.split(',');
	mainSlider.innerHTML = "";
	for (i = 0; i < images.length; i++) {
	    	if (images[i].includes("youtube")) {
	      	var imageDiv = document.createElement('div');
	        imageDiv.setAttribute("class", "gallery-mySlides gallery-fade");
	        imageDiv.innerHTML = "<div class='gallery-numbertext'>"+ (i+1) +"/"+ images.length +"</div><iframe width='670' height='376' src="+ images[i] +" frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
	        mainSlider.appendChild(imageDiv);
	      } else {
	        var imageDiv = document.createElement('div');
	        imageDiv.setAttribute("class", "gallery-mySlides gallery-fade");
	        imageDiv.innerHTML = "<div class='gallery-numbertext'>"+ (i+1) +"/"+ images.length +"</div><img src="+ images[i] +" style='width:670px;height:376px;object-fit:contain;'>";
	        mainSlider.appendChild(imageDiv);
	      }
	}
	var prevButton = document.createElement('a');
	prevButton.setAttribute("class", "gallery-prev");
	prevButton.setAttribute("id", "prevbtn");
	prevButton.innerHTML = "&#10094;";
	mainSlider.appendChild(prevButton);
	var nextButton = document.createElement('a');
	nextButton.setAttribute("class", "gallery-next");
	nextButton.setAttribute("id", "nextbtn");
	nextButton.innerHTML = "&#10095;";
	mainSlider.appendChild(nextButton);
	    
    nextButton.addEventListener("click", function() {
    	plusSlides(1);
    });
    prevButton.addEventListener("click", function() {
    	plusSlides(-1);
    });
	var slideIndex = 1;
	showSlides(slideIndex);
	  
	function plusSlides(n) {
	    showSlides(slideIndex += n);
	}
	function showSlides(n) {
	    var i;
	    var slides = document.getElementsByClassName("gallery-mySlides");
	    if (n > slides.length) {slideIndex = 1;}    
	    if (n < 1) {slideIndex = slides.length;}
	    for (i = 0; i < slides.length; i++) {
	        slides[i].style.display = "none";  
	    }
	    slides[slideIndex-1].style.display = "block";  
	}
}