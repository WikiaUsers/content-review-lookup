/* Any JavaScript here will be loaded for all users on every page load. */

src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"

$(document).ready(function(){
    $("#Toggle").click(function(){
        $("#Statistics").slideToggle("slow");
    });
});
setTimeout(function start (){
  
  $('.bar').each(function(i){  
    var $bar = $(this);
    $(this).append('<span class="count"></span>')
    setTimeout(function(){
      $bar.css('width', $bar.attr('data-percent'));      
    }, 1000);
  });

// $('.count').each(function () {
//     $(this).prop('Counter',0).animate({
//         Counter: $(this).parent('.bar').attr('data-percent')
//     }, {
//         duration: 500,
//         easing: 'swing',
//         step: function (now) {
//             $(this).text(Math.ceil(now));
//         }
//     });
// });

 }, 500);