$(document).ready(function() {
    var allowedPages = [
        'BREAK_IN_AND_STEAL_THINGZ_Wiki',
        'Lugig_the_funny',
        'Irusskid'
    ];
    var currentPageTitle = mw.config.get('wgPageName');
    if (allowedPages.includes(currentPageTitle)) {
        var audioElements = document.querySelectorAll('audio');
        audioElements.forEach(function(audio) {
            if (audio.hasAttribute('autoplay')) {
                var playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(function() {
                        console.log('Audio playback started.');
                    }).catch(function(error) {
                        console.error('Audio playback was prevented by browser policy:', error);
                    });
                }
            }
        });
    }
});