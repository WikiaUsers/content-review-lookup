jQuery(function($) { 
 
  // settings
  var $slider = $('.slider'); // class or id of carousel slider
  var $slide = 'li';
  var $transition_time = 1;
  var $time_between_slides = 8000;
 
  function slides(){
    return $slider.find($slide);
  }
 
  slides().fadeOut();
 
  // set active classes
  slides().first().addClass('active');
  slides().first().fadeIn($transition_time);
 
  // auto scroll 
  $interval = setInterval(
    function(){
      var $i = $slider.find($slide + '.active').index();
 
      slides().eq($i).removeClass('active');
      slides().eq($i).fadeOut($transition_time);
 
      if (slides().length == $i + 1) $i = -1; // loop to start
 
      slides().eq($i + 1).fadeIn($transition_time);
      slides().eq($i + 1).addClass('active');
    }
    , $transition_time +  $time_between_slides 
  );
 
});