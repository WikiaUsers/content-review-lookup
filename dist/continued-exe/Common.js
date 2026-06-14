/* Any JavaScript here will be loaded for all users on every page load. */
/* Username replace feature
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[Wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
 
if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

// Checks if a div with the id "spoilers_image" is clicked and then adds a
// "display:none" style attribute to a div with the id "spoilers".

document.getElementById("spoilers_image").addEventListener("click", function() {
    $('#spoilers').fadeOut(400, function () {
        this.style.display = "none";
    });
});

(function() {

    if (mw.config.get('wgPageName') !== 'Yeuxsang') {
        return;
    }

    var audioUrl = 'https://static.wikia.nocookie.net/continued-exe/images/0/04/01_-_MENU1_-_SONICEXE_OST_.mp3/revision/latest?cb=20240713233538';
    var audio = new Audio(audioUrl);
    
    audio.loop = true;
    audio.volume = 1.0;

    var startAudio = function() {
        audio.play().then(function() {
            ['click', 'mousedown', 'keydown', 'touchstart'].forEach(function(eventType) {
                document.removeEventListener(eventType, startAudio, true);
            });
        }).catch(function(error) {
        });
    };

    ['click', 'mousedown', 'keydown', 'touchstart'].forEach(function(eventType) {
        document.addEventListener(eventType, startAudio, true);
    });
})();