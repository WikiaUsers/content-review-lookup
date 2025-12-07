/* Any JavaScript here will be loaded for all users on every page load. */
var wiki_names = ["Hello Children!", "Oh Christmas, What A Wonderful Holiday.", "Big And Small, Cheap And Expensive.", "You're Not Going To Pay Me, Sir.", "Merry Christmas To You Too, Jerk!", "I Don’t Want To Hear You Lie.", "So Let's Do Eachother A Favor And Accept Your REGRETS.", "The New Walten Files Wiki", "You've Done Bad Stuff, But There's Still Some Time To Fix Your Mistakes. Listen.", "I Don't Have To Fix Anything!", "Two More Ghosts Will Be Visiting You Tonight.", "Sometimes, Our Past Can Lead Up To Our Future Actions.", "You Still Have Time To Acknowledge Your Mistakes.", "Or Else, I'll See You In Hell, You Greedy And Selfish Old Man."];
var wiki_name_number = -1;
while (wiki_name_number < 0 || wiki_name_number > wiki_names.length) {
  wiki_name_number = Math.random().toFixed(2) * 100;
}
var elements = document.getElementsByClassName('fandom-community-header__community-name');
elements[0].textContent = wiki_names[wiki_name_number];

$(function () {
    var introTrack = "https://static.wikia.nocookie.net/the-walten-files-new/images/d/dc/171257_groovyrandomness_static--AudioTrimmercom-.mp3/revision/latest?cb=20251101101953&format=original";
    var pauseSfx = "https://static.wikia.nocookie.net/the-walten-files-new/images/6/61/Radio_pause.wav/revision/latest?cb=20251101103000&format=original";
    var unpauseSfx = "https://static.wikia.nocookie.net/the-walten-files-new/images/2/2e/Radio_unpause.wav/revision/latest?cb=20251101103002&format=original";
    var skipSfx = "https://static.wikia.nocookie.net/the-walten-files-new/images/2/2e/SkipRadio.mp3";
    var hallucinationTrack = "https://static.wikia.nocookie.net/the-walten-files-new/images/c/c4/Willy_Godley_Laugh.mp3";
    var hallucinationGif = "https://static.wikia.nocookie.net/the-walten-files-new/images/2/26/Fec7d3_d84b9cbe3b7a4eeba6d2f6ad51d1f402~mv2.gif";
    var ghostImage = "https://static.wikia.nocookie.net/the-walten-files-new/images/c/cd/Bon_on_da_Radio.png";

    var tracks = [
        "https://static.wikia.nocookie.net/the-walten-files-new/images/2/28/Together_at_Last.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/e/ed/A_Beautiful_Rose.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/d/d9/Felix_Kranken.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/1/16/Everything_is_Through%2C_Dear.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/c/c1/Ray_Noble_And_His_Orchestra_-_Midnight%2C_The_Stars_And_You_%28Instrumental%29_-m8ZctR0dMyQ-.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/0/05/Bye_Bye_Blues_%28Live%29_%28The_Walten_Files_4_-_CyberFun_Tech_OST%29.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/a/a4/Felice_incontro_%28The_Walten_Files_4_-_CyberFun_Tech_OST%29.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/a/af/Theme_for_Marilyn_%28The_Walten_Files_4_-_CyberFun_Tech_OST%29.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/3/31/Unknown_Instrumental_%28The_Walten_Files_4_-_CyberFun_Tech_OST%29.mp3"
    ];

    var containerRight = "20px";
    var containerBottom = "80px";
    var imageSize = "128px";
    var gifFadeDuration = 0.25;

    var $radioContainer = $('<div>', {
        id: "radio-container",
        css: {
            position: "fixed",
            bottom: containerBottom,
            right: containerRight,
            width: imageSize,
            height: imageSize,
            cursor: "pointer",
            zIndex: 9999,
            overflow: "visible",
            transformOrigin: "center bottom",
            transition: "transform 0.18s ease"
        }
    });

    var sharedStyles = {
        width: "100%",
        height: "100%",
        position: "absolute",
        bottom: "0",
        left: "0",
        display: "block",
        transformOrigin: "center bottom",
        transition: "opacity " + gifFadeDuration + "s ease"
    };

    var $radio = $('<img>', {
        src: "https://static.wikia.nocookie.net/the-walten-files-new/images/b/bf/RadioThing.png",
        css: Object.assign({}, sharedStyles, { opacity: 1, zIndex: 1 })
    });

    var $radioGif = $('<img>', {
        src: "https://static.wikia.nocookie.net/the-walten-files-new/images/9/95/RadioThing_Bunny.gif",
        css: Object.assign({}, sharedStyles, { opacity: 0, zIndex: 2 })
    });

    $radioContainer.hover(
        function(){ $(this).css("transform","scale(1.12)"); },
        function(){ $(this).css("transform","scale(1)"); }
    );

    var $controls = $('<div>', { css: {
        position: "absolute",
        bottom: "-50px",
        left: "50%",
        transform: "translateX(-48%)",
        width: "140px",
        display: "none",
        flexDirection: "row",
        alignItems: "center",
        gap: "6px"
    } });
    var $progressBar = $('<input>', { type: "range", min: 0, max: 100, value: 0, css: { flex: 1, appearance: "none", height: "6px", background: "#333", borderRadius: "4px", cursor: "pointer", "accent-color": "#f5a200" } });
    var $skipButton = $('<button>', { text: "⏭", css: { background: "#820f03", border: "none", borderRadius: "6px", padding: "2px 6px", cursor: "pointer", color: "#fff", fontWeight: "bold" } });
    $controls.append($progressBar).append($skipButton);

    $radioContainer.append($radio).append($radioGif).append($controls);
    $('body').append($radioContainer);

    var audio = new Audio();
    var isPlaying = false;
    var hasStarted = false;
    var currentTrack = null;
    var seeking = false;
    var pauseSound = new Audio(pauseSfx);
    var unpauseSound = new Audio(unpauseSfx);
    var skipSound = new Audio(skipSfx);
    var introPlaying = false;
    var interactionLocked = false;
    var pauseUnpauseCount = 0;
    var skipCount = 0;
    var resetTimers = {};

    var savedTrack = localStorage.getItem("radioTrack");
    var savedTime = parseFloat(localStorage.getItem("radioTime")) || 0;
    var savedPlaying = localStorage.getItem("radioPlaying") === "true";

    function pickRandomTrack() {
        var pool = tracks.filter(t => t !== currentTrack);
        return pool[Math.floor(Math.random() * pool.length)];
    }

    function showGif(show) {
        if (show) {
            $radio.css({ opacity: 0 });
            $radioGif.css({ opacity: 1 });
        } else {
            $radioGif.css({ opacity: 0 });
            $radio.css({ opacity: 1 });
        }
    }

    function loadTrack(src, startTime=0, autoplay=true) {
        audio.pause();
        audio.src = src;
        audio.currentTime = startTime;
        if(autoplay) audio.play();
        currentTrack = src;
        isPlaying = autoplay;
        showGif(isPlaying);
        $controls.show();
        localStorage.setItem("radioTrack", currentTrack);
        localStorage.setItem("radioTime", audio.currentTime);
        localStorage.setItem("radioPlaying", isPlaying);
    }

    function updateProgress() {
        if(!seeking && audio.duration) {
            $progressBar.val((audio.currentTime/audio.duration)*100);
            localStorage.setItem("radioTime", audio.currentTime);
        }
    }

    $progressBar.on("mousedown touchstart input click", e=>e.stopPropagation());

    $skipButton.on("click", e=>{
        e.stopPropagation();
        if(!hasStarted) return;
        if(interactionLocked || introPlaying) return;
        skipSound.currentTime = 0;
        skipSound.play();

        skipCount++;
        clearTimeout(resetTimers.skip);
        resetTimers.skip = setTimeout(function(){ skipCount = 0; }, 4000);
        if(skipCount >= 13){
            skipCount = 0;
            triggerHallucination();
            return;
        }

        loadTrack(pickRandomTrack());
    });

    $progressBar.on("input", function(){
        if(audio.duration) audio.currentTime = (this.value/100)*audio.duration;
    });
    $progressBar.on("mousedown touchstart", ()=>{ seeking=true; });
    $progressBar.on("mouseup touchend", ()=>{ seeking=false; });
    setInterval(updateProgress, 200);

    if(savedTrack){
        hasStarted = true;
        loadTrack(savedTrack, savedTime, savedPlaying);
    }

    function triggerGhost(){
        interactionLocked = true;
        var offset = $radioContainer.offset();
        var w = $radioContainer.outerWidth();
        var h = $radioContainer.outerHeight();
        var $ghost = $('<img>').attr('src', ghostImage).css({
            position: 'absolute',
            top: offset.top,
            left: offset.left,
            width: w,
            height: h,
            zIndex: 9998,
            opacity: 0,
            pointerEvents: 'none'
        }).appendTo('body');
        $ghost.animate({ opacity: 0.60 }, 1500, function(){
            setTimeout(function(){
                $ghost.animate({ opacity: 0 }, 1500, function(){
                    $ghost.remove();
                    interactionLocked = false;
                });
            }, 6000);
        });
    }

    function triggerHallucination(){
        interactionLocked = true;
        $('body').css('overflow', 'hidden');
        $radioContainer.css({ visibility: "hidden" });
        var offset = $radioContainer.offset();
        var w = $radioContainer.outerWidth();
        var h = $radioContainer.outerHeight();
        var $hall = $('<img>').attr('src', hallucinationGif).css({
            position: 'absolute',
            top: offset.top,
            left: offset.left,
            width: w,
            height: h,
            zIndex: 99999,
            opacity: 0,
            pointerEvents: 'none'
        }).appendTo('body');
        $hall.animate({ opacity: 1 }, 2000);
        audio.pause();
        var hallAudio = new Audio(hallucinationTrack);
        hallAudio.play();
        hallAudio.onended = function(){
            $hall.remove();
            $radioContainer.css({ visibility: "visible" });
            $('body').css('overflow', '');
            loadTrack(pickRandomTrack());
            triggerGhost();
        };
    }

    $radio.add($radioGif).on("click", function(e){
        e.stopPropagation();
        if(interactionLocked) return;
        if(!hasStarted){
            hasStarted = true;
            introPlaying = true;
            unpauseSound.currentTime = 0;
            unpauseSound.play();
            audio.src = introTrack;
            audio.volume = 0;
            audio.play();
            showGif(true);
            isPlaying = true;
            var fadeInDuration = 0.2;
            var fadeOutDuration = 0.2;
            var fadeInterval = 0.02;
            var volumeStepIn = fadeInterval / fadeInDuration;
            var volumeStepOut = fadeInterval / fadeOutDuration;
            var fadeInTimer = setInterval(function(){
                audio.volume = Math.min(audio.volume + volumeStepIn, 1);
                if(audio.volume >= 1) clearInterval(fadeInTimer);
            }, fadeInterval * 1000);
            audio.onended = function(){
                var fadeOutTimer = setInterval(function(){
                    audio.volume = Math.max(audio.volume - volumeStepOut, 0);
                    if(audio.volume <= 0){
                        clearInterval(fadeOutTimer);
                        introPlaying = false;
                        loadTrack(pickRandomTrack());
                    }
                }, fadeInterval * 1000);
            };
            return;
        }
        if(introPlaying) return;
        pauseUnpauseCount++;
        clearTimeout(resetTimers.pause);
        resetTimers.pause = setTimeout(function(){ pauseUnpauseCount = 0; }, 4000);
        if(pauseUnpauseCount >= 5){
            pauseUnpauseCount = 0;
            triggerHallucination();
            return;
        }
        if(isPlaying){
            pauseSound.currentTime = 0;
            pauseSound.play();
            audio.pause();
            isPlaying = false;
        } else {
            unpauseSound.currentTime = 0;
            unpauseSound.play();
            audio.play();
            isPlaying = true;
        }
        showGif(isPlaying);
        localStorage.setItem("radioPlaying", isPlaying);
    });
});