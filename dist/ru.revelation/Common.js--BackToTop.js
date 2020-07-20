//Created by Microstyle © 2016

$("body").append("<a href='#' id='backtotop'><span title='Наверх'></span></a>");

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        $("#backtotop").addClass('show');
    }
    else {
        $("#backtotop").removeClass('show');
    }
});

$('#backtotop').on('click', function (e) {
    e.preventDefault();
    $('html,body').animate({
        scrollTop: 0
    }, 500);
});