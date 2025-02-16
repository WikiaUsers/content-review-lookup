/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */

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

////

var currentIndex = 0;

function changeSlide(direction) {
    var slides = document.querySelectorAll('.mcskin-slide');
    
    if (slides.length === 0) return;
    
    slides[currentIndex].classList.remove('active');
    
    currentIndex += direction;
    
    if (currentIndex >= slides.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = slides.length - 1;
    }
    
    slides[currentIndex].classList.add('active');
}

// Garante que o primeiro slide esteja visível ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    var slides = document.querySelectorAll('.mcskin-slide');
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
});