/* Any JavaScript here will be loaded for all users on every page load. */

// mp4 webm video autoplay/loop

var vids = document.getElementsByClassName("autoloop");
for (var i = 0; i < vids.length; i++){
    vids[i].autoplay = true;
    vids[i].loop = true;
    vids[i].muted = true;
}

var vids = document.getElementsByClassName("loop");
for (var i = 0; i < vids.length; i++){
    vids[i].loop = true;
    vids[i].muted = true;
}