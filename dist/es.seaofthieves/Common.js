/* Any JavaScript here will be loaded for all users on every page load. */

// mp4 webm video autoplay/loop

var vids = document.getElementsByClassName("autoloop");
for (var i = 0; i < vids.length; i++){
    vids[i].autoplay = true;
    vids[i].loop = true;
}

var vids = document.getElementsByClassName("loop");
for (var i = 0; i < vids.length; i++){
    vids[i].loop = true;
}

/* Toggle Cargo Images */
var ToggleText = 'Alternar imágenes';

$('table.list').each(function(i){
  $(this).before('<div class="mw-ui-button mw-ui-primary toggle-button"><a href="#aaaa" class="thumbTog' + i + '">' + ToggleText + '</a></div>');
  $(this).addClass('list' + i);
  
  var n = i;
  
  $('.thumbTog' + n).click(function(){
    $('table.list' + n + ' .thumb').toggle();
  });
  
  
});

$('.thumb .new').remove();