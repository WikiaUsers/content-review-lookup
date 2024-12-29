var parentDiv = document.querySelector('.mw-parser-output');
var audioPlayers = parentDiv.querySelectorAll('[id^="AudioTemplate-"]');

audioPlayers.forEach(function(element){
    var audioPlayer = document.createElement('div');
    audioPlayer.classList.add('audio-player');
    element.classList.remove("audio-loading");

    var audio = document.createElement('audio');
    audio.src = 'https://rus1130.github.io/afbg/audio/' + element.getAttribute('id').replace('AudioTemplate-', '') + ".mp3";
    audio.volume = 0.2;

    var playPauseBtn = document.createElement('button');
    var seekBar = document.createElement('input');
    var timeDisplay = document.createElement('span');

	timeDisplay.textContent = "0:00 / ?:??";

    seekBar.type = 'range';
    seekBar.value = 0;

    timeDisplay.classList.add("time-display");

    playPauseBtn.innerHTML = '<span><img class="play" src="https://rus1130.github.io/afbg/audio/play.png"/></span>';

    playPauseBtn.addEventListener('click', function(){
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<span><img class="pause" src="https://rus1130.github.io/afbg/audio/pause.png"/></span>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<span><img class="play" src="https://rus1130.github.io/afbg/audio/play.png"/></span>';
        }
    });

    audio.addEventListener('timeupdate', function(){
        seekBar.value = audio.currentTime;
        timeDisplay.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
    });

    audio.addEventListener('loadedmetadata', function(){
        timeDisplay.textContent = '0:00 / '+formatTime(audio.duration);
        seekBar.max = audio.duration;
    });
    
    audio.addEventListener("error", function(){
        audioPlayer.innerHTML = "<span style='height:35px; width: 100%; text-align:center; line-height:35px;'>Error loading audio</span>"
    }); 

    seekBar.addEventListener('input',function(){
        audio.currentTime = seekBar.value;
    });

    audioPlayer.appendChild(playPauseBtn);
    audioPlayer.appendChild(seekBar);
    audioPlayer.appendChild(timeDisplay);
    audioPlayer.appendChild(audio);

    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return minutes + ":" + secs;
    }

    element.appendChild(audioPlayer);
})