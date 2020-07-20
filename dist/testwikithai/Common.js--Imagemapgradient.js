/* Imagemap hovering gradient effect
 * By: [[User:KettleMeetPot]]
 */
$(function() {
    if ($('.episode-nav')) {
        var areaHover;
        areaFunction();
        $('area').mouseenter(function() {
            areaHover = true;
        });
        $('area').mouseleave(function() {
            areaHover = false;
        });
        $('.episode-nav').mouseleave(function() {
            $('.episode-nav').hide();
            if (areaHover === false) {
                areaFunction();
            }
        });
    }
});

function areaFunction() {
    $('map area').each(function() {
        $(this).mouseenter(function(event) {
            var coords = $(this).attr('coords').split(",");
            var href = $(this).attr('href');
            $('.episode-nav').css({
                'left': coords[0] + 'px',
                'top': coords[1] + 'px',
                'width': (parseInt(coords[2]) - parseInt(coords[0])) + 'px',
                'height': (parseInt(coords[3]) - parseInt(coords[1])) + 'px'
            });
            $('.episode-nav').attr('onclick', "location.href=" + "'" + href + "';");
            $('.episode-nav').show();
            $(this).off(event);
        });
    });
}