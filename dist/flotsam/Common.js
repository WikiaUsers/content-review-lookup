/* Any JavaScript here will be loaded for users using the Hydra Dark skin */
/* Makes front page links rotate slightly when hovered, at a random degree between -3 and 3 degrees. */

/**
 * @param min
 * @param max
 * @param excluded
 * @return a random integer between min and max
 */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

$('.fplink').hover(
    function() {
        $(this).css('transform', 'rotate(' + rand(-3, 3) + 'deg)');
    },
    function() {
        $(this).css('transform', 'none');
    }
);