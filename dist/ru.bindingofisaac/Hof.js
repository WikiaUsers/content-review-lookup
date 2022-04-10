//template pol2 (Hof)
$('.tb-pol22-char-box').click(function() {
    if ($(this).hasClass('pressed')) {
        $(this).find('p').css({"display": "none"});
        $(this).removeClass('pressed');
    } else {
        $('.tb-pol22-char-box p').css({"display": "none"});
        $(this).find('p').css({"display": "block"});
        $(this).siblings('.tb-pol22-char-box').removeClass('pressed');
        $(this).addClass('pressed');
    }
});