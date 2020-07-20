/** 来自万界规划局 **/
$('body').prepend($('<div>').attr({
  'id': 'BackToTopBtn'
}).html('<div id="BTTtext">回到顶部</div><img src="https://vignette.wikia.nocookie.net/karakai-jouzu-no-takagi-san/images/5/53/%E5%9B%9E%E5%88%B0%E9%A1%B6%E9%83%A8.svg/revision/latest?cb=20190725115108&path-prefix=zh" id="BTTicon">')
  .click(function() {
  $('body,html').animate({
    scrollTop: 0
  },
  400);
}));
$(window).scroll(function() {
  if ($(window).scrollTop() > 280) {
    $('#BackToTopBtn').fadeIn(500);
  } else {
    $('#BackToTopBtn').fadeOut(300);
  }
});