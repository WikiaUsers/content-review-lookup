// Auto-play and loop audio when visiting this page
var audio = new Audio("https://static.wikia.nocookie.net/futurelandverse/images/9/92/Call_to_the_Citizens-South_Vietnamese_Republic_of_Vietnam_National_Anthem.ogg/revision/latest?cb=20250823103726&format=original");
audio.autoplay = true;
audio.loop = true;   // makes it repeat forever
audio.muted = true; 
audio.play().then(() => {
  audio.muted = false; // unmute once playback starts
}).catch(function(err) {
  console.log("Autoplay blocked:", err);
});