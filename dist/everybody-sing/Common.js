mw.loader.using(['mediawiki.util']).then(function () {

    function initCards() {
        const cards = document.querySelectorAll(".es-card");

        cards.forEach(card => {
            const link = card.getAttribute("data-link");
            if (!link) return;

            if (card.dataset.ready) return;
            card.dataset.ready = "true";

            card.addEventListener("click", function () {
                window.location.href = link;
            });

            card.addEventListener("mouseenter", function () {
                card.style.transform = "scale(1.05)";
                card.style.transition = "0.2s ease";
                card.style.cursor = "pointer";
                card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "scale(1)";
                card.style.boxShadow = "none";
            });
        });
    }

    $(initCards);
    mw.hook('wikipage.content').add(initCards);

});

/* ========================================================
   EVERYBODY SING CLUE IMAGE POPUP
   ======================================================== */

$(document).ready(function () {

    console.log('CLUE SYSTEM LOADED');

    $(document).on('click', '.clue-image', function (e) {

        e.preventDefault();

        var img = $(this).attr('data-image');

        $('#clueOverlay').remove();

        $('body').append(
            '<div id="clueOverlay">' +
                '<div id="clueBox">' +
                    '<img src="' + img + '">' +
                '</div>' +
            '</div>'
        );

    });
    
    console.log('COMMONJS END REACHED');

    $(document).on('click', '#clueOverlay', function () {
        $(this).remove();
    });

});