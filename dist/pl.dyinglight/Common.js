var oggPlayerButtonOnly = false;

document.addEventListener("DOMContentLoaded", function () {
  let currentAudio = null;

  document.querySelectorAll(".audio-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const src = btn.getAttribute("data-src");

      if (!src) return;

      if (currentAudio) {
        currentAudio.pause();
      }

      const audio = new Audio(src);
      audio.play();
      currentAudio = audio;
    });
  });
});

/* Licznik do przeceny */
$(document).ready(function() {

  $('.countdown').each(function() {
    var el = this;
    var targetDate = new Date($(el).data('date'));

    function updateTimer() {
      var now = new Date();
      var diff = targetDate - now;

      if (diff <= 0) {
        el.innerHTML = "Koniec promocji";
        return;
      }

      var d = Math.floor(diff / (1000 * 60 * 60 * 24));
      var h = Math.floor(diff / (1000 * 60 * 60) % 24);
      var m = Math.floor(diff / (1000 * 60) % 60);
      var s = Math.floor(diff / 1000 % 60);

      el.innerHTML = d + "d " + h + "g " + m + "m " + s + "s";
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  });

});