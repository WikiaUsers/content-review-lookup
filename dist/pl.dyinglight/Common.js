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

/* tŁUMACZENIE */
$(function () {

    $(document).on("click", ".dl-translation-button", function () {

        var box = $(this).closest(".dl-translation");
        var polish = box.find(".dl-translation-polish");
        var english = box.find(".dl-translation-english");

        if (polish.is(":visible")) {
            polish.hide();
            english.show();
            $(this).text("ENGLISH");
        } else {
            english.hide();
            polish.show();
            $(this).text("POLSKI");
        }

    });

});