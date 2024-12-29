$(document).ready(function() {
  var audioPlayer = document.getElementById('audio-player').querySelector('audio');
  var lyricLines = document.querySelectorAll('.lyric-line');

  audioPlayer.addEventListener('timeupdate', function() {
    var currentTime = audioPlayer.currentTime;
    
    for (var i = 0; i < lyricLines.length; i++) {
      var lyricLine = lyricLines[i];
      var timeData = JSON.parse(lyricLine.getAttribute('data-time'));
      var startTime = timeData.start;
      var endTime = timeData.end;

      if (currentTime >= startTime && currentTime < endTime) {
        lyricLine.classList.add('bold');
      } else {
        lyricLine.classList.remove('bold');
      }
    }
  });
});