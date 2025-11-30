// common.js — NoMoreGamesOld lyric sync + flash & yellow-gradient effect
$(document).ready(function() {
    // Load Merriweather
    $('head').append('<link href="https://fonts.googleapis.com/css2?family=Merriweather&display=swap" rel="stylesheet">');

    // Internal audio (in case page plays programmatically)
    var nmAudio = new Audio();
    nmAudio.src = '/wiki/Special:FilePath/NoMoreGamesOld.mp3';

    // Container + displays
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
            color: '#000',                      // start plain black
            fontWeight: '400',
            whiteSpace: 'pre-wrap',
            pointerEvents: 'none',
            textShadow: '0 1px 0 rgba(0,0,0,0.05)'
        })
        .html('');

    lyricContainer.append(lyricDisplay);
    $('body').append(lyricContainer);

    // Raw lyric block you provided — kept verbatim for precise parsing
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
[00:54.63]Well pal here’s
[00:55.26]Well pal here’s some
[00:55.97]Well pal here’s some karma!
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
[01:25.94]you won’t
[01:26.24]you won’t hold
[01:26.49]you won’t hold me
[01:26.86]you won’t hold me back
[01:27.19]you won’t hold me back down!
[01:28.22]Such
[01:28.41]Such shackles
[01:28.97]Such shackles for
[01:29.30]Such shackles for the
[01:29.64]Such shackles for the WEAK.
[01:30.33]I’ll
[01:30.99]I’ll break
[01:31.60]I’ll break free
[01:32.08]I’ll break free from
[01:32.82]I’ll break free from these
[01:33.50]I’ll break free from these chains!
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
[02:17.18]I’ll
[02:17.74]I’ll make
[02:19.53]I’ll make you
[02:20.18]I’ll make you pay
[02:21.98]I’ll make you pay for
[02:22.70]I’ll make you pay for the
[02:24.49]I’ll make you pay for the souls
[02:24.97]I’ll make you pay for the souls you
[02:25.47]I’ll make you pay for the souls you toyed
[02:26.10]I’ll make you pay for the souls you toyed with,
[02:26.93]I’ll make you pay for the souls you toyed with, you
[02:27.58]I’ll make you pay for the souls you toyed with, you fake!
[02:29.36]My
[02:30.08]My face,
[02:31.79]that
[02:32.48]that part
[02:34.24]that part that
[02:34.89]that part that you’ve
[02:35.40]that part that you’ve taken
[02:36.69]that part that you’ve taken from
[02:37.40]that part that you’ve taken from me!
    `;

    // Parse the raw text into {time(ms), text} entries
    function parseRawToArray(rawText) {
        var re = /\[(\d{2}):(\d{2}\.\d{2})\](.*)/g;
        var m;
        var arr = [];
        while ((m = re.exec(rawText)) !== null) {
            var mm = parseInt(m[1], 10);
            var ss = parseFloat(m[2]); // seconds with fraction
            var txt = m[3].trim();
            var ms = mm * 60000 + Math.round(ss * 1000);
            arr.push({ time: ms, text: txt });
        }
        // sort by time to be robust to ordering issues
        arr.sort(function(a, b){ return a.time - b.time; });
        return arr;
    }

    var nomoreLyrics = parseRawToArray(raw);

    // Flash + gradient trigger time (00:33.28 => 33280 ms)
    var flashTriggerMs = 33280;
    var flashTriggered = false;

    var currentIndex = -1;
    var intervalId = null;
    var activeAudio = null;

    function reset() {
        lyricDisplay.html('');
        lyricDisplay.css({
            color: '#000',
            background: 'none',
            '-webkit-background-clip': '',
            '-webkit-text-fill-color': ''
        });
        currentIndex = -1;
        flashTriggered = false;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    function applyYellowGradientStyle() {
        // yellow gradient (gold -> orange)
        lyricDisplay.css({
            background: 'linear-gradient(#ffd700, #ff8c00)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            'background-clip': 'text',
            color: 'transparent'
        });
    }

    function doWhiteFlash() {
        // Quick white flash overlay
        var overlay = $('<div>')
            .attr('id', 'nomore-flash-overlay')
            .css({
                position: 'fixed',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                background: '#fff',
                opacity: 0,
                zIndex: 10000,
                pointerEvents: 'none'
            })
            .appendTo('body');

        // animate in/out quickly
        overlay.animate({ opacity: 1 }, 80, function() {
            overlay.animate({ opacity: 0 }, 200, function() {
                overlay.remove();
            });
        });
    }

    function updateLyricForTime(currentTime) {
        var tms = Math.round(currentTime * 1000);
        // trigger flash exactly once when we pass the trigger time
        if (!flashTriggered && tms >= flashTriggerMs) {
            flashTriggered = true;
            // white flash + switch to yellow gradient
            doWhiteFlash();
            applyYellowGradientStyle();
        }

        // find latest lyric index <= tms
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
        activeAudio = aud;
        reset();
        intervalId = setInterval(function() {
            if (!aud || aud.paused || aud.ended) {
                reset();
                activeAudio = null;
                return;
            }
            updateLyricForTime(aud.currentTime);
        }, 50);
    }

    function isNoMoreAudio(aud) {
        var src = (aud && (aud.currentSrc || aud.src || aud.baseURI || '') + '').toString();
        return src && src.indexOf('NoMoreGamesOld.mp3') !== -1;
    }

    // auto-detect any <audio> element playing the file
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

    // also hook the internal audio object in case scripts use it
    nmAudio.addEventListener('play', function() { if (isNoMoreAudio(nmAudio)) startMonitoringAudio(nmAudio); });
    nmAudio.addEventListener('pause', function() { if (activeAudio === nmAudio) reset(); });
    nmAudio.addEventListener('ended', function() { if (activeAudio === nmAudio) reset(); });

    // append container (already appended above) — done
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