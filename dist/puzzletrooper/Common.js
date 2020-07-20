/* Any JavaScript here will be loaded for all users on every page load. */

/* FILTERING */
$('.controls div').on('click', function(e){
  e.preventDefault();
  var c= $(this).data('color');

  $(".selected").removeClass("selected");                 
  $(this).addClass("selected");

  $('#myTable')[0].className = c + ' ' + 'wikitable';
});