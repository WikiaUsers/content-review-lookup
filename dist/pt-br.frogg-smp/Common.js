// SKIN CAROUSEL by feyli

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
    var middle = Math.floor($slider.find("li").length / 2);
  Array.from($slider.find("li"))
    .slice(middle - 2, middle + 3)
    .forEach(function($item, i) {
      $item.className = classesTemplate[i];
    
      if (i === 2) {
      	$slider.find('.skins-carousel__name.--active').removeClass('--active');
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

// PAGINATED BOOK by feyli

function navPage($book, mod) {
  var newPage = Number($book.attr("data-actual-page")) + mod;
  var contents = $book.find(".paginated-book__content").length;
  
  if (newPage <= 0 || newPage > contents) return;
  
  $book.attr("data-actual-page", newPage);
  $book.find(".paginated-book__content.--active").removeClass("--active");
  $book.find(".paginated-book__content-container .paginated-book__content:nth-child(" +  newPage + ")").addClass("--active");
  $book.find(".paginated-book__page-indicator").text("Página " + newPage + " de " + contents);
}

$(".paginated-book__prev").on("click", function(event) {
  navPage($(event.target.closest(".paginated-book")), -1);
});

$(".paginated-book__next").on("click", function(event) {
  navPage($(event.target.closest(".paginated-book")), 1);
});