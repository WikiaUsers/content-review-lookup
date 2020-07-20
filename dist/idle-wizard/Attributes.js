$(document).ready(function() {
    $('.attribute-embed').each(function() {
        width = $(this).find('.attribute').first().width();
        $(this).find('.fill img').width(width);
    });
});