// On DOM Ready
$(function(){
 // Setup language selector
 $('#langdiv img').each(function(){
  $(this).css({'height':'auto','width':'60px'});
 });
 $('#langdiv img').hover(function(){
  $(this).animate({width:'70px'},'fast');
  $('#langdiv span').text($(this).attr('alt'));
 },function(){
  $('#langdiv span').text('Localized Versions of the Skip Beat! Wiki');
  $(this).animate({width:'60px'},'fast');
 });
});
// End On DOM Ready