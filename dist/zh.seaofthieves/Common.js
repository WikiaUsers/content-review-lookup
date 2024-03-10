/* Any JavaScript here will be loaded for all users on every page load. */

/* Toggle Cargo Images */
var ToggleText = 'Toggle Images';

$('table.list').each(function(i){
  $(this).before('<div style="padding: 10px 30px">• &nbsp; <a style="font-weight:bold;" href="#aaaa" class="thumbTog' + i + '">' + ToggleText + '</a> &nbsp; •</div>');
  $(this).addClass('list' + i);
  
  var n = i;
  
  $('.thumbTog' + n).click(function(){
    $('table.list' + n + ' .thumb').toggle();
  });
  
  
});

$('.thumb .new').remove();