/* Any JavaScript here will be loaded for all users on every page load. */
document.addEventListener("DOMContentLoaded", function() {
  if (!window.location.pathname.endsWith("/wiki/User:Cazozozop")) return;

  var sound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/14/audio_8f4a362b1d.mp3?filename=creepy-whistles-66703.mp3");
  var links = document.querySelectorAll('a[href*="Cazozozop"]');

  links.forEach(function(el) {
    el.addEventListener("click", function() {
      sound.currentTime = 0;
      sound.play();
    });
  });

  function applyGlitchEffect() {
    if (Math.random() < 0.1) {
      links.forEach(function(el) {
        el.classList.add('glitch');
        setTimeout(function() {
          el.classList.remove('glitch');
        }, 500);
      });
    }
  }

  setInterval(applyGlitchEffect, Math.random() * 10000 + 10000);
});