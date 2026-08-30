mw.hook('wikipage.content').add(function($content) {
    var $carousel = $content.find('.cover-flow');
    var $cards = $carousel.find('.card');
    var $prev = $carousel.find('.carousel-prev');
    var $next = $carousel.find('.carousel-next');

    if (!$cards.length) {
        return;
    }

    var classes = ['hidden-left', 'left', 'center', 'right', 'hidden-right'];
    var positions = [];

    $cards.each(function(i) {
        positions.push(i);
    });

    function updateCarousel() {
        $cards.each(function(index) {
            var $card = $(this);
            $card.removeClass('hidden-left left center right hidden-right');
            
            var posIndex = positions[index];
            if (posIndex < classes.length) {
                $card.addClass(classes[posIndex]);
            } else {
                $card.addClass('hidden-right');
            }
        });
    }

    // Swapped array operations for correct visual direction
    $next.off('click.coverflow').on('click.coverflow', function(e) {
        e.preventDefault();
        positions.unshift(positions.pop()); // Moves cards right-to-left visually
        updateCarousel();
    });

    $prev.off('click.coverflow').on('click.coverflow', function(e) {
        e.preventDefault();
        positions.push(positions.shift()); // Moves cards left-to-right visually
        updateCarousel();
    });

    updateCarousel();
});