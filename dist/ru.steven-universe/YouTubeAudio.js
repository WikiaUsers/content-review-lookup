//taken from http://dev.wikia.com/wiki/MediaWiki:YouTubeAudio.js and customized.

// YouTubeAudio by "The JoTS"
// v1.0.0.1 (m update 24 October 2016)
 
// Converts elements created by deprecated <video> tags with an audio player.
// (This allows for continued support on wikiamobile skin while the desktop/tablet versions
//  get a more capable player.)
$.getScript("https://www.youtube.com/iframe_api");
 
$(function() {
    var objs = $("object");
 
    objs.each(function() {
        var vid;    // to hold the video's id
        var player; // to hold the YouTube player object
 
        if ( this.getAttribute("type") === "application/x-shockwave-flash"
            && this.hasAttribute("data") !== null
            && this.getAttribute("height") !== null && parseInt(this.getAttribute("height"), 10) <= 30
            && (vid = /youtube.com\/v\/([\w_-]+)/.exec(this.getAttribute("data"))).length ) {
 
            vid = vid[1]; // no need to keep array ref
 
            var $btn = $("<button style='width:180px;text-align:center;' title='Play sound'></button>").insertAfter(this);
            var pDiv = $("<div></div>").insertBefore($btn)[0];
            var img  = $("<img class='fakeplayer' src='https://vignette.wikia.nocookie.net/steven-universe/images/f/fb/Notspriteplay.png' width='16' height='16' alt='Play sound'>").appendTo($btn)[0];
 
            var toggleButtonImg = function(playing) {
                img.setAttribute("src", "https://vignette.wikia.nocookie.net/steven-universe/images/" + (playing ? "b/bb/Notspritepause.png" : "f/fb/Notspriteplay.png"));
            };
 
            var t = setInterval(function() {
                // wait until YT is defined
                if (typeof(YT) === "undefined" || typeof(YT.Player) === "undefined") return;
                clearInterval(t);
 
                $btn.click(function() {
                    if (   player.getPlayerState() === YT.PlayerState.PLAYING
                        || player.getPlayerState() === YT.PlayerState.BUFFERING ) {
                        player.pauseVideo();
                        toggleButtonImg(false);
                    } else {
                        player.playVideo();
                        toggleButtonImg(true);
                    }
                });
 
                player = new YT.Player(pDiv, {
                    height: '0',
                    width:  '0',
                    videoId: vid,
                    events: {
                        "onStateChange": function(e) {
                            if (e.data !== YT.PlayerState.ENDED) return;
                            toggleButtonImg(false);
                        }
                    }
                });
 
                // console.log("Player ready! v=" + vid);
 
            }, 100);
 
            $(this).remove(); // remove flash player
        }
    });
});