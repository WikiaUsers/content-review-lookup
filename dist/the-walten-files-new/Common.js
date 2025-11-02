/* Any JavaScript here will be loaded for all users on every page load. */
var wiki_names = ["Pick Up The Phone, Now.", "THEY'LL SEE YOU SOON, SOPHIE.", "Goodbye, Sophie.", "Safety in Pills, Sophie.", "The Blind Fortune Teller Is Filled With Knowledge...", "...But Never With Context.", "A Pretty Smart Plan, Right?", "Save, Restore, Secure!", "Let Us Edit The Wiki The Right Way...", "...The Bon's Burgers Way.", "07/14 MISSING.", "Am I Still Beautiful To You?", "The Rabbit Is Starving.", "Latern? Check!", "Snacks? Check!", "Or Else, I'll See You In Hell.", "Key? Check!", "Camera? Check!", "Turn On The Light.", "How Odd.", "You Can't Make An Omelette Without Breaking A Few Eggs.", "I Can't Feel Anything. He Thought I Was Her.", "Rose Broken. Will Fix You. You Will Beautiful.", "Sha Burger!", "I Like Apples Too.", "What Have You Done!?", "Mr. and Mrs. Waterman Were Very, Very Bad People.", "The New Walten Files Wiki", "The Walten Archiv.. Wrong One!", "I Can't Remember My Face", "I'm Still Here.", "Did You Forget About Me?", "Did You Miss Me?", "MAKE ME A SANDWICH!", "Take Care While You Care-Take", "Billy!...", "...WHAT!?", "Apples!", "Originality Created By: Rosemary Walten", "Oh Heavens.", "My Little Bunny.", "Polly Put The Kettle On", "Guilty.", "You Crashed The Car! You Killed Them!", "OH NO! YOU GOT THE BAD ENDING!", "What Happened To My Children?", "They Found A Way Out Eventually.", "E  N  J  O  Y    T  H  E    S  H  O  W .", "-Lighth0use- As SOPHIE WALTEN!", "Izzsplash As JENNY LETTERSON!", "CoralineHecc As SUSAN WOODINGS!", "Martin Walls As JACK WALTEN!", "Bravvy (Eva) As BON!", "Anastasia V. As SHA!", "Kyle Denigris As BOOZOO!", "Manny204553 As BILLY!", "Roob As MOLLY WALTEN!", "Petertriesricecakes As EDD WALTEN!", "Em C. As ASHLEY PARKS!", "Martin Walls As Rocket Bunny!", "NORMAN IS BON!", "My.. Name Is... Bon..", "CyberFun's Technology of the Future!", "Forget All Your Troubles, Forget All Your Cares.", "Watching You =) -Sy05.", "Be Patient And Be Honest. That Is All I Ask Of You. -Sy05", "Only As The Clock Continues To Tick -Sy05.", "I do.", "Missing.", "Welcome To The Team!", "LIVE CARLITOS WALTEN REACTION.", "Let Me Out Of Here.", "Lower Your Voice, A'ight!?", "So They're Gone? Molly and Edd?", "You Just Couldn't Stay Home, Could You?", "Then He Slithered And Slunk With A Smile Most Unpleasant...", "...Around The Whole Room And He Took Every Present.", "A Minor Setback?", "Home Sweet Home.", "Way Back Home.", "Are You Able To Remember?", "You Finally Start To Remember. That Old Day...", "Welcome to Bon's Burgers!", "...They Will Be Back For You Soon, Sophie.", "It's Too Late. It's Way Too Late. See You Tomorrow.", "I FEEL SO LUCKY!!!", "Say My Name...", "..We Haven't Met Before, Have We?...", "...Pleasure To Meet You, My Name Is Bon.", "SECTION 3: FOLLOW THE INSTRUCTIONS", "How Much Is That Doggie In The Window?", "Shadow Man Sees Me When Lights Go Off."];
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

    var tracks = [
        "https://static.wikia.nocookie.net/the-walten-files-new/images/2/28/Together_at_Last.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/e/ed/A_Beautiful_Rose.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/d/d9/Felix_Kranken.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/1/16/Everything_is_Through%2C_Dear.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/c/c1/Ray_Noble_And_His_Orchestra_-_Midnight%2C_The_Stars_And_You_%28Instrumental%29_-m8ZctR0dMyQ-.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/9/95/Maurice_Winnick_-_Water_Lilies_In_The_MoonLIGHT_%28Slower%2B_Reverb%29_-POZfelJAKOs-.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/8/89/WMYQ_05-02-74_%28From_BunnyFarm_%29_-NGG13H-lhlM-.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/2/23/Winterreise%2C_Op_89%2C_D_911_No_24_Der_Leiermann.mp3",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/6/61/Susan_Woodings_Radio.mp3"
    ];

    var containerRight = "20px";
    var containerBottom = "20px";
    var imageSize = "128px";
    var overlapSeconds = 0.4;
    var gifFadeDuration = 0.2;

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
    };

    var $radio = $('<img>', {
        src: "https://static.wikia.nocookie.net/the-walten-files-new/images/b/bf/RadioThing.png",
        id: "radio-audio-btn",
        alt: "Radio Player",
        css: Object.assign({}, sharedStyles, {
            visibility: "visible",
            opacity: 1,
            transition: "none"
        })
    });

    var $radioGif = $('<img>', {
        src: "https://static.wikia.nocookie.net/the-walten-files-new/images/9/95/RadioThing_Bunny.gif",
        id: "radio-audio-gif",
        alt: "Radio Playing",
        css: Object.assign({}, sharedStyles, {
            transition: "opacity " + gifFadeDuration + "s ease",
            opacity: 0,
            visibility: "visible"
        })
    });

    $radioContainer.hover(
        function () {
            $(this).css("transform", "scale(1.12)");
        },
        function () {
            $(this).css("transform", "scale(1)");
        }
    );

    $radioContainer.append($radio).append($radioGif);
    $('body').append($radioContainer);

    var audio = new Audio();
    var nextAudio = null;
    var isPlaying = false;
    var hasStarted = false;

    var pauseSound = new Audio(pauseSfx);
    var unpauseSound = new Audio(unpauseSfx);

    function pickRandomTrack() {
        return tracks[Math.floor(Math.random() * tracks.length)];
    }

    $radioGif.on('transitionend', function (e) {
        if (e.originalEvent && e.originalEvent.propertyName === 'opacity') {
            var gifOpacity = parseFloat($radioGif.css('opacity'));
            if (gifOpacity >= 0.99) {
                $radio.css('visibility', 'hidden');
            } else if (gifOpacity <= 0.01) {
                $radio.css('visibility', 'visible');
            }
        }
    });

    function fadeGifOutAndRestoreStatic() {
        $radio.css('visibility', 'visible');
        $radioGif.css('opacity', 0);
    }

    $radioContainer.on('click', function () {
        if (isPlaying) {
            pauseSound.currentTime = 0;
            pauseSound.play();

            audio.pause();
            if (nextAudio) nextAudio.pause();
            isPlaying = false;
            $radioContainer.removeClass("playing");

            fadeGifOutAndRestoreStatic();

        } else {
            unpauseSound.currentTime = 0;
            unpauseSound.play();

            if (!hasStarted) {
                hasStarted = true;
                $radioContainer.addClass("playing");
                audio.src = introTrack;
                audio.play();
                isPlaying = true;

                audio.onloadedmetadata = function () {
                    var randomEnd = audio.duration * (0.5 + Math.random() * 0.5);
                    var endedEarly = false;
                    audio.addEventListener('timeupdate', function () {
                        if (!endedEarly && audio.currentTime >= randomEnd) {
                            endedEarly = true;
                            audio.pause();
                            audio.currentTime = audio.duration;
                            audio.dispatchEvent(new Event('ended'));
                        }
                    });
                };

                var overlapping = false;
                audio.addEventListener('timeupdate', function overlapChecker() {
                    if (audio.duration && audio.currentTime >= audio.duration - overlapSeconds) {
                        if (!overlapping) {
                            overlapping = true;
                            nextAudio = new Audio();
                            nextAudio.src = pickRandomTrack();
                            nextAudio.play();

                            $radioGif.css('opacity', 1);
                        }
                    }
                });

                audio.onended = function () {
                    if (nextAudio) {
                        audio = nextAudio;
                        nextAudio = null;
                    } else {
                        audio.src = pickRandomTrack();
                        audio.play();
                        $radioGif.css('opacity', 1);
                    }

                    audio.onended = function () {
                        isPlaying = false;
                        $radioContainer.removeClass("playing");
                        fadeGifOutAndRestoreStatic();
                    };
                };
            } else {
                audio.play();
                isPlaying = true;
                $radioContainer.addClass("playing");
                $radioGif.css('opacity', 1);
            }
        }
    });
});