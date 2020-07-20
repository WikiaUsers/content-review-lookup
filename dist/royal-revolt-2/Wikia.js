$('.hp-menu li').hover(function() {
    $(window).scroll();
});
$('.hp-menu > li').hover(
    function() {
    $('.menu-border-indicator').css({display:'block'});},
    function() {
    $('.menu-border-indicator').css({display:'none'});
});
 
$('.hp-menu > li').hover(function() {
  $('.li-preview-outer').css({'display' : 'none'});},
  function() {
  $('.li-preview-outer').css({'display' : 'block'});
});
 
$('.sub-hp-menu > li').hover(function() {
  $('.li-preview-main').css({'display' : 'none'});},
    function() {
  $('.li-preview-main').css({'display' : ''});
});
 
$('.li-alliance').hover(function(){
  $('.menu-border-indicator').stop().animate({top: '5px'},25);
}); 
$('.li-attacking').hover(function(){
  $('.menu-border-indicator').stop().animate({top: '65px'},25);
});
$('.li-buildings').hover(function(){
  $('.menu-border-indicator').stop().animate({top: '125px'},25);
});
$('.li-currency').hover(function(){
  $('.menu-border-indicator').stop().animate({top: '185px'},25);
});
$('.li-hero').hover(function(){
  $('.menu-border-indicator').stop().animate({top: '245px'},25);
});
$('.li-magic').hover(function(){
  $('.menu-border-indicator').stop().animate({top: '305px'},25);
});