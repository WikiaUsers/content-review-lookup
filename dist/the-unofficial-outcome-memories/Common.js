// weather thing 
(function() {
    'use strict';
    
    if (mw.config.get('wgTitle') !== 'BeyondPaper', 'Bluester462' || mw.config.get('wgCanonicalNamespace') !== 'User') {
        return;
    }
    
    const API_PARTS = [
        atob('aHR0cHM6Ly9hcGkub3Blbi1tZXRlby5jb20vdjEvZm9yZWNhc3Q/bGF0aXR1ZGU9'),
        atob('NTIuNjAyNDcwNA=='),
        atob('JmxvbmdpdHVkZT0='),
        atob('LTEuMTIwNjY1Ng=='),
        atob('JmhvdXJseT1yYWluLHRlbXBlcmF0dXJlXzJtLHNub3dmYWxsLHNob3dlcnMsYXBwYXJlbnRfdGVtcGVyYXR1cmUsaXNfZGF5'),
        atob('JnRpbWV6b25lPUdNVCZmb3JlY2FzdF9kYXlzPTE=')
    ];
    const API_URL = API_PARTS.join('');
    const MY_TIMEZONE = 'Europe/London';
    
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createWidget);
        } else {
            createWidget();
        }
    }
    
    function createWidget() {
        const widget = document.createElement('div');
        widget.id = 'status-widget';
        updateWidgetTheme(widget);
        
        const contentArea = document.querySelector('#mw-content-text') || 
                           document.querySelector('.page__main') ||
                           document.querySelector('.page-content');
        
        if (contentArea) {
            contentArea.appendChild(widget);
            updateWidget();
            setInterval(updateWidget, 60000);
        }
    }
    
    function updateWidgetTheme(widget, isDay) {
        if (isDay === undefined) {
            const hour = new Date().getHours();
            isDay = hour >= 6 && hour < 20;
        }
        
        if (isDay) {
            widget.style.cssText = `
                background: #f9f9f9;
                border: 1px solid #c5c5c5;
                border-radius: 2px;
                padding: 12px 14px;
                margin: 16px 0;
                font-family: Rubik, Helvetica, Arial, sans-serif;
                font-size: 12px;
                color: #3a3a3a;
                line-height: 1.5;
            `;
        } else {
            widget.style.cssText = `
                background: #1a1a1a;
                border: 1px solid #3a3a3a;
                border-radius: 2px;
                padding: 12px 14px;
                margin: 16px 0;
                font-family: Rubik, Helvetica, Arial, sans-serif;
                font-size: 12px;
                color: #e0e0e0;
                line-height: 1.5;
            `;
        }
    }
    
    function getTimeInfo() {
        const myTime = new Date().toLocaleTimeString('en-GB', {
            timeZone: MY_TIMEZONE,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
        
        const visitorTime = new Date().toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
        
        return { myTime, visitorTime };
    }
    
    function getCurrentWeather(data) {
        const now = new Date();
        const currentHour = now.getHours();
        
        return {
            temp: data.hourly.temperature_2m[currentHour],
            rain: data.hourly.rain[currentHour],
            snowfall: data.hourly.snowfall[currentHour],
            showers: data.hourly.showers[currentHour],
            isDay: data.hourly.is_day[currentHour],
            tempUnit: data.hourly_units.temperature_2m
        };
    }
    
    function getWeatherStatement(weather) {
        const statements = [];
        
        if (weather.isDay) {
            statements.push("☀️ It's daytime here");
        } else {
            statements.push("🌙 It's nighttime here");
        }
        
        if (weather.snowfall > 0) {
            statements.push("❄️ It's snowing");
        } else if (weather.rain > 1.0) {
            statements.push("🌧️ It's raining heavily");
        } else if (weather.rain > 0.3) {
            statements.push("🌦️ It's raining");
        } else if (weather.showers > 0) {
            statements.push("🌦️ There are showers");
        } else {
            statements.push("✨ It's clear outside");
        }
        
        statements.push(`🌡️ ${weather.temp}${weather.tempUnit}`);
        
        return statements;
    }
    
    function displayWidget(weatherData) {
        const widget = document.getElementById('status-widget');
        if (!widget) return;
        
        const times = getTimeInfo();
        const weather = getCurrentWeather(weatherData);
        const statements = getWeatherStatement(weather);
        const hour = new Date().getHours();
        const isDay = hour >= 6 && hour < 20;
        
        updateWidgetTheme(widget, isDay);
        
        const timeStatement = times.myTime === times.visitorTime 
            ? `For me, it's currently <strong>${times.myTime}</strong>`
            : `For me, it's currently <strong>${times.myTime}</strong>, but for you, it's <strong>${times.visitorTime}</strong>`;
        
        const textColor = isDay ? '#3a3a3a' : '#e0e0e0';
        const borderColor = isDay ? '#e0e0e0' : '#3a3a3a';
        const mutedColor = isDay ? '#888' : '#999';
        
        const content = document.createElement('div');
        content.innerHTML = `
            <div style="margin-bottom: 8px; color: ${textColor};">
                ${timeStatement}
            </div>
            
            ${statements.map(statement => `
                <div style="margin-bottom: 6px; color: ${textColor};">
                    ${statement}
                </div>
            `).join('')}
            
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid ${borderColor}; font-size: 11px; color: ${mutedColor}; text-align: right;">
                Updated ${new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}
            </div>
        `;
        
        while (widget.childNodes.length > 0) {
            widget.removeChild(widget.lastChild);
        }
        widget.appendChild(content);
    }
    
    function updateWidget() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => displayWidget(data))
            .catch(error => {
                const widget = document.getElementById('status-widget');
                if (widget) {
                    const times = getTimeInfo();
                    const hour = new Date().getHours();
                    const isDay = hour >= 6 && hour < 20;
                    
                    updateWidgetTheme(widget, isDay);
                    
                    const timeStatement = times.myTime === times.visitorTime 
                        ? `For me, it's currently <strong>${times.myTime}</strong>`
                        : `For me, it's currently <strong>${times.myTime}</strong>, but for you, it's <strong>${times.visitorTime}</strong>`;
                    
                    const textColor = isDay ? '#3a3a3a' : '#e0e0e0';
                    const mutedColor = isDay ? '#888' : '#999';
                    
                    const content = document.createElement('div');
                    content.innerHTML = `
                        <div style="margin-bottom: 8px; color: ${textColor};">
                            ${timeStatement}
                        </div>
                        <div style="color: ${mutedColor};">
                            ⚠️ Weather data unavailable
                        </div>
                    `;
                    
                    while (widget.childNodes.length > 0) {
                        widget.removeChild(widget.lastChild);
                    }
                    widget.appendChild(content);
                }
            });
    }
    
    init();
})();


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