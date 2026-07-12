function iniciarClases() {

    const headers = document.querySelectorAll(".lgn-class-header");

    if (!headers.length) {
        return false;
    }

    headers.forEach(header => {

        if (header.dataset.lgnReady) return;

        header.dataset.lgnReady = "1";

        header.addEventListener("click", function () {

            this.parentElement.classList.toggle("open");

        });

    });

    return true;
}

const intervalo = setInterval(function () {

    if (iniciarClases()) {
        clearInterval(intervalo);
    }

}, 100);