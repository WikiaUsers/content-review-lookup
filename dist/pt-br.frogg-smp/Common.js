// SKIN CAROUSEL by feyli

var middle = Math.floor($(".skins-carousel__slider li").length / 2);
var classesTemplate = [
  "slider__item--pos-prev",
  "slider__item--prev",
  "slider__item--act",
  "slider__item--next",
  "slider__item--pos-next"
];
var inDelay = false;

function setDelay() {
  inDelay = true;

  setTimeout(function() {
    inDelay = false;
  }, 500);
}

function recenter($slider) {
  Array.from($slider.find("li"))
    .slice(middle - 2, middle + 3)
    .forEach(function($item, i) {
      $item.className = classesTemplate[i];
    
      if (i === 2) {
      	$slider.find('.skins-carousel__name.--active').removeClass('--active')
        $slider.find('.skins-carousel__name[data-index="' + $($item).data("index") + '"]').addClass("--active");
        
        $slider.find('.skins-carousel__description.--active').removeClass('--active');
        $slider.find('.skins-carousel__description[data-index="' + $($item).data("index") + '"]').addClass("--active");
      }
    });
}

function next($slider) {
  if (inDelay) return;

  if ($slider.find(".slider__item--pos-prev")) {
    $slider.find(".slider__item--pos-prev")[0].className = "slider__item--outside";
  }

  $slider.find(".skins-carousel__slider")[0].insertAdjacentElement(
    "beforeend",
    $slider.find("li:first-child")[0]
  );

  recenter($slider);

  setDelay();
}

function prev($slider) {
  if (inDelay) return;

  if ($slider.find(".slider__item--pos-next")) {
    $slider.find(".slider__item--pos-next")[0].className = "slider__item--outside";
  }

  $slider.find(".skins-carousel__slider")[0].insertAdjacentElement(
    "afterbegin",
    $slider.find("li:last-child")[0]
  );

  recenter($slider);

  setDelay();
}

$(".skins-carousel__prev-button").on("click", function(event) {
  prev($(event.target.closest(".skins-carousel")));
});
$(".skins-carousel__next-button").on("click", function(event) {
  next($(event.target.closest(".skins-carousel")));
});