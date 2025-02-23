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



const prevButton = document.querySelector('.mcskin-prev');
const nextButton = document.querySelector('.mcskin-next');
const slides = document.querySelectorAll('.mcskin-slide'); 


let currentSlide = 0;

function showSlide(index) {
    if (index < 0) {
        currentSlide = slides.length - 1; 
    } else if (index >= slides.length) {
        currentSlide = 0; 
    } else {
        currentSlide = index;
    }

    
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });

    
    slides[currentSlide].classList.add('active');
}


prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1); 
});

nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1); 
});

showSlide(currentSlide);