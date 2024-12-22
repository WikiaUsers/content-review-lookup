var parentDiv = document.querySelector('.mw-parser-output');
var videoElements = parentDiv.querySelectorAll('[id^="VideoTemplate-"]');

for(var i = 0; i < videoElements.length; i++){
	var element = videoElements[i];
	
	var elementID = element.id.split("-");
	var weapon = elementID[1];
	var move = elementID[2];
	var videoElement = document.createElement("video");
	videoElement.classList.add("video");
	
	videoElement.onclick = function(){
		this.controls = "true";
		this.loop = "false";
	}
	
	videoElement.src = 'https://rus1130.github.io/afbg/'+ weapon +'/'+ move +'.mp4';
	videoElement.type = "video/mp4";
	videoElement.title = "click to enable controls"
	videoElement.muted = "true";
	videoElement.loop = "true";
	videoElement.autoplay = "true";
	
	element.appendChild(videoElement);
	element.classList.remove("video-loading");
}