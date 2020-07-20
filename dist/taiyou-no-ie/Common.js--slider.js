/* Sliders using jquery
 */
 
$(document).ready(function() {
  if ( wgPageName == "Taiyou_no_Ie_Wiki") {
    mw.loader.using( ['jquery.ui.tabs'], function() {
      var $tabs = $("#portal_slider").tabs({ fx: [{opacity:'toggle', duration:200},{height:'toggle', duration:'normal'}, ] } );
      $("[class^=portal_sliderlink]").click(function() { // bind click event to link
        var currentCl = $(this).prop('class');
        var workaround = $(this).children("a").prop('href');
        $(this).children("a").children("img").addClass("selectedImg");
        $(".selectedImg").animate( {height: "90%", width: "90%" }, { duration: 50, queue: true} );
        $(".selectedImg").animate( {height: "100%", width: "100%" }, { duration: 150, queue: true, complete: function(){
          $(".selectedImg").removeClass("selectedImg");
          if ( currentCl != "portal_sliderlink_28" ) {
            $tabs.tabs('select', currentCl.replace("portal_sliderlink_", ""));
          }
          else {
            window.location.replace(workaround);
          }
        } } );
        return false;
      });
    });
    }
});