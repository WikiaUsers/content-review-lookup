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