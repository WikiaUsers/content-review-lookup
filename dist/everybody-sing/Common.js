mw.loader.using(['mediawiki.util']).then(function () {
  function initCards() {
    const cards = document.querySelectorAll(".es-card");

    cards.forEach(card => {
      const link = card.getAttribute("data-link");
      if (!link) return;

      // Prevent duplicate binding
      if (card.dataset.ready) return;
      card.dataset.ready = "true";

      // Click navigation
      card.addEventListener("click", function () {
        window.location.href = link;
      });

      // Hover effects
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

  // Run on load
  $(initCards);

  // Run again for tabber / dynamic content
  mw.hook('wikipage.content').add(initCards);
});

$(document).ready(function() {
    $('.es-card[data-link]').click(function() {
        window.location.href = $(this).data('link');
    });
});