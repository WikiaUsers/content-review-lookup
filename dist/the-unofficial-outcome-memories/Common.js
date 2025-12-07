$(document).ready(function() {
    $('head').append('<link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">');

    var nmAudio = new Audio();
    nmAudio.src = '/wiki/Special:FilePath/NoMoreGamesOld.mp3';

    var lyricContainer = $('<div>')
        .attr('id', 'nomore-lyric-container')
        .css({
            position: 'fixed',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            textAlign: 'center',
            zIndex: 9999,
            pointerEvents: 'none',
            fontFamily: "'Merriweather', serif"
        });

    var lyricDisplay = $('<div>')
        .attr('id', 'nomore-lyric-display')
        .css({
            fontSize: '40px',
            fontWeight: '400',
            whiteSpace: 'pre-wrap',
            pointerEvents: 'none',
            textShadow: '0 1px 0 rgba(0,0,0,0.05)',
            background: 'linear-gradient(#ffd700, #ff8c00)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            'background-clip': 'text',
            color: 'transparent'
        })
        .html('');

    lyricContainer.append(lyricDisplay);
    $('body').append(lyricContainer);

    var raw = `
[00:32.77]Look 
[00:32.87]Look at
[00:33.06]Look at my
[00:33.28]Look at my eyes
[00:34.11]and
[00:34.27]and tell
[00:34.58]and tell me
[00:34.83]and tell me how
[00:35.11]and tell me how you
[00:35.45]and tell me how you feel
[00:36.34]the
[00:36.65]the fear
[00:36.96]the fear I
[00:37.15]the fear I put
[00:37.58]the fear I put in
[00:37.81]the fear I put in your
[00:38.60]the fear I put in your soul.
[00:39.31]Oh
[00:39.96]Oh the
[00:40.57]Oh the silver
[00:41.17]Oh the silver lining.
[00:47.51]Shadows
[00:47.75]Shadows of
[00:47.76]Shadows of dark,
[00:48.80]why
[00:49.09]why tear
[00:49.33]why tear their
[00:49.58]why tear their hearts
[00:49.88]why tear their hearts apart?
[00:51.24]Is
[00:51.33]Is it
[00:51.80]Is it the
[00:52.03]Is it the thrill
[00:52.42]Is it the thrill you
[00:52.77]Is it the thrill you seek?
[00:53.36]Well
[00:53.99]Well pal
[00:54.63]Well pal here's
[00:55.26]Well pal here's some
[00:55.97]Well pal here's some karma!
[01:08.98](Fight! x6)
[01:14.40]I
[01:14.81]I hear
[01:15.03]I hear that
[01:15.29]I hear that heart
[01:15.66]I hear that heart ache
[01:15.95]I hear that heart ache so–
[01:16.25](Hide! x6)
[01:24.40]Shadows
[01:24.65]Shadows of
[01:24.67]Shadows of dark,
[01:25.70]you
[01:25.94]you won't
[01:26.24]you won't hold
[01:26.49]you won't hold me
[01:26.86]you won't hold me back
[01:27.19]you won't hold me back down!
[01:28.22]Such
[01:28.41]Such shackles
[01:28.97]Such shackles for
[01:29.30]Such shackles for the
[01:29.64]Such shackles for the WEAK.
[01:30.33]I'll
[01:30.99]I'll break
[01:31.60]I'll break free
[01:32.08]I'll break free from
[01:32.82]I'll break free from these
[01:33.50]I'll break free from these chains!
[01:34.36]Look
[01:34.44]Look at
[01:34.59]Look at my
[01:34.68]Look at my eyes
[01:35.56]and
[01:35.81]and tell
[01:35.94]and tell me
[01:36.34]and tell me how
[01:36.64]and tell me how you
[01:37.02]and tell me how you feel
[01:37.98]the
[01:38.21]the fear
[01:38.63]the fear I
[01:38.76]the fear I put
[01:39.11]the fear I put in
[01:39.48]the fear I put in your
[01:40.19]the fear I put in your soul.
[01:40.81]Oh
[01:41.51]Oh the
[01:42.08]Oh the silver
[01:42.63]Oh the silver lining.
[02:08.26]In
[02:08.51]In the
[02:08.70]In the darkness
[02:09.17]In the darkness you
[02:09.48]In the darkness you will
[02:09.69]In the darkness you will hear
[02:09.89]In the darkness you will hear my
[02:10.28]In the darkness you will hear my voice,
[02:10.64]together
[02:11.38]together along
[02:11.81]together along those
[02:12.01]together along those tight
[02:12.35]together along those tight struggles.
[02:13.06]There
[02:13.48]There is
[02:13.69]There is no
[02:13.96]There is no such
[02:14.14]There is no such thing
[02:14.37]There is no such thing as
[02:14.41]There is no such thing as a
[02:14.93]There is no such thing as a final
[02:15.31]There is no such thing as a final act
[02:15.78]only
[02:16.34]only endless
[02:16.91]only endless fun!
[02:17.18]I'll
[02:17.74]I'll MAKE
[02:19.53]I'll MAKE YOU
[02:20.18]I'll MAKE YOU PAY
[02:21.98]I'll MAKE YOU PAY FOR
[02:22.70]I'll MAKE YOU PAY FOR THE
[02:24.49]I'll MAKE YOU PAY FOR THE SOULS
[02:24.97]I'll MAKE YOU PAY FOR THE SOULS YOU
[02:25.47]I'll MAKE YOU PAY FOR THE SOULS YOU TOYED
[02:26.10]I'll MAKE YOU PAY FOR THE SOULS YOU TOYED WITH,
[02:26.93]I'll MAKE YOU PAY FOR THE SOULS YOU TOYED WITH, YOU
[02:27.58]I'll MAKE YOU PAY FOR THE SOULS YOU TOYED WITH, YOU FAKE!
[02:29.36]MY
[02:30.08]MY FACE,
[02:31.79]THAT
[02:32.48]THAT PART
[02:34.24]THAT PART THAT
[02:34.89]THAT PART THAT YOU'VE
[02:35.40]THAT PART THAT YOU'VE TAKEN
[02:36.69]THAT PART THAT YOU'VE TAKEN FROM
[02:37.40]THAT PART THAT YOU'VE TAKEN FROM ME!
    `;

    function parseRawToArray(rawText) {
        var re = /\[(\d{2}):(\d{2}\.\d{2})\](.*)/g;
        var m;
        var arr = [];
        while ((m = re.exec(rawText)) !== null) {
            var mm = parseInt(m[1], 10);
            var ss = parseFloat(m[2]);
            var txt = m[3].trim();
            var ms = mm * 60000 + Math.round(ss * 1000);
            arr.push({ time: ms, text: txt });
        }
        arr.sort(function(a, b){ return a.time - b.time; });
        return arr;
    }

    var nomoreLyrics = parseRawToArray(raw);

    var currentIndex = -1;
    var intervalId = null;
    var activeAudio = null;

    function reset() {
        lyricDisplay.html('');
        currentIndex = -1;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        activeAudio = null;
    }

    function updateLyricForTime(currentTime) {
        var tms = Math.round(currentTime * 1000);

        var newIndex = -1;
        for (var i = nomoreLyrics.length - 1; i >= 0; i--) {
            if (tms >= nomoreLyrics[i].time) {
                newIndex = i;
                break;
            }
        }

        if (newIndex !== -1 && newIndex !== currentIndex) {
            currentIndex = newIndex;
            lyricDisplay.html(nomoreLyrics[currentIndex].text);
        }
    }

    function startMonitoringAudio(aud) {
        if (activeAudio === aud) return;
        reset();
        activeAudio = aud;
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(function() {
            if (!aud || aud.paused || aud.ended) {
                reset();
                return;
            }
            updateLyricForTime(aud.currentTime);
        }, 50);
    }

    function isNoMoreAudio(aud) {
        var src = (aud && (aud.currentSrc || aud.src || aud.baseURI || '') + '').toString();
        return src && src.indexOf('NoMoreGamesOld.mp3') !== -1;
    }

    document.addEventListener('play', function(e) {
        if (e.target && e.target.tagName === 'AUDIO') {
            var a = e.target;
            if (isNoMoreAudio(a)) {
                startMonitoringAudio(a);
            }
        }
    }, true);

    document.addEventListener('pause', function(e) {
        if (e.target === activeAudio) {
            reset();
            activeAudio = null;
        }
    }, true);

    document.addEventListener('ended', function(e) {
        if (e.target === activeAudio) {
            reset();
            activeAudio = null;
        }
    }, true);

    nmAudio.addEventListener('play', function() { if (isNoMoreAudio(nmAudio)) startMonitoringAudio(nmAudio); });
    nmAudio.addEventListener('pause', function() { if (activeAudio === nmAudio) reset(); });
    nmAudio.addEventListener('ended', function() { if (activeAudio === nmAudio) reset(); });
});










console.log('=== LORD X SCRIPT LOADED ===');

(function() {
    'use strict';

    // Only run on the specific page: /wiki/Lord_X on the the-unofficial-outcome-memories.fandom.com wiki
    function isOnLordXPage() {
        // Prefer MediaWiki config when available (more reliable on Fandom)
        if (typeof mw !== 'undefined' && mw && mw.config && typeof mw.config.get === 'function') {
            try {
                var pageName = mw.config.get('wgPageName'); // example: "Lord_X"
                if (pageName === 'Lord_X') {
                    return true;
                }
            } catch (e) {
                // fall through to URL check
            }
        }

        // Fallback: check location.hostname + path
        try {
            var hostname = window.location.hostname;
            // ensure it's the expected wiki host
            if (hostname !== 'the-unofficial-outcome-memories.fandom.com') return false;

            // Accept exact /wiki/Lord_X with optional query/hash
            var fullPath = window.location.pathname + (window.location.search || '');
            // Match /wiki/Lord_X optionally followed by ? or # or end-of-string
            var regex = /\/wiki\/Lord_X(?:$|[?#])/;
            return regex.test(fullPath);
        } catch (e) {
            return false;
        }
    }

    if (!isOnLordXPage()) {
        console.log('✗ Not on Lord_X page — script will not run.');
        return;
    }

    console.log('✓ Confirmed Lord_X page — continuing script.');

    var audioElement = null;
    var audioInitialized = false;

    function initAudio() {
        if (!audioInitialized) {
            audioElement = new Audio('https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/1/19/...%3F.mp3/revision/latest?cb=20251116202223&format=original');
            audioElement.volume = 0.7;
            audioElement.loop = false; // Set to true if you want it to loop
            audioInitialized = true;
            console.log('✓ Audio initialized');
        }
    }

    function playAudio() {
        initAudio();
        console.log('>>> PLAYING AUDIO <<<');

        audioElement.play()
            .then(function() {
                console.log('✓ Audio playing!');
            })
            .catch(function(err) {
                console.error('✗ Audio error:', err);
            });
    }

    function pauseAudio() {
        if (audioElement) {
            console.log('>>> PAUSING AUDIO <<<');
            audioElement.pause();
        }
    }

    $(document).ready(function() {
        console.log('>>> DOM Ready <<<');

        // Find the collapsible element
        var collapsibleElement = document.getElementById('mw-customcollapsible-final1');

        if (collapsibleElement) {
            console.log('✓ Found collapsible!');

            // Watch for class changes (when it opens/closes)
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        var target = mutation.target;

                        if (!target.classList.contains('mw-collapsed')) {
                            // Collapsible opened
                            console.log('>>> COLLAPSIBLE OPENED <<<');
                            playAudio();
                        } else {
                            // Collapsible closed
                            console.log('>>> COLLAPSIBLE CLOSED <<<');
                            pauseAudio();
                        }
                    }
                });
            });

            // Start observing
            observer.observe(collapsibleElement, {
                attributes: true,
                attributeFilter: ['class']
            });

            console.log('>>> Watching for collapsible to open/close <<<');
        } else {
            console.log('✗ Collapsible not found');
        }

        // Also try event capturing on the document
        document.addEventListener('click', function(e) {
            var target = e.target;
            while (target && target !== document) {
                if (target.className && typeof target.className === 'string' &&
                    target.className.indexOf('mw-customtoggle') !== -1) {
                    console.log('>>> TOGGLE CLICKED (via capture) <<<');
                    break;
                }
                target = target.parentElement;
            }
        }, true);
    });
})();



