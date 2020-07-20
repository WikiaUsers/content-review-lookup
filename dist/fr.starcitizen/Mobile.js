/* sliders for mobile */
$(function() {
//  var $tabs = $("#portal_slider").tabs({ show: {opacity:'toggle', duration:100} } );
  var $tabs = $("#portal_slider").tabs( { show: { effect: 'slide', direction: 'right', duration: 200 } } );
  $("[class*=portal_sliderlink]").click(function() { // bind click event to link
    // newer jquery ui uses id offset of 0, older jquery uses tab id offset of 1
    var id = parseInt(this.className.match(/portal_sliderlink-(\d+)/)[1]) - 1;
    $tabs.tabs('option', 'active', id)
    console.log("Activating tab id: " + id);
    return false;
  });
});