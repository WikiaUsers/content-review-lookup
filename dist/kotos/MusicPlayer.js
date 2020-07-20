//Emulator iframe with one of my videos as the default src
//Meant to be used with [Template:MusicPlayer] for stories
document.getElementsByTagName('body')[0].onload = function() {
    if (document.getElementById('musicPlayerAllow') !== null) {
        var rail = document.getElementById('WikiaRail');
        var node = document.createElement("div");
        var textnode = document.createTextNode("Loading iframe...");
        node.appendChild(textnode);
        node.id = "EmulatorFrame";
        node.classList.add("EmulatorFrame");
        node.classList.add("rail-module");
        rail.insertBefore(node, document.getElementById('WikiaAdInContentPlaceHolder'));
        
        
        // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
};

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      var playerReady = false;
      var isAllowed = false;
      var iframe;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('EmulatorFrame', {
          height: '120',
          width: '160',
          videoId: 'BHfqz68xEY8',
          events: {
            'onReady': onPlayerReady
          }
        });
        iframe = document.getElementById('EmulatorFrame');
        iframe.style.display = "none";
      }
      

function onPlayerReady(event) {
        playerReady = true;
        console.log("Player ready");
      }
      




function allowMusic() {
    isAllowed = !isAllowed;
    if(isAllowed) console.log("Music allowed");
}

var mpa = document.getElementById('musicPlayerAllow');
mpa.setAttribute('onclick', 'allowMusic()');

function sleep(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms)});
}

/*async function fadein(vol) {
    var i = 0;
    while (i < vol) {
        ++i;
        player.setVolume(i);
        await sleep(20);
    }
}*/
/*
var vol = player.getVolume();
player.setVolume(0);
player.playVideo();
fadein(vol);
*/

/*async function fadeout() {
    var vol = player.getVolume();
    var i = vol;
    while (i > 0) {
        --i;
        player.setVolume(i);
        await sleep(20);
    }
    return vol;
}*/

/*
var vol = fadeout();
player.stopVideo();
player.setVolume(vol);
*/

function elementInView(elem){
  ($(window).height() + $(window).scrollTop()) > elem.offsetTop
  && ($(window).height() + $(window).scrollTop()) + 50 < elem.offsetTop;
}

begins = Array.prototype.slice.call(
    document.getElementsByClassName('musicPlayerBegin'), 0);
ends = Array.prototype.slice.call(
    document.getElementsByClassName('musicPlayerEnd'), 0);

$(window).scroll(function(){
    console.log($(window).height() + $(window).scrollTop());
  begins.forEach(function(item) {
      if (elementInView(item)) {
          console.log("I'm here");
          if (playerReady && isAllowed) {
            iframe.style.display = 'block';
            //var vol = player.getVolume();
            //player.setVolume(0);
            player.videoId = $(this).data-url;
            player.playVideo();
            //fadein(vol);
          }
          return false;
      }
  });
  ends.forEach(function(item) {
      if (elementInView(item)) {
          console.log("I'm there");
         //var vol = fadeout();
         player.stopVideo();
         //player.setVolume(vol);
         iframe.style.display = 'none';
         return false;
      }
  });
});