$(function () {
    var arrow = '.WikiaMenuElement';
    $('.WikiaMenuElement, .drop').on('mouseenter', function () {
        $(arrow).show();
        $(arrow).css('width', '100%');
    });
    $('.WikiaMenuElement, .drop').on('mouseleave', function () {
        $(arrow).hide();
    });
});