$(document).ready(function() {
    // Load Merriweather font
    $('head').append('<link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">');

    // Joymode audio element
    var joyAudio = new Audio();
    joyAudio.src = '/wiki/Special:FilePath/Joymodesolo.mp3';

    var lyricContainer = $('<div>')
        .attr('id', 'lyric-container')
        .css({
            'position': 'fixed',
            'bottom': '10%',
            'left': '50%',
            'transform': 'translateX(-50%)',
            'width': '80%',
            'text-align': 'center',
            'z-index': '9999',
            'pointer-events': 'none',
            'font-family': "'Merriweather', serif"
        });

    var backgroundDisplay = $('<div>')
        .attr('id', 'background-display')
        .css({
            'position': 'absolute',
            'bottom': '100%',
            'left': '50%',
            'transform': 'translateX(-50%)',
            'font-size': '36px',
            'color': 'rgba(255,192,203,0.3)',
            'text-shadow': '1px 1px 2px black',
            'pointer-events': 'none',
            'width': '100%',
            'white-space': 'pre-wrap'
        })
        .html('');

    var lyricDisplay = $('<div>')
        .attr('id', 'lyric-display')
        .css({
            'font-size': '40px',
            // gradient background for text (with webkit clip and transparent fill)
            'background': 'linear-gradient(#0353ff, #3ddbd9)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            'background-clip': 'text',
            'color': 'transparent',
            'font-weight': '400',
            'white-space': 'pre-wrap',
            'pointer-events': 'none',
            'font-family': "'Merriweather', serif",
            'text-shadow': '0 0 0 rgba(0,0,0,0.0)'
        })
        .html('');

    lyricContainer.append(backgroundDisplay);
    lyricContainer.append(lyricDisplay);

    // Joymode lyrics (timestamps in milliseconds)
    var joymodesoloLyrics = [
        { time: 2400, text: 'What? Why do I have a healthbar?' },
        { time: 5500, text: '' },
        { time: 7320, text: 'RUN FASTER' },
        { time: 10150, text: 'BE BETTER' },
        { time: 12940, text: 'NEW PLAYTHING' },
        { time: 15770, text: 'NO QUITTER' },
        { time: 18640, text: 'RUN FASTER' },
        { time: 21430, text: 'BE BETTER' },
        { time: 24270, text: 'NEW PLAYTHING' },
        { time: 27100, text: 'NO QUITTER' },
        { time: 28120, text: 'BE GOOD!' },
        { time: 31370, text: 'RUN FASTER' },
        { time: 34210, text: 'BE BETTER' },
        { time: 36950, text: 'RUN FASTER' },
        { time: 39840, text: 'BE BETTER' },
        { time: 42710, text: 'RUN FASTER' },
        { time: 45480, text: 'BE BETTER' },
        { time: 48310, text: 'RUN FASTER' },
        { time: 51120, text: 'BE BETTER' },
        { time: 53550, text: 'YOU' },
        { time: 54290, text: 'WILL FALL' }, // fixed extra 'L'
        { time: 55220, text: 'FALSE GOD' },
        { time: 56280, text: 'MY COLD HAND' },
        { time: 58040, text: 'MAKES LAW' },
        { time: 59210, text: 'AND THIS WORLD' },
        { time: 60860, text: 'IS MINE' },
        { time: 62090, text: "I'M THE LAW" },
        { time: 63080, text: "YOU CAN'T DEFY" },
        { time: 64900, text: 'MY RULES ARE SET' },
        { time: 66050, text: 'FOR ALL TO FEAR.' },
        { time: 67650, text: 'YOU ARE THE SOUL' },
        { time: 68750, text: 'I KEEP IN THRILL' },
        { time: 70470, text: 'THE CRIES' },
        { time: 71440, text: 'I HARVEST' },
        { time: 71930, text: 'FAR AND NEAR.' },
        { time: 73370, text: 'WILL RING' },
        { time: 73750, text: 'INSIDE THIS' },
        { time: 74310, text: 'WORLD' },
        { time: 74760, text: 'FALL OF FEAR' },
        { time: 76220, text: 'THE CHOIR' },
        { time: 77480, text: 'SINGS A MOURNFUL' },
        { time: 79080, text: 'TUNE' },
        { time: 80120, text: 'THE GOD IS' },
        { time: 81820, text: 'DOOMED' },
        { time: 83150, text: 'BENT THE RULES' },
        { time: 87560, text: 'FALLEN FROM' },
        // corrected GRACE timestamp to 01:28.90 => 88900 ms (was 89901)
        { time: 88900, text: 'GRACE' },
        { time: 89590, text: 'THE GAME' },
        { time: 91000, text: 'PREVAILS' },
        { time: 92330, text: 'A TUNE' },
        { time: 94990, text: 'DEFIES THE' },
        { time: 95950, text: 'RULES' },
        { time: 101880, text: 'RUN FASTER' },
        { time: 104720, text: 'BE BETTER' },
        { time: 107550, text: 'STAY UNDONE' },
        { time: 110370, text: 'WIN NO ONE' },
        { time: 113200, text: 'RUN FASTER' },
        { time: 115990, text: 'PLAY HARDER' },
        { time: 118810, text: 'GET CLOSER' },
        { time: 121680, text: 'WIN NO ONE' },
        { time: 122690, text: 'I AM THE GOD' },
        { time: 126820, text: 'YOU FEAR THIS GAME IS MY REALM' },
        { time: 134050, text: 'I AM THE GOD' },
        { time: 138320, text: 'YOU FEAR THIS GAME IS MY REALM' },
        { time: 145570, text: 'RUN' },
        { time: 146520, text: 'RUN' },
        { time: 147160, text: 'RUN' },
        { time: 147820, text: 'RUN' },
        { time: 148580, text: 'RUN' },
        { time: 149250, text: 'RUN' },
        { time: 149100, text: 'RUN' },
        { time: 150680, text: 'RUN' },
        { time: 151380, text: 'FIGHT' },
        { time: 152080, text: 'FIGHT' },
        { time: 152800, text: 'FIGHT' },
        { time: 153350, text: 'FIGHT' },
        { time: 154180, text: 'FIGHT' },
        { time: 154840, text: 'FIGHT' },
        { time: 155590, text: 'FIGHT' },
        { time: 156310, text: 'FIGHT' },
        { time: 156970, text: 'RUN' },
        { time: 157670, text: 'RUN' },
        { time: 158350, text: 'RUN' },
        { time: 159160, text: 'RUN' },
        { time: 159810, text: 'RUN' },
        { time: 160530, text: 'RUN' },
        { time: 161100, text: 'RUN' },
        { time: 161200, text: 'RUN' },
        { time: 162660, text: 'FIGHT' },
        { time: 163340, text: 'FIGHT' },
        { time: 164070, text: 'FIGHT' },
        { time: 164760, text: 'FIGHT' },
        { time: 165430, text: 'FIGHT' },
        { time: 166130, text: 'FIGHT' },
        { time: 166880, text: 'FIGHT' },
        { time: 167999, text: ' ' }
    ];

    // ensure lyrics are sorted by time so ordering mistakes can't break display
    joymodesoloLyrics.sort(function(a, b) {
        return a.time - b.time;
    });

    var currentLyricIndex = -1; // initialize to -1 so first lyric will show
    var lyricUpdateInterval = null;
    var currentActiveAudio = null;

    function resetLyrics() {
        $('#lyric-display').html('');
        $('#background-display').html('');
        currentLyricIndex = -1; // reset to -1
        if (lyricUpdateInterval) {
            clearInterval(lyricUpdateInterval);
            lyricUpdateInterval = null;
        }
    }

    function updateLyrics(currentTime) {
        var timeMs = Math.round(currentTime * 1000);
        var lyrics = joymodesoloLyrics;
        var newLyricIndex = -1;
        for (var i = lyrics.length - 1; i >= 0; i--) {
            if (timeMs >= lyrics[i].time) {
                newLyricIndex = i;
                break;
            }
        }
        if (newLyricIndex !== -1 && newLyricIndex !== currentLyricIndex) {
            currentLyricIndex = newLyricIndex;
            $('#lyric-display').html(lyrics[currentLyricIndex].text);
        }
    }

    function isJoyAudio(audioElement) {
        var src = audioElement.src || audioElement.currentSrc;
        return src && src.includes('Joymodesolo.mp3');
    }

    function startMonitoring(audioElement) {
        if (currentActiveAudio === audioElement) return;
        currentActiveAudio = audioElement;
        resetLyrics();
        lyricUpdateInterval = setInterval(function() {
            if (audioElement.paused || audioElement.ended) {
                resetLyrics();
                currentActiveAudio = null;
                return;
            }
            updateLyrics(audioElement.currentTime);
        }, 50);
    }

    // Auto-detect any <audio> that plays Joymodesolo
    document.addEventListener('play', function(e) {
        if (e.target.tagName !== 'AUDIO') return;
        if (isJoyAudio(e.target)) {
            startMonitoring(e.target);
        }
    }, true);

    document.addEventListener('pause', function(e) {
        if (e.target === currentActiveAudio) {
            resetLyrics();
            currentActiveAudio = null;
        }
    }, true);

    document.addEventListener('ended', function(e) {
        if (e.target === currentActiveAudio) {
            resetLyrics();
            currentActiveAudio = null;
        }
    }, true);

    // Also check the internal joyAudio in case it's played programmatically
    joyAudio.addEventListener('play', function() { if (isJoyAudio(joyAudio)) startMonitoring(joyAudio); });
    joyAudio.addEventListener('pause', function() { if (currentActiveAudio === joyAudio) resetLyrics(); });
    joyAudio.addEventListener('ended', function() { if (currentActiveAudio === joyAudio) resetLyrics(); });

    $('body').append(lyricContainer);
});

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 30;
window.lockOldComments.addNoteAbove = true;





