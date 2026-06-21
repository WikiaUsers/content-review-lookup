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
(function() {
    'use strict';

    if (mw.config.get('wgPageName') !== 'The_horrifying_orange_gal') {
        return;
    }

    var videoUrl = "https://static.wikia.nocookie.net/fridaynightfunking/images/d/d5/DangerCutscene.mp4/revision/latest?cb=20230124051331";

    var style = document.createElement('style');
    style.innerHTML = [
        '@keyframes wtfamidoing {',
        '    0% { bottom: 120%; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    25% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    43% { bottom: 490px; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    60% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    72% { bottom: 240px; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    82% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    90% { bottom: 95px; animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); }',
        '    95% { bottom: 0px; animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1); }',
        '    98% { bottom: 35px; animation-timing-function: ease-in; }',
        '    100% { bottom: 0px; }',
        '}',
        '.fandom-infinite-bounce-video {',
        '    position: fixed !important;',
        '    z-index: 999999 !important;',
        '    width: 420px !important;',
        '    height: 236px !important;',
        '    background-color: #000000 !important;',
        '    border: none !important;',
        '    box-shadow: none !important;',
        '    overflow: hidden !important;',
        '    animation: wtfamidoing 2.5s forwards !important;',
        '    pointer-events: none !important;',
        '}'
    ].join('\n');
    document.head.appendChild(style);

    function spawnVideoInstance() {
        if (!document.body) return;

        var wrapper = document.createElement('div');
        wrapper.className = 'fandom-infinite-bounce-video';
        
        var randomLeftPosition = Math.floor(Math.random() * 76); 
        wrapper.style.left = randomLeftPosition + '%';

        wrapper.innerHTML = '<video ' +
            'src="' + videoUrl + '" ' +
            'autoplay unmuted loop playsinline ' +
            'style="width:100% !important; height:100% !important; object-fit: contain;">' +
            '</video>';

        document.body.appendChild(wrapper);

        setTimeout(function() {
            if (wrapper && wrapper.parentNode) {
                wrapper.parentNode.removeChild(wrapper);
            }
        }, 13000);

        var randomDelay = Math.floor(Math.random() * 1000) + 1000;
        setTimeout(spawnVideoInstance, randomDelay);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', spawnVideoInstance);
    } else {
        spawnVideoInstance();
    }
})();