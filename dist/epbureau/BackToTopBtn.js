$('body').prepend($('<div>').attr({
  'id': 'BackToTopBtn'
}).html('<div id="BTTtext">回到顶部</div><img src="https://vignette.wikia.nocookie.net/dragonfish/images/e/e2/UpArrow.svg/revision/latest?cb=20190621120259&path-prefix=zh" id="BTTicon">')
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