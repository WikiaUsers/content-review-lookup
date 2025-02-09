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

document.addEventListener("DOMContentLoaded", function () {
    let skins = document.querySelectorAll(".mcskin-skin");
    let currentIndex = 0;

    function showSkin(index) {
        skins.forEach((skin, i) => {
            skin.classList.toggle("active", i === index);
        });
    }

    document.querySelector(".mcskin-prev").addEventListener("click", function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : skins.length - 1;
        showSkin(currentIndex);
    });

    document.querySelector(".mcskin-next").addEventListener("click", function () {
        currentIndex = (currentIndex < skins.length - 1) ? currentIndex + 1 : 0;
        showSkin(currentIndex);
    });

    showSkin(currentIndex);

    /* Adicionando os indicadores */
    let indicatorsContainer = document.querySelector(".mcskin-indicators");
    if (indicatorsContainer) {
        skins.forEach((_, i) => {
            let indicator = document.createElement("div");
            indicator.classList.add("mcskin-indicator");
            indicator.dataset.index = i;
            indicator.addEventListener("click", function () {
                currentIndex = parseInt(this.dataset.index);
                showSkin(currentIndex);
            });
            indicatorsContainer.appendChild(indicator);
        });

        function updateIndicators() {
            document.querySelectorAll(".mcskin-indicator").forEach((dot, i) => {
                dot.classList.toggle("active", i === currentIndex);
            });
        }

        document.querySelector(".mcskin-prev").addEventListener("click", updateIndicators);
        document.querySelector(".mcskin-next").addEventListener("click", updateIndicators);
        updateIndicators();
    }
});