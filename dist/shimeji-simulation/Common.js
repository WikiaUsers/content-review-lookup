/* =========================================================
   clickable divs — Shimeji Simulation Wiki
   ========================================================= */
/*ENTER TEST MODE ON Special:JSPages if you wanna umm test js the erm thing i forgot the woord but u get me*/
$(function () {

    /* classes list  PLEASE REMEMBER TO PUT .BEFORETHETEXT  IF SOMEONE EDITS*/
    var cardSelectors = [
        '.character-main-card',
        '.character-list-card',
        '.characters-background-item',
        '.main-nav-card',
        '.community-file',
        '.manga-volume',          
        '.location-card',        
        '.location-card-minor',
        '.world-test-item',
        '.chapter-card',
        '.chapters-list-item'
    ];

    var selector = cardSelectors.join(', ');

    $(selector).each(function () {

        var $card = $(this);

        /* search for first link */
        var $link = $card.find('a').first();

        if (!$link.length) return;

        var href = $link.attr('href');
        if (!href) return;

        /* adding click function */
        $card.css('cursor', 'pointer');

        $card.on('click', function (e) {

            /* avoid making this stuff double if clicked on link */
            if ($(e.target).is('a') || $(e.target).closest('a').length) {
                return;
            }

            /* if text is being selected through lmb - wont be sent. */
            if (window.getSelection().toString().length > 0) {
                return;
            }

            window.location.href = href;
        });
    });
});