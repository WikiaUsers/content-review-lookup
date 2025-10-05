/* Any JavaScript here will be loaded for all users on every page load. */
var wiki_names = ["©MW ANIMATION STUDIOS 1979", "Aw Man! This Year's Halloween Suck", "Maybe It's Because Your Costume Looks Stupid Basic.", "MISSING: Johnny Bear LAST SEEN: 10.31.78", "Don’t Tell Me You’re Scared About Trick Or Treating?", "Happy Halloween!", "10.31.1975", "10.31.1976", "10.31.1977", "10.31.1979", "Duckie..?", "All Alone, Oh What A Pity. Poor Little Maid.", "What Are You Doing Here?", "What Have You Done!?", "What A Naughty Child, Wandering Around The House.", "Oh Yes, This Will Be Enough To Perform The Spell. Behold!", "A Dirty Sock.", "A Can Of Soda.", "A Cat Bone.", "A Bird’s Egg.", "A Rotting Pumpkin.", "An Object Of Great Sentimental Value.", "A Photo Of ?????", "KEEP OUT! DANGER! BOOGEYMAN!", "Heh, It’s Even Cooler In-Person!", "MISSING. REX DEVON. 9-YEARS-OLD. LAST SEEN 10.31.77", "MISSING. JESSIE SMITH. 12-YEARS-OLD. LAST SEEN 10.31.76", "MISSING CHILD. ELIZABETH GUTIERREZ. 6-YEARS-OLD. LAST SEEN 10.31.68", "MISSING. JOSE MILLER. 8-YEARS-OLD. LAST SEEN 10.31.69", "MISSING. LUCAS LEON. 5-YEARS-OLD. LAST SEEN 10.31.??", "HAVE YOU SEEN THIS CHILD? JADE GAZZINI. LAST SEEN 10.31.61", "HAVE YOU SEEN THIS CHILD? MURRAY GAZZINI. LAST SEEN 10.31.66", "STILL MISSING. DANNY. 8-YEARS-OLD. LAST SEEN 10.31.61", "CHILD LOST. BRITTANY JOHNSON. 4-YEARS-OLD. LAST SEEN 10.31.50", "STILL MISSING. HUGO CHRISTAN. 10-YEARS-OLD. 10.31.53", "BOO!", "Hush, Little Baby, Don't Say A Word.", "MEMORIES BY LORENZO & RACHEL WATERMAN.", "Is This How They Caught Them?", "When The Saints Go Marching In!", "What Did You Do To Him?!", "Mister, and Missus Waterman were very, very bad people", "You're Dead And Out Of This World", "Stay Dead And Out Of This World.", "You're Down And Out Of This World.", "Long Gone And Out Of This World"];
var wiki_name_number = -1;
while (wiki_name_number < 0 || wiki_name_number > wiki_names.length) {
  wiki_name_number = Math.random().toFixed(2) * 100;
}
var elements = document.getElementsByClassName('fandom-community-header__community-name');
elements[0].textContent = wiki_names[wiki_name_number];

$(function () {
    var tracks = [
        "https://static.wikia.nocookie.net/the-walten-files-new/images/8/84/What_Are_You_Doing_Here.mp3/revision/latest?cb=20251004034132&format=original",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/f/f3/Youre_Dead_Norman_Tanega.mp3/revision/latest?cb=20251004034141&format=original",
        "https://static.wikia.nocookie.net/the-walten-files-new/images/3/32/TMH_Theme.mp3/revision/latest?cb=20251004034142&format=original"
    ];

    var $radio = $('<img>', {
        src: "https://static.wikia.nocookie.net/the-walten-files-new/images/b/bf/RadioThing.png",
        id: "radio-audio-btn",
        alt: "Radio Player"
    });
    $('body').append($radio);

    var audio = new Audio();
    var hasTrack = false;
    var isPlaying = false;

    $radio.on('click', function () {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            $radio.removeClass("playing");
        } else {
            if (!hasTrack) {
                var randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
                audio.src = randomTrack;
                hasTrack = true;
            }
            audio.play();
            isPlaying = true;
            $radio.addClass("playing");
        }
    });

    audio.onended = function () {
        isPlaying = false;
        $radio.removeClass("playing");
        hasTrack = false;
    };
});