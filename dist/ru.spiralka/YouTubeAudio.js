// YouTubeAudio by "The JoTS"
// v2.0.0
 
// todo: allow styling on slider/range and play button image.
 
// Converts elements created by deprecated <youtube> tags with an audio player.
// (This allows for continued support on the mercury/wikiamobile skin while the desktop and tablet versions
//  get a more capable player.)
 
$.getScript("https://www.youtube.com/iframe_api");
 
var i18n = {
    en: {
        play: "Play sound", 
        pause: "Pause sound",
    },
    be: {
        play: "Прайграць", 
        pause: "Прыпыніць",
    },
    ru: {
        play: "Воспроизвести", 
        pause: "Приостановить",
    },
    uk: {
        play: "Відтворити", 
        pause: "Призупинити",
    },
    playImg: "/extensions/OggHandler/play.png",
    pauseImg: "/extensions/OggHandler/pause.png"
},
 
play = (typeof window.ytPlay === 'string' && window.ytPlay) ||
    i18n[mw.config.get('wgContentLanguage')].play || translations.en.play,
pause = (typeof window.ytPause === 'string' && window.ytPause) ||
    i18n[mw.config.get('wgContentLanguage')].pause || translations.en.pause;
 
 
// Functions
function updateVideoAndPlay(player, range) {
    player.seekTo(player.getDuration() / 100 * range.value, true);
    player.playVideo();
}
 
function affixSlider(player, range) {
    var vidLength = 0;  // video length in seconds
    var step = 0;       // step per interval
    var elapsedPer = 0; // elapsed percent (slider position)
    var cnxPromise;     // promise for a "connection" to a range stepper
 
    // Set range step interval, initial elapsed percentage (slider position)
    var t = setInterval(function() {
        if(vidLength = player.getDuration()) {
            clearInterval(t);
            step = 0.2 / vidLength * 100;
            range.value = (elapsedPer =
                player.getCurrentTime() / vidLength * 100);
        }
 
    }, 100);
 
    // Step range by interval
    cnxPromise = new Promise(function(resolve, reject) {
        resolve(
            setInterval(function() { range.value = (elapsedPer += step); }, 200)
        );
    });
 
    return cnxPromise;
}
 
function createPlayersFromFlash(objs) {
    objs.each(function() {
        var vid;    // to hold the video's id
        var player; // to hold the YouTube player object
 
        var sliderStep; // "connection" for incrementing slider position
 
        // Verify if YouTube flash object
        if ( this.hasAttribute("data") === null
            || this.getAttribute("height") === null || parseInt(this.getAttribute("height"), 10) > 30
            || !((vid = /youtube.com\/v\/([\w_-]+)/.exec(this.getAttribute("data"))).length) ) return;
 
        vid = vid[1]; // no need to keep array ref
 
        // Elements
        var $cont = $("<div>").insertAfter(this);
        var $btn =
            $("<button style='width:180px;text-align:center;' class='yt-audio' title='"
            + play + "'></button>").appendTo($cont);
        var pDiv  = $("<div>").insertBefore($btn)[0];
        var img   = $("<img src='" + i18n.playImg + "' width='22' height='22' alt='" + play + "'>").appendTo($btn)[0];
        var range = $("<input type='range' style='display:none; width:100%;'>").appendTo($cont)[0];
 
        // Functions
        var setButtonImg = function(state) {
            // use psuedo-enum instead of boolean for posterity
            img.setAttribute("src",
                (state === YT.PlayerState.PLAYING
                    ? i18n.pauseImg
                    : i18n.playImg ));
        };
        var showRange = function(visible)
            { range.style.display = (visible ? "block" : "none"); };
 
        $(this).remove(); // remove flash player
 
        // Events
        range.onmousedown = function() { player.pauseVideo(); };
        range.onmouseup   = function() { updateVideoAndPlay(player, range); };
        $btn.click(function() {
            switch(player.getPlayerState()) {
                case YT.PlayerState.PLAYING:
                case YT.PlayerState.BUFFERING:
                    // Pause
                    player.pauseVideo();
                    showRange(false);
                    break;
 
                default:
                    // Play/resume
                    player.playVideo();
            }
        });
 
        // Create player
        player = new YT.Player(pDiv, {
            height: '0',
            width:  '0',
            videoId: vid,
            events: {
                "onStateChange": function(e) {
                    setButtonImg(e.data);
                    switch(e.data) {
                        case YT.PlayerState.ENDED:
                            showRange(false);
                        case YT.PlayerState.PAUSED:
                        case YT.PlayerState.BUFFERING:
                            clearInterval(sliderStep);
                            break;
 
                        case YT.PlayerState.PLAYING:
                            showRange(true);
                            clearInterval(sliderStep); // just in case
                            affixSlider(player, range).then(
                                function(v)   { sliderStep = v; },
                                function(err) { console.log(err);} );
                    }
                }
            }
        });
 
        // console.log("Player ready! v=" + vid);
 
    });    
}
 
 
// Main function
$(function(window, mw) {
    var objs = $("object[type=\"application/x-shockwave-flash\"");
 
    var t = setInterval(function() {
        // wait until YT is defined
 
        if(typeof(YT) === "undefined"||typeof(YT.Player) === "undefined")return;
 
        clearInterval(t); // terminate interval
        createPlayersFromFlash(objs); // callback
    }, 100);
 
});