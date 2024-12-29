function handleScrollTo(e) {
    const breakY = ($(document).height() - $(window).height()) * 50 / 100;

    e.preventDefault();
    const reachHalf = $(window).scrollTop() > breakY;
    $('html').animate({scrollTop: reachHalf ? 0 : $(document).height()}, '10');
}

const scrollButton = $('<a>', {
    class: 'scroll-button scroll-button--bottom',
})
    .appendTo('#WikiaBar')
    .on('click', handleScrollTo);

$(window).scroll(function () {
    const breakY = ($(document).height() - $(window).height()) * 50 / 100;

    const reachHalf = $(window).scrollTop() > breakY;
    scrollButton.attr('class', 'scroll-button scroll-button--' + (reachHalf ? 'top' : 'bottom'));
});