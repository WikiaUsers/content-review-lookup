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

$(function () {

    $('.law-tree').each(function () {

        const tree = $(this);

        tree.css({
            position: 'relative',
            width: tree.data('width') + 'px',
            height: tree.data('height') + 'px',
            border: '1px solid red',
            margin: '20px auto'
        });

        const nodes = tree.data("nodes").trim().split("\n");

        nodes.forEach(function(line){

            const parts = line.split("|");

            const page = parts[0].trim();
            const x = parseInt(parts[1]);
            const y = parseInt(parts[2]);

            const node = $("<div></div>");

            node.text(page);

            node.css({
                position: "absolute",
                left: x + "px",
                top: y + "px",
                background: "#222",
                color: "white",
                padding: "5px 10px",
                border: "1px solid white",
                borderRadius: "6px"
            });

            tree.append(node);

        });

    });

});