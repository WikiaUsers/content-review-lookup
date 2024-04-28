/* Sliders using jquery
 * In addition, disabling lazy loading of images on the mainpage for slider
 * By: [[User:Tierrie]], with modifications by [[User:Thailog]] and [[User:KettleMeetPot]] via Avatar Wiki
 */

$(function() {
  if ( mw.config.get('wgPageName') == "TimeSandbox_Wikia") {
    mw.loader.using( ['jquery.ui'], function() {
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
    //data-src to img-src to mitigate lag on certain images
    $( "#portal_slider img" ).each(function(i,e) {
        dataSRC = $(e).attr("data-src");
        $(e).attr("src", dataSRC);
    });
    }
});