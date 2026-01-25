mw.loader.using(['jquery']).then(function () {
    mw.hook('wikipage.content').add(function () {

        // --- Global sync offset in milliseconds (negative = show earlier) ---
        var SYNC_OFFSET_MS = -100; // -100ms = 0.1s earlier

        // --- Lyrics data ---
        var lyricsData = {
            'Jazzy_Juice': [
                { time: 15.449505, text: 'I went down to the local McDonalds but,' },
                { time: 19.177793, text: 'they didnt have any <span style="color:#2596be">Jazzy Juice.</span>' },
                { time: 22.838562, text: 'I sat down crying,' },
                { time: 24.273196, text: 'with my dog,' },
                { time: 25.195158, text: 'but we continued on!' },
                { time: 27.553854, text: '<i>(I ran 50 miles.)</i>' },
                { time: 30.024518, text: 'They all told me:' },
                { time: 31.19358, text: '"Youll never find it!"' },
                { time: 33.109931, text: '"The only thing youll find is a <b>knuckle sandwich!</b>"' },
                { time: 37.124601, text: 'So I asked my friends,' },
                { time: 39.163715, text: 'and I asked my waaaallll:' },
                { time: 41.919496, text: '"Where is <span style="color:#2596be">Jazzy Juice!?</span>"' },
                { time: 45.201905, text: 'I turned around and' },
                { time: 46.194572, text: 'saw' },
                { time: 46.779677, text: 'it' },
                { time: 47.124498, text: 'with' },
                { time: 47.708285, text: 'my' },
                { time: 48.17958, text: 'eyes.' },
                { time: 48.961648, text: 'And I ran faster than the sky!' },
                { time: 52.033403, text: 'I was almost in reach of the <span style="color:#2596be">juice</span>,' },
                { time: 54.676969, text: 'but then my shoes were loose.' },
                { time: 57.057582, text: '<i>(I had to retie them!)</i>' },
                { time: 59.296227, text: 'I looked up to see the <span style="color:#2596be">juice</span> being taken,' },
                { time: 62.505189, text: 'I got up and caked him' },
                { time: 64.220955, text: 'sending <span style="color:#2596be">Jazzy Juice</span> to the sky!' },
                { time: 66.693781, text: 'I planted my shoes down.' },
                { time: 68.471513, text: 'Its heading towards the grooouuuuunnddd.' },
                { time: 71.327213, text: 'And I caught <span style="color:#2596be">Jazzy Juice</span>!!!' },
                { time: 74.186589, text: '<i>But something started coursing through my veins..</i>' },
                { time: 75.589567, text: '<i>My <span style="color:#2596be">juice</span> fell down and i didnt feel the same..</i>' },
                { time: 77.387982, text: '<i>Moon Fries lookin kinda different what changed...</i>' },
                { time: 79.395706, text: '<i>This song is going crazy its about its about to go INSANE.</i>' },
                { time: 81.367111, text: '<i>My brother lost a game of Fortnite and he let loose,</i>' },
                { time: 83.37751, text: '<i>He got so mad he broke his legs and couldnt move,</i>' },
                { time: 85.264358, text: '<i>Now all he wanted was good ol doctor Seuss,</i>' },
                { time: 87.077119, text: '<i>But hey, whats the matter we got <span style="color:#2596be">Jazzy Juice!</span></i>' },
                { time: 89.189354, text: 'I danced for hours with my drink all damn day!' },
                { time: 93.126813, text: 'Bustin moves on the way!' },
                { time: 96.220061, text: 'I could not care less about you' },
                { time: 98.906732, text: 'even my family knew,' },
                { time: 101.112455, text: 'I might be going crazy!' },
                { time: 103.476192, text: 'I thought maybe I should see my brother,' },
                { time: 106.462199, text: 'but I started to shudder at' },
                { time: 108.782313, text: 'everything ive done!' },
                { time: 110.970292, text: 'The <span style="color:#2596be">juice</span> had taken me' },
                { time: 112.818798, text: 'it took me so long to see...' },
                { time: 115.686084, text: 'I dont want' },
                { time: 116.596911, text: 'I dont want <span style="color:#2596be">Ja-</span>' },
                { time: 117.222469, text: 'I dont want <span style="color:#2596be">Jazzy</span>' },
                { time: 117.665976, text: 'I dont want <span style="color:#2596be">Jazzy Juice.</span>' },
                { time: 125, text: '' },
            ],
              'Ballsinyojaws': [
                { time: 23.131769, text: 'Can I put my balls in yo jaws?' },
                { time: 25.457517, text: '<i>yo jaws</i>' },
                { time: 26.803112, text: 'Balls in yo jaws?' },
                { time: 28.735475, text: 'Can IIIIIII can IIIII?' },
                { time: 31.763044, text: '<i>can iiiiiiii</i>' },
                { time: 33.234317, text: 'Can IIIII?' },
                { time: 34.5566, text: 'Can I put my balls in yo jaws? <br> Can I put my balls in yo jaws?' },
                { time: 37.133227, text: '<i>yo jaws</i><br><i>yo jaws</i>' },
                { time: 38.307609, text: 'Balls in yo jaws?<br>Balls in yo jaws?' },
                { time: 40.240964, text: 'Can IIIIIII can IIIII?<br>Can IIIIIII can IIIII?' },
                { time: 43.245703, text: '<i>can iiiiiiii</i><br><i>can iiiiiiii</i><br>Can IIIIIII can IIIII?<br>Can IIIIIII can IIIII?' },
                { time: 46.245703, text: '⚽⚽' },
                { time: 50, text: ''},
            ],
        };

        // --- Convert seconds to ms upfront ---
        Object.keys(lyricsData).forEach(function (key) {
            lyricsData[key] = lyricsData[key].map(l => ({
                time: Math.round(l.time * 1000),
                text: l.text
            }));
        });

        
		        // --- Create lyrics display once ---
		if (!document.getElementById('lyrics-display')) {
		    $('body').append('<div id="lyrics-display"></div>');
		    $('<style>').text(`
		        #lyrics-display {
		            position: fixed;
		            left: 0;
		            right: 0;
		            bottom: 60px;
		            text-align: center;
		            font-size: 30px;
		            font-weight: bold;
		            color: #fff;
		            -webkit-text-stroke: 1.3px black; /* semi-thick outline */
		            z-index: 9999;
		            opacity: 0;
		            pointer-events: none;
		            transition: opacity 0.05s linear;
		        }
		    `).appendTo('head');
		}
		
		// --- Attach lyrics to audio ---
		function attachLyrics(audio) {
		    if (audio.dataset.lyricsAttached) return;
		    audio.dataset.lyricsAttached = 'true';
		
		    var src = audio.src || '';
		    var lyrics = null;
		
		    Object.keys(lyricsData).forEach(function (key) {
		        if (src.includes(key)) {
		            lyrics = lyricsData[key];
		        }
		    });
		    if (!lyrics) return;
		
		    var currentIndex = -1;
		    var intervalId = null;
		
		    function update() {
		        if (!audio || audio.paused || audio.ended) return;
		        var t = Math.round(audio.currentTime * 1000) + SYNC_OFFSET_MS;
		        var newIndex = -1;
		        for (var i = lyrics.length - 1; i >= 0; i--) {
		            if (t >= lyrics[i].time) {
		                newIndex = i;
		                break;
		            }
		        }
		        if (newIndex !== -1 && newIndex !== currentIndex) {
		            currentIndex = newIndex;
		            $('#lyrics-display').html(lyrics[currentIndex].text).css('opacity', 1);
		
		            // --- Simple blue flash for that specific line ---
					if (lyrics[currentIndex].text.includes('But something started coursing through my veins')) {
					    if (!document.getElementById('blue-flash')) {
					        $('body').append('<div id="blue-flash"></div>');
					        $('<style>').text(`
					            #blue-flash {
					                position: fixed;
					                top: 0;
					                left: 0;
					                width: 100%;
					                height: 100%;
					                background: #2596be;
					                opacity: 0;
					                pointer-events: none;
					                z-index: 9999;
					                transition: opacity 3s linear; /* slow fade out */
					            }
					        `).appendTo('head');
					    }
					    var flash = $('#blue-flash');
					    flash.css('transition', 'none');  // remove previous transitions
					    flash.css('opacity', 1);          // flash instantly
					    setTimeout(() => flash.css('transition', 'opacity 3s linear'), 50); // apply slow fade
					    setTimeout(() => flash.css('opacity', 0), 60); // start fade out
					}

		        }
		    }
		
		    function hideLyrics() {
		        $('#lyrics-display').css('opacity', 0);
		        currentIndex = -1;
		        if (intervalId) {
		            clearInterval(intervalId);
		            intervalId = null;
		        }
		    }
		
		    audio.addEventListener('play', function () {
		        if (intervalId) clearInterval(intervalId);
		        intervalId = setInterval(update, 50); // update every 50ms
		    });
		
		    audio.addEventListener('pause', hideLyrics);
		    audio.addEventListener('ended', hideLyrics);
		}
		
		// --- Scan for audio elements repeatedly ---
		function scanForAudio() {
		    $('audio').each(function () {
		        attachLyrics(this);
		    });
		}
		
		scanForAudio();
		setInterval(scanForAudio, 1000);

    });
});