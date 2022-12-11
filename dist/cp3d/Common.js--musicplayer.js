/* Any JavaScript here will be loaded for all users on every page load. */
/* Any JavaScript here will be loaded for all users on every page load. */
var amogus = getElement("bruh") ? true : false;

if(amogus) {
	var musicPlayerElement = document.createElement("div");
	musicPlayerElement.id = "music-player";
	var bruhElement = getElement("bruh");
	var bruhData = bruhElement.dataset;
	var bruhURL = bruhData.url;
	musicPlayerElement.innerHTML = '<section><audio loop id="player" src="https://static.wikia.nocookie.net/cp3d/images/' + bruhURL + '"></audio><div><div id="hub" style="display: inline-block;" onclick="doTheThing()"><img src="https://static.wikia.nocookie.net/cp3d/images/d/df/Record-whenpaused.png/" height="100px"></div><div id=play-audio style="display: none;"  onclick="playAudio()"><img src="https://static.wikia.nocookie.net/cp3d/images/d/df/Record-whenpaused.png/" height="100px"></div><div id=pause-audio style="display: none;" onclick="pauseAudio()"><img src="https://static.wikia.nocookie.net/cp3d/images/1/1a/Record-whenplaying.gif/revision/latest?cb=20221209221613" height="100px"></div></div></section>';
	getElement("bruh").appendChild(musicPlayerElement);
}

function getElement(id) {
	return document.getElementById(id);
}

function playAudio() {
	document.getElementById('player').play();
	show('pause-audio');
	isPlayerPaused = false;
}
function pauseAudio() {
    document.getElementById('player').pause();
    show('play-audio');
    isPlayerPaused = true;
}
var isPlayerPaused = true;
function doTheThing() {
    if(isPlayerPaused == true)
    {
      playAudio();
    }
    else{
      pauseAudio();
    }
}
function show(param_div_id) {
    getElement("hub").innerHTML = document.getElementById(param_div_id).innerHTML;
}