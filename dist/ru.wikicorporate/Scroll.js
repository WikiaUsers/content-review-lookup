function handleScrollTo(e) {
  e.preventDefault();
  var breakY = ($(document).height() - $(window).height()) * 0.5;
  var scrollTarget = $(window).scrollTop() > breakY ? 0 : $(document).height();

  $('html').animate({
    scrollTop: scrollTarget
  }, 10);
}

var $scrollBottomButton = $('<a>', {
  "class": 'scroll-button scroll-button--bottom'
}).appendTo('#WikiaBar').on('click', handleScrollTo);

var lastScrollTop = 0;
var onScroll = function () {
  var currentScrollTop = $(window).scrollTop();
  var breakY = ($(document).height() - $(window).height()) * 0.5;

  if (Math.abs(currentScrollTop - lastScrollTop) > 1) {
    var reachHalf = currentScrollTop > breakY;
    $scrollBottomButton.attr('class', "scroll-button scroll-button--" + (reachHalf ? 'top' : 'bottom'));
    lastScrollTop = currentScrollTop;
  }
};

$(window).on('scroll', onScroll);