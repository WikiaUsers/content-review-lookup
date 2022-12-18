/* Any JavaScript here will be loaded for all users on every page load. */
/* By user BryghtShadow on the Fandom Developers wiki. */
$(function() {
    var isPlayerPaused = true;

    function playAudio() {
        $('#player')[0].play();
        $('#play-audio').css('display', 'none');
        $('#pause-audio').css('display', 'inline-block');
        isPlayerPaused = false;
    }

    function pauseAudio() {
        $('#player')[0].pause();
        $('#play-audio').css('display', 'inline-block');
        $('#pause-audio').css('display', 'none');
        isPlayerPaused = true;
    }

    function init() {
        var bruh = $('#bruh');
        if (!bruh.length) return; // abort
        var oldAudio = $('#bruh > audio');
        if (!oldAudio.length) return; // abort
    
        var src = $(oldAudio[0]).attr('src');
        var musicPlayerElement = $('<div>', { id: 'music-player' });
        var newAudio = $('<audio>', {
            id: 'player',
            loop: true,
            src: src,
        });
        var playAudioButton = $('<div>', {
            id: 'play-audio',
            style: 'display:inline-block;',
            on: {click: playAudio}
        }).append($('<img>', {
            src: 'https://static.wikia.nocookie.net/cp3d/images/d/df/Record-whenpaused.png/',
            height: '100px'
        }));
        var pauseAudioButton = $('<div>', {
            id: 'pause-audio',
            style: 'display:none;',
            on: {click: pauseAudio}
        }).append($('<img>', {
            src: 'https://static.wikia.nocookie.net/cp3d/images/1/1a/Record-whenplaying.gif/revision/latest?cb=20221209221613',
            height: '100px'
        }));
        var controlWrapper = $('<div>').append([
            playAudioButton,
            pauseAudioButton,
        ]);
        var section = $('<section>').append([
            newAudio,
            controlWrapper,
        ]);
        musicPlayerElement.append(section);
    
        bruh.empty();
        bruh.append(musicPlayerElement);
    }
    
    init();
});