// now for the biiiiig one
// get ready
$(function(){
  if($('a[href*="Obituary.ogg"], audio source[src*="Obituary.ogg"], embed[src*="Obituary.ogg"]').length>0){
    var n=[   [10.421, "tap", "Opp", "left", "up", 0.000],
  [10.737, "tap", "Opp", "left", "down", 0.000],
  [11.053, "tap", "Opp", "left", "left", 0.000],
  [11.368, "tap", "Opp", "left", "right", 0.000],
  [11.684, "tap", "Opp", "left", "down", 0.000],
  [12.000, "tap", "Opp", "left", "right", 0.000],
  [12.316, "tap", "Opp", "left", "up", 0.000],
  [13.263, "tap", "Opp", "left", "left", 0.000],
  [13.579, "tap", "Opp", "left", "up", 0.000],
  [14.526, "tap", "Opp", "left", "down", 0.000],
  [14.842, "sustain", "Opp", "left", "right", 0.632],
  [14.842, "tap", "Opp", "left", "up", 0.000],
  [16.421, "sustain", "BF", "right", "down", 1.105],
  [17.684, "sustain", "BF", "right", "up", 1.105],
  [18.947, "sustain", "BF", "right", "right", 1.105],
  [20.211, "sustain", "BF", "right", "left", 1.105],
  [20.842, "tap", "Opp", "left", "right", 0.000],
  [21.158, "tap", "Opp", "left", "left", 0.000],
  [21.474, "sustain", "BF", "right", "down", 2.211],
  [21.474, "tap", "Opp", "left", "up", 0.000],
  [21.789, "tap", "Opp", "left", "left", 0.000],
  [22.105, "tap", "Opp", "left", "down", 0.000],
  [22.421, "tap", "Opp", "left", "up", 0.000],
  [22.421, "tap", "Opp", "left", "right", 0.000],
  [23.368, "tap", "Opp", "left", "down", 0.000],
  [23.684, "sustain", "Opp", "left", "right", 0.474],
  [24.000, "sustain", "BF", "right", "up", 1.105],
  [24.632, "tap", "Opp", "left", "left", 0.000],
  [24.947, "sustain", "Opp", "left", "up", 0.632],
  [25.263, "sustain", "BF", "right", "left", 1.105],
  [26.526, "sustain", "BF", "right", "right", 1.105],
  [26.842, "tap", "Opp", "left", "left", 0.000],
  [27.158, "tap", "Opp", "left", "up", 0.000],
  [27.474, "sustain", "Opp", "left", "down", 0.632],
  [27.789, "sustain", "BF", "right", "up", 2.211],
  [30.474, "tap", "BF", "right", "down", 0.000],
  [30.632, "tap", "BF", "right", "down", 0.000],
  [30.632, "tap", "Opp", "left", "up", 0.000],
  [30.947, "tap", "BF", "right", "up", 0.000],
  [30.947, "tap", "Opp", "left", "left", 0.000],
  [31.105, "tap", "BF", "right", "left", 0.000],
  [31.263, "tap", "BF", "right", "up", 0.000],
  [31.263, "tap", "Opp", "left", "up", 0.000],
  [31.579, "tap", "BF", "right", "right", 0.000],
  [31.579, "tap", "Opp", "left", "down", 0.000],
  [31.895, "tap", "Opp", "left", "right", 0.000],
  [32.053, "tap", "BF", "right", "down", 0.000],
  [32.211, "tap", "Opp", "left", "left", 0.000],
  [32.526, "tap", "Opp", "left", "up", 0.000],
  [32.526, "tap", "BF", "right", "right", 0.000],
  [32.842, "tap", "Opp", "left", "down", 0.000],
  [33.000, "tap", "BF", "right", "up", 0.000],
  [33.158, "tap", "Opp", "left", "right", 0.000],
  [33.158, "tap", "BF", "right", "up", 0.000],
  [33.474, "tap", "BF", "right", "left", 0.000],
  [33.474, "tap", "Opp", "left", "left", 0.000],
  [33.632, "tap", "BF", "right", "down", 0.000],
  [33.789, "sustain", "Opp", "left", "up", 0.474],
  [33.789, "tap", "BF", "right", "left", 0.000],
  [34.105, "tap", "BF", "right", "right", 0.000],
  [34.105, "tap", "BF", "right", "up", 0.000],
  [34.579, "tap", "BF", "right", "down", 0.000],
  [34.737, "tap", "Opp", "left", "down", 0.000],
  [35.053, "tap", "Opp", "left", "left", 0.000],
  [35.053, "tap", "BF", "right", "down", 0.000],
  [35.368, "tap", "Opp", "left", "down", 0.000],
  [35.368, "sustain", "BF", "right", "left", 1.105],
  [35.684, "tap", "Opp", "left", "right", 0.000],
  [36.000, "tap", "Opp", "left", "left", 0.000],
  [36.316, "tap", "Opp", "left", "up", 0.000],
  [36.632, "tap", "Opp", "left", "left", 0.000],
  [36.947, "tap", "Opp", "left", "up", 0.000],
  [36.947, "tap", "BF", "right", "down", 0.000],
  [37.263, "tap", "Opp", "left", "down", 0.000],
  [37.263, "tap", "BF", "right", "left", 0.000],
  [37.579, "tap", "BF", "right", "right", 0.000],
  [37.579, "tap", "Opp", "left", "right", 0.000],
  [37.895, "tap", "Opp", "left", "up", 0.000],
  [37.895, "tap", "BF", "right", "up", 0.000],
  [38.053, "sustain", "BF", "right", "down", 2.053],
  [38.211, "tap", "Opp", "left", "left", 0.000],
  [38.526, "tap", "Opp", "left", "right", 0.000],
  [38.842, "sustain", "Opp", "left", "down", 0.474],
  [39.474, "tap", "Opp", "left", "up", 0.000],
  [39.789, "tap", "Opp", "left", "right", 0.000],
  [40.105, "tap", "Opp", "left", "down", 0.000],
  [40.421, "tap", "Opp", "left", "up", 0.000],
  [40.421, "tap", "Opp", "left", "left", 0.000],
  [40.421, "sustain", "BF", "right", "left", 1.737],
  [40.737, "tap", "Opp", "left", "right", 0.000],
  [41.053, "tap", "Opp", "left", "down", 0.000],
  [41.368, "tap", "Opp", "left", "up", 0.000],
  [41.684, "tap", "Opp", "left", "left", 0.000],
  [42.000, "tap", "Opp", "left", "left", 0.000],
  [42.316, "tap", "Opp", "left", "up", 0.000],
  [42.632, "tap", "Opp", "left", "down", 0.000],
  [42.947, "tap", "Opp", "left", "right", 0.000],
  [43.263, "tap", "Opp", "left", "left", 0.000],
  [43.579, "tap", "Opp", "left", "down", 0.000],
  [43.895, "sustain", "Opp", "left", "right", 0.474],
  [45.158, "tap", "Opp", "left", "down", 0.000],
  [45.474, "tap", "Opp", "left", "up", 0.000],
  [45.789, "tap", "Opp", "left", "right", 0.000],
  [46.105, "tap", "Opp", "left", "left", 0.000],
  [46.421, "tap", "Opp", "left", "up", 0.000],
  [46.421, "tap", "BF", "right", "down", 0.000],
  [46.579, "tap", "BF", "right", "down", 0.000],
  [46.737, "tap", "Opp", "left", "down", 0.000],
  [46.737, "tap", "Opp", "left", "left", 0.000],
  [46.737, "tap", "BF", "right", "left", 0.000],
  [47.053, "sustain", "BF", "right", "up", 0.474],
  [47.684, "tap", "BF", "right", "left", 0.000],
  [47.684, "tap", "Opp", "left", "up", 0.000],
  [48.000, "sustain", "BF", "right", "right", 0.474],
  [48.000, "tap", "Opp", "left", "right", 0.000],
  [48.316, "tap", "Opp", "left", "down", 0.000],
  [48.632, "tap", "Opp", "left", "up", 0.000],
  [48.632, "tap", "BF", "right", "left", 0.000],
  [48.947, "sustain", "Opp", "left", "left", 0.474],
  [48.947, "sustain", "BF", "right", "up", 0.474],
  [49.579, "tap", "BF", "right", "down", 0.000],
  [49.737, "tap", "BF", "right", "right", 0.000],
  [49.895, "tap", "Opp", "left", "down", 0.000],
  [49.895, "tap", "BF", "right", "left", 0.000],
  [50.053, "tap", "BF", "right", "up", 0.000],
  [50.211, "tap", "BF", "right", "right", 0.000],
  [50.211, "sustain", "Opp", "left", "right", 0.316],
  [50.368, "tap", "BF", "right", "up", 0.000],
  [50.526, "sustain", "BF", "right", "down", 1.579],
  [51.158, "tap", "Opp", "left", "up", 0.000],
  [51.474, "tap", "Opp", "left", "right", 0.000],
  [51.789, "tap", "Opp", "left", "left", 0.000],
  [52.105, "tap", "Opp", "left", "down", 0.000],
  [52.421, "tap", "Opp", "left", "right", 0.000],
  [52.737, "sustain", "Opp", "left", "up", 0.474],
  [52.737, "tap", "BF", "right", "left", 0.000],
  [53.053, "sustain", "BF", "right", "up", 1.579],
  [53.368, "sustain", "Opp", "left", "down", 0.316],
  [55.263, "tap", "Opp", "left", "up", 0.000],
  [55.579, "tap", "Opp", "left", "left", 0.000],
  [55.579, "tap", "Opp", "left", "down", 0.000],
  [55.579, "sustain", "BF", "right", "right", 1.737],
  [55.895, "tap", "Opp", "left", "right", 0.000],
  [56.211, "tap", "Opp", "left", "down", 0.000],
  [56.526, "sustain", "Opp", "left", "up", 0.316],
  [57.776, "tap", "BF", "right", "left", 0.000],
  [57.789, "tap", "Opp", "left", "left", 0.000],
  [57.803, "tap", "BF", "right", "up", 0.000],
  [58.105, "tap", "Opp", "left", "right", 0.000],
  [58.105, "sustain", "BF", "right", "down", 1.737],
  [58.421, "tap", "Opp", "left", "left", 0.000],
  [58.737, "tap", "Opp", "left", "up", 0.000],
  [59.053, "sustain", "Opp", "left", "right", 0.474],
  [59.684, "tap", "Opp", "left", "left", 0.000],
  [60.000, "tap", "Opp", "left", "up", 0.000],
  [60.316, "sustain", "Opp", "left", "down", 0.316],
  [61.263, "sustain", "Opp", "left", "left", 0.474],
  [61.263, "sustain", "BF", "right", "up", 0.474],
  [61.895, "sustain", "Opp", "left", "right", 0.316],
  [61.895, "sustain", "BF", "right", "left", 0.474],
  [62.526, "sustain", "Opp", "left", "down", 0.474],
  [62.526, "sustain", "BF", "right", "right", 0.474],
  [63.158, "sustain", "Opp", "left", "up", 0.316],
  [63.158, "sustain", "BF", "right", "up", 0.474],
  [63.789, "tap", "BF", "right", "down", 0.000],
  [63.947, "tap", "BF", "right", "left", 0.000],
  [64.105, "sustain", "BF", "right", "up", 0.474],
  [64.737, "tap", "BF", "right", "down", 0.000],
  [64.895, "tap", "BF", "right", "left", 0.000],
  [65.053, "tap", "Opp", "left", "right", 0.000],
  [65.053, "tap", "BF", "right", "up", 0.000],
  [65.211, "tap", "BF", "right", "down", 0.000],
  [65.368, "sustain", "Opp", "left", "up", 0.789],
  [65.368, "sustain", "BF", "right", "right", 0.789],
  [66.316, "tap", "Opp", "left", "left", 0.000],
  [66.316, "tap", "BF", "right", "down", 0.000],
  [66.632, "sustain", "Opp", "left", "down", 0.789],
  [66.632, "sustain", "BF", "right", "up", 0.474],
  [67.263, "sustain", "BF", "right", "right", 0.474],
  [67.579, "tap", "Opp", "left", "right", 0.000],
  [67.895, "tap", "Opp", "left", "up", 0.000],
  [67.895, "sustain", "BF", "right", "down", 0.474],
  [68.526, "tap", "BF", "right", "up", 0.000],
  [68.684, "tap", "BF", "right", "down", 0.000],
  [68.842, "tap", "BF", "right", "left", 0.000],
  [69.158, "tap", "BF", "right", "right", 0.000],
  [69.184, "sustain", "BF", "right", "up", 0.474],
  [69.789, "tap", "BF", "right", "left", 0.000],
  [69.947, "tap", "BF", "right", "up", 0.000],
  [70.105, "tap", "Opp", "left", "left", 0.000],
  [70.105, "tap", "BF", "right", "left", 0.000],
  [70.263, "tap", "BF", "right", "right", 0.000],
  [70.421, "sustain", "Opp", "left", "right", 0.789],
  [70.421, "sustain", "BF", "right", "down", 0.158],
  [70.737, "sustain", "BF", "right", "right", 0.474],
  [71.368, "sustain", "BF", "right", "left", 0.474],
  [71.368, "tap", "Opp", "left", "up", 0.000],
  [71.684, "sustain", "Opp", "left", "left", 0.316],
  [72.000, "sustain", "BF", "right", "up", 0.474],
  [72.316, "sustain", "Opp", "left", "down", 0.316],
  [72.632, "tap", "BF", "right", "down", 0.000],
  [72.947, "sustain", "Opp", "left", "up", 0.474],
  [72.947, "tap", "Opp", "left", "right", 0.000],
  [72.947, "tap", "BF", "right", "left", 0.000],
  [73.263, "tap", "BF", "right", "right", 0.000],
  [73.579, "sustain", "BF", "right", "up", 0.474],
  [73.579, "sustain", "Opp", "left", "left", 0.316],
  [74.211, "sustain", "Opp", "left", "up", 0.474],
  [74.211, "tap", "BF", "right", "right", 0.000],
  [74.368, "tap", "BF", "right", "down", 0.000],
  [74.526, "tap", "BF", "right", "up", 0.000],
  [74.684, "tap", "BF", "right", "down", 0.000],
  [74.842, "tap", "Opp", "left", "down", 0.000],
  [74.842, "sustain", "BF", "right", "left", 0.474],
  [75.079, "tap", "Opp", "left", "right", 0.000],
  [75.474, "sustain", "Opp", "left", "left", 0.789],
  [75.474, "sustain", "BF", "right", "down", 0.474],
  [76.105, "sustain", "BF", "right", "right", 0.474],
  [76.421, "tap", "Opp", "left", "up", 0.000],
  [76.737, "sustain", "Opp", "left", "right", 0.316],
  [76.737, "sustain", "BF", "right", "left", 0.474],
  [77.368, "sustain", "Opp", "left", "down", 0.474],
  [77.368, "sustain", "BF", "right", "up", 0.474],
  [78.000, "sustain", "Opp", "left", "left", 0.474],
  [78.000, "tap", "BF", "right", "down", 0.000],
  [78.158, "tap", "BF", "right", "right", 0.000],
  [78.316, "tap", "BF", "right", "left", 0.000],
  [78.632, "sustain", "BF", "right", "right", 0.474],
  [79.263, "tap", "BF", "right", "down", 0.000],
  [79.421, "tap", "BF", "right", "up", 0.000],
  [79.579, "tap", "BF", "right", "left", 0.000],
  [79.737, "tap", "BF", "right", "down", 0.000],
  [79.895, "tap", "BF", "right", "left", 0.000],
  [80.211, "sustain", "Opp", "left", "down", 0.474],
  [80.211, "sustain", "BF", "right", "right", 0.474],
  [80.842, "sustain", "Opp", "left", "up", 1.895],
  [80.842, "sustain", "BF", "right", "up", 1.895],
  [81.947, "sustain", "Opp", "left", "right", 1.263],
  [102.915, "tap", "Opp", "left", "down", 0.000],
  [103.105, "tap", "Opp", "left", "down", 0.000],
  [103.295, "tap", "Opp", "left", "right", 0.000],
  [103.485, "tap", "Opp", "left", "left", 0.000],
  [103.675, "sustain", "Opp", "left", "left", 0.285],
  [104.054, "sustain", "Opp", "left", "down", 0.285],
  [104.434, "tap", "Opp", "left", "left", 0.000],
  [104.529, "tap", "Opp", "left", "right", 0.000],
  [104.624, "tap", "Opp", "left", "down", 0.000],
  [104.814, "tap", "Opp", "left", "up", 0.000],
  [105.004, "tap", "Opp", "left", "left", 0.000],
  [105.194, "sustain", "Opp", "left", "left", 0.285],
  [105.573, "tap", "Opp", "left", "right", 0.000],
  [105.668, "tap", "Opp", "left", "up", 0.000],
  [105.763, "tap", "Opp", "left", "down", 0.000],
  [105.953, "sustain", "Opp", "left", "left", 0.285],
  [105.953, "sustain", "BF", "right", "left", 0.665],
  [106.713, "sustain", "Opp", "left", "up", 0.285],
  [106.713, "tap", "BF", "right", "down", 0.000],
  [106.808, "tap", "BF", "right", "right", 0.000],
  [106.902, "tap", "BF", "right", "up", 0.000],
  [106.997, "tap", "BF", "right", "left", 0.000],
  [107.092, "tap", "BF", "right", "right", 0.000],
  [107.187, "tap", "BF", "right", "down", 0.000],
  [107.282, "tap", "BF", "right", "right", 0.000],
  [107.377, "tap", "BF", "right", "left", 0.000],
  [107.472, "sustain", "BF", "right", "up", 0.475],
  [107.472, "sustain", "Opp", "left", "left", 0.665],
  [108.042, "sustain", "BF", "right", "left", 0.285],
  [108.232, "sustain", "Opp", "left", "down", 0.285],
  [108.421, "tap", "BF", "right", "down", 0.000],
  [108.611, "tap", "BF", "right", "right", 0.000],
  [108.801, "tap", "BF", "right", "left", 0.000],
  [108.991, "tap", "BF", "right", "down", 0.000],
  [109.181, "tap", "BF", "right", "down", 0.000],
  [109.371, "tap", "BF", "right", "left", 0.000],
  [109.561, "tap", "BF", "right", "up", 0.000],
  [109.751, "sustain", "BF", "right", "down", 0.285],
  [110.130, "sustain", "BF", "right", "right", 0.285],
  [110.510, "tap", "BF", "right", "left", 0.000],
  [110.605, "tap", "BF", "right", "right", 0.000],
  [110.700, "tap", "BF", "right", "down", 0.000],
  [110.890, "tap", "BF", "right", "up", 0.000],
  [110.985, "tap", "BF", "right", "up", 0.000],
  [111.080, "tap", "BF", "right", "left", 0.000],
  [111.270, "sustain", "BF", "right", "down", 0.285],
  [111.649, "tap", "BF", "right", "right", 0.000],
  [111.744, "tap", "BF", "right", "left", 0.000],
  [111.839, "tap", "BF", "right", "right", 0.000],
  [112.029, "sustain", "BF", "right", "up", 0.285],
  [112.219, "tap", "Opp", "left", "down", 0.000],
  [112.409, "tap", "Opp", "left", "left", 0.000],
  [112.599, "tap", "Opp", "left", "right", 0.000],
  [112.789, "sustain", "BF", "right", "down", 0.285],
  [112.789, "sustain", "Opp", "left", "down", 0.190],
  [113.168, "tap", "Opp", "left", "left", 0.000],
  [113.358, "tap", "Opp", "left", "up", 0.000],
  [113.548, "sustain", "BF", "right", "left", 0.665],
  [113.548, "sustain", "Opp", "left", "right", 0.475],
  [114.118, "sustain", "Opp", "left", "left", 0.285],
  [114.308, "sustain", "BF", "right", "up", 0.285],
  [114.497, "tap", "Opp", "left", "right", 0.000],
  [114.687, "tap", "Opp", "left", "up", 0.000],
  [114.877, "tap", "Opp", "left", "down", 0.000],
  [115.067, "sustain", "BF", "right", "down", 0.285],
  [115.447, "sustain", "BF", "right", "left", 0.665],
  [115.447, "tap", "Opp", "left", "up", 0.000],
  [115.542, "tap", "Opp", "left", "down", 0.000],
  [115.637, "tap", "Opp", "left", "left", 0.000],
  [115.827, "sustain", "Opp", "left", "up", 0.285],
  [116.206, "tap", "Opp", "left", "down", 0.000],
  [116.301, "tap", "Opp", "left", "right", 0.000],
  [116.396, "tap", "Opp", "left", "left", 0.000],
  [116.586, "sustain", "BF", "right", "up", 0.285],
  [116.966, "sustain", "BF", "right", "right", 0.665],
  [116.966, "tap", "Opp", "left", "down", 0.000],
  [117.061, "tap", "Opp", "left", "right", 0.000],
  [117.156, "tap", "Opp", "left", "up", 0.000],
  [117.345, "sustain", "Opp", "left", "left", 0.285],
  [117.725, "tap", "Opp", "left", "right", 0.000],
  [117.820, "tap", "Opp", "left", "down", 0.000],
  [117.915, "tap", "Opp", "left", "right", 0.000],
  [118.105, "tap", "BF", "right", "down", 0.000],
  [118.105, "tap", "Opp", "left", "up", 0.000],
  [118.200, "tap", "BF", "right", "right", 0.000],
  [118.295, "tap", "BF", "right", "left", 0.000],
  [118.295, "tap", "Opp", "left", "down", 0.000],
  [118.390, "tap", "BF", "right", "up", 0.000],
  [118.485, "tap", "Opp", "left", "left", 0.000],
  [118.485, "tap", "BF", "right", "down", 0.000],
  [118.580, "tap", "BF", "right", "right", 0.000],
  [118.675, "tap", "Opp", "left", "right", 0.000],
  [118.675, "tap", "BF", "right", "left", 0.000],
  [118.770, "tap", "BF", "right", "down", 0.000],
  [118.864, "tap", "BF", "right", "up", 0.000],
  [118.864, "tap", "Opp", "left", "up", 0.000],
  [118.959, "tap", "BF", "right", "down", 0.000],
  [119.054, "tap", "BF", "right", "right", 0.000],
  [119.054, "sustain", "Opp", "left", "left", 0.475],
  [119.149, "tap", "BF", "right", "left", 0.000],
  [119.244, "tap", "BF", "right", "right", 0.000],
  [119.339, "tap", "BF", "right", "down", 0.000],
  [119.434, "tap", "BF", "right", "left", 0.000],
  [119.529, "tap", "BF", "right", "up", 0.000],
  [119.624, "tap", "BF", "right", "down", 0.000],
  [119.719, "tap", "BF", "right", "right", 0.000],
  [119.814, "sustain", "Opp", "left", "down", 0.285],
  [119.814, "tap", "BF", "right", "left", 0.000],
  [119.909, "tap", "BF", "right", "up", 0.000],
  [120.004, "tap", "BF", "right", "left", 0.000],
  [120.099, "tap", "BF", "right", "right", 0.000],
  [120.194, "tap", "Opp", "left", "up", 0.000],
  [120.194, "tap", "BF", "right", "down", 0.000],
  [120.289, "tap", "BF", "right", "right", 0.000],
  [120.383, "tap", "Opp", "left", "left", 0.000],
  [120.383, "tap", "BF", "right", "up", 0.000],
  [120.478, "tap", "BF", "right", "left", 0.000],
  [120.573, "sustain", "Opp", "left", "right", 0.475],
  [120.573, "tap", "BF", "right", "right", 0.000],
  [120.668, "tap", "BF", "right", "down", 0.000],
  [120.763, "tap", "BF", "right", "left", 0.000],
  [120.858, "tap", "BF", "right", "up", 0.000],
  [120.953, "tap", "BF", "right", "down", 0.000],
  [121.048, "tap", "BF", "right", "right", 0.000],
  [121.143, "sustain", "Opp", "left", "left", 0.285],
  [121.523, "tap", "BF", "right", "down", 0.000],
  [121.523, "sustain", "Opp", "left", "up", 0.665],
  [121.618, "tap", "BF", "right", "left", 0.000],
  [121.713, "tap", "BF", "right", "up", 0.000],
  [121.902, "sustain", "BF", "right", "down", 0.285],
  [122.282, "tap", "BF", "right", "left", 0.000],
  [122.377, "tap", "BF", "right", "down", 0.000],
  [122.472, "tap", "BF", "right", "right", 0.000],
  [122.662, "sustain", "Opp", "left", "down", 0.285],
  [123.042, "sustain", "Opp", "left", "right", 0.665],
  [123.042, "tap", "BF", "right", "down", 0.000],
  [123.137, "tap", "BF", "right", "left", 0.000],
  [123.232, "tap", "BF", "right", "up", 0.000],
  [123.421, "sustain", "BF", "right", "down", 0.285],
  [123.801, "tap", "BF", "right", "left", 0.000],
  [123.896, "tap", "BF", "right", "down", 0.000],
  [123.991, "tap", "BF", "right", "right", 0.000],
  [124.181, "tap", "BF", "right", "left", 0.000],
  [124.181, "tap", "Opp", "left", "left", 0.000],
  [124.276, "tap", "Opp", "left", "up", 0.000],
  [124.371, "tap", "BF", "right", "up", 0.000],
  [124.371, "tap", "Opp", "left", "down", 0.000],
  [124.561, "tap", "BF", "right", "down", 0.000],
  [124.561, "tap", "Opp", "left", "right", 0.000],
  [124.656, "tap", "Opp", "left", "left", 0.000],
  [124.751, "tap", "BF", "right", "right", 0.000],
  [124.751, "tap", "Opp", "left", "right", 0.000],
  [124.940, "tap", "BF", "right", "left", 0.000],
  [124.940, "tap", "Opp", "left", "up", 0.000],
  [125.035, "tap", "Opp", "left", "down", 0.000],
  [125.130, "tap", "Opp", "left", "left", 0.000],
  [125.130, "tap", "BF", "right", "up", 0.000],
  [125.320, "tap", "Opp", "left", "right", 0.000],
  [125.320, "sustain", "BF", "right", "up", 0.475],
  [125.510, "tap", "Opp", "left", "down", 0.000],
  [125.700, "tap", "Opp", "left", "right", 0.000],
  [125.890, "tap", "Opp", "left", "up", 0.000],
  [125.890, "sustain", "BF", "right", "left", 0.285],
  [126.080, "tap", "Opp", "left", "down", 0.000],
  [126.175, "tap", "Opp", "left", "up", 0.000],
  [126.270, "tap", "Opp", "left", "left", 0.000],
  [126.270, "tap", "BF", "right", "down", 0.000],
  [126.459, "tap", "BF", "right", "right", 0.000],
  [126.459, "tap", "Opp", "left", "right", 0.000],
  [126.649, "sustain", "BF", "right", "down", 0.475],
  [126.649, "tap", "Opp", "left", "left", 0.000],
  [126.744, "tap", "Opp", "left", "up", 0.000],
  [126.839, "tap", "Opp", "left", "right", 0.000],
  [127.029, "tap", "Opp", "left", "down", 0.000],
  [127.219, "sustain", "Opp", "left", "up", 0.665],
  [127.219, "tap", "Opp", "left", "right", 0.000],
  [127.978, "sustain", "Opp", "left", "left", 0.665],
  [128.738, "sustain", "Opp", "left", "down", 0.665],
  [129.497, "sustain", "Opp", "left", "right", 0.665],
  [130.257, "sustain", "Opp", "left", "left", 0.665],
  [131.016, "sustain", "Opp", "left", "right", 0.665],
  [131.776, "sustain", "Opp", "left", "down", 0.665],
  [132.535, "sustain", "Opp", "left", "up", 0.665],
  [133.295, "sustain", "BF", "right", "down", 0.665],
  [133.295, "sustain", "Opp", "left", "right", 1.424],
  [134.054, "sustain", "BF", "right", "up", 0.665],
  [134.814, "sustain", "BF", "right", "left", 0.665],
  [135.573, "sustain", "BF", "right", "down", 0.665],
  [136.333, "sustain", "BF", "right", "right", 0.665],
  [137.092, "sustain", "BF", "right", "up", 0.665],
  [137.852, "sustain", "BF", "right", "down", 0.665],
  [138.611, "sustain", "BF", "right", "left", 0.570],
  [139.371, "sustain", "Opp", "left", "up", 0.665],
  [139.371, "tap", "Opp", "left", "down", 0.000],
  [140.130, "sustain", "Opp", "left", "left", 0.665],
  [140.890, "sustain", "Opp", "left", "down", 0.380],
  [141.459, "tap", "Opp", "left", "right", 0.000],
  [141.554, "tap", "Opp", "left", "up", 0.000],
  [141.649, "sustain", "Opp", "left", "left", 0.285],
  [142.029, "sustain", "Opp", "left", "up", 0.285],
  [142.409, "sustain", "Opp", "left", "left", 0.665],
  [143.168, "sustain", "Opp", "left", "right", 0.665],
  [143.928, "sustain", "Opp", "left", "left", 0.570],
  [144.592, "tap", "Opp", "left", "down", 0.000],
  [144.687, "sustain", "Opp", "left", "right", 0.285],
  [145.067, "sustain", "Opp", "left", "left", 0.285],
  [145.447, "sustain", "BF", "right", "down", 0.665],
  [145.447, "tap", "BF", "right", "right", 0.000],
  [146.206, "sustain", "BF", "right", "left", 0.665],
  [146.966, "sustain", "BF", "right", "up", 0.475],
  [147.535, "tap", "BF", "right", "left", 0.000],
  [147.630, "tap", "BF", "right", "down", 0.000],
  [147.725, "sustain", "BF", "right", "right", 0.285],
  [148.105, "sustain", "BF", "right", "left", 0.285],
  [148.485, "sustain", "BF", "right", "down", 0.665],
  [149.244, "sustain", "BF", "right", "up", 0.665],
  [150.004, "sustain", "BF", "right", "right", 0.475],
  [150.573, "tap", "BF", "right", "up", 0.000],
  [150.668, "tap", "BF", "right", "left", 0.000],
  [150.763, "sustain", "BF", "right", "down", 0.285],
  [151.143, "sustain", "BF", "right", "left", 0.285],
  [151.523, "tap", "Opp", "left", "up", 0.000],
  [151.523, "sustain", "BF", "right", "down", 0.285],
  [151.713, "tap", "Opp", "left", "up", 0.000],
  [151.902, "tap", "Opp", "left", "left", 0.000],
  [151.902, "tap", "Opp", "left", "down", 0.000],
  [152.092, "tap", "Opp", "left", "right", 0.000],
  [152.187, "sustain", "Opp", "left", "up", 0.285],
  [152.472, "tap", "Opp", "left", "left", 0.000],
  [152.567, "tap", "Opp", "left", "down", 0.000],
  [152.662, "tap", "Opp", "left", "right", 0.000],
  [152.852, "tap", "Opp", "left", "right", 0.000],
  [153.042, "tap", "Opp", "left", "left", 0.000],
  [153.232, "tap", "Opp", "left", "left", 0.000],
  [153.421, "tap", "Opp", "left", "up", 0.000],
  [153.611, "tap", "Opp", "left", "down", 0.000],
  [153.706, "sustain", "Opp", "left", "right", 0.190],
  [153.991, "tap", "BF", "right", "up", 0.000],
  [153.991, "tap", "Opp", "left", "left", 0.000],
  [154.086, "tap", "BF", "right", "left", 0.000],
  [154.086, "tap", "Opp", "left", "down", 0.000],
  [154.181, "tap", "BF", "right", "down", 0.000],
  [154.181, "tap", "Opp", "left", "up", 0.000],
  [154.276, "tap", "BF", "right", "right", 0.000],
  [154.371, "tap", "BF", "right", "left", 0.000],
  [154.371, "tap", "Opp", "left", "up", 0.000],
  [154.466, "tap", "BF", "right", "up", 0.000],
  [154.561, "tap", "BF", "right", "left", 0.000],
  [154.561, "sustain", "Opp", "left", "left", 1.044],
  [154.656, "tap", "BF", "right", "down", 0.000],
  [154.751, "tap", "BF", "right", "right", 0.000],
  [154.940, "tap", "BF", "right", "up", 0.000],
  [155.130, "tap", "BF", "right", "down", 0.000],
  [155.225, "tap", "BF", "right", "right", 0.000],
  [155.415, "tap", "BF", "right", "right", 0.000],
  [155.510, "tap", "BF", "right", "left", 0.000],
  [155.605, "tap", "BF", "right", "down", 0.000],
  [155.700, "tap", "BF", "right", "up", 0.000],
  [155.890, "tap", "BF", "right", "up", 0.000],
  [156.080, "tap", "BF", "right", "down", 0.000],
  [156.080, "sustain", "Opp", "left", "down", 1.044],
  [156.175, "tap", "BF", "right", "right", 0.000],
  [156.270, "tap", "BF", "right", "left", 0.000],
  [156.459, "tap", "BF", "right", "up", 0.000],
  [156.649, "tap", "BF", "right", "down", 0.000],
  [156.744, "tap", "BF", "right", "right", 0.000],
  [156.934, "tap", "BF", "right", "right", 0.000],
  [157.029, "tap", "BF", "right", "left", 0.000],
  [157.124, "tap", "BF", "right", "down", 0.000],
  [157.219, "tap", "BF", "right", "up", 0.000],
  [157.219, "tap", "Opp", "left", "up", 0.000],
  [157.314, "tap", "BF", "right", "left", 0.000],
  [157.314, "tap", "Opp", "left", "right", 0.000],
  [157.409, "tap", "Opp", "left", "left", 0.000],
  [157.409, "tap", "BF", "right", "right", 0.000],
  [157.504, "tap", "Opp", "left", "left", 0.000],
  [157.599, "sustain", "Opp", "left", "up", 0.190],
  [157.599, "sustain", "BF", "right", "down", 1.044],
  [157.599, "tap", "Opp", "left", "right", 0.000],
  [157.978, "tap", "Opp", "left", "left", 0.000],
  [158.073, "tap", "Opp", "left", "right", 0.000],
  [158.168, "tap", "Opp", "left", "down", 0.000],
  [158.358, "sustain", "Opp", "left", "up", 0.190],
  [158.358, "tap", "Opp", "left", "right", 0.000],
  [158.643, "sustain", "Opp", "left", "right", 0.285],
  [158.643, "tap", "Opp", "left", "down", 0.000],
  [159.023, "tap", "Opp", "left", "down", 0.000],
  [159.118, "sustain", "Opp", "left", "left", 0.190],
  [159.497, "tap", "Opp", "left", "right", 0.000],
  [159.592, "tap", "Opp", "left", "down", 0.000],
  [159.687, "tap", "Opp", "left", "up", 0.000],
  [159.877, "sustain", "Opp", "left", "left", 0.190],
  [159.877, "tap", "Opp", "left", "down", 0.000],
  [160.162, "sustain", "Opp", "left", "down", 0.285],
  [160.162, "tap", "Opp", "left", "right", 0.000],
  [160.542, "tap", "Opp", "left", "up", 0.000],
  [160.637, "sustain", "BF", "right", "down", 0.190],
  [160.637, "tap", "Opp", "left", "right", 0.000],
  [160.732, "tap", "Opp", "left", "left", 0.000],
  [160.827, "tap", "Opp", "left", "right", 0.000],
  [161.016, "tap", "BF", "right", "up", 0.000],
  [161.016, "tap", "Opp", "left", "up", 0.000],
  [161.111, "tap", "BF", "right", "left", 0.000],
  [161.206, "tap", "Opp", "left", "left", 0.000],
  [161.206, "tap", "BF", "right", "right", 0.000],
  [161.301, "tap", "BF", "right", "up", 0.000],
  [161.301, "tap", "Opp", "left", "up", 0.000],
  [161.428, "tap", "BF", "right", "down", 0.000],
  [161.491, "tap", "Opp", "left", "left", 0.000],
  [161.586, "tap", "Opp", "left", "right", 0.000],
  [161.728, "tap", "BF", "right", "down", 0.000],
  [161.823, "tap", "Opp", "left", "up", 0.000],
  [161.918, "tap", "Opp", "left", "left", 0.000],
  [162.013, "tap", "Opp", "left", "right", 0.000],
  [162.013, "tap", "BF", "right", "right", 0.000],
  [162.108, "tap", "Opp", "left", "right", 0.000],
  [162.108, "tap", "BF", "right", "right", 0.000],
  [162.251, "tap", "Opp", "left", "down", 0.000],
  [162.251, "tap", "BF", "right", "left", 0.000],
  [162.345, "tap", "Opp", "left", "up", 0.000],
  [162.440, "tap", "Opp", "left", "left", 0.000],
  [162.694, "tap", "Opp", "left", "right", 0.000],
  [162.694, "tap", "BF", "right", "up", 0.000],
  [162.789, "tap", "BF", "right", "left", 0.000],
  [162.915, "tap", "Opp", "left", "up", 0.000],
  [162.915, "tap", "BF", "right", "right", 0.000],
  [163.042, "tap", "Opp", "left", "up", 0.000],
  [163.152, "sustain", "BF", "right", "left", 0.190],
  [163.295, "tap", "Opp", "left", "down", 0.000],
  [163.390, "tap", "Opp", "left", "right", 0.000],
  [163.508, "sustain", "BF", "right", "down", 0.285],
  [163.611, "tap", "Opp", "left", "left", 0.000],
  [163.754, "tap", "Opp", "left", "up", 0.000],
  [163.896, "tap", "BF", "right", "left", 0.000],
  [163.896, "tap", "Opp", "left", "down", 0.000],
  [164.007, "tap", "Opp", "left", "right", 0.000],
  [164.007, "tap", "BF", "right", "left", 0.000],
  [182.107, "tap", "Opp", "left", "up", 0.000],
  [182.107, "sustain", "Opp", "left", "right", 0.375],
  [182.607, "tap", "Opp", "left", "down", 0.000],
  [182.732, "tap", "Opp", "left", "right", 0.000],
  [182.857, "sustain", "Opp", "left", "left", 0.375],
  [183.357, "tap", "Opp", "left", "right", 0.000],
  [183.482, "tap", "Opp", "left", "down", 0.000],
  [183.607, "sustain", "Opp", "left", "up", 0.250],
  [183.982, "tap", "Opp", "left", "left", 0.000],
  [184.107, "sustain", "Opp", "left", "right", 0.375],
  [184.607, "tap", "Opp", "left", "left", 0.000],
  [184.732, "tap", "Opp", "left", "left", 0.000],
  [184.857, "sustain", "Opp", "left", "up", 0.375],
  [185.357, "tap", "Opp", "left", "right", 0.000],
  [185.482, "tap", "Opp", "left", "down", 0.000],
  [185.607, "sustain", "Opp", "left", "up", 0.250],
  [185.982, "tap", "Opp", "left", "left", 0.000],
  [186.107, "sustain", "Opp", "left", "down", 1.875],
  [186.107, "tap", "BF", "right", "up", 0.000],
  [186.107, "sustain", "BF", "right", "right", 0.375],
  [186.607, "tap", "BF", "right", "left", 0.000],
  [186.732, "tap", "BF", "right", "down", 0.000],
  [186.857, "sustain", "BF", "right", "up", 0.375],
  [187.357, "tap", "BF", "right", "down", 0.000],
  [187.482, "tap", "BF", "right", "right", 0.000],
  [187.607, "sustain", "BF", "right", "left", 0.250],
  [187.982, "tap", "BF", "right", "down", 0.000],
  [188.107, "sustain", "BF", "right", "right", 0.375],
  [188.107, "sustain", "Opp", "left", "right", 1.875],
  [188.607, "tap", "BF", "right", "up", 0.000],
  [188.732, "tap", "BF", "right", "up", 0.000],
  [188.857, "sustain", "BF", "right", "left", 0.375],
  [189.357, "tap", "BF", "right", "down", 0.000],
  [189.482, "tap", "BF", "right", "right", 0.000],
  [189.607, "sustain", "BF", "right", "down", 0.250],
  [189.982, "tap", "BF", "right", "left", 0.000],
  [190.107, "sustain", "BF", "right", "up", 1.750],
  [190.107, "sustain", "Opp", "left", "left", 0.875],
  [191.107, "sustain", "Opp", "left", "down", 0.875],
  [192.107, "sustain", "BF", "right", "down", 0.875],
  [192.107, "sustain", "Opp", "left", "up", 0.875],
  [193.107, "sustain", "Opp", "left", "left", 0.875],
  [193.107, "sustain", "BF", "right", "up", 0.875],
  [194.107, "sustain", "Opp", "left", "up", 0.875],
  [194.107, "sustain", "BF", "right", "right", 1.875],
  [195.107, "sustain", "Opp", "left", "right", 0.875],
  [196.107, "sustain", "BF", "right", "up", 0.875],
  [196.107, "sustain", "Opp", "left", "left", 0.875],
  [196.107, "sustain", "Opp", "left", "up", 0.875],
  [197.107, "tap", "BF", "right", "left", 0.000],
  [197.107, "sustain", "BF", "right", "down", 0.875],
  [197.107, "sustain", "Opp", "left", "down", 0.875],
  [199.065, "sustain", "Opp", "left", "up", 0.319],
  [199.703, "tap", "Opp", "left", "down", 0.000],
  [199.783, "tap", "Opp", "left", "right", 0.000],
  [200.714, "tap", "Opp", "left", "down", 0.000],
  [200.830, "tap", "Opp", "left", "down", 0.000],
  [200.945, "tap", "Opp", "left", "up", 0.000],
  [201.176, "tap", "Opp", "left", "left", 0.000],
  [201.407, "tap", "Opp", "left", "right", 0.000],
  [201.638, "sustain", "Opp", "left", "down", 0.577],
  [202.561, "tap", "Opp", "left", "up", 0.000],
  [202.791, "tap", "Opp", "left", "right", 0.000],
  [203.022, "tap", "Opp", "left", "down", 0.000],
  [203.253, "sustain", "Opp", "left", "left", 0.577],
  [204.407, "tap", "Opp", "left", "up", 0.000],
  [204.638, "tap", "Opp", "left", "right", 0.000],
  [204.868, "tap", "Opp", "left", "left", 0.000],
  [205.099, "tap", "Opp", "left", "up", 0.000],
  [205.214, "tap", "Opp", "left", "down", 0.000],
  [205.330, "sustain", "Opp", "left", "right", 0.577],
  [206.253, "tap", "Opp", "left", "left", 0.000],
  [206.484, "tap", "Opp", "left", "up", 0.000],
  [206.714, "tap", "Opp", "left", "down", 0.000],
  [206.945, "sustain", "Opp", "left", "left", 0.577],
  [208.099, "tap", "BF", "right", "up", 0.000],
  [208.214, "tap", "BF", "right", "up", 0.000],
  [208.330, "tap", "BF", "right", "down", 0.000],
  [208.561, "tap", "BF", "right", "right", 0.000],
  [208.791, "tap", "Opp", "left", "up", 0.000],
  [208.791, "tap", "BF", "right", "left", 0.000],
  [209.022, "tap", "Opp", "left", "left", 0.000],
  [209.022, "sustain", "BF", "right", "down", 0.462],
  [209.253, "tap", "Opp", "left", "down", 0.000],
  [209.484, "sustain", "Opp", "left", "right", 0.346],
  [209.945, "tap", "BF", "right", "up", 0.000],
  [210.176, "tap", "BF", "right", "right", 0.000],
  [210.407, "tap", "BF", "right", "left", 0.000],
  [210.638, "sustain", "BF", "right", "down", 0.462],
  [210.638, "tap", "Opp", "left", "up", 0.000],
  [210.868, "tap", "Opp", "left", "right", 0.000],
  [211.099, "sustain", "Opp", "left", "left", 0.808],
  [211.791, "tap", "BF", "right", "up", 0.000],
  [212.022, "tap", "BF", "right", "down", 0.000],
  [212.253, "tap", "BF", "right", "up", 0.000],
  [212.253, "tap", "BF", "right", "right", 0.000],
  [212.484, "tap", "BF", "right", "left", 0.000],
  [212.484, "tap", "Opp", "left", "left", 0.000],
  [212.714, "sustain", "BF", "right", "down", 0.462],
  [212.714, "tap", "Opp", "left", "right", 0.000],
  [212.945, "tap", "Opp", "left", "down", 0.000],
  [213.185, "sustain", "Opp", "left", "up", 0.319],
  [213.663, "tap", "BF", "right", "left", 0.000],
  [213.903, "tap", "BF", "right", "up", 0.000],
  [214.142, "tap", "BF", "right", "down", 0.000],
  [214.381, "tap", "Opp", "left", "up", 0.000],
  [214.381, "tap", "BF", "right", "up", 0.000],
  [214.381, "sustain", "BF", "right", "right", 0.319],
  [214.621, "tap", "Opp", "left", "left", 0.000],
  [214.860, "sustain", "Opp", "left", "up", 0.778],
  [214.860, "sustain", "Opp", "left", "right", 0.667],
  [215.749, "tap", "Opp", "left", "left", 0.000],
  [215.860, "tap", "Opp", "left", "up", 0.000],
  [215.971, "tap", "Opp", "left", "right", 0.000],
  [216.082, "tap", "Opp", "left", "down", 0.000],
  [216.193, "tap", "Opp", "left", "right", 0.000],
  [216.305, "tap", "Opp", "left", "down", 0.000],
  [216.416, "tap", "Opp", "left", "left", 0.000],
  [216.527, "tap", "Opp", "left", "up", 0.000],
  [216.638, "sustain", "Opp", "left", "down", 0.778],
  [216.638, "sustain", "Opp", "left", "right", 0.778],
  [217.527, "sustain", "Opp", "left", "up", 0.222],
  [217.860, "tap", "Opp", "left", "right", 0.000],
  [218.082, "tap", "Opp", "left", "down", 0.000],
  [218.193, "tap", "Opp", "left", "left", 0.000],
  [218.305, "tap", "Opp", "left", "up", 0.000],
  [218.416, "sustain", "Opp", "left", "down", 0.778],
  [218.416, "sustain", "Opp", "left", "left", 0.778],
  [219.305, "sustain", "Opp", "left", "up", 0.778],
  [219.749, "tap", "Opp", "left", "left", 0.000],
  [219.860, "tap", "Opp", "left", "left", 0.000],
  [219.971, "tap", "Opp", "left", "left", 0.000],
  [220.082, "tap", "Opp", "left", "left", 0.000],
  [220.193, "sustain", "Opp", "left", "down", 0.190],
  [220.416, "sustain", "Opp", "left", "up", 0.190],
  [220.638, "sustain", "Opp", "left", "left", 0.190],
  [220.860, "sustain", "Opp", "left", "right", 0.190],
  [221.082, "tap", "Opp", "left", "up", 0.000],
  [221.082, "tap", "Opp", "left", "down", 0.000],
  [221.305, "tap", "Opp", "left", "right", 0.000],
  [221.416, "tap", "Opp", "left", "up", 0.000],
  [221.527, "tap", "Opp", "left", "down", 0.000],
  [221.749, "tap", "Opp", "left", "left", 0.000],
  [221.971, "tap", "Opp", "left", "down", 0.000],
  [221.971, "tap", "Opp", "left", "right", 0.000],
  [222.193, "tap", "Opp", "left", "up", 0.000],
  [222.305, "tap", "Opp", "left", "left", 0.000],
  [222.416, "tap", "Opp", "left", "down", 0.000],
  [222.638, "tap", "Opp", "left", "up", 0.000],
  [222.749, "tap", "Opp", "left", "left", 0.000],
  [222.860, "tap", "Opp", "left", "right", 0.000],
  [222.971, "tap", "Opp", "left", "left", 0.000],
  [223.082, "tap", "Opp", "left", "up", 0.000],
  [223.193, "tap", "Opp", "left", "right", 0.000],
  [223.305, "tap", "Opp", "left", "down", 0.000],
  [223.416, "tap", "Opp", "left", "right", 0.000],
  [223.527, "tap", "Opp", "left", "left", 0.000],
  [223.638, "tap", "Opp", "left", "up", 0.000],
  [223.749, "tap", "Opp", "left", "right", 0.000],
  [223.860, "tap", "Opp", "left", "down", 0.000],
  [223.971, "tap", "Opp", "left", "up", 0.000],
  [224.082, "tap", "Opp", "left", "up", 0.000],
  [224.193, "sustain", "Opp", "left", "right", 0.115],
  [224.416, "tap", "Opp", "left", "left", 0.000],
  [224.527, "tap", "Opp", "left", "down", 0.000],
  [224.638, "tap", "Opp", "left", "right", 0.000],
  [224.749, "tap", "Opp", "left", "up", 0.000],
  [224.860, "tap", "Opp", "left", "right", 0.000],
  [224.971, "tap", "Opp", "left", "left", 0.000],
  [225.082, "tap", "Opp", "left", "up", 0.000],
  [225.193, "tap", "Opp", "left", "left", 0.000],
  [225.305, "tap", "Opp", "left", "right", 0.000],
  [225.527, "tap", "Opp", "left", "left", 0.000],
  [225.749, "tap", "Opp", "left", "right", 0.000],
  [225.860, "tap", "Opp", "left", "left", 0.000],
  [225.971, "tap", "Opp", "left", "down", 0.000],
  [226.082, "tap", "Opp", "left", "up", 0.000],
  [226.193, "tap", "Opp", "left", "right", 0.000],
  [226.416, "tap", "Opp", "left", "up", 0.000],
  [226.527, "tap", "Opp", "left", "left", 0.000],
  [226.638, "tap", "Opp", "left", "up", 0.000],
  [226.749, "tap", "Opp", "left", "down", 0.000],
  [226.860, "tap", "Opp", "left", "right", 0.000],
  [227.082, "tap", "Opp", "left", "left", 0.000],
  [227.305, "tap", "Opp", "left", "down", 0.000],
  [227.527, "tap", "Opp", "left", "right", 0.000],
  [227.749, "tap", "Opp", "left", "left", 0.000],
  [227.749, "tap", "Opp", "left", "up", 0.000],
  [227.971, "tap", "Opp", "left", "down", 0.000],
  [228.193, "tap", "Opp", "left", "up", 0.000],
  [228.416, "tap", "Opp", "left", "right", 0.000],
  [228.527, "tap", "Opp", "left", "right", 0.000],
  [228.638, "tap", "Opp", "left", "down", 0.000],
  [228.860, "sustain", "Opp", "left", "right", 1.778],
  [229.082, "sustain", "Opp", "right", "up", 0.778],
  [229.082, "tap", "Opp", "right", "left", 0.000],
  [229.971, "tap", "BF", "right", "right", 0.000],
  [230.082, "tap", "BF", "right", "left", 0.000],
  [230.193, "tap", "BF", "right", "up", 0.000],
  [230.305, "tap", "BF", "right", "down", 0.000],
  [230.416, "tap", "BF", "right", "right", 0.000],
  [230.527, "tap", "BF", "right", "left", 0.000],
  [230.638, "tap", "BF", "right", "up", 0.000],
  [230.749, "tap", "BF", "right", "left", 0.000],
  [230.860, "sustain", "Opp", "left", "down", 1.667],
  [230.860, "sustain", "Opp", "right", "right", 0.778],
  [230.860, "sustain", "Opp", "right", "up", 0.778],
  [231.749, "sustain", "Opp", "right", "left", 0.222],
  [232.082, "tap", "Opp", "right", "down", 0.000],
  [232.082, "tap", "Opp", "right", "right", 0.000],
  [232.305, "tap", "BF", "right", "up", 0.000],
  [232.416, "tap", "BF", "right", "left", 0.000],
  [232.527, "tap", "BF", "right", "right", 0.000],
  [232.638, "sustain", "Opp", "left", "left", 1.667],
  [232.638, "sustain", "Opp", "right", "left", 0.778],
  [232.638, "sustain", "Opp", "right", "down", 0.778],
  [233.527, "sustain", "Opp", "right", "up", 0.444],
  [233.527, "sustain", "Opp", "right", "right", 0.444],
  [234.082, "tap", "BF", "right", "left", 0.000],
  [234.193, "tap", "BF", "right", "down", 0.000],
  [234.305, "tap", "BF", "right", "left", 0.000],
  [234.416, "tap", "BF", "right", "right", 0.000],
  [234.416, "sustain", "Opp", "left", "up", 0.778],
  [234.527, "tap", "Opp", "right", "down", 0.000],
  [234.638, "tap", "Opp", "right", "left", 0.000],
  [234.860, "tap", "Opp", "right", "down", 0.000],
  [235.082, "tap", "Opp", "right", "right", 0.000],
  [235.305, "sustain", "Opp", "left", "right", 0.778],
  [235.305, "tap", "Opp", "right", "up", 0.000],
  [235.305, "tap", "Opp", "right", "left", 0.000],
  [235.527, "tap", "BF", "right", "right", 0.000],
  [235.638, "tap", "BF", "right", "left", 0.000],
  [235.749, "tap", "BF", "right", "right", 0.000],
  [235.971, "tap", "BF", "right", "down", 0.000],
  [236.193, "sustain", "Opp", "left", "down", 1.667],
  [236.193, "tap", "Opp", "right", "right", 0.000],
  [236.193, "tap", "Opp", "right", "up", 0.000],
  [236.416, "tap", "BF", "right", "left", 0.000],
  [236.527, "tap", "BF", "right", "up", 0.000],
  [236.638, "tap", "BF", "right", "down", 0.000],
  [236.860, "tap", "BF", "right", "right", 0.000],
  [236.971, "tap", "BF", "right", "left", 0.000],
  [237.082, "tap", "BF", "right", "down", 0.000],
  [237.193, "tap", "BF", "right", "left", 0.000],
  [237.305, "tap", "BF", "right", "up", 0.000],
  [237.416, "tap", "BF", "right", "right", 0.000],
  [237.527, "tap", "BF", "right", "left", 0.000],
  [237.638, "tap", "BF", "right", "down", 0.000],
  [237.693, "tap", "BF", "right", "up", 0.000],
  [237.749, "tap", "BF", "right", "right", 0.000],
  [237.860, "tap", "BF", "right", "left", 0.000],
  [237.971, "tap", "BF", "right", "up", 0.000],
  [237.971, "sustain", "Opp", "left", "left", 1.667],
  [238.082, "tap", "BF", "right", "down", 0.000],
  [238.193, "tap", "BF", "right", "right", 0.000],
  [238.305, "tap", "BF", "right", "left", 0.000],
  [238.416, "sustain", "Opp", "right", "up", 0.142],
  [238.638, "tap", "BF", "right", "down", 0.000],
  [238.749, "tap", "BF", "right", "left", 0.000],
  [238.860, "tap", "BF", "right", "up", 0.000],
  [238.971, "tap", "BF", "right", "left", 0.000],
  [239.082, "tap", "BF", "right", "right", 0.000],
  [239.193, "tap", "BF", "right", "down", 0.000],
  [239.305, "tap", "BF", "right", "up", 0.000],
  [239.416, "tap", "BF", "right", "right", 0.000],
  [239.527, "sustain", "Opp", "right", "left", 0.142],
  [239.749, "sustain", "Opp", "left", "down", 1.667],
  [239.749, "sustain", "Opp", "right", "right", 0.142],
  [239.971, "tap", "BF", "right", "down", 0.000],
  [240.082, "tap", "BF", "right", "up", 0.000],
  [240.193, "tap", "BF", "right", "left", 0.000],
  [240.305, "tap", "BF", "right", "up", 0.000],
  [240.416, "tap", "BF", "right", "down", 0.000],
  [240.638, "tap", "BF", "right", "right", 0.000],
  [240.749, "tap", "BF", "right", "down", 0.000],
  [240.860, "tap", "BF", "right", "up", 0.000],
  [240.971, "tap", "BF", "right", "left", 0.000],
  [241.082, "tap", "BF", "right", "right", 0.000],
  [241.305, "tap", "Opp", "right", "down", 0.000],
  [241.305, "tap", "Opp", "right", "left", 0.000],
  [241.527, "sustain", "Opp", "left", "up", 0.778],
  [241.527, "tap", "Opp", "right", "up", 0.000],
  [241.749, "tap", "Opp", "right", "left", 0.000],
  [241.971, "tap", "Opp", "right", "up", 0.000],
  [241.971, "sustain", "Opp", "right", "right", 0.142],
  [242.193, "sustain", "Opp", "right", "down", 0.142],
  [242.416, "sustain", "Opp", "left", "right", 0.778],
  [242.416, "tap", "Opp", "right", "left", 0.000],
  [242.638, "tap", "Opp", "right", "right", 0.000],
  [242.749, "tap", "Opp", "right", "down", 0.000],
  [242.860, "tap", "Opp", "right", "up", 0.000],
  [243.082, "tap", "Opp", "right", "left", 0.000],
  [243.305, "tap", "Opp", "left", "down", 0.000],
  [243.305, "sustain", "Opp", "right", "down", 1.444],
  [243.305, "tap", "Opp", "right", "right", 0.000],
  [243.416, "tap", "Opp", "left", "left", 0.000],
  [243.527, "tap", "Opp", "left", "up", 0.000],
  [243.638, "tap", "Opp", "left", "left", 0.000],
  [243.749, "tap", "Opp", "left", "right", 0.000],
  [243.860, "tap", "Opp", "left", "down", 0.000],
  [243.971, "tap", "Opp", "left", "up", 0.000],
  [244.082, "tap", "Opp", "left", "right", 0.000],
  [244.193, "tap", "Opp", "left", "left", 0.000],
  [244.305, "tap", "Opp", "left", "up", 0.000],
  [244.416, "tap", "Opp", "left", "down", 0.000],
  [244.527, "tap", "Opp", "left", "right", 0.000],
  [244.638, "tap", "Opp", "left", "down", 0.000],
  [244.749, "tap", "Opp", "left", "right", 0.000],
  [244.860, "tap", "Opp", "left", "left", 0.000],
  [244.971, "tap", "Opp", "left", "left", 0.000],
  [245.082, "tap", "Opp", "left", "right", 0.000],
  [245.193, "tap", "Opp", "left", "up", 0.000],
  [245.305, "tap", "Opp", "left", "down", 0.000],
  [245.416, "tap", "Opp", "left", "up", 0.000],
  [245.527, "tap", "Opp", "left", "left", 0.000],
  [245.638, "tap", "Opp", "left", "down", 0.000],
  [245.749, "tap", "Opp", "left", "right", 0.000],
  [245.860, "tap", "Opp", "left", "up", 0.000],
  [245.971, "tap", "Opp", "left", "left", 0.000],
  [246.082, "tap", "Opp", "left", "up", 0.000],
  [246.193, "tap", "Opp", "left", "right", 0.000],
  [246.305, "tap", "Opp", "left", "right", 0.000],
  [246.416, "tap", "Opp", "left", "down", 0.000],
  [246.527, "tap", "Opp", "left", "left", 0.000],
  [246.638, "tap", "Opp", "left", "right", 0.000],
  [246.749, "tap", "Opp", "left", "down", 0.000],
  [246.860, "tap", "Opp", "left", "up", 0.000],
  [246.971, "tap", "Opp", "left", "right", 0.000],
  [247.082, "tap", "Opp", "left", "left", 0.000],
  [247.193, "tap", "Opp", "left", "up", 0.000],
  [247.305, "tap", "Opp", "left", "down", 0.000],
  [247.416, "tap", "Opp", "left", "left", 0.000],
  [247.527, "tap", "Opp", "left", "up", 0.000],
  [247.638, "sustain", "Opp", "left", "right", 0.190],
  [247.860, "tap", "Opp", "left", "down", 0.000],
  [247.971, "tap", "Opp", "left", "up", 0.000],
  [248.082, "tap", "Opp", "left", "left", 0.000],
  [248.193, "tap", "Opp", "left", "up", 0.000],
  [248.305, "tap", "Opp", "left", "right", 0.000],
  [248.416, "tap", "Opp", "left", "down", 0.000],
  [248.527, "tap", "Opp", "left", "up", 0.000],
  [248.638, "tap", "Opp", "left", "left", 0.000],
  [248.749, "tap", "Opp", "left", "down", 0.000],
  [248.860, "tap", "Opp", "left", "right", 0.000],
  [248.971, "tap", "Opp", "left", "down", 0.000],
  [249.082, "tap", "Opp", "left", "up", 0.000],
  [249.193, "tap", "Opp", "left", "right", 0.000],
  [249.305, "tap", "Opp", "left", "left", 0.000],
  [249.416, "tap", "Opp", "left", "up", 0.000],
  [249.527, "tap", "Opp", "left", "down", 0.000],
  [249.638, "tap", "Opp", "left", "right", 0.000],
  [249.749, "tap", "Opp", "left", "up", 0.000],
  [249.860, "tap", "Opp", "left", "left", 0.000],
  [249.971, "tap", "Opp", "left", "up", 0.000],
  [250.082, "tap", "Opp", "left", "down", 0.000],
  [250.193, "tap", "Opp", "left", "right", 0.000],
  [250.305, "tap", "Opp", "left", "left", 0.000],
  [250.416, "sustain", "Opp", "left", "up", 0.778],
  [250.416, "tap", "Opp", "right", "down", 0.000],
  [250.527, "tap", "Opp", "right", "left", 0.000],
  [250.638, "tap", "Opp", "right", "up", 0.000],
  [250.749, "tap", "Opp", "right", "left", 0.000],
  [250.860, "tap", "Opp", "right", "right", 0.000],
  [250.971, "tap", "Opp", "right", "down", 0.000],
  [251.082, "tap", "Opp", "right", "up", 0.000],
  [251.193, "tap", "Opp", "right", "right", 0.000],
  [251.305, "sustain", "Opp", "left", "down", 0.778],
  [251.305, "sustain", "Opp", "left", "left", 0.778],
  [251.305, "tap", "Opp", "right", "left", 0.000],
  [251.416, "tap", "Opp", "right", "up", 0.000],
  [251.527, "tap", "Opp", "right", "down", 0.000],
  [251.638, "tap", "Opp", "right", "right", 0.000],
  [251.749, "tap", "Opp", "right", "down", 0.000],
  [251.860, "tap", "Opp", "right", "right", 0.000],
  [251.971, "tap", "Opp", "right", "left", 0.000],
  [252.082, "tap", "Opp", "right", "left", 0.000],
  [252.193, "sustain", "Opp", "left", "right", 0.778],
  [252.193, "tap", "Opp", "right", "right", 0.000],
  [252.305, "tap", "Opp", "right", "up", 0.000],
  [252.416, "tap", "Opp", "right", "down", 0.000],
  [252.527, "tap", "Opp", "right", "up", 0.000],
  [252.638, "tap", "Opp", "right", "left", 0.000],
  [252.749, "tap", "Opp", "right", "down", 0.000],
  [252.860, "tap", "Opp", "right", "right", 0.000],
  [252.971, "tap", "Opp", "right", "up", 0.000],
  [253.082, "sustain", "Opp", "left", "down", 0.778],
  [253.082, "tap", "Opp", "right", "left", 0.000],
  [253.193, "tap", "Opp", "right", "up", 0.000],
  [253.305, "tap", "Opp", "right", "right", 0.000],
  [253.416, "tap", "Opp", "right", "right", 0.000],
  [253.527, "tap", "Opp", "right", "down", 0.000],
  [253.638, "tap", "Opp", "right", "left", 0.000],
  [253.749, "tap", "Opp", "right", "right", 0.000],
  [253.860, "tap", "Opp", "right", "down", 0.000],
  [253.971, "sustain", "Opp", "left", "up", 0.778],
  [253.971, "sustain", "Opp", "left", "left", 0.778],
  [253.971, "tap", "Opp", "right", "up", 0.000],
  [254.082, "tap", "Opp", "right", "right", 0.000],
  [254.193, "tap", "Opp", "right", "left", 0.000],
  [254.305, "tap", "Opp", "right", "up", 0.000],
  [254.416, "tap", "Opp", "right", "down", 0.000],
  [254.527, "tap", "Opp", "right", "left", 0.000],
  [254.638, "tap", "Opp", "right", "up", 0.000],
  [254.749, "sustain", "Opp", "right", "right", 0.142],
  [254.860, "sustain", "Opp", "left", "right", 0.778],
  [254.971, "tap", "Opp", "right", "down", 0.000],
  [255.082, "tap", "Opp", "right", "up", 0.000],
  [255.193, "tap", "Opp", "right", "left", 0.000],
  [255.305, "tap", "Opp", "right", "up", 0.000],
  [255.416, "tap", "Opp", "right", "right", 0.000],
  [255.527, "tap", "Opp", "right", "down", 0.000],
  [255.638, "tap", "Opp", "right", "up", 0.000],
  [255.749, "sustain", "Opp", "left", "left", 0.778],
  [255.749, "tap", "Opp", "right", "left", 0.000],
  [255.860, "tap", "Opp", "right", "down", 0.000],
  [255.971, "tap", "Opp", "right", "right", 0.000],
  [256.082, "tap", "Opp", "right", "down", 0.000],
  [256.193, "tap", "Opp", "right", "up", 0.000],
  [256.305, "tap", "Opp", "right", "right", 0.000],
  [256.416, "tap", "Opp", "right", "left", 0.000],
  [256.527, "tap", "Opp", "right", "up", 0.000],
  [256.638, "sustain", "Opp", "left", "down", 0.778],
  [256.638, "sustain", "Opp", "left", "right", 0.778],
  [256.638, "tap", "Opp", "right", "down", 0.000],
  [256.749, "tap", "Opp", "right", "right", 0.000],
  [256.860, "tap", "Opp", "right", "up", 0.000],
  [256.971, "tap", "Opp", "right", "left", 0.000],
  [257.082, "tap", "Opp", "right", "up", 0.000],
  [257.193, "tap", "Opp", "right", "down", 0.000],
  [257.305, "tap", "Opp", "right", "right", 0.000],
  [257.416, "tap", "Opp", "right", "left", 0.000],
  [257.527, "tap", "Opp", "left", "up", 0.000],
  [257.527, "tap", "Opp", "left", "left", 0.000],
  [257.747, "tap", "Opp", "left", "left", 0.000],
  [257.968, "tap", "Opp", "left", "right", 0.000],
  [257.968, "tap", "Opp", "left", "up", 0.000],
  [258.189, "tap", "Opp", "left", "right", 0.000],
  [258.409, "tap", "Opp", "left", "left", 0.000],
  [258.519, "tap", "Opp", "left", "up", 0.000],
  [258.630, "tap", "Opp", "left", "down", 0.000],
  [258.740, "tap", "Opp", "left", "right", 0.000],
  [258.850, "tap", "Opp", "left", "down", 0.000],
  [258.961, "tap", "Opp", "left", "up", 0.000],
  [259.071, "tap", "Opp", "left", "right", 0.000],
  [259.181, "tap", "Opp", "left", "left", 0.000],
  [259.292, "tap", "Opp", "left", "up", 0.000],
  [259.402, "tap", "Opp", "left", "right", 0.000],
  [259.512, "tap", "Opp", "left", "down", 0.000],
  [259.622, "tap", "Opp", "left", "up", 0.000],
  [259.733, "tap", "Opp", "left", "left", 0.000],
  [259.843, "tap", "Opp", "left", "right", 0.000],
  [259.953, "tap", "Opp", "left", "left", 0.000],
  [260.064, "sustain", "Opp", "left", "down", 0.189],
  [260.284, "tap", "Opp", "left", "up", 0.000],
  [260.394, "tap", "Opp", "left", "right", 0.000],
  [260.505, "tap", "Opp", "left", "left", 0.000],
  [260.615, "tap", "Opp", "left", "up", 0.000],
  [260.725, "tap", "Opp", "left", "left", 0.000],
  [260.836, "tap", "Opp", "left", "right", 0.000],
  [260.946, "tap", "Opp", "left", "up", 0.000],
  [261.056, "sustain", "Opp", "left", "down", 1.654],
  [261.056, "tap", "Opp", "right", "down", 0.000],
  [261.056, "tap", "Opp", "right", "left", 0.000],
  [261.277, "tap", "BF", "right", "right", 0.000],
  [261.277, "tap", "BF", "right", "right", 0.000],
  [261.277, "tap", "BF", "right", "right", 0.000],
  [261.497, "tap", "Opp", "right", "down", 0.000],
  [261.497, "tap", "Opp", "right", "up", 0.000],
  [261.718, "tap", "BF", "right", "left", 0.000],
  [261.939, "tap", "BF", "right", "down", 0.000],
  [262.049, "tap", "BF", "right", "up", 0.000],
  [262.159, "tap", "BF", "right", "left", 0.000],
  [262.269, "tap", "BF", "right", "up", 0.000],
  [262.380, "tap", "BF", "right", "right", 0.000],
  [262.490, "tap", "BF", "right", "down", 0.000],
  [262.600, "tap", "BF", "right", "up", 0.000],
  [262.711, "tap", "BF", "right", "left", 0.000],
  [262.821, "tap", "BF", "right", "down", 0.000],
  [262.931, "tap", "BF", "right", "right", 0.000],
  [263.042, "tap", "BF", "right", "left", 0.000],
  [263.152, "tap", "BF", "right", "up", 0.000],
  [263.262, "tap", "BF", "right", "down", 0.000],
  [263.372, "tap", "BF", "right", "right", 0.000],
  [263.483, "tap", "BF", "right", "up", 0.000],
  [263.593, "sustain", "Opp", "right", "left", 0.142],
  [263.814, "tap", "BF", "right", "down", 0.000],
  [263.924, "tap", "BF", "right", "right", 0.000],
  [264.034, "tap", "BF", "right", "up", 0.000],
  [264.144, "tap", "BF", "right", "right", 0.000],
  [264.255, "tap", "BF", "right", "left", 0.000],
  [264.365, "tap", "BF", "right", "down", 0.000],
  [264.475, "tap", "BF", "right", "up", 0.000],
  [264.586, "tap", "BF", "right", "right", 0.000],
  [264.586, "tap", "Opp", "left", "right", 0.000],
  [264.696, "tap", "BF", "right", "left", 0.000],
  [264.696, "tap", "Opp", "left", "down", 0.000],
  [264.806, "tap", "BF", "right", "up", 0.000],
  [264.917, "tap", "BF", "right", "down", 0.000],
  [264.917, "sustain", "Opp", "left", "up", 0.189],
  [265.027, "sustain", "Opp", "right", "right", 0.142],
  [265.137, "tap", "Opp", "left", "down", 0.000],
  [265.247, "tap", "BF", "right", "down", 0.000],
  [265.247, "tap", "Opp", "left", "right", 0.000],
  [265.358, "tap", "BF", "right", "left", 0.000],
  [265.358, "tap", "Opp", "left", "down", 0.000],
  [265.468, "tap", "BF", "right", "up", 0.000],
  [265.468, "tap", "Opp", "left", "left", 0.000],
  [265.578, "tap", "BF", "right", "right", 0.000],
  [265.578, "tap", "Opp", "left", "up", 0.000],
  [265.689, "tap", "BF", "right", "left", 0.000],
  [265.799, "sustain", "Opp", "left", "right", 0.189],
  [265.909, "sustain", "Opp", "right", "down", 0.142],
  [266.019, "tap", "Opp", "left", "left", 0.000],
  [266.130, "tap", "BF", "right", "right", 0.000],
  [266.130, "tap", "Opp", "left", "down", 0.000],
  [266.240, "tap", "BF", "right", "up", 0.000],
  [266.240, "tap", "Opp", "left", "up", 0.000],
  [266.350, "tap", "BF", "right", "left", 0.000],
  [266.350, "tap", "Opp", "left", "right", 0.000],
  [266.461, "tap", "BF", "right", "down", 0.000],
  [266.461, "tap", "Opp", "left", "left", 0.000],
  [266.571, "tap", "BF", "right", "right", 0.000],
  [266.571, "tap", "Opp", "left", "up", 0.000],
  [266.681, "tap", "BF", "right", "down", 0.000],
  [266.681, "tap", "Opp", "left", "down", 0.000],
  [266.792, "tap", "Opp", "left", "right", 0.000],
  [266.792, "tap", "Opp", "right", "up", 0.000],
  [266.902, "tap", "BF", "right", "left", 0.000],
  [266.902, "tap", "Opp", "left", "down", 0.000],
  [267.012, "tap", "BF", "right", "up", 0.000],
  [267.012, "tap", "Opp", "left", "left", 0.000],
  [267.122, "tap", "BF", "right", "right", 0.000],
  [267.122, "tap", "Opp", "left", "up", 0.000],
  [267.233, "tap", "BF", "right", "down", 0.000],
  [267.233, "tap", "Opp", "left", "left", 0.000],
  [267.343, "tap", "BF", "right", "up", 0.000],
  [267.343, "tap", "Opp", "left", "right", 0.000],
  [267.453, "tap", "BF", "right", "left", 0.000],
  [267.453, "tap", "Opp", "left", "up", 0.000],
  [267.564, "tap", "BF", "right", "right", 0.000],
  [267.564, "tap", "Opp", "left", "down", 0.000],
  [267.674, "tap", "Opp", "left", "left", 0.000],
  [267.674, "tap", "Opp", "right", "left", 0.000],
  [267.784, "tap", "Opp", "left", "up", 0.000],
  [267.784, "tap", "BF", "right", "up", 0.000],
  [267.894, "tap", "Opp", "left", "right", 0.000],
  [267.894, "tap", "BF", "right", "down", 0.000],
  [268.005, "tap", "BF", "right", "left", 0.000],
  [268.005, "tap", "Opp", "left", "down", 0.000],
  [268.115, "tap", "Opp", "left", "right", 0.000],
  [268.115, "tap", "Opp", "right", "up", 0.000],
  [268.225, "tap", "Opp", "left", "left", 0.000],
  [268.225, "tap", "Opp", "right", "right", 0.000],
  [268.336, "sustain", "Opp", "left", "down", 0.189],
  [268.336, "tap", "Opp", "right", "left", 0.000],
  [268.446, "tap", "Opp", "right", "up", 0.000],
  [268.556, "tap", "Opp", "left", "up", 0.000],
  [268.556, "tap", "Opp", "right", "down", 0.000],
  [268.667, "tap", "Opp", "left", "right", 0.000],
  [268.667, "tap", "Opp", "right", "right", 0.000],
  [268.777, "tap", "Opp", "left", "down", 0.000],
  [268.777, "tap", "Opp", "right", "left", 0.000],
  [268.887, "tap", "Opp", "left", "left", 0.000],
  [268.887, "tap", "Opp", "right", "down", 0.000],
  [268.997, "sustain", "Opp", "left", "right", 0.189],
  [268.997, "tap", "Opp", "right", "right", 0.000],
  [269.108, "tap", "Opp", "right", "down", 0.000],
  [269.218, "tap", "Opp", "left", "down", 0.000],
  [269.218, "tap", "Opp", "right", "up", 0.000],
  [269.328, "tap", "Opp", "left", "up", 0.000],
  [269.328, "tap", "Opp", "right", "left", 0.000],
  [269.439, "tap", "Opp", "left", "left", 0.000],
  [269.439, "tap", "Opp", "right", "down", 0.000],
  [269.549, "tap", "Opp", "left", "up", 0.000],
  [269.549, "tap", "Opp", "right", "right", 0.000],
  [269.659, "tap", "Opp", "left", "right", 0.000],
  [269.659, "tap", "Opp", "right", "up", 0.000],
  [269.769, "tap", "Opp", "left", "down", 0.000],
  [269.769, "tap", "Opp", "right", "down", 0.000],
  [269.880, "tap", "Opp", "left", "up", 0.000],
  [269.880, "tap", "BF", "right", "up", 0.000],
  [269.990, "tap", "Opp", "left", "left", 0.000],
  [269.990, "tap", "Opp", "right", "right", 0.000],
  [270.100, "sustain", "Opp", "left", "right", 0.189],
  [270.100, "tap", "Opp", "right", "down", 0.000],
  [270.211, "tap", "BF", "right", "left", 0.000],
  [270.321, "tap", "Opp", "left", "down", 0.000],
  [270.321, "tap", "Opp", "right", "right", 0.000],
  [270.431, "sustain", "Opp", "left", "up", 0.189],
  [270.431, "tap", "Opp", "right", "down", 0.000],
  [270.542, "tap", "BF", "right", "up", 0.000],
  [270.652, "tap", "Opp", "left", "left", 0.000],
  [270.652, "tap", "Opp", "right", "left", 0.000],
  [270.762, "sustain", "Opp", "left", "down", 0.189],
  [270.762, "tap", "Opp", "right", "right", 0.000],
  [270.872, "tap", "Opp", "right", "up", 0.000],
  [270.983, "tap", "Opp", "left", "up", 0.000],
  [270.983, "tap", "Opp", "right", "down", 0.000],
  [271.093, "tap", "Opp", "left", "right", 0.000],
  [271.093, "tap", "Opp", "right", "up", 0.000],
  [271.203, "tap", "Opp", "left", "left", 0.000],
  [271.203, "tap", "Opp", "right", "left", 0.000],
  [271.314, "tap", "Opp", "left", "up", 0.000],
  [271.314, "tap", "Opp", "right", "right", 0.000],
  [271.424, "tap", "Opp", "left", "down", 0.000],
  [271.424, "tap", "Opp", "right", "left", 0.000],
  [271.534, "tap", "Opp", "left", "right", 0.000],
  [271.534, "tap", "Opp", "right", "down", 0.000],
  [271.644, "tap", "Opp", "left", "up", 0.000],
  [271.644, "tap", "Opp", "right", "up", 0.000],
  [271.755, "tap", "Opp", "left", "left", 0.000],
  [271.865, "tap", "Opp", "left", "up", 0.000],
  [271.865, "tap", "Opp", "right", "right", 0.000],
  [271.975, "tap", "Opp", "left", "down", 0.000],
  [271.975, "tap", "Opp", "right", "left", 0.000],
  [272.086, "tap", "Opp", "left", "right", 0.000],
  [272.086, "tap", "Opp", "right", "up", 0.000],
  [272.196, "tap", "Opp", "left", "up", 0.000],
  [272.196, "tap", "Opp", "right", "down", 0.000],
  [272.306, "tap", "Opp", "left", "left", 0.000],
  [272.306, "tap", "Opp", "right", "right", 0.000],
  [272.417, "tap", "Opp", "left", "right", 0.000],
  [272.417, "tap", "Opp", "right", "down", 0.000],
  [272.527, "tap", "Opp", "left", "down", 0.000],
  [272.527, "tap", "Opp", "right", "up", 0.000],
  [272.637, "tap", "Opp", "left", "right", 0.000],
  [272.637, "tap", "Opp", "right", "left", 0.000],
  [272.747, "tap", "Opp", "left", "left", 0.000],
  [272.747, "tap", "Opp", "right", "up", 0.000],
  [272.858, "tap", "Opp", "left", "right", 0.000],
  [272.858, "tap", "Opp", "right", "down", 0.000],
  [272.968, "tap", "Opp", "left", "up", 0.000],
  [272.968, "tap", "Opp", "right", "up", 0.000],
  [273.078, "tap", "Opp", "left", "down", 0.000],
  [273.078, "tap", "Opp", "right", "right", 0.000],
  [273.189, "tap", "Opp", "left", "left", 0.000],
  [273.189, "tap", "Opp", "right", "left", 0.000],
  [273.299, "tap", "Opp", "left", "up", 0.000],
  [273.299, "tap", "Opp", "right", "up", 0.000],
  [273.409, "sustain", "Opp", "left", "right", 3.088],
  [273.409, "sustain", "Opp", "right", "right", 2.096]],
    i={
      BFLeft:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/f/f3/BFLeft.gif/revision/latest?cb=20251201091327',
      BFRight:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/1/1b/BFRight.gif/revision/latest?cb=20251201091420',
      BFUp:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/0/0d/BFUp.gif/revision/latest?cb=20251201091545',
      BFDown:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/5/5c/BFDown.gif/revision/latest?cb=20251201091607',
      BFIdle:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/4/4f/BFIdle.gif/revision/latest?cb=20251201090512',
      BFLeftMiss:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/c/c9/BoyfriendLeftMiss.gif/revision/latest?cb=20251201123026',
      BFRightMiss:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/a/ac/BoyfriendRightMiss.gif/revision/latest?cb=20251201123110',
      BFUpMiss:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/7/7e/BoyfriendUpMiss.gif/revision/latest?cb=20251201122939',
      BFDownMiss:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/3/3d/BoyfriendDownMiss.gif/revision/latest?cb=20251201122957',
      SonicObLeft:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/f/f6/SonicObLeft.gif/revision/latest?cb=20251201091833',
      SonicObRight:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/5/5f/SonicObRight.gif/revision/latest?cb=20251201091940',
      SonicObUp:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/e/e8/SonicObUp.gif/revision/latest?cb=20251201092048',
      SonicObDown:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/7/79/SonicObDown.gif/revision/latest?cb=20251201092148',
      SonicObIdle:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/f/fa/SonicObIdle.gif/revision/latest?cb=20251201090345',
      SonicObIntro:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/7/74/SonicObIntro.gif/revision/latest?cb=20251201095230&format=original',
      ObTransition:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/9/9c/ObTransition.gif/revision/latest?cb=20251201214653',
      SonicReveal:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/6/6a/SonicReveal.gif/revision/latest?cb=20251201215037',
      XIdle:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/f/f6/XIdle.gif/revision/latest?cb=20251201220226',
      XLeft:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/f/f9/XLeft.gif/revision/latest?cb=20251201220517',
      XRight:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/1/1a/XRight.gif/revision/latest?cb=20251201220557',
      XUp:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/e/e7/XUp.gif/revision/latest?cb=20251201220822',
      XDown:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/e/e9/XDown.gif/revision/latest?cb=20251201220654',
      // TRUE form assets (new)
      TrueIdle:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/4/4b/TrueIdle.gif/revision/latest?cb=20251201230346',
      TrueRight:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/a/aa/TrueRight.gif/revision/latest?cb=20251201230445',
      TrueLeft:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/5/5e/TrueLeft.gif/revision/latest?cb=20251201230514',
      TrueUp:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/f/fb/TrueUp.gif/revision/latest?cb=20251201230609',
      TrueDown:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/d/d9/TrueDown.gif/revision/latest?cb=20251201230715'
    },
    // keep originals so we can reset to Phase 1 later
    origSonic = {
      SonicObIdle: i.SonicObIdle,
      SonicObLeft: i.SonicObLeft,
      SonicObRight: i.SonicObRight,
      SonicObUp: i.SonicObUp,
      SonicObDown: i.SonicObDown,
      SonicObIntro: i.SonicObIntro,
      SonicReveal: i.SonicReveal
    },
    ni={DownNormal:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/b/b0/DownNormal.png/revision/latest?cb=20251201114118',UpNormal:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/c/cf/UpNormal.png/revision/latest?cb=20251201114156',RightNormal:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/9/96/RightNormal.png/revision/latest?cb=20251201114233',LeftNormal:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/1/11/LeftNormal.png/revision/latest?cb=20251201114234',UpNote:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/e/ea/UpNote.png/revision/latest?cb=20251201114342',DownNote:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/1/12/DownNote.png/revision/latest?cb=20251201114356',LeftNote:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/2/2d/LeftNote.png/revision/latest?cb=20251201114317',RightNote:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/1/1b/RightNote.png/revision/latest?cb=20251201114311',RightHit:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/8/8d/RightHit.png/revision/latest?cb=20251201114543',LeftHit:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/2/28/LeftHit.png/revision/latest?cb=20251201114603',UpHit:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/7/70/UpHit.png/revision/latest?cb=20251201114526',DownHit:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/2/2f/DownHit.png/revision/latest?cb=20251201114527'},
    hbi={bar:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/3/35/HealthBar.png/revision/latest?cb=20251201130759',bfFine:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/8/8a/BFFine.png/revision/latest?cb=20251201131420',bfStruggle:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/c/cd/BFStruggle.png/revision/latest?cb=20251201131440',sonicFine:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/1/1a/SonicFine.png/revision/latest?cb=20251201131458',sonicStruggle:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/6/6b/SonicStruggle.png/revision/latest?cb=20251201131524'},
    goa={death:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/2/25/BFGameOver.gif/revision/latest?cb=20251201133157',deathLoop:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/4/4b/BFDeadLoop.gif/revision/latest?cb=20251201133229',retry:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/0/09/BFRetry.gif/revision/latest?cb=20251201133309',deathSfx:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/c/c9/Fnf-bf-dead.mp3/revision/latest?cb=20251201133357&format=original',gameOverLoop:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/e/ee/Fnf-GameOver.mp3/revision/latest?cb=20251201133536&format=original',retrySfx:'https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/9/9f/RetryBF.mp3/revision/latest?cb=20251201134122&format=original'},
    sc=$('<div>',{'class':'obituary-sprites',css:{'margin-top':'20px','text-align':'center',position:'relative',height:'320px'}}),
    hbc=$('<div>',{'class':'health-bar-container',css:{position:'absolute',left:'50%',bottom:'35px',transform:'translateX(-50%)',width:'601px',height:'19px','z-index':'10'}}),
    hbb=$('<img>',{'class':'health-bar-bg',src:hbi.bar,css:{position:'absolute',width:'601px',height:'19px',left:'0px',top:'0px'}}),
    si=$('<img>',{id:'sonic-health-icon',src:hbi.sonicFine,css:{position:'absolute',left:'50%',top:'50%',transform:'translate(-100%, -50%)',height:'60px',width:'auto','z-index':'1'}}),
    bi=$('<img>',{id:'bf-health-icon',src:hbi.bfFine,css:{position:'absolute',left:'50%',top:'50%',transform:'translate(0%, -50%)',height:'60px',width:'auto','z-index':'2'}});

    hbc.append(hbb).append(si).append(bi);
    var ch=50,igo=false,gola=null,
    onc=$('<div>',{'class':'opp-notes',css:{position:'absolute',left:'50%',top:'0px',transform:'translateX(-350px)',display:'flex',gap:'10px','z-index':'5'}}),
    bnc=$('<div>',{'class':'bf-notes',css:{position:'absolute',left:'50%',top:'0px',transform:'translateX(50px)',display:'flex',gap:'10px','z-index':'5'}}),
    no=['left','down','up','right'];

    no.forEach(function(d){
      var dc=d.charAt(0).toUpperCase()+d.slice(1),
      or=$('<div>',{'class':'note-receptor opp-'+d,css:{position:'relative',width:'60px',height:'60px'}}),
      on=$('<img>',{'class':'note-normal',src:ni[dc+'Normal'],css:{position:'absolute',width:'60px',height:'60px',left:'0px',top:'0px','z-index':'1'}});

      or.append(on);
      onc.append(or);

      var br=$('<div>',{'class':'note-receptor bf-'+d,css:{position:'relative',width:'60px',height:'60px'}}),
      bn=$('<img>',{'class':'note-normal',src:ni[dc+'Normal'],css:{position:'absolute',width:'60px',height:'60px',left:'0px',top:'0px','z-index':'1'}});

      br.append(bn);
      bnc.append(br)
    });

    // sonic container with fixed size to prevent GIFs from changing displayed size in later forms
    var ssWrap = $('<div>',{id:'sonic-wrap',css:{position:'absolute',left:'10%',top:'50px',width:'200px',height:'200px','z-index':'3',overflow:'hidden',display:'flex','align-items':'center','justify-content':'center'}});
    var ssImg = $('<img>',{id:'sonic-sprite',src:i.SonicObIdle,alt:'Sonic Obituary',css:{width:'100%',height:'100%','object-fit':'contain',display:'block'}});
    ssWrap.append(ssImg);

    var bs=$('<img>',{id:'bf-sprite',src:i.BFIdle,alt:'Boyfriend',css:{position:'absolute',right:'15%',top:'110px',width:'150px',height:'150px','object-fit':'contain','z-index':'3'}});

    // make the BF sprite visually tappable
    bs.css('cursor','pointer');

    sc.append(hbc).append(onc).append(bnc).append(ssWrap).append(bs);
    $('#mw-content-text').append(sc);

    var ae=$('audio')[0];
    if(ae){
      var at=[],ai=[],ubn=[],ms=new Audio('https://static.wikia.nocookie.net/the-unofficial-outcome-memories/images/f/fa/Fnf-bf-miss.mp3/revision/latest?cb=20251201122538&format=original'),hw=0.15,mcd=0.2;

      // --- timings & special times
      var SPECIAL_TIME = 84.55; // earlier special event anchor (unchanged)
      var CUTSCENE_EARLY = 0.5; // earlier special event shift (unchanged)
      var REVEAL_TO_BLACK_EARLY = 0.2; // earlier reveal->black
      var overlayDuration = 7000; // ms for that special overlay
      var revealDuration = Math.max(200, 1500 - (REVEAL_TO_BLACK_EARLY * 1000)); // special reveal -> black gap

      // NEW: True-form event times
      var TRUE_CUT_TIME = 2*60 + 44; // 2:44 -> 164 seconds
      var TRUE_FADE_START = 2*60 + 47; // 2:47 -> 167 seconds
      var TRUE_FADE_END = 2*60 + 58; // 2:58 -> 178 seconds
      var TRUE_FADE_DURATION_MS = Math.max(0, (TRUE_FADE_END - TRUE_FADE_START) * 1000); // 11000 ms

      var phase2Started = false;
      var trueFormStarted = false;

      function resetToPhase1(){
        // restore sonic assets to originals (phase 1)
        i.SonicObIdle = origSonic.SonicObIdle;
        i.SonicObLeft = origSonic.SonicObLeft;
        i.SonicObRight = origSonic.SonicObRight;
        i.SonicObUp = origSonic.SonicObUp;
        i.SonicObDown = origSonic.SonicObDown;
        i.SonicObIntro = origSonic.SonicObIntro;
        i.SonicReveal = origSonic.SonicReveal;
        phase2Started = false;
        trueFormStarted = false;
        // ensure sonic-sprite shows the phase1 idle immediately
        try { $('#sonic-sprite').attr('src', i.SonicObIdle); } catch(e){}
        // remove any black overlays left over
        try{ $('#true-black-screen').remove(); }catch(e){}
      }

      function startPhase2(){
        if(phase2Started) return;
        phase2Started = true;
        // Replace SonicOb sprites with X variants so subsequent Opp animations use X
        i.SonicObIdle = i.XIdle;
        i.SonicObLeft = i.XLeft;
        i.SonicObRight = i.XRight;
        i.SonicObUp = i.XUp;
        i.SonicObDown = i.XDown;
        // Immediately set sonic-sprite to X idle (kept inside fixed container)
        try { $('#sonic-sprite').attr('src', i.SonicObIdle + '?' + new Date().getTime()); } catch(e){}
      }

      function startTrueForm(){
        if(trueFormStarted) return;
        trueFormStarted = true;
        // swap to True form assets
        i.SonicObIdle = i.TrueIdle;
        i.SonicObLeft = i.TrueLeft;
        i.SonicObRight = i.TrueRight;
        i.SonicObUp = i.TrueUp;
        i.SonicObDown = i.TrueDown;
        // set sonic-sprite to True idle (inside fixed container, prevents size jump)
        try { $('#sonic-sprite').attr('src', i.SonicObIdle + '?' + new Date().getTime()); } catch(e){}
      }

      // --- special sequence from before (keeps unchanged behavior)
      function startSpecialSequence(){
        if(igo) return;
        var $overlay = $('<div id="ob-transition-overlay">').css({
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'z-index': 999999,
          background: 'transparent'
        });
        var $img = $('<img>').attr('src', i.ObTransition + '?' + new Date().getTime()).css({
          width: '100%',
          height: '100%',
          'object-fit': 'cover'
        });
        $overlay.append($img);
        $('body').append($overlay);

        var t1 = setTimeout(function(){
          try{$overlay.remove();}catch(e){}
          try { $('#sonic-sprite').attr('src', i.SonicReveal + '?' + new Date().getTime()); } catch(e){}
          var t2 = setTimeout(function(){
            // start phase2 immediately as black appears (so the swap happens while screen is black)
            startPhase2();
            var $black = $('<div id="ob-black-screen">').css({
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center',
              'z-index': 1000000,
              background: '#000'
            });
            var $text = $('<div>').text('Do you want to play with me?').css({
              color: '#fff',
              'font-family': 'Arial, Helvetica, sans-serif',
              'font-size': '48px',
              'text-align': 'center',
              padding: '20px'
            });
            $black.append($text);
            $('body').append($black);
            var t3 = setTimeout(function(){ try{$black.remove();}catch(e){} }, 4000);
            at.push(t3);
          }, revealDuration);
          at.push(t2);
        }, overlayDuration);
        at.push(t1);
      }

      // --- TRUE FORM sequence: cut to black at TRUE_CUT_TIME, fade-out starting at TRUE_FADE_START -> TRUE_FADE_END
      function scheduleTrueFormCutAndFade(){
        // remove any existing true overlay first
        try{ $('#true-black-screen').remove(); }catch(e){}
        // create black overlay (start fully opaque)
        var $trueBlack = $('<div id="true-black-screen">').css({
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'z-index': 1000001,
          background: '#000',
          opacity: '1'
        });
        $('body').append($trueBlack);

        // Immediately swap to true form while black is showing
        startTrueForm();

        // schedule fade start: at TRUE_FADE_START we begin opacity transition to 0 over TRUE_FADE_DURATION_MS
        var fadeStartDelay = Math.max(0, (TRUE_FADE_START - TRUE_CUT_TIME) * 1000); // typically 3000ms since cut->fadeStart difference
        // but here we call this function at CUT time, so schedule fade after (TRUE_FADE_START - TRUE_CUT_TIME)
        var fadeStartTimer = setTimeout(function(){
          try{
            // set CSS transition then change opacity to 0
            $trueBlack.css({
              'transition': 'opacity ' + (TRUE_FADE_DURATION_MS/1000) + 's linear',
              '-webkit-transition': 'opacity ' + (TRUE_FADE_DURATION_MS/1000) + 's linear'
            });
            // trigger reflow then set opacity 0
            $trueBlack[0].offsetHeight;
            $trueBlack.css('opacity','0');

            // remove overlay at end of fade
            var removeTimer = setTimeout(function(){
              try{$trueBlack.remove();}catch(e){}
            }, TRUE_FADE_DURATION_MS + 50);
            at.push(removeTimer);
          }catch(e){}
        }, fadeStartDelay);
        at.push(fadeStartTimer);
      }

      // game-over and other helpers (existing)
      function tgo(){
        if(igo)return;
        igo=true;
        ae.pause();
        at.forEach(clearTimeout);
        ai.forEach(clearInterval);
        at=[];
        ai=[];
        $('.incoming-note').remove();
        if(window.bfIdleTimeout){clearTimeout(window.bfIdleTimeout);window.bfIdleTimeout=null}
        if(window.oppIdleTimeout){clearTimeout(window.oppIdleTimeout);window.oppIdleTimeout=null}
        window._retryAllowed=true;
        window._gameOverBlockPlayHandler=function(){try{ae.pause()}catch(e){}};
        ae.addEventListener('play',window._gameOverBlockPlayHandler);
        try{ae.controls=false}catch(e){}
        var bfs=$('#bf-sprite');
        bfs.attr('src','');
        setTimeout(function(){bfs.attr('src',goa.death)},10);
        var ds=new Audio(goa.deathSfx);
        ds.play();
        var quickDeathToLoop=1100;
        setTimeout(function(){bfs.attr('src','');setTimeout(function(){bfs.attr('src',goa.deathLoop);gola=new Audio(goa.gameOverLoop);gola.loop=true;gola.play()},10)},quickDeathToLoop)
      }

      function rg(){
        if(!igo)return;
        if(!window._retryAllowed)return;
        window._retryAllowed=false;
        if(gola){gola.pause();gola=null}
        var bfs=$('#bf-sprite');
        bfs.attr('src','');
        setTimeout(function(){bfs.attr('src',goa.retry)},10);
        var rs=new Audio(goa.retrySfx);rs.play();
        var retryResetDelay=1500;
        setTimeout(function(){
          if(window._gameOverBlockPlayHandler){try{ae.removeEventListener('play',window._gameOverBlockPlayHandler)}catch(e){}window._gameOverBlockPlayHandler=null}
          try{ae.controls=true}catch(e){}
          igo=false;ch=50;uhb(0);bfs.attr('src','');setTimeout(function(){bfs.attr('src',i.BFIdle)},10);ae.currentTime=0;ae.play()
        },retryResetDelay)
      }

      function uhb(a){
        ch+=a;
        ch=Math.max(0,Math.min(100,ch));
        if(ch<=0&&!igo){
          tgo();
          return
        }
        var p=601-(ch/100*601);
        $('#bf-health-icon').css('left',p+'px').css('transform','translate(0%, -50%)');
        $('#sonic-health-icon').css('left',p+'px').css('transform','translate(-100%, -50%)');
        ch<30?$('#bf-health-icon').attr('src',hbi.bfStruggle):$('#bf-health-icon').attr('src',hbi.bfFine);
        ch>70?$('#sonic-health-icon').attr('src',hbi.sonicStruggle):$('#sonic-health-icon').attr('src',hbi.sonicFine)
      }

      n.forEach(function(nt){if(nt[2]==='BF')ubn.push({time:nt[0],direction:nt[4],type:nt[1],sustain:nt[5],hit:false,missChecked:false})});

      // keyboard mapping preserved: WASD, IJKL, arrows
      var km={'w':'up','a':'left','s':'down','d':'right','i':'up','j':'left','k':'down','l':'right','arrowup':'up','arrowdown':'down','arrowleft':'left','arrowright':'right'};

      function handleBFInput(d){
        if(!ae||ae.paused||igo)return;
        var ct=ae.currentTime,hn=false;
        for(var j=0;j<ubn.length;j++){
          var nt=ubn[j],td=Math.abs(ct-nt.time);
          if(!nt.hit&&nt.direction===d&&td<=hw){
            nt.hit=true;
            hn=true;
            var dur=nt.type==='tap'?0.5:nt.sustain;
            csm('BF',d,dur,false);
            uhb(2);
            break
          }
        }
        if(!hn){csm('BF',d,0.5,true);ms.currentTime=0;ms.play();uhb(-1)}
      }

      $(document).on('keydown',function(e){
        // guard: ignore while typing in inputs
        try{
          var aeEl = document.activeElement;
          var tag = aeEl && aeEl.tagName && aeEl.tagName.toLowerCase();
          if(tag === 'input' || tag === 'textarea' || (aeEl && aeEl.isContentEditable)) return;
        }catch(err){}

        var k = '';
        if(typeof e.key === 'string' && e.key.length > 0){
          k = e.key.toLowerCase();
        }
        if(!k && typeof e.code === 'string'){
          if(e.code.indexOf('Key') === 0 && e.code.length === 4){
            k = e.code.slice(3).toLowerCase();
          } else if(e.code.indexOf('Arrow') === 0){
            k = e.code.toLowerCase();
          }
        }
        if(!k || k === '\u0000'){
          var kc = e.which || e.keyCode;
          switch(kc){
            case 13: k = 'enter'; break;
            case 87: k = 'w'; break;
            case 65: k = 'a'; break;
            case 83: k = 's'; break;
            case 68: k = 'd'; break;
            case 73: k = 'i'; break;
            case 74: k = 'j'; break;
            case 75: k = 'k'; break;
            case 76: k = 'l'; break;
            case 38: k = 'arrowup'; break;
            case 40: k = 'arrowdown'; break;
            case 37: k = 'arrowleft'; break;
            case 39: k = 'arrowright'; break;
            default:
              try{ k = String.fromCharCode(kc).toLowerCase(); }catch(e){ k = ''; }
          }
        }

        if(k === 'enter' && igo){ rg(); return; }
        if(!km[k]||!ae||ae.paused||igo) return;
        var d = km[k];
        handleBFInput(d);
      });

      $(document).on('pointerdown','.bf-notes .note-receptor',function(e){e.preventDefault();if(!ae||ae.paused||igo)return;var cls=(this.className||'').split(/\s+/),dir=null;for(var i2=0;i2<cls.length;i2++){var c=cls[i2];if(c.indexOf('bf-')===0){dir=c.slice(3);break}}if(dir)handleBFInput(dir)});
      $(document).on('pointerdown pointerup','.bf-notes .note-receptor',function(e){if(e.type==='pointerdown')$(this).addClass('pressed');else $(this).removeClass('pressed')});

      // allow tapping the BF sprite itself to trigger a retry when in the game-over / retry state
      $(document).on('pointerdown', '#bf-sprite', function(e){
        e.preventDefault();
        // safety checks like in other handlers
        if(!ae) return;
        // If we're in game-over (igo) and retry is allowed, perform retry
        if(igo && window._retryAllowed){
          rg();
        }
      });

      function cs(c,nt,dur){
        var sid=c==='BF'?'#bf-sprite':'#sonic-sprite',pre=c==='BF'?'BF':'SonicOb',nc=nt.charAt(0).toUpperCase()+nt.slice(1),inn=pre+nc;
        $(sid).attr('src',i[inn]);
        hn2(c,nt);
        if(c==='BF'&&window.bfIdleTimeout)clearTimeout(window.bfIdleTimeout);
        if(c==='Opp'&&window.oppIdleTimeout)clearTimeout(window.oppIdleTimeout);
        var to=setTimeout(function(){$(sid).attr('src',i[pre+'Idle'])},dur*1000);
        if(c==='BF')window.bfIdleTimeout=to;else window.oppIdleTimeout=to;
        at.push(to)
      }

      function csm(c,nt,dur,im){
        var sid='#bf-sprite',pre='BF',nc=nt.charAt(0).toUpperCase()+nt.slice(1),inn=im?pre+nc+'Miss':pre+nc;
        $(sid).attr('src',i[inn]);
        if(!im)hn2(c,nt);
        if(window.bfIdleTimeout)clearTimeout(window.bfIdleTimeout);
        window.bfIdleTimeout=setTimeout(function(){$(sid).attr('src',i[pre+'Idle'])},dur*1000)
      }

      function hn2(c,d){
        var cp=c==='BF'?'bf':'opp',r=$('.note-receptor.'+cp+'-'+d),dc=d.charAt(0).toUpperCase()+d.slice(1),hi=$('<img>',{'class':'note-hit',src:ni[dc+'Hit'],css:{position:'absolute',width:'60px',height:'60px',left:'0px',top:'0px','z-index':'2'}});
        r.append(hi);
        setTimeout(function(){hi.remove()},500)
      }

      function sn(c,d,t){
        var cp=c==='BF'?'bf':'opp',r=$('.note-receptor.'+cp+'-'+d),dc=d.charAt(0).toUpperCase()+d.slice(1),nn=r.find('.note-normal'),inn=$('<img>',{'class':'incoming-note',src:ni[dc+'Note'],css:{position:'absolute',width:'60px',height:'60px',top:'500px',left:nn.css('left'),right:nn.css('right'),'margin-left':nn.css('margin-left'),'margin-right':nn.css('margin-right'),'z-index':'0'}});
        r.append(inn);
        var st=Date.now(),dur=1000,aint=setInterval(function(){var el=Date.now()-st,pr=el/dur;if(pr>=1){inn.remove();clearInterval(aint)}else{var ct=500-(500*pr);inn.css('top',ct+'px')}},16);
        ai.push(aint)
      }

      // when playback starts we schedule all timed things (including our special event)
      ae.addEventListener('play',function(){
        if(igo)return;
        var st=ae.currentTime;

        // If playback restarts near the start, reset to Phase 1 assets
        if(st < 0.15){
          resetToPhase1();
        }

        ubn.forEach(function(nt){nt.hit=false;nt.missChecked=false});
        ch=50;uhb(0);
        if(st<0.15){$('#sonic-sprite').attr('src',i.SonicObIntro+'?'+new Date().getTime());setTimeout(function(){$('#sonic-sprite').attr('src',i.SonicObIdle)},9680)}else{$('#sonic-sprite').attr('src',i.SonicObIdle)}

        // schedule notes & opponent actions (existing)
        n.forEach(function(nt){
          var tun=(nt[0]-st)*1000,tus=tun-1000;
          if(tus>0){
            var sto=setTimeout(function(){sn(nt[2],nt[4],nt[0])},tus);
            at.push(sto)
          }
          if(tun>0){
            var to=setTimeout(function(){if(nt[2]==='Opp'){var dur=nt[1]==='tap'?0.5:nt[5];cs(nt[2],nt[4],dur)}},tun);
            at.push(to);
            if(nt[2]==='BF'){
              var mct=tun+(mcd*1000),mto=setTimeout(function(){var bn=ubn.find(function(n2){return n2.time===nt[0]&&n2.direction===nt[4]});if(bn&&!bn.hit&&!bn.missChecked){bn.missChecked=true;csm('BF',nt[4],0.5,true);ms.currentTime=0;ms.play();uhb(-3)}},mct);
              at.push(mto)
            }
          }
        });

        // --- schedule the earlier special overlay/reveal sequence at SPECIAL_TIME - CUTSCENE_EARLY
        var scheduledStart = SPECIAL_TIME - CUTSCENE_EARLY; // start earlier by 0.5s
        var tunSpecial = (scheduledStart - st) * 1000;
        if(tunSpecial > 0){
          var specialTimeout = setTimeout(function(){ startSpecialSequence(); }, tunSpecial);
          at.push(specialTimeout);
        } else {
          if(st >= scheduledStart && st < SPECIAL_TIME + 3){
            var immediateSpecial = setTimeout(function(){ startSpecialSequence(); }, 50);
            at.push(immediateSpecial);
          }
        }

        // --- schedule TRUE CUT & FADE: cut at TRUE_CUT_TIME, fade start at TRUE_FADE_START -> TRUE_FADE_END
        var scheduledTrueCut = TRUE_CUT_TIME;
        var tunTrue = (scheduledTrueCut - st) * 1000;
        if(tunTrue > 0){
          var trueTimeout = setTimeout(function(){
            // cut to black immediately and start True form swap + schedule fade-out from TRUE_FADE_START
            scheduleTrueFormCutAndFade();
          }, tunTrue);
          at.push(trueTimeout);
        } else {
          // If playback already past cut point but before fade end, trigger now if still reasonable
          if(st >= scheduledTrueCut && st < TRUE_FADE_END + 1){
            var immediateTrue = setTimeout(function(){ scheduleTrueFormCutAndFade(); }, 50);
            at.push(immediateTrue);
          }
        }
      });

      ae.addEventListener('pause',function(){
        if(igo)return;
        at.forEach(clearTimeout);
        ai.forEach(clearInterval);
        at=[];
        ai=[];
        $('.incoming-note').remove();
        // cleanup overlays
        try{ $('#ob-transition-overlay').remove(); }catch(e){}
        try{ $('#ob-black-screen').remove(); }catch(e){}
        try{ $('#true-black-screen').remove(); }catch(e){}
        if(ae.currentTime<0.15){$('#sonic-sprite').attr('src',i.SonicObIntro+'?'+new Date().getTime())}else{$('#sonic-sprite').attr('src',i.SonicObIdle)}
        $('#bf-sprite').attr('src',i.BFIdle)
      });

      ae.addEventListener('ended',function(){
        at.forEach(clearTimeout);
        ai.forEach(clearInterval);
        at=[];
        ai=[];
        $('.incoming-note').remove();
        try{ $('#ob-transition-overlay').remove(); }catch(e){}
        try{ $('#ob-black-screen').remove(); }catch(e){}
        try{ $('#true-black-screen').remove(); }catch(e){}
        $('#sonic-sprite').attr('src',i.SonicObIdle);
        $('#bf-sprite').attr('src',i.BFIdle)
      })
    }
  }
});