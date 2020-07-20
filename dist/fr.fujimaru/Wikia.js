
<div id="player" style="position: absolute; top: -9999px; left: -9999px;"></div>
<div id="info">loading...</div>
<script src="http://www.youtube.com/player_api"></script>
<script>
var info = document.getElementById('info');
function onYouTubePlayerAPIReady() {
  var player = new YT.Player('player', {
      videoId: 'BJ0xBCwkg3E', // this is the id of the video at youtube (the stuff after "?v=")
      loop: true,
      events: {
          onReady: function (e) {
              info.innerHTML = 'video is loaded';
              e.target.playVideo();
          },
          onStateChange: function (event) {
              if (event.data === 1) {
                  info.innerHTML = 'video started playing';
              }
          }
      }
  });
  // you can do more stuff with the player variable
}
</script>