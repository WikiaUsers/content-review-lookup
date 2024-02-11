 /* necessary video */
    $(function () {
        $('#video-playlist').append("<iframe width='560' height='315' src='https://www.youtube.com/embed/videoseries?list=PLwDaeL3aOb-wfb59J0zp4yXd0EDNEWhH1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen></iframe>" );
    });

/* BLAZAR STONE EASTER EGG STARTS HERE */  
// Get the modal
var blazarModal = document.getElementById("blazarModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var blazarVid = document.getElementById("blazarBrace");
var blazarImg = document.getElementById("blazarStone");
var blazarAudio = new Audio("https://static.wikia.nocookie.net/ultra/images/a/a7/BlazarHenshinSound.wav/");
var gentoAudio = new Audio("https://static.wikia.nocookie.net/ultra/images/5/55/IkuzoBlazar.wav");
//var timestamp = new Date().getTime().toString();
//var dynURL = "https://media3.giphy.com/media/wG6bQxtbDBorNyTINp/giphy.gif"+timestamp;
// var captionText = document.getElementById("caption");

// play Gento's audio on hover
blazarImg.onmouseover = function() {
	gentoAudio.loop = false;
	gentoAudio.play();
}

// play Blazar audio on click
blazarImg.onclick = function() {
	//blazarVid.style.backgroundImage = "url(https://media3.giphy.com/media/aQ9oe5SS34O2BoSy0A/giphy.gif)";
	blazarModal.style.display = "flex";
	blazarAudio.loop = false;
	blazarAudio.play();
	// captionText.innerHTML = this.alt;
}

// redirect to Blazar page when ended
blazarAudio.onended = function() {
	//blazarVid.style.backgroundImage = "url(https://media3.giphy.com/media/wG6bQxtbDBorNyTINp/giphy.gif)";
	blazarModal.style.display = "none";
	blazarAudio.pause();
	blazarAudio.load();
	window.location.replace("https://ultra.fandom.com/wiki/Ultraman_Blazar_(character)");
}

// Get the <span> element that closes the modal
var blazarSpan = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
blazarSpan.onclick = function() {
	//blazarVid.style.backgroundImage = "url(https://media3.giphy.com/media/wG6bQxtbDBorNyTINp/giphy.gif)";
	blazarModal.style.display = "none";
	blazarAudio.pause();
	blazarAudio.load();
}
/* BLAZAR STONE EASTER EGG ENDS HERE */

// Removes reference numbers from the table of contents
$(function() {
	var regex = /\[[0-9]*?\]/;
	var toctexts = document.querySelectorAll(".toctext");
	for (var i = 0; i < toctexts.length; i++) {
		var withoutRef = toctexts[i].innerHTML.replace(regex,"");
	    toctexts[i].innerHTML = withoutRef;
	}
});