/* ----------------------------------------------------------------- */
/* ---------- JAVASCRIPT FILE FOR THE FABLED LEGACY WIKI ----------- */
/* ---- HP NAVIGATION FOR ENEMIES THAT USE A DIFFICULTY SLIDER ----- */
/* ----------------------------------------------------------------- */

document.querySelectorAll(".difficulty-slider-chaos").forEach(function(difficultySlider) {

  var sliderTexts = difficultySlider.querySelectorAll(".difficulty-slider-text-chaos");
  var nextBtn = difficultySlider.querySelector(".difficulty-slider-arrow-next");
  var prevBtn = difficultySlider.querySelector(".difficulty-slider-arrow-prev");

  var current = 0;

  function showDifficultySliderText(index) {
    sliderTexts.forEach(sliderText => sliderText.style.display = "none");
    sliderTexts[index].style.display = "block";

    prevBtn.classList.toggle("disabled", index == 0);
    nextBtn.classList.toggle("disabled", index == sliderTexts.length - 1);
  }

  prevBtn.onclick = function() {
    if (current > 0) {
      current--;
      showDifficultySliderText(current);
    }
  };

  nextBtn.onclick = function() {
    if (current < sliderTexts.length - 1) {
      current++;
      showDifficultySliderText(current);
    }
  };

  showDifficultySliderText(current);
});