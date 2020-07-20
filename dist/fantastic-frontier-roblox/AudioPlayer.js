$(function() {
    // Define utility functionality.
    function str_pad_left(string,pad,length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
    }
    
    function pretty_print_time(time) {
        return Math.floor(time / 60) + ':' + str_pad_left(Math.floor(time % 60), '0', 2);
    }
    
    // Known audio encodings for file formats.
    var encodings = {
        mp3: "audio/mpeg",
        ogg: "audio/ogg",
        wav: "audio/wav",
        webm: "audio/webm"
    };
    
    // Placeholder texts used by the AudioPlayer & YoutubePlayer templates.
    var defaultId = [
        "Youtube video id",
        "Video/audio id",
        "Audio files separated by comma",
        "Audio files separated by comma or ids from 3rd party sources"
    ];
    
    // Base path for our self-hosted audio files.
    var FILE_BASE = "https://vignette.wikia.nocookie.net/fantastic-frontier-roblox/images/";
    
    // Base path for vocaroo-hosted audio files.
    var VOCAROO_BASE = "https://vocaroo.com/media_command.php?media=";
    
    // Loop all found audio players on the article.
    $(".audio-player").each(function() {
        var ap = $(this); // Current audio player tag.
        
        // Get widget stats.
        var id = ap.attr("data-id");
        var title = ap.attr("data-title");
        var authors = ap.attr("data-authors");
        var notes = ap.attr("data-notes");
        var aType = ap.attr("data-type");
        var isFile = ap.hasClass("audioplayer-file");
        
        if (aType === "" || aType === undefined)
            aType = "vocaroo";
        
        // Replacement widget.
        var widget = $("<div class=\"audio-player\"><div class=\"icon missing\"></div><div class=\"options\"></div><span class=\"aplayer-title\"></span><span class=\"aplayer-timer\"><span class=\"aplayer-timer-text\">[-:-- / -:--]</span><span class=\"aplayer-tslider\"><span class=\"aplayer-tslider-curr\" style=\"width:0%\"></span></span></span><span class=\"aplayer-notes\"></span></div>");
        var icon = widget.find(".icon");
        
        widget.find(".aplayer-title").text(title + " - " + authors);
        widget.find(".aplayer-notes").text(notes);
        
        // Visual display of time & duration of audio.
        var timer = widget.find(".aplayer-timer-text");
        var slider = widget.find(".aplayer-tslider");
        var slider_curr = slider.find(".aplayer-tslider-curr");
        
        ap.replaceWith(widget);
        
        var loadAudioNative = function(audio) {
            // No audio source, so either no valid file format was added or no file was supplied at all.
            if (audio.src.length === 0) {
                timer.text("Could not load audio.");
                return;
            }
            
            // Allow download & volume control if we're using a direct audio file.
            widget.find(".options").html("<div class=\"opt-icon download\" title=\"Download\"></div><div class=\"opt-icon volume\" title=\"Volume\"><div class=\"slider-box\"><div class=\"slider-bar\"><div class=\"slider-value\" style=\"width:50%\"></div></div><div class=\"volume-value\">100%</div></div></div>");
            
            // Clicking download will open the audio source in a new tab/window.
            widget.find(".opt-icon.download").click(function() {
                window.open(audio.src);
            });
            
            // Volume control.
            var volumeBar = widget.find(".opt-icon.volume .slider-bar");
            var updateVolumeDisplay = function() {
                widget.find(".opt-icon.volume .volume-value").text(Math.floor(audio.volume * 100) + "%");
                widget.find(".opt-icon.volume .slider-value").css({"width": (audio.volume * 100) + "%"});
            };
            
            // Actions for volume bar to update volume.
            var isHoldingVolume = false;
            var handleVolumeCallback = function(e) {
                var posX = e.pageX - volumeBar.offset().left;
                var p = posX / volumeBar.width(); // Volume can range from 0% to 100%.
                // Snap to 0%, 50% or 100%.
                if (p >= 0.98)
                    p = 1;
                else if (p >= 0.49 && p <= 0.51)
                    p = 0.5;
                else if (p <= 0.02)
                    p = 0;
                
                audio.volume = p;
                updateVolumeDisplay();
            };
            
            volumeBar.mousedown(function(e) {
                isHoldingVolume = true;
                handleVolumeCallback(e);
            });
            volumeBar.mouseup(function() {
                isHoldingVolume = false;
            });
            volumeBar.mousemove(function(e) {
                if (isHoldingVolume)
                    handleVolumeCallback(e);
            });
            
            var duration, playTimer;
            var playerIsPlaying = false; // To use outside of our code below.
            
            var updateTimer = function(ended) {
                var curr = ended ? duration : audio.currentTime;
                timer.text("[" + pretty_print_time(curr) + " / " + pretty_print_time(duration) + "]");
                slider_curr.css({"width": ((curr / duration) * 100) + "%"});
            };
            
            audio.onloadedmetadata = function() {
                duration = audio.duration;
                timer.text("[0:00 / " + pretty_print_time(duration) + "]"); // Init timer.
                
                icon.removeClass("missing").removeClass("pause").addClass("play");
                icon.css({"cursor": "pointer"}); // The button can now be clicked.
                slider.css({"cursor": "pointer"}); // The slider can now be clicked.
                
                updateVolumeDisplay();
            };
            
            audio.onended = function() {
                playerIsPlaying = false;
                icon.removeClass(!playerIsPlaying ? "pause" : "play").addClass(!playerIsPlaying ? "play" : "pause");
                updateTimer(true);
                clearInterval(playTimer);
            };
            
            audio.onerror = function() {
                timer.text("Could not load audio.");
            };
            
            // Click listener to toggle playing the audio.
            icon.click(function() {
                if (playerIsPlaying) {
                    audio.pause();
                    clearInterval(playTimer);
                } else {
                    audio.play();
                    playTimer = setInterval(updateTimer, 100);
                }
                playerIsPlaying = !playerIsPlaying;
                icon.removeClass(!playerIsPlaying ? "pause" : "play").addClass(!playerIsPlaying ? "play" : "pause");
            });
            
            slider.click(function(e) {
                var posX = e.pageX - slider.offset().left;
                var p = posX / slider.width();
                
                audio.currentTime = p * duration;
                updateTimer();
            });
            
            audio.preload = true;
        };
        
        // Check, because we don't allow playing if there's no audio specified.
        if (id.length > 0 && (defaultId.indexOf(id) === -1)) {
            if (aType == "vocaroo") {
                id = id.match(/^[a-zA-Z0-9]+$/g); // Validate that we're only getting alphanumeric characters.
                if (id !== undefined && id !== null && id.length > 0 && id[0].length > 0) {
                    id = id[0];
                    var audio = new Audio();
                    
                    // Loop encodings to find possible format for this device/browser.
                    for (var ext in encodings) {
                        var encoding = encodings[ext];
                        
                        // Can we play this type of audio?
                        if (audio.canPlayType && audio.canPlayType(encoding)) {
                            audio.src = VOCAROO_BASE + id + "&command=download_" + ext;
                            audio.type = encoding;
                            break;
                        }
                    }
                    
                    loadAudioNative(audio);
                } else {
                    timer.text("Invalid id.");
                    return;
                }
            } else if (aType == "file") {
                var files = id.split(","); // We can supply multiple files for cross-browser compability.
                var audio = new Audio();
                
                // Loop the files.
                for (var i = 0; i < files.length; i++) {
                    // Get the current file, extension and encoding.
                    var file = files[i];
                    var ext = file.substring(file.lastIndexOf(".") + 1);
                    var encoding = encodings[ext] || "audio/" + ext;
                    // Can we play this type of audio?
                    if (audio.canPlayType && audio.canPlayType(encoding)) {
                        audio.src = FILE_BASE + file;
                        audio.type = encoding;
                        break;
                    }
                }
                
                loadAudioNative(audio);
            } else if (aType == "apm") {
                if (!id.endsWith(".mp3"))
                    id += ".mp3";
                // Refer to https://www.apmmusic.com/legal - hopefully no issues as far as I can see.
                var audio = new Audio("https://audio.prod.apmmusic.com/mp3_128/" + id);
                audio.type = "audio/mp3";
                
                var duration, playTimer;
                var playerIsPlaying = false; // To use outside of our code below.
                
                var updateTimer = function(ended) {
                    var curr = ended ? duration : audio.currentTime;
                    timer.text("[" + pretty_print_time(curr) + " / " + pretty_print_time(duration) + "]");
                    slider_curr.css({"width": ((curr / duration) * 100) + "%"});
                };
                
                audio.onloadedmetadata = function() {
                    duration = audio.duration;
                    timer.text("[0:00 / " + pretty_print_time(duration) + "]"); // Init timer.
                    
                    icon.removeClass("missing").removeClass("pause").addClass("play");
                    icon.css({"cursor": "pointer"}); // The button can now be clicked.
                    slider.css({"cursor": "pointer"}); // The slider can now be clicked.
                };
                
                audio.onended = function() {
                    playerIsPlaying = false;
                    icon.removeClass(!playerIsPlaying ? "pause" : "play").addClass(!playerIsPlaying ? "play" : "pause");
                    updateTimer(true);
                    clearInterval(playTimer);
                };
                
                audio.onerror = function() {
                    timer.text("Could not load audio.");
                };
                
                // Click listener to toggle playing the audio.
                icon.click(function() {
                    if (playerIsPlaying) {
                        audio.pause();
                        clearInterval(playTimer);
                    } else {
                        audio.play();
                        playTimer = setInterval(updateTimer, 100);
                    }
                    playerIsPlaying = !playerIsPlaying;
                    icon.removeClass(!playerIsPlaying ? "pause" : "play").addClass(!playerIsPlaying ? "play" : "pause");
                });
                
                slider.click(function(e) {
                    var posX = e.pageX - slider.offset().left;
                    var p = posX / slider.width();
                    
                    audio.currentTime = p * duration;
                    updateTimer();
                });
                
                audio.preload = true;
            } else {
                // This code loads the Youtube IFrame Player API code asynchronously. Wikia only supports OGG audio files, unfortunately.
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                
                // Placeholder <div> to store the video. The id is random.
                var videoPlaceholderTag = $("<div id='yt-player-" + Math.floor(1000 + Math.random() * 1999000) + "'></div>");
                videoPlaceholderTag.css({"display": "none"});
                $("body").append(videoPlaceholderTag);
                
                // This is a bit of a hack, but we use this async loop to wait for YT (Youtube API) to become available.
                var loadTimerVar, player, playerTarget, duration;
                
                var updateTimer = function(ended) {
                    var curr = ended ? duration : playerTarget.getCurrentTime();
                    timer.text("[" + pretty_print_time(curr) + " / " + pretty_print_time(duration) + "]");
                    slider_curr.css({"width": ((curr / duration) * 100) + "%"});
                };
                
                var playerIsPlaying = false; // To use outside of our code below.
                loadTimerVar = setInterval(function() {
                    if (("YT" in window) && YT.loaded) { // The Youtube API has loaded.
                        clearInterval(loadTimerVar);
                        var playTimer;
                        // Load in the Youtube video element, to prepare playing.
                        player = new YT.Player(videoPlaceholderTag.attr("id"), {
                            height: '0',
                            width: '0',
                            videoId: id,
                            suggestedQuality: "small",
                            events: {
                                'onReady': function(event) {
                                    playerTarget = event.target; // Grabs the player instance for later use.
                                    duration = playerTarget.getDuration();
                                    timer.text("[0:00 / " + pretty_print_time(duration) + "]"); // Init timer.
                                    // To save bandwidth, since we don't need any video.
                                    playerTarget.setPlaybackQuality("small");
                                    playerTarget.setVolume(100); // Full volume.
                                    // The video is ready, so we show the play icon.
                                    icon.removeClass("missing").removeClass("pause").addClass("play");
                                    icon.css({"cursor": "pointer"}); // The button can now be clicked.
                                    slider.css({"cursor": "pointer"}); // The slider can now be clicked.
                                },
                                'onStateChange': function(event) {
                                    var isPlaying = event.data == YT.PlayerState.PLAYING || event.data == YT.PlayerState.BUFFERING; // Either playing or buffering is good to show the pause icon.
                                    if (isPlaying != playerIsPlaying) { // Playing state was changed.
                                        playerIsPlaying = isPlaying;
                                        icon.removeClass(!playerIsPlaying ? "pause" : "play").addClass(!playerIsPlaying ? "play" : "pause");
                                        
                                        // Update the timer display loop.
                                        if (isPlaying && playTimer === undefined) {
                                            playTimer = setInterval(updateTimer, 100);
                                        } else if (!isPlaying && playTimer !== undefined) {
                                            clearInterval(playTimer);
                                            playTimer = undefined;
                                        }
                                    }
                                    if (event.data == YT.PlayerState.ENDED) // Move to end.
                                        updateTimer(true);
                                }
                            }
                        });
                    }
                }, 100);
                
                // Click listener to toggle playing the audio.
                icon.click(function() {
                    if (playerTarget !== undefined) {
                        if (playerIsPlaying) {
                            playerTarget.pauseVideo();
                        } else {
                            playerTarget.playVideo();
                            playerTarget.setVolume(100); // Full volume.
                        }
                    }
                });
                
                slider.click(function(e) {
                    var posX = e.pageX - slider.offset().left;
                    var p = posX / slider.width();
                    
                    if (playerTarget !== undefined) {
                        playerTarget.seekTo(p * duration);
                        updateTimer();
                    }
                });
            }
        }
    });
});